describe("loginController Tests", function(){
  var createController, httpBackend, scope, $location, $localStorage;
  beforeEach(module('sponzorme'));
  beforeEach(inject(function($rootScope, $httpBackend, $controller, _$location_, _$localStorage_){
    httpBackend = $httpBackend;
    $location = _$location_;
    $localStorage = _$localStorage_;
    scope =  $rootScope.$new();
    createController = function() {
            return $controller('LoginController', {
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
  it("Should be nothing in $localStorage", function(){
    var controller = createController();
    expect($localStorage).toBeDefined;
    expect($localStorage.token).not.toBeDefined;
    httpBackend.flush();
  });
  it("Should be setted user values", function(){
    var controller = createController();
    httpBackend.when('POST', 'http://api.sponzor.me/auth').respond(404, {
      "message": "It does not matter"
    });
    scope.email="Invlaid email", scope.password="Invalid Password";
    scope.sendfrom();
    expect(scope.objuser.password).toEqual(scope.password);
    expect(scope.objuser.email).toEqual(scope.email);
    expect(scope.objuser.lang).toBeDefined;
    httpBackend.flush();
  });
  it('Should not be setted user values', function(){
    var controller = createController();
    //Empty Strings
    scope.email="", scope.password="";
    scope.sendfrom();
    expect(scope.objuser).not.toBeDefined;
    //Null values
    scope.email=null, scope.password=null;
    scope.sendfrom();
    expect(scope.objuser).not.toBeDefined;
    //NaN values
    scope.email=NaN, scope.password=NaN;
    scope.sendfrom();
    expect(scope.objuser).not.toBeDefined;
    //Undefined values
    scope.email=undefined, scope.password=undefined;
    scope.sendfrom();
    expect(scope.objuser).not.toBeDefined;
    //false values
    scope.email=false, scope.password=false;
    scope.sendfrom();
    expect(scope.objuser).not.toBeDefined;
    //One yes one not
    scope.email="anEmail", scope.password=false;
    scope.sendfrom();
    expect(scope.objuser).not.toBeDefined;
    scope.email=false, scope.password="aPassword";
    scope.sendfrom();
    expect(scope.objuser).not.toBeDefined;
    httpBackend.flush();
  });
  it("Should be invalid credentials", function(){
    var controller = createController();
    httpBackend.when('POST', 'http://api.sponzor.me/auth').respond(404, {
      "message": "Invalid credentials"
    });
    scope.email="Invlaid email", scope.password="Invalid Password";
    scope.sendfrom();
    httpBackend.flush();
    expect(scope.loagind).toBe(false);
    expect(scope.message).toEqual("invalidCredentials");
  });
  it("Should be unactivated account", function(){
    var controller = createController();
    httpBackend.when('POST', 'http://api.sponzor.me/auth').respond(200, {
      "message": "unactivatedAccount",
      user:{
        activated: 0
      }
    });
    scope.email="Invalid email", scope.password="Invalid Password";
    scope.sendfrom();
    httpBackend.flush();
    expect(scope.loagind).toBe(false);
    expect(scope.message).toEqual("unactivatedAccount");
  });
  it("Finally it should be logged in sponzors Dashboard", function(){
    var controller = createController();
    httpBackend.when('POST', 'http://api.sponzor.me/auth').respond(200, {
      "success": true,
      "user": {
        "id": "1003",
        "name": "Valid",
        "email": "Valid@valid.com",
        "demo": "1",
        "type": "1",
        "status": "0",
        "activated": "1"
      },
      "token": null
    });
    scope.email="Invalid email", scope.password="Invalid Password";
    scope.sendfrom();
    httpBackend.flush();
    expect(scope.loagind).toBe(false);
    expect($location.path()).toBe('/sponzors/dashboard');
  });
  it("Finally it should be logged in organizers Dashboard", function(){
    var controller = createController();
    httpBackend.when('POST', 'http://api.sponzor.me/auth').respond(200, {
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
    expect(scope.loagind).toBe(false);
    expect($location.path()).toBe('/organizers/dashboard');
  });
});
