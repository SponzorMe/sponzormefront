'use strict';
(function() {
  function OrganizersTasksController($scope, $mdSidenav,  $translate, userRequest, $localStorage, eventRequest, $location, usSpinnerService, ngDialog, sponzorshipRequest, perkTaskRequest, perkRequest, taskSponzorRequest, $rootScope, $firebaseArray) {
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
    $scope.myDate = new Date()

    $scope.option = '';

    $scope.taskDetail = {
        'event': 'Concierto tributo Charly Garcia',
        'title': 'enviar boletín por correo a los asistentes',
        'from': {
            'sender': 'SponzorMe Team',
            'link': ''
        },

        'time': '4:40PM',
        'message': 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos alias reiciendis nobis quo veniam blanditiis dicta magnam hic, incidunt voluptate earum quia illum corrupti eaque, enim voluptatum ut ratione officia. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsum rem architecto quae ipsam commodi nulla tempore sapiente et soluta totam nemo, vero culpa possimus optio consequatur expedita repellat nostrum delectus.'
    }
$scope.tasks = [
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
    .controller('OrganizersTasksController', OrganizersTasksController);

})();