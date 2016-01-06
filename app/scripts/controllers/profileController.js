'use strict';
(function() {
  function ProfileController($scope, ngDialog, $localStorage, $location, $routeParams, userRequest, ratingRequest, $timeout, $rootScope) {
    $rootScope.closeAllDialogs();
    $scope.loading = true;
    $rootScope.showLoading();
    userRequest.oneUser($routeParams.userId).success(function(userData) {
      $scope.user = userData.data.user;
      $scope.user.rating = userData.data.rating;
      if (userData.data.user.type === '0') {
        ratingRequest.ratingsByOrganizer($routeParams.userId).success(function(ratingsData) {
          $scope.ratings = ratingsData.data.Rating;
          $scope.loading = false;
          $rootScope.closeAllDialogs();
        }).error(function(){
          $rootScope.closeAllDialogs();
          $rootScope.showDialog('error', 'problem', '/');
        });
      } else if (userData.data.user.type === '1') {
        ratingRequest.ratingsBySponzor($routeParams.userId).success(function(ratingsData) {
          $scope.ratings = ratingsData.data.Rating;
          $scope.loading = false;
          $rootScope.closeAllDialogs();
        }).error(function(){
          $rootScope.closeAllDialogs();
          $rootScope.showDialog('error', 'problem', '/');
        });
      }
      else{
        $rootScope.closeAllDialogs();
        $rootScope.showDialog('error', 'problem', '/');
      }
    }).error(function(){
      $rootScope.closeAllDialogs();
      $rootScope.showDialog('error', 'problem', '/');
    });
  }
  angular.module('sponzorme')
    .controller('ProfileController', ProfileController);
})();
