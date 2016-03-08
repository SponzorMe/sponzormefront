(function(){
  angular.module('sponzorme').directive('headNav', headNav);

  function headNav() {
      var directive = {
          link: link,
          templateUrl: 'scripts/organizers-main/head-nav.html',
          restrict: 'EA',
          replace: true
      };
      function link(scope, element, attrs) {
        scope.active = attrs.active;
      };
      return directive;
  }
})();
