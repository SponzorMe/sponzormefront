describe("Organizers Create Event Controller test", function(){
  var createController, httpBackend, scope, $location, $localStorage, $routeParams;
  beforeEach(module('sponzorme'));
  beforeEach(inject(function($rootScope, $httpBackend, $controller, _$location_, _$localStorage_, _$routeParams_){
    httpBackend = $httpBackend;
    $location = _$location_;
    $localStorage = _$localStorage_;
    $routeParams = _$routeParams_;
    scope =  $rootScope.$new();
    createController = function(){
      return $controller('OrganizersEventCreateController',{
        '$scope':scope
      })
    };
    httpBackend.whenGET('langs/lang-en.json').respond(200, {
      "title": 'Sponzorme EN'
    });
    httpBackend.whenGET('langs/lang-pt.json').respond(200, {
      "title": 'Sponzorme PT'
    });
    httpBackend.whenGET('langs/lang-es.json').respond(200, {
      "title": 'Sponzorme ES'
    });
    httpBackend.when('GET', 'views/templates/loadingDialog.html').respond(200, {
      "message": "LOADING"
    });
    httpBackend.when('GET', 'views/templates/errorDialog.html').respond(200, {
      "message": "ERROR"
    });
    httpBackend.when('GET', 'views/templates/successDialog.html').respond(200, {
      "message": "SUCCESS"
    });
    httpBackend.when('GET', 'views/templates/unactivatedAccountDialog.html').respond(200, {
      "message": "UNACTIVATED"
    });
    httpBackend.when('GET', 'templateId').respond(200, {
      "message": "Test"
    });
    httpBackend.when('GET', 'https://apistaging.sponzor.me/categories').respond(200, {
      "success": true,
      "categories": [{a:"a"},{a:"a"},{a:"a"},{a:"a"}]
    });
    httpBackend.when('GET', 'https://apistaging.sponzor.me/event_types').respond(200, {
      "success": true,
      "eventTypes": [{a:"a"},{a:"a"},{a:"a"},{a:"a"}]
    });
    httpBackend.when('GET', 'views/templates/importEventbriteDialog.html').respond(200, {
      "message": "SUCCESS"
    });
    httpBackend.when('GET', 'views/templates/importMeetupDialog.html').respond(200, {
      "message": "SUCCESS"
    });
  }));
  afterEach(function(){
    httpBackend.verifyNoOutstandingExpectation();
    httpBackend.verifyNoOutstandingRequest();
  });
  it("Should be vars Initialization", function(){
    var controller = createController();
    httpBackend.flush();
    expect(scope.categorias.list.length).toBe(4);
    expect(scope.type.list.length).toBe(4);
  });
  it("Should be error creating new event", function(){

    httpBackend.when('POST', 'https://apistaging.sponzor.me/events').respond(400, {
      "message": "Inserted",
      "event": {
        "title": "Test",
        "body": "test",
        "lang": "123",
        "id": 15
      }
    });
    var controller = createController();
    scope.locationevent= {};
    scope.createNewEvent();
    httpBackend.flush();
    expect(scope.message).toEqual('errorCreatingEvent');
  });
  it("should be success creating new event", function(){
    httpBackend.when('POST', 'https://apistaging.sponzor.me/events').respond(200, {
      "message": "Inserted",
      "event": {
        "title": "Test",
        "body": "test",
        "lang": "123",
        "id": 15
      }
    });
    var controller = createController();
    scope.locationevent= {};
    scope.createNewEvent();
    httpBackend.flush();
    expect(scope.message).toEqual('eventCreatedSuccesfully');
  });
  it("Should be a conection invalid with eventbrite", function(){
    var eventBriteCode = "12343241";
    $localStorage.eventBriteBeared = "";
    httpBackend.when('GET', 'https://apistaging.sponzor.me/token/eventbrite/' + eventBriteCode).respond(200, {
      "success": true,
      "response": '{"error_description":"code is invalid or expired","error":"invalid_grant"}'
    });
    $routeParams.eventBriteCode = eventBriteCode;
    var controller = createController();
    httpBackend.flush();
    expect(scope.loadingGetToken).toEqual(false);
    expect(scope.reconnectEventbrite).toEqual(true);
    expect(scope.conectionDone).toEqual(false);
  });
  it("Should be a conection valid with eventbrite", function(){
    var eventBriteCode = "12343241";
    var token = "12343241";
    $localStorage.eventBriteBeared = "";
    httpBackend.when('GET', 'https://www.eventbriteapi.com/v3/users/me/owned_events/?token=' + token).respond(200, {
      responseData: Object, responseDetails: null, responseStatus: 200
    });
    httpBackend.when('GET', 'https://apistaging.sponzor.me/token/eventbrite/' + eventBriteCode).respond(200, {
      "success": true,
      "response": '{"access_token":"12343241"}'
    });
    $routeParams.eventBriteCode = eventBriteCode;
    var controller = createController();
    httpBackend.flush();
    expect($localStorage.eventBriteBeared).toEqual($routeParams.eventBriteCode);
  });

  it("Should be a conection invalid with meetup", function(){
    var meetupCode = "12343241";
    $localStorage.meetupBeared = "";
    httpBackend.when('GET', 'https://apistaging.sponzor.me/token/meetup/' + meetupCode).respond(200, {
      "success": true,
      "response": '{"error_description":"code is invalid or expired","error":"invalid_grant"}'
    });
    $routeParams.meetupCode = meetupCode;
    var controller = createController();
    httpBackend.flush();
    expect(scope.meetupLoadingGetToken).toEqual(false);
    expect(scope.reconnectMeetup).toEqual(true);
    expect(scope.meetupConectionDone).toEqual(false);
  });

  it("Should be a conection valid with meetup", function(){
    var meetupCode = "12343241";
    var token = "12343241";
    $localStorage.meetupBeared = "";
    httpBackend.when('GET', 'https://apistaging.sponzor.me/events/meetup/' + token).respond(200, {
      response:'[{"created":1427845537000,"duration":7200000,"group":{"created":1427845317000,"name":"GDG Medellin (Google Developer Group)"}, "visivility":true}]'
    });
    httpBackend.when('GET', 'https://apistaging.sponzor.me/token/meetup/' + meetupCode).respond(200, {
      "success": true,
      "response": '{"access_token":"12343241"}'
    });
    $routeParams.meetupCode = meetupCode;
    var controller = createController();
    httpBackend.flush();
    expect($localStorage.meetupBeared).toEqual($routeParams.meetupCode);
  });

});
