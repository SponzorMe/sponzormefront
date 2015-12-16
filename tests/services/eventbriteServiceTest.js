describe("Evenbtbrite Tests", function() {

  beforeEach(function() {
    module('sponzorme');
  });

  var eventbriteRequest;

  var httpBackend = null;

  beforeEach(inject(function(_eventbriteRequest_) {
    eventbriteRequest = _eventbriteRequest_;
  }));
  //Test all owned events
  describe('Test Eventbrite', function() {

    var $httpBackend;

    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });
    it('Testing.', function() {
      var token='123';
      inject(function($injector) {
        // Set up the mock http service responses
        $httpBackend = $injector.get('$httpBackend');
        $httpBackend.when('GET', 'https://www.eventbriteapi.com/v3/users/me/owned_events/?token=' + token).respond(200, {
          responseData: Object, responseDetails: null, responseStatus: 200
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
      })
      var returnData = {
        responseData: Object, responseDetails: null, responseStatus: 200
      };
      var returnedPromise = eventbriteRequest.getEventbriteEvents(token);
      var result;
      returnedPromise.then(function(response) {
        result = response;
      });
      $httpBackend.flush();
      expect(result.data.responseStatus).toEqual(returnData.responseStatus);
    });
  });

  //Test Auth with eventbrite
  describe('Test Eventbrite', function() {

    var $httpBackend;

    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });
    it('Testing.', function() {
      var code='123';
      inject(function($injector) {
        // Set up the mock http service responses
        $httpBackend = $injector.get('$httpBackend');
        $httpBackend.when('GET', 'https://apistaging.sponzor.me/token/eventbrite/' + code).respond(200, {
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
      })
      var returnData = {
        success: true
      };
      var returnedPromise = eventbriteRequest.getEventbriteAuth(code);
      var result;
      returnedPromise.then(function(response) {
        result = response;
      });
      $httpBackend.flush();
      expect(result.data.success).toEqual(returnData.success);
    });
  });

  //Test get Eventbrite event
  describe('Test get Eventbrite event', function() {

    var $httpBackend;

    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });
    it('Testing.', function() {
      var url='https://www.eventbriteapi.com/v3/users/me/owned_events/';
      var token='123';
      inject(function($injector) {
        // Set up the mock http service responses
        $httpBackend = $injector.get('$httpBackend');
        $httpBackend.when('GET', url+'?token='+token).respond(200, {
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
      })
      var returnData = {
        success: true
      };
      var returnedPromise = eventbriteRequest.getEventbriteEvent(url,token);
      var result;
      returnedPromise.then(function(response) {
        result = response;
      });
      $httpBackend.flush();
      expect(result.data.success).toEqual(returnData.success);
    });
  });
});
