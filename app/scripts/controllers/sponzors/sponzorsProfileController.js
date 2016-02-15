'use strict';
(function() {
  function SponzorsProfileController($scope, $translate, userRequest, $localStorage, $rootScope, loginRequest, userInterestRequest) {
    if ($rootScope.userValidation('1')) {
      $scope.user = JSON.parse($localStorage.user);
      $scope.file = false; //By default no file to update.
      $scope.editAccount = function() {
        $rootScope.showLoading();
        if ($scope.user.location !== $scope.locationUser) {
          $scope.user.location = $scope.locationUser.formatted_address;
          $scope.user.location_reference = $scope.locationUser.place_id;
        }
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
              $scope.user.image = $rootScope.getConstants().AMAZONBUCKETURL + uniqueFileName;
              $scope.user.name = $scope.user.firstName +' '+ $scope.user.lastName;
              userRequest.editUserPatch($localStorage.id, $scope.user).then(function successCallback(response) {
                $localStorage.user = JSON.stringify($scope.user);
                $scope.file = false;
                $rootScope.closeAllDialogs();
                $rootScope.showDialog('success', 'dialog.accountInfoEditedSuccessfuly', false);
              }, function errorCallback(err) {
                $rootScope.closeAllDialogs();
                $rootScope.showDialog('error', 'dialog.errorEditingAccountInfo', false);
              });
            }
          });
        } else {
          $scope.user.name = $scope.user.firstName +' '+ $scope.user.lastName;
          userRequest.editUserPatch($localStorage.id, $scope.user).then(function successCallback(response) {
            $localStorage.user = JSON.stringify($scope.user);
            $scope.file = false;
            $rootScope.closeAllDialogs();
            $rootScope.showDialog('success', 'dialog.accountInfoEditedSuccessfuly', false);
          }, function errorCallback(err) {
            $rootScope.closeAllDialogs();
            $rootScope.showDialog('error', 'dialog.errorEditingAccountInfo', false);
          });
        }
      };
      $scope.logo = false; //By default no file to update.
      $scope.resetPassword = function() {
        if ($scope.password === $scope.passwordConfirmation) {
          $rootScope.showLoading();
          var formData = {
            'email': $localStorage.email,
            'password': $scope.password,
            'password_confirmation': $scope.passwordConfirmation
          };
          loginRequest.changePassword(formData, $localStorage.token).then(function successCallback(response) {
            $rootScope.closeAllDialogs();
            $localStorage.token = btoa($localStorage.email + ':' + $scope.passwordConfirmation);
            $rootScope.showDialog('success', 'dialog.passwordChangedSuccesfully', false);
            $scope.password = '';
            $scope.passwordConfirmation = '';
          }, function errorCallback() {
            $rootScope.closeAllDialogs();
            $rootScope.showDialog('error', 'dialog.invalidNewPassword', false);
          });
        } else {
          $rootScope.showDialog('error', 'dialog.passwordNoMatch', false);
        }
      };
    }
  }
  angular.module('sponzorme').controller('SponzorsProfileController', SponzorsProfileController);
})();
