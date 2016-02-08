'use strict';
(function() {
  function LoginController($scope, $translate, loginRequest, $localStorage, $location, ngDialog, $routeParams, $rootScope, userRequest){
    if ($routeParams.lang === 'en' || $routeParams.lang === 'es' || $routeParams.lang === 'pt') {
      $translate.use($routeParams.lang);
    }
    var redirectTo = $localStorage.redirectTo;
    //$localStorage.$reset();
    $scope.login = {};
    $scope.doLogin = function() {
      if ($scope.login.email && $scope.login.password) { //Just Check the values are defined
        $scope.login.lang = $rootScope.currentLanguage();
        $rootScope.showLoading();
        loginRequest.login($scope.login).then(function successCallback(response) {
          console.log(response);
          if (response.data.user.activated === '1') { // If account activated
            var expireDate = new Date();
            expireDate.setDate(expireDate.getDate() + 1);
            /* User Vars initialization */
            $localStorage.type = response.data.user.type;
            $localStorage.token = btoa($scope.login.email + ':' + $scope.login.password);
            $localStorage.id = response.data.user.id;
            $localStorage.email = response.data.user.email;
            $localStorage.demo = response.data.user.demo;
            $localStorage.image = response.data.user.image;
            $localStorage.startDate = Date.now();
            $localStorage.rating = response.data.rating;
            $translate.use(response.data.user.lang);
            $localStorage.lastUpdate = new Date().getTime();
            $rootScope.closeAllDialogs();
            $localStorage.user = JSON.stringify(response.data.user);
            $localStorage.events = [];
            $scope.$storage = $localStorage;
            /* End user vars initialization */
            if(response.data.events){
              $localStorage.events = JSON.stringify(response.data.events);
            }
            if (response.data.user.type === '1') {
              if ((redirectTo && redirectTo.indexOf('/#/login') === -1 && redirectTo.indexOf('sponzors') > -1) || (redirectTo && redirectTo.indexOf('/#/event/') > -1)) {
                window.location.href = redirectTo;
              } else {
                $location.path('/sponzors/dashboard');
              }
            } else {
              if ((redirectTo && redirectTo.indexOf('/#/login') === -1 && redirectTo.indexOf('organizers') > -1) || (redirectTo && redirectTo.indexOf('/#/event/') > -1)){
                window.location.href = redirectTo;
              }
              else {
                $location.path('/organizers/dashboard');
              }
            }
          } else {
            $rootScope.closeAllDialogs();
            ngDialog.open({
              template: 'views/templates/unactivatedAccountDialog.html',
              showClose: false
            });
          }
        }, function errorCallback() {
          $scope.loagind = false;
          $rootScope.closeAllDialogs();
          $rootScope.showDialog('error', 'dialog.invalidCredentials', false);
        });
      }
    };
    $scope.tryActivation = function(){
      $rootScope.showLoading();
      loginRequest.tryActivation($routeParams.token).success(function() {
        $rootScope.closeAllDialogs();
        $rootScope.showDialog('success', 'dialog.activationSuccess', false);
      }).error(function() {
        $rootScope.closeAllDialogs();
        ngDialog.open({
          template: 'views/templates/errorActivationDialog.html',
          showClose: false,
          scope: $scope
        });
      });
    };
    if($routeParams.token){
      $scope.tryActivation();
    }
  }
  angular.module('sponzorme').controller('LoginController', LoginController);
})();
