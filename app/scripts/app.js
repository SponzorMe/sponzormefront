'use strict';
var idiomaselect = 'en'; //Default Language
var apiPath = 'http://api.sponzor.me/'; //API path
var imgurPath = 'https://api.imgur.com/3/image'; //API path
(function () {
  console.log(idiomaselect);
  console.log(apiPath);
  console.log(imgurPath);
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
    'naif.base64',
    'imgurService',
    'angularUtils.directives.dirPagination',
    'ui.bootstrap.datetimepicker'
  ]).config( function($translateProvider) {
    $translateProvider.useStaticFilesLoader({
          prefix: 'langs/lang-',
          suffix: '.json'
        });

    $translateProvider.useSanitizeValueStrategy('escaped');

    $translateProvider.preferredLanguage("en");

    $translateProvider.fallbackLanguage("en");

    // End Languages
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
      controller: 'OrganizersCustomizationController'
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
      controller: 'OrganizersEventsController'
    })
    .when('/organizers/edit/event/:id', {
      templateUrl: 'views/organizers/dashboard/edit_event.html',
      controller: 'OrganizersEventEditController'
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
.run(function($rootScope, $translate, $location, allInterestsServiceRequest, $filter, $sessionStorage) {
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
  $rootScope.userValidation = function(shouldType) {
    if ($sessionStorage.cookiesponzorme && $sessionStorage.email && $sessionStorage.id > 0 && $sessionStorage.token && $sessionStorage.typesponzorme === shouldType){
      console.log("Authenticated");      
    } else {
      console.log("Not Authenticated");
      $location.path('/');   
    }
  };
})
/*
 * Author: Sebastian Gomez
 * This filters replace & by AND it is used for categories and interests translations
 */
.filter('normalize', function() {
  return function(input) {
    if(!input) {
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
    if(!input) {
      return '';
    }
    var auxDate = new Date(input);
    input = moment(auxDate).format("MMM DD YYYY, HH:mm");
    return input;
  };
});





})();
