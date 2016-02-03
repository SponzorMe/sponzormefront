(function() {
  'use strict';

  angular
    .module('sponzorme')
    .controller('SponzorsNotificationDetailController', SponzorsNotificationDetailController);

  /** @ngInject */
  function SponzorsNotificationDetailController($scope, $mdSidenav) {

    $scope.openSidenavLeft = function(){
         $mdSidenav('left').toggle();
    };

    $scope.isOpenLeft = function () {
      var isOpen = true;
      return isOpen = $mdSidenav('left').isOpen();
    };

    $scope.openMenu = function($mdOpenMenu, $event) {
        $scope.originatorEv = $event;
        $mdOpenMenu($event);
      };    

    $scope.notificationsDetail = {
        'title': 'Felicidades, eres patrocinador de "CHARLA CON SEGURIDAD"',
        'from': {
            'sender': 'SponzorMe Team',
            'link': ''
        },

        'time': '4:40PM',
        'message': 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos alias reiciendis nobis quo veniam blanditiis dicta magnam hic, incidunt voluptate earum quia illum corrupti eaque, enim voluptatum ut ratione officia. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsum rem architecto quae ipsam commodi nulla tempore sapiente et soluta totam nemo, vero culpa possimus optio consequatur expedita repellat nostrum delectus.'
    }
   } //controller end
})();
