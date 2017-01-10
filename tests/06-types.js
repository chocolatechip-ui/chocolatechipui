describe("Types Tests", function () {

  it('$.type(boolean) shoudld return "boolean".', function() {
    /* Test true boolean */
    var truth = true;
    var falsehood = false;
    var booleanObj = new Boolean(true);
    expect($.type(truth)).to.equal('boolean');
    /* Test false boolean */
    expect($.type(falsehood)).to.equal('boolean');
    /* Test boolean object */
    expect($.type(booleanObj)).to.equal('boolean');
    /* Test non-boolean */
    chai.assert.notEqual($.type('abc'), 'boolean');
  });

  it('$.type(number) should return "number".', function() {
    /* Test integer */
    var int = 123;
    var float = 1.234;
    var numObj = new Number(10);
    var str = 'abc';
    expect($.type(int)).to.equal('number');
    /* Test float */
    expect($.type(float)).to.equal('number');
    /* Test number object */
    expect($.type(numObj)).to.equal('number');
    /* Test NaN */
    chai.assert.notEqual($.type(str), 'number');
  });

  it('$.type(string) should return "string".', function() {
    var str = 'abc';
    var strObj = new String('ABC');
    var int = 123;
    /* Test string */
    expect($.type(str)).to.equal('string');
    /* Test string */
    expect($.type(strObj)).to.equal('string');
    /* Test non-string */
    chai.assert.notEqual($.type(int), 'string');
  });

  it('$.type(function) should return "function".', function() {
    var func1 = function() { return; };
    var func2 = $.noop;
    var func3 = new Function(undefined, 'return');
    var str = 'abc';
    /* Test function */
    expect($.type(func1)).to.equal('function');
    /* Test function */
    expect($.type(func2)).to.equal('function');
    /* Test function */
    expect($.type(func3)).to.equal('function');
    /* Test non-fuction */
    chai.assert.notEqual($.type(str), 'function');
  });

  it('$.type(object) should return "object".', function() {
    var obj1 = {};
    var obj2 = {
      name: 'Joe'
    };
    var obj3 = new Object();
    var str = 'abc'
    /* Test object */
    expect($.type(obj1)).to.equal('object');
    /* Test object */
    expect($.type(obj2)).to.equal('object');
    /* Test object */
    expect($.type(obj3)).to.equal('object');
    /* Test non-object */
    chai.assert.notEqual($.type(str), 'object');
  });

  it('$.type(array) should return "array".', function() {
    var array1 = [];
    var array2 = [1,2,3]
    var arrayObj = new Array(['a','b','c']);
    var str = 'abc';
    /* Test array */
    expect($.type(array1)).to.equal('array');
    /* Test array */
    expect($.type(array2)).to.equal('array');
    /* Test array object */
    expect($.type(arrayObj)).to.equal('array');
    /* Test non-array */
    chai.assert.notEqual($.type(str), 'array');
  });

  it('$.type(date) should return "date".', function() {
    var date1 = new Date();
    var date2 = new Date('October 30, 2017 20:24:00');
    var str = 'abc';
    /* Test date */
    expect($.type(date1)).to.equal('date');
    /* Test date */
    expect($.type(date2)).to.equal('date');
    /* Test non-date */
    chai.assert.notEqual($.type(str), 'date');
  });

  it('$.type(error) should return "error".', function() {
    var error1 = new Error();
    var error2 = new Error('Oops!');
    var str = 'abc';
    /* Test error */
    expect($.type(error1)).to.equal('error');
    /* Test error */
    expect($.type(error2)).to.equal('error');
    /* Test error message */
    expect(error2.message).to.equal('Oops!');
    /* Test non-error */
    chai.assert.notEqual($.type(str), 'error');
  });

  it('$.type(regexp) should return "regexp".', function() {
    var str = 'abc';
    var regexp = /\w+/;
    var regexpObj = new RegExp('\\w+');
    /* Test regexp */
    expect($.type(regexp)).to.equal('regexp');
    /* Test regexp */
    expect($.type(regexpObj)).to.equal('regexp');
    /* Test non-regexp */
    chai.assert.notEqual($.type(str), 'regexp');
  });

  it('$.type(domstack) should return "domstack".', function() {
    var body = $('body');
    /* Test for DOMStack type */
    expect($.type(body)).to.equal('domstack')
  });

  it('$.type(promise) should return "promise".', function() {
    var promise = new Promise(function() {
      return 'Promise!'
    });
    var str = 'abc';
    /* Test promise */
    var check1 = $.type(promise);
    expect(check1).to.equal('promise');
    /* Test non-promise */
    chai.assert.notEqual($.type(str), 'promise');
  });

});
