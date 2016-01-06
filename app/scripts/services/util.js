/**
 * @Servicio de retorn de rss de los diferentes blogs
 *
 * @author Sebastian
 * @version 0.1
 */
'use strict';
(function() {
  function Util(ngDialog, $rootScope) {
    var Utils = {
      showDialog: function(kind, message, redirectOnClose) {
        $rootScope.pseudoScope = {'message': message, 'redirectOnClose': redirectOnClose};
        var selectedTemplate;
        if(kind === 'error'){
          selectedTemplate = 'views/templates/errorDialog.html';
        }
        else if(kind === 'success'){
          selectedTemplate = 'views/templates/successDialog.html';
        }
        else{
          selectedTemplate = 'views/templates/infoDialog.html';
        }
        if(redirectOnClose){
          $rootScope.pseudoScope.message = message;
          $rootScope.pseudoScope.redirectOnClose = redirectOnClose;
          ngDialog.open({
            template: selectedTemplate,
            showClose: false,
            closeByEscape: false,
            closeByDocument: false,
            controller: 'DialogController',
            scope: $rootScope
          });
        }
        else{
          $rootScope.pseudoScope.message = message;
          ngDialog.open({
            template: selectedTemplate,
            showClose: false,
            closeByEscape: false,
            closeByDocument: false,
            controller: 'DialogController',
            scope: $rootScope
          });
        }
      },
      showLoading: function(){
        ngDialog.open({
          template: 'views/templates/loadingDialog.html',
          showClose: false,
          closeByEscape: false,
          closeByDocument: false
        });
      }
    };
    return Utils;
  }
  angular.module('sponzorme')
    .factory('Util', Util);
})();
