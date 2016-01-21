'use strict';
(function(){
function LogoutController($scope, $translate, $location, $localStorage, $rootScope) {
  $rootScope.tolsctive = 'active';
  $localStorage.$reset();
  $location.path('/login');
}
angular.module('sponzorme').controller('LogoutController', LogoutController);
})();
