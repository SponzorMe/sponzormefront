'use strict';
(function() {

  function OrganizersEventsController($scope, $translate, $localStorage, eventTypeRequest, eventRequest, ngDialog, categoryRequest, userRequest, perkRequest, perkTaskRequest, $location, usSpinnerService, taskSponzorRequest, $rootScope, $timeout) {
    if ($rootScope.userValidation('0')) {
      $scope.user = JSON.parse($localStorage.user);
      if($scope.user.events){
        $scope.currentEvent = $scope.user.events[0];
        $scope.currentPerk = $scope.user.events[0].perks[0];
      }
      $scope.showPerks = function(e){
        $scope.currentEvent = e;
        $scope.currentPerk = e.perks[0];
      };
      $scope.showTasks = function(p){
        $scope.currentPerk = p;
      }

      $scope.imageEvent = function(image) {
        $scope.currentImage = image;
        ngDialog.open({
          template: 'views/templates/eventImage.html',
          scope: $scope,
          showClose: false
        });
      };

      $scope.removeEvent = function(idevent) {
        $rootScope.showLoading();
        eventRequest.oneEvent(idevent).success(function(adata) {
          if (adata.data.event.sponzorship.length === 0) { //If event does not have sponzorhips
            angular.forEach(adata.data.event.sponzor_tasks, function(value) {
              taskSponzorRequest.deleteTaskSponzor(value.id)
                .error(function(eData) {});
            });
            angular.forEach(adata.data.event.perk_tasks, function(value) { //First we delete the tasks
              perkTaskRequest.deletePerkTask(value.id)
                .error(function(eData) {});
            });
            angular.forEach(adata.data.event.perks, function(value) { //Then we delete the perks
              perkRequest.deletePerk(value.id)
                .error(function(eData) {});
            });
            $timeout(function() {
              eventRequest.deleteEvent(adata.data.event.id).success(function() {
                $rootScope.closeAllDialogs();
                $rootScope.showDialog('success', 'eventDeleteSuccesfully', false);
                $scope.getEventsByOrganizer($localStorage.id);
              }).error(function(eData) {
                $rootScope.closeAllDialogs();
                $rootScope.showDialog('error', 'errorDeletingEvent', false);
              });
            }, 5000);
          } else { //If event has sponzorhips we can not delete
            $rootScope.closeAllDialogs();
            $rootScope.showDialog('error', 'eventDeletingEventHasSponzorship', false);
          }
        });
      };
      $scope.showTaskForm = function() {
        $scope.todo = {};
        ngDialog.open({
          template: 'views/templates/newTaskForm.html',
          scope: $scope,
          showClose: false
        });
      };
      /*this function takes the current perk and the current event, and add a task for the
        selected perk.*/

      $scope.addTask = function() {
        $rootScope.closeAllDialogs();
        $rootScope.showLoading();
        $scope.todo.perk_id = $scope.currentPerk.id;
        $scope.todo.event_id = $scope.currentEvent.id;
        $scope.todo.status = 0; //We put the defaul status
        $scope.todo.user_id = $localStorage.id; //Get the organizer Id
        $scope.todo.type = 0; //If task is created by organizer the type is 0
        perkTaskRequest.createPerkTask($scope.todo).then(function successCallback(response) {
          $scope.todo.id=response.data.PerkTask.id;
          $scope.currentPerk.tasks.push($scope.todo);
          $localStorage.user = JSON.stringify($scope.user);
          $rootScope.closeAllDialogs();
          $scope.todo = {};
        }, function errorCallback(response) {
          $rootScope.closeAllDialogs();
          $rootScope.showDialog('error', 'errorCreatingTask', false);
        });
      };

      $scope.removeTask = function(task_id, index) {
        $rootScope.showLoading();
        perkTaskRequest.deletePerkTask(task_id).success(function(adata) {
          $rootScope.closeAllDialogs();
          $scope.currentPerk.tasks.splice(index, 1);
          $localStorage.user = JSON.stringify($scope.user);
          $rootScope.showDialog('success', 'taskDeletedSuccessfuly', false);
        }).error(function(data) {
          console.log(data);
          $rootScope.closeAllDialogs();
          $rootScope.showDialog('error', 'errorDeletingTask', false);
        });
      };
      $scope.menuprincipal = 'views/organizers/menu.html';
    }
  }

  angular.module('sponzorme')
    .controller('OrganizersEventsController', OrganizersEventsController);

})();
