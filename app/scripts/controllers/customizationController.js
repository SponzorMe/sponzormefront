'use strict';
(function() {
  function CustomizationController($scope, $translate, $localStorage, userRequest, allInterestsServiceRequest, categoryRequest, userInterestRequest, $location, $rootScope) {
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
        categoryRequest.allCategories().then(function successCallback(response) {
          $scope.categories = response.data.categories;
        }, function errorCallback(err){
          $scope.categories = [];
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
      $rootScope.showLoading();
      $scope.objuser = {};
      $scope.objuser.age = $scope.userData.age;
      $scope.objuser.sex = $scope.userData.sex;
      $scope.objuser.lang = $scope.userData.lang;
      $scope.objuser.location = $scope.userData.location.formatted_address;
      $scope.objuser.location_reference = $scope.userData.location.reference;
      $scope.objuser.image = 'https://s3-us-west-2.amazonaws.com/sponzormewebappimages/user_default.jpg';
      $scope.loagind = true;
      userRequest.editUserPatch($localStorage.id, $scope.objuser).success(function(adata) {
        if (adata.message === 'Updated') {
          $scope.showStep(1);
        }
        $rootScope.closeAllDialogs();
      });
    };
    $scope.showInterests = function(categoryid) {
      $scope.idselect = categoryid;
    };
    $scope.interestselect = function(i) {
      var searcharray = $scope.interestselectarray.indexOf(i);
      if (searcharray === -1) {
        var interest = {'user_id': $localStorage.id, 'interest_id':i};
        $scope.interestselectarray.push(interest);
      }
      else {
        $scope.interestselectarray.splice(searcharray, 1);
      }
    };
    $scope.submitCategoryInfo = function() {
      $rootScope.showLoading();
      var data = {interests: $scope.interestselectarray};
      userInterestRequest.bulkUserInterest(data).then(function successCallback(response){
        $rootScope.closeAllDialogs();
        $scope.showStep(2);
      });
    };
    $scope.startCustomization();
  }
  angular.module('sponzorme').controller('CustomizationController', CustomizationController);
})();
