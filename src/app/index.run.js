(function() {
  'use strict';

  angular
    .module('sponzorMe')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();
