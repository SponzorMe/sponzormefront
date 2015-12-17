describe("event Service Unit Tests", function() {

  beforeEach(function() {
    module('sponzorme');
  });

  var eventRequest;

  var httpBackend = null;

  beforeEach(inject(function(_eventRequest_) {
    eventRequest = _eventRequest_;
  }));
  //allevents
  describe('All events', function() {

    var $httpBackend;
    var token;

    beforeEach(inject(function($injector) {
      // Set up the mock http service responses
      $httpBackend = $injector.get('$httpBackend');
<<<<<<< HEAD
      $httpBackend.when('GET', 'http://api.sponzor.me/events').respond(200, {
=======
      $httpBackend.when('GET', apiUrl+'events').respond(200, {
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
    it('All events.', function() {
      var returnData = {
        "success": true
      };
      var returnedPromise = eventRequest.allEvents();
      var result;
      returnedPromise.then(function(response) {
        result = response;
      });
      $httpBackend.flush();
      expect(result.data.success).toEqual(returnData.success);
    });
  });
  //oneevent
  describe('One event', function() {
    var $httpBackend;
    var eventId = '3';
    beforeEach(inject(function($injector) {
      // Set up the mock http service responses
      $httpBackend = $injector.get('$httpBackend');
<<<<<<< HEAD
      $httpBackend.when('GET', 'http://api.sponzor.me/events/'+eventId).respond(200, {
=======
      $httpBackend.when('GET', apiUrl+'events/'+eventId).respond(200, {
>>>>>>> gh-pages
      "data": {
        "event": {
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
    it('A event.', function() {
      var returnData = {
        "data": {
          "event": {
            "id": "3",
            "title": "Dancing",
            "body": "All About the Bussines!",
            "lang": "en",
            "events": [],
          }
        }
      };
      var returnedPromise = eventRequest.oneEvent(eventId);
      var result;
      returnedPromise.then(function(response) {
        result = response;
      });
      $httpBackend.flush();
      expect(result.data.data.event.id).toEqual(eventId);
    });
  });
  //createevent
  describe('create event', function() {
    var $httpBackend;
    var event = {
      "title": "Test",
      "body": "test",
      "lang": "123"};
    beforeEach(inject(function($injector) {
      // Set up the mock http service responses
      $httpBackend = $injector.get('$httpBackend');
<<<<<<< HEAD
      $httpBackend.when('POST', 'http://api.sponzor.me/events').respond(200, {
=======
      $httpBackend.when('POST', apiUrl+'events').respond(200, {
>>>>>>> gh-pages
        "message": "Inserted",
        "event": {
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
    it('Create event.', function() {
      var returnData = {
        "message": "Inserted",
        "event": {
          "title": "Test",
          "body": "test",
          "lang": "123",
          "id": 15
        }
      };
      var returnedPromise = eventRequest.createEvent(event);
      var result;
      returnedPromise.then(function(response) {
        result = response;
      });
      $httpBackend.flush();
      expect(result.data.message).toEqual(returnData.message);
    });
  });
  //deleteevent
  describe('Delete event', function() {
    var $httpBackend;
    var eventId = '15';
    beforeEach(inject(function($injector) {
      // Set up the mock http service responses
      $httpBackend = $injector.get('$httpBackend');
<<<<<<< HEAD
      $httpBackend.when('DELETE', 'http://api.sponzor.me/events/'+eventId).respond(200, {
=======
      $httpBackend.when('DELETE', apiUrl+'events/'+eventId).respond(200, {
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
    it('Delete event.', function() {
      var returnData = {"message": "Deleted"};
      var returnedPromise = eventRequest.deleteEvent(eventId);
      var result;
      returnedPromise.then(function(response) {
        result = response;
      });
      $httpBackend.flush();
      expect(result.data.message).toEqual(returnData.message);
    });
  });
  //editeventPatch
  describe('Edit event PATCH', function() {
    var $httpBackend;
    var eventId = '15';
    var event = {
      "title": "Test",
      "body": "test",
      "lang": "123"};
    beforeEach(inject(function($injector) {
      // Set up the mock http service responses
      $httpBackend = $injector.get('$httpBackend');
<<<<<<< HEAD
      $httpBackend.when('PATCH', 'http://api.sponzor.me/events/'+eventId).respond(200, {
=======
      $httpBackend.when('PATCH', apiUrl+'events/'+eventId).respond(200, {
>>>>>>> gh-pages
        "message": "Updated",
        "warnings": [],
        "event": {
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
    it('Edit event PATCH', function() {
      var returnData = {
        "message": "Updated",
        "warnings": [],
        "event": {
          "id": "15",
          "title": "Test",
          "body": "test",
          "lang": "123"
        }
      };
      var returnedPromise = eventRequest.editEventPatch(eventId, event);
      var result;
      returnedPromise.then(function(response) {
        result = response;
      });
      $httpBackend.flush();
      expect(result.data.message).toEqual(returnData.message);
    });
  });
  //editeventPut
  describe('Edit event PUT', function() {
    var $httpBackend;
    var eventId = '15';
    var event = {
      "title": "Test",
      "body": "test",
      "lang": "123"};
    beforeEach(inject(function($injector) {
      // Set up the mock http service responses
      $httpBackend = $injector.get('$httpBackend');
<<<<<<< HEAD
      $httpBackend.when('PUT', 'http://api.sponzor.me/events/'+eventId).respond(200, {
=======
      $httpBackend.when('PUT', apiUrl+'events/'+eventId).respond(200, {
>>>>>>> gh-pages
        "message": "Updated",
        "warnings": [],
        "event": {
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
    it('Edit event PUT', function() {
      var returnData = {
        "message": "Updated",
        "warnings": [],
        "event": {
          "id": "15",
          "title": "Test",
          "body": "test",
          "lang": "123"
        }
      };
      var returnedPromise = eventRequest.editEventPut(eventId, event);
      var result;
      returnedPromise.then(function(response) {
        result = response;
      });
      $httpBackend.flush();
      expect(result.data.message).toEqual(returnData.message);
    });
  });
});
