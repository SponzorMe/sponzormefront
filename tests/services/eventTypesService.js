describe("EventType Service Unit Tests", function() {

  beforeEach(function() {
    module('eventTypeService');
  });

  var eventTypeRequest;

  var httpBackend = null;

  beforeEach(inject(function(_eventTypeRequest_) {
    eventTypeRequest = _eventTypeRequest_;
  }));
  //allEventTypes
  describe('All eventTypes', function() {

    var $httpBackend;
    var token;

    beforeEach(inject(function($injector) {
      // Set up the mock http service responses
      $httpBackend = $injector.get('$httpBackend');
      $httpBackend.when('GET', 'http://apistaging.sponzor.me/event_types').respond(200, {
        "success": true
      });
    }));

    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });
    it('All eventTypes.', function() {
      var returnData = {
        "success": true
      };
      var returnedPromise = eventTypeRequest.allEventTypes();
      var result;
      returnedPromise.then(function(response) {
        result = response;
      });
      $httpBackend.flush();
      expect(result.data.success).toEqual(returnData.success);
    });
  });
  //oneEventType
  describe('One EventType', function() {
    var $httpBackend;
    var eventTypeId = '3';
    beforeEach(inject(function($injector) {
      // Set up the mock http service responses
      $httpBackend = $injector.get('$httpBackend');
      $httpBackend.when('GET', 'http://apistaging.sponzor.me/event_types/'+eventTypeId).respond(200, {
      "data": {
        "eventType": {
          "id": "3",
          "title": "Dancing",
          "body": "All About the Bussines!",
          "lang": "en",
          "eventTypess": []
        }
      }
    });
    }));
    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });
    it('A eventType.', function() {
      var returnData = {
        "data": {
          "eventType": {
            "id": "3",
            "title": "Dancing",
            "body": "All About the Bussines!",
            "lang": "en",
            "eventTypess": [],
          }
        }
      };
      var returnedPromise = eventTypeRequest.oneEventTypes(eventTypeId);
      var result;
      returnedPromise.then(function(response) {
        result = response;
      });
      $httpBackend.flush();
      expect(result.data.data.eventType.id).toEqual(eventTypeId);
    });
  });
  //createEventType
  describe('create EventType', function() {
    var $httpBackend;
    var eventType = {
      "title": "Test",
      "body": "test",
      "lang": "123"};
    beforeEach(inject(function($injector) {
      // Set up the mock http service responses
      $httpBackend = $injector.get('$httpBackend');
      $httpBackend.when('POST', 'http://apistaging.sponzor.me/event_types').respond(200, {
        "message": "Inserted",
        "eventType": {
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
    it('Create EventType.', function() {
      var returnData = {
        "message": "Inserted",
        "eventType": {
          "title": "Test",
          "body": "test",
          "lang": "123",
          "id": 15
        }
      };
      var returnedPromise = eventTypeRequest.createEventType(eventType);
      var result;
      returnedPromise.then(function(response) {
        result = response;
      });
      $httpBackend.flush();
      expect(result.data.message).toEqual(returnData.message);
    });
  });
  //deleteEventType
  describe('Delete EventType', function() {
    var $httpBackend;
    var eventTypeId = '15';
    beforeEach(inject(function($injector) {
      // Set up the mock http service responses
      $httpBackend = $injector.get('$httpBackend');
      $httpBackend.when('DELETE', 'http://apistaging.sponzor.me/event_types/'+eventTypeId).respond(200, {
        "message": "Deleted"
      })
    }));
    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });
    it('Delete EventType.', function() {
      var returnData = {"message": "Deleted"};
      var returnedPromise = eventTypeRequest.deleteEventType(eventTypeId);
      var result;
      returnedPromise.then(function(response) {
        result = response;
      });
      $httpBackend.flush();
      expect(result.data.message).toEqual(returnData.message);
    });
  });
  //editEventTypePatch
  describe('Edit EventType PATCH', function() {
    var $httpBackend;
    var eventTypeId = '15';
    var eventType = {
      "title": "Test",
      "body": "test",
      "lang": "123"};
    beforeEach(inject(function($injector) {
      // Set up the mock http service responses
      $httpBackend = $injector.get('$httpBackend');
      $httpBackend.when('PATCH', 'http://apistaging.sponzor.me/event_types/'+eventTypeId).respond(200, {
        "message": "Updated",
        "warnings": [],
        "eventType": {
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
    it('Edit EventType PATCH', function() {
      var returnData = {
        "message": "Updated",
        "warnings": [],
        "eventType": {
          "id": "15",
          "title": "Test",
          "body": "test",
          "lang": "123"
        }
      };
      var returnedPromise = eventTypeRequest.editEventTypePatch(eventTypeId, eventType);
      var result;
      returnedPromise.then(function(response) {
        result = response;
      });
      $httpBackend.flush();
      expect(result.data.message).toEqual(returnData.message);
    });
  });
  //editEventTypePut
  describe('Edit EventType PUT', function() {
    var $httpBackend;
    var eventTypeId = '15';
    var eventType = {
      "title": "Test",
      "body": "test",
      "lang": "123"};
    beforeEach(inject(function($injector) {
      // Set up the mock http service responses
      $httpBackend = $injector.get('$httpBackend');
      $httpBackend.when('PUT', 'http://apistaging.sponzor.me/event_types/'+eventTypeId).respond(200, {
        "message": "Updated",
        "warnings": [],
        "eventType": {
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
    it('Edit EventType PUT', function() {
      var returnData = {
        "message": "Updated",
        "warnings": [],
        "eventType": {
          "id": "15",
          "title": "Test",
          "body": "test",
          "lang": "123"
        }
      };
      var returnedPromise = eventTypeRequest.editEventTypePut(eventTypeId, eventType);
      var result;
      returnedPromise.then(function(response) {
        result = response;
      });
      $httpBackend.flush();
      expect(result.data.message).toEqual(returnData.message);
    });
  });
});
