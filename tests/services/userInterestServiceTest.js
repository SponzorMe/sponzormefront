describe('UserInterest Service Unit Tests', function() {
  var userInterestRequest;
  var $httpBackend;
  beforeEach(function() {
    module('sponzorme');
  });
  beforeEach(inject(function(_userInterestRequest_, $injector) {
    userInterestRequest = _userInterestRequest_;
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
  var UserInterestId = Math.floor((Math.random() * 100));
  var token = 'my-test-token-'+ new Date().getTime();
  var data = {};
  it('Should be userInterestRequest defined', function() {
    expect(userInterestRequest).toBe.defined;
    $httpBackend.flush();
  });
  it('Should be createUserInterest success', function() {
    $httpBackend.whenPOST(apiUrl + 'user_interests').respond(200, {
      'success': true
    });
    var returnedPromise = userInterestRequest.createUserInterest(data);
    var successData, errorData;
    returnedPromise.then(function(response) {
      successData = response;
    }, function(err) {
      errorData = err;
    });
    $httpBackend.flush();
    expect(successData.data.success).toBe(true);
    expect(errorData).not.toBeDefined;
  });
  it('Should be createUserInterest failed', function() {
    $httpBackend.whenPOST(apiUrl + 'user_interests').respond(400, {
      'success': false
    });
    var returnedPromise = userInterestRequest.createUserInterest(data);
    var successData, errorData;
    returnedPromise.then(function(response) {
      successData = response;
    }, function(err) {
      errorData = err;
    });
    $httpBackend.flush();
    expect(errorData.data.success).toBe(false);
    expect(successData).not.toBeDefined;
  });
  it('Should be deleteUserInterest success', function() {
    $httpBackend.whenDELETE(apiUrl + 'user_interests/' + UserInterestId).respond(200, {
      'success': true
    });
    var returnedPromise = userInterestRequest.deleteUserInterest(UserInterestId);
    var successData, errorData;
    returnedPromise.then(function(response) {
      successData = response;
    }, function(err) {
      errorData = err;
    });
    $httpBackend.flush();
    expect(successData.data.success).toBe(true);
    expect(errorData).not.toBeDefined;

  });
  it('Should be deleteUserInterest failed', function() {
    $httpBackend.whenDELETE(apiUrl + 'user_interests/' + UserInterestId).respond(400, {
      'success': false
    });
    var returnedPromise = userInterestRequest.deleteUserInterest(UserInterestId);
    var successData, errorData;
    returnedPromise.then(function(response) {
      successData = response;
    }, function(err) {
      errorData = err;
    });
    $httpBackend.flush();
    expect(errorData.data.success).toBe(false);
    expect(successData).not.toBeDefined;
  });
  it('Should be bulkUserInterest success', function() {
    $httpBackend.whenPUT(apiUrl + 'user_interests/' + 1).respond(200, {
      'success': true
    });
    var returnedPromise = userInterestRequest.bulkUserInterest(data);
    var successData, errorData;
    returnedPromise.then(function(response) {
      successData = response;
    }, function(err) {
      errorData = err;
    });
    $httpBackend.flush();
    expect(successData.data.success).toBe(true);
    expect(errorData).not.toBeDefined;

  });
  it('Should be bulkUserInterest failed', function() {
    $httpBackend.whenPUT(apiUrl + 'user_interests/' + 1).respond(400, {
      'success': false
    });
    var returnedPromise = userInterestRequest.bulkUserInterest(data);
    var successData, errorData;
    returnedPromise.then(function(response) {
      successData = response;
    }, function(err) {
      errorData = err;
    });
    $httpBackend.flush();
    expect(errorData.data.success).toBe(false);
    expect(successData).not.toBeDefined;
  });
});
