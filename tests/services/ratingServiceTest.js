describe('Perk Tasks Service Unit Tests', function() {
  var ratingRequest;
  var $httpBackend;
  beforeEach(function() {
    module('sponzorme');
  });
  beforeEach(inject(function(_ratingRequest_, $injector) {
    ratingRequest = _ratingRequest_;
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
  var sponzorId = Math.floor((Math.random() * 100));
  var organizerId = Math.floor((Math.random() * 100));
  it('Should be ratingRequest defined', function() {
    expect(ratingRequest).toBe.defined;
    $httpBackend.flush();
  });
  it('Should be ratingsBySponzor success', function() {
    $httpBackend.whenGET(apiUrl + 'ratings/sponzor/'+sponzorId).respond(200, {
      'success': true
    });
    var returnedPromise = ratingRequest.ratingsBySponzor(sponzorId);
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
  it('Should be ratingsBySponzor failed', function() {
    $httpBackend.whenGET(apiUrl + 'ratings/sponzor/'+sponzorId).respond(400, {
      'success': false
    });
    var returnedPromise = ratingRequest.ratingsBySponzor(sponzorId);
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
  it('Should be ratingsByOrganizer success', function() {
    $httpBackend.whenGET(apiUrl + 'ratings/organizer/'+organizerId).respond(200, {
      'success': true
    });
    var returnedPromise = ratingRequest.ratingsByOrganizer(organizerId);
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
  it('Should be ratingsByOrganizer failed', function() {
    $httpBackend.whenGET(apiUrl + 'ratings/organizer/' + organizerId).respond(400, {
      'success': false
    });
    var returnedPromise = ratingRequest.ratingsByOrganizer(organizerId);
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

  it('Should be createRating success', function() {
    $httpBackend.whenPOST(apiUrl + 'ratings').respond(200, {
      'success': true
    });
    var data = {};
    var returnedPromise = ratingRequest.createRating(data);
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
  it('Should be createRating failed', function() {
    $httpBackend.whenPOST(apiUrl + 'ratings').respond(400, {
      'success': false
    });
    var data = {};
    var returnedPromise = ratingRequest.createRating(data);
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
