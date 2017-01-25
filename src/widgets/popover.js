
/**
 * ChocolateChip-UI Widget - Popover.
 */
$.extend({
  /**
   * Setup a popover (dropdown menu):
   */
  Popover: options => {
    /**
      id: myUniqueID,
      title: 'Great',
      callback: myCallback,
    */
    options = options || {};
    let settings = {
      id: $.uuid(),
      callback: $.noop,
      title: '',
    };
    $.extend(settings, options);
    if (options && options.content) {
      settings.content = options.content;
    } else {
      settings.content = '';
    }
    const header = `<header><h1>${ settings.title }</h1></header>`;
    const popover = `<div class="popover" id="${ settings.id }">${ header }<section></section></div>`;
    const popoverID = '#' + settings.id;

    /**
     * Calculate position of popover relative to the button that opened it:
     */
    const __calcPopPos = element => {
      const offset = $(element).offset();
      let left = offset.left;
      let calcLeft;
      let calcTop;
      let popover = $(popoverID);
      const popoverOffset = popover.offset();
      calcLeft = popoverOffset.left;
      calcTop = offset.top + $(element)[0].clientHeight;
      if ((popover.width() + offset.left) > window.innerWidth) {
        popover.css({
          'left': ((window.innerWidth - popover.width()) - 20) + 'px',
          'top': (calcTop) + 25 + 'px'
        });
      } else {
        popover.css({
          'left': left + 'px',
          'top': (calcTop - 30) + 'px'
        });
      }
    };

    if ($('.mask')[0]) {
      $.ClosePopover();
      $('body').Unblock();
      return;
    }
    $.Block('.5');
    $('body').append(popover);
    if ($('body').hasClass('themeIsAndroid')) {
      setTimeout(() => {
        $(popoverID).addClass('opened');
      }, 200);
    }
    $(popoverID).data('triggerEl', settings.trigger);
    $(popoverID).find('section').append(settings.content);
    settings.callback.call(settings.callback, settings.trigger);
    __calcPopPos(settings.trigger);

  },

  AlignPopover: () => {
    let popover = $('.popover');
    if (!popover.length) return;
    const triggerID = popover.data('triggerEl');
    const offset = $(triggerID).offset();
    const left = offset.left;
    if (($(popover).width() + offset.left) > window.innerWidth) {
      popover.css({
        'left': ((window.innerWidth - $(popover).width()) - 20) + 'px'
      });
    } else {
      popover.css({
        'left': left + 'px'
      });
    }
  },

  ClosePopover: () => {
    $.Unblock();
    $('.popover').css({transform: 'scaleY(0)'});
    setTimeout(() => {
      $('.popover').off();
      $('.popover').remove();
    }, 100);
  }
});

$(() => {
  /**
   * Reposition popovers on window resize:
   */
  window.onresize = () => {
    $.AlignPopover();
  };
  // const events = "$.eventStart singletap $.eventEnd";
  $('body').on($.eventStart, '.mask', e => {
    // if ($('.popover')[0]) {
    //   if (e && e.nodeType === 1) return;
    // } else {
      // alert('closing popover')
      $.ClosePopover();
    // }
  });
});