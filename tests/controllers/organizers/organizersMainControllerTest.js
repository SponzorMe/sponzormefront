describe("Organizers Create Controller test", function(){
  var createController, httpBackend, scope, $location, $localStorage, $routeParams;
  beforeEach(module('sponzorme'));
  beforeEach(inject(function($rootScope, $httpBackend, $controller, _$location_, _$localStorage_, _$routeParams_){
    httpBackend = $httpBackend;
    $location = _$location_;
    $localStorage = _$localStorage_;
    $routeParams = _$routeParams_;
    scope =  $rootScope.$new();
    createController = function(){
      return $controller('OrganizersMainController',{
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
  }));
  afterEach(function(){
    httpBackend.verifyNoOutstandingExpectation();
    httpBackend.verifyNoOutstandingRequest();
  });
  it("Should be vars uploaded", function(){
    var lang = 'en';
    httpBackend.when('GET', apiUrl+'sponzorships_organizer/'+1).respond(200, {
      "SponzorsEvents": [{id:"1"},{id:"1"},{id:"1"},{id:"1"}]
      }
    );
    httpBackend.when('GET', apiUrl+'users/'+1).respond(200, {
      "data": {
        "user": {
          "id": "3",
          "title": "Dancing",
          "body": "All About the Bussines!",
          "lang": "en",
          "events": [{id:"1"},{id:"1"},{id:"1"},{id:"1"}]
        }
      }
    });
    httpBackend.when('JSONP', '//ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=10&callback=JSON_CALLBACK&q=' + 'http://blog' + lang + '.sponzor.me/feeds/posts/default').respond(200, {
      responseData: {feed:{entries:[{id:'1'}]}}, responseDetails: null, responseStatus: 200
    });
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
    $localStorage.id = '1'
    $localStorage.email = 'test@test.com';
    var controller = createController();
    httpBackend.flush();
    expect(scope.emailuser).toEqual('test@test.com');
    expect(scope.rss[0].id).toEqual('1');
    expect(scope.events[0].id).toEqual('1');
    expect(scope.event.current).toEqual('1');
  });
});
