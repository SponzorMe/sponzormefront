'use strict';
(function () {

  function SponzorsSponzorshipsController($scope, $translate, $location, taskSponzorRequest, perkTaskRequest, sponzorshipRequest, $localStorage, userRequest, ngDialog, $rootScope, ratingRequest) {
    if ($rootScope.userValidation('1')) {

      $scope.user = JSON.parse($localStorage.user);
      if (!$scope.user.acceptedSponzorships) {
        $scope.user.acceptedSponzorships = $scope.user.sponzorships.filter(function (e) {
          if (e.status > '0') {
            return e;
          }
        });
        $localStorage.user = JSON.stringify($scope.user);
      }
      console.log($scope.user.acceptedSponzorships);
      $scope.showTasks = function (sponzorship) {
        $scope.currentSponzorship = sponzorship;
        if (sponzorship.task_sponzor) {
          $scope.organizerTasks = sponzorship.task_sponzor.filter(function (element) {
            if (element.task.type === '0') {
              return element;
            }
          });
          $scope.sponzorTasks = sponzorship.task_sponzor.filter(function (element) {
            if (element.task.type === '1') {
              return element;
            }
          });
        }
      };
 
      
      $scope.sendToRating = function (s) {
        sponzorshipRequest.oneSponzorship(s.id).success(function (sData) {
          ratingRequest.ratingBySponzorship(s.id, 1).success(function (s2Data) {
            $scope.loadingForm = false; //Loading
            $rootScope.closeAllDialogs(); //Close Loading
            if (s2Data.data.Rating[0] && s2Data.data.Rating[0].sponzor_id === $localStorage.id) {
              $rootScope.showDialog('error', 'ratingAlreadyRated', false);
            } else {
              $location.path('/sponzors/rating/' + s.id);
            }
          });
        });
      };
      $scope.paymentInformation = function (sponzorship) {
        $scope.PAYPALCOMPLETERETURNURL = $rootScope.getConstants().PAYPALCOMPLETERETURNURL;
        $scope.PAYPALIPNRETURNURL = $rootScope.getConstants().PAYPALIPNRETURNURL;
        $scope.PAYPALEMAIL = $rootScope.getConstants().PAYPALEMAIL;
        $scope.sponzorship = sponzorship;
        $scope.paymentValue = sponzorship.usd;
        $scope.fee = parseFloat((sponzorship.usd * $rootScope.getConstants().FEE) + $rootScope.getConstants().XOOMRATE);
        $scope.paymentTotal = parseFloat(sponzorship.usd) + parseFloat($scope.fee);
        ngDialog.open({
          scope: $scope,
          template: 'views/templates/prePaymentInfo.html',
          showClose: true
        });
      };
      //This function changes to 1 the sponzor task status
      $scope.completeTask = function (index) {
        $scope.tasksSponzor[index].status = 1;
        var taskSponzorId = $scope.tasksSponzor[index].id;
        var data = {
          status: 1
        };
        taskSponzorRequest.editTaskSponzorPatch(taskSponzorId, data).success(function () { });
      };
      //This function changes to 0 the sponzor task status
      $scope.uncompleteTask = function (index) {
        $scope.tasksSponzor[index].status = 0;
        var taskSponzorId = $scope.tasksSponzor[index].id;
        var data = {
          status: 0
        };
        taskSponzorRequest.editTaskSponzorPatch(taskSponzorId, data).success(function () { });
      };
      $scope.deleteTaskSponzor = function (index) {
        var taskSponzorId = $scope.tasksSponzor[index].id;
        taskSponzorRequest.deleteTaskSponzor(taskSponzorId).success(function () { });
        $scope.tasksSponzor.splice(index, 1);
      };        
      $scope.showTaskForm = function () {
        $scope.todo = {
          type: 1,//Because is created by the Sponzor
          status: 0, //By default is not complete
          perk: $scope.currentSponzorship.perk.id,
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
      $scope.saveTaskSponzor = function(){
        $rootScope.showLoading();
        taskSponzorRequest.createTaskSponzor($scope.todo).then(function successCallback(response){
          
          //PerkTask with perkTasks.
          //SponzorTask>with task.
          
          $rootScope.closeAllDialogs();
          $rootScope.showDialog('success', 'taskCreatedSuccesfuly', false);
        }, function errorCallback(error){
          $rootScope.closeAllDialogs();
          $rootScope.showDialog('error', 'errorCreatingTask', false);
        });
      };
      
      if($scope.user.acceptedSponzorships){
        $scope.showTasks($scope.user.acceptedSponzorships[0]);
      }
    }
  }
  angular.module('sponzorme').controller('SponzorsSponzorshipsController', SponzorsSponzorshipsController);
})();
