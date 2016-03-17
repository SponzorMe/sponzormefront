(function() {
  'use strict';
  function OrganizersTasksController($scope, $localStorage, $rootScope, $routeParams) {
    if ($rootScope.userValidation('0')) {
      var vm = this;
      vm.user = JSON.parse($localStorage.user);
      vm.regenerateTasks = function () {
        vm.tasks = [];
        for (var i = 0; i < vm.user.sponzorships_like_organizer.length; i++) {
          for (var j = 0; j < vm.user.events.length; j++) {
            if(vm.user.sponzorships_like_organizer[i].event.id == vm.user.events[j].id){
              vm.user.sponzorships_like_organizer[i].event = vm.user.events[j];
              console.log(vm.user.sponzorships_like_organizer[i]);
            }
          }
        }
      };
      vm.activePerk = function (p, e) {
        for(var i=0; i< e.perks.length; i++){
          e.perks[i].active = false;
        }
        p.active = true;
      }
      vm.regenerateTasks();
      vm.currentTaskIndex = $routeParams.id;
    }
  }
  angular.module('sponzorme')
    .controller('OrganizersTasksController', OrganizersTasksController);

})();
