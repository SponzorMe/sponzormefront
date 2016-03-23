'use strict';
(function() {

  function HomeController($scope, $translate, $localStorage, $location) {
     if ($localStorage.typesponzorme === '1') {
        $location.path('/sponzors/dashboard');
      } else if($localStorage.typesponzorme === '0') {
        $location.path('/organizers/dashboard');
      }
      // else{
      //   window.location.href = 'http://www.sponzor.me';
      // }
      
      $scope.fakeLogin = {
        'email' : '',
        'password' : ''
      }


     
  }
  angular.module('sponzorme')
    .controller('HomeController', HomeController);
})();
