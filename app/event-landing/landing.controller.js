
(function () {
  'use strict';
  function LandingController($scope, $mdDialog, $routeParams, $translate, $localStorage, $location, sponzorshipRequest, $rootScope, dialogRequest, $sce, firebaseRequest, event, $log) {
    var vm = this;
    vm.sponsoreable = false;
    
    if ($localStorage.id && $localStorage.type === '1' && $localStorage.user) {
      vm.isSponzor = true;
      vm.sponsoreable = true;
      //vm.currentEvent = event;
      console.log(event);
      vm.events = JSON.parse($localStorage.events);
      $log.info(vm.events, $routeParams.eventId);
      vm.events.filter(function (e) {
        if (e.id == $routeParams.eventId) {
          
        $log.info(e);
          vm.currentEvent = e;
          vm.currentEvent.perks = vm.currentEvent.perks.filter(function (a) {
            a.show = true;
            return a;
          });
        }
      });
      if(!vm.currentEvent){
        vm.currentEvent = event;
        vm.pastEvent = true;
      }
      vm.currentEvent.description = $sce.trustAsHtml(vm.currentEvent.description);
      
      vm.formCreateSponzorship = function (perk) {
        $scope.newSponzorship = { // Review why is not possible with vm instead of $scope
          'organizer_id': vm.currentEvent.user_organizer.id,
          'sponzor_id': $localStorage.id,
          'event_id': vm.currentEvent.id,
          'perk_id': perk.id,
          'cause': '',
          'status': 0
        };
        $mdDialog.show({
          templateUrl: 'sponzors-event/create-sponzorship.html',
          controller: 'SponzorsEventController',
          controllerAs: 'sec',
          scope: $scope,
          clickOutsideToClose: true
        });
      };
      vm.createSponzorship = function () {
        dialogRequest.closeLoading();
        dialogRequest.showLoading();
        vm.user = JSON.parse($localStorage.user);
        vm.user.sponzorships = vm.user.sponzorships.filter(function (e) {
          if (e.status === '0') {
            return e;
          }
        });
        sponzorshipRequest.createSponzorship($scope.newSponzorship).then(function successCallback(response) {
          vm.user.sponzorships.push(response.data.Sponzorship);
          $localStorage.user = JSON.stringify(vm.user);
          vm.firebaseNotification = {
            to: vm.currentEvent.user_organizer.id,
            text: $translate.instant('NOTIFICATIONS.NewSponzorshipRequestfor') + vm.currentEvent.title,
            link: '#/organizers/sponzors'
          };
          firebaseRequest.sendNotification(vm.firebaseNotification, vm.currentEvent.user_organizer.id);
          dialogRequest.closeLoading();
          dialogRequest.showDialog('success', 'sponzorshipCreatedSuccesfuly', false);
        }, function errorCallback(err) {
          dialogRequest.closeLoading();
          if (err.status === 409) {
            dialogRequest.showDialog('error', 'alreadySponzoring', false);
          } else {
            dialogRequest.showDialog('error', 'youCanNotSponzorThisEvent', false);
          }
        });
      };
    }
    else {
      if($localStorage.type === '0'){
        vm.isOrganizer = true;
      }
      
      vm.currentEvent = event;
      vm.currentEvent.perks = vm.currentEvent.perks.filter(function (a) {
        a.show = true;
        return a;
      });
    }
    
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

  }
  angular.module('sponzorme').controller('LandingController', LandingController);
  LandingController.$inject = ['$scope', '$mdDialog', '$routeParams', '$translate', '$localStorage', '$location', 'sponzorshipRequest', '$rootScope', 'dialogRequest', '$sce', 'firebaseRequest', 'event', '$log']

})();
