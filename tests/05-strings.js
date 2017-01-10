describe("String Tests", function () {


  it('$.camelize(string) should camelize the string.', function() {
    /* Camelize a hyphenated strig */
    var string = 'this-is-a-string.'
    var camelized = $.camelize(string);
    expect(string).to.equal('this-is-a-string.');
    expect(camelized).to.equal('thisIsAString.');
  });

  it('$.deCamelize(string) should decamelize and hyphenate the string.', function() {
    /* Decamelize and hyphenate a camel case string */
    var string = 'someTextHereToTest';
    var hyphenated = $.deCamelize(string);
    expect(string).to.equal('someTextHereToTest');
    expect(hyphenated).to.equal('some-text-here-to-test');
  });

  it('$.capitalize(string) should capitalize the first letter of each word.', function() {
    var string = 'this is some text to capitalize.';
    var capitalized = $.capitalize(string);
    /* Capitalize first letter of the phrase */
    expect(string).to.equal('this is some text to capitalize.');
    expect(capitalized).to.equal('This is some text to capitalize.');
  });
});