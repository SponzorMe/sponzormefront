describe("Resend Controller test", function(){
  var createController, httpBackend, scope, $location, $localStorage, $routeParams;
  beforeEach(module('sponzorme'));
  beforeEach(inject(function($rootScope, $httpBackend, $controller, _$location_, _$localStorage_, _$routeParams_){
    httpBackend = $httpBackend;
    $location = _$location_;
    $localStorage = _$localStorage_;
    $routeParams = _$routeParams_;
    scope =  $rootScope.$new();
    createController = function(){
      return $controller('ResendController',{
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
    httpBackend.when('POST', 'http://api.sponzor.me/send_activation')
    .respond(200, {
      "message": "Ok",
      "code": "200"
    });
    var controller = createController();
    scope.email = 'test@email.com';
    scope.resend();
    httpBackend.flush();
    expect(scope.error_log[0]).toEqual('ActivationLinkResent');
  });
  it("Should be send", function(){
    httpBackend.when('POST', 'http://api.sponzor.me/send_activation')
    .respond(400, {
      "message": "Ok",
      "code": "400"
    });
    var controller = createController();
    scope.email = 'test@email.com';
    scope.resend();
    httpBackend.flush();
    expect(scope.error_log[0]).toEqual('InvalidEmail');
  });
});
