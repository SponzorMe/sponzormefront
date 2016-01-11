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
