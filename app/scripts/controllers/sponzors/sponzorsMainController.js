'use strict';
(function() {

  function SponzorsMainController($scope, $translate, userRequest, $localStorage, eventRequest, $location, usSpinnerService, ngDialog, sponzorshipRequest, perkTaskRequest, perkRequest, taskSponzorRequest, $rootScope, $firebaseArray) {
    if($rootScope.userValidation('1')){
      $scope.searchLoading = true;
      $scope.upcomingLoading = true;
      $scope.bestLoading = true;
      $scope.tolsctive = 'active';
      $scope.showOrganizerInfo =  function(event){
        ngDialog.open({
          template: 'views/templates/loadingDialog.html',
          showClose: false
        });
        eventRequest.oneEvent(event.id).success(function(sData){
          
          userRequest.oneUser(sData.data.organizer[0].id)
          .success(function(sData) {
            
            ngDialog.closeAll();
            $scope.user = sData.data;
            ngDialog.open({
              template: 'views/templates/userInfo.html',
              showClose: false,
              scope: $scope
            });
          }).error(function(eData){
            ngDialog.closeAll();
            $scope.message = 'canNotGetUserInfo';
            ngDialog.open({
              template: 'views/templates/errorDialog.html',
              showClose: false,
              scope: $scope
            });
          });
        });
      };
      $scope.getAllEvents = function() {
        eventRequest.allEvents().success(function(adata) {
          $scope.search = [];
          $scope.search = adata.events.filter(function(e) {
            if (e.location_reference !== 'ljsadljf3289uojklfhasd' && new Date(e.starts).getTime() > new Date().getTime()) {
              return e;
            }
          });
          $scope.upcomingEvents = [];
          var currentDate = new Date();
          var count = 0; //to count 10 events
          for (var i = 0; i < $scope.search.length; i++) {
            var eventDate = new Date($scope.search[i].starts);
            if (eventDate > currentDate) {
              $scope.upcomingEvents.push($scope.search[i]);
              count++;
            }
            if (count > 10) {
              break;
            }
          }
          $scope.upcomingLoading = false;
          $scope.searchLoading = false;
        });
      };
      $scope.showPerks = function(eventId) {
        ngDialog.open({
          template: 'views/templates/loadingDialog.html',
          showClose: false
        });
        $scope.noPerksMessage = true;
        eventRequest.oneEvent(eventId).success(function(data) {
          $scope.currentEvent = data.data.event;
          $scope.currentOrganizer = data.data.organizer[0];
          $scope.loadingpeaks = false;
          if ($scope.currentEvent.perks[0]) {
            $scope.noPerksMessage = false;
          } else {
            $scope.noPerksMessage = true;
          }
          ngDialog.closeAll();
          ngDialog.open({
            template: 'views/templates/eventPerksDialog.html',
            scope: $scope
          });
        }).error(function(eData) {
          ngDialog.closeAll();
          $scope.message = 'youCanNotSponzorThisEvent';
          ngDialog.open({
            template: 'views/templates/errorDialog.html',
            scope: $scope,
            showClose: false
          });
        });
      };
      //We display the form to get the sponzorship cause
      $scope.formCreateSponzorship = function(perk) {
        $scope.perkToSponzor = perk;
        ngDialog.open({
          template: 'views/templates/insertCauseForm.html',
          scope: $scope
        });
      };
      //this function have two steps, first, create the sponzorhip second create the sponzor tasks
      $scope.createSponzorship = function() {
        ngDialog.closeAll();
        ngDialog.open({
          template: 'views/templates/loadingDialog.html',
          showClose: false
        });
        var data = { //Set Sponzorship data
          status: 0,
          'sponzor_id': $localStorage.id,
          'perk_id': $scope.perkToSponzor.id,
          'event_id': $scope.perkToSponzor.id_event,
          'cause': $scope.perkToSponzor.cause,
          'organizer_id': $scope.currentOrganizer.id
        };
        sponzorshipRequest.createSponzorship(data).success(function(sData) {
          perkRequest.onePerk($scope.perkToSponzor.id).success(function(sPerkData) {
            angular.forEach(sPerkData.data.Tasks, function(value) {
              var taskSponzor = {
                status: 0,
                'sponzor_id': $localStorage.id,
                'perk_id': $scope.perkToSponzor.id,
                'event_id': $scope.perkToSponzor.id_event,
                'organizer_id': $scope.currentOrganizer.id,
                'sponzorship_id': sData.Sponzorship.id,
                'task_id': value.id
              };
              taskSponzorRequest.createTaskSponzor(taskSponzor).success(function() {});
            });
            var info = {
              organizerId: $scope.currentOrganizer.id,
              eventName: $scope.currentEvent.title,
              lang: idiomaselect
            };
            var notificationsRef = new Firebase($rootScope.getConstants().FURL + 'notifications');
            var notifications = $firebaseArray(notificationsRef);
            var notification = {
              to: $scope.currentOrganizer.id,
              text: 'Hurray!!! Someone wants to sponsor your event ' + $scope.currentEvent.title + ' =)',
              link: '#/organizers/sponzorships'
            };
            notifications.$add(notification);
            sponzorshipRequest.sendSponzorshipEmailOrganizer(info).success(function() {});
            ngDialog.closeAll();
            $scope.message = 'sponzorshipCreatedSuccesfuly';
            ngDialog.open({
              template: 'views/templates/successDialog.html',
              scope: $scope,
              showClose: false
            });
          }).error(function() {
            ngDialog.closeAll();
            $scope.message = 'youCanNotSponzorThisEvent';
            ngDialog.open({
              template: 'views/templates/errorDialog.html',
              scope: $scope,
              showClose: false
            });
          });
        }).error(function() {
          $scope.message = 'youCanNotSponzorThisEvent';
          ngDialog.open({
            template: 'views/templates/errorDialog.html',
            scope: $scope,
            showClose: false
          });
        });
      };
      $scope.toggleSidebar = function() {
        $scope.tolsctive = !$scope.tolsctive;
        if ($scope.tolsctive === true) {
          $scope.tolsctive = 'active';
        }
      };
      $scope.getAllEvents();
      $scope.menuprincipal = 'views/sponzors/menu.html';
    }
  }
  angular.module('sponzorme')
    .controller('SponzorsMainController', SponzorsMainController);

})();
