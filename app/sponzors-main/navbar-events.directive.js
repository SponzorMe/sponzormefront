/* recommended */
angular
  .module('sponzorme')
  .directive('navbarEvents', navbarEvents);

function navbarEvents() {
  var directive = {
    link: link,
    templateUrl: 'sponzors-main/navbar.html',
    restrict: 'EA'
  };
  return directive;

  function link(scope, element, attrs) {
    scope.active = attrs.active;
    scope.openSidenavLeft = function () {
      $mdSidenav('left').toggle();
    };

    scope.isOpenLeft = function () {
      var isOpen = true;
      return isOpen = $mdSidenav('left').isOpen();
    };

    scope.openMenu = function ($mdOpenMenu, $event) {
      scope.originatorEv = $event;
      $mdOpenMenu($event);
    };
  }
}
