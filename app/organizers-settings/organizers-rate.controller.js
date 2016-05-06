
(function() {
    'use strict';
    function OrganizersRateController($scope, $localStorage, $rootScope) {
        if ($rootScope.userValidation('0')) {
            var vm = this;
            vm.user = JSON.parse($localStorage.user);
            console.log(vm.user);
            vm.ratings = []; //here is necessary assign the ratings
        }
    }
    angular.module('sponzorme').controller('OrganizersRateController', OrganizersRateController);
    OrganizersRateController.$inject = ['$scope', '$localStorage', '$rootScope'];
})();
