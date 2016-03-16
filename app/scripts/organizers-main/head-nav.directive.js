(function() {
  angular.module('sponzorme').directive('headNav', headNav);

  function headNav() {
    var directive = {
      link: link,
      template: `<div class="menuItemContainer" layout="row">
        <div class="menuItem">
          <a href="#/organizers/dashboard" ng-class="{'textActive': active == 'dashboard'}" md-ink-ripple translate>organizersMain.events</a>
          <div class="border" ng-class="{'active': active == 'dashboard'}"></div>
        </div>
        <div class="menuItem">
          <a href="#/organizers/sponzors" ng-class="{'textActive': active == 'sponzors'}" md-ink-ripple translate>organizersMain.sponsors</a>
          <div class="border"  ng-class="{'active': active == 'sponzors'}"></div>
        </div>
        <div class="menuItem">
          <a href="#/organizers/balance" ng-class="{'textActive': active == 'balance'}"  md-ink-ripple translate>organizersMain.balance</a>
          <div class="border"  ng-class="{'active': active == 'balance'}"></div>
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
