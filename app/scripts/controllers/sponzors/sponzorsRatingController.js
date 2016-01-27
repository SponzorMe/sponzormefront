'use strict';
(function() {
  function SponzorsRatingController($scope, $translate, userRequest, ngDialog, $rootScope, $localStorage, $routeParams, ratingRequest) {
    if ($rootScope.userValidation('1') && $routeParams.sponzorshipId) {
      $scope.section = {
        route: 'Sponzorships / Rating',
        title: 'Sponzorship Rating'
      };
      $scope.loadingForm = true; //Loading
      $scope.user = JSON.parse($localStorage.user);
      if (!$scope.user.acceptedSponzorships) {
        $scope.user.acceptedSponzorships = $scope.user.sponzorships.filter(function(e) {
          if (e.status > '0') {
            e.event.ends = new Date(e.event.ends).getTime();
            return e;
          }
        });
        $localStorage.user = JSON.stringify($scope.user);
      }
      if (($scope.user.acceptedSponzorships[$routeParams.sponzorshipId].ratings[0] &&
          $scope.user.acceptedSponzorships[$routeParams.sponzorshipId].ratings[0].sponzor_id === $localStorage.id && $scope.user.acceptedSponzorships[$routeParams.sponzorshipId].ratings[0].type === '1'
        ) || ($scope.user.acceptedSponzorships[$routeParams.sponzorshipId].ratings[1] &&
          $scope.user.acceptedSponzorships[$routeParams.sponzorshipId].ratings[1].sponzor_id === $localStorage.id && $scope.user.acceptedSponzorships[$routeParams.sponzorshipId].ratings[1].type === '1')) {
        $rootScope.showDialog('error', 'ratingAlreadyRated', 'sponzors/sponzoring');
      } else {
        $scope.rating = {
          'sponzorship_id': $scope.user.acceptedSponzorships[$routeParams.sponzorshipId].id,
          'type': 1,
          'sponzor_id': $scope.user.acceptedSponzorships[$routeParams.sponzorshipId].sponzor_id,
          'organizer_id': $scope.user.acceptedSponzorships[$routeParams.sponzorshipId].organizer_id,
          'other': ''
        };
      }
      $scope.saveRating = function() { //Finally we save the rating information
        $rootScope.showLoading();
        if ($scope.rating.other) {
          $scope.rating.question5 = 'Other: ' + $scope.rating.other;
        }
        ratingRequest.createRating($scope.rating).then(function successCallback(response) {
          $scope.user.acceptedSponzorships[$routeParams.sponzorshipId].ratings.push(response.data.Rating);
          $localStorage.user = JSON.stringify($scope.user);
          var firebaseNotification = {
            to: response.data.Rating.organizer_id,
            text: $translate.instant('NOTIFICATIONS.OrganizerRated') + $scope.user.name,
            link: '#/profile/'+response.data.Rating.organizer_id
          };
          $rootScope.sendFirebaseNotification(firebaseNotification, response.data.Rating.organizer_id);
          $scope.rating = {};
          $rootScope.closeAllDialogs(); //Close Loading
          $rootScope.showDialog('success', 'ratingSponzorSuccess', 'sponzors/sponzoring');
        }, function errorCallback(response) {
          $scope.loadingForm = false; //Loading
          $rootScope.closeAllDialogs(); //Close Loading
          $rootScope.showDialog('error', 'invalidRateInfo', false);
        });
      };
      $scope.menuprincipal = 'views/sponzors/menu.html';
    }
  }
  angular.module('sponzorme').controller('SponzorsRatingController', SponzorsRatingController);
})();
