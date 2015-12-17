describe("EventType Service Unit Tests", function() {

  beforeEach(function() {
    module('sponzorme');
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
<<<<<<< HEAD
      $httpBackend.when('GET', 'http://api.sponzor.me/event_types').respond(200, {
=======
      $httpBackend.when('GET', apiUrl+'event_types').respond(200, {
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
<<<<<<< HEAD
      $httpBackend.when('GET', 'http://api.sponzor.me/event_types/'+eventTypeId).respond(200, {
=======
      $httpBackend.when('GET', apiUrl+'event_types/'+eventTypeId).respond(200, {
>>>>>>> gh-pages
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
<<<<<<< HEAD
      $httpBackend.when('POST', 'http://api.sponzor.me/event_types').respond(200, {
=======
      $httpBackend.when('POST', apiUrl+'event_types').respond(200, {
>>>>>>> gh-pages
        "message": "Inserted",
        "eventType": {
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
<<<<<<< HEAD
      $httpBackend.when('DELETE', 'http://api.sponzor.me/event_types/'+eventTypeId).respond(200, {
=======
      $httpBackend.when('DELETE', apiUrl+'event_types/'+eventTypeId).respond(200, {
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
<<<<<<< HEAD
      $httpBackend.when('PATCH', 'http://api.sponzor.me/event_types/'+eventTypeId).respond(200, {
=======
      $httpBackend.when('PATCH', apiUrl+'event_types/'+eventTypeId).respond(200, {
>>>>>>> gh-pages
        "message": "Updated",
        "warnings": [],
        "eventType": {
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
<<<<<<< HEAD
      $httpBackend.when('PUT', 'http://api.sponzor.me/event_types/'+eventTypeId).respond(200, {
=======
      $httpBackend.when('PUT', apiUrl+'event_types/'+eventTypeId).respond(200, {
>>>>>>> gh-pages
        "message": "Updated",
        "warnings": [],
        "eventType": {
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
