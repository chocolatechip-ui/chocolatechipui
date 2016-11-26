
/**
 * ChocolateChip-UI Widget - Sheets.
 */
$.extend({
  /**
   * Create a sliding sheet:
   */
  Sheet: options => {
    /**
      var options {
        id : 'starTrek',
        background: 'transparent',
        handle: false,
        slideDown: false // default is slideUp
      }
    */
    if (!options) return;
    let settings = {
      id: $.uuid(),
      background: '',
      handle: true,
      slideFrom: false
    };

    $.extend(settings, options);

    if (settings.background) settings.background = ' style="background-color:' + settings.background + '" ';
    if (settings.slideFrom === 'top') {
      settings.slideDown = ' class="slideDown" ';
    } else {
      settings.slideFrom = '';
    }
    if (settings.handle === false) settings.handle = '';
    else settings.handle = 
      `<chui-sheet-handle>
        <svg width="100%" height="100%" viewBox="0 0 76 27" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linecap:butt;stroke-linejoin:butt;stroke-miterlimit:1.41421;">
          <g id="sheet-handle" transform="matrix(1,0,0,1,-29.7966,-15.7797)">
            <path id="sheet-handle-path" d="M36.25,26.242L67.645,34.215L98.176,25.789" style="fill:none;"/>
          </g>
        </svg>
      </chui-sheet-handle>`;

    const sheet = `<sheet id="${ settings.id }"${ settings.slideDown }${ settings.background }>${ settings.handle }<section></section></sheet>`;

    $('body').append(sheet);

    $('#' + settings.id).find('chui-sheet-handle').on($.eventStart, () => {
      $.HideSheet('#' + settings.id);
    });
  },
  ShowSheet: id => {
    let sheet = id ? id : '.sheet';
    $('screen.current').addClass('blurred');
    if ($.isAndroid || $.isChrome) {
      $(sheet).css('display', 'block');
      setTimeout(function() {
        $(sheet).addClass('opened');
      }, 20);
    } else {
      $(sheet).addClass('opened');
    }
  },
  HideSheet: id => {
    $(id).removeClass('opened');
    $('screen.current').addClass('removeBlurSlow');
    setTimeout(() => {
      $('screen').removeClass('blurred');
      $('screen').removeClass('removeBlurSlow');
    }, 500);
  }
});