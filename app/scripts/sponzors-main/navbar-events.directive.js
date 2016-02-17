/* recommended */
angular
    .module('sponzorme')
    .directive('navbarEvents', navbarEvents);

function navbarEvents() {
    var directive = {
        link: link,
        templateUrl: 'scripts/sponzors-main/navbar.html',
        restrict: 'EA'
    };
    return directive;

    function link(scope, element, attrs) {
        scope.active = attrs.active;
    }
}