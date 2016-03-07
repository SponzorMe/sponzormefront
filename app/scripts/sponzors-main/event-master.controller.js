'use strict';
(function() {
  function SponzorsEventMainController($scope, $localStorage, $rootScope, eventRequest, $location, dialogRequest) {
    if ($rootScope.userValidation('1')) {
      var vm = this;
      vm.user = JSON.parse($localStorage.user);
      console.log(vm.user);
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
            console.log(response);
            vm.user.saved_events.push(response.data.event);
            $localStorage.user = JSON.stringify(vm.user);
            dialogRequest.closeLoading();
            $location.path('/sponzors/saved');
          }, function(err){
            console.log(response);
            dialogRequest.closeLoading();
            dialogRequest.showDialog('error', 'invalidEvent', false);
          });
        }
      };
      vm.saveRemoveEvent = function(eventId, index){
        dialogRequest.showLoading();
        eventRequest.saveRemoveEvent(eventId).then(function(response){
          console.log(response);
          vm.user.saved_events.splice(index, 1);
          $localStorage.user = JSON.stringify(vm.user);
          dialogRequest.closeLoading();
          dialogRequest.showDialog('success', 'removeSuccessfully', '/sponzors/dashboard');

        }, function(err){
          console.log(err);
          dialogRequest.closeLoading();
          dialogRequest.showDialog('error', 'invalidEvent', false);
        });
      };
    }
  }
  angular.module('sponzorme').controller('SponzorsEventMainController', SponzorsEventMainController);
})();
