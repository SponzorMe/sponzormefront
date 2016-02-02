describe('Demo Service Unit Tests', function() {
  var demoRequest;
  var $httpBackend;
  var $localStorage;
  beforeEach(function() {
    module('sponzorme');
  });
  beforeEach(inject(function(_demoRequest_, $injector, _$localStorage_) {
    demoRequest = _demoRequest_;
    $localStorage = _$localStorage_;
    $httpBackend = $injector.get('$httpBackend');
    $httpBackend.whenGET('langs/lang-en.json').respond(200, {
      'title': 'Sponzorme EN'
    });
    $httpBackend.whenGET('langs/lang-pt.json').respond(200, {
      'title': 'Sponzorme PT'
    });
    $httpBackend.whenGET('langs/lang-es.json').respond(200, {
      'title': 'Sponzorme ES'
    });
  }));
  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });
  it('Should be demoRequest defined', function() {
    expect(demoRequest).toBe.defined;
    $httpBackend.flush();
  });
  it('Should be a organizer demo showed', function() {
    var userId = 1;
    var type = '0';
    $httpBackend.when('PATCH', apiUrl + 'users/' + userId).respond(200, {
      'message': 'Updated'
    });
    demoRequest.showDemo(userId, type);
    $httpBackend.flush();
    expect($localStorage.demo).toBe(1);
  });
  it('Should be a sponzor demo showed', function() {
    var userId = 1;
    var type = '1';
    $httpBackend.when('PATCH', apiUrl + 'users/' + userId).respond(200, {
      'message': 'Updated'
    });
    demoRequest.showDemo(userId, type);
    $httpBackend.flush();
    expect($localStorage.demo).toBe(1);
  });
});
