describe("TaskSponzor Service Unit Tests", function() {

  beforeEach(function() {
    module('sponzorme');
  });

  var taskSponzorRequest;

  var httpBackend = null;

  beforeEach(inject(function(_taskSponzorRequest_) {
    taskSponzorRequest = _taskSponzorRequest_;
  }));
  //allCategories
  describe('All Categories', function() {

    var $httpBackend;
    var token;

    beforeEach(inject(function($injector) {
      // Set up the mock http service responses
      $httpBackend = $injector.get('$httpBackend');
<<<<<<< HEAD
      $httpBackend.when('GET', 'http://api.sponzor.me/task_sponzor').respond(200, {
=======
      $httpBackend.when('GET', apiUrl+'task_sponzor').respond(200, {
>>>>>>> gh-pages
        "success": true
      });$httpBackend.whenGET('langs/lang-en.json').respond(200, {
        "title": 'Sponzorme EN'
      });
      $httpBackend.whenGET('langs/lang-pt.json').respond(200, {
        "title": 'Sponzorme PT'
      });
      $httpBackend.whenGET('langs/lang-es.json').respond(200, {
        "title": 'Sponzorme ES'
      });
    }));

    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });
    it('All task_sponzor.', function() {
      var returnData = {
        "success": true
      };
      var returnedPromise = taskSponzorRequest.allTaskSponzor();
      var result;
      returnedPromise.then(function(response) {
        result = response;
      });
      $httpBackend.flush();
      expect(result.data.success).toEqual(returnData.success);
    });
  });
  //oneTaskSponzor
  describe('One TaskSponzor', function() {
    var $httpBackend;
    var taskSponzorId = '3';
    beforeEach(inject(function($injector) {
      // Set up the mock http service responses
      $httpBackend = $injector.get('$httpBackend');
<<<<<<< HEAD
      $httpBackend.when('GET', 'http://api.sponzor.me/task_sponzor/'+taskSponzorId).respond(200, {
=======
      $httpBackend.when('GET', apiUrl+'task_sponzor/'+taskSponzorId).respond(200, {
>>>>>>> gh-pages
      "data": {
        "taskSponzor": {
          "id": "3",
          "title": "Dancing",
          "body": "All About the Bussines!",
          "lang": "en",
          "events": []
        }
      }
    });$httpBackend.whenGET('langs/lang-en.json').respond(200, {
      "title": 'Sponzorme EN'
    });
    $httpBackend.whenGET('langs/lang-pt.json').respond(200, {
      "title": 'Sponzorme PT'
    });
    $httpBackend.whenGET('langs/lang-es.json').respond(200, {
      "title": 'Sponzorme ES'
    });
    }));
    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });
    it('A taskSponzor.', function() {
      var returnData = {
        "data": {
          "taskSponzor": {
            "id": "3",
            "title": "Dancing",
            "body": "All About the Bussines!",
            "lang": "en",
            "events": [],
          }
        }
      };
      var returnedPromise = taskSponzorRequest.oneTaskSponzor(taskSponzorId);
      var result;
      returnedPromise.then(function(response) {
        result = response;
      });
      $httpBackend.flush();
      expect(result.data.data.taskSponzor.id).toEqual(taskSponzorId);
    });
  });
  //createTaskSponzor
  describe('create TaskSponzor', function() {
    var $httpBackend;
    var taskSponzor = {
      "title": "Test",
      "body": "test",
      "lang": "123"};
    beforeEach(inject(function($injector) {
      // Set up the mock http service responses
      $httpBackend = $injector.get('$httpBackend');
<<<<<<< HEAD
      $httpBackend.when('POST', 'http://api.sponzor.me/task_sponzor').respond(200, {
=======
      $httpBackend.when('POST', apiUrl+'task_sponzor').respond(200, {
>>>>>>> gh-pages
        "message": "Inserted",
        "taskSponzor": {
          "title": "Test",
          "body": "test",
          "lang": "123",
          "id": 15
        }
      });$httpBackend.whenGET('langs/lang-en.json').respond(200, {
        "title": 'Sponzorme EN'
      });
      $httpBackend.whenGET('langs/lang-pt.json').respond(200, {
        "title": 'Sponzorme PT'
      });
      $httpBackend.whenGET('langs/lang-es.json').respond(200, {
        "title": 'Sponzorme ES'
      });
    }));
    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });
    it('Create TaskSponzor.', function() {
      var returnData = {
        "message": "Inserted",
        "taskSponzor": {
          "title": "Test",
          "body": "test",
          "lang": "123",
          "id": 15
        }
      };
      var returnedPromise = taskSponzorRequest.createTaskSponzor(taskSponzor);
      var result;
      returnedPromise.then(function(response) {
        result = response;
      });
      $httpBackend.flush();
      expect(result.data.message).toEqual(returnData.message);
    });
  });
  //deleteTaskSponzor
  describe('Delete TaskSponzor', function() {
    var $httpBackend;
    var taskSponzorId = '15';
    beforeEach(inject(function($injector) {
      // Set up the mock http service responses
      $httpBackend = $injector.get('$httpBackend');
<<<<<<< HEAD
      $httpBackend.when('DELETE', 'http://api.sponzor.me/task_sponzor/'+taskSponzorId).respond(200, {
=======
      $httpBackend.when('DELETE', apiUrl+'task_sponzor/'+taskSponzorId).respond(200, {
>>>>>>> gh-pages
        "message": "Deleted"
      });$httpBackend.whenGET('langs/lang-en.json').respond(200, {
        "title": 'Sponzorme EN'
      });
      $httpBackend.whenGET('langs/lang-pt.json').respond(200, {
        "title": 'Sponzorme PT'
      });
      $httpBackend.whenGET('langs/lang-es.json').respond(200, {
        "title": 'Sponzorme ES'
      });
    }));
    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });
    it('Delete TaskSponzor.', function() {
      var returnData = {"message": "Deleted"};
      var returnedPromise = taskSponzorRequest.deleteTaskSponzor(taskSponzorId);
      var result;
      returnedPromise.then(function(response) {
        result = response;
      });
      $httpBackend.flush();
      expect(result.data.message).toEqual(returnData.message);
    });
  });
  //editTaskSponzorPatch
  describe('Edit TaskSponzor PATCH', function() {
    var $httpBackend;
    var taskSponzorId = '15';
    var taskSponzor = {
      "title": "Test",
      "body": "test",
      "lang": "123"};
    beforeEach(inject(function($injector) {
      // Set up the mock http service responses
      $httpBackend = $injector.get('$httpBackend');
<<<<<<< HEAD
      $httpBackend.when('PATCH', 'http://api.sponzor.me/task_sponzor/'+taskSponzorId).respond(200, {
=======
      $httpBackend.when('PATCH', apiUrl+'task_sponzor/'+taskSponzorId).respond(200, {
>>>>>>> gh-pages
        "message": "Updated",
        "warnings": [],
        "taskSponzor": {
          "id": "15",
          "title": "Test",
          "body": "test",
          "lang": "123"
        }
      });$httpBackend.whenGET('langs/lang-en.json').respond(200, {
        "title": 'Sponzorme EN'
      });
      $httpBackend.whenGET('langs/lang-pt.json').respond(200, {
        "title": 'Sponzorme PT'
      });
      $httpBackend.whenGET('langs/lang-es.json').respond(200, {
        "title": 'Sponzorme ES'
      });
    }));
    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });
    it('Edit TaskSponzor PATCH', function() {
      var returnData = {
        "message": "Updated",
        "warnings": [],
        "taskSponzor": {
          "id": "15",
          "title": "Test",
          "body": "test",
          "lang": "123"
        }
      };
      var returnedPromise = taskSponzorRequest.editTaskSponzorPatch(taskSponzorId, taskSponzor);
      var result;
      returnedPromise.then(function(response) {
        result = response;
      });
      $httpBackend.flush();
      expect(result.data.message).toEqual(returnData.message);
    });
  });
  //editTaskSponzorPut
  describe('Edit TaskSponzor PUT', function() {
    var $httpBackend;
    var taskSponzorId = '15';
    var taskSponzor = {
      "title": "Test",
      "body": "test",
      "lang": "123"};
    beforeEach(inject(function($injector) {
      // Set up the mock http service responses
      $httpBackend = $injector.get('$httpBackend');
<<<<<<< HEAD
      $httpBackend.when('PUT', 'http://api.sponzor.me/task_sponzor/'+taskSponzorId).respond(200, {
=======
      $httpBackend.when('PUT', apiUrl+'task_sponzor/'+taskSponzorId).respond(200, {
>>>>>>> gh-pages
        "message": "Updated",
        "warnings": [],
        "taskSponzor": {
          "id": "15",
          "title": "Test",
          "body": "test",
          "lang": "123"
        }
      });$httpBackend.whenGET('langs/lang-en.json').respond(200, {
        "title": 'Sponzorme EN'
      });
      $httpBackend.whenGET('langs/lang-pt.json').respond(200, {
        "title": 'Sponzorme PT'
      });
      $httpBackend.whenGET('langs/lang-es.json').respond(200, {
        "title": 'Sponzorme ES'
      });
    }));
    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });
    it('Edit TaskSponzor PUT', function() {
      var returnData = {
        "message": "Updated",
        "warnings": [],
        "taskSponzor": {
          "id": "15",
          "title": "Test",
          "body": "test",
          "lang": "123"
        }
      };
      var returnedPromise = taskSponzorRequest.editTaskSponzorPut(taskSponzorId, taskSponzor);
      var result;
      returnedPromise.then(function(response) {
        result = response;
      });
      $httpBackend.flush();
      expect(result.data.message).toEqual(returnData.message);
    });
  });
});
