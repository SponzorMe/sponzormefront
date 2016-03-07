/* recommended */
angular.module('sponzorme').directive('eventMenu', eventMenu);

function eventMenu() {
    var directive = {
        link: link,
        templateUrl: 'scripts/sponzors-main/event-menu.html',
        restrict: 'EA'
    };
    return directive;

    function link(scope, element, attrs) {
      scope.active = attrs.active;
      if(scope.active==='save'){
        scope.inSave = true;
      }
      scope.openMenu = function ($mdOpenMenu, $event) {
        scope.originatorEv = $event;
        $mdOpenMenu($event);
      };
    }
}
