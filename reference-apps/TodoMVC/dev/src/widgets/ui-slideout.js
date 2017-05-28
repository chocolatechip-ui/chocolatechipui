
import './ui-block'
import {Router} from './ui-router'
export class UISlideOut {
  constructor(id) {
    const slideoutID = id || $.uuid()
    this.id = slideoutID
    const buttonID = 'slideoutBtnID1234'
    const slideOutButton = `<button id="${ buttonID }" class="slide-out-button"></button>`
    const slideOut = `<ui-slideout id="${ slideoutID }"><section></section></ui-slideout>`
    $('body').prepend(slideOut)
    $('body').append(slideOutButton)
    /**
     * Get Slide Out & Slide Out button:
     */
    let slideout = document.getElementById(slideoutID)
    let slideOutBtn = document.getElementById(buttonID)

    /**
     * Set up state for Slide Out and screens:
     */
    slideout.setAttribute('aria-hidden', true)
    $('ui-screen').forEach(screen => {
      screen.setAttribute('aria-hidden', true)
    })
    document.querySelector('ui-screen').classList.add('show')
    document.querySelector('ui-screen').setAttribute('aria-hidden', "false")


    /**
     * Handle Slide Out button events:
     */
    $('#'+buttonID).on('tap', function() {
      this.classList.toggle('focused')
      slideout.classList.toggle('open')
      if (slideout.classList.contains('open')) {
        $.block('.5')
      } else {
        $.unblock()
      }
    })

    $(slideout).on('tap', 'li', function() {
      let menuItems = $(slideout).find('li[data-show]')
      slideout.setAttribute('aria-hidden', 'true')
      $.unblock()

      /**
       * Toggle Slide Out button:
       */
      slideOutBtn.classList.toggle('focused')
      while ($.ChuiRoutes.length > 1) {
        $.GoBack()
      }

      /**
       * This list item shows a single screen:
       */
      menuItems.forEach(item => {
        if (item.classList.contains('selected')) {
          item.classList.remove('selected')
        }
      })
      const shownScreen = document.querySelector('ui-screen.show')
      shownScreen.classList.remove('show')
      shownScreen.setAttribute('aria-hidden', true)
      const screenToShow = '#' + this.dataset.show.split(':')[0]
      /**
       * Account for presence of navigation list state:
       */
      setTimeout(function() {
        document.querySelector(screenToShow).classList.remove('next')
      }, 200)
      document.querySelector(screenToShow).classList.add('show')
      // console.log()
      Router.dispatch(this.dataset.show)
      /**
       * Close slide out:
       */
      slideout.classList.remove('open')
    })
  }

  populate(options) {
    if (!options) return
    const slideout = document.getElementById(this.id)
    if (!options) {
      return
    } else {
      slideout.querySelector('section').appendChild($.h('<ul class="list"></ul>'))
      let list = slideout.querySelector('ul')
      options.forEach(ctx => {
        for (let key in ctx) {
          if (key === 'header') {
            $(list).append('<li class="menu-header"><h2>' + ctx[key] + '</h2></li>')
          } else {
            $(list).append('<li data-show="' + key + '"><h3>' + ctx[key] + '</h3></li>')
          }
        }
      })
    }
  }
}
