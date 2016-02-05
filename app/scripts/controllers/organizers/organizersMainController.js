'use strict';
(function() {
  function OrganizersMainController($scope, $translate, $localStorage, rssRequest, $rootScope, demoRequest, $timeout) {
    //mock starts

    $scope.filterClick = function(id) {
      $scope.filter.push(id);
    };
$scope.openSidenavLeft = function(){
         $mdSidenav('left').toggle();
    };

    $scope.isOpenLeft = function () {
      var isOpen = true;
      return isOpen = $mdSidenav('left').isOpen();
    };
    
    $scope.openMenu = function($mdOpenMenu, $event) {
      $scope.originatorEv = $event;
      $mdOpenMenu($event);
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

    if ($rootScope.userValidation('0')) {
      $scope.section = {
        route: 'Dashboard',
        title: 'Dashboard'
      };
      if ($localStorage.demo === '0') {
          $timeout(function() {
            demoRequest.showDemo($localStorage.id, $localStorage.typesponzorme);
          }, 1000);
      }
      $scope.loadingevents = false;
      $scope.loadingrss = true;
      $scope.user = JSON.parse($localStorage.user);
      $scope.user.balance = 0;
      angular.forEach($scope.user.sponzorships_like_organizer, function(value) {
        if (value.status === '1') {
          $scope.user.balance = parseInt($scope.user.balance) + parseInt(value.perk.usd);
        }
      });
      if ($scope.user.events) {
        $scope.currentEvent = $scope.user.events[0];
      }
      $scope.showPerk = function(e) {
        $scope.currentEvent = e;
      };
      $scope.rss = [];
      rssRequest.rss($rootScope.currentLanguage()).success(function(data) {
        $scope.rss = data.responseData.feed.entries;
        $scope.loadingrss = false;
      }).error(function() {
        $scope.loadingrss = false;
        $scope.noRssMessage = true;
      });
      $scope.menuprincipal = 'views/organizers/menu.html';
    }
  }
  angular.module('sponzorme').controller('OrganizersMainController', OrganizersMainController);

})();
