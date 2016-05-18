describe('Eventbrite Service Unit Tests', function() {
  var eventbriteRequest;
  var $httpBackend;
  beforeEach(function() {
    module('sponzorme');
  });
  beforeEach(inject(function(_eventbriteRequest_, $injector) {
    eventbriteRequest = _eventbriteRequest_;
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
  var code = "random-test-code-" + new Date().getTime();
  var token = "random-test-token-" + new Date().getTime();
  var url = "http://my-test-url.com";
  it('Should be eventbriteRequest defined', function() {
    expect(eventbriteRequest).toBe.defined;
    $httpBackend.flush();
  });
  it('Should be getEventbriteAuth success', function() {
    $httpBackend.whenGET(apiUrl + 'token/eventbrite/' + code).respond(200, {
      'success': true
    });
    var returnedPromise = eventbriteRequest.getEventbriteAuth(code);
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
  it('Should be getEventbriteAuth failed', function() {
    $httpBackend.whenGET(apiUrl + 'token/eventbrite/' + code).respond(400, {
      'success': false
    });
    var returnedPromise = eventbriteRequest.getEventbriteAuth(code);
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
  it('Should be getMeetupAuth success', function() {
    $httpBackend.whenGET(apiUrl + 'token/meetup/' + code).respond(200, {
      'success': true
    });
    var returnedPromise = eventbriteRequest.getMeetupAuth(code);
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
  it('Should be getMeetupAuth failed', function() {
    $httpBackend.whenGET(apiUrl + 'token/meetup/' + code).respond(400, {
      'success': false
    });
    var returnedPromise = eventbriteRequest.getMeetupAuth(code);
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
  it('Should be getEventbriteEvents success', function() {
    $httpBackend.whenGET('https://www.eventbriteapi.com/v3/users/me/owned_events/?token=' + token).respond(200, {
      'success': true
    });
    var returnedPromise = eventbriteRequest.getEventbriteEvents(token);
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
  it('Should be getEventbriteEvents failed', function() {
    $httpBackend.whenGET('https://www.eventbriteapi.com/v3/users/me/owned_events/?token=' + token).respond(400, {
      'success': false
    });
    var returnedPromise = eventbriteRequest.getEventbriteEvents(token);
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
  it('Should be getMeetupGroups success', function() {
    $httpBackend.whenGET(apiUrl + 'events/meetup/' + token).respond(200, {
      'success': true
    });
    var returnedPromise = eventbriteRequest.getMeetupGroups(token);
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
  it('Should be getMeetupGroups failed', function() {
    $httpBackend.whenGET(apiUrl + 'events/meetup/' + token).respond(400, {
      'success': false
    });
    var returnedPromise = eventbriteRequest.getMeetupGroups(token);
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
  it('Should be getEventbriteEvent success', function() {
    $httpBackend.whenGET(url + '?token=' + token).respond(200, {
      'success': true
    });
    var returnedPromise = eventbriteRequest.getEventbriteEvent(url, token);
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
  it('Should be getEventbriteEvent failed', function() {
    $httpBackend.whenGET(url + '?token=' + token).respond(400, {
      'success': false
    });
    var returnedPromise = eventbriteRequest.getEventbriteEvent(url, token);
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
