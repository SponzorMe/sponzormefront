'use strict';
(function() {
  function OrganizersMainController($scope, $translate, $localStorage, $rootScope, $location, dialogRequest, eventRequest) {

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

      vm.shareEvent = function(eventIndex){
        //something to do
      };

      vm.hasSponzorship = function(idEvent) {
        for (var i = 0; i < vm.user.sponzorships_like_organizer.length; i++) {
          if (vm.user.sponzorships_like_organizer[i].event.id === idEvent) {
            return true;
          }
        }
        return false;
      };

      vm.deleteEvent = function(eventId){
        dialogRequest.showLoading();
        if (vm.hasSponzorship(eventId)) {
          dialogRequest.closeLoading();
          dialogRequest.showDialog('error', 'eventDeletingEventHasSponzorship', false);
        } else {
          eventRequest.deleteEvent(eventId).then(function successCallback(response) {
            var aux = vm.user.events.filter(function(e){
              if(e.id!==eventId){
                return e;
              }
            });
            vm.user.events = [];
            vm.user.events = aux;
            $localStorage.user = JSON.stringify(vm.user);
            dialogRequest.closeLoading();
            dialogRequest.showDialog('success', 'eventDeleteSuccesfully',false);
          }, function errorCallback(err) {
            dialogRequest.closeLoading();
            dialogRequest.showDialog('error', 'errorDeletingEvent', false);
          });
        }
      };

      vm.toEdit = function(eventId){
        $location.path('/organizers/event/'+eventId);
      };

      vm.todayDate = new Date().getTime();
      vm.user = JSON.parse($localStorage.user);
      vm.user.balance = 0;
      angular.forEach(vm.user.sponzorships_like_organizer, function(value) {
        if (value.status === '1') {
          vm.user.balance = parseInt(vm.user.balance) + parseInt(value.perk.usd);
        }
      });
    }
  }
  angular.module('sponzorme').controller('OrganizersMainController', OrganizersMainController);
})();
