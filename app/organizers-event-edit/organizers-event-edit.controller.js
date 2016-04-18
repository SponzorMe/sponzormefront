(function() {
  'use strict';
  function
OrganizersEventEditController($scope, $mdDialog, $translate, $localStorage, eventRequest, $rootScope, $routeParams, eventbriteRequest, dialogRequest, eventTypeRequest, categoryRequest) {
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
      for(var i=1; i<=31; i++){vm.days.push(i)};//Days
      vm.event = {sponzorshipTypes: [], lang: $rootScope.currentLanguage(), organizer: $localStorage.id};
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
      vm.editNewEvent = function() {

        function verification() {
          dialogRequest.showLoading();
          vm.event.location_reference = vm.event.location;
          vm.event.starts = vm.event.startsAux.year +'-'+ vm.event.startsAux.month+'-'+  vm.event.startsAux.day + ' ' + vm.event.startsAux.hour;
          vm.event.ends = vm.event.endsAux.year +'-'+ vm.event.endsAux.month +'-'+ vm.event.endsAux.day + ' ' + vm.event.endsAux.hour;
          vm.event.perks = vm.event.sponzorshipTypes;
          vm.event.organizer = $localStorage.id;
          eventRequest.editEventPut(vm.event.id, vm.event).then(function successCallback(response) {
            response.data.event.starts = new Date(response.data.event.starts).getTime();
            response.data.event.ends = new Date(response.data.event.ends).getTime();
            for(var i=0; i<vm.user.events.length;i++){
              if(vm.user.events[i].id === $routeParams.eventId){
                vm.user.events[i] = response.data.event;
              }
            }
            $localStorage.user = JSON.stringify(vm.user);
            dialogRequest.closeLoading();
            dialogRequest.showDialog('success', 'eventEditedSuccesfully', '/organizers/dashboard');
          }, function errorCallback(err) {
            dialogRequest.closeLoading();
            dialogRequest.showDialog('error', 'errorCreatingEvent', false);
          });
        };

        vm.event.startsAux2 = new Date(vm.event.startsAux.year +'-'+ vm.event.startsAux.month+'-'+  vm.event.startsAux.day + ' ' + vm.event.startsAux.hour).getTime();
        vm.event.endsAux2 = new Date(vm.event.endsAux.year +'-'+ vm.event.endsAux.month +'-'+ vm.event.endsAux.day + ' ' + vm.event.endsAux.hour).getTime();



        if(vm.event.endsAux2<=vm.event.startsAux2){
          $mdDialog.show(
            $mdDialog.alert()
            .clickOutsideToClose(true)
            .title($translate.instant('addEvent.invalidDatesTitle'))
            .textContent($translate.instant('addEvent.invalidDatesText'))
            .ok('Ok!'));
        }
        else if(!vm.event.sponzorshipTypes.length){
          $mdDialog.show(
            $mdDialog.alert()
            .clickOutsideToClose(true)
            .title($translate.instant('addEvent.noSponzorshupTypesTitle'))
            .textContent($translate.instant('addEvent.noSponzorshupTypesText'))
            .ok('Ok!'));
        }
        else{
          verification();
        }
      };
      $scope.file=false;
      //this function upload or create the event Image
      $scope.imageVerification = function() {
        console.log($scope.file);
        if($scope.file){
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
            }
            else{
              dialogRequest.closeLoading();
            }
          });
        }
      };
      vm.addSponzorshipTypeForm = function() {
        $mdDialog.show({
          clickOutsideToClose: true,
          templateUrl: 'organizers-event-add/sponzorshipTypeForm.html',
          controller: function($scope){
            $scope.addSponzorshipType = function() {
              vm.event.sponzorshipTypes.push({
                kind: $scope.newSponzorshipType.kind,
                usd: $scope.newSponzorshipType.usd,
                total_quantity: $scope.newSponzorshipType.totalQuantity,
                reserved_quantity: 0,
                id: '-1',
                tasks: [],
                show: true
              });
              $mdDialog.hide();
            };
          }
        });
      };
      vm.addTaskForm = function(s){
        $mdDialog.show({
          clickOutsideToClose: true,
          templateUrl: 'organizers-event-add/taskForm.html',
          controller: function($scope){
            $scope.addTask = function() {
              s.tasks.push({
                title: $scope.newTask.title,
                description: $scope.newTask.title,
                id: '-1'
              });
              $mdDialog.hide();
            };
          }
        });
      };

      vm.removeTask = function(indexSponzorship, indexTask){
        vm.event.tasksToDelete.push(vm.event.sponzorshipTypes[indexSponzorship].tasks[indexTask].id);
        vm.event.sponzorshipTypes[indexSponzorship].tasks.splice(indexTask, 1);
      };
      //this function adds a SponzorshipType to the new event form
      vm.removeSponzorshipType = function(index) {
        vm.event.sponzorshipTypesToDelete.push(vm.event.sponzorshipTypes[index].id);
        for (var i = 0; i < vm.event.sponzorshipTypes[index].tasks.length; i++) {
          vm.event.tasksToDelete.push(vm.event.sponzorshipTypes[index].tasks[i].id);
        }
        vm.event.sponzorshipTypes.splice(index, 1);
      };
      vm.user = JSON.parse($localStorage.user);
      vm.setEventData();
      vm.event = vm.user.events.filter(function(e){
        if(e.id === $routeParams.eventId){
          return e;
        }
      })[0];
      vm.event.tasksToDelete = [];
      vm.event.sponzorshipTypesToDelete = [];
      var auxDate = new Date(vm.event.starts);
      var parseMinutes = auxDate.getMinutes()>9 ? auxDate.getMinutes(): '0'+auxDate.getMinutes();
      var parseSeconds = auxDate.getSeconds()>9 ? auxDate.getSeconds(): '0'+auxDate.getSeconds();
      var parseHours = auxDate.getHours()>9 ? auxDate.getHours(): '0'+auxDate.getHours();
      vm.event.startsAux={
        year: auxDate.getUTCFullYear(),
        month: auxDate.getMonth()+1,
        day:auxDate.getDate(),
        hour:parseHours+':'+ parseMinutes +':'+parseSeconds
      };
      vm.event = vm.user.events.filter(function(e){
        if(e.id === $routeParams.eventId){
          return e;
        }
      })[0];

      var auxDate2 = new Date(vm.event.ends);
      var parseMinutes2 = auxDate2.getMinutes()>9 ? auxDate2.getMinutes(): '0'+auxDate2.getMinutes();
      var parseSeconds2 = auxDate2.getSeconds()>9 ? auxDate2.getSeconds(): '0'+auxDate2.getSeconds();
      var parseHours2 = auxDate2.getHours()>9 ? auxDate2.getHours(): '0'+auxDate2.getHours();
      vm.event.endsAux={
        year: auxDate2.getUTCFullYear(),
        month: auxDate2.getMonth()+1,
        day:auxDate2.getDate(),
        hour:parseHours2+':'+ parseMinutes2 +':'+parseSeconds2
      };
      vm.event.sponzorshipTypes = vm.event.perks;
    }
  }
  angular.module('sponzorme').controller('OrganizersEventEditController', OrganizersEventEditController);
})();
