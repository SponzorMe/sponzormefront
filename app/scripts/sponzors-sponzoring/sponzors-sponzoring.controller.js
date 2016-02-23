'use strict';
(function() {
  function SponzorsSponzorshipsController($scope, $localStorage, $rootScope, ratingRequest, SPONZORSHIPSTATUSES, $routeParams, ngDialog) {
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
      
      
      
      

      //This function open the Payment Details Dialog
      vm.doPayment = function(sponzorship) {
        vm.PAYPALCOMPLETERETURNURL = $rootScope.getConstants().PAYPALCOMPLETERETURNURL;
        vm.PAYPALIPNRETURNURL = $rootScope.getConstants().PAYPALIPNRETURNURL;
        vm.SANDBOX = $rootScope.getConstants().PAYPALSANDBOX;
        vm.PAYPALEMAIL = $rootScope.getConstants().PAYPALEMAIL;
        vm.sponzorship = sponzorship;
        vm.paymentValue = sponzorship.perk.usd;
        vm.fee = parseFloat((sponzorship.perk.usd * $rootScope.getConstants().FEE) + $rootScope.getConstants().XOOMRATE);
        vm.paymentTotal = parseFloat(sponzorship.perk.usd) + parseFloat(vm.fee);
        ngDialog.open({
          scope: $scope,
          template: 'views/templates/prePaymentInfo.html',
          showClose: true
        });
      };

      //This function displays a popup to Show Download calendar
      vm.downloadCalendar = function(sponzorship) {
        vm.starts = new Date(sponzorship.event.starts).toISOString().replace(':', '').replace('-', '').replace('.', '');
        vm.ends = new Date(sponzorship.event.ends).toISOString().replace(':', '').replace('-', '').replace('.', '');
        vm.ends = vm.ends.replace(':', '').replace('-', '').replace('.', '').replace('000Z', '');
        vm.starts = vm.starts.replace(':', '').replace('-', '').replace('.', '').replace('000Z', '');
        vm.currentSponzorship = sponzorship;
        ngDialog.open({
          template: 'views/templates/addToCalendarDialog.html',
          showClose: false,
          scope: $scope
        });
      };

      //This function shows SpoonzorShipCause
      vm.seeCause = function(sponzorship) {
        vm.cause = sponzorship.cause;
        vm.status = sponzorship.status;
        ngDialog.open({
          template: 'views/templates/sponzorshipCauseDialog.html',
          showClose: false,
          scope: $scope
        });
      };
    }
  }
  angular.module('sponzorme').controller('SponzorsSponzorshipsController', SponzorsSponzorshipsController);
})();
