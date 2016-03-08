(function(){
  angular.module('sponzorme').directive('organizersNavbar', organizersNavbar);

  function organizersNavbar() {
      var directive = {
          link: link,
          templateUrl: 'scripts/organizers-navbar/navbar-icons.html',
          restrict: 'EA',
          replace: true
      };
      function link(scope, element, attrs) {};
      return directive;
  }
})();
