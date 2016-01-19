describe("Profile Controller Tests", function(){
  var createController, httpBackend, scope, $location, $localStorage, $routeParams;
  beforeEach(module('sponzorme'));
  beforeEach(inject(function($rootScope, $httpBackend, $controller, _$location_, _$localStorage_, _$routeParams_){
    httpBackend = $httpBackend;
    $location = _$location_;
    $localStorage = _$localStorage_;
    $routeParams = _$routeParams_
    scope =  $rootScope.$new();
    createController = function() {
            return $controller(
              'ProfileController', {
                '$scope': scope
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
  }));
  afterEach(function(){
    httpBackend.verifyNoOutstandingExpectation();
    httpBackend.verifyNoOutstandingRequest();
  });
  it("Should be an Organizer profile", function(){
    $routeParams.userId = '1003';
    httpBackend.when('GET', apiUrl + 'ratings/organizer/1003').respond(200, {
      "data": {
        "Rating": [{
          "id": "3",
          "organizer_id": "1003",
          "sponzor_id": "1002",
          "sponzorship_id": "1",
          "type": "1",
          "question0": "4",
          "question1": "test",
          "question2": "3",
          "question3": "1",
          "question4": "1",
          "question5": "developers",
          "question6": "probando loremp bla bla bla",
          "created_at": "2015-12-28 21:37:54"
        }]
      }
    });
    httpBackend.when('GET', apiUrl+'users/'+1003).respond(200, {
      "data": {
        "user": {
          "id": '1003',
          "name": "Dancing",
          "body": "All About the Bussines!",
          "lang": "en",
          "email":'test@test.com',
          "type":'0',
          "events": [{id:"1"},{id:"1"},{id:"1"},{id:"1"}]
        },
        "interests":
          [
            {name:"test1"},{name:"test2"}
          ]
      }
    });
    var controller = createController();
    httpBackend.flush();
    expect(scope.ratings[0].organizer_id).toBe('1003');
  });
  it("Should be an Sponzor profile", function(){
    $routeParams.userId = '1002';
    httpBackend.when('GET', apiUrl + 'ratings/sponzor/1002').respond(200, {
      "data": {
        "Rating": [{
          "id": "3",
          "organizer_id": "1003",
          "sponzor_id": "1002",
          "sponzorship_id": "1",
          "type": "0",
          "question0": "4",
          "question1": "test",
          "question2": "3",
          "question3": "1",
          "question4": "1",
          "question5": "developers",
          "question6": "probando loremp bla bla bla",
          "created_at": "2015-12-28 21:37:54"
        }]
      }
    });
    httpBackend.when('GET', apiUrl+'users/'+1002).respond(200, {
      "data": {
        "user": {
          "id": "1002",
          "name": "Dancing",
          "body": "All About the Bussines!",
          "lang": "en",
          "email":'test@test.com',
          "type":'1',
          "events": [{id:"1"},{id:"1"},{id:"1"},{id:"1"}]
        },
        "interests":
          [
            {name:"test1"},{name:"test2"}
          ]
      }
    });
    var controller = createController();
    httpBackend.flush();
    expect(scope.ratings[0].sponzor_id).toBe('1002');
  });
  it("Should not be an Sponzor profile", function(){
    $routeParams.userId = '1002';
    httpBackend.when('GET', apiUrl + 'ratings/sponzor/1002').respond(400, {
      "data": {}
    });
    httpBackend.when('GET', apiUrl+'users/'+1002).respond(200, {
      "data": {
        "user": {
          "id": "1002",
          "name": "Dancing",
          "body": "All About the Bussines!",
          "lang": "en",
          "email":'test@test.com',
          "type":'1',
          "events": [{id:"1"},{id:"1"},{id:"1"},{id:"1"}]
        },
        "interests":
          [
            {name:"test1"},{name:"test2"}
          ]
      }
    });
    var controller = createController();
    httpBackend.flush();
    //expect\(scope.message\).toBe\(.*\);
  });
  it("Should not be an Organizer profile", function(){
    $routeParams.userId = '1003';
    httpBackend.when('GET', apiUrl + 'ratings/organizer/1003').respond(400, {
      "data": {}
    });
    httpBackend.when('GET', apiUrl+'users/'+1003).respond(200, {
      "data": {
        "user": {
          "id": "1003",
          "name": "Dancing",
          "body": "All About the Bussines!",
          "lang": "en",
          "email":'test@test.com',
          "type":'0',
          "events": [{id:"1"},{id:"1"},{id:"1"},{id:"1"}]
        },
        "interests":
          [
            {name:"test1"},{name:"test2"}
          ]
      }
    });
    var controller = createController();
    httpBackend.flush();
    //expect\(scope.message\).toBe\(.*\);
  });
  it("Should not be an Invlid type for profile", function(){
    $routeParams.userId = '1003';
    httpBackend.when('GET', apiUrl + 'ratings/organizer/1003').respond(200, {
      "data": {}
    });
    httpBackend.when('GET', apiUrl+'users/'+1003).respond(200, {
      "data": {
        "user": {
          "id": "1003",
          "name": "Dancing",
          "body": "All About the Bussines!",
          "lang": "en",
          "email":'test@test.com',
          "type":'3',
          "events": [{id:"1"},{id:"1"},{id:"1"},{id:"1"}]
        },
        "interests":
          [
            {name:"test1"},{name:"test2"}
          ]
      }
    });
    var controller = createController();
    httpBackend.flush();
    //expect\(scope.message\).toBe\(.*\);
  });
});
