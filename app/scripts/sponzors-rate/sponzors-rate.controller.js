(function() {
  'use strict';

  function SponzorsRateController($scope, $localStorage, $rootScope, ratingRequest, SPONZORSHIPSTATUSES, $routeParams, ngDialog, $mdDialog, $translate, dialogRequest) {
    if ($rootScope.userValidation('1')) {
      var vm = this;
      vm.user = JSON.parse($localStorage.user);

      vm.saveRating = function() { //Finally we save the rating information
        dialogRequest.showLoading();
        if (vm.rating.other) {
          vm.rating.question5 = 'Other: ' + vm.rating.other;
        }
        ratingRequest.createRating(vm.rating).then(function successCallback(response) {
          vm.user.sponzorships[$routeParams.sponzorshipId].ratings.push(response.data.Rating);
          vm.user.sponzorships[$routeParams.sponzorshipId].rated_sponzor = true;
          $localStorage.user = JSON.stringify(vm.user);
          var firebaseNotification = {
            to: response.data.Rating.organizer_id,
            text: $translate.instant('NOTIFICATIONS.OrganizerRated') + vm.user.name,
            link: '#/profile/' + response.data.Rating.organizer_id
          };
          $rootScope.sendFirebaseNotification(firebaseNotification, response.data.Rating.organizer_id);
          vm.initForm();
          dialogRequest.closeLoading();
          dialogRequest.showDialog('success', 'organizerRateSuccesfuly', '/sponzors/sponzoring');
          //success and redirect
          console.log(response);
        }, function errorCallback(err) {
          dialogRequest.closeLoading();
          dialogRequest.showDialog('error', 'invalidRate', false);
          //bad and stay there
          console.log(err);
        });
      };

      vm.initForm = function(){
        vm.rating = {
          organizer_id: vm.currentSponzorship.organizer.id,
          sponzor_id: $localStorage.id,
          sponzorship_id: vm.currentSponzorship.id,
          type: 1,
          question0: '',
          question1: '',
          question2: '',
          question3: '',
          question4: '',
          question5: '',
          question6: '',
          question7: '',
          question8: '',
          question9: '',
          question10: ''
        };
      };

      if ($routeParams.sponzorshipId) {
        vm.currentSponzorship = vm.user.sponzorships[$routeParams.sponzorshipId];
        console.log(vm.currentSponzorship);
        vm.initForm();
      }
    }
  }
  angular.module('sponzorme').controller('SponzorsRateController', SponzorsRateController);
})();
