export default (function() {

$.extend({

  /**
   * Cover screen:
   */
  block: opacity => {
    if (document.querySelector('ui-mask')) return
    $('body').append(`<ui-mask></ui-mask>`)
    document.querySelector('ui-mask').style.display = 'block'
    setTimeout(function() {
      document.querySelector('ui-mask').classList.add('opened')
      if (opacity) $('ui-mask').css({opacity: opacity})
    })
    const screen = document.querySelector('ui-screen.current')
    if (screen) screen.setAttribute('aria-hidden', true)
  },

  /**
   * Uncover screen:
   */
  unblock: () => {
    $('ui-mask').remove()
    const screen = document.querySelector('ui-screen.current')
    if (screen) screen.removeAttribute('aria-hidden')
  }
})

})()
