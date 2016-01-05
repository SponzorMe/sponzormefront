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
    $httpBackend.when('GET', apiUrl + 'ratings').respond(200, {
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
    $httpBackend.when('GET', apiUrl + 'ratings/' + ratingId).respond(200, {
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
    $httpBackend.when('POST', apiUrl + 'ratings').respond(200, {
      "message": "Inserted",
      "rating": {
        "title": "Test",
        "body": "test",
        "lang": "123",
        "id": 3
      }
    });
    $httpBackend.when('GET', apiUrl + 'ratings/sponzorship/1/0').respond(200, {
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
          "question7": "",
          "question8": "",
          "question9": "",
          "question10": "",
          "created_at": "2015-12-28 21:37:54"
        }]
      }
    });
    $httpBackend.when('GET', apiUrl + 'ratings/sponzor/1002').respond(200, {
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
    $httpBackend.when('GET', apiUrl + 'ratings/organizer/1003').respond(200, {
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
  it('Create a Rating.', function() {
    var rating = {
      "title": "Test",
      "body": "test",
      "lang": "123"
    };
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
  it('Should be Rating By Sponzorship', function() {
    var returnData = {
      "success": true
    };
    var sponzorshipId = '1';
    var type = 0;
    var returnedPromise = ratingRequest.ratingBySponzorship(sponzorshipId, type);
    var result;
    returnedPromise.then(function(response) {
      result = response;
    });
    $httpBackend.flush();
    expect(result.data.data.Rating[0].sponzorship_id).toEqual(sponzorshipId);
  });
  it('Should be Rating By Sponzor', function() {
    var returnData = {
      "success": true
    };
    var sponzorId = '1002';
    var type = 0;
    var returnedPromise = ratingRequest.ratingsBySponzor(sponzorId);
    var result;
    returnedPromise.then(function(response) {
      result = response;
    });
    $httpBackend.flush();
    expect(result.data.data.Rating[0].sponzor_id).toEqual(sponzorId);
  });
  it('Should be Rating By Organizer', function() {
    var returnData = {
      "success": true
    };
    var organizerId = '1003';
    var type = 0;
    var returnedPromise = ratingRequest.ratingsByOrganizer(organizerId);
    var result;
    returnedPromise.then(function(response) {
      result = response;
    });
    $httpBackend.flush();
    expect(result.data.data.Rating[0].organizer_id).toEqual(organizerId);
  });
});
