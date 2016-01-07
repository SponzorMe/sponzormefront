var event_en = {
  'DEFAULT_EVENT': {
    'title': 'Your first event.',
    'description': 'Congrats!!! This is your first event. In this place your going to have your event description.',
    'location': 'San Francisco, California',
    'location_reference': 'ljsadljf3289uojklfhasd',
    'startdate': 'Today',
    'enddate': 'Today +2 Hours',
    'image': 'http://i.imgur.com/t8YehGM.jpg',
    'privacy': '0',
    'lang': 'en',
    'category': '14',
    'type': '1',
    'starts': moment(Date.now()).format('YYYY-MM-DD hh:mm:ss'),
    'ends': moment(Date.now() + 2).format('YYYY-MM-DD hh:mm:ss')
  },
  'PERKS': [{
    'kind': 'Gold',
    'usd': '0',
    'total_quantity': '1',
    'reserved_quantity': '0'
  }, {
    'kind': 'Plate',
    'usd': '0',
    'total_quantity': '1',
    'reserved_quantity': '0'
  }, {
    'kind': 'Bronze',
    'usd': '0',
    'total_quantity': '1',
    'reserved_quantity': '0'
  }]
};
var event_pt = {
  'DEFAULT_EVENT': {
    'title': 'Seu primeiro evento.',
    'description': 'Parabéns!!! Este é o seu primeiro evento. Aqui você terá a descrição do evento.',
    'location': 'São Paulo, Brasil',
    'location_reference': 'ljsadljf3289uojklfhasd',
    'startdate': 'Today',
    'enddate': 'Today +2 Hours',
    'image': 'http://i.imgur.com/t8YehGM.jpg',
    'privacy': '0',
    'lang': 'en',
    'category': '14',
    'type': '1',
    'starts': moment(Date.now()).format('YYYY-MM-DD hh:mm:ss'),
    'ends': moment(Date.now() + 2).format('YYYY-MM-DD hh:mm:ss')
  },
  'PERKS': [{
    'kind': 'Gold',
    'usd': '0',
    'total_quantity': '1',
    'reserved_quantity': '0'
  }, {
    'kind': 'Plate',
    'usd': '0',
    'total_quantity': '1',
    'reserved_quantity': '0'
  }, {
    'kind': 'Bronze',
    'usd': '0',
    'total_quantity': '1',
    'reserved_quantity': '0'
  }]
};
var event_es = {
  'DEFAULT_EVENT': {
    'title': 'Tu Primer Evento.',
    'description': 'Felicidades!!! Este es tu primer evento. En este lugar vas a tener la descripción de tu evento',
    'location': 'San Francisco, California',
    'location_reference': 'ljsadljf3289uojklfhasd',
    'startdate': 'Today',
    'enddate': 'Today +2 Hours',
    'image': 'http://i.imgur.com/t8YehGM.jpg',
    'privacy': '0',
    'lang': 'en',
    'category': '14',
    'type': '1',
    'starts': moment(Date.now()).format('YYYY-MM-DD hh:mm:ss'),
    'ends': moment(Date.now() + 2).format('YYYY-MM-DD hh:mm:ss')
  },
  'PERKS': [{
    'kind': 'Oro',
    'usd': '0',
    'total_quantity': '1',
    'reserved_quantity': '0'
  }, {
    'kind': 'Plata',
    'usd': '0',
    'total_quantity': '1',
    'reserved_quantity': '0'
  }, {
    'kind': 'Bronce',
    'usd': '0',
    'total_quantity': '1',
    'reserved_quantity': '0'
  }]
};
var dataTime = new Date();
var timer = parseInt(2 * 24 * 60 * 60 * 1000);
var dataExpDate = new Date(dataTime.getTime() + timer);

'use strict';
var idiomaselect = 'en'; //Default Language
var expirationTime = 1;
(function() {
  angular.module('sponzorme', [
      'pascalprecht.translate',
      'ngResource',
      'ngRoute',
      'ngDialog',
      'base64',
      'ngCookies',
      'ngStorage',
      'ui.bootstrap',
      'google.places',
      'angularSpinner',
      'naif.base64',
      'angularUtils.directives.dirPagination',
      'ui.bootstrap.datetimepicker',
      'firebase',
      'textAngular',
      'angular-input-stars',
      'luegg.directives'
    ])
    .config(['$translateProvider', function($translateProvider) {
      $translateProvider.useStaticFilesLoader({
        prefix: 'langs/lang-',
        suffix: '.json'
      });

      $translateProvider.useSanitizeValueStrategy('escaped');

      $translateProvider.preferredLanguage('en');

      $translateProvider.fallbackLanguage('en');

      // End Languages
    }])
    .config(['$localStorageProvider',
      function($localStorageProvider) {
        $localStorageProvider.setKeyPrefix('QkeMJxG7-');
      }
    ])
    .config(['$routeProvider', function($routeProvider) {
      $routeProvider
        .when('', {
          templateUrl: 'views/main.html',
          controller: 'HomeController'
        })
        .when('/', {
          templateUrl: 'views/main.html',
          controller: 'HomeController'
        })
        .when('/activation/:token', {
          templateUrl: 'views/activation.html',
          controller: 'ActivationController'
        })
        .when('/login', {
          templateUrl: 'views/login.html',
          controller: 'LoginController'
        })
        .when('/resend', {
          templateUrl: 'views/resend.html',
          controller: 'ResendController'
        })
        .when('/forgot', {
          templateUrl: 'views/forgot.html',
          controller: 'ForgotController'
        })
        .when('/reset/:tokenReset', {
          templateUrl: 'views/reset.html',
          controller: 'ForgotController'
        })
        .when('/sponzors/create', {
          templateUrl: 'views/sponzors/create.html',
          controller: 'SponzorsCreateController'
        })
        .when('/organizers/create', {
          templateUrl: 'views/organizers/create.html',
          controller: 'OrganizersCreateController'
        })
        .when('/logout', {
          templateUrl: 'views/main.html',
          controller: 'LogoutController'
        })
        .when('/organizers/dashboard', {
          templateUrl: 'views/organizers/dashboard/main.html',
          controller: 'OrganizersMainController'
        })
        .when('/organizers/events', {
          templateUrl: 'views/organizers/dashboard/events.html',
          controller: 'OrganizersEventsController'
        })
        .when('/organizers/sponzors', {
          templateUrl: 'views/organizers/dashboard/sponzorships.html',
          controller: 'OrganizersSponzorshipsController'
        })
        .when('/customization', {
          templateUrl: 'views/customization/customization.html',
          controller: 'CustomizationController'
        })
        .when('/organizers/friend', {
          templateUrl: 'views/organizers/dashboard/friend.html',
          controller: 'OrganizersFriendController'
        })
        .when('/organizers/settings', {
          templateUrl: 'views/organizers/dashboard/settings.html',
          controller: 'OrganizersSettingsController'
        })
        .when('/sponzors/dashboard', {
          templateUrl: 'views/sponzors/dashboard/main.html',
          controller: 'SponzorsMainController'
        })
        .when('/sponzors/settings', {
          templateUrl: 'views/sponzors/dashboard/settings.html',
          controller: 'SponzorsSettingsController'
        })
        .when('/sponzors/friend', {
          templateUrl: 'views/sponzors/dashboard/friend.html',
          controller: 'SponzorsFriendController'
        })
        .when('/sponzors/following', {
          templateUrl: 'views/sponzors/dashboard/following.html',
          controller: 'SponzorsFollowingController'
        })
        .when('/sponzors/sponzoring', {
          templateUrl: 'views/sponzors/dashboard/sponzorships.html',
          controller: 'SponzorsSponzorshipsController'
        })
        .when('/event/:eventId', {
          templateUrl: 'views/event.html',
          controller: 'EventPageController'
        })
        .when('/organizers/add/event', {
          templateUrl: 'views/organizers/dashboard/add_event.html',
          controller: 'OrganizersEventCreateController'
        })
        .when('/organizers/edit/event/:id', {
          templateUrl: 'views/organizers/dashboard/edit_event.html',
          controller: 'OrganizersEventEditController'
        })
        .when('/sponzors/payment_complete/:sponzorship_id/:sponzor_id', {
          templateUrl: 'views/sponzors/dashboard/sponzorships.html',
          controller: 'SponzorsSponzorshipsController'
        })
        .when('/eventbrite/:eventBriteCode', {
          templateUrl: 'views/organizers/dashboard/add_event.html',
          controller: 'OrganizersEventCreateController'
        })
        .when('/meetup/:meetupCode', {
          templateUrl: 'views/organizers/dashboard/add_event.html',
          controller: 'OrganizersEventCreateController'
        })
        .when('/sponzors/rating/:sponzorshipId', {
          templateUrl: 'views/sponzors/dashboard/rateSponzorship.html',
          controller: 'SponzorsRatingController'
        })
        .when('/organizers/rating/:sponzorshipId', {
          templateUrl: 'views/organizers/dashboard/rateSponzorship.html',
          controller: 'OrganizersRatingController'
        })
        .when('/sponzors/chat/sponzorship/:sponzorshipId', {
          templateUrl: 'views/chat.html',
          controller: 'ChatController'
        })
        .when('/profile/:userId', {
          templateUrl: 'views/profile.html',
          controller: 'ProfileController'
        })
        .otherwise({
          redirectTo: '/login'
        });
    }])
    /*
     * Author: Sebastian Gomez
     * This function redirect to https urls
     */
    .run(['$rootScope', function($rootScope) {
      var host = window.location.href;
      if (window.location.protocol === 'http:' && host.indexOf('localhost') <= -1) {
        var aux = host.replace('http:', 'https:');
        window.location.href = aux;
      }
    }])
    .run(['$rootScope', '$translate', '$location', 'allInterestsServiceRequest', '$filter', '$localStorage', 'userRequest', 'ngDialog', function($rootScope, $translate, $location, allInterestsServiceRequest, $filter, $localStorage, userRequest, ngDialog) {
      if(!$rootScope.tolsctive){
        $rootScope.tolsctive = 'active';
      }
      $rootScope.toggleSidebar = function() {
        $rootScope.tolsctive = !$rootScope.tolsctive;
        if ($rootScope.tolsctive === true) {
          $rootScope.tolsctive = 'active';
        }
      };
      /*
       * Author: Sebastian Gomez
       * This function allows change the language whatever be the route
       * for this reason this is a global function
       */
      $rootScope.changeLanguage = function(key) {
        $translate.use(key);
        idiomaselect = key;
      };
      /*
       * Author: Sebastian Gomez
       * This function return the current languaje used in the application
       */
      $rootScope.currentLanguage = function(key) {
        return $translate.use();
      };

      $rootScope.showLoading = function(){
        ngDialog.open({
          template: 'views/templates/loadingDialog.html',
          showClose: false,
          closeByEscape: false,
          closeByDocument: false,
          controller: 'DialogController'
        });
      };

      $rootScope.showDialog = function(kind, message, redirectOnClose){
        $rootScope.pseudoScope = {'message': message, 'redirectOnClose': redirectOnClose};
        //console.log($rootScope.pseudoScope);
        var selectedTemplate;
        if(kind === 'error'){
          selectedTemplate = 'views/templates/errorDialog.html';
        }
        else if(kind === 'success'){
          selectedTemplate = 'views/templates/successDialog.html';
        }
        else{
          selectedTemplate = 'views/templates/infoDialog.html';
        }
        $rootScope.pseudoScope.message = message;
        $rootScope.pseudoScope.redirectOnClose = redirectOnClose;
        ngDialog.open({
          template: selectedTemplate,
          showClose: false,
          closeByEscape: false,
          closeByDocument: false,
          controller: 'DialogController',
          scope: $rootScope
        });
      };

      $rootScope.closeAllDialogs = function(){
        ngDialog.closeAll();
      };

      $rootScope.buildInterests = function() {
        allInterestsServiceRequest.allInterestsCategoriesId().success(function(adata) {
          var interests = adata.InterestCategory;
          var log = [];
          var a = '';
          angular.forEach(interests, function(value) {
            a = a + '</br>' + ($filter('normalize')(value.name) + ':' + value.name + ',');
          }, log);
          document.write(a);
        });
      };
      /*
       * Author: Sebastian Gomez
       * This functions detect the enviroment and set the configuration
       */
      $rootScope.getConstants = function() {
        var host = window.location.hostname; // Get the host
        if (host.indexOf('localhost') > -1) { //Localhost
          return {
            'URL': 'https://apilocal.sponzor.me/',
            'XOOMRATE': parseFloat(4.99),
            'FEE': parseFloat(0.1),
            'PAYPALCOMPLETERETURNURL': 'http://www.sponzor.me/thank-you/',
            'PAYPALIPNRETURNURL': 'https://apilocal.sponzor.me/ipn',
            'PAYPALEMAIL': 'ing.carlosandresrojas@gmail.com',
            'FURL': 'https://sponzorme.firebaseio.com/localhost/',
            'AMAZONSECRET': 'RlzqEBFUlJW/8YGkeasfmTZRLTlWMWwaBpJNBxu6',
            'AMAZONKEY': 'AKIAJDGUKWK3H7SJZKSQ',
            'AMAZONBUCKET': 'sponzormewebappimages',
            'EVENTBRITECLIENTSECRET': 'QNC7CUESEQ67AA3WST4UWHFRAFNQ5J6RELHQVHBIPY2QCHY5DZ',
            'EVENTBRITEAPYKEY': 'BI5D6XQVDCIPGOKY4U',
            'MEETUPAPIKEY': '9pfi8r66lr4da194pc1lvhclq7',
            'MEETUPREDIRECTURL': 'https://apilocal.sponzor.me/accept/meetup',
            'AMAZONBUCKETREGION': 'us-west-2',
            'AMAZONBUCKETURL': 'https://s3-us-west-2.amazonaws.com/sponzormewebappimages/',
            'EVENTEXPIRATIONDAYS': '2'
          };
        } else if (host.indexOf('staging') > -1) { //Staging
          return {
            'URL': 'https://apistaging.sponzor.me/',
            'XOOMRATE': parseFloat(4.99),
            'FEE': parseFloat(0.1),
            'PAYPALCOMPLETERETURNURL': 'http://www.sponzor.me/thank-you/',
            'PAYPALIPNRETURNURL': 'https://apistaging.sponzor.me/ipn',
            'PAYPALEMAIL': 'ing.carlosandresrojas@gmail.com',
            'FURL': 'https://sponzorme.firebaseio.com/staging/',
            'AMAZONSECRET': 'RlzqEBFUlJW/8YGkeasfmTZRLTlWMWwaBpJNBxu6',
            'AMAZONKEY': 'AKIAJDGUKWK3H7SJZKSQ',
            'AMAZONBUCKET': 'sponzormewebappimages',
            'EVENTBRITECLIENTSECRET': 'REYYYTW7MW4ABJUI275V3JESPWRR55E5OLKTVC63VNXWFL4WLB',
            'EVENTBRITEAPYKEY': '6WILTRRV7HVLBSRSGP',
            'MEETUPAPIKEY': 'scqnorvk4o3utc3k19qfj45vng',
            'MEETUPREDIRECTURL': 'https://apistaging.sponzor.me/accept/meetup',
            'AMAZONBUCKETREGION': 'us-west-2',
            'AMAZONBUCKETURL': 'https://s3-us-west-2.amazonaws.com/sponzormewebappimages/',
            'EVENTEXPIRATIONDAYS': '2'
          };
        } else if (host.indexOf('app') > -1) { //Production
          return {
            'URL': 'https://api.sponzor.me/',
            'XOOMRATE': parseFloat(4.99),
            'FEE': parseFloat(0.1),
            'PAYPALCOMPLETERETURNURL': 'http://www.sponzor.me/thank-you/',
            'PAYPALIPNRETURNURL': 'https://api.sponzor.me/ipn',
            'PAYPALEMAIL': 'ing.carlosandresrojas@gmail.com',
            'FURL': 'https://sponzorme.firebaseio.com/production/',
            'AMAZONSECRET': 'RlzqEBFUlJW/8YGkeasfmTZRLTlWMWwaBpJNBxu6',
            'AMAZONKEY': 'AKIAJDGUKWK3H7SJZKSQ',
            'AMAZONBUCKET': 'sponzormewebappimages',
            'EVENTBRITECLIENTSECRET': 'V72EKSC2YWR5Y4XKVKCUL4W45ZAAVXJSEG3KOBAFIVKR6ESIX5',
            'EVENTBRITEAPYKEY': 'MI3YNPLR3R73AD36YS',
            'MEETUPAPIKEY': 'lc876qakj5itnsnebm3dijus12',
            'MEETUPREDIRECTURL': 'https://api.sponzor.me/accept/meetup',
            'AMAZONBUCKETREGION': 'us-west-2',
            'AMAZONBUCKETURL': 'https://s3-us-west-2.amazonaws.com/sponzormewebappimages/',
            'EVENTEXPIRATIONDAYS': '2'
          };
        }
      };
      $rootScope.isExpiredData = function() {
        if ($localStorage.startDate) {
          var dataTime = new Date($localStorage.startDate);
          var timer = parseInt(expirationTime * 24 * 60 * 60 * 1000);
          var dataExpDate = new Date(dataTime.getTime() + timer);
          if (Date.now() > dataExpDate.getTime()) {
            $localStorage.$reset();
            return true;
          } else {
            return false;
          }
        } else {
          return true;
        }
      };
      $rootScope.getExtension = function(filename) {
        return (/[.]/.exec(filename)) ? /[^.]+$/.exec(filename) : undefined;
      };
      $rootScope.uniqueString = function() {
        var text = '';
        var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (var i = 0; i < 8; i++) {
          text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
      };

      $rootScope.userValidation = function(shouldType) {

        var host = window.location.href;
        $rootScope.isExpiredData();
        if ($localStorage.cookiesponzorme && $localStorage.email && $localStorage.id > 0 && $localStorage.token && $localStorage.typesponzorme === shouldType) {
          if ($localStorage.demo === '0' && $localStorage.typesponzorme === '1') {
            angular.element(document).ready(function() {
              setTimeout(function() {
                $rootScope.showDemoSponzors();
                $rootScope.updateUserDemo($localStorage.id); //After the presentation, we update the user Demo
                $localStorage.demo = 1;
              }, 3000);
            });
          } else if ($localStorage.demo === '0' && $localStorage.typesponzorme === '0') {
            angular.element(document).ready(function() {
              setTimeout(function() {
                $rootScope.showDemoOrganizers();
                $rootScope.updateUserDemo($localStorage.id); //After the presentation, we update the user Demo
                $localStorage.demo = 1;
              }, 3000);
            });
          }
          $rootScope.$storage = $localStorage;
          return true;
        } else {
          $localStorage.redirectTo = host;
          $location.path('/login');
          return false;
        }
      };
      $rootScope.updateUserDemo = function(userId) {
        var user = {
          'demo': '1'
        };
        userRequest.editUserPatch(userId, user).success(function() {});
      };
      $rootScope.showDemoSponzors = function() {
        var intro = introJs();
        if (idiomaselect === 'pt') {
          intro.setOptions({
            steps: [{
              element: '#step1',
              intro: 'Bem-vindo ao SponzorMe</br>Esperamos que você goste de usar esta plataforma, tanto quanto nós construí-lo.</br>Quaisquer comentários, preocupações, problemas, sugestões. Estou disponível para ouvir em carlos@sponzor.me',
              position: 'left'
            }, {
              element: '#step2',
              intro: 'Vamos começar a explorar um pouco o seu painel.</br>A primeira é que você vai ver nesta área é um motor de busca. Basta digitar as palavras mágicas dos eventos que você deseja e deixe-nos encontrar os eventos que você pode estar interessado ...',
              position: 'bottom'
            }, {
              element: '#step3',
              intro: 'Agora vamos olhar para alguns dos nosso menu.</br>Aqui você pode encontrar o seguinte.</br>Dashboard -> Para retornar à sua pesquisa.</br>Siguiendo -> Esses eventos que você deseja patrocinar, mas ainda assim o organizador não aceita.</br>Patrocinando -> Estes eventos estão patrocinando, como são os acordos com seus patrocinadores, e você pode criar algumas tarefas que você não se lembra, no último minuto que você tinha que enviar para fazer essas camisas.</br>Convide seus amigos -> Espalhar o amor. Diga a pessoa que você sabe que você precisa de algo como isso e você vai gostar.</br>Configuração -> Aqui você pode atualizar suas informações e conectar suas contas externas.</br>Sair -> Aqui você pode deixar a nossa plataforma de segurança.',
              position: 'right'
            }, {
              element: '#step4',
              intro: 'Agora vamos olhar para algumas dessas opções com um pouco menos relevante, mas você gostou quando você precisar deles.</br>Blog ->   Leia algumas das coisas que a nossa equipa escreve.</br>About -> Leia um pouco sobre a equipe.</br>Soporte -> Algum problema? Escreva para o nosso time de especialistas para resolver este problema o mais rapidamente possível.',
              position: 'right'
            }]
          });
        } else if (idiomaselect === 'en') {
          intro.setOptions({
            steps: [{
              element: '#step1',
              intro: 'Welcome to SponzorMe.</br>We hope you enjoy using this platform as much as we did when putting it together.</br>Any questions as meaningless as they can seem, please send them to carlos@sponzor.me',
              position: 'left'
            }, {
              element: '#step2',
              intro: 'Let’s start by exploring your dashboard .</br>The first thing you will see in this area is a search box. Simply type the magic words that describe the event that you are looking for and let us find the events that might interest you...',
              position: 'bottom'
            }, {
              element: '#step3',
              intro: 'Let’s look at our menu.</br>You will be able to find the following:</br>Dashboard -> To come back to the search box.</br>Following -> The events you want to sponsor which hasn’t been accepted by the organizer yet.</br>PSponsored -> The events you are currently sponsoring, the agreements you have with the organizers, and activities that you might forget in the last minute such as sending those T-shirts...</br>Invite your friends -> Spread the love. Send it to someone that might need something like this and that will enjoy it..</br>Settings -> You will be able to update your information and connect your external accounts.</br>Disconnect -> You can log out of our platform in a safe way. We know this will be temporal because we love you. <B',
              position: 'right'
            }, {
              element: '#step4',
              intro: 'Now let’s take a look at those options that are less relevant but that you will like when you need them.</br>Blog ->   Read a bit about what our team writes.</br>About -> Read a bit about our team.</br>Support -> Do you have a problem? Write to our team of experts so that they can solve your problem.',
              position: 'right'
            }]
          });
        } else if (idiomaselect === 'es') {
          intro.setOptions({
            steps: [{
              element: '#step1',
              intro: 'Bienvenido a SponzorMe.</br>Esperamos que disfrutes en usar esta plataforma, tanto como nosotros en construirla.</br>Cualquier duda no importa lo insignificante que parezca déjamela saber a carlos@sponzor.me',
              position: 'left'
            }, {
              element: '#step2',
              intro: 'Empecemos, explorando un poco tu .</br>Lo primero es que vas a ver en esta zona es un buscador. Simplemente ingresa las palabras mágicas de los eventos que buscas y déjanos encontrar los eventos que pueden interesarte...',
              position: 'bottom'
            }, {
              element: '#step3',
              intro: 'Ahora miremos un poco de nuestro menu.</br>Aca podras encontrar lo siguiente.</br>Dashboard -> Para volver a tu buscador.</br>Siguiendo -> Esos eventos que quieres patrocinar, pero que aun el organizador no acepta.</br>Patrocinando -> Esos eventos que estas patrocinando, Como se encuentran los acuerdos con tus patrocinadores, y puedes crear algunas tareas para que no te acuerdes a ultima hora que tenias que enviar a hacer esas camisetas...</br>Invita a tus amigos -> Esparce el amor. Envíaselo a esa persona que sabes necesita algo como esto y lo va a disfrutar.</br>Configuración -> Acá podrás actualizar tu información y conectar tus cuentas externas.</br>Desconectar -> Aca podras salir de nuestra plataforma de una manera segura. Sabemos que es temporal por que te queremos <B',
              position: 'right'
            }, {
              element: '#step4',
              intro: 'Ahora miremos un poco de esas opciones con un poco menos de relevancia pero que te gustaran cuando las necesites.</br>Blog ->   Lee un poco de lo que escribe nuestro equipo.</br>About -> Lee un poco sobre el equipo.</br>Soporte -> Algun problema? escribele a nuestro equipo de expertos para que resuelvan lo antes posible ese inconveniente.',
              position: 'right'
            }]
          });
        }
        intro.start();
      };
      $rootScope.showDemoOrganizers = function() {
        var intro = introJs();
        if (idiomaselect === 'pt') {
          intro.setOptions({
            steps: [{
              element: '#step1',
              intro: 'Bem-vindo ao SponzorMe</br>Esperamos que você goste de usar esta plataforma, tanto quanto nós construí-lo.</br>Quaisquer comentários, preocupações, problemas, sugestões. Estou disponível para ouvir em carlos@sponzor.me',
              position: 'left'
            }, {
              element: '#step2',
              intro: 'Vamos começar a explorar um pouco o seu painel.</br>A primeira é que você vai ver nesta área um resumo de tudo o que está acontecendo. Você vai ver um resumo geral, visão geral de seus eventos, visão geral de seus patrocínios e algumas sugestões que nossa equipe de especialistas preparou para você....',
              position: 'bottom'
            }, {
              element: '#step3',
              intro: 'Agora vamos olhar para alguns dos nosso menu.</br>Aqui você pode encontrar o seguinte.</br>Dashboard -> Para retornar à visão geral de todas as atividades.</br>Eventos -> Para criar, editar e gerenciar seus eventos.</br>Sponzors -> Para criar, editar e gerenciar seus patrocinadores.</br>Task List -> Para gerenciar seus contratos com seus patrocinadores e manter relações boas e saudáveis.</br>Convide seus amigos -> Espalhar o amor. Diga a pessoa que você sabe que você precisa de algo como isso e você vai gostar.</br>Configuração -> Aqui você pode atualizar suas informações e conectar suas contas externas.</br>Sair -> Aqui você pode deixar a nossa plataforma de segurança.',
              position: 'right'
            }, {
              element: '#step4',
              intro: 'Agora vamos olhar para algumas dessas opções com um pouco menos relevante, mas você gostou quando você precisar deles.</br>Blog ->   Leia algumas das coisas que a nossa equipa escreve.</br>About -> Leia um pouco sobre a equipe.</br>Soporte -> Algum problema? Escreva para o nosso time de especialistas para resolver este problema o mais rapidamente possível.',
              position: 'right'
            }]
          });
        } else if (idiomaselect === 'en') {
          intro.setOptions({
            steps: [{
              element: '#step1',
              intro: 'Welcome to SponzorMe.</br>We hope you enjoy using this platform as much as we did when putting it together.</br>Any questions as meaningless as they can seem, please send them to carlos@sponzor.me',
              position: 'left'
            }, {
              element: '#step2',
              intro: 'Let’s start by exploring your dashboard.</br>The first thing you will see in this area is a summary of everything that is happening. You will be able to see a global summary, an event summary, a sponsor summary and a few suggestions that our team of experts has prepared for you.',
              position: 'bottom'
            }, {
              element: '#step3',
              intro: 'Let’s look at our menu.</br>You will be able to find the following:</br>Dashboard -> Shows a summary of all your activities.</br>Events -> Allows you to create, edit, and manage your events.</br>Sponzors -> Allows you to create, edit, and manage your sponsors.</br>Task List -> You can manage your agreements with your sponsors and allows you to keep a good relationship with them.</br>Invite your friends -> Spread the love. Send it to someone that might need something like this and that will enjoy it. </br>Settings -> You will be able to update your information and connect your external accounts.</br>Disconnect -> You can log out of our platform in a safe way. We know this will be temporal because we love you. <B',
              position: 'right'
            }, {
              element: '#step4',
              intro: 'Now let’s take a look at those options that are less relevant but that you will like when you need them.</br>Blog ->   Read a bit about what our team writes.</br>About -> Read a bit about our team.</br>Support -> Do you have a problem? Write to our team of experts so that they can solve your problem.',
              position: 'right'
            }]
          });
        } else if (idiomaselect === 'es') {
          intro.setOptions({
            steps: [{
              element: '#step1',
              intro: 'Bienvenido a SponzorMe.</br>Esperamos que disfrutes en usar esta plataforma, tanto como nosotros en construirla.</br>Cualquier duda no importa lo insignificante que parezca déjamela saber a carlos@sponzor.me',
              position: 'left'
            }, {
              element: '#step2',
              intro: 'Empecemos, explorando un poco tu dashboard.</br>Lo primero es que vas a ver en esta zona un resumen de todo lo que esta sucediendo.</br>Podrás ver un resumen global, Resumen de tus Eventos, Resumen de tus Patrocinios y Algunas sugerencias que nuestro equipo de expertos ha preparado para ti.',
              position: 'bottom'
            }, {
              element: '#step3',
              intro: 'Ahora miremos un poco de nuestro menu.</br>Aca podras encontrar lo siguiente. </br>Dashboard -> Para volver al resumen de todas las actividades.</br>Eventos -> Para poder crear, editar y gestionar tus eventos.</br>Sponzors -> Para poder crear, editar y gestionar tus patrocinadores.</br>Task List -> Para poder manejar tus acuerdos con tus patrocinadores y mantener buenas y sanas relaciones con ellos.</br>Invita a tus amigos -> Esparce el amor. Envíaselo a esa persona que sabes necesita algo como esto y lo va a disfrutar.</br>Configuración -> Acá podrás actualizar tu información y conectar tus cuentas externas.</br>Desconectar -> Aca podras salir de nuestra plataforma de una manera segura. Sabemos que es temporal por que te queremos <B',
              position: 'right'
            }, {
              element: '#step4',
              intro: 'Ahora miremos un poco de esas opciones con un poco menos de relevancia pero que te gustaran cuando las necesites.</br>Blog ->   Lee un poco de lo que escribe nuestro equipo.</br>About -> Lee un poco sobre el equipo.</br>Soporte -> Algun problema? escribele a nuestro equipo de expertos para que resuelvan lo antes posible ese inconveniente.',
              position: 'right'
            }]
          });
        }
        intro.start();
      };
    }])
    /*
     * Author: Sebastian Gomez
     * This filters replace & by AND it is used for categories and interests translations
     */
    .filter('normalize', function() {
      return function(input) {
        if (!input) {
          return '';
        }
        input = input
          .replace('&', 'AND')
          .replace(/\W+/g, '');
        return input;
      };
    }).directive('file', function() {
      return {
        restrict: 'AE',
        scope: {
          file: '@'
        },
        link: function(scope, el, attrs) {
          el.bind('change', function(event) {
            var files = event.target.files;
            var file = files[0];
            scope.file = file;
            scope.$parent.file = file;
            scope.$apply();
          });
        }
      };
    })
    .directive('logo', function() {
      return {
        restrict: 'AE',
        scope: {
          file: '@'
        },
        link: function(scope, el, attrs) {
          el.bind('change', function(event) {
            var files = event.target.files;
            var logo = files[0];
            scope.logo = logo;
            scope.$parent.logo = logo;
            scope.$apply();
          });
        }
      };
    });
})();

'use strict';
(function() {
  function rdLoading() {
    var directive = {
      restrict: 'AE',
      template: '<div class="loading"><div class="double-bounce1"></div><div class="double-bounce2"></div></div>'
    };
    return directive;
  }
  angular.module('sponzorme')
    .directive('rdLoading', rdLoading);
})();

/**
* @Servicio de Categories
*
* @author Sebastian
* @version 0.1
*/
'use strict';
(function(){

	function categoryRequest($http, $localStorage, $httpParamSerializerJQLike, $rootScope) {
		var token = $localStorage.token;
		return {
			/**
			* Get all categories
			* @returns success(function(data, status, headers, config)
			*/
			allCategories: function(){
				return $http.get($rootScope.getConstants().URL + 'categories');

			},
			/**
			* Get Category By Id
			* @param {JSON} categoryId
			* @returns success(function(data, status, headers, config)
			*/
			oneCategory: function(categoryId){
				return $http.get($rootScope.getConstants().URL + 'categories/' + categoryId);

			},
			createCategory: function(data){
				return $http({
					method: 'POST',
					url: $rootScope.getConstants().URL + 'categories',
					headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic ' + token},
					data: $httpParamSerializerJQLike(data)
				});
			},
			deleteCategory: function(categoryId){
				return $http({
					method: 'DELETE',
					url: $rootScope.getConstants().URL + 'categories/' + categoryId,
					headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic ' + token}
				});
			},
			editCategoryPatch: function(categoryId, data){
				return $http({
					method: 'PATCH',
					url: $rootScope.getConstants().URL + 'categories/' + categoryId,
					headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic ' + token},
					data: $httpParamSerializerJQLike(data)
				});
			},
			editCategoryPut: function(categoryId, data){
				return $http({
					method: 'PUT',
					url: $rootScope.getConstants().URL + 'categories/' + categoryId,
					headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic ' + token},
					data: $httpParamSerializerJQLike(data)
				});
			}
		};
	}
	angular.module('sponzorme')
		.factory('categoryRequest', categoryRequest);
})();

/**
* @Servicio de Eventos
*
* @author Sebastian
* @version 0.1
*/
'use strict';
(function(){

	function eventRequest($http, $localStorage, $httpParamSerializerJQLike, $rootScope) {
		var token = $localStorage.token;
		return {
			allEvents: function(){
				return $http.get($rootScope.getConstants().URL + 'events');

			},
			oneEvent: function(EventId){
				return $http.get($rootScope.getConstants().URL + 'events/' + EventId);

			},
			createEvent: function(data){
				return $http({
					method: 'POST',
					url: $rootScope.getConstants().URL + 'events',
					headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic ' + token},
					data: $httpParamSerializerJQLike(data)
				});
			},
			createEventToken: function(data, newUserToken){
				return $http({
					method: 'POST',
					url: $rootScope.getConstants().URL + 'events',
					headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic ' + newUserToken},
					data: $httpParamSerializerJQLike(data)
				});
			},
			deleteEvent: function(EventId){
				return $http({
					method: 'DELETE',
					url: $rootScope.getConstants().URL + 'events/' + EventId,
					headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic ' + token}
				});
			},
			editEventPatch: function(EventId, data){
				return $http({
					method: 'PATCH',
					url: $rootScope.getConstants().URL + 'events/' + EventId,
					headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic ' + token},
					data: $httpParamSerializerJQLike(data)
				});
			},
			editEventPut: function(EventId, data){
				return $http({
					method: 'PUT',
					url: $rootScope.getConstants().URL + 'events/' + EventId,
					headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic ' + token},
					data: $httpParamSerializerJQLike(data)
				});
			}
		};
	}
	angular.module('sponzorme')
		.factory('eventRequest', eventRequest);
})();

/**
* @Servicio de event_types
*
* @author Sebastian
* @version 0.1
*/
'use strict';
(function(){

	function eventTypeService($http, $localStorage, $httpParamSerializerJQLike, $rootScope) {
		var token = $localStorage.token;
		return {
			allEventTypes: function(){
				return $http.get($rootScope.getConstants().URL + 'event_types');

			},
			oneEventTypes: function(eventTypeId){
				return $http.get($rootScope.getConstants().URL + 'event_types/' + eventTypeId);

			},
			createEventType: function(data){
				return $http({
					method: 'POST',
					url: $rootScope.getConstants().URL + 'event_types',
					headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic ' + token},
					data: $httpParamSerializerJQLike(data)
				});
			},
			deleteEventType: function(eventTypeId){
				return $http({
					method: 'DELETE',
					url: $rootScope.getConstants().URL + 'event_types/' + eventTypeId,
					headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic ' + token}
				});
			},
			editEventTypePatch: function(eventTypeId, data){
				return $http({
					method: 'PATCH',
					url: $rootScope.getConstants().URL + 'event_types/' + eventTypeId,
					headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic ' + token},
					data: $httpParamSerializerJQLike(data)
				});
			},
			editEventTypePut: function(eventTypeId, data){
				return $http({
					method: 'PUT',
					url: $rootScope.getConstants().URL + 'event_types/' + eventTypeId,
					headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic ' + token},
					data: $httpParamSerializerJQLike(data)
				});
			}
		};
	}
	angular.module('sponzorme')
		.factory('eventTypeRequest', eventTypeService);
})();

/**
* @Servicio de interests_category
*
* @author Sebastian
* @version 0.1
*/
'use strict';
(function(){

	function allInterestsServiceRequest($http, $localStorage, $httpParamSerializerJQLike, $rootScope) {
		var token = $localStorage.token;
		return {
			allInterestsCategoriesId: function(){
				return $http.get($rootScope.getConstants().URL + 'interests_category');

			},
			oneInterestsCategory: function(interestsCategoryId){
				return $http.get($rootScope.getConstants().URL + 'interests_category/' + interestsCategoryId);

			},
			createInterestsCategory: function(data){
				return $http({
					method: 'POST',
					url: $rootScope.getConstants().URL + 'interests_category',
					headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic ' + token},
					data: $httpParamSerializerJQLike(data)
				});
			},
			deleteInterestsCategory: function(interestsCategoryId){
				return $http({
					method: 'DELETE',
					url: $rootScope.getConstants().URL + 'interests_category/' + interestsCategoryId,
					headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic ' + token}
				});
			},
			editInterestsCategoryPatch: function(interestsCategoryId, data){
				return $http({
					method: 'PATCH',
					url: $rootScope.getConstants().URL + 'interests_category/' + interestsCategoryId,
					headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic ' + token},
					data: $httpParamSerializerJQLike(data)
				});
			},
			editInterestsCategoryPut: function(interestsCategoryId, data){
				return $http({
					method: 'PUT',
					url: $rootScope.getConstants().URL + 'interests_category/' + interestsCategoryId,
					headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic ' + token},
					data: $httpParamSerializerJQLike(data)
				});
			}
		};
	}
	angular.module('sponzorme')
		.factory('allInterestsServiceRequest', allInterestsServiceRequest);
})();

'use strict';
(function() {
  /**
   * Login Service factory
   * @autor  Sebastian Gomez
   * @email  seagomezar@gmail.com
   * @date   2015-11-16
   */
  function loginRequest($http, $httpParamSerializerJQLike, $rootScope) {
    return {
      /**
       * Login function return the user info if the credentials match
       * @param {JSON} credentials.email
       * @param {JSON} credentials.password
       * @returns success(function(data, status, headers, config)
       */
      login: function(credentials) {
        var data = {
          'email': credentials.email,
          'password': credentials.password
        };
        return $http({
          method: 'POST',
          url: $rootScope.getConstants().URL + 'auth',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          data: $httpParamSerializerJQLike(data)
        });
      },
      resetPassword: function(email) {
        var data = {
          'email': email
        };
        return $http({
          method: 'POST',
          url: $rootScope.getConstants().URL + 'send_reset_password',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          data: $httpParamSerializerJQLike(data)
        });
      },
      tryActivation: function(token) {
        return $http.get($rootScope.getConstants().URL + 'verify_activation/' + token);
      },
      resendActivation: function(email) {
        var data = {
          'email': email
        };
        return $http({
          method: 'POST',
          url: $rootScope.getConstants().URL + 'send_activation',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          data: $httpParamSerializerJQLike(data)
        });
      },
      updatePassword: function(token, data) {
        return $http({
          method: 'POST',
          url: $rootScope.getConstants().URL + 'update_password/' + token,
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          data: $httpParamSerializerJQLike(data)
        });
      },
      changePassword: function(data, token) {
        return $http({
          method: 'POST',
          url: $rootScope.getConstants().URL + 'change_password',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic ' + token},
					data: $httpParamSerializerJQLike(data)
        });
      }
    };
  }
  angular.module('sponzorme')
    .factory('loginRequest', loginRequest);
})();

/**
* @Servicio de Perks (Beneficios)
*
* @author Sebastian
* @version 0.1
*/
'use strict';
(function(){

	function perkRequest($http, $localStorage, $httpParamSerializerJQLike, $rootScope) {
		var token = $localStorage.token;
		return {
			allPerks: function(){
				return $http.get($rootScope.getConstants().URL + 'perks');

			},
			onePerk: function(perkId){
				return $http.get($rootScope.getConstants().URL + 'perks/' + perkId);

			},
			createPerk: function(data){
				return $http({
					method: 'POST',
					url: $rootScope.getConstants().URL + 'perks',
					headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic ' + token},
					data: $httpParamSerializerJQLike(data)
				});
			},
			createPerkToken: function(data, newUserToken){
				return $http({
					method: 'POST',
					url: $rootScope.getConstants().URL + 'perks',
					headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic ' + newUserToken},
					data: $httpParamSerializerJQLike(data)
				});
			},
			deletePerk: function(perkId){
				return $http({
					method: 'DELETE',
					url: $rootScope.getConstants().URL + 'perks/' + perkId,
					headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic ' + token}
				});
			},
			editPerkPatch: function(perkId, data){
				return $http({
					method: 'PATCH',
					url: $rootScope.getConstants().URL + 'perks/' + perkId,
					headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic ' + token},
					data: $httpParamSerializerJQLike(data)
				});
			},
			editPerkPut: function(perkId, data){
				return $http({
					method: 'PUT',
					url: $rootScope.getConstants().URL + 'perks/' + perkId,
					headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic ' + token},
					data: $httpParamSerializerJQLike(data)
				});
			}
		};
	}
	angular.module('sponzorme')
		.factory('perkRequest', perkRequest);
})();

/**
* @Servicio de Perks (Beneficios)
*
* @author Sebastian
* @version 0.1
*/
'use strict';
(function(){

	function perkTaskRequest($http, $localStorage, $httpParamSerializerJQLike, $rootScope) {
		var token = $localStorage.token;
		return {
			allPerkTasks: function(){
				return $http.get($rootScope.getConstants().URL + 'perk_tasks');

			},
			onePerkTask: function(perkTaskId){
				return $http.get($rootScope.getConstants().URL + 'perk_tasks/' + perkTaskId);

			},
			createPerkTask: function(data){
				return $http({
					method: 'POST',
					url: $rootScope.getConstants().URL + 'perk_tasks',
					headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic ' + token},
					data: $httpParamSerializerJQLike(data)
				});
			},
			deletePerkTask: function(perkTaskId){
				return $http({
					method: 'DELETE',
					url: $rootScope.getConstants().URL + 'perk_tasks/' + perkTaskId,
					headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic ' + token}
				});
			},
			editPerkTaskPatch: function(perkTaskId, data){
				return $http({
					method: 'PATCH',
					url: $rootScope.getConstants().URL + 'perk_tasks/' + perkTaskId,
					headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic ' + token},
					data: $httpParamSerializerJQLike(data)
				});
			},
			editPerkTaskPut: function(perkTaskId, data){
				return $http({
					method: 'PUT',
					url: $rootScope.getConstants().URL + 'perk_tasks/' + perkTaskId,
					headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic ' + token},
					data: $httpParamSerializerJQLike(data)
				});
			}
		};
	}
	angular.module('sponzorme')
		.factory('perkTaskRequest', perkTaskRequest);
})();

/**
 * @Servicio de Sponzorships (Beneficios)
 *
 * @author Sebastian
 * @version 0.1
 */
'use strict';
(function() {

  function sponzorshipRequest($http, $localStorage, $httpParamSerializerJQLike, $rootScope) {

    var token = $localStorage.token;
    return {
      allSponzorships: function() {
        return $http.get($rootScope.getConstants().URL + 'sponzorships');

      },
      oneSponzorship: function(sponzorshipId) {
        return $http.get($rootScope.getConstants().URL + 'sponzorships/' + sponzorshipId);

      },
      oneSponzorshipByOrganizer: function(organizerId) {
        return $http.get($rootScope.getConstants().URL + 'sponzorships_organizer/' + organizerId);
      },
      oneSponzorshipBySponzor: function(sponzorId) {
        return $http.get($rootScope.getConstants().URL + 'sponzorships_sponzor/' + sponzorId);
      },
      sendSponzorshipEmail: function(data) {
        return $http({
          method: 'POST',
          url: $rootScope.getConstants().URL + 'sponzorship_email',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + token
          },
          data: $httpParamSerializerJQLike(data)
        });
      },
      sendSponzorshipEmailOrganizer: function(data) {
        return $http({
          method: 'POST',
          url: $rootScope.getConstants().URL + 'sponzorship_email_organizer',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + token
          },
          data: $httpParamSerializerJQLike(data)
        });
      },
      createSponzorship: function(data) {
        return $http({
          method: 'POST',
          url: $rootScope.getConstants().URL + 'sponzorships',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + token
          },
          data: $httpParamSerializerJQLike(data)
        });
      },
      createSponzorshipToken: function(data, userToken) {
        return $http({
          method: 'POST',
          url: $rootScope.getConstants().URL + 'sponzorships',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + userToken
          },
          data: $httpParamSerializerJQLike(data)
        });
      },
      deleteSponzorship: function(sponzorshipId) {
        return $http({
          method: 'DELETE',
          url: $rootScope.getConstants().URL + 'sponzorships/' + sponzorshipId,
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + token
          }
        });
      },
      editSponzorshipPatch: function(sponzorshipId, data) {
        return $http({
          method: 'PATCH',
          url: $rootScope.getConstants().URL + 'sponzorships/' + sponzorshipId,
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + token
          },
          data: $httpParamSerializerJQLike(data)
        });
      },
      editSponzorshipPut: function(sponzorshipId, data) {
        return $http({
          method: 'PUT',
          url: $rootScope.getConstants().URL + 'sponzorships/' + sponzorshipId,
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + token
          },
          data: $httpParamSerializerJQLike(data)
        });
      }
    };
  }
  angular.module('sponzorme')
    .factory('sponzorshipRequest', sponzorshipRequest);
})();

/**
* @Servicio de TaskSponzor (Tareas de los patrocinadores)
*
* @author Sebastian
* @version 0.1
*/
'use strict';
(function(){

	function taskSponzorRequest($http, $localStorage, $httpParamSerializerJQLike, $rootScope) {
		var token = $localStorage.token;
		return {
			allTaskSponzor: function(){
				return $http.get($rootScope.getConstants().URL + 'task_sponzor');

			},
			oneTaskSponzor: function(taskSponzorId){
				return $http.get($rootScope.getConstants().URL + 'task_sponzor/' + taskSponzorId);

			},
			tasksBySponzorship: function(sponzorshipId){
				return $http.get($rootScope.getConstants().URL + 'perk_tasks_sponzorship/' + sponzorshipId);
			},
			createTaskSponzor: function(data){
				return $http({
					method: 'POST',
					url: $rootScope.getConstants().URL + 'task_sponzor',
					headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic ' + token},
					data: $httpParamSerializerJQLike(data)
				});
			},
			createTaskSponzorToken: function(data, userToken){
				return $http({
					method: 'POST',
					url: $rootScope.getConstants().URL + 'task_sponzor',
					headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic ' + userToken},
					data: $httpParamSerializerJQLike(data)
				});
			},
			deleteTaskSponzor: function(taskSponzorId){
				return $http({
					method: 'DELETE',
					url: $rootScope.getConstants().URL + 'task_sponzor/' + taskSponzorId,
					headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic ' + token}
				});
			},
			editTaskSponzorPatch: function(taskSponzorId, data){
				return $http({
					method: 'PATCH',
					url: $rootScope.getConstants().URL + 'task_sponzor/' + taskSponzorId,
					headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic ' + token},
					data: $httpParamSerializerJQLike(data)
				});
			},
			editTaskSponzorPut: function(taskSponzorId, data){
				return $http({
					method: 'PUT',
					url: $rootScope.getConstants().URL + 'task_sponzor/' + taskSponzorId,
					headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic ' + token},
					data: $httpParamSerializerJQLike(data)
				});
			}
		};
	}
	angular.module('sponzorme')
		.factory('taskSponzorRequest', taskSponzorRequest);
})();

/**
* @Servicio de UserCategory (Categorias de preferencia de los usuarios)
*
* @author Sebastian
* @version 0.1
*/
'use strict';
(function(){

	function userCategoryRequest($http, $localStorage, $httpParamSerializerJQLike, $rootScope) {
		var token = $localStorage.token;
		return {
			allUserCategories: function(){
				return $http.get($rootScope.getConstants().URL + 'user_categories');
			},
			oneUserCategory: function(userCategoryId){
				return $http.get($rootScope.getConstants().URL + 'user_categories/' + userCategoryId);
			},
			createUserCategory: function(data){
				return $http({
					method: 'POST',
					url: $rootScope.getConstants().URL + 'user_categories',
					headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic ' + token},
					data: $httpParamSerializerJQLike(data)
				});
			},
			deleteUserCategory: function(userCategoryId){
				return $http({
					method: 'DELETE',
					url: $rootScope.getConstants().URL + 'user_categories/' + userCategoryId,
					headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic ' + token}
				});
			},
			editUserCategoryPatch: function(userCategoryId, data){
				return $http({
					method: 'PATCH',
					url: $rootScope.getConstants().URL + 'user_categories/' + userCategoryId,
					headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic ' + token},
					data: $httpParamSerializerJQLike(data)
				});
			},
			editUserCategoryPut: function(userCategoryId, data){
				return $http({
					method: 'PUT',
					url: $rootScope.getConstants().URL + 'user_categories/' + userCategoryId,
					headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic ' + token},
					data: $httpParamSerializerJQLike(data)
				});
			}
		};
	}
	angular.module('sponzorme')
		.factory('userCategoryRequest', userCategoryRequest);
})();

/**
* @Servicio de TaskSponzor (Tareas de los patrocinadores)
*
* @author Sebastian
* @version 0.1
*/
'use strict';
(function(){

	function userInterestRequest($http, $localStorage, $httpParamSerializerJQLike, $rootScope) {
		var token = $localStorage.token;
		return {
			allUserInterests: function(){
				return $http.get($rootScope.getConstants().URL + 'user_interests');
			},
			oneUserInterest: function(userInterestId){
				return $http.get($rootScope.getConstants().URL + 'user_interests/' + userInterestId);
			},
			createUserInterest: function(data){
				return $http({
					method: 'POST',
					url: $rootScope.getConstants().URL + 'user_interests',
					headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic ' + token},
					data: $httpParamSerializerJQLike(data)
				});
			},
			deleteUserInterest: function(userInterestId){
				return $http({
					method: 'DELETE',
					url: $rootScope.getConstants().URL + 'user_interests/' + userInterestId,
					headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic ' + token}
				});
			},
			editUserInterestPatch: function(userInterestId, data){
				return $http({
					method: 'PATCH',
					url: $rootScope.getConstants().URL + 'user_interests/' + userInterestId,
					headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic ' + token},
					data: $httpParamSerializerJQLike(data)
				});
			},
			editUserInterestPut: function(userInterestId, data){
				return $http({
					method: 'PUT',
					url: $rootScope.getConstants().URL + 'user_interests/' + userInterestId,
					headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic ' + token},
					data: $httpParamSerializerJQLike(data)
				});
			}
		};
	}
	angular.module('sponzorme')
		.factory('userInterestRequest', userInterestRequest);
})();

/**
* @Servicio de Usuarios
*
* @author Sebastian
* @version 0.1
*/
'use strict';
(function(){

	function userRequest($http, $localStorage, $httpParamSerializerJQLike, $rootScope) {

		return {
			allUsers: function(){
				return $http.get($rootScope.getConstants().URL + 'users');
			},
			oneUser: function(userId){
				var token = $localStorage.token;
				$http.defaults.headers.common.Authorization = 'Basic ' + token;
				return $http.get($rootScope.getConstants().URL + 'users/' + userId);

			},
			createUser: function(data){
				var token = 'b3JnYW5pemVyQHNwb256b3IubWU6c3Bvbnpvcm1l';
				return $http({
					method: 'POST',
					url: $rootScope.getConstants().URL + 'users',
					headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic ' + token},
					data: $httpParamSerializerJQLike(data)
				});
			},
			deleteUser: function(userId){
				var token = $localStorage.token;
				return $http({
					method: 'DELETE',
					url: $rootScope.getConstants().URL + 'users/' + userId,
					headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic ' + token}
				});
			},
			editUserPatch: function(userId, data){
				var token = $localStorage.token;
				return $http({
					method: 'PATCH',
					url: $rootScope.getConstants().URL + 'users/' + userId,
					headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic ' + token},
					data: $httpParamSerializerJQLike(data)
				});
			},
			editUserPut: function(userId, data){
				var token = $localStorage.token;
				return $http({
					method: 'PUT',
					url: $rootScope.getConstants().URL + 'users/' + userId,
					headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic ' + token},
					data: $httpParamSerializerJQLike(data)
				});
			},
			invitedUser: function(data){
				var token = $localStorage.token;
				return $http({
					method: 'POST',
					url: $rootScope.getConstants().URL + 'invite_friend/',
					headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic ' + token},
					data: $httpParamSerializerJQLike(data)
				});
			}
		};
	}

	angular.module('sponzorme')
		.factory('userRequest', userRequest);

})();

/**
* @Servicio de retorn de rss de los diferentes blogs
*
* @author Sebastian
* @version 0.1
*/
'use strict';
(function(){

	function rssRequest($http) {
    return {
			rss: function(lang){
				var path = '//ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=10&callback=JSON_CALLBACK&q=' + 'http://blog' + lang + '.sponzor.me/feeds/posts/default';
				return $http.jsonp(path);
			}
    };
	}
	angular.module('sponzorme')
		.factory('rssRequest', rssRequest);
})();

/**
 * @Servicio de Rating (Beneficios)
 * @author Sebastian
 * @version 0.1
 */
'use strict';
(function() {

  function ratingRequest($http, $localStorage, $httpParamSerializerJQLike, $rootScope) {
    var token = $localStorage.token;
    return {
      allRatings: function() {
        return $http.get($rootScope.getConstants().URL + 'ratings');

      },
      oneRating: function(ratingsId) {
        return $http.get($rootScope.getConstants().URL + 'ratings/' + ratingsId);
      },
      ratingBySponzorship: function(sponzorshipId, type) {
        return $http.get($rootScope.getConstants().URL + 'ratings/sponzorship/' + sponzorshipId + '/' + type);
      },
      ratingsBySponzor: function(sponzorId) {
        return $http.get($rootScope.getConstants().URL + 'ratings/sponzor/' + sponzorId);
      },
      ratingsByOrganizer: function(organizerId) {
        return $http.get($rootScope.getConstants().URL + 'ratings/organizer/' + organizerId);
      },
      createRating: function(data) {
        return $http({
          method: 'POST',
          url: $rootScope.getConstants().URL + 'ratings',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + token
          },
          data: $httpParamSerializerJQLike(data)
        });
      },
      createRatingToken: function(data, newUserToken) {
        return $http({
          method: 'POST',
          url: $rootScope.getConstants().URL + 'ratings',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + newUserToken
          },
          data: $httpParamSerializerJQLike(data)
        });
      },
      deleteRating: function(ratingId) {
        return $http({
          method: 'DELETE',
          url: $rootScope.getConstants().URL + 'ratings/' + ratingsId,
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + token
          }
        });
      },
      editRatingsPatch: function(ratingId, data) {
        return $http({
          method: 'PATCH',
          url: $rootScope.getConstants().URL + 'ratings/' + ratingsId,
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + token
          },
          data: $httpParamSerializerJQLike(data)
        });
      },
      editRatingPut: function(ratingId, data) {
        return $http({
          method: 'PUT',
          url: $rootScope.getConstants().URL + 'ratings/' + ratingsId,
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + token
          },
          data: $httpParamSerializerJQLike(data)
        });
      }
    };
  }
  angular.module('sponzorme')
    .factory('ratingRequest', ratingRequest);
})();

/**
 * @Servicio de Eventos
 *
 * @author Sebastian
 * @version 0.1
 */
'use strict';
(function() {

  function eventbriteRequest($http, $localStorage, $httpParamSerializerJQLike, $rootScope) {
    return {
      getEventbriteAuth: function(code) {
        return $http.get($rootScope.getConstants().URL + 'token/eventbrite/' + code);
      },
      getMeetupAuth: function(code) {
        return $http.get($rootScope.getConstants().URL + 'token/meetup/' + code);
      },
      getEventbriteEvents: function(token) {
        var config = {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Bearer ' + token
          }
        };
        return $http.get('https://www.eventbriteapi.com/v3/users/me/owned_events/?token=' + token, config);
      },
      getMeetupGroups: function(token) {
        return $http.get($rootScope.getConstants().URL + 'events/meetup/' + token);
      },
      getEventbriteEvent: function(url, token) {
        var config = { headers: {'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': 'Bearer ' + token}
        };
        return $http.get(url + '?token=' + token, config);
      }
    };
  }
  angular.module('sponzorme')
    .factory('eventbriteRequest', eventbriteRequest);
})();

/**
 * @Servicio de retorn de rss de los diferentes blogs
 *
 * @author Sebastian
 * @version 0.1
 */
'use strict';
(function() {
  function Util(ngDialog, $rootScope) {
    var Utils = {
      showDialog: function(kind, message, redirectOnClose) {
        $rootScope.pseudoScope = {'message': message, 'redirectOnClose': redirectOnClose};
        var selectedTemplate;
        if(kind === 'error'){
          selectedTemplate = 'views/templates/errorDialog.html';
        }
        else if(kind === 'success'){
          selectedTemplate = 'views/templates/successDialog.html';
        }
        else{
          selectedTemplate = 'views/templates/infoDialog.html';
        }
        if(redirectOnClose){
          $rootScope.pseudoScope.message = message;
          $rootScope.pseudoScope.redirectOnClose = redirectOnClose;
          ngDialog.open({
            template: selectedTemplate,
            showClose: false,
            closeByEscape: false,
            closeByDocument: false,
            controller: 'DialogController',
            scope: $rootScope
          });
        }
        else{
          $rootScope.pseudoScope.message = message;
          ngDialog.open({
            template: selectedTemplate,
            showClose: false,
            closeByEscape: false,
            closeByDocument: false,
            controller: 'DialogController',
            scope: $rootScope
          });
        }
      },
      showLoading: function(){
        ngDialog.open({
          template: 'views/templates/loadingDialog.html',
          showClose: false,
          closeByEscape: false,
          closeByDocument: false
        });
      }
    };
    return Utils;
  }
  angular.module('sponzorme')
    .factory('Util', Util);
})();

'use strict';
(function() {

  function HomeController($scope, $translate, $localStorage, $location) {
     if ($localStorage.typesponzorme === '1') {
        $location.path('/sponzors/dashboard');
      } else if($localStorage.typesponzorme === '0') {
        $location.path('/organizers/dashboard');
      }
      else{
        window.location.href = 'http://www.sponzor.me';
      }
  }
  angular.module('sponzorme')
    .controller('HomeController', HomeController);
})();

'use strict';
(function() {
  function ActivationController($scope, $routeParams, $translate, loginRequest) {
    $scope.errorActivation = false;
    $scope.successActivation = false;
    loginRequest.tryActivation($routeParams.token).success(function(data) {
      if (data.code === '200') {
        $scope.successActivation = true;
      }
    }).error(function() {
      $scope.errorActivation = true;
    });
  }

  angular.module('sponzorme')
    .controller('ActivationController', ActivationController);

})();

'use strict';
(function() {
  function EventPageController($scope, $routeParams, $translate, $localStorage, $location, eventRequest, ngDialog, sponzorshipRequest, perkRequest, taskSponzorRequest, $rootScope, $firebaseArray) {
    $scope.eventLoaded = false;
    $scope.event = {};
    eventRequest.oneEvent($routeParams.eventId).success(function(data) {
      $scope.eventLoaded = true;
      $scope.evento = data.data;
      $scope.currentEvent = data.data.event.id;
      $scope.currentOrganizer = data.data.organizer[0];
      $scope.eventURL = $location.absUrl();
    }).error(function() {
      $scope.eventLoaded = true;
    });
    if ($localStorage.typesponzorme === '1' && !$rootScope.isExpiredData()) { //He is an sponzor
      $scope.isSponzor = true;
      $scope.isNoLogged = false;
    } else if ($localStorage.typesponzorme === '0' && !$rootScope.isExpiredData()) { //He is an organizer
      $scope.isSponzor = false;
      $scope.isNoLogged = false;
    } else { //He is a guest
      $scope.isSponzor = false;
      $scope.isNoLogged = true;
    }
    //We display the form to get the sponzorship cause
    $scope.formCreateSponzorship = function(perk) {
      $scope.perkToSponzor = perk;
      ngDialog.open({
        template: 'views/templates/formCreateSponzorship.html',
        scope: $scope
      });
    };
    $scope.sendFirebaseNotification = function(){
      //here start firebase notification
      var notificationsRef = new Firebase($rootScope.getConstants().FURL + 'notifications');
      var notifications = $firebaseArray(notificationsRef);
      var notification = {
        to: $scope.currentOrganizer.id,
        text: 'Hurray!!! Someone wants to sponsor your event ' + $scope.evento.event.title + ' =)',
        link: '#/organizers/sponzorships'
      };
      notifications.$add(notification);
      //here finish firebase notification
    };
    $scope.createSponzorship = function() {
      /**
        this function have two steps, first, create the sponzorhip
        second create the sponzor tasks
      */
      var data = {
        status: 0,
        'sponzor_id': $localStorage.id,
        'perk_id': $scope.perkToSponzor.id,
        'event_id': $scope.perkToSponzor.id_event,
        'cause': $scope.perkToSponzor.cause,
        'organizer_id': $scope.currentOrganizer.id
      };
      $rootScope.closeAllDialogs();
      $rootScope.showLoading();
      sponzorshipRequest.createSponzorship(data, $localStorage.token).success(function(sData) {
        var cont = 0;
        perkRequest.onePerk($scope.perkToSponzor.id).success(function(sPerkData) {
          angular.forEach(sPerkData.data.Tasks, function(value) {
            var taskSponzor = {
              status: 0,
              'sponzor_id': $localStorage.id,
              'perk_id': $scope.perkToSponzor.id,
              'event_id': $scope.perkToSponzor.id_event,
              'organizer_id': $scope.currentOrganizer.id,
              'sponzorship_id': sData.Sponzorship.id,
              'task_id': value.id
            };
            taskSponzorRequest.createTaskSponzor(taskSponzor, $localStorage.token)
              .success(function() {
                cont++;
              });
            if (cont === sPerkData.data.Tasks.length - 1) {
              $scope.sendFirebaseNotification();
              $rootScope.showDialog('success', 'sponzorshipCreatedSuccesfuly', false);
            }
          });
          if (sPerkData.data.Tasks.length === 0) {
            $scope.sendFirebaseNotification();
            $rootScope.showDialog('success', 'sponzorshipCreatedSuccesfuly', false);
          }
          var info = {
            organizerId: $scope.currentOrganizer.id,
            eventName: $scope.evento.event.title,
            lang: idiomaselect
          };
          sponzorshipRequest.sendSponzorshipEmailOrganizer(info).success(function(){});
        }).error(function() {
          $rootScope.closeAllDialogs();
          $rootScope.showDialog('error', 'eventPageErrorSponzoringEvent', false);
        });
      }).error(function() {
        $rootScope.closeAllDialogs();
        $rootScope.showDialog('error', 'eventPageErrorSponzoringEvent', false);
      });
    };
  }
  angular.module('sponzorme').controller('EventPageController', EventPageController);
})();

'use strict';
(function() {

  function ForgotController($scope, $translate, $routeParams, $sessionStorage, $localStorage, ngDialog, usSpinnerService, userRequest, allInterestsServiceRequest, categoryRequest, userInterestRequest, loginRequest) {

    $scope.error_log = []; //We storage here all translate error during register process
    $scope.forgotPassword = function() {
      $scope.loagind = true;
      loginRequest.resetPassword($scope.email).success(function(adata) {
        $scope.loagind = false;
        $scope.error_log[0] = 'PasswordResetLinkSent';
        ngDialog.open({
          template: 'templateId',
          scope: $scope
        });
      }).error(function() {
        $scope.error_log[0] = 'InvalidEmail';
        $scope.loagind = false;
        ngDialog.open({
          template: 'templateId',
          scope: $scope
        });
      });
    };
    $scope.resetPassword = function() {
      $scope.errorActivation = false;
      $scope.successActivation = false;
      if ($scope.password === $scope.passwordConfirmation) {
        var formData = {
          'email': $scope.email,
          'password': $scope.password,
          'password_confirmation': $scope.passwordConfirmation
        };
        loginRequest.updatePassword($routeParams.tokenReset, formData).success(function(data) {
          if (data.code === 200) {
            $scope.successActivation = true;
          }
          $scope.error_log[0] = 'PasswordChangedSuccesfully';
          ngDialog.open({
            template: 'templateId',
            scope: $scope
          });
        }).error(function() {
          $scope.error_log[0] = 'InvalidData';
          $scope.loagind = false;
          ngDialog.open({
            template: 'templateId',
            scope: $scope
          });
        });
      } else {
        $scope.error_log[0] = 'PasswordNoMatch';
        ngDialog.open({
          template: 'templateId',
          scope: $scope
        });
      }
    };
  }

  angular.module('sponzorme')
    .controller('ForgotController', ForgotController);

})();

'use strict';
(function() {
  function ActivationController($scope, $routeParams, $translate, loginRequest) {
    $scope.errorActivation = false;
    $scope.successActivation = false;
    loginRequest.tryActivation($routeParams.token).success(function(data) {
      if (data.code === '200') {
        $scope.successActivation = true;
      }
    }).error(function() {
      $scope.errorActivation = true;
    });
  }

  angular.module('sponzorme')
    .controller('ActivationController', ActivationController);

})();

'use strict';
(function() {

  function LoginController($scope, $translate, loginRequest, $base64, $sessionStorage, $localStorage, $location, usSpinnerService, ngDialog, $routeParams, $rootScope) {
    if ($routeParams.lang === 'en' || $routeParams.lang === 'es' || $routeParams.lang === 'pt') {
      idiomaselect = $routeParams.lang;
      $translate.use($routeParams.lang);
    }
    var redirectTo = $localStorage.redirectTo;
    $localStorage.$reset();

    $scope.sendfrom = function() {
      if ($scope.email && $scope.password) { //Just Check the values are defined
        $scope.objuser = {};
        $scope.objuser.email = $scope.email;
        $scope.objuser.password = $scope.password;
        $scope.objuser.password_confirmation = $scope.passwordtwo;
        $scope.objuser.lang = idiomaselect;
        $scope.loagind = true;
        $rootScope.showLoading();
        loginRequest.login($scope.objuser).success(function(adata) {
          if (adata.user.activated === '1') {
            var expireDate = new Date();
            expireDate.setDate(expireDate.getDate() + 1);
            $localStorage.cookiesponzorme = btoa($scope.email + ':' + $scope.password);
            $localStorage.typesponzorme = adata.user.type;
            $localStorage.token = btoa($scope.email + ':' + $scope.password);
            $localStorage.id = adata.user.id;
            $localStorage.email = adata.user.email;
            $localStorage.demo = adata.user.demo;
            $localStorage.image = adata.user.image;
            $localStorage.startDate = Date.now();
            $localStorage.rating = adata.rating;
            $scope.$storage = $localStorage;
            idiomaselect = adata.user.lang;
            $scope.loagind = false;

            if (adata.user.type === '1') {
              if (redirectTo && redirectTo.indexOf('login') === -1 && redirectTo.indexOf('sponzors') > -1) {
                window.location.href = redirectTo;
              } else {
                $location.path('/sponzors/dashboard');
              }
            } else {
              if (redirectTo && redirectTo.indexOf('login') === -1 && redirectTo.indexOf('organizers') > -1) {

                window.location.href = redirectTo;
              } else {

                $location.path('/organizers/dashboard');
              }
            }
            $rootScope.closeAllDialogs();
          } else {
            $scope.loagind = false;
            $rootScope.closeAllDialogs();
            $scope.message = 'unactivatedAccount';
            ngDialog.open({
              template: 'views/templates/unactivatedAccountDialog.html',
              showClose: false,
              scope: $scope
            });
          }

        }).error(function() {
          $scope.loagind = false;
          $rootScope.closeAllDialogs();
          $rootScope.showDialog('error', 'invalidCredentials', false);
        });
      }
    };
  }

  angular.module('sponzorme')
    .controller('LoginController', LoginController);

})();

'use strict';
(function(){

function LogoutController($scope, $translate, $sessionStorage, $location, $localStorage, $rootScope) {
  $rootScope.tolsctive = 'active';
  $localStorage.$reset();

  $location.path('/login');
}

angular.module('sponzorme')
.controller('LogoutController', LogoutController);

})();

'use strict';
(function(){

function ResendController($scope, $translate, loginRequest, ngDialog) {
  $scope.error_log = []; //We storage here all translate error during register process
  $scope.resend = function() {
    $scope.loagind = true;
    loginRequest.resendActivation($scope.email).success(function() {
      $scope.loagind = false;
      $scope.error_log[0] = 'ActivationLinkResent';
      ngDialog.open({
        template: 'templateId',
        scope: $scope
      });
    }).error(function() {
      $scope.error_log[0] = 'InvalidEmail';
      $scope.loagind = false;
      ngDialog.open({
        template: 'templateId',
        scope: $scope
      });
    });
  };
}

angular.module('sponzorme')
.controller('ResendController', ResendController);

})();

'use strict';
(function() {

  function CustomizationController($scope, $translate, $localStorage, usSpinnerService, userRequest, allInterestsServiceRequest, categoryRequest, userInterestRequest, $location, $q) {

    $scope.steps = [false, false, false]; //Number of steps in customization proccess
    $scope.startCustomization = function() {
      //We check if localStorage is seeted.
      if ($localStorage.email && $localStorage.id && $localStorage.newUser) {
        //We set some neccesary variables
        $scope.userData = {};
        $scope.categories = [];
        $scope.interestselectarray = [];
        $scope.email = $localStorage.email;
        $scope.id = $localStorage.id;
        $scope.newUser = $localStorage.newUser;
        //Everything is configure to show the first step
        $scope.showStep(0);
        //Get All Categories from Backend
        categoryRequest.allCategories().success(function(response) {
          $scope.categories = response.categories;
          allInterestsServiceRequest.allInterestsCategoriesId().success(function(sData) {
            $scope.interests = sData.InterestCategory;
            //Merge the interests into categories
            angular.forEach($scope.categories, function(value) {
              value.interests = $scope.interests.filter(function(element) {
                return element.category_id === value.id;
              });
            });
          });
        });
      } else {
        $localStorage.$reset();
        $location.path('/');
      }
    };

    //This function hide all steps and only shows one
    $scope.showStep = function(stepToShow) {
      $scope.steps = [false, false, false];
      $scope.steps[stepToShow] = true;
    };

    $scope.sendfrom = function() {
      $scope.objuser = {};
      $scope.objuser.age = $scope.userData.age;
      $scope.objuser.sex = $scope.userData.sex;
      $scope.objuser.lang = $scope.userData.lang;
      $scope.objuser.location = $scope.userData.location.reference;
      $scope.loagind = true;
      userRequest.editUserPatch($localStorage.id, $scope.objuser).success(function(adata) {
        if (adata.message === 'Updated') {
          $scope.showStep(1);
        }
      });
    };

    $scope.showInterests = function(categoryid) {
      $scope.idselect = categoryid;
    };

    $scope.interestselect = function(interestselect) {
      var searcharray = $scope.interestselectarray.indexOf(interestselect);
      if (searcharray === -1) {
        $scope.interestselectarray.push(interestselect);
      } else {
        $scope.interestselectarray.splice(searcharray, 1);
      }
    };

    $scope.submitCategoryInfo = function() {
      var promises = [];
      angular.forEach($scope.interestselectarray, function(valuep) {
        $scope.currentInterest = {
          interest_id: valuep,
          user_id: $localStorage.id
        };
        promises.push(userInterestRequest.createUserInterest($scope.currentInterest));
      });
      promises[$scope.interestselectarray.length - 1].success(function(data) {
        $scope.showStep(2);
      });

        //setTimeout(function () {$localStorage.$reset();}, 3000);
    };

    //Here start the callback
    $scope.startCustomization();
  }

  angular.module('sponzorme')
    .controller('CustomizationController', CustomizationController);

})();

'use strict';
(function() {

  function SponzorsCreateController($scope, $translate, userRequest, ngDialog, $location, $localStorage, eventRequest, perkRequest, $routeParams, $rootScope) {
    if ($routeParams.lang === 'en' || $routeParams.lang === 'es' || $routeParams.lang === 'pt') {
      idiomaselect = $routeParams.lang;
      $translate.use($routeParams.lang);
    }
    $scope.sendfrom = function() {
      if ($scope.passwordone !== undefined || $scope.passwordtwo !== undefined) {
        if ($scope.passwordone === $scope.passwordtwo && $scope.passwordtwo.length > 6) {
          $scope.objuser = {};
          $scope.objuser.email = $scope.email;
          $scope.objuser.password = $scope.passwordone;
          $scope.objuser.password_confirmation = $scope.passwordtwo;
          $scope.objuser.lang = idiomaselect;
          $scope.objuser.type = 1;
          $scope.objuser.name = $scope.name + ' ' + $scope.lastname;
          $scope.loagind = true;
          $rootScope.showLoading();
          userRequest.createUser($scope.objuser).success(function(adata) {
            if (adata.message === 'Inserted') {
              $localStorage.cookiesponzorme = btoa($scope.email + ':' + $scope.passwordone);
              $localStorage.token = btoa($scope.email + ':' + $scope.passwordone);
              $localStorage.typesponzorme = adata.User.type;
              $localStorage.id = adata.User.id;
              $localStorage.email = adata.User.email;
              $localStorage.demo = adata.User.demo;
              $localStorage.startDate = Date.now();
              $localStorage.newUser = true;
              $localStorage.$apply();
              $scope.loagind = false;
              $location.path('/customization');
              $rootScope.closeAllDialogs();
            }
          }).error(function(data) {
            console.log(data);
            if (data.message === 'Not inserted') {
              $scope.errorMessages = [];
              if (data.error.email) {
                if(data.error.email[0] === 'The email has already been taken.'){
                  $scope.errorMessages.push('errorEmailAlreadyTaken');
                  $scope.didYouForgotPassword = true;
                }
                else{
                  $scope.errorMessages.push('errorRegisterEmail');
                }
              }
              if (data.error.name) {
                $scope.errorMessages.push('errorRegisterName');
              }
              if (data.error.lastname) {
                $scope.errorMessages.push('errorRegisterLastname');
              }
              if (data.error.password) {
                $scope.errorMessages.push('errorRegisterPassword');
              }
            }
            $scope.loagind = false;
            $rootScope.closeAllDialogs();
            ngDialog.open({
              template: 'views/templates/multipleErrorDialog.html',
              showClose: false,
              scope: $scope
            });
          });
        } else {
          if ($scope.passwordtwo.length > 6) {
            $rootScope.showDialog('error', 'errorRegisterPasswordNoMatch', false);
          } else {
            $rootScope.showDialog('error', 'errorRegisterShortPassword', false);
          }

        }
      } else {
        $rootScope.showDialog('error', 'errorRegisterPasswordNoEmpty', false);
      }
    };
  }
  angular.module('sponzorme')
    .controller('SponzorsCreateController', SponzorsCreateController);
})();

'use strict';
(function() {

  function SponzorsFollowingController($scope, $translate, $localStorage, userRequest, sponzorshipRequest, perkRequest, taskSponzorRequest, ngDialog, $location, $rootScope, $timeout) {
    if($rootScope.userValidation('1')){
      $scope.sponzorshipsLoading = true;
      $scope.noSponzorshipsMessage = false;
      $scope.tasksLoading = true;
      $scope.emailuser = $localStorage.email;
      $scope.downloadCalendar = function(sponzorship) {
        var cal = ics();
        cal.addEvent(sponzorship.title, sponzorship.title, sponzorship.location, sponzorship.starts, sponzorship.ends);

      };
      $scope.loadSponzorships = function() {
        sponzorshipRequest.oneSponzorshipBySponzor($localStorage.id).success(function(data) {
          $scope.sponzorshipsLoading = false;
          if (!data.SponzorsEvents[0]) {
            $scope.tasksLoading = false;
            $scope.noSponzorshipsMessage = true;
            $scope.noSponzorshipsTaskMessage = true;
          } else {
            $scope.sponzorships = [];
            angular.forEach(data.SponzorsEvents, function(value) {
              if (value.status === '0') {
                $scope.sponzorships.push(value);
              }
            });
            if ($scope.sponzorships[0] && $scope.sponzorships[0].status === '0') {
              $scope.getTaskSponzor($scope.sponzorships[0].id); //Fit the tasks with the first sponzorships
              $scope.sponzorships.current = $scope.sponzorships[0].id;
            } else {
              $scope.tasksLoading = false;
              $scope.noSponzorshipsMessage = true;
              $scope.noSponzorshipsTaskMessage = true;
            }

          }
        }).error(function(data) {

          $scope.noSponzorshipsMessage = true;
          $scope.noSponzorshipsTaskMessage = true;
        });
      };
      //this function deletes an sponzorship if the status is 0
      $scope.deleteSponzorship = function(sponzorshipId) {
        $rootScope.showLoading();
        sponzorshipRequest.oneSponzorship(sponzorshipId).success(function(taskData) {
          angular.forEach(taskData.data.SponzorEvent.task_sponzor, function(value) {
            taskSponzorRequest.deleteTaskSponzor(value.id).success(function() {});
          });
          $timeout(function() {
            sponzorshipRequest.deleteSponzorship(sponzorshipId).success(function() {
              $rootScope.closeAllDialogs();
              $rootScope.showDialog('success', 'sponzorshipDeleteSuccesfully', false);
              $scope.loadSponzorships();
            }).error(function() {
              $rootScope.closeAllDialogs();
              $rootScope.showDialog('error', 'errorDeletingSponzorship', false);
            });
          }, 5000);
        });
      };
      //this function gets the tasks sponzorships by sponzorship id
      $scope.getTaskSponzor = function(sponzorshipId) {
        $scope.tasksLoading = true;
        $scope.noSponzorshipsTaskMessage = false;
        $scope.sponzorships.current = sponzorshipId;
        taskSponzorRequest.tasksBySponzorship(sponzorshipId).success(function(data) {
          $scope.tasksLoading = false;
          $scope.tasksSponzor = data.tasks.filter(function(element) {
            if (element.type === '0' && element.sponzor_id === $localStorage.id) {
              return element;
            }
          });
          if (!$scope.tasksSponzor[0]) {
            $scope.noSponzorshipsTaskMessage = true;
          } else {
            $scope.noSponzorshipsTaskMessage = false;
          }
        }).error(function(data) {

          $scope.noSponzorshipsTaskMessage = true;
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
      $scope.loadSponzorships(); //here starts the callback
      $scope.menuprincipal = 'views/sponzors/menu.html';
    }
  }
  angular.module('sponzorme')
    .controller('SponzorsFollowingController', SponzorsFollowingController);

})();

'use strict';
(function() {

  function SponzorsFriendController($scope, $translate, userRequest, ngDialog, $location, $rootScope, $localStorage) {
    if($rootScope.userValidation('1')){
      //Vars initialization
      $scope.friend = {};
      $scope.friend.email = '';
      $scope.friend.message = '';
      $scope.emailuser = $localStorage.email;
      //Vars initialization ends

      //This function invites to a friend to use our platform.
      $scope.invitefriend = function() {
        $scope.loadingInvite = true;
        $rootScope.showLoading();
        $scope.objuserinv = {};
        $scope.objuserinv.user_id = $localStorage.id;
        $scope.objuserinv.email = $scope.friend.email;
        $scope.objuserinv.message = $scope.friend.message;
        userRequest.invitedUser($scope.objuserinv).success(function(adata) {
          $scope.friend.tempEmail = $scope.friend.email;
          $scope.friend.email = '';
          $scope.friend.message = '';
          if (adata.code === '200') {
            $rootScope.closeAllDialogs();
            $rootScope.showDialog('success', 'inviteFiendEmailSent', false);
          } else {
            $rootScope.closeAllDialogs();
            $rootScope.showDialog('error', 'problem', false);
          }
          $scope.loadingInvite = false;
        });
      };
      $scope.menuprincipal = 'views/sponzors/menu.html';
    }
  }

  angular.module('sponzorme')
    .controller('SponzorsFriendController', SponzorsFriendController);

})();

'use strict';
(function() {
  function SponzorsMainController($scope, $translate, userRequest, $localStorage, eventRequest, $location, usSpinnerService, ngDialog, sponzorshipRequest, perkTaskRequest, perkRequest, taskSponzorRequest, $rootScope, $firebaseArray, $window) {
    if ($rootScope.userValidation('1')) {
      $scope.searchLoading = true;
      $scope.upcomingLoading = true;
      $scope.bestLoading = true;
      $scope.showOrganizerInfo = function(event) {
        $rootScope.showLoading();
        eventRequest.oneEvent(event.id).success(function(sData) {
          if (sData.data.organizer[0].id) {
            $scope.currentOrganizer = sData.data.organizer[0].id;
            $window.open('#/profile/' + $scope.currentOrganizer);
          } else {
            $rootScope.closeAllDialogs();
            $rootScope.showDialog('error', 'canNotGetUserInfo', false);
          }
        }).error(function(eData) {
          $rootScope.closeAllDialogs();
          $rootScope.showDialog('error', 'canNotGetUserInfo', false);
        });
      };
      $scope.getAllEvents = function() {
        eventRequest.allEvents().success(function(adata) {
          $scope.search = [];
          $scope.search = adata.events.filter(function(e) {
            if (e.location_reference !== 'ljsadljf3289uojklfhasd' && new Date(e.starts).getTime() > new Date().getTime()) {
              return e;
            }
          });
          $scope.upcomingEvents = [];
          var currentDate = new Date();
          var count = 0; //to count 10 events
          for (var i = 0; i < $scope.search.length; i++) {
            var eventDate = new Date($scope.search[i].starts);
            if (eventDate > currentDate) {
              $scope.upcomingEvents.push($scope.search[i]);
              count++;
            }
            if (count > 10) {
              break;
            }
          }
          $scope.upcomingLoading = false;
          $scope.searchLoading = false;
        }).error(function() {
          $rootScope.showDialog('error', 'canNotGetEvents', false);
        });
      };
      $scope.showPerks = function(eventId) {
        $rootScope.showLoading();
        $scope.noPerksMessage = true;
        eventRequest.oneEvent(eventId).success(function(data) {
          $scope.currentEvent = data.data.event;
          $scope.currentOrganizer = data.data.organizer[0];
          $scope.loadingpeaks = false;
          if ($scope.currentEvent.perks[0]) {
            $scope.noPerksMessage = false;
          } else {
            $scope.noPerksMessage = true;
          }
          $rootScope.closeAllDialogs();
          ngDialog.open({
            template: 'views/templates/eventPerksDialog.html',
            scope: $scope
          });
        }).error(function(eData) {
          $rootScope.closeAllDialogs();
          $rootScope.showDialog('error', 'youCanNotSponzorThisEvent', false);
        });
      };
      //We display the form to get the sponzorship cause
      $scope.formCreateSponzorship = function(perk) {
        $scope.perkToSponzor = perk;
        ngDialog.open({
          template: 'views/templates/insertCauseForm.html',
          scope: $scope
        });
      };
      //this function have two steps, first, create the sponzorhip second create the sponzor tasks
      $scope.createSponzorship = function() {
        $rootScope.closeAllDialogs();
        $rootScope.showLoading();
        var data = { //Set Sponzorship data
          status: 0,
          'sponzor_id': $localStorage.id,
          'perk_id': $scope.perkToSponzor.id,
          'event_id': $scope.perkToSponzor.id_event,
          'cause': $scope.perkToSponzor.cause,
          'organizer_id': $scope.currentOrganizer.id
        };
        sponzorshipRequest.createSponzorship(data).success(function(sData) {
          perkRequest.onePerk($scope.perkToSponzor.id).success(function(sPerkData) {
            angular.forEach(sPerkData.data.Tasks, function(value) {
              var taskSponzor = {
                status: 0,
                'sponzor_id': $localStorage.id,
                'perk_id': $scope.perkToSponzor.id,
                'event_id': $scope.perkToSponzor.id_event,
                'organizer_id': $scope.currentOrganizer.id,
                'sponzorship_id': sData.Sponzorship.id,
                'task_id': value.id
              };
              taskSponzorRequest.createTaskSponzor(taskSponzor).success(function() {});
            });
            var info = {
              organizerId: $scope.currentOrganizer.id,
              eventName: $scope.currentEvent.title,
              lang: idiomaselect
            };
            var notificationsRef = new Firebase($rootScope.getConstants().FURL + 'notifications');
            var notifications = $firebaseArray(notificationsRef);
            var notification = {
              to: $scope.currentOrganizer.id,
              text: 'Hurray!!! Someone wants to sponsor your event ' + $scope.currentEvent.title + ' =)',
              link: '#/organizers/sponzorships'
            };
            notifications.$add(notification);
            sponzorshipRequest.sendSponzorshipEmailOrganizer(info).success(function() {});
            $rootScope.closeAllDialogs();
            $rootScope.showDialog('success', 'sponzorshipCreatedSuccesfuly', false);
          }).error(function() {
            $rootScope.closeAllDialogs();
            $rootScope.showDialog('error', 'youCanNotSponzorThisEvent', false);
          });
        }).error(function() {
          $rootScope.showDialog('error', 'youCanNotSponzorThisEvent', false);
        });
      };
      $scope.getAllEvents();
      $scope.menuprincipal = 'views/sponzors/menu.html';
    }
  }
  angular.module('sponzorme')
    .controller('SponzorsMainController', SponzorsMainController);

})();

'use strict';
(function() {

  function SponzorsSettingsController($scope, $translate, userRequest, $localStorage, $location, $rootScope, ngDialog, categoryRequest, allInterestsServiceRequest, loginRequest, userInterestRequest) {
    if($rootScope.userValidation('1')){
      $rootScope.showLoading();
      userRequest.oneUser($localStorage.id).success(function(adata) {
        $scope.account = adata.data.user;
        $scope.userInterests = adata.data.interests;
        $rootScope.closeAllDialogs();
      });
      allInterestsServiceRequest.allInterestsCategoriesId().success(function(sData) {
        $scope.interests = sData.InterestCategory;
      });
      $scope.removeUserInterest = function(index, id) {
        $scope.userInterests.splice(index, 1);
        userInterestRequest.deleteUserInterest(id).success(function() {});
      };
      $scope.addUserInterests = function(interest) {
        if (interest && interest.name) {
          var flag = false;
          if($scope.UserInterest){
            for (var i = 0; i < $scope.userInterests.length; i++) {
              if ($scope.userInterests[i].id_interest === interest.id_interest) {
                flag = true;
                $scope.selected = '';
                break;
              }
            }
          }
          if (!flag) {
            var interestData = {
              user_id: $localStorage.id,
              interest_id: interest.id_interest
            };
            userInterestRequest.createUserInterest(interestData).success(function(data) {
              $scope.userInterests.push({
                'name': interest.name,
                'id': data.UserInterest.id,
                'id_interest': interest.id_interest
              });
              $scope.selected = '';
            });
          }
        } else {
          $rootScope.showDialog('error', 'invalidInterestSelection', false);
          $scope.selected = '';
        }
      };
      $scope.account = [];

      $scope.file = false; //By default no file to update.
      $scope.editAccount = function() {
        $rootScope.showLoading();
        $scope.account.location = $scope.account.location.formatted_address;
        if ($scope.file) {
          $scope.creds = {
            bucket: $rootScope.getConstants().AMAZONBUCKET,
            access_key: $rootScope.getConstants().AMAZONKEY,
            secret_key: $rootScope.getConstants().AMAZONSECRET
          };
          AWS.config.update({
            accessKeyId: $scope.creds.access_key,
            secretAccessKey: $scope.creds.secret_key
          });
          AWS.config.region = $rootScope.getConstants().AMAZONBUCKETREGION;
          var bucket = new AWS.S3({
            params: {
              Bucket: $scope.creds.bucket
            }
          });
          // Prepend Unique String To Prevent Overwrites
          var uniqueFileName = btoa($rootScope.uniqueString() + new Date().getTime() + $rootScope.uniqueString()).replace('=', $rootScope.uniqueString()) + '.' + $rootScope.getExtension($scope.file.name);
          var params = {
            Key: uniqueFileName,
            ContentType: $scope.file.type,
            Body: $scope.file,
            ServerSideEncryption: 'AES256'
          };
          bucket.putObject(params, function(err, data) {
            if (!err) {
              $localStorage.image = $rootScope.getConstants().AMAZONBUCKETURL + uniqueFileName;
              $scope.account.image = $rootScope.getConstants().AMAZONBUCKETURL + uniqueFileName;
              userRequest.editUserPatch($localStorage.id, $scope.account).success(function(adata) {
                $scope.account = adata.User;
                $scope.file = false;
                $rootScope.closeAllDialogs();
                $rootScope.showDialog('success', 'accountInfoEditedSuccessfuly', false);
              }).error(function(eData) {
                $rootScope.closeAllDialogs();
                $rootScope.showDialog('error', 'errorEditingAccountInfo', false);
              });
            }
          });
        } else {
          userRequest.editUserPatch($localStorage.id, $scope.account).success(function(adata) {
            $scope.account = adata.User;
            $scope.file = false;
            $rootScope.closeAllDialogs();
            $rootScope.showDialog('success', 'accountInfoEditedSuccessfuly', false);
          }).error(function(eData) {
            $rootScope.closeAllDialogs();
            $rootScope.showDialog('error', 'errorEditingAccountInfo', false);
          });
        }
      };

      $scope.logo = false; //By default no file to update.

      $scope.updateDetails = function() {
        $rootScope.showLoading();
        if ($scope.logo) {
          $scope.creds = {
            bucket: $rootScope.getConstants().AMAZONBUCKET,
            access_key: $rootScope.getConstants().AMAZONKEY,
            secret_key: $rootScope.getConstants().AMAZONSECRET
          };
          AWS.config.update({
            accessKeyId: $scope.creds.access_key,
            secretAccessKey: $scope.creds.secret_key
          });
          AWS.config.region = $rootScope.getConstants().AMAZONBUCKETREGION;
          var bucket = new AWS.S3({
            params: {
              Bucket: $scope.creds.bucket
            }
          });
          // Prepend Unique String To Prevent Overwrites
          var uniqueFileName = btoa($rootScope.uniqueString() + new Date().getTime() + $rootScope.uniqueString()).replace('=', $rootScope.uniqueString()) + '.' + $rootScope.getExtension($scope.logo.name);
          var params = {
            Key: uniqueFileName,
            ContentType: $scope.logo.type,
            Body: $scope.logo,
            ServerSideEncryption: 'AES256'
          };
          bucket.putObject(params, function(err, data) {
            if (!err) {
              $scope.account.logo = $rootScope.getConstants().AMAZONBUCKETURL + uniqueFileName;
              $scope.$digest();
              userRequest.editUserPatch($localStorage.id, $scope.account).success(function(adata) {
                $scope.account = adata.User;
                $scope.logo = false;
                $rootScope.closeAllDialogs();
                $rootScope.showDialog('success', 'accountInfoEditedSuccessfuly', false);
              }).error(function(eData) {
                $rootScope.closeAllDialogs();
                $rootScope.showDialog('error', 'errorEditingAccountInfo', false);
              });
            }
          });
        } else {
          userRequest.editUserPatch($localStorage.id, $scope.account).success(function(adata) {
            $scope.account = adata.User;
            $scope.logo = false;
            $rootScope.closeAllDialogs();
            $rootScope.showDialog('success', 'accountInfoEditedSuccessfuly', false);
          }).error(function(eData) {
            $rootScope.closeAllDialogs();
            $rootScope.showDialog('error', 'errorEditingAccountInfo', false);
          });
        }
      };

      $scope.resetPassword = function() {
        $rootScope.showLoading();
        if ($scope.password === $scope.passwordConfirmation) {
          var formData = {
            'email': $localStorage.email,
            'password': $scope.password,
            'password_confirmation': $scope.passwordConfirmation
          };
          loginRequest.changePassword(formData, $localStorage.token).success(function(data) {
            $rootScope.closeAllDialogs();
            $localStorage.token = btoa($localStorage.email + ':' + $scope.passwordConfirmation);
            $rootScope.showDialog('success', 'PasswordChangedSuccesfully', false);
          }).error(function() {
            $rootScope.closeAllDialogs();
            $rootScope.showDialog('error', 'InvalidNewPassword', false);
          });
        } else {
          $rootScope.closeAllDialogs();
          $rootScope.showDialog('error', 'PasswordNoMatch', false);
        }
      };
      $scope.menuprincipal = 'views/sponzors/menu.html';
    }
  }

  angular.module('sponzorme')
    .controller('SponzorsSettingsController', SponzorsSettingsController);

})();

'use strict';
(function() {

  function SponzorsSponzorshipsController($scope, $translate, $location, taskSponzorRequest, perkTaskRequest, sponzorshipRequest, $localStorage, userRequest, ngDialog, $rootScope, ratingRequest) {
    if ($rootScope.userValidation('1')) {
      $scope.noSponzorshipsMessage = false;
      $scope.noSponzorshipsTaskMessage = false;
      $scope.sponzorshipsLoading = true;
      $scope.loadingTasks = true;
      $scope.emailuser = $localStorage.email;
      $scope.userfroups = 0;
      $translate.use(idiomaselect);
      $scope.sendToRating = function(s) {
        sponzorshipRequest.oneSponzorship(s.id).success(function(sData) {
          ratingRequest.ratingBySponzorship(s.id, 1).success(function(s2Data) {
            $scope.loadingForm = false; //Loading
            $rootScope.closeAllDialogs(); //Close Loading
            if (s2Data.data.Rating[0] && s2Data.data.Rating[0].sponzor_id === $localStorage.id) {
              $rootScope.showDialog('error', 'ratingAlreadyRated', false);
            } else {
              $location.path('/sponzors/rating/' + s.id);
            }
          });
        });
      };
      $scope.paymentInformation = function(sponzorship) {
        $scope.PAYPALCOMPLETERETURNURL = $rootScope.getConstants().PAYPALCOMPLETERETURNURL;
        $scope.PAYPALIPNRETURNURL = $rootScope.getConstants().PAYPALIPNRETURNURL;
        $scope.PAYPALEMAIL = $rootScope.getConstants().PAYPALEMAIL;
        $scope.sponzorship = sponzorship;
        $scope.paymentValue = sponzorship.usd;
        $scope.fee = parseFloat((sponzorship.usd * $rootScope.getConstants().FEE) + $rootScope.getConstants().XOOMRATE);
        $scope.paymentTotal = parseFloat(sponzorship.usd) + parseFloat($scope.fee);
        ngDialog.open({
          scope: $scope,
          template: 'views/templates/prePaymentInfo.html',
          showClose: true
        });
      };
      $scope.downloadCalendar = function(sponzorship) {
        var cal = ics();
        cal.addEvent(sponzorship.title, sponzorship.title, sponzorship.location, sponzorship.starts, sponzorship.ends);

      };
      //This function allows get sponzorship info from organizerId
      $scope.getSponzorshipsBySponzor = function() {
        $scope.todayDate = new Date().getTime();
        sponzorshipRequest.oneSponzorshipBySponzor($localStorage.id).success(function(data) {
          $scope.sponzorshipsLoading = false;
          $scope.noSponzorshipsMessage = false;
          if (!data.SponzorsEvents[0]) {
            $scope.loadingTasks = false;
            $scope.noSponzorshipsMessage = true;
            $scope.noSponzorshipsTaskMessage = true;
          } else {
            $scope.sponzorships = [];
            var flag = false; //used to verify if there is tasks
            angular.forEach(data.SponzorsEvents, function(value) {
              if (value.status >= '1') {
                var timer = parseInt(parseInt($rootScope.getConstants().EVENTEXPIRATIONDAYS) * 24 * 60 * 60 * 1000);
                value.ends = new Date(new Date(value.ends).getTime() + timer);
                $scope.sponzorships.push(value);
                flag = true;
              }
            });
            if (flag) {
              $scope.sponzorships.current = $scope.sponzorships[0].id;
              $scope.getTaskSponzor($scope.sponzorships[0]); //Fit the tasks with the first sponzorships
            } else {
              $scope.loadingTasks = false;
              $scope.noSponzorshipsTaskMessage = true;
            }
          }
        }).error(function(data) {

          $scope.noSponzorshipsMessage = true;
          $scope.noSponzorshipsTaskMessage = true;
        });
      };
      $scope.getSponzorship = function(sponzorshipId) {
        sponzorshipRequest.oneSponzorship(sponzorshipId).success(function(data) {
          $scope.currentSponzorship = data;
        });
      };
      //This function changes to 1 the sponzorship status
      $scope.acceptSponzorship = function(sponzoshipId) {
        var data = {
          status: 1
        };
        sponzorshipRequest.editSponzorshipPatch(sponzoshipId, data).success(function() {
          $scope.getSponzorshipsBySponzor();
        }).error(function(eData) {

        });
      };
      //This function changes to 0 the sponzorship status
      $scope.unacceptSponzorship = function(sponzoshipId) {
        var data = {
          status: 0
        };
        sponzorshipRequest.editSponzorshipPatch(sponzoshipId, data).success(function() {
          $scope.getSponzorshipsBySponzor();
        }).error(function(eData) {

        });
      };
      //this function gets the tasks sponzorships by sponzorship id
      $scope.getTaskSponzor = function(sponzorship) {
        $scope.loadingTasks = true;
        $scope.noSponzorshipsTaskMessage = false;
        $scope.sponzorships.current = sponzorship.id;
        $scope.currentSponzorship = sponzorship;
        taskSponzorRequest.tasksBySponzorship(sponzorship.id).success(function(data) {
          $scope.tasksSponzor = data.tasks.filter(function(element) {
            if (element.sponzor_id === $localStorage.id) {
              return element;
            }
          });
          $scope.loadingTasks = false;
          if (!$scope.tasksSponzor[0]) {
            $scope.noSponzorshipsTaskMessage = true;
          } else {
            $scope.noSponzorshipsTaskMessage = false;
          }
        }).error(function(data) {

          $scope.noSponzorshipsTaskMessage = true;
        });
      };
      //This function changes to 1 the sponzor task status
      $scope.completeTask = function(index) {
        $scope.tasksSponzor[index].status = 1;
        var taskSponzorId = $scope.tasksSponzor[index].id;
        var data = {
          status: 1
        };
        taskSponzorRequest.editTaskSponzorPatch(taskSponzorId, data).success(function() {});

      };
      //This function changes to 0 the sponzor task status
      $scope.uncompleteTask = function(index) {
        $scope.tasksSponzor[index].status = 0;
        var taskSponzorId = $scope.tasksSponzor[index].id;
        var data = {
          status: 0
        };
        taskSponzorRequest.editTaskSponzorPatch(taskSponzorId, data).success(function() {});
      };
      $scope.deleteTaskSponzor = function(index) {
        var taskSponzorId = $scope.tasksSponzor[index].id;
        taskSponzorRequest.deleteTaskSponzor(taskSponzorId).success(function() {});
        $scope.tasksSponzor.splice(index, 1);
      };
      $scope.addTask = function() {
        $rootScope.closeAllDialogs();
        $rootScope.showLoading();
        $scope.todo.perk_id = $scope.currentSponzorship.perk_id;
        $scope.todo.event_id = $scope.currentSponzorship.event_id;
        $scope.todo.status = 0; //We put the defaul status
        $scope.todo.user_id = $localStorage.id; //Get the organizer Id
        $scope.todo.type = 1; //If task is created by sponzor the type is 1
        /** First we crete the perk task, and then we create the task sponzor **/
        perkTaskRequest.createPerkTask($scope.todo).success(function(data) {
          var taskSponzor = {
            'status': 0,
            'sponzor_id': $localStorage.id,
            'perk_id': $scope.currentSponzorship.perk_id,
            'event_id': $scope.currentSponzorship.event_id,
            'organizer_id': $scope.currentSponzorship.organizer_id,
            'sponzorship_id': $scope.currentSponzorship.id,
            'task_id': data.PerkTask.id
          };
          taskSponzorRequest.createTaskSponzor(taskSponzor).success(function() {
            $scope.getTaskSponzor($scope.currentSponzorship); //Refresh perks data.
            $rootScope.closeAllDialogs();
            $rootScope.showDialog('success', 'taskCreatedSuccesfuly', false);
          });
        }).error(function() {
          $rootScope.closeAllDialogs();
          $rootScope.showDialog('error', 'errorCreatingTask', false);
        });
      };
      $scope.seeCause = function(sponzorship) {
        $scope.cause = sponzorship.cause;
        ngDialog.open({
          template: 'views/templates/sponzorshipCauseDialog.html',
          showClose: false,
          scope: $scope
        });
      };
      $scope.showTaskForm = function() {
        $scope.todo = {};
        ngDialog.open({
          template: 'views/templates/newTaskForm.html',
          scope: $scope,
          showClose: false
        });
      };
      $scope.getSponzorshipsBySponzor();
      $scope.menuprincipal = 'views/sponzors/menu.html';
    }
  }
  angular.module('sponzorme')
    .controller('SponzorsSponzorshipsController', SponzorsSponzorshipsController);
})();

'use strict';
(function() {

  function SponzorsRatingController($scope, $translate, userRequest, ngDialog, $location, $rootScope, $localStorage, $routeParams, sponzorshipRequest, ratingRequest, $timeout) {
    if ($rootScope.userValidation('1') && $routeParams.sponzorshipId) {
      $scope.loadingForm = true; //Loading
      $rootScope.showLoading();
      //First we validate this sponzorship does not have rating from this sponzor
      //
      //Then we get the sponzorship information
      sponzorshipRequest.oneSponzorship($routeParams.sponzorshipId).success(function(sData) {
        ratingRequest.ratingBySponzorship($routeParams.sponzorshipId, 1).success(function(s2Data) {
          $scope.loadingForm = false; //Loading
          $rootScope.closeAllDialogs(); //Close Loading
          if (s2Data.data.Rating[0] && s2Data.data.Rating[0].sponzor_id === $localStorage.id) {
            $rootScope.showDialog('error', 'ratingAlreadyRated', '/sponzors/sponzoring');
          } else {
            $scope.sponzorship = sData.data;
            $scope.rating = {
              'sponzorship_id': sData.data.SponzorEvent.id,
              'type': 1,
              'sponzor_id': sData.data.Sponzor.id,
              'organizer_id': sData.data.Organizer.id,
              'other': ''
            };
          }
        });
      }).error(function(eData) {
        $scope.loadingForm = false; //Loading
        $rootScope.closeAllDialogs(); //Close Loading
        $rootScope.showDialog('error', 'requestedSponzorshipNoExist', false);
      });
      $scope.saveRating = function() { //Finally we save the rating information
        $rootScope.showLoading();
        if ($scope.rating.other) {
          $scope.rating.question9 = 'Other: ' + $scope.rating.other;
        }
        ratingRequest.createRating($scope.rating).success(function(sData) {
          $rootScope.showDialog('success', 'ratingSponzorSuccess', '/sponzors/sponzoring');
        }).error(function(eData) {
          $scope.loadingForm = false; //Loading
          $rootScope.closeAllDialogs(); //Close Loading
          $rootScope.showDialog('error', 'invalidRateInfo', false);
        });
      };
      $scope.menuprincipal = 'views/sponzors/menu.html';
    }
  }

  angular.module('sponzorme')
    .controller('SponzorsRatingController', SponzorsRatingController);

})();

'use strict';
(function() {
  function OrganizersCreateController($scope, $translate, userRequest, ngDialog, usSpinnerService, $location, $localStorage, eventRequest, perkRequest, $routeParams, $rootScope) {
    if ($routeParams.lang === 'en' || $routeParams.lang === 'es' || $routeParams.lang === 'pt') {
      idiomaselect = $routeParams.lang;
      $translate.use($routeParams.lang);
    }
    $scope.sendfrom = function() {
      if ($scope.passwordone !== undefined || $scope.passwordtwo !== undefined) {
        if ($scope.passwordone === $scope.passwordtwo && $scope.passwordtwo.length > 6) {
          $scope.objuser = {};
          $scope.objuser.email = $scope.email;
          $scope.objuser.password = $scope.passwordone;
          $scope.objuser.password_confirmation = $scope.passwordtwo;
          $scope.objuser.lang = idiomaselect;
          $scope.objuser.type = 0;
          $scope.objuser.name = $scope.name + ' ' + $scope.lastname;
          $scope.loagind = true;
          $rootScope.showLoading();
          userRequest.createUser($scope.objuser).success(function(adata) {
            if (adata.message === 'Inserted') {
              $localStorage.cookiesponzorme = btoa($scope.email + ':' + $scope.passwordone);
              $localStorage.token = btoa($scope.email + ':' + $scope.passwordone);
              $localStorage.typesponzorme = adata.User.type;
              $localStorage.id = adata.User.id;
              $localStorage.email = adata.User.email;
              $localStorage.demo = adata.User.demo;
              $localStorage.startDate = Date.now();
              $localStorage.newUser = true;
              $localStorage.$apply();
              if (idiomaselect === 'en') {
                event_en.DEFAULT_EVENT.organizer = adata.User.id;
                eventRequest.createEventToken(event_en.DEFAULT_EVENT, btoa($scope.email + ':' + $scope.passwordone)).success(function(sData) {
                  angular.forEach(event_en.PERKS, function(value) {
                    value.id_event = sData.event.id;
                    perkRequest.createPerkToken(value, btoa($scope.email + ':' + $scope.passwordone)).success(function() {/*Empty Code, nothing necessary here*/})
                    .error(function(){/*Empty Code, nothing necessary here*/});
                  });
                  $scope.loagind = false;
                  $location.path('/customization');
                  $rootScope.closeAllDialogs();
                }).error(function() {/*Empty Code, nothing necessary here*/});
              } else if (idiomaselect === 'es') {
                event_es.DEFAULT_EVENT.organizer = adata.User.id;
                eventRequest.createEventToken(event_es.DEFAULT_EVENT, btoa($scope.email + ':' + $scope.passwordone)).success(function(sData) {
                  angular.forEach(event_es.PERKS, function(value) {
                    value.id_event = sData.event.id;
                    perkRequest.createPerkToken(value, btoa($scope.email + ':' + $scope.passwordone)).success(function() {/*Empty Code, nothing necessary here*/})
                    .error(function() {/*Empty Code, nothing necessary here*/});
                  });
                  $scope.loagind = false;
                  $location.path('/customization');
                  $rootScope.closeAllDialogs();
                }).error(function() {/*Empty Code, nothing necessary here*/});
              } else if (idiomaselect === 'pt') {
                event_pt.DEFAULT_EVENT.organizer = adata.User.id;
                eventRequest.createEventToken(event_pt.DEFAULT_EVENT, btoa($scope.email + ':' + $scope.passwordone)).success(function(sData) {
                  angular.forEach(event_pt.PERKS, function(value) {
                    value.id_event = sData.event.id;
                    perkRequest.createPerkToken(value, btoa($scope.email + ':' + $scope.passwordone)).success(function() {/*Empty Code, nothing necessary here*/}).error(function() {/*Empty Code, nothing necessary here*/});
                  });
                  $scope.loagind = false;
                  $location.path('/customization');
                  $rootScope.closeAllDialogs();
                }).error(function() {/*Empty Code, nothing necessary here*/});
              }
            }
          }).error(function(data) {
            if (data.message === 'Not inserted') {
              $scope.errorMessages = [];
              if (data.error.email) {
                if(data.error.email[0] === 'The email has already been taken.'){
                  $scope.errorMessages.push('errorEmailAlreadyTaken');
                  $scope.didYouForgotPassword = true;
                }
                else{
                  $scope.errorMessages.push('errorRegisterEmail');
                }
              }
              if (data.error.name) {
                $scope.errorMessages.push('errorRegisterName');
              }
              if (data.error.lastname) {
                $scope.errorMessages.push('errorRegisterLastname');
              }
              if (data.error.password) {
                $scope.errorMessages.push('errorRegisterPassword');
              }
            }
            $scope.loagind = false;
            $rootScope.closeAllDialogs();
            ngDialog.open({
              template: 'views/templates/multipleErrorDialog.html',
              showClose: false,
              scope: $scope
            });
          });
        } else {
          if ($scope.passwordtwo.length > 6) {
            $rootScope.showDialog('error', 'errorRegisterPasswordNoMatch', false);
          } else {
            $rootScope.showDialog('error', 'errorRegisterShortPassword', false);
          }
        }
      } else {
        $rootScope.showDialog('error', 'errorRegisterPasswordNoEmpty', false);
      }
    };
  }
  angular.module('sponzorme')
    .controller('OrganizersCreateController', OrganizersCreateController);
})();

'use strict';
(function() {

  function OrganizersEventsController($scope, $translate, $localStorage, eventTypeRequest, eventRequest, ngDialog, categoryRequest, userRequest, perkRequest, perkTaskRequest, $location, usSpinnerService, taskSponzorRequest, $rootScope, $timeout) {
    if ($rootScope.userValidation('0')) {
      //Vars Initialization
      $scope.error_log = '';
      $scope.eventos = [];
      $scope.currentPerkId = 0;
      $scope.currentPerk = {};
      $scope.emailuser = $localStorage.email;
      $scope.file = false; //By default no file to add.
      $scope.event = {};
      eventTypeRequest.allEventTypes().success(function(adata) {
        $scope.type = {};
        $scope.type.list = adata.eventTypes;
        $scope.typefilter = adata.eventTypes;
      });
      $scope.categorias = {};
      categoryRequest.allCategories().success(function(adata) {
        $scope.categorias.list = adata.categories;
        $scope.categoriasfilter = adata.categories;
      });
      $scope.getEventsByOrganizer = function(userId) {
        $scope.loadingEvents = true;
        $scope.noEventsMessage = false;
        $scope.loadingtasks = true;
        $scope.noTasksMessage = false;
        $scope.loadingPerks = true;
        $scope.noPerksMessage = false;
        userRequest.oneUser(userId).success(function(adata) {
          $scope.eventos = adata.data.user.events;
          $scope.loadingEvents = false;
          if ($scope.eventos[0]) {
            $scope.event.current = $scope.eventos[0].id;
          } else {
            $scope.loadingtasks = false;
            $scope.loadingPerks = false;
            $scope.noEventsMessage = true;
          }
        });
      };
      $scope.updatePerks = function(idevent) {
        $scope.loadingPerks = true; //We need put in load mode the widget
        $scope.noPerksMessage = false; //We suppose that exists persks
        $scope.loadingtasks = true; //Because we gonna get perk first and then tasks
        if (idevent) {
          eventRequest.oneEvent(idevent).success(function(adata) {
            $scope.peaks = adata.data.event.perks;
            if (!$scope.peaks[0]) {
              $scope.noPerksMessage = true;
              $scope.loadingPerks = false;
              $scope.currentPerk.Tasks = [];
              $scope.noTasksMessage = true;
              $scope.loadingtasks = false;
            } else {
              $scope.loadingPerks = false; //If here is because exists perks
              $scope.getPerk($scope.peaks[0].id); //We get the perks detail that include tasks
            }
          }).error(function() {
            $scope.loadingpeaks = false;
            $scope.noPerksMessage = true;
            $scope.currentPerk.Tasks = [];
            $scope.noTasksMessage = true;
            $scope.loadingtasks = false;
          });
        }
      };
      $scope.imageEvent = function(image) {
        $scope.currentImage = image;
        ngDialog.open({
          template: 'views/templates/eventImage.html',
          scope: $scope,
          showClose: false
        });
      };
      $scope.getPerk = function(perkId) {
        $scope.loadingtasks = true;
        $scope.noTasksMessage = false;
        $scope.currentPerkId = perkId;
        perkRequest.onePerk(perkId).success(function(adata) {
          $scope.currentPerk = adata.data;

          if (!$scope.currentPerk.Tasks[0]) { //If here no tasks in this perk
            $scope.noTasksMessage = true;
            $scope.loadingtasks = false;
          } else { //If here there are tasks
            $scope.noTasksMessage = false;
            $scope.loadingtasks = false;
          }
        }).error(function() {
          $scope.loadingtasks = false;
          $scope.noPerksMessage = true;
        });
      };

      $scope.removeEvent = function(idevent) {
        $rootScope.showLoading();
        eventRequest.oneEvent(idevent).success(function(adata) {
          if (adata.data.event.sponzorship.length === 0) { //If event does not have sponzorhips
            angular.forEach(adata.data.event.sponzor_tasks, function(value) {
              taskSponzorRequest.deleteTaskSponzor(value.id)
                .error(function(eData) {});
            });
            angular.forEach(adata.data.event.perk_tasks, function(value) { //First we delete the tasks
              perkTaskRequest.deletePerkTask(value.id)
                .error(function(eData) {});
            });
            angular.forEach(adata.data.event.perks, function(value) { //Then we delete the perks
              perkRequest.deletePerk(value.id)
                .error(function(eData) {});
            });
            $timeout(function() {
              eventRequest.deleteEvent(adata.data.event.id).success(function() {
                $rootScope.closeAllDialogs();
                $rootScope.showDialog('success', 'eventDeleteSuccesfully', false);
                $scope.getEventsByOrganizer($localStorage.id);
              }).error(function(eData) {
                $rootScope.closeAllDialogs();
                $rootScope.showDialog('error', 'errorDeletingEvent', false);
              });
            }, 5000);
          } else { //If event has sponzorhips we can not delete
            $rootScope.closeAllDialogs();
            $rootScope.showDialog('error', 'eventDeletingEventHasSponzorship', false);
          }
        });
      };
      $scope.showTaskForm = function() {
        $scope.todo = {};
        ngDialog.open({
          template: 'views/templates/newTaskForm.html',
          scope: $scope,
          showClose: false
        });
      };
      /*this function takes the current perk and the current event, and add a task for the
        selected perk.*/

      $scope.addTask = function() {
        $rootScope.closeAllDialogs();
        $rootScope.showLoading();
        $scope.todo.perk_id = $scope.currentPerkId;
        $scope.todo.event_id = $scope.event.current;
        $scope.todo.status = 0; //We put the defaul status
        $scope.todo.user_id = $localStorage.id; //Get the organizer Id
        $scope.todo.type = 0; //If task is created by organizer the type is 0
        perkTaskRequest.createPerkTask($scope.todo).success(function() {
          $rootScope.closeAllDialogs();
          $rootScope.showDialog('success', 'taskCreatedSuccesfuly', false);
          $scope.getPerk($scope.currentPerkId); //Refresh perks data.
        }).error(function(data) {
          $rootScope.closeAllDialogs();
          $rootScope.showDialog('error', 'errorCreatingTask', false);
        });
      };

      $scope.removeTask = function(task_id) {
        $rootScope.showLoading();
        perkTaskRequest.deletePerkTask(task_id).success(function(adata) {
          $rootScope.closeAllDialogs();
          $rootScope.showDialog('success', 'taskDeletedSuccessfuly', false);
          $scope.getPerk($scope.currentPerkId);
        }).error(function() {
          $rootScope.closeAllDialogs();
          $rootScope.showDialog('error', 'errorDeletingTask', false);
        });
      };

      $scope.getEventsByOrganizer($localStorage.id); //Here start the callback
      $translate.use(idiomaselect);
      $scope.$watch('event.current', function(newvalue) {
        if (newvalue !== '' && newvalue !== '0' && typeof newvalue !== 'undefined') { //Some validation to ensure no empty values
          $scope.updatePerks(newvalue);
        }
      });
      $scope.menuprincipal = 'views/organizers/menu.html';
    }
  }

  angular.module('sponzorme')
    .controller('OrganizersEventsController', OrganizersEventsController);

})();

'use strict';
(function(){

function OrganizersFriendController($scope, $translate, $localStorage, userRequest, ngDialog, $location, $rootScope) {
  if($rootScope.userValidation('0')){
    //Vars initialization
    $scope.friend = {};
    $scope.friend.email = '';
    $scope.friend.message = '';
    $scope.emailuser = $localStorage.email;
    //Vars initialization ends

    //This function invites to a friend to use our platform.
    $scope.invitefriend = function() {
      $scope.loadingInvite = true;
      $rootScope.showLoading();
      $scope.objuserinv = {};
      $scope.objuserinv.user_id = $localStorage.id;
      $scope.objuserinv.email = $scope.friend.email;
      $scope.objuserinv.message = $scope.friend.message;
      userRequest.invitedUser($scope.objuserinv).success(function(adata) {
        $scope.friend.tempEmail = $scope.friend.email;
        $scope.friend.email = '';
        $scope.friend.message = '';
        if (adata.code === '200') {
          $rootScope.closeAllDialogs();
          $rootScope.showDialog('success', 'inviteFiendEmailSent', false);
        } else {
          $rootScope.closeAllDialogs();
          $rootScope.showDialog('error', 'problem', false);
        }
        $scope.loadingInvite = false;
      });
    };
    $scope.menuprincipal = 'views/organizers/menu.html';
  }
}
angular.module('sponzorme')
.controller('OrganizersFriendController', OrganizersFriendController);

})();

'use strict';
(function() {
  function OrganizersMainController($scope, $translate, $localStorage, $location, userRequest, eventRequest, rssRequest, usSpinnerService, $rootScope, sponzorshipRequest) {
    if($rootScope.userValidation('0')){
      $scope.loadingevents = true;
      $scope.loadingrss = true;
      $scope.emailuser = $localStorage.email;
      $scope.userfroups = 0;
      $translate.use(idiomaselect);
      $scope.startcounter = 0;
      $scope.eventos = {};
      $scope.eventos.size = 'calculating';
      $scope.event = {};
      $scope.peaks = [];
      $scope.sponzors = {};
      $scope.sponzors.size = 'calculating';
      $scope.sponzors.balance = 'calculating';
      $scope.users = {};
      $scope.users.size = 0;
      sponzorshipRequest.oneSponzorshipByOrganizer($localStorage.id).success(function(data) {
        $scope.sponzors.size = 0;
        $scope.sponzors.balance = 0;
        angular.forEach(data.SponzorsEvents, function(value) {
          if (value.status === '1') {
            $scope.sponzors.balance = parseInt($scope.sponzors.balance) + parseInt(value.usd);
          }
        });
        $scope.sponzors.size = data.SponzorsEvents.length;
      });
      userRequest.oneUser($localStorage.id).success(function(adata) {
        $scope.events = [];
        $scope.users.size = adata.data.user.comunity_size;
        var datuser = JSON.stringify(adata.data.user);
        $localStorage.sponzorme = datuser;
        $scope.events = adata.data.user.events;
        $scope.eventos.size = $scope.events.length;
        $scope.loadingevents = false;
        if ($scope.events[0]) {
          $scope.event.current = $scope.events[0].id;
        }
      });
      $scope.$watch('event.current', function(newvalue) {
        $scope.loadingpeaks = true;
        $scope.noPerksMessage = false;
        if ($scope.event.current) {
          eventRequest.oneEvent(newvalue).success(function(adata) {
            $scope.peaks = adata.data.event.perks;
            $scope.loadingpeaks = false;
            if (!$scope.peaks[0]) {
              $scope.noPerksMessage = true;
            } else {
              $scope.noPerksMessage = false;
            }
          }).error(function() {
            $scope.loadingpeaks = false;
            $scope.noPerksMessage = true;
          });
        }
      });
      $scope.rss = [];
      rssRequest.rss(idiomaselect).success(function(data) {
        $scope.rss = data.responseData.feed.entries;
        $scope.loadingrss = false;
      }).error(function() {
        $scope.loadingrss = false;
        $scope.noRssMessage = true;
      });
      $scope.menuprincipal = 'views/organizers/menu.html';
    }
  }
  angular.module('sponzorme')
    .controller('OrganizersMainController', OrganizersMainController);

})();

'use strict';
(function() {
  function OrganizersSettingsController($scope, $translate, userRequest, $localStorage, $location, $rootScope, ngDialog, categoryRequest, allInterestsServiceRequest, loginRequest, userInterestRequest) {
    if ($rootScope.userValidation('0')) {
      $rootScope.showLoading();
      userRequest.oneUser($localStorage.id).success(function(adata) {
        $scope.account = adata.data.user;
        $scope.userInterests = adata.data.interests;
        $rootScope.closeAllDialogs();
      });
      allInterestsServiceRequest.allInterestsCategoriesId().success(function(sData) {
        $scope.interests = sData.InterestCategory;
      });
      $scope.removeUserInterest = function(index, id) {
        $scope.userInterests.splice(index, 1);
        userInterestRequest.deleteUserInterest(id).success(function() {});
      };
      $scope.addUserInterests = function(interest) {
        if (interest && interest.name) {
          var flag = false;
          if($scope.UserInterest){
            for (var i = 0; i < $scope.userInterests.length; i++) {
              if ($scope.userInterests[i].id_interest === interest.id_interest) {
                flag = true;
                $scope.selected = '';
                break;
              }
            }
          }
          if (!flag) {
            var dataInterest = {
              user_id: $localStorage.id,
              interest_id: interest.id_interest
            };
            userInterestRequest.createUserInterest(dataInterest).success(function(data) {
              $scope.userInterests.push({
                'name': interest.name,
                'id': data.UserInterest.id,
                'id_interest': interest.id_interest
              });
              $scope.selected = '';
            });
          }
        } else {
          $rootScope.showDialog('error', 'invalidInterestSelection', false);
          $scope.selected = '';
        }
      };
      $scope.account = [];
      $scope.file = false; //By default no file to update.
      $scope.editAccount = function() {
        $rootScope.showLoading();
        $scope.account.location = $scope.account.location.formatted_address;
        if ($scope.file) {
          $scope.creds = {
            bucket: $rootScope.getConstants().AMAZONBUCKET,
            access_key: $rootScope.getConstants().AMAZONKEY,
            secret_key: $rootScope.getConstants().AMAZONSECRET
          };
          AWS.config.update({
            accessKeyId: $scope.creds.access_key,
            secretAccessKey: $scope.creds.secret_key
          });
          AWS.config.region = $rootScope.getConstants().AMAZONBUCKETREGION;
          var bucket = new AWS.S3({
            params: {
              Bucket: $scope.creds.bucket
            }
          });
          // Prepend Unique String To Prevent Overwrites
          var uniqueFileName = btoa($rootScope.uniqueString() + new Date().getTime() + $rootScope.uniqueString()).replace('=', $rootScope.uniqueString()) + '.' + $rootScope.getExtension($scope.file.name);
          var params = {
            Key: uniqueFileName,
            ContentType: $scope.file.type,
            Body: $scope.file,
            ServerSideEncryption: 'AES256'
          };
          bucket.putObject(params, function(err, data) {
            if (!err) {
              $localStorage.image = $rootScope.getConstants().AMAZONBUCKETURL + uniqueFileName;
              $scope.account.image = $rootScope.getConstants().AMAZONBUCKETURL + uniqueFileName;
              userRequest.editUserPatch($localStorage.id, $scope.account).success(function(adata) {
                $scope.account = adata.User;
                $scope.file = false;
                $rootScope.closeAllDialogs();
                $rootScope.showDialog('success', 'accountInfoEditedSuccessfuly', false);
              }).error(function(eData) {
                $rootScope.closeAllDialogs();
                $rootScope.showDialog('error', 'errorEditingAccountInfo', false);
              });
            }
          });
        } else {
          userRequest.editUserPatch($localStorage.id, $scope.account).success(function(adata) {
            $scope.account = adata.User;
            $scope.file = false;
            $rootScope.closeAllDialogs();
            $rootScope.showDialog('success', 'accountInfoEditedSuccessfuly', false);
          }).error(function(eData) {
            $rootScope.closeAllDialogs();
            $rootScope.showDialog('error', 'errorEditingAccountInfo', false);
          });
        }
      };

      $scope.resetPassword = function() {
        $rootScope.showLoading();
        if ($scope.password === $scope.passwordConfirmation) {
          var formData = {
            'email': $localStorage.email,
            'password': $scope.password,
            'password_confirmation': $scope.passwordConfirmation
          };
          loginRequest.changePassword(formData, $localStorage.token).success(function(data) {
            $rootScope.closeAllDialogs();
            $localStorage.token = btoa($localStorage.email + ':' + $scope.passwordConfirmation);
            $rootScope.showDialog('success', 'PasswordChangedSuccesfully', false);
          }).error(function() {
            $rootScope.closeAllDialogs();
            $rootScope.showDialog('error', 'InvalidNewPassword', false);
          });
        } else {
          $rootScope.closeAllDialogs();
          $rootScope.showDialog('error', 'PasswordNoMatch', false);
        }
      };
      $scope.menuprincipal = 'views/organizers/menu.html';
    }
  }
  angular.module('sponzorme')
    .controller('OrganizersSettingsController', OrganizersSettingsController);
})();

'use strict';
(function() {
  function OrganizersSponzorshipsController($scope, $translate, $location, taskSponzorRequest, perkTaskRequest, sponzorshipRequest, $localStorage, userRequest, usSpinnerService, ngDialog, $rootScope, $firebaseArray, ratingRequest) {
    if ($rootScope.userValidation('0')) {
      $scope.noSponzorshipsMessage = false;
      $scope.loadingsponzorships = true;
      $scope.loadingsponzorshipstasks = true;
      $scope.noSponzorshipsTaskMessage = false;
      $scope.emailuser = $localStorage.email;
      $scope.userfroups = 0;
      $translate.use(idiomaselect);
      $scope.sendToRating = function(s) {
        sponzorshipRequest.oneSponzorship(s.id).success(function(sData) {
          ratingRequest.ratingBySponzorship(s.id, 0).success(function(s2Data) {
            $scope.loadingForm = false; //Loading
            $rootScope.closeAllDialogs(); //Close Loading
            if (s2Data.data.Rating[0] && s2Data.data.Rating[0].organizer_id === $localStorage.id) {
              $rootScope.showDialog('error', 'ratingAlreadyRated', false);
            } else {
              $location.path('/organizers/rating/' + s.id);
            }
          });
        });
      };
      //This function allows get sponzorship info from organizerId
      $scope.showSponzorInfo = function(sponzorId) {
        $rootScope.showLoading();
        userRequest.oneUser(sponzorId)
          .success(function(sData) {
            $rootScope.closeAllDialogs();
            $scope.user = sData.data;
            ngDialog.open({
              template: 'views/templates/userInfo.html',
              showClose: false,
              scope: $scope
            });
          }).error(function(eData) {
            $rootScope.closeAllDialogs();
            $rootScope.showDialog('error', 'canNotGetUserInfo', false);
          });
      };
      $scope.getSponzorshipsByOrganizer = function() {
        $scope.todayDate = new Date().getTime();
        sponzorshipRequest.oneSponzorshipByOrganizer($localStorage.id).success(function(data) {
          $scope.loadingsponzorships = false;
          $scope.noSponzorshipsMessage = false;
          $scope.loadingsponzorshipstasks = false;
          if (!data.SponzorsEvents[0]) {
            $scope.noSponzorshipsMessage = true;
            $scope.noSponzorshipsTaskMessage = true;
          } else {
            $scope.sponzorships = data.SponzorsEvents;
            if ($scope.sponzorships[0].status !== '0') {
              var timer = parseInt(parseInt($rootScope.getConstants().EVENTEXPIRATIONDAYS) * 24 * 60 * 60 * 1000);
              var aux = $scope.sponzorships.map(function(s) {
                s.ends = new Date(new Date(s.ends).getTime() + timer);
                return s;
              });
              $scope.sponzorships = aux;
              $scope.getTaskSponzor($scope.sponzorships[0].id); //Fit the tasks with the first sponzorships
            } else {
              $scope.noSponzorshipsTaskMessage = true;
            }
            $scope.sponzorships.current = $scope.sponzorships[0].id;
          }
        }).error(function(data) {

          $scope.noSponzorshipsMessage = true;
          $scope.noSponzorshipsTaskMessage = true;
        });
      };
      $scope.getSponzorship = function(sponzorshipId) {
        sponzorshipRequest.oneSponzorship(sponzorshipId).success(function(data) {
          $scope.currentSponzorship = data;
        });
      };
      //This function changes to 1 the sponzorship status
      $scope.acceptSponzorship = function(sponzoshipId, i) {
        $scope.loadingsponzorships = true;
        $scope.loadingsponzorshipstasks = true;
        var data = {
          status: 1
        };
        sponzorshipRequest.editSponzorshipPatch(sponzoshipId, data).success(function() {
          //We make the email Request
          var info = {
            sponzorEmail: $scope.sponzorships[i].email,
            sponzorName: $scope.sponzorships[i].name,
            eventName: $scope.sponzorships[i].title,
            organizerEmail: $localStorage.email,
            lang: idiomaselect
          };
          var notificationsRef = new Firebase($rootScope.getConstants().FURL + 'notifications');
          var notifications = $firebaseArray(notificationsRef);
          var notification = {
            to: $scope.sponzorships[i].sponzor_id,
            text: 'Your sponzorship by the event ' + $scope.sponzorships[i].title + ' has been approved.',
            link: '#/sponzors/sponzorships'
          };
          notifications.$add(notification);
          sponzorshipRequest.sendSponzorshipEmail(info).success(function() {});
          $scope.getSponzorshipsByOrganizer();
        }).error(function() {});
      };
      //This function changes to 0 the sponzorship status
      $scope.unacceptSponzorship = function(sponzoshipId) {
        $scope.loadingsponzorships = true;
        $scope.loadingsponzorshipstasks = true;
        var data = {
          status: 0
        };
        sponzorshipRequest.editSponzorshipPatch(sponzoshipId, data).success(function() {
          $scope.getSponzorshipsByOrganizer();
        }).error(function(eData) {

        });
      };
      //this function deletes an sponzorship if the status is 0
      $scope.deleteSponzorship = function(sponzorshipId) {
        $rootScope.showLoading();
        sponzorshipRequest.oneSponzorship(sponzorshipId).success(function(taskData) {
          angular.forEach(taskData.data.SponzorEvent.task_sponzor, function(value) {
            taskSponzorRequest.deleteTaskSponzor(value.id).success(function() {});
          });
          setTimeout(function() {
            sponzorshipRequest.deleteSponzorship(sponzorshipId).success(function() {
              $scope.getSponzorshipsByOrganizer();
              $rootScope.closeAllDialogs();
              $rootScope.showDialog('success', 'successDeletingSponzorship', false);
            }).error(function() {
              $rootScope.closeAllDialogs();
              $rootScope.showDialog('error', 'errorDeletingSponzorship', false);
            });
          }, 5000);
        });
      };
      //this function gets the tasks sponzorships by sponzorship id
      $scope.getTaskSponzor = function(sponzorshipId) {
        $scope.loadingsponzorshipstasks = true;
        $scope.noSponzorshipsTaskMessage = false;

        taskSponzorRequest.tasksBySponzorship(sponzorshipId).success(function(data) {
          $scope.tasksSponzor = [];
          angular.forEach(data.tasks, function(value) {
            if (value.type === '0') {
              $scope.tasksSponzor.push(value);
            }
          });
          $scope.loadingsponzorshipstasks = false;

          if (!$scope.tasksSponzor[0]) {
            $scope.noSponzorshipsTaskMessage = true;
          } else {
            $scope.noSponzorshipsTaskMessage = false;
          }

        }).error(function(data) {

          $scope.noSponzorshipsTaskMessage = true;
        });
        $scope.sponzorships.current = sponzorshipId;
      };
      //This function changes to 1 the sponzor task status
      $scope.completeTask = function(taskSponzorId) {
        var data = {
          status: 1
        };
        taskSponzorRequest.editTaskSponzorPatch(taskSponzorId, data).success(function() {
          $scope.getTaskSponzor($scope.sponzorships.current);
        }).error(function(eData) {

        });
      };
      //This function changes to 0 the sponzor task status
      $scope.uncompleteTask = function(taskSponzorId) {
        var data = {
          status: 0
        };
        taskSponzorRequest.editTaskSponzorPatch(taskSponzorId, data).success(function() {
          $scope.getTaskSponzor($scope.sponzorships.current);
        }).error(function(eData) {

        });
      };
      $scope.deleteTaskSponzor = function(taskSponzorId) {
        taskSponzorRequest.deleteTaskSponzor(taskSponzorId).success(function() {
          $scope.getTaskSponzor($scope.sponzorships.current);
        }).error(function(eData) {

        });
      };
      $scope.seeCause = function(sponzorship) {
        $scope.cause = sponzorship.cause;
        ngDialog.open({
          template: 'views/templates/sponzorshipCauseDialog.html',
          showClose: false,
          scope: $scope
        });
      };
      $scope.getSponzorshipsByOrganizer();
      $scope.menuprincipal = 'views/organizers/menu.html';
    }
  }
  angular.module('sponzorme')
    .controller('OrganizersSponzorshipsController', OrganizersSponzorshipsController);

})();

'use strict';
(function() {
  function OrganizersEventEditController($scope, $translate, $localStorage, eventTypeRequest, eventRequest, ngDialog, categoryRequest, perkRequest, perkTaskRequest, $location, $rootScope, $routeParams) {
    if($rootScope.userValidation('0')){
      $scope.loading = true;
      $rootScope.showLoading();
      eventTypeRequest.allEventTypes().success(function(adata) {
        $scope.type = {};
        $scope.type.list = adata.eventTypes;
        $scope.typefilter = adata.eventTypes;
      });
      $scope.categorias = {};
      categoryRequest.allCategories().success(function(adata) {
        $scope.categorias.list = adata.categories;
        $scope.categoriasfilter = adata.categories;
      });
      $scope.verifyPerkLimit = function(s) {
        if (s.usd > 200 || typeof s.usd === 'undefined') {
          s.usd = 200;
          $rootScope.showDialog('error', 'maxLimitPerk', false);
        }
      };
      //this function get the event data and put it in the form.
      $scope.formEditEvent = function(idevent) {
        $scope.eventData = {};
        eventRequest.oneEvent(idevent).success(function(adata) {
          $scope.eventData = adata.data.event;
          $scope.eventData.category = adata.data.category[0].id;
          $scope.eventData.type = adata.data.type[0].id;
          $scope.eventData.starts = new Date($scope.eventData.starts);
          $scope.eventData.ends = new Date($scope.eventData.ends);
          $scope.loading = false;
          $rootScope.closeAllDialogs();
        }).error(function() {
          $rootScope.closeAllDialogs();
          $rootScope.showDialog('error', 'errorNotEventInfoGot', false);
        });
      };
      $scope.doEditEvent = function(idevent) {
        $rootScope.showLoading();
        angular.forEach($scope.eventData.perks, function(value) {
          if (value.id === -1) { //If new perk was added we insert that
            $scope.perkitems = {};
            $scope.perkitems.kind = value.kind;
            $scope.perkitems.total_quantity = value.total_quantity;
            $scope.perkitems.reserved_quantity = 0;
            $scope.perkitems.usd = value.usd;
            $scope.perkitems.id_event = idevent;
            perkRequest.createPerk($scope.perkitems).success(function() {}).error(function(edata) {


            });
          } else { //If no perk was added just we edit the fields
            $scope.perkitems = value;
            perkRequest.editPerkPatch(value.id, $scope.perkitems).success(function() {
              /*empty Code, nothing necessary here*/
            }).error(function(eData) {


            });
          }
        });
        //Next we edit the event information
        $scope.eventData.starts = moment($scope.eventData.starts).format('YYYY-MM-DD HH:mm:ss');
        $scope.eventData.ends = moment($scope.eventData.ends).format('YYYY-MM-DD HH:mm:ss');
        eventRequest.editEventPatch(idevent, $scope.eventData).success(function() {
          $rootScope.closeAllDialogs();
          $rootScope.showDialog('success', 'eventEditedSuccesfully', false);
        }).error(function(edata) {
          $rootScope.showDialog('error', 'eventNoEdited', false);
        });
      };
      $scope.saveperks = function() {
        $scope.perkitems = {};
        $scope.perkitems.kind = $scope.perkskind;
        $scope.perkitems.total_quantity = $scope.perksquantity;
        $scope.perkitems.usd = $scope.perksusd;
        $scope.perkitems.id_event = $scope.perksevents;
        perkRequest.createPerk($scope.perkitems).success(function(pdata) {
          this.push(pdata);
        });
      };
      $scope.addEditPerk = function() {
        $scope.eventData.perks.push({
          kind: '',
          usd: 0,
          quantity: 1
        });
      };
      $scope.removeEditPerk = function(index) {
        $scope.eventData.perks.splice(index, 1);
      };
      $scope.formEditEvent($routeParams.id); //Here start the callback
      $translate.use(idiomaselect);
      $scope.menuprincipal = 'views/organizers/menu.html';
    }
  }
  angular.module('sponzorme')
    .controller('OrganizersEventEditController', OrganizersEventEditController);

})();

'use strict';
(function() {
  function OrganizersEventCreateController($scope, $translate, $localStorage, eventTypeRequest, eventRequest, ngDialog, categoryRequest, userRequest, perkRequest, $rootScope, $routeParams, eventbriteRequest) {
    //Function to parse JSON strings in JSON objects
    function jsonize(str) {
      return str.replace(/([\$\w]+)\s*:/g, function(_, $1) {
        return '"' + $1 + '":';
      }).replace(/'([^']+)'/g, function(_, $1) {
        return '"' + $1 + '"';
      });
    }
    if($rootScope.userValidation('0')){

      //Use This Zone to Vars Initialization
      $translate.use(idiomaselect);
      $scope.sponzorshipTypes = [];
      $scope.newEvent = {};
      eventTypeRequest.allEventTypes().success(function(adata) {
        $scope.type = {};
        $scope.type.list = adata.eventTypes;
        $scope.typefilter = adata.eventTypes;
      });
      $scope.categorias = {};
      categoryRequest.allCategories().success(function(adata) {
        $scope.categorias.list = adata.categories;
        $scope.categoriasfilter = adata.categories;
      });
      //End vars Initialization

      //This function very no perks over 200USD
      $scope.verifyPerkLimit = function(s) {
        if (s.usd > 200 || typeof s.usd === 'undefined') {
          s.usd = 200;
          $rootScope.showDialog('error', 'maxLimitPerk', false);
        }
      };

      //This function creates an event
      $scope.createNewEvent = function() {
        $scope.newEvent.title = $scope.titleevent;
        $scope.newEvent.location = $scope.locationevent.formatted_address;
        $scope.newEvent.location_reference = $scope.locationevent.place_id;
        $scope.newEvent.description = $scope.descriptionevent;
        $scope.newEvent.starts = moment($scope.dtini).format('YYYY-MM-DD HH:mm:ss');
        $scope.newEvent.ends = moment($scope.dtfinal).format('YYYY-MM-DD HH:mm:ss');
        //$scope.newEvent.starts = new Date($scope.dtini);
        //$scope.newEvent.ends = new Date($scope.dtfinal);
        $scope.newEvent.lang = idiomaselect;
        $scope.newEvent.type = $scope.typeevent;
        $scope.newEvent.category = $scope.categoryevent;
        $scope.newEvent.privacy = $scope.privacyevent;
        $scope.newEvent.organizer = $localStorage.id;
        eventRequest.createEvent($scope.newEvent).success(function(adata) {
          angular.forEach($scope.sponzorshipTypes, function(value) {
            $scope.perkitems = {};
            $scope.perkitems.kind = value.kind;
            $scope.perkitems.total_quantity = value.quantity;
            $scope.perkitems.usd = value.usd;
            $scope.perkitems.id_event = adata.event.id;
            $scope.perkitems.reserved_quantity = 0;
            perkRequest.createPerk($scope.perkitems).success(function() {});
          });
          //Clean the from
          $scope.titleevent = '';
          $scope.locationevent = {};
          $scope.descriptionevent = '';
          $scope.dtini = '';
          $scope.dtfinal = '';
          $scope.typeevent = '';
          $scope.categoryevent = '';
          $scope.privacyevent = '';
          $scope.sponzorshipTypes = [];
          $rootScope.closeAllDialogs();
          $rootScope.showDialog('success', 'eventCreatedSuccesfully', false);
        }).error(function(edata) {
          $rootScope.closeAllDialogs();
          $rootScope.showDialog('error', 'errorCreatingEvent', false);
        });
      };

      //this function upload or create the event Image
      $scope.imageVerification = function() {
        $rootScope.showLoading();
        $scope.loadingNewEvent = true;
        $scope.errorNewEvent = false;
        $scope.newEvent = {};
        if ($scope.file) {
          $scope.creds = {
            bucket: $rootScope.getConstants().AMAZONBUCKET,
            access_key: $rootScope.getConstants().AMAZONKEY,
            secret_key: $rootScope.getConstants().AMAZONSECRET
          };
          AWS.config.update({
            accessKeyId: $scope.creds.access_key,
            secretAccessKey: $scope.creds.secret_key
          });
          AWS.config.region = $rootScope.getConstants().AMAZONBUCKETREGION;
          var bucket = new AWS.S3({
            params: {
              Bucket: $scope.creds.bucket
            }
          });
          // Prepend Unique String To Prevent Overwrites
          var uniqueFileName = btoa($rootScope.uniqueString() + new Date().getTime() + $rootScope.uniqueString()).replace('=', $rootScope.uniqueString()) + '.' + $rootScope.getExtension($scope.file.name);
          var params = {
            Key: uniqueFileName,
            ContentType: $scope.file.type,
            Body: $scope.file,
            ServerSideEncryption: 'AES256'
          };
          bucket.putObject(params, function(err, data) {
            if (!err) {
              $scope.newEvent.image = $rootScope.getConstants().AMAZONBUCKETURL + uniqueFileName;
              $scope.createNewEvent();
            }
          });
        } else {
          //If no Image we set here some image
          $scope.newEvent.image = 'https://s3-us-west-2.amazonaws.com/sponzormewebappimages/event_default.jpg';
          $scope.createNewEvent();
        }
      };

      //this function adds a SponzorshipType to the new event form
      $scope.addSponzorshipType = function() {
        $scope.sponzorshipTypes.push({
          kind: '',
          usd: 0,
          quantity: 1,
          id: -1
        });
      };
      //this function removes a SponzorshipType to the new event form
      $scope.removeSponzorshipType = function(index) {
        $scope.sponzorshipTypes.splice(index, 1);
      };
      if ($routeParams.eventBriteCode) {
        eventbriteRequest.getEventbriteAuth($routeParams.eventBriteCode).success(function(data) {
          var response = JSON.parse(jsonize(data.response));
          if (response.error) {
            $scope.loadingGetToken = false;
            $scope.reconnectEventbrite = true;
            $scope.conectionDone = false;
          } else {
            $localStorage.eventBriteBeared = response.access_token;
            $scope.connectEventbrite();
          }
        });
      } else if ($routeParams.meetupCode) {

        eventbriteRequest.getMeetupAuth($routeParams.meetupCode).success(function(data) {
          var response = JSON.parse(jsonize(data.response));
          if (response.error) {

            $scope.meetupLoadingGetToken = false;
            $scope.reconnectMeetup = true;
            $scope.meetupConectionDone = false;
          } else {
            $localStorage.meetupBeared = response.access_token;

            $scope.connectMeetup();
          }
        });
      }
      $scope.connectMeetup = function() {

        $scope.meetupLoadingGetToken = true;
        $scope.loadingGetMeetupEvents = false;
        ngDialog.open({
          template: 'views/templates/importMeetupDialog.html',
          showClose: false,
          scope: $scope
        });
        if ($localStorage.meetupBeared) {
          $scope.meetupLoadingGetToken = false;
          $scope.loadingGetMeetupEvents = true;
          $scope.meetupConectionDone = true;
          $scope.getMeetupGroups($localStorage.meetupBeared);
        } else {
          $scope.meetupLoadingGetToken = false;
          $scope.loadingGetMeetupEvents = false;
          $scope.meetupConectionDone = false;
          eventbriteRequest.getMeetupAuth($routeParams.meetupBeared).success(function(data) {
            var response = JSON.parse(jsonize(data.response));
            if (response.error) {
              $scope.meetupLoadingGetToken = false;
              $scope.reconnectMeetup = true;
              $scope.meetupConectionDone = false;
            } else {
              $localStorage.meetupBeared = response.access_token;
              $scope.meetupLoadingGetToken = false;
              $scope.loadingGetMeetupEvents = true;
              $scope.meetupConectionDone = true;
              $scope.getMeetupGroups(response.access_token);
            }
          });
        }
      };
      $scope.EVENTBRITEAPYKEY = $rootScope.getConstants().EVENTBRITEAPYKEY;
      $scope.getEventbriteEvents = function(accessToken) {
        eventbriteRequest.getEventbriteEvents(accessToken)
          .success(function(data, head) {
            $scope.loadingGetEvents = false;
            $scope.evenbriteEvents = data.events;
          }).error(function(data) {
            $scope.loadingGetEvents = false;
            $scope.errorGettingEvents = true;
            $scope.evenbriteEvents = false;
          });
      };
      $scope.MEETUPAPIKEY = $rootScope.getConstants().MEETUPAPIKEY;
      $scope.MEETUPREDIRECTURL = $rootScope.getConstants().MEETUPREDIRECTURL;
      $scope.getMeetupGroups = function(accessToken) {

        eventbriteRequest.getMeetupGroups(accessToken)
          .success(function(data) {
            $scope.loadingGetMeetupEvents = false;

            $scope.meetupEvents = JSON.parse(data.response);

          }).error(function(data) {

            $scope.loadingGetMeetupEvents = false;
            $scope.errorGettingGroups = true;
            $scope.meetupEvents = false;
          });
      };
      $scope.connectEventbrite = function() {
        $scope.loadingGetToken = true;
        $scope.loadingGetEvents = false;
        ngDialog.open({
          template: 'views/templates/importEventbriteDialog.html',
          showClose: false,
          scope: $scope
        });
        if ($localStorage.eventBriteBeared) {
          $scope.loadingGetToken = false;
          $scope.loadingGetEvents = true;
          $scope.conectionDone = true;
          $scope.getEventbriteEvents($localStorage.eventBriteBeared);
        } else {
          $scope.loadingGetToken = false;
          $scope.loadingGetEvents = false;
          $scope.conectionDone = false;
          eventbriteRequest.getEventbriteAuth($routeParams.eventBriteCode).success(function(data) {
            var response = JSON.parse(jsonize(data.response));
            if (response.error) {
              $scope.loadingGetToken = false;
              $scope.reconnectEventbrite = true;
              $scope.conectionDone = false;
            } else {
              $localStorage.eventBriteBeared = response.access_token;

              $scope.loadingGetToken = false;
              $scope.loadingGetEvents = true;
              $scope.conectionDone = true;
              $scope.getEventbriteEvents(response.access_token);
            }
          });
        }
      };
      $scope.prefilEventForm = function(url) {
        eventbriteRequest.getEventbriteEvent(url, $localStorage.eventBriteBeared)
          .success(function(data) {
            //Prefill the form
            $scope.titleevent = data.name.text;
            $scope.descriptionevent = data.description.html;
            $scope.dtini = data.start.local;
            $scope.dtfinal = data.end.local;
            $scope.privacyevent = 0;
            $rootScope.closeAllDialogs();
          });
      };
      $scope.prefilEventFormMeetup = function(e) {
        $scope.titleevent = e.name;
        $scope.descriptionevent = e.description;
        $scope.dtini = e.time;
        $scope.dtfinal = new Date(e.time + (e.utc_offset * -1));
        $scope.privacyevent = 0;
        $rootScope.closeAllDialogs();
      };
      $scope.menuprincipal = 'views/organizers/menu.html';
    }
  }
  angular.module('sponzorme')
    .controller('OrganizersEventCreateController', OrganizersEventCreateController);

})();

'use strict';
(function() {
  function OrganizersRatingController($scope, $translate, userRequest, ngDialog, $location, $rootScope, $localStorage, $routeParams, sponzorshipRequest, ratingRequest, $timeout) {
    if ($rootScope.userValidation('0') && $routeParams.sponzorshipId) {
      $scope.loadingForm = true; //Loading
      $rootScope.showLoading();
      sponzorshipRequest.oneSponzorship($routeParams.sponzorshipId)
        .success(function(sData) {
          ratingRequest.ratingBySponzorship($routeParams.sponzorshipId, 0)
            .success(function(s2Data) {
              $scope.loadingForm = false; //Loading
              $rootScope.closeAllDialogs(); //Close Loading
              if (s2Data.data.Rating[0] && s2Data.data.Rating[0].organizer_id === $localStorage.id) {
                $rootScope.showDialog('error', 'ratingAlreadyRated', '/organizers/sponzors');
              } else {
                $scope.sponzorship = sData.data;
                $scope.rating = {
                  'sponzorship_id': sData.data.SponzorEvent.id,
                  'type': 0,
                  'sponzor_id': sData.data.Sponzor.id,
                  'organizer_id': sData.data.Organizer.id,
                  'other': ''
                };
              }
            });
        }).error(function(eData) {
          $scope.loadingForm = false; //Loading
          $rootScope.closeAllDialogs(); //Close Loading
          $rootScope.showDialog('error', 'requestedSponzorshipNoExist', false);
        });
      $scope.saveRating = function() { //Finally we save the rating information
        $rootScope.showLoading();
        if ($scope.rating.other) {
          $scope.rating.question5 = 'Other: ' + $scope.rating.other;
        }
        ratingRequest.createRating($scope.rating).success(function(sData) {
          $scope.rating = {};
          $rootScope.closeAllDialogs(); //Close Loading
          $rootScope.showDialog('success', 'ratingOrganizerSuccess', '/organizers/sponzors');
        }).error(function(eData) {
          $scope.loadingForm = false; //Loading
          $rootScope.closeAllDialogs(); //Close Loading
          $rootScope.showDialog('error', 'invalidRateInfo', false);
        });
      };
      $scope.menuprincipal = 'views/organizers/menu.html';
    }
  }

  angular.module('sponzorme')
    .controller('OrganizersRatingController', OrganizersRatingController);

})();

'use strict';
(function() {
  function NotificationController($scope, $translate, $localStorage, $location, $firebaseArray, $rootScope) {
    if($localStorage.id){
      $scope.help = 0;
      var notificationsRef = new Firebase($rootScope.getConstants().FURL + 'notifications');
      var query = notificationsRef.orderByChild('to').equalTo($localStorage.id).limitToLast(25);
      $scope.notifications = $firebaseArray(query);
      $scope.notifications.$loaded().then(function() {
        $scope.help = $scope.notifications.length;
      });
      notificationsRef.orderByChild('to').equalTo($localStorage.id).on('child_added', function() {
        $scope.help++;
      });
      notificationsRef.orderByChild('to').equalTo($localStorage.id).on('child_removed', function() {
        $scope.help--;
      });
    }
  }
  angular.module('sponzorme')
    .controller('NotificationController', NotificationController);
})();

'use strict';
(function() {
  function ChatController($scope, ngDialog, $firebaseArray, $localStorage, $location, $routeParams, sponzorshipRequest) {
    if($localStorage.id){
      $scope.$storage = $localStorage;
        sponzorshipRequest.oneSponzorship($routeParams.sponzorshipId).success(function(data){
          if(data.data.Organizer.id === $localStorage.id){
            $scope.newMessage = {
              'author': data.data.Organizer.name,
              'color': '#5DDECF',
              'sponzorshipId': $routeParams.sponzorshipId
            };
          }
          else if(data.data.Sponzor.id === $localStorage.id){
            $scope.newMessage = {
              'author': data.data.Sponzor.name,
              'color': '#F6CECE',
              'sponzorshipId': $routeParams.sponzorshipId
            };
          }
          else{
            $location.path('/');
          }
        });
      var ref = new Firebase($rootScope.getConstants().FURL + 'chat');
      var query = ref.orderByChild('sponzorshipId').equalTo($routeParams.sponzorshipId);
      $scope.chatMessages = $firebaseArray(query);
      $scope.addMessage = function() {
        if ($scope.newMessage.text) {
          $scope.newMessage.userImage = $localStorage.image;
          $scope.newMessage.timedate = new Date().getTime();
          $scope.chatMessages.$add($scope.newMessage);
          $scope.newMessage.text = '';
        }
      };
    }
    else{
      $location.path('/');
    }
    if($localStorage.typesponzorme === '1'){
      $scope.menuprincipal = 'views/sponzors/menu.html';
    }
    else if($localStorage.typesponzorme === '0'){
      $scope.menuprincipal = 'views/organizers/menu.html';
    }
    else{
      $location.path('/');
    }
  }

  angular.module('sponzorme')
    .controller('ChatController', ChatController);
})();

'use strict';
(function() {
  function ProfileController($scope, ngDialog, $localStorage, $location, $routeParams, userRequest, ratingRequest, $timeout, $rootScope) {
    $rootScope.closeAllDialogs();
    $scope.loading = true;
    $rootScope.showLoading();
    userRequest.oneUser($routeParams.userId).success(function(userData) {
      $scope.user = userData.data.user;
      $scope.user.rating = userData.data.rating;
      if (userData.data.user.type === '0') {
        ratingRequest.ratingsByOrganizer($routeParams.userId).success(function(ratingsData) {
          $scope.ratings = ratingsData.data.Rating;
          $scope.loading = false;
          $rootScope.closeAllDialogs();
        }).error(function(){
          $rootScope.closeAllDialogs();
          $rootScope.showDialog('error', 'problem', '/');
        });
      } else if (userData.data.user.type === '1') {
        ratingRequest.ratingsBySponzor($routeParams.userId).success(function(ratingsData) {
          $scope.ratings = ratingsData.data.Rating;
          $scope.loading = false;
          $rootScope.closeAllDialogs();
        }).error(function(){
          $rootScope.closeAllDialogs();
          $rootScope.showDialog('error', 'problem', '/');
        });
      }
      else{
        $rootScope.closeAllDialogs();
        $rootScope.showDialog('error', 'problem', '/');
      }
    }).error(function(){
      $rootScope.closeAllDialogs();
      $rootScope.showDialog('error', 'problem', '/');
    });
  }
  angular.module('sponzorme')
    .controller('ProfileController', ProfileController);
})();

'use strict';
(function() {

  function DialogController($scope, $translate, ngDialog, $location, $timeout, $localStorage) {
    $scope.close = function(redirect){
      $location.path(redirect);
      ngDialog.closeAll();
    };
    $scope.closeLoading = function(){
      $location.path('/');
    };
    $scope.delayed = false;
    $timeout(function() {
        $scope.delayed = true;
      }, 5000
    );

  }
  angular.module('sponzorme')
    .controller('DialogController', DialogController);
})();
