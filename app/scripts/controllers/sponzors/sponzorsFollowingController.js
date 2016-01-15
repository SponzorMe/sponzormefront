'use strict';
(function() {

  function SponzorsFollowingController($scope, $translate, $localStorage, userRequest, sponzorshipRequest, perkRequest, taskSponzorRequest, ngDialog, $location, $rootScope, $timeout, $sce) {
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
      $scope.trustSrc = function(src) {
        return $sce.trustAsResourceUrl(src);
      }
      $scope.downloadCalendar = function(sponzorship) {
        var cal = ics();
        cal.addEvent(sponzorship.title, sponzorship.title, sponzorship.location, sponzorship.starts, sponzorship.ends);
      };
      $scope.openLocation = function(sponzorship) {
        $scope.currentEvent = sponzorship.event;
        $scope.mapSrc = "https://www.google.com/maps/embed/v1/place?key=AIzaSyDxXJIUmt5IDbqXuqNpD4ZssRl6aXBRhcU&q=" + encodeURIComponent($scope.currentEvent.location);
        ngDialog.open({
          template: 'views/templates/locationDialog.html',
          scope: $scope,
          showClose: true
        });
      };
      $scope.showTasks = function(sponzorship) {
        $scope.currentSponzorship = sponzorship;
        $scope.tasksSponzor = sponzorship.perk.tasks.filter(function(element) {
          if (element.type === '1') {
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
      //this function gets the tasks sponzorships by sponzorship id

      $scope.seeCause = function(sponzorship) {
        $scope.cause = sponzorship.cause;
        $scope.status = sponzorship.status;
        ngDialog.open({
          template: 'views/templates/sponzorshipCauseDialog.html',
          showClose: false,
          scope: $scope
        });
      };
      if($scope.user.pendingSponzorships[0]){
        $scope.showTasks($scope.user.pendingSponzorships[0]);
      }

      $scope.menuprincipal = 'views/sponzors/menu.html';
    }
  }
  angular.module('sponzorme')
    .controller('SponzorsFollowingController', SponzorsFollowingController);

})();
