describe("Forgot Controller test", function(){
  var createController, httpBackend, scope, $location, $localStorage, $routeParams;
  beforeEach(module('sponzorme'));
  beforeEach(inject(function($rootScope, $httpBackend, $controller, _$location_, _$localStorage_, _$routeParams_){
    httpBackend = $httpBackend;
    $location = _$location_;
    $localStorage = _$localStorage_;
    $routeParams = _$routeParams_;
    scope =  $rootScope.$new();
    createController = function(){
      return $controller('ForgotController',{
        '$scope':scope
      })
    };
    httpBackend.whenGET('langs/lang-en.json').respond(200, {
      "title": 'Sponzorme EN'
    });
    httpBackend.whenGET('langs/lang-pt.json').respond(200, {
      "title": 'Sponzorme PT'
    });
    httpBackend.whenGET('langs/lang-es.json').respond(200, {
      "title": 'Sponzorme ES'
    });
    httpBackend.when('GET', 'views/templates/loadingDialog.html').respond(200, {
      "message": "LOADING"
    });
    httpBackend.when('GET', 'views/templates/errorDialog.html').respond(200, {
      "message": "ERROR"
    });
    httpBackend.when('GET', 'views/templates/successDialog.html').respond(200, {
      "message": "SUCCESS"
    });
    httpBackend.when('GET', 'views/templates/unactivatedAccountDialog.html').respond(200, {
      "message": "UNACTIVATED"
    });
    httpBackend.when('GET', 'templateId').respond(200, {
      "message": "Test"
    });
  }));
  afterEach(function(){
    httpBackend.verifyNoOutstandingExpectation();
    httpBackend.verifyNoOutstandingRequest();
  });
  it("Should be send", function(){
    httpBackend.when('POST', 'http://apistaging.sponzor.me/send_reset_password').respond(200, {
      "message": "Reset password Link sent",
      "resetLink": "http://app.sponzor.me/#/reset/30952b62d1ddf5987812c6af663213c5",
      "code": "200"
    });
    var controller = createController();
    scope.email = 'test@email.com';
    scope.forgotPassword();
    httpBackend.flush();
    expect(scope.error_log[0]).toEqual('PasswordResetLinkSent');
  });
  it("Should be unsend", function(){
    httpBackend.when('POST', 'http://apistaging.sponzor.me/send_reset_password')
      .respond(400, {
        "message": "Error",
        "code": "400"
    });
    var controller = createController();
    scope.email = 'test@email.com';
    scope.forgotPassword();
    httpBackend.flush();
    expect(scope.error_log[0]).toEqual('InvalidEmail');
  });
  it("Should be password reseted", function(){
    var token = 'MyTestToken';
    httpBackend.when('POST', 'http://apistaging.sponzor.me/update_password/'+token)
      .respond(200, {
        "message": "Password Reseted",
        "code": "200"
    });
    $routeParams.tokenReset = token;
    var controller = createController();
    scope.email = 'test@email.com';
    scope.password = 'test@email.com';
    scope.passwordConfirmation = 'test@email.com';
    scope.resetPassword();
    httpBackend.flush();
    expect(scope.error_log[0]).toEqual('PasswordChangedSuccesfully');
  });
  it("Should be passwords no match", function(){
    var controller = createController();
    scope.email = 'test@email.com';
    scope.password = 'test@email.com';
    scope.passwordConfirmation = '';
    scope.resetPassword();
    httpBackend.flush();
    expect(scope.error_log[0]).toEqual('PasswordNoMatch');
  });
  it("Should be invalid data", function(){
    var token = 'MyTestToken';
    httpBackend.when('POST', 'http://apistaging.sponzor.me/update_password/'+token)
      .respond(400, {
        "message": "Password Reseted",
        "code": "200"
    });
    $routeParams.tokenReset = token;
    var controller = createController();
    scope.email = 'test@email.com';
    scope.password = 'test@email.com';
    scope.passwordConfirmation = 'test@email.com';
    scope.resetPassword();
    httpBackend.flush();
    expect(scope.error_log[0]).toEqual('InvalidData');
  });
});
