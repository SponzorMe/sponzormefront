(function() {
  'use strict';
  function OrganizersTasksController($scope, $localStorage, $rootScope, $routeParams) {
    if ($rootScope.userValidation('0')) {
      var vm = this;
      vm.user = JSON.parse($localStorage.user);
      vm.activePerk = function (p, e) {
        for(var i=0; i< e.perks.length; i++){
          e.perks[i].active = false;
        }
        p.active = true;
      }
      console.log(vm.user.eventTasks);
      vm.currentTaskIndex = $routeParams.id;
    }
  }
  angular.module('sponzorme')
    .controller('OrganizersTasksController', OrganizersTasksController);

})();
