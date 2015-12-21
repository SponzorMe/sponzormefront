'use strict';
(function() {

  function OrganizersRatingController($scope, $translate, userRequest, ngDialog, $location, $rootScope, $localStorage, $routeParams, sponzorshipRequest) {
    if($rootScope.userValidation('0'), $routeParams.sponzorshipId){
      $scope.loadingForm = true;//Loading
      ngDialog.open({
        template: 'views/templates/loadingDialog.html',
        showClose: false
      }); //Loading box
      //First we validate this sponzorship does not have rating from this sponzor
      //
      //Then we get the sponzorship information
      sponzorshipRequest.oneSponzorship($routeParams.sponzorshipId).success(function(sData){
        $scope.loadingForm = false;//Loading
        ngDialog.closeAll(); //Close Loading
        $scope.sponzorship = sData.data;
        $scope.rating = {'sponzorship_id':sData.data.SponzorEvent.id, 'type':0, 'sponzor_id':sData.data.Sponzor.id, 'organizer_id':sData.data.Organizer.id};
      }).error(function(eData){
        $scope.loadingForm = false;//Loading
        ngDialog.closeAll(); //Close Loading
        $scope.message = 'requestedSponzorshipNoExist';
        ngDialog.open({
          template: 'views/templates/errorDialog.html',
          showClose: false,
          scope: $scope
        });
      });
      $scope.saveRating = function(){//Finally we save the rating information
        console.log($scope.rating);
      };
      $scope.tolsctive = 'active';
      $scope.toggleSidebar = function() {
        $scope.tolsctive = !$scope.tolsctive;
        if ($scope.tolsctive === true) {
          $scope.tolsctive = 'active';
        }
      };
      $scope.menuprincipal = 'views/organizers/menu.html';
    }
  }

  angular.module('sponzorme')
    .controller('OrganizersRatingController', OrganizersRatingController);

})();
