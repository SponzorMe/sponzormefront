'use strict';
(function() {
  function OrganizersEventEditController($scope, $translate, $localStorage, eventTypeRequest, eventRequest, categoryRequest, $rootScope, $routeParams, dialogRequest) {
    if ($rootScope.userValidation('0')) {
      var vm = this;
      vm.setEventData = function() {
        if (!$localStorage.eventTypes) {
          eventTypeRequest.allEventTypes().then(function successCallback1(response) {
            $localStorage.eventTypes = JSON.stringify(response.data.eventTypes);
            vm.eventTypes = response.data.eventTypes;
          });
        } else {
          vm.eventTypes = JSON.parse($localStorage.eventTypes);
        }
        if (!$localStorage.categories) {
          categoryRequest.allCategories().then(function successCallback2(response) {
            $localStorage.categories = JSON.stringify(response.data.categories);
            vm.categories = response.data.categories;
          });
        } else {
          vm.categories = JSON.parse($localStorage.categories);
        }
      }
      vm.user = JSON.parse($localStorage.user);
      vm.setEventData();
      vm.event = vm.user.events[$routeParams.eventId];
      vm.event.starts = new Date(vm.event.starts);
      vm.doEditEvent = function(idevent) {
        dialogRequest.showLoading();
        vm.eventData.organizer = $localStorage.id;
        if (vm.eventData.location !== vm.locationEvent) {
          vm.eventData.location = vm.locationEvent.formatted_address;
          vm.eventData.location_reference = vm.locationEvent.place_id;
        }
        vm.eventData.organizer = $localStorage.id;
        eventRequest.editEventPut(idevent, vm.eventData).then(function successCallback(response) {
          vm.user.events[$routeParams.id] = response.data.event;
          $localStorage.user = JSON.stringify(vm.user);
          dialogRequest.closeLoading();
          dialogRequest.showDialog('success', 'eventEditedSuccesfully', false);
        }, function errorCallback(response) {
          dialogRequest.closeLoading();
          dialogRequest.showDialog('error', 'eventNoEdited', false);
        });
      };
      vm.addPerk = function() {
        vm.eventData.perks.push({
          kind: '',
          usd: 0,
          total_quantity: 1,
          reserved_quantity: 0
        });
      };
      vm.removePerk = function(index) {
        vm.eventData.perks.splice(index, 1);
      };
    }
  }
  angular.module('sponzorme').controller('OrganizersEventEditController', OrganizersEventEditController);
})();
