describe("Utilities Tests", function () {
  it("This is version 4.8.0.", function () {
    /* Check the version */
    expect($.version).to.equal('4.8.4');
  });

  it("This is a library named ChocolateChipJS.", function() {
    /* What library is this? */
    expect($.lib).to.equal('ChocolateChipJS');
  });

  it('$.uuid() should return a 32 character uuid.', function() {
    /* Create uuid */
    var uuid = $.uuid();
    /* uuid should contain 32 characters */
    expect(uuid.length).to.equal(32);
  });
  
  it('$.uuid() should return an alpha-numeric value.', function() {
    var uuid = $.uuid();
    /* uuid should be alpha-numeric */
    expect(/^[0-9a-zA-Z]+$/img.test(uuid)).to.equal(true);
  });
  
  it('uuids should be unique.', function() {
    var uuids = []
    /* Create 100 uuids */
    for (var i = 0; i < 100; i++) {
      uuids.push($.uuid());
    }
    /* Remove any duplicates */
    uuids.unique();
    /* Length should still be 100 */
    expect(uuids.length).to.equal(100);
  });
  
  it('$.html(markup) should create DOM nodes.', function() {
    var p = $('<p>A new paragraph!!!</p>');
    var list = $('<ul class="list"><li>One</li><li>Two</li><li>Three</li></ul>');
    /* There should only be only one node */
    expect(p.length).to.equal(1);
    /* The tagName should be P */
    expect(p[0].nodeName).to.equal('P');
    /* The tag text should be */
    expect(p.text()).to.equal('A new paragraph!!!');
    /* There should be only one node */
    expect(list.length).to.equal(1);
    /* The nodeName should be UL */
    expect(list[0].nodeName).to.equal('UL');
    /* The node should have three child nodes */
    expect(list[0].children.length).to.equal(3);
    /* Child nodes should be list items */
    expect(list[0].children[0].nodeName).to.equal('LI');
    expect(list[0].children[1].nodeName).to.equal('LI');
    expect(list[0].children[2].nodeName).to.equal('LI');
    /* Child nodes should have text: One, Two, Three */
    expect(list.children().eq(0).text()).to.equal('One');
    expect(list.children().eq(1).text()).to.equal('Two');
    expect(list.children().eq(2).text()).to.equal('Three');
  });
  
  it('$.require(script) should import script and expose data.', function(done) {
    $.require('../tests-resources/required-script.js', function(param) {
      done();
      /* Check the result of the imported script */
      expect(newstuff).to.equal('This was just imported!');
    });
  });
  
  it('$.delay(time) should return a promise after the designated amount.', function() {
    
    describe('', function() {
      it('$.delay(time) should return a promise after the designated time.', function() {
        var value;
        $.delay(500)
        .then(function() {
          return '$1,000,000'
        })
        .then(function(value) {
          expect(value).to.equal('$1,000,000')
        });
      });
    })
  });
  
  it('$.each(object) should iterate over object.', function() {
    /* Create object */
    var person = {
      name: 'Joe',
      age: 25,
      job: 'developer'
    }
    /* Iterate over object properties */
    var values = [];
    var keys = [];
    $.each(person, function(key, value) {
      values.push(value);
      keys.push(key)
    });
    /* Check keys and values of object */
    expect(values.join(' ')).to.equal('Joe 25 developer');
    expect(keys.join(' ')).to.equal('name age job');
  });
  
  it('$.each(array) should iterate over array, exposing index and context.', function() {
    /* Create an array */
    var nums = [1,2,3,4,5];
    /* Iterate over array */
    var index = [];
    var context = [];
    $.each(nums, function(idx, ctx) {
      index.push(idx);
      context.push(ctx);
    });
    /* Check index and context */
    expect(index.join(' ')).to.equal('0 1 2 3 4');
    expect(context.join(' ')).to.equal('1 2 3 4 5');
  });
  
  it('$.unique(array) shoud return copy of array without duplicates.', function() {
    var nums = [1,2,3,4,5,1,1,2,2,2,3,5,6,4,3,2,2,7,7,8,9,1,9]
    /* Before unique */
    expect(nums.length).to.equal(23);
    expect(nums.join(' ')).to.equal('1 2 3 4 5 1 1 2 2 2 3 5 6 4 3 2 2 7 7 8 9 1 9');
    /* Get copy of array without duplicates */
    var nums2 = $.unique(nums);
    expect(nums2.length).to.equal(9);
    expect(nums2.join(' ')).to.equal('1 2 3 4 5 6 7 8 9');
  });
  
  it('$.replace(newElement, oldElement) should replace old element with new.', function() {
    /* Create an element to be replaced */
    $('#HTML-tests').append('<div id="old-element">This element should be replaced.</div>');
    $.delay(1000)
    .then(function() {
      /* Check old element */
      expect($('#old-element').text()).to.equal('This element should be replaced.');
      /* Replace old element with new one */
      $.replace('<div id="new-element">This is the new element!</div>',$('#old-element'));
      return true
    })
    .then(function(success) {
      if (success) {
        /* Check the new element */
        var div = $('#new-element');
        expect(div.text()).to.equal('This is the new element!');
        /* Old element no longer exists */
        expect($('#old-element')[0]).to.equal(undefined);
      }
    });
  });
  
  it('$.isEmptyObject(object) should return a boolean.', function() {
    /* Create object */
    var obj1 = {
      name: 'Joe'
    };
    /* Create empty object */
    var emptyObj = {};
    /* Test objects */
    expect($.isEmptyObject(obj1)).to.equal(false);
    expect($.isEmptyObject(emptyObj)).to.equal(true);
  });
  
  it('$.isInteger(number) should return a boolean. Returns false for float.', function() {
    /* Test a non-number, should return false */
    expect($.isInteger('123')).to.equal(false);
    /* Test an integer, should return true */
    expect($.isInteger(123)).to.equal(true);
    /* Test a float, should return false */
    expect($.isInteger(123.234234)).to.equal(false);
  });
  
  it('$.isFloat(number) should return a boolean.', function() {
    /* Test a non-number, should return false */
    expect($.isFloat('123')).to.equal(false);
    /* Test an integer, should return false */
    expect($.isFloat(123)).to.equal(false);
    /* Test a float, should return true */
    expect($.isFloat(123.1234)).to.equal(true);
  });
  
  it('$.encode(markup) should encode markup.', function() {
    var markup = '<h1>Me & You</h1>';
    var code = '$("#element")';
    /* Test encoded markup */
    expect($.encode(markup)).to.equal('%3Ch1%3EMe%20%26%20You%3C%2Fh1%3E');
    /* Test encoded script */
    expect($.encode(code)).to.equal('%24(%22%23element%22)');
  });
  
  it('$.escapeHTML(HTML) should escape HTML.', function() {
    var markup = '<h1>Me & You</h1>';
    var code = '$("#element")';
    /* Test escaped HTML */
    expect($.escapeHTML(markup)).to.equal('&lt;h1&gt;Me &amp; You&lt;/h1&gt;');
    /* Test escaped script */
    expect($.escapeHTML(code)).to.equal('$%28"#element"%29');
  });
  
  it('$.concat() concate arguments into a string.', function() {
    /* Concat arguments into a string */
    expect($.concat(1,2,3,4,5,6)).to.equal('123456');
    expect($.concat('a','b','c','d','e')).to.equal('abcde');
    /* Concat array into a string */
    expect($.concat([1,2,3,4,5,6])).to.equal('123456');
    expect($.concat(['a','b','c','d','e'])).to.equal('abcde');
  });
  
  it('$.mixin(sourceObject, targetObject) should mixin the first object into the second.', function() {
    var object1 = {
      name: 'Joe',
      age: 32
    };
    var object2 = {
      name: 'Sam',
      age: 45,
      job: 'Mechanic',
      employer: 'Mercedes-Benz'
    };
    window.object1 = object1;
    /* Name should be Joe */
    expect(object1.name).to.equal('Joe');
    /* Age should be 32 */
    expect(object1.age).to.equal(32);
    /* Joe should not have job */
    expect(object1.job).to.equal(undefined);
    /* Joe should not have employer */
    expect(object1.employer).to.equal(undefined);
    /* Mixin second object in first */
    $.mixin(object2, object1);
    /* Name should be Joe */
    expect(object1.name).to.equal('Joe');
    /* Age should be 32 */
    expect(object1.age).to.equal(32);
    /* Joe's job should be Mechanic.' */
    expect(object1.job).to.equal('Mechanic');
    /* Joe's employer should be Merecedes-Benz.' */
    expect(object1.employer).to.equal('Mercedes-Benz');
  });

  it('$.compare(value1, value2) should compare one value to another.', function() {
    /* Compare values */
    var number = 1;
    expect(number).to.equal(1);
    var string = 'abc';
    expect($.compare(string, 'abc')).to.equal(true);
    /* Number should not equal abc */
    expect($.compare(number, 'abc')).to.equal(false);
    /* String should not equal 123 */
    expect($.compare(string, '123')).to.equal(false);
  });

  it('$.compare(array1, array2) should compare one array to another.', function() {
    /* Compare arrays */
    var array1 = [1,2,3,4,5];
    var array2 = array1
    expect($.compare(array1, array2)).to.equal(true);
    /* array1 should not equal [1,2,3] */
    expect($.compare(array1, [1,2,3])).to.equal(false);
  });

  it('$.compare(object1, object2) should compare one object to another.', function() {
    /* Compare objects */
    var object1 = {
      name: 'Joe',
      age: 32
    };
    var object2 = {
      name: 'Joe',
      age: 32
    };
    expect($.compare(object1, object2)).to.equal(true);
  });
  
  it('$.paginate(data, itemsPerChunk) should break array into designated chunks.', function() {
    var nums = [];
    for (var i = 0; i < 110; i++) {
      nums.push(i);
    }
    var chunks = $.paginate(nums, 25);
    /* Should be 5 arrays */
    expect(chunks.length).to.equal(5);
    /* First chunk should have 25 items */
    expect(chunks[0].length).to.equal(25);
    /* Last chunk should have 10 items */
    expect(chunks[chunks.length -1].length).to.equal(10);
  });
  
  it('$.flatten(array) should flatten nested arrays to one.', function() {
    var array = [[1], [[2, [[3,[4]]], [5]]]];
    var array2 = [['a'], [['b', [['c',['c']]], ['e']]]];
    /* Check nest array */
    expect(array.join('')).to.equal('12,3,4,5');
    /* Flatten array of numbers */
    var flattened = $.flatten(array);
    chai.assert.notStrictEqual(flattened, [1, 2, 3, 4, 5])
    /* Flatten array of letters */
    var flattened2 = $.flatten(array2);
    chai.assert.notStrictEqual(flattened2, ['a', 'b', 'c', 'd', 'e'])
  });
  
  it('$.throttle(callback, wait, options) should execute only designate time.', function() {
    var btn = $('#trottleBtn');
    var count = 0;
    btn.on('tap', $.throttle(function(e) {
      count++
    }, 100));
    for (var i = 0; i < 200; i++) {
      btn.trigger('tap');
    }
    /* Count should be greater than 1 */
    chai.assert.isAtLeast(count, 1);
    chai.assert.isBelow(count, 20);
  });
  
  it('$.throttle(callback, wait, options) should execute only designate time with {trailing: false}.', function() {
    var btn = $('#trottleBtn');
    var count = 0;
    btn.on('tap', $.throttle(function(e) {
      count++
    }, 100), {trailing: false});
    for (var i = 0; i < 200; i++) {
      btn.trigger('tap');
    }
    /* Count should be greater than 1 */
    chai.assert.isAtLeast(count, 1);
    chai.assert.isBelow(count, 20);
  });
  
  it('$.throttle(callback, wait, options) should execute only designate time with {leading: false}.', function() {
    var btn = $('#trottleBtn');
    var count = 0;
    btn.on('tap', $.throttle(function(e) {
      count++
    }, 100), {leading: false});
    for (var i = 0; i < 200; i++) {
      btn.trigger('tap');
    }
    /* Count should be greater than 1 */
    chai.assert.isAtLeast(count, 1);
    chai.assert.isBelow(count, 20);
  });

  it('$.debounce(callback, wait, immediate) will postpone the executionof the callback until the wait time is reached.', function() {
      /* incr function should fire until 100 ms after last keyup */
      var count = 0;
      var input = $('#input');
      var result = undefined;
      /* Function to test debounce */
      var incr = function() {
        count++;
        result = count;
      };
      /* Wire up event test */
      input.on('keyup', $.debounce(incr, 100));
      /* Fire away! */
      for(var i = 0; i < 100; i++) {
        input.trigger('keyup');
      }
      setTimeout(function() {
        expect(count).to.equal(1);
      }, 200)
  });

  it('$.once(callback) should only execute once.', function(done) {
    /* Define callback for $.once */
    var msg;
    var count = 0;
    var announce = function(message) {
      msg = message
      count++
    };
    var newMsg = announce('This is me!')
    $('#onceBtn').on('tap', $.once(newMsg)); 
    /* Fire multiple taps on button */
    for (var ii = 0; ii < 10; ii++) {
      $('#onceBtn').trigger('tap');
    }
    /* Check message & count */
    done();
    expect(msg).to.equal('This is me!');
    expect(count).to.equal(1);
  });
  
  it('$.before(times, callback) the number of times before which the callback can fire.', function(done) {    
    var count = 0;
    var increase = function() {
      count++;
    };
    var doIncrease = $.before(5, increase);
    $('#beforeBtn').on('tap', doIncrease);
    for (var i = 0; i < 20; i++) {
      $('#beforeBtn').trigger('tap');
    }
    done();
    /* Should only execute 4 times */
    expect(count).to.equal(4);
  });
  
  it('$.after(times, callback) the number of times after which a callback can fire.', function(done) {  
    var count = 0;
    var ret = [];
    var increase = function() {
      ret.push(count);
    };
    var doIncrease = $.after(5, increase);
    $('#afterBtn').on('tap', doIncrease);
    for (var i = 0; i < 10; i++) {
      count++;
      $('#afterBtn').trigger('tap');
    }
    done();

    /* Should only execute after 5 attempts */
    /* Because zero-based count, 5 will be 6th attempt */
    expect(ret[0]).to.equal(5);
  });

  it('$.on(topic, callback) should init a receiver & sender.', function() {
    var testResult = undefined;
    /* Initialize a receiver and dispatcher */
    $.on('test-mediator-1', function() {
      testResult = 'This is: test-mediator-1.'
    });
    (function() {
      $.send('test-mediator-1');
    })()
    /* Receiver: test-mediator-1 */
    expect(testResult).to.equal('This is: test-mediator-1.');
  })

  it('Setup mediator with $.on(topic, callback).', function() {
    var testResult1 = undefined;
    var count = 0;

    /* Initialize a mediator */
    var mediator = $.on('test-mediator-2', function() {
      testResult = 'This is: TEST-MEDIATOR 2!';
      count++;
    });
    (function() {
      $.send('test-mediator-2');
    })()
    setTimeout(function() {
      testResult = undefined;
      /* Run mediator directly, no dispatch */
      mediator.run();
      expect(testResult).to.equal('This is: TEST-MEDIATOR 2!');
      expect(count).to.equal(2);
    }, 1000);

    /* Test mediator responding to dispatch */
    expect(testResult).to.equal('This is: TEST-MEDIATOR 2!');
    expect(count).to.equal(1);
  });

});



