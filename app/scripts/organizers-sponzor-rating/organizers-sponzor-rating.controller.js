(function() {
  'use strict';

  function OrganizersSponsorRatingController($scope, $localStorage, $rootScope, ratingRequest, SPONZORSHIPSTATUSES, $routeParams, $mdDialog, $translate, dialogRequest) {
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
          vm.user.sponzorships_like_organizer[$routeParams.sponzorshipId].rated_organizer = true;
          $localStorage.user = JSON.stringify(vm.user);
          var firebaseNotification = {
            to: response.data.Rating.sponzor_id,
            text: $translate.instant('NOTIFICATIONS.SponzorRated') + vm.user.name,
            link: '#/profile/' + response.data.Rating.organizer_id
          };
          $rootScope.sendFirebaseNotification(firebaseNotification, response.data.Rating.organizer_id);
          vm.initForm();
          dialogRequest.closeLoading();
          dialogRequest.showDialog('success', 'sponzorRateSuccesfuly', '/organizers/sponzors');
          //success and redirect
          console.log(response);
        }, function errorCallback(err) {
          dialogRequest.closeLoading();
          dialogRequest.showDialog('error', 'invalidRate', false);
          //bad and stay there
          console.log(err);
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
        console.log(vm.currentSponzorship);
        vm.initForm();
      }
    }
  }

  angular.module('sponzorme')
    .controller('OrganizersSponsorRatingController', OrganizersSponsorRatingController);
})();
