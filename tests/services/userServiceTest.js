describe('User Service Unit Tests', function() {
  var userRequest;
  var $httpBackend;
  beforeEach(function() {
    module('sponzorme');
  });
  beforeEach(inject(function(_userRequest_, $injector) {
    userRequest = _userRequest_;
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
  var userId = Math.floor((Math.random() * 100));
  var token = 'my-test-token-'+ new Date().getTime();
  var data = {};
  it('Should be userRequest defined', function() {
    expect(userRequest).toBe.defined;
    $httpBackend.flush();
  });
  it('Should be home success', function() {
    $httpBackend.whenGET(apiUrl + 'home/'+userId).respond(200, {
      'success': true
    });
    var returnedPromise = userRequest.home(userId);
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
  it('Should be home failed', function() {
    $httpBackend.whenGET(apiUrl + 'home/'+userId).respond(400, {
      'success': false
    });
    var returnedPromise = userRequest.home(userId);
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
  it('Should be oneUser success', function() {
    $httpBackend.whenGET(apiUrl + 'users/' + userId).respond(200, {
      'success': true
    });
    var returnedPromise = userRequest.oneUser(userId);
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
  it('Should be oneUser failed', function() {
    $httpBackend.whenGET(apiUrl + 'users/' + userId).respond(400, {
      'success': false
    });
    var returnedPromise = userRequest.oneUser(userId);
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
  it('Should be createUser success', function() {
    $httpBackend.whenPOST(apiUrl + 'users').respond(200, {
      'success': true
    });

    var returnedPromise = userRequest.createUser(data);
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
  it('Should be createUser failed', function() {
    $httpBackend.whenPOST(apiUrl + 'users').respond(400, {
      'success': false
    });

    var returnedPromise = userRequest.createUser(data);
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
  it('Should be invitedUser success', function() {
    $httpBackend.whenPOST(apiUrl + 'invite_friend/').respond(200, {
      'success': true
    });

    var returnedPromise = userRequest.invitedUser(data);
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
  it('Should be invitedUser failed', function() {
    $httpBackend.whenPOST(apiUrl + 'invite_friend/').respond(400, {
      'success': false
    });

    var returnedPromise = userRequest.invitedUser(data);
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
  it('Should be editUserPatch success', function() {
    $httpBackend.whenPATCH(apiUrl + 'users/' + userId).respond(200, {
      'success': true
    });

    var returnedPromise = userRequest.editUserPatch(userId);
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
  it('Should be editUserPatch failed', function() {
    $httpBackend.whenPATCH(apiUrl + 'users/' + userId).respond(400, {
      'success': false
    });

    var returnedPromise = userRequest.editUserPatch(userId);
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
