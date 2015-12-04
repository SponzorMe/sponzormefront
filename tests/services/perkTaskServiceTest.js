describe("PerkTask Service Unit Tests", function() {

  beforeEach(function() {
    module('perkTaskService');
  });

  var perkTaskRequest;

  var httpBackend = null;

  beforeEach(inject(function(_perkTaskRequest_) {
    perkTaskRequest = _perkTaskRequest_;
  }));
  //allPerkTasks
  describe('All Perk tasks', function() {

    var $httpBackend;
    var token;

    beforeEach(inject(function($injector) {
      // Set up the mock http service responses
      $httpBackend = $injector.get('$httpBackend');
      $httpBackend.when('GET', 'http://api.sponzor.me/perk_tasks').respond(200, {
        "success": true
      });
    }));

    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });
    it('All perk_tasks.', function() {
      var returnData = {
        "success": true
      };
      var returnedPromise = perkTaskRequest.allPerkTasks();
      var result;
      returnedPromise.then(function(response) {
        result = response;
      });
      $httpBackend.flush();
      expect(result.data.success).toEqual(returnData.success);
    });
  });
  //onePerkTask
  describe('One PerkTask', function() {
    var $httpBackend;
    var perkTaskId = '3';
    beforeEach(inject(function($injector) {
      // Set up the mock http service responses
      $httpBackend = $injector.get('$httpBackend');
      $httpBackend.when('GET', 'http://api.sponzor.me/perk_tasks/'+perkTaskId).respond(200, {
      "data": {
        "perkTask": {
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
    it('A perkTask.', function() {
      var returnData = {
        "data": {
          "perkTask": {
            "id": "3",
            "title": "Dancing",
            "body": "All About the Bussines!",
            "lang": "en",
            "events": [],
          }
        }
      };
      var returnedPromise = perkTaskRequest.onePerkTask(perkTaskId);
      var result;
      returnedPromise.then(function(response) {
        result = response;
      });
      $httpBackend.flush();
      expect(result.data.data.perkTask.id).toEqual(perkTaskId);
    });
  });
  //createPerkTask
  describe('create PerkTask', function() {
    var $httpBackend;
    var perkTask = {
      "title": "Test",
      "body": "test",
      "lang": "123"};
    beforeEach(inject(function($injector) {
      // Set up the mock http service responses
      $httpBackend = $injector.get('$httpBackend');
      $httpBackend.when('POST', 'http://api.sponzor.me/perk_tasks').respond(200, {
        "message": "Inserted",
        "perkTask": {
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
    it('Create PerkTask.', function() {
      var returnData = {
        "message": "Inserted",
        "perkTask": {
          "title": "Test",
          "body": "test",
          "lang": "123",
          "id": 15
        }
      };
      var returnedPromise = perkTaskRequest.createPerkTask(perkTask);
      var result;
      returnedPromise.then(function(response) {
        result = response;
      });
      $httpBackend.flush();
      expect(result.data.message).toEqual(returnData.message);
    });
  });
  //deletePerkTask
  describe('Delete PerkTask', function() {
    var $httpBackend;
    var perkTaskId = '15';
    beforeEach(inject(function($injector) {
      // Set up the mock http service responses
      $httpBackend = $injector.get('$httpBackend');
      $httpBackend.when('DELETE', 'http://api.sponzor.me/perk_tasks/'+perkTaskId).respond(200, {
        "message": "Deleted"
      })
    }));
    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });
    it('Delete PerkTask.', function() {
      var returnData = {"message": "Deleted"};
      var returnedPromise = perkTaskRequest.deletePerkTask(perkTaskId);
      var result;
      returnedPromise.then(function(response) {
        result = response;
      });
      $httpBackend.flush();
      expect(result.data.message).toEqual(returnData.message);
    });
  });
  //editPerkTaskPatch
  describe('Edit PerkTask PATCH', function() {
    var $httpBackend;
    var perkTaskId = '15';
    var perkTask = {
      "title": "Test",
      "body": "test",
      "lang": "123"};
    beforeEach(inject(function($injector) {
      // Set up the mock http service responses
      $httpBackend = $injector.get('$httpBackend');
      $httpBackend.when('PATCH', 'http://api.sponzor.me/perk_tasks/'+perkTaskId).respond(200, {
        "message": "Updated",
        "warnings": [],
        "perkTask": {
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
    it('Edit PerkTask PATCH', function() {
      var returnData = {
        "message": "Updated",
        "warnings": [],
        "perkTask": {
          "id": "15",
          "title": "Test",
          "body": "test",
          "lang": "123"
        }
      };
      var returnedPromise = perkTaskRequest.editPerkTaskPatch(perkTaskId, perkTask);
      var result;
      returnedPromise.then(function(response) {
        result = response;
      });
      $httpBackend.flush();
      expect(result.data.message).toEqual(returnData.message);
    });
  });
  //editPerkTaskPut
  describe('Edit PerkTask PUT', function() {
    var $httpBackend;
    var perkTaskId = '15';
    var perkTask = {
      "title": "Test",
      "body": "test",
      "lang": "123"};
    beforeEach(inject(function($injector) {
      // Set up the mock http service responses
      $httpBackend = $injector.get('$httpBackend');
      $httpBackend.when('PUT', 'http://api.sponzor.me/perk_tasks/'+perkTaskId).respond(200, {
        "message": "Updated",
        "warnings": [],
        "perkTask": {
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
    it('Edit PerkTask PUT', function() {
      var returnData = {
        "message": "Updated",
        "warnings": [],
        "perkTask": {
          "id": "15",
          "title": "Test",
          "body": "test",
          "lang": "123"
        }
      };
      var returnedPromise = perkTaskRequest.editPerkTaskPut(perkTaskId, perkTask);
      var result;
      returnedPromise.then(function(response) {
        result = response;
      });
      $httpBackend.flush();
      expect(result.data.message).toEqual(returnData.message);
    });
  });
});
