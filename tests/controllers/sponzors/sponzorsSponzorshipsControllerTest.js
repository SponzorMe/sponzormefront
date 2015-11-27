describe("Sponzorships Controller test", function(){
  var createController, httpBackend, scope, $location, $localStorage, $routeParams, $timeout;
  beforeEach(module('sponzorme'));
  beforeEach(inject(function($rootScope, $httpBackend, $controller, _$location_, _$localStorage_, _$routeParams_, _$timeout_){
    httpBackend = $httpBackend;
    $location = _$location_;
    $timeout = _$timeout_;
    $localStorage = _$localStorage_;
    $routeParams = _$routeParams_;
    scope =  $rootScope.$new();
    createController = function(){
      return $controller('SponzorsSponzorshipsController',{
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
    httpBackend.when('GET', 'views/templates/sponzorshipCauseDialog.html').respond(200, {
      "message": "cause"
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
    httpBackend.when('GET', 'http://apistaging.sponzor.me/users/'+1).respond(200, {
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

    httpBackend.when('GET', 'http://apistaging.sponzor.me/perks/'+1).respond(200, {
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

  it("Should sponzorships loaded", function(){
    httpBackend.when('GET', 'http://apistaging.sponzor.me/sponzorships_sponzor/'+1).respond(200, {
      "SponzorsEvents": [{id:"1", status:'1'},{id:"2", status:'1'},{id:"3", status:'0'},{id:"4", status:'1'}]
    });
    httpBackend.when('GET', 'http://apistaging.sponzor.me/perk_tasks_sponzorship/'+1).respond(200, {
      "tasks": [{'id':1,'type':'1','sponzor_id':1},{'id':2,'type':'0','sponzor_id':1},{'id':3,'type':'0','sponzor_id':1},{'id':4,'type':'0','sponzor_id':1}]
      }
    );
    httpBackend.when('GET', 'http://apistaging.sponzor.me/sponzorships/'+1).respond(200, {
    "data": {
      "SponzorEvent": {
        "id": "1",
        "title": "Dancing",
        "body": "All About the Bussines!",
        "lang": "en",
        "events": [],
        "task_sponzor":[{id:'1'},{id:'1'},{id:'1'}]
      }
  }});
  httpBackend.when('DELETE', 'http://apistaging.sponzor.me/task_sponzor/'+1).respond(200, {
    "message": "Deleted"
  });
  httpBackend.when('DELETE', 'http://apistaging.sponzor.me/task_sponzor/'+2).respond(200, {
    "message": "Deleted"
  });
  httpBackend.when('DELETE', 'http://apistaging.sponzor.me/task_sponzor/'+3).respond(200, {
    "message": "Deleted"
  });
  httpBackend.when('DELETE', 'http://apistaging.sponzor.me/sponzorships/'+1).respond(200, {
    "message": "Deleted"
  }
);
httpBackend.when('PATCH', 'http://apistaging.sponzor.me/task_sponzor/'+2).respond(200, {
  "message": "Updated",
  "warnings": [],
  "taskSponzor": {
    "id": "15",
    "title": "Test",
    "body": "test",
    "lang": "123"
  }
});
httpBackend.when('PATCH', 'http://apistaging.sponzor.me/sponzorships/'+1).respond(200, {
  "message": "Updated",
  "warnings": [],
  "sponzorship": {
    "id": "15",
    "title": "Test",
    "body": "test",
    "lang": "123"
  }
});
    $localStorage.id = 1;
    $localStorage.email = 'test@test.com';
    var controller = createController();
    httpBackend.flush();
    expect(scope.emailuser).toEqual('test@test.com');
    expect(scope.sponzorships[2].id).toEqual('4');//Validation of status ok
    expect(scope.sponzorships.current).toEqual('1');//Filter sponzors ok
    expect(scope.tasksSponzor[0].id).toEqual(1);//Validation of kind ok
    var sponzorship = {cause:'test'};
    scope.seeCause(sponzorship);
    httpBackend.flush();
    expect(scope.cause).toEqual(sponzorship.cause);
    scope.acceptSponzorship(1,1);
    httpBackend.flush();
    expect(scope.sponzorships[2].id).toEqual('4');//Validation of status ok
    expect(scope.sponzorships.current).toEqual('1');//Filter sponzors ok
    expect(scope.tasksSponzor[0].id).toEqual(1);//Validation of kind ok
    scope.unacceptSponzorship(1,1);
    httpBackend.flush();
    expect(scope.sponzorships[2].id).toEqual('4');//Validation of status ok
    expect(scope.sponzorships.current).toEqual('1');//Filter sponzors ok
    expect(scope.tasksSponzor[0].id).toEqual(1);//Validation of kind ok
    scope.completeTask(1);
    httpBackend.flush();
    expect(scope.sponzorships[2].id).toEqual('4');//Validation of status ok
    expect(scope.sponzorships.current).toEqual('1');//Filter sponzors ok
    expect(scope.tasksSponzor[0].id).toEqual(1);//Validation of kind ok
    scope.uncompleteTask(1);
    httpBackend.flush();
    expect(scope.sponzorships[2].id).toEqual('4');//Validation of status ok
    expect(scope.sponzorships.current).toEqual('1');//Filter sponzors ok
    expect(scope.tasksSponzor[0].id).toEqual(1);//Validation of kind ok
    scope.deleteTaskSponzor(1);
    httpBackend.flush();
    expect(scope.sponzorships[2].id).toEqual('4');//Validation of status ok
    expect(scope.sponzorships.current).toEqual('1');//Filter sponzors ok
    expect(scope.tasksSponzor[0].id).toEqual(1);//Validation of kind ok
  });
});
