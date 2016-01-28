describe('Eventbrite Service Unit Tests', function() {
  var eventRequest;
  var $httpBackend;
  beforeEach(function() {
    module('sponzorme');
  });
  beforeEach(inject(function(_eventRequest_, $injector) {
    eventRequest = _eventRequest_;
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
  var eventId = Math.floor((Math.random() * 100));
  var token = 'my-test-token-'+ new Date().getTime();
  var data = {};
  it('Should be eventRequest defined', function() {
    expect(eventRequest).toBe.defined;
    $httpBackend.flush();
  });
  it('Should be allEvents success', function() {
    $httpBackend.whenGET(apiUrl + 'events').respond(200, {
      'success': true
    });
    var returnedPromise = eventRequest.allEvents();
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
  it('Should be allEvents failed', function() {
    $httpBackend.whenGET(apiUrl + 'events').respond(400, {
      'success': false
    });
    var returnedPromise = eventRequest.allEvents();
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
  it('Should be oneEvent success', function() {
    $httpBackend.whenGET(apiUrl + 'events/' + eventId).respond(200, {
      'success': true
    });
    var returnedPromise = eventRequest.oneEvent(eventId);
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
  it('Should be oneEvent failed', function() {
    $httpBackend.whenGET(apiUrl + 'events/' + eventId).respond(400, {
      'success': false
    });
    var returnedPromise = eventRequest.oneEvent(eventId);
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
  it('Should be createEvent success', function() {
    $httpBackend.whenPOST(apiUrl + 'events').respond(200, {
      'success': true
    });

    var returnedPromise = eventRequest.createEvent(data);
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
  it('Should be createEvent failed', function() {
    $httpBackend.whenPOST(apiUrl + 'events').respond(400, {
      'success': false
    });

    var returnedPromise = eventRequest.createEvent(data);
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
  it('Should be createEventToken success', function() {
    $httpBackend.whenPOST(apiUrl + 'events').respond(200, {
      'success': true
    });

    var returnedPromise = eventRequest.createEventToken(data, token);
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
  it('Should be createEventToken failed', function() {
    $httpBackend.whenPOST(apiUrl + 'events').respond(400, {
      'success': false
    });

    var returnedPromise = eventRequest.createEventToken(data, token);
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
  it('Should be deleteEvent success', function() {
    $httpBackend.whenDELETE(apiUrl + 'events/' + eventId).respond(200, {
      'success': true
    });
    var returnedPromise = eventRequest.deleteEvent(eventId);
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
  it('Should be deleteEvent failed', function() {
    $httpBackend.whenDELETE(apiUrl + 'events/' + eventId).respond(400, {
      'success': false
    });
    var returnedPromise = eventRequest.deleteEvent(eventId);
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
  it('Should be editEventPut success', function() {
    $httpBackend.whenPUT(apiUrl + 'events/' + eventId).respond(200, {
      'success': true
    });

    var returnedPromise = eventRequest.editEventPut(eventId);
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
  it('Should be editEventPut failed', function() {
    $httpBackend.whenPUT(apiUrl + 'events/' + eventId).respond(400, {
      'success': false
    });

    var returnedPromise = eventRequest.editEventPut(eventId);
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
