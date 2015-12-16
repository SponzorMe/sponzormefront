describe("loginController Tests", function(){
  var createLogoutController, createLoginController, httpBackend, scope, $location, $localStorage;
  beforeEach(module('sponzorme'));
  beforeEach(inject(function($rootScope, $httpBackend, $controller, _$location_, _$localStorage_){
    httpBackend = $httpBackend;
    $location = _$location_;
    $localStorage = _$localStorage_;
    scope =  $rootScope.$new();
    createLogoutController = function() {
            return $controller('LogoutController', {
                '$scope': scope
            });
        };
    createLoginController = function(){
      return $controller('LoginController',{
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
  }));
  afterEach(function(){
    httpBackend.verifyNoOutstandingExpectation();
    httpBackend.verifyNoOutstandingRequest();
  });
  it("Should be unloged", function(){
    var logoutController = createLogoutController();
    expect($localStorage).toBeDefined;
    httpBackend.flush();
    expect($localStorage.token).not.toBeDefined;
  });
  it("Should be loged then unloged", function(){
    var loginController = createLoginController();
    httpBackend.when('POST', 'https://apistaging.sponzor.me/auth').respond(200, {
      "success": true,
      "user": {
        "id": "1003",
        "name": "Valid",
        "email": "Valid@valid.com",
        "demo": "1",
        "type": "0",
        "status": "0",
        "activated": "1"
      },
      "token": null
    });
    scope.email="Invalid email", scope.password="Invalid Password";
    scope.sendfrom();
    httpBackend.flush();
    expect($localStorage.token).toBeDefined;
    expect(scope.loagind).toBe(false);
    expect($location.path()).toBe('/organizers/dashboard');
    var logoutController = createLogoutController();
    expect($localStorage).toBeDefined;
    expect($localStorage.token).not.toBeDefined;
  })
});
