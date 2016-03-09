(function(){
  angular.module('sponzorme').directive('organizerEventBody', organizerEventBody);

  function organizerEventBody() {
      var directive = {
          link: link,
          templateUrl: 'scripts/organizers-main/event-body.html',
          restrict: 'EA',
          replace: true
      };
      function link(scope, element, attrs) {
      };
      return directive;
  }
})();
