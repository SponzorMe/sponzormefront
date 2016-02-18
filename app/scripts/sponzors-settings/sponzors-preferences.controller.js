(function() {
  'use strict';
  function SponzorsPreferencesController($scope, $translate, userRequest, $localStorage, $rootScope, loginRequest, userInterestRequest, $log, allInterestsServiceRequest) {
    if ($rootScope.userValidation('1')) {
      var vm = this;
      vm.user = JSON.parse($localStorage.user);
      vm.file = false; //By default no file to update.
      vm.getAllInterests = function(){
        allInterestsServiceRequest.allInterestsCategoriesId().then(function successCallback(response){
          vm.interests = response.data.InterestCategory;
        }, function errorCallback(err){
          vm.noInterestsLoaded = true;
        });
      };
      vm.file = false;
      $scope.updateDetails = function() {
        $rootScope.showLoading();
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
              vm.user.logo = $rootScope.getConstants().AMAZONBUCKETURL + uniqueFileName;
              $scope.$digest();// What is happened here?
              userRequest.editUserPatch($localStorage.id, vm.user).success(function(adata) {
                vm.user = adata.User;
                vm.file = false;
                $rootScope.closeAllDialogs();
                $rootScope.showDialog('success', 'dialog.accountInfoEditedSuccessfuly', false);
              }).error(function(eData) {
                $rootScope.closeAllDialogs();
                $rootScope.showDialog('error', 'dialog.errorEditingAccountInfo', false);
              });
            }
          });
        } else {
          userRequest.editUserPatch($localStorage.id, vm.user).then(function successCallback(response) {
            $localStorage.user = JSON.stringify(vm.user);
            vm.file = false;
            $rootScope.closeAllDialogs();
            $rootScope.showDialog('success', 'dialog.accountInfoEditedSuccessfuly', false);
          }, function errorCallback() {
            $rootScope.closeAllDialogs();
            $rootScope.showDialog('error', 'dialog.errorEditingAccountInfo', false);
          });
        }
      };      
      vm.querySearch = function(query) {
        return vm.interests.filter(function(e){
          if(e.name.indexOf(query)>-1){
            return e;
          }
        });
      };
      vm.getAllInterests();
      vm.newItem = '';
    }
  }
  angular.module('sponzorme').controller('SponzorsPreferencesController', SponzorsPreferencesController);
})();
