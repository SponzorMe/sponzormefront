describe("Sponzors Main Controller test", function(){
  var createController, httpBackend, scope, $location, $localStorage, $routeParams;
  beforeEach(module('sponzorme'));
  beforeEach(inject(function($rootScope, $httpBackend, $controller, _$location_, _$localStorage_, _$routeParams_){
    httpBackend = $httpBackend;
    $location = _$location_;
    $localStorage = _$localStorage_;
    $routeParams = _$routeParams_;
    scope =  $rootScope.$new();
    //LOGIN VARS
    $localStorage.cookiesponzorme = cookiesponzorme;
    $localStorage.email = email;
    $localStorage.id  = id;
    $localStorage.token = token;
    $localStorage.typesponzorme = typeSponzor;
    $localStorage.startDate = startDate;
    $localStorage.demo = 1;
    createController = function(){
      return $controller('SponzorsMainController',{
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
    httpBackend.when('GET', 'views/templates/eventPerksDialog.html').respond(200, {
      "message": "SUCCESS"
    });
    httpBackend.when('GET', 'views/templates/insertCauseForm.html').respond(200, {
      "message": "SUCCESS"
    });
    httpBackend.when('GET', 'views/templates/userInfo.html').respond(200, {
      "message": "SUCCESS"
    });
    httpBackend.when('GET', 'views/templates/unactivatedAccountDialog.html').respond(200, {
      "message": "UNACTIVATED"
    });
    httpBackend.when('GET', 'templateId').respond(200, {
      "message": "Test"
    });
    httpBackend.when('GET', apiUrl+'users/'+1).respond(200, {
      "data": {
        "user": {
          "id": "1",
          "name": "Dancing",
          "body": "All About the Bussines!",
          "lang": "en",
          "email":'test@test.com',
          "events": [{id:"1"},{id:"1"},{id:"1"},{id:"1"}]
        },
        "interests":
          [
            {name:"test1"},{name:"test2"}
          ]
      }
    });
    httpBackend.when('GET', apiUrl+'interests_category').respond(200, {
      "success": true
    });
    httpBackend.when('DELETE', apiUrl+'user_interests/1').respond(200, {
      "message": "Deleted"
    });
    httpBackend.when('POST', apiUrl+'user_interests').respond(200, {
      "message": "Inserted",
      "UserInterest": {
        "name": "Test",
        "id": 15
      }
    });
  }));
  afterEach(function(){
    httpBackend.verifyNoOutstandingExpectation();
    httpBackend.verifyNoOutstandingRequest();
  });
  it("Should be all events gotten", function(){
    httpBackend.when('GET', apiUrl+'events').respond(200, {
      "success": true,
      "events": [
        {
          "id": "1002",
          "title": "My Second Event",
          "location": "Medellin Colombia",
          "ends": "2014-09-30 09:57:00",
          "starts": dataExpDate,
          "location_reference": "referenceafsddf",
          "image": "event_dummy.png",
          "description": "Lorem",
          "category": "1",
          "type": "1",
          "privacy": "0",
          "lang": "en"
        },
        {
          "id": "1003",
          "title": "My Fist Event",
          "location": "Santiago de Chile",
          "ends": "2014-09-18 19:00:00",
          "starts": new Date("2010-00-00T00:00:00"),
          "location_reference": "referenceafsddf",
          "image": "event_dummy.png",
          "description": "Lorem ipsum",
          "category": "1",
          "type": "1",
          "privacy": "0",
          "lang": "en"
        },
        {
          "id": "1004",
          "title": "Ionic 102 - Workshop",
          "location": "Bogota",
          "ends": "2016-01-02 00:00:00",
          "starts": dataExpDate,
          "location_reference": "referencia",
          "image": "http://i.imgur.com/t8YehGM.jpg",
          "description": "Una intro",
          "category": "1",
          "type": "1",
          "privacy": "0",
          "lang": "en"
        }
      ]
    });
    var controller = createController();
    httpBackend.flush();
    expect(scope.search[1].title).toBe("Ionic 102 - Workshop");
  });
  it("Should be all events not gotten", function(){
    httpBackend.when('GET', apiUrl+'events').respond(400, {
      "success": false
    });
    var controller = createController();
    httpBackend.flush();
    expect(scope.message).toBe('canNotGetEvents');
  });
  it("Should be perks event accesible", function(){
    httpBackend.when('GET', apiUrl+'events').respond(200, {
      "success": true,
      "events": [
        {
          "id": "1002",
          "title": "My Second Event",
          "location": "Medellin Colombia",
          "ends": "2014-09-30 09:57:00",
          "starts": dataExpDate,
          "location_reference": "referenceafsddf",
          "image": "event_dummy.png",
          "description": "Lorem",
          "category": "1",
          "type": "1",
          "privacy": "0",
          "lang": "en"
        }
      ]
    });
    httpBackend.when('GET', apiUrl+'events/'+1002).respond(200, {
      "data": {
       "event": {
         "id": "1002",
         "title": "My Second Event",
         "location": "Medellin Colombia",
         "ends": "2014-09-30 09:57:00",
         "starts": "2015-12-31 04:00:00",
         "location_reference": "referenceafsddf",
         "image": "event_dummy.png",
         "description": "Lorem",
         "category": "1",
         "type": "1",
         "privacy": "0",
         "lang": "en",
         "perks": [
           {
             "id": "3",
             "kind": "A",
             "usd": "10",
             "total_quantity": "2",
             "reserved_quantity": "0",
             "id_event": "1002"
           }
         ],
         "perk_tasks": [],
         "sponzor_tasks": []
       },
       "organizer": [
         {
           "id": "1003",
           "name": "Organizer Sponzorme",
           "email": "organizer@sponzor.me",
           "activated": "1",
           "activation_code": "",
           "activated_at": "",
           "last_login": ""
         }
       ]
     }
    });
    var controller = createController();
    httpBackend.flush();
    scope.showPerks(scope.search[0].id);
    httpBackend.flush();
    expect(scope.noPerksMessage).toBe(false);
  });
  it("Should be perks event not accesible", function(){
    httpBackend.when('GET', apiUrl+'events').respond(200, {
      "success": true,
      "events": [
        {
          "id": "1002",
          "title": "My Second Event",
          "location": "Medellin Colombia",
          "ends": "2014-09-30 09:57:00",
          "starts": dataExpDate,
          "location_reference": "referenceafsddf",
          "image": "event_dummy.png",
          "description": "Lorem",
          "category": "1",
          "type": "1",
          "privacy": "0",
          "lang": "en"
        }
      ]
    });
    httpBackend.when('GET', apiUrl+'events/'+1002).respond(200, {
      "data": {
       "event": {
         "id": "1002",
         "title": "My Second Event",
         "location": "Medellin Colombia",
         "ends": "2014-09-30 09:57:00",
         "starts": "2015-12-29 04:00:00",
         "location_reference": "referenceafsddf",
         "image": "event_dummy.png",
         "description": "Lorem",
         "category": "1",
         "type": "1",
         "privacy": "0",
         "lang": "en",
         "perks": [],
         "perk_tasks": [],
         "sponzor_tasks": []
       },
       "organizer": [
         {
           "id": "1003",
           "name": "Organizer Sponzorme",
           "email": "organizer@sponzor.me",
           "activated": "1",
           "activation_code": "",
           "activated_at": "",
           "last_login": ""
         }
       ]
     }
    });
    var controller = createController();
    httpBackend.flush();
    scope.showPerks(scope.search[0].id);
    httpBackend.flush();
    expect(scope.noPerksMessage).toBe(true);
  });

  it("Should be formCreateSponzorship", function(){
    httpBackend.when('GET', apiUrl+'events').respond(200, {
      "success": true,
      "events": [
        {
          "id": "1002",
          "title": "My Second Event",
          "location": "Medellin Colombia",
          "ends": "2014-09-30 09:57:00",
          "starts": dataExpDate,
          "location_reference": "referenceafsddf",
          "image": "event_dummy.png",
          "description": "Lorem",
          "category": "1",
          "type": "1",
          "privacy": "0",
          "lang": "en"
        }
      ]
    });
    var controller = createController();
    var perk = {
      "id": "3",
      "kind": "A",
      "usd": "10",
      "total_quantity": "2",
      "reserved_quantity": "0",
      "id_event": "1002"
    }
    scope.formCreateSponzorship(perk);
    httpBackend.flush();
    expect(scope.perkToSponzor).toBe(perk);
  });

  it("Should Be a non Succesfuly Sponzorship", function(){
    httpBackend.when('GET', apiUrl+'events').respond(200, {
      "success": true,
      "events": [
        {
          "id": "1002",
          "title": "My Second Event",
          "location": "Medellin Colombia",
          "ends": "2014-09-30 09:57:00",
          "starts": dataExpDate,
          "location_reference": "referenceafsddf",
          "image": "event_dummy.png",
          "description": "Lorem",
          "category": "1",
          "type": "1",
          "privacy": "0",
          "lang": "en"
        }
      ]
    });
    httpBackend.when('POST', apiUrl+'sponzorships').respond(400, {
      "message": "Inserted",
      "sponzorship": {
        "title": "Test",
        "body": "test",
        "lang": "123",
        "id": 15
      }
    });
    var perkId = 1;
    httpBackend.when('GET', apiUrl+'perks/'+perkId).respond(200, {
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
    var controller = createController();
    $localStorage.id= 1;
    scope.currentOrganizer = 1;
    scope.perkToSponzor={
      id: perkId,
      id_event: 1,
      cause: "test"
    }
    httpBackend.flush();
    scope.currentEvent = scope.search[0];
    scope.createSponzorship();
    httpBackend.flush();
    expect(scope.message).toEqual('youCanNotSponzorThisEvent');
  });

  it("Should Be a non Succesfuly Sponzorship", function(){
    httpBackend.when('GET', apiUrl+'events').respond(200, {
      "success": true,
      "events": [
        {
          "id": "1002",
          "title": "My Second Event",
          "location": "Medellin Colombia",
          "ends": "2014-09-30 09:57:00",
          "starts": dataExpDate,
          "location_reference": "referenceafsddf",
          "image": "event_dummy.png",
          "description": "Lorem",
          "category": "1",
          "type": "1",
          "privacy": "0",
          "lang": "en"
        }
      ]
    });
    httpBackend.when('POST', apiUrl+'sponzorships').respond(400, {
      "message": "Inserted",
      "sponzorship": {
        "title": "Test",
        "body": "test",
        "lang": "123",
        "id": 15
      }
    });
    var perkId = 1;
    httpBackend.when('GET', apiUrl+'perks/'+perkId).respond(200, {
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
    var controller = createController();
    $localStorage.id= 1;
    scope.currentOrganizer = 1;
    scope.perkToSponzor={
      id: perkId,
      id_event: 1,
      cause: "test"
    }
    httpBackend.flush();
    scope.currentEvent = scope.search[0];
    scope.createSponzorship();
    httpBackend.flush();
    expect(scope.message).toEqual('youCanNotSponzorThisEvent');
  });

  it("Should Be a non Succesfuly Sponzorship", function(){
    httpBackend.when('GET', apiUrl+'events').respond(200, {
      "success": true,
      "events": [
        {
          "id": "1002",
          "title": "My Second Event",
          "location": "Medellin Colombia",
          "ends": "2014-09-30 09:57:00",
          "starts": dataExpDate,
          "location_reference": "referenceafsddf",
          "image": "event_dummy.png",
          "description": "Lorem",
          "category": "1",
          "type": "1",
          "privacy": "0",
          "lang": "en"
        }
      ]
    });
    httpBackend.when('POST', apiUrl+'sponzorships').respond(400, {
      "message": "Inserted",
      "sponzorship": {
        "title": "Test",
        "body": "test",
        "lang": "123",
        "id": 15
      }
    });
    var perkId = 1;
    httpBackend.when('GET', apiUrl+'perks/'+perkId).respond(200, {
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
    var controller = createController();
    $localStorage.id= 1;
    scope.currentOrganizer = 1;
    scope.perkToSponzor={
      id: perkId,
      id_event: 1,
      cause: "test"
    }
    httpBackend.flush();
    scope.currentEvent = scope.search[0];
    scope.createSponzorship();
    httpBackend.flush();
    expect(scope.message).toEqual('youCanNotSponzorThisEvent');
  });

  it("Should Be a non Succesfuly Sponzorship", function(){
    httpBackend.when('GET', apiUrl+'events').respond(200, {
      "success": true,
      "events": [
        {
          "id": "1002",
          "title": "My Second Event",
          "location": "Medellin Colombia",
          "ends": "2014-09-30 09:57:00",
          "starts": dataExpDate,
          "location_reference": "referenceafsddf",
          "image": "event_dummy.png",
          "description": "Lorem",
          "category": "1",
          "type": "1",
          "privacy": "0",
          "lang": "en"
        }
      ]
    });
    httpBackend.when('POST', apiUrl+'sponzorships').respond(200, {
      "message": "Inserted",
      "sponzorship": {
        "title": "Test",
        "body": "test",
        "lang": "123",
        "id": 15
      }
    });
    var perkId = 1;
    httpBackend.when('GET', apiUrl+'perks/'+perkId).respond(400, {
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
    var controller = createController();
    $localStorage.id= 1;
    scope.currentOrganizer = 1;
    scope.perkToSponzor={
      id: perkId,
      id_event: 1,
      cause: "test"
    }
    httpBackend.flush();
    scope.currentEvent = scope.search[0];
    scope.createSponzorship();
    httpBackend.flush();
    expect(scope.message).toEqual('youCanNotSponzorThisEvent');
  });

  it("Should be Show organizer Info Success", function(){
    httpBackend.when('GET', apiUrl+'events').respond(200, {
      "success": true,
      "events": [
        {
          "id": "1002",
          "title": "My Second Event",
          "location": "Medellin Colombia",
          "ends": "2014-09-30 09:57:00",
          "starts": dataExpDate,
          "location_reference": "referenceafsddf",
          "image": "event_dummy.png",
          "description": "Lorem",
          "category": "1",
          "type": "1",
          "privacy": "0",
          "lang": "en"
        }
      ]
    });
    httpBackend.when('GET', apiUrl+'events/'+1002).respond(200, {
      "data": {
       "event": {
         "id": "1002",
         "title": "My Second Event",
         "location": "Medellin Colombia",
         "ends": "2014-09-30 09:57:00",
         "starts": "2015-12-29 04:00:00",
         "location_reference": "referenceafsddf",
         "image": "event_dummy.png",
         "description": "Lorem",
         "category": "1",
         "type": "1",
         "privacy": "0",
         "lang": "en",
         "perks": [],
         "perk_tasks": [],
         "sponzor_tasks": []
       },
       "organizer": [
         {
           "id": "1003",
           "name": "Organizer Sponzorme",
           "email": "organizer@sponzor.me",
           "activated": "1",
           "activation_code": "",
           "activated_at": "",
           "last_login": ""
         }
       ]
     }
    });
    httpBackend.when('GET', apiUrl + 'users/' + 1003).respond(200, {
      "data": {
        "user": {
          "id": "3",
          "title": "Dancing",
          "body": "All About the Bussines!",
          "lang": "en",
          "events": [{
            a: "a"
          }, {
            a: "a"
          }, {
            a: "a"
          }, {
            a: "a"
          }]
        },
        "rating": 5
      }
    });
    var controller = createController();
    httpBackend.flush();
    scope.showOrganizerInfo(scope.search[0]);
    httpBackend.flush();
    expect(scope.currentOrganizer).toBe('1003');
  });

  it("Should be Show organizer Info Fail 2", function(){
    httpBackend.when('GET', apiUrl+'events').respond(200, {
      "success": true,
      "events": [
        {
          "id": "1002",
          "title": "My Second Event",
          "location": "Medellin Colombia",
          "ends": "2014-09-30 09:57:00",
          "starts": dataExpDate,
          "location_reference": "referenceafsddf",
          "image": "event_dummy.png",
          "description": "Lorem",
          "category": "1",
          "type": "1",
          "privacy": "0",
          "lang": "en"
        }
      ]
    });
    httpBackend.when('GET', apiUrl+'events/'+1002).respond(400, {
      "data": {
       "event": {
         "id": "1002",
         "title": "My Second Event",
         "location": "Medellin Colombia",
         "ends": "2014-09-30 09:57:00",
         "starts": "2015-12-29 04:00:00",
         "location_reference": "referenceafsddf",
         "image": "event_dummy.png",
         "description": "Lorem",
         "category": "1",
         "type": "1",
         "privacy": "0",
         "lang": "en",
         "perks": [],
         "perk_tasks": [],
         "sponzor_tasks": []
       },
       "organizer": [
         {
           "id": "1003",
           "name": "Organizer Sponzorme",
           "email": "organizer@sponzor.me",
           "activated": "1",
           "activation_code": "",
           "activated_at": "",
           "last_login": ""
         }
       ]
     }
    });
    httpBackend.when('GET', apiUrl + 'users/' + 1003).respond(200, {
      "data": {
        "user": {
          "id": "3",
          "title": "Dancing",
          "body": "All About the Bussines!",
          "lang": "en",
          "events": [{
            a: "a"
          }, {
            a: "a"
          }, {
            a: "a"
          }, {
            a: "a"
          }]
        },
        "rating": 5
      }
    });
    var controller = createController();
    httpBackend.flush();
    scope.showOrganizerInfo(scope.search[0]);
    httpBackend.flush();
    expect(scope.message).toBe('canNotGetUserInfo');
  });

});
