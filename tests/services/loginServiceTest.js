describe('Login Service Unit Tests', function() {
  var loginRequest;
  var $httpBackend;
  beforeEach(function() {
    module('sponzorme');
  });
  beforeEach(inject(function(_loginRequest_, $injector) {
    loginRequest = _loginRequest_;
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
  var credentials = {email: token+'@'+token+'.com', password: code};
  var data = {};
  it('Should be loginRequest defined', function() {
    expect(loginRequest).toBe.defined;
    $httpBackend.flush();
  });
  it('Should be login success', function() {
    $httpBackend.whenPOST(apiUrl + 'auth').respond(200, {
      'success': true
    });
    var returnedPromise = loginRequest.login(credentials);
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
  it('Should be login failed', function() {
    $httpBackend.whenPOST(apiUrl + 'auth').respond(400, {
      'success': false
    });
    var returnedPromise = loginRequest.login(credentials);
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
  it('Should be resetPassword success', function() {
    $httpBackend.whenPOST(apiUrl + 'send_reset_password').respond(200, {
      'success': true
    });
    var returnedPromise = loginRequest.resetPassword(data);
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
  it('Should be resetPassword failed', function() {
    $httpBackend.whenPOST(apiUrl + 'send_reset_password').respond(400, {
      'success': false
    });
    var returnedPromise = loginRequest.resetPassword(data);
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
  it('Should be tryActivation success', function() {
    $httpBackend.whenGET(apiUrl+'verify_activation/' + token).respond(200, {
      'success': true
    });
    var returnedPromise = loginRequest.tryActivation(token);
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
  it('Should be tryActivation failed', function() {
    $httpBackend.whenGET(apiUrl+'verify_activation/' + token).respond(400, {
      'success': false
    });
    var returnedPromise = loginRequest.tryActivation(token);
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
  it('Should be resendActivation success', function() {
    $httpBackend.whenPOST(apiUrl + 'send_activation').respond(200, {
      'success': true
    });
    var returnedPromise = loginRequest.resendActivation(data);
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
  it('Should be resendActivation failed', function() {
    $httpBackend.whenPOST(apiUrl + 'send_activation').respond(400, {
      'success': false
    });
    var returnedPromise = loginRequest.resendActivation(data);
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
  it('Should be updatePassword success', function() {
    $httpBackend.whenPOST(apiUrl + 'update_password/' + token).respond(200, {
      'success': true
    });
    var returnedPromise = loginRequest.updatePassword(token, data);
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
  it('Should be updatePassword failed', function() {
    $httpBackend.whenPOST(apiUrl + 'update_password/' + token).respond(400, {
      'success': false
    });
    var returnedPromise = loginRequest.updatePassword(token, data);
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
  it('Should be changePassword success', function() {
    $httpBackend.whenPOST(apiUrl + 'change_password').respond(200, {
      'success': true
    });
    var returnedPromise = loginRequest.changePassword(data, token);
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
  it('Should be changePassword failed', function() {
    $httpBackend.whenPOST(apiUrl + 'change_password').respond(400, {
      'success': false
    });
    var returnedPromise = loginRequest.changePassword(data, token);
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
