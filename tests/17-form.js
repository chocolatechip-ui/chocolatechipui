describe("Form Tests", function () {
  /**
   * Setup for select list and multi-select list
   */
  before(function() {
    var onSwitch = $.Switch({
      element: '#switch',
      name: 'user_inputs_switch',
      value: 'on',
      checked: true
    });

    var selectList = $.SelectList({
      element: '#selectList',
      selected: 1,
      name: 'user_todo',
      callback: $.noop
    });

    var multiSelectLit = $.MultiSelectList({
      element: '#multiSelectList',
      selected: [0,2],
      name: 'user_fruits[]'
    });

    $.registerCustomValidator('custom-numberCheck', /^[0-9]*$/);

    var myForm = $.Form([
      {
        element: '#empty',
        type: 'notempty'
      },
      {
        element: '#text',
        type: 'text'
      },
       {
        element: '#number',
        type: 'number'
      },
      {
        element: '#alphanumeric',
        type: 'alphanumeric'
      },
      {
        element: '#userName',
        type: 'username'
      },
      {
        element: '#email',
        type: 'email'
      },
      {
        element: '#phone',
        type: 'phone'
      },
      {
        element: '#url',
        type: 'url'
      },
      {
        element: '#age',
        type: 'age'
      },
      {
        element: '#password1',
        element2: '#password2',
        type: 'password',
        min: 6,
        callback: function() {
          console.log('The passwords to not match!')
        }
      },
      {
        element: '#checkbox',
        type: 'checkbox'
      },
      {
        element: '#radio',
        type: 'radio'
      },
      {
        element: '#withRegex',
        type: 'custom-numberCheck'
      },
      {
        element: '#selectBox',
        type: 'selectbox'
      },
      {
        element: '#switch',
        type: 'switch'
      },
      {
        element: '#selectList',
        type: 'selectlist'
      },
      {
        element: '#multiSelectList',
        type: 'multiselectlist'
      }
    ]);
    window.myForm = myForm;
  });

  it('$.Form([{element: "#empty", type: "notempty"}]) should validate and return value of input.', function () {
    var formData = myForm.get();
    expect(formData.user.inputs.empty).to.equal('This is not empty');
  });

  it('$.Form([{element: "#text", type: "text"}]) should validate and return value of input.', function () {
    var formData = myForm.get();
    expect(formData.user.inputs.text).to.equal('text');
  });

  it('$.Form([{element: "#number", type: "number"}]) should validate and return value of input.', function () {
    var formData = myForm.get();
    expect(formData.user.inputs.number).to.equal('1234');
  });

  it('$.Form([{element: "#alphanumeric", type: "alphanumeric"}]) should validate and return value of input.', function () {
    var formData = myForm.get();
    expect(formData.user.inputs.alphanumeric).to.equal('asdf1234');
  });

  it('$.Form([{element: "#userName", type: "userName"}]) should validate and return value of input.', function () {
    var formData = myForm.get();
    expect(formData.user.inputs.userName).to.equal('Joe123');
  });

  it('$.Form([{element: "#email", type: "email"}]) should validate and return value of input.', function () {
    var formData = myForm.get();
    expect(formData.user.inputs.email).to.equal('me@me.com');
  });

  it('$.Form([{element: "#phone", type: "phone"}]) should validate and return value of input.', function () {
    var formData = myForm.get();
    expect(formData.user.inputs.phone).to.equal('123-123-1234');
  });

  it('$.Form([{element: "#url", type: "url"}]) should validate and return value of input.', function () {
    var formData = myForm.get();
    expect(formData.user.inputs.url).to.equal('http://me.com');
  });

  it('$.Form([{element: "#age", type: "age"}]) should validate and return value of input.', function () {
    var formData = myForm.get();
    expect(formData.user.inputs.age).to.equal('21');
  });

  it('$.Form([{element: "#checkbox", type: "checkbox"}]) should validate and return value of input.', function () {
    var formData = myForm.get();
    expect(formData.user.inputs.checkbox).to.equal('on');
  });

  it('$.Form([{element: "#radio", type: "radio"}]) should validate and return value of input.', function () {
    var formData = myForm.get();
    expect(formData.user.inputs.radio).to.equal('on');
  });

  it('$.Form([{element: "#selectBox", type: "selectbox"}]) should validate and return value of input.', function () {
    var formData = myForm.get();
    expect(formData.user.inputs.choice).to.equal('eat');
  });

  it('$.Form([{element: "#password1", element2: "password2" type: "password"}]) should validate and return value of input.', function () {
    var formData = myForm.get();
    expect(formData.user.inputs.password).to.equal('asdf1234');
  });

  it('$.Form([{element: "#withRegex", type: "custom-numberCheck"}]) should validate and return value of input.', function () {
    /**
     * This contains a custom validator created with: 
     * $.registerCustomValidator('custom-numberCheck', /^[0-9]*$/)
     */
    var formData = myForm.get();
    expect(formData.user.inputs.regex).to.equal('0123456789');
  });

  it('$.Form([{element: "#switch", type: "switch"}]) should validate and return value of input.', function () {
    var formData = myForm.get();
    expect(formData.user.inputs.switch).to.equal('on');
  });

  it('$.Form([{element: "#selectList", type: "selectlist"}]) should validate and return value of input.', function () {
    var formData = myForm.get();
    expect(formData.user.todo).to.equal('play');
  });

  it('$.Form([{element: "#multiSelectList", type: "multiselectlist"}]) should validate and return value of input.', function () {
    var formData = myForm.get();
    chai.assert.notStrictEqual(formData.user.fruits, ["apples", "bananas"]);
  });
});

