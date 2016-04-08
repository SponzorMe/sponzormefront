'use strict';
(function () {
  function ChatController($scope, $firebaseArray, $localStorage, $location, $routeParams, sponzorshipRequest, $rootScope, notificationRequest) {
    if ($localStorage.id) {
      $scope.section = { 'route': 'Sponzorship / Chat', 'title': 'Sponzorship Chat' };
      $scope.$storage = $localStorage;
      sponzorshipRequest.oneSponzorship($routeParams.sponzorshipId).success(function (data) {
        $scope.currentSponzorship = data.data;
        if (data.data.Organizer.id === $localStorage.id) {
          $scope.userFrom = {
            name: data.data.Organizer.name,
            email: data.data.Organizer.email
          };
          $scope.userTo = {
            name: data.data.Sponzor.name,
            email: data.data.Sponzor.email
          };
          $scope.newMessage = {
            'author': data.data.Organizer.name,
            'color': '#5DDECF',
            'sponzorshipId': $routeParams.sponzorshipId
          };
        } else if (data.data.Sponzor.id === $localStorage.id) {
          $scope.userFrom = {
            name: data.data.Sponzor.name,
            email: data.data.Sponzor.email
          };
          $scope.userTo = {
            name: data.data.Organizer.name,
            email: data.data.Organizer.email
          };
          $scope.newMessage = {
            'author': data.data.Sponzor.name,
            'color': '#F6CECE',
            'sponzorshipId': $routeParams.sponzorshipId
          };
        } else {
          $location.path('/login');
        }
      });
      var ref = new Firebase($rootScope.getConstants().FURL + 'chat');
      var query = ref.orderByChild('sponzorshipId').equalTo($routeParams.sponzorshipId);
      $scope.chatMessages = $firebaseArray(query);
      $scope.addMessage = function () {
        if ($scope.newMessage.text) {
          $scope.newMessage.userImage = $localStorage.image;
          $scope.newMessage.timedate = new Date().getTime();
          $scope.chatMessages.$add($scope.newMessage);
          
          //Here we send the email notification
          console.log($scope.currentSponzorship);
          var data = {
            sponzorshipId: $routeParams.sponzorshipId,
            message: $scope.newMessage.text,
            userTo: $scope.userTo,
            userFrom: $scope.userFrom,
            userType: $localStorage.typesponzorme
          };
          notificationRequest.sendChatMailNotification(data).then(function successCallback() {});
          $scope.newMessage.text = '';
        }
      };
    } else {
      $location.path('/');
    }
    if ($localStorage.typesponzorme === '1') {
      $scope.menuprincipal = 'views/sponzors/menu.html';
    } else if ($localStorage.typesponzorme === '0') {
      $scope.menuprincipal = 'views/organizers/menu.html';
    } else {
      $location.path('/');
    }
  }

  angular.module('sponzorme')
    .controller('ChatController', ChatController);
})();
