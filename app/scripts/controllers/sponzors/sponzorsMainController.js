'use strict';
(function(){

function SponzorsMainController($scope, $translate, $sessionStorage, userRequest, $localStorage, eventRequest, $location, usSpinnerService, ngDialog, sponzorshipRequest, perkTaskRequest, perkRequest, taskSponzorRequest, $rootScope) {
  $rootScope.userValidation("1");
  $scope.loadingsearch = true;

    var cookie = $sessionStorage.cookiesponzorme;

    if (cookie === undefined) {
      $scope.vieuser = 1;
    } else {
      $scope.vieuser = 0;
    }

    var typeini = $sessionStorage.typesponzorme;
    if (typeini !== undefined) {
      if (typeini === '1') {
        $scope.typeuser = 0;
      } else {
        $scope.typeuser = 1;
      }
    }

    $scope.userfroups = 0;
    $scope.account = [];

    if (!$localStorage.sponzorme) {
      userRequest.oneUser($sessionStorage.id).success(function(adata) {
        var datuser = JSON.stringify(adata.data.user);
        $localStorage.sponzorme = datuser;
        $scope.account = adata.data.user;
      });

    } else {
      var sponzormeObj = JSON.parse($localStorage.sponzorme);
      $scope.todo = sponzormeObj.perk_tasks;
      $scope.sponzors = sponzormeObj.sponzorships;
      $scope.account = sponzormeObj;
    }

    $scope.searchloading = true;
    $scope.getAllEvents = function() {
      eventRequest.allEvents().success(function(adata) {
        $scope.search = [];
        $scope.search = adata.events;
        $scope.searchloading = 0;
        $scope.loadingsearch = false;
        $scope.setUpcomingEvents();
        $scope.setBestEvents();
      });
    };
    $scope.setUpcomingEvents = function() {
      $scope.upcomingEvents = [];
      var currentDate = new Date();
      for (var i = 0; i < $scope.search.length; i++) { //Choose randomly events
        var eventDate = new Date($scope.search[i].starts);
        if (eventDate > currentDate) {
          $scope.upcomingEvents.push($scope.search[i]);
        }
      }
    };
    $scope.setBestEvents = function() {
      $scope.bestEvents = [];
      for (var i = 0; i < $scope.search.length / 2; i++) { //Choose randomly events
        if ($scope.bestEvents.indexOf($scope.search[Math.floor(Math.random() * $scope.search.length)]) === -1) {
          $scope.bestEvents.push($scope.search[Math.floor(Math.random() * $scope.search.length)]);
        }
      }
    };
    $scope.showPerks = function(eventId) {
        $scope.loadingpeaks = true;
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
          ngDialog.open({
            template: 'perks',
            scope: $scope
          });
        }).error(function(eData) {
            console.log(eData);
        });
      };
      //We display the form to get the sponzorship cause
    $scope.formCreateSponzorship = function(perk) {
      $scope.perkToSponzor = perk;
      console.log($scope.perkToSponzor);
      ngDialog.open({
        template: 'formCreateSponzorship',
        scope: $scope
      });
    };
    $scope.createSponzorship = function() {
      /**
        this function have two steps, first, create the sponzorhip
        second create the sponzor tasks
      */
      var data = {
        status: 0,
        'sponzor_id': $sessionStorage.id,
        'perk_id': $scope.perkToSponzor.id,
        'event_id': $scope.perkToSponzor.id_event,
        'cause': $scope.perkToSponzor.cause,
        'organizer_id': $scope.currentOrganizer.id
      };
      console.log(data);

      ngDialog.closeAll();
      sponzorshipRequest.createSponzorship(data).success(function(sData) {
        perkRequest.onePerk($scope.perkToSponzor.id).success(function(sPerkData) {
          angular.forEach(sPerkData.data.Tasks, function(value) {
            var taskSponzor = {
              status: 0,
              'sponzor_id': $sessionStorage.id,
              'perk_id': $scope.perkToSponzor.id,
              'event_id': $scope.perkToSponzor.id_event,
              'organizer_id': $scope.currentOrganizer.id,
              'sponzorship_id': sData.Sponzorship.id,
              'task_id': value.id
            };
            taskSponzorRequest.createTaskSponzor(taskSponzor).success(function(){});
          });
          ngDialog.open({
            template: 'SponzorshipComplete'
          });
          $location.path('/sponsors/following'); //redirection to Following page
        }).error(function(eData) {
          console.log(eData);
        });
      }).error(function(eData) {
        console.log(eData);
      });
    };
    $scope.tolsctive = 'active';
    $scope.toggleSidebar = function() {
          $scope.tolsctive = !$scope.tolsctive;
          if($scope.tolsctive === true){
             $scope.tolsctive = 'active';
          }
      };
    $scope.getAllEvents();
    $scope.menuprincipal = 'views/sponzors/menu.html';
}

angular.module('sponzorme')
.controller('SponzorsMainController', SponzorsMainController);

})();
