(function() {
  'use strict';

  angular
    .module('sponzorMe')
    .config(config);

  /** @ngInject */
  function config($logProvider, toastrConfig) {
    // Enable log
    $logProvider.debugEnabled(true);

    // Set options third-party lib
    toastrConfig.allowHtml = true;
    toastrConfig.timeOut = 3000;
    toastrConfig.positionClass = 'toast-top-center';
    toastrConfig.preventDuplicates = true;
    toastrConfig.progressBar = false;
  }

})();
