'use strict';
(function() {

  function OrganizersEventsController($scope, $translate, $localStorage, eventRequest, ngDialog, perkTaskRequest, $rootScope, dialogRequest) {
    if ($rootScope.userValidation('0')) {
      $scope.section = {
        route: 'Events',
        title: 'Events'
      };
      $scope.showTasks = function(p) {
        $scope.currentPerk = p;
        if ($scope.currentPerk.tasks.length) {
          var aux = $scope.currentPerk.tasks.filter(function(element) {
            if (element.type === '0') {
              return element;
            }
          });
          p.tasks = {};
          p.tasks = aux;
        }
      };
      $scope.showPerks = function(e) {
        $scope.currentEvent = e;
        $scope.currentPerk = {};
        if ($scope.currentEvent.perks.length) {
          $scope.showTasks($scope.currentEvent.perks[0]);
        } else {
          $scope.currentEvent.perks = [];
          $scope.currentEvent.perks.tasks = [];
        }
      };
      $scope.imageEvent = function(image) {
        $scope.currentImage = image;
        ngDialog.open({
          template: 'views/templates/eventImage.html',
          scope: $scope,
          showClose: false
        });
      };
      $scope.hasSponzorship = function(idEvent) {
        for (var i = 0; i < $scope.user.sponzorships_like_organizer; i++) {
          if ($scope.user.sponzorships_like_organizer[i].event.id === idEvent) {
            return true;
          }
        }
        return false;
      };
      $scope.removeEvent = function(index) {
        dialogRequest.showLoading();
        if ($scope.hasSponzorship($scope.user.events[index].id)) {
          dialogRequest.closeLoading();
          dialogRequest.showDialog('error', 'eventDeletingEventHasSponzorship', false);
        } else {
          eventRequest.deleteEvent($scope.user.events[index].id).then(function successCallback(response) {
            $scope.user.events.splice(index, 1);
            $localStorage.user = JSON.stringify($scope.user);
            if ($scope.user.events[0]) {
              $scope.currentEvent = $scope.user.events[0];
              $scope.currentPerk = $scope.user.events[0].perks[0];
            } else {
              $scope.currentEvent = {};
              $scope.currentPerk = {};
            }
            dialogRequest.closeLoading();
            dialogRequest.showDialog('success', 'eventDeleteSuccesfully', false);
          }, function errorCallback(response) {
            dialogRequest.closeLoading();
            dialogRequest.showDialog('error', 'errorDeletingEvent', false);
          });
        }
      };
      $scope.showTaskForm = function(cP, cE) {
        $scope.todo = {};
        $scope.todo.perk_id = cP.id;
        $scope.todo.event_id = cE.id;
        $scope.todo.status = 0; //We put the defaul status
        $scope.todo.user_id = $localStorage.id; //Get the organizer Id
        $scope.todo.type = 0; //If task is created by organizer the type is 0
        $scope.todo.title = '';
        $scope.todo.description = '';
        ngDialog.open({
          template: 'views/templates/newTaskForm.html',
          scope: $scope,
          showClose: false
        });
      };
      /*this function takes the current perk and the current event, and add a task for the
        selected perk.*/
      $scope.addTask = function() {
        dialogRequest.closeLoading();
        dialogRequest.showLoading();
        perkTaskRequest.createPerkTask($scope.todo).then(function successCallback(response) {
          $scope.todo.id = response.data.PerkTask.id;
          for (var i = 0; i < $scope.user.events.length; i++) {
            if ($scope.user.events[i].id === response.data.PerkTask.event_id) {
              for (var j = 0; j < $scope.user.events[i].perks.length; j++) {
                if ($scope.user.events[i].perks[j].id === response.data.PerkTask.perk_id) {
                  $scope.user.events[i].perks[j].tasks.push(response.data.PerkTask);
                  break;
                }
              }
              break;
            }
          }
          $scope.user.sponzorships_like_organizer = response.data.sponzorships_like_organizer;
          $localStorage.user = JSON.stringify($scope.user);
          dialogRequest.closeLoading();
          $scope.todo = {};
        }, function errorCallback(response) {
          dialogRequest.closeLoading();
          dialogRequest.showDialog('error', 'errorCreatingTask', false);
        });
      };

      $scope.removeTask = function(task_id, index) {
        $scope.currentPerk.tasks[index].loading = true;
        perkTaskRequest.deletePerkTask(task_id).then(function successCallback(response) {
          $scope.user.sponzorships_like_organizer = response.data.sponzorships_like_organizer;
          $scope.currentPerk.tasks.splice(index, 1);
          $localStorage.user = JSON.stringify($scope.user);
        }, function errorCallback() {
          $scope.currentPerk.tasks[index].loading = false;
          dialogRequest.closeLoading();
          dialogRequest.showDialog('error', 'errorDeletingTask', false);
        });
      };
      $scope.user = JSON.parse($localStorage.user);
      if ($scope.user.events.length) {
        $scope.currentEvent = $scope.user.events[0];
        if ($scope.currentEvent.perks.length) {
          $scope.showPerks($scope.currentEvent);
        }
      }
      $scope.menuprincipal = 'views/organizers/menu.html';
    }
  }

  angular.module('sponzorme').controller('OrganizersEventsController', OrganizersEventsController);

})();
