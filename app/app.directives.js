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
