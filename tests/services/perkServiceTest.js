describe("Perk Service Unit Tests", function() {

  beforeEach(function() {
    module('perkService');
  });

  var perkRequest;

  var httpBackend = null;

  beforeEach(inject(function(_perkRequest_) {
    perkRequest = _perkRequest_;
  }));
  //allPerks
  describe('All Perks', function() {

    var $httpBackend;
    var token;

    beforeEach(inject(function($injector) {
      // Set up the mock http service responses
      $httpBackend = $injector.get('$httpBackend');
      $httpBackend.when('GET', 'http://apistaging.sponzor.me/perks').respond(200, {
        "success": true
      });
    }));

    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });
    it('All perks.', function() {
      var returnData = {
        "success": true
      };
      var returnedPromise = perkRequest.allPerks();
      var result;
      returnedPromise.then(function(response) {
        result = response;
      });
      $httpBackend.flush();
      expect(result.data.success).toEqual(returnData.success);
    });
  });
  //onePerk
  describe('One Perk', function() {
    var $httpBackend;
    var perkId = '3';
    beforeEach(inject(function($injector) {
      // Set up the mock http service responses
      $httpBackend = $injector.get('$httpBackend');
      $httpBackend.when('GET', 'http://apistaging.sponzor.me/perks/'+perkId).respond(200, {
      "data": {
        "perk": {
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
    it('A perk.', function() {
      var returnData = {
        "data": {
          "perk": {
            "id": "3",
            "title": "Dancing",
            "body": "All About the Bussines!",
            "lang": "en",
            "events": [],
          }
        }
      };
      var returnedPromise = perkRequest.onePerk(perkId);
      var result;
      returnedPromise.then(function(response) {
        result = response;
      });
      $httpBackend.flush();
      expect(result.data.data.perk.id).toEqual(perkId);
    });
  });
  //createPerk
  describe('create Perk', function() {
    var $httpBackend;
    var perk = {
      "title": "Test",
      "body": "test",
      "lang": "123"};
    beforeEach(inject(function($injector) {
      // Set up the mock http service responses
      $httpBackend = $injector.get('$httpBackend');
      $httpBackend.when('POST', 'http://apistaging.sponzor.me/perks').respond(200, {
        "message": "Inserted",
        "perk": {
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
    it('Create Perk.', function() {
      var returnData = {
        "message": "Inserted",
        "perk": {
          "title": "Test",
          "body": "test",
          "lang": "123",
          "id": 15
        }
      };
      var returnedPromise = perkRequest.createPerk(perk);
      var result;
      returnedPromise.then(function(response) {
        result = response;
      });
      $httpBackend.flush();
      expect(result.data.message).toEqual(returnData.message);
    });
  });
  //deletePerk
  describe('Delete Perk', function() {
    var $httpBackend;
    var perkId = '15';
    beforeEach(inject(function($injector) {
      // Set up the mock http service responses
      $httpBackend = $injector.get('$httpBackend');
      $httpBackend.when('DELETE', 'http://apistaging.sponzor.me/perks/'+perkId).respond(200, {
        "message": "Deleted"
      })
    }));
    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });
    it('Delete Perk.', function() {
      var returnData = {"message": "Deleted"};
      var returnedPromise = perkRequest.deletePerk(perkId);
      var result;
      returnedPromise.then(function(response) {
        result = response;
      });
      $httpBackend.flush();
      expect(result.data.message).toEqual(returnData.message);
    });
  });
  //editPerkPatch
  describe('Edit Perk PATCH', function() {
    var $httpBackend;
    var perkId = '15';
    var perk = {
      "title": "Test",
      "body": "test",
      "lang": "123"};
    beforeEach(inject(function($injector) {
      // Set up the mock http service responses
      $httpBackend = $injector.get('$httpBackend');
      $httpBackend.when('PATCH', 'http://apistaging.sponzor.me/perks/'+perkId).respond(200, {
        "message": "Updated",
        "warnings": [],
        "perk": {
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
    it('Edit Perk PATCH', function() {
      var returnData = {
        "message": "Updated",
        "warnings": [],
        "perk": {
          "id": "15",
          "title": "Test",
          "body": "test",
          "lang": "123"
        }
      };
      var returnedPromise = perkRequest.editPerkPatch(perkId, perk);
      var result;
      returnedPromise.then(function(response) {
        result = response;
      });
      $httpBackend.flush();
      expect(result.data.message).toEqual(returnData.message);
    });
  });
  //editPerkPut
  describe('Edit Perk PUT', function() {
    var $httpBackend;
    var perkId = '15';
    var perk = {
      "title": "Test",
      "body": "test",
      "lang": "123"};
    beforeEach(inject(function($injector) {
      // Set up the mock http service responses
      $httpBackend = $injector.get('$httpBackend');
      $httpBackend.when('PUT', 'http://apistaging.sponzor.me/perks/'+perkId).respond(200, {
        "message": "Updated",
        "warnings": [],
        "perk": {
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
    it('Edit Perk PUT', function() {
      var returnData = {
        "message": "Updated",
        "warnings": [],
        "perk": {
          "id": "15",
          "title": "Test",
          "body": "test",
          "lang": "123"
        }
      };
      var returnedPromise = perkRequest.editPerkPut(perkId, perk);
      var result;
      returnedPromise.then(function(response) {
        result = response;
      });
      $httpBackend.flush();
      expect(result.data.message).toEqual(returnData.message);
    });
  });
});
