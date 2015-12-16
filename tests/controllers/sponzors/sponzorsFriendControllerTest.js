describe("Organizers Create Controller test", function(){
  var createController, httpBackend, scope, $location, $localStorage, $routeParams;
  beforeEach(module('sponzorme'));
  beforeEach(inject(function($rootScope, $httpBackend, $controller, _$location_, _$localStorage_, _$routeParams_){
    httpBackend = $httpBackend;
    $location = _$location_;
    $localStorage = _$localStorage_;
    $routeParams = _$routeParams_;
    scope =  $rootScope.$new();
    createController = function(){
      return $controller('SponzorsFriendController',{
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
  it("Should be email setted", function(){
    $localStorage.email = 'test@test.com';
    var controller = createController();
    httpBackend.flush();
    expect(scope.emailuser).toEqual('test@test.com');
  });
  it("Should be email sent", function(){
    httpBackend.when('POST', 'https://apistaging.sponzor.me/invite_friend/').respond(200, {
      "message": "Invalid credentials",
      'code':'200'
    });
    $localStorage.email = 'test@test.com';
    $localStorage.id = '1';
    var controller = createController();
    scope.friend.email='friend@friend.com';
    scope.friend.message='test test';
    scope.invitefriend();
    httpBackend.flush();
    expect(scope.message).toEqual('inviteFiendEmailSent');
  });
  it("Should be email not sent", function(){
    httpBackend.when('POST', 'https://apistaging.sponzor.me/invite_friend/').respond(200, {
      "message": "Invalid credentials",
      'code':'400ss'
    });
    $localStorage.email = 'test@test.com';
    $localStorage.id = '1';
    var controller = createController();
    scope.friend.email='friend@friend.com';
    scope.friend.message='test test';
    scope.invitefriend();
    httpBackend.flush();
    expect(scope.message).toEqual('problem');
  });
});
