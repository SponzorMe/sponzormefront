/* recommended */
angular
    .module('sponzorme')
    .directive('organizersNotificationsNavbar', organizersNotificationsNavbar);

function organizersNotificationsNavbar() {
    var directive = {
        link: link,
        controller: organizersNotificationsNavbarController,
        templateUrl: 'scripts/organizers-notifications/navbar.html',
        restrict: 'EA',
        replace: true
    };
    return directive;

    function link(scope, element, attrs) {
        scope.active = attrs.active;
    }

    function organizersNotificationsNavbarController($scope){
      $scope.openMenu = function($mdOpenMenu, $event) {
        $scope.originatorEv = $event;
        $mdOpenMenu($event);
      };
    }
}
