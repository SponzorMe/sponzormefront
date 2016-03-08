(function(){
  angular.module('sponzorme').directive('responsiveNav', responsiveNav);

  function responsiveNav() {
      var directive = {
          link: link,
          templateUrl: 'scripts/organizers-main/responsive-nav.html',
          restrict: 'EA',
          replace: true
      };
      function link(scope, element, attrs) {};
      return directive;
  }
})();
