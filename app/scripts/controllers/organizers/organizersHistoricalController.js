'use strict';
(function() {
  function OrganizersHistoricalController($scope, $translate, userRequest, ngDialog, $location, $localStorage, eventRequest, perkRequest, $routeParams, $rootScope) {
   //mock starts

    $scope.filterClick = function(id) {
      $scope.filter.push(id);
    };

      $scope.filter = ['New York'];
      $scope.chips = ['Rock', 'Música', 'Conferencia', 'Tecnología', 'Emprendimiento', 'Bogotá'];

      $scope.events = [
        {
          'img':'../../../images/home-bkg.jpg',
          'imgDescript':'Concierto Tributo a Soda Stereo, Charly García y Fito Paez',
          'date':'Dom, Ene 10, 9:000',
          'eventDescript':'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugit iste perspiciatis, nulla quod. Inventore magni aspernatur, eaque molestias quam eligendi consequuntur asperiores suscipit architecto. Suscipit ab corporis eligendi assumenda voluptas.'
      },
        {
          'img':'../../../images/home-bkg.jpg',
          'imgDescript':'Concierto Tributo a Soda Stereo, Charly García y Fito Paez',
          'date':'Dom, Ene 10, 9:000',
          'eventDescript':'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugit iste perspiciatis, nulla quod. Inventore magni aspernatur, eaque molestias quam eligendi consequuntur asperiores suscipit architecto. Suscipit ab corporis eligendi assumenda voluptas.'
      },
        {
          'img':'../../../images/home-bkg.jpg',
          'imgDescript':'Concierto Tributo a Soda Stereo, Charly García y Fito Paez',
          'date':'Dom, Ene 10, 9:000',
          'eventDescript':'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugit iste perspiciatis, nulla quod. Inventore magni aspernatur, eaque molestias quam eligendi consequuntur asperiores suscipit architecto. Suscipit ab corporis eligendi assumenda voluptas.'
      },
      {
          'img':'../../../images/home-bkg.jpg',
          'imgDescript':'Concierto Tributo a Soda Stereo, Charly García y Fito Paez',
          'date':'Dom, Ene 10, 9:000',
          'eventDescript':'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugit iste perspiciatis, nulla quod. Inventore magni aspernatur, eaque molestias quam eligendi consequuntur asperiores suscipit architecto. Suscipit ab corporis eligendi assumenda voluptas.'
      },
        {
          'img':'../../../images/home-bkg.jpg',
          'imgDescript':'Concierto Tributo a Soda Stereo, Charly García y Fito Paez',
          'date':'Dom, Ene 10, 9:000',
          'eventDescript':'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugit iste perspiciatis, nulla quod. Inventore magni aspernatur, eaque molestias quam eligendi consequuntur asperiores suscipit architecto. Suscipit ab corporis eligendi assumenda voluptas.'
      },
        {
          'img':'../../../images/home-bkg.jpg',
          'imgDescript':'Concierto Tributo a Soda Stereo, Charly García y Fito Paez',
          'date':'Dom, Ene 10, 9:000',
          'eventDescript':'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugit iste perspiciatis, nulla quod. Inventore magni aspernatur, eaque molestias quam eligendi consequuntur asperiores suscipit architecto. Suscipit ab corporis eligendi assumenda voluptas.'
      },
          {
          'img':'../../../images/home-bkg.jpg',
          'imgDescript':'Concierto Tributo a Soda Stereo, Charly García y Fito Paez',
          'date':'Dom, Ene 10, 9:000',
          'eventDescript':'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugit iste perspiciatis, nulla quod. Inventore magni aspernatur, eaque molestias quam eligendi consequuntur asperiores suscipit architecto. Suscipit ab corporis eligendi assumenda voluptas.'
      },
        {
          'img':'../../../images/home-bkg.jpg',
          'imgDescript':'Concierto Tributo a Soda Stereo, Charly García y Fito Paez',
          'date':'Dom, Ene 10, 9:000',
          'eventDescript':'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugit iste perspiciatis, nulla quod. Inventore magni aspernatur, eaque molestias quam eligendi consequuntur asperiores suscipit architecto. Suscipit ab corporis eligendi assumenda voluptas.'
      },
        {
          'img':'../../../images/home-bkg.jpg',
          'imgDescript':'Concierto Tributo a Soda Stereo, Charly García y Fito Paez',
          'date':'Dom, Ene 10, 9:000',
          'eventDescript':'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugit iste perspiciatis, nulla quod. Inventore magni aspernatur, eaque molestias quam eligendi consequuntur asperiores suscipit architecto. Suscipit ab corporis eligendi assumenda voluptas.'
      },
      {
          'img':'../../../images/home-bkg.jpg',
          'imgDescript':'Concierto Tributo a Soda Stereo, Charly García y Fito Paez',
          'date':'Dom, Ene 10, 9:000',
          'eventDescript':'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugit iste perspiciatis, nulla quod. Inventore magni aspernatur, eaque molestias quam eligendi consequuntur asperiores suscipit architecto. Suscipit ab corporis eligendi assumenda voluptas.'
      },
        {
          'img':'../../../images/home-bkg.jpg',
          'imgDescript':'Concierto Tributo a Soda Stereo, Charly García y Fito Paez',
          'date':'Dom, Ene 10, 9:000',
          'eventDescript':'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugit iste perspiciatis, nulla quod. Inventore magni aspernatur, eaque molestias quam eligendi consequuntur asperiores suscipit architecto. Suscipit ab corporis eligendi assumenda voluptas.'
      },
        {
          'img':'../../../images/home-bkg.jpg',
          'imgDescript':'Concierto Tributo a Soda Stereo, Charly García y Fito Paez',
          'date':'Dom, Ene 10, 9:000',
          'eventDescript':'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugit iste perspiciatis, nulla quod. Inventore magni aspernatur, eaque molestias quam eligendi consequuntur asperiores suscipit architecto. Suscipit ab corporis eligendi assumenda voluptas.'
      }];
    //mock ends
  }
  angular.module('sponzorme').controller('OrganizersHistoricalController', OrganizersHistoricalController);
})();
