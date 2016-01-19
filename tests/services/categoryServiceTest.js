describe("Category Service Unit Tests", function() {

  beforeEach(function() {
    module('sponzorme');
  });

  var categoryRequest;

  var httpBackend = null;

  beforeEach(inject(function(_categoryRequest_) {
    categoryRequest = _categoryRequest_;
  }));
  //allCategories
  it('should be true', function(){
    expect(1).toBe(1);
  });
});
