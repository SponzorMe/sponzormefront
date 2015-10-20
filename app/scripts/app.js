'use strict';
(function () {
var idiomaselect = "en";
angular.module('sponzorme', ['pascalprecht.translate', 'ngResource', 'ngRoute', 'userService',
    'loginService', 'ngDialog', 'base64', 'ngCookies', 'ngStorage', 'ui.bootstrap', 'eventTypeService',
    'categoryService', 'google.places', 'eventService', 'rssService',
    'perkService', 'taskSponzorService', 'perkTaskService',
    'sponzorshipService', 'angularSpinner', 'allInterestsService', 'userInterestService', "naif.base64", 'imgurService', 'angularUtils.directives.dirPagination'
  ])
  .config(function($translateProvider) {
    $translateProvider.translations('es', translationsES);
    $translateProvider.translations('en', translationsEN);
    $translateProvider.translations('pt', translatiosnPT);
    $translateProvider.preferredLanguage('en');
    $translateProvider.useSanitizeValueStrategy(null);
  })

.config(['usSpinnerConfigProvider', function(usSpinnerConfigProvider) {
  usSpinnerConfigProvider.setDefaults({
    color: '#042333'
  });
}])

.config(function($routeProvider) {
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
      templateUrl: 'views/users/login.html',
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
    .when('/sponsors/create', {
      templateUrl: 'views/sponsors/create.html',
      controller: 'SponzorsCreateController'
    })
    .when('/users/create', {
      templateUrl: 'views/users/create.html',
      controller: 'UsersCreateController'
    })
    .when('/logout', {
      templateUrl: 'views/main.html',
      controller: 'logoutController'
    })
    .when('/users/dashboard', {
      templateUrl: 'views/users/dashboard/main.html',
      controller: 'UsersPrincipalController'
    })
    .when('/users/events', {
      templateUrl: 'views/users/dashboard/events.html',
      controller: 'UsersEventsController'
    })
    .when('/users/sponzors', {
      templateUrl: 'views/users/dashboard/sponzors.html',
      controller: 'UsersSponzorsController'
    })
    .when('/customization', {
      templateUrl: 'views/customization/customization.html',
      controller: 'UsersCustomController'
    })
    .when('/users/friend', {
      templateUrl: 'views/users/dashboard/friend.html',
      controller: 'UsersFriendController'
    })
    .when('/users/settings', {
      templateUrl: 'views/users/dashboard/settings.html',
      controller: 'UsersSettingsController'
    })
    .when('/sponsors/dashboard', {
      templateUrl: 'views/sponsors/dashboard/main.html',
      controller: 'SponsorsMainController'
    })
    .when('/sponsors/settings', {
      templateUrl: 'views/sponsors/dashboard/settings.html',
      controller: 'SponsorsSettingsController'
    })
    .when('/sponsors/friend', {
      templateUrl: 'views/sponsors/dashboard/friend.html',
      controller: 'SponsorsFriendController'
    })
    .when('/sponsors/following', {
      templateUrl: 'views/sponsors/dashboard/events.html',
      controller: 'SponsorsFollowingController'
    })
    .when('/sponsors/sponzoring', {
      templateUrl: 'views/sponsors/dashboard/sponzors.html',
      controller: 'SponsorsSponzorsController'
    })
    .when('/event/:eventId', {
      templateUrl: 'views/event.html',
      controller: 'EventPageController'
    })
    .when('/add/event', {
      templateUrl: 'views/users/dashboard/add_event.html',
      controller: 'UsersEventsController'
    })
    .otherwise({
      redirectTo: '/'
    });
})
/*
 * Author: Sebastian Gomez
 * This function allows change the language whatever be the route
 * for this reason this is a global function
 */
.run(function($rootScope, $translate, $location, allInterestsServiceRequest, $filter) {
  $rootScope.changeLanguage = function(key) {
    $translate.use(key);
    idiomaselect = key;
  };
  $rootScope.buildInterests = function() {
    allInterestsServiceRequest.allInterestsCategoriesId().success(function(adata) {
      var interests = adata.InterestCategory;
      var log = [];
      var a = "";
      angular.forEach(interests, function(value, key) {
        a = a + "</br>" + ($filter('normalize')(value.name) + ":'" + value.name + "',");
      }, log);
      document.write(a);
    });
  };
})
/*
 * Author: Sebastian Gomez
 * This filters replace & by AND it is used for categories and interests translations
 */
.filter('normalize', function() {
  return function(input) {
    if(!input) {
      return "";
    }
    input = input
      .replace('&', 'AND')
      .replace(/\W+/g, "");
    return input;
  };
});





})();
