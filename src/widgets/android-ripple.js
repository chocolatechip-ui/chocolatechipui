
/**
 * Android Ripple Effect - Triggered when Android theme is detected.
 */
$(function() {

  if ($.theme === 'android') {
    $('body').on($.eventStart, "button, ul.editing > li, li[data-show], li[data-select], li[data-goto], chui-sheet-handle, switch, .popover li", function(e) {

      let target = this;
      
      /**
       * If item is disabled, do nothing.
       */
      if (target.hasAttribute("disabled") || target.classList.contains("disabled")) {
        return;
      }
      
      /**
       * Get dimensions of target:
       */
      const offset = $(target).offset();
      let w = Math.min(this.offsetWidth, 160);
      let h = Math.min(this.offsetHeight, 160);
      const d = Math.max(w, h);
      /**
       * Set width and height to whichever is greater:
       */
      w = d;
      h = d;

      const x = $.isAndroid ? e.touches[0].pageX - offset.left : e.pageX - offset.left;
      const y = $.isAndroid ? e.touches[0].pageY - offset.top :  e.pageY - offset.top;

      let navBkColor;
      let backgroundColor;

      /**
       * Create ripple sheath and append to target:
       */
      const ripple = $('<ripple-sheath></ripple-sheath>');
      $(target).append(ripple);

      /**
       * Check if button  is in navbar.
       * If it is, get navbar background color and base ripple on that:
       */

      if (target.nodeName === 'BUTTON' && target.classList.contains('slide-out-button')) {
        let navBkColor = $('screen > nav').eq(0).css('background-color');
        backgroundColor = new $.ChuiColor(navBkColor).toHex();
      } else if ((target.nodeName === 'BUTTON' && $(target).closest('nav')[0])) {
        navBkColor = $(target).closest('nav').css('background-color');
        backgroundColor = new $.ChuiColor(navBkColor).toHex();

      } else if ((target.nodeName === 'BUTTON' && $(target).closest('toolbar')[0])) {
        navBkColor = $(target).closest('toolbar').css('background-color');
        backgroundColor = new $.ChuiColor(navBkColor).toHex();

      } else {
        backgroundColor = $(this).css('background-color');
        if (!backgroundColor || backgroundColor === 'rgba(0, 0, 0, 0)') {
          backgroundColor = '#fff'
        }
      }

      /**
       * Handle ripple color:
       */
      let rippleColor = '#fff';
      const brightness = $.calculateBrightness(backgroundColor);
      if (brightness > 195) {
        rippleColor = '#aaa';
      } else {
        rippleColor = '#fff';
      }

      /**
       * If ripple parent has custom color for ripple, use that:
       */
      if (target.dataset.rippleColor) {
        rippleColor = target.dataset.rippleColor
      }
      
      /**
       * Create expanding ripple effect:
       */
      const rippleWave = $('<ripple-wave></ripple-wave>');
      rippleWave.css({
        "background-color": rippleColor,
        width: h + 'px',
        height: h + 'px',
        left: x - (h/2) + 'px',
        top: y - (h/2) + 'px',
      });

      /**
       * Append to ripple, then delete:
       */
      ripple.append(rippleWave);
      setTimeout(function() {
        ripple.remove();
      }, 1000);
    });
  }
});