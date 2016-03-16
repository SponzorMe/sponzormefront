(function() {
  'use strict';
  angular.module('sponzorme').directive('settingsNav', settingsNav);
  function settingsNav() {
    var directive = {
      link: link,
      template: `<div class="menuItemContainer" layout="row">
          <div class="menuItem">
            <a href="#/organizers/settings/profile" md-ink-ripple translate ng-class="{'textActive': active == 'profile'}">preferences.profile</a>
            <div class="border"  ng-class="{'active': active == 'profile'}"></div>
          </div>
          <div class="menuItem">
            <a href="#/organizers/settings/preferences" md-ink-ripple translate ng-class="{'textActive': active == 'preferences'}">preferences.preferences</a>
            <div class="border"  ng-class="{'active': active == 'preferences'}"></div>
          </div>
          <div class="menuItem">
            <a href="#/organizers/settings/rate" md-ink-ripple translate  ng-class="{'textActive': active == 'rate'}">preferences.ratings</a>
            <div class="border"   ng-class="{'active': active == 'rate'}"></div>
          </div>
        </div>`,
      restrict: 'EA',
      replace: true
    };
    function link(scope, element, attrs) {
      scope.active = attrs.active;
    };
    return directive;
  }
})();
