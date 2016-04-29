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
    'base64',
    'ngCookies',
    'ngStorage',
    'google.places',
    'angularSpinner',
    'angularUtils.directives.dirPagination',
    'firebase',
    'angular-input-stars',
    'ngMaterial',
    'ngAria',
    'ngAnimate',
    'ngMessages',
    'textAngular'
  ]);
})();

(function() {
  'use strict';
  angular
    .module('sponzorme')
    .constant('DEFAULTLANG', 'en')
    .constant('DEMOSTEPS', 4)
    .constant('MAXPERKLIMIT', 70)
    .constant('MAXAGE', 100)
    .constant('MINAGE', 16)
    .constant('SPONZORSHIPSTATUSES',['pending','accepted', 'save', 'paid', 'payment in process'])
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
      templateUrl: 'login/login.html',
      controller: 'LoginController',
      controllerAs: 'lc'
    })

    .when('/', {
      templateUrl: 'login/login.html',
      controller: 'LoginController',
      controllerAs: 'lc'
    })

    .when('/login', {
      templateUrl: 'login/login.html',
      controller: 'LoginController',
      controllerAs: 'lc'
    })

    .when('/logout', {
      templateUrl: 'login/login.html',
      controller: 'LogoutController',
      controllerAs: 'lc'
    })

    .when('/sign-up/sponsor', {
      templateUrl: 'sponzors-create/create.html',
      controller: 'SponzorsCreateController',
      controllerAs: 'scc'
    })

    .when('/sign-up/organizer', {
      templateUrl: 'organizers-create/create.html',
      controller: 'OrganizersCreateController',
      controllerAs: 'occ'
    })

    .when('/activation/:token', {
      templateUrl: 'login/login.html',
      controller: 'LoginController',
      controllerAs: 'lc'
    })
    
    .when('/forgot', {
      templateUrl: 'forgot/forgot.html',
      controller: 'ForgotController',
      controllerAs: 'fc'
    })
    
    .when('/reset/:tokenReset', {
      templateUrl: 'forgot/reset.html',
      controller: 'ForgotController',
      controllerAs: 'fc'
    })
    
    .when('/event/:eventId', {
      templateUrl: 'event-landing/landing.html',
      controller: 'LandingController',
      controllerAs: 'lc'
    })

    //Sponzors
    .when('/sponzors/dashboard', {
        templateUrl: 'sponzors-main/main.html',
        controller: 'SponzorsEventMainController',
        controllerAs: 'semc'
      })
      .when('/sponzors/outstanding', {
        templateUrl: 'sponzors-outstanding/outstanding.html',
        controller: 'SponzorsEventMainController',
        controllerAs: 'semc'
      })
      .when('/sponzors/saved', {
        templateUrl: 'sponzors-saved/saved.html',
        controller: 'SponzorsEventMainController',
        controllerAs: 'semc'
      })
      .when('/sponzors/settings/profile', {
        templateUrl: 'sponzors-settings/profile.html',
        controller: 'SponzorsProfileController',
        controllerAs: 'spc'
      })
      .when('/sponzors/settings/preferences', {
        templateUrl: 'sponzors-settings/preferences.html',
        controller: 'SponzorsPreferencesController',
        controllerAs: 'spc'
      })
      .when('/sponzors/settings/ratings', {
        templateUrl: 'sponzors-settings/ratings.html',
        controller: 'SponzorsRatingsController',
        controllerAs: 'src'
      })
      .when('/sponzors/sponzoring', {
        templateUrl: 'sponzors-sponzoring/sponzorships.html',
        controller: 'SponzorsSponzorshipsController',
        controllerAs: 'ssc'
      })
      .when('/sponzors/sponzoring/:id', {
        templateUrl: 'sponzors-sponzoring/sponzorshipsId.html',
        controller: 'SponzorsSponzorshipsController',
        controllerAs: 'ssc'
      })
      .when('/sponzors/tasks', {
        templateUrl: 'sponzors-tasks/tasks.html',
        controller: 'SponzorsTasksController',
        controllerAs: 'stc'
      })
      .when('/sponzors/task/:id', {
        templateUrl: 'sponzors-tasks/taskId.html',
        controller: 'SponzorsTasksController',
        controllerAs: 'stc'
      })
      .when('/sponzors/tasks/create', {
        templateUrl: 'sponzors-tasks/tasks_create.html',
        controller: 'SponzorsCreateTasksController',
        controllerAs: 'sctc'
      })
      .when('/sponzors/notifications', {
        templateUrl: 'sponzors-notifications/notifications.html',
        controller: 'SponzorsNotificationsController',
        controllerAs: 'snc'
      })
      .when('/sponzors/notifications/importants', {
        templateUrl: 'sponzors-notifications/importants.html',
        controller: 'SponzorsNotificationsController',
        controllerAs: 'snc'
      })
      .when('/sponzors/notifications/readed', {
        templateUrl: 'sponzors-notifications/readed.html',
        controller: 'SponzorsNotificationsController',
        controllerAs: 'snc'
      })
      .when('/sponzors/notification/:id', {
        templateUrl: 'sponzors-notifications/detail.html',
        controller: 'SponzorsNotificationsController',
        controllerAs: 'snc'
      })
      .when('/sponzors/event/:eventId', {
        templateUrl: 'sponzors-event/event.html',
        controller: 'SponzorsEventController',
        controllerAs: 'sec'
      })
      .when('/sponzors/invite', {
        templateUrl: 'sponzors-invite/invite.html',
        controller: 'SponzorsInviteController',
        controllerAs: 'sic'
      })
      .when('/sponzors/chat/sponzorship/:sponzorshipId', {
        templateUrl: 'sponzors-chat/chat.html',
        controller: 'SponzorsChatController',
        controllerAs: 'scc'
      })
      .when('/sponzors/rate/sponzorship/:sponzorshipId', {
        templateUrl: 'sponzors-rate/rate-form.html',
        controller: 'SponzorsRateController',
        controllerAs: 'src'
      })

    //Organizers
    .when('/organizers/dashboard', {
        templateUrl: 'organizers-main/main.html',
        controller: 'OrganizersMainController',
        controllerAs: 'omc'
      })
      .when('/organizers/sponzors', {
        templateUrl: 'organizers-sponzors/sponzors.html',
        controller: 'OrganizersSponzorsController',
        controllerAs: 'osc'
      })
      .when('/organizers/balance', {
        templateUrl: 'organizers-balance/balance.html',
        controller: 'OrganizersBalanceController',
        controllerAs: 'obc'
      })
      .when('/organizers/event/record', {
        templateUrl: 'organizers-main/record.html',
        controller: 'OrganizersMainController',
        controllerAs: 'omc'
      })
      .when('/organizers/news', {
        templateUrl: 'organizers-news/news.html',
        controller: 'OrganizersNewsController',
        controllerAs: 'onc'
      })
      //Organizers Notifications
      .when('/organizers/notifications', {
        templateUrl: 'organizers-notifications/notifications.html',
        controller: 'OrganizersNotificationsController',
        controllerAs: 'onc'
      })
      .when('/organizers/notifications/importants', {
        templateUrl: 'organizers-notifications/importants.html',
        controller: 'OrganizersNotificationsController',
        controllerAs: 'onc'
      })
      .when('/organizers/notifications/readed', {
        templateUrl: 'organizers-notifications/readed.html',
        controller: 'OrganizersNotificationsController',
        controllerAs: 'onc'
      })
      .when('/organizers/notification/:id', {
        templateUrl: 'organizers-notifications/detail.html',
        controller: 'OrganizersNotificationsController',
        controllerAs: 'onc'
      })
      //Organizers Settings
      .when('/organizers/settings/profile', {
        templateUrl: 'organizers-settings/profile.html',
        controller: 'OrganizersProfileController',
        controllerAs: 'opc'
      })
      .when('/organizers/settings/preferences', {
        templateUrl: 'organizers-settings/preferences.html',
        controller: 'OrganizersPreferencesController',
        controllerAs: 'opc'
      })
      .when('/organizers/settings/rate', {
        templateUrl: 'organizers-settings/rate.html',
        controller: 'OrganizersRateController',
        controllerAs: 'orc'
      })
      //Organizers Tasks
      .when('/organizers/tasks', {
        templateUrl: 'organizers-tasks/tasks.html',
        controller: 'OrganizersTasksController',
        controllerAs: 'otc'
      })
      .when('/organizers/task/:id', {
        templateUrl: 'organizers-tasks/taskId.html',
        controller: 'OrganizersTasksController',
        controllerAs: 'otc'
      })
      .when('/organizers/tasks/create', {
        templateUrl: 'organizers-tasks/tasks_create.html',
        controller: 'OrganizersCreateTasksController',
        controllerAs: 'octc'
      })
      .when('/organizers/event/:eventId', {
        templateUrl: 'organizers-event-edit/edit.html',
        controller: 'OrganizersEventEditController',
        controllerAs: 'oeec'
      })
      .when('/organizers/add/event', {
        templateUrl: 'organizers-event-add/add.html',
        controller: 'OrganizersEventAddController',
        controllerAs: 'oeac'
      })
      .when('/eventbrite/:eventBriteCode', {
        templateUrl: 'organizers-event-add/add.html',
        controller: 'OrganizersEventAddController',
        controllerAs: 'oeac'
      })
      .when('/meetup/:meetupCode', {
        templateUrl: 'organizers-event-add/add.html',
        controller: 'OrganizersEventAddController',
        controllerAs: 'oeac'
      })
      .when('/organizers/sponzor/profile/:idSponsor', {
        templateUrl: 'organizers-sponzor-profile/profile.html',
        controller: 'OrganizersSponzorProfileController',
        controllerAs: 'ospc'
      })
      .when('/organizers/chat/sponzorship/:sponzorshipId', {
        templateUrl: 'organizers-chat/chat.html',
        controller: 'OrganizersChatController',
        controllerAs: 'occ'
      })
      .when('/organizers/sponsor/rating/:sponzorshipId', {
        templateUrl: 'organizers-sponzor-rating/rating.html',
        controller: 'OrganizersSponsorRatingController',
        controllerAs: 'osrc'
      })
      .when('/organizers/event/tasks/:eventId', {
        templateUrl: 'organizers-event-tasks/tasks.html',
        controller: 'OrganizersEventTasksController',
        controllerAs: 'oetc'
      })
      .when('/organizers/invite', {
        templateUrl: 'organizers-invite/invite.html',
        controller: 'OrganizersInviteController',
        controllerAs: 'oic'
      })
      .otherwise({
        redirect: '/login'
      });
  }]);
})();

/**
 * @author Sebastian Gomez
 * This functions detect the enviroment and set the configuration
 */
(function() {
  'use strict';
  angular.module('sponzorme').run(['$rootScope', function($rootScope) {
    $rootScope.getConstants = function() {
      var host = window.location.hostname; // Get the host
      if (host.indexOf('localhost') > -1) { //Localhost
        return {
          //'URL': 'http://apidev.sponzor.me/',
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
(function () {
  'use strict';
  angular.module('sponzorme').run(
    ['$rootScope', '$translate', '$location', 'allInterestsServiceRequest', '$filter', '$localStorage', 'userRequest', '$firebaseArray', '$firebaseObject',
      function ($rootScope, $translate, $location, allInterestsServiceRequest, $filter, $localStorage, userRequest, $firebaseArray, $firebaseObject, EXPIRATIONTIME) {
        var host = window.location.href;
        if (window.location.protocol === 'http:' && host.indexOf('localhost') <= -1) {
          var aux = host.replace('http:', 'https:');
          window.location.href = aux;
        }
        $rootScope.sendFirebaseNotification = function (notification, to) {
          notification.date = new Date().getTime();
          var notificationsRef = new Firebase($rootScope.getConstants().FURL + 'notifications/' + to);
          var notifications = $firebaseArray(notificationsRef);
          notifications.$add(notification);
        };
        /*
         * Author: Sebastian Gomez
         * This function allows change the language whatever be the route
         * for this reason this is a global function
         */
        $rootScope.changeLanguage = function (key) {
          $translate.use(key);
        };
        /*
         * Author: Sebastian Gomez
         * This function return the current languaje used in the application
         */
        $rootScope.currentLanguage = function () {
          return $translate.use();
        };

        $rootScope.isExpiredData = function () {
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
        $rootScope.getExtension = function (filename) {
          return (/[.]/.exec(filename)) ? /[^.]+$/.exec(filename) : undefined;
        };
        $rootScope.uniqueString = function () {
          var text = '';
          var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
          for (var i = 0; i < 8; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
          }
          return text;
        };
        $rootScope.userValidation = function (shouldType) {
          host = window.location.href;
          $rootScope.isExpiredData();
          if ($localStorage.email && $localStorage.id > 0 && $localStorage.token && $localStorage.type === shouldType && $localStorage.user) {
            $rootScope.$storage = $localStorage;
            return true;
          } else {
            $localStorage.redirectTo = host;
            $location.path('/login');
            return false;
          }
        };
      }]).controller('NotificationController', ["$scope", "$translate", "$localStorage", "$firebaseArray", "$rootScope", "userRequest", function ($scope, $translate, $localStorage, $firebaseArray, $rootScope, userRequest) {
        if ($localStorage.id) {
          $scope.help = $localStorage.help;
          var notificationsRef = new Firebase($rootScope.getConstants().FURL + 'notifications/' + $localStorage.id);
          $scope.notifications = $firebaseArray(notificationsRef);
          notificationsRef.on('child_added', function (snapshot) {
            var current = snapshot.val();
            if ($localStorage.lastUpdate < current.date) {
              $localStorage.help = true;
              $scope.help = true;
              userRequest.home($localStorage.id).then(function successCallback(response) {
                $localStorage.lastUpdate = new Date().getTime();
                $scope.user = response.data.data.user;
                $localStorage.user = JSON.stringify($scope.user);
                $localStorage.$apply();
              });
            }
          });
        }
      }]);
})();

/**
 * @author Sebastian Gomez
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
    .directive('filea', function() {
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
            scope.$parent.imageVerification();
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
    .directive('stars', function() {
      return {
        restrict: 'E',
        template: '<div></div>',
        link: function(scope, element, attrs) {
          var intPart = Math.floor(attrs.number);
          var decimalPart = attrs.number - Math.floor(attrs.number);
          var halfStarString;
          if(intPart < 5){
            halfStarString = '<i class="material-icons orange600 md-12">star_border</i>';
          }
          else{
            halfStarString = '';
          }
          if (decimalPart > 0.48) {
            halfStarString = '<i class="material-icons orange600 md-12">star_half</i>';
          }
          var starBorderString = '';
          var starRateString = '';
          for (var i = 0; i < 5 - intPart - 1; i++) {
            starBorderString = starBorderString + '<i class="material-icons orange600 md-12">star_border</i>';
          }
          for (i = 0; i < intPart; i++) {
            starRateString = starRateString + '<i class="material-icons orange600 md-12">star_rate</i>';
          }
          element.html('<span class="stars2">' + starRateString + halfStarString + starBorderString + '</span>');
        },
        replace: true
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
  categoryRequest.$inject = ["$http", "$rootScope"];
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
  eventRequest.$inject = ["$http", "$localStorage", "$httpParamSerializerJQLike", "$rootScope"];
  function eventRequest($http, $localStorage, $httpParamSerializerJQLike, $rootScope) {
    var token = $localStorage.token;
    return {
      allEvents: function() {
        return $http.get($rootScope.getConstants().URL + 'events');

      },
      oneEvent: function(eventId) {
        return $http.get($rootScope.getConstants().URL + 'events/' + eventId);

      },
      saveEvent: function(eventId, userId) {
        return $http.get($rootScope.getConstants().URL + 'events/save/' + eventId + '/' + userId);
      },
      saveRemoveEvent: function(eventId) {
        return $http.get($rootScope.getConstants().URL + 'events/remove_saved/' + eventId);
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
      deleteEvent: function(eventId) {
        return $http({
          method: 'DELETE',
          url: $rootScope.getConstants().URL + 'events/' + eventId,
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + token
          }
        });
      },
      editEventPut: function(eventId, data) {
        return $http({
          method: 'PUT',
          url: $rootScope.getConstants().URL + 'events/' + eventId,
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
  eventTypeService.$inject = ["$http", "$rootScope"];
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
  allInterestsServiceRequest.$inject = ["$http", "$rootScope"];
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
  loginRequest.$inject = ["$http", "$httpParamSerializerJQLike", "$rootScope"];
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
  perkRequest.$inject = ["$http", "$localStorage", "$httpParamSerializerJQLike", "$rootScope"];
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
  perkTaskRequest.$inject = ["$http", "$localStorage", "$httpParamSerializerJQLike", "$rootScope"];
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
  sponzorshipRequest.$inject = ["$http", "$localStorage", "$httpParamSerializerJQLike", "$rootScope"];
  function sponzorshipRequest($http, $localStorage, $httpParamSerializerJQLike, $rootScope) {
    var token = $localStorage.token;
    return {
      oneSponzorship: function(sponzorshipId) {
        return $http.get($rootScope.getConstants().URL + 'sponzorships/' + sponzorshipId);
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
  taskSponzorRequest.$inject = ["$http", "$localStorage", "$httpParamSerializerJQLike", "$rootScope"];
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

  userInterestRequest.$inject = ["$http", "$localStorage", "$httpParamSerializerJQLike", "$rootScope"];
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
      bulkUserInterest: function(data) {
        return $http({
          method: 'PUT',
          url: $rootScope.getConstants().URL + 'user_interests/1',
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
  userRequest.$inject = ["$http", "$localStorage", "$httpParamSerializerJQLike", "$rootScope"];
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
  rssRequest.$inject = ["$http"];
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
  ratingRequest.$inject = ["$http", "$localStorage", "$httpParamSerializerJQLike", "$rootScope"];
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
  eventbriteRequest.$inject = ["$http", "$localStorage", "$httpParamSerializerJQLike", "$rootScope"];
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


(function () {
  'use strict';
  notificationRequest.$inject = ["$http", "$localStorage", "$httpParamSerializerJQLike", "$rootScope"];
  function notificationRequest($http, $localStorage, $httpParamSerializerJQLike, $rootScope) {
    var token = $localStorage.token;
    return {
      sendChatMailNotification: function (data) {
        return $http({
          method: 'POST',
          url: $rootScope.getConstants().URL + 'chat/notification',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + token
          },
          data: $httpParamSerializerJQLike(data)
        });
      }
    };
  }
  angular.module('sponzorme').factory('notificationRequest', notificationRequest);
})();


(function() {
  'use strict';
  dialogRequest.$inject = ["$mdDialog"];
    function dialogRequest($mdDialog) {
      return {
        showLoading: function(){
          var parentEl = angular.element(document.body);
          $mdDialog.show({
            parent: parentEl,
            templateUrl: 'dialogs/loadingDialog.html'
          });
        },
        showDialog: function(type, message, redirect){
          DialogController.$inject = ["$scope", "$mdDialog", "message", "redirect", "$location"];
          var parentEl = angular.element(document.body);
          if(type === 'error'){
            var template = 'dialogs/errorDialog.html';
          }
          else if(type === 'success'){
            var template = 'dialogs/successDialog.html';
          }
          $mdDialog.show({
            parent: parentEl,
            templateUrl: template,
            locals: {
              message: message,
              redirect: redirect
            },
            controller: DialogController
          });
          function DialogController($scope, $mdDialog, message, redirect, $location) {
            $scope.message = message;
            $scope.redirect = redirect;
            $scope.closeDialog = function(){
              $mdDialog.hide();
              $mdDialog.cancel();
              if(redirect){
                console.log('Con redirect', redirect);
                $location.path(redirect);
              }
            };
          };
        },
        closeLoading: function(){
          $mdDialog.hide();
          $mdDialog.cancel();
        }
    };
  }
  angular.module('sponzorme').factory('dialogRequest', dialogRequest);
})();

'use strict';
(function() {
  SponzorsEventMainController.$inject = ["$scope", "$localStorage", "$rootScope", "eventRequest", "$location", "dialogRequest"];
  function SponzorsEventMainController($scope, $localStorage, $rootScope, eventRequest, $location, dialogRequest) {
    if ($rootScope.userValidation('1')) {
      var vm = this;
      vm.user = JSON.parse($localStorage.user);
      vm.saveEvent = function(eventId){
        var aux = vm.user.saved_events.filter(function(e){
          if(e.event.id === eventId){
            return e;
          }
        });
        if(aux.length){
          dialogRequest.showDialog('error', 'alreadySaved', false);
        }
        else{
          dialogRequest.showLoading();
          eventRequest.saveEvent(eventId, $localStorage.id).then(function(response){
            console.log(response);
            vm.user.saved_events.push(response.data.event);
            $localStorage.user = JSON.stringify(vm.user);
            dialogRequest.closeLoading();
            $location.path('/sponzors/saved');
          }, function(err){
            console.log(response);
            dialogRequest.closeLoading();
            dialogRequest.showDialog('error', 'invalidEvent', false);
          });
        }
      };
      vm.saveRemoveEvent = function(eventId, index){
        dialogRequest.showLoading();
        eventRequest.saveRemoveEvent(eventId).then(function(response){
          vm.user.saved_events.splice(index, 1);
          $localStorage.user = JSON.stringify(vm.user);
          dialogRequest.closeLoading();
          dialogRequest.showDialog('success', 'removeSuccessfully', '/sponzors/dashboard');

        }, function(err){
          dialogRequest.closeLoading();
          dialogRequest.showDialog('error', 'invalidEvent', false);
        });
      };
    }
  }
  angular.module('sponzorme').controller('SponzorsEventMainController', SponzorsEventMainController);
})();

(function () {
  'use strict';
  /*This controller has two responsabilities
   First show all Events
   Second allows make a filter based on the interests*/
  SponzorsMainController.$inject = ["$scope", "$localStorage", "$rootScope", "dialogRequest", "$location"];
  function SponzorsMainController($scope, $localStorage, $rootScope, dialogRequest, $location) {
    if ($rootScope.userValidation('1')) {
      var vm = this;
      vm.events = [];
      vm.filter = [];
      vm.user = JSON.parse($localStorage.user);
      var events;

      vm.filterEvents = function () {
        vm.events = [];
        vm.events = events.filter(function (e) {
          for (var j = 0; j < vm.filter.length; j++) {
            if (
              e.title.indexOf(vm.filter[j]) > -1 ||
              e.description.indexOf(vm.filter[j]) > -1
            ) {
              return e;
            }
          }
        });
      };

      vm.filterEventsByText = function () {
        vm.events = [];
        var reg = new RegExp(vm.search, 'i');
        vm.events = events.filter(function (e) {
          if (
            
            e.title.search(reg) > -1 ||
            e.description.search(reg) > -1
          ) {
            return e;
          }
        });
      };

      vm.goEvent = function (eventId) {
        $location.path('/sponzors/event/' + eventId);
      };

      vm.filterClick = function (interest) {
        vm.filter.push(interest);
        vm.filterEvents();
      };

      vm.filterRemove = function () {
        if (vm.filter.length) {
          vm.filterEvents();
        }
        else {
          vm.restoreEvents();
        }
      };

      vm.restoreEvents = function () {
        vm.events = [];
        if ($localStorage.events) {//If events, Should ever exist events?
          events = JSON.parse($localStorage.events);
          vm.events = JSON.parse($localStorage.events);
        }
      };

      vm.restoreEvents();//Here starts the callback
    }
  }
  angular.module('sponzorme').controller('SponzorsMainController', SponzorsMainController);
})();

/* recommended */
angular.module('sponzorme').directive('eventMenu', eventMenu);

function eventMenu() {
    var directive = {
        link: link,
        templateUrl: 'sponzors-main/event-menu.html',
        restrict: 'EA'
    };
    return directive;

    function link(scope, element, attrs) {
      scope.active = attrs.active;
      if(scope.active==='save'){
        scope.inSave = true;
      }
      scope.openMenu = function ($mdOpenMenu, $event) {
        scope.originatorEv = $event;
        $mdOpenMenu($event);
      };
    }
}

/* recommended */
angular
    .module('sponzorme')
    .directive('eventItem', eventItem);

function eventItem() {
    var directive = {
        link: link,
        templateUrl: 'sponzors-main/event-item.html',
        restrict: 'EA'
    };
    return directive;

    function link(scope, element, attrs) {
        scope.active = attrs.active;
      
    }
}

/* recommended */
angular
  .module('sponzorme')
  .directive('navbarEvents', navbarEvents);

function navbarEvents() {
  var directive = {
    link: link,
    templateUrl: 'sponzors-main/navbar.html',
    restrict: 'EA'
  };
  return directive;

  function link(scope, element, attrs) {
    scope.active = attrs.active;
    scope.openSidenavLeft = function () {
      $mdSidenav('left').toggle();
    };

    scope.isOpenLeft = function () {
      var isOpen = true;
      return isOpen = $mdSidenav('left').isOpen();
    };

    scope.openMenu = function ($mdOpenMenu, $event) {
      scope.originatorEv = $event;
      $mdOpenMenu($event);
    };
  }
}

/* recommended */
angular
    .module('sponzorme')
    .directive('sponzorsNavbar', sponzorsNavbar);

function sponzorsNavbar() {
    var directive = {
        link: link,
        templateUrl: 'sponzors-navbar/navbar-icons.html',
        restrict: 'EA',
        replace: true
    };
    return directive;

    function link(scope, element, attrs) {
    }
}
'use strict';
(function() {
  SponzorsOutstandingController.$inject = ["$scope", "$localStorage", "$rootScope", "eventRequest", "$location", "dialogRequest"];
  function SponzorsOutstandingController($scope, $localStorage, $rootScope, eventRequest, $location, dialogRequest) {
    if ($rootScope.userValidation('1')) {
      var vm = this;
      console.log(vm.user);
      /*This function generate the events from the localStorage*/
      vm.restoreEvents = function() {
        vm.events = [];
        if ($localStorage.events) { //If events, Should ever exist events?
          var events = JSON.parse($localStorage.events);
          vm.events = events.filter(function(e){
            if(e.outstanding === '1'){
              return e;
            }
          });
        }
      };
      vm.restoreEvents();//Here Starts the callback
    }
  }
  angular.module('sponzorme').controller('SponzorsOutstandingController', SponzorsOutstandingController);
})();

(function () {
  'use strict';
  SponzorsSavedController.$inject = ["$scope", "$localStorage", "$rootScope"];
  function SponzorsSavedController($scope, $localStorage, $rootScope) {
    if ($rootScope.userValidation('1')) {
      var vm = this;
      vm.user = JSON.parse($localStorage.user);
      vm.events = [];
      vm.user.saved_events.filter(function (e) {
        e.event.saved_id = e.id;
        vm.events.push(e.event);
      });
    }
  }
  angular.module('sponzorme').controller('SponzorsSavedController', SponzorsSavedController);
})();

(function() {
  'use strict';

  SponzorsPreferencesController.$inject = ["$scope", "$translate", "userRequest", "$localStorage", "$rootScope", "loginRequest", "userInterestRequest", "$log", "allInterestsServiceRequest", "dialogRequest"];
  function SponzorsPreferencesController($scope, $translate, userRequest, $localStorage, $rootScope, loginRequest, userInterestRequest, $log, allInterestsServiceRequest, dialogRequest) {
    if ($rootScope.userValidation('1')) {
      var vm = this;
      vm.user = JSON.parse($localStorage.user);
      vm.getAllInterests = function() {
        allInterestsServiceRequest.allInterestsCategoriesId().then(function successCallback(response) {
          vm.interests = response.data.InterestCategory;
        }, function errorCallback(err) {
          vm.noInterestsLoaded = true;
        });
      };
      vm.file = false;
      vm.updateDetails = function() {
        dialogRequest.showLoading();
        if (vm.file) {
          AWS.config.update({
            accessKeyId: $rootScope.getConstants().AMAZONKEY,
            secretAccessKey: $rootScope.getConstants().AMAZONSECRET
          });
          AWS.config.region = $rootScope.getConstants().AMAZONBUCKETREGION;
          var bucket = new AWS.S3({
            params: {
              Bucket: $rootScope.getConstants().AMAZONBUCKET
            }
          });
          // Prepend Unique String To Prevent Overwrites
          var uniqueFileName = btoa($rootScope.uniqueString() + new Date().getTime() + $rootScope.uniqueString()).replace('=', $rootScope.uniqueString()) + '.' + $rootScope.getExtension(vm.file.name);
          var params = {
            Key: uniqueFileName,
            ContentType: vm.file.type,
            Body: vm.file,
            ServerSideEncryption: 'AES256'
          };
          bucket.putObject(params, function(err, data) {
            if (!err) {
              vm.user.logo = $rootScope.getConstants().AMAZONBUCKETURL + uniqueFileName;
              $scope.$digest(); // What is happened here?
              userRequest.editUserPatch($localStorage.id, vm.user).success(function(adata) {
                vm.user = adata.User;
                vm.file = false;
                dialogRequest.closeLoading();
                dialogRequest.showDialog('success', 'dialog.accountInfoEditedSuccessfuly', false);
              }).error(function(eData) {
                dialogRequest.closeLoading();
                dialogRequest.showDialog('error', 'dialog.errorEditingAccountInfo', false);
              });
            }
          });
        } else {
          userRequest.editUserPatch($localStorage.id, vm.user).then(function successCallback(response) {
            $localStorage.user = JSON.stringify(vm.user);
            vm.file = false;
            dialogRequest.closeLoading();
            dialogRequest.showDialog('success', 'accountInfoEditedSuccessfuly', false);
          }, function errorCallback() {
            dialogRequest.closeLoading();
            dialogRequest.showDialog('error', 'errorEditingAccountInfo', false);
          });
        }
      };
      vm.querySearch = function(query) {
        return vm.interests.filter(function(e) {
          if (e.name.indexOf(query) > -1) {
            return e;
          }
        });
      };
      vm.removeUserInterest = function(index, id) {
        vm.user.interests.splice(index, 1);
        userInterestRequest.deleteUserInterest(id).then(function(response) {
          $localStorage.user = JSON.stringify(vm.user);
        });
      };
      vm.addUserInterests = function(interest) {
        if (interest && interest.name) {
          var flag = false;
          if (vm.user.interests) {
            for (var i = 0; i < vm.user.interests.length; i++) {
              if (vm.user.interests[i].interest_id === interest.id_interest) {
                flag = true;
                break;
              }
            }
          }
          if (!flag) {
            var dataInterest = {
              user_id: $localStorage.id,
              interest_id: interest.id_interest
            };
            dialogRequest.showLoading();
            userInterestRequest.createUserInterest(dataInterest).then(function successCallback(response) {
              vm.user.interests.push(response.data.UserInterest);
              $localStorage.user = JSON.stringify(vm.user);
              dialogRequest.closeLoading();
            }, function (err){
              dialogRequest.closeLoading();
              dialogRequest.showDialog('error', 'invalidInterestSelection', false);
            });
          }
        } else {
          dialogRequest.showDialog('error', 'invalidInterestSelection', false);
        }
      };
      vm.getAllInterests();
      vm.newItem = '';
    }
  }
  angular.module('sponzorme').controller('SponzorsPreferencesController', SponzorsPreferencesController);
})();

(function() {
  'use strict';
  SponzorsProfileController.$inject = ["$scope", "$translate", "userRequest", "$localStorage", "$rootScope", "loginRequest", "userInterestRequest", "dialogRequest"];
  function SponzorsProfileController($scope, $translate, userRequest, $localStorage, $rootScope, loginRequest, userInterestRequest, dialogRequest) {
    if ($rootScope.userValidation('1')) {
      var vm = this;
      vm.user = JSON.parse($localStorage.user);
      console.log(vm.user);
      vm.file = false;
      vm.editAccount = function(){
        dialogRequest.showLoading();
        if (vm.user.location !== vm.locationUser) {
          vm.user.location = vm.locationUser.formatted_address;
          vm.user.location_reference = vm.locationUser.place_id;
        }
        if (vm.file) {
          AWS.config.update({
            accessKeyId: $rootScope.getConstants().AMAZONKEY,
            secretAccessKey: $rootScope.getConstants().AMAZONSECRET
          });
          AWS.config.region = $rootScope.getConstants().AMAZONBUCKETREGION;
          var bucket = new AWS.S3({
            params: {
              Bucket: $rootScope.getConstants().AMAZONBUCKET
            }
          });
          // Prepend Unique String To Prevent Overwrites
          var uniqueFileName = btoa($rootScope.uniqueString() + new Date().getTime() + $rootScope.uniqueString()).replace('=', $rootScope.uniqueString()) + '.' + $rootScope.getExtension(vm.file.name);
          var params = {
            Key: uniqueFileName,
            ContentType: vm.file.type,
            Body: vm.file,
            ServerSideEncryption: 'AES256'
          };
          bucket.putObject(params, function(err, data) {
            if (!err) {
              $localStorage.image = $rootScope.getConstants().AMAZONBUCKETURL + uniqueFileName;
              vm.user.image = $rootScope.getConstants().AMAZONBUCKETURL + uniqueFileName;
              vm.user.name = vm.user.firstName +' '+ vm.user.lastName;
              userRequest.editUserPatch($localStorage.id, vm.user).then(function successCallback(response) {
                $localStorage.user = JSON.stringify(vm.user);
                vm.file = false;
                dialogRequest.closeLoading();
                dialogRequest.showDialog('success', 'dialog.accountInfoEditedSuccessfuly', false);
              }, function errorCallback(err) {
                dialogRequest.closeLoading();
                dialogRequest.showDialog('error', 'dialog.errorEditingAccountInfo', false);
              });
            }
          });
        } else {
          vm.user.name = vm.user.firstName +' '+ vm.user.lastName;
          userRequest.editUserPatch($localStorage.id, vm.user).then(function successCallback(response) {
            $localStorage.user = JSON.stringify(vm.user);
            vm.file = false;
            dialogRequest.closeLoading();
            dialogRequest.showDialog('success', 'dialog.accountInfoEditedSuccessfuly', false);
          }, function errorCallback(err) {
            dialogRequest.closeLoading();
            dialogRequest.showDialog('error', 'dialog.errorEditingAccountInfo', false);
          });
        }
      };
    }
  }
  angular.module('sponzorme').controller('SponzorsProfileController', SponzorsProfileController);
})();

(function() {
  'use strict';
  SponzorsRatingsController.$inject = ["$scope", "$localStorage", "$rootScope", "$log"];
  function SponzorsRatingsController($scope, $localStorage, $rootScope, $log) {
    if ($rootScope.userValidation('1')) {
      var vm = this;
      vm.user = JSON.parse($localStorage.user);
      console.log(vm.user);
      vm.ratings = []; //here is necessary assign the ratings
    }
  }
  angular.module('sponzorme').controller('SponzorsRatingsController', SponzorsRatingsController);
})();

/* recommended */
angular
    .module('sponzorme')
    .directive('navbarSettings', navbarSettings);

function navbarSettings() {
    var directive = {
        link: link,
        templateUrl: 'sponzors-settings/navbar.html',
        restrict: 'EA'
    };
    return directive;

    function link(scope, element, attrs) {
        scope.active = attrs.active;
        scope.openSidenavLeft = function () {
          $mdSidenav('left').toggle();
        };

        scope.isOpenLeft = function () {
          var isOpen = true;
          return isOpen = $mdSidenav('left').isOpen();
        };

        scope.openMenu = function ($mdOpenMenu, $event) {
          scope.originatorEv = $event;
          $mdOpenMenu($event);
        };
    }
}

(function() {
  'use strict';
  SponzorsChangePasswordController.$inject = ["$scope", "$localStorage", "$rootScope", "loginRequest", "dialogRequest"];
  function SponzorsChangePasswordController($scope, $localStorage, $rootScope, loginRequest, dialogRequest) {
    if ($rootScope.userValidation('1')) {
      var vm = this;
      vm.user = JSON.parse($localStorage.user);
      vm.resetPassword = function() {
        if (vm.password === vm.passwordConfirmation) {
          dialogRequest.showLoading();
          vm.formData = {
            'email': $localStorage.email,
            'password': vm.password,
            'password_confirmation': vm.passwordConfirmation
          };
          loginRequest.changePassword(vm.formData, $localStorage.token).then(function successCallback(response) {
            dialogRequest.closeLoading();
            $localStorage.token = btoa($localStorage.email + ':' + vm.passwordConfirmation);
            dialogRequest.showDialog('success', 'dialog.passwordChangedSuccesfully', false);
            vm.password = '';
            vm.passwordConfirmation = '';
          }, function errorCallback() {
            dialogRequest.closeLoading();
            dialogRequest.showDialog('error', 'dialog.invalidNewPassword', false);
          });
        } else {
          dialogRequest.showDialog('error', 'dialog.passwordNoMatch', false);
        }
      };
    }
  }
  angular.module('sponzorme').controller('SponzorsChangePasswordController', SponzorsChangePasswordController);
})();

(function () {
  'use strict';
  SponzorsTasksController.$inject = ["$scope", "$localStorage", "$rootScope", "$routeParams", "taskSponzorRequest", "dialogRequest"];
  function SponzorsTasksController($scope, $localStorage, $rootScope, $routeParams, taskSponzorRequest, dialogRequest) {
    if ($rootScope.userValidation('1')) {
      var vm = this;
      vm.user = JSON.parse($localStorage.user);
      vm.regenerateTasks = function () {
        vm.tasks = [];
        for (var i = 0; i < vm.user.sponzorships.length; i++) {
          for (var j = 0; j < vm.user.sponzorships[i].task_sponzor.length; j++) {
            var currentTask = vm.user.sponzorships[i].task_sponzor[j];
            currentTask.event = vm.user.sponzorships[i].event;
            vm.tasks.push(currentTask);
          }
        }
      };
      vm.changeStatus = function(t) {
        console.log(t);
        t.loading = true;
        var savedStatus = t.status;
        if (t.status === '1' || t.status === 1) {
          t.status = 0;
        } else {
          t.status = 1;
        }
        var data = {
          status: t.status
        };
        taskSponzorRequest.editTaskSponzorPatch(t.id, data).then(function successCallBack(response) {
          t.loading = false;
          $localStorage.user = JSON.stringify(vm.user);
          vm.regenerateTasks();
        }, function errorCallback() {
          t.status = savedStatus;
          t.loading = false;
          dialogRequest.showDialog('error', 'errorUpdatingTaskStatus', false);
        });
      };
      vm.regenerateTasks();
      vm.currentTaskIndex = $routeParams.id;
    }
  }
  angular.module('sponzorme').controller('SponzorsTasksController', SponzorsTasksController);
})();

(function () {
  'use strict';
  SponzorsCreateTasksController.$inject = ["$scope", "$localStorage", "$routeParams", "taskSponzorRequest", "$rootScope", "dialogRequest"];
  function SponzorsCreateTasksController($scope, $localStorage, $routeParams, taskSponzorRequest, $rootScope, dialogRequest) {
    if ($rootScope.userValidation('1')) {
      var vm = this;
      vm.user = JSON.parse($localStorage.user);
      vm.addNextTask = function (index) {
        if (vm.sponzorshipsToAdd[index] > -1) {
          var cont = vm.sponzorshipsToAdd[index];
          vm.todo = {
            type: 1, //Because is created by the Sponzor
            status: 0, //By default is not complete
            perk_id: vm.user.sponzorships[cont].perk.id,
            event_id: vm.user.sponzorships[cont].event_id,
            sponzorship_id: vm.user.sponzorships[cont].id,
            user_id: $localStorage.id,
            organizer_id: vm.user.sponzorships[cont].organizer.id,
            sponzor_id: $localStorage.id,
            title: vm.task.title,
            description: vm.task.description
          };
          taskSponzorRequest.createTaskSponzor(vm.todo).then(function successCallback(response) {
            vm.user.sponzorships[cont].perk.tasks.push(response.data.PerkTask);
            vm.user.sponzorships[cont].task_sponzor.push(response.data.TaskSponzor);
            vm.addNextTask(index + 1);
          });
        }
        else {
          dialogRequest.closeLoading();
          $localStorage.user = JSON.stringify(vm.user);
          dialogRequest.showDialog('success', 'dialog.taskAddedSuccessfuly', '/sponzors/tasks');
        }
      };
      vm.addNewTask = function () {
        if(vm.task.title && vm.task.description){
          dialogRequest.showLoading();
          vm.addNextTask(0);
        }
        else{
          dialogRequest.showDialog('error', 'dialog.pleaseCompleteAllFields', false);
        }
      };
      vm.changeSponzorship = function (i) {
        if (vm.sponzorshipsToAdd.indexOf(i) > -1) {
          vm.sponzorshipsToAdd.splice(vm.sponzorshipsToAdd.indexOf(i));
        }
        else {
          vm.sponzorshipsToAdd.push(i);
        }
      };
      vm.task = {};
      vm.sponzorshipsToAdd = [];
    }
  }
  angular.module('sponzorme').controller('SponzorsCreateTasksController', SponzorsCreateTasksController);
})();

(function () {
  'use strict';
  SponzorsNotificationsController.$inject = ["$scope", "$rootScope", "$localStorage", "$firebaseArray", "$firebaseObject", "userRequest", "$routeParams", "$location", "dialogRequest"];
  function SponzorsNotificationsController($scope, $rootScope, $localStorage, $firebaseArray, $firebaseObject, userRequest, $routeParams, $location, dialogRequest) {
    if ($rootScope.userValidation('1')) {
      var vm = this;
      $localStorage.help = false;
      if ($routeParams.id) {
        vm.notificationRef = new Firebase($rootScope.getConstants().FURL + 'notifications/' + $localStorage.id + '/' + $routeParams.id);
        vm.currentNotification = $firebaseObject(vm.notificationRef);
        vm.currentNotification.$loaded(function () {
          vm.currentNotification.read = true;
          vm.currentNotification.$save();
        });
      }
      else {
        vm.notificationsRef = new Firebase($rootScope.getConstants().FURL + 'notifications/' + $localStorage.id);
        vm.notifications = $firebaseArray(vm.notificationsRef);
        vm.notificationsRef.on('child_added', function (snapshot) {
          vm.current = snapshot.val();//extract the info
          if ($localStorage.lastUpdate < vm.current.date) {
            userRequest.home($localStorage.id).then(function successCallback(response) {
              $localStorage.lastUpdate = new Date().getTime();
              $localStorage.user = JSON.stringify(response.data.data.user);
            });
          }
        });

      }

      vm.markAsImportant = function (index) {
        console.log(index);
        vm.notificationRef = new Firebase($rootScope.getConstants().FURL + 'notifications/' + $localStorage.id + '/' + index);
        vm.currentNotification = $firebaseObject(vm.notificationRef);
        vm.currentNotification.$loaded(function () {
          vm.currentNotification.important = true;
          vm.currentNotification.$save();
        });
      };
      vm.delete = function (index) {
        vm.notificationRef = new Firebase($rootScope.getConstants().FURL + 'notifications/' + $localStorage.id + '/' + index);
        vm.currentNotification = $firebaseObject(vm.notificationRef);
        vm.currentNotification.$loaded(function () {
          vm.currentNotification.$remove();
          $location.path('/sponzors/notifications');
        });
      };
    }
  }
  angular.module('sponzorme').controller('SponzorsNotificationsController', SponzorsNotificationsController);
})();

/* recommended */
angular
    .module('sponzorme')
    .directive('navbarNotifications', navbarNotifications);

function navbarNotifications() {
    var directive = {
        link: link,
        controller: navbarController,
        templateUrl: 'sponzors-notifications/navbar.html',
        restrict: 'EA'
    };
    return directive;

    function link(scope, element, attrs) {
        scope.active = attrs.active;
    }
    
    function navbarController($scope){
      $scope.openMenu = function($mdOpenMenu, $event) {
        $scope.originatorEv = $event;
        $mdOpenMenu($event);
      };
    }
}
(function() {
  'use strict';
  SponzorsSponzorshipsController.$inject = ["$scope", "$localStorage", "$rootScope", "ratingRequest", "SPONZORSHIPSTATUSES", "$routeParams", "$mdDialog", "$sce"];
  function SponzorsSponzorshipsController($scope, $localStorage, $rootScope, ratingRequest, SPONZORSHIPSTATUSES, $routeParams, $mdDialog, $sce) {
    if ($rootScope.userValidation('1')) {
      var vm = this;
      vm.todayDate = new Date().getTime();
      vm.user = JSON.parse($localStorage.user);
      vm.statuses = SPONZORSHIPSTATUSES;

      if($routeParams.id){

        vm.currentSponzorship = vm.user.sponzorships[$routeParams.id];
        vm.currentSponzorship.event.ends = new Date(vm.currentSponzorship.event.ends).getTime();
        vm.currentSponzorship.event.description = $sce.trustAsHtml(vm.currentSponzorship.event.description);
      }

      //This function displays a popup to Show Download calendar
      vm.downloadCalendar = function(sponzorship) {
        $scope.starts = new Date(sponzorship.event.starts).toISOString().replace(':', '').replace('-', '').replace('.', '');
        $scope.ends = new Date(sponzorship.event.ends).toISOString().replace(':', '').replace('-', '').replace('.', '');
        $scope.ends = $scope.ends.replace(':', '').replace('-', '').replace('.', '').replace('000Z', '');
        $scope.starts = $scope.starts.replace(':', '').replace('-', '').replace('.', '').replace('000Z', '');
        $scope.currentSponzorship = sponzorship;
        $mdDialog.show({
          templateUrl: 'sponzors-sponzoring/add-calendar.html',
          controller: 'SponzorsSponzorshipsController',
          controllerAs: 'ssc',
          scope: $scope,
          preserveScope: true,
          clickOutsideToClose: true
        });
      };





      //This function open the Payment Details Dialog
      vm.doPayment = function(sponzorship) {
        $scope.PAYPALCOMPLETERETURNURL = $rootScope.getConstants().PAYPALCOMPLETERETURNURL;
        $scope.PAYPALIPNRETURNURL = $rootScope.getConstants().PAYPALIPNRETURNURL;
        $scope.SANDBOX = $rootScope.getConstants().PAYPALSANDBOX;
        $scope.PAYPALEMAIL = $rootScope.getConstants().PAYPALEMAIL;
        $scope.sponzorship = sponzorship;
        $scope.paymentValue = sponzorship.perk.usd;
        $scope.fee = parseFloat((sponzorship.perk.usd * $rootScope.getConstants().FEE) + $rootScope.getConstants().XOOMRATE);
        $scope.paymentTotal = parseFloat(sponzorship.perk.usd) + parseFloat($scope.fee);

        $mdDialog.show({
          templateUrl: 'sponzors-sponzoring/payment-info.html',
          controller: 'SponzorsSponzorshipsController',
          controllerAs: 'ssc',
          scope: $scope,
          preserveScope: true,
          clickOutsideToClose: true
        });
      };



      //This function shows SpoonzorShipCause
      vm.seeCause = function(sponzorship) {
        $scope.cause = sponzorship.cause;
        $scope.status = sponzorship.status;
        $mdDialog.show({
          templateUrl: 'sponzors-sponzoring/cause-dialog.html',
          controller: 'SponzorsSponzorshipsController',
          controllerAs: 'ssc',
          scope: $scope,
          preserveScope: true,
          clickOutsideToClose: true
        });
      };
    }
  }
  angular.module('sponzorme').controller('SponzorsSponzorshipsController', SponzorsSponzorshipsController);
})();

(function() {
  'use strict';

  addCalendarController.$inject = ["$scope"];
  function addCalendarController($scope) {
    $scope.currentSponzorship.event.description = $scope.currentSponzorship.event.description || '';

    /**
     * Renders a .ics file and downloads it to the client browser.
     * The name of the file will be the event title with alphanumeric chars
     * having the extension `.ics`.
     *
     * @param  {Boolean} encodeUri  encode the
     * @return {String}  ics calendar data
     */
    function getIcsCalendar(encodeUri) {

      function formatIcsText(s, maxLength) {
        if (!s || !s.length) return s;
        return wrap(s.replace(/\n/g, '\\n'), maxLength);
      }

      function wrap(s, maxLength) {
        if (!maxLength) maxLength = 75;
        if (!s || s.length <= maxLength) {
          return s;
        } else {
          return s.substring(0, maxLength).replace(/\n/g, '\\n') + '\r\n ' + wrap(s.substring(maxLength), 75);
        }
      }

      var elements = [
        'BEGIN:VCALENDAR',
        'VERSION:2.0',
        'BEGIN:VEVENT',
        'CLASS:PUBLIC',
        'DESCRIPTION:' + formatIcsText($scope.currentSponzorship.event.description, 62),
        'DTSTART:' + $scope.starts,
        'DTEND:' + $scope.ends,
        'LOCATION:' + formatIcsText($scope.currentSponzorship.event.location, 64),
        'SUMMARY:' + formatIcsText($scope.currentSponzorship.event.title, 66),
        'TRANSP:TRANSPARENT',
        'END:VEVENT',
        'END:VCALENDAR'
      ];

      return elements.join('\n');

    }

    /**
     * Generates a url to add event to Yahoo! Calendar.
     *
     * @return {String} yahoo cal url
     */
    function getYahooCalendarUrl() {

      var yahooCalendarUrl = 'http://calendar.yahoo.com/?v=60&view=d&type=20';
      yahooCalendarUrl += '&title=' + encodeURIComponent($scope.currentSponzorship.event.title);
      yahooCalendarUrl += '&st=' + encodeURIComponent($scope.starts) + '&et=' + encodeURIComponent($scope.ends);
      yahooCalendarUrl += '&desc=' + encodeURIComponent($scope.currentSponzorship.event.description);
      yahooCalendarUrl += '&in_loc=' + encodeURIComponent($scope.currentSponzorship.event.location);

      return yahooCalendarUrl;

    };

    /**
     * Generates a url to add event to Google Calendar.
     *
     * @return {String} google cal url
     */
    function getGoogleCalendarUrl() {

      var googleCalendarUrl = 'https://www.google.com/calendar/render?action=TEMPLATE';
      googleCalendarUrl += '&text=' + encodeURIComponent($scope.currentSponzorship.event.title);
      googleCalendarUrl += '&dates=' + encodeURIComponent($scope.starts) + '/' + encodeURIComponent($scope.ends);
      googleCalendarUrl += '&details=' + encodeURIComponent($scope.currentSponzorship.event.description);
      googleCalendarUrl += '&location=' + encodeURIComponent($scope.currentSponzorship.event.location);

      return googleCalendarUrl;

    };

    /**
     * Generates a url to add event to Windows Live Calendar.
     *
     * @return {String} microsoft cal url
     */
    function getMicrosoftCalendarUrl() {

      var microsoftCalendarUrl = 'http://calendar.live.com/calendar/calendar.aspx?rru=addevent';
      microsoftCalendarUrl += '&summary=' + encodeURIComponent($scope.currentSponzorship.event.title);
      microsoftCalendarUrl += '&dtstart=' + encodeURIComponent($scope.starts) + '&dtend=' + encodeURIComponent($scope.ends);
      microsoftCalendarUrl += '&description=' + encodeURIComponent($scope.currentSponzorship.event.description);
      microsoftCalendarUrl += '&location=' + encodeURIComponent($scope.currentSponzorship.event.location);

      return microsoftCalendarUrl;

    };

    function dlIcal() {

      // render safe filename for iCal (only \w chars) based on event title
      var fileName = $scope.currentSponzorship.event.title.replace(/[^\w ]+/g, '') + '.ics';

      download(getIcsCalendar(), fileName, 'application/octet-stream');

    }

    $scope.calendarUrl = {
      microsoft: getMicrosoftCalendarUrl(),
      google: getGoogleCalendarUrl(),
      yahoo: getYahooCalendarUrl(),
      icalendar: getIcsCalendar(),
      dlIcal: dlIcal
    };

  }
  angular.module('sponzorme').controller('addCalendarController', addCalendarController);
})();

'use strict';
(function () {
  SponzorsCreateController.$inject = ["$scope", "$translate", "userRequest", "$location", "$localStorage", "$routeParams", "$rootScope", "MINAGE", "MAXAGE", "categoryRequest", "userInterestRequest", "dialogRequest", "$mdDialog"];
  function SponzorsCreateController($scope, $translate, userRequest, $location, $localStorage, $routeParams, $rootScope, MINAGE, MAXAGE, categoryRequest, userInterestRequest, dialogRequest, $mdDialog) {
    if ($routeParams.lang === 'en' || $routeParams.lang === 'es' || $routeParams.lang === 'pt') {
      $translate.use($routeParams.lang);
    }
    $scope.doCreate = function () {
      if ($scope.create.password.trim() !== '' || $scope.create.password_confirmation.trim() !== '') {
        if ($scope.create.password === $scope.create.password_confirmation && $scope.create.password_confirmation.length > 6) {
          dialogRequest.showLoading();
          $scope.create.lang = $rootScope.currentLanguage();
          $scope.create.type = 1;
          $scope.create.name = $scope.create.firstname + ' ' + $scope.create.lastname;
          userRequest.createUser($scope.create).success(function (adata) {
            $localStorage.cookiesponzorme = btoa($scope.create.email + ':' + $scope.create.password);
            $localStorage.token = btoa($scope.create.email + ':' + $scope.create.password);
            $localStorage.typesponzorme = adata.User.type;
            $localStorage.id = adata.User.id;
            $localStorage.email = adata.User.email;
            $localStorage.demo = adata.User.demo;
            $localStorage.startDate = Date.now();
            $scope.toggleCreateForm();
            dialogRequest.closeLoading();
          }).error(function (data) {
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
            dialogRequest.closeLoading();
            dialogRequest.closeLoading();
            var parentEl = angular.element(document.body);
            console.log($scope.errorMessages);
            $mdDialog.show({
              parent: parentEl,
              template: '<md-dialog aria-label="dialog">'+
                '<md-toolbar>'+
                  '<div class="md-toolbar-tools top-info">'+
                    '<i class="material-icons md-48 md-light">info</i>'+
                  '</div>'+
                '</md-toolbar>'+
                '<md-dialog-content>'+
                  '<div layout="column" layout-align="center center">'+
                    '<h1 translate>dialog.error.title</h1>'+
                    '<p ng-repeat="m in errorMessages">'+
                      '{{\'dialog.error.\'+m|translate}}'+
                    '</p>'+
                  '</div>'+
                '</md-dialog-content>'+
                '<md-dialog-actions>'+
                  '<md-button ng-click="closeDialog()" class="md-primary">'+
                    '{{"Ok"}}'+
                  '</md-button>'+
                '</md-dialog-actions>'+
              '</md-dialog>',
              locals: {
                errorMessages: $scope.errorMessages
              },
              controller: ["$scope", "$mdDialog", "errorMessages", function DialogController($scope, $mdDialog, errorMessages) {
                $scope.errorMessages = errorMessages;
                $scope.closeDialog = function() {
                  $mdDialog.hide();
                }
              }]
            });
          });
        } else {
          if($scope.create.password_confirmation.length > 6) {
            dialogRequest.showDialog('error', 'errorRegisterPasswordNoMatch', false);
          } else {
            dialogRequest.showDialog('error', 'errorRegisterShortPassword', false);
          }
        }
      }else {
        dialogRequest.showDialog('error', 'errorRegisterPasswordNoEmpty', false);
      }
    };
    $scope.doCustomization = function () {
      dialogRequest.showLoading();
      $scope.create.location_reference = 'Fake';
      $scope.create.image = 'https://s3-us-west-2.amazonaws.com/sponzormewebappimages/user_default.jpg';
      userRequest.editUserPatch($localStorage.id, $scope.create).success(function (adata) {
        dialogRequest.showDialog('success', 'registerCompleted', '/login');
        dialogRequest.closeLoading();
      });
      //Code to save the interests
      var interestsArray = [];
      for(var i = 0; i< $scope.create.interests.length; i++){
        var item = {
          'user_id': $localStorage.id,
          'interest_id': $scope.create.interests[i]
        };
        interestsArray.push(item);
      }
      var data = {
        interests: interestsArray
      };
      userInterestRequest.bulkUserInterest(data).then(function successCallback(){});
      //End the code to save the interests
    };

    categoryRequest.allCategories().then(function successCallback(response) {
      $scope.categories = response.data.categories;
    }, function errorCallback() {
      $scope.categories = [];
    });

    $scope.pages = {
      'firstPage': '',
      'secondPage': '',
      'thirdPage': ''
    }

    $scope.submitSucces = function () {
      return false;
    };

    $scope.create = {
      'date': new Date(),
      'image': '',
      'success': false,
      'age': '',
      'password': '',
      'password_confirmation': ''
    };

    $scope.firstPage = true;

    $scope.toggleCreateForm = function () {
      if ($scope.firstPage === true) {
        $scope.firstPage = false;
      } else {
        $scope.firstPage = true;
      }
    };

    $scope.ageRange = [];
    for (var j = MINAGE; j < MAXAGE; j++) {
      $scope.ageRange.push(j);
    }
  }
  angular.module('sponzorme').controller('SponzorsCreateController', SponzorsCreateController);
})();

(function () {
  'use strict';
  SponzorsInviteController.$inject = ["$scope", "$translate", "userRequest", "$rootScope", "$localStorage", "dialogRequest"];
  function SponzorsInviteController($scope, $translate, userRequest, $rootScope, $localStorage, dialogRequest) {
    if ($rootScope.userValidation('1')) {
      var vm = this;
      vm.friend = { 'email': '', 'message': 'no-message', 'user_id': $localStorage.id }; //Define the object to be used.
      //This function invites to a friend to use our platform.
      vm.inviteFriend = function () {
        dialogRequest.showLoading();
        userRequest.invitedUser(vm.friend).then(function successCallback(adata) {
          dialogRequest.closeLoading();
          dialogRequest.showDialog('success', 'inviteFiendEmailSent', false);
          vm.friend = { 'email': '', 'message': 'no-message', 'user_id': $localStorage.id };
        }, function errorCallback(err) {
          dialogRequest.closeLoading();
          dialogRequest.showDialog('error', 'problem', false);
        });
      };
    }
  }
  angular.module('sponzorme').controller('SponzorsInviteController', SponzorsInviteController);
})();

'use strict';
(function () {
  SponzorsEventController.$inject = ["$scope", "$mdDialog", "$routeParams", "$translate", "$localStorage", "$location", "eventRequest", "sponzorshipRequest", "$rootScope", "dialogRequest", "$sce"];
  function SponzorsEventController($scope, $mdDialog, $routeParams, $translate, $localStorage, $location, eventRequest, sponzorshipRequest, $rootScope, dialogRequest, $sce) {
    var vm = this;
    vm.events = JSON.parse($localStorage.events);
    vm.events.filter(function (e) {
      if (e.id === $routeParams.eventId) {
        console.log(e);
        vm.currentEvent = e;
      }
    });
    vm.currentEvent.description = $sce.trustAsHtml(vm.currentEvent.description);
    vm.formCreateSponzorship = function (perk) {
      $scope.newSponzorship = { // Review why is not possible with vm instead of $scope
        'organizer_id': vm.currentEvent.user_organizer.id,
        'sponzor_id': $localStorage.id,
        'event_id': vm.currentEvent.id,
        'perk_id': perk.id,
        'cause': '',
        'status': 0
      };
      $mdDialog.show({
        templateUrl: 'sponzors-event/create-sponzorship.html',
        controller: 'SponzorsEventController',
        controllerAs: 'sec',
        scope: $scope,
        clickOutsideToClose: true
      });
    };
    vm.createSponzorship = function () {
      dialogRequest.closeLoading();
      dialogRequest.showLoading();
      vm.user = JSON.parse($localStorage.user);
      vm.user.sponzorships = vm.user.sponzorships.filter(function (e) {
        if (e.status === '0') {
          return e;
        }
      });
      sponzorshipRequest.createSponzorship($scope.newSponzorship).then(function successCallback(response) {
        console.log('ok', response);
        vm.user.sponzorships.push(response.data.Sponzorship);
        $localStorage.user = JSON.stringify(vm.user);
        vm.firebaseNotification = {
          to: vm.currentEvent.user_organizer.id,
          text: $translate.instant('NOTIFICATIONS.NewSponzorshipRequestfor') + vm.currentEvent.title,
          link: '#/organizers/sponzors'
        };
        $rootScope.sendFirebaseNotification(vm.firebaseNotification, vm.currentEvent.user_organizer.id);
        dialogRequest.closeLoading();
        dialogRequest.showDialog('success', 'sponzorshipCreatedSuccesfuly', false);
      }, function errorCallback(err) {
        console.log('err', err);
        dialogRequest.closeLoading();
        if (err.status === 409) {
          dialogRequest.showDialog('error', 'alreadySponzoring', false);
        } else {
          dialogRequest.showDialog('error', 'youCanNotSponzorThisEvent', false);
        }
      });
    };
  }
  angular.module('sponzorme').controller('SponzorsEventController', SponzorsEventController);
})();

(function() {
  'use strict';

  SponzorsChatController.$inject = ["$scope", "$firebaseArray", "$localStorage", "$location", "$routeParams", "sponzorshipRequest", "$rootScope"];
  function SponzorsChatController($scope, $firebaseArray, $localStorage, $location, $routeParams, sponzorshipRequest, $rootScope) {
    if ($rootScope.userValidation('1')) {
      var vm = this;
      sponzorshipRequest.oneSponzorship($routeParams.sponzorshipId).then(function successCallback(response) {
        vm.sponzorshipInfo = response.data.data;
        if (response.data.data.Organizer.id === $localStorage.id) {
          vm.newMessage = {
            'author': response.data.data.Organizer.name,
            'type': '#5DDECF',
            'sponzorshipId': $routeParams.sponzorshipId
          };
        } else if (response.data.data.Sponzor.id === $localStorage.id) {
          vm.newMessage = {
            'author': response.data.data.Sponzor.name,
            'type': '#F6CECE',
            'sponzorshipId': $routeParams.sponzorshipId
          };
        } else {
          $location.path('/login');
        }
      });
      var ref = new Firebase($rootScope.getConstants().FURL + 'chat');
      var query = ref.orderByChild('sponzorshipId').equalTo($routeParams.sponzorshipId);
      vm.chatMessages = $firebaseArray(query);
      vm.addMessage = function() {
        if (vm.newMessage.text) {
          vm.newMessage.userImage = $localStorage.image;
          vm.newMessage.timedate = new Date().getTime();
          vm.chatMessages.$add(vm.newMessage);
          vm.newMessage.text = '';
        }
      };
    }
  }

  angular.module('sponzorme')
    .controller('SponzorsChatController', SponzorsChatController);
})();

(function() {
  'use strict';

  SponzorsRateController.$inject = ["$scope", "$localStorage", "$rootScope", "ratingRequest", "SPONZORSHIPSTATUSES", "$routeParams", "$mdDialog", "$translate", "dialogRequest"];
  function SponzorsRateController($scope, $localStorage, $rootScope, ratingRequest, SPONZORSHIPSTATUSES, $routeParams, $mdDialog, $translate, dialogRequest) {
    if ($rootScope.userValidation('1')) {
      var vm = this;
      vm.user = JSON.parse($localStorage.user);

      vm.saveRating = function() { //Finally we save the rating information
        dialogRequest.showLoading();
        if (vm.rating.other) {
          vm.rating.question5 = 'Other: ' + vm.rating.other;
        }
        ratingRequest.createRating(vm.rating).then(function successCallback(response) {
          vm.user.sponzorships[$routeParams.sponzorshipId].ratings.push(response.data.Rating);
          vm.user.sponzorships[$routeParams.sponzorshipId].rated_sponzor = true;
          $localStorage.user = JSON.stringify(vm.user);
          var firebaseNotification = {
            to: response.data.Rating.organizer_id,
            text: $translate.instant('NOTIFICATIONS.OrganizerRated') + vm.user.name,
            link: '#/profile/' + response.data.Rating.organizer_id
          };
          $rootScope.sendFirebaseNotification(firebaseNotification, response.data.Rating.organizer_id);
          vm.initForm();
          dialogRequest.closeLoading();
          dialogRequest.showDialog('success', 'organizerRateSuccesfuly', '/sponzors/sponzoring');
          //success and redirect
          console.log(response);
        }, function errorCallback(err) {
          dialogRequest.closeLoading();
          dialogRequest.showDialog('error', 'invalidRate', false);
          //bad and stay there
          console.log(err);
        });
      };

      vm.initForm = function(){
        vm.rating = {
          organizer_id: vm.currentSponzorship.organizer.id,
          sponzor_id: $localStorage.id,
          sponzorship_id: vm.currentSponzorship.id,
          type: 1,
          question0: '',
          question1: '',
          question2: '',
          question3: '',
          question4: '',
          question5: '',
          question6: '',
          question7: '',
          question8: '',
          question9: '',
          question10: ''
        };
      };

      if ($routeParams.sponzorshipId) {
        vm.currentSponzorship = vm.user.sponzorships[$routeParams.sponzorshipId];
        console.log(vm.currentSponzorship);
        vm.initForm();
      }
    }
  }
  angular.module('sponzorme').controller('SponzorsRateController', SponzorsRateController);
})();

'use strict';
(function() {
  OrganizersMainController.$inject = ["$scope", "$translate", "$localStorage", "$rootScope", "$location", "dialogRequest", "eventRequest"];
  function OrganizersMainController($scope, $translate, $localStorage, $rootScope, $location, dialogRequest, eventRequest) {

    if ($rootScope.userValidation('0')) {
      var vm = this;
      //mock
      vm.filterClick = function(id) {
        vm.filter.push(id);
      };
      vm.openSidenavLeft = function() {
        $mdSidenav('left').toggle();
      };

      vm.isOpenLeft = function() {
        var isOpen = true;
        return isOpen = $mdSidenav('left').isOpen();
      };

      vm.openMenu = function($mdOpenMenu, $event) {
        vm.originatorEv = $event;
        $mdOpenMenu($event);
      };

      vm.shareEvent = function(eventIndex){
        //something to do
      };

      vm.hasSponzorship = function(idEvent) {
        for (var i = 0; i < vm.user.sponzorships_like_organizer.length; i++) {
          if (vm.user.sponzorships_like_organizer[i].event.id === idEvent) {
            return true;
          }
        }
        return false;
      };

      vm.deleteEvent = function(eventId){
        dialogRequest.showLoading();
        if (vm.hasSponzorship(eventId)) {
          dialogRequest.closeLoading();
          dialogRequest.showDialog('error', 'eventDeletingEventHasSponzorship', false);
        } else {
          eventRequest.deleteEvent(eventId).then(function successCallback(response) {
            var aux = vm.user.events.filter(function(e){
              if(e.id!==eventId){
                return e;
              }
            });
            vm.user.events = [];
            vm.user.events = aux;
            $localStorage.user = JSON.stringify(vm.user);
            dialogRequest.closeLoading();
            dialogRequest.showDialog('success', 'eventDeleteSuccesfully',false);
          }, function errorCallback(err) {
            dialogRequest.closeLoading();
            dialogRequest.showDialog('error', 'errorDeletingEvent', false);
          });
        }
      };

      vm.toEdit = function(eventId){
        $location.path('/organizers/event/'+eventId);
      };

      vm.todayDate = new Date().getTime();
      vm.user = JSON.parse($localStorage.user);
      vm.user.balance = 0;
      angular.forEach(vm.user.sponzorships_like_organizer, function(value) {
        if (value.status === '1') {
          vm.user.balance = parseInt(vm.user.balance) + parseInt(value.perk.usd);
        }
      });
    }
  }
  angular.module('sponzorme').controller('OrganizersMainController', OrganizersMainController);
})();

(function() {
  angular.module('sponzorme').directive('headNav', headNav);

  function headNav() {
    var directive = {
      link: link,
      template: '<div class="menuItemContainer" layout="row">'+
        '<div class="menuItem">'+
        '  <a href="#/organizers/dashboard" ng-class="{\'textActive\': active == \'dashboard\'}"'+ 'md-ink-ripple translate>organizersMain.events</a>'+
        '  <div class="border" ng-class="{\'active\': active == \'dashboard\'}"></div>'+
        '</div>'+
        '<div class="menuItem">'+
        '  <a href="#/organizers/sponzors" ng-class="{\'textActive\': active == \'sponzors\'}"'+ 'md-ink-ripple translate>organizersMain.sponsors</a>'+
        '  <div class="border"  ng-class="{\'active\': active == \'sponzors\'}"></div>'+
        '</div>'+
        '<div class="menuItem">'+
        '  <a href="#/organizers/balance" ng-class="{\'textActive\': active == \'balance\'}" '+ 'md-ink-ripple translate>organizersMain.balance</a>'+
        '  <div class="border"  ng-class="{\'active\': active == \'balance\'}"></div>'+
        '</div>'+
      '</div>',
      restrict: 'EA',
      replace: true
    };
    function link(scope, element, attrs) {
      scope.active = attrs.active;
    };
    return directive;
  }
})();

(function() {
  angular.module('sponzorme').directive('responsiveNav', responsiveNav);

  function responsiveNav() {
    var directive = {
      link: link,
      template: '<div class="menuXsContainer">'+
      '<md-menu hide-gt-sm>'+
      '  <md-button class="md-fab" aria-label="b" ng-click="openMenu($mdOpenMenu, $event)">'+
      '    <md-icon>person</md-icon>'+
      '  </md-button>'+
      '  <md-menu-content class="menuXsItems" width="2" layout="column" layout-align="center start">'+
      '    <md-menu-item class="menuXsItem active">'+
      '      <a href="#/organizers/dashboard" md-ink-ripple translate>sponzorsMain.searchEvents</a>'+
      '    </md-menu-item>'+
      '    <md-menu-item class="menuXsItem">'+
      '      <a href="#/organizers/outstanding" md-ink-ripple'+ 'translate>sponzorsMain.highlightEvents</a>'+
      '    </md-menu-item>'+
      '    <md-menu-item class="menuXsItem">'+
      '      <a href="#/organizers/notifications" md-ink-ripple'+ 'translate>sponzorsMain.notifications</a>'+
      '    </md-menu-item>'+
      '  </md-menu-content>'+
      '</md-menu>'+
      '</div>',
      restrict: 'EA',
      replace: true
    };
    function link(scope, element, attrs) { };
    return directive;
  }
})();

(function(){
  angular.module('sponzorme').directive('organizerEventBody', organizerEventBody);

  function organizerEventBody() {
      var directive = {
          link: link,
          templateUrl: 'organizers-main/event-body.html',
          restrict: 'EA',
          replace: true
      };
      function link(scope, element, attrs) {
      };
      return directive;
  }
})();

(function() {
  angular.module('sponzorme').directive('organizersNavbar', organizersNavbar);

  function organizersNavbar() {
    var directive = {
      link: link,
      template: '<div class="buttons" layout="row" layout-align="start center">' +
        '<a ng-controller="NotificationController" href="#organizers/notifications">' +
        '  <md-icon aria-label="b" ng-if="!help">notifications</md-icon>' +
        '  <md-icon aria-label="b" class="color-fuchsia" ng-if="help">notifications_active</md-icon>' +
        '</a>' +
        '<a href="#/organizers/invite" class="md-icon-button">' +
        '  <md-icon aria-label="b">favorite</md-icon>' +
        '</a>' +
        '<a href="#/logout" class="md-icon-button">' +
        '  <md-icon aria-label="b">exit_to_app</md-icon>' +
        '</a>' +
        '</div>',
      restrict: 'EA',
      replace: true
    };
    function link(scope, element, attrs) {};
    return directive;
  }
})();

'use strict';
(function() {
  OrganizersSponzorsController.$inject = ["$scope", "$translate", "taskSponzorRequest", "sponzorshipRequest", "$localStorage", "$rootScope", "dialogRequest", "SPONZORSHIPSTATUSES", "$mdDialog"];
  function OrganizersSponzorsController($scope, $translate, taskSponzorRequest, sponzorshipRequest, $localStorage, $rootScope, dialogRequest, SPONZORSHIPSTATUSES, $mdDialog) {
    if ($rootScope.userValidation('0')) {
      var vm = this;
      vm.statuses = SPONZORSHIPSTATUSES;
      vm.todayDate = new Date().getTime();
      vm.user = JSON.parse($localStorage.user);

      //This function changes to 1 the sponzorship status
      vm.acceptSponzorship = function(sponzoshipId, i) {
        vm.user.sponzorships_like_organizer[i].loading = true;
        vm.currentSponzorshipId = sponzoshipId;
        var data = {
          status: 1
        };
        sponzorshipRequest.editSponzorshipPatch(sponzoshipId, data).then(function successCallback(response) {
          vm.user.sponzorships_like_organizer[i].task_sponzor = response.data.Sponzorship.task_sponzor;
          vm.user.sponzorships_like_organizer[i].status = 1;
          vm.user.sponzorships_like_organizer[i].loading = false;
          vm.currentSponzorship = vm.user.sponzorships_like_organizer[i];
          $localStorage.user = JSON.stringify(vm.user);
          vm.firebaseNotification = {
            to: vm.currentSponzorship.sponzor.id,
            text: $translate.instant('NOTIFICATIONS.SponzorshipAproved') + vm.currentSponzorship.event.title + ' - ' + vm.currentSponzorship.perk.kind,
            link: '#/sponzors/sponzoring'
          };
          $rootScope.sendFirebaseNotification(vm.firebaseNotification, vm.currentSponzorship.sponzor.id);
        }, function errorCallback() {
          vm.user.sponzorships_like_organizer[i].loading = false;
          dialogRequest.showDialog('error', 'problem', false);
        });
      };
      //This function changes to 0 the sponzorship status
      vm.unacceptSponzorship = function(sponzoshipId, i) {
        vm.currentSponzorshipId = sponzoshipId;
        vm.user.sponzorships_like_organizer[i].loading = true;
        var data = {
          status: 0
        };
        sponzorshipRequest.editSponzorshipPatch(sponzoshipId, data).then(function successCallback(response) {
          vm.user.sponzorships_like_organizer[i].status = 0;
          vm.user.sponzorships_like_organizer[i].task_sponzor = response.data.Sponzorship.task_sponzor;
          vm.user.sponzorships_like_organizer[i].loading = false;
          vm.currentSponzorship = vm.user.sponzorships_like_organizer[i];
          $localStorage.user = JSON.stringify(vm.user);
          vm.firebaseNotification = {
            to: vm.currentSponzorship.sponzor.id,
            text: $translate.instant('NOTIFICATIONS.SponzorshipRejected') + vm.currentSponzorship.event.title + ' - ' + vm.currentSponzorship.perk.kind,
            link: '#/sponzors/sponzoring'
          };
          $rootScope.sendFirebaseNotification(vm.firebaseNotification, vm.currentSponzorship.sponzor.id);
        }, function errorCallback(response) {
          vm.user.sponzorships_like_organizer[i].loading = false;
          dialogRequest.showDialog('error', 'problem', false);
        });
      };
      //this function deletes an sponzorship if the status is 0
      vm.deleteSponzorship = function(sponzorshipId, i) {
        dialogRequest.showLoading();
        vm.currentSponzorship = vm.user.sponzorships_like_organizer[i];
        sponzorshipRequest.deleteSponzorship(sponzorshipId).then(function successCallback() {
          vm.firebaseNotification = {
            to: vm.currentSponzorship.sponzor.id,
            text: $translate.instant('NOTIFICATIONS.SponzorshipDeleted') + vm.currentSponzorship.event.title + ' - ' + vm.currentSponzorship.perk.kind,
            link: '#/sponzors/sponzoring'
          };
          $rootScope.sendFirebaseNotification(vm.firebaseNotification, vm.currentSponzorship.sponzor.id);
          vm.user.sponzorships_like_organizer.splice(i, 1);
          $localStorage.user = JSON.stringify(vm.user);
          vm.getTasks(vm.user.sponzorships_like_organizer[0]);
          dialogRequest.closeLoading();
          dialogRequest.showDialog('success', 'successDeletingSponzorship', false);
        }, function errorCallback() {
          dialogRequest.closeLoading();
          dialogRequest.showDialog('error', 'errorDeletingSponzorship', false);
        });
      };
      vm.changeStatus = function(index, status) {
        vm.currentSponzorship.task_sponzor[index].loading = true;
        var taskSponzorId = vm.currentSponzorship.task_sponzor[index].id;
        var data = {
          status: status
        };
        taskSponzorRequest.editTaskSponzorPatch(taskSponzorId, data).then(function successCallBack(response) {
          vm.currentSponzorship.task_sponzor[index].loading = false;
          vm.currentSponzorship.task_sponzor[index].status = status;

          vm.firebaseNotification = {
            to: vm.currentSponzorship.sponzor.id,
            text: $translate.instant('NOTIFICATIONS.TaskChanged1') + vm.currentSponzorship.task_sponzor[index].task.title + $translate.instant('NOTIFICATIONS.TaskChanged2') + vm.currentSponzorship.event.title+$translate.instant('NOTIFICATIONS.TaskChanged3'),
            link: '#/sponzors/sponzoring'
          };
          $rootScope.sendFirebaseNotification(vm.firebaseNotification, vm.currentSponzorship.sponzor.id);

          $localStorage.user = JSON.stringify(vm.user);

        }, function errorCallback() {
          vm.currentSponzorship.task_sponzor[index].loading = false;
          dialogRequest.showDialog('error', 'errorUpdatingTaskStatus', false);
        });
      };
      vm.seeCause = function(sponzorship) {
        $mdDialog.show(
          $mdDialog.alert()
          .clickOutsideToClose(true)
          .title($translate.instant('organizersSponzors.sponsorshipCause'))
          .textContent(sponzorship.cause)
          .ok('Ok!'));
      };
    }
  }
  angular.module('sponzorme')
    .controller('OrganizersSponzorsController', OrganizersSponzorsController);

})();

'use strict';
(function() {
  OrganizersBalanceController.$inject = ["$scope", "$translate", "$localStorage", "$rootScope"];
  function OrganizersBalanceController($scope, $translate, $localStorage, $rootScope) {
    if ($rootScope.userValidation('0')) {
      var vm = this;
      vm.openMenu = function($mdOpenMenu, $event) {
        vm.originatorEv = $event;
        $mdOpenMenu($event);
      };
      vm.user = JSON.parse($localStorage.user);
      console.log(vm.user.events);
      for (var i = 0; i < vm.user.events.length; i++) {
        vm.user.events[i].sponzorships = [];
        vm.user.events[i].raised = 0;
        for (var j = 0; j < vm.user.sponzorships_like_organizer.length; j++) {
          if (vm.user.events[i].id === vm.user.sponzorships_like_organizer[j].event.id) {
            if (vm.user.sponzorships_like_organizer[j].status > 0) {
              vm.user.events[i].sponzorships.push(vm.user.sponzorships_like_organizer[j]);
              vm.user.events[i].raised += parseFloat(vm.user.sponzorships_like_organizer[j].perk.usd);
            }
          }
        }
      }
    }
  }
  angular.module('sponzorme').controller('OrganizersBalanceController', OrganizersBalanceController);
})();

(function() {
  'use strict';
  OrganizersNewsController.$inject = ["$scope", "$translate", "$localStorage", "$rootScope", "rssRequest"];
  function OrganizersNewsController($scope, $translate, $localStorage, $rootScope, rssRequest) {
    if ($rootScope.userValidation('0')) {
      var vm = this;
      vm.rss = [];
      rssRequest.rss($rootScope.currentLanguage()).then(function(data) {
        vm.rss = data.data.responseData.feed.entries;
        vm.rss = vm.rss.filter(function(e){
          e.publishedDate = new Date(e.publishedDate).getTime();
          return e;
        });
        console.log(vm.rss);
        vm.loadingrss = false;
      });
    }
  }
  angular.module('sponzorme').controller('OrganizersNewsController', OrganizersNewsController);
})();

(function () {
  'use strict';
  OrganizersNotificationsController.$inject = ["$scope", "$rootScope", "$localStorage", "$firebaseArray", "$firebaseObject", "userRequest", "$routeParams", "$location", "$translate"];
  function OrganizersNotificationsController($scope, $rootScope, $localStorage, $firebaseArray, $firebaseObject, userRequest, $routeParams, $location, $translate) {
    if ($rootScope.userValidation('0')) {
      var vm = this;
      $localStorage.help = false;
      if ($routeParams.id) {
        vm.notificationRef = new Firebase($rootScope.getConstants().FURL + 'notifications/' + $localStorage.id + '/' + $routeParams.id);
        vm.currentNotification = $firebaseObject(vm.notificationRef);
        vm.currentNotification.$loaded(function () {
          vm.currentNotification.read = true;
          vm.currentNotification.$save();
        });
      }
      else {
        vm.notificationsRef = new Firebase($rootScope.getConstants().FURL + 'notifications/' + $localStorage.id);
        vm.notifications = $firebaseArray(vm.notificationsRef);
        vm.notificationsRef.on('child_added', function (snapshot) {
          vm.current = snapshot.val();//extract the info
          if ($localStorage.lastUpdate < vm.current.date) {
            userRequest.home($localStorage.id).then(function successCallback(response) {
              $localStorage.lastUpdate = new Date().getTime();
              $localStorage.user = JSON.stringify(response.data.data.user);
            });
          }
        });
      }

      vm.markAsImportant = function (index) {
        console.log(index);
        vm.notificationRef = new Firebase($rootScope.getConstants().FURL + 'notifications/' + $localStorage.id + '/' + index);
        vm.currentNotification = $firebaseObject(vm.notificationRef);
        vm.currentNotification.$loaded(function () {
          vm.currentNotification.important = true;
          vm.currentNotification.$save();
        });
      };
      vm.delete = function (index) {
        vm.notificationRef = new Firebase($rootScope.getConstants().FURL + 'notifications/' + $localStorage.id + '/' + index);
        vm.currentNotification = $firebaseObject(vm.notificationRef);
        vm.currentNotification.$loaded(function () {
          vm.currentNotification.$remove();
          $location.path('/organizers/notifications');
        });
      };
    }
  }
  angular.module('sponzorme').controller('OrganizersNotificationsController', OrganizersNotificationsController);
})();

/* recommended */
angular
    .module('sponzorme')
    .directive('organizersNotificationsNavbar', organizersNotificationsNavbar);

function organizersNotificationsNavbar() {
    var directive = {
        link: link,
        controller: organizersNotificationsNavbarController,
        templateUrl: 'organizers-notifications/navbar.html',
        restrict: 'EA',
        replace: true
    };
    return directive;

    function link(scope, element, attrs) {
        scope.active = attrs.active;
    }

    function organizersNotificationsNavbarController($scope){
      $scope.openMenu = function($mdOpenMenu, $event) {
        $scope.originatorEv = $event;
        $mdOpenMenu($event);
      };
    }
}

(function() {
  'use strict';

  OrganizersTasksController.$inject = ["$scope", "$localStorage", "$rootScope", "$routeParams", "taskSponzorRequest"];
  function OrganizersTasksController($scope, $localStorage, $rootScope, $routeParams, taskSponzorRequest) {
    if ($rootScope.userValidation('0')) {
      var vm = this;
      vm.user = JSON.parse($localStorage.user);
      vm.activePerk = function(p, e) {
        for (var i = 0; i < e.perks.length; i++) {
          e.perks[i].active = false;
        }
        p.active = true;
        vm.showHeader = true;
      }
      vm.changeStatus = function(t) {
        t.loading = true;
        var savedStatus = t.status;
        if (t.status === '1' || t.status === 1) {
          t.status = 0;
        } else {
          t.status = 1;
        }
        var data = {
          status: t.status
        };
        taskSponzorRequest.editTaskSponzorPatch(t.id, data).then(function successCallBack(response) {
          t.loading = false;
          $localStorage.user = JSON.stringify(vm.user);
        }, function errorCallback() {
          t.status = savedStatus;
          t.loading = false;
          dialogRequest.showDialog('error', 'errorUpdatingTaskStatus', false);
        });
      };
    }
  }
  angular.module('sponzorme').controller('OrganizersTasksController', OrganizersTasksController);

})();

(function () {
  'use strict';
  OrganizersCreateTasksController.$inject = ["$scope", "$localStorage", "$routeParams", "taskSponzorRequest", "$rootScope", "dialogRequest"];
  function OrganizersCreateTasksController($scope, $localStorage, $routeParams, taskSponzorRequest, $rootScope, dialogRequest) {
    if ($rootScope.userValidation('0')) {
      var vm = this;
      vm.user = JSON.parse($localStorage.user);
      vm.addNextTask = function (index) {
        if (vm.sponzorshipsToAdd[index] > -1) {
          var cont = vm.sponzorshipsToAdd[index];
          vm.todo = {
            type: 0, //Because is created by the Organizer
            status: 0, //By default is not complete
            perk_id: vm.user.sponzorships[cont].perk.id,
            event_id: vm.user.sponzorships[cont].event_id,
            sponzorship_id: vm.user.sponzorships[cont].id,
            user_id: $localStorage.id,
            organizer_id: vm.user.sponzorships[cont].organizer.id,
            sponzor_id: $localStorage.id,
            title: vm.task.title,
            description: vm.task.description
          };
          taskSponzorRequest.createTaskSponzor(vm.todo).then(function successCallback(response) {
            vm.user.sponzorships[cont].perk.tasks.push(response.data.PerkTask);
            vm.user.sponzorships[cont].task_sponzor.push(response.data.TaskSponzor);
            vm.addNextTask(index + 1);
          });
        }
        else {
          dialogRequest.closeLoading();
          $localStorage.user = JSON.stringify(vm.user);
          dialogRequest.showDialog('success', 'dialog.taskAddedSuccessfuly', '/organizers/tasks');
        }
      };
      vm.addNewTask = function () {
        if(vm.task.title && vm.task.description){
          dialogRequest.showLoading();
          vm.addNextTask(0);
        }
        else{
          dialogRequest.showDialog('error', 'dialog.pleaseCompleteAllFields', false);
        }
      };
      vm.changeSponzorship = function (i) {
        if (vm.sponzorshipsToAdd.indexOf(i) > -1) {
          vm.sponzorshipsToAdd.splice(vm.sponzorshipsToAdd.indexOf(i));
        }
        else {
          vm.sponzorshipsToAdd.push(i);
        }
      };
      vm.task = {};
      vm.sponzorshipsToAdd = [];
    }
  }
  angular.module('sponzorme').controller('OrganizersCreateTasksController', OrganizersCreateTasksController);
})();

(function() {
  'use strict';

  OrganizersPreferencesController.$inject = ["$scope", "$translate", "userRequest", "$localStorage", "$rootScope", "loginRequest", "userInterestRequest", "$log", "allInterestsServiceRequest", "dialogRequest"];
  function OrganizersPreferencesController($scope, $translate, userRequest, $localStorage, $rootScope, loginRequest, userInterestRequest, $log, allInterestsServiceRequest, dialogRequest) {
    if ($rootScope.userValidation('0')) {
      var vm = this;
      vm.user = JSON.parse($localStorage.user);
      vm.getAllInterests = function() {
        allInterestsServiceRequest.allInterestsCategoriesId().then(function successCallback(response) {
          vm.interests = response.data.InterestCategory;
        }, function errorCallback(err) {
          vm.noInterestsLoaded = true;
        });
      };
      vm.querySearch = function(query) {
        return vm.interests.filter(function(e) {
          if (e.name.indexOf(query) > -1) {
            return e;
          }
        });
      };
      vm.removeUserInterest = function(index, id) {
        vm.user.interests.splice(index, 1);
        userInterestRequest.deleteUserInterest(id).then(function(response) {
          $localStorage.user = JSON.stringify(vm.user);
        });
      };
      vm.addUserInterests = function(interest) {
        if (interest && interest.name) {
          var flag = false;
          if (vm.user.interests) {
            for (var i = 0; i < vm.user.interests.length; i++) {
              if (vm.user.interests[i].interest_id === interest.id_interest) {
                flag = true;
                break;
              }
            }
          }
          if (!flag) {
            var dataInterest = {
              user_id: $localStorage.id,
              interest_id: interest.id_interest
            };
            dialogRequest.showLoading();
            userInterestRequest.createUserInterest(dataInterest).then(function successCallback(response) {
              vm.user.interests.push(response.data.UserInterest);
              $localStorage.user = JSON.stringify(vm.user);
              dialogRequest.closeLoading();
            }, function (err){
              dialogRequest.closeLoading();
              dialogRequest.showDialog('error', 'invalidInterestSelection', false);
            });
          }
        } else {
          dialogRequest.showDialog('error', 'invalidInterestSelection', false);
        }
      };
      vm.getAllInterests();
      vm.newItem = '';
    }
  }
  angular.module('sponzorme').controller('OrganizersPreferencesController', OrganizersPreferencesController);
})();


(function() {
    'use strict';
    OrganizersRateController.$inject = ["$scope", "$translate", "userRequest", "$localStorage", "$rootScope", "allInterestsServiceRequest", "loginRequest", "userInterestRequest", "dialogRequest"];
    function OrganizersRateController($scope, $translate, userRequest,
        $localStorage, $rootScope, allInterestsServiceRequest, loginRequest, userInterestRequest, dialogRequest) {
        if ($rootScope.userValidation('0')) {
            var vm = this;
            vm.user = JSON.parse($localStorage.user);
            console.log(vm.user);
            vm.ratings = []; //here is necessary assign the ratings
        }
    }
    angular.module('sponzorme').controller('OrganizersRateController', OrganizersRateController);
})();

(function() {
  'use strict';
  OrganizersProfileController.$inject = ["$scope", "$log", "$translate", "userRequest", "$localStorage", "$rootScope", "loginRequest", "userInterestRequest", "dialogRequest"];
  function OrganizersProfileController($scope, $log, $translate, userRequest, $localStorage, $rootScope, loginRequest, userInterestRequest, dialogRequest) {
    if ($rootScope.userValidation('0')) {
      var vm = this;
      vm.user = JSON.parse($localStorage.user);
      vm.file = false;
      vm.editAccount = function(){
        dialogRequest.showLoading();
        if (vm.user.location !== vm.locationUser) {
          vm.user.location = vm.locationUser.formatted_address;
          vm.user.location_reference = vm.locationUser.place_id;
        }
        if (vm.file) {
          AWS.config.update({
            accessKeyId: $rootScope.getConstants().AMAZONKEY,
            secretAccessKey: $rootScope.getConstants().AMAZONSECRET
          });
          AWS.config.region = $rootScope.getConstants().AMAZONBUCKETREGION;
          var bucket = new AWS.S3({
            params: {
              Bucket: $rootScope.getConstants().AMAZONBUCKET
            }
          });
          // Prepend Unique String To Prevent Overwrites
          var uniqueFileName = btoa($rootScope.uniqueString() + new Date().getTime() + $rootScope.uniqueString()).replace('=', $rootScope.uniqueString()) + '.' + $rootScope.getExtension(vm.file.name);
          var params = {
            Key: uniqueFileName,
            ContentType: vm.file.type,
            Body: vm.file,
            ServerSideEncryption: 'AES256'
          };
          bucket.putObject(params, function(err, data) {
            if (!err) {
              $localStorage.image = $rootScope.getConstants().AMAZONBUCKETURL + uniqueFileName;
              vm.user.image = $rootScope.getConstants().AMAZONBUCKETURL + uniqueFileName;
              vm.user.name = vm.user.firstName +' '+ vm.user.lastName;
              $log.error(vm.user);
              userRequest.editUserPatch($localStorage.id, vm.user).then(function successCallback(response) {
                $localStorage.user = JSON.stringify(vm.user);
                vm.file = false;
                dialogRequest.closeLoading();
                dialogRequest.showDialog('success', 'dialog.accountInfoEditedSuccessfuly', false);
              }, function errorCallback(err) {
                dialogRequest.closeLoading();
                dialogRequest.showDialog('error', 'dialog.errorEditingAccountInfo', false);
              });
            }
          });
        } else {
          vm.user.name = vm.user.firstName +' '+ vm.user.lastName;
          userRequest.editUserPatch($localStorage.id, vm.user).then(function successCallback(response) {
            $localStorage.user = JSON.stringify(vm.user);
            vm.file = false;
            dialogRequest.closeLoading();
            dialogRequest.showDialog('success', 'dialog.accountInfoEditedSuccessfuly', false);
          }, function errorCallback(err) {
            dialogRequest.closeLoading();
            dialogRequest.showDialog('error', 'dialog.errorEditingAccountInfo', false);
          });
        }
      };
    }
  }
  angular.module('sponzorme').controller('OrganizersProfileController', OrganizersProfileController);
})();

(function() {
  'use strict';
  OrganizersChangePasswordController.$inject = ["$scope", "$localStorage", "$rootScope", "loginRequest", "dialogRequest"];
  function OrganizersChangePasswordController($scope, $localStorage, $rootScope, loginRequest, dialogRequest) {
    if ($rootScope.userValidation('0')) {
      var vm = this;
      vm.user = JSON.parse($localStorage.user);
      vm.resetPassword = function() {
        if (vm.password === vm.passwordConfirmation) {
          dialogRequest.showLoading();
          vm.formData = {
            'email': $localStorage.email,
            'password': vm.password,
            'password_confirmation': vm.passwordConfirmation
          };
          loginRequest.changePassword(vm.formData, $localStorage.token).then(function successCallback(response) {
            dialogRequest.closeLoading();
            $localStorage.token = btoa($localStorage.email + ':' + vm.passwordConfirmation);
            dialogRequest.showDialog('success', 'dialog.passwordChangedSuccesfully', false);
            vm.password = '';
            vm.passwordConfirmation = '';
          }, function errorCallback() {
            dialogRequest.closeLoading();
            dialogRequest.showDialog('error', 'dialog.invalidNewPassword', false);
          });
        } else {
          dialogRequest.showDialog('error', 'dialog.passwordNoMatch', false);
        }
      };
    }
  }
  angular.module('sponzorme').controller('OrganizersChangePasswordController', OrganizersChangePasswordController);
})();

(function() {
  'use strict';
  angular.module('sponzorme').directive('settingsNav', settingsNav);

  function settingsNav() {
    var directive = {
      link: link,
      template: '<div class="menuItemContainer" layout="row">' +
        '<div class="menuItem">' +
        '  <a href="#/organizers/settings/profile" md-ink-ripple translate ng-class="{\'textActive\': active == \'profile\'}">preferences.profile</a>' +
        '  <div class="border"  ng-class="{\'active\': active == \'profile\'}"></div>' +
        '</div>' +
        '<div class="menuItem">' +
        '  <a href="#/organizers/settings/preferences" md-ink-ripple translate ng-class="{\'textActive\': active == \'preferences\'}">preferences.preferences</a>' +
        '  <div class="border"  ng-class="{\'active\': active == \'preferences\'}"></div>' +
        '</div>' +
        '<div class="menuItem">' +
        '  <a href="#/organizers/settings/rate" md-ink-ripple translate ng-class="{\'textActive\': active == \'rate \'}">preferences.ratings</a>' +
      '  <div class="border"   ng-class="{\'active\': active == \'rate\'}"></div>' +
      '</div>' +
      '</div>',
      restrict: 'EA',
      replace: true
    };

    function link(scope, element, attrs) {
      scope.active = attrs.active;
    };
    return directive;
  }
})();

(function() {
  'use strict';
  OrganizersEventEditController.$inject = ["$scope", "$mdDialog", "$translate", "$localStorage", "eventRequest", "$rootScope", "$routeParams", "eventbriteRequest", "dialogRequest", "eventTypeRequest", "categoryRequest"];
  function
OrganizersEventEditController($scope, $mdDialog, $translate, $localStorage, eventRequest, $rootScope, $routeParams, eventbriteRequest, dialogRequest, eventTypeRequest, categoryRequest) {
    if ($rootScope.userValidation('0')) {
      var vm = this;
      //List of preseted items to populate event Dates
      vm.hours = [];
      for(var i=0; i<24; i++){
        var string;
        if(i<10){string = '0'+ i;}
        else{string = i;}
        vm.hours.push({number: string+':00:00', text: string+':00:00'});
        vm.hours.push({number: string+':30:00', text: string+':30:00'});
      }
      vm.years = [new Date().getUTCFullYear()-1, new Date().getUTCFullYear(), new Date().getUTCFullYear()+1, new Date().getUTCFullYear()+2];  //One year down, two years up.
      vm.months =
      [{number:'01', text:'January'}, {number:'02', text:'February'}, {number:'03', text:'March'}, {number:'04', text:'April'}, {number:'05', text:'May'}, {number:'06', text:'June'}, {number:'07', text:'July'}, {number:'08', text:'August'}, {number:'09', text:'September'}, {number:'10', text:'October'}, {number:'11', text: 'November'}, {number:'12', text: 'December'}];
      vm.days = [];
      for(var i=1; i<=31; i++){vm.days.push(i)};//Days
      vm.event = {sponzorshipTypes: [], lang: $rootScope.currentLanguage(), organizer: $localStorage.id};
      vm.setEventData = function() {
        if (!$localStorage.eventTypes) {
          eventTypeRequest.allEventTypes().then(function successCallback1(response) {
            $localStorage.eventTypes = JSON.stringify(response.data.eventTypes);
            vm.eventTypes = response.data.eventTypes;
          });
        } else {
          vm.eventTypes = JSON.parse($localStorage.eventTypes);
        }
        if (!$localStorage.categories) {
          categoryRequest.allCategories().then(function successCallback2(response) {
            $localStorage.categories = JSON.stringify(response.data.categories);
            vm.categories = response.data.categories;
          });
        } else {
          vm.categories = JSON.parse($localStorage.categories);
        }
      };
      vm.showSponzorshipType = function(s) {
        s.show = !s.show;
      };

      //This function creates an event
      vm.editNewEvent = function() {

        function verification() {
          dialogRequest.showLoading();
          vm.event.location_reference = vm.event.location;
          vm.event.starts = vm.event.startsAux.year +'-'+ vm.event.startsAux.month+'-'+  vm.event.startsAux.day + ' ' + vm.event.startsAux.hour;
          vm.event.ends = vm.event.endsAux.year +'-'+ vm.event.endsAux.month +'-'+ vm.event.endsAux.day + ' ' + vm.event.endsAux.hour;
          vm.event.perks = vm.event.sponzorshipTypes;
          vm.event.organizer = $localStorage.id;
          eventRequest.editEventPut(vm.event.id, vm.event).then(function successCallback(response) {
            response.data.event.starts = new Date(response.data.event.starts).getTime();
            response.data.event.ends = new Date(response.data.event.ends).getTime();
            for(var i=0; i<vm.user.events.length;i++){
              if(vm.user.events[i].id === $routeParams.eventId){
                vm.user.events[i] = response.data.event;
              }
            }
            $localStorage.user = JSON.stringify(vm.user);
            dialogRequest.closeLoading();
            dialogRequest.showDialog('success', 'eventEditedSuccesfully', '/organizers/dashboard');
          }, function errorCallback(err) {
            dialogRequest.closeLoading();
            dialogRequest.showDialog('error', 'errorCreatingEvent', false);
          });
        };

        vm.event.startsAux2 = new Date(vm.event.startsAux.year +'-'+ vm.event.startsAux.month+'-'+  vm.event.startsAux.day + ' ' + vm.event.startsAux.hour).getTime();
        vm.event.endsAux2 = new Date(vm.event.endsAux.year +'-'+ vm.event.endsAux.month +'-'+ vm.event.endsAux.day + ' ' + vm.event.endsAux.hour).getTime();

        var noTasks = false;
        if(vm.event.sponzorshipTypes.length){//Analysis of the Sponsorship Types
          for(var i=0; i < vm.event.sponzorshipTypes.length; i++){
            if(!vm.event.sponzorshipTypes[i].tasks.length){
              noTasks = true; //It means we found a Sponsorship type with no tasks
              break; //To optimize we skip of the for
            }
          }
        }
        if(!vm.event.sponzorshipTypes.length){
          dialogRequest.showDialog('error', 'eventWithoutSponsorshipTypeText', false);
        }
        else if(noTasks){
          dialogRequest.showDialog('error', 'sponsorshipTypeWithoutTasksText', false);
        }
        //Here is the dates verification
        else if(vm.event.endsAux2<=vm.event.startsAux2){
          dialogRequest.showDialog('error', 'invalidDatesText', false);
        }
        else{
          verification();
        }
      };
      $scope.file=false;
      //this function upload or create the event Image
      $scope.imageVerification = function() {
        if($scope.file){
          vm.creds = {
            bucket: $rootScope.getConstants().AMAZONBUCKET,
            access_key: $rootScope.getConstants().AMAZONKEY,
            secret_key: $rootScope.getConstants().AMAZONSECRET
          };
          AWS.config.update({
            accessKeyId: vm.creds.access_key,
            secretAccessKey: vm.creds.secret_key
          });
          AWS.config.region = $rootScope.getConstants().AMAZONBUCKETREGION;
          var bucket = new AWS.S3({
            params: {
              Bucket: vm.creds.bucket
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
          dialogRequest.showLoading();
          bucket.putObject(params, function(err, data) {
            if (!err) {
              dialogRequest.closeLoading();
              console.log(data);
              vm.event.image = $rootScope.getConstants().AMAZONBUCKETURL + uniqueFileName;
            }
            else{
              dialogRequest.closeLoading();
            }
          });
        }
      };
      vm.addSponzorshipTypeForm = function() {
        var parentEl = angular.element(document.body);
        $mdDialog.show({
         parent: parentEl,
          clickOutsideToClose: true,
          templateUrl: 'organizers-event-add/sponzorshipTypeForm.html',
          controller: ["$scope", function($scope){
            $scope.addSponzorshipType = function() {
              vm.event.sponzorshipTypes.push({
                kind: $scope.newSponzorshipType.kind,
                usd: $scope.newSponzorshipType.usd,
                total_quantity: $scope.newSponzorshipType.totalQuantity,
                reserved_quantity: 0,
                id: '-1',
                tasks: [],
                show: true
              });
              $mdDialog.hide();
            };
          }]
        });
      };
      vm.addTaskForm = function(s){
        var parentEl = angular.element(document.body);
        $mdDialog.show({
         parent: parentEl,
          clickOutsideToClose: true,
          templateUrl: 'organizers-event-add/taskForm.html',
          controller: ["$scope", function($scope){
            $scope.addTask = function() {
              s.tasks.push({
                title: $scope.newTask.title,
                description: $scope.newTask.title,
                id: '-1'
              });
              $mdDialog.hide();
            };
          }]
        });
      };

      vm.removeTask = function(indexSponzorship, indexTask){
        vm.event.tasksToDelete.push(vm.event.sponzorshipTypes[indexSponzorship].tasks[indexTask].id);
        vm.event.sponzorshipTypes[indexSponzorship].tasks.splice(indexTask, 1);
      };
      //this function adds a SponzorshipType to the new event form
      vm.removeSponzorshipType = function(index) {
        vm.event.sponzorshipTypesToDelete.push(vm.event.sponzorshipTypes[index].id);
        for (var i = 0; i < vm.event.sponzorshipTypes[index].tasks.length; i++) {
          vm.event.tasksToDelete.push(vm.event.sponzorshipTypes[index].tasks[i].id);
        }
        vm.event.sponzorshipTypes.splice(index, 1);
      };
      vm.user = JSON.parse($localStorage.user);
      vm.setEventData();
      vm.event = vm.user.events.filter(function(e){
        if(e.id === $routeParams.eventId){
          return e;
        }
      })[0];
      vm.event.tasksToDelete = [];
      vm.event.sponzorshipTypesToDelete = [];
      var auxDate = new Date(vm.event.starts);
      var parseMinutes = auxDate.getMinutes()>9 ? auxDate.getMinutes(): '0'+auxDate.getMinutes();
      var parseSeconds = auxDate.getSeconds()>9 ? auxDate.getSeconds(): '0'+auxDate.getSeconds();
      var parseHours = auxDate.getHours()>9 ? auxDate.getHours(): '0'+auxDate.getHours();
      vm.event.startsAux={
        year: auxDate.getUTCFullYear(),
        month: auxDate.getMonth()+1,
        day:auxDate.getDate(),
        hour:parseHours+':'+ parseMinutes +':'+parseSeconds
      };
      vm.event = vm.user.events.filter(function(e){
        if(e.id === $routeParams.eventId){
          return e;
        }
      })[0];

      var auxDate2 = new Date(vm.event.ends);
      var parseMinutes2 = auxDate2.getMinutes()>9 ? auxDate2.getMinutes(): '0'+auxDate2.getMinutes();
      var parseSeconds2 = auxDate2.getSeconds()>9 ? auxDate2.getSeconds(): '0'+auxDate2.getSeconds();
      var parseHours2 = auxDate2.getHours()>9 ? auxDate2.getHours(): '0'+auxDate2.getHours();
      vm.event.endsAux={
        year: auxDate2.getUTCFullYear(),
        month: auxDate2.getMonth()+1,
        day:auxDate2.getDate(),
        hour:parseHours2+':'+ parseMinutes2 +':'+parseSeconds2
      };
      vm.event.sponzorshipTypes = vm.event.perks;
    }
  }
  angular.module('sponzorme').controller('OrganizersEventEditController', OrganizersEventEditController);
})();

(function() {
  'use strict';

  OrganizersEventAddController.$inject = ["$scope", "$mdDialog", "$translate", "$localStorage", "eventRequest", "$rootScope", "$routeParams", "eventbriteRequest", "dialogRequest", "eventTypeRequest", "categoryRequest"];
  function OrganizersEventAddController($scope, $mdDialog, $translate, $localStorage, eventRequest, $rootScope, $routeParams, eventbriteRequest, dialogRequest, eventTypeRequest, categoryRequest) {
    if ($rootScope.userValidation('0')) {
      function jsonize(str) {
        return str.replace(/([\$\w]+)\s*:/g, function(_, $1) {
          return '"' + $1 + '":';
        }).replace(/'([^']+)'/g, function(_, $1) {
          return '"' + $1 + '"';
        });
      }
      var vm = this;
      //List of preseted items to populate event Dates
      vm.hours = [];
      for (var i = 0; i < 24; i++) {
        var string;
        if (i < 10) {
          string = '0' + i;
        } else {
          string = i;
        }
        vm.hours.push({
          number: string + ':00:00',
          text: string + ':00:00'
        });
        vm.hours.push({
          number: string + ':30:00',
          text: string + ':30:00'
        });
      }
      vm.years = [new Date().getUTCFullYear() - 1, new Date().getUTCFullYear(), new Date().getUTCFullYear() + 1, new Date().getUTCFullYear() + 2]; //One year down, two years up.
      vm.months = [{
        number: '01',
        text: 'January'
      }, {
        number: '02',
        text: 'February'
      }, {
        number: '03',
        text: 'March'
      }, {
        number: '04',
        text: 'April'
      }, {
        number: '05',
        text: 'May'
      }, {
        number: '06',
        text: 'June'
      }, {
        number: '07',
        text: 'July'
      }, {
        number: '08',
        text: 'August'
      }, {
        number: '09',
        text: 'September'
      }, {
        number: '10',
        text: 'October'
      }, {
        number: '11',
        text: 'November'
      }, {
        number: '12',
        text: 'December'
      }];
      vm.days = [];
      for (var i = 1; i <= 31; i++) {
        vm.days.push(i)
      }; //Days
      vm.event = {
        sponzorshipTypes: [],
        lang: $rootScope.currentLanguage(),
        organizer: $localStorage.id,
        image: 'https://s3-us-west-2.amazonaws.com/sponzormewebappimages/event_default.jpg'
      };
      vm.setEventData = function() {
        if (!$localStorage.eventTypes) {
          eventTypeRequest.allEventTypes().then(function successCallback1(response) {
            $localStorage.eventTypes = JSON.stringify(response.data.eventTypes);
            vm.eventTypes = response.data.eventTypes;
          });
        } else {
          vm.eventTypes = JSON.parse($localStorage.eventTypes);
        }
        if (!$localStorage.categories) {
          categoryRequest.allCategories().then(function successCallback2(response) {
            $localStorage.categories = JSON.stringify(response.data.categories);
            vm.categories = response.data.categories;
          });
        } else {
          vm.categories = JSON.parse($localStorage.categories);
        }
      };
      vm.showSponzorshipType = function(s) {
        s.show = !s.show;
      };

      //This function creates an event
      vm.createNewEvent = function() {

        function verification() {
          dialogRequest.showLoading();
          vm.event.location_reference = vm.event.location;
          vm.event.starts = vm.event.startsAux.year + '-' + vm.event.startsAux.month + '-' + vm.event.startsAux.day + ' ' + vm.event.startsAux.hour;
          vm.event.ends = vm.event.endsAux.year + '-' + vm.event.endsAux.month + '-' + vm.event.endsAux.day + ' ' + vm.event.endsAux.hour;
          vm.event.perks = vm.event.sponzorshipTypes;
          eventRequest.createEvent(vm.event).then(function successCallback(response) {
            vm.user = JSON.parse($localStorage.user);
            response.data.event.starts = new Date(response.data.event.starts).getTime();
            response.data.event.ends = new Date(response.data.event.ends).getTime();
            vm.user.events.push(response.data.event);
            $localStorage.user = JSON.stringify(vm.user);
            dialogRequest.closeLoading();
            dialogRequest.showDialog('success', 'eventCreatedSuccesfully', '/organizers/dashboard');
            vm.event = {};

          }, function errorCallback(err) {
            dialogRequest.closeLoading();
            dialogRequest.showDialog('error', 'errorCreatingEvent', false);
          });
        };

        vm.event.startsAux2 = new Date(vm.event.startsAux.year + '-' + vm.event.startsAux.month + '-' + vm.event.startsAux.day + ' ' + vm.event.startsAux.hour).getTime();
        vm.event.endsAux2 = new Date(vm.event.endsAux.year + '-' + vm.event.endsAux.month + '-' + vm.event.endsAux.day + ' ' + vm.event.endsAux.hour).getTime();
        var noTasks = false;
        if(vm.event.sponzorshipTypes.length){//Analysis of the Sponsorship Types
          for(var i=0; i < vm.event.sponzorshipTypes.length; i++){
            if(!vm.event.sponzorshipTypes[i].perkTasks.length){
              noTasks = true; //It means we found a Sponsorship type with no tasks
              break; //To optimize we skip of the for
            }
          }
        }
        if(!vm.event.sponzorshipTypes.length){
          dialogRequest.showDialog('error', 'eventWithoutSponsorshipTypeText', false);
        }
        else if(noTasks){
          dialogRequest.showDialog('error', 'sponsorshipTypeWithoutTasksText', false);
        }
        //Here is the dates verification
        else if (vm.event.endsAux2 <= vm.event.startsAux2) {
          dialogRequest.showDialog('error', 'invalidDatesText', false);
        } else {
          verification();
        }
      };
      $scope.file = false;
      //this function upload or create the event Image
      $scope.imageVerification = function() {
        if ($scope.file) {
          vm.creds = {
            bucket: $rootScope.getConstants().AMAZONBUCKET,
            access_key: $rootScope.getConstants().AMAZONKEY,
            secret_key: $rootScope.getConstants().AMAZONSECRET
          };
          AWS.config.update({
            accessKeyId: vm.creds.access_key,
            secretAccessKey: vm.creds.secret_key
          });
          AWS.config.region = $rootScope.getConstants().AMAZONBUCKETREGION;
          var bucket = new AWS.S3({
            params: {
              Bucket: vm.creds.bucket
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
          dialogRequest.showLoading();
          bucket.putObject(params, function(err, data) {
            if (!err) {
              dialogRequest.closeLoading();
              console.log(data);
              vm.event.image = $rootScope.getConstants().AMAZONBUCKETURL + uniqueFileName;
            } else {
              dialogRequest.closeLoading();
            }
          });
        }
      };
      vm.addSponzorshipTypeForm = function() {
        var parentEl = angular.element(document.body);
        $mdDialog.show({
         parent: parentEl,
          clickOutsideToClose: true,
          templateUrl: 'organizers-event-add/sponzorshipTypeForm.html',
          controller: ["$scope", function($scope) {
            $scope.addSponzorshipType = function() {
              vm.event.sponzorshipTypes.push({
                kind: $scope.newSponzorshipType.kind,
                usd: $scope.newSponzorshipType.usd,
                total_quantity: $scope.newSponzorshipType.totalQuantity,
                reserved_quantity: 0,
                perkTasks: [],
                show: true
              });
              $mdDialog.hide();
            };
          }]
        });
      };
      vm.addTaskForm = function(s) {
        var parentEl = angular.element(document.body);
        $mdDialog.show({
         parent: parentEl,
          clickOutsideToClose: true,
          templateUrl: 'organizers-event-add/taskForm.html',
          controller: ["$scope", function($scope) {
            $scope.addTask = function() {
              s.perkTasks.push({
                title: $scope.newTask.title,
                description: $scope.newTask.title
              });
              $mdDialog.hide();
            };
          }]
        });
      };
      vm.removeTask = function(indexSponzorship, indexTask) {
        vm.event.sponzorshipTypes[indexSponzorship].perkTasks.splice(indexTask, 1);
      };
      //this function adds a SponzorshipType to the new event form
      vm.removeSponzorshipType = function(index) {
        vm.event.sponzorshipTypes.splice(index, 1);
      };

      //-----------------------------------------------------------//
      //EVENTBRITE FUNCTIONALITY
      //-----------------------------------------------------------//

      vm.connectEventbrite = function() {
        var parentEl = angular.element(document.body);
        $mdDialog.show({
         parent: parentEl,
          clickOutsideToClose: true,
          templateUrl: 'organizers-event-add/eventbrite-dialog.html',
          controller: ["$scope", function($scope) {
            $scope.getEventbriteEvents = function(accessToken) {
              $scope.loadingEventbriteEvents = true;
              eventbriteRequest.getEventbriteEvents(accessToken)
                .success(function(data, head) {
                  $scope.loadingEventbriteEvents = false;
                  $scope.eventbriteEvents = data.events;
                }).error(function(data) {
                  $scope.loadingEventbriteEvents = false;
                  $scope.errorLoadingEventbriteEvents = true;
                });
            };
            $scope.prefillEventFromEvenbrite = function(e) {
              vm.event.title = e.name.text;
              vm.event.description = e.description.text;
              vm.event.starts = new Date(e.start.local).getTime();
              vm.event.ends = new Date(e.end.local).getTime();
              vm.event.privacy = 0;
              vm.event.image = e.logo.url;
              //----------------------------------------------
              var auxDate = new Date(vm.event.starts);
              var parseMinutes = auxDate.getMinutes() > 9 ? auxDate.getMinutes() : '0' + auxDate.getMinutes();
              var parseSeconds = auxDate.getSeconds() > 9 ? auxDate.getSeconds() : '0' + auxDate.getSeconds();
              var parseHours = auxDate.getHours() > 9 ? auxDate.getHours() : '0' + auxDate.getHours();
              vm.event.startsAux = {
                year: auxDate.getUTCFullYear(),
                month: auxDate.getMonth() + 1,
                day: auxDate.getDate(),
                hour: parseHours + ':' + parseMinutes + ':' + parseSeconds
              };
              var auxDate2 = new Date(vm.event.ends);
              var parseMinutes2 = auxDate2.getMinutes() > 9 ? auxDate2.getMinutes() : '0' + auxDate2.getMinutes();
              var parseSeconds2 = auxDate2.getSeconds() > 9 ? auxDate2.getSeconds() : '0' + auxDate2.getSeconds();
              var parseHours2 = auxDate2.getHours() > 9 ? auxDate2.getHours() : '0' + auxDate2.getHours();
              vm.event.endsAux = {
                year: auxDate2.getUTCFullYear(),
                month: auxDate2.getMonth() + 1,
                day: auxDate2.getDate(),
                hour: parseHours2 + ':' + parseMinutes2 + ':' + parseSeconds2
              };
              $mdDialog.hide();
            };
            $scope.EVENTBRITEAPYKEY = $rootScope.getConstants().EVENTBRITEAPYKEY;
            $scope.connectingToEventbrite = true;
            var currentTime = new Date().getTime();
            if ($localStorage.eventBriteBearedExpirationTime && currentTime < $localStorage.eventBriteBearedExpirationTime) {
              $scope.connectedToEventbrite = true;
              $scope.connectingToEventbrite = false;
              $scope.errorConnectingToEventbrite = false;
              $scope.getEventbriteEvents($localStorage.eventBriteBeared);
            } else {
              eventbriteRequest.getEventbriteAuth($routeParams.eventBriteCode).success(function(data) {
                var response = JSON.parse(jsonize(data.response));
                if (response.error) {
                  $scope.connectedToEventbrite = false;
                  $scope.connectingToEventbrite = false;
                  $scope.errorConnectingToEventbrite = true;
                } else {
                  $scope.connectedToEventbrite = true;
                  $scope.connectingToEventbrite = false;
                  $scope.errorConnectingToEventbrite = false;
                  $localStorage.eventBriteBeared = response.access_token;
                  $localStorage.eventBriteBearedExpirationTime = new Date().getTime() + 3600000;
                  $scope.getEventbriteEvents($localStorage.eventBriteBeared);
                }
              });
            }
          }]
        });
      };

      //-----------------------------------------------------------//
      //MEETUP FUNCTIONALITY
      //-----------------------------------------------------------//

      vm.connectMeetup = function() {
        var parentEl = angular.element(document.body);
        $mdDialog.show({
         parent: parentEl,
          clickOutsideToClose: true,
          templateUrl: 'organizers-event-add/meetup-dialog.html',
          controller: ["$scope", function($scope) {

            $scope.getMeetupGroups = function(accessToken) {
              $scope.loadingMeetupEvents = true;
              eventbriteRequest.getMeetupGroups(accessToken)
                .success(function(data) {
                  $scope.loadingMeetupEvents = false;
                  $scope.meetupEvents = JSON.parse(data.response);
                  console.log($scope.meetupEvents);
                }).error(function(data) {
                  $scope.loadingMeetupEvents = false;
                  $scope.errorLoadingMeetupEvents = true;
                });
            };

            $scope.prefillEventFromMeetup = function(e) {
              vm.event.title = e.name;
              vm.event.description = e.description;
              vm.event.starts = new Date(e.time);
              var dataTime = new Date(e.time);
              var timer = parseInt(1 * 2 * 60 * 60 * 1000);
              var dataExpDate = new Date(dataTime.getTime() + timer);
              vm.event.ends = new Date(dataExpDate);
              vm.event.privacy = 0;
              var auxDate = new Date(vm.event.starts);
              var parseMinutes = auxDate.getMinutes() > 9 ? auxDate.getMinutes() : '0' + auxDate.getMinutes();
              var parseSeconds = auxDate.getSeconds() > 9 ? auxDate.getSeconds() : '0' + auxDate.getSeconds();
              var parseHours = auxDate.getHours() > 9 ? auxDate.getHours() : '0' + auxDate.getHours();
              vm.event.startsAux = {
                year: auxDate.getUTCFullYear(),
                month: auxDate.getMonth() + 1,
                day: auxDate.getDate(),
                hour: parseHours + ':' + parseMinutes + ':' + parseSeconds
              };
              var auxDate2 = new Date(vm.event.ends);
              var parseMinutes2 = auxDate2.getMinutes() > 9 ? auxDate2.getMinutes() : '0' + auxDate2.getMinutes();
              var parseSeconds2 = auxDate2.getSeconds() > 9 ? auxDate2.getSeconds() : '0' + auxDate2.getSeconds();
              var parseHours2 = auxDate2.getHours() > 9 ? auxDate2.getHours() : '0' + auxDate2.getHours();
              vm.event.endsAux = {
                year: auxDate2.getUTCFullYear(),
                month: auxDate2.getMonth() + 1,
                day: auxDate2.getDate(),
                hour: parseHours2 + ':' + parseMinutes2 + ':' + parseSeconds2
              };
              $mdDialog.hide();
            };

            $scope.MEETUPAPIKEY = $rootScope.getConstants().MEETUPAPIKEY;
            $scope.MEETUPREDIRECTURL = $rootScope.getConstants().MEETUPREDIRECTURL;
            $scope.connectingToMeetup = true;
            var currentTime = new Date().getTime();

            if ($localStorage.meetupBeared && $localStorage.meetupBearedExpirationTime > currentTime) {
              $scope.connectedToMeetup = true;
              $scope.connectingToMeetup = false;
              $scope.errorConnectingToMeetup = false;
              $scope.getMeetupGroups($localStorage.meetupBeared);
            } else {
              eventbriteRequest.getMeetupAuth($routeParams.meetupCode).success(function(data) {
                var response = JSON.parse(jsonize(data.response));
                if (response.error) {
                  $scope.connectedToMeetup = false;
                  $scope.connectingToMeetup = false;
                  $scope.errorConnectingToMeetup = true;
                } else {
                  $scope.connectedToMeetup = true;
                  $scope.connectingToMeetup = false;
                  $scope.errorConnectingToMeetup = false;
                  $localStorage.meetupBeared = response.access_token;
                  $localStorage.meetupBearedExpirationTime = new Date().getTime() + 3600000;
                  $scope.getMeetupGroups(response.access_token);
                }
              });
            }
          }]
        });
      };
      vm.importSelection = function() {
        var parentEl = angular.element(document.body);
        $mdDialog.show({
         parent: parentEl,
          clickOutsideToClose: true,
          templateUrl: 'organizers-event-add/import-dialog.html',
          controller: ["$scope", function($scope) {
            $scope.a = function() {
              vm.connectEventbrite();
              $mdDialog.hide();
            }
            $scope.b = function() {
              vm.connectMeetup();
              $mdDialog.hide();
            };
          }]
        });
      }
      vm.setEventData(); //Here Starts the Callback
      if ($routeParams.eventBriteCode) {
        vm.connectEventbrite();
      } else if ($routeParams.meetupCode) {
        vm.connectMeetup();
      }
    }
  }
  angular.module('sponzorme').controller('OrganizersEventAddController', OrganizersEventAddController);
})();

(function() {
  'use strict';
  OrganizersSponzorProfileController.$inject = ["$scope", "$translate", "userRequest", "$localStorage", "$rootScope", "loginRequest", "$routeParams", "userInterestRequest", "dialogRequest"];
  function OrganizersSponzorProfileController($scope, $translate, userRequest, $localStorage, $rootScope, loginRequest, $routeParams, userInterestRequest, dialogRequest) {
    if ($rootScope.userValidation('0')) {
      var vm = this;
      dialogRequest.showLoading();
      vm.sponsor = false;
      userRequest.oneUser($routeParams.idSponsor).then(function(response){
        vm.sponsor = response.data.data;
        vm.sponsor.rating = vm.sponsor.rating || 0;
        vm.amount = 0.00;
        if(vm.sponsor.user.sponzorships){
          for (var i = 0; i < vm.sponsor.user.sponzorships.length; i++) {
            if(vm.sponsor.user.sponzorships[i].status){
              vm.amount = parseFloat(vm.amount + parseFloat(vm.sponsor.user.sponzorships[i].perk.usd));
            }
          }
        }
        dialogRequest.closeLoading();

      }, function (err){
        console.log(err);
      });
    }
  }
  angular.module('sponzorme').controller('OrganizersSponzorProfileController', OrganizersSponzorProfileController);
})();

(function() {
  'use strict';

  OrganizersChatController.$inject = ["$scope", "$firebaseArray", "$localStorage", "$location", "$routeParams", "sponzorshipRequest", "$rootScope"];
  function OrganizersChatController($scope, $firebaseArray, $localStorage, $location, $routeParams, sponzorshipRequest, $rootScope) {
    if ($rootScope.userValidation('0')) {
      var vm = this;
      sponzorshipRequest.oneSponzorship($routeParams.sponzorshipId).then(function successCallback(response) {
        vm.sponzorshipInfo = response.data.data;
        if (response.data.data.Organizer.id === $localStorage.id) {
          vm.newMessage = {
            'author': response.data.data.Organizer.name,
            'type': '#5DDECF',
            'sponzorshipId': $routeParams.sponzorshipId
          };
        } else if (response.data.data.Sponzor.id === $localStorage.id) {
          vm.newMessage = {
            'author': response.data.data.Sponzor.name,
            'type': '#F6CECE',
            'sponzorshipId': $routeParams.sponzorshipId
          };
        } else {
          $location.path('/login');
        }
      });
      var ref = new Firebase($rootScope.getConstants().FURL + 'chat');
      var query = ref.orderByChild('sponzorshipId').equalTo($routeParams.sponzorshipId);
      vm.chatMessages = $firebaseArray(query);
      vm.addMessage = function() {
        if (vm.newMessage.text) {
          vm.newMessage.userImage = $localStorage.image;
          vm.newMessage.timedate = new Date().getTime();
          vm.chatMessages.$add(vm.newMessage);
          console.log(vm.chatMessages);
          vm.newMessage.text = '';
        }
      };
    }
  }

  angular.module('sponzorme')
    .controller('OrganizersChatController', OrganizersChatController);
})();

(function() {
  'use strict';

  OrganizersSponsorRatingController.$inject = ["$scope", "$localStorage", "$rootScope", "ratingRequest", "SPONZORSHIPSTATUSES", "$routeParams", "$mdDialog", "$translate", "dialogRequest"];
  function OrganizersSponsorRatingController($scope, $localStorage, $rootScope, ratingRequest, SPONZORSHIPSTATUSES, $routeParams, $mdDialog, $translate, dialogRequest) {
    if ($rootScope.userValidation('0')) {
      var vm = this;
      vm.user = JSON.parse($localStorage.user);

      vm.saveRating = function() { //Finally we save the rating information
        dialogRequest.showLoading();
        if (vm.rating.other) {
          vm.rating.question5 = 'Other: ' + vm.rating.other;
        }
        ratingRequest.createRating(vm.rating).then(function successCallback(response) {
          vm.user.sponzorships_like_organizer[$routeParams.sponzorshipId].ratings.push(response.data.Rating);
          vm.user.sponzorships_like_organizer[$routeParams.sponzorshipId].rated_organizer = true;
          $localStorage.user = JSON.stringify(vm.user);
          var firebaseNotification = {
            to: response.data.Rating.sponzor_id,
            text: $translate.instant('NOTIFICATIONS.SponzorRated') + vm.user.name,
            link: '#/profile/' + response.data.Rating.organizer_id
          };
          $rootScope.sendFirebaseNotification(firebaseNotification, response.data.Rating.organizer_id);
          vm.initForm();
          dialogRequest.closeLoading();
          dialogRequest.showDialog('success', 'sponzorRateSuccesfuly', '/organizers/sponzors');
          //success and redirect
          console.log(response);
        }, function errorCallback(err) {
          dialogRequest.closeLoading();
          dialogRequest.showDialog('error', 'invalidRate', false);
          //bad and stay there
          console.log(err);
        });
      };

      vm.initForm = function() {
        vm.rating = {
          organizer_id: $localStorage.id,
          sponzor_id: vm.currentSponzorship.sponzor.id,
          sponzorship_id: vm.currentSponzorship.id,
          type: 0,
          question0: '',
          question1: '',
          question2: '',
          question3: '',
          question4: '',
          question5: '',
          question6: ''
        };
      };

      if ($routeParams.sponzorshipId) {
        vm.currentSponzorship = vm.user.sponzorships_like_organizer[$routeParams.sponzorshipId];
        console.log(vm.currentSponzorship);
        vm.initForm();
      }
    }
  }

  angular.module('sponzorme')
    .controller('OrganizersSponsorRatingController', OrganizersSponsorRatingController);
})();

(function() {
  'use strict';
  OrganizersEventTasksController.$inject = ["$scope", "$translate", "taskSponzorRequest", "sponzorshipRequest", "$localStorage", "$rootScope", "dialogRequest", "$routeParams", "SPONZORSHIPSTATUSES", "$mdDialog"];
  function OrganizersEventTasksController($scope, $translate, taskSponzorRequest, sponzorshipRequest, $localStorage, $rootScope, dialogRequest, $routeParams, SPONZORSHIPSTATUSES, $mdDialog) {
    if ($rootScope.userValidation('0')) {
      var vm = this;
      vm.user = JSON.parse($localStorage.user);
      vm.eventId = $routeParams.eventId;
      vm.activePerk = function(p, e) {
        console.log(e);
        for (var i = 0; i < e.perks.length; i++) {
          e.perks[i].active = false;
        }
        p.active = true;
        vm.showHeader = true;
      }
      vm.changeStatus = function(t) {
        t.loading = true;
        var savedStatus = t.status;
        if (t.status === '1' || t.status === 1) {
          t.status = 0;
        } else {
          t.status = 1;
        }
        var data = {
          status: t.status
        };
        taskSponzorRequest.editTaskSponzorPatch(t.id, data).then(function successCallBack(response) {
          t.loading = false;
          $localStorage.user = JSON.stringify($scope.user);
        }, function errorCallback() {
          t.status = savedStatus;
          t.loading = false;
          dialogRequest.showDialog('error', 'errorUpdatingTaskStatus', false);
        });
      };
    }
  }
  angular.module('sponzorme').controller('OrganizersEventTasksController', OrganizersEventTasksController);
})();

(function() {
  'use strict';

  OrganizersCreateController.$inject = ["$scope", "$translate", "userRequest", "$location", "$localStorage", "$routeParams", "$rootScope", "MINAGE", "MAXAGE", "categoryRequest", "userInterestRequest", "dialogRequest", "$mdDialog"];
  function OrganizersCreateController($scope, $translate, userRequest, $location, $localStorage, $routeParams, $rootScope, MINAGE, MAXAGE, categoryRequest, userInterestRequest, dialogRequest, $mdDialog) {
    if ($routeParams.lang === 'en' || $routeParams.lang === 'es' || $routeParams.lang === 'pt') {
      $translate.use($routeParams.lang);
    }
    $scope.doCreate = function() {
      if ($scope.create.password.trim() !== ''  || $scope.create.password_confirmation.trim() !== '' ) {
        if ($scope.create.password === $scope.create.password_confirmation && $scope.create.password_confirmation.length > 6) {
          dialogRequest.showLoading();
          $scope.create.lang = $rootScope.currentLanguage();
          $scope.create.type = 0;
          $scope.create.name = $scope.create.firstname + ' ' + $scope.create.lastname;
          userRequest.createUser($scope.create).success(function(adata) {
            $localStorage.cookiesponzorme = btoa($scope.create.email + ':' + $scope.create.password);
            $localStorage.token = btoa($scope.create.email + ':' + $scope.create.password);
            $localStorage.typesponzorme = adata.User.type;
            $localStorage.id = adata.User.id;
            $localStorage.email = adata.User.email;
            $localStorage.demo = adata.User.demo;
            $localStorage.startDate = Date.now();
            $scope.toggleCreateForm();
            dialogRequest.closeLoading();
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
            dialogRequest.closeLoading();
            var parentEl = angular.element(document.body);
            console.log($scope.errorMessages);
            $mdDialog.show({
              parent: parentEl,
              template: '<md-dialog aria-label="dialog">'+
                '<md-toolbar>'+
                  '<div class="md-toolbar-tools top-info">'+
                    '<i class="material-icons md-48 md-light">info</i>'+
                  '</div>'+
                '</md-toolbar>'+
                '<md-dialog-content>'+
                  '<div layout="column" layout-align="center center">'+
                    '<h1 translate>dialog.error.title</h1>'+
                    '<p ng-repeat="m in errorMessages">'+
                      '{{\'dialog.error.\'+m|translate}}'+
                    '</p>'+
                  '</div>'+
                '</md-dialog-content>'+
                '<md-dialog-actions>'+
                  '<md-button ng-click="closeDialog()" class="md-primary">'+
                    '{{"Ok"}}'+
                  '</md-button>'+
                '</md-dialog-actions>'+
              '</md-dialog>',
              locals: {
                errorMessages: $scope.errorMessages
              },
              controller: ["$scope", "$mdDialog", "errorMessages", function DialogController($scope, $mdDialog, errorMessages) {
                $scope.errorMessages = errorMessages;
                $scope.closeDialog = function() {
                  $mdDialog.hide();
                }
              }]
            });
          });
        } else {
          if ($scope.create.password_confirmation.length > 6) {
            dialogRequest.showDialog('error', 'errorRegisterPasswordNoMatch', false);
          } else {
            dialogRequest.showDialog('error', 'errorRegisterShortPassword', false);
          }
        }
      } else {
        dialogRequest.showDialog('error', 'errorRegisterPasswordNoEmpty', false);
      }
    };
    $scope.doCustomization = function() {
      dialogRequest.showLoading();
      $scope.create.location_reference = 'Fake';
      $scope.create.image = 'https://s3-us-west-2.amazonaws.com/sponzormewebappimages/user_default.jpg';
      userRequest.editUserPatch($localStorage.id, $scope.create).success(function(adata) {
        dialogRequest.showDialog('success', 'registerCompleted', '/login');
        dialogRequest.closeLoading();
      });
      //Code to save the interests
      var interestsArray = [];
      for (var i = 0; i < $scope.create.interests.length; i++) {
        var item = {
          'user_id': $localStorage.id,
          'interest_id': $scope.create.interests[i]
        };
        interestsArray.push(item);
      }
      var data = {
        interests: interestsArray
      };
      userInterestRequest.bulkUserInterest(data).then(function successCallback() {});
      //End the code to save the interests
    };

    categoryRequest.allCategories().then(function successCallback(response) {
      $scope.categories = response.data.categories;
    }, function errorCallback() {
      $scope.categories = [];
    });

    $scope.pages = {
      'firstPage': '',
      'secondPage': '',
      'thirdPage': ''
    }

    $scope.submitSucces = function() {
      return false;
    };

    $scope.create = {
      'date': new Date(),
      'image': '',
      'success': false,
      'age': '',
      'password': '',
      'password_confirmation': ''

    };

    $scope.firstPage = true;

    $scope.toggleCreateForm = function() {
      if ($scope.firstPage === true) {
        $scope.firstPage = false;
      } else {
        $scope.firstPage = true;
      }
    };

    $scope.ageRange = [];
    for (var j = MINAGE; j < MAXAGE; j++) {
      $scope.ageRange.push(j);
    }
  }
  angular.module('sponzorme').controller('OrganizersCreateController', OrganizersCreateController);
})();

(function () {
  'use strict';
  OrganizersInviteController.$inject = ["$scope", "$translate", "userRequest", "$rootScope", "$localStorage", "dialogRequest"];
  function OrganizersInviteController($scope, $translate, userRequest, $rootScope, $localStorage, dialogRequest) {
    if ($rootScope.userValidation('0')) {
      var vm = this;
      vm.friend = { 'email': '', 'message': 'no-message', 'user_id': $localStorage.id }; //Define the object to be used.
      //This function invites to a friend to use our platform.
      vm.inviteFriend = function () {
        dialogRequest.showLoading();
        userRequest.invitedUser(vm.friend).then(function successCallback(adata) {
          dialogRequest.closeLoading();
          dialogRequest.showDialog('success', 'inviteFiendEmailSent', false);
          vm.friend = { 'email': '', 'message': 'no-message', 'user_id': $localStorage.id };
        }, function errorCallback(err) {
          dialogRequest.closeLoading();
          dialogRequest.showDialog('error', 'problem', false);
        });
      };
    }
  }
  angular.module('sponzorme').controller('OrganizersInviteController', OrganizersInviteController);
})();

(function() {
  'use strict';
  LoginController.$inject = ["$scope", "$translate", "loginRequest", "$localStorage", "$location", "dialogRequest", "$routeParams", "$rootScope", "userRequest"];
  function LoginController($scope, $translate, loginRequest, $localStorage, $location, dialogRequest, $routeParams, $rootScope, userRequest){
    if ($routeParams.lang === 'en' || $routeParams.lang === 'es' || $routeParams.lang === 'pt') {
      $translate.use($routeParams.lang);
    }
    var redirectTo = $localStorage.redirectTo;
    $localStorage.$reset();
    $scope.login = {};
    $scope.doLogin = function() {
      if ($scope.login.email && $scope.login.password) { //Just Check the values are defined
        $scope.login.lang = $rootScope.currentLanguage();
        dialogRequest.showLoading();
        loginRequest.login($scope.login).then(function successCallback(response) {
          if (response.data.user.activated === '1' || response.data.user.activated === 1) { // If account activated
            var expireDate = new Date();
            expireDate.setDate(expireDate.getDate() + 1);
            /* User Vars initialization */
            $localStorage.type = response.data.user.type;
            $localStorage.token = btoa($scope.login.email + ':' + $scope.login.password);
            $localStorage.id = response.data.user.id;
            $localStorage.email = response.data.user.email;
            $localStorage.demo = response.data.user.demo;
            $localStorage.image = response.data.user.image;
            $localStorage.startDate = Date.now();
            $localStorage.rating = response.data.rating;
            $translate.use(response.data.user.lang);
            $localStorage.lastUpdate = new Date().getTime();
            dialogRequest.closeLoading();
            if(response.data.user.sponzorships){
              response.data.user.sponzorships = response.data.user.sponzorships.filter(function(e){
                e.event.starts = e.event.starts.replace(' ', 'T');
                e.event.starts = new Date(e.event.starts).getTime();
                return e;
              });
            }
            if(response.data.eventTasks){
              var filteredEvents = [];
              response.data.eventTasks.filter(function(e){
                if(e.sponzorship.length){
                  return e.perks.filter(function(p){
                    if(p.sponzor_tasks.length){
                      filteredEvents.push(e);
                      return e;
                    }
                  });
                }
              });
              response.data.user.eventTasks = filteredEvents;
            }

            if(response.data.user.events){
              response.data.user.events = response.data.user.events.filter(function(e){
                e.starts = e.starts.replace(' ', 'T');
                e.starts = new Date(e.starts).getTime();
                return e;
              });
            }

            //Generating firstName, lastName for the user
            var tempName = response.data.user.name.split(' ');
            response.data.user.firstName = tempName[0];
            response.data.user.lastName = tempName[1];
            $localStorage.user = JSON.stringify(response.data.user);
            $localStorage.events = [];
            $scope.$storage = $localStorage;
            /* End user vars initialization */
            if(response.data.events){
              var parsedEvents = response.data.events.filter(function(e){
                e.starts = e.starts.replace(' ', 'T');
                e.ends = e.ends.replace(' ', 'T');
                e.starts = new Date(e.starts).getTime();
                e.ends = new Date(e.ends).getTime();
                return e;
              })
              $localStorage.events = JSON.stringify(parsedEvents);
            }
            if (response.data.user.type === '1' || response.data.user.type === 1) {
              if ((redirectTo && redirectTo.indexOf('/#/login') === -1 && redirectTo.indexOf('sponzors') > -1) || (redirectTo && redirectTo.indexOf('/#/event/') > -1)) {
                window.location.href = redirectTo;
              } else {
                $location.path('/sponzors/dashboard');
              }
            } else {
              if ((redirectTo && redirectTo.indexOf('/#/login') === -1 && redirectTo.indexOf('organizers') > -1) || (redirectTo && redirectTo.indexOf('/#/event/') > -1)){
                window.location.href = redirectTo;
              }
              else {
                $location.path('/organizers/dashboard');
              }
            }
          } else {
            dialogRequest.closeLoading();
            dialogRequest.showDialog('error', 'unactivatedAccount', false);
          }
        }, function errorCallback() {
          $scope.loagind = false;
          dialogRequest.closeLoading();
          dialogRequest.showDialog('error', 'invalidCredentials', false);
        });
      }
    };
    $scope.tryActivation = function(){
      dialogRequest.showLoading();
      loginRequest.tryActivation($routeParams.token).success(function() {
        dialogRequest.closeLoading();
        dialogRequest.showDialog('success', 'activationSuccess', false);
      }).error(function() {
        dialogRequest.closeLoading();
        dialogRequest.showDialog('error', 'errorActivation', false);
      });
    };
    if($routeParams.token){
      $scope.tryActivation();
    }
  }
  angular.module('sponzorme').controller('LoginController', LoginController);
})();

(function(){
  'use strict';
  LogoutController.$inject = ["$scope", "$translate", "$location", "$localStorage", "$rootScope"];
  function LogoutController($scope, $translate, $location, $localStorage, $rootScope) {
    $localStorage.$reset();
    $location.path('/login');
  }
angular.module('sponzorme').controller('LogoutController', LogoutController);
})();

(function() {
  'use strict';
  ForgotController.$inject = ["$scope", "$rootScope", "$routeParams", "loginRequest", "dialogRequest"];
  function ForgotController($scope, $rootScope, $routeParams, loginRequest, dialogRequest) {
    var vm = this;
    vm.forgotPassword = function() {
      dialogRequest.showLoading();
      loginRequest.resetPassword(vm.email).then(function successCallback1() {
        dialogRequest.closeLoading();
        dialogRequest.showDialog('success','PasswordResetLinkSent', false);
      }, function errorCallback1() {
        dialogRequest.closeLoading();
        dialogRequest.showDialog('error','InvalidEmail', false);
      });
    };
    vm.resetPassword = function() {
      dialogRequest.showLoading();
      if (vm.password === vm.passwordConfirmation) {
        var formData = {
          'email': vm.email,
          'password': vm.password,
          'password_confirmation': vm.passwordConfirmation
        };
        loginRequest.updatePassword($routeParams.tokenReset, formData).then(function successCallback2(response) {
          dialogRequest.closeLoading();
          dialogRequest.showDialog('success','PasswordChangedSuccesfully', '/login');
        }, function errorCallback2(err) {
          dialogRequest.closeLoading();
          dialogRequest.showDialog('error', 'InvalidData' , false);
        });
      } else {
        dialogRequest.closeLoading();
        dialogRequest.showDialog('error', 'errorRegisterPasswordNoMatch' , false);
      }
    };
  }
  angular.module('sponzorme').controller('ForgotController', ForgotController);
})();

'use strict';
(function () {

  LandingController.$inject = ["$scope", "$mdDialog", "$routeParams", "$translate", "$localStorage", "$location", "eventRequest", "sponzorshipRequest", "$rootScope", "dialogRequest", "$sce"];
  function LandingController($scope, $mdDialog, $routeParams, $translate, $localStorage, $location, eventRequest, sponzorshipRequest, $rootScope, dialogRequest, $sce) {
    var vm = this;
    vm.sponsoreable = false;
    if ($localStorage.id && $localStorage.type === '1' && $localStorage.user) {
      vm.sponsoreable = true;
      vm.events = JSON.parse($localStorage.events);
      vm.events.filter(function (e) {
        if (e.id === $routeParams.eventId) {
          console.log(e);
          vm.currentEvent = e;
        }
      });
      vm.currentEvent.description = $sce.trustAsHtml(vm.currentEvent.description);
      vm.formCreateSponzorship = function (perk) {
        $scope.newSponzorship = { // Review why is not possible with vm instead of $scope
          'organizer_id': vm.currentEvent.user_organizer.id,
          'sponzor_id': $localStorage.id,
          'event_id': vm.currentEvent.id,
          'perk_id': perk.id,
          'cause': '',
          'status': 0
        };
        $mdDialog.show({
          templateUrl: 'sponzors-event/create-sponzorship.html',
          controller: 'SponzorsEventController',
          controllerAs: 'sec',
          scope: $scope,
          clickOutsideToClose: true
        });
      };
      vm.createSponzorship = function () {
        dialogRequest.closeLoading();
        dialogRequest.showLoading();
        vm.user = JSON.parse($localStorage.user);
        vm.user.sponzorships = vm.user.sponzorships.filter(function (e) {
          if (e.status === '0') {
            return e;
          }
        });
        sponzorshipRequest.createSponzorship($scope.newSponzorship).then(function successCallback(response) {
          console.log('ok', response);
          vm.user.sponzorships.push(response.data.Sponzorship);
          $localStorage.user = JSON.stringify(vm.user);
          vm.firebaseNotification = {
            to: vm.currentEvent.user_organizer.id,
            text: $translate.instant('NOTIFICATIONS.NewSponzorshipRequestfor') + vm.currentEvent.title,
            link: '#/organizers/sponzors'
          };
          $rootScope.sendFirebaseNotification(vm.firebaseNotification, vm.currentEvent.user_organizer.id);
          dialogRequest.closeLoading();
          dialogRequest.showDialog('success', 'sponzorshipCreatedSuccesfuly', false);
        }, function errorCallback(err) {
          console.log('err', err);
          dialogRequest.closeLoading();
          if (err.status === 409) {
            dialogRequest.showDialog('error', 'alreadySponzoring', false);
          } else {
            dialogRequest.showDialog('error', 'youCanNotSponzorThisEvent', false);
          }
        });
      };
    }
    else{
      eventRequest.oneEvent($routeParams.eventId).then(function(response){
        vm.currentEvent = response.data.event;
      }, function(err){
        $location.path('#/login');
      });
    }

  }
  angular.module('sponzorme').controller('LandingController', LandingController);

})();

'use strict';
(function() {
SidenavController.$inject = ["$scope", "$mdSidenav", "$route"];
  function SidenavController($scope, $mdSidenav, $route) {
    //mock starts
    var route = $route.current.loadedTemplateUrl;

    var statesSponzors = {
        'dashboard': [
          'sponzors-main/main.html',
          'sponzors-outstanding/outstanding.html',
          'event.html'
        ],

        'sponzoring': [
          'sponzors-sponzoring/sponzorships.html',
          'sponzors-sponzoring/sponzorshipsId.html'
        ],

        'tasks': [
          'sponzors-tasks/tasks.html',
          'sponzors-tasks/taskId.html',
          'sponzors-tasks/tasks_create.html'
        ],

        'notifications': [
          'sponzors-notifications/notifications.html',
          'sponzors-notifications/detail.html',
          'sponzors-notifications/readed.html',
          'sponzors-notifications/importants.html'
        ],

        'settings': [
          'sponzors-settings/profile.html',
          'sponzors-settings/preferences.html',
          'sponzors-settings/ratings.html'
        ],

        'saved': [
          'sponzors-saved/saved.html'
        ]
    };

    var statesOrganizers = {
        'dashboard': [
          'organizers-main/main.html',
          'organizers-balance/balance.html',
          'organizers-sponzors/sponzors.html',
          'organizers-main/record.html'
        ],

        'sponzoring': [
          'organizers/dashboard/organizerships.html',
          'organizers/dashboard/organizershipsId.html'
        ],

        'following': [
          'organizers/dashboard/following.html'
        ],

        'news': [
          'organizers-news/news.html'
        ],

        'tasks': [
          'organizers-tasks/tasks.html',
          'organizers-tasks/tasks_create.html',
          'organizers-tasks/taskId.html'
        ],

        'notifications': [
          'organizers-notifications/detail.html',
          'organizers-notifications/importants.html',
          'organizers-notifications/notifications.html',
          'organizers-notifications/readed.html'
        ],

        'settings': [
          'organizers-settings/profile.html',
          'organizers-settings/preferences.html',
          'organizers-settings/rate.html'
        ]
    };

    $scope.dashboard = function(side){
      if (side === 'organizers') {
        for (var i = 0; i < statesOrganizers.dashboard.length; i++) {
          if (statesOrganizers.dashboard[i] === route) {
            return true
          }
        };
      } else if (side === 'sponzors') {
        for (var i = 0; i < statesSponzors.dashboard.length; i++) {
          if (statesSponzors.dashboard[i] === route) {
            return true
          }
        };
      }
    }

    $scope.sponzoring = function(side){
      if (side === 'organizers') {
        for (var i = 0; i < statesOrganizers.sponzoring.length; i++) {
          if (statesOrganizers.sponzoring[i] === route) {
            return true
          }
        };
      } else if (side === 'sponzors') {
        for (var i = 0; i < statesSponzors.sponzoring.length; i++) {
          if (statesSponzors.sponzoring[i] === route) {
            return true
          }
        };
      }
    }

    $scope.following = function(side){
      if (side === 'organizers') {
        for (var i = 0; i < statesOrganizers.following.length; i++) {
          if (statesOrganizers.following[i] === route) {
            return true
          }
        };
      } else if (side === 'sponzors') {
        for (var i = 0; i < statesSponzors.following.length; i++) {
          if (statesSponzors.following[i] === route) {
            return true
          }
        };
      }
    }

    $scope.news = function(side){
      if (side === 'organizers') {
        for (var i = 0; i < statesOrganizers.news.length; i++) {
          if (statesOrganizers.news[i] === route) {
            return true
          }
        };
      } else if (side === 'sponzors') {
        for (var i = 0; i < statesSponzors.news.length; i++) {
          if (statesSponzors.news[i] === route) {
            return true
          }
        };
      }
    }

    $scope.tasks = function(side){
      if (side === 'organizers') {
        for (var i = 0; i < statesOrganizers.tasks.length; i++) {
          if (statesOrganizers.tasks[i] === route) {
            return true
          }
        };
      } else if (side === 'sponzors') {
        for (var i = 0; i < statesSponzors.tasks.length; i++) {
          if (statesSponzors.tasks[i] === route) {
            return true
          }
        };
      }
    }

    $scope.notifications = function(side){
      if (side === 'organizers') {
        for (var i = 0; i < statesOrganizers.notifications.length; i++) {
          if (statesOrganizers.notifications[i] === route) {
            return true
          }
        };
      } else if (side === 'sponzors') {
        for (var i = 0; i < statesSponzors.notifications.length; i++) {
          if (statesSponzors.notifications[i] === route) {
            return true
          }
        };
      }
    }

    $scope.settings = function(side){
      if (side === 'organizers') {
        for (var i = 0; i < statesOrganizers.settings.length; i++) {
          if (statesOrganizers.settings[i] === route) {
            return true
          }
        };
      } else if (side === 'sponzors') {
        for (var i = 0; i < statesSponzors.settings.length; i++) {
          if (statesSponzors.settings[i] === route) {
            return true
          }
        };
      }
    }

    $scope.saved = function(side){
      if (side === 'organizers') {
        for (var i = 0; i < statesOrganizers.saved.length; i++) {
          if (statesOrganizers.saved[i] === route) {
            return true
          }
        };
      } else if (side === 'sponzors') {
        for (var i = 0; i < statesSponzors.saved.length; i++) {
          if (statesSponzors.saved[i] === route) {
            return true
          }
        };
      }
    }

    $scope.openMenu = function($mdOpenMenu, $event) {
      $scope.originatorEv = $event;
      $mdOpenMenu($event);
    };

    $scope.openSidenavLeft = function(){
      $mdSidenav('left').toggle();
    };

    $scope.isOpenLeft = function () {
      var isOpen = true;
      return isOpen = $mdSidenav('left').isOpen();
    };

}
  angular.module('sponzorme')
    .controller('SidenavController', SidenavController);

})();
