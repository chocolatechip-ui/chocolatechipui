
import './ui-block'
export class UIPopup {
  constructor(options) {

    if (!options) return
    let settings = {}
    settings.id = $.uuid()
    settings.content = true
    $.extend(settings, options)
    let width = ''
    if (settings.width) {
      width = `style="width:${settings.width}px"`
    }

    const id = settings.id
    const title = settings.title ? `<header><h1>${settings.title}</h1></header>` : ''
    const message = settings.message ? `<p role="note">${options.message}</p>` : ''
    const cancelButton = options.cancelButton ? `<button class="cancel" role="button">${settings.cancelButton}</button>` : ''
    const continueButton = settings.continueButton ? `<button class="continue" role="button">${settings.continueButton}</button>` : ''
    const callback = settings.callback || $.noop
    let popup
    if (settings.empty) {
      popup = `<div id="${id}" class="popup"><div ${width} class="dialog" role="alertdialog"></div></div>`
    } else {
      popup = `<div class="popup" id="${id}"><div class="dialog" role="alertdialog"><div class="panel">${title}${message}</div><footer>${cancelButton}${continueButton}</footer></div></div>`
    }
    function closePopup(popup) {
      popup.classList.remove('opened')
    }
    $('body').append(popup)
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
    this.close = function() {
      const popup = document.getElementById(settings.id)
      if (popup) popup.classList.remove('opened')
    }
    if (callback && continueButton) {
      $('#' + id).find('.continue').on('tap', function () {
        const self = this
        if ($.isAndroid || $.isChrome) {
          self.classList.add('selected')
          setTimeout(function () {
            self.classList.remove('selected')
            $('.popup').ClosePopup()
            callback.call(callback)
          }, 300)
        } else {
          closePopup($(this).closest('.popup').array[0])
          callback.call(callback)
        }
      })
    }
    $('#' + id).find('.cancel').on('tap', function () {
      const popup = $(this).closest('.popup').array[0]
      const self = this
      if ($.isAndroid || $.isChrome) {
        self.classList.remove('selected')
        setTimeout(function () {
          self.classList.remove('selected')
          closePopup(popup)
        }, 300)
      } else {
          closePopup(popup)
      }
    })

    $(function() {
      $('.popup').on('tap', function (e) {
        this.classList.remove('opened')
      })
    })

    this.open = () => {
      const popup = document.getElementById(settings.id)
      if (popup) {
        popup.classList.remove('forPopup')
        popup.classList.add('opened')
      }
    }
  }
}
