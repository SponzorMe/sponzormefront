'use strict';
/**
 * Set of tests for Login Service
 * @autor  Sebastian Gomez
 * @email  seagomezar@gmail.com
 * @date   2015-11-16
 */
describe("Login Service Unit Tests", function() {

  beforeEach(function() {
    module('loginService');
  });

  var loginRequest;

  var httpBackend = null;

  beforeEach(inject(function(_loginRequest_) {
    loginRequest = _loginRequest_;
  }));

  describe('Invalid credentials', function() {

    var $httpBackend;
    var email;
    var password;

    beforeEach(inject(function($injector) {
      // Set up the mock http service responses
      $httpBackend = $injector.get('$httpBackend');
      $httpBackend.when('POST', 'http://api.sponzor.me/auth').respond(200, {
        "message": "Invalid credentials"
      });
    }));

    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });
    it('Invalid credentials.', function() {
      email = 'invalid@invalid.com';
      password = 'invalid';
      var returnData = {
        "message": "Invalid credentials"
      };
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
    //Invalid
    var $httpBackend;
    var email;
    var password;

    beforeEach(inject(function($injector) {
      // Set up the mock http service responses
      $httpBackend = $injector.get('$httpBackend');
      $httpBackend.when('POST', 'http://api.sponzor.me/auth').respond(200, {
        "success": true,
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
    it('Valid credentials.', function() {
      email = 'Valid@valid.com';
      password = 'valid';
      var returnData = {
        "success": true
      };
      var returnedPromise = loginRequest.login(email, password);
      var result;
      returnedPromise.then(function(response) {
        result = response;
      });
      $httpBackend.flush();
      expect(result.data.success).toEqual(returnData.success);
    });
  });

  describe('Reset Password', function() {
    var $httpBackend;
    var email;
    var password;

    beforeEach(inject(function($injector) {
      // Set up the mock http service responses
      $httpBackend = $injector.get('$httpBackend');
      $httpBackend.when('POST', 'http://api.sponzor.me/send_reset_password').respond(200, {
        "message": "Reset password Link sent",
        "resetLink": "http://app.sponzor.me/#/reset/30952b62d1ddf5987812c6af663213c5",
        "code": "200"
      });
    }));

    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });
    it('Reset password with email', function() {
      email = 'Valid@valid.com';
      var returnData = {
        "message": "Reset password Link sent"
      };
      var returnedPromise = loginRequest.resetPassword(email);
      var result;
      returnedPromise.then(function(response) {
        result = response;
      });
      $httpBackend.flush();
      expect(result.data.message).toEqual(returnData.message);
    });
  });

  describe('Change Password Ok', function() {
    var $httpBackend;
    var email;
    var password;
    var token;

    beforeEach(inject(function($injector) {
      // Set up the mock http service responses
      $httpBackend = $injector.get('$httpBackend');
      $httpBackend.when('POST', 'http://api.sponzor.me/change_password').respond(200, {
        "message": "password changed",
        "code": "200"
      });
    }));

    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });
    it('Reset password with email', function() {
      var data = {
        email:'Valid@valid.com',
        password:'Valid@valid.com',
        passwordConfirmation:'Valid@valid.com'
      };
      token = "testToken";
      var returnData = {
        "message": "password changed"
      };
      var returnedPromise = loginRequest.changePassword(data,token);
      var result;
      returnedPromise.then(function(response) {
        result = response;
      });
      $httpBackend.flush();
      expect(result.data.message).toEqual(returnData.message);
    });
  });

  describe('Reset password without email', function() {
    var $httpBackend;
    beforeEach(inject(function($injector) {
      // Set up the mock http service responses
      $httpBackend = $injector.get('$httpBackend');
      $httpBackend.when('POST', 'http://api.sponzor.me/send_reset_password').respond(200, {
        "message": "User Not Found",
        "error": {
          "email": [
            "The email field is required."
          ]
        }
      });
    }));
    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });
    it('Reset password without an email', function() {
      var returnData = {
        "message": "User Not Found"
      };
      var returnedPromise = loginRequest.resetPassword("");
      var result;
      returnedPromise.then(function(response) {
        result = response;
      });
      $httpBackend.flush();
      expect(result.data.message).toEqual(returnData.message);
    });
  });

  describe('Verify Bad Activation', function() {
    var $httpBackend;
    beforeEach(inject(function($injector) {
      // Set up the mock http service responses
      $httpBackend = $injector.get('$httpBackend');
      $httpBackend.when('GET', 'http://api.sponzor.me/verify_activation/miBadToken123').respond(200, {
        "message": "User does not exist",
        "code": "404"
      });
    }));
    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });
    it('Verify Bad Activation', function() {
      var returnData = {
        "message": "User does not exist"
      };
      var returnedPromise = loginRequest.tryActivation("miBadToken123");
      var result;
      returnedPromise.then(function(response) {
        result = response;
      });
      $httpBackend.flush();
      expect(result.data.message).toEqual(returnData.message);
    });
  });

  describe('Verify Good Activation', function() {
    var $httpBackend;
    beforeEach(inject(function($injector) {
      // Set up the mock http service responses
      $httpBackend = $injector.get('$httpBackend');
      $httpBackend.when('GET', 'http://api.sponzor.me/verify_activation/miGoodToken123').respond(200, {
        'message': "Account activated"
      });
    }));
    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });
    it('Verify Good Activation', function() {
      var returnData = {
        'message': "Account activated"
      };
      var returnedPromise = loginRequest.tryActivation("miGoodToken123");
      var result;
      returnedPromise.then(function(response) {
        result = response;
      });
      $httpBackend.flush();
      expect(result.data.message).toEqual(returnData.message);
    });
  });

  describe('Verify Bad Activation', function() {
    var $httpBackend;
    beforeEach(inject(function($injector) {
      // Set up the mock http service responses
      $httpBackend = $injector.get('$httpBackend');
      $httpBackend.when('GET', 'http://api.sponzor.me/verify_activation/miBadToken123').respond(200, {
        "message": "User does not exist",
        "code": "404"
      });
    }));
    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });
    it('Verify Bad Activation', function() {
      var returnData = {
        "message": "User does not exist"
      };
      var returnedPromise = loginRequest.tryActivation("miBadToken123");
      var result;
      returnedPromise.then(function(response) {
        result = response;
      });
      $httpBackend.flush();
      expect(result.data.message).toEqual(returnData.message);
    });
  });

  describe('Resend Activation Ok',  function(){
    var $httpBackend;
    var email = "test@test.com";
    beforeEach(inject(function($injector) {
      // Set up the mock http service responses
      $httpBackend = $injector.get('$httpBackend');
      $httpBackend.when('POST', 'http://api.sponzor.me/send_activation').respond(200, {
        "message": "Activation Link sent",
        "code": "200"
      });
    }));
    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });
    it('Resend Activation', function() {
      var returnData = {
        "message": "Activation Link sent"
      };
      var returnedPromise = loginRequest.resendActivation(email);
      var result;
      returnedPromise.then(function(response) {
        result = response;
      });
      $httpBackend.flush();
      expect(result.data.message).toEqual(returnData.message);
    });
  });

  describe('Resend Activation Bad',  function(){
    var $httpBackend;
    var email = ""; //Empty
    beforeEach(inject(function($injector) {
      // Set up the mock http service responses
      $httpBackend = $injector.get('$httpBackend');
      $httpBackend.when('POST', 'http://api.sponzor.me/send_activation').respond(201, {
        "message": "Email Cannot be sent",
        "code": "201"
      });
    }));
    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });
    it('Resend Activation', function() {
      var returnData = {
        "message": "Email Cannot be sent"
      };
      var returnedPromise = loginRequest.resendActivation(email);
      var result;
      returnedPromise.then(function(response) {
        result = response;
      });
      $httpBackend.flush();
      expect(result.data.message).toEqual(returnData.message);
    });
  });

  describe('Update Password OK',  function(){
    var $httpBackend;
    var token = "myToken123";
    var email =  "test@test.com";
    beforeEach(inject(function($injector) {
      // Set up the mock http service responses
      $httpBackend = $injector.get('$httpBackend');
      $httpBackend.when('POST', 'http://api.sponzor.me/update_password/'+token).respond(200, {
        "message": "Password Reseted",
        "code": "200"
      });
    }));
    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });
    it('Update Password Ok', function() {
      var returnData = {
        "message": "Password Reseted"
      };
      var returnedPromise = loginRequest.updatePassword(token, email);
      var result;
      returnedPromise.then(function(response) {
        result = response;
      });
      $httpBackend.flush();
      expect(result.data.message).toEqual(returnData.message);
    });
  });

  describe('Update Password Bad User',  function(){
    var $httpBackend;
    var token = "myToken123";
    var email =  "test@test.com";
    beforeEach(inject(function($injector) {
      // Set up the mock http service responses
      $httpBackend = $injector.get('$httpBackend');
      $httpBackend.when('POST', 'http://api.sponzor.me/update_password/'+token).respond(200, {
        "message": "User does not exist",
        "code": "404"
      });
    }));
    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });
    it('Update Password Bad User', function() {
      var returnData = {
        "message": "User does not exist"
      };
      var returnedPromise = loginRequest.updatePassword(token, email);
      var result;
      returnedPromise.then(function(response) {
        result = response;
      });
      $httpBackend.flush();
      expect(result.data.message).toEqual(returnData.message);
    });
  });

  describe('Update Password Bad Token',  function(){
    var $httpBackend;
    var token = "myToken123";
    var email =  "test@test.com";
    beforeEach(inject(function($injector) {
      // Set up the mock http service responses
      $httpBackend = $injector.get('$httpBackend');
      $httpBackend.when('POST', 'http://api.sponzor.me/update_password/'+token).respond(200, {
        "message": "The token does not match",
        "code": "400"
      });
    }));
    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });
    it('Update Password Bad Token', function() {
      var returnData = {
        "message": "The token does not match"
      };
      var returnedPromise = loginRequest.updatePassword(token, email);
      var result;
      returnedPromise.then(function(response) {
        result = response;
      });
      $httpBackend.flush();
      expect(result.data.message).toEqual(returnData.message);
    });
  });
});
