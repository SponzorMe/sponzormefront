describe('Sponzorship Service Unit Tests', function() {
  var sponzorshipRequest;
  var $httpBackend;
  beforeEach(function() {
    module('sponzorme');
  });
  beforeEach(inject(function(_sponzorshipRequest_, $injector) {
    sponzorshipRequest = _sponzorshipRequest_;
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
  var sponzorshipId = Math.floor((Math.random() * 100));
  var token = 'my-test-token-'+ new Date().getTime();
  var data = {};
  it('Should be sponzorshipRequest defined', function() {
    expect(sponzorshipRequest).toBe.defined;
    $httpBackend.flush();
  });
  it('Should be oneSponzorship success', function() {
    $httpBackend.whenGET(apiUrl + 'sponzorships/' + sponzorshipId).respond(200, {
      'success': true
    });
    var returnedPromise = sponzorshipRequest.oneSponzorship(sponzorshipId);
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
  it('Should be oneSponzorship failed', function() {
    $httpBackend.whenGET(apiUrl + 'sponzorships/' + sponzorshipId).respond(400, {
      'success': false
    });
    var returnedPromise = sponzorshipRequest.oneSponzorship(sponzorshipId);
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
  it('Should be createSponzorship success', function() {
    $httpBackend.whenPOST(apiUrl + 'sponzorships').respond(200, {
      'success': true
    });

    var returnedPromise = sponzorshipRequest.createSponzorship(data);
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
  it('Should be createSponzorship failed', function() {
    $httpBackend.whenPOST(apiUrl + 'sponzorships').respond(400, {
      'success': false
    });

    var returnedPromise = sponzorshipRequest.createSponzorship(data);
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
  it('Should be createSponzorshipToken success', function() {
    $httpBackend.whenPOST(apiUrl + 'sponzorships').respond(200, {
      'success': true
    });

    var returnedPromise = sponzorshipRequest.createSponzorshipToken(data, token);
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
  it('Should be createSponzorshipToken failed', function() {
    $httpBackend.whenPOST(apiUrl + 'sponzorships').respond(400, {
      'success': false
    });

    var returnedPromise = sponzorshipRequest.createSponzorshipToken(data, token);
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
  it('Should be deleteSponzorship success', function() {
    $httpBackend.whenDELETE(apiUrl + 'sponzorships/' + sponzorshipId).respond(200, {
      'success': true
    });
    var returnedPromise = sponzorshipRequest.deleteSponzorship(sponzorshipId);
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
  it('Should be deleteSponzorship failed', function() {
    $httpBackend.whenDELETE(apiUrl + 'sponzorships/' + sponzorshipId).respond(400, {
      'success': false
    });
    var returnedPromise = sponzorshipRequest.deleteSponzorship(sponzorshipId);
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
  it('Should be editSponzorshipPatch success', function() {
    $httpBackend.whenPATCH(apiUrl + 'sponzorships/' + sponzorshipId).respond(200, {
      'success': true
    });
    var returnedPromise = sponzorshipRequest.editSponzorshipPatch(sponzorshipId);
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
  it('Should be editSponzorshipPatch failed', function() {
    $httpBackend.whenPATCH(apiUrl + 'sponzorships/' + sponzorshipId).respond(400, {
      'success': false
    });
    var returnedPromise = sponzorshipRequest.editSponzorshipPatch(sponzorshipId);
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
