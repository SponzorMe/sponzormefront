'use strict';
(function() {

  function SponzorsSponzorshipsController($scope, $location, taskSponzorRequest, sponzorshipRequest, $localStorage, ngDialog, $rootScope, ratingRequest) {
    if ($rootScope.userValidation('1')) {
      $scope.section = {
        route:'Events / Sponzoring',
        title: 'Sponzoring Events'
      };
      $scope.todayDate = new Date().getTime();
      $scope.user = JSON.parse($localStorage.user);
      if (!$scope.user.acceptedSponzorships) {
        $scope.user.acceptedSponzorships = $scope.user.sponzorships.filter(function(e) {
          if (e.status > '0') {
            e.event.ends = new Date(e.event.ends).getTime();
            return e;
          }
        });
        $localStorage.user = JSON.stringify($scope.user);
      }
      $scope.saveStatus = function() {
        for (var i = 0; i < $scope.user.acceptedSponzorships.length; i++) {
          if ($scope.user.acceptedSponzorships[i].id === $scope.currentSponzorship.id) {
            $scope.user.acceptedSponzorships[i] = $scope.currentSponzorship;
            break;
          }
        }
        //We update in general Sponzorships
        for (var i = 0; i < $scope.user.sponzorships.length; i++) {
          if ($scope.user.sponzorships[i].id === $scope.currentSponzorship.id) {
            $scope.user.sponzorships[i] = $scope.currentSponzorship;
            break;
          }
        }
        $localStorage.user = JSON.stringify($scope.user);
      };
      $scope.showTasks = function(sponzorship) {
        $scope.currentSponzorship = sponzorship;
        if (sponzorship.task_sponzor) {
          $scope.organizerTasks = sponzorship.task_sponzor.filter(function(element) {
            if (element.task.type === '0') {
              return element;
            }
          });
          $scope.sponzorTasks = sponzorship.task_sponzor.filter(function(element) {
            if (element.task.type === '1') {
              return element;
            }
          });
        }
      };
      $scope.paymentInformation = function(sponzorship) {
        $scope.PAYPALCOMPLETERETURNURL = $rootScope.getConstants().PAYPALCOMPLETERETURNURL;
        $scope.PAYPALIPNRETURNURL = $rootScope.getConstants().PAYPALIPNRETURNURL;
        $scope.SANDBOX = $rootScope.getConstants().PAYPALSANDBOX;
        $scope.PAYPALEMAIL = $rootScope.getConstants().PAYPALEMAIL;
        $scope.sponzorship = sponzorship;
        $scope.paymentValue = sponzorship.perk.usd;
        $scope.fee = parseFloat((sponzorship.perk.usd * $rootScope.getConstants().FEE) + $rootScope.getConstants().XOOMRATE);
        $scope.paymentTotal = parseFloat(sponzorship.perk.usd) + parseFloat($scope.fee);
        ngDialog.open({
          scope: $scope,
          template: 'views/templates/prePaymentInfo.html',
          showClose: true
        });
      };
      //This function changes to 1 the sponzor task status
      $scope.changeStatus = function(index, status) {
        $scope.sponzorTasks[index].loading = true;
        var taskSponzorId = $scope.sponzorTasks[index].id;
        var data = {
          status: status
        };
        taskSponzorRequest.editTaskSponzorPatch(taskSponzorId, data).then(function successCallBack(response) {
          $scope.sponzorTasks[index].loading = false;
          $scope.sponzorTasks[index].status = status;
          $scope.saveStatus();
        }, function errorCallback(err) {
          $scope.sponzorTasks[index].loading = false;
          $rootScope.showDialog('error', 'errorUpdatingTaskStatus', false);
        });
      };
      $scope.deleteTaskSponzor = function(index) {
        $scope.sponzorTasks[index].loading = true;
        var taskSponzorId = $scope.sponzorTasks[index].id;
        taskSponzorRequest.deleteTaskSponzor(taskSponzorId).then(function successCallback(response) {
          for (var i = 0; i < $scope.currentSponzorship.task_sponzor.length; i++) {
            if ($scope.currentSponzorship.task_sponzor[i].id === taskSponzorId) {
              $scope.currentSponzorship.task_sponzor.splice(i, 1);
              break;
            }
          }
          $scope.sponzorTasks.splice(index, 1);
          $scope.saveStatus();
        }, function errorCallback(err) {
          $scope.sponzorTasks[index].loading = false;
          $rootScope.showDialog('error', 'errorRemovingTaskSponzor', false);
        });
      };
      $scope.showTaskForm = function() {
        $scope.todo = {
          type: 1, //Because is created by the Sponzor
          status: 0, //By default is not complete
          perk_id: $scope.currentSponzorship.perk.id,
          event_id: $scope.currentSponzorship.event_id,
          sponzorship_id: $scope.currentSponzorship.id,
          user_id: $localStorage.id,
          organizer_id: $scope.currentSponzorship.organizer.id,
          sponzor_id: $localStorage.id,
          title: '',
          description: ''
        };
        ngDialog.open({
          template: 'views/templates/newTaskForm.html',
          scope: $scope,
          showClose: false
        });
      };
      $scope.addTask = function() {
        $rootScope.closeAllDialogs();
        $rootScope.showLoading();
        taskSponzorRequest.createTaskSponzor($scope.todo).then(function successCallback(response) {
          $scope.currentSponzorship.perk.tasks.push(response.data.PerkTask);
          $scope.currentSponzorship.task_sponzor.push(response.data.TaskSponzor);
          $scope.saveStatus();
          $scope.showTasks($scope.currentSponzorship);
          $rootScope.closeAllDialogs();
          $rootScope.showDialog('success', 'taskCreatedSuccesfuly', false);
        }, function errorCallback(err) {
          console.log(err);
          $rootScope.closeAllDialogs();
          $rootScope.showDialog('error', 'errorCreatingTask', false);
        });
      };
      if ($scope.user.acceptedSponzorships.length) {
        $scope.showTasks($scope.user.acceptedSponzorships[0]);
      }
    }
  }
  angular.module('sponzorme').controller('SponzorsSponzorshipsController', SponzorsSponzorshipsController);
})();
