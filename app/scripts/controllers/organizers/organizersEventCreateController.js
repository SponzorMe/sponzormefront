'use strict';
(function() {

  function OrganizersEventCreateController($scope, $translate, $localStorage, eventTypeRequest, eventRequest, ngDialog, categoryRequest, userRequest, perkRequest, $rootScope, $routeParams, eventbriteRequest) {
    //Function to parse JSON strings in JSON objects
    function jsonize(str) {
      return str.replace(/([\$\w]+)\s*:/g, function(_, $1) {
        return '"' + $1 + '":';
      }).replace(/'([^']+)'/g, function(_, $1) {
        return '"' + $1 + '"';
      });
    }

    //Use This Zone to Vars Initialization
    $rootScope.userValidation('0'); //Validation
    $translate.use(idiomaselect);
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

    //This function very no perks over 200USD
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
      $scope.newEvent.starts = moment($scope.dtini).format('YYYY-MM-DD HH:mm:ss');
      $scope.newEvent.ends = moment($scope.dtfinal).format('YYYY-MM-DD HH:mm:ss');
      //$scope.newEvent.starts = new Date($scope.dtini);
      //$scope.newEvent.ends = new Date($scope.dtfinal);
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
        $scope.creds = {
          bucket: $rootScope.getConstants().AMAZONBUCKET,
          access_key: $rootScope.getConstants().AMAZONKEY,
          secret_key: $rootScope.getConstants().AMAZONSECRET
        };
        AWS.config.update({
          accessKeyId: $scope.creds.access_key,
          secretAccessKey: $scope.creds.secret_key
        });
        AWS.config.region = $rootScope.getConstants().AMAZONBUCKETREGION;
        var bucket = new AWS.S3({
          params: {
            Bucket: $scope.creds.bucket
          }
        });
        // Prepend Unique String To Prevent Overwrites
        var uniqueFileName = btoa($rootScope.uniqueString() + new Date().getTime() + $rootScope.uniqueString()).replace('=', $rootScope.uniqueString()) + '.' + $rootScope.getExtension($scope.file.name);
        var params = {
          Key: uniqueFileName,
          ContentType: $scope.file.type,
          Body: $scope.file,
          ServerSideEncryption: 'AES256'
        };
        bucket.putObject(params, function(err, data) {
          if (!err) {
            $scope.newEvent.image = $rootScope.getConstants().AMAZONBUCKETURL + uniqueFileName;
            $scope.createNewEvent();
          }
        });
      } else {
        //If no Image we set here some image
        $scope.newEvent.image = 'https://s3-us-west-2.amazonaws.com/sponzormewebappimages/event_default.jpg';
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

    if ($routeParams.eventBriteCode) {
      eventbriteRequest.getEventbriteAuth($routeParams.eventBriteCode).success(function(data) {
        var response = JSON.parse(jsonize(data.response));
        if (response.error) {
          $scope.loadingGetToken = false;
          $scope.reconnectEventbrite = true;
          $scope.conectionDone = false;
        } else {
          $localStorage.eventBriteBeared = response.access_token;
          $scope.connectEventbrite();
        }
      });
    } else if ($routeParams.meetupCode) {

      eventbriteRequest.getMeetupAuth($routeParams.meetupCode).success(function(data) {
        var response = JSON.parse(jsonize(data.response));
        if (response.error) {

          $scope.meetupLoadingGetToken = false;
          $scope.reconnectMeetup = true;
          $scope.meetupConectionDone = false;
        } else {
          $localStorage.meetupBeared = response.access_token;

          $scope.connectMeetup();
        }
      });
    }
    $scope.connectMeetup = function() {

      $scope.meetupLoadingGetToken = true;
      $scope.loadingGetMeetupEvents = false;
      ngDialog.open({
        template: 'views/templates/importMeetupDialog.html',
        showClose: false,
        scope: $scope
      });
      if ($localStorage.meetupBeared) {
        $scope.meetupLoadingGetToken = false;
        $scope.loadingGetMeetupEvents = true;
        $scope.meetupConectionDone = true;
        $scope.getMeetupGroups($localStorage.meetupBeared);
      } else {
        $scope.meetupLoadingGetToken = false;
        $scope.loadingGetMeetupEvents = false;
        $scope.meetupConectionDone = false;
        eventbriteRequest.getMeetupAuth($routeParams.meetupBeared).success(function(data) {
          var response = JSON.parse(jsonize(data.response));
          if (response.error) {
            $scope.meetupLoadingGetToken = false;
            $scope.reconnectMeetup = true;
            $scope.meetupConectionDone = false;
          } else {
            $localStorage.meetupBeared = response.access_token;
            $scope.meetupLoadingGetToken = false;
            $scope.loadingGetMeetupEvents = true;
            $scope.meetupConectionDone = true;
            $scope.getMeetupGroups(response.access_token);
          }
        });
      }
    };
    $scope.EVENTBRITEAPYKEY = $rootScope.getConstants().EVENTBRITEAPYKEY;
    $scope.getEventbriteEvents = function(accessToken) {
      eventbriteRequest.getEventbriteEvents(accessToken)
        .success(function(data, head) {
          $scope.loadingGetEvents = false;
          $scope.evenbriteEvents = data.events;
        }).error(function(data) {
          $scope.loadingGetEvents = false;
          $scope.errorGettingEvents = true;
          $scope.evenbriteEvents = false;
        });
    };
    $scope.MEETUPAPIKEY = $rootScope.getConstants().MEETUPAPIKEY;
    $scope.MEETUPREDIRECTURL = $rootScope.getConstants().MEETUPREDIRECTURL;
    $scope.getMeetupGroups = function(accessToken) {

      eventbriteRequest.getMeetupGroups(accessToken)
        .success(function(data) {
          $scope.loadingGetMeetupEvents = false;

          $scope.meetupEvents = JSON.parse(data.response);

        }).error(function(data) {

          $scope.loadingGetMeetupEvents = false;
          $scope.errorGettingGroups = true;
          $scope.meetupEvents = false;
        });
    };
    $scope.connectEventbrite = function() {
      $scope.loadingGetToken = true;
      $scope.loadingGetEvents = false;
      ngDialog.open({
        template: 'views/templates/importEventbriteDialog.html',
        showClose: false,
        scope: $scope
      });
      if ($localStorage.eventBriteBeared) {
        $scope.loadingGetToken = false;
        $scope.loadingGetEvents = true;
        $scope.conectionDone = true;
        $scope.getEventbriteEvents($localStorage.eventBriteBeared);
      } else {
        $scope.loadingGetToken = false;
        $scope.loadingGetEvents = false;
        $scope.conectionDone = false;
        eventbriteRequest.getEventbriteAuth($routeParams.eventBriteCode).success(function(data) {
          var response = JSON.parse(jsonize(data.response));
          if (response.error) {
            $scope.loadingGetToken = false;
            $scope.reconnectEventbrite = true;
            $scope.conectionDone = false;
          } else {
            $localStorage.eventBriteBeared = response.access_token;

            $scope.loadingGetToken = false;
            $scope.loadingGetEvents = true;
            $scope.conectionDone = true;
            $scope.getEventbriteEvents(response.access_token);
          }
        });
      }
    };
    $scope.prefilEventForm = function(url) {
      eventbriteRequest.getEventbriteEvent(url, $localStorage.eventBriteBeared)
        .success(function(data) {
          //Prefill the form
          $scope.titleevent = data.name.text;
          $scope.descriptionevent = data.description.html;
          $scope.dtini = data.start.local;
          $scope.dtfinal = data.end.local;
          $scope.privacyevent = 0;
          ngDialog.closeAll();
        });
    };
    $scope.prefilEventFormMeetup = function(e) {
      $scope.titleevent = e.name;
      $scope.descriptionevent = e.description;
      $scope.dtini = e.time;
      $scope.dtfinal = new Date(e.time + (e.utc_offset * -1));
      $scope.privacyevent = 0;
      ngDialog.closeAll();
    };
    $scope.menuprincipal = 'views/organizers/menu.html';
  }

  angular.module('sponzorme')
    .controller('OrganizersEventCreateController', OrganizersEventCreateController);

})();
