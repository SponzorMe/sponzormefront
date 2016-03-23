'use strict';
(function() {
  function ProfileController($scope, $routeParams, userRequest, ratingRequest, $rootScope, dialogRequest) {
    dialogRequest.closeLoading();
    $scope.loading = true;
    dialogRequest.showLoading();
    userRequest.oneUser($routeParams.userId).success(function(userData) {
      $scope.user = userData.data.user;
      $scope.user.rating = userData.data.rating;
      if (userData.data.user.type === '0') {
        ratingRequest.ratingsByOrganizer($routeParams.userId).success(function(ratingsData) {
          $scope.ratings = ratingsData.data.Rating;
          $scope.loading = false;
          dialogRequest.closeLoading();
        }).error(function() {
          dialogRequest.closeLoading();
          dialogRequest.showDialog('error', 'problem', '/');
        });
      } else if (userData.data.user.type === '1') {
        ratingRequest.ratingsBySponzor($routeParams.userId).success(function(ratingsData) {
          $scope.ratings = ratingsData.data.Rating;
          $scope.loading = false;
          dialogRequest.closeLoading();
        }).error(function() {
          dialogRequest.closeLoading();
          dialogRequest.showDialog('error', 'problem', '/');
        });
      } else {
        dialogRequest.closeLoading();
        dialogRequest.showDialog('error', 'problem', '/');
      }
    }).error(function() {
      dialogRequest.closeLoading();
      dialogRequest.showDialog('error', 'problem', '/');
    });
  }
  angular.module('sponzorme').controller('ProfileController', ProfileController);
})();
