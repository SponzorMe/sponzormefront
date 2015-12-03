'use strict';
var idiomaselect = 'en'; //Default Language
var apiPath = 'http://apistaging.sponzor.me/'; //API path
var imgurPath = 'https://api.imgur.com/3/image'; //API path
var expirationTime = 1;
(function() {
  angular.module('sponzorme', [
      'pascalprecht.translate',
      'ngResource',
      'ngRoute',
      'userService',
      'loginService',
      'ngDialog',
      'base64',
      'ngCookies',
      'ngStorage',
      'ui.bootstrap',
      'eventTypeService',
      'categoryService',
      'google.places',
      'eventService',
      'rssService',
      'perkService',
      'taskSponzorService',
      'perkTaskService',
      'sponzorshipService',
      'angularSpinner',
      'allInterestsService',
      'userInterestService',
      'userCategoryService',
      'naif.base64',
      'imgurService',
      'angularUtils.directives.dirPagination',
      'ui.bootstrap.datetimepicker',
      'firebase',
      'textAngular'
    ])
    .constant('URL', 'http://apistaging.sponzor.me/')
    .constant('XOOMRATE', parseFloat(4.99))
    .constant('FEE', parseFloat(0.1))
    .constant('PAYPALCOMPLETERETURNURL', 'http://localhost:9000/#/sponzors/sponzoring')
    .constant('PAYPALIPNRETURNURL', 'http://apistaging.sponzor.me/ipn')
    .constant('PAYPALEMAIL', 'ing.carlosandresrojas@gmail.com')
    .constant('FURL', 'https://sponzorme.firebaseio.com/')
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
        .when('/testimonials', {
          templateUrl: 'views/testimonials.html',
          controller: 'HomeController'
        })
        .when('/privacy', {
          templateUrl: 'views/privacy.html',
          controller: 'HomeController'
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
        .when('/about', {
          templateUrl: 'views/about.html'
        })
        .when('/support', {
          templateUrl: 'views/support.html'
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
        .otherwise({
          redirectTo: '/login'
        });
    }])
    /*
     * Author: Sebastian Gomez
     * This function allows change the language whatever be the route
     * for this reason this is a global function
     */
    .run(['$rootScope', '$translate', '$location', 'allInterestsServiceRequest', '$filter', '$localStorage', 'userRequest', function($rootScope, $translate, $location, allInterestsServiceRequest, $filter, $localStorage, userRequest) {
      $rootScope.changeLanguage = function(key) {
        $translate.use(key);
        idiomaselect = key;
      };
      $rootScope.currentLanguage = function(key) {
        return $translate.use();
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
      $rootScope.userValidation = function(shouldType) {
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
        } else {
          $location.path('/login');
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
    });
})();
