describe("CustomizationController Tests", function(){
  var createController, httpBackend, scope, $location, $localStorage;
  beforeEach(module('sponzorme'));
  beforeEach(inject(function($rootScope, $httpBackend, $controller, _$location_, _$localStorage_){
    httpBackend = $httpBackend;
    $location = _$location_;
    $localStorage = _$localStorage_;
    scope =  $rootScope.$new();
    createController = function() {
            return $controller('CustomizationController', {
                '$scope': scope
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
  it("Should be invalid credentials", function(){
    var controller = createController();
    httpBackend.when('POST', 'http://apistaging.sponzor.me/auth').respond(404, {
      "message": "Invalid credentials"
    });
    scope.email="Invlaid email", scope.password="Invalid Password";
    scope.sendfrom();
    httpBackend.flush();
    expect(scope.loagind).toBe(false);
    expect(scope.message).toEqual("invalidCredentials");
  });
});
