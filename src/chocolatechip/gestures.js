
  /**
   * ChocolateChip-UI gestures.
   */
  (function() {
    "use strict";
    let touch = {};
    let touchTimeout = undefined;
    let swipeTimeout = undefined;
    let tapTimeout = undefined;
    const longTapDelay = 750;
    let singleTapDelay = 150;
    $.gestureLength = 50;
    if ($.isAndroid) singleTapDelay = 200;
    let longTapTimeout = undefined;

    function parentIfText(node) {
      return 'tagName' in node ? node : node.parentNode;
    }

    function swipeDirection(x1, x2, y1, y2) {
      return Math.abs(x1 - x2) >=
        Math.abs(y1 - y2) ? (x1 - x2 > 0 ? 'left' : 'right') : (y1 - y2 > 0 ? 'up' : 'down');
    }

    function longTap() {
      longTapTimeout = null;
      if (touch.last) {
        try {
          if (touch && touch.el) {
            touch.el.trigger('longtap');
            touch = {};
          }
        } catch (err) {}
      }
    }

    function cancelLongTap() {
      if (longTapTimeout) clearTimeout(longTapTimeout);
      longTapTimeout = null;
    }

    function cancelAll() {
      if (touchTimeout) clearTimeout(touchTimeout);
      if (tapTimeout) clearTimeout(tapTimeout);
      if (swipeTimeout) clearTimeout(swipeTimeout);
      if (longTapTimeout) clearTimeout(longTapTimeout);
      touchTimeout = tapTimeout = swipeTimeout = longTapTimeout = null;
      touch = {};
    }

    /** 
     * Execute this after DOM loads: 
     */
    $(() => {
      let now = undefined;
      let delta = undefined;
      const body = $('body');
      let twoTouches = false;

      /** 
       * Capture start of event: 
       */
      body.on($.eventStart, function(e) {
        now = Date.now();
        delta = now - (touch.last || now);
        if (e.originalEvent) e = e.originalEvent;

        if ($.eventStart === 'mousedown') {
          touch.el = $(parentIfText(e.target));
          if (e.target.nodeName === 'ripple') {
            touch.el = $(el.target.parentNode);
          }
          touchTimeout && clearTimeout(touchTimeout);
          touch.x1 = e.pageX;
          touch.y1 = e.pageY;
          twoTouches = false;

        /** 
         * Detect two or more finger gestures: 
         */
        } else {
          if (e.touches.length === 1) {
            touch.el = $(parentIfText(e.touches[0].target));
            touchTimeout && clearTimeout(touchTimeout);
            touch.x1 = e.touches[0].pageX;
            touch.y1 = e.touches[0].pageY;
            if (e.targetTouches.length === 2) {
              twoTouches = true;
            } else {
              twoTouches = false;
            }
          }
        }
        
        if (delta > 0 && delta <= 250) {
          touch.isDoubleTap = true;
        }
        touch.last = now;
        longTapTimeout = setTimeout(longTap, longTapDelay);
      });

      /** 
       * Capture event move: 
       */
      body.on($.eventMove, e => {
        if (e.originalEvent) e = e.originalEvent;
        cancelLongTap();
        if ($.eventMove === 'mousemove') {
          touch.x2 = e.pageX;
          touch.y2 = e.pageY;
        } else {
          /** 
           * One finger gesture: 
           */
          if (e.touches.length === 1) {
            touch.x2 = e.touches[0].pageX;
            touch.y2 = e.touches[0].pageY;
          }
        }
      });

      /** 
       * Capture event end: 
       */
      body.on($.eventEnd, e => {

        cancelLongTap();
        if (!!touch.el) {
          /** 
           * Swipe detection: 
           */
          if ((touch.x2 && Math.abs(touch.x1 - touch.x2) > $.gestureLength) ||
            (touch.y2 && Math.abs(touch.y1 - touch.y2) > $.gestureLength)) {
            swipeTimeout = setTimeout(function() {
              if (touch && touch.el) {
                touch.el.trigger('swipe');
                touch.el.trigger('swipe' + (swipeDirection(touch.x1, touch.x2, touch.y1, touch.y2)));
                touch = {};
              }
            }, 0);

          /** 
           * Normal tap: 
           */
          } else if ('last' in touch) {
            /** 
             * Delay by one tick so we can cancel the 'tap' event if 'scroll' fires: 
             */
            tapTimeout = setTimeout(() => {
              /** 
               * Trigger double tap immediately: 
               */
              if (touch && touch.isDoubleTap) {
                if (touch && touch.el) {
                  touch.el.trigger('doubletap');
                  touch = {};
                }

              } else {
                /** 
                 * Trigger tap after singleTapDelay: 
                 */
                touchTimeout = setTimeout(() => {
                  touchTimeout = null;
                  if (touch && touch.el) {
                    touch.el.trigger('tap');
                    touch = {};
                    return false;
                  }
                }, singleTapDelay);
              }
            }, 0);
          }

        } else {
          return;
        }
      });
      body.on('touchcancel', cancelAll);
    });

    /**
     * Register events:
     */
    ['tap', 'doubletap', 'longtap', 'swipeleft', 'swiperight', 'swipeup', 'swipedown'].forEach(method => {
      $.fn.extend({
        method: function(callback) {
          return this.on(method, callback);
        }
      });
    });
  })();