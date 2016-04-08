(function() {
  'use strict';
  function OrganizersSponzorProfileController($scope, $translate, userRequest, $localStorage, $rootScope, loginRequest, $routeParams, userInterestRequest, dialogRequest) {
    if ($rootScope.userValidation('0')) {
      var vm = this;
      dialogRequest.showLoading();
      vm.sponsor = false;
      userRequest.oneUser($routeParams.idSponsor).then(function(response){
        vm.sponsor = response.data.data;
        vm.sponsor.rating = vm.sponsor.rating || 0;
        vm.amount = 0.00;
        if(vm.sponsor.user.sponzorships){
          for (var i = 0; i < vm.sponsor.user.sponzorships.length; i++) {
            if(vm.sponsor.user.sponzorships[i].status){
              vm.amount = parseFloat(vm.amount + parseFloat(vm.sponsor.user.sponzorships[i].perk.usd));
            }
          }
        }
        dialogRequest.closeLoading();

      }, function (err){
        console.log(err);
      });
    }
  }
  angular.module('sponzorme').controller('OrganizersSponzorProfileController', OrganizersSponzorProfileController);
})();
