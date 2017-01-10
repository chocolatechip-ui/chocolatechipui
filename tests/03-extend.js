describe("Extend Tests", function () {

  it('$.extend(obj1, obj2) should append obj2 properties to obj1, overriding any existing properties.', function() {
    var obj1 = {
      name: 'Joe'
    };
    var obj2 = {
      name: 'Sam',
      age: 32
    }
    /* Original properties of obj1 */
    expect(obj1.name).to.equal('Joe');
    expect(obj1.age).to.equal(undefined);
    /* Extend obj1 with obj2 */
    $.extend(obj1, obj2);
    /* New property values of obj1 */
    expect(obj1.name).to.equal('Sam');
    expect(obj1.age).to.equal(32);
  });

  it('$.fn.extend(obj) should extend DOMStack.', function() {
    /* Extend DOMStack */
    $.fn.extend({
      whatever: function() {
        return 'This is whatever...';
      }
    });
    var result = $('li').whatever();
    /* Should return same result regardless of how many nodes there are */
    expect(result).to.equal('This is whatever...');
  });

  it('$.fn.extend(obj) should extend DOMStack and loop over each node.', function() {
    /* Extend DOMStack and run function on every node */
    $.fn.extend({
      extendLoopFunc: function() {
        var ret = [];
        this.forEach(function(node) {
          ret.push('This is whatever...');
        });
        return ret;
      }
    });
    var results = $('li').extendLoopFunc();
    /* results length should be more than 1 */
    chai.assert.isAbove(results.length, 1);
    /* Check first item in results */
    expect(results[0]).to.equal('This is whatever...');
    /* Check last item in results */
    expect(results[results.length -1]).to.equal('This is whatever...');
  });

});