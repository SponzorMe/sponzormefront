(function() {
  'use strict';

  function OrganizersChatController($scope, $firebaseArray, $localStorage, $location, $routeParams, sponzorshipRequest, $rootScope) {
    if ($rootScope.userValidation('0')) {
      var vm = this;
      sponzorshipRequest.oneSponzorship($routeParams.sponzorshipId).then(function successCallback(response) {
        vm.sponzorshipInfo = response.data.data;
        if (response.data.data.Organizer.id === $localStorage.id) {
          vm.newMessage = {
            'author': response.data.data.Organizer.name,
            'type': '#5DDECF',
            'sponzorshipId': $routeParams.sponzorshipId
          };
        } else if (response.data.data.Sponzor.id === $localStorage.id) {
          vm.newMessage = {
            'author': response.data.data.Sponzor.name,
            'type': '#F6CECE',
            'sponzorshipId': $routeParams.sponzorshipId
          };
        } else {
          $location.path('/login');
        }
      });
      var ref = new Firebase($rootScope.getConstants().FURL + 'chat');
      var query = ref.orderByChild('sponzorshipId').equalTo($routeParams.sponzorshipId);
      vm.chatMessages = $firebaseArray(query);
      vm.addMessage = function() {
        if (vm.newMessage.text) {
          vm.newMessage.userImage = $localStorage.image;
          vm.newMessage.timedate = new Date().getTime();
          vm.chatMessages.$add(vm.newMessage);
          console.log(vm.chatMessages);
          vm.newMessage.text = '';
        }
      };
    }
  }

  angular.module('sponzorme').controller('OrganizersChatController', OrganizersChatController);
  OrganizersChatController.$inject=['$scope', '$firebaseArray', '$localStorage', '$location', '$routeParams', 'sponzorshipRequest', '$rootScope'];
})();
