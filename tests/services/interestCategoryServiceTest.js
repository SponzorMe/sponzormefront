describe('Interest Category Service Unit Tests', function() {
  var allInterestsServiceRequest;
  var $httpBackend;
  beforeEach(function() {
    module('sponzorme');
  });
  beforeEach(inject(function(_allInterestsServiceRequest_, $injector) {
    allInterestsServiceRequest = _allInterestsServiceRequest_;
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
  it('Should be allInterestsServiceRequest defined', function() {
    expect(allInterestsServiceRequest).toBe.defined;
    $httpBackend.flush();
  });
  it('Should be allInterestsCategoriesId returned', function() {
    $httpBackend.when('GET', apiUrl + 'interests_category').respond(200, {
      'success': true
    });
    var returnedPromise = allInterestsServiceRequest.allInterestsCategoriesId();
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
  it('Should be allInterestsCategoriesId no returned', function() {
    $httpBackend.when('GET', apiUrl + 'interests_category').respond(400, {
      'success': false
    });
    var returnedPromise = allInterestsServiceRequest.allInterestsCategoriesId();
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
