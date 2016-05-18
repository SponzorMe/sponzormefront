(function() {
  angular.module('sponzorme').directive('organizersNavbar', organizersNavbar);

  function organizersNavbar() {
    var directive = {
      link: link,
      template: '<div class="buttons" layout="row" layout-align="start center">' +
        '<a ng-controller="NotificationController" href="#organizers/notifications">' +
        '  <md-icon aria-label="b" ng-if="!help">notifications</md-icon>' +
        '  <md-icon aria-label="b" class="color-fuchsia" ng-if="help">notifications_active</md-icon>' +
        '</a>' +
        '<a href="#/organizers/invite" class="md-icon-button">' +
        '  <md-icon aria-label="b">favorite</md-icon>' +
        '</a>' +
        '<a href="#/logout" class="md-icon-button">' +
        '  <md-icon aria-label="b">exit_to_app</md-icon>' +
        '</a>' +
        '</div>',
      restrict: 'EA',
      replace: true
    };
    function link(scope, element, attrs) {};
    return directive;
  }
})();
