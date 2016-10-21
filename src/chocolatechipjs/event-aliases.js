
  /**
   * ChocolateChip-UI event aliases.
   */
  $.extend({
    eventStart: null,
    eventEnd: null,
    eventMove: null,
    eventCancel: null,
    /**
     * Define min-length for gesture detection:
     */
    gestureLength: 30
  });
  $(() => {
    /**
     * Setup Event Variables:
     */
    if ('ontouchstart' in window && /mobile/img.test(navigator.userAgent)) {
      $.eventStart = 'touchstart';
      $.eventEnd = 'touchend';
      $.eventMove = 'touchmove';
      $.eventCancel = 'touchcancel';
      /** 
       * Mouse events for desktop: 
       */
    } else {
      $.eventStart = 'mousedown';
      $.eventEnd = 'click';
      $.eventMove = 'mousemove';
      $.eventCancel = 'mouseout';
    }
  });