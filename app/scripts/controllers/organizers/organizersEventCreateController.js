'use strict';
(function() {
  function OrganizersEventCreateController($scope, $translate, $localStorage, eventTypeRequest, eventRequest, ngDialog, categoryRequest, $rootScope, $routeParams, eventbriteRequest) {
    //Function to parse JSON strings in JSON objects
    function jsonize(str) {
      return str.replace(/([\$\w]+)\s*:/g, function(_, $1) {
        return '"' + $1 + '":';
      }).replace(/'([^']+)'/g, function(_, $1) {
        return '"' + $1 + '"';
      });
    }
    if ($rootScope.userValidation('0')) {
      $scope.section = {
        route: 'Events / Add',
        title: 'Event Add'
      };
      $scope.newEvent = {
        perks: []
      };
      $scope.newEvent.starts = new Date().getTime();
      $scope.newEvent.ends = new Date().getTime();
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
          $rootScope.showDialog('error', 'maxLimitPerk', false);
        }
      };

      //This function creates an event
      $scope.createNewEvent = function() {
        $scope.newEvent.location = $scope.locationevent.formatted_address;
        $scope.newEvent.location_reference = $scope.locationevent.place_id;
        $scope.newEvent.starts = moment($scope.newEvent.starts).format('YYYY-MM-DD HH:mm:ss');
        $scope.newEvent.ends = moment($scope.newEvent.ends).format('YYYY-MM-DD HH:mm:ss');
        $scope.newEvent.lang = $rootScope.currentLanguage();
        $scope.newEvent.organizer = $localStorage.id;
        eventRequest.createEvent($scope.newEvent).then(function successCallback(response) {
          $scope.user = JSON.parse($localStorage.user);
          $scope.user.events.push(response.data.event);
          $localStorage.user = JSON.stringify($scope.user);
          $scope.newEvent = {};
          $scope.locationevent = {};
          $rootScope.closeAllDialogs();
          $rootScope.showDialog('success', 'eventCreatedSuccesfully', false);
        }, function errorCallback() {
          $rootScope.closeAllDialogs();
          $rootScope.showDialog('error', 'errorCreatingEvent', false);
        });
      };
      //this function upload or create the event Image
      $scope.imageVerification = function() {
        $rootScope.showLoading();
        $scope.loadingNewEvent = true;
        $scope.errorNewEvent = false;
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
        $scope.newEvent.perks.push({
          kind: '',
          usd: 0,
          total_quantity: 1,
          reserved_quantity: 0
        });
      };
      //this function removes a SponzorshipType to the new event form
      $scope.removeSponzorshipType = function(index) {
        $scope.newEvent.perks.splice(index, 1);
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
            $scope.newEvent.title = data.name.text;
            $scope.newEvent.description = data.description.html;
            $scope.newEvent.starts = data.start.local;
            $scope.newEvent.ends = data.end.local;
            $scope.newEvent.privacy = 0;
            $rootScope.closeAllDialogs();
          });
      };
      $scope.prefilEventFormMeetup = function(e) {
        $scope.newEvent.title = e.name;
        $scope.newEvent.description = e.description;
        $scope.newEvent.starts = new Date(e.time);
        var dataTime = new Date(e.time);
        var timer = parseInt(1 * 2 * 60 * 60 * 1000);
        var dataExpDate = new Date(dataTime.getTime() + timer);
        $scope.newEvent.ends = new Date(dataExpDate);
        $scope.privacyevent = 0;
        $rootScope.closeAllDialogs();
      };
      $scope.menuprincipal = 'views/organizers/menu.html';
    }
  }
  angular.module('sponzorme').controller('OrganizersEventCreateController', OrganizersEventCreateController);
})();
