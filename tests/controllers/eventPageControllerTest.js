describe("EventPageController Tests", function(){
  var createController, httpBackend, scope, $location, $localStorage, $routeParams;
  beforeEach(module('sponzorme'));
  beforeEach(inject(function($rootScope, $httpBackend, $controller, _$location_, _$localStorage_, _$routeParams_){
    httpBackend = $httpBackend;
    $location = _$location_;
    $localStorage = _$localStorage_;
    $routeParams = _$routeParams_
    scope =  $rootScope.$new();
    createController = function(eventId) {
            return $controller('EventPageController', {
                '$scope': scope,
                $routeParams: {eventId: eventId}
            });
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
    httpBackend.when('POST', 'http://apistaging.sponzor.me/sponzorship_email_organizer').respond(200, {
      "message": "Updated",
      "warnings": [],
      "sponzorship": {
        "id": "15",
        "title": "Test",
        "body": "test",
        "lang": "123"
      }
    });
    var eventId = '1';
    httpBackend.when('GET', 'http://apistaging.sponzor.me/events/'+eventId).respond(200, {
      "data": {
        "event": {
          "id": "1",
          "title": "Dancing",
          "body": "All About the Bussines!",
          "lang": "en",
          "events": []
        },
        "organizer": [{
          "id": "1003",
          "name": "Organizer Sponzorme",
          "email": "organizer@sponzor.me",
          "activated": "1"
        }]
      }
    });
  }));
  afterEach(function(){
    httpBackend.verifyNoOutstandingExpectation();
    httpBackend.verifyNoOutstandingRequest();
  });
  it("Should be an Organizer Logged", function(){
    $localStorage.typesponzorme = '0' //it is an organizer
    $localStorage.startDate = new Date();//Should be logged from now
    var controller = createController(1);
    httpBackend.flush();
    expect(scope.isSponzor).toEqual(false);
    expect(scope.isNoLogged).toEqual(false);

  });
  it("Should be an Organizer No Logged", function(){
    $localStorage.typesponzorme = '0' //it is an organizer
    $localStorage.startDate = new Date();//Should be No logged from now
    var timer = parseInt(4 * 24 * 60 * 60 * 1000);
    $localStorage.startDate = new Date($localStorage.startDate.getTime() - timer);
    var controller = createController(1);
    httpBackend.flush();
    expect(scope.isSponzor).toEqual(false);
    expect(scope.isNoLogged).toEqual(true);

  });
  it("Should Be an Sponzor Logged", function(){
    $localStorage.typesponzorme = '1' //it is an Sponzor
    $localStorage.startDate = new Date();//Should be logged from now
    var controller = createController(1);
    expect(scope.isSponzor).toEqual(true);
    expect(scope.isNoLogged).toEqual(false);
    httpBackend.flush();
  });
  it("Should Be an Sponzor No Logged", function(){
    $localStorage.typesponzorme = 1 //it is an Sponzor
    $localStorage.startDate = new Date();//Should No be logged from now
    var timer = parseInt(4 * 24 * 60 * 60 * 1000);
    $localStorage.startDate = new Date($localStorage.startDate.getTime() - timer);
    var controller = createController(1);
    expect(scope.isSponzor).toEqual(false);
    expect(scope.isNoLogged).toEqual(true);
    httpBackend.flush();
  });
  it("Should be a form to set the cause", function(){
    httpBackend.when('GET', 'views/templates/formCreateSponzorship.html').respond(200, {
      "message": "ok"
    });
    $localStorage.typesponzorme = '1' //it is an Sponzor
    $localStorage.startDate = new Date();//Should be logged from now
    var controller = createController(1);
    expect(scope.isSponzor).toEqual(true);
    expect(scope.isNoLogged).toEqual(false);
    var perk = {'event_id':1};
    scope.formCreateSponzorship(perk);
    httpBackend.flush();
    expect(scope.perkToSponzor).toEqual(perk);
  });
  it("Should Be a Succesfuly Sponzorship", function(){
    httpBackend.when('POST', 'http://apistaging.sponzor.me/sponzorships').respond(200, {
      "message": "Inserted",
      "sponzorship": {
        "title": "Test",
        "body": "test",
        "lang": "123",
        "id": 15
      }
    });
    var perkId = 1;
    httpBackend.when('GET', 'http://apistaging.sponzor.me/perks/'+perkId).respond(200, {
    "data": {
      "perk": {
        "id": "3",
        "title": "Dancing",
        "body": "All About the Bussines!",
        "lang": "en",
        "events": []
      },
      "Tasks":[]
    }
    });
    $localStorage.typesponzorme = '1' //it is an Sponzor
    $localStorage.startDate = new Date();//Should be logged from now
    var controller = createController(1);
    expect(scope.isSponzor).toEqual(true);
    expect(scope.isNoLogged).toEqual(false);
    $localStorage.id= 1;
    scope.currentOrganizer = 1;
    scope.perkToSponzor={
      id: perkId,
      id_event: 1,
      cause: "test"
    }
    scope.createSponzorship();
    httpBackend.flush();
    expect(scope.message).toEqual('sponzorshipCreatedSuccesfuly');
  });
  it("Should Be No Succesfuly Sponzorship", function(){
    httpBackend.when('POST', 'http://apistaging.sponzor.me/sponzorships').respond(400, {
      "message": "Inserted",
      "sponzorship": {
        "title": "Test",
        "body": "test",
        "lang": "123",
        "id": 15
      }
    });
    var perkId = 1;
    httpBackend.when('GET', 'http://apistaging.sponzor.me/perks/'+perkId).respond(200, {
    "data": {
      "perk": {
        "id": "3",
        "title": "Dancing",
        "body": "All About the Bussines!",
        "lang": "en",
        "events": []
      },
      "Tasks":[]
    }
    });
    $localStorage.typesponzorme = '1' //it is an Sponzor
    $localStorage.startDate = new Date();//Should be logged from now
    var controller = createController(1);
    expect(scope.isSponzor).toEqual(true);
    expect(scope.isNoLogged).toEqual(false);
    $localStorage.id= 1;
    scope.currentOrganizer = 1;
    scope.perkToSponzor={
      id: perkId,
      id_event: 1,
      cause: "test"
    }
    scope.createSponzorship();
    httpBackend.flush();
    expect(scope.message).toEqual('eventPageErrorSponzoringEvent');
  });
  it("Should Be No Succesfuly Sponzorship", function(){
    httpBackend.when('POST', 'http://apistaging.sponzor.me/sponzorships').respond(200, {
      "message": "Inserted",
      "sponzorship": {
        "title": "Test",
        "body": "test",
        "lang": "123",
        "id": 15
      }
    });
    var perkId = 1;
    httpBackend.when('GET', 'http://apistaging.sponzor.me/perks/'+perkId).respond(400, {
    "data": {
      "perk": {
        "id": "3",
        "title": "Dancing",
        "body": "All About the Bussines!",
        "lang": "en",
        "events": []
      },
      "Tasks":[]
    }
    });
    $localStorage.typesponzorme = '1' //it is an Sponzor
    $localStorage.startDate = new Date();//Should be logged from now
    var controller = createController(1);
    expect(scope.isSponzor).toEqual(true);
    expect(scope.isNoLogged).toEqual(false);
    $localStorage.id= 1;
    scope.currentOrganizer = 1;
    scope.perkToSponzor={
      id: perkId,
      id_event: 1,
      cause: "test"
    }
    scope.createSponzorship();
    httpBackend.flush();
    expect(scope.message).toEqual('eventPageErrorSponzoringEvent');
  });
});
