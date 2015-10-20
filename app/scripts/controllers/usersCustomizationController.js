'use strict';
(function(){
angular.module("sponzorme")
.controller('UsersCustomController', function($scope, $translate, $sessionStorage, $localStorage, usSpinnerService, userRequest, allInterestsServiceRequest, categoryRequest, userInterestRequest) {

  $scope.loadinglistsponzors = true;
  $scope.userData = {};
  $scope.categories = [];
  $scope.interestselectarray = [];
  $scope.step1 = true;
  $scope.step4 = false;

  if ($sessionStorage) {

    var cookie = $sessionStorage.cookiesponzorme;

    if (cookie == undefined) {
      $scope.vieuser = 1;
    } else {
      $scope.vieuser = 0;
    }

    var typeini = $sessionStorage.typesponzorme;
    if (typeini != undefined) {
      if (typeini == '1') {
        $scope.typeuser = 0;
      } else {
        $scope.typeuser = 1;
      }
    }

    $scope.userfroups = 0;
  } else {
    $location.path("/");
  }



  $scope.emailuser = $sessionStorage.email;

  if (!$localStorage.sponzorme) {
    userRequest.oneUser($sessionStorage.id).success(function(adata) {
      var datuser = JSON.stringify(adata.data.user);
      $localStorage.sponzorme = datuser;
    });

  } else {
    var sponzormeObj = JSON.parse($localStorage.sponzorme);
  }

  categoryRequest.allCategories().success(function(adata) {
    $scope.categories = adata.categories;
    allInterestsServiceRequest.allInterestsCategoriesId().success(function(adata) {
      $scope.interests = adata.InterestCategory;
      var log = [];
      angular.forEach($scope.categories, function(value, key) {
        value.interests = $scope.interests.filter(function(el) {
          return el.category_id == value.id;
        });
      }, log);

    });
  });
  $scope.vieuser = 1;
  $scope.step1 = true;

  $scope.sendfrom = function() {
    $scope.objuser = {}
    $scope.objuser.age = $scope.userData.age;
    $scope.objuser.sex = $scope.userData.sex;
    $scope.objuser.lang = $scope.userData.lang;
    $scope.objuser.location = $scope.userData.location.reference;
    $scope.loagind = true;
    userRequest.editUserPatch($sessionStorage.id, $scope.objuser).success(function(adata) {
      if (adata.message == "Updated") {
        var datuser = JSON.stringify(adata.User);
        $localStorage.sponzorme = datuser;
        $scope.loagind = false;
        $scope.step1 = false;
        $scope.step2 = true;
        $scope.step4 = false;
      }
    });
  };

  $scope.showInterests = function(categoryid) {
    $scope.idselect = categoryid;
  };

  $scope.interestselect = function(interestselect) {

    var searcharray = $scope.interestselectarray.indexOf(interestselect);
    if (searcharray == -1) {
      $scope.interestselectarray.push(interestselect);
    } else {
      $scope.interestselectarray.splice(searcharray, 1);

    }
  };
  $scope.submitCategoryInfo = function() {
    $scope.loagind = true;
    angular.forEach($scope.interestselectarray, function(valuep, key) {
      $scope.itemintere = {};
      $scope.itemintere.interest_id = valuep;
      $scope.itemintere.user_id = $sessionStorage.id;
      userInterestRequest.createUserInterest($scope.itemintere).success(function(adata) {

      });
    });
    $scope.loagind = false;
    $scope.step1 = false;
    $scope.step2 = false;
    $scope.step4 = true;
    $localStorage.$reset();
  };
  $scope.menuprincipal = 'views/sponsors/menu.html';
});
})();
