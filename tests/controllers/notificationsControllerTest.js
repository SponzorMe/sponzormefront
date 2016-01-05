describe("Notification Controller Tests", function(){
  var createController, httpBackend, scope, $location, $localStorage;
  beforeEach(module('sponzorme'));
  beforeEach(inject(function($rootScope, $httpBackend, $controller, _$location_, _$localStorage_){
    httpBackend = $httpBackend;
    $location = _$location_;
    $localStorage = _$localStorage_;
    scope =  $rootScope.$new();
    createController = function(){
      return $controller('NotificationController',{
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
  }));
  afterEach(function(){
    httpBackend.verifyNoOutstandingExpectation();
    httpBackend.verifyNoOutstandingRequest();
  });
  it("Test Organizer Notifications", function(){
    $localStorage.id = '1003';
    var NotificationController = createController();
    httpBackend.flush();
    expect(scope.help).toBeDefined;
  });
  it("Test Sponzor Notifications", function(){
    $localStorage.id = '1002';
    var NotificationController = createController();
    httpBackend.flush();
    expect(scope.help).toBeDefined;
  });
});
