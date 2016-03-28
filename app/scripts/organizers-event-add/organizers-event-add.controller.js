(function() {
  'use strict';
  function OrganizersEventAddController($scope, $mdDialog, $translate, $localStorage, eventRequest, $rootScope, $routeParams, eventbriteRequest, dialogRequest, eventTypeRequest, categoryRequest) {
    if ($rootScope.userValidation('0')) {
      var vm = this;
      vm.event = {
        sponzorshipTypes: []
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
      vm.addSponzorshipTypeForm = function() {
        $mdDialog.show({
          clickOutsideToClose: true,
          templateUrl: 'scripts/organizers-event-add/sponzorshipTypeForm.html',
          controller: function($scope){
            $scope.addSponzorshipType = function() {
              vm.event.sponzorshipTypes.push({
                kind: $scope.newSponzorshipType.kind,
                usd: $scope.newSponzorshipType.usd,
                total_quantity: $scope.newSponzorshipType.totalQuantity,
                reserved_quantity: $scope.newSponzorshipType.reservedQuantity
              });
              $mdDialog.hide();
            };
          }
        });
      };
      vm.addTaskForm = function($index){
        $mdDialog.show({
          clickOutsideToClose: true,
          templateUrl: 'scripts/organizers-event-add/taskForm.html',
          controller: function($scope){
            $scope.addTask = function() {
              vm.event.sponzorshipTypes[$index].perkTasks.push({
                title: $scope.newTask.title,
                description: $scope.newTask.title
              });
              $mdDialog.hide();
            };
          }
        });
      };
      //this function adds a SponzorshipType to the new event form
      vm.removeSponzorshipType = function(index) {
        vm.event.sponzorshipTypes.splice(index, 1);
      };
    }
  }
  angular.module('sponzorme').controller('OrganizersEventAddController', OrganizersEventAddController);
})();
