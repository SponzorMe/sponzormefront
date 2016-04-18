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
          console.log(idEvent, vm.user.sponzorships_like_organizer[i].event.id);
          if (vm.user.sponzorships_like_organizer[i].event.id === idEvent) {
            return true;
          }
        }
        return false;
      };

      vm.deleteEvent = function(eventId){
        dialogRequest.showLoading();
        var i = 0;
        var eventIndex = vm.user.events.filter(function(e){
          if(e.id === eventId){
            console.log(e, eventIndex, vm.user.events[i].id);
            console.log(vm.hasSponzorship(vm.user.events[i].id));
            return i;
          }
          else{
            i++;
          }
        });
        if (vm.hasSponzorship(eventId)) {
          dialogRequest.closeLoading();
          dialogRequest.showDialog('error', 'eventDeletingEventHasSponzorship', false);
        } else {
          console.log('antesDeBorrar', eventId);
          eventRequest.deleteEvent(eventId).then(function successCallback(response) {
            vm.user.events.splice(eventIndex, 1);
            $localStorage.user = JSON.stringify(vm.user);
            vm.user = JSON.parse($localStorage.user);
            dialogRequest.closeLoading();
            dialogRequest.showDialog('success', 'eventDeleteSuccesfully',false);
          }, function errorCallback() {
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
