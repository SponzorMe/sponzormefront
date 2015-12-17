describe("Activation Controller Tests", function(){
  var createController, httpBackend, scope, $location, $localStorage, $routeParams;
  beforeEach(module('sponzorme'));
  beforeEach(inject(function($rootScope, $httpBackend, $controller, _$location_, _$localStorage_, _$routeParams_){
    httpBackend = $httpBackend;
    $routeParams = _$routeParams_;
    $location = _$location_;
    $localStorage = _$localStorage_;
    scope =  $rootScope.$new();
    createController = function(testToken) {
            return $controller('ActivationController', {
                '$scope': scope,
                $routeParams: {token: testToken}
            });
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
  }));
  afterEach(function(){
    httpBackend.verifyNoOutstandingExpectation();
    httpBackend.verifyNoOutstandingRequest();
  });
  it("Should be invalid token", function(){
<<<<<<< HEAD
    httpBackend.when('GET', 'http://api.sponzor.me/verify_activation/miBadToken123').respond(404, {
=======
    httpBackend.when('GET', apiUrl+'verify_activation/miBadToken123').respond(404, {
>>>>>>> gh-pages
      "message": "User does not exist",
      "code": "404"
    });
    var controller = createController('miBadToken123');
    expect(scope.successActivation).toEqual(false);
    expect(scope.errorActivation).toEqual(false);

    httpBackend.flush();
    expect(scope.successActivation).toEqual(false);
    expect(scope.errorActivation).toEqual(true);
  });
  it("Should be a valid token", function(){
<<<<<<< HEAD
    httpBackend.when('GET', 'http://api.sponzor.me/verify_activation/myTrueToken').respond(200,{
=======
    httpBackend.when('GET', apiUrl+'verify_activation/myTrueToken').respond(200,{
>>>>>>> gh-pages
      'message': "Account activated",
      'code': "200"
    });
    var controller = createController('myTrueToken');
    expect(scope.successActivation).toEqual(false);
    expect(scope.errorActivation).toEqual(false);
    httpBackend.flush();
    expect(scope.successActivation).toEqual(true);
    expect(scope.errorActivation).toEqual(false);
  });
});
