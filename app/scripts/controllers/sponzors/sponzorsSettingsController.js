'use strict';
(function() {

  function SponzorsSettingsController($scope, $translate, userRequest, $localStorage, $location, $rootScope, ngDialog, categoryRequest, allInterestsServiceRequest, loginRequest, userInterestRequest) {
    if($rootScope.userValidation('1')){
      $scope.section = {
        route:'Settings',
        title: 'Settings'
      };
      $scope.user = JSON.parse($localStorage.user);
      allInterestsServiceRequest.allInterestsCategoriesId().success(function(sData) {
        $scope.interests = sData.InterestCategory;
      });
      $scope.removeUserInterest = function(index, id) {
        $scope.user.interests.splice(index, 1);
        userInterestRequest.deleteUserInterest(id).then(function() {});
      };

      $scope.addUserInterests = function(interest) {
        $scope.loadingSaveInterest = true;
        if (interest && interest.name) {
          var flag = false;
          if($scope.user.interests){
            for (var i = 0; i < $scope.user.interests.length; i++) {
              if ($scope.user.interests[i].interest_id === interest.id_interest) {
                flag = true;
                $scope.selected = '';
                $scope.loadingSaveInterest = false;
                $rootScope.showDialog('error', 'interestAlreadyInList', false);
                break;
              }
            }
          }
          if (!flag) {
            var dataInterest = {
              user_id: $localStorage.id,
              interest_id: interest.id_interest
            };
            userInterestRequest.createUserInterest(dataInterest).then(function successCallback(response) {
              $scope.user.interests.push(response.data.UserInterest);
              $localStorage.user = JSON.stringify($scope.user);
              $scope.selected = '';
              $scope.loadingSaveInterest = false;
            }, function errorCallback(err){
              $scope.loadingSaveInterest = false;
              $rootScope.showDialog('error', 'invalidInterestSelection', false);
              $scope.selected = '';
            });
          }
        }
        else {
          $scope.loadingSaveInterest = false;
          $rootScope.showDialog('error', 'invalidInterestSelection', false);
          $scope.selected = '';
        }
      };
      $scope.file = false; //By default no file to update.
      $scope.editAccount = function() {
        $rootScope.showLoading();
        if($scope.user.location!==$scope.locationUser){
          $scope.user.location = $scope.locationUser.formatted_address;
          $scope.user.location_reference = $scope.locationUser.place_id;
        }
        $scope.user.location = $scope.user.location.formatted_address;
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
              userRequest.editUserPatch($localStorage.id, $scope.user).then(function successCallback(response) {
                $localStorage.user = JSON.stringify($scope.user);
                $scope.file = false;
                $rootScope.closeAllDialogs();
                $rootScope.showDialog('success', 'accountInfoEditedSuccessfuly', false);
              }, function errorCallback(err) {
                $rootScope.closeAllDialogs();
                $rootScope.showDialog('error', 'errorEditingAccountInfo', false);
              });
            }
          });
        } else {
          userRequest.editUserPatch($localStorage.id, $scope.user).then(function successCallback(response) {
            $localStorage.user = JSON.stringify($scope.user);
            $scope.file = false;
            $rootScope.closeAllDialogs();
            $rootScope.showDialog('success', 'accountInfoEditedSuccessfuly', false);
          }, function errorCallback(err) {
            $rootScope.closeAllDialogs();
            $rootScope.showDialog('error', 'errorEditingAccountInfo', false);
          });
        }
      };
      $scope.logo = false; //By default no file to update.
      $scope.updateDetails = function() {
        $rootScope.showLoading();
        if ($scope.logo) {
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
          var uniqueFileName = btoa($rootScope.uniqueString() + new Date().getTime() + $rootScope.uniqueString()).replace('=', $rootScope.uniqueString()) + '.' + $rootScope.getExtension($scope.logo.name);
          var params = {
            Key: uniqueFileName,
            ContentType: $scope.logo.type,
            Body: $scope.logo,
            ServerSideEncryption: 'AES256'
          };
          bucket.putObject(params, function(err, data) {
            if (!err) {
              $scope.account.logo = $rootScope.getConstants().AMAZONBUCKETURL + uniqueFileName;
              $scope.$digest();
              userRequest.editUserPatch($localStorage.id, $scope.account).success(function(adata) {
                $scope.account = adata.User;
                $scope.logo = false;
                $rootScope.closeAllDialogs();
                $rootScope.showDialog('success', 'accountInfoEditedSuccessfuly', false);
              }).error(function(eData) {
                $rootScope.closeAllDialogs();
                $rootScope.showDialog('error', 'errorEditingAccountInfo', false);
              });
            }
          });
        } else {
          userRequest.editUserPatch($localStorage.id, $scope.user).then(function successCallback(response) {
            $localStorage.user = JSON.stringify($scope.user);
            $scope.file = false;
            $rootScope.closeAllDialogs();
            $rootScope.showDialog('success', 'accountInfoEditedSuccessfuly', false);
          }, function errorCallback(err) {
            $rootScope.closeAllDialogs();
            $rootScope.showDialog('error', 'errorEditingAccountInfo', false);
          });
        }
      };
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
            $rootScope.showDialog('success', 'PasswordChangedSuccesfully', false);
            $scope.password = '';
            $scope.passwordConfirmation = '';
          }, function errorCallback(err) {
            $rootScope.closeAllDialogs();
            $rootScope.showDialog('error', 'InvalidNewPassword', false);
          });
        } else {
          $rootScope.showDialog('error', 'PasswordNoMatch', false);
        }
      };
      $scope.menuprincipal = 'views/sponzors/menu.html';
    }
  }
  angular.module('sponzorme').controller('SponzorsSettingsController', SponzorsSettingsController);
})();
