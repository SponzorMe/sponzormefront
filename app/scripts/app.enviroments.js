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
          'URL': 'http://local.api.com/',
          //'URL': 'https://apilocal.sponzor.me/',
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
