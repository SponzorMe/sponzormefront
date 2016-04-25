(function () {
  'use strict';
  /*This controller has two responsabilities
   First show all Events
   Second allows make a filter based on the interests*/
  function SponzorsMainController($scope, $localStorage, $rootScope, dialogRequest, $location) {
    if ($rootScope.userValidation('1')) {
      var vm = this;
      vm.events = [];
      vm.filter = [];
      vm.user = JSON.parse($localStorage.user);
      var events;

      vm.filterEvents = function () {
        vm.events = [];
        vm.events = events.filter(function (e) {
          for (var j = 0; j < vm.filter.length; j++) {
            if (
              e.title.indexOf(vm.filter[j]) > -1 ||
              e.description.indexOf(vm.filter[j]) > -1
            ) {
              return e;
            }
          }
        });
      };

      vm.filterEventsByText = function () {
        vm.events = [];
        var reg = new RegExp(vm.search, 'i');
        vm.events = events.filter(function (e) {
          if (
            
            e.title.search(reg) > -1 ||
            e.description.search(reg) > -1
          ) {
            return e;
          }
        });
      };

      vm.goEvent = function (eventId) {
        $location.path('/sponzors/event/' + eventId);
      };

      vm.filterClick = function (interest) {
        vm.filter.push(interest);
        vm.filterEvents();
      };

      vm.filterRemove = function () {
        if (vm.filter.length) {
          vm.filterEvents();
        }
        else {
          vm.restoreEvents();
        }
      };

      vm.restoreEvents = function () {
        vm.events = [];
        if ($localStorage.events) {//If events, Should ever exist events?
          events = JSON.parse($localStorage.events);
          vm.events = JSON.parse($localStorage.events);
        }
      };

      vm.restoreEvents();//Here starts the callback
    }
  }
  angular.module('sponzorme').controller('SponzorsMainController', SponzorsMainController);
})();
