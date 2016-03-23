/* recommended */
angular
    .module('sponzorme')
    .directive('eventItem', eventItem);

function eventItem() {
    var directive = {
        link: link,
        templateUrl: 'scripts/sponzors-main/event-item.html',
        restrict: 'EA'
    };
    return directive;

    function link(scope, element, attrs) {
      scope.active = attrs.active;
    }
}
