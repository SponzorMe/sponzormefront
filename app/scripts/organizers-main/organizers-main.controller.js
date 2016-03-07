'use strict';
(function() {
  function OrganizersMainController($scope, $translate, $localStorage, $rootScope) {


  if ($rootScope.userValidation('0')) {
    var vm = this;

    //mock
    vm.filterClick = function(id) {
      vm.filter.push(id);
    };
    vm.openSidenavLeft = function() {
      $mdSidenav('left').toggle();
    };

    vm.isOpenLeft = function() {
      var isOpen = true;
      return isOpen = $mdSidenav('left').isOpen();
    };

    vm.openMenu = function($mdOpenMenu, $event) {
      vm.originatorEv = $event;
      $mdOpenMenu($event);
    };

      vm.user = JSON.parse($localStorage.user);
      vm.user.balance = 0;
      angular.forEach(vm.user.sponzorships_like_organizer, function(value) {
        if (value.status === '1') {
          vm.user.balance = parseInt(vm.user.balance) + parseInt(value.perk.usd);
        }
      });
      if (vm.user.events) {
        vm.currentEvent = vm.user.events[0];
      }
      vm.showPerk = function(e) {
        vm.currentEvent = e;
      };
    }
  }
  angular.module('sponzorme').controller('OrganizersMainController', OrganizersMainController);
})();
