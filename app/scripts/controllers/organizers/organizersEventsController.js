'use strict';
(function() {

  function OrganizersEventsController($scope, $translate, $localStorage, eventTypeRequest, eventRequest, ngDialog, categoryRequest, userRequest, perkRequest, perkTaskRequest, $location, usSpinnerService, taskSponzorRequest, $rootScope, $timeout) {
    if ($rootScope.userValidation('0')) {
      //Vars Initialization
      $scope.error_log = '';
      $scope.eventos = [];
      $scope.currentPerkId = 0;
      $scope.currentPerk = {};
      $scope.tolsctive = 'active';
      $scope.emailuser = $localStorage.email;
      $scope.file = false; //By default no file to add.
      $scope.event = {};
      eventTypeRequest.allEventTypes().success(function(adata) {
        $scope.type = {};
        $scope.type.list = adata.eventTypes;
        $scope.typefilter = adata.eventTypes;
      });
      $scope.categorias = {};
      categoryRequest.allCategories().success(function(adata) {
        $scope.categorias.list = adata.categories;
        $scope.categoriasfilter = adata.categories;
      });
      $scope.getEventsByOrganizer = function(userId) {
        $scope.loadingEvents = true;
        $scope.noEventsMessage = false;
        $scope.loadingtasks = true;
        $scope.noTasksMessage = false;
        $scope.loadingPerks = true;
        $scope.noPerksMessage = false;
        userRequest.oneUser(userId).success(function(adata) {
          $scope.eventos = adata.data.user.events;
          $scope.loadingEvents = false;
          if ($scope.eventos[0]) {
            $scope.event.current = $scope.eventos[0].id;
          } else {
            $scope.loadingtasks = false;
            $scope.loadingPerks = false;
            $scope.noEventsMessage = true;
          }
        });
      };
      $scope.toggleSidebar = function() {
        $scope.tolsctive = !$scope.tolsctive;
        if ($scope.tolsctive === true) {
          $scope.tolsctive = 'active';
        }
      };

      $scope.updatePerks = function(idevent) {
        $scope.loadingPerks = true; //We need put in load mode the widget
        $scope.noPerksMessage = false; //We suppose that exists persks
        $scope.loadingtasks = true; //Because we gonna get perk first and then tasks
        if (idevent) {
          eventRequest.oneEvent(idevent).success(function(adata) {
            $scope.peaks = adata.data.event.perks;
            if (!$scope.peaks[0]) {
              $scope.noPerksMessage = true;
              $scope.loadingPerks = false;
              $scope.currentPerk.Tasks = [];
              $scope.noTasksMessage = true;
              $scope.loadingtasks = false;
            } else {
              $scope.loadingPerks = false; //If here is because exists perks
              $scope.getPerk($scope.peaks[0].id); //We get the perks detail that include tasks
            }
          }).error(function() {
            $scope.loadingpeaks = false;
            $scope.noPerksMessage = true;
            $scope.currentPerk.Tasks = [];
            $scope.noTasksMessage = true;
            $scope.loadingtasks = false;
          });
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
      $scope.getPerk = function(perkId) {
        $scope.loadingtasks = true;
        $scope.noTasksMessage = false;
        $scope.currentPerkId = perkId;
        perkRequest.onePerk(perkId).success(function(adata) {
          $scope.currentPerk = adata.data;

          if (!$scope.currentPerk.Tasks[0]) { //If here no tasks in this perk
            $scope.noTasksMessage = true;
            $scope.loadingtasks = false;
          } else { //If here there are tasks
            $scope.noTasksMessage = false;
            $scope.loadingtasks = false;
          }
        }).error(function() {
          $scope.loadingtasks = false;
          $scope.noPerksMessage = true;
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
        $scope.todo.perk_id = $scope.currentPerkId;
        $scope.todo.event_id = $scope.event.current;
        $scope.todo.status = 0; //We put the defaul status
        $scope.todo.user_id = $localStorage.id; //Get the organizer Id
        $scope.todo.type = 0; //If task is created by organizer the type is 0
        perkTaskRequest.createPerkTask($scope.todo).success(function() {
          $rootScope.closeAllDialogs();
          $rootScope.showDialog('success', 'taskCreatedSuccesfuly', false);
          $scope.getPerk($scope.currentPerkId); //Refresh perks data.
        }).error(function(data) {
          $rootScope.closeAllDialogs();
          $rootScope.showDialog('error', 'errorCreatingTask', false);
        });
      };

      $scope.removeTask = function(task_id) {
        $rootScope.showLoading();
        perkTaskRequest.deletePerkTask(task_id).success(function(adata) {
          $rootScope.closeAllDialogs();
          $rootScope.showDialog('success', 'taskDeletedSuccessfuly', false);
          $scope.getPerk($scope.currentPerkId);
        }).error(function() {
          $rootScope.closeAllDialogs();
          $rootScope.showDialog('error', 'errorDeletingTask', false);
        });
      };

      $scope.getEventsByOrganizer($localStorage.id); //Here start the callback
      $translate.use(idiomaselect);
      $scope.$watch('event.current', function(newvalue) {
        if (newvalue !== '' && newvalue !== '0' && typeof newvalue !== 'undefined') { //Some validation to ensure no empty values
          $scope.updatePerks(newvalue);
        }
      });
      $scope.menuprincipal = 'views/organizers/menu.html';
    }
  }

  angular.module('sponzorme')
    .controller('OrganizersEventsController', OrganizersEventsController);

})();
