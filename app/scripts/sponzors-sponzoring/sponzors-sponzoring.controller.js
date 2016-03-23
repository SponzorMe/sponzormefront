(function() {
  'use strict';
  function SponzorsSponzorshipsController($scope, $localStorage, $rootScope, ratingRequest, SPONZORSHIPSTATUSES, $routeParams, ngDialog, $mdDialog) {
    if ($rootScope.userValidation('1')) {
      var vm = this;
      vm.todayDate = new Date().getTime();
      vm.user = JSON.parse($localStorage.user);
      vm.statuses = SPONZORSHIPSTATUSES;

      if($routeParams.id){
        vm.currentSponzorship = vm.user.sponzorships[$routeParams.id];
        vm.currentSponzorship.event.ends = new Date(vm.currentSponzorship.event.ends).getTime();
        console.log(vm.currentSponzorship);
      }

      //This function displays a popup to Show Download calendar
      vm.downloadCalendar = function(sponzorship) {
        $scope.starts = new Date(sponzorship.event.starts).toISOString().replace(':', '').replace('-', '').replace('.', '');
        $scope.ends = new Date(sponzorship.event.ends).toISOString().replace(':', '').replace('-', '').replace('.', '');
        $scope.ends = $scope.ends.replace(':', '').replace('-', '').replace('.', '').replace('000Z', '');
        $scope.starts = $scope.starts.replace(':', '').replace('-', '').replace('.', '').replace('000Z', '');
        $scope.currentSponzorship = sponzorship;
        $mdDialog.show({
          templateUrl: 'scripts/sponzors-sponzoring/add-calendar.html',
          controller: 'SponzorsSponzorshipsController',
          controllerAs: 'ssc',
          scope: $scope,
          preserveScope: true,
          clickOutsideToClose: true
        });
      };





      //This function open the Payment Details Dialog
      vm.doPayment = function(sponzorship) {
        $scope.PAYPALCOMPLETERETURNURL = $rootScope.getConstants().PAYPALCOMPLETERETURNURL;
        $scope.PAYPALIPNRETURNURL = $rootScope.getConstants().PAYPALIPNRETURNURL;
        $scope.SANDBOX = $rootScope.getConstants().PAYPALSANDBOX;
        $scope.PAYPALEMAIL = $rootScope.getConstants().PAYPALEMAIL;
        $scope.sponzorship = sponzorship;
        $scope.paymentValue = sponzorship.perk.usd;
        $scope.fee = parseFloat((sponzorship.perk.usd * $rootScope.getConstants().FEE) + $rootScope.getConstants().XOOMRATE);
        $scope.paymentTotal = parseFloat(sponzorship.perk.usd) + parseFloat($scope.fee);

        $mdDialog.show({
          templateUrl: 'scripts/sponzors-sponzoring/payment-info.html',
          controller: 'SponzorsSponzorshipsController',
          controllerAs: 'ssc',
          scope: $scope,
          preserveScope: true,
          clickOutsideToClose: true
        });
      };



      //This function shows SpoonzorShipCause
      vm.seeCause = function(sponzorship) {
        $scope.cause = sponzorship.cause;
        $scope.status = sponzorship.status;
        $mdDialog.show({
          templateUrl: 'scripts/sponzors-sponzoring/cause-dialog.html',
          controller: 'SponzorsSponzorshipsController',
          controllerAs: 'ssc',
          scope: $scope,
          preserveScope: true,
          clickOutsideToClose: true
        });
      };
    }
  }
  angular.module('sponzorme').controller('SponzorsSponzorshipsController', SponzorsSponzorshipsController);
})();
