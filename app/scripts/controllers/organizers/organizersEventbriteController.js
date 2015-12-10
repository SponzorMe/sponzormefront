'use strict';
(function() {
  function JSONize(str) {
    return str
      // wrap keys without quote with valid double quote
      .replace(/([\$\w]+)\s*:/g, function(_, $1){return '"'+$1+'":'})
      // replacing single quote wrapped ones to double quote
      .replace(/'([^']+)'/g, function(_, $1){return '"'+$1+'"'})
  }
  function OrganizersEventbriteController($scope, $translate, $localStorage, eventTypeRequest,  $location, $rootScope, $routeParams, eventbriteRequest, ngDialog) {
    $rootScope.userValidation('0');
    $scope.getEventbriteEvents = function(accessToken){
      eventbriteRequest.getEventbriteEvents(accessToken)
      .success(function(data){
        console.log(data);
        $scope.loadingGetEvents = false;
        $scope.evenbriteEvents = data.events;
      });
    };
    console.log("entr");
    $scope.loadingGetToken = true;
    $scope.loadingGetEvents = false;
    if($localStorage.eventBriteBeared){
      $scope.loadingGetToken = false;
      $scope.loadingGetEvents = true;
      $scope.conectionDone = true;
      $scope.getEventbriteEvents($localStorage.eventBriteBeared);
    }
    else{
      eventbriteRequest.getEventbriteAuth($routeParams.code).success(function(data){
        var response = JSON.parse(JSONize(data.response));
        if(response.error){
          console.log(response);
          $scope.loadingGetToken = false;
          $scope.reconnectEventbrite = true;
          $scope.conectionDone = false;
        }
        else{
          $localStorage.eventBriteBeared = response.access_token;
          console.log(response);
          $scope.loadingGetToken = false;
          $scope.loadingGetEvents = true;
          $scope.conectionDone = true;
          $scope.getEventbriteEvents(response.access_token);
        }
      });
    };
    $scope.prefilEventForm = function(url){
      eventbriteRequest.getEventbriteEvent(url,$localStorage.eventBriteBeared)
      .success(function(data){
        console.log(data.name.text);
        $scope.titleevent = data.name.text;
        ngDialog.closeAll();
      });
    };

    $scope.menuprincipal = 'views/organizers/menu.html';
  }

  angular.module('sponzorme')
    .controller('OrganizersEventbriteController', OrganizersEventbriteController);

})();
