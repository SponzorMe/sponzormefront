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
      return $controller('SponzorsSettingsController',{
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
<<<<<<< HEAD
    httpBackend.when('GET', 'http://api.sponzor.me/users/'+1).respond(200, {
=======
    httpBackend.when('GET', apiUrl+'users/'+1).respond(200, {
>>>>>>> gh-pages
      "data": {
        "user": {
          "id": "1",
          "name": "Dancing",
          "body": "All About the Bussines!",
          "lang": "en",
          "email":'test@test.com',
          "events": [{id:"1"},{id:"1"},{id:"1"},{id:"1"}]
        },
        "interests":
          [
            {name:"test1"},{name:"test2"}
          ]
      }
    });
<<<<<<< HEAD
    httpBackend.when('GET', 'http://api.sponzor.me/interests_category').respond(200, {
      "success": true
    });
    httpBackend.when('DELETE', 'http://api.sponzor.me/user_interests/1').respond(200, {
      "message": "Deleted"
    });
    httpBackend.when('POST', 'http://api.sponzor.me/user_interests').respond(200, {
=======
    httpBackend.when('GET', apiUrl+'interests_category').respond(200, {
      "success": true
    });
    httpBackend.when('DELETE', apiUrl+'user_interests/1').respond(200, {
      "message": "Deleted"
    });
    httpBackend.when('POST', apiUrl+'user_interests').respond(200, {
>>>>>>> gh-pages
      "message": "Inserted",
      "UserInterest": {
        "name": "Test",
        "id": 15
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
<<<<<<< HEAD
    httpBackend.when('PATCH', 'http://api.sponzor.me/users/'+1).respond(200, {
=======
    httpBackend.when('PATCH', apiUrl+'users/'+1).respond(200, {
>>>>>>> gh-pages
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
<<<<<<< HEAD
    httpBackend.when('PATCH', 'http://api.sponzor.me/users/'+1).respond(200, {
=======
    httpBackend.when('PATCH', apiUrl+'users/'+1).respond(200, {
>>>>>>> gh-pages
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
    //httpBackend.flush();
    //expect(scope.message).toBe('accountInfoEditedSuccessfuly');
  });
  it("Should be an account no edited", function(){
<<<<<<< HEAD
    httpBackend.when('PATCH', 'http://api.sponzor.me/users/'+1).respond(400, {
=======
    httpBackend.when('PATCH', apiUrl+'users/'+1).respond(400, {
>>>>>>> gh-pages
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
  it("should be a changed password ok", function(){
<<<<<<< HEAD
    httpBackend.when('POST', 'http://api.sponzor.me/change_password').respond(200, {
=======
    httpBackend.when('POST', apiUrl+'change_password').respond(200, {
>>>>>>> gh-pages
      "message": "password changed",
      "code": "200"
    });
    var controller = createController();
    httpBackend.flush();
    $localStorage.token = "testToken123";
    scope.email='test@test.com'
    scope.password = '123456';
    scope.passwordConfirmation = '123456';
    scope.resetPassword();
    httpBackend.flush();
    expect(scope.message).toBe('PasswordChangedSuccesfully');
  });
  it("should be a changed password fail", function(){
<<<<<<< HEAD
    httpBackend.when('POST', 'http://api.sponzor.me/change_password').respond(400, {
=======
    httpBackend.when('POST', apiUrl+'change_password').respond(400, {
>>>>>>> gh-pages
      "message": "password changed",
      "code": "200"
    });
    var controller = createController();
    httpBackend.flush();
    $localStorage.token = "testToken123";
    scope.email='test@test.com'
    scope.password = '123456';
    scope.passwordConfirmation = '123456';
    scope.resetPassword();
    httpBackend.flush();
    expect(scope.message).toBe('InvalidNewPassword');
  });
  it("should be a changed password not match", function(){
    var controller = createController();
    httpBackend.flush();
    $localStorage.token = "testToken123";
    scope.email='test@test.com'
    scope.password = '123456';
    scope.passwordConfirmation = '12345';
    scope.resetPassword();
    httpBackend.flush();
    expect(scope.message).toBe('PasswordNoMatch');
  });
  it("Should be user interests loaded", function(){
    $localStorage.id = 1;
    var controller = createController();
    httpBackend.flush();
    expect(scope.userInterests[0].name).toBe('test1');
  });
  it("Should be user interests inserted", function(){
    $localStorage.id = 1;
    var interest = {'name':'test3','id':'1', 'id_interest':'1'};
    var controller = createController();
    httpBackend.flush();
    expect(scope.userInterests[0].name).toBe('test1');
    scope.addUserInterests(interest);
    httpBackend.flush();
    expect(scope.userInterests[2].name).toBe('test3');
  });
 it("Should be user interest remove", function(){
   $localStorage.id = 1;
   var interest = {'name':'test3','id':'1', 'id_interest':'1'};
   var controller = createController();
   httpBackend.flush();
   expect(scope.userInterests[0].name).toBe('test1');
   scope.addUserInterests(interest);
   httpBackend.flush();
   expect(scope.userInterests[2].name).toBe('test3');
   scope.removeUserInterest(1,1);
   httpBackend.flush();
   expect(scope.userInterests[1].name).toBe('test3');
 });

 it("Should be an company info edited", function(){
<<<<<<< HEAD
   httpBackend.when('PATCH', 'http://api.sponzor.me/users/'+1).respond(200, {
=======
   httpBackend.when('PATCH', apiUrl+'users/'+1).respond(200, {
>>>>>>> gh-pages
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
   scope.updateDetails();
   httpBackend.flush();
   expect(scope.message).toBe('accountInfoEditedSuccessfuly');
 });
 it("Should be an account edited with image", function(){
<<<<<<< HEAD
   httpBackend.when('PATCH', 'http://api.sponzor.me/users/'+1).respond(200, {
=======
   httpBackend.when('PATCH', apiUrl+'users/'+1).respond(200, {
>>>>>>> gh-pages
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
   scope.updateDetails();
   httpBackend.flush();
   expect(scope.message).toBe('accountInfoEditedSuccessfuly');
 });
 it("Should be an account no edited", function(){
<<<<<<< HEAD
   httpBackend.when('PATCH', 'http://api.sponzor.me/users/'+1).respond(400, {
=======
   httpBackend.when('PATCH', apiUrl+'users/'+1).respond(400, {
>>>>>>> gh-pages
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
   scope.updateDetails();
   httpBackend.flush();
   expect(scope.message).toBe('errorEditingAccountInfo');
 });
});
