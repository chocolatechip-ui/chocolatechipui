describe("Gestures Tests", function () {

  it('$(el).on("tap", callback) should capture tap event.', function () {
    var btn1 = $('#btn1');
    /* Register tap event */
    var check1 = undefined;
    var value1 = undefined;
    btn1.on('tap', function(e) {
      check1 = e;
      value1 = 'Fired by button 1';
    });
    btn1.trigger('tap');
    expect(check1.type).to.equal('tap');
    expect(check1.target.nodeName).to.equal('BUTTON');
    expect(check1.target.textContent).to.equal('Button 1');
    expect(value1).to.equal('Fired by button 1');
  });

  it('$(el).on("doubletap", callback) should capture double tap event.', function () {
    var btn2 = $('#btn2');
    /* Register double tap event */
    var check2 = undefined;
    var value2 = undefined;
    btn2.on('doubletap', function(e) {
      check2 = e;
      value2 = 'Fired by button 2';
    });
    btn2.trigger('doubletap');
    expect(check2.type).to.equal('doubletap');
    expect(check2.target.nodeName).to.equal('BUTTON');
    expect(check2.target.textContent).to.equal('Button 2');
    expect(value2).to.equal('Fired by button 2');
  });

  it('$(el).on("longtap", callback) should capture long tap event.', function () {
    var btn3 = $('#btn3');
    /* Register long tap event */
    var check3 = undefined;
    var value3 = undefined;
    btn3.on('longtap', function(e) {
      check3 = e;
      value3 = 'Fired by button 3';
    });
    btn3.trigger('longtap');
    expect(check3.type).to.equal('longtap');
    expect(check3.target.nodeName).to.equal('BUTTON');
    expect(check3.target.textContent).to.equal('Button 3');
    expect(value3).to.equal('Fired by button 3');
  });

  it('$(el).on("swipeup", callback) should capture swipe up event.', function () {
    var btn4 = $('#btn4');
    /* Register swipe up event */
    var check4 = undefined;
    var value4 = undefined;
    btn4.on('swipeup', function(e) {
      check4 = e;
      value4 = 'Fired by button 4';
    });
    btn4.trigger('swipeup');
    expect(check4.type).to.equal('swipeup');
    expect(check4.target.nodeName).to.equal('BUTTON');
    expect(check4.target.textContent).to.equal('Button 4');
    expect(value4).to.equal('Fired by button 4');
  });

  it('$(el).on("swipedown", callback) should capture swipe down event.', function () {
    var btn5 = $('#btn5');
    /* Register swipe down event */
    var check5 = undefined;
    var value5 = undefined;
    btn5.on('swipedown', function(e) {
      check5 = e;
      value5 = 'Fired by button 5';
    });
    btn5.trigger('swipedown');
    expect(check5.type).to.equal('swipedown');
    expect(check5.target.nodeName).to.equal('BUTTON');
    expect(check5.target.textContent).to.equal('Button 5');
    expect(value5).to.equal('Fired by button 5');
  });

  it('$(el).on("swipe left", callback) should capture swipe left event.', function () {
    var btn6 = $('#btn6');
    /* Register swipe left event */
    var check6 = undefined;
    var value6 = undefined;
    btn6.on('swipeleft', function(e) {
      check6 = e;
      value6 = 'Fired by button 6';
    });
    btn6.trigger('swipeleft');
    expect(check6.type).to.equal('swipeleft');
    expect(check6.target.nodeName).to.equal('BUTTON');
    expect(check6.target.textContent).to.equal('Button 6');
    expect(value6).to.equal('Fired by button 6');
  });

  it('$(el).on("swipe right", callback) should capture swipe right event.', function () {
    var btn7 = $('#btn7');
    /* Register swipe right event */
    var check7 = undefined;
    var value7 = undefined;
    btn7.on('swiperight', function(e) {
      check7 = e;
      value7 = 'Fired by button 7';
    });
    btn7.trigger('swiperight');
    expect(check7.type).to.equal('swiperight');
    expect(check7.target.nodeName).to.equal('BUTTON');
    expect(check7.target.textContent).to.equal('Button 7');
    expect(value7).to.equal('Fired by button 7');
  });
  
});

