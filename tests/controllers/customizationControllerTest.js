describe("CustomizationController Tests", function(){
  var createController, httpBackend, scope, $location, $localStorage;
  beforeEach(module('sponzorme'));
  beforeEach(inject(function($rootScope, $httpBackend, $controller, _$location_, _$localStorage_){
    httpBackend = $httpBackend;
    $location = _$location_;
    $localStorage = _$localStorage_;
    scope =  $rootScope.$new();
    createController = function() {
            return $controller('CustomizationController', {
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
<<<<<<< HEAD
    httpBackend.when('GET', 'http://api.sponzor.me/categories').respond(200, {
=======
    httpBackend.when('GET', apiUrl+'categories').respond(200, {
>>>>>>> gh-pages
      "success": true,
      "categories":[
        {
          "id":"1"
        },
        {
          "id":"2"
        }]
    });
<<<<<<< HEAD
    httpBackend.when('GET', 'http://api.sponzor.me/interests_category').respond(200, {
=======
    httpBackend.when('GET', apiUrl+'interests_category').respond(200, {
>>>>>>> gh-pages
      "success": true,
      "InterestCategory":[
        {
          "id":"1",
          "category_id":"1"
        },
        {
          "id":"2",
          "category_id":"1"
        }]
    });
  }));
  afterEach(function(){
    httpBackend.verifyNoOutstandingExpectation();
    httpBackend.verifyNoOutstandingRequest();
  });
  it("Should be redirected", function(){
    var controller = createController();
    expect(scope.categories).not.toBeDefined;
    $localStorage.id = 8;
    scope.startCustomization();

    expect(scope.categories).not.toBeDefined;
    scope.startCustomization();
    $localStorage.email = 'an@email.com';
    scope.startCustomization();

    expect(scope.categories).not.toBeDefined;
    $localStorage.newUser = false;
    scope.startCustomization();

    expect(scope.categories).not.toBeDefined;
    $localStorage.newUser = true;
    scope.startCustomization();
    expect(scope.categories).toBeDefined;
    httpBackend.flush();
  });
  it("Should be gotten categories and interests", function(){

    //We set the values to get Answer
    $localStorage.newUser = true;
    $localStorage.email = 'an@email.com';
    $localStorage.id = 8;
    var controller = createController();
    httpBackend.flush();
    expect(scope.categories[0].id).toEqual('1');
    expect(scope.categories[1].id).toEqual('2');
    expect(scope.interests[1].id).toEqual('2');
  });
  it("Should be changed the step", function(){
    var controller = createController();
    scope.showStep(2);
    httpBackend.flush();
    expect(scope.steps[2]).toEqual(true);
  });
  it("Should be all complete after submit the form", function(){
<<<<<<< HEAD
    httpBackend.when('GET', 'http://api.sponzor.me/categories').respond(200, {
=======
    httpBackend.when('GET', apiUrl+'categories').respond(200, {
>>>>>>> gh-pages
      "success": true,
      "categories":[
        {
          "id":"1"
        },
        {
          "id":"2"
        }]
    });
<<<<<<< HEAD
    httpBackend.when('GET', 'http://api.sponzor.me/interests_category').respond(200, {
=======
    httpBackend.when('GET', apiUrl+'interests_category').respond(200, {
>>>>>>> gh-pages
      "success": true,
      "InterestCategory":[
        {
          "id":"1",
          "category_id":"1"
        },
        {
          "id":"2",
          "category_id":"1"
        }]
    });
<<<<<<< HEAD
    httpBackend.when('POST', 'http://api.sponzor.me/user_interests').respond(200, {
=======
    httpBackend.when('POST', apiUrl+'user_interests').respond(200, {
>>>>>>> gh-pages
      "message": "Inserted",
      "category": {
        "title": "Test",
        "body": "test",
        "lang": "123",
        "id": 15
      }
    });
    $localStorage.newUser = true;
    $localStorage.email = 'an@email.com';
    $localStorage.id = 8;
    var controller = createController();
    scope.interestselectarray = [1,2,3,4];
    scope.submitCategoryInfo();
    httpBackend.flush();
    expect(scope.steps[2]).toEqual(true);
  });
});
