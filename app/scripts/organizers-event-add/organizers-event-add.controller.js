'use strict';
(function() {
  function OrganizersEventAddController($scope, $mdDialog, $translate, $localStorage, eventRequest, $rootScope, $routeParams, eventbriteRequest, dialogRequest, eventTypeRequest, categoryRequest) {

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
        //mock starts
      vm.date = new Date();
      vm.eventProviderSelected = '';

      vm.event = {
        sponzorshipTypes: []
      };
      vm.setEventData();
      //End vars Initialization
      //

      vm.aa = function() {
        console.log("hola");
      };

      //This function creates an event
      vm.createNewEvent = function() {
        vm.event.location = vm.locationevent.formatted_address;
        vm.event.location_reference = vm.locationevent.place_id;
        vm.event.starts = moment(vm.event.starts).format('YYYY-MM-DD HH:mm:ss');
        vm.event.ends = moment(vm.event.ends).format('YYYY-MM-DD HH:mm:ss');
        vm.event.lang = $rootScope.currentLanguage();
        vm.event.organizer = $localStorage.id;
        eventRequest.createEvent(vm.event).then(function successCallback(response) {
          vm.user = JSON.parse($localStorage.user);
          vm.user.events.push(response.data.event);
          $localStorage.user = JSON.stringify(vm.user);
          vm.event = {};
          vm.locationevent = {};
          dialogRequest.closeLoading();
          dialogRequest.showDialog('success', 'eventCreatedSuccesfully', false);
        }, function errorCallback() {
          dialogRequest.closeLoading();
          dialogRequest.showDialog('error', 'errorCreatingEvent', false);
        });
      };
      //this function upload or create the event Image
      vm.imageVerification = function() {
        dialogRequest.showLoading();
        vm.loadingNewEvent = true;
        vm.errorNewEvent = false;
        if (vm.file) {
          vm.creds = {
            bucket: $rootScope.getConstants().AMAZONBUCKET,
            access_key: $rootScope.getConstants().AMAZONKEY,
            secret_key: $rootScope.getConstants().AMAZONSECRET
          };
          AWS.config.update({
            accessKeyId: vm.creds.access_key,
            secretAccessKey: vm.creds.secret_key
          });
          AWS.config.region = $rootScope.getConstants().AMAZONBUCKETREGION;
          var bucket = new AWS.S3({
            params: {
              Bucket: vm.creds.bucket
            }
          });
          // Prepend Unique String To Prevent Overwrites
          var uniqueFileName = btoa($rootScope.uniqueString() + new Date().getTime() + $rootScope.uniqueString()).replace('=', $rootScope.uniqueString()) + '.' + $rootScope.getExtension(vm.file.name);
          var params = {
            Key: uniqueFileName,
            ContentType: vm.file.type,
            Body: vm.file,
            ServerSideEncryption: 'AES256'
          };
          bucket.putObject(params, function(err, data) {
            if (!err) {
              vm.event.image = $rootScope.getConstants().AMAZONBUCKETURL + uniqueFileName;
              vm.createNewEvent();
            }
          });
        } else {
          //If no Image we set here some image
          vm.event.image = 'https://s3-us-west-2.amazonaws.com/sponzormewebappimages/event_default.jpg';
          vm.createNewEvent();
        }
      };
      console.log("estoy");
      vm.addSponzorshipTypeForm = function() {
        console.log("test");
        var parentEl = angular.element(document.body);
        $mdDialog.show({
          parent: parentEl,
          clickOutsideToClose: true,
          templateUrl: 'views/components/dialogs/sponzorshipTypeForm.html',
          bindToController: true,
          scope: $scope
        });
      };
      //this function adds a SponzorshipType to the new event form
      $scope.addSponzorshipType = function() {
        vm.event.sponzorshipTypes.push({
          kind: $scope.newSponzorshipType.kind,
          usd: $scope.newSponzorshipType.usd,
          total_quantity: $scope.newSponzorshipType.totalQuantity,
          reserved_quantity: $scope.newSponzorshipType.reservedQuantity
        });
        $mdDialog.hide();
      };
      //this function removes a SponzorshipType to the new event form
      vm.removeSponzorshipType = function(index) {
        vm.event.perks.splice(index, 1);
      };
/*
      if ($routeParams.eventBriteCode) {
        eventbriteRequest.getEventbriteAuth($routeParams.eventBriteCode).success(function(data) {
          var response = JSON.parse(jsonize(data.response));
          if (response.error) {
            vm.loadingGetToken = false;
            vm.reconnectEventbrite = true;
            vm.conectionDone = false;
          } else {
            $localStorage.eventBriteBeared = response.access_token;
            vm.connectEventbrite();
          }
        });
      } else if ($routeParams.meetupCode) {
        eventbriteRequest.getMeetupAuth($routeParams.meetupCode).success(function(data) {
          var response = JSON.parse(jsonize(data.response));
          if (response.error) {
            vm.meetupLoadingGetToken = false;
            vm.reconnectMeetup = true;
            vm.meetupConectionDone = false;
          } else {
            $localStorage.meetupBeared = response.access_token;
            vm.connectMeetup();
          }
        });
      }
      vm.connectMeetup = function() {
        vm.meetupLoadingGetToken = true;
        vm.loadingGetMeetupEvents = false;
        ngDialog.open({
          template: 'views/templates/importMeetupDialog.html',
          showClose: false,
          scope: $scope
        });
        if ($localStorage.meetupBeared) {
          vm.meetupLoadingGetToken = false;
          vm.loadingGetMeetupEvents = true;
          vm.meetupConectionDone = true;
          vm.getMeetupGroups($localStorage.meetupBeared);
        } else {
          vm.meetupLoadingGetToken = false;
          vm.loadingGetMeetupEvents = false;
          vm.meetupConectionDone = false;
          eventbriteRequest.getMeetupAuth($routeParams.meetupBeared).success(function(data) {
            var response = JSON.parse(jsonize(data.response));
            if (response.error) {
              vm.meetupLoadingGetToken = false;
              vm.reconnectMeetup = true;
              vm.meetupConectionDone = false;
            } else {
              $localStorage.meetupBeared = response.access_token;
              vm.meetupLoadingGetToken = false;
              vm.loadingGetMeetupEvents = true;
              vm.meetupConectionDone = true;
              vm.getMeetupGroups(response.access_token);
            }
          });
        }
      };
      vm.EVENTBRITEAPYKEY = $rootScope.getConstants().EVENTBRITEAPYKEY;
      vm.getEventbriteEvents = function(accessToken) {
        eventbriteRequest.getEventbriteEvents(accessToken)
          .success(function(data, head) {
            vm.loadingGetEvents = false;
            vm.evenbriteEvents = data.events;
          }).error(function(data) {
            vm.loadingGetEvents = false;
            vm.errorGettingEvents = true;
            vm.evenbriteEvents = false;
          });
      };
      vm.MEETUPAPIKEY = $rootScope.getConstants().MEETUPAPIKEY;
      vm.MEETUPREDIRECTURL = $rootScope.getConstants().MEETUPREDIRECTURL;
      vm.getMeetupGroups = function(accessToken) {
        eventbriteRequest.getMeetupGroups(accessToken)
          .success(function(data) {
            vm.loadingGetMeetupEvents = false;
            vm.meetupEvents = JSON.parse(data.response);
          }).error(function(data) {
            vm.loadingGetMeetupEvents = false;
            vm.errorGettingGroups = true;
            vm.meetupEvents = false;
          });
      };
      vm.connectEventbrite = function() {
        vm.loadingGetToken = true;
        vm.loadingGetEvents = false;
        ngDialog.open({
          template: 'views/templates/importEventbriteDialog.html',
          showClose: false,
          scope: $scope
        });
        if ($localStorage.eventBriteBeared) {
          vm.loadingGetToken = false;
          vm.loadingGetEvents = true;
          vm.conectionDone = true;
          vm.getEventbriteEvents($localStorage.eventBriteBeared);
        } else {
          vm.loadingGetToken = false;
          vm.loadingGetEvents = false;
          vm.conectionDone = false;
          eventbriteRequest.getEventbriteAuth($routeParams.eventBriteCode).success(function(data) {
            var response = JSON.parse(jsonize(data.response));
            if (response.error) {
              vm.loadingGetToken = false;
              vm.reconnectEventbrite = true;
              vm.conectionDone = false;
            } else {
              $localStorage.eventBriteBeared = response.access_token;
              vm.loadingGetToken = false;
              vm.loadingGetEvents = true;
              vm.conectionDone = true;
              vm.getEventbriteEvents(response.access_token);
            }
          });
        }
      };
      vm.prefilEventForm = function(url) {
        eventbriteRequest.getEventbriteEvent(url, $localStorage.eventBriteBeared)
          .success(function(data) {
            vm.event.title = data.name.text;
            vm.event.description = data.description.html;
            vm.event.starts = data.start.local;
            vm.event.ends = data.end.local;
            vm.event.privacy = 0;
            dialogRequest.closeLoading();
          });
      };
      vm.prefilEventFormMeetup = function(e) {
        vm.event.title = e.name;
        vm.event.description = e.description;
        vm.event.starts = new Date(e.time);
        var dataTime = new Date(e.time);
        var timer = parseInt(1 * 2 * 60 * 60 * 1000);
        var dataExpDate = new Date(dataTime.getTime() + timer);
        vm.event.ends = new Date(dataExpDate);
        vm.privacyevent = 0;
        dialogRequest.closeLoading();
      };
*/      
    }
  }
  angular.module('sponzorme').controller('OrganizersEventAddController', OrganizersEventAddController);
})();
