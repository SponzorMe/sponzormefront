(function () {
  'use strict';
  function SponzorsSavedController($scope, $localStorage, $rootScope) {
    if ($rootScope.userValidation('1')) {
      var vm = this;
      vm.user = JSON.parse($localStorage.user);
      vm.events = [];
      vm.user.saved_events.filter(function (e) {
        e.event.saved_id = e.id;
        vm.events.push(e.event);
      });
    }
  }
  angular.module('sponzorme').controller('SponzorsSavedController', SponzorsSavedController);
})();
