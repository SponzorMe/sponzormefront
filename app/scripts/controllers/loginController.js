'use strict';
(function() {

  function LoginController($scope, $translate, loginRequest, $localStorage, $location, ngDialog, $routeParams, $rootScope, userRequest) {
    if ($routeParams.lang === 'en' || $routeParams.lang === 'es' || $routeParams.lang === 'pt') {
      $translate.use($routeParams.lang);
    }
    var redirectTo = $localStorage.redirectTo;
    $scope.sendfrom = function() {
      if ($scope.email && $scope.password) { //Just Check the values are defined
        $scope.objuser = {};
        $scope.objuser.email = $scope.email;
        $scope.objuser.password = $scope.password;
        $scope.objuser.password_confirmation = $scope.passwordtwo;
        $scope.objuser.lang = $rootScope.currentLanguage();
        $scope.loagind = true;
        $rootScope.showLoading();
        loginRequest.login($scope.objuser).success(function(adata) {
          if (adata.user.activated === '1') {
            var expireDate = new Date();
            expireDate.setDate(expireDate.getDate() + 1);
            $localStorage.cookiesponzorme = btoa($scope.email + ':' + $scope.password);
            $localStorage.typesponzorme = adata.user.type;
            $localStorage.token = btoa($scope.email + ':' + $scope.password);
            $localStorage.id = adata.user.id;
            $localStorage.email = adata.user.email;
            $localStorage.demo = adata.user.demo;
            $localStorage.image = adata.user.image;
            $localStorage.startDate = Date.now();
            $localStorage.rating = adata.rating;
            $scope.$storage = $localStorage;
            $translate.use(adata.user.lang);
            $scope.loagind = false;
            userRequest.home($localStorage.id).then(function successCallback(response) {
              $rootScope.closeAllDialogs();
              $localStorage.user = JSON.stringify(response.data.data.user);
              $localStorage.events = [];
              if(response.data.data.events){
                $localStorage.events = JSON.stringify(response.data.data.events);
              }
              if (adata.user.type === '1') {
                if ((redirectTo && redirectTo.indexOf('login') === -1 && redirectTo.indexOf('sponzors') > -1) || (redirectTo && redirectTo.indexOf('/#/event/') > -1)) {
                  window.location.href = redirectTo;
                } else {
                  $location.path('/sponzors/dashboard');
                }
              } else {

                if ((redirectTo && redirectTo.indexOf('login') === -1 && redirectTo.indexOf('organizers') > -1) || (redirectTo && redirectTo.indexOf('/#/event/') > -1)){
                  window.location.href = redirectTo;
                } else {
                  $location.path('/organizers/dashboard');
                }
              }
            }, function errorCallback(response) {
              $rootScope.closeAllDialogs();
              $rootScope.showDialog('error', 'canNotGetUserInfo', false);
            });
          } else {
            $scope.loagind = false;
            $rootScope.closeAllDialogs();
            $scope.message = 'unactivatedAccount';
            ngDialog.open({
              template: 'views/templates/unactivatedAccountDialog.html',
              showClose: false,
              scope: $scope
            });
          }
        }).error(function() {
          $scope.loagind = false;
          $rootScope.closeAllDialogs();
          $rootScope.showDialog('error', 'invalidCredentials', false);
        });
      }
    };
  }
  angular.module('sponzorme').controller('LoginController', LoginController);
})();
