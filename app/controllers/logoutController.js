(function(){
  'use strict';
  function LogoutController($scope, $translate, $location, $localStorage, $rootScope) {
    $localStorage.$reset();
    $location.path('/login');
  }
angular.module('sponzorme').controller('LogoutController', LogoutController);
})();
