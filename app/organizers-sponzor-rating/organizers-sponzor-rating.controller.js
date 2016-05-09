(function() {
  'use strict';
  function OrganizersSponsorRatingController($scope, $localStorage, $rootScope, ratingRequest, $routeParams, $translate, dialogRequest, firebaseRequest) {
    if ($rootScope.userValidation('0')) {
      var vm = this;
      vm.user = JSON.parse($localStorage.user);
      vm.saveRating = function() { //Finally we save the rating information
        dialogRequest.showLoading();
        if (vm.rating.other) {
          vm.rating.question5 = 'Other: ' + vm.rating.other;
        }
        ratingRequest.createRating(vm.rating).then(function successCallback(response) {
          vm.user.sponzorships_like_organizer[$routeParams.sponzorshipId].ratings.push(response.data.Rating);
          vm.user.sponzorships_like_organizer[$routeParams.sponzorshipId].rated_organizer = '1';
          $localStorage.user = JSON.stringify(vm.user);
          $localStorage.$apply();
          dialogRequest.closeLoading();
          dialogRequest.showDialog('success', 'sponzorRatedSuccesfuly', '/organizers/sponzors');

          var firebaseNotification = {
            to: response.data.Rating.sponzor_id,
            text: $translate.instant('NOTIFICATIONS.SponzorRated') + vm.user.name,
            link: '#/profile/' + response.data.Rating.organizer_id
          };
          firebaseRequest.sendNotification(firebaseNotification, response.data.Rating.sponzor_id);
          
        }, function errorCallback() {
          dialogRequest.closeLoading();
          dialogRequest.showDialog('error', 'invalidRate', false);
        });
      };

      vm.initForm = function() {
        vm.rating = {
          organizer_id: $localStorage.id,
          sponzor_id: vm.currentSponzorship.sponzor.id,
          sponzorship_id: vm.currentSponzorship.id,
          type: 0,
          question0: '',
          question1: '',
          question2: '',
          question3: '',
          question4: '',
          question5: '',
          question6: ''
        };
      };

      if ($routeParams.sponzorshipId) {
        vm.currentSponzorship = vm.user.sponzorships_like_organizer[$routeParams.sponzorshipId];
        vm.initForm();
      }
    }
  }

  angular.module('sponzorme').controller('OrganizersSponsorRatingController', OrganizersSponsorRatingController);
  OrganizersSponsorRatingController.$inject = ['$scope', '$localStorage', '$rootScope', 'ratingRequest', '$routeParams', '$translate', 'dialogRequest', 'firebaseRequest'];
})();
