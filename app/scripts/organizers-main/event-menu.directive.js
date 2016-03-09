(function(){
  angular.module('sponzorme').directive('organizerEventMenu', organizerEventMenu);

  function organizerEventMenu() {
      var directive = {
          link: link,
          templateUrl: 'scripts/organizers-main/event-menu.html',
          restrict: 'EA',
          replace: true
      };
      function link(scope, element, attrs) {
      };
      return directive;
  }
})();
