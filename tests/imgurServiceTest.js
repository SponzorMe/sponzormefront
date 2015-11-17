describe("imgurService Tests", function() {

  beforeEach(function() {
    module('imgurService');
  });

  var imgurRequest;

  var httpBackend = null;

  beforeEach(inject(function(_imgurRequest_) {
    imgurRequest = _imgurRequest_;
  }));
  //allCategories
  describe('Test', function() {

    var $httpBackend;

    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });
    it('Upload Image', function() {
      var myImage='0139423074982hkdksfh8329479812hjkfkd9';
      inject(function($injector) {
        // Set up the mock http service responses
        $httpBackend = $injector.get('$httpBackend');
        $httpBackend.when('POST', 'https://api.imgur.com/3/image').respond(200, {
          data:{
            link:'http://myImage.com/hi.png'
          }
        });
      })
      var returnData = {
        link:'http://myImage.com/hi.png'
      };
      var returnedPromise = imgurRequest.uploadImage(myImage);
      var result;
      returnedPromise.then(function(response) {
        result = response;
      });
      $httpBackend.flush();
      expect(result.data.data.link).toEqual(returnData.link);
    });
  });
});
