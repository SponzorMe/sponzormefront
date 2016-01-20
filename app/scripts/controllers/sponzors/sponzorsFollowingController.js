'use strict';
(function() {

  function SponzorsFollowingController($scope, $localStorage, sponzorshipRequest, $rootScope) {
    if($rootScope.userValidation('1')){
      $scope.user = JSON.parse($localStorage.user);
      if(!$scope.user.pendingSponzorships){
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
        sponzorshipRequest.deleteSponzorship(sponzorshipId).then(function successCallback(response){
          $scope.user.pendingSponzorships.splice(index, 1);
          $scope.user.sponzorships = $scope.user.sponzorships.filter(function(e) {
            if (e.id != sponzorshipId) {
              return e;
            }
          });
          $localStorage.user = JSON.stringify($scope.user);
          if($scope.user.pendingSponzorships[0]){
            $scope.showTasks($scope.user.pendingSponzorships[0]);
          }
          $rootScope.closeAllDialogs();
        }, function errorCallback(err){
          $rootScope.closeAllDialogs();
          $rootScope.showDialog('error', 'problem', false);
        });
      };      
      if($scope.user.pendingSponzorships[0]){
        $scope.showTasks($scope.user.pendingSponzorships[0]);
      }      
    }
  }
  angular.module('sponzorme').controller('SponzorsFollowingController', SponzorsFollowingController);

})();
