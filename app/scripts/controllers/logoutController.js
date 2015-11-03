'use strict';
(function(){

function LogoutController($scope, $translate, $sessionStorage, $location, $localStorage) {

  $localStorage.$reset();

  $location.path('/');
}

angular.module('sponzorme')
.controller('LogoutController', LogoutController);

})();
