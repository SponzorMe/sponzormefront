describe("rssService Tests", function() {

  beforeEach(function() {
    module('sponzorme');
  });

  var rssRequest;

  var httpBackend = null;

  beforeEach(inject(function(_rssRequest_) {
    rssRequest = _rssRequest_;
  }));
  //allCategories
  describe('Test', function() {

    var $httpBackend;

    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });
    it('All categories.', function() {
      var lang='en';
      inject(function($injector) {
        // Set up the mock http service responses
        $httpBackend = $injector.get('$httpBackend');
        $httpBackend.when('JSONP', '//ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=10&callback=JSON_CALLBACK&q=' + 'http://blog' + lang + '.sponzor.me/feeds/posts/default').respond(200, {
          responseData: Object, responseDetails: null, responseStatus: 200
        });
        $httpBackend.whenGET('langs/lang-en.json').respond(200, {
          "title": 'Sponzorme EN'
        });
        $httpBackend.whenGET('langs/lang-pt.json').respond(200, {
          "title": 'Sponzorme PT'
        });
        $httpBackend.whenGET('langs/lang-es.json').respond(200, {
          "title": 'Sponzorme ES'
        });
      })
      var returnData = {
        responseData: Object, responseDetails: null, responseStatus: 200
      };
      var returnedPromise = rssRequest.rss(lang);
      var result;
      returnedPromise.then(function(response) {
        result = response;
      });
      $httpBackend.flush();
      expect(result.data.responseStatus).toEqual(returnData.responseStatus);
    });
  });
});
