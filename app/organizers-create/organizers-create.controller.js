(function() {
  'use strict';

  function OrganizersCreateController($scope, $translate, userRequest, $location, $localStorage, $routeParams, $rootScope, MINAGE, MAXAGE, categoryRequest, userInterestRequest, dialogRequest, $mdDialog) {
    if ($routeParams.lang === 'en' || $routeParams.lang === 'es' || $routeParams.lang === 'pt') {
      $translate.use($routeParams.lang);
    }
    $scope.doCreate = function() {
      if ($scope.create.password.trim() !== ''  || $scope.create.password_confirmation.trim() !== '' ) {
        if ($scope.create.password === $scope.create.password_confirmation && $scope.create.password_confirmation.length > 6) {
          dialogRequest.showLoading();
          $scope.create.lang = $rootScope.currentLanguage();
          $scope.create.type = 0;
          $scope.create.name = $scope.create.firstname + ' ' + $scope.create.lastname;
          userRequest.createUser($scope.create).success(function(adata) {
            $localStorage.cookiesponzorme = btoa($scope.create.email + ':' + $scope.create.password);
            $localStorage.token = btoa($scope.create.email + ':' + $scope.create.password);
            $localStorage.typesponzorme = adata.User.type;
            $localStorage.id = adata.User.id;
            $localStorage.email = adata.User.email;
            $localStorage.demo = adata.User.demo;
            $localStorage.startDate = Date.now();
            $scope.toggleCreateForm();
            dialogRequest.closeLoading();
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
            dialogRequest.closeLoading();
            var parentEl = angular.element(document.body);
            $mdDialog.show({
              parent: parentEl,
              template: '<md-dialog aria-label="dialog">'+
                '<md-toolbar>'+
                  '<div class="md-toolbar-tools top-info">'+
                    '<i class="material-icons md-48 md-light">info</i>'+
                  '</div>'+
                '</md-toolbar>'+
                '<md-dialog-content>'+
                  '<div layout="column" layout-align="center center">'+
                    '<h1 translate>dialog.error.title</h1>'+
                    '<p ng-repeat="m in errorMessages">'+
                      '{{\'dialog.error.\'+m|translate}}'+
                    '</p>'+
                  '</div>'+
                '</md-dialog-content>'+
                '<md-dialog-actions>'+
                  '<md-button ng-click="closeDialog()" class="md-primary">'+
                    '{{"Ok"}}'+
                  '</md-button>'+
                '</md-dialog-actions>'+
              '</md-dialog>',
              locals: {
                errorMessages: $scope.errorMessages
              },
              controller: function DialogController($scope, $mdDialog, errorMessages) {
                $scope.errorMessages = errorMessages;
                $scope.closeDialog = function() {
                  $mdDialog.hide();
                }
              }
            });
          });
        } else {
          if ($scope.create.password_confirmation.length > 6) {
            dialogRequest.showDialog('error', 'errorRegisterPasswordNoMatch', false);
          } else {
            dialogRequest.showDialog('error', 'errorRegisterShortPassword', false);
          }
        }
      } else {
        dialogRequest.showDialog('error', 'errorRegisterPasswordNoEmpty', false);
      }
    };
    $scope.doCustomization = function() {
      dialogRequest.showLoading();
      $scope.create.location_reference = 'Fake';
      $scope.create.image = 'https://s3-us-west-2.amazonaws.com/sponzormewebappimages/user_default.jpg';
      userRequest.editUserPatch($localStorage.id, $scope.create).success(function(adata) {
        dialogRequest.showDialog('success', 'registerCompleted', '/login');
        dialogRequest.closeLoading();
      });
      //Code to save the interests
      var interestsArray = [];
      for (var i = 0; i < $scope.create.interests.length; i++) {
        var item = {
          'user_id': $localStorage.id,
          'interest_id': $scope.create.interests[i]
        };
        interestsArray.push(item);
      }
      var data = {
        interests: interestsArray
      };
      userInterestRequest.bulkUserInterest(data).then(function successCallback() {});
      //End the code to save the interests
    };

    categoryRequest.allCategories().then(function successCallback(response) {
      $scope.categories = response.data.categories;
    }, function errorCallback() {
      $scope.categories = [];
    });

    $scope.pages = {
      'firstPage': '',
      'secondPage': '',
      'thirdPage': ''
    }

    $scope.submitSucces = function() {
      return false;
    };

    $scope.create = {
      'date': new Date(),
      'image': '',
      'success': false,
      'age': '',
      'password': '',
      'password_confirmation': ''

    };

    $scope.firstPage = true;

    $scope.toggleCreateForm = function() {
      if ($scope.firstPage === true) {
        $scope.firstPage = false;
      } else {
        $scope.firstPage = true;
      }
    };

    $scope.ageRange = [];
    for (var j = MINAGE; j < MAXAGE; j++) {
      $scope.ageRange.push(j);
    }
  }
  angular.module('sponzorme').controller('OrganizersCreateController', OrganizersCreateController);
  OrganizersCreateController.$inject=['$scope', '$translate', 'userRequest', '$location', '$localStorage', '$routeParams', '$rootScope', 'MINAGE', 'MAXAGE', 'categoryRequest', 'userInterestRequest', 'dialogRequest', '$mdDialog'];
})();
