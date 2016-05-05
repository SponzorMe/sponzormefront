(function() {
  'use strict';
  function OrganizersNewsController($scope, $localStorage, $rootScope, rssRequest) {
    if ($rootScope.userValidation('0')) {
      var vm = this;
      vm.rss = [];
      rssRequest.rss($rootScope.currentLanguage()).then(function(data) {
        vm.rss = data.data.responseData.feed.entries;
        vm.rss = vm.rss.filter(function(e){
          e.publishedDate = new Date(e.publishedDate).getTime();
          return e;
        });
        console.log(vm.rss);
        vm.loadingrss = false;
      });
    }
  }
  angular.module('sponzorme').controller('OrganizersNewsController', OrganizersNewsController);
  OrganizersNewsController('$scope', '$localStorage', '$rootScope', 'rssRequest'];
})();
