'use strict';
(function() {
  function CustomizationController($scope, $translate, $localStorage, userRequest, allInterestsServiceRequest, categoryRequest, userInterestRequest, $location) {
    $scope.steps = [false, false, false]; //Number of steps in customization proccess
    $scope.startCustomization = function() {
      //We check if localStorage is seeted.
      if ($localStorage.email && $localStorage.id && $localStorage.newUser) {
        //We set some neccesary variables
        $scope.userData = {};
        $scope.categories = [];
        $scope.interestselectarray = [];
        $scope.email = $localStorage.email;
        $scope.id = $localStorage.id;
        $scope.newUser = $localStorage.newUser;
        //Everything is configure to show the first step
        $scope.showStep(0);
        //Get All Categories from Backend
        categoryRequest.allCategories().success(function(response) {
          $scope.categories = response.categories;
          allInterestsServiceRequest.allInterestsCategoriesId().success(function(sData) {
            $scope.interests = sData.InterestCategory;
            //Merge the interests into categories
            angular.forEach($scope.categories, function(value) {
              value.interests = $scope.interests.filter(function(element) {
                return element.category_id === value.id;
              });
            });
          });
        });
      } else {
        $localStorage.$reset();
        $location.path('/');
      }
    };
    //This function hide all steps and only shows one
    $scope.showStep = function(stepToShow) {
      $scope.steps = [false, false, false];
      $scope.steps[stepToShow] = true;
    };
    $scope.sendfrom = function() {
      $scope.objuser = {};
      $scope.objuser.age = $scope.userData.age;
      $scope.objuser.sex = $scope.userData.sex;
      $scope.objuser.lang = $scope.userData.lang;
      $scope.objuser.location = $scope.userData.location.reference;
      $scope.loagind = true;
      userRequest.editUserPatch($localStorage.id, $scope.objuser).success(function(adata) {
        if (adata.message === 'Updated') {
          $scope.showStep(1);
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
      var promises = [];
      angular.forEach($scope.interestselectarray, function(valuep) {
        $scope.currentInterest = {
          interest_id: valuep,
          user_id: $localStorage.id
        };
        promises.push(userInterestRequest.createUserInterest($scope.currentInterest));
      });
      promises[$scope.interestselectarray.length - 1].success(function(data) {
        $scope.showStep(2);
      });
    };
    $scope.startCustomization();
  }
  angular.module('sponzorme').controller('CustomizationController', CustomizationController);
})();
