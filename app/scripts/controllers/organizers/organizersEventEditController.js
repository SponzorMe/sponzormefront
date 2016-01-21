'use strict';
(function() {
  function OrganizersEventEditController($scope, $translate, $localStorage, eventTypeRequest, eventRequest, ngDialog, categoryRequest, perkRequest, perkTaskRequest, $location, $rootScope, $routeParams) {
    if($rootScope.userValidation('0')){
      $scope.section = {
        route:'Events / Edit',
        title: 'Event Edit'
      };
      $scope.user = JSON.parse($localStorage.user);
      eventTypeRequest.allEventTypes().success(function(adata) {
        $scope.type = {};
        $scope.type.list = adata.eventTypes;
        $scope.typefilter = adata.eventTypes;
      });
      $scope.categorias = {};
      categoryRequest.allCategories().success(function(adata) {
        $scope.categorias.list = adata.categories;
        $scope.categoriasfilter = adata.categories;
      });
      $scope.verifyPerkLimit = function(s) {
        if (s.usd > 200 || typeof s.usd === 'undefined') {
          s.usd = 200;
          $rootScope.showDialog('error', 'maxLimitPerk', false);
        }
      };
      $scope.doEditEvent = function(idevent) {
        $rootScope.showLoading();
        $scope.eventData.organizer = $localStorage.id;
        if($scope.eventData.location!==$scope.locationEvent){
          $scope.eventData.location = $scope.locationEvent.formatted_address;
          $scope.eventData.location_reference = $scope.locationEvent.place_id;
        }
        $scope.eventData.organizer = $localStorage.id;
        $scope.eventData.starts = moment($scope.eventData.starts).format('YYYY-MM-DD HH:mm:ss');
        $scope.eventData.ends = moment($scope.eventData.ends).format('YYYY-MM-DD HH:mm:ss');
        eventRequest.editEventPut(idevent, $scope.eventData).then(function successCallback(response) {
          $scope.user.events[$routeParams.id] = response.data.event;
          $localStorage.user = JSON.stringify($scope.user);
          $rootScope.closeAllDialogs();
          $rootScope.showDialog('success', 'eventEditedSuccesfully', false);
        }, function errorCallback(response) {
          $rootScope.closeAllDialogs();
          $rootScope.showDialog('error', 'eventNoEdited', false);
        });
      };
      $scope.addPerk = function() {
        $scope.eventData.perks.push({
          kind: '',
          usd: 0,
          total_quantity: 1,
          reserved_quantity: 0
        });
      };
      $scope.removePerk = function(index) {
        $scope.eventData.perks.splice(index, 1);
      };
      $scope.eventData = {};
      $scope.eventData = $scope.user.events[$routeParams.id];
      $scope.eventData.starts = new Date($scope.eventData.starts).getTime();
      $scope.eventData.ends = new Date($scope.eventData.ends).getTime();
      $scope.menuprincipal = 'views/organizers/menu.html';
    }
  }
  angular.module('sponzorme').controller('OrganizersEventEditController', OrganizersEventEditController);
})();
