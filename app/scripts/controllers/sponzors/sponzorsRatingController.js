'use strict';
(function() {

  function SponzorsRatingController($scope, $translate, userRequest, ngDialog, $location, $rootScope, $localStorage, $routeParams, sponzorshipRequest, ratingRequest, $timeout) {
    if ($rootScope.userValidation('1') && $routeParams.sponzorshipId) {
      $scope.loadingForm = true; //Loading
      ngDialog.open({
        template: 'views/templates/loadingDialog.html',
        showClose: false
      }); //Loading box
      //First we validate this sponzorship does not have rating from this sponzor
      //
      //Then we get the sponzorship information
      sponzorshipRequest.oneSponzorship($routeParams.sponzorshipId).success(function(sData) {
        ratingRequest.ratingBySponzorship($routeParams.sponzorshipId, 1).success(function(s2Data) {
          $scope.loadingForm = false; //Loading
          ngDialog.closeAll(); //Close Loading
          if (s2Data.data.Rating[0] && s2Data.data.Rating[0].sponzor_id === $localStorage.id) {
            $scope.message = 'ratingAlreadyRated';
            ngDialog.open({
              template: 'views/templates/errorDialog.html',
              showClose: false,
              scope: $scope
            });
            $timeout(function() {
              $location.path('/sponzors/dashboard');
            }, 300);
          } else {
            $scope.sponzorship = sData.data;
            $scope.rating = {
              'sponzorship_id': sData.data.SponzorEvent.id,
              'type': 1,
              'sponzor_id': sData.data.Sponzor.id,
              'organizer_id': sData.data.Organizer.id
            };
          }
        });
      }).error(function(eData) {
        $scope.loadingForm = false; //Loading
        ngDialog.closeAll(); //Close Loading
        $scope.message = 'requestedSponzorshipNoExist';
        ngDialog.open({
          template: 'views/templates/errorDialog.html',
          showClose: false,
          scope: $scope
        });
      });
      $scope.saveRating = function() { //Finally we save the rating information
        ngDialog.open({
          template: 'views/templates/loadingDialog.html',
          showClose: false
        }); //Loading box
        console.log($scope.rating);
        ratingRequest.createRating($scope.rating).success(function(sData) {
          console.log(sData);
          $scope.message = 'ratingSponzorSuccess';
          ngDialog.closeAll(); //Close Loading
          ngDialog.open({
            template: 'views/templates/successDialog.html',
            showClose: false,
            scope: $scope
          });
          $scope.rating = {};
          $timeout(function() {
            $location.path('/sponzors/dashboard');
          }, 300);
        }).error(function(eData) {
          $scope.loadingForm = false; //Loading
          ngDialog.closeAll(); //Close Loading
          $scope.message = 'invalidRateInfo';
          ngDialog.open({
            template: 'views/templates/errorDialog.html',
            showClose: false,
            scope: $scope
          });
        });
      };
      $scope.tolsctive = 'active';
      $scope.toggleSidebar = function() {
        $scope.tolsctive = !$scope.tolsctive;
        if ($scope.tolsctive === true) {
          $scope.tolsctive = 'active';
        }
      };
      $scope.menuprincipal = 'views/sponzors/menu.html';
    }
  }

  angular.module('sponzorme')
    .controller('SponzorsRatingController', SponzorsRatingController);

})();
