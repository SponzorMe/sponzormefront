/* recommended */
angular
    .module('sponzorme')
    .directive('navbarSettings', navbarSettings);

function navbarSettings() {
    var directive = {
        link: link,
        templateUrl: 'scripts/sponzors-settings/navbar.html',
        restrict: 'EA'
    };
    return directive;

    function link(scope, element, attrs) {
        scope.active = attrs.active;
    }
}