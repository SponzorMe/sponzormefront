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
      return $controller('OrganizersSettingsController',{
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
    httpBackend.when('GET', 'http://api.sponzor.me/users/'+1).respond(200, {
      "data": {
        "user": {
          "id": "1",
          "name": "Dancing",
          "body": "All About the Bussines!",
          "lang": "en",
          "email":'test@test.com',
          "events": [{id:"1"},{id:"1"},{id:"1"},{id:"1"}]
        }
      }
    });
    httpBackend.when('POST', 'https://api.imgur.com/3/image').respond(200, {
      data:{
        link:'http://myImage.com/hi.png'
      }
    });
  }));
  afterEach(function(){
    httpBackend.verifyNoOutstandingExpectation();
    httpBackend.verifyNoOutstandingRequest();
  });
  it("Should be user info gotten", function(){

    $localStorage.id = 1;
    var controller = createController();
    httpBackend.flush();
    expect(scope.account.id).toBe('1');
    expect(scope.account.name).toBe('Dancing');
    expect(scope.account.email).toBe('test@test.com');
  });
  it("Should be an account edited", function(){
    httpBackend.when('PATCH', 'http://api.sponzor.me/users/'+1).respond(200, {
      "message": "Updated",
      "warnings": [],
      "user": {
        "id": "15",
        "title": "Test",
        "body": "test",
        "lang": "123"
      }
    });
    $localStorage.id = 1;
    var controller = createController();
    httpBackend.flush();
    scope.account = {"id": "15",
      "title": "Test",
      "body": "test",
      "lang": "123",
      "location":{
        "formatted_address":'test'
      }
    };
    scope.editAccount();
    httpBackend.flush();
    expect(scope.message).toBe('accountInfoEditedSuccessfuly');
  });
  it("Should be an account edited with image", function(){
    httpBackend.when('PATCH', 'http://api.sponzor.me/users/'+1).respond(200, {
      "message": "Updated",
      "warnings": [],
      "user": {
        "id": "15",
        "title": "Test",
        "body": "test",
        "lang": "123"
      }
    });
    $localStorage.id = 1;
    var controller = createController();
    httpBackend.flush();
    scope.account = {"id": "15",
      "title": "Test",
      "body": "test",
      "lang": "123",
      "image": 'test.png',
      "location":{
        "formatted_address":'test'
      }
    };
    scope.file = true;
    scope.editAccount();
    httpBackend.flush();
    expect(scope.message).toBe('accountInfoEditedSuccessfuly');
  });
  it("Should be an account no edited", function(){
    httpBackend.when('PATCH', 'http://api.sponzor.me/users/'+1).respond(400, {
      "message": "Updated",
      "warnings": [],
      "user": {
        "id": "15",
        "title": "Test",
        "body": "test",
        "lang": "123"
      }
    });
    $localStorage.id = 1;
    var controller = createController();
    httpBackend.flush();
    scope.account = {"id": "15",
      "title": "Test",
      "body": "test",
      "lang": "123",
      "location":{
        "formatted_address":'test'
      }
    };
    scope.editAccount();
    httpBackend.flush();
    expect(scope.message).toBe('errorEditingAccountInfo');
  });
});
