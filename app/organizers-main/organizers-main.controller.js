(function() {
  'use strict';
  function OrganizersMainController($scope, $translate, $localStorage, $rootScope, $location, dialogRequest, eventRequest, $mdDialog) {

    if ($rootScope.userValidation('0')) {
      var vm = this;
      //mock
      vm.filterClick = function(id) {
        vm.filter.push(id);
      };
      vm.openSidenavLeft = function() {
        $mdSidenav('left').toggle();
      };

      vm.isOpenLeft = function() {
        var isOpen = true;
        return isOpen = $mdSidenav('left').isOpen();
      };

      vm.openMenu = function($mdOpenMenu, $event) {
        vm.originatorEv = $event;
        $mdOpenMenu($event);
      };

      vm.shareEvent = function(eventIndex){
        //something to do
      };

      vm.hasSponzorship = function(idEvent) {
        for (var i = 0; i < vm.user.sponzorships_like_organizer.length; i++) {
          if (vm.user.sponzorships_like_organizer[i].event.id === idEvent) {
            return true;
          }
        }
        return false;
      };

      vm.deleteEvent = function(eventId){
        dialogRequest.showLoading();
        if (vm.hasSponzorship(eventId)) {
          dialogRequest.closeLoading();
          dialogRequest.showDialog('error', 'eventDeletingEventHasSponzorship', false);
        } else {
          eventRequest.deleteEvent(eventId).then(function successCallback(response) {
            var aux = vm.user.events.filter(function(e){
              if(e.id!==eventId){
                return e;
              }
            });
            vm.user.events = [];
            vm.user.events = aux;
            $localStorage.user = JSON.stringify(vm.user);
            dialogRequest.closeLoading();
            dialogRequest.showDialog('success', 'eventDeleteSuccesfully',false);
          }, function errorCallback(err) {
            dialogRequest.closeLoading();
            dialogRequest.showDialog('error', 'errorDeletingEvent', false);
          });
        }
      };

      vm.toEdit = function(eventId){
        $location.path('/organizers/event/'+eventId);
      };
      
      vm.share = function(event){
      var parentEl = angular.element(document.body);
       $mdDialog.show({
         parent: parentEl,
         template:
           '<md-dialog aria-label="List dialog">' +
           '  <md-dialog-content>'+
           '  <h2 translate>eventPage.shareEvent</h2>'+
           '    <div layout="row" layout-align="center center">'+
           '      <a href="" socialshare socialshare-provider="facebook" socialshare-text="{{eventTitle}}" socialshare-url="{{url}}"><img width="100px" src="../../images/social/social-fb.svg"></a>'+
           '      <a href="" socialshare socialshare-provider="twitter" socialshare-text="{{eventTitle}}" socialshare-hashtags="SponzorMe" socialshare-url="{{url}}"><img width="100px" src="../../images/social/social-twttr.svg"></a>'+
           '      <a href="" socialshare socialshare-provider="google" socialshare-url="{{url}}"><img width="100px" src="../../images/social/social-g.svg"></a>'+
           '    </div>'+
           '  </md-dialog-content>' +
           '  <md-dialog-actions>' +
           '    <md-button ng-click="closeDialog()" class="md-primary">' +
           '      Close Dialog' +
           '    </md-button>' +
           '  </md-dialog-actions>' +
           '</md-dialog>',
         locals: {
           event: event
         },
         controller: DialogController
      });
      function DialogController($scope, $mdDialog, event, $rootScope) {
        $scope.url = $rootScope.getConstants().EVENTPAGESHARE + event.id;
        $scope.eventTitle = event.title;
        $scope.closeDialog = function() {
          $mdDialog.hide();
        }
      }
      DialogController.$inject = ['$scope', '$mdDialog', 'event', '$rootScope'];
    };

      vm.todayDate = new Date().getTime();
      vm.user = JSON.parse($localStorage.user);
      vm.user.balance = 0;
      angular.forEach(vm.user.sponzorships_like_organizer, function(value) {
        if (value.status === '1') {
          vm.user.balance = parseInt(vm.user.balance) + parseInt(value.perk.usd);
        }
      });
    }
  }
  angular.module('sponzorme').controller('OrganizersMainController', OrganizersMainController);
  OrganizersMainController.$inject=['$scope', '$translate', '$localStorage', '$rootScope', '$location', 'dialogRequest', 'eventRequest', '$mdDialog'];
})();
