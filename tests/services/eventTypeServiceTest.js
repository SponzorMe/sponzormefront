describe('Event Type Service Unit Tests', function() {
  var eventTypeRequest;
  var $httpBackend;
  beforeEach(function() {
    module('sponzorme');
  });
  beforeEach(inject(function(_eventTypeRequest_, $injector) {
    eventTypeRequest = _eventTypeRequest_;
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
  it('Should be eventTypeRequest defined', function() {
    expect(eventTypeRequest).toBe.defined;
    $httpBackend.flush();
  });
  it('Should be allEventTypes returned', function() {
    $httpBackend.when('GET', apiUrl + 'event_types').respond(200, {
      'success': true
    });
    var returnedPromise = eventTypeRequest.allEventTypes();
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
    $httpBackend.when('GET', apiUrl + 'event_types').respond(400, {
      'success': false
    });
    var returnedPromise = eventTypeRequest.allEventTypes();
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
