describe("Validators Tests", function () {
  /**
   * Setup for select list and multi-select list
   */
  before(function() {
    var onSwitch = $.Switch({
      element: '#switch',
      name: 'switch',
      value: 'on',
      checked: false
    });

    var selectList = $.SelectList({
      element: '#selectList',
      selected: 0,
      callback: $.noop
    });

    var multiSelectLit = $.MultiSelectList({
      element: '#multiSelectList',
      selected: [0,2],
      name: 'stuff'
    })
  });

  it('$(el).isNotEmpty() should return boolean.', function () {
    var el = $('#empty');
    /* Test should pass */
    expect(el.val()).to.equal('something');
    el.isNotEmpty();
    var test1 = el.hasClass('valid');
    expect(test1).to.equal(true);
    /* Test should fail */
    el[0].value = '';
    el.isNotEmpty();
    var test2 = el.hasClass('valid');
    expect(test2).to.equal(false);
  });

  it('$(el).validateAlphabetic() should return boolean.', function() {
    var el = $('#alphabetic');
    /* Test should pass */
    el.validateAlphabetic();
    var test1 = el.hasClass('valid');
    expect(test1).to.equal(true);
    /* Test should fail */
    el[0].value = '';
    el.validateAlphabetic();
    var test2 = el.hasClass('valid');
    expect(test2).to.equal(false);
    /* Test should fail */
    el[0].value = 123;
    el.validateAlphabetic();
    var test3 = el.hasClass('valid');
    expect(test3).to.equal(false);
  });

  it('$(el).validateText() should return boolean.', function() {
    var el = $('#text');
    /* Test should pass */
    el.validateText();
    var test1 = el.hasClass('valid');
    expect(test1).to.equal(true);
    /* Test should fail */
    el[0].value = '';
    el.validateText();
    var test2 = el.hasClass('valid');
    expect(test2).to.equal(false);
    /* Test should fail */
    el[0].value = 123;
    el.validateText();
    var test3 = el.hasClass('valid');
    expect(test3).to.equal(false);
  });

  it('$(el).validateNumber() should return boolean.', function() {
    var el = $('#number');
    /* Test should pass */
    el.validateNumber();
    var test1 = el.hasClass('valid');
    expect(test1).to.equal(true);
    /* Test should fail */
    el[0].value = '';
    el.validateNumber();
    var test2 = el.hasClass('valid');
    expect(test2).to.equal(false);
    /* Test should fail */
    el[0].value = 'text';
    el.validateNumber();
    var test3 = el.hasClass('valid');
    expect(test3).to.equal(false);
  });

  it('$(el).validateAlphaNumeric() should return boolean.', function() {
    var el = $('#alphanumeric');
    /* Test should pass */
    el.validateAlphaNumeric();
    var test1 = el.hasClass('valid');
    expect(test1).to.equal(true);
    /* Test should fail */
    el[0].value = '';
    el.validateAlphaNumeric();
    var test2 = el.hasClass('valid');
    expect(test2).to.equal(false);
    /* Test should pass */
    el[0].value = 'text';
    el.validateAlphaNumeric();
    var test2 = el.hasClass('valid');
    expect(test2).to.equal(true);
    /* Test should pass */
    el[0].value = 123;
    el.validateAlphaNumeric();
    var test2 = el.hasClass('valid');
    expect(test2).to.equal(true);
  });

  it('$(el).validateUserName(minimum) should return boolean.', function() {
    var el = $('#userName');
    /* Test should pass */
    el.validateUserName();
    var test1 = el.hasClass('valid');
    expect(test1).to.equal(true);
    /* Test should fail */
    el[0].value = '';
    el.validateUserName();
    var test2 = el.hasClass('valid');
    expect(test2).to.equal(false);
    /* Test should fail */
    el[0].value = 'joe123';
    el.validateUserName(8);
    var test2 = el.hasClass('valid');
    expect(test2).to.equal(false);
    /* Test should fail */
    el[0].value = 'joey1234';
    el.validateUserName(8);
    var test2 = el.hasClass('valid');
    expect(test2).to.equal(true);
  });

  it('$(el).validateEmail() should return boolean.', function() {
    var el = $('#email');
    /* Test should pass */
    el.validateEmail();
    var test1 = el.hasClass('valid');
    expect(test1).to.equal(true);
    /* Test should fail */
    el[0].value = '';
    el.validateEmail();
    var test2 = el.hasClass('valid');
    expect(test2).to.equal(false);
  });

  it('$(el).validatePhoneNumber() should return boolean.', function() {
    var el = $('#phone');
    /* Test should pass */
    el.validatePhoneNumber();
    var test1 = el.hasClass('valid');
    expect(test1).to.equal(true);
    /* Test should fail */
    el[0].value = '';
    el.validatePhoneNumber();
    var test2 = el.hasClass('valid');
    expect(test2).to.equal(false);
    /* Test should fail */
    el[0].value = '1234';
    el.validatePhoneNumber();
    var test3 = el.hasClass('valid');
    expect(test3).to.equal(false);
  });

  it('$(el).validateUrl() should return boolean.', function() {
    var el = $('#url');
    /* Test should pass */
    el.validateUrl();
    var test1 = el.hasClass('valid');
    expect(test1).to.equal(true);
    /* Test should fail */
    el[0].value = 'me.com';
    el.validateUrl();
    var test2 = el.hasClass('valid');
    expect(test2).to.equal(false);
  });

  it('$(el).validateAge(minimum) should return boolean.', function() {
    var el = $('#age');
    /* Test should pass */
    el.validateAge();
    var test1 = el.hasClass('valid');
    expect(test1).to.equal(true);
    /* Test should fail */
    el[0].value = '';
    el.validateAge();
    var test2 = el.hasClass('valid');
    expect(test2).to.equal(false);
  });

  it('$(el).validateCheckbox() should return boolean.', function() {
    var el = $('#checkbox');
    /* Test should fail */
    el.validateCheckbox();
    var test1 = el.hasClass('valid');
    expect(test1).to.equal(false);
    /* Test should pass */
    el.prop('checked', true);
    el.validateCheckbox();
    var test2 = el.hasClass('valid');
    expect(test2).to.equal(true);
  });

  it('$(el).validateRadioButtons() should return boolean.', function() {
    var el = $('#radio');
    /* Test should fail */
    el.validateRadioButtons();
    var test1 = el.hasClass('valid');
    expect(test1).to.equal(false);
    /* Test should pass */
    el.prop('checked', true);
    el.validateRadioButtons();
    var test2 = el.hasClass('valid');
    expect(test2).to.equal(true);
  });

  it('$(el).validateSelectBox() should return boolean.', function() {
    var el = $('#selectBox');
    /* Test should fail */
    el.validateSelectBox();
    // var test1 = el.hasClass('valid');
    // expect(test1).to.equal(false);
    /* Test should pass */
    // el.prop('selectedIndex', 1)
    // el.validateSelectBox();
    // var test2 = el.hasClass('valid');
    // expect(test2).to.equal(true);
  });

  it('$.validatePassword(input1, input2, minimum) should return boolean.', function() {
    var el1 = $('#password1');
    var el2 = $('#password2');
    /* Test should pass */
    var test1 = $.validatePassword(el1, el2);
    expect(test1).to.equal(true);
    /* Test should fail */
    el2[0].value = 'asdfljk1234';
    var test2 = $.validatePassword(el1, el2);
    expect(test2).to.equal(false);
  });

  it('$(el).validateSwitch() should return boolean.', function() {
    var el = $('#switch');
    /* Test should fail */
    el.validateSwitch();
    var test1 = el.hasClass('valid');
    expect(test1).to.equal(false);
    /* Test should pass */
    el.trigger('tap');
    el.validateSwitch();
    var test2 = el.hasClass('valid');
    expect(test2).to.equal(false);
  });

  it('$(el).validateSelectList() should return boolean.', function() {
    var el = $('#selectList');
    /* Test should pass */
    var test1 = el.validateSelectList();
    expect(test1).to.equal(true);
    /* Test should fail */
    el.find('input').forEach(function(input) {
      $(input).removeAttr('checked')
    })
    var test2 = el.validateSelectList();
    expect(test2).to.equal(false);
  });

  it('$(el).validateMultiSelectList() should return boolean.', function() {
    var el = $('#multiSelectList');
    /* Test should pass */
    var test1 = el.validateMultiSelectList();
    expect(test1).to.equal(true);
    /* Test should fail */
    el.find('input').forEach(function(input) {
      $(input).removeProp('checked')
    })
    var test2 = el.validateMultiSelectList();
    expect(test2).to.equal(false);
  });

  it('$.validateWithRegex(element, regex) should return boolean.', function() {
    var el = $('#validateWithRegex');
    /* Test should fail */
    $.validateWithRegex(el, /^[0-9]*$/);
    var test1 = el.hasClass('valid');
    expect(test1).to.equal(false);
    /* Test should pass */
    el[0].value = '0123456789';
    $.validateWithRegex(el, /^[0-9]*$/);
    var test2 = el.hasClass('valid');
    expect(test2).to.equal(true);
  });
  
});

