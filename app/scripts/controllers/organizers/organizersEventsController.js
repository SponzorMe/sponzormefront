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
      $scope.hasSponzorship = function(idEvent){
        for(var i=0; i< $scope.user.sponzorships_like_organizer; i++){
          if($scope.user.sponzorships_like_organizer[i].event.id === idEvent){
            return true;
          }
        }
        return false;
      }

      $scope.removeEvent = function(index) {
        $rootScope.showLoading();
        if($scope.hasSponzorship($scope.user.events[index].id)){
          $rootScope.closeAllDialogs();
          $rootScope.showDialog('error', 'eventDeletingEventHasSponzorship', false);
        }
        else{
          eventRequest.deleteEvent($scope.user.events[index].id).then(function successCallback(response) {
            $scope.user.events.splice(index, 1);
            $localStorage.user = JSON.stringify($scope.user);
            if($scope.user.events[0]){
              $scope.currentEvent = $scope.user.events[0];
              $scope.currentPerk = $scope.user.events[0].perks[0];
            }
            else{
              $scope.currentEvent = {};
              $scope.currentPerk= {};
            }
            $rootScope.closeAllDialogs();
            $rootScope.showDialog('success', 'eventDeleteSuccesfully', false);
          }, function errorCallback(response) {
            $rootScope.closeAllDialogs();
            $rootScope.showDialog('error', 'errorDeletingEvent', false);
          });
        }
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
