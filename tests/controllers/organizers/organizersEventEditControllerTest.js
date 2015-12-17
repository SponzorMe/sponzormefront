describe("Organizers Event Edit Controller test", function(){
  var createController, httpBackend, scope, $location, $localStorage, $routeParams;
  beforeEach(module('sponzorme'));
  beforeEach(inject(function($rootScope, $httpBackend, $controller, _$location_, _$localStorage_, _$routeParams_){
    httpBackend = $httpBackend;
    $location = _$location_;
    $localStorage = _$localStorage_;
    $routeParams = _$routeParams_;
    scope =  $rootScope.$new();
    createController = function(){
      return $controller('OrganizersEventEditController',{
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
<<<<<<< HEAD
    httpBackend.when('GET', 'http://api.sponzor.me/categories').respond(200, {
      "success": true,
      "categories": [{a:"a"},{a:"a"},{a:"a"},{a:"a"}]
    });
    httpBackend.when('GET', 'http://api.sponzor.me/event_types').respond(200, {
=======
    httpBackend.when('GET', apiUrl+'categories').respond(200, {
      "success": true,
      "categories": [{a:"a"},{a:"a"},{a:"a"},{a:"a"}]
    });
    httpBackend.when('GET', apiUrl+'event_types').respond(200, {
>>>>>>> gh-pages
      "success": true,
      "eventTypes": [{a:"a"},{a:"a"},{a:"a"},{a:"a"}]
    });
  }));
  afterEach(function(){
    httpBackend.verifyNoOutstandingExpectation();
    httpBackend.verifyNoOutstandingRequest();
  });
  it("Should be vars Initialization", function(){
<<<<<<< HEAD
    httpBackend.when('GET', 'http://api.sponzor.me/events/'+1).respond(400, {
=======
    httpBackend.when('GET', apiUrl+'events/'+1).respond(400, {
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
    $routeParams.id = 1;
    var controller = createController();
    httpBackend.flush();
    expect(scope.categorias.list.length).toBe(4);
    expect(scope.type.list.length).toBe(4);
  });
  it("Should be error displaying the edit form", function(){
<<<<<<< HEAD
    httpBackend.when('GET', 'http://api.sponzor.me/events/'+1).respond(400, {
=======
    httpBackend.when('GET', apiUrl+'events/'+1).respond(400, {
>>>>>>> gh-pages
    "data": {
      "event": {
        "id": "3",
        "title": "Dancing",
        "body": "All About the Bussines!",
        "lang": "en",
        "events": []
      },
      "category":[{'id':1}],
      "type":[{'id':1}]
    }
    });
    var eventId = 1;
    $routeParams.id = eventId;
    var controller = createController();
    httpBackend.flush();
    expect(scope.message).toEqual('errorNotEventInfoGot');
  });
  it("Should be ok displaying the edit form", function(){
<<<<<<< HEAD
    httpBackend.when('GET', 'http://api.sponzor.me/events/'+1).respond(200, {
=======
    httpBackend.when('GET', apiUrl+'events/'+1).respond(200, {
>>>>>>> gh-pages
    "data": {
      "event": {
        "id": "1",
        "title": "Dancing",
        "body": "All About the Bussines!",
        "lang": "en"
      },
      "category":[{'id':1}],
      "type":[{'id':1}]
    }
    });
    var eventId = 1;
    $routeParams.id = eventId;
    var controller = createController();
    httpBackend.flush();
    expect(scope.eventData.id).toEqual('1');
  });
  it("Should be ok editing an event", function(){
<<<<<<< HEAD
    httpBackend.when('PATCH', 'http://api.sponzor.me/perks').respond(200, {
=======
    httpBackend.when('PATCH', apiUrl+'perks').respond(200, {
>>>>>>> gh-pages
      "message": "Updated",
      "perk": {
        "title": "Test",
        "body": "test",
        "lang": "123",
        "id": 15
      }
    });
<<<<<<< HEAD
    httpBackend.when('PATCH', 'http://api.sponzor.me/events/'+1).respond(200, {
=======
    httpBackend.when('PATCH', apiUrl+'events/'+1).respond(200, {
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
<<<<<<< HEAD
    httpBackend.when('GET', 'http://api.sponzor.me/events/'+1).respond(400, {
=======
    httpBackend.when('GET', apiUrl+'events/'+1).respond(400, {
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
    var eventId = 1;
    $routeParams.id = eventId;
    var controller = createController();
    scope.eventData = {
      starts: new Date().getTime(),
      ends: new Date().getTime()
    };
    scope.doEditEvent(1);
    httpBackend.flush();
    expect(scope.message).toBe('eventEditedSuccesfully');

  });
  it("Should be not event info found", function(){
<<<<<<< HEAD
    httpBackend.when('PATCH', 'http://api.sponzor.me/perks').respond(200, {
=======
    httpBackend.when('PATCH', apiUrl+'perks').respond(200, {
>>>>>>> gh-pages
      "message": "Updated",
      "perk": {
        "title": "Test",
        "body": "test",
        "lang": "123",
        "id": 15
      }
    });
<<<<<<< HEAD
    httpBackend.when('PATCH', 'http://api.sponzor.me/events/'+1).respond(400, {
=======
    httpBackend.when('PATCH', apiUrl+'events/'+1).respond(400, {
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
<<<<<<< HEAD
    httpBackend.when('GET', 'http://api.sponzor.me/events/'+1).respond(200, {
=======
    httpBackend.when('GET', apiUrl+'events/'+1).respond(200, {
>>>>>>> gh-pages
    "data": {
      "event": {
        "id": "1",
        "title": "Dancing",
        "body": "All About the Bussines!",
        "lang": "en"
      },
      "category":[{'id':1}],
      "type":[{'id':1}]
    }});
    var eventId = 1;
    $routeParams.id = eventId;
    var controller = createController();
    scope.eventData = {
      starts: new Date().getTime(),
      ends: new Date().getTime()
    };
    scope.doEditEvent(1);
    httpBackend.flush();
    expect(scope.message).not.toBeDefined;
  });

});
