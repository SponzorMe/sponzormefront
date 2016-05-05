(function(){
  'use strict';
  function LogoutController($location, $localStorage) {
    $localStorage.$reset();
    $location.path('/login');
  }
angular.module('sponzorme').controller('LogoutController', LogoutController);
LogoutController.$inject = ['$location', '$localStorage'];
})();
