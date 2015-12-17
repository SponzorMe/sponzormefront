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
      return $controller('OrganizersCreateController',{
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
  it("Should be password Empty", function(){
    var controller = createController();
    scope.passwordone = undefined;
    scope.sendfrom();
    httpBackend.flush();
    expect(scope.message).toEqual('errorRegisterPasswordNoEmpty');
  });
  it("Should be invalid length on password", function(){
    var controller = createController();
    scope.passwordone = '12345';
    scope.passwordtwo = '12345';
    scope.sendfrom();
    httpBackend.flush();
    expect(scope.message).toEqual('errorRegisterShortPassword');
  });
  it("Should be password not match", function(){
    var controller = createController();
    scope.passwordone = '12345678';
    scope.passwordtwo = '12345091';
    scope.sendfrom();
    httpBackend.flush();
    expect(scope.message).toEqual('errorRegisterPasswordNoMatch');
  });
  it("Should be succes registration", function(){
<<<<<<< HEAD
    httpBackend.when('POST', 'http://api.sponzor.me/events').respond(200, {
=======
    httpBackend.when('POST', apiUrl+'events').respond(200, {
>>>>>>> gh-pages
      "message": "Inserted",
      "event": {
        "title": "Test",
        "body": "test",
        "lang": "123",
        "id": 15
      }
    });
<<<<<<< HEAD
    httpBackend.when('POST', 'http://api.sponzor.me/users').respond(200, {
=======
    httpBackend.when('POST', apiUrl+'users').respond(200, {
>>>>>>> gh-pages
      "message": "Inserted",
      "User": {
        "title": "Test",
        "body": "test",
        "lang": "123",
        "id": 15,
        "type": 0
      }
    });
<<<<<<< HEAD
    httpBackend.when('POST', 'http://api.sponzor.me/perks').respond(200, {
=======
    httpBackend.when('POST', apiUrl+'perks').respond(200, {
>>>>>>> gh-pages
      "message": "Inserted",
      "perk": {
        "title": "Test",
        "body": "test",
        "lang": "123",
        "id": 15
      }
    });
    $routeParams.lang = 'en';
    var controller = createController();
    scope.email = 'test@test.com';
    scope.passwordone = 'test1234';
    scope.passwordtwo = 'test1234';
    scope.name = 'test';
    scope.lastname = 'test';
    scope.sendfrom();
    httpBackend.flush();
    expect($location.path()).toBe('/customization');
  });
});
