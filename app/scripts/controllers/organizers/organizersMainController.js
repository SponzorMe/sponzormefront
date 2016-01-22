'use strict';
(function() {
  function OrganizersMainController($scope, $translate, $localStorage, rssRequest, $rootScope) {
    if ($rootScope.userValidation('0')) {
      $scope.section = {
        route: 'Dashboard',
        title: 'Dashboard'
      };
      $scope.loadingevents = false;
      $scope.loadingrss = true;
      $scope.user = JSON.parse($localStorage.user);
      $scope.user.balance = 0;
      angular.forEach($scope.user.sponzorships_like_organizer, function(value) {
        if (value.status === '1') {
          $scope.user.balance = parseInt($scope.user.balance) + parseInt(value.perk.usd);
        }
      });
      if ($scope.user.events) {
        $scope.currentEvent = $scope.user.events[0];
      }
      $scope.showPerk = function(e) {
        $scope.currentEvent = e;
      };
      $scope.rss = [];
      rssRequest.rss($rootScope.currentLanguage()).success(function(data) {
        $scope.rss = data.responseData.feed.entries;
        $scope.loadingrss = false;
      }).error(function() {
        $scope.loadingrss = false;
        $scope.noRssMessage = true;
      });
      $scope.menuprincipal = 'views/organizers/menu.html';
    }
  }
  angular.module('sponzorme').controller('OrganizersMainController', OrganizersMainController);

})();
