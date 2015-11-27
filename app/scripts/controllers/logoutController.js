'use strict';
(function(){

function LogoutController($scope, $translate, $sessionStorage, $location, $localStorage) {

  $localStorage.$reset();

  $location.path('/login');
}

angular.module('sponzorme')
.controller('LogoutController', LogoutController);

})();
