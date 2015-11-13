'use strict';
//Tests Based on
//http://jbavari.github.io/blog/2014/06/11/unit-testing-angularjs-services/
//http://www.benlesh.com/2013/06/angular-js-unit-testing-services.html

describe("Auth Service Unit Tests", function() {

  beforeEach(function() {
      //Ensure angular modules available
    module('loginService');
  });

  var loginRequest;

  var httpBackend = null;

  beforeEach(inject(function (_loginRequest_) {
    loginRequest = _loginRequest_;
  }));

  describe('Invalid credentials', function() {

    var $httpBackend;
    var email;
    var password;

    beforeEach(inject(function($injector) {
      // Set up the mock http service responses
      $httpBackend = $injector.get('$httpBackend');
      $httpBackend.when('POST', 'http://apistaging.sponzor.me/auth').respond(200, {"message": "Invalid credentials"});
     }));

    afterEach(function() {
     $httpBackend.verifyNoOutstandingExpectation();
     $httpBackend.verifyNoOutstandingRequest();
    });
    it('Invalid credentials.', function (){
      email = 'invalid@invalid.com';
      password = 'invalid';
      var returnData = {"message": "Invalid credentials"};
      var returnedPromise = loginRequest.login(email, password);
      var result;
      returnedPromise.then(function(response) {
        result = response;
      });
      $httpBackend.flush();
      expect(result.data.message).toEqual(returnData.message);
    });
  });

  describe('Valid credentials', function() {

    var $httpBackend;
    var email;
    var password;

    beforeEach(inject(function($injector) {
      // Set up the mock http service responses
      $httpBackend = $injector.get('$httpBackend');
      $httpBackend.when('POST', 'http://apistaging.sponzor.me/auth').respond(200, { "success": true,
        "user": {
          "id": "1003",
          "name": "Valid",
          "email": "Valid@valid.com",
          "demo": "1",
          "type": "0",
          "status": "0"
        },
        "token": null
      });
     }));

    afterEach(function() {
     $httpBackend.verifyNoOutstandingExpectation();
     $httpBackend.verifyNoOutstandingRequest();
    });
    it('Valid credentials.', function (){
      email = 'Valid@valid.com';
      password = 'valid';
      var returnData = {"success": true};
      var returnedPromise = loginRequest.login(email, password);
      var result;
      returnedPromise.then(function(response) {
        result = response;
      });
      $httpBackend.flush();
      expect(result.data.success).toEqual(returnData.success);
    });
  });

});







/*

it('Valid credentials.', function (){
  email = 'valid@valid.com';
  password = 'valid';
  var returnData = {"success": true};
  var returnedPromise = loginRequest.login(name, password);
  var result;
  returnedPromise.then(function(response) {
    result = response;
  });
  $httpBackend.flush();
  expect(result.data.success).toEqual(returnData.success);
});
describe('myService test', function(){
  var http, DataService;
  beforeEach(inject(function ($http, _loginService_) {

      http = $http;

      DataService = _loginService_;

  }));
    describe('when I call myService.one', function(){
        it('returns 1', function(){
            var myService = DataService.get( 'loginRequest' );
            var data = {'email': 'test@test.com', 'password': 'test'};
            expect( myService.login(data) ).toEqual(1);
        })

    })

});








/*
describe("Testing Login Controller", function()
{
    beforeEach(module("sponzorme"));

describe('LoginController', function() {
    var scope, httpBackend, ctrl;


    beforeEach(inject(function($rootScope, $httpBackend, $controller)
    {
        scope = $rootScope.$new();
        httpBackend = $httpBackend;
        ctrl = $controller("LoginController", {$scope:scope});
    }));

    afterEach(function() {
        httpBackend.verifyNoOutstandingExpectation();
        httpBackend.verifyNoOutstandingRequest();
    });

    it('should run the Test to get the link data from the go backend', function() {
        scope.email = "test@test.com";
        scope.password = "testm";
        scope.sendfrom();
        httpBackend.expect('POST', '/auth')
            .respond({
                "success": false
            });

        // have to use $apply to trigger the $digest which will
        // take care of the HTTP request
        scope.$apply(function() {
           scope.runTest();
        });
        httpBackend.flush();
        expect(scope.message).toEqual('invalidCredentials');
    });
});
})


describe("Testing Login Controller", function()
{
    beforeEach(module("sponzorme"));

    describe("LoginController", function()
    {
        var scope, ctrl, httpBackend;

        beforeEach(inject(function($rootScope, $controller,$httpBackend)
        {
            scope = $rootScope.$new();
            ctrl = $controller("LoginController", {$scope:scope});
            httpBackend = $httpBackend;
        }));

        it("Incorrect Login", function()
        {
            scope.email = "test@test.com";
            scope.password = "testm";
            scope.sendfrom();
            scope.$digest();
            expect(scope.message).toEqual('asdfasdfsdfsdfasdfasdf');

        });
    })
})
*/
