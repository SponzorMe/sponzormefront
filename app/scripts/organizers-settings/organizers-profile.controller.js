(function() {
  'use strict';
  function OrganizersProfileController($scope, $translate, userRequest, $localStorage, $rootScope, loginRequest, userInterestRequest, dialogRequest) {
    if ($rootScope.userValidation('0')) {
      var vm = this;
      vm.user = JSON.parse($localStorage.user);
      console.log(vm.user);
      vm.file = false;
      vm.editAccount = function(){
        dialogRequest.showLoading();
        if (vm.user.location !== vm.locationUser) {
          vm.user.location = vm.locationUser.formatted_address;
          vm.user.location_reference = vm.locationUser.place_id;
        }
        if (vm.file) {
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
          var uniqueFileName = btoa($rootScope.uniqueString() + new Date().getTime() + $rootScope.uniqueString()).replace('=', $rootScope.uniqueString()) + '.' + $rootScope.getExtension(vm.file.name);
          var params = {
            Key: uniqueFileName,
            ContentType: vm.file.type,
            Body: vm.file,
            ServerSideEncryption: 'AES256'
          };
          bucket.putObject(params, function(err, data) {
            if (!err) {
              $localStorage.image = $rootScope.getConstants().AMAZONBUCKETURL + uniqueFileName;
              vm.user.image = $rootScope.getConstants().AMAZONBUCKETURL + uniqueFileName;
              vm.user.name = vm.user.firstName +' '+ vm.user.lastName;
              userRequest.editUserPatch($localStorage.id, vm.user).then(function successCallback(response) {
                $localStorage.user = JSON.stringify(vm.user);
                vm.file = false;
                dialogRequest.closeLoading();
                dialogRequest.showDialog('success', 'dialog.accountInfoEditedSuccessfuly', false);
              }, function errorCallback(err) {
                dialogRequest.closeLoading();
                dialogRequest.showDialog('error', 'dialog.errorEditingAccountInfo', false);
              });
            }
          });
        } else {
          vm.user.name = vm.user.firstName +' '+ vm.user.lastName;
          userRequest.editUserPatch($localStorage.id, vm.user).then(function successCallback(response) {
            $localStorage.user = JSON.stringify(vm.user);
            vm.file = false;
            dialogRequest.closeLoading();
            dialogRequest.showDialog('success', 'dialog.accountInfoEditedSuccessfuly', false);
          }, function errorCallback(err) {
            dialogRequest.closeLoading();
            dialogRequest.showDialog('error', 'dialog.errorEditingAccountInfo', false);
          });
        }
      };
    }
  }
  angular.module('sponzorme').controller('OrganizersProfileController', OrganizersProfileController);
})();
