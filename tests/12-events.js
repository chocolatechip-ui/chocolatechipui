describe("Events Tests", function () {

  it('$(el).on(event, callback) should register event on element.', function () {
    var btn = $('#testBtn1');
    var check1 = undefined;
    /* Register tap */
    btn.on('tap', function() {
      check1 = $(this).text();
    });
    btn.trigger('tap');
    expect(check1).to.equal('Test Button 1');
    /* Register mousedown and touchstart on same element. */
    var check2 = undefined;
    btn.on($.eventStart, function() {
      check2 = 'This event start thingie works!';
    });
    /* Fire first event again */
    check1 = undefined;
    btn.trigger('tap');
    $.delay(100).then(function() {
      expect(check1).to.equal('Test Button 1');
      expect(check2).to.equal('This event start thingie works!');
    });
  });

  it('Should be able to register multiple events of same type on same element.', function() {
    var btn = $('#testBtn2');
    var check1 = undefined;
    var check2 = undefined;
    btn.on('tap', function() {
      check1 = 'From first tap event.'
    });
    btn.on('tap', function() {
      check2 = 'From second tap event.'
    });
    btn.trigger('tap');
    $.delay(100).then(function() {
      expect(check1).to.equal('From first tap event.');
      expect(check2).to.equal('From second tap event.');
    });
  });

  it('Shoud be able to register different types of events on same element.', function() {
    var btn = $('#testBtn3');
    var check1 = undefined;
    var check2 = undefined;
    var check3 = undefined;
    btn.on('tap', function() {
      check1 = 'From tap!';
    });

    btn.on('longtap', function() {
      check2 = 'From long tap...';
    });

    btn.on('doubletap', function() {
      check3 = 'You tapped twice!';
    });
    btn.trigger('tap');
    btn.trigger('longtap');
    btn.trigger('doubletap');
    expect(check1).to.equal('From tap!'); 
    expect(check2).to.equal('From long tap...'); 
    expect(check3).to.equal('You tapped twice!');
  });

  it('$(el).on(event, function(e){}) should expose event object as first parameter of callback.', function() {
    var btn = $('#testBtn4');
    var check1 = undefined;
    var check2 = undefined;
    var check3 = undefined;
    var check4 = undefined
    btn.on('tap', function(e) {
      check1 = e.target;
      check2 = e.type;
      check3 = e.defaultPrevented;
      check4 = e.data;
    });
    btn.trigger('tap', {msg: 'Some data to pass along.'});
    expect(check1.nodeName).to.equal('BUTTON');
    expect(check2).to.equal('tap');
    expect(check3).to.equal(false);
    expect(check4.msg).to.equal('Some data to pass along.');
  })

  it('$(el).on(event, element, callback) should delegate events from the parent to the children.', function() {
    var ul = $('#myList');
    var li = ul.find('li');
    var delegate = undefined;
    /* Define event on list to be delegated to list items */
    ul.on('tap', 'li', function(e) {
      delegate = this;
    });
    /* Fire event on first list item */
    li.eq(0).trigger('tap');
    /* Check results, should be captured by list items */
    expect(delegate.parentNode.nodeName).to.equal('UL');
    expect(delegate.nodeType).to.equal(1);
    expect(delegate.nodeName).to.equal('LI');
    expect(delegate.textContent).to.equal('One');
    /* Fire event on third list item */
    li.eq(2).trigger('tap');
    expect(delegate.parentNode.nodeName).to.equal('UL');
    expect(delegate.nodeType).to.equal(1);
    expect(delegate.nodeName).to.equal('LI');
    expect(delegate.textContent).to.equal('Three');
    /* Fire event on fourth list item */
    li.eq(3).trigger('tap');
    expect(delegate.parentNode.nodeName).to.equal('UL');
    expect(delegate.nodeType).to.equal(1);
    expect(delegate.nodeName).to.equal('LI');
    expect(delegate.textContent).to.equal('Four');
  });

  it('$(el).off(event) should remove provided event from element.', function() {
    var btn = $('#testBtn5');
    var check1 = undefined;
    var check2 = undefined;
    /* Register tap event */
    btn.on('tap', function() {
      check1 = 'The button was tapped.'
    });
    /* Regiester double tap */
    btn.on('doubletap', function() {
      check2 = 'The button was tapped twice.'
    });
    /* Trigger tap */
    btn.trigger('tap');
    expect(check1).to.equal('The button was tapped.');
    /* Trigger double tap */
    btn.trigger('doubletap');
    expect(check2).to.equal('The button was tapped twice.');
    /* Remove tap event from button */
    btn.off('tap');
    /* Reset check */
    check1 = undefined;
    check2 = undefined;
    /* Trigger tap again */
    btn.trigger('tap');
    /* Test result, tap should not fire */
    expect(check1).to.equal(undefined);
    /* Triger double tap */
    btn.trigger('doubletap');
    /* doubble tap should still fire */
    expect(check2).to.equal('The button was tapped twice.');
  });

  it('$(el).off() should remove all events from element if no event provided.', function() {
    var btn = $('#testBtn6');
    var check1 = undefined;
    var check2 = undefined;
    /* Register tap event */
    btn.on('tap', function() {
      check1 = 'The button was tapped.'
    });
    /* Regiester double tap */
    btn.on('doubletap', function() {
      check2 = 'The button was tapped twice.'
    });
    /* Trigger tap */
    btn.trigger('tap');
    expect(check1).to.equal('The button was tapped.');
    /* Trigger double tap */
    btn.trigger('doubletap');
    expect(check2).to.equal('The button was tapped twice.');
    /* Remove tap event from button */
    btn.off();
    /* Reset check */
    check1 = undefined;
    check2 = undefined;
    /* Trigger tap again */
    btn.trigger('tap');
    /* Test result, tap should not fire */
    expect(check1).to.equal(undefined);
    /* Triger double tap */
    btn.trigger('doubletap');
    /* doubble tap should not fire */
    expect(check2).to.equal(undefined);
  });

  it('$(el).off(event, element) should remove delegated event from children.', function() {
    var ul = $('#myList');
    var li = ul.find('li');
    var delegate1 = undefined;
    var delegate2 = undefined;
    /* Define tap event on list to be delegated to list items */
    ul.on('tap', 'li', function(e) {
      delegate1 = this;
    });
    /* Define double tap event on list to be delegated to list items */
    ul.on('doubletap', 'li', function(e) {
      delegate2 = this;
    });
    /* Fire tap event on first list item */
    li.eq(0).trigger('tap');
    /* Check results, should be captured by list items */
    expect(delegate1.parentNode.nodeName).to.equal('UL');
    expect(delegate1.nodeType).to.equal(1);
    expect(delegate1.nodeName).to.equal('LI');
    expect(delegate1.textContent).to.equal('One');
    /* Fire double tap event on first list item */
    li.eq(0).trigger('doubletap');
    /* Check results, should be captured by list items */
    expect(delegate1.parentNode.nodeName).to.equal('UL');
    expect(delegate1.nodeType).to.equal(1);
    expect(delegate1.nodeName).to.equal('LI');
    expect(delegate1.textContent).to.equal('One');
    /* Undelegate the tap event */
    ul.off('tap', 'li');
    delegate1 = undefined;
    delegate2 = undefined;
    /* Fire tap event on first list item */
    li.eq(0).trigger('tap');
    expect(delegate1).to.equal(undefined);
    /* Fire double tap event on first list item */
    /* Double tap should still fire */
    li.eq(0).trigger('doubletap');
    expect(delegate2.parentNode.nodeName).to.equal('UL');
    expect(delegate2.nodeType).to.equal(1);
    expect(delegate2.nodeName).to.equal('LI');
    expect(delegate2.textContent).to.equal('One');
  });

  it('$(el).off() should remove all events, including delegated events, from children.', function() {
    var ul = $('#myList');
    var li = ul.find('li');
    var delegate1 = undefined;
    var delegate2 = undefined;
    var check = undefined;
    /* Define tap event on list to be delegated to list items */
    ul.on('tap', 'li', function(e) {
      delegate1 = this;
    });
    /* Define double tap event on list to be delegated to list items */
    ul.on('doubletap', 'li', function(e) {
      delegate2 = this;
    });
    ul.on('swipedown', function() {
      check = 'You just swiped me.'
    });
    /* Fire tap event on first list item */
    li.eq(0).trigger('tap');
    /* Check results, should be captured by list item */
    expect(delegate1.parentNode.nodeName).to.equal('UL');
    expect(delegate1.nodeType).to.equal(1);
    expect(delegate1.nodeName).to.equal('LI');
    expect(delegate1.textContent).to.equal('One');
    /* Fire double tap event on first list item */
    li.eq(0).trigger('doubletap');
    /* Check results, should be captured by list item */
    expect(delegate1.parentNode.nodeName).to.equal('UL');
    expect(delegate1.nodeType).to.equal(1);
    expect(delegate1.nodeName).to.equal('LI');
    expect(delegate1.textContent).to.equal('One');
    /* Fire swipe event on first list item */
    li.eq(0).trigger('swipedown');
    /* Check results, should be captured by list item */
    expect(check).to.equal('You just swiped me.');
    /* Undelegate the tap event */
    ul.off(undefined, 'li');
    delegate1 = undefined;
    delegate2 = undefined;
    check = undefined;
    /* Fire tap event on first list item */
    li.eq(0).trigger('tap');
    /* Should not have been captured */
    expect(delegate1).to.equal(undefined);
    /* Fire double tap event on first list item */
    /* Double tap should not fire */
    li.eq(0).trigger('doubletap');
    /* Should not have been captured */
    expect(delegate2).to.equal(undefined);
    /* Fire swipedown even on first list item */
    li.eq(0).trigger('swipedown');
    /* Should not have been captured */
    expect(check).to.equal(undefined);
  });

  it('$(el).trigger(event) should fire that event on element.', function() {
    var btn = $('#testBtn7');
    var check = undefined;
    /* capture event */
    btn.on('tap', function(e) {
      check = 'The event fired!';
    });
    /* Trigger event */
    btn.trigger('tap');
    expect(check).to.equal('The event fired!');
  });

  it('$(el).trigger(event, data) should fire that event on element and pass data to the callback on the event object.', function() {
    var btn = $('#testBtn8');
    var check = undefined;
    /* capture data from event */
    btn.on('tap', function(e) {
      if (e.data) {
        check = e.data;
      }
    });
    /* Trigger event without data */
    btn.trigger('tap');
    expect(check).to.equal(undefined);
    /* Trigger event and pass data */
    btn.trigger('tap', {msg: 'This was sent with the triggered event.'});
    expect(check.msg).to.equal('This was sent with the triggered event.');
  });

  it('$(el).trigger(event, data) should fire delegated events on elements.', function() {
    var ul = $('#myList');
    var li = ul.find('li');
    /* Clean up any left over events */
    ul.off();
    var check = undefined;
    ul.on('tap', 'li', function(e) {
      check = 'The delegated event fired.';
    });
    /* Before delegated event fires */
    expect(check).to.equal(undefined);
    /* Trigger delegated event */
    li.eq(0).trigger('tap');
    /* Check result */
    expect(check).to.equal('The delegated event fired.');
  });

  it('$(el).trigger(event, data) should fire delegated events on elements and pass data to their callback on the event object.', function() {
    var ul = $('#myList');
    var li = ul.find('li');
    var check = undefined;
    /* Clean up any left over events */
    ul.off();
    ul.on('tap', 'li', function(e) {
      check = e;
    })
    li.eq(0).trigger('tap', {msg: 'This was passed from a triggered tap.'});
    expect(check.target.nodeName).to.equal('LI');
    expect(check.target.parentNode.nodeName).to.equal('UL');
    expect(check.data.msg).to.equal('This was passed from a triggered tap.');
    check = undefined;
    /* Trigger tap on a different list item */
    li.eq(2).trigger('tap', {msg: 'This was passed from a triggered tap as well.'});
    expect(check.target.nodeName).to.equal('LI');
    expect(check.target.parentNode.nodeName).to.equal('UL');
    expect(check.data.msg).to.equal('This was passed from a triggered tap as well.');
  });

});

