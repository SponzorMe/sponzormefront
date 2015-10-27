'use strict';
(function(){

function validateUser(){

}

function OrganizersMainController($scope, $translate, $sessionStorage, $localStorage, $location, userRequest, eventRequest, rssRequest, usSpinnerService, $rootScope, sponzorshipRequest) {
  $rootScope.userValidation("0");
  $scope.loadingevents = true;
  $scope.loadingrss = true;
  $scope.tolsctive = 'active';
  $scope.emailuser = $sessionStorage.email;
  $scope.userfroups = 0;
  $translate.use(idiomaselect);
  $scope.startcounter = 0;
  $scope.eventos = {};
  $scope.eventos.size = 'calculating';
  $scope.event = {};
  $scope.peaks = [];
  $scope.sponzors = {};
  $scope.sponzors.size = 'calculating';
  $scope.sponzors.balance = 'calculating';
  $scope.users = {};
  $scope.users.size = 0;
  sponzorshipRequest.oneSponzorshipByOrganizer($sessionStorage.id).success(function(data) {
    $scope.sponzors.size = 0;
    $scope.sponzors.balance = 0;
    angular.forEach(data.SponzorsEvents, function(value) {
      if (value.status === "1") {
        $scope.sponzors.balance = parseInt($scope.sponzors.balance) + parseInt(value.usd);
      }
    });
    $scope.sponzors.size = data.SponzorsEvents.length;
  });
  if (!$localStorage.sponzorme) {
    userRequest.oneUser($sessionStorage.id).success(function(adata) {
      $scope.events = [];

      $scope.users.size = adata.data.user.comunity_size;
      var datuser = JSON.stringify(adata.data.user);
      $localStorage.sponzorme = datuser;
      $scope.events = adata.data.user.events;
      $scope.eventos.size = $scope.events.length;
      usSpinnerService.stop('spinner-2');
      $scope.loadingevents = false;
      if($scope.events[0]){
        $scope.event.current = $scope.events[0].id;
      }      
    });
  } else {
    var sponzormeObj = JSON.parse($localStorage.sponzorme);
    $scope.events = [];
    $scope.users.size = sponzormeObj.comunity_size;
    $scope.events = sponzormeObj.events;
    $scope.eventos.size = $scope.events.length;
    usSpinnerService.stop('spinner-2');
    $scope.loadingevents = false;
    if($scope.events[0]){
        $scope.event.current = $scope.events[0].id;
      }  
  }

  $scope.$watch('event.current', function(newvalue) {
    $scope.loadingpeaks = true;
    $scope.noPerksMessage = false;
    if ($scope.event.current) {
      eventRequest.oneEvent(newvalue).success(function(adata) {
        $scope.peaks = adata.data.event.perks;
        $scope.loadingpeaks = false;
        if (!$scope.peaks[0]) {
          $scope.noPerksMessage = true;
        } else {
          $scope.noPerksMessage = false;
        }
      }).error(function() {
        $scope.loadingpeaks = false;
        $scope.noPerksMessage = true;
      });
    }
  });
  $scope.rss = [];
  rssRequest.rss(idiomaselect).success(function(data) {
    $scope.rss = data.responseData.feed.entries;
    $scope.loadingrss = false;
  }).error(function() {
    $scope.loadingrss = false;
    $scope.noRssMessage = true;
  });

  $scope.tolsctive = 'active';
  $scope.toggleSidebar = function() {
        $scope.tolsctive = !$scope.tolsctive;
        if($scope.tolsctive === true){
           $scope.tolsctive = 'active';
        }
    };

  $scope.menuprincipal = 'views/organizers/menu.html';
}

angular.module('sponzorme')
.controller('OrganizersMainController', OrganizersMainController);

})();
