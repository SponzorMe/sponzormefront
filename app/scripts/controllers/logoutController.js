'use strict';
(function(){
angular.module('sponzorme')
.controller('LogoutController', LogoutController);

function LogoutController($scope, $translate, $sessionStorage, $location, $localStorage) {

  delete $sessionStorage.cookiesponzorme;

  delete $sessionStorage.typesponzorme;

  delete $sessionStorage.token;

  delete $sessionStorage.developer;

  delete $sessionStorage.id;

  delete $sessionStorage.email;

  $localStorage.$reset();

  $scope.vieuser = 0;

  $scope.typeuser = 0;

  $scope.userfroups = 0;

  $location.path("/");
};
})();
