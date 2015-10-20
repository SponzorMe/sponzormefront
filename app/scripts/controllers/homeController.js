'use strict';
(function(){
angular.module("sponzorme")
.controller('HomeController', function($scope, $translate, $sessionStorage, $location) {
  if ($sessionStorage) {
    var cookie = $sessionStorage.cookiesponzorme;
    if (cookie == undefined) {
      $scope.vieuser = 1;
    } else {
      $scope.vieuser = 0;
    }
    var typeini = $sessionStorage.typesponzorme;
    if (typeini != undefined) {
      if (typeini == '1') {
        $scope.typeuser = 0;
      } else {
        $scope.typeuser = 1;
      }
    }
    $scope.userfroups = 0;
  } else {
    $location.path("/");
  }
});
})();
