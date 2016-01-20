'use strict';
(function() {
  function OrganizersCreateController($scope, $translate, userRequest, ngDialog, $location, $localStorage, eventRequest, perkRequest, $routeParams, $rootScope) {
    if ($routeParams.lang === 'en' || $routeParams.lang === 'es' || $routeParams.lang === 'pt') {
      $translate.use($routeParams.lang);
    }
    $scope.sendfrom = function() {
      var userLang = $rootScope.currentLanguage();
      if ($scope.passwordone !== undefined || $scope.passwordtwo !== undefined) {
        if ($scope.passwordone === $scope.passwordtwo && $scope.passwordtwo.length > 6) {
          $scope.objuser = {};
          $scope.objuser.email = $scope.email;
          $scope.objuser.password = $scope.passwordone;
          $scope.objuser.password_confirmation = $scope.passwordtwo;
          $scope.objuser.lang = userLang;
          $scope.objuser.type = 0;
          $scope.objuser.name = $scope.name + ' ' + $scope.lastname;
          $scope.loagind = true;
          $rootScope.showLoading();
          userRequest.createUser($scope.objuser).success(function(adata) {
            if (adata.message === 'Inserted') {
              $localStorage.cookiesponzorme = btoa($scope.email + ':' + $scope.passwordone);
              $localStorage.token = btoa($scope.email + ':' + $scope.passwordone);
              $localStorage.typesponzorme = adata.User.type;
              $localStorage.id = adata.User.id;
              $localStorage.email = adata.User.email;
              $localStorage.demo = adata.User.demo;
              $localStorage.startDate = Date.now();
              $localStorage.newUser = true;
              $localStorage.$apply();
              if (userLang === 'en') {
                event_en.DEFAULT_EVENT.organizer = adata.User.id;
                eventRequest.createEventToken(event_en.DEFAULT_EVENT, btoa($scope.email + ':' + $scope.passwordone)).success(function(sData) {
                  angular.forEach(event_en.PERKS, function(value) {
                    value.id_event = sData.event.id;
                    perkRequest.createPerkToken(value, btoa($scope.email + ':' + $scope.passwordone)).success(function() { /*Empty Code, nothing necessary here*/ })
                      .error(function() { /*Empty Code, nothing necessary here*/ });
                  });
                  $scope.loagind = false;
                  $location.path('/customization');
                  $rootScope.closeAllDialogs();
                }).error(function() { /*Empty Code, nothing necessary here*/ });
              } else if (userLang === 'es') {
                event_es.DEFAULT_EVENT.organizer = adata.User.id;
                eventRequest.createEventToken(event_es.DEFAULT_EVENT, btoa($scope.email + ':' + $scope.passwordone)).success(function(sData) {
                  angular.forEach(event_es.PERKS, function(value) {
                    value.id_event = sData.event.id;
                    perkRequest.createPerkToken(value, btoa($scope.email + ':' + $scope.passwordone)).success(function() { /*Empty Code, nothing necessary here*/ })
                      .error(function() { /*Empty Code, nothing necessary here*/ });
                  });
                  $scope.loagind = false;
                  $location.path('/customization');
                  $rootScope.closeAllDialogs();
                }).error(function() { /*Empty Code, nothing necessary here*/ });
              } else if (userLang === 'pt') {
                event_pt.DEFAULT_EVENT.organizer = adata.User.id;
                eventRequest.createEventToken(event_pt.DEFAULT_EVENT, btoa($scope.email + ':' + $scope.passwordone)).success(function(sData) {
                  angular.forEach(event_pt.PERKS, function(value) {
                    value.id_event = sData.event.id;
                    perkRequest.createPerkToken(value, btoa($scope.email + ':' + $scope.passwordone)).success(function() { /*Empty Code, nothing necessary here*/ }).error(function() { /*Empty Code, nothing necessary here*/ });
                  });
                  $scope.loagind = false;
                  $location.path('/customization');
                  $rootScope.closeAllDialogs();
                }).error(function() { /*Empty Code, nothing necessary here*/ });
              }
            }
          }).error(function(data) {
            if (data.message === 'Not inserted') {
              $scope.errorMessages = [];
              if (data.error.email) {
                if (data.error.email[0] === 'The email has already been taken.') {
                  $scope.errorMessages.push('errorEmailAlreadyTaken');
                  $scope.didYouForgotPassword = true;
                } else {
                  $scope.errorMessages.push('errorRegisterEmail');
                }
              }
              if (data.error.name) {
                $scope.errorMessages.push('errorRegisterName');
              }
              if (data.error.lastname) {
                $scope.errorMessages.push('errorRegisterLastname');
              }
              if (data.error.password) {
                $scope.errorMessages.push('errorRegisterPassword');
              }
            }
            $scope.loagind = false;
            $rootScope.closeAllDialogs();
            ngDialog.open({
              template: 'views/templates/multipleErrorDialog.html',
              showClose: false,
              scope: $scope
            });
          });
        } else {
          if ($scope.passwordtwo.length > 6) {
            $rootScope.showDialog('error', 'errorRegisterPasswordNoMatch', false);
          } else {
            $rootScope.showDialog('error', 'errorRegisterShortPassword', false);
          }
        }
      } else {
        $rootScope.showDialog('error', 'errorRegisterPasswordNoEmpty', false);
      }
    };
  }
  angular.module('sponzorme')
    .controller('OrganizersCreateController', OrganizersCreateController);
})();
