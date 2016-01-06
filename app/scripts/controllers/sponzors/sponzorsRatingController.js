'use strict';
(function() {

  function SponzorsRatingController($scope, $translate, userRequest, ngDialog, $location, $rootScope, $localStorage, $routeParams, sponzorshipRequest, ratingRequest, $timeout) {
    if ($rootScope.userValidation('1') && $routeParams.sponzorshipId) {
      $scope.loadingForm = true; //Loading
      $rootScope.showLoading();
      //First we validate this sponzorship does not have rating from this sponzor
      //
      //Then we get the sponzorship information
      sponzorshipRequest.oneSponzorship($routeParams.sponzorshipId).success(function(sData) {
        ratingRequest.ratingBySponzorship($routeParams.sponzorshipId, 1).success(function(s2Data) {
          $scope.loadingForm = false; //Loading
          $rootScope.closeAllDialogs(); //Close Loading
          if (s2Data.data.Rating[0] && s2Data.data.Rating[0].sponzor_id === $localStorage.id) {
            $rootScope.showDialog('error', 'ratingAlreadyRated', '/sponzors/sponzoring');
          } else {
            $scope.sponzorship = sData.data;
            $scope.rating = {
              'sponzorship_id': sData.data.SponzorEvent.id,
              'type': 1,
              'sponzor_id': sData.data.Sponzor.id,
              'organizer_id': sData.data.Organizer.id,
              'other': ''
            };
          }
        });
      }).error(function(eData) {
        $scope.loadingForm = false; //Loading
        $rootScope.closeAllDialogs(); //Close Loading
        $rootScope.showDialog('error', 'requestedSponzorshipNoExist', false);
      });
      $scope.saveRating = function() { //Finally we save the rating information
        $rootScope.showLoading();
        if ($scope.rating.other) {
          $scope.rating.question9 = 'Other: ' + $scope.rating.other;
        }
        ratingRequest.createRating($scope.rating).success(function(sData) {
          $rootScope.showDialog('success', 'ratingSponzorSuccess', '/sponzors/sponzoring');
        }).error(function(eData) {
          $scope.loadingForm = false; //Loading
          $rootScope.closeAllDialogs(); //Close Loading
          $rootScope.showDialog('error', 'invalidRateInfo', false);
        });
      };
      $scope.tolsctive = 'active';
      $scope.toggleSidebar = function() {
        $scope.tolsctive = !$scope.tolsctive;
        if ($scope.tolsctive === true) {
          $scope.tolsctive = 'active';
        }
      };
      $scope.menuprincipal = 'views/sponzors/menu.html';
    }
  }

  angular.module('sponzorme')
    .controller('SponzorsRatingController', SponzorsRatingController);

})();
