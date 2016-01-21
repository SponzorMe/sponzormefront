var event_en = {
  'DEFAULT_EVENT': {
    'title': 'Your first event.',
    'description': 'Congrats!!! This is your first event. In this place your going to have your event description.',
    'location': 'San Francisco, California',
    'location_reference': 'ljsadljf3289uojklfhasd',
    'startdate': 'Today',
    'enddate': 'Today +2 Hours',
    'image': 'https://s3-us-west-2.amazonaws.com/sponzormewebappimages/event_default.jpg',
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
    'image': 'https://s3-us-west-2.amazonaws.com/sponzormewebappimages/event_default.jpg',
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
    'image': 'https://s3-us-west-2.amazonaws.com/sponzormewebappimages/event_default.jpg',
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

/**
* @File the start the app
*
* @author Sebastian Gomez
* @version 0.1
*/
(function() {
  'use strict';
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
    'jshor.angular-addtocalendar',
    'angularUtils.directives.dirPagination',
    'ui.bootstrap.datetimepicker',
    'firebase',
    'textAngular',
    'angular-input-stars',
    'luegg.directives'
  ]);
})();

(function() {
  'use strict';
  angular
    .module('sponzorme')
    .constant('DEFAULTLANG', 'en')
    .constant('EXPIRATIONTIME', 1);//It means a Day
})();

/**
 * @author Sebastian Gomez
 * @version 0.1
 */
(function() {
  'use strict';
  angular.module('sponzorme')
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
    ]);
})();

/**
 * @author Sebastian Gomez
 * @version 0.1
 */
(function() {
  'use strict';
  angular.module('sponzorme').config(['$routeProvider', function($routeProvider) {
    $routeProvider
      .when('', {
        templateUrl: 'views/login.html',
        controller: 'LoginController'
      })
      .when('/', {
        templateUrl: 'views/login.html',
        controller: 'LoginController'
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
        templateUrl: 'views/login.html',
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
        controller: 'SponzorsMasterController'
      })
      .when('/sponzors/sponzoring', {
        templateUrl: 'views/sponzors/dashboard/sponzorships.html',
        controller: 'SponzorsMasterController'
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
  }]);
})();

/*
 * Author: Sebastian Gomez
 * This functions detect the enviroment and set the configuration
 */
/**
 * @author Sebastian Gomez
 * @version 0.1
 */
(function() {
  'use strict';
  angular.module('sponzorme').run(['$rootScope', function($rootScope) {
    $rootScope.getConstants = function() {
      var host = window.location.hostname; // Get the host
      if (host.indexOf('localhost') > -1) { //Localhost
        return {
          //'URL': 'http://local.api.com/',
          'URL': 'https://apilocal.sponzor.me/',
          'XOOMRATE': parseFloat(4.99),
          'FEE': parseFloat(0.1),
          'PAYPALCOMPLETERETURNURL': 'http://www.sponzor.me/thank-you/',
          'PAYPALIPNRETURNURL': 'http://apilocal.sponzor.me/ipn',
          'PAYPALEMAIL': 'bussines@sponzor.me',
          'FURL': 'https://sponzorme.firebaseio.com/localhost/',
          'AMAZONSECRET': 'RlzqEBFUlJW/8YGkeasfmTZRLTlWMWwaBpJNBxu6',
          'AMAZONKEY': 'AKIAJDGUKWK3H7SJZKSQ',
          'AMAZONBUCKET': 'sponzormewebappimages',
          'PAYPALSANDBOX': true,
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
          'PAYPALIPNRETURNURL': 'http://apistaging.sponzor.me/ipn',
          'PAYPALEMAIL': 'bussines@sponzor.me',
          'FURL': 'https://sponzorme.firebaseio.com/staging/',
          'AMAZONSECRET': 'RlzqEBFUlJW/8YGkeasfmTZRLTlWMWwaBpJNBxu6',
          'AMAZONKEY': 'AKIAJDGUKWK3H7SJZKSQ',
          'AMAZONBUCKET': 'sponzormewebappimages',
          'PAYPALSANDBOX': true,
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
          'PAYPALSANDBOX': false,
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
  }]);
})();

/**
 * @author Sebastian Gomez
 * @version 0.1
 */
(function() {
  'use strict';
  angular.module('sponzorme').run(['$rootScope', '$translate', '$location', 'allInterestsServiceRequest', '$filter', '$localStorage', 'userRequest', 'ngDialog', '$firebaseArray', function($rootScope, $translate, $location, allInterestsServiceRequest, $filter, $localStorage, userRequest, ngDialog, $firebaseArray, EXPIRATIONTIME) {
    var host = window.location.href;
    if (window.location.protocol === 'http:' && host.indexOf('localhost') <= -1) {
      var aux = host.replace('http:', 'https:');
      window.location.href = aux;
    }
    if (!$rootScope.tolsctive) {
      $rootScope.tolsctive = 'active';
    }
    $rootScope.toggleSidebar = function() {
      $rootScope.tolsctive = !$rootScope.tolsctive;
      if ($rootScope.tolsctive === true) {
        $rootScope.tolsctive = 'active';
      }
    };
    $rootScope.sendFirebaseNotification = function(notification) {
      notification.date = new Date().getTime();
      var notificationsRef = new Firebase($rootScope.getConstants().FURL + 'notifications');
      var notifications = $firebaseArray(notificationsRef);
      notifications.$add(notification);
    };
    /*
     * Author: Sebastian Gomez
     * This function allows change the language whatever be the route
     * for this reason this is a global function
     */
    $rootScope.changeLanguage = function(key) {
      $translate.use(key);
    };
    /*
     * Author: Sebastian Gomez
     * This function return the current languaje used in the application
     */
    $rootScope.currentLanguage = function() {
      return $translate.use();
    };

    $rootScope.showLoading = function() {
      ngDialog.open({
        template: 'views/templates/loadingDialog.html',
        showClose: false,
        controller: 'DialogController'
      });
    };

    $rootScope.showDialog = function(kind, message, redirectOnClose) {
      $rootScope.pseudoScope = {
        'message': message,
        'redirectOnClose': redirectOnClose
      };
      var selectedTemplate;
      if (kind === 'error') {
        selectedTemplate = 'views/templates/errorDialog.html';
      } else if (kind === 'success') {
        selectedTemplate = 'views/templates/successDialog.html';
      } else {
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

    $rootScope.closeAllDialogs = function() {
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
    $rootScope.isExpiredData = function() {
      if ($localStorage.startDate) {
        var dataTime = new Date($localStorage.startDate);
        var timer = parseInt(EXPIRATIONTIME * 24 * 60 * 60 * 1000);
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
      if ($localStorage.cookiesponzorme && $localStorage.email && $localStorage.id > 0 && $localStorage.token && $localStorage.typesponzorme === shouldType && $localStorage.user) {
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
      var userLang = $rootScope.currentLanguage();
      if (userLang === 'pt') {
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
      } else if (userLang === 'en') {
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
      } else if (userLang === 'es') {
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
      var userLang = $rootScope.currentLanguage();
      if (userLang === 'pt') {
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
      } else if (userLang === 'en') {
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
      } else if (userLang === 'es') {
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
  }]);
})();

/**
 * @author Sebastian Gomez
 * @version 0.1
 */
(function() {
  'use strict';
  angular.module('sponzorme')
    .directive('file', function() {
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
    })
    .directive('rdLoading', function() {
      var directive = {
        restrict: 'AE',
        template: '<div class="loading"><div class="double-bounce1"></div><div class="double-bounce2"></div></div>'
      };
      return directive;
    })
    .directive('stars', function($firebaseObject) {
      return {
        restrict: 'E',
        template: '<div></div>',
        link: function(scope, element, attrs) {
          var intPart = Math.floor(attrs.number);
          var decimalPart = attrs.number - Math.floor(attrs.number);
          var halfStarString = '<i class="material-icons orange600 md-12">star_border</i>';
          if (decimalPart > 0.48) {
            halfStarString = '<i class="material-icons orange600 md-12">star_half</i>';
          }
          var starBorderString = '';
          var starRateString = '';
          for (var i = 0; i < 5 - intPart - 1; i++) {
            starBorderString = starBorderString + '<i class="material-icons orange600 md-12">star_border</i>';
          }
          for (var i = 0; i < intPart; i++) {
            starRateString = starRateString + '<i class="material-icons orange600 md-12">star_rate</i>';
          }
          element.html('<span class="stars2">' + starRateString + halfStarString + starBorderString + '</span>');
        },
        replace: true
      };
    });
})();

 /**
  * @author Sebastian Gomez
  * @version 0.1
  */
 (function() {
   'use strict';
   /*
    * Author: Sebastian Gomez
    * This filters replace & by AND it is used for categories and interests translations
    */
   angular.module('sponzorme').filter('normalize', function() {
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

/**
 * @Servicio de Categories
 *
 * @author Sebastian
 * @version 0.1
 */
'use strict';
(function() {
  function categoryRequest($http, $rootScope) {
    return {
      /**
       * Get all categories
       * @returns promise
       */
      allCategories: function() {
        return $http.get($rootScope.getConstants().URL + 'categories');

      }
    };
  }
  angular.module('sponzorme').factory('categoryRequest', categoryRequest);
})();

/**
 * @Servicio de Eventos
 *
 * @author Sebastian
 * @version 0.1
 */
'use strict';
(function() {
  function eventRequest($http, $localStorage, $httpParamSerializerJQLike, $rootScope) {
    var token = $localStorage.token;
    return {
      allEvents: function() {
        return $http.get($rootScope.getConstants().URL + 'events');

      },
      oneEvent: function(EventId) {
        return $http.get($rootScope.getConstants().URL + 'events/' + EventId);

      },
      createEvent: function(data) {
        return $http({
          method: 'POST',
          url: $rootScope.getConstants().URL + 'events',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + token
          },
          data: $httpParamSerializerJQLike(data)
        });
      },
      createEventToken: function(data, newUserToken) {
        return $http({
          method: 'POST',
          url: $rootScope.getConstants().URL + 'events',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + newUserToken
          },
          data: $httpParamSerializerJQLike(data)
        });
      },
      deleteEvent: function(EventId) {
        return $http({
          method: 'DELETE',
          url: $rootScope.getConstants().URL + 'events/' + EventId,
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + token
          }
        });
      },
      editEventPut: function(EventId, data) {
        return $http({
          method: 'PUT',
          url: $rootScope.getConstants().URL + 'events/' + EventId,
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + token
          },
          data: $httpParamSerializerJQLike(data)
        });
      }
    };
  }
  angular.module('sponzorme').factory('eventRequest', eventRequest);
})();

/**
 * @Servicio de event_types
 *
 * @author Sebastian
 * @version 0.1
 */
'use strict';
(function() {
  function eventTypeService($http, $rootScope) {
    return {
      allEventTypes: function() {
        return $http.get($rootScope.getConstants().URL + 'event_types');
      }
    };
  }
  angular.module('sponzorme').factory('eventTypeRequest', eventTypeService);
})();

/**
 * @Servicio de interests_category
 *
 * @author Sebastian
 * @version 0.1
 */
'use strict';
(function() {
  function allInterestsServiceRequest($http, $rootScope) {
    return {
      allInterestsCategoriesId: function() {
        return $http.get($rootScope.getConstants().URL + 'interests_category');

      }
    };
  }
  angular.module('sponzorme').factory('allInterestsServiceRequest', allInterestsServiceRequest);
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
       * @returns promise
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
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + token
          },
          data: $httpParamSerializerJQLike(data)
        });
      }
    };
  }
  angular.module('sponzorme').factory('loginRequest', loginRequest);
})();

/**
 * @Servicio de Perks (Beneficios)
 *
 * @author Sebastian
 * @version 0.1
 */
'use strict';
(function() {
  function perkRequest($http, $localStorage, $httpParamSerializerJQLike, $rootScope) {
    var token = $localStorage.token;
    return {
      createPerk: function(data) {
        return $http({
          method: 'POST',
          url: $rootScope.getConstants().URL + 'perks',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + token
          },
          data: $httpParamSerializerJQLike(data)
        });
      },
      deletePerk: function(perkId) {
        return $http({
          method: 'DELETE',
          url: $rootScope.getConstants().URL + 'perks/' + perkId,
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + token
          }
        });
      }
    };
  }
  angular.module('sponzorme').factory('perkRequest', perkRequest);
})();

/**
 * @Servicio de Perks (Beneficios)
 *
 * @author Sebastian
 * @version 0.1
 */
'use strict';
(function() {
  function perkTaskRequest($http, $localStorage, $httpParamSerializerJQLike, $rootScope) {
    var token = $localStorage.token;
    return {
      createPerkTask: function(data) {
        return $http({
          method: 'POST',
          url: $rootScope.getConstants().URL + 'perk_tasks',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + token
          },
          data: $httpParamSerializerJQLike(data)
        });
      },
      deletePerkTask: function(perkTaskId) {
        return $http({
          method: 'DELETE',
          url: $rootScope.getConstants().URL + 'perk_tasks/' + perkTaskId,
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + token
          }
        });
      }
    };
  }
  angular.module('sponzorme').factory('perkTaskRequest', perkTaskRequest);
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
      oneSponzorship: function(sponzorshipId) {
        return $http.get($rootScope.getConstants().URL + 'sponzorships/' + sponzorshipId);
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
      }
    };
  }
  angular.module('sponzorme').factory('sponzorshipRequest', sponzorshipRequest);
})();

/**
 * @Servicio de TaskSponzor (Tareas de los patrocinadores)
 *
 * @author Sebastian
 * @version 0.1
 */
'use strict';
(function() {
  function taskSponzorRequest($http, $localStorage, $httpParamSerializerJQLike, $rootScope) {
    var token = $localStorage.token;
    return {
      createTaskSponzor: function(data) {
        return $http({
          method: 'POST',
          url: $rootScope.getConstants().URL + 'task_sponzor',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + token
          },
          data: $httpParamSerializerJQLike(data)
        });
      },
      deleteTaskSponzor: function(taskSponzorId) {
        return $http({
          method: 'DELETE',
          url: $rootScope.getConstants().URL + 'task_sponzor/' + taskSponzorId,
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + token
          }
        });
      },
      editTaskSponzorPatch: function(taskSponzorId, data) {
        return $http({
          method: 'PATCH',
          url: $rootScope.getConstants().URL + 'task_sponzor/' + taskSponzorId,
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
    .factory('taskSponzorRequest', taskSponzorRequest);
})();

/**
 * @Servicio de TaskSponzor (Tareas de los patrocinadores)
 *
 * @author Sebastian
 * @version 0.1
 */
'use strict';
(function() {

  function userInterestRequest($http, $localStorage, $httpParamSerializerJQLike, $rootScope) {
    var token = $localStorage.token;
    return {
      createUserInterest: function(data) {
        return $http({
          method: 'POST',
          url: $rootScope.getConstants().URL + 'user_interests',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + token
          },
          data: $httpParamSerializerJQLike(data)
        });
      },
      deleteUserInterest: function(userInterestId) {
        return $http({
          method: 'DELETE',
          url: $rootScope.getConstants().URL + 'user_interests/' + userInterestId,
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + token
          }
        });
      }
    };
  }
  angular.module('sponzorme').factory('userInterestRequest', userInterestRequest);
})();

/**
 * @Servicio de Usuarios
 *
 * @author Sebastian
 * @version 0.1
 */
'use strict';
(function() {
  function userRequest($http, $localStorage, $httpParamSerializerJQLike, $rootScope) {
    return {
      oneUser: function(userId) {
        var token = $localStorage.token;
        $http.defaults.headers.common.Authorization = 'Basic ' + token;
        return $http.get($rootScope.getConstants().URL + 'users/' + userId);
      },
      home: function(userId) {
        var token = $localStorage.token;
        $http.defaults.headers.common.Authorization = 'Basic ' + token;
        return $http.get($rootScope.getConstants().URL + 'home/' + userId);
      },
      createUser: function(data) {
        var token = 'b3JnYW5pemVyQHNwb256b3IubWU6c3Bvbnpvcm1l';
        return $http({
          method: 'POST',
          url: $rootScope.getConstants().URL + 'users',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + token
          },
          data: $httpParamSerializerJQLike(data)
        });
      },
      editUserPatch: function(userId, data) {
        var token = $localStorage.token;
        return $http({
          method: 'PATCH',
          url: $rootScope.getConstants().URL + 'users/' + userId,
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + token
          },
          data: $httpParamSerializerJQLike(data)
        });
      },
      invitedUser: function(data) {
        var token = $localStorage.token;
        return $http({
          method: 'POST',
          url: $rootScope.getConstants().URL + 'invite_friend/',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + token
          },
          data: $httpParamSerializerJQLike(data)
        });
      }
    };
  }
  angular.module('sponzorme').factory('userRequest', userRequest);
})();

/**
 * @Servicio de retorn de rss de los diferentes blogs
 *
 * @author Sebastian
 * @version 0.1
 */
'use strict';
(function() {
  function rssRequest($http) {
    return {
      rss: function(lang) {
        var path = '//ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=10&callback=JSON_CALLBACK&q=' + 'http://blog' + lang + '.sponzor.me/feeds/posts/default';
        return $http.jsonp(path);
      }
    };
  }
  angular.module('sponzorme').factory('rssRequest', rssRequest);
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
      }
    };
  }
  angular.module('sponzorme').factory('ratingRequest', ratingRequest);
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
        var config = {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Bearer ' + token
          }
        };
        return $http.get(url + '?token=' + token, config);
      }
    };
  }
  angular.module('sponzorme').factory('eventbriteRequest', eventbriteRequest);
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
  angular.module('sponzorme').controller('ActivationController', ActivationController);

})();

'use strict';
(function() {
  function EventPageController($scope, $routeParams, $translate, $localStorage, $location, eventRequest, ngDialog, sponzorshipRequest, $rootScope) {
    $scope.eventLoaded = false;
    var firebaseNotification;
    $scope.todayDate = new Date().getTime();
    eventRequest.oneEvent($routeParams.eventId).then(function successCallback(response) {
      $scope.eventLoaded = true;
      $scope.currentEvent = response.data.event;
      $scope.currentEvent.starts = new Date($scope.currentEvent.starts).getTime();
      $scope.eventURL = $location.absUrl();
    }, function errorCallback(err) {
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
    $scope.sendToLogin = function() {
      $localStorage.redirectTo = $scope.eventURL;
      $location.path('/login');
    };
    //We display the form to get the sponzorship cause
    $scope.formCreateSponzorship = function(perk) {
      $scope.newSponzorship = {
        'organizer_id': $scope.currentEvent.user_organizer.id,
        'sponzor_id': $localStorage.id,
        'event_id': $scope.currentEvent.id,
        'perk_id': perk.id,
        'cause': '',
        'status': 0
      };
      $scope.selectedPerk = perk;
      ngDialog.open({
        template: 'views/templates/formCreateSponzorship.html',
        scope: $scope
      });
    };
    $scope.createSponzorship = function() {
      $rootScope.closeAllDialogs();
      $rootScope.showLoading();
      $scope.user = JSON.parse($localStorage.user);
      $scope.user.pendingSponzorships = $scope.user.sponzorships.filter(function(e) {
        if (e.status === '0') {
          return e;
        }
      });
      sponzorshipRequest.createSponzorship($scope.newSponzorship).then(function successCallback(response) {
        $scope.user.sponzorships.push(response.data.Sponzorship);
        $scope.user.pendingSponzorships.push(response.data.Sponzorship);
        $localStorage.user = JSON.stringify($scope.user);
        var info = {
          organizerId: $scope.currentEvent.user_organizer.id,
          eventName: $scope.currentEvent.title,
          lang: $rootScope.currentLanguage()
        };
        var firebaseNotification = {
          to: $scope.currentEvent.user_organizer.id,
          text: $translate.instant('NOTIFICATIONS.NewSponzorshipRequestfor') + $scope.currentEvent.title,
          link: '#/organizers/sponzors'
        };
        $rootScope.sendFirebaseNotification(firebaseNotification);
        sponzorshipRequest.sendSponzorshipEmailOrganizer(info).then(function() {});
        $rootScope.closeAllDialogs();
        $rootScope.showDialog('success', 'sponzorshipCreatedSuccesfuly', false);
      }, function errorCallback(err) {
        $rootScope.closeAllDialogs();
        if (err.status === 409) {
          $rootScope.showDialog('error', 'alreadySponzoring', false);
        } else {
          $rootScope.showDialog('error', 'youCanNotSponzorThisEvent', false);
        }
      });
    };
  }
  angular.module('sponzorme').controller('EventPageController', EventPageController);
})();

'use strict';
(function() {

  function ForgotController($scope, $translate, $routeParams, ngDialog, loginRequest) {
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
  angular.module('sponzorme').controller('ForgotController', ForgotController);
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
  angular.module('sponzorme').controller('ActivationController', ActivationController);

})();

'use strict';
(function() {

  function LoginController($scope, $translate, loginRequest, $localStorage, $location, ngDialog, $routeParams, $rootScope, userRequest) {
    if ($routeParams.lang === 'en' || $routeParams.lang === 'es' || $routeParams.lang === 'pt') {
      $translate.use($routeParams.lang);
    }
    var redirectTo = $localStorage.redirectTo;
    $scope.sendfrom = function() {
      if ($scope.email && $scope.password) { //Just Check the values are defined
        $scope.objuser = {};
        $scope.objuser.email = $scope.email;
        $scope.objuser.password = $scope.password;
        $scope.objuser.password_confirmation = $scope.passwordtwo;
        $scope.objuser.lang = $rootScope.currentLanguage();
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
            $translate.use(adata.user.lang);
            $scope.loagind = false;
            userRequest.home($localStorage.id).then(function successCallback(response) {
              $rootScope.closeAllDialogs();
              $localStorage.user = JSON.stringify(response.data.data.user);
              $localStorage.events = [];
              if(response.data.data.events){
                $localStorage.events = JSON.stringify(response.data.data.events);
              }
              if (adata.user.type === '1') {
                if ((redirectTo && redirectTo.indexOf('login') === -1 && redirectTo.indexOf('sponzors') > -1) || (redirectTo && redirectTo.indexOf('/#/event/') > -1)) {
                  window.location.href = redirectTo;
                } else {
                  $location.path('/sponzors/dashboard');
                }
              } else {

                if ((redirectTo && redirectTo.indexOf('login') === -1 && redirectTo.indexOf('organizers') > -1) || (redirectTo && redirectTo.indexOf('/#/event/') > -1)){
                  window.location.href = redirectTo;
                } else {
                  $location.path('/organizers/dashboard');
                }
              }
            }, function errorCallback(response) {
              $rootScope.closeAllDialogs();
              $rootScope.showDialog('error', 'canNotGetUserInfo', false);
            });
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
  angular.module('sponzorme').controller('LoginController', LoginController);
})();

'use strict';
(function(){
function LogoutController($scope, $translate, $location, $localStorage, $rootScope) {
  $rootScope.tolsctive = 'active';
  $localStorage.$reset();
  $location.path('/login');
}
angular.module('sponzorme').controller('LogoutController', LogoutController);
})();

'use strict';
(function() {
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
  angular.module('sponzorme').controller('ResendController', ResendController);
})();

'use strict';
(function() {
  function CustomizationController($scope, $translate, $localStorage, userRequest, allInterestsServiceRequest, categoryRequest, userInterestRequest, $location) {
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
    };
    $scope.startCustomization();
  }
  angular.module('sponzorme').controller('CustomizationController', CustomizationController);
})();

'use strict';
(function() {
  function SponzorsMasterController($scope, $translate, $localStorage, ngDialog, $location, $rootScope, $sce) {
    $scope.trustSrc = function(src) {
      return $sce.trustAsResourceUrl(src);
    }
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
      $scope.mapSrc = "https://www.google.com/maps/embed/v1/place?key=AIzaSyDxXJIUmt5IDbqXuqNpD4ZssRl6aXBRhcU&q=" + encodeURIComponent($scope.currentEvent.location);
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

'use strict';
(function() {

  function SponzorsCreateController($scope, $translate, userRequest, ngDialog, $location, $localStorage, $routeParams, $rootScope) {
    if ($routeParams.lang === 'en' || $routeParams.lang === 'es' || $routeParams.lang === 'pt') {
      $translate.use($routeParams.lang);
    }
    $scope.sendfrom = function() {
      var userLang = $rootScope.currentLanguage();
      if ($scope.passwordone !== undefined || $scope.passwordtwo !== undefined) {
        if ($scope.passwordone === $scope.passwordtwo && $scope.passwordtwo.length > 6) {
          $scope.objuser = {};
          $scope.objuser.email = $scope.email;
          $scope.objuser.password = $scope.passwordone;
          $scope.objuser.password_confirmation = $scope.passwordtwo;
          $scope.objuser.lang = userLang;
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

            if (data.message === 'Not inserted') {
              $scope.errorMessages = [];
              if (data.error.email) {
                if (data.error.email[0] === 'The email has already been taken.') {
                  $scope.errorMessages.push('errorEmailAlreadyTaken');
                  $scope.didYouForgotPassword = true;
                } else {
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

  function SponzorsFollowingController($scope, $localStorage, sponzorshipRequest, $rootScope) {
    if($rootScope.userValidation('1')){
      $scope.section = {
        route:'Events / Follwing',
        title: 'Following Events'
      };
      $scope.user = JSON.parse($localStorage.user);
      if(!$scope.user.pendingSponzorships){
        $scope.user.pendingSponzorships = $scope.user.sponzorships.filter(function(e) {
          if (e.status === '0') {
            return e;
          }
        });
        $localStorage.user = JSON.stringify($scope.user);
      }

      $scope.showTasks = function(sponzorship) {
        $scope.currentSponzorship = sponzorship;
        $scope.tasksSponzor = sponzorship.perk.tasks.filter(function(element) {
          if (element.type === '0') {
            return element;
          }
        });
      };
      //this function deletes an sponzorship if the status is 0
      $scope.deleteSponzorship = function(sponzorshipId, index) {
        $rootScope.showLoading();
        sponzorshipRequest.deleteSponzorship(sponzorshipId).then(function successCallback(response){
          $scope.user.pendingSponzorships.splice(index, 1);
          $scope.user.sponzorships = $scope.user.sponzorships.filter(function(e) {
            if (e.id != sponzorshipId) {
              return e;
            }
          });
          $localStorage.user = JSON.stringify($scope.user);
          if($scope.user.pendingSponzorships[0]){
            $scope.showTasks($scope.user.pendingSponzorships[0]);
          }
          $rootScope.closeAllDialogs();
        }, function errorCallback(err){
          $rootScope.closeAllDialogs();
          $rootScope.showDialog('error', 'problem', false);
        });
      };
      if($scope.user.pendingSponzorships[0]){
        $scope.showTasks($scope.user.pendingSponzorships[0]);
      }
    }
  }
  angular.module('sponzorme').controller('SponzorsFollowingController', SponzorsFollowingController);

})();

'use strict';
(function() {

  function SponzorsFriendController($scope, $translate, userRequest, $rootScope, $localStorage) {
    if($rootScope.userValidation('1')){
      $scope.section = {
        route:'InviteFriend',
        title: 'Invite Friend'
      };
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
  function SponzorsMainController($scope, $translate, $localStorage, eventRequest, ngDialog, sponzorshipRequest, $rootScope, $sce) {
    if ($rootScope.userValidation('1')) {
      $scope.section = {
        route: 'Dashboard',
        title: 'Dashboard'
      }
      $scope.user = JSON.parse($localStorage.user);
      $scope.balance = 0;
      $scope.user.pendingSponzorships = $scope.user.sponzorships.filter(function(e) {
        if (e.status === '0') {
          return e;
        }
      });
      $scope.user.acceptedSponzorships = $scope.user.sponzorships.filter(function(e) {
        if (e.status > 0) {
          $scope.balance = parseInt(e.perk.usd) + parseInt($scope.balance);
          e.event.ends = new Date(e.event.ends).getTime();
          return e;
        }
      });
      if ($localStorage.events) {
        var events = JSON.parse($localStorage.events);
        $scope.search = events.filter(function(e) {
          if (e.location_reference !== 'ljsadljf3289uojklfhasd' && new Date(e.starts).getTime() > new Date().getTime()) {
            return e;
          }
        });
      }
      $localStorage.user = JSON.stringify($scope.user);
      $scope.trustSrc = function(src) {
        return $sce.trustAsResourceUrl(src);
      }
      $scope.getAllEvents = function() {
        $scope.searchLoading = true;
        eventRequest.allEvents().then(function successCallback(response) {
          $localStorage.events = JSON.stringify(response.data.data.events);
          $scope.search = [];
          $scope.search = response.data.data.events.filter(function(e) {
            if (e.location_reference !== 'ljsadljf3289uojklfhasd' && new Date(e.starts).getTime() > new Date().getTime()) {
              return e;
            }
          });
          $scope.searchLoading = false;
        }, function errorCallback() {
          $scope.searchLoading = false;
        });
      };
      $scope.openLocation = function(event) {
        $scope.currentEvent = event;
        $scope.mapSrc = "https://www.google.com/maps/embed/v1/place?key=AIzaSyDxXJIUmt5IDbqXuqNpD4ZssRl6aXBRhcU&q=" + encodeURIComponent($scope.currentEvent.location);
        ngDialog.open({
          template: 'views/templates/locationDialog.html',
          scope: $scope,
          showClose: true
        });
      };
      $scope.showPerks = function(event) {
        $scope.showForm = false;
        $scope.selectedPerk = false;
        $scope.currentEvent = event;
        ngDialog.open({
          template: 'views/templates/eventPerksDialog.html',
          scope: $scope,
          showClose: true
        });
      };
      $scope.formCreateSponzorship = function(perk) {
        $scope.newSponzorship = {
          'organizer_id': $scope.currentEvent.user_organizer.id,
          'sponzor_id': $localStorage.id,
          'event_id': $scope.currentEvent.id,
          'perk_id': perk.id,
          'cause': '',
          'status': 0
        };
        $scope.selectedPerk = perk;
      };
      $scope.showCauseForm = function() {
        $scope.showForm = true;
      };
      $scope.createSponzorship = function() {
        $rootScope.closeAllDialogs();
        $rootScope.showLoading();
        sponzorshipRequest.createSponzorship($scope.newSponzorship).then(function successCallback(response) {
          $scope.user.sponzorships.push(response.data.Sponzorship);
          $scope.user.pendingSponzorships.push(response.data.Sponzorship);
          $localStorage.user = JSON.stringify($scope.user);
          var info = {
            organizerId: $scope.currentEvent.user_organizer.id,
            eventName: $scope.currentEvent.title,
            lang: $rootScope.currentLanguage()
          };
          var firebaseNotification = {
            to: $scope.currentEvent.user_organizer.id,
            text: $translate.instant('NOTIFICATIONS.NewSponzorshipRequestfor') + $scope.currentEvent.title,
            link: '#/organizers/sponzors'
          };
          $rootScope.sendFirebaseNotification(firebaseNotification);
          sponzorshipRequest.sendSponzorshipEmailOrganizer(info).then(function() {});
          $rootScope.closeAllDialogs();
          $rootScope.showDialog('success', 'sponzorshipCreatedSuccesfuly', false);
        }, function errorCallback(err) {
          $rootScope.closeAllDialogs();
          if (err.status === 409) {
            $rootScope.showDialog('error', 'alreadySponzoring', false);
          } else {
            $rootScope.showDialog('error', 'youCanNotSponzorThisEvent', false);
          }
        });
      };
      $scope.menuprincipal = 'views/sponzors/menu.html';
    }
  }
  angular.module('sponzorme').controller('SponzorsMainController', SponzorsMainController);
})();

'use strict';
(function() {

  function SponzorsSettingsController($scope, $translate, userRequest, $localStorage, $location, $rootScope, ngDialog, categoryRequest, allInterestsServiceRequest, loginRequest, userInterestRequest) {
    if($rootScope.userValidation('1')){
      $scope.section = {
        route:'Settings',
        title: 'Settings'
      };
      $scope.user = JSON.parse($localStorage.user);
      allInterestsServiceRequest.allInterestsCategoriesId().success(function(sData) {
        $scope.interests = sData.InterestCategory;
      });
      $scope.removeUserInterest = function(index, id) {
        $scope.user.interests.splice(index, 1);
        userInterestRequest.deleteUserInterest(id).then(function() {});
      };

      $scope.addUserInterests = function(interest) {
        $scope.loadingSaveInterest = true;
        if (interest && interest.name) {
          var flag = false;
          if($scope.user.interests){
            for (var i = 0; i < $scope.user.interests.length; i++) {
              if ($scope.user.interests[i].interest_id === interest.id_interest) {
                flag = true;
                $scope.selected = '';
                $scope.loadingSaveInterest = false;
                $rootScope.showDialog('error', 'interestAlreadyInList', false);
                break;
              }
            }
          }
          if (!flag) {
            var dataInterest = {
              user_id: $localStorage.id,
              interest_id: interest.id_interest
            };
            userInterestRequest.createUserInterest(dataInterest).then(function successCallback(response) {
              $scope.user.interests.push(response.data.UserInterest);
              $localStorage.user = JSON.stringify($scope.user);
              $scope.selected = '';
              $scope.loadingSaveInterest = false;
            }, function errorCallback(err){
              $scope.loadingSaveInterest = false;
              $rootScope.showDialog('error', 'invalidInterestSelection', false);
              $scope.selected = '';
            });
          }
        }
        else {
          $scope.loadingSaveInterest = false;
          $rootScope.showDialog('error', 'invalidInterestSelection', false);
          $scope.selected = '';
        }
      };
      $scope.file = false; //By default no file to update.
      $scope.editAccount = function() {
        $rootScope.showLoading();
        if($scope.user.location!==$scope.locationUser){
          $scope.user.location = $scope.locationUser.formatted_address;
          $scope.user.location_reference = $scope.locationUser.place_id;
        }
        $scope.user.location = $scope.user.location.formatted_address;
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
              $scope.user.image = $rootScope.getConstants().AMAZONBUCKETURL + uniqueFileName;
              userRequest.editUserPatch($localStorage.id, $scope.user).then(function successCallback(response) {
                $localStorage.user = JSON.stringify($scope.user);
                $scope.file = false;
                $rootScope.closeAllDialogs();
                $rootScope.showDialog('success', 'accountInfoEditedSuccessfuly', false);
              }, function errorCallback(err) {
                $rootScope.closeAllDialogs();
                $rootScope.showDialog('error', 'errorEditingAccountInfo', false);
              });
            }
          });
        } else {
          userRequest.editUserPatch($localStorage.id, $scope.user).then(function successCallback(response) {
            $localStorage.user = JSON.stringify($scope.user);
            $scope.file = false;
            $rootScope.closeAllDialogs();
            $rootScope.showDialog('success', 'accountInfoEditedSuccessfuly', false);
          }, function errorCallback(err) {
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
          userRequest.editUserPatch($localStorage.id, $scope.user).then(function successCallback(response) {
            $localStorage.user = JSON.stringify($scope.user);
            $scope.file = false;
            $rootScope.closeAllDialogs();
            $rootScope.showDialog('success', 'accountInfoEditedSuccessfuly', false);
          }, function errorCallback(err) {
            $rootScope.closeAllDialogs();
            $rootScope.showDialog('error', 'errorEditingAccountInfo', false);
          });
        }
      };
      $scope.resetPassword = function() {
        if ($scope.password === $scope.passwordConfirmation) {
          $rootScope.showLoading();
          var formData = {
            'email': $localStorage.email,
            'password': $scope.password,
            'password_confirmation': $scope.passwordConfirmation
          };
          loginRequest.changePassword(formData, $localStorage.token).then(function successCallback(response) {
            $rootScope.closeAllDialogs();
            $localStorage.token = btoa($localStorage.email + ':' + $scope.passwordConfirmation);
            $rootScope.showDialog('success', 'PasswordChangedSuccesfully', false);
            $scope.password = '';
            $scope.passwordConfirmation = '';
          }, function errorCallback(err) {
            $rootScope.closeAllDialogs();
            $rootScope.showDialog('error', 'InvalidNewPassword', false);
          });
        } else {
          $rootScope.showDialog('error', 'PasswordNoMatch', false);
        }
      };
      $scope.menuprincipal = 'views/sponzors/menu.html';
    }
  }
  angular.module('sponzorme').controller('SponzorsSettingsController', SponzorsSettingsController);
})();

'use strict';
(function() {

  function SponzorsSponzorshipsController($scope, $location, taskSponzorRequest, sponzorshipRequest, $localStorage, ngDialog, $rootScope, ratingRequest) {
    if ($rootScope.userValidation('1')) {
      $scope.section = {
        route:'Events / Sponzoring',
        title: 'Sponzoring Events'
      };
      $scope.todayDate = new Date().getTime();
      $scope.user = JSON.parse($localStorage.user);
      if (!$scope.user.acceptedSponzorships) {
        $scope.user.acceptedSponzorships = $scope.user.sponzorships.filter(function(e) {
          if (e.status > '0') {
            e.event.ends = new Date(e.event.ends).getTime();
            return e;
          }
        });
        $localStorage.user = JSON.stringify($scope.user);
      }
      $scope.saveStatus = function() {
        for (var i = 0; i < $scope.user.acceptedSponzorships.length; i++) {
          if ($scope.user.acceptedSponzorships[i].id === $scope.currentSponzorship.id) {
            $scope.user.acceptedSponzorships[i] = $scope.currentSponzorship;
            break;
          }
        }
        //We update in general Sponzorships
        for (var i = 0; i < $scope.user.sponzorships.length; i++) {
          if ($scope.user.sponzorships[i].id === $scope.currentSponzorship.id) {
            $scope.user.sponzorships[i] = $scope.currentSponzorship;
            break;
          }
        }
        $localStorage.user = JSON.stringify($scope.user);
      };
      $scope.showTasks = function(sponzorship) {
        $scope.currentSponzorship = sponzorship;
        if (sponzorship.task_sponzor) {
          $scope.organizerTasks = sponzorship.task_sponzor.filter(function(element) {
            if (element.task.type === '0') {
              return element;
            }
          });
          $scope.sponzorTasks = sponzorship.task_sponzor.filter(function(element) {
            if (element.task.type === '1') {
              return element;
            }
          });
        }
      };
      $scope.paymentInformation = function(sponzorship) {
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
      //This function changes to 1 the sponzor task status
      $scope.changeStatus = function(index, status) {
        $scope.sponzorTasks[index].loading = true;
        var taskSponzorId = $scope.sponzorTasks[index].id;
        var data = {
          status: status
        };
        taskSponzorRequest.editTaskSponzorPatch(taskSponzorId, data).then(function successCallBack(response) {
          $scope.sponzorTasks[index].loading = false;
          $scope.sponzorTasks[index].status = status;
          $scope.saveStatus();
        }, function errorCallback(err) {
          $scope.sponzorTasks[index].loading = false;
          $rootScope.showDialog('error', 'errorUpdatingTaskStatus', false);
        });
      };
      $scope.deleteTaskSponzor = function(index) {
        $scope.sponzorTasks[index].loading = true;
        var taskSponzorId = $scope.sponzorTasks[index].id;
        taskSponzorRequest.deleteTaskSponzor(taskSponzorId).then(function successCallback(response) {
          for (var i = 0; i < $scope.currentSponzorship.task_sponzor.length; i++) {
            if ($scope.currentSponzorship.task_sponzor[i].id === taskSponzorId) {
              $scope.currentSponzorship.task_sponzor.splice(i, 1);
              break;
            }
          }
          $scope.sponzorTasks.splice(index, 1);
          $scope.saveStatus();
        }, function errorCallback(err) {
          $scope.sponzorTasks[index].loading = false;
          $rootScope.showDialog('error', 'errorRemovingTaskSponzor', false);
        });
      };
      $scope.showTaskForm = function() {
        $scope.todo = {
          type: 1, //Because is created by the Sponzor
          status: 0, //By default is not complete
          perk_id: $scope.currentSponzorship.perk.id,
          event_id: $scope.currentSponzorship.event_id,
          sponzorship_id: $scope.currentSponzorship.id,
          user_id: $localStorage.id,
          organizer_id: $scope.currentSponzorship.organizer.id,
          sponzor_id: $localStorage.id,
          title: '',
          description: ''
        };
        ngDialog.open({
          template: 'views/templates/newTaskForm.html',
          scope: $scope,
          showClose: false
        });
      };
      $scope.addTask = function() {
        $rootScope.closeAllDialogs();
        $rootScope.showLoading();
        taskSponzorRequest.createTaskSponzor($scope.todo).then(function successCallback(response) {
          $scope.currentSponzorship.perk.tasks.push(response.data.PerkTask);
          $scope.currentSponzorship.task_sponzor.push(response.data.TaskSponzor);
          $scope.saveStatus();
          $scope.showTasks($scope.currentSponzorship);
          $rootScope.closeAllDialogs();
          $rootScope.showDialog('success', 'taskCreatedSuccesfuly', false);
        }, function errorCallback(err) {
          console.log(err);
          $rootScope.closeAllDialogs();
          $rootScope.showDialog('error', 'errorCreatingTask', false);
        });
      };
      if ($scope.user.acceptedSponzorships.length) {
        $scope.showTasks($scope.user.acceptedSponzorships[0]);
      }
    }
  }
  angular.module('sponzorme').controller('SponzorsSponzorshipsController', SponzorsSponzorshipsController);
})();

'use strict';
(function() {
  function SponzorsRatingController($scope, $translate, userRequest, ngDialog, $rootScope, $localStorage, $routeParams, ratingRequest) {
    if ($rootScope.userValidation('1') && $routeParams.sponzorshipId) {
      $scope.section = {
        route:'Sponzorships / Rating',
        title: 'Sponzorship Rating'
      };
      $scope.loadingForm = true; //Loading
      $scope.user = JSON.parse($localStorage.user);
      if (!$scope.user.acceptedSponzorships) {
        $scope.user.acceptedSponzorships = $scope.user.sponzorships.filter(function(e) {
          if (e.status > '0') {
            e.event.ends = new Date(e.event.ends).getTime();
            return e;
          }
        });
        $localStorage.user = JSON.stringify($scope.user);
      }
      if (($scope.user.acceptedSponzorships[$routeParams.sponzorshipId].ratings[0] &&
          $scope.user.acceptedSponzorships[$routeParams.sponzorshipId].ratings[0].sponzor_id === $localStorage.id && $scope.user.acceptedSponzorships[$routeParams.sponzorshipId].ratings[0].type === '1'
        ) || ($scope.user.acceptedSponzorships[$routeParams.sponzorshipId].ratings[1] &&
          $scope.user.acceptedSponzorships[$routeParams.sponzorshipId].ratings[1].sponzor_id === $localStorage.id && $scope.user.acceptedSponzorships[$routeParams.sponzorshipId].ratings[1].type === '1')) {
        $rootScope.showDialog('error', 'ratingAlreadyRated', 'sponzors/sponzoring');
      } else {
        $scope.rating = {
          'sponzorship_id': $scope.user.acceptedSponzorships[$routeParams.sponzorshipId].id,
          'type': 1,
          'sponzor_id': $scope.user.acceptedSponzorships[$routeParams.sponzorshipId].sponzor_id,
          'organizer_id': $scope.user.acceptedSponzorships[$routeParams.sponzorshipId].organizer_id,
          'other': ''
        };
      }
      $scope.saveRating = function() { //Finally we save the rating information
        $rootScope.showLoading();
        if ($scope.rating.other) {
          $scope.rating.question5 = 'Other: ' + $scope.rating.other;
        }
        ratingRequest.createRating($scope.rating).then(function successCallback(response) {
          $scope.user.acceptedSponzorships[$routeParams.sponzorshipId].ratings.push(response.data.Rating);
          $localStorage.user = JSON.stringify($scope.user);
          $scope.rating = {};
          $rootScope.closeAllDialogs(); //Close Loading
          $rootScope.showDialog('success', 'ratingSponzorSuccess', 'sponzors/sponzoring');
        }, function errorCallback(response) {
          $scope.loadingForm = false; //Loading
          $rootScope.closeAllDialogs(); //Close Loading
          $rootScope.showDialog('error', 'invalidRateInfo', false);
        });
      };
      $scope.menuprincipal = 'views/sponzors/menu.html';
    }
  }
  angular.module('sponzorme').controller('SponzorsRatingController', SponzorsRatingController);
})();

'use strict';
(function() {
  function OrganizersCreateController($scope, $translate, userRequest, ngDialog, $location, $localStorage, eventRequest, perkRequest, $routeParams, $rootScope) {
    if ($routeParams.lang === 'en' || $routeParams.lang === 'es' || $routeParams.lang === 'pt') {
      $translate.use($routeParams.lang);
    }
    $scope.sendfrom = function() {
      var userLang = $rootScope.currentLanguage();
      if ($scope.passwordone !== undefined || $scope.passwordtwo !== undefined) {
        if ($scope.passwordone === $scope.passwordtwo && $scope.passwordtwo.length > 6) {
          $scope.objuser = {};
          $scope.objuser.email = $scope.email;
          $scope.objuser.password = $scope.passwordone;
          $scope.objuser.password_confirmation = $scope.passwordtwo;
          $scope.objuser.lang = userLang;
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
              if (userLang === 'en') {
                event_en.DEFAULT_EVENT.organizer = adata.User.id;
                eventRequest.createEventToken(event_en.DEFAULT_EVENT, btoa($scope.email + ':' + $scope.passwordone)).success(function(sData) {
                  angular.forEach(event_en.PERKS, function(value) {
                    value.id_event = sData.event.id;
                    perkRequest.createPerkToken(value, btoa($scope.email + ':' + $scope.passwordone)).success(function() { /*Empty Code, nothing necessary here*/ })
                      .error(function() { /*Empty Code, nothing necessary here*/ });
                  });
                  $scope.loagind = false;
                  $location.path('/customization');
                  $rootScope.closeAllDialogs();
                }).error(function() { /*Empty Code, nothing necessary here*/ });
              } else if (userLang === 'es') {
                event_es.DEFAULT_EVENT.organizer = adata.User.id;
                eventRequest.createEventToken(event_es.DEFAULT_EVENT, btoa($scope.email + ':' + $scope.passwordone)).success(function(sData) {
                  angular.forEach(event_es.PERKS, function(value) {
                    value.id_event = sData.event.id;
                    perkRequest.createPerkToken(value, btoa($scope.email + ':' + $scope.passwordone)).success(function() { /*Empty Code, nothing necessary here*/ })
                      .error(function() { /*Empty Code, nothing necessary here*/ });
                  });
                  $scope.loagind = false;
                  $location.path('/customization');
                  $rootScope.closeAllDialogs();
                }).error(function() { /*Empty Code, nothing necessary here*/ });
              } else if (userLang === 'pt') {
                event_pt.DEFAULT_EVENT.organizer = adata.User.id;
                eventRequest.createEventToken(event_pt.DEFAULT_EVENT, btoa($scope.email + ':' + $scope.passwordone)).success(function(sData) {
                  angular.forEach(event_pt.PERKS, function(value) {
                    value.id_event = sData.event.id;
                    perkRequest.createPerkToken(value, btoa($scope.email + ':' + $scope.passwordone)).success(function() { /*Empty Code, nothing necessary here*/ }).error(function() { /*Empty Code, nothing necessary here*/ });
                  });
                  $scope.loagind = false;
                  $location.path('/customization');
                  $rootScope.closeAllDialogs();
                }).error(function() { /*Empty Code, nothing necessary here*/ });
              }
            }
          }).error(function(data) {
            if (data.message === 'Not inserted') {
              $scope.errorMessages = [];
              if (data.error.email) {
                if (data.error.email[0] === 'The email has already been taken.') {
                  $scope.errorMessages.push('errorEmailAlreadyTaken');
                  $scope.didYouForgotPassword = true;
                } else {
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
(function () {

  function OrganizersEventsController($scope, $translate, $localStorage, eventRequest, ngDialog, perkTaskRequest, $rootScope) {
    if ($rootScope.userValidation('0')) {
      $scope.section = {
        route: 'Events',
        title: 'Events'
      };
      $scope.showTasks = function (p) {
        $scope.currentPerk = p;
        if($scope.currentPerk.tasks.length){
          var aux = $scope.currentPerk.tasks.filter(function (element) {
            if (element.type === '0') {
              return element;
            }
          });
          p.tasks = {};
          p.tasks = aux;
        }
      };
      $scope.showPerks = function (e) {
        $scope.currentEvent = e;
        $scope.currentPerk = {};
        if($scope.currentEvent.perks.length){
          $scope.showTasks($scope.currentEvent.perks[0]);
        }
        else{
          $scope.currentEvent.perks = [];
          $scope.currentEvent.perks.tasks = [];
        }
      };
      $scope.imageEvent = function (image) {
        $scope.currentImage = image;
        ngDialog.open({
          template: 'views/templates/eventImage.html',
          scope: $scope,
          showClose: false
        });
      };
      $scope.hasSponzorship = function (idEvent) {
        for (var i = 0; i < $scope.user.sponzorships_like_organizer; i++) {
          if ($scope.user.sponzorships_like_organizer[i].event.id === idEvent) {
            return true;
          }
        }
        return false;
      };

      $scope.removeEvent = function (index) {
        $rootScope.showLoading();
        if ($scope.hasSponzorship($scope.user.events[index].id)) {
          $rootScope.closeAllDialogs();
          $rootScope.showDialog('error', 'eventDeletingEventHasSponzorship', false);
        }
        else {
          eventRequest.deleteEvent($scope.user.events[index].id).then(function successCallback(response) {
            $scope.user.events.splice(index, 1);
            $localStorage.user = JSON.stringify($scope.user);
            if ($scope.user.events[0]) {
              $scope.currentEvent = $scope.user.events[0];
              $scope.currentPerk = $scope.user.events[0].perks[0];
            }
            else {
              $scope.currentEvent = {};
              $scope.currentPerk = {};
            }
            $rootScope.closeAllDialogs();
            $rootScope.showDialog('success', 'eventDeleteSuccesfully', false);
          }, function errorCallback(response) {
            $rootScope.closeAllDialogs();
            $rootScope.showDialog('error', 'errorDeletingEvent', false);
          });
        }
      };
      $scope.showTaskForm = function (cP, cE) {
        $scope.todo = {};
        $scope.todo.perk_id = cP.id;
        $scope.todo.event_id = cE.id;
        $scope.todo.status = 0; //We put the defaul status
        $scope.todo.user_id = $localStorage.id; //Get the organizer Id
        $scope.todo.type = 0; //If task is created by organizer the type is 0
        $scope.todo.title = '';
        $scope.todo.description = '';
        ngDialog.open({
          template: 'views/templates/newTaskForm.html',
          scope: $scope,
          showClose: false
        });
      };
      /*this function takes the current perk and the current event, and add a task for the
        selected perk.*/
      $scope.addTask = function () {
        $rootScope.closeAllDialogs();
        $rootScope.showLoading();
        perkTaskRequest.createPerkTask($scope.todo).then(function successCallback(response) {
          console.log(response);
          $scope.todo.id = response.data.PerkTask.id;
          for(var i = 0; i<$scope.user.events.length; i++){
            if($scope.user.events[i].id === response.data.PerkTask.event_id){
              for(var j = 0; j<$scope.user.events[i].perks.length; j++){
                if($scope.user.events[i].perks[j].id === response.data.PerkTask.perk_id){
                  $scope.user.events[i].perks[j].tasks.push(response.data.PerkTask);
                  break;
                }
              }
              break;
            }
          }
          $scope.user.sponzorships_like_organizer = response.data.sponzorships_like_organizer;
          $localStorage.user = JSON.stringify($scope.user);
          $rootScope.closeAllDialogs();
          $scope.todo = {};
        }, function errorCallback(response) {
          console.log(response);
          $rootScope.closeAllDialogs();
          $rootScope.showDialog('error', 'errorCreatingTask', false);
        });
      };

      $scope.removeTask = function (task_id, index) {
        $scope.currentPerk.tasks[index].loading = true;
        perkTaskRequest.deletePerkTask(task_id).then(function successCallback(response) {
          $scope.user.sponzorships_like_organizer = response.data.sponzorships_like_organizer;
          $scope.currentPerk.tasks.splice(index, 1);
          $localStorage.user = JSON.stringify($scope.user);
        }, function errorCallback(err) {
          $scope.currentPerk.tasks[index].loading = false;
          $rootScope.closeAllDialogs();
          $rootScope.showDialog('error', 'errorDeletingTask', false);
        });
      };
      $scope.user = JSON.parse($localStorage.user);
      if ($scope.user.events) {
        $scope.currentEvent = $scope.user.events[0];
        if($scope.currentEvent.perks.length){
          $scope.showPerks($scope.currentEvent);
        }
      }
      $scope.menuprincipal = 'views/organizers/menu.html';
    }
  }

  angular.module('sponzorme').controller('OrganizersEventsController', OrganizersEventsController);

})();

'use strict';
(function(){

function OrganizersFriendController($scope, $translate, $localStorage, userRequest, $rootScope) {
  if($rootScope.userValidation('0')){
    //Vars initialization
    $scope.section = {
      route:'InviteFriend',
      title: 'Invite Friend'
    };
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
  function OrganizersMainController($scope, $translate, $localStorage, rssRequest, $rootScope) {
    if($rootScope.userValidation('0')){
      $scope.section = {
        route:'Dashboard',
        title: 'Dashboard'
      };
      $scope.loadingevents = false;
      $scope.loadingrss = true;
      $scope.user = JSON.parse($localStorage.user);
      $scope.user.balance = 0;
      angular.forEach($scope.user.sponzorships_like_organizer, function(value) {
        if (value.status === '1') {
          $scope.user.balance = parseInt($scope.user.balance) + parseInt(value.perk.usd);
        }
      });
      if($scope.user.events){
        $scope.currentEvent = $scope.user.events[0];
      }
      $scope.showPerk = function(e){
        $scope.currentEvent = e;
      };
      $scope.rss = [];
      rssRequest.rss($rootScope.currentLanguage()).success(function(data) {
        $scope.rss = data.responseData.feed.entries;
        $scope.loadingrss = false;
      }).error(function() {
        $scope.loadingrss = false;
        $scope.noRssMessage = true;
      });
      $scope.menuprincipal = 'views/organizers/menu.html';
    }
  }
  angular.module('sponzorme').controller('OrganizersMainController', OrganizersMainController);

})();

'use strict';
(function() {
  function OrganizersSettingsController($scope, $translate, userRequest, $localStorage, $rootScope, allInterestsServiceRequest, loginRequest, userInterestRequest) {
    if ($rootScope.userValidation('0')) {
      $scope.section = {
        route: 'Settings',
        title: 'Settings'
      };
      $scope.user = JSON.parse($localStorage.user);
      allInterestsServiceRequest.allInterestsCategoriesId().success(function(sData) {
        $scope.interests = sData.InterestCategory;
      });
      $scope.removeUserInterest = function(index, id) {
        $scope.user.interests.splice(index, 1);
        userInterestRequest.deleteUserInterest(id).then(function() {});
      };
      $scope.addUserInterests = function(interest) {
        $scope.loadingSaveInterest = true;
        if (interest && interest.name) {
          var flag = false;
          if ($scope.user.interests) {
            for (var i = 0; i < $scope.user.interests.length; i++) {
              if ($scope.user.interests[i].interest_id === interest.id_interest) {
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
            userInterestRequest.createUserInterest(dataInterest).then(function successCallback(response) {
              $scope.user.interests.push(response.data.UserInterest);
              $localStorage.user = JSON.stringify($scope.user);
              $scope.selected = '';
              $scope.loadingSaveInterest = false;
            });
          }
        } else {
          $scope.loadingSaveInterest = false;
          $rootScope.showDialog('error', 'invalidInterestSelection', false);
          $scope.selected = '';
        }
      };
      $scope.file = false; //By default no file to update.
      $scope.editAccount = function() {
        $rootScope.showLoading();
        if ($scope.user.location !== $scope.locationUser) {
          $scope.user.location = $scope.locationUser.formatted_address;
          $scope.user.location_reference = $scope.locationUser.place_id;
        }
        $scope.user.location = $scope.user.location.formatted_address;
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
              $scope.user.image = $rootScope.getConstants().AMAZONBUCKETURL + uniqueFileName;
              userRequest.editUserPatch($localStorage.id, $scope.user).then(function successCallback(response) {
                $localStorage.user = JSON.stringify($scope.user);
                $scope.file = false;
                $rootScope.closeAllDialogs();
                $rootScope.showDialog('success', 'accountInfoEditedSuccessfuly', false);
              }, function errorCallback(err) {
                $rootScope.closeAllDialogs();
                $rootScope.showDialog('error', 'errorEditingAccountInfo', false);
              });
            }
          });
        } else {
          userRequest.editUserPatch($localStorage.id, $scope.user).then(function successCallback(response) {
            $localStorage.user = JSON.stringify($scope.user);
            $scope.file = false;
            $rootScope.closeAllDialogs();
            $rootScope.showDialog('success', 'accountInfoEditedSuccessfuly', false);
          }, function errorCallback(err) {
            $rootScope.closeAllDialogs();
            $rootScope.showDialog('error', 'errorEditingAccountInfo', false);
          });
        }
      };
      $scope.resetPassword = function() {
        if ($scope.password === $scope.passwordConfirmation) {
          $rootScope.showLoading();
          var formData = {
            'email': $localStorage.email,
            'password': $scope.password,
            'password_confirmation': $scope.passwordConfirmation
          };
          loginRequest.changePassword(formData, $localStorage.token).then(function successCallback(response) {
            $rootScope.closeAllDialogs();
            $localStorage.token = btoa($localStorage.email + ':' + $scope.passwordConfirmation);
            $rootScope.showDialog('success', 'PasswordChangedSuccesfully', false);
            $scope.password = '';
            $scope.passwordConfirmation = '';
          }, function errorCallback(err) {
            $rootScope.closeAllDialogs();
            $rootScope.showDialog('error', 'InvalidNewPassword', false);
          });
        } else {
          $rootScope.showDialog('error', 'PasswordNoMatch', false);
        }
      };
      $scope.menuprincipal = 'views/organizers/menu.html';
    }
  }
  angular.module('sponzorme').controller('OrganizersSettingsController', OrganizersSettingsController);
})();

'use strict';
(function() {
  function OrganizersSponzorshipsController($scope, $translate, taskSponzorRequest, sponzorshipRequest, $localStorage, ngDialog, $rootScope) {
    if ($rootScope.userValidation('0')) {
      $scope.section = {
        route: 'Sponzorships',
        title: 'Sponzorships'
      };
      $scope.getTasks = function(s) {
        if (s.task_sponzor.length) {
          var aux = s.task_sponzor.filter(function(element) {
            if (element.task.type === '0') {
              return element;
            }
          });
          s.task_sponzor = {};
          s.task_sponzor = aux;
        }
        $scope.currentSponzorship = s;
      };
      $scope.todayDate = new Date().getTime();
      $scope.user = JSON.parse($localStorage.user);
      if ($scope.user.sponzorships_like_organizer) {
        var aux = $scope.user.sponzorships_like_organizer.filter(function(element) {
          element.event.ends = new Date(element.event.ends).getTime();
          return element;
        });
        $scope.user.sponzorships_like_organizer.filter = aux;
        if ($scope.user.sponzorships_like_organizer.length) {
          $scope.getTasks($scope.user.sponzorships_like_organizer[0]);
        }
      }
      //This function changes to 1 the sponzorship status
      $scope.acceptSponzorship = function(sponzoshipId, i) {
        $scope.user.sponzorships_like_organizer[i].loading = true;
        $scope.currentSponzorshipId = sponzoshipId;
        var data = {
          status: 1
        };
        sponzorshipRequest.editSponzorshipPatch(sponzoshipId, data).then(function successCallback(response) {
          $scope.user.sponzorships_like_organizer[i].task_sponzor = response.data.Sponzorship.task_sponzor;
          $scope.user.sponzorships_like_organizer[i].status = 1;
          $scope.user.sponzorships_like_organizer[i].loading = false;
          $scope.currentSponzorship = $scope.user.sponzorships_like_organizer[i];
          $localStorage.user = JSON.stringify($scope.user);
          var info = {
            sponzorEmail: $scope.currentSponzorship.sponzor.email,
            sponzorName: $scope.currentSponzorship.sponzor.name,
            eventName: $scope.currentSponzorship.event.title,
            organizerEmail: $localStorage.email,
            lang: $rootScope.currentLanguage()
          };
          var firebaseNotification = {
            to: $scope.currentSponzorship.sponzor.id,
            text: $translate.instant('NOTIFICATIONS.SponzorshipAproved') + $scope.currentSponzorship.event.title + ' - ' + $scope.currentSponzorship.perk.kind,
            link: '#/sponzors/sponzoring'
          };
          //$rootScope.sendFirebaseNotification(firebaseNotification);
          //sponzorshipRequest.sendSponzorshipEmail(info).then(function successCallback() {});
        }, function errorCallback(response) {
          console.log(response);
          $scope.user.sponzorships_like_organizer[i].loading = false;
          $rootScope.showDialog('error', 'problem', false);
        });
      };
      //This function changes to 0 the sponzorship status
      $scope.unacceptSponzorship = function(sponzoshipId, i) {
        $scope.currentSponzorshipId = sponzoshipId;
        $scope.user.sponzorships_like_organizer[i].loading = true;
        var data = {
          status: 0
        };
        sponzorshipRequest.editSponzorshipPatch(sponzoshipId, data).then(function successCallback(response) {
          $scope.user.sponzorships_like_organizer[i].status = 0;
          $scope.user.sponzorships_like_organizer[i].task_sponzor = response.data.Sponzorship.task_sponzor;
          $scope.user.sponzorships_like_organizer[i].loading = false;
          $scope.currentSponzorship = $scope.user.sponzorships_like_organizer[i];
          $localStorage.user = JSON.stringify($scope.user);
          var firebaseNotification = {
            to: $scope.currentSponzorship.sponzor.id,
            text: $translate.instant('NOTIFICATIONS.SponzorshipRejected') + $scope.currentSponzorship.event.title + ' - ' + $scope.currentSponzorship.perk.kind,
            link: '#/sponzors/sponzoring'
          };
          $rootScope.sendFirebaseNotification(firebaseNotification);
        }, function errorCallback(response) {
          $scope.user.sponzorships_like_organizer[i].loading = false;
          $rootScope.showDialog('error', 'problem', false);
        });
      };
      //this function deletes an sponzorship if the status is 0
      $scope.deleteSponzorship = function(sponzorshipId, i) {
        $rootScope.showLoading();
        $scope.currentSponzorship = $scope.user.sponzorships_like_organizer[i];
        sponzorshipRequest.deleteSponzorship(sponzorshipId).then(function successCallback() {
          var firebaseNotification = {
            to: $scope.currentSponzorship.sponzor.id,
            text: $translate.instant('NOTIFICATIONS.SponzorshipDeleted') + $scope.currentSponzorship.event.title + ' - ' + $scope.currentSponzorship.perk.kind,
            link: '#/sponzors/sponzoring'
          };
          $rootScope.sendFirebaseNotification(firebaseNotification);
          $scope.user.sponzorships_like_organizer.splice(i, 1);
          $localStorage.user = JSON.stringify($scope.user);

          $scope.getTasks($scope.user.sponzorships_like_organizer[0]);
          $rootScope.closeAllDialogs();
          $rootScope.showDialog('success', 'successDeletingSponzorship', false);
        }, function errorCallback() {
          $rootScope.closeAllDialogs();
          $rootScope.showDialog('error', 'errorDeletingSponzorship', false);
        });
      };
      $scope.changeStatus = function(index, status) {
        $scope.currentSponzorship.task_sponzor[index].loading = true;
        var taskSponzorId = $scope.currentSponzorship.task_sponzor[index].id;
        var data = {
          status: status
        };
        taskSponzorRequest.editTaskSponzorPatch(taskSponzorId, data).then(function successCallBack(response) {
          $scope.currentSponzorship.task_sponzor[index].loading = false;
          $scope.currentSponzorship.task_sponzor[index].status = status;

          $localStorage.user = JSON.stringify($scope.user);

        }, function errorCallback(err) {
          $scope.currentSponzorship.task_sponzor[index].loading = false;
          $rootScope.showDialog('error', 'errorUpdatingTaskStatus', false);
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
      $scope.menuprincipal = 'views/organizers/menu.html';
    }
  }
  angular.module('sponzorme')
    .controller('OrganizersSponzorshipsController', OrganizersSponzorshipsController);

})();

'use strict';
(function() {
  function OrganizersEventEditController($scope, $translate, $localStorage, eventTypeRequest, eventRequest, categoryRequest, $rootScope, $routeParams) {
    if($rootScope.userValidation('0')){
      $scope.section = {
        route:'Events / Edit',
        title: 'Event Edit'
      };
      $scope.user = JSON.parse($localStorage.user);
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
      $scope.doEditEvent = function(idevent) {
        $rootScope.showLoading();
        $scope.eventData.organizer = $localStorage.id;
        if($scope.eventData.location!==$scope.locationEvent){
          $scope.eventData.location = $scope.locationEvent.formatted_address;
          $scope.eventData.location_reference = $scope.locationEvent.place_id;
        }
        $scope.eventData.organizer = $localStorage.id;
        $scope.eventData.starts = moment($scope.eventData.starts).format('YYYY-MM-DD HH:mm:ss');
        $scope.eventData.ends = moment($scope.eventData.ends).format('YYYY-MM-DD HH:mm:ss');
        eventRequest.editEventPut(idevent, $scope.eventData).then(function successCallback(response) {
          $scope.user.events[$routeParams.id] = response.data.event;
          $localStorage.user = JSON.stringify($scope.user);
          $rootScope.closeAllDialogs();
          $rootScope.showDialog('success', 'eventEditedSuccesfully', false);
        }, function errorCallback(response) {
          $rootScope.closeAllDialogs();
          $rootScope.showDialog('error', 'eventNoEdited', false);
        });
      };
      $scope.addPerk = function() {
        $scope.eventData.perks.push({
          kind: '',
          usd: 0,
          total_quantity: 1,
          reserved_quantity: 0
        });
      };
      $scope.removePerk = function(index) {
        $scope.eventData.perks.splice(index, 1);
      };
      $scope.eventData = {};
      $scope.eventData = $scope.user.events[$routeParams.id];
      $scope.eventData.starts = new Date($scope.eventData.starts).getTime();
      $scope.eventData.ends = new Date($scope.eventData.ends).getTime();
      $scope.menuprincipal = 'views/organizers/menu.html';
    }
  }
  angular.module('sponzorme').controller('OrganizersEventEditController', OrganizersEventEditController);
})();

'use strict';
(function() {
  function OrganizersEventCreateController($scope, $translate, $localStorage, eventTypeRequest, eventRequest, ngDialog, categoryRequest, $rootScope, $routeParams, eventbriteRequest) {
    //Function to parse JSON strings in JSON objects
    function jsonize(str) {
      return str.replace(/([\$\w]+)\s*:/g, function(_, $1) {
        return '"' + $1 + '":';
      }).replace(/'([^']+)'/g, function(_, $1) {
        return '"' + $1 + '"';
      });
    }
    if($rootScope.userValidation('0')){
      $scope.section = {
        route:'Events / Add',
        title: 'Event Add'
      };
      $scope.newEvent = {perks:[]};
      $scope.newEvent.starts = new Date().getTime();
      $scope.newEvent.ends = new Date().getTime();
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
        $scope.newEvent.location = $scope.locationevent.formatted_address;
        $scope.newEvent.location_reference = $scope.locationevent.place_id;
        $scope.newEvent.starts = moment($scope.newEvent.starts).format('YYYY-MM-DD HH:mm:ss');
        $scope.newEvent.ends = moment($scope.newEvent.ends).format('YYYY-MM-DD HH:mm:ss');
        $scope.newEvent.lang = $rootScope.currentLanguage();
        $scope.newEvent.organizer = $localStorage.id;
        eventRequest.createEvent($scope.newEvent).then(function successCallback(response) {
          $scope.user = JSON.parse($localStorage.user);
          $scope.user.events.push(response.data.event);
          $localStorage.user = JSON.stringify($scope.user);
          $scope.newEvent = {};
          $scope.locationevent = {};
          $rootScope.closeAllDialogs();
          $rootScope.showDialog('success', 'eventCreatedSuccesfully', false);
        }, function errorCallback() {
          $rootScope.closeAllDialogs();
          $rootScope.showDialog('error', 'errorCreatingEvent', false);
        });
      };
      //this function upload or create the event Image
      $scope.imageVerification = function() {
        $rootScope.showLoading();
        $scope.loadingNewEvent = true;
        $scope.errorNewEvent = false;
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
        $scope.newEvent.perks.push({
          kind: '',
          usd: 0,
          total_quantity: 1,
          reserved_quantity: 0
        });
      };
      //this function removes a SponzorshipType to the new event form
      $scope.removeSponzorshipType = function(index) {
        $scope.newEvent.perks.splice(index, 1);
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
            $scope.newEvent.title = data.name.text;
            $scope.newEvent.description = data.description.html;
            $scope.newEvent.starts = data.start.local;
            $scope.newEvent.ends = data.end.local;
            $scope.newEvent.privacy = 0;
            $rootScope.closeAllDialogs();
          });
      };
      $scope.prefilEventFormMeetup = function(e) {
        $scope.newEvent.title = e.name;
        $scope.newEvent.description = e.description;
        $scope.newEvent.starts = new Date(e.time);
        var dataTime = new Date(e.time);
        var timer = parseInt(1 * 2 * 60 * 60 * 1000);
        var dataExpDate = new Date(dataTime.getTime() + timer);
        $scope.newEvent.ends = new Date(dataExpDate);
        $scope.privacyevent = 0;
        $rootScope.closeAllDialogs();
      };
      $scope.menuprincipal = 'views/organizers/menu.html';
    }
  }
  angular.module('sponzorme').controller('OrganizersEventCreateController', OrganizersEventCreateController);
})();

'use strict';
(function() {
  function OrganizersRatingController($scope, $translate, $rootScope, $localStorage, $routeParams, ratingRequest) {
    if ($rootScope.userValidation('0') && $routeParams.sponzorshipId) {
      $scope.section = {
        route:'Sponzorships / Rating',
        title: 'Sponzorship Rating'
      };
      $scope.loadingForm = true; //Loading
      $scope.user = JSON.parse($localStorage.user);
      if ( ($scope.user.sponzorships_like_organizer[$routeParams.sponzorshipId].ratings[0] &&
        $scope.user.sponzorships_like_organizer[$routeParams.sponzorshipId].ratings[0].organizer_id === $localStorage.id
        && $scope.user.sponzorships_like_organizer[$routeParams.sponzorshipId].ratings[0].type === '0'
      ) || ($scope.user.sponzorships_like_organizer[$routeParams.sponzorshipId].ratings[1] &&
          $scope.user.sponzorships_like_organizer[$routeParams.sponzorshipId].ratings[1].organizer_id === $localStorage.id
          && $scope.user.sponzorships_like_organizer[$routeParams.sponzorshipId].ratings[1].type === '0')) {
        $rootScope.showDialog('error', 'ratingAlreadyRated', '/organizers/sponzors');
      } else {
        $scope.rating = {
          'sponzorship_id': $scope.user.sponzorships_like_organizer[$routeParams.sponzorshipId].id,
          'type': 0,
          'sponzor_id': $scope.user.sponzorships_like_organizer[$routeParams.sponzorshipId].sponzor_id,
          'organizer_id': $scope.user.sponzorships_like_organizer[$routeParams.sponzorshipId].organizer_id,
          'other': ''
        };
      }

      $scope.saveRating = function() { //Finally we save the rating information
        $rootScope.showLoading();
        if ($scope.rating.other) {
          $scope.rating.question5 = 'Other: ' + $scope.rating.other;
        }
        ratingRequest.createRating($scope.rating).then(function successCallback(response) {
          $scope.user.sponzorships_like_organizer[$routeParams.sponzorshipId].ratings.push(response.data.Rating);
          $localStorage.user = JSON.stringify($scope.user);
          $scope.rating = {};
          $rootScope.closeAllDialogs(); //Close Loading
          $rootScope.showDialog('success', 'ratingOrganizerSuccess', '/organizers/sponzors');
        }, function errorCallback(response) {
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
  function NotificationController($scope, $translate, $localStorage, $firebaseArray, $rootScope) {
    if($localStorage.id){
      $scope.help = 0;
      var notificationsRef = new Firebase($rootScope.getConstants().FURL + 'notifications');
      var query = notificationsRef.orderByChild('to').equalTo($localStorage.id).limitToLast(25);
      $scope.notifications = $firebaseArray(query);
      notificationsRef.orderByChild('to').equalTo($localStorage.id).on('child_added', function() {
        $scope.help++;
      });
      notificationsRef.orderByChild('to').equalTo($localStorage.id).on('child_removed', function() {
        $scope.help--;
      });
    }
  }
  angular.module('sponzorme').controller('NotificationController', NotificationController);
})();

'use strict';
(function() {
  function ChatController($scope, $firebaseArray, $localStorage, $location, $routeParams, sponzorshipRequest, $rootScope) {
    if($localStorage.id){
      $scope.section = {
        route:'Sponzorship / Chat',
        title: 'Sponzorship Chat'
      };
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
            $location.path('/login');
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
  function ProfileController($scope, $routeParams, userRequest, ratingRequest, $rootScope) {
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
        }).error(function() {
          $rootScope.closeAllDialogs();
          $rootScope.showDialog('error', 'problem', '/');
        });
      } else if (userData.data.user.type === '1') {
        ratingRequest.ratingsBySponzor($routeParams.userId).success(function(ratingsData) {
          $scope.ratings = ratingsData.data.Rating;
          $scope.loading = false;
          $rootScope.closeAllDialogs();
        }).error(function() {
          $rootScope.closeAllDialogs();
          $rootScope.showDialog('error', 'problem', '/');
        });
      } else {
        $rootScope.closeAllDialogs();
        $rootScope.showDialog('error', 'problem', '/');
      }
    }).error(function() {
      $rootScope.closeAllDialogs();
      $rootScope.showDialog('error', 'problem', '/');
    });
  }
  angular.module('sponzorme').controller('ProfileController', ProfileController);
})();

'use strict';
(function() {
  function DialogController($scope, $translate, ngDialog, $location, $timeout, $localStorage) {
    $scope.close = function(redirect) {
      $location.path(redirect);
      ngDialog.closeAll();
    };
    $scope.closeLoading = function() {
      $location.path('/login');
      ngDialog.closeAll();
    };
    $scope.delayed = false;
    if ($scope.delayed === false) {
      $timeout(function() {
        $scope.delayed = true;
      }, 15000);
    }
  }
  angular.module('sponzorme').controller('DialogController', DialogController);
})();
