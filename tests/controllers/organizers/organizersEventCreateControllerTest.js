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
    httpBackend.when('GET', 'http://apistaging.sponzor.me/categories').respond(200, {
      "success": true,
      "categories": [{a:"a"},{a:"a"},{a:"a"},{a:"a"}]
    });
    httpBackend.when('GET', 'http://apistaging.sponzor.me/event_types').respond(200, {
      "success": true,
      "eventTypes": [{a:"a"},{a:"a"},{a:"a"},{a:"a"}]
    });
    httpBackend.when('GET', 'views/templates/importEventbriteDialog.html').respond(200, {
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

    httpBackend.when('POST', 'http://apistaging.sponzor.me/events').respond(400, {
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
    httpBackend.when('POST', 'http://apistaging.sponzor.me/events').respond(200, {
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
    /*httpBackend.when('GET', 'https://www.eventbriteapi.com/v3/users/me/owned_events/?token=' + token).respond(200, {
      responseData: Object, responseDetails: null, responseStatus: 200
    });*/
    httpBackend.when('GET', 'http://apistaging.sponzor.me/token/eventbrite/' + eventBriteCode).respond(200, {
      "success": true,
      "response": '{"error_description":"code is invalid or expired","error":"invalid_grant"}'
    });
    /*httpBackend.when('GET', url+'?token='+token).respond(200, {
      "success": true
    });*/
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
    httpBackend.when('GET', 'http://apistaging.sponzor.me/token/eventbrite/' + eventBriteCode).respond(200, {
      "success": true,
      "response": '{"access_token":"12343241"}'
    });
    /*httpBackend.when('GET', url+'?token='+token).respond(200, {
      "success": true
    });*/
    $routeParams.eventBriteCode = eventBriteCode;
    var controller = createController();
    httpBackend.flush();
    expect($localStorage.eventBriteBeared).toEqual($routeParams.eventBriteCode);
  });

  it("Should be a conection valid and conection eventbrite", function(){
    var eventBriteCode = "12343241";
    var token = "12343241";
    $localStorage.eventBriteBeared = "";
    httpBackend.when('GET', 'https://www.eventbriteapi.com/v3/users/me/owned_events/?token=' + token).respond(200, {
      events:[{"title":"1234"},{"title":"12345"}]
    });
    httpBackend.when('GET', 'http://apistaging.sponzor.me/token/eventbrite/' + eventBriteCode).respond(200, {
      "success": true,
      "response": '{"access_token":"12343241"}'
    });
    /*httpBackend.when('GET', url+'?token='+token).respond(200, {
      "success": true
    });*/
    $routeParams.eventBriteCode = eventBriteCode;
    var controller = createController();
    httpBackend.flush();
    expect($localStorage.eventBriteBeared).toEqual($routeParams.eventBriteCode);
    expect(scope.loadingGetEvents).toEqual(false);
    expect(scope.evenbriteEvents.length).toEqual(2);
  });

  it("Should be a conection invalid with eventbrite", function(){
    var eventBriteCode = "12343241";
    $localStorage.eventBriteBeared = "";
    /*httpBackend.when('GET', 'https://www.eventbriteapi.com/v3/users/me/owned_events/?token=' + token).respond(200, {
      responseData: Object, responseDetails: null, responseStatus: 200
    });*/
    httpBackend.when('GET', 'http://apistaging.sponzor.me/token/eventbrite/' + eventBriteCode).respond(200, {
      "success": true,
      "response": '{"error_description":"code is invalid or expired","error":"invalid_grant"}'
    });
    /*httpBackend.when('GET', url+'?token='+token).respond(200, {
      "success": true
    });*/
    $routeParams.eventBriteCode = eventBriteCode;
    var controller = createController();
    httpBackend.flush();
    expect(scope.loadingGetToken).toEqual(false);
    expect(scope.reconnectEventbrite).toEqual(true);
    expect(scope.conectionDone).toEqual(false);
  });



});
