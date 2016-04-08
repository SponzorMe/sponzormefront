/* recommended */
angular
    .module('sponzorme')
    .directive('navbarNotifications', navbarNotifications);

function navbarNotifications() {
    var directive = {
        link: link,
        controller: navbarController,
        templateUrl: 'sponzors-notifications/navbar.html',
        restrict: 'EA'
    };
    return directive;

    function link(scope, element, attrs) {
        scope.active = attrs.active;
    }
    
    function navbarController($scope){
      $scope.openMenu = function($mdOpenMenu, $event) {
        $scope.originatorEv = $event;
        $mdOpenMenu($event);
      };
    }
}