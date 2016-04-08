/**
 * @Servicio de Demo
 *
 * @author Sebastian
 * @version 0.1
 */
'use strict';
(function() {
    function demoRequest($http, $rootScope, $translate, DEMOSTEPS, userRequest, $localStorage) {
      return {
        showDemo: function(userId, type) {
          var intro = introJs();
          var generatedSteps = [];
          if (type === '1') {
            for (var i = 1; i < DEMOSTEPS+1; i++) {
              generatedSteps.push({
                element: '#step' + i,
                intro: $translate.instant('IntroSponzors.step' + i)
              });
            }
          } else {
            for (var j = 1; j < DEMOSTEPS+1; j++) {
              generatedSteps.push({
                element: '#step' + j,
                intro: $translate.instant('IntroOrganizers.step' + j)
              });
            }
          }
          intro.setOption('tooltipPosition', 'auto');
          intro.setOptions({
            steps: generatedSteps
          });
          intro.start();
          var user = {
            'demo': '1'
          };
          userRequest.editUserPatch(userId, user).success(function() {});
          $localStorage.demo = 1;
        }
    };
  }
  angular.module('sponzorme').factory('demoRequest', demoRequest);
})();
