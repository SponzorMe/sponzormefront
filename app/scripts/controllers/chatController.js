'use strict';
(function() {
  function ChatController($scope, $firebaseArray, $localStorage, $location, $routeParams, sponzorshipRequest, $rootScope) {
    if($localStorage.id){
      $scope.section = {
        route:'Sponzorship / Chat',
        title: 'Sponzorship Chat'
      };
      $scope.$storage = $localStorage;
        sponzorshipRequest.oneSponzorship($routeParams.sponzorshipId).success(function(data){
          if(data.data.Organizer.id === $localStorage.id){
            $scope.newMessage = {
              'author': data.data.Organizer.name,
              'color': '#5DDECF',
              'sponzorshipId': $routeParams.sponzorshipId
            };
          }
          else if(data.data.Sponzor.id === $localStorage.id){
            $scope.newMessage = {
              'author': data.data.Sponzor.name,
              'color': '#F6CECE',
              'sponzorshipId': $routeParams.sponzorshipId
            };
          }
          else{
            $location.path('/login');
          }
        });
      var ref = new Firebase($rootScope.getConstants().FURL + 'chat');
      var query = ref.orderByChild('sponzorshipId').equalTo($routeParams.sponzorshipId);
      $scope.chatMessages = $firebaseArray(query);
      $scope.addMessage = function() {
        if ($scope.newMessage.text) {
          $scope.newMessage.userImage = $localStorage.image;
          $scope.newMessage.timedate = new Date().getTime();
          $scope.chatMessages.$add($scope.newMessage);
          $scope.newMessage.text = '';
        }
      };
    }
    else{
      $location.path('/');
    }
    if($localStorage.typesponzorme === '1'){
      $scope.menuprincipal = 'views/sponzors/menu.html';
    }
    else if($localStorage.typesponzorme === '0'){
      $scope.menuprincipal = 'views/organizers/menu.html';
    }
    else{
      $location.path('/');
    }
  }

  angular.module('sponzorme')
    .controller('ChatController', ChatController);
})();
