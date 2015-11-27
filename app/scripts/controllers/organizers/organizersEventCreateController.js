'use strict';
(function() {
  function OrganizersEventCreateController($scope, $translate, $localStorage, eventTypeRequest, eventRequest, ngDialog, categoryRequest, userRequest, perkRequest, imgurRequest, $rootScope, $routeParams) {

    //Use This Zone to Vars Initialization
    $rootScope.userValidation('0'); //Validation
    $scope.tolsctive = 'active';
    $scope.sponzorshipTypes = [];
    $scope.newEvent = {};
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
    //End vars Initialization

    $scope.verifyPerkLimit = function(s) {
      if (s.usd > 200 || typeof s.usd === 'undefined') {
        s.usd = 200;
        $scope.message = 'maxLimitPerk';
        ngDialog.open({
          template: 'views/templates/errorDialog.html',
          showClose: false,
          scope: $scope
        });
      }
    };

    //This function creates an event
    $scope.createNewEvent = function() {
      $scope.newEvent.title = $scope.titleevent;
      $scope.newEvent.location = $scope.locationevent.formatted_address;
      $scope.newEvent.location_reference = $scope.locationevent.place_id;
      $scope.newEvent.description = $scope.descriptionevent;
      $scope.newEvent.starts = moment($scope.dtini).format('YYYY-MM-DD hh:mm:ss');
      $scope.newEvent.ends = moment($scope.dtfinal).format('YYYY-MM-DD hh:mm:ss');
      $scope.newEvent.lang = idiomaselect;
      $scope.newEvent.type = $scope.typeevent;
      $scope.newEvent.category = $scope.categoryevent;
      $scope.newEvent.privacy = $scope.privacyevent;
      $scope.newEvent.organizer = $localStorage.id;
      eventRequest.createEvent($scope.newEvent).success(function(adata) {
        angular.forEach($scope.sponzorshipTypes, function(value) {
          $scope.perkitems = {};
          $scope.perkitems.kind = value.kind;
          $scope.perkitems.total_quantity = value.quantity;
          $scope.perkitems.usd = value.usd;
          $scope.perkitems.id_event = adata.event.id;
          $scope.perkitems.reserved_quantity = 0;
          perkRequest.createPerk($scope.perkitems).success(function() {});
        });
        //Clean the from
        $scope.titleevent = '';
        $scope.locationevent = {};
        $scope.descriptionevent = '';
        $scope.dtini = '';
        $scope.dtfinal = '';
        $scope.typeevent = '';
        $scope.categoryevent = '';
        $scope.privacyevent = '';
        $scope.sponzorshipTypes = [];
        ngDialog.closeAll();
        $scope.message = 'eventCreatedSuccesfully';
        ngDialog.open({
          template: 'views/templates/successDialog.html',
          showClose: false,
          scope: $scope
        });
      }).error(function(edata) {
        ngDialog.closeAll();
        $scope.message = 'errorCreatingEvent';
        ngDialog.open({
          template: 'views/templates/errorDialog.html',
          showClose: false,
          scope: $scope
        });
      });
    };

    //this function upload or create the event Image
    $scope.imageVerification = function() {
      ngDialog.open({
        template: 'views/templates/loadingDialog.html',
        showClose: false
      });
      $scope.loadingNewEvent = true;
      $scope.errorNewEvent = false;
      $scope.newEvent = {};
      if ($scope.file) {
        var params = {
          image: $scope.file.base64,
          type: 'base64'
        };
        imgurRequest.uploadImage(params).success(function(imageData) {
          $scope.newEvent.image = imageData.data.link;
          $scope.createNewEvent();
        }).error(function() {
          ngDialog.closeAll();
          $scope.message = 'InvalidImage';
          ngDialog.open({
            template: 'views/templates/errorDialog.html',
            showClose: false,
            scope: $scope
          });
        });
      } else {
        //If no Image we set here some image
        $scope.newEvent.image = 'https://lh6.googleusercontent.com/-tPiuqhhZ5YM/UwpwKcmnmHI/AAAAAAAABuA/NB2UukRdRg0/w500-h375-no/nohayfoto.png';
        $scope.createNewEvent();
      }
    };

    //this function adds a SponzorshipType to the new event form
    $scope.addSponzorshipType = function() {
      $scope.sponzorshipTypes.push({
        kind: '',
        usd: 0,
        quantity: 1,
        id: -1
      });
    };

    //this function removes a SponzorshipType to the new event form
    $scope.removeSponzorshipType = function(index) {
      $scope.sponzorshipTypes.splice(index, 1);
    };

    //this function expand and compress the left menu
    $scope.toggleSidebar = function() {
      $scope.tolsctive = !$scope.tolsctive;
      if ($scope.tolsctive === true) {
        $scope.tolsctive = 'active';
      }
    };
    $translate.use(idiomaselect);
    $scope.menuprincipal = 'views/organizers/menu.html';
  }

  angular.module('sponzorme')
    .controller('OrganizersEventCreateController', OrganizersEventCreateController);

})();
