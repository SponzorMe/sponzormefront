'use strict';
(function() {
  function OrganizersCreateController($scope, $translate, userRequest, ngDialog, $location, $localStorage, eventRequest, perkRequest, $routeParams, $rootScope, dialogRequest) {
    //mock starts

    $scope.pages = {
      'firstPage': '',
      'secondPage': '',
      'thirdPage': ''
    }

    $scope.submitSucces = function() {
      return false;
    };

    $scope.create = {
      'date' : new Date(),
      'image' : '',
      'success' : false,
      'age': ''
    };

    $scope.firstPage = true;

    $scope.toggleCreateForm = function() {
      if($scope.firstPage === true){
        $scope.firstPage = false;
      } else {
        $scope.firstPage = true;
      }
    };

    //mock ends


    if ($routeParams.lang === 'en' || $routeParams.lang === 'es' || $routeParams.lang === 'pt') {
      $translate.use($routeParams.lang);
    }
    $scope.sendfrom = function() {
      if ($scope.passwordone !== undefined || $scope.passwordtwo !== undefined) {
        if ($scope.passwordone === $scope.passwordtwo && $scope.passwordtwo.length > 6) {
          $scope.objuser = {};
          $scope.objuser.email = $scope.email;
          $scope.objuser.password = $scope.passwordone;
          $scope.objuser.password_confirmation = $scope.passwordtwo;
          $scope.objuser.lang = $rootScope.currentLanguage();
          $scope.objuser.type = 0;
          $scope.objuser.name = $scope.name + ' ' + $scope.lastname;
          $scope.loagind = true;
          dialogRequest.showLoading();
          userRequest.createUser($scope.objuser).then(function successCallback(response) {
            $localStorage.cookiesponzorme = btoa($scope.email + ':' + $scope.passwordone);
            $localStorage.token = btoa($scope.email + ':' + $scope.passwordone);
            $localStorage.typesponzorme = response.data.User.type;
            $localStorage.id = response.data.User.id;
            $localStorage.email = response.data.User.email;
            $localStorage.demo = response.data.User.demo;
            $localStorage.startDate = Date.now();
            $localStorage.newUser = true;
            $scope.loagind = false;
            $location.path('/customization');
            dialogRequest.closeLoading();
          }, function errorCallback(response) {
            $scope.errorMessages = [];
            if (response.data.error.email) {
              if (response.data.error.email[0] === 'The email has already been taken.') {
                $scope.errorMessages.push('errorEmailAlreadyTaken');
                $scope.didYouForgotPassword = true;
              } else {
                $scope.errorMessages.push('errorRegisterEmail');
              }
            }
            if (response.data.error.name) {
              $scope.errorMessages.push('errorRegisterName');
            }
            if (response.data.error.lastname) {
              $scope.errorMessages.push('errorRegisterLastname');
            }
            if (response.data.error.password) {
              $scope.errorMessages.push('errorRegisterPassword');
            }
            $scope.loagind = false;
            dialogRequest.closeLoading();
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
  angular.module('sponzorme').controller('OrganizersCreateController', OrganizersCreateController);
})();
