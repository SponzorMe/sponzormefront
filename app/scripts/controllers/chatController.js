'use strict';
(function() {
  function ChatController($scope, ngDialog, $firebaseArray, $localStorage, $location, $anchorScroll, $routeParams, sponzorshipRequest) {
    if($localStorage.id){
      $scope.$storage = $localStorage;
      sponzorshipRequest.oneSponzorship($routeParams.sponzorshipId).success(function(data){
        if(data.data.Organizer.id === $localStorage.id){
          $scope.newMessage = {
            'author': data.data.organizer.name,
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
      });
      var ref = new Firebase('https://sponzorme.firebaseio.com/chat');
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
      ref.on('child_added', function(snap) {
        $location.hash('anchor' + snap.val().timedate);
      });
    }
    else{
      $location.path('/');
    }
    if($localStorage.typesponzorme === '1')
      $scope.menuprincipal = 'views/sponzors/menu.html';
    else if($localStorage.typesponzorme === '0')
      $scope.menuprincipal = 'views/organizers/menu.html';
    $scope.tolsctive = 'active';
    $scope.toggleSidebar = function() {
      $scope.tolsctive = !$scope.tolsctive;
      if ($scope.tolsctive === true) {
        $scope.tolsctive = 'active';
      }
    };
  }

  angular.module('sponzorme')
    .controller('ChatController', ChatController);
})();
