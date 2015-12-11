'use strict';
(function() {
  function OrganizersEventbriteController($scope, $translate, $localStorage, eventTypeRequest,  $location, $rootScope, $routeParams, eventbriteRequest) {
    $rootScope.userValidation('0');
    eventbriteRequest.getEventbriteAuth($routeParams.code).success(function(data){
      $localStorage.eventBriteBeared = response.access_token;
      $location.path('/organizers/add/event');
    }).error(function(data){
      console.log(data);
    });
    $scope.menuprincipal = 'views/organizers/menu.html';
  }
  angular.module('sponzorme')
    .controller('OrganizersEventbriteController', OrganizersEventbriteController);

})();
