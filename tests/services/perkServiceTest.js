describe('Perk Service Unit Tests', function() {
  var perkRequest;
  var $httpBackend;
  beforeEach(function() {
    module('sponzorme');
  });
  beforeEach(inject(function(_perkRequest_, $injector) {
    perkRequest = _perkRequest_;
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
  var perkId = Math.floor((Math.random() * 100));
  it('Should be perkRequest defined', function() {
    expect(perkRequest).toBe.defined;
    $httpBackend.flush();
  });
  it('Should be createPerk success', function() {
    $httpBackend.whenPOST(apiUrl + 'perks').respond(200, {
      'success': true
    });
    var data = {};
    var returnedPromise = perkRequest.createPerk(data);
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
  it('Should be createPerk failed', function() {
    $httpBackend.whenPOST(apiUrl + 'perks').respond(400, {
      'success': false
    });
    var data = {};
    var returnedPromise = perkRequest.createPerk(data);
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
  it('Should be deletePerk success', function() {
    $httpBackend.whenDELETE(apiUrl + 'perks/' + perkId).respond(200, {
      'success': true
    });
    var returnedPromise = perkRequest.deletePerk(perkId);
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
  it('Should be deletePerk failed', function() {
    $httpBackend.whenDELETE(apiUrl + 'perks/' + perkId).respond(400, {
      'success': false
    });
    var returnedPromise = perkRequest.deletePerk(perkId);
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
