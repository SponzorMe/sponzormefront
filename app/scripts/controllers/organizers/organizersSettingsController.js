'use strict';
(function() {
  function OrganizersSettingsController($scope, $translate, userRequest, $localStorage, $location, $rootScope, ngDialog, categoryRequest, allInterestsServiceRequest, loginRequest, userInterestRequest) {
    if ($rootScope.userValidation('0')) {
      $scope.user = JSON.parse($localStorage.user);
      allInterestsServiceRequest.allInterestsCategoriesId().success(function(sData) {
        $scope.interests = sData.InterestCategory;
      });
      $scope.removeUserInterest = function(index, id) {
        $scope.userInterests.splice(index, 1);
        userInterestRequest.deleteUserInterest(id).success(function() {});
      };
      $scope.addUserInterests = function(interest) {
        if (interest && interest.name) {
          var flag = false;
          if($scope.UserInterest){
            for (var i = 0; i < $scope.userInterests.length; i++) {
              if ($scope.userInterests[i].id_interest === interest.id_interest) {
                flag = true;
                $scope.selected = '';
                break;
              }
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
          $rootScope.showDialog('error', 'invalidInterestSelection', false);
          $scope.selected = '';
        }
      };
      $scope.account = [];
      $scope.file = false; //By default no file to update.
      $scope.editAccount = function() {
        $rootScope.showLoading();
        $scope.account.location = $scope.account.location.formatted_address;
        if ($scope.file) {
          $scope.creds = {
            bucket: $rootScope.getConstants().AMAZONBUCKET,
            access_key: $rootScope.getConstants().AMAZONKEY,
            secret_key: $rootScope.getConstants().AMAZONSECRET
          };
          AWS.config.update({
            accessKeyId: $scope.creds.access_key,
            secretAccessKey: $scope.creds.secret_key
          });
          AWS.config.region = $rootScope.getConstants().AMAZONBUCKETREGION;
          var bucket = new AWS.S3({
            params: {
              Bucket: $scope.creds.bucket
            }
          });
          // Prepend Unique String To Prevent Overwrites
          var uniqueFileName = btoa($rootScope.uniqueString() + new Date().getTime() + $rootScope.uniqueString()).replace('=', $rootScope.uniqueString()) + '.' + $rootScope.getExtension($scope.file.name);
          var params = {
            Key: uniqueFileName,
            ContentType: $scope.file.type,
            Body: $scope.file,
            ServerSideEncryption: 'AES256'
          };
          bucket.putObject(params, function(err, data) {
            if (!err) {
              $localStorage.image = $rootScope.getConstants().AMAZONBUCKETURL + uniqueFileName;
              $scope.account.image = $rootScope.getConstants().AMAZONBUCKETURL + uniqueFileName;
              userRequest.editUserPatch($localStorage.id, $scope.account).success(function(adata) {
                $scope.account = adata.User;
                $scope.file = false;
                $rootScope.closeAllDialogs();
                $rootScope.showDialog('success', 'accountInfoEditedSuccessfuly', false);
              }).error(function(eData) {
                $rootScope.closeAllDialogs();
                $rootScope.showDialog('error', 'errorEditingAccountInfo', false);
              });
            }
          });
        } else {
          userRequest.editUserPatch($localStorage.id, $scope.account).success(function(adata) {
            $scope.account = adata.User;
            $scope.file = false;
            $rootScope.closeAllDialogs();
            $rootScope.showDialog('success', 'accountInfoEditedSuccessfuly', false);
          }).error(function(eData) {
            $rootScope.closeAllDialogs();
            $rootScope.showDialog('error', 'errorEditingAccountInfo', false);
          });
        }
      };

      $scope.resetPassword = function() {
        $rootScope.showLoading();
        if ($scope.password === $scope.passwordConfirmation) {
          var formData = {
            'email': $localStorage.email,
            'password': $scope.password,
            'password_confirmation': $scope.passwordConfirmation
          };
          loginRequest.changePassword(formData, $localStorage.token).success(function(data) {
            $rootScope.closeAllDialogs();
            $localStorage.token = btoa($localStorage.email + ':' + $scope.passwordConfirmation);
            $rootScope.showDialog('success', 'PasswordChangedSuccesfully', false);
          }).error(function() {
            $rootScope.closeAllDialogs();
            $rootScope.showDialog('error', 'InvalidNewPassword', false);
          });
        } else {
          $rootScope.closeAllDialogs();
          $rootScope.showDialog('error', 'PasswordNoMatch', false);
        }
      };
      $scope.menuprincipal = 'views/organizers/menu.html';
    }
  }
  angular.module('sponzorme')
    .controller('OrganizersSettingsController', OrganizersSettingsController);
})();
