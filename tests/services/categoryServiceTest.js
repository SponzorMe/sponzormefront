describe('Category Service Unit Tests', function() {
  var categoryRequest;
  var $httpBackend;
  beforeEach(function() {
    module('sponzorme');
  });
  beforeEach(inject(function(_categoryRequest_, $injector) {
    categoryRequest = _categoryRequest_;
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
  it('Should be categoryRequest defined', function() {
    expect(categoryRequest).toBe.defined;
    $httpBackend.flush();
  });
  it('Should be All Categories returned', function() {
    $httpBackend.when('GET', apiUrl + 'categories').respond(200, {
      'success': true
    });
    var returnedPromise = categoryRequest.allCategories();
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
  it('Should be All Categories no returned', function() {
    $httpBackend.when('GET', apiUrl + 'categories').respond(400, {
      'success': false
    });
    var returnedPromise = categoryRequest.allCategories();
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
