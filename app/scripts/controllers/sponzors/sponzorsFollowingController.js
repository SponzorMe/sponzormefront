'use strict';
(function() {

  function SponzorsFollowingController($scope, $translate, $localStorage, sponzorshipRequest, $rootScope) {
    if ($rootScope.userValidation('1')) {
      $scope.section = {
        route: 'Events / Follwing',
        title: 'Following Events'
      };
      $scope.user = JSON.parse($localStorage.user);
      if (!$scope.user.pendingSponzorships) {
        $scope.user.pendingSponzorships = $scope.user.sponzorships.filter(function(e) {
          if (e.status === '0') {
            return e;
          }
        });
        $localStorage.user = JSON.stringify($scope.user);
      }

      $scope.showTasks = function(sponzorship) {
        $scope.currentSponzorship = sponzorship;
        $scope.tasksSponzor = sponzorship.perk.tasks.filter(function(element) {
          if (element.type === '0') {
            return element;
          }
        });
      };
      //this function deletes an sponzorship if the status is 0
      $scope.deleteSponzorship = function(sponzorshipId, index) {
        $rootScope.showLoading();
        sponzorshipRequest.deleteSponzorship(sponzorshipId).then(function successCallback(response) {
          var firebaseNotification = {
            to: $scope.user.pendingSponzorships[index].organizer.id,
            text: $scope.user.name + $translate.instant('NOTIFICATIONS.SponzorshipCancell') + $scope.user.pendingSponzorships[index].event.title,
            link: '#/organizers/sponzors'
          };
          $rootScope.sendFirebaseNotification(firebaseNotification, $scope.user.pendingSponzorships[index].organizer.id);
          $scope.user.pendingSponzorships.splice(index, 1);
          $scope.user.sponzorships = $scope.user.sponzorships.filter(function(e) {
            if (e.id !== sponzorshipId) {
              return e;
            }
          });
          $localStorage.user = JSON.stringify($scope.user);
          if ($scope.user.pendingSponzorships[0]) {
            $scope.showTasks($scope.user.pendingSponzorships[0]);
          }
          $rootScope.closeAllDialogs();
        }, function errorCallback() {
          $rootScope.closeAllDialogs();
          $rootScope.showDialog('error', 'problem', false);
        });
      };
      if ($scope.user.pendingSponzorships[0]) {
        $scope.showTasks($scope.user.pendingSponzorships[0]);
      }
    }
  }
  angular.module('sponzorme').controller('SponzorsFollowingController', SponzorsFollowingController);

})();
