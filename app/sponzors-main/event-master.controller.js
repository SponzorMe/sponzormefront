(function() {
  'use strict';
  function SponzorsEventMainController($scope, $localStorage, $rootScope, eventRequest, $location, dialogRequest) {
    if ($rootScope.userValidation('1')) {
      var vm = this;
      vm.user = JSON.parse($localStorage.user);
      vm.saveEvent = function(eventId){
        var aux = vm.user.saved_events.filter(function(e){
          if(e.event.id === eventId){
            return e;
          }
        });
        if(aux.length){
          dialogRequest.showDialog('error', 'alreadySaved', false);
        }
        else{
          dialogRequest.showLoading();
          eventRequest.saveEvent(eventId, $localStorage.id).then(function(response){
            vm.user.saved_events.push(response.data.event);
            $localStorage.user = JSON.stringify(vm.user);
            dialogRequest.closeLoading();
            $location.path('/sponzors/saved');
          }, function(err){
            dialogRequest.closeLoading();
            dialogRequest.showDialog('error', 'invalidEvent', false);
          });
        }
      };
      vm.saveRemoveEvent = function(eventId, index){
        dialogRequest.showLoading();
        eventRequest.saveRemoveEvent(eventId).then(function(response){
          vm.user.saved_events.splice(index, 1);
          $localStorage.user = JSON.stringify(vm.user);
          dialogRequest.closeLoading();
          dialogRequest.showDialog('success', 'removeSuccessfully', '/sponzors/dashboard');

        }, function(err){
          dialogRequest.closeLoading();
          dialogRequest.showDialog('error', 'invalidEvent', false);
        });
      };
    }
  }
  angular.module('sponzorme').controller('SponzorsEventMainController', SponzorsEventMainController);
  SponzorsEventMainController.$inject = ['$scope', '$localStorage', '$rootScope', 'eventRequest', '$location', 'dialogRequest'];
})();
