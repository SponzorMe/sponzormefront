(function() {
  'use strict';
  function eventTypeService($http, $rootScope) {
    return {
      allEventTypes: function() {
        return $http.get($rootScope.getConstants().URL + 'event_types');
      }
    };
  }
  angular.module('sponzorme').factory('eventTypeRequest', eventTypeService);
  eventTypeService.$inject = ['$http', '$rootScope'];
})();
