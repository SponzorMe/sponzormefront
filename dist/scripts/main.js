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

'use strict';
var idiomaselect = 'en'; //Default Language
var apiPath = 'http://api.sponzor.me/'; //API path
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
    'ui.bootstrap.datetimepicker'
  ]).config(['$translateProvider', function($translateProvider) {
    $translateProvider.useStaticFilesLoader({
      prefix: 'langs/lang-',
      suffix: '.json'
    });

    $translateProvider.useSanitizeValueStrategy('escaped');

    $translateProvider.preferredLanguage('en');

    $translateProvider.fallbackLanguage('en');

    // End Languages
  }])

  .config(['usSpinnerConfigProvider', function(usSpinnerConfigProvider) {
      usSpinnerConfigProvider.setDefaults({
        color: '#042333'
      });
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
        .otherwise({
          redirectTo: '/'
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
          console.log('Not Authenticated');
          $location.path('/');
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
    })
    .filter('momentFormater', function() {
      return function(input) {
        if (!input) {
          return '';
        }
        var auxDate = new Date(input);
        input = moment(auxDate).format('MMM DD YYYY, HH:mm');
        return input;
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

	function categoryRequest($http, $localStorage) {
		var token = $localStorage.token;
		return {
			/**
			* Get all categories
			* @returns success(function(data, status, headers, config)
			*/
			allCategories: function(){
				return $http.get(apiPath + 'categories');

			},
			/**
			* Get Category By Id
			* @param {JSON} categoryId
			* @returns success(function(data, status, headers, config)
			*/
			oneCategory: function(categoryId){
				return $http.get(apiPath + 'categories/' + categoryId);

			},
			createCategory: function(data){
				return $http({
					method: 'POST',
					url: apiPath + 'categories',
					headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic ' + token},
					data: $.param(data)
				});
			},
			deleteCategory: function(categoryId){
				return $http({
					method: 'DELETE',
					url: apiPath + 'categories/' + categoryId,
					headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic ' + token}
				});
			},
			editCategoryPatch: function(categoryId, data){
				return $http({
					method: 'PATCH',
					url: apiPath + 'categories/' + categoryId,
					headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic ' + token},
					data: $.param(data)
				});
			},
			editCategoryPut: function(categoryId, data){
				return $http({
					method: 'PUT',
					url: apiPath + 'categories/' + categoryId,
					headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic ' + token},
					data: $.param(data)
				});
			}
		};
	}
	angular.module('categoryService', ['ngStorage'])
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

	function eventRequest($http, $localStorage) {
		var token = $localStorage.token;
		return {
			allEvents: function(){
				return $http.get(apiPath + 'events');

			},
			oneEvent: function(EventId){
				return $http.get(apiPath + 'events/' + EventId);

			},
			createEvent: function(data){
				return $http({
					method: 'POST',
					url: apiPath + 'events',
					headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic ' + token},
					data: $.param(data)
				});
			},
			createEventToken: function(data, newUserToken){
				return $http({
					method: 'POST',
					url: apiPath + 'events',
					headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic ' + newUserToken},
					data: $.param(data)
				});
			},
			deleteEvent: function(EventId){
				return $http({
					method: 'DELETE',
					url: apiPath + 'events/' + EventId,
					headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic ' + token}
				});
			},
			editEventPatch: function(EventId, data){
				return $http({
					method: 'PATCH',
					url: apiPath + 'events/' + EventId,
					headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic ' + token},
					data: $.param(data)
				});
			},
			editEventPut: function(EventId, data){
				return $http({
					method: 'PUT',
					url: apiPath + 'events/' + EventId,
					headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic ' + token},
					data: $.param(data)
				});
			}
		};
	}
	angular.module('eventService', ['ngStorage'])
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

	function eventTypeService($http, $localStorage) {
		var token = $localStorage.token;
		return {
			allEventTypes: function(){
				return $http.get(apiPath + 'event_types');

			},
			oneEventTypes: function(eventTypeId){
				return $http.get(apiPath + 'event_types/' + eventTypeId);

			},
			createEventType: function(data){
				return $http({
					method: 'POST',
					url: apiPath + 'event_types',
					headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic ' + token},
					data: $.param(data)
				});
			},
			deleteEventType: function(eventTypeId){
				return $http({
					method: 'DELETE',
					url: apiPath + 'event_types/' + eventTypeId,
					headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic ' + token}
				});
			},
			editEventTypePatch: function(eventTypeId, data){
				return $http({
					method: 'PATCH',
					url: apiPath + 'event_types/' + eventTypeId,
					headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic ' + token},
					data: $.param(data)
				});
			},
			editEventTypePut: function(eventTypeId, data){
				return $http({
					method: 'PUT',
					url: apiPath + 'event_types/' + eventTypeId,
					headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic ' + token},
					data: $.param(data)
				});
			}
		};
	}
	angular.module('eventTypeService', ['ngStorage'])
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

	function allInterestsServiceRequest($http, $localStorage) {
		var token = $localStorage.token;
		return {
			allInterestsCategoriesId: function(){
				return $http.get(apiPath + 'interests_category');

			},
			oneInterestsCategory: function(interestsCategoryId){
				return $http.get(apiPath + 'interests_category/' + interestsCategoryId);

			},
			createInterestsCategory: function(data){
				return $http({
					method: 'POST',
					url: apiPath + 'interests_category',
					headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic ' + token},
					data: $.param(data)
				});
			},
			deleteInterestsCategory: function(interestsCategoryId){
				return $http({
					method: 'DELETE',
					url: apiPath + 'interests_category/' + interestsCategoryId,
					headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic ' + token}
				});
			},
			editInterestsCategoryPatch: function(interestsCategoryId, data){
				return $http({
					method: 'PATCH',
					url: apiPath + 'interests_category/' + interestsCategoryId,
					headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic ' + token},
					data: $.param(data)
				});
			},
			editInterestsCategoryPut: function(interestsCategoryId, data){
				return $http({
					method: 'PUT',
					url: apiPath + 'interests_category/' + interestsCategoryId,
					headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic ' + token},
					data: $.param(data)
				});
			}
		};
	}
	angular.module('allInterestsService', ['ngCookies'])
		.factory('allInterestsServiceRequest', allInterestsServiceRequest);
})();

/**
* @Servicio de Login
*
* @author Sebastian
* @version 0.1
*/
'use strict';
(function(){

	function loginRequest($http) {
		return {
			/**
			* Login function return the user info if the credentials match
			* @param {JSON} credentials.email
			* @param {JSON} credentials.password
			* @returns success(function(data, status, headers, config)
			*/
			login: function(credentials){
				var data = {'email': credentials.email, 'password': credentials.password};
				return $http({
					method: 'POST',
					url: apiPath + 'auth',
					headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
					data: $.param(data)
				});
			},
			resetPassword: function(email){
				var data = {'email': email};
				return $http({
					method: 'POST',
					url: apiPath + 'send_reset_password',
					headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
					data: $.param(data)
				});
			},
			tryActivation: function(token){
				return $http.get(apiPath + 'verify_activation/' + token);
			},
			resendActivation: function(email){
				var data = {'email': email};
				return $http({
					method: 'POST',
					url: apiPath + 'send_activation',
					headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
					data: $.param(data)
				});
			},
			updatePassword: function(token, data){
				console.log(token);
				return $http({
					method: 'POST',
					url: apiPath + 'update_password/' + token,
					headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
					data: $.param(data)
				});
			}
		};
	}
	angular.module('loginService', [])
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

	function perkRequest($http, $localStorage) {
		var token = $localStorage.token;
		return {
			allPerks: function(){
				return $http.get(apiPath + 'perks');

			},
			onePerk: function(perkId){
				return $http.get(apiPath + 'perks/' + perkId);

			},
			createPerk: function(data){
				return $http({
					method: 'POST',
					url: apiPath + 'perks',
					headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic ' + token},
					data: $.param(data)
				});
			},
			createPerkToken: function(data, newUserToken){
				return $http({
					method: 'POST',
					url: apiPath + 'perks',
					headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic ' + newUserToken},
					data: $.param(data)
				});
			},
			deletePerk: function(perkId){
				return $http({
					method: 'DELETE',
					url: apiPath + 'perks/' + perkId,
					headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic ' + token}
				});
			},
			editPerkPatch: function(perkId, data){
				return $http({
					method: 'PATCH',
					url: apiPath + 'perks/' + perkId,
					headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic ' + token},
					data: $.param(data)
				});
			},
			editPerkPut: function(perkId, data){
				return $http({
					method: 'PUT',
					url: apiPath + 'perks/' + perkId,
					headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic ' + token},
					data: $.param(data)
				});
			}
		};
	}
	angular.module('perkService', ['ngStorage'])
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

	function perkTaskRequest($http, $localStorage) {
		var token = $localStorage.token;
		return {
			allPerkTasks: function(){
				return $http.get(apiPath + 'perk_tasks');

			},
			onePerkTask: function(perkTaskId){
				return $http.get(apiPath + 'perk_tasks/' + perkTaskId);

			},
			createPerkTask: function(data){
				return $http({
					method: 'POST',
					url: apiPath + 'perk_tasks',
					headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic ' + token},
					data: $.param(data)
				});
			},
			deletePerkTask: function(perkTaskId){
				return $http({
					method: 'DELETE',
					url: apiPath + 'perk_tasks/' + perkTaskId,
					headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic ' + token}
				});
			},
			editPerkTaskPatch: function(perkTaskId, data){
				return $http({
					method: 'PATCH',
					url: apiPath + 'perk_tasks/' + perkTaskId,
					headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic ' + token},
					data: $.param(data)
				});
			},
			editPerkTaskPut: function(perkTaskId, data){
				return $http({
					method: 'PUT',
					url: apiPath + 'perk_tasks/' + perkTaskId,
					headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic ' + token},
					data: $.param(data)
				});
			}
		};
	}
	angular.module('perkTaskService', ['ngStorage'])
		.factory('perkTaskRequest', perkTaskRequest);
})();

/**
* @Servicio de Sponzorships (Beneficios)
*
* @author Sebastian
* @version 0.1
*/
'use strict';
(function(){

	function sponzorshipRequest($http, $localStorage) {
		var token = $localStorage.token;
		return {
			allSponzorships: function(){
				return $http.get(apiPath + 'sponzorships');

			},
			oneSponzorship: function(sponzorshipId){
				return $http.get(apiPath + 'sponzorships/' + sponzorshipId);

			},
			oneSponzorshipByOrganizer: function(organizerId){
				return $http.get(apiPath + 'sponzorships_organizer/' + organizerId);
			},
			oneSponzorshipBySponzor: function(sponzorId){
				return $http.get(apiPath + 'sponzorships_sponzor/' + sponzorId);
			},
			sendSponzorshipEmail: function(data){
				return $http({
					method: 'POST',
					url: apiPath + 'sponzorship_email',
					headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic ' + token},
					data: $.param(data)
				});
			},
			createSponzorship: function(data){
				return $http({
					method: 'POST',
					url: apiPath + 'sponzorships',
					headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic ' + token},
					data: $.param(data)
				});
			},
			createSponzorshipToken: function(data, userToken){
				return $http({
					method: 'POST',
					url: apiPath + 'sponzorships',
					headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic ' + userToken},
					data: $.param(data)
				});
			},
			deleteSponzorship: function(sponzorshipId){
				return $http({
					method: 'DELETE',
					url: apiPath + 'sponzorships/' + sponzorshipId,
					headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic ' + token}
				});
			},
			editSponzorshipPatch: function(sponzorshipId, data){
				return $http({
					method: 'PATCH',
					url: apiPath + 'sponzorships/' + sponzorshipId,
					headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic ' + token},
					data: $.param(data)
				});
			},
			editSponzorshipPut: function(sponzorshipId, data){
				return $http({
					method: 'PUT',
					url: apiPath + 'sponzorships/' + sponzorshipId,
					headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic ' + token},
					data: $.param(data)
				});
			}
		};
	}
	angular.module('sponzorshipService', ['ngStorage'])
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

	function taskSponzorRequest($http, $localStorage) {
		var token = $localStorage.token;
		return {
			allTaskSponzor: function(){
				return $http.get(apiPath + 'task_sponzor');

			},
			oneTaskSponzor: function(taskSponzorId){
				return $http.get(apiPath + 'task_sponzor/' + taskSponzorId);

			},
			tasksBySponzorship: function(sponzorshipId){
				return $http.get(apiPath + 'perk_tasks_sponzorship/' + sponzorshipId);
			},
			createTaskSponzor: function(data){
				return $http({
					method: 'POST',
					url: apiPath + 'task_sponzor',
					headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic ' + token},
					data: $.param(data)
				});
			},
			createTaskSponzorToken: function(data, userToken){
				return $http({
					method: 'POST',
					url: apiPath + 'task_sponzor',
					headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic ' + userToken},
					data: $.param(data)
				});
			},
			deleteTaskSponzor: function(taskSponzorId){
				return $http({
					method: 'DELETE',
					url: apiPath + 'task_sponzor/' + taskSponzorId,
					headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic ' + token}
				});
			},
			editTaskSponzorPatch: function(taskSponzorId, data){
				return $http({
					method: 'PATCH',
					url: apiPath + 'task_sponzor/' + taskSponzorId,
					headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic ' + token},
					data: $.param(data)
				});
			},
			editTaskSponzorPut: function(taskSponzorId, data){
				return $http({
					method: 'PUT',
					url: apiPath + 'task_sponzor/' + taskSponzorId,
					headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic ' + token},
					data: $.param(data)
				});
			}
		};
	}
	angular.module('taskSponzorService', ['ngStorage'])
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

	function userCategoryRequest($http, $cookies) {
		var token = $cookies.get('token');
		return {
			allUserCategories: function(){
				return $http.get(apiPath + 'user_categories');
			},
			oneUserCategory: function(userCategoryId){
				return $http.get(apiPath + 'user_categories/' + userCategoryId);
			},
			createUserCategory: function(data){
				return $http({
					method: 'POST',
					url: apiPath + 'user_categories',
					headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic ' + token},
					data: $.param(data)
				});
			},
			deleteUserCategory: function(userCategoryId){
				return $http({
					method: 'DELETE',
					url: apiPath + 'user_categories/' + userCategoryId,
					headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic ' + token}
				});
			},
			editUserCategoryPatch: function(userCategoryId, data){
				return $http({
					method: 'PATCH',
					url: apiPath + 'user_categories/' + userCategoryId,
					headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic ' + token},
					data: $.param(data)
				});
			},
			editUserCategoryPut: function(userCategoryId, data){
				return $http({
					method: 'PUT',
					url: apiPath + 'user_categories/' + userCategoryId,
					headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic ' + token},
					data: $.param(data)
				});
			}
		};
	}
	angular.module('userCategoryService', ['ngCookies'])
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

	function userInterestRequest($http, $localStorage) {
		var token = $localStorage.token;
		return {
			allUserInterests: function(){
				return $http.get(apiPath + 'user_interests');
			},
			oneUserInterest: function(userInterestId){
				return $http.get(apiPath + 'user_interests/' + userInterestId);
			},
			createUserInterest: function(data){
				return $http({
					method: 'POST',
					url: apiPath + 'user_interests',
					headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic ' + token},
					data: $.param(data)
				});
			},
			deleteUserInterest: function(userInterestId){
				return $http({
					method: 'DELETE',
					url: apiPath + 'user_interests/' + userInterestId,
					headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic ' + token}
				});
			},
			editUserInterestPatch: function(userInterestId, data){
				return $http({
					method: 'PATCH',
					url: apiPath + 'user_interests/' + userInterestId,
					headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic ' + token},
					data: $.param(data)
				});
			},
			editUserInterestPut: function(userInterestId, data){
				return $http({
					method: 'PUT',
					url: apiPath + 'user_interests/' + userInterestId,
					headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic ' + token},
					data: $.param(data)
				});
			}
		};
	}
	angular.module('userInterestService', ['ngCookies'])
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

	function userRequest($http, $localStorage) {

		return {
			allUsers: function(){
				return $http.get(apiPath + 'users');
			},
			oneUser: function(userId){
				var token = $localStorage.token;
				$http.defaults.headers.common.Authorization = 'Basic ' + token;
				return $http.get(apiPath + 'users/' + userId);

			},
			createUser: function(data){
				var token = 'b3JnYW5pemVyQHNwb256b3IubWU6c3Bvbnpvcm1l';
				return $http({
					method: 'POST',
					url: apiPath + 'users',
					headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic ' + token},
					data: $.param(data)
				});
			},
			deleteUser: function(userId){
				var token = $localStorage.token;
				return $http({
					method: 'DELETE',
					url: apiPath + 'users/' + userId,
					headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic ' + token}
				});
			},
			editUserPatch: function(userId, data){
				var token = $localStorage.token;
				return $http({
					method: 'PATCH',
					url: apiPath + 'users/' + userId,
					headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic ' + token},
					data: $.param(data)
				});
			},
			editUserPut: function(userId, data){
				var token = $localStorage.token;
				return $http({
					method: 'PUT',
					url: apiPath + 'users/' + userId,
					headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic ' + token},
					data: $.param(data)
				});
			},
			invitedUser: function(data){
				var token = $localStorage.token;
				return $http({
					method: 'POST',
					url: apiPath + 'invite_friend/',
					headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic ' + token},
					data: $.param(data)
				});
			}
		};
	}

	angular.module('userService', ['ngStorage'])
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
			},
      rssAjax: function(lang){
        $.ajax({
          url: document.location.protocol + '//ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=10&callback=?&q=' + encodeURIComponent('http://blog' + lang + '.sponzor.me/feeds/posts/default'),
          dataType: 'json'
        });
      }
    };
	}
	angular.module('rssService', ['ngStorage'])
		.factory('rssRequest', rssRequest);
})();

/**
* @Servicio de Perks (Beneficios)
*
* @author Sebastian
* @version 0.1
*/
'use strict';
(function(){

	function imgurRequest($http) {
    var clientId = 'bdff09d775f47b9'; //Private API Cliente Id for imgur
		return {
			uploadImage: function(data){
				return $http({
					method: 'POST',
					url: imgurPath,
          headers: {
              'Authorization': 'Client-ID ' + clientId
          },
					data: data
				});
			}
		};
	}
	angular.module('imgurService', [])
		.factory('imgurRequest', imgurRequest);
})();

'use strict';
(function() {

  function HomeController($scope, $translate, $localStorage, $location) {
     if ($localStorage.typesponzorme === '1') {
        $location.path('/sponzors/dashboard');
      } else if($localStorage.typesponzorme === '0') {
        $location.path('/organizers/dashboard');
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
  function EventPageController($scope, $routeParams, $translate, $localStorage, $location, eventRequest, ngDialog, sponzorshipRequest, perkRequest, taskSponzorRequest, $rootScope) {
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
        template: 'formCreateSponzorship',
        scope: $scope
      });
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
      ngDialog.closeAll();
      ngDialog.open({
        template: 'loading'
      });
      sponzorshipRequest.createSponzorship(data, $localStorage.token).success(function(sData) {
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
            taskSponzorRequest.createTaskSponzor(taskSponzor, $localStorage.token).success(function() {});
          });
          ngDialog.closeAll();
          ngDialog.open({
            template: 'SponzorshipComplete'
          });
          $location.path('/sponzors/following'); //redirection to Following page
        }).error(function(eData) {
          console.log(eData);
        });
      }).error(function(eData) {
        console.log(eData);
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
        console.log(adata);
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
        console.log($routeParams.tokenReset);
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

  function LoginController($scope, $translate, loginRequest, $base64, $sessionStorage, $localStorage, $location, usSpinnerService, ngDialog) {

    $localStorage.$reset();

    $scope.sendfrom = function() {
      if ($scope.email !== undefined || $scope.password !== undefined) {
        $scope.objuser = {};
        $scope.objuser.email = $scope.email;
        $scope.objuser.password = $scope.password;
        $scope.objuser.password_confirmation = $scope.passwordtwo;
        $scope.objuser.lang = idiomaselect;
        $scope.loagind = true;
        ngDialog.open({template: 'views/templates/loadingDialog.html', showClose: false});
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
            $scope.$storage = $localStorage;
            idiomaselect = adata.user.lang;

            $scope.loagind = false;
            if (adata.user.type === '1') {
              $location.path('/sponzors/dashboard');
            } else {
              $location.path('/organizers/dashboard');
            }
            ngDialog.closeAll();
          } else {
            $scope.loagind = false;
            ngDialog.closeAll();
            $scope.message = 'unactivatedAccount';
            ngDialog.open({
              template: 'views/templates/unactivatedAccountDialog.html',
              showClose: false,
              scope: $scope
            });
          }

        }).error(function() {
          $scope.loagind = false;
          ngDialog.closeAll();
          $scope.message = 'invalidCredentials';
          ngDialog.open({
            template: 'views/templates/errorDialog.html',
            showClose: false,
            scope: $scope
          });
        });
      }
    };
  }

  angular.module('sponzorme')
    .controller('LoginController', LoginController);

})();

'use strict';
(function(){

function LogoutController($scope, $translate, $sessionStorage, $location, $localStorage) {

  $localStorage.$reset();

  $location.path('/');
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
(function(){

function CustomizationController($scope, $translate, $localStorage, usSpinnerService, userRequest, allInterestsServiceRequest, categoryRequest, userInterestRequest, $location) {

  $scope.loadinglistsponzors = true;
  $scope.userData = {};
  $scope.categories = [];
  $scope.interestselectarray = [];
  $scope.step1 = true;
  $scope.step4 = false;
  $scope.$storage = $localStorage;
  $scope.email = $localStorage.email;
  $scope.id = $localStorage.id;
  $scope.newUser = $localStorage.newUser;
  categoryRequest.allCategories().success(function(adata) {
    $scope.categories = adata.categories;
    allInterestsServiceRequest.allInterestsCategoriesId().success(function(sData) {
      $scope.interests = sData.InterestCategory;
      var log = [];
      angular.forEach($scope.categories, function(value) {
        value.interests = $scope.interests.filter(function(el) {
          return el.category_id === value.id;
        });
      }, log);

    });
  });
  $scope.sendfrom = function() {
    $scope.objuser = {};
    $scope.objuser.age = $scope.userData.age;
    $scope.objuser.sex = $scope.userData.sex;
    $scope.objuser.lang = $scope.userData.lang;
    $scope.objuser.location = $scope.userData.location.reference;
    $scope.loagind = true;
    userRequest.editUserPatch($localStorage.id, $scope.objuser).success(function(adata) {
      if (adata.message === 'Updated') {
        var datuser = JSON.stringify(adata.User);
        $localStorage.sponzorme = datuser;
        $scope.loagind = false;
        $scope.step1 = false;
        $scope.step2 = true;
        $scope.step4 = false;
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
    $scope.loagind = true;
    angular.forEach($scope.interestselectarray, function(valuep) {
      $scope.itemintere = {};
      $scope.itemintere.interest_id = valuep;
      $scope.itemintere.user_id = $localStorage.id;
      userInterestRequest.createUserInterest($scope.itemintere).success(function() {
          $localStorage.$reset();
      });
    });
    $scope.loagind = false;
    $scope.step1 = false;
    $scope.step2 = false;
    $scope.step4 = true;
  };
}

angular.module('sponzorme')
.controller('CustomizationController', CustomizationController);

})();

'use strict';
(function() {

  function SponzorsCreateController($scope, $translate, userRequest, ngDialog, $location, usSpinnerService, $localStorage, eventRequest, perkRequest) {

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
          ngDialog.open({template: 'views/templates/loadingDialog.html', showClose: false});
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
                    perkRequest.createPerkToken(value, btoa($scope.email + ':' + $scope.passwordone)).success(function() {
                      /*Empty Code, nothing necessary here*/
                    }).error(function(eData) {
                      console.log('Error creating a perk');
                      console.log(eData);
                    });
                  });
                  $scope.loagind = false;
                  $location.path('/customization');
                  ngDialog.closeAll();
                }).error(function(eData) {
                  console.log('Error demo event');
                  console.log(eData);
                });
              } else if (idiomaselect === 'es') {
                event_es.DEFAULT_EVENT.organizer = adata.User.id;
                eventRequest.createEventToken(event_es.DEFAULT_EVENT, btoa($scope.email + ':' + $scope.passwordone)).success(function(sData) {
                  angular.forEach(event_es.PERKS, function(value) {
                    value.id_event = sData.event.id;
                    perkRequest.createPerkToken(value, btoa($scope.email + ':' + $scope.passwordone)).success(function() {
                      /*Empty Code, nothing necessary here*/
                    }).error(function(eData) {
                      console.log('Error creating a perk');
                      console.log(eData);
                    });

                  });
                  $scope.loagind = false;
                  $location.path('/customization');
                  ngDialog.closeAll();
                }).error(function(eData) {
                  console.log('Error demo event');
                  console.log(eData);
                });
              } else if (idiomaselect === 'pt') {
                event_pt.DEFAULT_EVENT.organizer = adata.User.id;
                eventRequest.createEventToken(event_pt.DEFAULT_EVENT, btoa($scope.email + ':' + $scope.passwordone)).success(function(sData) {
                  angular.forEach(event_pt.PERKS, function(value) {
                    value.id_event = sData.event.id;
                    perkRequest.createPerkToken(value, btoa($scope.email + ':' + $scope.passwordone)).success(function() {
                      /*Empty Code, nothing necessary here*/
                    }).error(function(eData) {
                      console.log('Error creating a perk');
                      console.log(eData);
                    });
                  });
                  $scope.loagind = false;
                  $location.path('/customization');
                  ngDialog.closeAll();
                }).error(function(eData) {
                  console.log('Error demo event');
                  console.log(eData);
                });
              }
            }
          }).error(function(data) {
            if (data.message === 'Not inserted') {
              $scope.errorMessages = [];
              if (data.error.email) {
                $scope.errorMessages.push('errorRegisterEmail');
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
            ngDialog.closeAll();
            ngDialog.open({
              template: 'views/templates/multipleErrorDialog.html',
              showClose: false,
              scope: $scope
            });
          });
        } else {
          if($scope.passwordtwo.length > 6){
            $scope.message = 'errorRegisterPasswordNoMatch';
            ngDialog.open({
              template: 'views/templates/errorDialog.html',
              showClose: false,
              scope: $scope
            });
          }
          else{
            $scope.message = 'errorRegisterShortPassword';
            ngDialog.open({
              template: 'views/templates/errorDialog.html',
              showClose: false,
              scope: $scope
            });
          }

        }
      } else {
        $scope.message = 'errorRegisterPasswordNoEmpty';
        ngDialog.open({
          template: 'views/templates/errorDialog.html',
          showClose: false,
          scope: $scope
        });
      }
    };
  }
  angular.module('sponzorme')
    .controller('SponzorsCreateController', SponzorsCreateController);
})();

'use strict';
(function(){

function SponzorsFollowingController($scope, $translate, $localStorage, usSpinnerService, userRequest, sponzorshipRequest, perkRequest, taskSponzorRequest, ngDialog, $location, $rootScope) {
  $rootScope.userValidation('1');
  $scope.sponzorshipsLoading = true;
  $scope.noSponzorshipsMessage = false;
  $scope.tasksLoading = true;
  $scope.emailuser = $localStorage.email;
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
        console.log(data);
        $scope.noSponzorshipsMessage = true;
        $scope.noSponzorshipsTaskMessage = true;
      });
    };
    //this function deletes an sponzorship if the status is 0
  $scope.deleteSponzorship = function(sponzorshipId) {
      sponzorshipRequest.oneSponzorship(sponzorshipId).success(function(taskData) {
        angular.forEach(taskData.data.SponzorEvent.task_sponzor, function(value) {
          taskSponzorRequest.deleteTaskSponzor(value.id).success(function() {});
        });
        sponzorshipRequest.deleteSponzorship(sponzorshipId).success(function() {
          $scope.loadSponzorships();
        }).error(function(eData) {
          console.log(eData);
        });
      });
    };
    //this function gets the tasks sponzorships by sponzorship id
  $scope.getTaskSponzor = function(sponzorshipId) {
    $scope.tasksLoading = true;
    $scope.noSponzorshipsTaskMessage = false;
    $scope.sponzorships.current = sponzorshipId;
    taskSponzorRequest.tasksBySponzorship(sponzorshipId).success(function(data) {
      $scope.tasksLoading = false;
      $scope.tasksSponzor = [];
      angular.forEach(data.tasks, function(value) {
        if (value.type === '0') {
          $scope.tasksSponzor.push(value);
        }
      });
      if (!$scope.tasksSponzor[0]) {
        $scope.noSponzorshipsTaskMessage = true;
      } else {
        $scope.noSponzorshipsTaskMessage = false;
      }

    }).error(function(data) {
      console.log(data);
      $scope.noSponzorshipsTaskMessage = true;
    });
  };
  $scope.seeCause = function(sponzorship) {
    $scope.cause = sponzorship.cause;
    ngDialog.open({
      template: 'sponzorshipCause',
      scope: $scope
    });
  };
  $scope.tolsctive = 'active';
  $scope.toggleSidebar = function() {
        $scope.tolsctive = !$scope.tolsctive;
        if($scope.tolsctive === true){
           $scope.tolsctive = 'active';
        }
    };
  $scope.loadSponzorships();//here starts the callback
  $scope.menuprincipal = 'views/sponzors/menu.html';
}

angular.module('sponzorme')
.controller('SponzorsFollowingController', SponzorsFollowingController);

})();

'use strict';
(function(){

function SponzorsFriendController($scope, $translate, userRequest, ngDialog, $location, $rootScope, $localStorage) {

  $rootScope.userValidation('1');

  $scope.invitefriend = function() {
    $scope.loadingInvite = true;
    $scope.objuserinv = {};
    $scope.objuserinv.user_id = $localStorage.id;
    $scope.objuserinv.email = $scope.friend.email;
    $scope.objuserinv.message = $scope.friend.message;
    userRequest.invitedUser($scope.objuserinv).success(function(adata) {
      $scope.friend.tempEmail = $scope.friend.email;
      $scope.friend.email = '';
      $scope.friend.message = '';
      if (adata.code === 200) {
        ngDialog.open({
          template: 'emailsend.html',
          scope: $scope
        });

      } else {
        ngDialog.open({
          template: 'errorsend.html'
        });
      }
      $scope.loadingInvite = false;
    });
  };

  $scope.emailuser = $localStorage.email;

  $scope.tolsctive = 'active';
  $scope.toggleSidebar = function() {
        $scope.tolsctive = !$scope.tolsctive;
        if($scope.tolsctive === true){
           $scope.tolsctive = 'active';
        }
    };

  $scope.menuprincipal = 'views/sponzors/menu.html';
}

angular.module('sponzorme')
.controller('SponzorsFriendController', SponzorsFriendController);

})();

'use strict';
(function(){

function SponzorsMainController($scope, $translate, userRequest, $localStorage, eventRequest, $location, usSpinnerService, ngDialog, sponzorshipRequest, perkTaskRequest, perkRequest, taskSponzorRequest, $rootScope) {
  $rootScope.userValidation('1');

    $scope.searchLoading = true;
    $scope.upcomingLoading = true;
    $scope.bestLoading = true;
    $scope.getAllEvents = function() {
      eventRequest.allEvents().success(function(adata) {
        $scope.search = [];
        $scope.search = adata.events;
        $scope.searchloading = 0;
        $scope.searchLoading = false;
        $scope.setUpcomingEvents();
        $scope.setBestEvents();
      });
    };
    $scope.setUpcomingEvents = function() {
      $scope.upcomingEvents = [];
      var currentDate = new Date();
      for (var i = 0; i < $scope.search.length; i++) {
        var eventDate = new Date($scope.search[i].starts);
        if (eventDate > currentDate) {
          $scope.upcomingEvents.push($scope.search[i]);
        }
      }
      $scope.upcomingLoading = false;
    };
    $scope.setBestEvents = function() {
      $scope.bestEvents = [];
      for (var i = 0; i < 4; i++) { //Choose randomly events
        $scope.bestEvents.push($scope.search[i]);
      }
      $scope.bestLoading = false;
    };
    $scope.showPerks = function(eventId) {
        $scope.loadingpeaks = true;
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
          ngDialog.open({
            template: 'perks',
            scope: $scope
          });
        }).error(function(eData) {
            console.log(eData);
        });
      };
      //We display the form to get the sponzorship cause
    $scope.formCreateSponzorship = function(perk) {
      $scope.perkToSponzor = perk;
      console.log($scope.perkToSponzor);
      ngDialog.open({
        template: 'formCreateSponzorship',
        scope: $scope
      });
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
      console.log(data);

      ngDialog.closeAll();
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
            taskSponzorRequest.createTaskSponzor(taskSponzor).success(function(){});
          });
          ngDialog.open({
            template: 'SponzorshipComplete'
          });
          $location.path('/sponsors/following'); //redirection to Following page
        }).error(function(eData) {
          console.log(eData);
        });
      }).error(function(eData) {
        console.log(eData);
      });
    };
    $scope.tolsctive = 'active';
    $scope.toggleSidebar = function() {
          $scope.tolsctive = !$scope.tolsctive;
          if($scope.tolsctive === true){
             $scope.tolsctive = 'active';
          }
      };
    $scope.getAllEvents();
    $scope.menuprincipal = 'views/sponzors/menu.html';
}

angular.module('sponzorme')
.controller('SponzorsMainController', SponzorsMainController);

})();

'use strict';
(function() {

  function SponzorsSettingsController($scope, $translate, userRequest, $localStorage, imgurRequest, $location, $rootScope) {
    $rootScope.userValidation('1');
    $scope.file = false; //By default no file to update.
    $scope.loadingEditAccount = true;
    userRequest.oneUser($localStorage.id).success(function(adata) {
      $scope.account = adata.data.user;
      $scope.loadingEditAccount = false;
    });
    $scope.editAccount = function() {
      $scope.loadingEditAccount = true;
      $scope.account.location = $scope.account.location.formatted_address;
      if ($scope.file) {
        var params = {
          image: $scope.file.base64,
          type: 'base64'
        };
        imgurRequest.uploadImage(params).success(function(data) {
          $scope.account.image = data.data.link;
          userRequest.editUserPatch($localStorage.id, $scope.account).success(function(adata) {
            $scope.account = adata.User;
            $localStorage.$reset();
            $scope.loadingEditAccount = false;
            $scope.file = false;
          }).error(function(eData) {
            console.log(eData);
          });
        });
      } else {
        userRequest.editUserPatch($localStorage.id, $scope.account).success(function(adata) {
          $scope.account = adata.User;
          $localStorage.$reset();
          $scope.loadingEditAccount = false;
          $scope.file = false;
        });
      }
    };
    $scope.tolsctive = 'active';
    $scope.toggleSidebar = function() {
      $scope.tolsctive = !$scope.tolsctive;
      if ($scope.tolsctive === true) {
        $scope.tolsctive = 'active';
      }
    };
    $scope.menuprincipal = 'views/sponzors/menu.html';
  }
  angular.module('sponzorme')
    .controller('SponzorsSettingsController', SponzorsSettingsController);
})();

'use strict';
(function(){

function SponzorsSponzorshipsController($scope, $translate, $location, taskSponzorRequest, perkTaskRequest, sponzorshipRequest, $localStorage, userRequest, usSpinnerService, ngDialog, $rootScope) {
  $rootScope.userValidation('1');
  $scope.noSponzorshipsMessage = false;
  $scope.noSponzorshipsTaskMessage = false;
  $scope.sponzorshipsLoading = true;
  $scope.loadingTasks = true;
  $scope.emailuser = $localStorage.email;
  $scope.userfroups = 0;
  $translate.use(idiomaselect);
  //This function allows get sponzorship info from organizerId
  $scope.getSponzorshipsBySponzor = function() {
    sponzorshipRequest.oneSponzorshipBySponzor($localStorage.id).success(function(data) {
      $scope.sponzorshipsLoading = false;
      $scope.noSponzorshipsMessage = false;
      if (!data.SponzorsEvents[0]) {
        $scope.loadingTasks = false;
        $scope.noSponzorshipsMessage = true;
        $scope.noSponzorshipsTaskMessage = true;
      } else {
        $scope.sponzorships = [];
        var flag = false;//used to verify if there is tasks
        angular.forEach(data.SponzorsEvents, function(value) {
          if (value.status === '1') {
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
      console.log(data);
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
        $scope.getSponzorshipsByOrganizer();
      }).error(function(eData) {
        console.log(eData);
      });
    };
    //This function changes to 0 the sponzorship status
  $scope.unacceptSponzorship = function(sponzoshipId) {
      var data = {
        status: 0
      };
      sponzorshipRequest.editSponzorshipPatch(sponzoshipId, data).success(function() {
        $scope.getSponzorshipsByOrganizer();
      }).error(function(eData) {
        console.log(eData);
      });
    };
    //this function deletes an sponzorship if the status is 0
  $scope.deleteSponzorship = function(sponzorshipId) {
      sponzorshipRequest.oneSponzorship(sponzorshipId).success(function(taskData) {
        angular.forEach(taskData.data.SponzorEvent.task_sponzor, function(value) {
          taskSponzorRequest.deleteTaskSponzor(value.id).success(function() {});
        });
        sponzorshipRequest.deleteSponzorship(sponzorshipId).success(function() {
          $scope.getSponzorshipsByOrganizer();
        }).error(function(eData) {
          console.log(eData);
        });
      });
    };
    //this function gets the tasks sponzorships by sponzorship id
  $scope.getTaskSponzor = function(sponzorship) {
      $scope.loadingTasks = true;
      $scope.noSponzorshipsTaskMessage = false;
      $scope.sponzorships.current = sponzorship.id;
      $scope.currentSponzorship = sponzorship;
      taskSponzorRequest.tasksBySponzorship(sponzorship.id).success(function(data) {
        $scope.tasksSponzor = data.tasks;
        $scope.loadingTasks = false;
        if (!$scope.tasksSponzor[0]) {
          $scope.noSponzorshipsTaskMessage = true;
        } else {
          $scope.noSponzorshipsTaskMessage = false;
        }
      }).error(function(data) {
        console.log(data);
        $scope.noSponzorshipsTaskMessage = true;
      });
    };
    //This function changes to 1 the sponzor task status
  $scope.completeTask = function(taskSponzorId) {
      var data = {
        status: 1
      };
      taskSponzorRequest.editTaskSponzorPatch(taskSponzorId, data).success(function() {
        $scope.getTaskSponzor($scope.currentSponzorship);
      }).error(function(eData) {
        console.log(eData);
      });
    };
    //This function changes to 0 the sponzor task status
  $scope.uncompleteTask = function(taskSponzorId) {
    var data = {
      status: 0
    };
    taskSponzorRequest.editTaskSponzorPatch(taskSponzorId, data).success(function() {
      $scope.getTaskSponzor($scope.currentSponzorship);
    }).error(function(eData) {
      console.log(eData);
    });
  };
  $scope.deleteTaskSponzor = function(taskSponzorId) {
    taskSponzorRequest.deleteTaskSponzor(taskSponzorId).success(function() {
      $scope.getTaskSponzor($scope.currentSponzorship);
    }).error(function(eData) {
      console.log(eData);
    });
  };
  $scope.seeCause = function(sponzorship) {
    $scope.cause = sponzorship.cause;
    ngDialog.open({
      template: 'sponzorshipCause',
      scope: $scope
    });
  };
  $scope.showTaskForm = function() {
    $scope.todo = {};
    ngDialog.open({
      template: 'formNewTask',
      scope: $scope
    });
  };
  $scope.addTaskSponzor = function() {
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
      });
      ngDialog.closeAll();
      ngDialog.open({
        template: 'successCreatingTask',
        scope: $scope
      }); //finally we show a dialog telling the status of the things
    }).error(function(data) {
      console.log(data);
    });
  };
  $scope.getSponzorshipsBySponzor();
  $scope.tolsctive = 'active';
  $scope.toggleSidebar = function() {
        $scope.tolsctive = !$scope.tolsctive;
        if($scope.tolsctive === true){
           $scope.tolsctive = 'active';
        }
    };
  $scope.menuprincipal = 'views/sponzors/menu.html';
}

angular.module('sponzorme')
.controller('SponzorsSponzorshipsController', SponzorsSponzorshipsController);
})();

'use strict';
(function() {

  function OrganizersCreateController($scope, $translate, userRequest, ngDialog, usSpinnerService, $location, $localStorage, eventRequest, perkRequest) {

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
          ngDialog.open({template: 'views/templates/loadingDialog.html', showClose: false});
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
                    perkRequest.createPerkToken(value, btoa($scope.email + ':' + $scope.passwordone)).success(function() {
                      /*Empty Code, nothing necessary here*/
                    }).error(function(eData) {
                      console.log('Error creating a perk');
                      console.log(eData);
                    });
                  });
                  $scope.loagind = false;
                  $location.path('/customization');
                  ngDialog.closeAll();
                }).error(function(eData) {
                  console.log('Error demo event');
                  console.log(eData);
                });
              } else if (idiomaselect === 'es') {
                event_es.DEFAULT_EVENT.organizer = adata.User.id;
                eventRequest.createEventToken(event_es.DEFAULT_EVENT, btoa($scope.email + ':' + $scope.passwordone)).success(function(sData) {
                  angular.forEach(event_es.PERKS, function(value) {
                    value.id_event = sData.event.id;
                    perkRequest.createPerkToken(value, btoa($scope.email + ':' + $scope.passwordone)).success(function() {
                      /*Empty Code, nothing necessary here*/
                    }).error(function(eData) {
                      console.log('Error creating a perk');
                      console.log(eData);
                    });

                  });
                  $scope.loagind = false;
                  $location.path('/customization');
                  ngDialog.closeAll();
                }).error(function(eData) {
                  console.log('Error demo event');
                  console.log(eData);
                });
              } else if (idiomaselect === 'pt') {
                event_pt.DEFAULT_EVENT.organizer = adata.User.id;
                eventRequest.createEventToken(event_pt.DEFAULT_EVENT, btoa($scope.email + ':' + $scope.passwordone)).success(function(sData) {
                  angular.forEach(event_pt.PERKS, function(value) {
                    value.id_event = sData.event.id;
                    perkRequest.createPerkToken(value, btoa($scope.email + ':' + $scope.passwordone)).success(function() {
                      /*Empty Code, nothing necessary here*/
                    }).error(function(eData) {
                      console.log('Error creating a perk');
                      console.log(eData);
                    });
                  });
                  $scope.loagind = false;
                  $location.path('/customization');
                  ngDialog.closeAll();
                }).error(function(eData) {
                  console.log('Error demo event');
                  console.log(eData);
                });
              }
            }
          }).error(function(data) {
            if (data.message === 'Not inserted') {
              $scope.errorMessages = [];
              if (data.error.email) {
                $scope.errorMessages.push('errorRegisterEmail');
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
            ngDialog.closeAll();
            ngDialog.open({
              template: 'views/templates/multipleErrorDialog.html',
              showClose: false,
              scope: $scope
            });
          });
        } else {
          if($scope.passwordtwo.length > 6){
            $scope.message = 'errorRegisterPasswordNoMatch';
            ngDialog.open({
              template: 'views/templates/errorDialog.html',
              showClose: false,
              scope: $scope
            });
          }
          else{
            $scope.message = 'errorRegisterShortPassword';
            ngDialog.open({
              template: 'views/templates/errorDialog.html',
              showClose: false,
              scope: $scope
            });
          }

        }
      } else {
        $scope.message = 'errorRegisterPasswordNoEmpty';
        ngDialog.open({
          template: 'views/templates/errorDialog.html',
          showClose: false,
          scope: $scope
        });
      }
    };
  }

  angular.module('sponzorme')
    .controller('OrganizersCreateController', OrganizersCreateController);

})();

'use strict';
(function(){

function OrganizersEventsController($scope, $translate, $localStorage, eventTypeRequest, eventRequest, ngDialog, categoryRequest, userRequest, perkRequest, perkTaskRequest, $location, usSpinnerService, imgurRequest, taskSponzorRequest, $rootScope) {
  $rootScope.userValidation('0');//Validation
  //Vars Initialization
  $scope.error_log = '';
  $scope.eventos = [];
  $scope.currentPerkId = 0;
  $scope.currentPerk = {};
  $scope.tolsctive = 'active';
  $scope.emailuser = $localStorage.email;
  $scope.file = false; //By default no file to add.
  $scope.event = {};
  eventTypeRequest.allEventTypes($scope.typeuser).success(function(adata) {
    $scope.type = {};
    $scope.type.list = adata.eventTypes;
    $scope.typefilter = adata.eventTypes;
  });
  $scope.categorias = {};
  categoryRequest.allCategories($scope.typeuser).success(function(adata) {
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
      if($scope.eventos[0]){
        $scope.event.current = $scope.eventos[0].id;
      }
      else{
        $scope.loadingtasks = false;
        $scope.loadingPerks = false;
        $scope.noEventsMessage = true;
      }
    });
  };
  $scope.toggleSidebar = function() {
        $scope.tolsctive = !$scope.tolsctive;
        if($scope.tolsctive === true){
           $scope.tolsctive = 'active';
        }
    };

  $scope.updatePerks = function(idevent) {
    $scope.loadingPerks = true;//We need put in load mode the widget
    $scope.noPerksMessage = false;//We suppose that exists persks
    $scope.loadingtasks = true;//Because we gonna get perk first and then tasks
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
    ngDialog.open({template: 'views/templates/loadingDialog.html', showClose: false});
    eventRequest.oneEvent(idevent).success(function(adata) {
      if (adata.data.event.sponzorship.length === 0) { //If event does not have sponzorhips
        angular.forEach(adata.data.event.sponzor_tasks, function(value) {
          taskSponzorRequest.deleteTaskSponzor(value.id).error(function(eData) {});
        });
        angular.forEach(adata.data.event.perk_tasks, function(value) { //First we delete the tasks
            perkTaskRequest.deletePerkTask(value.id).error(function(eData) {});
        });
        angular.forEach(adata.data.event.perks, function(value) { //Then we delete the perks
            perkRequest.deletePerk(value.id).error(function(eData) {});
        });
        setTimeout(function() {
          eventRequest.deleteEvent(adata.data.event.id).success(function() {
            ngDialog.closeAll();
            $scope.message = 'eventDeleteSuccesfully';
            ngDialog.open({
              template: 'views/templates/successDialog.html',
              showClose: false,
              scope: $scope
            });
            $scope.getEventsByOrganizer($localStorage.id);
        }).error(function(eData) {
          ngDialog.closeAll();
          $scope.message = 'errorDeletingEvent';
          ngDialog.open({
            template: 'views/templates/errorDialog.html',
            showClose: false,
            scope: $scope
          });
        }); }, 5000);
      } else { //If event has sponzorhips we can not delete
        ngDialog.closeAll();
        $scope.message = 'eventDeletingEventHasSponzorship';
        ngDialog.open({
          template: 'views/templates/errorDialog.html',
          showClose: false,
          scope: $scope
        }); //finally we show a dialog telling the status of the things
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
    ngDialog.closeAll();
    ngDialog.open({template: 'views/templates/loadingDialog.html', showClose: false});
    $scope.todo.perk_id = $scope.currentPerkId;
    $scope.todo.event_id = $scope.event.current;
    $scope.todo.status = 0; //We put the defaul status
    $scope.todo.user_id = $localStorage.id; //Get the organizer Id
    $scope.todo.type = 0; //If task is created by organizer the type is 0
    perkTaskRequest.createPerkTask($scope.todo).success(function() {
      ngDialog.closeAll();
      $scope.message = 'taskCreatedSuccesfuly';
      ngDialog.open({
        template: 'views/templates/successDialog.html',
        showClose: false,
        scope: $scope
      }); //finally we show a dialog telling the status of the things
      $scope.getPerk($scope.currentPerkId); //Refresh perks data.
    }).error(function(data) {
      ngDialog.closeAll();
      $scope.message = 'errorCreatingTask';
      ngDialog.open({
        template: 'views/templates/errorDialog.html',
        showClose: false,
        scope: $scope
      });
    });
  };
  $scope.removeTask = function(task_id) {
    ngDialog.open({template: 'views/templates/loadingDialog.html', showClose: false});
    perkTaskRequest.deletePerkTask(task_id).success(function(adata) {
      ngDialog.closeAll();
      $scope.message = 'taskDeletedSuccessfuly';
      ngDialog.open({
        template: 'views/templates/successDialog.html',
        showClose: false,
        scope: $scope
      });
      $scope.getPerk($scope.currentPerkId);
    }).error(function() {
      ngDialog.closeAll();
      $scope.message = 'errorDeletingTask';
      ngDialog.open({
        template: 'views/templates/errorDialog.html',
        showClose: false,
        scope: $scope
      });
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

angular.module('sponzorme')
.controller('OrganizersEventsController', OrganizersEventsController);

})();

'use strict';
(function(){

function OrganizersFriendController($scope, $translate, $localStorage, userRequest, ngDialog, $location, $rootScope) {
  $rootScope.userValidation('0');//User validation
  //Vars initialization
  $scope.friend = {};
  $scope.friend.email = '';
  $scope.friend.message = '';
  $scope.emailuser = $localStorage.email;
  //Vars initialization ends

  //This function invites to a friend to use our platform.
  $scope.invitefriend = function() {
    $scope.loadingInvite = true;
    ngDialog.open({template: 'views/templates/loadingDialog.html', showClose: false});
    $scope.objuserinv = {};
    $scope.objuserinv.user_id = $localStorage.id;
    $scope.objuserinv.email = $scope.friend.email;
    $scope.objuserinv.message = $scope.friend.message;
    userRequest.invitedUser($scope.objuserinv).success(function(adata) {
      $scope.friend.tempEmail = $scope.friend.email;
      $scope.friend.email = '';
      $scope.friend.message = '';
      if (adata.code === '200') {
        ngDialog.closeAll();
        $scope.message = 'inviteFiendEmailSent';
        ngDialog.open({
          template: 'views/templates/successDialog.html',
          showClose: false,
          scope: $scope
        });

      } else {
        ngDialog.closeAll();
        $scope.message = 'problem';
        ngDialog.open({
          template: 'views/templates/errorDialog.html',
          showClose: false,
          scope: $scope
        });
      }
      $scope.loadingInvite = false;
    });
  };

  $scope.tolsctive = 'active';
  $scope.toggleSidebar = function() {
        $scope.tolsctive = !$scope.tolsctive;
        if($scope.tolsctive === true){
           $scope.tolsctive = 'active';
        }
    };

  $scope.menuprincipal = 'views/organizers/menu.html';
}

angular.module('sponzorme')
.controller('OrganizersFriendController', OrganizersFriendController);

})();

'use strict';
(function(){
function OrganizersMainController($scope, $translate, $localStorage, $location, userRequest, eventRequest, rssRequest, usSpinnerService, $rootScope, sponzorshipRequest) {
  $rootScope.userValidation('0');
  $scope.loadingevents = true;
  $scope.loadingrss = true;
  $scope.tolsctive = 'active';
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
    usSpinnerService.stop('spinner-2');
    $scope.loadingevents = false;
    if($scope.events[0]){
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

  $scope.tolsctive = 'active';
  $scope.toggleSidebar = function() {
        $scope.tolsctive = !$scope.tolsctive;
        if($scope.tolsctive === true){
           $scope.tolsctive = 'active';
        }
    };

  $scope.menuprincipal = 'views/organizers/menu.html';
}

angular.module('sponzorme')
.controller('OrganizersMainController', OrganizersMainController);

})();

'use strict';
(function() {

  function OrganizersSettingsController($scope, $translate, userRequest, $localStorage, imgurRequest, $location, $rootScope, ngDialog) {

    $rootScope.userValidation('0');
    ngDialog.open({template: 'views/templates/loadingDialog.html', showClose: false});
    userRequest.oneUser($localStorage.id).success(function(adata) {
      $scope.account = adata.data.user;
      ngDialog.closeAll();
    });

    $scope.account = [];

    $scope.file = false; //By default no file to update.
    $scope.editAccount = function() {
      ngDialog.open({template: 'views/templates/loadingDialog.html', showClose: false});
      $scope.account.location = $scope.account.location.formatted_address;
      if ($scope.file) {
        var params = {
          image: $scope.file.base64,
          type: 'base64'
        };
        imgurRequest.uploadImage(params).success(function(data) {
          $scope.account.image = data.data.link;
          userRequest.editUserPatch($localStorage.id, $scope.account).success(function(adata) {
            $scope.account = adata.User;
            $scope.file = false;
            ngDialog.closeAll();
            $scope.message = 'accountInfoEditedSuccessfuly';
            ngDialog.open({
              template: 'views/templates/successDialog.html',
              showClose: false,
              scope: $scope
            });
          }).error(function(eData) {
            ngDialog.closeAll();
            $scope.message = 'errorEditingAccountInfo';
            ngDialog.open({
              template: 'views/templates/errorDialog.html',
              showClose: false,
              scope: $scope
            });
          });
        });
      } else {
        userRequest.editUserPatch($localStorage.id, $scope.account).success(function(adata) {
          $scope.account = adata.User;
          $scope.file = false;
          ngDialog.closeAll();
          $scope.message = 'accountInfoEditedSuccessfuly';
          ngDialog.open({
            template: 'views/templates/successDialog.html',
            showClose: false,
            scope: $scope
          });
        });
      }
    };

    $scope.tolsctive = 'active';
    $scope.toggleSidebar = function() {
      $scope.tolsctive = !$scope.tolsctive;
      if ($scope.tolsctive === true) {
        $scope.tolsctive = 'active';
      }
    };

    $scope.menuprincipal = 'views/organizers/menu.html';
  }

  angular.module('sponzorme')
    .controller('OrganizersSettingsController', OrganizersSettingsController);

})();

'use strict';
(function(){

function OrganizersSponzorshipsController($scope, $translate, $location, taskSponzorRequest, perkTaskRequest, sponzorshipRequest, $localStorage, userRequest, usSpinnerService, ngDialog, $rootScope) {
  $rootScope.userValidation('0');
  $scope.noSponzorshipsMessage = false;
  $scope.loadingsponzorships = true;
  $scope.loadingsponzorshipstasks = true;
  $scope.noSponzorshipsTaskMessage = false;
  $scope.emailuser = $localStorage.email;
  $scope.userfroups = 0;
  $translate.use(idiomaselect);
  //This function allows get sponzorship info from organizerId
  $scope.getSponzorshipsByOrganizer = function() {
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
          $scope.getTaskSponzor($scope.sponzorships[0].id); //Fit the tasks with the first sponzorships
        } else {
          $scope.noSponzorshipsTaskMessage = true;
        }
        $scope.sponzorships.current = $scope.sponzorships[0].id;
      }
    }).error(function(data) {
      console.log(data);
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
        sponzorshipRequest.sendSponzorshipEmail(info).success(function(){});
        $scope.getSponzorshipsByOrganizer();
      }).error(function(eData) {
        console.log(eData);
      });
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
        console.log(eData);
      });
    };
    //this function deletes an sponzorship if the status is 0
  $scope.deleteSponzorship = function(sponzorshipId) {
      ngDialog.open({template: 'views/templates/loadingDialog.html', showClose: false});
      sponzorshipRequest.oneSponzorship(sponzorshipId).success(function(taskData) {
        angular.forEach(taskData.data.SponzorEvent.task_sponzor, function(value) {
          taskSponzorRequest.deleteTaskSponzor(value.id).success(function() {});
        });
        setTimeout(function() {
          sponzorshipRequest.deleteSponzorship(sponzorshipId).success(function() {
            $scope.getSponzorshipsByOrganizer();
            ngDialog.closeAll();
            $scope.message = 'successDeletingSponzorship';
            ngDialog.open({
              template: 'views/templates/successDialog.html',
              showClose: false,
              scope: $scope
            });
          }).error(function() {
            ngDialog.closeAll();
            $scope.message = 'errorDeletingSponzorship';
            ngDialog.open({
              template: 'views/templates/errorDialog.html',
              showClose: false,
              scope: $scope
            });
          }); }, 5000);
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
        console.log(data);
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
        console.log(eData);
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
      console.log(eData);
    });
  };
  $scope.deleteTaskSponzor = function(taskSponzorId) {
    taskSponzorRequest.deleteTaskSponzor(taskSponzorId).success(function() {
      $scope.getTaskSponzor($scope.sponzorships.current);
    }).error(function(eData) {
      console.log(eData);
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


  $scope.toggleSidebar = function() {
    console.log($scope.tolsctive);
        $scope.tolsctive = !$scope.tolsctive;
        $scope.$apply();
    };

  $scope.tolsctive = 'active';
  $scope.toggleSidebar = function() {
        $scope.tolsctive = !$scope.tolsctive;
        if($scope.tolsctive === true){
           $scope.tolsctive = 'active';
        }
    };

$scope.getSponzorshipsByOrganizer();
  $scope.menuprincipal = 'views/organizers/menu.html';
}

angular.module('sponzorme')
.controller('OrganizersSponzorshipsController', OrganizersSponzorshipsController);

})();

'use strict';
(function() {
  function OrganizersEventEditController($scope, $translate, $localStorage, eventTypeRequest, eventRequest, ngDialog, categoryRequest, perkRequest, perkTaskRequest, $location, $rootScope, $routeParams) {
    $rootScope.userValidation('0'); //Validation
    $scope.tolsctive = 'active';
    $scope.loading = true;
    ngDialog.open({template: 'views/templates/loadingDialog.html', showClose: false});
    eventTypeRequest.allEventTypes($scope.typeuser).success(function(adata) {
      $scope.type = {};
      $scope.type.list = adata.eventTypes;
      $scope.typefilter = adata.eventTypes;
    });
    $scope.categorias = {};
    categoryRequest.allCategories($scope.typeuser).success(function(adata) {
      $scope.categorias.list = adata.categories;
      $scope.categoriasfilter = adata.categories;
    });
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
        ngDialog.closeAll();
      }).error(function() {
        ngDialog.closeAll();
        $scope.message = 'errorNotEventInfoGot';
        ngDialog.open({
          template: 'views/templates/errorDialog.html',
          showClose: false,
          scope: $scope
        });
      });
    };
    $scope.doEditEvent = function(idevent) {
      ngDialog.open({template: 'views/templates/loadingDialog.html', showClose: false});
      angular.forEach($scope.eventData.perks, function(value) {
        if (value.id === -1) { //If new perk was added we insert that
          $scope.perkitems = {};
          $scope.perkitems.kind = value.kind;
          $scope.perkitems.total_quantity = value.total_quantity;
          $scope.perkitems.reserved_quantity = 0;
          $scope.perkitems.usd = value.usd;
          $scope.perkitems.id_event = idevent;
          perkRequest.createPerk($scope.perkitems).success(function() {}).error(function(edata) {
            console.log('Error creating a perk');
            console.log(edata);
          });
        } else { //If no perk was added just we edit the fields
          $scope.perkitems = value;
          perkRequest.editPerkPatch(value.id, $scope.perkitems).success(function() {
            /*empty Code, nothing necessary here*/
          }).error(function(eData) {
            console.log('Error editing a perk');
            console.log(eData);
          });
        }
      });
      //Next we edit the event information
      $scope.eventData.starts = moment($scope.eventData.starts).format('YYYY-MM-DD hh:mm:ss');
      $scope.eventData.ends = moment($scope.eventData.ends).format('YYYY-MM-DD hh:mm:ss');
      eventRequest.editEventPatch(idevent, $scope.eventData).success(function() {
        ngDialog.closeAll();
        $scope.message = 'eventEditedSuccesfully';
        ngDialog.open({
          template: 'views/templates/successDialog.html',
          showClose: false,
          scope: $scope
        });
      }).error(function(edata) {
        console.log('Error editing an event');
        console.log(edata);
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
    $scope.toggleSidebar = function() {
      $scope.tolsctive = !$scope.tolsctive;
      if ($scope.tolsctive === true) {
        $scope.tolsctive = 'active';
      }
    };
    $scope.formEditEvent($routeParams.id); //Here start the callback
    $translate.use(idiomaselect);
    $scope.menuprincipal = 'views/organizers/menu.html';
  }

  angular.module('sponzorme')
    .controller('OrganizersEventEditController', OrganizersEventEditController);

})();

'use strict';
(function() {
  function OrganizersEventCreateController($scope, $translate, $localStorage, eventTypeRequest, eventRequest, ngDialog, categoryRequest, userRequest, perkRequest, imgurRequest, $rootScope, $routeParams) {

    //Use This Zone to Vars Initialization
    $rootScope.userValidation('0'); //Validation
    $scope.tolsctive = 'active';
    $scope.sponzorshipTypes = [];
    $scope.newEvent = {};
    eventTypeRequest.allEventTypes($scope.typeuser).success(function(adata) {
      $scope.type = {};
      $scope.type.list = adata.eventTypes;
      $scope.typefilter = adata.eventTypes;
    });
    $scope.categorias = {};
    categoryRequest.allCategories($scope.typeuser).success(function(adata) {
      $scope.categorias.list = adata.categories;
      $scope.categoriasfilter = adata.categories;
    });
    //End vars Initialization

    //This function creates an event
    $scope.createNewEvent = function() {
      $scope.newEvent.title = $scope.titleevent;
      $scope.newEvent.location = $scope.locationevent.formatted_address;
      $scope.newEvent.location_reference = $scope.locationevent.place_id;
      $scope.newEvent.description = $scope.descriptionevent;
      $scope.newEvent.starts = moment($scope.dtini).format('YYYY-MM-DD hh:mm:ss');
      $scope.newEvent.ends = moment($scope.dtfinal).format('YYYY-MM-DD hh:mm:ss');
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
          perkRequest.createPerk($scope.perkitems).success(function(){});
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
        ngDialog.closeAll();
        $scope.message = 'eventCreatedSuccesfully';
        ngDialog.open({
          template: 'views/templates/successDialog.html',
          showClose: false,
          scope: $scope
        });
      }).error(function(edata){
        console.log(edata);
        ngDialog.closeAll();
        $scope.message = 'errorCreatingEvent';
        ngDialog.open({
          template: 'views/templates/errorDialog.html',
          showClose: false,
          scope: $scope
        });
      });
    };

    //this function upload or create the event Image
    $scope.imageVerification = function() {
      ngDialog.open({template: 'views/templates/loadingDialog.html', showClose: false});
      $scope.loadingNewEvent = true;
      $scope.errorNewEvent = false;
      $scope.newEvent = {};
      if ($scope.file) {
        var params = {
          image: $scope.file.base64,
          type: 'base64'
        };
        imgurRequest.uploadImage(params).success(function(imageData) {
          $scope.newEvent.image = imageData.data.link;
          $scope.createNewEvent();
        }).error(function(){
          ngDialog.closeAll();
          $scope.message = 'InvalidImage';
          ngDialog.open({
            template: 'views/templates/errorDialog.html',
            showClose: false,
            scope: $scope
          });
        });
      } else {
        //If no Image we set here some image
        $scope.newEvent.image = 'https://lh6.googleusercontent.com/-tPiuqhhZ5YM/UwpwKcmnmHI/AAAAAAAABuA/NB2UukRdRg0/w500-h375-no/nohayfoto.png';
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

    //this function expand and compress the left menu
    $scope.toggleSidebar = function() {
      $scope.tolsctive = !$scope.tolsctive;
      if ($scope.tolsctive === true) {
        $scope.tolsctive = 'active';
      }
    };
    $translate.use(idiomaselect);
    $scope.menuprincipal = 'views/organizers/menu.html';
  }

  angular.module('sponzorme')
    .controller('OrganizersEventCreateController', OrganizersEventCreateController);

})();