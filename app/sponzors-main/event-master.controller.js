(function() {
  'use strict';
  function SponzorsEventMainController($scope, $localStorage, $rootScope, eventRequest, $location, dialogRequest, $mdDialog) {
    if ($rootScope.userValidation('1')) {
      var vm = this;
      vm.user = JSON.parse($localStorage.user);
      vm.saveEvent = function(eventId){
        var aux = vm.user.saved_events.filter(function(e){
          if(e.event.id === eventId){
            return e;
          }
        });
        if(aux.length){
          dialogRequest.showDialog('error', 'alreadySaved', false);
        }
        else{
          dialogRequest.showLoading();
          eventRequest.saveEvent(eventId, $localStorage.id).then(function(response){
            vm.user.saved_events.push(response.data.event);
            $localStorage.user = JSON.stringify(vm.user);
            dialogRequest.closeLoading();
            $location.path('/sponzors/saved');
          }, function(err){
            dialogRequest.closeLoading();
            dialogRequest.showDialog('error', 'invalidEvent', false);
          });
        }
      };
      vm.saveRemoveEvent = function(eventId, index){
        dialogRequest.showLoading();
        eventRequest.saveRemoveEvent(eventId).then(function(response){
          vm.user.saved_events.splice(index, 1);
          $localStorage.user = JSON.stringify(vm.user);
          dialogRequest.closeLoading();
          dialogRequest.showDialog('success', 'removeSuccessfully', '/sponzors/dashboard');

        }, function(err){
          dialogRequest.closeLoading();
          dialogRequest.showDialog('error', 'invalidEvent', false);
        });
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
    }
  }
  angular.module('sponzorme').controller('SponzorsEventMainController', SponzorsEventMainController);
  SponzorsEventMainController.$inject = ['$scope', '$localStorage', '$rootScope', 'eventRequest', '$location', 'dialogRequest', '$mdDialog'];
})();
