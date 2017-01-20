export default (function() {

/**
 * ChocolateChip-UI Widget - Popup.
 */
$.extend({
  /**
   * Setup  a popup dialog:
   */
  Popup: function(options) {
    /**
    options {
      id: 'alertID',
      title: 'Alert',
      message: 'This is a message from me to you.',
      cancelButton: 'Cancel',
      continueButton: 'Go Ahead',
      width: '100px',
      callback: function() { // do something },
      empty: true
    }
    */
    if (!options) return;
    let settings = {};
    settings.id = $.uuid();
    settings.content = true;
    $.extend(settings, options);
    let width = '';
    if (settings.width) {
      width = `style="width:${settings.width}px;"`;
    }

    const id = settings.id;
    const title = settings.title ? `<header><h1>${settings.title}</h1></header>` : '';
    const message = settings.message ? `<p role="note">${options.message}</p>` : '';
    const cancelButton = options.cancelButton ? `<button class="cancel" role="button">${settings.cancelButton}</button>` : '';
    const continueButton = settings.continueButton ? `<button class="continue" role="button">${settings.continueButton}</button>` : '';
    const callback = settings.callback || $.noop;
    let popup = undefined;
    if (settings.empty) {
      popup = `<div id="${id}" class="popup"><div ${width} class="dialog" role="alertdialog"></div></div>`;
    } else {
      popup = `<div class="popup" id="${id}"><div class="dialog" role="alertdialog"><div class="panel">${title}${message}</div><footer>${cancelButton}${continueButton}</footer></div></div>`;
    }
    $('body').append(popup);
    if (settings.empty) {
      $('.dialog').css({
        "display": "-webkit-flex",
        "-webkit-justify-content": "center", 
        "-webkit-align-items": "center", 
        "display": "flex",
        "justify-content": "center", 
        "align-items": "center"
      })
    }
    if (callback && continueButton) {
      $('#' + id).find('.continue').on('tap', function () {
        const $this = $(this);
        if ($.isAndroid || $.isChrome) {
          $this.addClass('selected');
          setTimeout(function () {
            $this.removeClass('selected');
            $('.popup').ClosePopup();
            callback.call(callback);
          }, 300);
        } else {
          $('#' + id).ClosePopup();
          callback.call(callback);
        }
        $.delay(1000)
        .then(function() {
          $('#' + id).remove();
        })
      });
    }
    $('#' + id).find('.cancel').on('tap', function () {
      const $this = $(this);
      if ($.isAndroid || $.isChrome) {
        $this.addClass('selected');
        setTimeout(function () {
          $this.removeClass('selected');
          $('#' + id).ClosePopup();
        }, 300);
      } else {
        $('#' + id).ClosePopup();
      }
      $.delay(1000)
      .then(function() {
        $('#' + id).remove();
      });
    });

    $('.popup').on('tap', function (e) {
      $(this).removeClass('opened')
    });
  },

});
$.fn.extend({
  /**
   * Show Popup:
   */
  ShowPopup: function ShowPopup() {
    const self = $(this);
    self.removeClass('forPopup')
    self.addClass('opened');
    setTimeout(function() {
      self.find('.popup').addClass('opened')
    }, 0)
  },

  /**
   * Close Popup:
   */
  ClosePopup: function ClosePopup() {
    const self = $(this);
    self.removeClass('opened');
    self.find('.popup').removeClass('opened')
  }
});
})();