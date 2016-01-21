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
