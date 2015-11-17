describe("User Category Service Unit Tests", function() {

  beforeEach(function() {
    module('userCategoryService');
  });

  var userCategoryRequest;

  var httpBackend = null;

  beforeEach(inject(function(_userCategoryRequest_) {
    userCategoryRequest = _userCategoryRequest_;
  }));
  //allCategories
  describe('All Categories', function() {

    var $httpBackend;
    var token;

    beforeEach(inject(function($injector) {
      // Set up the mock http service responses
      $httpBackend = $injector.get('$httpBackend');
      $httpBackend.when('GET', 'http://apistaging.sponzor.me/user_categories').respond(200, {
        "success": true
      });
    }));

    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });
    it('All user_categories.', function() {
      var returnData = {
        "success": true
      };
      var returnedPromise = userCategoryRequest.allUserCategories();
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
    var userCategoryId = '3';
    beforeEach(inject(function($injector) {
      // Set up the mock http service responses
      $httpBackend = $injector.get('$httpBackend');
      $httpBackend.when('GET', 'http://apistaging.sponzor.me/user_categories/'+userCategoryId).respond(200, {
      "data": {
        "category": {
          "id": "3",
          "title": "Dancing",
          "body": "All About the Bussines!",
          "lang": "en",
          "events": []
        }
      }
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
      var returnedPromise = userCategoryRequest.oneUserCategory(userCategoryId);
      var result;
      returnedPromise.then(function(response) {
        result = response;
      });
      $httpBackend.flush();
      expect(result.data.data.category.id).toEqual(userCategoryId);
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
      $httpBackend.when('POST', 'http://apistaging.sponzor.me/user_categories').respond(200, {
        "message": "Inserted",
        "category": {
          "title": "Test",
          "body": "test",
          "lang": "123",
          "id": 15
        }
      });
    }));
    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });
    it('Create Category.', function() {
      var returnData = {
        "message": "Inserted",
        "category": {
          "title": "Test",
          "body": "test",
          "lang": "123",
          "id": 15
        }
      };
      var returnedPromise = userCategoryRequest.createUserCategory(category);
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
    var userCategoryId = '15';
    beforeEach(inject(function($injector) {
      // Set up the mock http service responses
      $httpBackend = $injector.get('$httpBackend');
      $httpBackend.when('DELETE', 'http://apistaging.sponzor.me/user_categories/'+userCategoryId).respond(200, {
        "message": "Deleted"
      })
    }));
    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });
    it('Delete Category.', function() {
      var returnData = {"message": "Deleted"};
      var returnedPromise = userCategoryRequest.deleteUserCategory(userCategoryId);
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
    var userCategoryId = '15';
    var category = {
      "title": "Test",
      "body": "test",
      "lang": "123"};
    beforeEach(inject(function($injector) {
      // Set up the mock http service responses
      $httpBackend = $injector.get('$httpBackend');
      $httpBackend.when('PATCH', 'http://apistaging.sponzor.me/user_categories/'+userCategoryId).respond(200, {
        "message": "Updated",
        "warnings": [],
        "category": {
          "id": "15",
          "title": "Test",
          "body": "test",
          "lang": "123"
        }
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
      var returnedPromise = userCategoryRequest.editUserCategoryPatch(userCategoryId, category);
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
    var userCategoryId = '15';
    var category = {
      "title": "Test",
      "body": "test",
      "lang": "123"};
    beforeEach(inject(function($injector) {
      // Set up the mock http service responses
      $httpBackend = $injector.get('$httpBackend');
      $httpBackend.when('PUT', 'http://apistaging.sponzor.me/user_categories/'+userCategoryId).respond(200, {
        "message": "Updated",
        "warnings": [],
        "category": {
          "id": "15",
          "title": "Test",
          "body": "test",
          "lang": "123"
        }
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
      var returnedPromise = userCategoryRequest.editUserCategoryPut(userCategoryId, category);
      var result;
      returnedPromise.then(function(response) {
        result = response;
      });
      $httpBackend.flush();
      expect(result.data.message).toEqual(returnData.message);
    });
  });
});
