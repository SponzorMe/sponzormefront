'use strict';
(function() {
  function SponzorsTasksController($scope, $mdSidenav,  $translate, userRequest, $localStorage, eventRequest, $location, usSpinnerService, ngDialog, sponzorshipRequest, perkTaskRequest, perkRequest, taskSponzorRequest, $rootScope, $firebaseArray) {
    //mock starts
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
$scope.eventItem = [
        {
          'title': 'Este es el nombre del evento, solo 50 caracteres.s',
          'date': '20/12/2016',
          'owner': 'organizador',
          'taskTitle': 'Enviar listado de invitados VIP',
          'status': 'incompleta'
        },
        {
          'title': 'Este es el nombre del evento, solo 50 caracteres.s',
          'date': '20/12/2016',
          'owner': 'organizador',
          'taskTitle': 'Enviar listado de invitados VIP',
          'status': 'incompleta'
        },
        {
          'title': 'Este es el nombre del evento, solo 50 caracteres.s',
          'date': '20/12/2016',
          'owner': 'organizador',
          'taskTitle': 'Enviar listado de invitados VIP',
          'status': 'incompleta'
        },
        {
          'title': 'Este es el nombre del evento, solo 50 caracteres.s',
          'date': '20/12/2016',
          'owner': 'organizador',
          'taskTitle': 'Enviar listado de invitados VIP',
          'status': 'completa'
        },
        {
          'title': 'Este es el nombre del evento, solo 50 caracteres.s',
          'date': '20/12/2016',
          'owner': 'organizador',
          'taskTitle': 'Enviar listado de invitados VIP',
          'status': 'completa'
        },
        {
          'title': 'Este es el nombre del evento, solo 50 caracteres.s',
          'date': '20/12/2016',
          'owner': 'organizador',
          'taskTitle': 'Enviar listado de invitados VIP',
          'status': 'completa'
        },
        {
          'title': 'Este es el nombre del evento, solo 50 caracteres.s',
          'date': '20/12/2016',
          'owner': 'organizador',
          'taskTitle': 'Enviar listado de invitados VIP',
          'status': 'completa'
        }
      ]
   

    //mock ends
      
  }
  angular.module('sponzorme')
    .controller('SponzorsTasksController', SponzorsTasksController);

})();
