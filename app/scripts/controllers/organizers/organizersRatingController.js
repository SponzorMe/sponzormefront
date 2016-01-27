'use strict';
(function() {
  function OrganizersRatingController($scope, $translate, $rootScope, $localStorage, $routeParams, ratingRequest) {
    if ($rootScope.userValidation('0') && $routeParams.sponzorshipId) {
      $scope.section = {
        route: 'Sponzorships / Rating',
        title: 'Sponzorship Rating'
      };
      $scope.loadingForm = true; //Loading
      $scope.user = JSON.parse($localStorage.user);
      if (($scope.user.sponzorships_like_organizer[$routeParams.sponzorshipId].ratings[0] &&
          $scope.user.sponzorships_like_organizer[$routeParams.sponzorshipId].ratings[0].organizer_id === $localStorage.id && $scope.user.sponzorships_like_organizer[$routeParams.sponzorshipId].ratings[0].type === '0'
        ) || ($scope.user.sponzorships_like_organizer[$routeParams.sponzorshipId].ratings[1] &&
          $scope.user.sponzorships_like_organizer[$routeParams.sponzorshipId].ratings[1].organizer_id === $localStorage.id && $scope.user.sponzorships_like_organizer[$routeParams.sponzorshipId].ratings[1].type === '0')) {
        $rootScope.showDialog('error', 'ratingAlreadyRated', '/organizers/sponzors');
      } else {
        $scope.rating = {
          'sponzorship_id': $scope.user.sponzorships_like_organizer[$routeParams.sponzorshipId].id,
          'type': 0,
          'sponzor_id': $scope.user.sponzorships_like_organizer[$routeParams.sponzorshipId].sponzor_id,
          'organizer_id': $scope.user.sponzorships_like_organizer[$routeParams.sponzorshipId].organizer_id,
          'other': ''
        };
      }

      $scope.saveRating = function() { //Finally we save the rating information
        $rootScope.showLoading();
        if ($scope.rating.other) {
          $scope.rating.question5 = 'Other: ' + $scope.rating.other;
        }
        ratingRequest.createRating($scope.rating).then(function successCallback(response) {
          $scope.user.sponzorships_like_organizer[$routeParams.sponzorshipId].ratings.push(response.data.Rating);
          $localStorage.user = JSON.stringify($scope.user);
          var firebaseNotification = {
            to: response.data.Rating.sponzor_id,
            text: $translate.instant('NOTIFICATIONS.SponzorRated') + $scope.user.name,
            link: '#/profile/'+response.data.Rating.sponzor_id
          };
          $rootScope.sendFirebaseNotification(firebaseNotification, response.data.Rating.sponzor_id);
          $scope.rating = {};
          $rootScope.closeAllDialogs(); //Close Loading
          $rootScope.showDialog('success', 'ratingOrganizerSuccess', '/organizers/sponzors');
        }, function errorCallback(response) {
          $scope.loadingForm = false; //Loading
          $rootScope.closeAllDialogs(); //Close Loading
          $rootScope.showDialog('error', 'invalidRateInfo', false);
        });
      };
      $scope.menuprincipal = 'views/organizers/menu.html';
    }
  }

  angular.module('sponzorme')
    .controller('OrganizersRatingController', OrganizersRatingController);

})();
