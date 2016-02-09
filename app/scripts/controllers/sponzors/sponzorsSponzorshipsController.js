'use strict';
(function() {
  function SponzorsSponzorshipsController($scope, $localStorage, $rootScope, ratingRequest, SPONZORSHIPSTATUSES, $routeParams, ngDialog) {
    if ($rootScope.userValidation('1')) {
      $scope.todayDate = new Date().getTime(); //To compare
      $scope.user = JSON.parse($localStorage.user); //Restoring the user
      $scope.statuses = SPONZORSHIPSTATUSES; //Status of the Sponzorships
      if ($routeParams.id) { //If we are in Sponzorship Detail
        $scope.currentSponzorship = $scope.user.sponzorships[$routeParams.id];
      }

      //This function open the Payment Details Dialog
      $scope.doPayment = function(sponzorship) {
        $scope.PAYPALCOMPLETERETURNURL = $rootScope.getConstants().PAYPALCOMPLETERETURNURL;
        $scope.PAYPALIPNRETURNURL = $rootScope.getConstants().PAYPALIPNRETURNURL;
        $scope.SANDBOX = $rootScope.getConstants().PAYPALSANDBOX;
        $scope.PAYPALEMAIL = $rootScope.getConstants().PAYPALEMAIL;
        $scope.sponzorship = sponzorship;
        $scope.paymentValue = sponzorship.perk.usd;
        $scope.fee = parseFloat((sponzorship.perk.usd * $rootScope.getConstants().FEE) + $rootScope.getConstants().XOOMRATE);
        $scope.paymentTotal = parseFloat(sponzorship.perk.usd) + parseFloat($scope.fee);
        ngDialog.open({
          scope: $scope,
          template: 'views/templates/prePaymentInfo.html',
          showClose: true
        });
      };

      //This function displays a popup to Show Download calendar
      $scope.downloadCalendar = function(sponzorship) {
        $scope.starts = new Date(sponzorship.event.starts).toISOString().replace(':', '').replace('-', '').replace('.', '');
        $scope.ends = new Date(sponzorship.event.ends).toISOString().replace(':', '').replace('-', '').replace('.', '');
        $scope.ends = $scope.ends.replace(':', '').replace('-', '').replace('.', '').replace('000Z', '');
        $scope.starts = $scope.starts.replace(':', '').replace('-', '').replace('.', '').replace('000Z', '');
        $scope.currentSponzorship = sponzorship;
        ngDialog.open({
          template: 'views/templates/addToCalendarDialog.html',
          showClose: false,
          scope: $scope
        });
      };

      //This function shows SpoonzorShipCause
      $scope.seeCause = function(sponzorship) {
        $scope.cause = sponzorship.cause;
        $scope.status = sponzorship.status;
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
