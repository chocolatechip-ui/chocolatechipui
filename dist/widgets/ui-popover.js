
import './ui-block'
export class UIPopover {
  constructor(options) {
    if (!options) return
    /**
      id: myUniqueID,
      title: 'Great',
      callback: myCallback,
    */
    options = options || {}
    let settings = {
      id: $.uuid(),
      callback: $.noop,
      title: '',
    }
    $.extend(settings, options)
    if (options && options.content) {
      settings.content = options.content
    } else {
      settings.content = ''
    }
    const header = `<header><h1>${ settings.title }</h1></header>`
    const popover = `<ui-popover id="${ settings.id }">${ header }<section></section></ui-popover>`
    const popoverID = '#' + settings.id

    var side = document.dir === 'rtl' ? 'right' : 'left'

    this.open = function() {
      $.block('.5')
      if (document.body.classList.contains('themeIsAndroid')) {
        document.getElementById(settings.id).style.display = 'block'
        setTimeout(() => {
          document.getElementById(settings.id).classList.add('opened')
          $.positionPopover(settings.trigger)
        })
      } else {
        document.getElementById(settings.id).style.display = 'block'
        document.getElementById(settings.id).classList.add('opened')
        $.positionPopover(settings.trigger)
      }
    }

    $('body').append(popover)
    $(popoverID)[0].dataset.triggerEl = settings.trigger
    $(popoverID).find('section').append(settings.content)
    settings.callback.call(settings.callback, settings.trigger)

  }
}

$.extend({
  positionPopover: element => {
    const el = document.querySelector(element)
    let left = el.offsetLeft
    let calcLeft
    let calcTop
    let po = $('ui-popover.opened')
    calcLeft = po.array[0].offsetLeft
    calcTop = el.offsetTop + el.clientHeight

    if (document.dir === 'rtl') {
      if ((po.array[0].clientWidth + el.offsetLeft) > window.innerWidth) {
        po.css({
          left: (po.array[0].clientLeft - 20) + 'px',
          'top': (calcTop) + 25 + 'px'
        })
      } else {
        if (el.offsetLeft < 250) {
          po.css({
            left: 20 + 'px',
            'top': (calcTop + 25) + 'px'
          })
        } else {
          po.css({
            left: (left - 20) + 'px',
            'top': (calcTop + 25) + 'px'
          })
        }
      }
    } else {
      if ((po.array[0].clientWidth + el.offsetLeft) > window.innerWidth) {
        po.css({
          left: (window.innerWidth - po.array[0].clientWidth - 20) + 'px',
          'top': (calcTop) + 25 + 'px'
        })
      } else {
        po.css({
          left: left + 'px',
          'top': (calcTop + 25) + 'px'
        })
      }
    }
  },

  closePopover: () => {
    var popover = document.querySelector('ui-popover.opened')
    if (!popover) return
    $.unblock()
    popover.classList.remove('opened')
    popover.style.display = 'none'
  }
})
$(() => {
  window.onresize = () => {
    const popover = document.querySelector('ui-popover.opened')
    if (popover) {
      const trigger = document.querySelector('ui-popover.opened').dataset.triggerEl
      $.positionPopover(trigger)
    }
  }
  $('body').on($.eventStart, 'ui-mask', e => {
    $.closePopover()
  })
})
