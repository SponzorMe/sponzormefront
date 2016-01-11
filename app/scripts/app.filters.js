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
