'use strict';
(function() {
  /*This controller has two responsabilities
   First show all Events
   Second allows make a filter based on the interests*/
  function SponzorsMainController($scope, $localStorage, $rootScope) {
    // if ($rootScope.userValidation('1')) {
    //   $scope.filter = [];//Filter to starge the words
    //   $scope.events = [];//Array to storage the events
    //   $scope.user = JSON.parse($localStorage.user);//Parse User Information
    //   var events;//Var to store the events in this controller temporaly

    //   /*This function select events that match with filter*/
    //   $scope.filterEvents = function(){
    //     $scope.events = [];
    //     $scope.events = events.filter(function(e){
    //       for(var j = 0; j < $scope.filter.length; j++){
    //         if(
    //           e.title.indexOf($scope.filter[j])>-1 ||
    //           e.description.indexOf($scope.filter[j])> -1
    //         ){
    //           return e;
    //         }
    //       }
    //     });
    //   };

    //   This function add to the filter the interest clicked on view
    //   $scope.filterClick = function(interest) {
    //     $scope.filter.push(interest);
    //     $scope.filterEvents();
    //   };

    //   /*This function is called when an item on filter is removed*/
    //   $scope.filterRemove = function(){
    //     if($scope.filter.length){
    //       $scope.filterEvents();
    //     }
    //     else{
    //       $scope.restoreEvents();
    //     }
    //   };

    //   /*This function generate the events from the localStorage*/
    //   $scope.restoreEvents = function(){
    //     $scope.events = [];
    //     if ($localStorage.events) {//If events, Should ever exist events?
    //       events = JSON.parse($localStorage.events);
    //       $scope.events = JSON.parse($localStorage.events);
    //     }
    //   };

    //   $scope.restoreEvents();//Here starts the callback
    // }
  }
  angular.module('sponzorme').controller('SponzorsMainController', SponzorsMainController);
})();
