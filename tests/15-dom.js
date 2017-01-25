var isPhantomJS = /PhantomJS/igm.test(navigator.userAgent);
describe("DOM Tests", function () {

  it('$(el).find(tag) should find tags that are descendents of element.', function () {
    /**
     * Test case:
    <form id='testForm'>
      <input type="text" disabled value='first input'>
      <input type="text" disabled value='second input'>
      <input type="text" disabled value='third input'>
      <input type="checkbox" value="first checkbox">
      <input type="checkbox" value="second checkbox">
      <input type="checkbox" value="third checkbox">
      <button id='a1'>Button 1</button>
      <button id='a2'>Button 2</button>
      <button id='a3'>Button 3</button>
    </form>
     */
    /* Find all buttons in body */
    var btns = $('body').find('button');
    /* Check that we got buttons */
    chai.assert.isAbove(btns.length, 0);
    chai.assert.isBelow(btns.length, 100);
    expect(btns[0].nodeType).to.equal(1);
    expect(btns[0].nodeName).to.equal('BUTTON');
    expect(btns.eq(0).text()).to.equal('Button 1');
    expect(btns.eq(1).text()).to.equal('Button 2');
    expect(btns.eq(2).text()).to.equal('Button 3');
  });

  it('$(el).find(tag) should find tags with class that are descendents of element.', function () {
    /**
     * Test case:
      <ul id='myList' role='list'>
        <li class="listItem">One</li>
        <li class="something">Two</li>
        <li class="listItem" data-my-stuff='stuff'>Three</li>
        <li id='special-item' class="something">Four</li>
        <li class="listItem">Five</li>
      </ul>
    */
    /* Find list items by class */
    var ul = $('#myList');
    var li1 = ul.find('.listItem');
    var li2 = ul.find('.something');
    /* Check that we got the right classes */
    chai.assert.isAbove(li1.length, 0);
    chai.assert.isBelow(li1.length, 100);
    chai.assert.isAbove(li2.length, 0);
    chai.assert.isBelow(li2.length, 100);
    expect(li1[0].nodeName).to.equal('LI');
    expect(li2[0].nodeName).to.equal('LI');
    /* Check that the found elements have the classes */
    expect(li1[0].classList.contains('listItem')).to.equal(true);
    expect(li2[0].classList.contains('something')).to.equal(true);
  });

  it('$(el).find(tag) should find tags with attribute that are descendents of element.', function () {
    /**
     * Test case:
    <form id='testForm'>
      <input type="text" disabled value='first input'>
      <input type="text" disabled value='second input'>
      <input type="text" disabled value='third input'>
      <input type="checkbox" value="first checkbox">
      <input type="checkbox" value="second checkbox">
      <input type="checkbox" value="third checkbox">
      <button id='a1'>Button 1</button>
      <button id='a2'>Button 2</button>
      <button id='a3'>Button 3</button>
    </form>
     */
    var form = $('form');
    var inputs = form.find('[disabled]');
    var checkboxes = form.find('[type=checkbox]');
    /* Check that we got the inputs by attribute */
    chai.assert.isAbove(inputs.length, 0);
    chai.assert.isBelow(inputs.length, 100);
    chai.assert.isAbove(checkboxes.length, 0);
    chai.assert.isBelow(checkboxes.length, 100);
    /* Check their properties, etc. */
    expect(inputs[0].nodeName).to.equal('INPUT');
    expect(checkboxes[0].nodeName).to.equal('INPUT');
    expect(inputs.eq(0).val()).to.equal('first input');
    expect(checkboxes.eq(0).val()).to.equal('first checkbox');
    expect(inputs.eq(1).val()).to.equal('second input');
    expect(checkboxes.eq(1).val()).to.equal('second checkbox');
    expect(inputs.eq(2).val()).to.equal('third input');
    expect(checkboxes.eq(2).val()).to.equal('third checkbox');
    expect(inputs[0].hasAttribute('disabled')).to.equal(true);
    /* Check their attributes */
    expect(checkboxes[0].hasAttribute('type')).to.equal(true);
    expect(checkboxes[0]['type']).to.equal('checkbox');
  });

  it('$(el).is(tag) should return true if elements match tag.', function () {
    /**
     * Test case:
    <form id='testForm'>
      <input type="text" disabled value='first input'>
      <input type="text" disabled value='second input'>
      <input type="text" disabled value='third input'>
      <input type="checkbox" value="first checkbox">
      <input type="checkbox" value="second checkbox">
      <input type="checkbox" value="third checkbox">
      <button id='a1'>Button 1</button>
      <button id='a2'>Button 2</button>
      <button id='a3'>Button 3</button>
    </form>
     */
    /* Get elements to test */
    var btn = $('button');
    var h5 = $('h5');
    var li = $('li');
    /* Setup tests */
    var btnTest1 = btn.is('button');
    var h5Test1 = h5.is('h5');
    var liTest1 = li.is('li');
    /* False tests */
    var btnTest2 = btn.is('li');
    var h5Test2 = h5.is('div');
    var liTest2 = li.is('ul');

    /* Check that elements match tags */
    expect(btn[0].nodeName).to.equal('BUTTON');
    expect(btnTest1).to.equal(true);
    expect(btnTest2).to.equal(false);
    expect(h5Test1).to.equal(true);
    /* Check false results */
    expect(h5Test2).to.equal(false);
    expect(liTest1).to.equal(true);
    expect(liTest2).to.equal(false);
  });

  it('$(el).is(id) should return true if elements that match id.', function () {
    /**
     * Test case:
    <form id='testForm'>
      <input type="text" disabled value='first input'>
      <input type="text" disabled value='second input'>
      <input type="text" disabled value='third input'>
      <input type="checkbox" value="first checkbox">
      <input type="checkbox" value="second checkbox">
      <input type="checkbox" value="third checkbox">
      <button id='a1'>Button 1</button>
      <button id='a2'>Button 2</button>
      <button id='a3'>Button 3</button>
    </form>
     */
    /* Get elements to test */
    var btn = $('button');
    /* Setup tests */
    var test1 = btn.eq(0).is('#btn1');
    var test2 = btn.eq(1).is('#btn2');
    var test3 = btn.eq(2).is('#btn3');
    /* False tests */
    var test4 = btn.eq(0).is('#whatever');
    var test5 = btn.eq(1).is('#whatever');
    var test6 = btn.eq(2).is('#whatever');
    /* Check that ids match */
    expect(test1).to.equal(true);
    expect(test2).to.equal(true);
    expect(test3).to.equal(true);
    /* Check false results */
    expect(test4).to.equal(false);
    expect(test5).to.equal(false);
    expect(test6).to.equal(false);
  });

  it('$(el).is(class) should return true if elements match class.', function () {
    /**
     * Test case:
      <ul id='myList' role='list'>
        <li class="listItem">One</li>
        <li class="something">Two</li>
        <li class="listItem" data-my-stuff='stuff'>Three</li>
        <li id='special-item' class="something">Four</li>
        <li class="listItem">Five</li>
      </ul>
    */
    /* Get elements to test */
    var ul = $('#myList');
    var li = ul.find('li');
    /* Setup tests */
    var test1 = li.eq(0).is('.listItem');
    var test2 = li.eq(1).is('.something');
    var test3 = li.eq(2).is('.listItem');
    var test4 = li.eq(3).is('.something');
    var test5 = li.eq(4).is('.listItem');
    /* False tests */
    var test6 = li.eq(0).is('.puppy-monkey-baby');
    var test7 = li.eq(1).is('.puppy-monkey-baby');
    var test8 = li.eq(2).is('.puppy-monkey-baby');
    var test9 = li.eq(3).is('.puppy-monkey-baby');
    var test10 = li.eq(4).is('.puppy-monkey-baby');
    /* Check that classes match */
    expect(test1).to.equal(true);
    expect(test2).to.equal(true);
    expect(test3).to.equal(true);
    expect(test4).to.equal(true);
    expect(test5).to.equal(true);
    /* Check false results */
    expect(test6).to.equal(false);
    expect(test7).to.equal(false);
    expect(test8).to.equal(false);
    expect(test9).to.equal(false);
    expect(test10).to.equal(false);
  });

  it('$(el).is(attribute) should return true if elements match attribute.', function () {
    /**
     * Test case:
    <form id='testForm'>
      <input type="text" disabled value='first input'>
      <input type="text" disabled value='second input'>
      <input type="text" disabled value='third input'>
      <input type="checkbox" value="first checkbox">
      <input type="checkbox" value="second checkbox">
      <input type="checkbox" value="third checkbox">
      <button id='a1'>Button 1</button>
      <button id='a2'>Button 2</button>
      <button id='a3'>Button 3</button>
    </form>
     */
    /* Get elements to test */
    var form = $('form');
    var inputs = form.find('input');
    /* Setup tests */
    var test1 = inputs.eq(0).is('[type=text]');
    var test2 = inputs.eq(1).is('[disabled]');
    var test3 = inputs.eq(2).is('[type=text]');
    var test4 = inputs.eq(3).is('[type=checkbox]');
    var test5 = inputs.eq(4).is('[type=checkbox]');
    var test6 = inputs.eq(5).is('[type=checkbox]');
    /* False tests */
    var test7 = inputs.eq(5).is('[whatever]');
    var test8 = inputs.eq(5).is('[whatever]');
    var test9 = inputs.eq(5).is('[whatever]');
    var test10 = inputs.eq(5).is('[whatever]');
    var test11 = inputs.eq(5).is('[disabled]');
    var test12 = inputs.eq(5).is('[whatever]');
    /* Check that classes match */
    expect(test1).to.equal(true);
    expect(test2).to.equal(true);
    expect(test3).to.equal(true);
    expect(test4).to.equal(true);
    expect(test5).to.equal(true);
    expect(test6).to.equal(true);
    /* Check false results */
    expect(test7).to.equal(false);
    expect(test8).to.equal(false);
    expect(test9).to.equal(false);
    expect(test10).to.equal(false);
    expect(test11).to.equal(false);
    expect(test12).to.equal(false);
  });

  it('$(el).not(tag) should return elements without tag.', function () {
    /**
     * Test case:
    <form id='testForm'>
      <input type="text" disabled value='first input'>
      <input type="text" disabled value='second input'>
      <input type="text" disabled value='third input'>
      <input type="checkbox" value="first checkbox">
      <input type="checkbox" value="second checkbox">
      <input type="checkbox" value="third checkbox">
      <button id='a1'>Button 1</button>
      <button id='a2'>Button 2</button>
      <button id='a3'>Button 3</button>
    </form>
     */
    /* Get elements to test */
    var formEls = $('#testForm').children();
    /* Test tags */
    var test1 = formEls.not('a');
    var test2 = formEls.not('h1');
    var test3 = formEls.not('button');
    var test4 = formEls.not('input');
    /* Check for results */
    expect(test1.length).to.equal(9);
    expect(test2.length).to.equal(9);
    expect(test3.length).to.equal(6);
    expect(test4.length).to.equal(3);
    expect(test1.eq(0)[0].nodeName).to.equal('INPUT');
    expect(test1.eq(-1)[0].nodeName).to.equal('BUTTON');
    expect(test2.eq(0)[0].nodeName).to.equal('INPUT');
    expect(test2.eq(-1)[0].nodeName).to.equal('BUTTON');
    expect(test3.eq(0)[0].nodeName).to.equal('INPUT');
    expect(test3.eq(1)[0].nodeName).to.not.equal('BUTTON');
    expect(test3.eq(-1)[0].nodeName).to.equal('INPUT');
    expect(test4.eq(0)[0].nodeName).to.equal('BUTTON');
    expect(test4.eq(1)[0].nodeName).to.not.equal('INPUT');
    expect(test4.eq(-1)[0].nodeName).to.equal('BUTTON');
  });

  it('$(el).not(id) should return elements without id.', function () {
    /**
     * Test case:
    <form id='testForm'>
      <input type="text" disabled value='first input'>
      <input type="text" disabled value='second input'>
      <input type="text" disabled value='third input'>
      <input type="checkbox" value="first checkbox">
      <input type="checkbox" value="second checkbox">
      <input type="checkbox" value="third checkbox">
      <button id='a1'>Button 1</button>
      <button id='a2'>Button 2</button>
      <button id='a3'>Button 3</button>
    </form>
     */
    /* Get elements to test */
    var formEls = $('#testForm').children();
    /* Test tags */
    var test1 = formEls.not('#a1');
    var test2 = formEls.not('#a2');
    var test3 = formEls.not('#a3');
    /* Before filter */
    expect(formEls.length).to.equal(9);
    /* Check for results */
    expect(test1.length).to.equal(8);
    test1.forEach(function(el) {
      expect(el.id).to.not.equal('a1');
    });
    expect(test2.length).to.equal(8);
    test2.forEach(function(el) {
      expect(el.id).to.not.equal('a2');
    });
    expect(test3.length).to.equal(8);
    test3.forEach(function(el) {
      expect(el.id).to.not.equal('a3');
    });
    /* Check that buttons were filtered by id */
    var btns1 = test1.array.some(function(el) {
      return el.nodeName === 'BUTTON';
    });
    expect(btns1).to.equal(true);
    var btns2 = test1.filter(function(el) {
      return el.nodeName === 'BUTTON';
    });
    expect(btns2.length).to.equal(2);
    expect(btns2.eq(0)[0].id).to.equal('a2');
    expect(btns2.eq(1)[0].id).to.equal('a3');
  });

  it('$(el).not(class) should return elements without class.', function () {
    /**
     * Test case:
      <ul id='myList' role='list'>
        <li class="listItem">One</li>
        <li class="something">Two</li>
        <li class="listItem" data-my-stuff='stuff'>Three</li>
        <li id='special-item' class="something">Four</li>
        <li class="listItem">Five</li>
      </ul>
    */
    /* Get elements to test */
    var li = $('#myList').children();
    /* Before filter */
    expect(li.length).to.equal(5)
    /* Test tags */
    var test1 = li.not('.something');
    var test2 = li.not('.listItem');
    /* Check for results */
    expect(test1.length).to.equal(3);
    expect(test2.length).to.equal(2);

    expect().to.equal();
  });

  it('$(el).not(attribute) should return elements without attribute.', function () {
    /**
     * Test case:
    <form id='testForm'>
      <input type="text" disabled value='first input'>
      <input type="text" disabled value='second input'>
      <input type="text" disabled value='third input'>
      <input type="checkbox" value="first checkbox">
      <input type="checkbox" value="second checkbox">
      <input type="checkbox" value="third checkbox">
      <button id='a1'>Button 1</button>
      <button id='a2'>Button 2</button>
      <button id='a3'>Button 3</button>
    </form>
     */
    /* Get elements to test */
    var formEls = $('#testForm').children();
    /* Test tags */
    var test1 = formEls.not('[value]');
    var test2 = formEls.not('[value$=checkbox]');
    var test3 = formEls.not('[value$=input]');
    /* Check for results */
    expect(test1.length).to.equal(3);
    expect(test2.length).to.equal(6);
    expect(test3.length).to.equal(6);
    test1.forEach(function(btn) {
      expect(btn.nodeName).to.equal('BUTTON')
    });
    var btns1 = test2.some(function(btn) {
      return btn.nodeName === 'BUTTON';
    });
    /* Should be no checkboxes here */
    expect(btns1).to.equal(true);
    var checkboxes = test2.some(function(el) {
      return /checkbox/img.test(el.value);
    });
    expect(checkboxes).to.equal(false);
    /* Now we should find checkboxes */
    checkboxes = test3.some(function(el) {
      return /checkbox/img.test(el.value);
    })
    expect(checkboxes).to.equal(true);
  });

  it('$(el).has(selector) should return element that has selector descendants.', function () {
    /**
     * Test case:
      <ul id='myList' role='list'>
        <li class="listItem">One</li>
        <li class="something">Two</li>
        <li class="listItem" data-my-stuff='stuff'>Three</li>
        <li id='special-item' class="something">Four</li>
        <li class="listItem">Five</li>
      </ul>
    */
    /* Get elements to test */
    var ul = $('#myList');
    /* Test tags */
    var test1 = ul.has('li');
    var test2 = ul.has('.listItem');
    var test3 = ul.has('h1');
    var li = $('#myList').find('li');
    var test4 = ul.has(li);
    /* Check for results */
    expect(test1.length).to.equal(1);
    expect(test2.length).to.equal(1);
    expect(test3.length).to.equal(0);
    expect(test4.length).to.equal(1);
  });

  it('$(el).has(node) should return element that has node descendants.', function () {
    /**
     * Test case:
      <ul id='myList' role='list'>
        <li class="listItem">One</li>
        <li class="something">Two</li>
        <li class="listItem" data-my-stuff='stuff'>Three</li>
        <li id='special-item' class="something">Four</li>
        <li class="listItem">Five</li>
      </ul>
    */
    /* Get elements to test */
    var ul = $('#myList');
    var li = $('#myList').find('li');
    var input = $('input');
    /* Test tags */
    var test1 = ul.has(li[0]);
    var test2 = ul.has(li);
    /* This should fail */
    var test3 = ul.has(input);
    /* Check for results */
    expect(test1.length).to.equal(1);
    expect(test2.length).to.equal(1);
    /* Should return empty */
    expect(test3.length).to.equal(0);
  });

  it('$(el).prev() should return previous node.', function () {
    /**
     * Test case:
      <ul id='myList' role='list'>
        <li class="listItem">One</li>
        <li class="something">Two</li>
        <li class="listItem" data-my-stuff='stuff'>Three</li>
        <li id='special-item' class="something">Four</li>
        <li class="listItem">Five</li>
      </ul>
    */
    /* Get elements to test */
    var li = $('#special-item');
    var btn = $('#btn3');
    var form = $('#testForm');
    /* Test tags */
    var prevLi = li.prev();
    var prevBtn = btn.prev();
    var prevList = form.prev();
    /* Check for results */
    expect(prevLi[0].className).to.equal('listItem');
    expect(prevBtn[0].id).to.equal('btn2');
    expect(prevList[0].nodeName).to.equal('UL');
    expect(prevList[0].id).to.equal('myList');
  });

  it('$(el).prev(selector) should previous node matching the selector.', function () {
    /* Get elements to test */
    var li = $('#special-item');
    var btn = $('#btn3');
    var form = $('#testForm');
    /* Test tags */
    var prevLi1 = li.prev('.listItem');
    /* No match */
    var prevLi2 = li.prev('.something');
    var prevBtn1 = btn.prev('button');
    /* No match */
    var prevBtn2 = btn.prev('input');
    var prevList1 = form.prev('#myList');
    /* No match */
    var prevList2 = form.prev('#someStuff');
    /* Check for results */
    expect(prevLi1[0].className).to.equal('listItem');
    expect(prevLi1[0].nodeName).to.equal('LI');
    /* No match */
    expect(prevLi2.length).to.equal(0);
    expect(prevBtn1[0].id).to.equal('btn2');
    /* No match */
    expect(prevBtn2.length).to.equal(0);
    expect(prevList1[0].nodeName).to.equal('UL');
    /* No match */
    expect(prevList2.length).to.equal(0);
  });

  it('$(el).prevAll() should return all previous nodes.', function () {
    /* Get elements to test */
    var btn = $('#a3');
    var li = $('#special-item');
    /* Test tags */
    var btnPrev = btn.prevAll();
    var liPrev = li.prevAll();
    /* Check for results */
    expect(btnPrev.length).to.equal(8);
    expect(btnPrev.eq(0)[0].nodeName).to.equal('INPUT');
    expect(btnPrev.eq(-1)[0].nodeName).to.equal('BUTTON');
    expect(liPrev.length).to.equal(3);
    expect(liPrev.eq(0)[0].className).to.equal('listItem');
    expect(liPrev.eq(1)[0].className).to.equal('something');
  });

  it('$(el).prevAll(selector) should return all previous nodes matching selector.', function () {
    /* Get elements to test */
    var btn = $('#a3');
    var li = $('#special-item');
    /* Test tags */
    var btnPrev1 = btn.prevAll('input');
    var btnPrev2 = btn.prevAll('button');
    var btnPrev3 = btn.prevAll('h1');
    var liPrev1 = li.prevAll('.listItem');
    var liPrev2 = li.prevAll('.something');
    var liPrev3 = li.prevAll('.nothingFound');
    /* Check for results */
    expect(btnPrev1.length).to.equal(6);
    expect(btnPrev2.length).to.equal(2);
    expect(liPrev1.length).to.equal(2);
    expect(liPrev2.length).to.equal(1);
    /* No match */
    expect(btnPrev3.length).to.equal(0);
    expect(liPrev3.length).to.equal(0);

  });

  it('$(el).next() should return next element.', function () {
    /* Get elements to test */
    var firstLi = $('#myList').find('li').eq(0);
    var firstInput = $('#testForm').find('input').eq(0);
    /* Test tags */
    var nextLi = firstLi.next();
    var nextInput = firstInput.next();
    /* Check for results */
    expect(nextLi.length).to.equal(1);
    expect(nextLi.text()).to.equal('Two');
    expect(nextInput.length).to.equal(1);
    expect(nextInput.val()).to.equal('second input');
  });

  it('$(el).next(selector) should return next element that matches selector.', function () {
    /* Get elements to test */
    var firstLi = $('#myList').find('li').eq(0);
    var firstInput = $('#testForm').find('input').eq(0);
    /* Test tags */
    var nextLi1 = firstLi.next('li');
    var nextLi2 = firstLi.next('.listItem');
    var nextInput1 = firstInput.next('[disabled]');
    var nextInput2 = firstInput.next('button');
    /* No match */
    var nextLi4 = firstLi.next('h1');
    var nextInput3 = firstInput.next('h1');
    /* Check for results */
    expect(nextLi1.length).to.equal(1);
    expect(nextLi1.text()).to.equal('Two');
    expect(nextInput1.length).to.equal(1);
    expect(nextInput1.val()).to.equal('second input');
    /* No match */
    expect(nextLi2.length).to.equal(0);
    expect(nextInput2.length).to.equal(0);
  });

  it('$(el).nextAll() should return all next elements.', function () {
    /* Get elements to test */
    var firstLi = $('#myList').find('li').eq(0);
    var firstInput = $('#testForm').find('input').eq(0);
    /* Test tags */
    var nextLi = firstLi.nextAll();
    var nextInput = firstInput.nextAll();
    /* Check for results */
    expect(nextLi.length).to.equal(4);
    expect(nextInput.length).to.equal(8);
    expect().to.equal();
    expect().to.equal();
  });

  it('$(el).nextAll(selector) should return all next elements that match selector.', function () {
    /* Get elements to test */
    var firstLi = $('#myList').find('li').eq(0);
    var firstInput = $('#testForm').find('input').eq(0);
    /* Test tags */
    var nextLi1 = firstLi.nextAll('li');
    var nextLi2 = firstLi.nextAll('.listItem');
    var nextLi3 = firstLi.nextAll('.nothing');
    var nextInput1 = firstInput.nextAll('[disabled]');
    var nextInput2 = firstInput.nextAll('button');
    var nextInput3 = firstInput.nextAll('h1');
    /* Check for results */
    expect(nextLi1.length).to.equal(4);
    expect(nextLi1.eq(3).text()).to.equal('Five');
    expect(nextLi2.length).to.equal(2);
    expect(nextLi2.eq(1).text()).to.equal('Five');
    expect(nextInput1.length).to.equal(2);
    expect(nextInput1.eq(1).val()).to.equal('third input');
    expect(nextInput2.length).to.equal(3);
    expect(nextInput2.eq(2).text()).to.equal('Button 3');
    /* No match */
    expect(nextLi3.length).to.equal(0);
    expect(nextInput3.length).to.equal(0);

  });

  it('$(el).first() should return first element.', function () {
    /* Get elements to test */
    var li = $('#myList').find('li');
    var input = $('#testForm').find('input');
    /* Test tags */
    var firstLi = li.first();
    var firstInput = input.first();
    /* Check for results */
    expect(firstLi.length).to.equal(1);
    expect(firstLi.text()).to.equal('One');
    expect(firstInput.length).to.equal(1);
    expect(firstInput.val()).to.equal('first input');
  });

  it('$(el).last() should return last element.', function () {
    /* Get elements to test */
    var li = $('#myList').find('li');
    var input = $('#testForm').find('input');
    /* Test tags */
    var lastLi = li.last();
    var lastInput = input.last();
    /* Check for results */
    expect(lastLi.length).to.equal(1);
    expect(lastLi.text()).to.equal('Five');
    expect(lastInput.length).to.equal(1);
    expect(lastInput.val()).to.equal('third checkbox');
    expect(lastInput.attr('type')).to.equal('checkbox');
  });

  it('$(el).index() should return index of first element.', function () {
    /* Get elements to test */
    var li = $('#myList').find('li');
    var input = $('#testForm').find('input');
    var emptyStack = $('#nothing');
    /* Test tags */
    var liIndex = li.index();
    var inputIndex = li.index();
    var noIndex = emptyStack.index();
    /* Check for results */
    expect(liIndex).to.equal(0);
    expect(inputIndex).to.equal(0);
    expect(noIndex).to.equal(-1);
  });

  it('$(el).index(selector) should return selector in collection.', function () {
    /* Get elements to test */
    var li = $('#myList').find('li');
    var input = $('#testForm').find('input');
    /* Test tags */
    li1Index = li.index('li');
    li2Index = li.index('li:last-of-type');
    input1Index = input.index('input');
    input2Index = input.index('input:last-of-type');
    /* No match */
    li3Index = li.index('nothing');
    input3Index = input.index('nothing');
    /* Check for results */
    expect(li1Index).to.equal(0);
    expect(li2Index).to.equal(4);
    expect(input1Index).to.equal(0);
    expect(input2Index).to.equal(5);
    /* No match */
    expect(li3Index).to.equal(-1);
    expect(input3Index).to.equal(-1);
  });

  it('$(el).index(element) should return index of element.', function () {
    /* Get elements to test */
    var li = $('#myList').find('li');
    var li1 = $('#myList').find('li').eq(0);
    var li2 = $('#myList').find('li').eq(1);
    var li3 = $('#myList').find('li').eq(2);
    var input = $('#testForm').find('input');
    var input1 = $('#testForm').find('input').eq(0);
    var input2 = $('#testForm').find('input').eq(1);
    var input3 = $('#testForm').find('input').eq(2);
    /* Test tags */
    var liIndex1 = li.index(li1);
    var liIndex2 = li.index(li2[0]);
    var liIndex3 = li.index(li3[0]);
    var inputIndex1 = input.index(input1);
    var inputIndex2 = input.index(input2[0]);
    var inputIndex3 = input.index(input3[0]);
    /* Check for results */
    expect(liIndex1).to.equal(0);
    expect(liIndex2).to.equal(1);
    expect(liIndex3).to.equal(2);
    expect(inputIndex1).to.equal(0);
    expect(inputIndex2).to.equal(1);
    expect(inputIndex3).to.equal(2);
  });

  it('$(el).children() should return all child nodes.', function () {
    /* Get elements to test */
    var list = $('#myList');
    var form = $('#testForm');
    /* Test tags */
    var listChildren = list.children();
    var formChildren = form.children();
    /* Check for results */
    expect(listChildren.length).to.equal(5);
    expect(listChildren[0].nodeName).to.equal('LI');
    expect(formChildren.length).to.equal(9);
    expect(formChildren.first()[0].nodeName).to.equal('INPUT');
    expect(formChildren.last()[0].nodeName).to.equal('BUTTON');
  });

  it('$(el).children(selector) should return all child nodes that match selector.', function () {
    /* Get elements to test */
    var list = $('#myList');
    var form = $('#testForm');
    /* Test tags */
    var listChildren = list.children('li');
    var formInputs = form.children('input');
    var formBtns = form.children('button');
    /* Check for results */
    expect(listChildren.length).to.equal(5);
    expect(listChildren.first()[0].nodeName).to.equal('LI');
    expect(listChildren.last()[0].nodeName).to.equal('LI');
    expect(formInputs.length).to.equal(6);
    expect(formInputs.first()[0].nodeName).to.equal("INPUT");
    expect(formInputs.last()[0].nodeName).to.equal('INPUT');
    expect(formBtns.length).to.equal(3);
    expect(formBtns.first()[0].nodeName).to.equal('BUTTON');
    expect(formBtns.last()[0].nodeName).to.equal('BUTTON');
  });

  it('$(el).siblings() should return all siblings.', function () {
    /* Get elements to test */
    var firstLi = $('#myList').children().first();
    var firstInput = $('#testForm').children().first();
    /* Test tags */
    var liSiblings = firstLi.siblings();
    var inputSiblings = firstInput.siblings();
    /* Check for results */
    expect(liSiblings.length).to.equal(4);
    expect(inputSiblings.length).to.equal(8);
    expect(liSiblings[0].nodeName).to.equal('LI');
    expect(liSiblings.eq(-1)[0].nodeName).to.equal('LI');
    expect(inputSiblings[0].nodeName).to.equal('INPUT');
    expect(inputSiblings.eq(-1)[0].nodeName).to.equal('BUTTON');
  });

  it('$(el).siblings(selector) should return siblings that match selector.', function () {
    /* Get elements to test */
    var firstLi = $('#myList').children().eq(2);
    var firstInput = $('#testForm').children().first();
    /* Test tags */
    var liSiblings = firstLi.siblings('li');
    var inputSiblings = firstInput.siblings('input');
    var buttontSiblings = firstInput.siblings('button');
    /* Check for results */
    expect(liSiblings.length).to.equal(4);
    expect(inputSiblings.length).to.equal(5);
    expect(buttontSiblings.length).to.equal(2);
    expect(liSiblings[0].nodeName).to.equal('LI');
    expect(inputSiblings[0].nodeName).to.equal('INPUT');
    expect(buttontSiblings[0].nodeName).to.equal('BUTTON');
  });

  it('$(el).parent() should return parent.', function () {
    /* Get elements to test */
    var li = $('#special-item');
    var btn = $('#a1');
    /* Test tags */
    var liParent = li.parent();
    var btnParent = btn.parent();
    /* Check for results */
    expect(liParent.length).to.equal(1);
    expect(liParent[0].nodeName).to.equal('UL');
    expect(btnParent.length).to.equal(1);
    expect(btnParent[0].nodeName).to.equal('FORM');
  });

  it('$(el).parent(selector) should return parent if it matches the selector.', function () {
    /* Get elements to test */
    var li = $('#special-item');
    /* Get elements to test */
    var btn = $('#a1');
    // Bypass PhantomJS check.
    // Browser test working as expect.
    // PhantomJS throwing errors.
    // Headless browser means no brain :-/
    if (!isPhantomJS) {
      /* Test tags */
      var liParent = li.parent('ul');
      var btnParent = btn.parent('form');
      var parent1 = li.parent('form');
      var parent2 = btn.parent('ul');
      /* Check for results */
      expect(liParent.length).to.equal(1);
      expect(liParent[0].nodeName).to.equal('UL');
      expect(btnParent.length).to.equal(1);
      expect(btnParent[0].nodeName).to.equal('FORM');
      /* Should fail */
      expect(parent1.length).to.equal(0);
      expect(parent2.length).to.equal(0);
    }
  });

  it('$(el).closest(selector) should return close ancestor that matches the selector.', function () {
    /* Get elements to test */
    var li = $('#special-item');
    var btn = $('#a1');
    /* Test tags */
    var closest1 = li.closest('ul');
    var closest2 = btn.closest('form');
    var closest3 = li.closest('#HTML-tests');
    var closest4 = btn.closest('#HTML-tests');
    var closest5 = li.closest('#mocha');
    var closest6 = btn.closest('#mocha');
    /* Check for results */
    expect(closest1.length).to.equal(1);
    expect(closest1[0].nodeName).to.equal('UL');
    expect(closest2.length).to.equal(1);
    expect(closest2[0].nodeName).to.equal('FORM');
    expect(closest3.length).to.equal(1);
    expect(closest3[0].nodeName).to.equal('DIV');
    expect(closest3[0].id).to.equal('HTML-tests');
    expect(closest4.length).to.equal(1);
    expect(closest4[0].nodeName).to.equal('DIV');
    expect(closest4[0].id).to.equal('HTML-tests');
    /* Should fail */
    expect(closest5.length).to.equal(0);
    expect(closest6.length).to.equal(0);
  });

  it('$(el).css(property) should return value of of element\'s property.', function () {
    /* Test to get value of element's CSS property */
    /* Get elements to test */
    var li = $('#special-item');
    /* Test tags */
    var green = li.css('background-color');
    var fontSize = li.css('font-size')
    /* Check for results */
    expect(green).to.equal('rgb(0, 128, 0)');
    expect(fontSize).to.equal('20px');
  });

  it('$(el).css(propety, value) should set element\'s property to value.', function () {
    /* Test to set value of element's CSS property */
    /* Get elements to test */
    var li = $('#special-item');
    /* Test tags */
    li.css('padding', '20px');
    var padding = li.css('padding');
    li.css('color', 'rgb(255, 0, 0)');
    var color = li.css('color');
    /* Check for results */
    expect(padding).to.equal('20px');
    expect(color).to.equal('rgb(255, 0, 0)');
  });

  it('$(el).css({property: value}) should set element\'s property to value.', function () {
    /* Test to set value of element's CSS property */
    /* Get elements to test */
    var li = $('#special-item');
    /* Test tags */
    li.removeAttr('style');
    li.css({padding: '20px', color: 'rgb(255, 0, 0)'});
    var padding = li.css('padding');
    var color = li.css('color');
    /* Check for results */
    expect(padding).to.equal('20px');
    expect(color).to.equal('rgb(255, 0, 0)');
  });

  it('$(el).width() should return width of element.', function () {
    /* Get elements to test */
    var li = $('#special-item');
    var btn = $('#btn3');
    li.css('width', '300px');
    btn.css('width', '200px');
    /* Test tags */
    var liWidth = li.width();
    var btnWidth = btn.width();
    /* Check for results */
    expect(liWidth).to.equal(300);
    expect(btnWidth).to.equal(200);
  });

  it('$(el).width(number) should set width of element to number + pixels.', function () {
    /* Get elements to test */
    var li = $('#special-item');
    var btn = $('#btn3');
    /* Test tags */
    li.width(500);
    btn.width(400);
    var liWidth = li.width();
    var btnWidth = btn.width();
    /* Check for results */
    expect(liWidth).to.equal(500);
    expect(btnWidth).to.equal(400);
  });

  it('$(el).width(number + length identifier) should set width of element to number + length identifier.', function () {
    /* Get elements to test */
    var li = $('#special-item');
    var btn = $('#btn3');
    /* Test tags */
    li.width('222px');
    btn.width('153px');
    var liWidth = li.width();
    var btnWidth = btn.width();
    /* Check for results */
    expect(liWidth).to.equal(222);
    expect(btnWidth).to.equal(153);
  });

  it('$(el).height() should return height of element.', function () {
    /* Get elements to test */
    var li = $('#special-item');
    var btn = $('#btn3');
    li.css('height', '300px');
    btn.css('height', '200px');
    /* Test tags */
    var liHeight = li.height();
    var btnHeight = btn.height();
    /* Check for results */
    expect(liHeight).to.equal(300);
    expect(btnHeight).to.equal(200);
  });

  it('$(el).height(number) should set height of element to number + pixels.', function () {
    /* Get elements to test */
    var li = $('#special-item');
    var btn = $('#btn3');
    /* Test tags */
    li.height(500);
    btn.height(400);
    var liHeight = li.height();
    var btnHeight = btn.height();
    /* Check for results */
    expect(liHeight).to.equal(500);
    expect(btnHeight).to.equal(400);
  });

  it('$(el).height(number + length identifier) should set height of element to number + length identifier.', function () {
    /* Get elements to test */
    var li = $('#special-item');
    var btn = $('#btn3');
    /* Test tags */
    li.height('222px');
    btn.height('153px');
    var liHeight = li.height();
    var btnHeight = btn.height();
    /* Check for results */
    expect(liHeight).to.equal(222);
    expect(btnHeight).to.equal(153);
  });

  it('$(el).before(text) should append text before element.', function () {
    /* Get elements to test */
    var el = $('#beforeTest');
    /* Test tags */
    el.before('This is Before() test text.');
    var prev = el[0].previousSibling;
    var text = prev.textContent;
    /* Check for results */
    expect(prev.nodeType).to.equal(3);
    expect(text).to.equal('This is Before() test text.');
  });

  it('$(el).before(markup) should append markup before element.', function () {
    /* Get elements to test */
    var el = $('#beforeTest');
    /* Test tags */
    el.before('<p>This is a paragraph inserted before test element.</p>');
    var p = el.prev();
    var text = p.text();
    /* Check for results */
    expect(p[0].nodeName).to.equal('P');
    expect(text).to.equal('This is a paragraph inserted before test element.');
  });

  it('$(el).after(text) should append text after element.', function () {
    /* Get elements to test */
    var el = $('#afterTest');
    /* Test tags */
    el.after('This is After() test text.');
    var next = el[0].nextSibling;
    var text = next.textContent;
    /* Check for results */
    expect(next.nodeType).to.equal(3);
    expect(text).to.equal('This is After() test text.');
  });

  it('$(el).after(markup) should append markup after element.', function () {
    /* Get elements to test */
    var el = $('#afterTest');
    /* Test tags */
    el.after('<p>This is a paragraph inserted before test element.</p>');
    var p = el.next();
    var text = p.text();
    /* Check for results */
    expect(p[0].nodeName).to.equal('P');
    expect(text).to.equal('This is a paragraph inserted before test element.');
  });

  it('$(el).prepend(text) should prepend text inside element.', function () {
    /* Get elements to test */
    var el = $('#prependTest');
    /* Test tags */
    el.prepend('This is prepended.');
    var text = el[0].firstChild.textContent;
    /* Check for results */
    expect(text).to.equal('This is prepended.');
  });

  it('$(el).prepend(markup) should prepend markup inside element.', function () {
    /* Get elements to test */
    var el = $('#prependTest');
    /* Test tags */
    el.prepend('<span>This is a prepended SPAN.</span>');
    var span = el.find('span');
    /* Check for results */
    expect(span[0].nodeName).to.equal('SPAN');
    expect(span.text()).to.equal('This is a prepended SPAN.');
  });



  it('$(el).append(text) should append text inside element.', function () {
    /* Get elements to test */
    var el = $('#appendTest');
    /* Test tags */
    el.append('This is appended.');
    var text = el[0].lastChild.textContent;
    /* Check for results */
    expect(text).to.equal('This is appended.');
  });

  it('$(el).append(markup) should append markup at end of element.', function () {
    /* Get elements to test */
    var el = $('#appendTest');
    /* Test tags */
    el.append('<span>This is an appended SPAN.</span>');
    var span = el.find('span');
    /* Check for results */
    expect(span[0].nodeName).to.equal('SPAN');
    expect(span.text()).to.equal('This is an appended SPAN.');
  });

  it('$(markup).prependTo(element) should prepend markup to element.', function () {
    /* Get elements to test */
    var el = $('#prependToTest');
    /* Test tags */
    $('<p>This is a prepended paragraph.</p>').prependTo(el);
    var p = el.find('p');
    /* Check for results */
    expect(p[0].nodeName).to.equal('P');
    expect(el[0].firstChild).to.equal(p[0])
    expect(p.text()).to.equal('This is a prepended paragraph.');
  });

  it('$(firstElement).prependTo(secondElement) should remove firstElement from DOM and prepend it to secondElement.', function () {
    /* Get elements to test */
    var el = $('#prependToTest');
    var stuff = $('#someStuff');
    /* Test tags */
    var location1 = $('h5').next();
    $(stuff).prependTo(el);
    var location2 = $('h5').next();
    /* Check for results */
    expect(location1[0].id).to.equal('someStuff');
    /* Tag was moved */
    expect(location2[0].id).to.equal('someStuff2');
    expect(el.children()[0].id).to.equal('someStuff');
    expect(el.children()[0].textContent).to.equal('Stuff');
  });

  it('$(markup).appendTo(element) should append markup to element.', function () {
    /* Get elements to test */
    var el = $('#appendToTest');
    /* Test tags */
    $('<p>This is a prepended paragraph.</p>').prependTo(el);
    var p = el.find('p');
    /* Check for results */
    expect(p[0].nodeName).to.equal('P');
    expect(el[0].firstChild).to.equal(p[0])
    expect(p.text()).to.equal('This is a prepended paragraph.');
  });

  it('$(firstElement).appendTo(secondElement) should remove firstElement from DOM and append it to secondElement.', function () {
    /* Get elements to test */
    var el = $('#appendToTest');
    var stuff = $('#someStuff2');
    /* Test tags */
    var location1 = $('h5').next();
    $(stuff).appendTo(el);
    var location2 = $('h5').next();
    /* Check for results */
    expect(location1[0].id).to.equal('someStuff2');
    /* Tag was moved */
    expect(location2[0].className).to.equal('whatever');
    expect(el.children().eq(-1)[0].id).to.equal('someStuff2');
    expect(el.children().eq(-1)[0].textContent).to.equal('Stuff 2');
  });

  it('$(el).(selector) should .', function () {
    /* Get elements to test */
    var el = $('.cloneTest');
    /* Test tags */
    var singleEl = el.length;
    var clone = el.clone();
    $('#HTML-tests').append(clone);
    var twoEls = $('.cloneTest');
    /* Check for results */
    expect(singleEl).to.equal(1);
    expect(twoEls.length).to.equal(2);
  });

  it('$(selector).wrap(markup) should wrap selector with markup.', function () {
    /* Get elements to test */
    var base = $('#wrapTest');
    /* Test tags */
    var parent = base.parent();
    base.wrap('<div id="wrapperDiv"></div>');
    var wrapper = $('#wrapTest').parent();
    /* Check for results */
    expect(parent[0].id).to.equal('HTML-tests');
    expect(wrapper[0].id).to.equal('wrapperDiv');
  });

  it('$(selector).unwrap() should .', function () {
    /* Get elements to test */
    var base = $('#wrapTest');
    /* Test tags */
    var wrapper = base.parent();
    base.unwrap();
    var parent = $('#wrapTest').parent();
    /* Check for results */
    expect(wrapper[0].id).to.equal('wrapperDiv');
    expect(parent[0].id).to.equal('HTML-tests');
  });

  it('$(el).offset() should return offset object of element.', function () {
    /* Get elements to test */
    var el = $('#offsetTest');
    /* Test tags */
    var offset = el.offset();
    /* Check for results */
    chai.assert.isAbove(offset.top, 200);
    chai.assert.isAbove(offset.left, 300);
    chai.assert.isAbove(offset.bottom, 0);
    chai.assert.isAbove(offset.right, 0);
  });

  it('$(el).position() should return the top and left coordinates of the element.', function () {
    /* Get elements to test */
    var el = $('#offsetTest');
    /* Test tags */
    var position = el.position();
    /* Check for results */
    expect(position.top).to.equal(200);
    expect(position.left).to.equal(300);
  });

  it('$(el).empty() should remove everything, node and text, from element.', function () {
    /* Get elements to test */
    var node = $('#emptyTest');
    /* Test tags */
    var children = node.children();
    node.empty();
    var nodeChildren = node.children();
    /* Check for results */
    expect(node.text()).to.equal('');
    expect(children.length).to.equal(1);
    expect(nodeChildren.length).to.equal(0);
  });

  it('$(el).html() should return element contents as a string.', function () {
    /* Test tags */
    var el1 = $('#htmlTest1');
    var el2 = $('#htmlTest2');
    /* Test tags */
    var test1 = el1.html();
    var test2 = el2.html();
    /* Check for results */
    expect(test1).to.equal('This is text.');
    expect(typeof test2).to.equal('string');
    expect(test2).to.equal("<h5>This is an H5.</h5>");
  });

  it('$(el).html(text) should set content of element.', function () {
    /* Get elements to test */
    var el1 = $('#htmlTest1');
    var el2 = $('#htmlTest2');
    /* Test tags */
    el1.html('Replacing what was here.');
    el2.html('Another replacement.')
    /* Check for results */
    expect(el1.text()).to.equal('Replacing what was here.');
    expect(el2.text()).to.equal('Another replacement.');
  });

  it('$(el).html(markup) should set content of element with provided markup.', function () {
    /* Get elements to test */
    var el1 = $('#htmlTest1');
    var el2 = $('#htmlTest2');
    /* Test tags */
    el1.html('<h2>A title here</h2>');
    el2.html('<h3>Another title here</h3>');
    /* Check for results */
    expect(el1[0].firstElementChild.nodeName).to.equal('H2');
    expect(el2[0].firstElementChild.nodeName).to.equal('H3');
    expect(el1.text()).to.equal('A title here');
    expect(el2.text()).to.equal('Another title here');
  });

  it('$(el).text() should return text of element.', function () {
    /* Get elements to test */
    var el = $('#textTest');
    /* Test tags */
    var text = el.text();
    /* Check for results */
    expect(text).to.equal('Test test 123!');
  });

  it('$(el).text(text) should set text of element.', function () {
    /* Get elements to test */
    var el = $('#textTest');
    /* Test tags */
    el.text('The quality of mercy is not strained...')
    /* Check for results */
    expect(el.text()).to.equal('The quality of mercy is not strained...');
  });

  it('$(el).replaceWith(markup) should replace element with provided markup.', function () {
    /* Get elements to test */
    var el = $('#toBeReplaced');
    /* Test tags */
    el.replaceWith('<p id="brandNewElement">This is the replacement.</p>')
    var el2 = $('#toBeReplaced');
    var el3 = $('#brandNewElement');
    /* Check for results */
    expect(el.length).to.equal(1);
    /* Replaced element no long exists */
    expect(el2.length).to.equal(0);
    expect(el3.length).to.equal(1);
    expect(el3[0].id).to.equal('brandNewElement');
  });

  it('$(el).replaceWith(element) should element with provided element.', function () {
    /* This should pluck element from DOM and replace target at its location */
    /* Get elements to test */
    var el1 = $('#toBeReplaced1');
    var el2 = $('#toBeReplaced2');
    /* Test tags */
    el1.replaceWith(el2);
    var test1 = $('#toBeReplaced1');
    var test2 = $('#toBeReplaced2');
    /* Check for results */
    expect($('#toBeReplaced1').length).to.equal(0);
    expect(test1.length).to.equal(0);
    expect(test2.length).to.equal(1);
    expect(test2[0].id).to.equal('toBeReplaced2');
  });

  it('$(el).remove() should should be removed from DOM.', function () {
    /* Get elements to test */
    var el = $('#removeTest');
    /* Test tags */
    var test1 = el.text();
    el.remove();
    var test2 = $('#removeTest');
    /* Check for results */
    expect(test1).to.equal('To be removed.');
    expect(el.length).to.equal(1);
    expect(test2.length).to.equal(0);
  });

  it('$(el).addClass(className) should add class to element.', function () {
    /* Get elements to test */
    var el = $('#addClassTest');
    /* Test tags */
    var className1 = el[0].className;
    el.addClass('a-new-class');
    var className2 = el[0].className;
    /* Check for results */
    expect(className1).to.equal('');
    expect(className2).to.equal('a-new-class');
  });

  it('$(el).hasClass(className) should return true if element has class.', function () {
    /* Get elements to test */
    var el = $('#hasClassTest');
    /* Test tags */
    var classTest1 = el.hasClass('nothing');
    var classTest2 = el.hasClass('has-class');
    /* Check for results */
    expect(classTest1).to.equal(false);
    expect(classTest2).to.equal(true);
  });

  it('$(el).removeClass(className) should remove class from element.', function () {
    /* Get elements to test */
    var el = $('#removeClassTest');
    /* Test tags */
    var classTest1 = el[0].className;
    el.removeClass('to-be-removed')
    var classTest2 = el[0].className;
    /* Check for results */
    expect(classTest1).to.equal('to-be-removed');
    expect(classTest2).to.equal('');
  });

  it('$(el).toggleClass(className) should add class if element does not have it, otherwise remove it.', function () {
    /* Get elements to test */
    var el = $('#toggleClassTest');
    /* Test tags */
    var classTest1 = el[0].className;
    el.toggleClass('a-toggle-class');
    var classTest2 = el[0].className;
    el.toggleClass('a-toggle-class');
    var classTest3 = el[0].className;
    /* Check for results */
    expect(classTest1).to.equal('');
    expect(classTest2).to.equal('a-toggle-class');
    expect(classTest3).to.equal('');
  });

  it('$(el).attr(attribute) should return value of element\'s attribute.', function () {
    /* Get elements to test */
    var el = $('#attrTest');
    /* Test tags */
    var attrTest1 = el.attr('disabled');
    var attrTest2 = el.attr('title');
    var attrTest3 = el.attr('whatever');
    /* Check for results */
    expect(attrTest1).to.equal('disabled');
    expect(attrTest2).to.equal('test title');
    /* Should fail */
    expect(attrTest3).to.equal('');
  });

  it('$(el).attr(attribute, value) should add attribute and value to element.', function () {
    /* Get elements to test */
    var el = $('#attrTest');
    /* Test tags */
    var attrTest1 = el.attr('role');
    el.attr('role', 'menu');
    var attrTest2 = el.attr('role');
    el.attr('disabled', false);
    var attrTest3 = el.attr('disabled');
    /* Check for results */
    expect(attrTest1).to.equal('');
    expect(attrTest2).to.equal('menu');
    expect(attrTest3).to.equal('false');
  });

  it('$(el).removeAttr(attribute) should remove the attribute from the element.', function () {
    /* Get elements to test */
    var el = $('#attrTest');
    /* Test tags */
    var attrTest1 = el.attr('role');
    el.removeAttr('role');
    var attrTest2 = el.attr('role');
    /* Check for results */
    expect(attrTest1).to.equal('menu');
    expect(attrTest2).to.equal('');
  });

  it('$(el).prop(property) should .', function () {
    /* Get elements to test */
    var el = $('#attrTest');
    var el2 = $('#hasClassTest');
    /* Test tags */
    var propTest1 = el.prop('nodeName');
    var propTest2 = el.prop('nodeType');
    var propTest3 = el2.prop('className');
    var propTest4 = el.prop('className')
    /* Check for results */
    expect(propTest1).to.equal('DIV');
    expect(propTest2).to.equal(1);
    /* Should fail */
    expect(propTest4).to.equal(undefined);

  });

  it('$(el).prop(property, value) should set the property adn value on the element.', function () {
    /* Get elements to test */
    var input = $('#propInput');
    var select = $('#propSelect')
    /* Test tags */
    var attrTest1 = input.prop('disabled');
    var attrTest2 = input.prop('checked');
    var attrTest3 = select.prop('selectedIndex');
    input.prop('disabled', true);
    input.prop('checked', true);
    select.prop('selectedIndex', 1);
    var attrTest4 = input.prop('disabled');
    var attrTest5 = input.prop('checked');
    var attrTest6 = select.prop('selectedIndex');
    /* Check for results */
    expect(attrTest1).to.equal(undefined);
    expect(attrTest2).to.equal(undefined);
    expect(attrTest3).to.equal(undefined);
    expect(attrTest4).to.equal(true);
    expect(attrTest5).to.equal(true);
    expect(attrTest6).to.equal(1);
  });

  it('$(el).removeProp(selector) should remove the property from the element.', function () {
    /* Get elements to test */
    var input = $('#propInput');
    /* Test tags */
    var attrTest1 = input.prop('disabled');
    var attrTest2 = input.prop('checked');
    input.removeProp('disabled');
    input.removeProp('checked');
    var attrTest3 = input.prop('disabled');
    var attrTest4 = input.prop('checked');
    /* Check for results */
    expect(attrTest1).to.equal(true);
    expect(attrTest2).to.equal(true);
    expect(attrTest3).to.equal(undefined);
    expect(attrTest4).to.equal(undefined);
  });

  it('$(el).disable() should disable element and add class "disabled".', function () {
    /* Get elements to test */
    var input = $('#propInput');
    /* Test tags */
    var test1 = input.prop('disabled');
    var test2 = input.hasClass('disabled');
    input.disable();
    var test3 = input.prop('disabled');
    var test4 = input.hasClass('disabled');
    /* Check for results */
    expect(test1).to.equal(undefined);
    expect(test2).to.equal(false);
    expect(test3).to.equal(true);
    expect(test4).to.equal(true);
  });

  it('$(el).enable() should enable element and remove class "disabled".', function () {
    /* Get elements to test */
    var input = $('#propInput');
    /* Test tags */
    var test1 = input.prop('disabled');
    var test2 = input.hasClass('disabled');
    input.enable();
    var test3 = input.prop('disabled');
    var test4 = input.hasClass('disabled');
    /* Check for results */
    expect(test1).to.equal(true);
    expect(test2).to.equal(true);
    expect(test3).to.equal(undefined);
    expect(test4).to.equal(false);
  });

  it('$(el).val() should return value of element.', function () {
    /* Get elements to test */
    var input = $('#propInput');
    /* Test tags */
    var test1 = input.val();
    /* Check for results */
    expect(test1).to.equal('This is a checkbox');
  });

  it('$(el).val(value) should set value of element.', function () {
    /* Get elements to test */
    var input = $('#propInput');
    var test1 = input.val();
    input.val('This is a new value, really');
    var test2 = input.val();
    /* Test tags */
    /* Check for results */
    expect(test1).to.equal('This is a checkbox');
    expect(test2).to.equal('This is a new value, really');
  });

  it('$(el).hide() should set display to "none".', function () {
    /* Get elements to test */
    var input = $('#propInput');
    /* Test tags */
    var test1 = input.css('display');
    input.hide();
    var test2 = input.css('display');
    /* Check for results */
    expect(test1).to.equal('inline-block');
    expect(test2).to.equal('none');
  });

  it('$(el).show(selector) should show hidden element, resetting its display to what it was when hidden.', function () {
    /* Get elements to test */
    var input = $('#propInput');
    var div = $('#someStuff');
    /* Test tags */
    input.css('display', 'none');
    var test1 = input.css('display');
    input.show();
    var test2 = input.css('display');
    div.hide();
    var test3 = div.css('display');
    div.show();
    var test4 = div.css('display');
    /* Check for results */
    expect(test1).to.equal('none');
    expect(test2).to.equal('inline-block');
    expect(test3).to.equal('none');
    expect(test4).to.equal('block');
  });

  it('$(el).unique() should remove duplicate nodes from DOMStack.', function () {
    /* Get elements to test */
    var listItems = $('#myList').find('li');
    var listItems2 = $('#myList').find('li');
    /* Test tags */
    var test1 = listItems.length;
    listItems.concat(listItems2);
    var test2 = listItems.length;
    listItems.unique();
    var test3 = listItems.length;
    /* Check for results */
    expect(test1).to.equal(5);
    expect(test2).to.equal(10);
    expect(test3).to.equal(5);
  });
  
});

