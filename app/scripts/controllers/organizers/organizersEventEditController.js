'use strict';
(function() {
  function OrganizersEventEditController($scope, $translate, $localStorage, eventTypeRequest, eventRequest, ngDialog, categoryRequest, perkRequest, perkTaskRequest, $location, $rootScope, $routeParams) {
    $rootScope.userValidation('0'); //Validation
    $scope.tolsctive = 'active';
    $scope.loading = true;
    ngDialog.open({template: 'views/templates/loadingDialog.html', showClose: false});
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
    $scope.verifyPerkLimit = function(s){
      if(s.usd>200 || typeof s.usd === "undefined"){
        s.usd = 200;
        $scope.message = 'maxLimitPerk';
        ngDialog.open({
          template: 'views/templates/errorDialog.html',
          showClose: false,
          scope: $scope
        });
      }
    };
    //this function get the event data and put it in the form.
    $scope.formEditEvent = function(idevent) {
      $scope.eventData = {};
      eventRequest.oneEvent(idevent).success(function(adata) {
        $scope.eventData = adata.data.event;
        $scope.eventData.category = adata.data.category[0].id;
        $scope.eventData.type = adata.data.type[0].id;
        $scope.eventData.starts = new Date($scope.eventData.starts);
        $scope.eventData.ends = new Date($scope.eventData.ends);
        $scope.loading = false;
        ngDialog.closeAll();
      }).error(function() {
        ngDialog.closeAll();
        $scope.message = 'errorNotEventInfoGot';
        ngDialog.open({
          template: 'views/templates/errorDialog.html',
          showClose: false,
          scope: $scope
        });
      });
    };
    $scope.doEditEvent = function(idevent) {
      ngDialog.open({template: 'views/templates/loadingDialog.html', showClose: false});
      angular.forEach($scope.eventData.perks, function(value) {
        if (value.id === -1) { //If new perk was added we insert that
          $scope.perkitems = {};
          $scope.perkitems.kind = value.kind;
          $scope.perkitems.total_quantity = value.total_quantity;
          $scope.perkitems.reserved_quantity = 0;
          $scope.perkitems.usd = value.usd;
          $scope.perkitems.id_event = idevent;
          perkRequest.createPerk($scope.perkitems).success(function() {}).error(function(edata) {
            console.log('Error creating a perk');
            console.log(edata);
          });
        } else { //If no perk was added just we edit the fields
          $scope.perkitems = value;
          perkRequest.editPerkPatch(value.id, $scope.perkitems).success(function() {
            /*empty Code, nothing necessary here*/
          }).error(function(eData) {
            console.log('Error editing a perk');
            console.log(eData);
          });
        }
      });
      //Next we edit the event information
      $scope.eventData.starts = moment($scope.eventData.starts).format('YYYY-MM-DD hh:mm:ss');
      $scope.eventData.ends = moment($scope.eventData.ends).format('YYYY-MM-DD hh:mm:ss');
      eventRequest.editEventPatch(idevent, $scope.eventData).success(function() {
        ngDialog.closeAll();
        $scope.message = 'eventEditedSuccesfully';
        ngDialog.open({
          template: 'views/templates/successDialog.html',
          showClose: false,
          scope: $scope
        });
      }).error(function(edata) {
        console.log('Error editing an event');
        console.log(edata);
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
    $scope.toggleSidebar = function() {
      $scope.tolsctive = !$scope.tolsctive;
      if ($scope.tolsctive === true) {
        $scope.tolsctive = 'active';
      }
    };
    $scope.formEditEvent($routeParams.id); //Here start the callback
    $translate.use(idiomaselect);
    $scope.menuprincipal = 'views/organizers/menu.html';
  }

  angular.module('sponzorme')
    .controller('OrganizersEventEditController', OrganizersEventEditController);

})();
