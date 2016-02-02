describe('Rss Service Unit Tests', function() {
  var rssRequest;
  var $httpBackend;
  beforeEach(function() {
    module('sponzorme');
  });
  beforeEach(inject(function(_rssRequest_, $injector) {
    rssRequest = _rssRequest_;
    $httpBackend = $injector.get('$httpBackend');
    $httpBackend.whenGET('langs/lang-en.json').respond(200, {
      'title': 'Sponzorme EN'
    });
    $httpBackend.whenGET('langs/lang-pt.json').respond(200, {
      'title': 'Sponzorme PT'
    });
    $httpBackend.whenGET('langs/lang-es.json').respond(200, {
      'title': 'Sponzorme ES'
    });
  }));
  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  var langs = ['en', 'es', 'pt'];
  var selectedLang = langs[Math.floor(Math.random()*langs.length)];
  var path = '//ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=10&callback=JSON_CALLBACK&q=' + 'http://blog' + selectedLang + '.sponzor.me/feeds/posts/default';
  it('Should be rssRequest defined', function() {
    expect(rssRequest).toBe.defined;
    $httpBackend.flush();
  });
  it('Should be Rss returned', function() {
    $httpBackend.when('JSONP', path).respond(200, {
      'success': true
    });
    var returnedPromise = rssRequest.rss(selectedLang);
    var successData, errorData;
    returnedPromise.then(function(response) {
      successData = response;
    }, function(err){
      errorData = err;
    });
    $httpBackend.flush();
    expect(successData.data.success).toBe(true);
    expect(errorData).not.toBeDefined;
  });
  it('Should be Rss no returned', function() {
    $httpBackend.when('JSONP', path).respond(400, {
      'success': false
    });
    var returnedPromise = rssRequest.rss(selectedLang);
    var successData, errorData;
    returnedPromise.then(function(response) {
      successData = response;
    }, function(err){
      errorData = err;
    });
    $httpBackend.flush();
    expect(errorData.data.success).toBe(false);
    expect(successData).not.toBeDefined;
  });
});
