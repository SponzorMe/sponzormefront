(function(){
  angular.module('sponzorme').directive('organizerEventBody', organizerEventBody);

  function organizerEventBody() {
      var directive = {
          link: link,
          templateUrl: 'organizers-main/event-body.html',
          restrict: 'EA',
          replace: true
      };
      function link(scope, element, attrs) {
      };
      return directive;
  }
})();
