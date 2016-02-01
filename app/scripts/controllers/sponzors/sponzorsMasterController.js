'use strict';
(function() {
  function SponzorsMasterController($scope, $mdSidenav, $translate, $localStorage, ngDialog, $location, $rootScope, $sce) {
    //mock starts
    $scope.openSidenavLeft = function(){
      $mdSidenav('left').toggle();
    };

      $scope.eventItem = [
        {
          'title': 'Este es el nombre del evento, solo 50 caracteres.dasdsadsadsas',
          'date': '20/12/2016',
          'sponzorType': 'gold',
          'status': 'patrocinado'
        },
        {
          'title': 'Este es el nombre del evento, solo 50 caracteres.s',
          'date': '20/12/2016',
          'sponzorType': 'gold',
          'status': 'patrocinado'
        },
        {
          'title': 'Este es el nombre del evento, solo 50 caracteres.s',
          'date': '20/12/2016',
          'sponzorType': 'gold',
          'status': 'patrocinado'
        },
        {
          'title': 'Este es el nombre del evento, solo 50 caracteres.s',
          'date': '20/12/2016',
          'sponzorType': 'gold',
          'status': 'patrocinado'
        },
        {
          'title': 'Este es el nombre del evento, solo 50 caracteres.s',
          'date': '20/12/2016',
          'sponzorType': 'gold',
          'status': 'patrocinado'
        },
        {
          'title': 'Este es el nombre del evento, solo 50 caracteres.s',
          'date': '20/12/2016',
          'sponzorType': 'gold',
          'status': 'patrocinado'
        },
        {
          'title': 'Este es el nombre del evento, solo 50 caracteres.s',
          'date': '20/12/2016',
          'sponzorType': 'gold',
          'status': 'patrocinado'
        }
      ]

      $scope.task = [
        {
          'title': '.Este es el nombre de la tarea, solo 50 caracteres',
          'date': '10/2/2016',
          'description': 'una pequeña descripcion de la tarea para hacer',
          'userName': 'ramiro',
          'status': 'incompleta',
        },
        {
          'title': 'Titulo de una tarea2',
          'date': '98/2/2016',
          'description': 'una pequeña descripcion de la tarea para hacer',
          'userName': 'jose',
          'status': 'completa',
        },
        {
          'title': 'Titulo de una tarea3',
          'date': '5/1/2016',
          'description': 'una pequeña descripcion de la tarea para hacer',
          'userName': 'liz',
          'status': 'incompleta',
        },
        {
          'title': 'Titulo de una tarea4',
          'date': '6/12/2015',
          'description': 'una pequeña descripcion de la tarea para hacer',
          'userName': 'fernando',
          'status': 'incompleta',
        }
      ];

      $scope.typeOfSponzor = 'gold';
    //mack ends


    $scope.trustSrc = function(src) {
      return $sce.trustAsResourceUrl(src);
    };
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
    $scope.openLocation = function(sponzorship) {
      $scope.currentEvent = sponzorship.event;
      $scope.mapSrc = 'https://www.google.com/maps/embed/v1/place?key=AIzaSyDxXJIUmt5IDbqXuqNpD4ZssRl6aXBRhcU&q=' + encodeURIComponent($scope.currentEvent.location);
      ngDialog.open({
        template: 'views/templates/locationDialog.html',
        scope: $scope,
        showClose: true
      });
    };
    $scope.seeCause = function(sponzorship) {
      $scope.cause = sponzorship.cause;
      $scope.status = sponzorship.status;
      ngDialog.open({
        template: 'views/templates/sponzorshipCauseDialog.html',
        showClose: false,
        scope: $scope
      });
    };
    $scope.menuprincipal = 'views/sponzors/menu.html';
  }
  angular.module('sponzorme').controller('SponzorsMasterController', SponzorsMasterController);
})();
