describe("InterestCategory Service Unit Tests", function() {

  beforeEach(function() {
    module('sponzorme');
  });

  var allInterestsServiceRequest;

  var httpBackend = null;

  beforeEach(inject(function(_allInterestsServiceRequest_) {
    allInterestsServiceRequest = _allInterestsServiceRequest_;
  }));
  //allinterestsCategory
  describe('All interestsCategory', function() {

    var $httpBackend;
    var token;

    beforeEach(inject(function($injector) {
      // Set up the mock http service responses
      $httpBackend = $injector.get('$httpBackend');
<<<<<<< HEAD
      $httpBackend.when('GET', 'http://api.sponzor.me/interests_category').respond(200, {
=======
      $httpBackend.when('GET', apiUrl+'interests_category').respond(200, {
>>>>>>> gh-pages
        "success": true
      });
      $httpBackend.whenGET('langs/lang-en.json').respond(200, {
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
    it('All interests_category.', function() {
      var returnData = {
        "success": true
      };
      var returnedPromise = allInterestsServiceRequest.allInterestsCategoriesId();
      var result;
      returnedPromise.then(function(response) {
        result = response;
      });
      $httpBackend.flush();
      expect(result.data.success).toEqual(returnData.success);
    });
  });
  //oneInterestCategory
  describe('One InterestCategory', function() {
    var $httpBackend;
    var interestCategoryId = '3';
    beforeEach(inject(function($injector) {
      // Set up the mock http service responses
      $httpBackend = $injector.get('$httpBackend');
<<<<<<< HEAD
      $httpBackend.when('GET', 'http://api.sponzor.me/interests_category/'+interestCategoryId).respond(200, {
=======
      $httpBackend.when('GET', apiUrl+'interests_category/'+interestCategoryId).respond(200, {
>>>>>>> gh-pages
      "data": {
        "interestCategory": {
          "id": "3",
          "title": "Dancing",
          "body": "All About the Bussines!",
          "lang": "en",
          "events": []
        }
      }
    });
    $httpBackend.whenGET('langs/lang-en.json').respond(200, {
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
    it('A interestCategory.', function() {
      var returnData = {
        "data": {
          "interestCategory": {
            "id": "3",
            "title": "Dancing",
            "body": "All About the Bussines!",
            "lang": "en",
            "events": [],
          }
        }
      };
      var returnedPromise = allInterestsServiceRequest.oneInterestsCategory(interestCategoryId);
      var result;
      returnedPromise.then(function(response) {
        result = response;
      });
      $httpBackend.flush();
      expect(result.data.data.interestCategory.id).toEqual(interestCategoryId);
    });
  });
  //createInterestCategory
  describe('create InterestCategory', function() {
    var $httpBackend;
    var interestCategory = {
      "title": "Test",
      "body": "test",
      "lang": "123"};
    beforeEach(inject(function($injector) {
      // Set up the mock http service responses
      $httpBackend = $injector.get('$httpBackend');
<<<<<<< HEAD
      $httpBackend.when('POST', 'http://api.sponzor.me/interests_category').respond(200, {
=======
      $httpBackend.when('POST', apiUrl+'interests_category').respond(200, {
>>>>>>> gh-pages
        "message": "Inserted",
        "interestCategory": {
          "title": "Test",
          "body": "test",
          "lang": "123",
          "id": 15
        }
      });
      $httpBackend.whenGET('langs/lang-en.json').respond(200, {
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
    it('Create InterestCategory.', function() {
      var returnData = {
        "message": "Inserted",
        "interestCategory": {
          "title": "Test",
          "body": "test",
          "lang": "123",
          "id": 15
        }
      };
      var returnedPromise = allInterestsServiceRequest.createInterestsCategory(interestCategory);
      var result;
      returnedPromise.then(function(response) {
        result = response;
      });
      $httpBackend.flush();
      expect(result.data.message).toEqual(returnData.message);
    });
  });
  //deleteInterestCategory
  describe('Delete InterestCategory', function() {
    var $httpBackend;
    var interestCategoryId = '15';
    beforeEach(inject(function($injector) {
      // Set up the mock http service responses
      $httpBackend = $injector.get('$httpBackend');
<<<<<<< HEAD
      $httpBackend.when('DELETE', 'http://api.sponzor.me/interests_category/'+interestCategoryId).respond(200, {
=======
      $httpBackend.when('DELETE', apiUrl+'interests_category/'+interestCategoryId).respond(200, {
>>>>>>> gh-pages
        "message": "Deleted"
      });
      $httpBackend.whenGET('langs/lang-en.json').respond(200, {
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
    it('Delete InterestCategory.', function() {
      var returnData = {"message": "Deleted"};
      var returnedPromise = allInterestsServiceRequest.deleteInterestsCategory(interestCategoryId);
      var result;
      returnedPromise.then(function(response) {
        result = response;
      });
      $httpBackend.flush();
      expect(result.data.message).toEqual(returnData.message);
    });
  });
  //editInterestCategoryPatch
  describe('Edit InterestCategory PATCH', function() {
    var $httpBackend;
    var interestCategoryId = '15';
    var interestCategory = {
      "title": "Test",
      "body": "test",
      "lang": "123"};
    beforeEach(inject(function($injector) {
      // Set up the mock http service responses
      $httpBackend = $injector.get('$httpBackend');
<<<<<<< HEAD
      $httpBackend.when('PATCH', 'http://api.sponzor.me/interests_category/'+interestCategoryId).respond(200, {
=======
      $httpBackend.when('PATCH', apiUrl+'interests_category/'+interestCategoryId).respond(200, {
>>>>>>> gh-pages
        "message": "Updated",
        "warnings": [],
        "interestCategory": {
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
    it('Edit InterestCategory PATCH', function() {
      var returnData = {
        "message": "Updated",
        "warnings": [],
        "interestCategory": {
          "id": "15",
          "title": "Test",
          "body": "test",
          "lang": "123"
        }
      };
      var returnedPromise = allInterestsServiceRequest.editInterestsCategoryPatch(interestCategoryId, interestCategory);
      var result;
      returnedPromise.then(function(response) {
        result = response;
      });
      $httpBackend.flush();
      expect(result.data.message).toEqual(returnData.message);
    });
  });
  //editInterestCategoryPut
  describe('Edit InterestCategory PUT', function() {
    var $httpBackend;
    var interestCategoryId = '15';
    var interestCategory = {
      "title": "Test",
      "body": "test",
      "lang": "123"};
    beforeEach(inject(function($injector) {
      // Set up the mock http service responses
      $httpBackend = $injector.get('$httpBackend');
<<<<<<< HEAD
      $httpBackend.when('PUT', 'http://api.sponzor.me/interests_category/'+interestCategoryId).respond(200, {
=======
      $httpBackend.when('PUT', apiUrl+'interests_category/'+interestCategoryId).respond(200, {
>>>>>>> gh-pages
        "message": "Updated",
        "warnings": [],
        "interestCategory": {
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
    it('Edit InterestCategory PUT', function() {
      var returnData = {
        "message": "Updated",
        "warnings": [],
        "interestCategory": {
          "id": "15",
          "title": "Test",
          "body": "test",
          "lang": "123"
        }
      };
      var returnedPromise = allInterestsServiceRequest.editInterestsCategoryPut(interestCategoryId, interestCategory);
      var result;
      returnedPromise.then(function(response) {
        result = response;
      });
      $httpBackend.flush();
      expect(result.data.message).toEqual(returnData.message);
    });
  });
});
