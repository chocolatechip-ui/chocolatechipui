
import {Router} from './ui-router'
export class UITabbar {
  constructor(options) {
    if (!options) return
    let id = $.uuid()
    let settings = {
      selected: 0
    }
    $.extend(settings, options)
    if (!settings.icons.length) {
      settings.icons = settings.labels
    }
    if (!settings.id) {
      settings.id = id
    } else {
      id = settings.id
    }

    /* Private variable to keep track of screens. */
    let __tabbarScreens = new Stack()

    let screens = new Stack()
    const screenPrefix = '#'

    if (settings.screens) {
      settings.screens.forEach(function (screen, idx) {
        if (!/screenPrefix/img.test(screen)) {
          __tabbarScreens.push(document.getElementById(screen))
          __tabbarScreens.array[idx].classList.add('tabScreen')
        } else {
          __tabbarScreens.concat($(ui-screen))
          $(screen).array[0].classList.add('tabScreen')
        }
      })
    } else {
      settings.labels.forEach(function (screen, idx) {
        __tabbarScreens.push(screens.eq(idx))
      })
    }
    let selectedScreen
    let androidSelectionIndicator = ''
    if ($.theme === 'android') {
      androidSelectionIndicator = '<span class="androidSelectionBorder"></span>'
    }
    const showIcons = settings.showIcons ? ' class="showIcons" ' : ''

    /* Create tabs. */
    const makeTab = (label, icon, idx) => {
      let tab = '<button role="tab" class="' + icon
      if (settings.selected === idx) {
        tab += ' selected'
        $.ChuiRoutes = [settings.screens[idx]]
      }
      tab += '"'
      if (settings.screens && settings.screens.length) {
        tab += ` data-id="${ settings.screens[idx] }" data-chui-route="${ settings.screens[idx] }"`
      }
      tab += `><span class="icon"></span><label>${ settings.labels[idx] }</label></button>`
      return tab
    }
    /* Create tab bar. */
    let tabbarTmpl = document.createElement('ui-tabbar')
    tabbarTmpl.role = "tabpanel"
    if (settings.showIcons) tabbarTmpl.classList.add('showIcons')
    tabbarTmpl.insertAdjacentHTML('beforeend', androidSelectionIndicator)
    tabbarTmpl.id = settings.id
    window.tabbarTmpl = tabbarTmpl

    if (settings.labels.length) {
      settings.labels.forEach(function (label, idx) {
        var tab = makeTab(label, settings.icons[idx], idx)
        tabbarTmpl.appendChild($.h(tab))
      })
    }

    /* Append tabbar to page. */
    $('body').prepend(tabbarTmpl)

    /* Get id of appended tab bar. */
    const tabbar = $('#' + settings.id)
    const selectedTabButton = tabbar.find('button.selected')


    /* Private variables to manage tab bar. */
    const __tabbarButtons = tabbar.find('button')
    const __selectedTabbarButton = __tabbarButtons.eq(settings.selected)
    const __selectedTabbarScreen = __tabbarScreens.eq(settings.selected)

    /* For Android Material Design. */
    const androidSelectionBorder = tabbar.find('.androidSelectionBorder')
    function handleTabSelectionForAndroid(tab) {
      let width = tab.clientWidth
      let left = tab.offsetLeft
      androidSelectionBorder.css({width: width + 'px', left: left + 'px'})
    }
    if ($.theme === 'android') {
      $(function() {
        console.dir(selectedTabButton)
        handleTabSelectionForAndroid(selectedTabButton.array[0])

      })
    }

    this.getSelectedTab = () => {
      return __selectedTabbarButton
    }

    this.getSelectedScreen = () => {
      return __selectedTabbarScreen
    }

    /* Setup events on tabs. */
    $(() => {

      const tabbarButtons = tabbar.find('button')

      /* Tap on tab. */
      tabbar.on('tap', 'button', function () {
        const tab = this
        const routes = tab.dataset.chuiRoute.split('/')
        const fullRoute = $.ChuiRoutes.join('/')
        let navRoutesFull = tab.dataset.chuiRoute
        const navRoutes = navRoutesFull.split('/')
        const rr = $.ChuiRoutes

        /* This tab holds a navigation list. */
        var currBtn = document.querySelector('ui-tabbar button.selected')
        currBtn.classList.remove('selected')
        currBtn.dataset.chuiRoute = fullRoute
        this.classList.add('selected')
        if (navRoutes.length > 1) {
          navRoutesFull = tab.dataset.chuiRoute

          const navRoutes = navRoutesFull.split('/')

          const currScreen = document.querySelector('ui-screen.current')
          if (currScreen) {
            currScreen.classList.remove('current')
            currScreen.classList.add('next')
          }
          const prevScreen = document.querySelector('ui-screen.previous')
          if (prevScreen) {
            prevScreen.classList.remove('previous')
            prevScreen.classList.add('next')
          }

          navRoutes.forEach( (route, idx) => {
            const routing = route.split(':')
            let whichRoute = routing[0]
            let screen = document.getElementById(whichRoute)
            if (idx !== routes.length - 1) {
              screen.classList.remove('next')
              screen.classList.add('previous')
              screen.setAttribute('aria-hidden', true)
            } else {
              screen.classList.remove('next')
              screen.classList.add('current')
              screen.setAttribute('aria-hidden', false)
            }
          })

          /* Take care of routes. */
          $.ChuiRoutes = routes
          Router.dispatch(routes[routes.length - 1])

          /* Handle Android ripple effect. */
          if ($.theme === 'android') {
            handleTabSelectionForAndroid(tab)
          }

          /* This tab has a single screen. */
        } else {
          const screen = $('ui-screen').eq($(tab).index())

          /* Deal with previously selected tab and screen. */
          const currScreen =  document.querySelector('ui-screen.current')
          if (currScreen) {
            currScreen.classList.remove('current')
            currScreen.classList.add('next')
            currScreen.setAttribute('aria-hidden', true)
          }
          const prevScreen = document.querySelector('ui-screen.previous')

          if (prevScreen) {
            prevScreen.classList.remove('previous')
            prevScreen.classList.add('next')
            prevScreen.setAttribute('aria-hidden', true)
          }

          /* Set this tab to `selected`. */
          tab.classList.add('selected')
          if ($.theme === 'android') {
            handleTabSelectionForAndroid(tab)
          }

          routes.forEach( (route, idx) => {
            const routing = route.split(':')
            const whichRoute = routing[0]
            const wr = document.getElementById(whichRoute)
            if (idx !== routes.length - 1) {
              wr.classList.remove('next')
              wr.classList.add('previous')
              wr.setAttribute('aria-hidden', true)

            } else {
              if (wr) {
                wr.classList.remove('next')
                wr.classList.add('current')
                wr.setAttribute('aria-hidden', false)
              } else {
              }
            }
          })

          /* Take care of routes. */
          $.ChuiRoutes = routes
          Router.dispatch(fullRoute)
        }
      })

      $('ui-screen').eq(settings.selected).array[0].classList.remove('next')
      $('ui-screen').eq(settings.selected).array[0].classList.add('current')
    })

  }
}



// const UITabbar = (() => {
//   /* Creates a Tab Bar for Toggling Articles. */
//   function _tabBar(options) {
//     /**
//     var options = {
//       id: 'mySpecialTabbar',
//       labels: ["Refresh", "Add", "Info", "Downloads", "Favorite"],
//       icons: ["refresh", "add", "info", "downloads", "favorite"],
//       screens: [],
//       selected: 2,
//       showIcons: false // set to true to show icons for Android
//     }
//     */
//     if (!options) return
//     let id = $.uuid()
//     let settings = {
//       selected: 0
//     }
//     $.extend(settings, options)
//     if (!settings.icons.length) {
//       settings.icons = settings.labels
//     }
//     if (!settings.id) {
//       settings.id = id
//     } else {
//       id = settings.id
//     }

//     /* Private variable to keep track of screens. */
//     let __tabbarScreens = new Stack()

//     let screens = new Stack()
//     const screenPrefix = '#'

//     if (settings.screens) {
//       settings.screens.forEach(function (screen, idx) {
//         if (!/screenPrefix/img.test(screen)) {
//           __tabbarScreens.push(document.getElementById(screen))
//           __tabbarScreens.array[idx].classList.add('tabScreen')
//         } else {
//           __tabbarScreens.concat($(ui-screen))
//           $(screen).array[0].classList.add('tabScreen')
//         }
//       })
//     } else {
//       settings.labels.forEach(function (screen, idx) {
//         __tabbarScreens.push(screens.eq(idx))
//       })
//     }
//     let selectedScreen
//     let androidSelectionIndicator = ''
//     if ($.theme === 'android') {
//       androidSelectionIndicator = '<span class="androidSelectionBorder"></span>'
//     }
//     const showIcons = settings.showIcons ? ' class="showIcons" ' : ''

//     /* Create tabs. */
//     const makeTab = (label, icon, idx) => {
//       let tab = '<button role="tab" class="' + icon
//       if (settings.selected === idx) {
//         tab += ' selected'
//         $.ChuiRoutes = [settings.screens[idx]]
//       }
//       tab += '"'
//       if (settings.screens && settings.screens.length) {
//         tab += ` data-id="${ settings.screens[idx] }" data-chui-route="${ settings.screens[idx] }"`
//       }
//       tab += `><span class="icon"></span><label>${ settings.labels[idx] }</label></button>`
//       return tab
//     }
//     /* Create tab bar. */
//     let tabbarTmpl = document.createElement('ui-tabbar')
//     tabbarTmpl.role = "tabpanel"
//     if (settings.showIcons) tabbarTmpl.classList.add('showIcons')
//     tabbarTmpl.insertAdjacentHTML('beforeend', androidSelectionIndicator)
//     tabbarTmpl.id = settings.id
//     window.tabbarTmpl = tabbarTmpl

//     if (settings.labels.length) {
//       settings.labels.forEach(function (label, idx) {
//         var tab = makeTab(label, settings.icons[idx], idx)
//         tabbarTmpl.appendChild($.h(tab))
//       })
//     }

//     /* Append tabbar to page. */
//     $('body').prepend(tabbarTmpl)

//     /* Get id of appended tab bar. */
//     const tabbar = $('#' + settings.id)
//     const selectedTabButton = tabbar.find('button.selected')


//     /* Private variables to manage tab bar. */
//     const __tabbarButtons = tabbar.find('button')
//     const __selectedTabbarButton = __tabbarButtons.eq(settings.selected)
//     const __selectedTabbarScreen = __tabbarScreens.eq(settings.selected)

//     /* For Android Material Design. */
//     const androidSelectionBorder = tabbar.find('.androidSelectionBorder')
//     function handleTabSelectionForAndroid(tab) {
//       let width = tab.clientWidth
//       let left = tab.offsetLeft
//       androidSelectionBorder.css({width: width + 'px', left: left + 'px'})
//     }
//     if ($.theme === 'android') {
//       $(function() {
//         console.dir(selectedTabButton)
//         handleTabSelectionForAndroid(selectedTabButton.array[0])

//       })
//     }

//     this.getSelectedTab = () => {
//       return __selectedTabbarButton
//     }

//     this.getSelectedScreen = () => {
//       return __selectedTabbarScreen
//     }

//     /* Setup events on tabs. */
//     $(() => {

//       const tabbarButtons = tabbar.find('button')

//       /* Tap on tab. */
//       tabbar.on('tap', 'button', function () {
//         const tab = this
//         const routes = tab.dataset.chuiRoute.split('/')
//         const fullRoute = $.ChuiRoutes.join('/')
//         let navRoutesFull = tab.dataset.chuiRoute
//         const navRoutes = navRoutesFull.split('/')
//         const rr = $.ChuiRoutes

//         /* This tab holds a navigation list. */
//         var currBtn = document.querySelector('ui-tabbar button.selected')
//         currBtn.classList.remove('selected')
//         currBtn.dataset.chuiRoute = fullRoute
//         this.classList.add('selected')
//         if (navRoutes.length > 1) {
//           navRoutesFull = tab.dataset.chuiRoute

//           const navRoutes = navRoutesFull.split('/')

//           const currScreen = document.querySelector('ui-screen.current')
//           if (currScreen) {
//             currScreen.classList.remove('current')
//             currScreen.classList.add('next')
//           }
//           const prevScreen = document.querySelector('ui-screen.previous')
//           if (prevScreen) {
//             prevScreen.classList.remove('previous')
//             prevScreen.classList.add('next')
//           }

//           navRoutes.forEach( function(route, idx) {
//             const routing = route.split(':')
//             let whichRoute = routing[0]
//             let screen = document.getElementById(whichRoute)
//             if (idx !== routes.length - 1) {
//               screen.classList.remove('next')
//               screen.classList.add('previous')
//               screen.setAttribute('aria-hidden', true)
//             } else {
//               screen.classList.remove('next')
//               screen.classList.add('current')
//               screen.setAttribute('aria-hidden', false)
//             }
//           })

//           /* Take care of routes. */
//           $.ChuiRoutes = routes
//           Router.dispatch(routes[routes.length - 1])

//           /* Handle Android ripple effect. */
//           if ($.theme === 'android') {
//             handleTabSelectionForAndroid(tab)
//           }

//           /* This tab has a single screen. */
//         } else {
//           const screen = $('ui-screen').eq($(tab).index())

//           /* Deal with previously selected tab and screen. */
//           const currScreen =  document.querySelector('ui-screen.current')
//           if (currScreen) {
//             currScreen.classList.remove('current')
//             currScreen.classList.add('next')
//             currScreen.setAttribute('aria-hidden', true)
//           }
//           const prevScreen = document.querySelector('ui-screen.previous')

//           if (prevScreen) {
//             prevScreen.classList.remove('previous')
//             prevScreen.classList.add('next')
//             prevScreen.setAttribute('aria-hidden', true)
//           }

//           /* Set this tab to `selected`. */
//           tab.classList.add('selected')
//           if ($.theme === 'android') {
//             handleTabSelectionForAndroid(tab)
//           }

//           routes.forEach(function (route, idx) {
//             const routing = route.split(':')
//             const whichRoute = routing[0]
//             const wr = document.getElementById(whichRoute)
//             if (idx !== routes.length - 1) {
//               wr.classList.remove('next')
//               wr.classList.add('previous')
//               wr.setAttribute('aria-hidden', true)

//             } else {
//               if (wr) {
//                 wr.classList.remove('next')
//                 wr.classList.add('current')
//                 wr.setAttribute('aria-hidden', false)
//               } else {
//               }
//             }
//           })

//           /* Take care of routes. */
//           $.ChuiRoutes = routes
//           Router.dispatch(fullRoute)
//         }
//       })

//       $('ui-screen').eq(settings.selected).array[0].classList.remove('next')
//       $('ui-screen').eq(settings.selected).array[0].classList.add('current')
//     })
//   }

//   return _tabBar
// })()
