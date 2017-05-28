
class UISheet {
  constructor(options) {
    if (!options) return
    /**
      var options {
        id : 'starTrek',
        background: 'transparent',
        handle: false,
        slideDown: false // default is slideUp
      }
    */
    if (!options) return
    let settings = {
      id: $.uuid(),
      background: '',
      handle: true,
      slideFrom: ''
    }

    $.extend(settings, options)

    if (settings.background) settings.background = ' style="background-color:' + settings.background + '" '
    if (settings.slideFrom === 'top') {
      settings.slideDown = ` class="slideDown" `
    } else {
      settings.slideFrom = ' '
    }
    if (settings.handle === false) settings.handle = ''
    else settings.handle =
      `<ui-sheet-handle>
        <svg width="100%" height="100%" viewBox="0 0 76 27" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linecap:butt;stroke-linejoin:butt;stroke-miterlimit:1.41421;">
          <g id="sheet-handle" transform="matrix(1,0,0,1,-29.7966,-15.7797)">
            <path id="sheet-handle-path" d="M36.25,26.242L67.645,34.215L98.176,25.789" style="fill:none;"/>
          </g>
        </svg>
      </ui-sheet-handle>`

    const sheet = `<ui-sheet id="${ settings.id }" ${ settings.slideDown } ${ settings.background }>${ settings.handle }<section></section></ui-sheet>`

    $('body').append(sheet)

    $('#' + settings.id).find('ui-sheet-handle').on($.eventStart, () => {
      $('#' + settings.id).array[0].classList.remove('opened')
      document.querySelector('ui-screen.current').classList.remove('blurred')
    })

    this.show = () => {
      let sheet = document.getElementById(settings.id)
      document.querySelector('ui-screen.current').classList.add('blurred')
      sheet.classList.add('opened')
      if ($.isAndroid || $.isChrome) {
        sheet.style.display = 'block'
        setTimeout(function() {
          sheet.classList.add('opened')
        }, 20)
      } else {
        sheet.classList.add('opened')
      }
    }

    this.hide = () => {
      $('#' + settings.id).array[0].classList.remove('opened')
      document.querySelector('ui-screen.current').classList.remove('blurred')
    }

    this.populate = (template) => $('#' + settings.id).find('section').append(template)
  }
}
