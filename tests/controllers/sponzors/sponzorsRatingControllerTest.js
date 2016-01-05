describe('Organizers Rating Controller test', function(){
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
    //END LOGIN VARS
    createController = function(){
      return $controller('SponzorsRatingController',{
        '$scope':scope
      })
    };
    httpBackend.whenGET('langs/lang-en.json').respond(200, {
      'title': 'Sponzorme EN'
    });
    httpBackend.whenGET('langs/lang-pt.json').respond(200, {
      'title': 'Sponzorme PT'
    });
    httpBackend.whenGET('langs/lang-es.json').respond(200, {
      'title': 'Sponzorme ES'
    });
    httpBackend.when('GET', 'views/templates/loadingDialog.html').respond(200, {
      'message': 'LOADING'
    });
    httpBackend.when('GET', 'views/templates/errorDialog.html').respond(200, {
      'message': 'ERROR'
    });
    httpBackend.when('GET', 'views/templates/successDialog.html').respond(200, {
      'message': 'SUCCESS'
    });
    httpBackend.when('GET', 'views/templates/unactivatedAccountDialog.html').respond(200, {
      'message': 'UNACTIVATED'
    });
    httpBackend.when('GET', 'templateId').respond(200, {
      'message': 'Test'
    });
  }));
  afterEach(function(){
    httpBackend.verifyNoOutstandingExpectation();
    httpBackend.verifyNoOutstandingRequest();
  });
  it('Should be already rate', function(){
    httpBackend.when('GET', apiUrl+'sponzorships/'+1).respond(200, {
      'message': 'Updated',
      'warnings': [],
      'sponzorship': {
        'id': '1',
        'title': 'Test',
        'body': 'test',
        'lang': '123'
      }
    });
    httpBackend.when('GET', apiUrl+'ratings/sponzorship/'+1+'/'+1).respond(200, {
      'data': {
        'Rating': [{
          'sponzor_id': 1
        }]
      }
    });
    $routeParams.sponzorshipId = 1;
    var controller = createController();
    httpBackend.flush();
    expect(scope.message).toBe('ratingAlreadyRated');
  });
  it('Should be Sponzorship does not exist', function(){
    httpBackend.when('GET', apiUrl+'sponzorships/'+1).respond(400, {
      'message': 'Not found'
    });
    $routeParams.sponzorshipId = 1;
    var controller = createController();
    httpBackend.flush();
    expect(scope.message).toBe('requestedSponzorshipNoExist');
  });
  it('Should be rating defined', function(){
    httpBackend.when('GET', apiUrl+'sponzorships/'+1).respond(200, {
      'data':{
        'SponzorEvent':{'id':1},
        'Sponzor':{'id':1},
        'Organizer':{'id':1}
      }
    });
    httpBackend.when('GET', apiUrl+'ratings/sponzorship/'+1+'/'+1).respond(200, {
      'data': {
        'Rating': []
      }
    });
    $routeParams.sponzorshipId = 1;
    var controller = createController();
    httpBackend.flush();
    var rating = {
      'sponzorship_id': 1,
      'type': 1,
      'sponzor_id': 1,
      'organizer_id': 1
    };
    expect(scope.rating.sponzorship_id).toBe(rating.sponzorship_id);
    expect(scope.rating.type).toBe(rating.type);
    expect(scope.rating.sponzor_id).toBe(rating.sponzor_id);
    expect(scope.rating.organizer_id).toBe(rating.organizer_id);
  });
  it('Should be a Rating Saved', function(){
    httpBackend.when('GET', apiUrl+'sponzorships/'+1).respond(200, {
      'data':{
        'SponzorEvent':{'id':1},
        'Sponzor':{'id':1},
        'Organizer':{'id':1}
      }
    });
    httpBackend.when('GET', apiUrl+'ratings/sponzorship/'+1+'/'+1).respond(200, {
      'data': {
        'Rating': []
      }
    });
    httpBackend.when('POST', apiUrl+'ratings').respond(200, {
      "message": "Inserted",
      "rating": {
        "title": "Test",
        "body": "test",
        "lang": "123",
        "id": 3
      }
    });
    $routeParams.sponzorshipId = 1;
    var controller = createController();
    httpBackend.flush();
    scope.saveRating();
    httpBackend.flush();
    expect(scope.message).toBe('ratingSponzorSuccess');
  });
  it('Should be a Rating Invalid to Saved', function(){
    httpBackend.when('GET', apiUrl+'sponzorships/'+1).respond(200, {
      'data':{
        'SponzorEvent':{'id':1},
        'Sponzor':{'id':1},
        'Organizer':{'id':1}
      }
    });
    httpBackend.when('GET', apiUrl+'ratings/sponzorship/'+1+'/'+1).respond(200, {
      'data': {
        'Rating': []
      }
    });
    httpBackend.when('POST', apiUrl+'ratings').respond(400, {
      "message": "Inserted",
      "rating": {
        "title": "Test",
        "body": "test",
        "lang": "123",
        "id": 3
      }
    });
    $routeParams.sponzorshipId = 1;
    var controller = createController();
    httpBackend.flush();
    scope.saveRating();
    httpBackend.flush();
    expect(scope.message).toBe('invalidRateInfo');
  });
});
