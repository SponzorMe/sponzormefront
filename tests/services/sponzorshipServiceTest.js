describe("Sponzorship Service Unit Tests", function() {

  beforeEach(function() {
    module('sponzorme');
  });

  var sponzorshipRequest;

  var httpBackend = null;

  beforeEach(inject(function(_sponzorshipRequest_) {
    sponzorshipRequest = _sponzorshipRequest_;
  }));
  //allCategories
  describe('All sponzorships', function() {

    var $httpBackend;
    var token;

    beforeEach(inject(function($injector) {
      // Set up the mock http service responses
      $httpBackend = $injector.get('$httpBackend');
<<<<<<< HEAD
      $httpBackend.when('GET', 'http://api.sponzor.me/sponzorships').respond(200, {
=======
      $httpBackend.when('GET', apiUrl+'sponzorships').respond(200, {
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
    it('All sponzorships.', function() {
      var returnData = {
        "success": true
      };
      var returnedPromise = sponzorshipRequest.allSponzorships();
      var result;
      returnedPromise.then(function(response) {
        result = response;
      });
      $httpBackend.flush();
      expect(result.data.success).toEqual(returnData.success);
    });
  });
  //oneSponzorship
  describe('One Sponzorship', function() {
    var $httpBackend;
    var sponzorshipId = '3';
    beforeEach(inject(function($injector) {
      // Set up the mock http service responses
      $httpBackend = $injector.get('$httpBackend');
<<<<<<< HEAD
      $httpBackend.when('GET', 'http://api.sponzor.me/sponzorships/'+sponzorshipId).respond(200, {
=======
      $httpBackend.when('GET', apiUrl+'sponzorships/'+sponzorshipId).respond(200, {
>>>>>>> gh-pages
      "data": {
        "sponzorship": {
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
    it('A sponzorship.', function() {
      var returnData = {
        "data": {
          "sponzorship": {
            "id": "3",
            "title": "Dancing",
            "body": "All About the Bussines!",
            "lang": "en",
            "events": [],
          }
        }
      };
      var returnedPromise = sponzorshipRequest.oneSponzorship(sponzorshipId);
      var result;
      returnedPromise.then(function(response) {
        result = response;
      });
      $httpBackend.flush();
      expect(result.data.data.sponzorship.id).toEqual(sponzorshipId);
    });
  });
  //createSponzorship
  describe('create Sponzorship', function() {
    var $httpBackend;
    var sponzorship = {
      "title": "Test",
      "body": "test",
      "lang": "123"};
    beforeEach(inject(function($injector) {
      // Set up the mock http service responses
      $httpBackend = $injector.get('$httpBackend');
<<<<<<< HEAD
      $httpBackend.when('POST', 'http://api.sponzor.me/sponzorships').respond(200, {
=======
      $httpBackend.when('POST', apiUrl+'sponzorships').respond(200, {
>>>>>>> gh-pages
        "message": "Inserted",
        "sponzorship": {
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
    it('Create Sponzorship.', function() {
      var returnData = {
        "message": "Inserted",
        "sponzorship": {
          "title": "Test",
          "body": "test",
          "lang": "123",
          "id": 15
        }
      };
      var returnedPromise = sponzorshipRequest.createSponzorship(sponzorship);
      var result;
      returnedPromise.then(function(response) {
        result = response;
      });
      $httpBackend.flush();
      expect(result.data.message).toEqual(returnData.message);
    });
  });
  //deleteSponzorship
  describe('Delete Sponzorship', function() {
    var $httpBackend;
    var sponzorshipId = '15';
    beforeEach(inject(function($injector) {
      // Set up the mock http service responses
      $httpBackend = $injector.get('$httpBackend');
<<<<<<< HEAD
      $httpBackend.when('DELETE', 'http://api.sponzor.me/sponzorships/'+sponzorshipId).respond(200, {
=======
      $httpBackend.when('DELETE', apiUrl+'sponzorships/'+sponzorshipId).respond(200, {
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
    it('Delete Sponzorship.', function() {
      var returnData = {"message": "Deleted"};
      var returnedPromise = sponzorshipRequest.deleteSponzorship(sponzorshipId);
      var result;
      returnedPromise.then(function(response) {
        result = response;
      });
      $httpBackend.flush();
      expect(result.data.message).toEqual(returnData.message);
    });
  });
  //editSponzorshipPatch
  describe('Edit Sponzorship PATCH', function() {
    var $httpBackend;
    var sponzorshipId = '15';
    var sponzorship = {
      "title": "Test",
      "body": "test",
      "lang": "123"};
    beforeEach(inject(function($injector) {
      // Set up the mock http service responses
      $httpBackend = $injector.get('$httpBackend');
<<<<<<< HEAD
      $httpBackend.when('PATCH', 'http://api.sponzor.me/sponzorships/'+sponzorshipId).respond(200, {
=======
      $httpBackend.when('PATCH', apiUrl+'sponzorships/'+sponzorshipId).respond(200, {
>>>>>>> gh-pages
        "message": "Updated",
        "warnings": [],
        "sponzorship": {
          "id": "15",
          "title": "Test",
          "body": "test",
          "lang": "123"
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
    it('Edit Sponzorship PATCH', function() {
      var returnData = {
        "message": "Updated",
        "warnings": [],
        "sponzorship": {
          "id": "15",
          "title": "Test",
          "body": "test",
          "lang": "123"
        }
      };
      var returnedPromise = sponzorshipRequest.editSponzorshipPatch(sponzorshipId, sponzorship);
      var result;
      returnedPromise.then(function(response) {
        result = response;
      });
      $httpBackend.flush();
      expect(result.data.message).toEqual(returnData.message);
    });
  });
  //editSponzorshipPut
  describe('Edit Sponzorship PUT', function() {
    var $httpBackend;
    var sponzorshipId = '15';
    var sponzorship = {
      "title": "Test",
      "body": "test",
      "lang": "123"};
    beforeEach(inject(function($injector) {
      // Set up the mock http service responses
      $httpBackend = $injector.get('$httpBackend');
<<<<<<< HEAD
      $httpBackend.when('PUT', 'http://api.sponzor.me/sponzorships/'+sponzorshipId).respond(200, {
=======
      $httpBackend.when('PUT', apiUrl+'sponzorships/'+sponzorshipId).respond(200, {
>>>>>>> gh-pages
        "message": "Updated",
        "warnings": [],
        "sponzorship": {
          "id": "15",
          "title": "Test",
          "body": "test",
          "lang": "123"
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
    it('Edit Sponzorship PUT', function() {
      var returnData = {
        "message": "Updated",
        "warnings": [],
        "sponzorship": {
          "id": "15",
          "title": "Test",
          "body": "test",
          "lang": "123"
        }
      };
      var returnedPromise = sponzorshipRequest.editSponzorshipPut(sponzorshipId, sponzorship);
      var result;
      returnedPromise.then(function(response) {
        result = response;
      });
      $httpBackend.flush();
      expect(result.data.message).toEqual(returnData.message);
    });
  });
});
