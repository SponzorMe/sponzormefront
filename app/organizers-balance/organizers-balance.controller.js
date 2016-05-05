(function() {
  'use strict';
  function OrganizersBalanceController($scope, $translate, $localStorage, $rootScope) {
    if ($rootScope.userValidation('0')) {
      var vm = this;
      vm.openMenu = function($mdOpenMenu, $event) {
        vm.originatorEv = $event;
        $mdOpenMenu($event);
      };
      vm.user = JSON.parse($localStorage.user);
      console.log(vm.user.events);
      for (var i = 0; i < vm.user.events.length; i++) {
        vm.user.events[i].sponzorships = [];
        vm.user.events[i].raised = 0;
        for (var j = 0; j < vm.user.sponzorships_like_organizer.length; j++) {
          if (vm.user.events[i].id === vm.user.sponzorships_like_organizer[j].event.id) {
            if (vm.user.sponzorships_like_organizer[j].status > 0) {
              vm.user.events[i].sponzorships.push(vm.user.sponzorships_like_organizer[j]);
              vm.user.events[i].raised += parseFloat(vm.user.sponzorships_like_organizer[j].perk.usd);
            }
          }
        }
      }
    }
  }
  angular.module('sponzorme').controller('OrganizersBalanceController', OrganizersBalanceController);
  OrganizersBalanceController.$inject = ['$scope', '$translate', '$localStorage', '$rootScope'];
})();
