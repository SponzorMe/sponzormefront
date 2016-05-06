(function() {
  'use strict';

  function OrganizersEventAddController($scope, $mdDialog, $translate, $localStorage, eventRequest, $rootScope, $routeParams, eventbriteRequest, dialogRequest, eventTypeRequest, categoryRequest) {
    if ($rootScope.userValidation('0')) {
      function jsonize(str) {
        return str.replace(/([\$\w]+)\s*:/g, function(_, $1) {
          return '"' + $1 + '":';
        }).replace(/'([^']+)'/g, function(_, $1) {
          return '"' + $1 + '"';
        });
      }
      var vm = this;
      //List of preseted items to populate event Dates
      vm.hours = [];
      for (var i = 0; i < 24; i++) {
        var string;
        if (i < 10) {
          string = '0' + i;
        } else {
          string = i;
        }
        vm.hours.push({
          number: string + ':00:00',
          text: string + ':00:00'
        });
        vm.hours.push({
          number: string + ':30:00',
          text: string + ':30:00'
        });
      }
      vm.years = [new Date().getUTCFullYear() - 1, new Date().getUTCFullYear(), new Date().getUTCFullYear() + 1, new Date().getUTCFullYear() + 2]; //One year down, two years up.
      vm.months = [{
        number: '01',
        text: 'January'
      }, {
        number: '02',
        text: 'February'
      }, {
        number: '03',
        text: 'March'
      }, {
        number: '04',
        text: 'April'
      }, {
        number: '05',
        text: 'May'
      }, {
        number: '06',
        text: 'June'
      }, {
        number: '07',
        text: 'July'
      }, {
        number: '08',
        text: 'August'
      }, {
        number: '09',
        text: 'September'
      }, {
        number: '10',
        text: 'October'
      }, {
        number: '11',
        text: 'November'
      }, {
        number: '12',
        text: 'December'
      }];
      vm.days = [];
      for (var i = 1; i <= 31; i++) {
        vm.days.push(i)
      }; //Days
      vm.event = {
        sponzorshipTypes: [],
        lang: $rootScope.currentLanguage()||vm.user.lang||'en',
        organizer: $localStorage.id,
        image: 'https://s3-us-west-2.amazonaws.com/sponzormewebappimages/event_default.jpg'
      };
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
      };
      vm.showSponzorshipType = function(s) {
        s.show = !s.show;
      };

      //This function creates an event
      vm.createNewEvent = function() {

        function verification() {
          dialogRequest.showLoading();
          vm.event.location_reference = vm.event.location;
          vm.event.starts = vm.event.startsAux.year + '-' + vm.event.startsAux.month + '-' + vm.event.startsAux.day + ' ' + vm.event.startsAux.hour;
          vm.event.ends = vm.event.endsAux.year + '-' + vm.event.endsAux.month + '-' + vm.event.endsAux.day + ' ' + vm.event.endsAux.hour;
          vm.event.perks = vm.event.sponzorshipTypes;
          eventRequest.createEvent(vm.event).then(function successCallback(response) {
            vm.user = JSON.parse($localStorage.user);
            response.data.event.starts = new Date(response.data.event.starts).getTime();
            response.data.event.ends = new Date(response.data.event.ends).getTime();
            vm.user.events.push(response.data.event);
            $localStorage.user = JSON.stringify(vm.user);
            dialogRequest.closeLoading();
            dialogRequest.showDialog('success', 'eventCreatedSuccesfully', '/organizers/dashboard');
            vm.event = {};

          }, function errorCallback(err) {
            dialogRequest.closeLoading();
            dialogRequest.showDialog('error', 'errorCreatingEvent', false);
          });
        };

        vm.event.startsAux2 = new Date(vm.event.startsAux.year + '-' + vm.event.startsAux.month + '-' + vm.event.startsAux.day + ' ' + vm.event.startsAux.hour).getTime();
        vm.event.endsAux2 = new Date(vm.event.endsAux.year + '-' + vm.event.endsAux.month + '-' + vm.event.endsAux.day + ' ' + vm.event.endsAux.hour).getTime();
        var noTasks = false;
        if(vm.event.sponzorshipTypes.length){//Analysis of the Sponsorship Types
          for(var i=0; i < vm.event.sponzorshipTypes.length; i++){
            if(!vm.event.sponzorshipTypes[i].perkTasks.length){
              noTasks = true; //It means we found a Sponsorship type with no tasks
              break; //To optimize we skip of the for
            }
          }
        }
        if(!vm.event.sponzorshipTypes.length){
          dialogRequest.showDialog('error', 'eventWithoutSponsorshipTypeText', false);
        }
        else if(noTasks){
          dialogRequest.showDialog('error', 'sponsorshipTypeWithoutTasksText', false);
        }
        //Here is the dates verification
        else if (vm.event.endsAux2 <= vm.event.startsAux2) {
          dialogRequest.showDialog('error', 'invalidDatesText', false);
        } else {
          verification();
        }
      };
      $scope.file = false;
      //this function upload or create the event Image
      $scope.imageVerification = function() {
        if ($scope.file) {
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
          var uniqueFileName = btoa($rootScope.uniqueString() + new Date().getTime() + $rootScope.uniqueString()).replace('=', $rootScope.uniqueString()) + '.' + $rootScope.getExtension($scope.file.name);
          var params = {
            Key: uniqueFileName,
            ContentType: $scope.file.type,
            Body: $scope.file,
            ServerSideEncryption: 'AES256'
          };
          dialogRequest.showLoading();
          bucket.putObject(params, function(err, data) {
            if (!err) {
              dialogRequest.closeLoading();
              console.log(data);
              vm.event.image = $rootScope.getConstants().AMAZONBUCKETURL + uniqueFileName;
            } else {
              dialogRequest.closeLoading();
            }
          });
        }
      };
      vm.addSponzorshipTypeForm = function() {
        var parentEl = angular.element(document.body);
        $mdDialog.show({
         parent: parentEl,
          clickOutsideToClose: true,
          templateUrl: 'organizers-event-add/sponzorshipTypeForm.html',
          controller: function($scope) {
            $scope.addSponzorshipType = function() {
              vm.event.sponzorshipTypes.push({
                kind: $scope.newSponzorshipType.kind,
                usd: $scope.newSponzorshipType.usd,
                total_quantity: $scope.newSponzorshipType.totalQuantity,
                reserved_quantity: 0,
                perkTasks: [],
                show: true
              });
              $mdDialog.hide();
            };
          }
        });
      };
      vm.addTaskForm = function(s) {
        var parentEl = angular.element(document.body);
        $mdDialog.show({
         parent: parentEl,
          clickOutsideToClose: true,
          templateUrl: 'organizers-event-add/taskForm.html',
          controller: function($scope) {
            $scope.addTask = function() {
              s.perkTasks.push({
                title: $scope.newTask.title,
                description: $scope.newTask.title
              });
              $mdDialog.hide();
            };
          }
        });
      };
      vm.removeTask = function(indexSponzorship, indexTask) {
        vm.event.sponzorshipTypes[indexSponzorship].perkTasks.splice(indexTask, 1);
      };
      //this function adds a SponzorshipType to the new event form
      vm.removeSponzorshipType = function(index) {
        vm.event.sponzorshipTypes.splice(index, 1);
      };

      //-----------------------------------------------------------//
      //EVENTBRITE FUNCTIONALITY
      //-----------------------------------------------------------//

      vm.connectEventbrite = function() {
        var parentEl = angular.element(document.body);
        $mdDialog.show({
         parent: parentEl,
          clickOutsideToClose: true,
          templateUrl: 'organizers-event-add/eventbrite-dialog.html',
          controller: function($scope) {
            $scope.getEventbriteEvents = function(accessToken) {
              $scope.loadingEventbriteEvents = true;
              eventbriteRequest.getEventbriteEvents(accessToken)
                .success(function(data, head) {
                  $scope.loadingEventbriteEvents = false;
                  $scope.eventbriteEvents = data.events;
                }).error(function(data) {
                  $scope.loadingEventbriteEvents = false;
                  $scope.errorLoadingEventbriteEvents = true;
                });
            };
            $scope.prefillEventFromEvenbrite = function(e) {
              vm.event.title = e.name.text;
              vm.event.description = e.description.text;
              vm.event.starts = new Date(e.start.local).getTime();
              vm.event.ends = new Date(e.end.local).getTime();
              vm.event.privacy = 0;
              vm.event.image = e.logo.url;
              //----------------------------------------------
              var auxDate = new Date(vm.event.starts);
              var parseMinutes = auxDate.getMinutes() > 9 ? auxDate.getMinutes() : '0' + auxDate.getMinutes();
              var parseSeconds = auxDate.getSeconds() > 9 ? auxDate.getSeconds() : '0' + auxDate.getSeconds();
              var parseHours = auxDate.getHours() > 9 ? auxDate.getHours() : '0' + auxDate.getHours();
              vm.event.startsAux = {
                year: auxDate.getUTCFullYear(),
                month: auxDate.getMonth() + 1,
                day: auxDate.getDate(),
                hour: parseHours + ':' + parseMinutes + ':' + parseSeconds
              };
              var auxDate2 = new Date(vm.event.ends);
              var parseMinutes2 = auxDate2.getMinutes() > 9 ? auxDate2.getMinutes() : '0' + auxDate2.getMinutes();
              var parseSeconds2 = auxDate2.getSeconds() > 9 ? auxDate2.getSeconds() : '0' + auxDate2.getSeconds();
              var parseHours2 = auxDate2.getHours() > 9 ? auxDate2.getHours() : '0' + auxDate2.getHours();
              vm.event.endsAux = {
                year: auxDate2.getUTCFullYear(),
                month: auxDate2.getMonth() + 1,
                day: auxDate2.getDate(),
                hour: parseHours2 + ':' + parseMinutes2 + ':' + parseSeconds2
              };
              $mdDialog.hide();
            };
            $scope.EVENTBRITEAPYKEY = $rootScope.getConstants().EVENTBRITEAPYKEY;
            $scope.connectingToEventbrite = true;
            var currentTime = new Date().getTime();
            if ($localStorage.eventBriteBearedExpirationTime && currentTime < $localStorage.eventBriteBearedExpirationTime) {
              $scope.connectedToEventbrite = true;
              $scope.connectingToEventbrite = false;
              $scope.errorConnectingToEventbrite = false;
              $scope.getEventbriteEvents($localStorage.eventBriteBeared);
            } else {
              eventbriteRequest.getEventbriteAuth($routeParams.eventBriteCode).success(function(data) {
                var response = JSON.parse(jsonize(data.response));
                if (response.error) {
                  $scope.connectedToEventbrite = false;
                  $scope.connectingToEventbrite = false;
                  $scope.errorConnectingToEventbrite = true;
                } else {
                  $scope.connectedToEventbrite = true;
                  $scope.connectingToEventbrite = false;
                  $scope.errorConnectingToEventbrite = false;
                  $localStorage.eventBriteBeared = response.access_token;
                  $localStorage.eventBriteBearedExpirationTime = new Date().getTime() + 3600000;
                  $scope.getEventbriteEvents($localStorage.eventBriteBeared);
                }
              });
            }
          }
        });
      };

      //-----------------------------------------------------------//
      //MEETUP FUNCTIONALITY
      //-----------------------------------------------------------//

      vm.connectMeetup = function() {
        var parentEl = angular.element(document.body);
        $mdDialog.show({
         parent: parentEl,
          clickOutsideToClose: true,
          templateUrl: 'organizers-event-add/meetup-dialog.html',
          controller: function($scope) {

            $scope.getMeetupGroups = function(accessToken) {
              $scope.loadingMeetupEvents = true;
              eventbriteRequest.getMeetupGroups(accessToken)
                .success(function(data) {
                  $scope.loadingMeetupEvents = false;
                  $scope.meetupEvents = JSON.parse(data.response);
                  console.log($scope.meetupEvents);
                }).error(function(data) {
                  $scope.loadingMeetupEvents = false;
                  $scope.errorLoadingMeetupEvents = true;
                });
            };

            $scope.prefillEventFromMeetup = function(e) {
              vm.event.title = e.name;
              vm.event.description = e.description;
              vm.event.starts = new Date(e.time);
              var dataTime = new Date(e.time);
              var timer = parseInt(1 * 2 * 60 * 60 * 1000);
              var dataExpDate = new Date(dataTime.getTime() + timer);
              vm.event.ends = new Date(dataExpDate);
              vm.event.privacy = 0;
              var auxDate = new Date(vm.event.starts);
              var parseMinutes = auxDate.getMinutes() > 9 ? auxDate.getMinutes() : '0' + auxDate.getMinutes();
              var parseSeconds = auxDate.getSeconds() > 9 ? auxDate.getSeconds() : '0' + auxDate.getSeconds();
              var parseHours = auxDate.getHours() > 9 ? auxDate.getHours() : '0' + auxDate.getHours();
              vm.event.startsAux = {
                year: auxDate.getUTCFullYear(),
                month: auxDate.getMonth() + 1,
                day: auxDate.getDate(),
                hour: parseHours + ':' + parseMinutes + ':' + parseSeconds
              };
              var auxDate2 = new Date(vm.event.ends);
              var parseMinutes2 = auxDate2.getMinutes() > 9 ? auxDate2.getMinutes() : '0' + auxDate2.getMinutes();
              var parseSeconds2 = auxDate2.getSeconds() > 9 ? auxDate2.getSeconds() : '0' + auxDate2.getSeconds();
              var parseHours2 = auxDate2.getHours() > 9 ? auxDate2.getHours() : '0' + auxDate2.getHours();
              vm.event.endsAux = {
                year: auxDate2.getUTCFullYear(),
                month: auxDate2.getMonth() + 1,
                day: auxDate2.getDate(),
                hour: parseHours2 + ':' + parseMinutes2 + ':' + parseSeconds2
              };
              $mdDialog.hide();
            };

            $scope.MEETUPAPIKEY = $rootScope.getConstants().MEETUPAPIKEY;
            $scope.MEETUPREDIRECTURL = $rootScope.getConstants().MEETUPREDIRECTURL;
            $scope.connectingToMeetup = true;
            var currentTime = new Date().getTime();

            if ($localStorage.meetupBeared && $localStorage.meetupBearedExpirationTime > currentTime) {
              $scope.connectedToMeetup = true;
              $scope.connectingToMeetup = false;
              $scope.errorConnectingToMeetup = false;
              $scope.getMeetupGroups($localStorage.meetupBeared);
            } else {
              eventbriteRequest.getMeetupAuth($routeParams.meetupCode).success(function(data) {
                var response = JSON.parse(jsonize(data.response));
                if (response.error) {
                  $scope.connectedToMeetup = false;
                  $scope.connectingToMeetup = false;
                  $scope.errorConnectingToMeetup = true;
                } else {
                  $scope.connectedToMeetup = true;
                  $scope.connectingToMeetup = false;
                  $scope.errorConnectingToMeetup = false;
                  $localStorage.meetupBeared = response.access_token;
                  $localStorage.meetupBearedExpirationTime = new Date().getTime() + 3600000;
                  $scope.getMeetupGroups(response.access_token);
                }
              });
            }
          }
        });
      };
      vm.importSelection = function() {
        var parentEl = angular.element(document.body);
        $mdDialog.show({
         parent: parentEl,
          clickOutsideToClose: true,
          templateUrl: 'organizers-event-add/import-dialog.html',
          controller: function($scope) {
            $scope.a = function() {
              vm.connectEventbrite();
              $mdDialog.hide();
            }
            $scope.b = function() {
              vm.connectMeetup();
              $mdDialog.hide();
            };
          }
        });
      }
      vm.setEventData(); //Here Starts the Callback
      if ($routeParams.eventBriteCode) {
        vm.connectEventbrite();
      } else if ($routeParams.meetupCode) {
        vm.connectMeetup();
      }
    }
  }
  angular.module('sponzorme').controller('OrganizersEventAddController', OrganizersEventAddController);
  OrganizersEventAddController.$inject = ['$scope', '$mdDialog', '$translate', '$localStorage', 'eventRequest', '$rootScope', '$routeParams', 'eventbriteRequest', 'dialogRequest', 'eventTypeRequest', 'categoryRequest'];
})();
