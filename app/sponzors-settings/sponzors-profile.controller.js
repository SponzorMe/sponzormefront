(function () {
  'use strict';
  function SponzorsProfileController($scope, $translate, userRequest, $localStorage, $rootScope, loginRequest, userInterestRequest, dialogRequest) {
    if ($rootScope.userValidation('1')) {
      var vm = this;
      vm.user = JSON.parse($localStorage.user);
      $scope.file = false;
      vm.editAccount = function () {
        dialogRequest.showLoading();
        if (vm.user.location !== vm.locationUser) {
          vm.user.location = vm.locationUser.formatted_address;
          vm.user.location_reference = vm.locationUser.place_id;
        }
        if ($scope.file) {
          AWS.config.update({
            accessKeyId: $rootScope.getConstants().AMAZONKEY,
            secretAccessKey: $rootScope.getConstants().AMAZONSECRET
          });
          AWS.config.region = $rootScope.getConstants().AMAZONBUCKETREGION;
          var bucket = new AWS.S3({
            params: {
              Bucket: $rootScope.getConstants().AMAZONBUCKET
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
          bucket.putObject(params, function (err, data) {
            if (!err) {
              $localStorage.image = $rootScope.getConstants().AMAZONBUCKETURL + uniqueFileName;
              vm.user.image = $rootScope.getConstants().AMAZONBUCKETURL + uniqueFileName;
              vm.user.name = vm.user.firstName + ' ' + vm.user.lastName;
              var userInfo = {
                'name': vm.user.firstName + ' ' + vm.user.lastName,
                'image': $localStorage.image,
                'company': vm.user.company,
                'email': vm.user.email,
                'location': vm.user.location,
                'location_reference': vm.user.location_reference,
                'phone': vm.user.phone
              };
              userRequest.editUserPatch($localStorage.id, userInfo).then(function successCallback(response) {
                $localStorage.user = JSON.stringify(vm.user);
                $scope.file = false;
                dialogRequest.closeLoading();
                dialogRequest.showDialog('success', 'accountInfoEditedSuccessfuly', false);
              }, function errorCallback(err) {
                dialogRequest.closeLoading();
                dialogRequest.showDialog('error', 'errorEditingAccountInfo', false);
              });
            }
          });
        } else {
          var userInfo = {
            'name': vm.user.firstName + ' ' + vm.user.lastName,
            'image': $localStorage.image,
            'company': vm.user.company,
            'email': vm.user.email,
            'location': vm.user.location,
            'location_reference': vm.user.location_reference,
            'phone': vm.user.phone
          };
          userRequest.editUserPatch($localStorage.id, vm.user).then(function successCallback(response) {
            $localStorage.user = JSON.stringify(vm.user);
            $scope.file = false;
            dialogRequest.closeLoading();
            dialogRequest.showDialog('success', 'accountInfoEditedSuccessfuly', false);
          }, function errorCallback(err) {
            dialogRequest.closeLoading();
            dialogRequest.showDialog('error', 'errorEditingAccountInfo', false);
          });
        }
      };
    }
  }
  angular.module('sponzorme').controller('SponzorsProfileController', SponzorsProfileController);
})();
