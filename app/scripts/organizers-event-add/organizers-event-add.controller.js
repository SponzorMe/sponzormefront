(function() {
  'use strict';
  function OrganizersEventAddController($scope, $mdDialog, $translate, $localStorage, eventRequest, $rootScope, $routeParams, eventbriteRequest, dialogRequest, eventTypeRequest, categoryRequest) {
    if ($rootScope.userValidation('0')) {
      var vm = this;
      //List of preseted items to populate event Dates
      vm.hours = [];
      for(var i=0; i<24; i++){
        var string;
        if(i<10){string = '0'+ i;}
        else{string = i;}
        vm.hours.push({number: string+':00:00', text: string+':00:00'});
        vm.hours.push({number: string+':30:00', text: string+':30:00'});
      }
      vm.years = [new Date().getUTCFullYear()-1, new Date().getUTCFullYear(), new Date().getUTCFullYear()+1, new Date().getUTCFullYear()+2];  //One year down, two years up.
      vm.months =
      [{number:'01', text:'January'}, {number:'02', text:'February'}, {number:'03', text:'March'}, {number:'04', text:'April'}, {number:'05', text:'May'}, {number:'06', text:'June'}, {number:'07', text:'July'}, {number:'08', text:'August'}, {number:'09', text:'September'}, {number:'10', text:'October'}, {number:'11', text: 'November'}, {number:'12', text: 'December'}];
      vm.days = [];
      for(var i=0; i<=31; i++){vm.days.push(i)};//Days


      vm.event = {
        sponzorshipTypes: [{kind: 'Amateur', usd: "100"}]
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
                reserved_quantity: $scope.newSponzorshipType.reservedQuantity,
                perkTasks: []
              });
              $mdDialog.hide();
            };
          }
        });
      };
      vm.addTaskForm = function(s){
        $mdDialog.show({
          clickOutsideToClose: true,
          templateUrl: 'scripts/organizers-event-add/taskForm.html',
          controller: function($scope){
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
      vm.removeTask = function(indexSponzorship, indexTask){
        vm.event.sponzorshipTypes[indexSponzorship].perkTasks.splice(indexTask, 1);
      };
      //this function adds a SponzorshipType to the new event form
      vm.removeSponzorshipType = function(index) {
        vm.event.sponzorshipTypes.splice(index, 1);
      };

      vm.setEventData();//Here Starts the Callback
    }
  }
  angular.module('sponzorme').controller('OrganizersEventAddController', OrganizersEventAddController);
})();
