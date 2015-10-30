'use strict';
(function(){

function OrganizersCustomizationController($scope, $translate, $localStorage, usSpinnerService, userRequest, allInterestsServiceRequest, categoryRequest, userInterestRequest, $location) {

  $scope.loadinglistsponzors = true;
  $scope.userData = {};
  $scope.categories = [];
  $scope.interestselectarray = [];
  $scope.step1 = true;
  $scope.step4 = false;
  $scope.$storage = $localStorage;
  $scope.email = $localStorage.email;
  $scope.id = $localStorage.id;
  $scope.newUser = $localStorage.newUser;
  categoryRequest.allCategories().success(function(adata) {
    $scope.categories = adata.categories;
    allInterestsServiceRequest.allInterestsCategoriesId().success(function(sData) {
      $scope.interests = sData.InterestCategory;
      var log = [];
      angular.forEach($scope.categories, function(value) {
        value.interests = $scope.interests.filter(function(el) {
          return el.category_id === value.id;
        });
      }, log);

    });
  });
  $scope.sendfrom = function() {
    $scope.objuser = {};
    $scope.objuser.age = $scope.userData.age;
    $scope.objuser.sex = $scope.userData.sex;
    $scope.objuser.lang = $scope.userData.lang;
    $scope.objuser.location = $scope.userData.location.reference;
    $scope.loagind = true;
    userRequest.editUserPatch($localStorage.id, $scope.objuser).success(function(adata) {
      if (adata.message === 'Updated') {
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
    if (searcharray === -1) {
      $scope.interestselectarray.push(interestselect);
    } else {
      $scope.interestselectarray.splice(searcharray, 1);

    }
  };
  $scope.submitCategoryInfo = function() {
    $scope.loagind = true;
    angular.forEach($scope.interestselectarray, function(valuep) {
      $scope.itemintere = {};
      $scope.itemintere.interest_id = valuep;
      $scope.itemintere.user_id = $localStorage.id;
      userInterestRequest.createUserInterest($scope.itemintere).success(function() {
          $localStorage.$reset();
      });
    });
    $scope.loagind = false;
    $scope.step1 = false;
    $scope.step2 = false;
    $scope.step4 = true;
  };
}

angular.module('sponzorme')
.controller('OrganizersCustomizationController', OrganizersCustomizationController);

})();
