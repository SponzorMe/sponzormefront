'use strict';
(function() {
  function EventPageController($scope, $routeParams, $translate, $localStorage, $location, eventRequest, ngDialog, sponzorshipRequest, perkRequest, taskSponzorRequest, $rootScope) {
    $scope.eventLoaded = false;
    $scope.event = {};
    eventRequest.oneEvent($routeParams.eventId).success(function(data) {
      $scope.eventLoaded = true;
      $scope.evento = data.data;
      $scope.currentEvent = data.data.event.id;
      $scope.currentOrganizer = data.data.organizer[0];
      $scope.eventURL = $location.absUrl();
    }).error(function() {
      $scope.eventLoaded = true;
    });
    if ($localStorage.typesponzorme === '1' && !$rootScope.isExpiredData()) { //He is an sponzor
      $scope.isSponzor = true;
      $scope.isNoLogged = false;
    } else if ($localStorage.typesponzorme === '0' && !$rootScope.isExpiredData()) { //He is an organizer
      $scope.isSponzor = false;
      $scope.isNoLogged = false;
    } else { //He is a guest
      $scope.isSponzor = false;
      $scope.isNoLogged = true;
    }
    //We display the form to get the sponzorship cause
    $scope.formCreateSponzorship = function(perk) {
      $scope.perkToSponzor = perk;
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
        'sponzor_id': $localStorage.id,
        'perk_id': $scope.perkToSponzor.id,
        'event_id': $scope.perkToSponzor.id_event,
        'cause': $scope.perkToSponzor.cause,
        'organizer_id': $scope.currentOrganizer.id
      };
      ngDialog.closeAll();
      ngDialog.open({
        template: 'views/templates/loadingDialog.html',
        showClose: false
      });
      sponzorshipRequest.createSponzorship(data, $localStorage.token).success(function(sData) {
        var cont = 0;
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
            taskSponzorRequest.createTaskSponzor(taskSponzor, $localStorage.token)
              .success(function() {
                cont++;
              });
            if (cont === sPerkData.data.Tasks.length - 1) {
              $scope.message = 'sponzorshipCreatedSuccesfuly';
              ngDialog.closeAll();
              ngDialog.open({
                template: 'views/templates/successDialog.html',
                showClose: false,
                scope: $scope
              });
            }
          });
          if (sPerkData.data.Tasks.length === 0) {
            $scope.message = 'sponzorshipCreatedSuccesfuly';
            ngDialog.closeAll();
            ngDialog.open({
              template: 'views/templates/successDialog.html',
              showClose: false,
              scope: $scope
            });

          }
        }).error(function() {
          $scope.message = 'eventPageErrorSponzoringEvent';
          ngDialog.closeAll();
          ngDialog.open({
            template: 'views/templates/errorDialog.html',
            showClose: false,
            scope: $scope
          });
        });

      }).error(function() {
        $scope.message = 'eventPageErrorSponzoringEvent';
        ngDialog.closeAll();
        ngDialog.open({
          template: 'views/templates/errorDialog.html',
          showClose: false,
          scope: $scope
        });
      });
    };
  }
  angular.module('sponzorme').controller('EventPageController', EventPageController);
})();
