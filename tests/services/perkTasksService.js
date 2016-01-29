describe('Perk Tasks Service Unit Tests', function() {
  var perkTaskRequest;
  var $httpBackend;
  beforeEach(function() {
    module('sponzorme');
  });
  beforeEach(inject(function(_perkTaskRequest_, $injector) {
    perkTaskRequest = _perkTaskRequest_;
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
  it('Should be perkTaskRequest defined', function() {
    expect(perkTaskRequest).toBe.defined;
    $httpBackend.flush();
  });
  it('Should be createPerkTask success', function() {
    $httpBackend.whenPOST(apiUrl + 'perk_tasks').respond(200, {
      'success': true
    });
    var data = {};
    var returnedPromise = perkTaskRequest.createPerkTask(data);
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
  it('Should be createPerkTask failed', function() {
    $httpBackend.whenPOST(apiUrl + 'perk_tasks').respond(400, {
      'success': false
    });
    var data = {};
    var returnedPromise = perkTaskRequest.createPerkTask(data);
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
  it('Should be deletePerkTask success', function() {
    $httpBackend.whenDELETE(apiUrl + 'perk_tasks/' + perkId).respond(200, {
      'success': true
    });
    var returnedPromise = perkTaskRequest.deletePerkTask(perkId);
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
  it('Should be deletePerkTask failed', function() {
    $httpBackend.whenDELETE(apiUrl + 'perk_tasks/' + perkId).respond(400, {
      'success': false
    });
    var returnedPromise = perkTaskRequest.deletePerkTask(perkId);
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
