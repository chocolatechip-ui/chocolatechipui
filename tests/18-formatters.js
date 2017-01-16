describe("Formatters Tests:", function () {

  it('$.formatNumber(9123456789) should add commas for thousands.', function () {
    /* Format number */
    var number = $.formatNumber(9123456789);
    /* Test result */
    expect(number).to.equal('9,123,456,789');
  });

  it('$.formatNumber(9123456789.2382) should add commas for thousands with decimals.', function () {
    /* Format number */
    var number = $.formatNumber(9123456789.2382);
    /* Test result */
    expect(number).to.equal('9,123,456,789.2382');
  });

  it('$.formatNumber(9123456789.2382, ",", 2) should round to two decimal places.', function () {
    /* Format number */
    var number = $.formatNumber(9123456789.2382, ",", 2);
    /* Test result */
    expect(number).to.equal('9,123,456,789.24');
  });

  it('$.formatNumber(9123456789.99, ",", 0) should round to whole number.', function () {
    /* Format number */
    var number = $.formatNumber(9123456789.99, ",", 0);
    /* Test result */
    expect(number).to.equal('9,123,456,790');
  });

  it('$.sum([1,2,3,4,5,6,7,8,9,10,11.2]) should equal "66.2".', function() {
    var sum = $.sum([1,2,3,4,5,6,7,8,9,10,11.2]);
    expect(sum).to.equal(66.2);
  });

  it('$.sum(1,2,3,4,5,6,7,8,9,10,11,12.4) should equal "78.4".', function() {
    var sum = $.sum(1,2,3,4,5,6,7,8,9,10,11,12.4);
    expect(sum).to.equal(78.4);
  });

  it('$.currency(9123456789.99, 0) should equal "$9,123,456,789.99".', function() {
    var currency = $.currency(9123456789.99, 0);
    expect(currency).to.equal('$9,123,456,789.99');
  });

  it('$.currency(9123456789.2382, "€") should equal "€9,123,456,789.24".', function() {
    var currency = $.currency(9123456789.2382, "€");
    expect(currency).to.equal('€9,123,456,789.24');
  });

  it('$.currency(9123456789.92612, "£", ",", "2") should equal "£9,123,456,789.93".', function() {
    var currency = $.currency(9123456789.92612, "£", ",", "2");
    expect(currency).to.equal('£9,123,456,789.93');
  });

});
