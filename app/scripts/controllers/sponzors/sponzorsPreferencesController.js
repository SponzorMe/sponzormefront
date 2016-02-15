'use strict';
(function() {
  function SponzorsPreferencesController($scope, $translate, userRequest, $localStorage, $rootScope, loginRequest, userInterestRequest, $log, allInterestsServiceRequest) {
    if ($rootScope.userValidation('1')) {
      $scope.user = JSON.parse($localStorage.user);
      $scope.logo = false; //By default no file to update.
      allInterestsServiceRequest.allInterestsCategoriesId().success(function(sData) {
        $scope.interests = sData.InterestCategory;
      });
      $scope.updateDetails = function() {
        console.log($scope.logo);
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
              $scope.user.logo = $rootScope.getConstants().AMAZONBUCKETURL + uniqueFileName;
              $scope.$digest();
              userRequest.editUserPatch($localStorage.id, $scope.user).success(function(adata) {
                $scope.user = adata.User;
                $scope.logo = false;
                $rootScope.closeAllDialogs();
                $rootScope.showDialog('success', 'dialog.accountInfoEditedSuccessfuly', false);
              }).error(function(eData) {
                $rootScope.closeAllDialogs();
                $rootScope.showDialog('error', 'dialog.errorEditingAccountInfo', false);
              });
            }
          });
        } else {
          userRequest.editUserPatch($localStorage.id, $scope.user).then(function successCallback(response) {
            $localStorage.user = JSON.stringify($scope.user);
            $scope.file = false;
            $rootScope.closeAllDialogs();
            $rootScope.showDialog('success', 'dialog.accountInfoEditedSuccessfuly', false);
          }, function errorCallback() {
            $rootScope.closeAllDialogs();
            $rootScope.showDialog('error', 'dialog.errorEditingAccountInfo', false);
          });
        }
      };
      $scope.newItem = '';
      $scope.querySearch = function(query) {
        return $scope.interests.filter(function(e){
          if(e.name.indexOf(query)>-1){
            return e;
          }
        });
      };
    }
  }
  angular.module('sponzorme').controller('SponzorsPreferencesController', SponzorsPreferencesController);
})();
