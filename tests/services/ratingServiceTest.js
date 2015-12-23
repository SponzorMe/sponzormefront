describe("Rating Service Tests", function() {

  beforeEach(function() {
    module('sponzorme');
  });

  var ratingId = '3';
  var $httpBackend;
  var token;

  beforeEach(inject(function(_ratingRequest_) {
    ratingRequest = _ratingRequest_;
  }));

  beforeEach(inject(function($injector) {
    $httpBackend = $injector.get('$httpBackend');
    $httpBackend.when('GET', apiUrl+'ratings').respond(200, {
      "success": true
    });
    $httpBackend.whenGET('langs/lang-en.json').respond(200, {
      "title": 'Sponzorme EN'
    });
    $httpBackend.whenGET('langs/lang-pt.json').respond(200, {
      "title": 'Sponzorme PT'
    });
    $httpBackend.whenGET('langs/lang-es.json').respond(200, {
      "title": 'Sponzorme ES'
    });
    $httpBackend.when('GET', apiUrl+'ratings/'+ratingId).respond(200, {
      "data": {
        "rating": {
          "id": "3",
          "title": "Dancing",
          "body": "All About the Bussines!",
          "lang": "en",
          "events": [],
        }
      }
    });
    $httpBackend.when('POST', apiUrl+'ratings').respond(200, {
      "message": "Inserted",
      "rating": {
        "title": "Test",
        "body": "test",
        "lang": "123",
        "id": 3
      }
    });
  }));
  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });
  it('All Ratings.', function() {
    var returnData = {
      "success": true
    };
    var returnedPromise = ratingRequest.allRatings();
    var result;
    returnedPromise.then(function(response) {
      result = response;
    });
    $httpBackend.flush();
    expect(result.data.success).toEqual(returnData.success);
  });
  it('A Rating.', function() {
    var returnData = {
      "data": {
        "rating": {
          "id": "3",
          "title": "Dancing",
          "body": "All About the Bussines!",
          "lang": "en",
          "events": [],
        }
      }
    };
    var returnedPromise = ratingRequest.oneRating(ratingId);
    var result;
    returnedPromise.then(function(response) {
      result = response;
    });
    $httpBackend.flush();
    expect(result.data.data.rating.id).toEqual(ratingId);
  });
  it('Create Category.', function() {
    var rating = {
      "title": "Test",
      "body": "test",
      "lang": "123"};
    var returnData = {
      "message": "Inserted",
      "rating": {
        "title": "Test",
        "body": "test",
        "lang": "123",
        "id": 15
      }
    };
    var returnedPromise = ratingRequest.createRating(rating);
    var result;
    returnedPromise.then(function(response) {
      result = response;
    });
    $httpBackend.flush();
    expect(result.data.message).toEqual(returnData.message);
  });
});
