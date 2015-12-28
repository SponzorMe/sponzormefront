describe("Organizers Events Controller test", function() {
  var createController, httpBackend, scope, $location, $localStorage, $routeParams, $timeout;
  beforeEach(module('sponzorme'));
  beforeEach(inject(function($rootScope, $httpBackend, $controller, _$location_, _$localStorage_, _$routeParams_, _$timeout_) {
    httpBackend = $httpBackend;
    $location = _$location_;
    $timeout = _$timeout_;
    $localStorage = _$localStorage_;
    $routeParams = _$routeParams_;
    scope = $rootScope.$new();
    //LOGIN VARS
    $localStorage.cookiesponzorme = cookiesponzorme;
    $localStorage.email = email;
    $localStorage.id = id;
    $localStorage.token = token;
    $localStorage.typesponzorme = typeOrganizer;
    $localStorage.startDate = startDate;
    $localStorage.demo = 1;
    createController = function() {
      return $controller('OrganizersSponzorshipsController', {
        '$scope': scope
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
    httpBackend.when('GET', 'views/templates/userInfo.html').respond(200, {
      "message": "UserInfo"
    });
    httpBackend.when('GET', 'views/templates/sponzorshipCauseDialog.html').respond(200, {
      "message": "cause"
    });
    httpBackend.when('GET', 'templateId').respond(200, {
      "message": "Test"
    });
    httpBackend.when('GET', apiUrl + 'categories').respond(200, {
      "success": true,
      "categories": [{
        a: "a"
      }, {
        a: "a"
      }, {
        a: "a"
      }, {
        a: "a"
      }]
    });
    httpBackend.when('GET', apiUrl + 'event_types').respond(200, {
      "success": true,
      "eventTypes": [{
        a: "a"
      }, {
        a: "a"
      }, {
        a: "a"
      }, {
        a: "a"
      }]
    });
    httpBackend.when('GET', apiUrl + 'users/' + 1).respond(200, {
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
        "rating": 1
      }
    });
    httpBackend.when('GET', apiUrl + 'sponzorships_organizer/' + 1).respond(200, {
      "SponzorsEvents": [{
        id: "1",
        sponzor_id: '1'
      }, {
        id: "2"
      }, {
        id: "3"
      }, {
        id: "4"
      }]
    });
    httpBackend.when('GET', apiUrl + 'perk_tasks_sponzorship/' + 1).respond(200, {
      "tasks": [{
        'id': 1,
        'type': '0'
      }, {
        'id': 2,
        'type': '0'
      }, {
        'id': 3,
        'type': '0'
      }, {
        'id': 4,
        'type': '0'
      }]
    });
    httpBackend.when('GET', apiUrl + 'perks/' + 1).respond(200, {
      "data": {
        "perk": {
          "id": "3",
          "title": "Dancing",
          "body": "All About the Bussines!",
          "lang": "en"
        },
        "Tasks": [{
          id: "1"
        }, {
          id: "2"
        }, {
          id: "3"
        }, {
          id: "4"
        }]
      }
    });
  }));
  afterEach(function() {
    httpBackend.verifyNoOutstandingExpectation();
    httpBackend.verifyNoOutstandingRequest();
  });

  it("Should be tasks and sponzorships loaded", function() {
    $localStorage.id = 1;
    var controller = createController();
    httpBackend.flush();
    expect(scope.sponzorships.current).toEqual('1');
    expect(scope.sponzorships[3].id).toEqual('4');
    expect(scope.tasksSponzor[0].id).toEqual(1);
  });
  it("Should be a sponzorRating available", function() {
    $localStorage.id = 1;
    var controller = createController();
    scope.showSponzorInfo(1);
    httpBackend.flush();
    expect(scope.user.rating).toEqual(1);
  });
  it("Should be a sponzorRating unavailable", function() {
    httpBackend.when('GET', apiUrl + 'users/' + 2).respond(400, {
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
        "rating": 1
      }
    });
    $localStorage.id = 1;
    var controller = createController();
    scope.showSponzorInfo(2);
    httpBackend.flush();
    expect(scope.message).toEqual('canNotGetUserInfo');
  });
  it("Should be change sponzorship status", function() {
    httpBackend.when('GET', apiUrl + 'perk_tasks_sponzorship/' + 1).respond(200, {
      "tasks": [{
        'id': 1,
        'type': '0'
      }, {
        'id': 2,
        'type': '0'
      }, {
        'id': 3,
        'type': '0'
      }, {
        'id': 4,
        'type': '0'
      }]
    });
    httpBackend.when('GET', apiUrl + 'sponzorships_organizer/' + 1).respond(200, {
      "SponzorsEvents": [{
        id: "1"
      }, {
        id: "2"
      }, {
        id: "3"
      }, {
        id: "4"
      }]
    });
    httpBackend.when('PATCH', apiUrl + 'sponzorships/' + 1).respond(200, {
      "message": "Updated",
      "warnings": [],
      "sponzorship": {
        "id": "15",
        "title": "Test",
        "body": "test",
        "lang": "123"
      }
    });
    httpBackend.when('POST', apiUrl + 'sponzorship_email').respond(200, {
      "message": "Updated",
      "warnings": [],
      "sponzorship": {
        "id": "15",
        "title": "Test",
        "body": "test",
        "lang": "123"
      }
    });
    httpBackend.when('PATCH', apiUrl + 'task_sponzor/' + 1).respond(200, {
      "message": "Updated",
      "warnings": [],
      "taskSponzor": {
        "id": "15",
        "title": "Test",
        "body": "test",
        "lang": "123"
      }
    });
    httpBackend.when('DELETE', apiUrl + 'task_sponzor/' + 1).respond(200, {
      "message": "Deleted"
    });
    $localStorage.id = 1;
    var controller = createController();
    httpBackend.flush();
    expect(scope.sponzorships.current).toEqual('1');
    expect(scope.sponzorships[3].id).toEqual('4');
    expect(scope.tasksSponzor[0].id).toEqual(1);
    scope.unacceptSponzorship(1, 1);
    httpBackend.flush();
    expect(scope.sponzorships.current).toEqual('1');
    expect(scope.sponzorships[3].id).toEqual('4');
    expect(scope.tasksSponzor[0].id).toEqual(1);
    scope.completeTask(1);
    httpBackend.flush();
    expect(scope.sponzorships.current).toEqual('1');
    expect(scope.sponzorships[3].id).toEqual('4');
    expect(scope.tasksSponzor[0].id).toEqual(1);
    scope.uncompleteTask(1);
    httpBackend.flush();
    expect(scope.sponzorships.current).toEqual('1');
    expect(scope.sponzorships[3].id).toEqual('4');
    expect(scope.tasksSponzor[0].id).toEqual(1);
    scope.deleteTaskSponzor(1);
    httpBackend.flush();
    expect(scope.sponzorships.current).toEqual('1');
    expect(scope.sponzorships[3].id).toEqual('4');
    expect(scope.tasksSponzor[0].id).toEqual(1);
    var sponzorship = {
      cause: 'test'
    };
    scope.seeCause(sponzorship);
    httpBackend.flush();
    expect(scope.cause).toEqual(sponzorship.cause);
  });
});
