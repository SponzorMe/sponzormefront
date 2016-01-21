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
