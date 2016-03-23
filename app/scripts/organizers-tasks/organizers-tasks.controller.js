(function() {
  'use strict';

  function OrganizersTasksController($scope, $localStorage, $rootScope, $routeParams, taskSponzorRequest) {
    if ($rootScope.userValidation('0')) {
      var vm = this;
      vm.user = JSON.parse($localStorage.user);
      vm.activePerk = function(p, e) {
        for (var i = 0; i < e.perks.length; i++) {
          e.perks[i].active = false;
        }
        p.active = true;
        vm.showHeader = true;
      }
      vm.changeStatus = function(t) {
        t.loading = true;
        var savedStatus = t.status;
        if (t.status === '1' || t.status === 1) {
          t.status = 0;
        } else {
          t.status = 1;
        }
        var data = {
          status: t.status
        };
        taskSponzorRequest.editTaskSponzorPatch(t.id, data).then(function successCallBack(response) {
          t.loading = false;
          $localStorage.user = JSON.stringify($scope.user);
        }, function errorCallback() {
          t.status = savedStatus;
          t.loading = false;
          dialogRequest.showDialog('error', 'errorUpdatingTaskStatus', false);
        });
      };
      vm.currentTaskIndex = $routeParams.id;
    }
  }
  angular.module('sponzorme')
    .controller('OrganizersTasksController', OrganizersTasksController);

})();
