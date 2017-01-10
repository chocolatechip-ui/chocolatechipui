describe("Event Aliases Tests", function () {
  /*
  $.eventStart = touchstart || mousedown
  $.eventEnd = touchend || click
  $.eventMove = touchmove || mousemove
  $.eventCancel = touchcancel || mouseout
  */

  it('$.eventStart should be "mousedown" on desktop and "touchstart" on mobile.', function () {
    if ($.isDesktop) {
      expect($.eventStart).to.equal('mousedown');
      expect($.eventStart).to.not.equal('touchstart');
    } else if ($.isMobile) {
      expect($.eventStart).to.equal('touchstart');
      expect($.eventStart).to.not.equal('mousedown');
    }
  });

  it('$.eventEnd should be "click" on desktop and "touchend" on mobile.', function () {
    if ($.isDesktop) {
      expect($.eventEnd).to.equal('click');
      expect($.eventEnd).to.not.equal('touchend');
    } else if ($.isMobile) {
      expect($.eventEnd).to.equal('touchend');
      expect($.eventEnd).to.not.equal('click');
    }
  });

  it('$.eventMove should be "mousemove" on desktop and "touchmove" on mobile.', function () {
    if ($.isDesktop) {
      expect($.eventMove).to.equal('mousemove');
      expect($.eventMove).to.not.equal('touchmove');
    } else if ($.isMobile) {
      expect($.eventMove).to.equal('touchmove');
      expect($.eventMove).to.not.equal('mousemove');
    }
  });

  it('$.eventCancel should be "mouseout" on desktop and "touchcancel" on mobile.', function () {
    if ($.isDesktop) {
      expect($.eventCancel).to.equal('mouseout');
      expect($.eventCancel).to.not.equal('touchcancel');
    } else if ($.isMobile) {
      expect($.eventCancel).to.equal('touchcancel');
      expect($.eventCancel).to.not.equal('mouseout');
    }
  });
  
});

