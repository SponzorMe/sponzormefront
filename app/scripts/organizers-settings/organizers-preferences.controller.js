(function() {
    'use strict';
    function OrganizersPreferencesController(
        $scope, $translate, userRequest, $localStorage, $rootScope,
        allInterestsServiceRequest, loginRequest, userInterestRequest, dialogRequest
    ) {
        if ($rootScope.userValidation('0')) {
            var vm = this;
            vm.user = JSON.parse($localStorage.user);
            console.log(vm.user);
            vm.ratings = []; //here is necessary assign the ratings
        }
    }
    angular.module('sponzorme')
        .controller('OrganizersPreferencesController', OrganizersPreferencesController);
})();
