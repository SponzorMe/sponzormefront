'use strict';
(function(){
function rdLoading() {
    var directive = {
        restrict: 'AE',
        template: '<div class="loading"><div class="double-bounce1"></div><div class="double-bounce2"></div></div>'
    };
    return directive;
};
angular
    .module('sponzorme')
    .directive('rdLoading', rdLoading);
})();