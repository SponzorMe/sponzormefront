describe("TaskSponzor Service Unit Tests", function() {

  beforeEach(function() {
    module('taskSponzorService');
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
      $httpBackend.when('GET', 'http://apistaging.sponzor.me/task_sponzor').respond(200, {
        "success": true
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
      $httpBackend.when('GET', 'http://apistaging.sponzor.me/task_sponzor/'+taskSponzorId).respond(200, {
      "data": {
        "taskSponzor": {
          "id": "3",
          "title": "Dancing",
          "body": "All About the Bussines!",
          "lang": "en",
          "events": []
        }
      }
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
      $httpBackend.when('POST', 'http://apistaging.sponzor.me/task_sponzor').respond(200, {
        "message": "Inserted",
        "taskSponzor": {
          "title": "Test",
          "body": "test",
          "lang": "123",
          "id": 15
        }
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
      $httpBackend.when('DELETE', 'http://apistaging.sponzor.me/task_sponzor/'+taskSponzorId).respond(200, {
        "message": "Deleted"
      })
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
      $httpBackend.when('PATCH', 'http://apistaging.sponzor.me/task_sponzor/'+taskSponzorId).respond(200, {
        "message": "Updated",
        "warnings": [],
        "taskSponzor": {
          "id": "15",
          "title": "Test",
          "body": "test",
          "lang": "123"
        }
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
      $httpBackend.when('PUT', 'http://apistaging.sponzor.me/task_sponzor/'+taskSponzorId).respond(200, {
        "message": "Updated",
        "warnings": [],
        "taskSponzor": {
          "id": "15",
          "title": "Test",
          "body": "test",
          "lang": "123"
        }
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
