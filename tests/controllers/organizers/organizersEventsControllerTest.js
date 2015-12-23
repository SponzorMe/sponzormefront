describe("Organizers Events Controller test", function(){
  var createController, httpBackend, scope, $location, $localStorage, $routeParams, $timeout;
  beforeEach(module('sponzorme'));
  beforeEach(inject(function($rootScope, $httpBackend, $controller, _$location_, _$localStorage_, _$routeParams_, _$timeout_){
    httpBackend = $httpBackend;
    $location = _$location_;
    $timeout = _$timeout_;
    $localStorage = _$localStorage_;
    $routeParams = _$routeParams_;
    scope =  $rootScope.$new();
    //LOGIN VARS
    $localStorage.cookiesponzorme = cookiesponzorme;
    $localStorage.email = email;
    $localStorage.id  = id;
    $localStorage.token = token;
    $localStorage.typesponzorme = typeOrganizer;
    $localStorage.startDate = startDate;
    $localStorage.demo = 1;
    createController = function(){
      return $controller('OrganizersEventsController',{
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
    httpBackend.when('GET', apiUrl+'categories').respond(200, {
      "success": true,
      "categories": [{a:"a"},{a:"a"},{a:"a"},{a:"a"}]
    });
    httpBackend.when('GET', apiUrl+'event_types').respond(200, {
      "success": true,
      "eventTypes": [{a:"a"},{a:"a"},{a:"a"},{a:"a"}]
    });
    httpBackend.when('GET', apiUrl+'users/'+1).respond(200, {
      "data": {
        "user": {
          "id": "3",
          "title": "Dancing",
          "body": "All About the Bussines!",
          "lang": "en",
          "events": [{a:"a"},{a:"a"},{a:"a"},{a:"a"}]
        }
      }
    });

    httpBackend.when('GET', apiUrl+'perks/'+1).respond(200, {
      "data": {
        "perk": {
          "id": "3",
          "title": "Dancing",
          "body": "All About the Bussines!",
          "lang": "en"
        },
        "Tasks": [{id:"1"},{id:"2"},{id:"3"},{id:"4"}]
      }
    });
  }));
  afterEach(function(){
    httpBackend.verifyNoOutstandingExpectation();
    httpBackend.verifyNoOutstandingRequest();
  });
  it("Should be vars Initialization", function(){
    httpBackend.when('GET', apiUrl+'events/'+1).respond(200, {
      "data": {
        "event": {
          "id": "1",
          "title": "Dancing",
          "body": "All About the Bussines!",
          "lang": "en",
          "perks": [{id:"1"},{id:"1"},{id:"1"},{id:"1"}],
          "sponzorship": [],
        }
      }
    });
    $localStorage.id = 1;
    var controller = createController();
    httpBackend.flush();
    expect(scope.categorias.list.length).toBe(4);
    expect(scope.type.list.length).toBe(4);
  });
  it("Should be gotten events", function(){
    httpBackend.when('GET', apiUrl+'events/'+1).respond(200, {
      "data": {
        "event": {
          "id": "1",
          "title": "Dancing",
          "body": "All About the Bussines!",
          "lang": "en",
          "perks": [{id:"1"},{id:"1"},{id:"1"},{id:"1"}],
          "sponzorship": [],
        }
      }
    });
    $localStorage.id = 1;
    var controller = createController();
    httpBackend.flush();
    expect(scope.categorias.list.length).toBe(4);
    expect(scope.type.list.length).toBe(4);
    expect(scope.eventos.length).toBe(4);
  });
  it("Should be success callback", function(){
    httpBackend.when('GET', apiUrl+'events/'+1).respond(200, {
      "data": {
        "event": {
          "id": "1",
          "title": "Dancing",
          "body": "All About the Bussines!",
          "lang": "en",
          "perks": [{id:"1"},{id:"1"},{id:"1"},{id:"1"}],
          "sponzorship": [],
        }
      }
    });
    $localStorage.id = 1;
    var controller = createController();
    httpBackend.flush();
    expect(scope.categorias.list.length).toBe(4);
    expect(scope.type.list.length).toBe(4);
    expect(scope.eventos.length).toBe(4);
    scope.updatePerks(1);
    httpBackend.flush();
    expect(scope.currentPerk.Tasks[0].id).toBe('1');
    expect(scope.currentPerk.Tasks[1].id).toBe('2');
    expect(scope.currentPerk.Tasks[2].id).toBe('3');
    expect(scope.currentPerk.Tasks[3].id).toBe('4');
  });
  it("Should be an event delete without sponzorships", function(){
    httpBackend.when('GET', apiUrl+'events/'+1).respond(200, {
      "data": {
        "event": {
          "id": "1",
          "title": "Dancing",
          "body": "All About the Bussines!",
          "lang": "en",
          "perks": [{id:"1"},{id:"1"},{id:"1"},{id:"1"}],
          "sponzorship": [],
        }
      }
    });
    httpBackend.when('DELETE', apiUrl+'perks/'+1).respond(200, {
      "message": "Deleted"
    });
    httpBackend.when('DELETE', apiUrl+'events/'+1).respond(200, {
      "message": "Deleted"
    });
    $localStorage.id = 1;
    var controller = createController();
    httpBackend.flush();
    expect(scope.categorias.list.length).toBe(4);
    expect(scope.type.list.length).toBe(4);
    expect(scope.eventos.length).toBe(4);
    scope.removeEvent(1);
    httpBackend.flush();
    $timeout.flush();
    httpBackend.flush();
    expect(scope.message).toBe('eventDeleteSuccesfully');
  });
  it("Should be an event delete with sponzorships", function(){
    httpBackend.when('GET', apiUrl+'events/'+1).respond(200, {
      "data": {
        "event": {
          "id": "1",
          "title": "Dancing",
          "body": "All About the Bussines!",
          "lang": "en",
          "perks": [{id:"1"},{id:"1"},{id:"1"},{id:"1"}],
          "sponzorship": [{id:"1"},{id:"1"},{id:"1"},{id:"1"}],
        }
      }
    });
    httpBackend.when('DELETE', apiUrl+'perks/'+1).respond(200, {
      "message": "Deleted"
    });
    httpBackend.when('DELETE', apiUrl+'events/'+1).respond(200, {
      "message": "Deleted"
    });
    $localStorage.id = 1;
    var controller = createController();
    httpBackend.flush();
    expect(scope.categorias.list.length).toBe(4);
    expect(scope.type.list.length).toBe(4);
    expect(scope.eventos.length).toBe(4);
    scope.removeEvent(1);
    httpBackend.flush();
    expect(scope.message).toBe('eventDeletingEventHasSponzorship');
  });
});
