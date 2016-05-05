(function() {
  'use strict';
  function rssRequest($http) {
    return {
      rss: function(lang) {
        var path = '//ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=10&callback=JSON_CALLBACK&q=' + 'http://blog' + lang + '.sponzor.me/feeds/posts/default';
        return $http.jsonp(path);
      }
    };
  }
  angular.module('sponzorme').factory('rssRequest', rssRequest);
  rssRequest.$inject = ['$http'];
})();
