'use strict';
(function() {

  function SponzorsCreateController($scope, $translate, userRequest, ngDialog, $location, usSpinnerService, $localStorage, eventRequest, perkRequest) {

    $scope.sendfrom = function() {
      $scope.error_log = [];
      if ($scope.passwordone !== undefined || $scope.passwordtwo !== undefined) {
        if ($scope.passwordone === $scope.passwordtwo) {
          $scope.objuser = {};
          $scope.objuser.email = $scope.email;
          $scope.objuser.password = $scope.passwordone;
          $scope.objuser.password_confirmation = $scope.passwordtwo;
          $scope.objuser.lang = idiomaselect;
          $scope.objuser.type = 1;
          $scope.objuser.name = $scope.name + ' ' + $scope.lastname;
          $scope.loagind = true;
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
              if (idiomaselect === 'en') {
                event_en.DEFAULT_EVENT.organizer = adata.User.id;
                eventRequest.createEventToken(event_en.DEFAULT_EVENT, btoa($scope.email + ':' + $scope.passwordone)).success(function(sData) {
                  angular.forEach(event_en.PERKS, function(value) {
                    value.id_event = sData.event.id;
                    perkRequest.createPerkToken(value, btoa($scope.email + ':' + $scope.passwordone)).success(function() {
                      /*Empty Code, nothing necessary here*/
                    }).error(function(eData) {
                      console.log('Error creating a perk');
                      console.log(eData);
                    });
                  });
                  $scope.loagind = false;
                  $location.path('/customization');
                }).error(function(eData) {
                  console.log('Error demo event');
                  console.log(eData);
                });
              } else if (idiomaselect === 'es') {
                event_es.DEFAULT_EVENT.organizer = adata.User.id;
                eventRequest.createEventToken(event_es.DEFAULT_EVENT, btoa($scope.email + ':' + $scope.passwordone)).success(function(sData) {
                  angular.forEach(event_es.PERKS, function(value) {
                    value.id_event = sData.event.id;
                    perkRequest.createPerkToken(value, btoa($scope.email + ':' + $scope.passwordone)).success(function() {
                      /*Empty Code, nothing necessary here*/
                    }).error(function(eData) {
                      console.log('Error creating a perk');
                      console.log(eData);
                    });

                  });
                  $scope.loagind = false;
                  $location.path('/customization');
                }).error(function(eData) {
                  console.log('Error demo event');
                  console.log(eData);
                });
              } else if (idiomaselect === 'pt') {
                event_pt.DEFAULT_EVENT.organizer = adata.User.id;
                eventRequest.createEventToken(event_pt.DEFAULT_EVENT, btoa($scope.email + ':' + $scope.passwordone)).success(function(sData) {
                  angular.forEach(event_pt.PERKS, function(value) {
                    value.id_event = sData.event.id;
                    perkRequest.createPerkToken(value, btoa($scope.email + ':' + $scope.passwordone)).success(function() {
                      /*Empty Code, nothing necessary here*/
                    }).error(function(eData) {
                      console.log('Error creating a perk');
                      console.log(eData);
                    });
                  });
                  $scope.loagind = false;
                  $location.path('/customization');
                }).error(function(eData) {
                  console.log('Error demo event');
                  console.log(eData);
                });
              }
            }
          }).error(function(data) {
            if (data.message === 'Not inserted') {
              if (data.error.email) {
                $scope.error_log.push('errorRegisterEmail');
              }
              if (data.error.name) {
                $scope.error_log.push('errorRegisterName');
              }
              if (data.error.lastname) {
                $scope.error_log.push('errorRegisterLastname');
              }
              if (data.error.password) {
                $scope.error_log.push('errorRegisterPassword');
              }
            }
            $scope.loagind = false;
            ngDialog.open({
              template: 'templateId',
              scope: $scope
            });
          });
        } else {
          $scope.error_log.push('errorRegisterPasswordNoMatch');
          ngDialog.open({
            template: 'templateId',
            scope: $scope
          });
        }
      } else {
        $scope.error_log.push('errorRegisterPasswordNoEmpty');
        ngDialog.open({
          template: 'templateId',
          scope: $scope
        });
      }
    };
  }
  angular.module('sponzorme')
    .controller('SponzorsCreateController', SponzorsCreateController);
})();
