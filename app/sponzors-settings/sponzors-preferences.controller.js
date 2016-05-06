(function() {
  'use strict';

  function SponzorsPreferencesController($scope, userRequest, $localStorage, $rootScope, userInterestRequest, allInterestsServiceRequest, dialogRequest) {
    if ($rootScope.userValidation('1')) {
      var vm = this;
      vm.user = JSON.parse($localStorage.user);
      vm.getAllInterests = function() {
        allInterestsServiceRequest.allInterestsCategoriesId().then(function successCallback(response) {
          vm.interests = response.data.InterestCategory;
        }, function errorCallback(err) {
          vm.noInterestsLoaded = true;
        });
      };
      vm.file = false;
      vm.updateDetails = function() {
        dialogRequest.showLoading();
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
              $scope.$digest(); // What is happened here?
              userRequest.editUserPatch($localStorage.id, vm.user).success(function(adata) {
                vm.user = adata.User;
                vm.file = false;
                dialogRequest.closeLoading();
                dialogRequest.showDialog('success', 'dialog.accountInfoEditedSuccessfuly', false);
              }).error(function(eData) {
                dialogRequest.closeLoading();
                dialogRequest.showDialog('error', 'dialog.errorEditingAccountInfo', false);
              });
            }
          });
        } else {
          userRequest.editUserPatch($localStorage.id, vm.user).then(function successCallback(response) {
            $localStorage.user = JSON.stringify(vm.user);
            vm.file = false;
            dialogRequest.closeLoading();
            dialogRequest.showDialog('success', 'accountInfoEditedSuccessfuly', false);
          }, function errorCallback() {
            dialogRequest.closeLoading();
            dialogRequest.showDialog('error', 'errorEditingAccountInfo', false);
          });
        }
      };
      vm.querySearch = function(query) {
        return vm.interests.filter(function(e) {
          if (e.name.indexOf(query) > -1) {
            return e;
          }
        });
      };
      vm.removeUserInterest = function(index, id) {
        vm.user.interests.splice(index, 1);
        userInterestRequest.deleteUserInterest(id).then(function(response) {
          $localStorage.user = JSON.stringify(vm.user);
        });
      };
      vm.addUserInterests = function(interest) {
        if (interest && interest.name) {
          var flag = false;
          if (vm.user.interests) {
            for (var i = 0; i < vm.user.interests.length; i++) {
              if (vm.user.interests[i].interest_id === interest.id_interest) {
                flag = true;
                break;
              }
            }
          }
          if (!flag) {
            var dataInterest = {
              user_id: $localStorage.id,
              interest_id: interest.id_interest
            };
            dialogRequest.showLoading();
            userInterestRequest.createUserInterest(dataInterest).then(function successCallback(response) {
              vm.user.interests.push(response.data.UserInterest);
              $localStorage.user = JSON.stringify(vm.user);
              dialogRequest.closeLoading();
            }, function (err){
              dialogRequest.closeLoading();
              dialogRequest.showDialog('error', 'invalidInterestSelection', false);
            });
          }
        } else {
          dialogRequest.showDialog('error', 'invalidInterestSelection', false);
        }
      };
      vm.getAllInterests();
      vm.newItem = '';
    }
  }
  angular.module('sponzorme').controller('SponzorsPreferencesController', SponzorsPreferencesController);
  SponzorsPreferencesController.$inject = ['$scope', 'userRequest', '$localStorage', '$rootScope', 'userInterestRequest', 'allInterestsServiceRequest', 'dialogRequest'];
})();
