(function() {
  angular.module('sponzorme').directive('responsiveNav', responsiveNav);

  function responsiveNav() {
    var directive = {
      link: link,
      template: `<div class="menuXsContainer">
      <md-menu hide-gt-sm>
        <md-button class="md-fab" aria-label="b" ng-click="openMenu($mdOpenMenu, $event)">
          <md-icon>person</md-icon>
        </md-button>
        <md-menu-content class="menuXsItems" width="2" layout="column" layout-align="center start">
          <md-menu-item class="menuXsItem active">
            <a href="#/organizers/dashboard" md-ink-ripple translate>sponzorsMain.searchEvents</a>
          </md-menu-item>
          <md-menu-item class="menuXsItem">
            <a href="#/organizers/outstanding" md-ink-ripple translate>sponzorsMain.highlightEvents</a>
          </md-menu-item>
          <md-menu-item class="menuXsItem">
            <a href="#/organizers/notifications" md-ink-ripple translate>sponzorsMain.notifications</a>
          </md-menu-item>
        </md-menu-content>
      </md-menu>
    </div>`,
      restrict: 'EA',
      replace: true
    };
    function link(scope, element, attrs) { };
    return directive;
  }
})();
