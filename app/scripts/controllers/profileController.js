'use strict';
(function() {
  function ProfileController($scope, ngDialog, $localStorage, $location, $routeParams, userRequest, ratingRequest, $timeout) {
    ngDialog.closeAll();
    $scope.loading = true;
    ngDialog.open({
      template: 'views/templates/loadingDialog.html',
      showClose: false
    });
    userRequest.oneUser($routeParams.userId).success(function(userData) {
      $scope.user = userData.data.user;
      $scope.user.rating = userData.data.rating;
      if (userData.data.user.type === '0') {
        ratingRequest.ratingsByOrganizer($routeParams.userId).success(function(ratingsData) {
          $scope.ratings = ratingsData.data.Rating;
          $scope.loading = false;
          ngDialog.closeAll();
        }).error(function(){
          ngDialog.closeAll();
          $scope.message = 'problem';
          ngDialog.open({
            template: 'views/templates/errorDialog.html',
            showClose: false,
            scope: $scope
          });
          $timeout(function() {
            $location.path('/');
          }, 3000);
        });
      } else if (userData.data.user.type === '1') {
        ratingRequest.ratingsBySponzor($routeParams.userId).success(function(ratingsData) {
          $scope.ratings = ratingsData.data.Rating;
          $scope.loading = false;
          ngDialog.closeAll();
        }).error(function(){
          ngDialog.closeAll();
          $scope.message = 'problem';
          ngDialog.open({
            template: 'views/templates/errorDialog.html',
            showClose: false,
            scope: $scope
          });
          $timeout(function() {
            $location.path('/');
          }, 3000);
        });
      }
      else{
        ngDialog.closeAll();
        $scope.message = 'problem';
        ngDialog.open({
          template: 'views/templates/errorDialog.html',
          showClose: false,
          scope: $scope
        });
        $timeout(function() {
          $location.path('/');
        }, 3000);
      }
    }).error(function(){
      ngDialog.closeAll();
      $scope.message = 'problem';
      ngDialog.open({
        template: 'views/templates/errorDialog.html',
        showClose: false,
        scope: $scope
      });
      $timeout(function() {
        $location.path('/');
      }, 3000);
    });
  }
  angular.module('sponzorme')
    .controller('ProfileController', ProfileController);
})();
