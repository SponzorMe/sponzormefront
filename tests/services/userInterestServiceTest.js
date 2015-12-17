describe("User Category Service Unit Tests", function() {

  beforeEach(function() {
    module('sponzorme');
  });

  var userInterestRequest;

  var httpBackend = null;

  beforeEach(inject(function(_userInterestRequest_) {
    userInterestRequest = _userInterestRequest_;
  }));
  //allCategories
  describe('All Categories', function() {

    var $httpBackend;
    var token;

    beforeEach(inject(function($injector) {
      // Set up the mock http service responses
      $httpBackend = $injector.get('$httpBackend');
<<<<<<< HEAD
      $httpBackend.when('GET', 'http://api.sponzor.me/user_interests').respond(200, {
=======
      $httpBackend.when('GET', apiUrl+'user_interests').respond(200, {
>>>>>>> gh-pages
        "success": true
      });$httpBackend.whenGET('langs/lang-en.json').respond(200, {
        "title": 'Sponzorme EN'
      });
      $httpBackend.whenGET('langs/lang-pt.json').respond(200, {
        "title": 'Sponzorme PT'
      });
      $httpBackend.whenGET('langs/lang-es.json').respond(200, {
        "title": 'Sponzorme ES'
      });
    }));

    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });
    it('All user_interests.', function() {
      var returnData = {
        "success": true
      };
      var returnedPromise = userInterestRequest.allUserInterests();
      var result;
      returnedPromise.then(function(response) {
        result = response;
      });
      $httpBackend.flush();
      expect(result.data.success).toEqual(returnData.success);
    });
  });
  //oneCategory
  describe('One Category', function() {
    var $httpBackend;
    var userInterestId = '3';
    beforeEach(inject(function($injector) {
      // Set up the mock http service responses
      $httpBackend = $injector.get('$httpBackend');
<<<<<<< HEAD
      $httpBackend.when('GET', 'http://api.sponzor.me/user_interests/'+userInterestId).respond(200, {
=======
      $httpBackend.when('GET', apiUrl+'user_interests/'+userInterestId).respond(200, {
>>>>>>> gh-pages
      "data": {
        "category": {
          "id": "3",
          "title": "Dancing",
          "body": "All About the Bussines!",
          "lang": "en",
          "events": []
        }
      }
    });$httpBackend.whenGET('langs/lang-en.json').respond(200, {
      "title": 'Sponzorme EN'
    });
    $httpBackend.whenGET('langs/lang-pt.json').respond(200, {
      "title": 'Sponzorme PT'
    });
    $httpBackend.whenGET('langs/lang-es.json').respond(200, {
      "title": 'Sponzorme ES'
    });
    }));
    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });
    it('A category.', function() {
      var returnData = {
        "data": {
          "category": {
            "id": "3",
            "title": "Dancing",
            "body": "All About the Bussines!",
            "lang": "en",
            "events": [],
          }
        }
      };
      var returnedPromise = userInterestRequest.oneUserInterest(userInterestId);
      var result;
      returnedPromise.then(function(response) {
        result = response;
      });
      $httpBackend.flush();
      expect(result.data.data.category.id).toEqual(userInterestId);
    });
  });
  //createCategory
  describe('create Category', function() {
    var $httpBackend;
    var category = {
      "title": "Test",
      "body": "test",
      "lang": "123"};
    beforeEach(inject(function($injector) {
      // Set up the mock http service responses
      $httpBackend = $injector.get('$httpBackend');
<<<<<<< HEAD
      $httpBackend.when('POST', 'http://api.sponzor.me/user_interests').respond(200, {
=======
      $httpBackend.when('POST', apiUrl+'user_interests').respond(200, {
>>>>>>> gh-pages
        "message": "Inserted",
        "category": {
          "title": "Test",
          "body": "test",
          "lang": "123",
          "id": 15
        }
      });$httpBackend.whenGET('langs/lang-en.json').respond(200, {
        "title": 'Sponzorme EN'
      });
      $httpBackend.whenGET('langs/lang-pt.json').respond(200, {
        "title": 'Sponzorme PT'
      });
      $httpBackend.whenGET('langs/lang-es.json').respond(200, {
        "title": 'Sponzorme ES'
      });
    }));
    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });
    it('Create User Interest.', function() {
      var returnData = {
        "message": "Inserted",
        "category": {
          "title": "Test",
          "body": "test",
          "lang": "123",
          "id": 15
        }
      };
      var returnedPromise = userInterestRequest.createUserInterest(category);
      var result;
      returnedPromise.then(function(response) {
        result = response;
      });
      $httpBackend.flush();
      expect(result.data.message).toEqual(returnData.message);
    });
  });
  //deleteCategory
  describe('Delete Category', function() {
    var $httpBackend;
    var userInterestId = '15';
    beforeEach(inject(function($injector) {
      // Set up the mock http service responses
      $httpBackend = $injector.get('$httpBackend');
<<<<<<< HEAD
      $httpBackend.when('DELETE', 'http://api.sponzor.me/user_interests/'+userInterestId).respond(200, {
=======
      $httpBackend.when('DELETE', apiUrl+'user_interests/'+userInterestId).respond(200, {
>>>>>>> gh-pages
        "message": "Deleted"
      });$httpBackend.whenGET('langs/lang-en.json').respond(200, {
        "title": 'Sponzorme EN'
      });
      $httpBackend.whenGET('langs/lang-pt.json').respond(200, {
        "title": 'Sponzorme PT'
      });
      $httpBackend.whenGET('langs/lang-es.json').respond(200, {
        "title": 'Sponzorme ES'
      });
    }));
    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });
    it('Delete User Interest.', function() {
      var returnData = {"message": "Deleted"};
      var returnedPromise = userInterestRequest.deleteUserInterest(userInterestId);
      var result;
      returnedPromise.then(function(response) {
        result = response;
      });
      $httpBackend.flush();
      expect(result.data.message).toEqual(returnData.message);
    });
  });
  //editCategoryPatch
  describe('Edit Category PATCH', function() {
    var $httpBackend;
    var userInterestId = '15';
    var category = {
      "title": "Test",
      "body": "test",
      "lang": "123"};
    beforeEach(inject(function($injector) {
      // Set up the mock http service responses
      $httpBackend = $injector.get('$httpBackend');
<<<<<<< HEAD
      $httpBackend.when('PATCH', 'http://api.sponzor.me/user_interests/'+userInterestId).respond(200, {
=======
      $httpBackend.when('PATCH', apiUrl+'user_interests/'+userInterestId).respond(200, {
>>>>>>> gh-pages
        "message": "Updated",
        "warnings": [],
        "category": {
          "id": "15",
          "title": "Test",
          "body": "test",
          "lang": "123"
        }
      });$httpBackend.whenGET('langs/lang-en.json').respond(200, {
        "title": 'Sponzorme EN'
      });
      $httpBackend.whenGET('langs/lang-pt.json').respond(200, {
        "title": 'Sponzorme PT'
      });
      $httpBackend.whenGET('langs/lang-es.json').respond(200, {
        "title": 'Sponzorme ES'
      });
    }));
    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });
    it('Edit Category PATCH', function() {
      var returnData = {
        "message": "Updated",
        "warnings": [],
        "category": {
          "id": "15",
          "title": "Test",
          "body": "test",
          "lang": "123"
        }
      };
      var returnedPromise = userInterestRequest.editUserInterestPatch(userInterestId, category);
      var result;
      returnedPromise.then(function(response) {
        result = response;
      });
      $httpBackend.flush();
      expect(result.data.message).toEqual(returnData.message);
    });
  });
  //editCategoryPut
  describe('Edit Category PUT', function() {
    var $httpBackend;
    var userInterestId = '15';
    var category = {
      "title": "Test",
      "body": "test",
      "lang": "123"};
    beforeEach(inject(function($injector) {
      // Set up the mock http service responses
      $httpBackend = $injector.get('$httpBackend');
<<<<<<< HEAD
      $httpBackend.when('PUT', 'http://api.sponzor.me/user_interests/'+userInterestId).respond(200, {
=======
      $httpBackend.when('PUT', apiUrl+'user_interests/'+userInterestId).respond(200, {
>>>>>>> gh-pages
        "message": "Updated",
        "warnings": [],
        "category": {
          "id": "15",
          "title": "Test",
          "body": "test",
          "lang": "123"
        }
      });$httpBackend.whenGET('langs/lang-en.json').respond(200, {
        "title": 'Sponzorme EN'
      });
      $httpBackend.whenGET('langs/lang-pt.json').respond(200, {
        "title": 'Sponzorme PT'
      });
      $httpBackend.whenGET('langs/lang-es.json').respond(200, {
        "title": 'Sponzorme ES'
      });
    }));
    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });
    it('Edit Category PUT', function() {
      var returnData = {
        "message": "Updated",
        "warnings": [],
        "category": {
          "id": "15",
          "title": "Test",
          "body": "test",
          "lang": "123"
        }
      };
      var returnedPromise = userInterestRequest.editUserInterestPut(userInterestId, category);
      var result;
      returnedPromise.then(function(response) {
        result = response;
      });
      $httpBackend.flush();
      expect(result.data.message).toEqual(returnData.message);
    });
  });
});
