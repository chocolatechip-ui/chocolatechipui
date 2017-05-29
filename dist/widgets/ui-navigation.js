
import {Router} from './ui-router'
export const UINavigation = $(() => {

  const chuiBackButtonSVG = `<svg id="chui-back-button-svg" width="100px" height="100px" viewBox="0 0 100 100" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
      <g id="chui-back-arrow" stroke="#979797">
        <path d="M50.7822487,4.05872022 L5.60302012,49.1913445 L50.4625593,94.6779982" id="back-arrow-bracket"></path>
        <path d="M6,49.368351 L95.8300018,49.368351" id="back-arrow-shaft"></path>
      </g>
    </g>
  </svg>`

  $.fn.extend({
    decorateBackButton: function() {
      this.forEach(button => {
        if (button.classList.contains('back') || button.classList.contains('backTo')) {
          const buttonText = button.textContent.trim()
          button.innerHTML = `<span>${ buttonText }</span>`
          $(button).prepend(chuiBackButtonSVG)
        }
      })
    }
  })
  $(function () {
    $('.back').decorateBackButton()
    $('.backTo').decorateBackButton()
  })

  let isNavigating = false
  const getScreen = screen => $('#' + screen).array[0]

  const makeScreenCurrent = screen => {
    if (!screen) return
    screen.classList.add('current')
    screen.classList.remove('previous')
    screen.classList.remove('next')
  }
  const makeScreenPrevious = screen => {
    if (!screen) return
    screen.classList.remove('current')
    screen.classList.remove('next')
    screen.classList.add('previous')
  }
  const makeScreenNext = screen => {
    if (!screen) return
    screen.classList.remove('current')
    screen.classList.remove('previous')
    screen.classList.add('next')
  }

  $.extend({

    /**
     * Navigate to Specific Article
     */
    GoTo: destination => {
      if ($.isNavigating) return
      $.isNavigating = true
      setTimeout(function () {
        $.isNavigating = false
      }, 500)
      $.ChuiRoutes.push(destination)
      const currentScreen = $('ui-screen.current').array[0]
      const destinationScreen = function () {
        let temp
        const regex = /:/img
        temp = regex.test(destination) ? destination.split(':')[0] : destination
        return getScreen(temp)
      }()
      if (currentScreen) currentScreen.scrollTop = 0
      if (destinationScreen) destinationScreen.scrollTop = 0
      makeScreenPrevious(currentScreen)
      makeScreenCurrent(destinationScreen)
      Router.dispatch(destination)
    },

    /**
     * Navigate Back to Previous Article
     */
    GoBack: () => {
      if ($.isNavigating) return
      $.isNavigating = true
      const currentScreen = $('ui-screen.current').array[0]
      $.ChuiRoutes.pop()
      const destination = $.ChuiRoutes[$.ChuiRoutes.length - 1]
      const destinationScreen = function () {
        let temp
        const regex = /:/img
        temp = regex.test(destination) ? destination.split(':')[0] : destination
        return getScreen(temp)
      }()
      if (currentScreen[0]) currentScreen[0].scrollTop = 0
      if (destinationScreen[0]) destinationScreen[0].scrollTop = 0
      makeScreenNext(currentScreen)
      makeScreenCurrent(destinationScreen)
      Router.dispatch(destination)
      setTimeout(function () {
        $.isNavigating = false
      }, 500)
    },

    isNavigating: false,

    /**
     * Navigate Back to Non-linear Article
     */
    GoBackTo: destination => {
      const position = $.ChuiRoutes.findIndex(function(dest) {
        return dest = destination
      })
      const destinationScreen = getScreen(destination)
      while ($.ChuiRoutes.length > position + 1) {
        let route = $.ChuiRoutes.pop()
        route = route.split(':')[0]
        let screen = getScreen(route)
        makeScreenNext(screen)
      }
      makeScreenCurrent(destinationScreen)
      Router.dispatch(destination)
    }
  })

  /**
   * Initialize Back Buttons:
   */
  $('body').on('tap', '.back', function () {
    if (this.hasAttribute('disabled')) return
    $.GoBack()
  })

  /**
   * Handle navigation events:
   */
  const handleNavigationEvent = element => {
    if ($.isNavigating) return
    if (!element.dataset.goto) return
    if ($(element).closest('ul').is('.deletable')) return
    let destination = element.dataset.goto
    // console.log(destination)
    if (!destination) return
    element.classList.add('selected')
    setTimeout(() => element.classList.remove('selected'), 1000)
    /**
     * Handle navigation:
     */
    $.GoTo(destination)
  }

  $('body').on('tap', 'li', function () {
    handleNavigationEvent(this)
  })
  
  $('body').on('doubletap', 'li', function () {
    if (!$.isNavigating) {
      handleNavigationEvent(this)
    }
  })
  const globalNav = html`<nav id='global-nav'></nav>`
  $('body').prepend(globalNav)
})
