'use strict';
(function() {
  function OrganizersEventEditController($scope, $translate, $localStorage, eventTypeRequest, eventRequest, ngDialog, categoryRequest, perkRequest, perkTaskRequest, $location, $rootScope, $routeParams) {
    if($rootScope.userValidation('0')){
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
      //this function get the event data and put it in the form.
      $scope.formEditEvent = function(idevent) {        
        $scope.eventData = $scope.user.events[idevent];
      };
      $scope.doEditEvent = function(idevent) {
        $rootScope.showLoading();
        angular.forEach($scope.eventData.perks, function(value) {
          if (value.id === -1) { //If new perk was added we insert that
            $scope.perkitems = {};
            $scope.perkitems.kind = value.kind;
            $scope.perkitems.total_quantity = value.total_quantity;
            $scope.perkitems.reserved_quantity = 0;
            $scope.perkitems.usd = value.usd;
            $scope.perkitems.id_event = idevent;
            perkRequest.createPerk($scope.perkitems).success(function() {}).error(function(edata) {


            });
          } else { //If no perk was added just we edit the fields
            $scope.perkitems = value;
            perkRequest.editPerkPatch(value.id, $scope.perkitems).success(function() {
              /*empty Code, nothing necessary here*/
            }).error(function(eData) {


            });
          }
        });
        //Next we edit the event information
        $scope.eventData.starts = moment($scope.eventData.starts).format('YYYY-MM-DD HH:mm:ss');
        $scope.eventData.ends = moment($scope.eventData.ends).format('YYYY-MM-DD HH:mm:ss');
        eventRequest.editEventPatch(idevent, $scope.eventData).success(function() {
          $rootScope.closeAllDialogs();
          $rootScope.showDialog('success', 'eventEditedSuccesfully', false);
        }).error(function(edata) {
          $rootScope.showDialog('error', 'eventNoEdited', false);
        });
      };
      $scope.saveperks = function() {
        $scope.perkitems = {};
        $scope.perkitems.kind = $scope.perkskind;
        $scope.perkitems.total_quantity = $scope.perksquantity;
        $scope.perkitems.usd = $scope.perksusd;
        $scope.perkitems.id_event = $scope.perksevents;
        perkRequest.createPerk($scope.perkitems).success(function(pdata) {
          this.push(pdata);
        });
      };
      $scope.addEditPerk = function() {
        $scope.eventData.perks.push({
          kind: '',
          usd: 0,
          quantity: 1
        });
      };
      $scope.removeEditPerk = function(index) {
        $scope.eventData.perks.splice(index, 1);
      };
      $scope.formEditEvent($routeParams.id); //Here start the callback
      $scope.menuprincipal = 'views/organizers/menu.html';
    }
  }
  angular.module('sponzorme')
    .controller('OrganizersEventEditController', OrganizersEventEditController);

})();
