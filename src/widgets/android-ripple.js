
$(function() {
  if ($.theme === 'android') {
    $('body').on($.eventStart, 'button, ul.editing > li, li[data-show], li[data-select], li[data-goto], ui-sheet-handle, ui-switch, .ui-popover li', function(e) {
      let target = this
      if (target.hasAttribute("disabled") || target.classList.contains("disabled")) {
        return
      }

      let w = Math.min(this.offsetWidth, 160)
      let h = Math.min(this.offsetHeight, 160)
      const d = Math.max(w, h)
      w = d
      h = d

      const offset = this.getBoundingClientRect()

      const x = $.isAndroid ? e.touches[0].pageX - offset.left : e.pageX - offset.left
      const y = $.isAndroid ? e.touches[0].pageY - offset.top :  e.pageY - offset.top

      let navBkColor
      let backgroundColor

      const ripple = document.createElement('ripple-sheath')
      $(target).append(ripple)

      if (target.nodeName === 'BUTTON' && target.classList.contains('slide-out-button')) {
        let navBkColor = $('ui-screen > nav').eq(0).css('background-color')
        backgroundColor = new UIColor(navBkColor).toHex()
      } else if ((target.nodeName === 'BUTTON' && $(target).closest('nav')[0])) {
        navBkColor = $(target).closest('nav').css('background-color')
        backgroundColor = new UIColor(navBkColor).toHex()

      } else if ((target.nodeName === 'BUTTON' && $(target).closest('toolbar')[0])) {
        navBkColor = $(target).closest('toolbar').css('background-color')
        backgroundColor = new UIColor(navBkColor).toHex()

      } else {
        backgroundColor = $(this).css('background-color')
        if (!backgroundColor || backgroundColor === 'rgba(0, 0, 0, 0)') {
          backgroundColor = '#fff'
        }
      }

      let rippleColor = '#fff'
      const brightness = $.calculateBrightness(backgroundColor)
      if (brightness > 195) {
        rippleColor = '#aaa'
      } else {
        rippleColor = '#fff'
      }

      if (target.dataset.rippleColor) {
        rippleColor = target.dataset.rippleColor
      }

      const rippleWave = document.createElement('ripple-wave')
      rippleWave.style.backgroundColor = rippleColor
      rippleWave.style.width = `${h}px`
      rippleWave.style.height = `${h}px`
      rippleWave.style.left = `${x - (h/2)}px`
      rippleWave.style.top = `${y - (h/2)}px`

      ripple.append(rippleWave)
      setTimeout(function() {
        $(ripple).remove()
      }, 1000)
    })
  }
})
