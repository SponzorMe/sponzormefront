'use strict';
(function() {
  
  
  function SponzorsNotificationsController($scope, $mdSidenav) {
    //mock
      
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

    $scope.notifications = [
    	{
    		'title' : 'Felicidades, eres patrocinador de "CHARLA CON SEGURIDAD"',
    		'date' : '4:50PM',
    	},
    	{
    		'title' : 'Tu evento "CONCIERTO DE FIN DE AÑO" ha finalizado',
    		'date' : '11/11/2015',
    	},
    	{
    		'title' : 'JULIAN VELEZ te ha enviado un mensaje',
    		'date' : '11/11/2015',
    	},
    	{
    		'title' : 'Carla Medina te ha hecho una pregunta',
    		'date' : '11/11/2015',
    	}
    ];
   
  }

  angular
    .module('sponzorme')
    .controller('SponzorsNotificationsController', SponzorsNotificationsController);

})();
