/* recommended */
angular
    .module('sponzorme')
    .directive('sponzorsNavbar', sponzorsNavbar);

function sponzorsNavbar() {
    var directive = {
        link: link,
        templateUrl: 'scripts/sponzors-navbar/navbar-icons.html',
        restrict: 'EA',
        replace: true
    };
    return directive;

    function link(scope, element, attrs) {
    }
}