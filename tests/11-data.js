describe("Data Tests", function () {

  it('$(selector).data(key, value) shoule set provided key and value on element.', function() {
    /* set data on element with key & value */
    var ul = $('#myList');
    ul.data('test_for_data', 'This is some data!');
    /* Test that data was bound to element */
    expect(ul.data('test_for_data')).to.equal('This is some data!');
    $('body').data('body_data', [1,2,3]);
    var check1 = $('body').data('body_data');
    expect(check1.join('')).to.equal('123');
  });

  it('$(selector).data(key) should return value set on element.', function() {
    var ul = $('#myList');
    var body = $('body');
    /* Get data based on key */
    var check1 = ul.data('test_for_data');
    var check2 = body.data('body_data');
    expect(check1).to.equal('This is some data!');
    expect(check2.join('')).to.equal('123');
  });

  it('$(selector).dataRemove(key) should remove data with that key on element.', function() {
    $('#someStuff').data('special', 'This has not be removed yet.');
    var check1 = $('#someStuff').data('special');
    /* Check that data is present */
    expect(check1).to.equal('This has not be removed yet.');
    /* Check that data was removed */
    $('#someStuff').removeData('special');
    var check2 = $('#someStuff').data('special');
    expect(check2).to.equal(undefined);
  });

  it('$(selector).dataRemove() should remove all data from element.', function() {
    $('#someStuff').removeData();
    $('#someStuff').data('more_stuff', 'Another test for data.');
    $('#someStuff').data('whatever', 'This is some more data to test.')
    var check1 = $('#someStuff').data('more_stuff');
    var check2 = $('#someStuff').data('whatever');
    /* Check that data is present */
    expect(check1).to.equal('Another test for data.');
    expect(check2).to.equal('This is some more data to test.');
    /* Check that data was removed */
    $('#someStuff').removeData();
    var check3 = $('#someStuff').data('more_stuff');
    expect(check3).to.equal(undefined);
  });
});

