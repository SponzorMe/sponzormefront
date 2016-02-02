describe('taskSponzor Service Unit Tests', function() {
  var taskSponzorRequest;
  var $httpBackend;
  beforeEach(function() {
    module('sponzorme');
  });
  beforeEach(inject(function(_taskSponzorRequest_, $injector) {
    taskSponzorRequest = _taskSponzorRequest_;
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
  var taskSponzorId = Math.floor((Math.random() * 100));
  var token = 'my-test-token-'+ new Date().getTime();
  var data = {};
  it('Should be taskSponzorRequest defined', function() {
    expect(taskSponzorRequest).toBe.defined;
    $httpBackend.flush();
  });
  it('Should be createtaskSponzor success', function() {
    $httpBackend.whenPOST(apiUrl + 'task_sponzor').respond(200, {
      'success': true
    });
    var returnedPromise = taskSponzorRequest.createTaskSponzor(data);
    var successData, errorData;
    returnedPromise.then(function(response) {
      successData = response;
    }, function(err) {
      errorData = err;
    });
    $httpBackend.flush();
    expect(successData.data.success).toBe(true);
    expect(errorData).not.toBeDefined;
  });
  it('Should be createtaskSponzor failed', function() {
    $httpBackend.whenPOST(apiUrl + 'task_sponzor').respond(400, {
      'success': false
    });
    var returnedPromise = taskSponzorRequest.createTaskSponzor(data);
    var successData, errorData;
    returnedPromise.then(function(response) {
      successData = response;
    }, function(err) {
      errorData = err;
    });
    $httpBackend.flush();
    expect(errorData.data.success).toBe(false);
    expect(successData).not.toBeDefined;
  });
  it('Should be deletetaskSponzor success', function() {
    $httpBackend.whenDELETE(apiUrl + 'task_sponzor/' + taskSponzorId).respond(200, {
      'success': true
    });
    var returnedPromise = taskSponzorRequest.deleteTaskSponzor(taskSponzorId);
    var successData, errorData;
    returnedPromise.then(function(response) {
      successData = response;
    }, function(err) {
      errorData = err;
    });
    $httpBackend.flush();
    expect(successData.data.success).toBe(true);
    expect(errorData).not.toBeDefined;

  });
  it('Should be deletetaskSponzor failed', function() {
    $httpBackend.whenDELETE(apiUrl + 'task_sponzor/' + taskSponzorId).respond(400, {
      'success': false
    });
    var returnedPromise = taskSponzorRequest.deleteTaskSponzor(taskSponzorId);
    var successData, errorData;
    returnedPromise.then(function(response) {
      successData = response;
    }, function(err) {
      errorData = err;
    });
    $httpBackend.flush();
    expect(errorData.data.success).toBe(false);
    expect(successData).not.toBeDefined;
  });
  it('Should be edittaskSponzorPatch success', function() {
    $httpBackend.whenPATCH(apiUrl + 'task_sponzor/' + taskSponzorId).respond(200, {
      'success': true
    });
    var returnedPromise = taskSponzorRequest.editTaskSponzorPatch(taskSponzorId);
    var successData, errorData;
    returnedPromise.then(function(response) {
      successData = response;
    }, function(err) {
      errorData = err;
    });
    $httpBackend.flush();
    expect(successData.data.success).toBe(true);
    expect(errorData).not.toBeDefined;
  });
  it('Should be edittaskSponzorPatch failed', function() {
    $httpBackend.whenPATCH(apiUrl + 'task_sponzor/' + taskSponzorId).respond(400, {
      'success': false
    });
    var returnedPromise = taskSponzorRequest.editTaskSponzorPatch(taskSponzorId);
    var successData, errorData;
    returnedPromise.then(function(response) {
      successData = response;
    }, function(err) {
      errorData = err;
    });
    $httpBackend.flush();
    expect(errorData.data.success).toBe(false);
    expect(successData).not.toBeDefined;
  });
});
