'use strict';
(function() {
  function OrganizersSettingsController($scope, $translate, userRequest, $localStorage, imgurRequest, $location, $rootScope, ngDialog, categoryRequest, allInterestsServiceRequest, loginRequest, userInterestRequest, AMAZONSECRET, AMAZONKEY, AMAZONBUCKET) {
    $rootScope.userValidation('0');
    ngDialog.open({
      template: 'views/templates/loadingDialog.html',
      showClose: false
    });
    userRequest.oneUser($localStorage.id).success(function(adata) {
      $scope.account = adata.data.user;
      $scope.userInterests = adata.data.interests;
      ngDialog.closeAll();
    });
    allInterestsServiceRequest.allInterestsCategoriesId().success(function(sData) {
      $scope.interests = sData.InterestCategory;
    });
    $scope.removeUserInterest = function(index, id) {
      $scope.userInterests.splice(index, 1);
      userInterestRequest.deleteUserInterest(id).success(function() {});
    };
    $scope.addUserInterests = function(interest) {
      if (interest.name) {
        var flag = false;
        for (var i = 0; i < $scope.userInterests.length; i++) {
          if ($scope.userInterests[i].id_interest === interest.id_interest) {
            flag = true;
            $scope.selected = '';
            break;
          }
        }
        if (!flag) {
          var dataInterest = {
            user_id: $localStorage.id,
            interest_id: interest.id_interest
          };
          userInterestRequest.createUserInterest(dataInterest).success(function(data) {
            $scope.userInterests.push({
              'name': interest.name,
              'id': data.UserInterest.id,
              'id_interest': interest.id_interest
            });
            $scope.selected = '';
          });
        }
      } else {
        $scope.message = 'invalidInterestSelection';
        ngDialog.open({
          template: 'views/templates/errorDialog.html',
          showClose: false,
          scope: $scope
        });
        $scope.selected = '';
      }
    };
    $scope.account = [];
    $scope.file = false; //By default no file to update.
    $scope.editAccount = function() {
      ngDialog.open({
        template: 'views/templates/loadingDialog.html',
        showClose: false
      });
      $scope.account.location = $scope.account.location.formatted_address;
      if ($scope.file) {
        $scope.creds = {
          bucket: AMAZONBUCKET,
          access_key: AMAZONKEY,
          secret_key: AMAZONSECRET
        };
        AWS.config.update({
          accessKeyId: $scope.creds.access_key,
          secretAccessKey: $scope.creds.secret_key
        });
        AWS.config.region = 'us-west-2';
        var bucket = new AWS.S3({
          params: {
            Bucket: $scope.creds.bucket
          }
        });
        // Prepend Unique String To Prevent Overwrites
        var uniqueFileName = btoa($rootScope.uniqueString() + new Date().getTime() + $rootScope.uniqueString()).replace("=", $rootScope.uniqueString()) + '.' + $rootScope.getExtension($scope.file.name);
        var params = {
          Key: uniqueFileName,
          ContentType: $scope.file.type,
          Body: $scope.file,
          ServerSideEncryption: 'AES256'
        };
        bucket.putObject(params, function(err, data) {
          if (err) {
          } else {
            var params = {
              Bucket: AMAZONBUCKET,
              Key: uniqueFileName
            };
            bucket.getSignedUrl('getObject', params, function(err, url) {
              $localStorage.image = url;
              $scope.account.image = url;
              $scope.$digest();
              userRequest.editUserPatch($localStorage.id, $scope.account).success(function(adata) {
                $scope.account = adata.User;
                $scope.file = false;
                ngDialog.closeAll();
                $scope.message = 'accountInfoEditedSuccessfuly';
                ngDialog.open({
                  template: 'views/templates/successDialog.html',
                  showClose: false,
                  scope: $scope
                });
              }).error(function(eData) {
                ngDialog.closeAll();
                $scope.message = 'errorEditingAccountInfo';
                ngDialog.open({
                  template: 'views/templates/errorDialog.html',
                  showClose: false,
                  scope: $scope
                });
              });
            });
          }
        });
      } else {
        userRequest.editUserPatch($localStorage.id, $scope.account).success(function(adata) {
          $scope.account = adata.User;
          $scope.file = false;
          ngDialog.closeAll();
          $scope.message = 'accountInfoEditedSuccessfuly';
          ngDialog.open({
            template: 'views/templates/successDialog.html',
            showClose: false,
            scope: $scope
          });
        }).error(function(eData) {
          ngDialog.closeAll();
          $scope.message = 'errorEditingAccountInfo';
          ngDialog.open({
            template: 'views/templates/errorDialog.html',
            showClose: false,
            scope: $scope
          });
        });
      }
    };

    $scope.resetPassword = function() {
      ngDialog.open({
        template: 'views/templates/loadingDialog.html',
        showClose: false
      });
      if ($scope.password === $scope.passwordConfirmation) {
        var formData = {
          'email': $localStorage.email,
          'password': $scope.password,
          'password_confirmation': $scope.passwordConfirmation
        };
        loginRequest.changePassword(formData, $localStorage.token).success(function(data) {
          ngDialog.closeAll();
          $localStorage.token = btoa($localStorage.email + ':' + $scope.passwordConfirmation);
          $scope.message = 'PasswordChangedSuccesfully';
          ngDialog.open({
            template: 'views/templates/successDialog.html',
            showClose: false,
            scope: $scope
          });
        }).error(function() {
          ngDialog.closeAll();
          $scope.message = 'InvalidNewPassword';
          ngDialog.open({
            template: 'views/templates/errorDialog.html',
            showClose: false,
            scope: $scope
          });
        });
      } else {
        ngDialog.closeAll();
        $scope.message = 'PasswordNoMatch';
        ngDialog.open({
          template: 'views/templates/errorDialog.html',
          showClose: false,
          scope: $scope
        });
      }
    };
    $scope.tolsctive = 'active';
    $scope.toggleSidebar = function() {
      $scope.tolsctive = !$scope.tolsctive;
      if ($scope.tolsctive === true) {
        $scope.tolsctive = 'active';
      }
    };
    $scope.menuprincipal = 'views/organizers/menu.html';
  }
  angular.module('sponzorme')
    .controller('OrganizersSettingsController', OrganizersSettingsController);
})();
