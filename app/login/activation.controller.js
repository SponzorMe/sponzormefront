(function () {
    'use strict';

    angular.module('sponzorme').controller('ActivationController', ActivationController);

    ActivationController.$inject = ['dialogRequest', 'loginRequest', '$routeParams', '$location'];
    function ActivationController(dialogRequest, loginRequest, $routeParams, $location) {
        var vm = this;


        activate();

        ////////////////

        function activate() {
            dialogRequest.showLoading();
            loginRequest.tryActivation($routeParams.token).success(function () {
                dialogRequest.closeLoading();
                dialogRequest.showDialog('success', 'activationSuccess', '/login');
            }).error(function () {
                dialogRequest.closeLoading();
                dialogRequest.showDialog('error', 'errorActivation', '/login');
            });
        }
    }
})();