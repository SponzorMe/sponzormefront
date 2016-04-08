(function() {
  'use strict';

  function OrganizersPreferencesController($scope, $translate, userRequest, $localStorage, $rootScope, loginRequest, userInterestRequest, $log, allInterestsServiceRequest, dialogRequest) {
    if ($rootScope.userValidation('0')) {
      var vm = this;
      vm.user = JSON.parse($localStorage.user);
      vm.getAllInterests = function() {
        allInterestsServiceRequest.allInterestsCategoriesId().then(function successCallback(response) {
          vm.interests = response.data.InterestCategory;
        }, function errorCallback(err) {
          vm.noInterestsLoaded = true;
        });
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
  angular.module('sponzorme').controller('OrganizersPreferencesController', OrganizersPreferencesController);
})();
