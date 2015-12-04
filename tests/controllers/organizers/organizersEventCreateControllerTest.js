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

});
