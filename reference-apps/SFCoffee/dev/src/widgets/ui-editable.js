
/**
 * Class to enable reording list items.
 */
const ReorderList = (function() {
  'use strict'

  const accessibility = {
    list: {
      ariaRole: "listbox",
      tabIndex: 0,
      focus: false
    },
    items: {
      ariaRole: "option",
      tabIndex: -1,
      focus: false
    },
  }

  let FixForChrome = /Chrome\/[3-5]/.test(navigator.userAgent)
  let testElementStyle = document.createElement('div').style
  const transitionJSPropertyName = "transition" in testElementStyle ? "transition" : "webkitTransition"
  const transformJSPropertyName = "transform" in testElementStyle ? "transform" : "webkitTransform"
  const transformCSSPropertyName = transformJSPropertyName === "webkitTransform" ? "-webkit-transform" : "transform"
  const userSelectJSPropertyName = "userSelect" in testElementStyle ? "userSelect" : "webkitUserSelect"
  let hwLayerMagicStyle = testElementStyle[transformJSPropertyName] ? 'translateZ(0) ' : ''
  let hwTopLayerMagicStyle = testElementStyle[transformJSPropertyName] ? 'translateZ(1px) ' : ''
  testElementStyle = null

  let globalInstances = 0
  let attachedBodyHandlerHack = false

  function ReorderList(list, options) {
    list = document.querySelector(list)
    if (!this || this === window) return new ReorderList(list, options)
    this.options = options = options || {}
    this.onTouchCancel = this.setState.bind(this, this.states.idle)
    this.onTouchEnd = this.onTouchEnd.bind(this)
    this.onMouseUp = this.onMouseUp.bind(this)
    this.onMouseLeave = this.onMouseLeave.bind(this)
    this.onSelection = this.onSelection.bind(this)
    this.onContainerFocus = this.onContainerFocus.bind(this)
    this.onEventStart = this.onEventStart.bind(this)
    this.onEventMove = this.onEventMove.bind(this)
    this.setState(this.states.idle)
    this.attach(list)

    $(list).on('reorder:reorder', function(e) {
      if (!this.classList.contains('showIndicators')) {
        return
      }
      e.target.parentNode.insertBefore(e.target, e.detail.insertBefore)
      return false
    }, false)
  }

  function getTransform(node) {
    const transform = node.style[transformJSPropertyName]
    if (transform) {
      return {
        value:transform,
        original:transform,
      }
    }
    if (window.getComputedStyle) {
      let style = window.getComputedStyle(node).getPropertyValue(transformCSSPropertyName)
      if (style && style !== 'none') return {value:style, original:''}
    }
    return {value:'', original:''}
  }

  ReorderList.prototype = {

    list: null,
    options: {},
    state: null,
    target: null,
    usingTouch: false,
    mouseHandlersAttached: false,
    startPosition: null,
    latestPosition: null,
    previousPosition: null,
    canPreventScrolling: false,
    states: {
      idle: function idleStateInit() {
        // if(this.list && !this.list.classList.contains('showIndicators')) return
        this.removeMouseHandlers()
        if (this.target) {
          this.target.node.style.willChange = ''
          this.target = null
        }
        this.usingTouch = false

        return {
          allowTextSelection: true,
        }
      },

      undecided: function undecidedStateInit() {
        // if(!this.list.classList.contains('showIndicators')) return
        this.target.height = this.target.node.offsetHeight
        this.target.node.style.willChange = transformCSSPropertyName
        this.target.node.style[transitionJSPropertyName] = ''

        let holdTimer = setTimeout(function() {
          const move = this.getAbsoluteMovement()
          if (this.canPreventScrolling && move.x < 15 && move.y < 25) {
            this.setState(this.states.reorder)
          }
        }.bind(this), 300)

        return {
          leaveState: function() {
            clearTimeout(holdTimer)
          },

          onMove: function() {
            const move = this.getAbsoluteMovement()
            if (move.x > 20 && move.y < Math.max(100, this.target.height)) {
              this.setState(this.states.idle)
            }
            if (move.y > 20) {
              this.setState(this.states.idle)
            }
            if (move.x > move.y*1.2) return false
          },

          onLeave: function() {
            this.setState(this.states.idle)
          },

          onEnd: function() {
            const allowDefault = this.dispatch(this.target.originalTarget, 'tap')
            this.setState(this.states.idle)
            return allowDefault
          },
        }
      },

      reorder: function reorderStateInit() {
        if (this.target.node.focus && accessibility.items.focus) {
          this.target.node.focus()
        }
        this.target.height = this.target.node.offsetHeight
        const nodes = this.list.childNodes
        let originalIndex = $(this.target).index()
        let mouseOutsideTimer
        const zero = this.target.node.offsetTop + this.target.height/2
        const otherNodes = []
        for(let i = 0; i < nodes.length; i++) {
          if (nodes[i].nodeType != 1 || nodes[i] === this.target.node) continue
          const t = nodes[i].offsetTop
          nodes[i].style[transitionJSPropertyName] = transformCSSPropertyName + ' 0.2s ease-in-out'
          otherNodes.push({
            node: nodes[i],
            baseTransform: getTransform(nodes[i]),
            pos: t + (t < zero ? nodes[i].offsetHeight : 0) - zero,
          })
        }

        this.target.node.classList.add('reordering-list-item')
        this.target.node.style.zIndex = '99999'
        this.target.node.style[userSelectJSPropertyName] = 'none'
        if (FixForChrome) {
          this.list.style.webkitTransformStyle = 'preserve-3d'
        }

        function onMove() {
          this.updateScrolling()
          if (mouseOutsideTimer) {
            clearTimeout(mouseOutsideTimer)
            mouseOutsideTimer = null
          }
          const move = this.getTotalMovement()
          this.target.node.style[transformJSPropertyName] = 'translate(0,' + move.y + 'px) ' + hwTopLayerMagicStyle + this.target.baseTransform.value
          const height = this.target.height
          otherNodes.forEach(function(o) {
            let off = 0
            if (o.pos < 0 && move.y < 0 && o.pos > move.y) {
              off = height
            }
            else if (o.pos > 0 && move.y > 0 && o.pos < move.y) {
              off = -height
            }
            o.node.style[transformJSPropertyName] = off ? 'translate(0,'+off+'px) ' + hwLayerMagicStyle + o.baseTransform.value : o.baseTransform.original
          })


          return false
        }

        onMove.call(this)

        return {
          leaveState: function() {
            if (mouseOutsideTimer) clearTimeout(mouseOutsideTimer)
            if (FixForChrome) {
              this.list.style.webkitTransformStyle = ''
            }
            if (this.list.focus && accessibility.list.focus) {
              this.list.focus()
            }
            this.target.node.classList.remove('reordering-list-item')
            this.target.node.style[userSelectJSPropertyName] = ''
            this.animateToZero(function(target) {
              target.node.style.zIndex = ''
            })
            otherNodes.forEach(function(o) {
              o.node.style[transformJSPropertyName] = o.baseTransform.original
              o.node.style[transitionJSPropertyName] = ''
            })
          },

          onMove: onMove,

          onLeave: function() {
            if (mouseOutsideTimer) clearTimeout(mouseOutsideTimer)
            mouseOutsideTimer = setTimeout(function() {
              mouseOutsideTimer = null
              this.onTouchCancel()
            }.bind(this), 700)
          },

          onEnd: function() {
            const move = this.getTotalMovement()
            let i
            let spliceIndex
            if (move.y < 0) {
              for (i = 0; i < otherNodes.length; i++) {
                if (otherNodes[i].pos > move.y) {
                  break
                }
              }
              spliceIndex = i
            } else {
              for (i = otherNodes.length-1; i >= 0; i--) {
                if (otherNodes[i].pos < move.y) {
                  break
                }
              }
              spliceIndex = i+1
            }

            this.dispatch(this.target.node, 'reorder', {spliceIndex:spliceIndex, insertBefore:otherNodes[spliceIndex] ? otherNodes[spliceIndex].node : null, originalIndex: originalIndex})
            this.setState(this.states.idle)
            return false
          },
        }
      },
    },

    attach: function(list) {
      globalInstances++
      if (this.list) this.detach()
      if (!attachedBodyHandlerHack && FixForChrome) {
        attachedBodyHandlerHack = true
        document.body.addEventListener('touchstart', $.noop, false)
      }

      this.list = list

      if (false !== accessibility.list.tabIndex) {
        this.list.tabIndex = accessibility.list.tabIndex
      }
      if (accessibility.list.ariaRole) {
        this.list.setAttribute('aria-role', accessibility.list.ariaRole)
      }
      this.setChildNodesAriaRoles()
      this.list.addEventListener('focus', this.onContainerFocus, false)
      this.otherNodes = []

      $(document).on("selectionchange", this.onSelection, false)
      $(this.list).on('touchcancel', this.onTouchCancel, false)
      $(this.list).on('touchend', this.onTouchEnd, false)
      $(this.list).on($.eventStart, this.onEventStart, false)
      $(this.list).on($.eventMove, this.onEventMove, false)
    },

    detach: function() {
      this.onTouchCancel()
      $(document).off("selectionchange", this.onSelection, false)
      $(this.list).off('touchcancel', this.onTouchCancel, false)
      $(this.list).off('touchend', this.onTouchEnd, false)
      $(this.list).off($.eventMove, this.onEventMove, false)

      if (false !== accessibility.list.tabIndex) {
        this.list.removeAttribute('tabIndex')
      }
      if (accessibility.list.ariaRole) {
        this.list.removeAttribute('aria-role')
      }
      this.unSetChildNodesAriaRoles()

      globalInstances--
      if (!globalInstances && attachedBodyHandlerHack) {
        attachedBodyHandlerHack = false
        $('body').off('touchstart', $.noop, false)
      }
    },

    setState: function(newStateCtor) {
      if(this.list && !this.list.classList.contains('showIndicators')) return

      if (this.state) {
        if (this.state.ctor === newStateCtor) return
        if (this.state.leaveState) this.state.leaveState.call(this)
      }
      let prevState = this.state
      let nextState = newStateCtor.call(this)
      if (this.state === prevState) {
        nextState.ctor = newStateCtor
        this.state = nextState
      }
    },

    findTargetNode: function(targetNode) {
      while(targetNode && targetNode.parentNode !== this.list) {
        targetNode = targetNode.parentNode
      }
      return targetNode
    },

    onContainerFocus: function(e) {
      if(!this.list.classList.contains('showIndicators')) return
      this.list.style.outline = 'none'
      this.setChildNodesAriaRoles()
    },

    setChildNodesAriaRoles: function() {
      const self = this
      const nodes = Array.prototype.slice.call(self.list.childNodes)
      for(let i = 0; i < nodes.length; i++) {
        if (nodes[i].nodeType != 1) continue
        if (accessibility.items.ariaRole) {
          nodes[i].setAttribute('aria-role', accessibility.items.ariaRole)
        }
        if (false !== accessibility.items.tabIndex) {
          nodes[i].tabIndex = accessibility.items.tabIndex
        }
      }
    },

    unSetChildNodesAriaRoles: function() {
      const nodes = Array.prototype.slice.call(self.list.childNodes)
      for(let i = 0; i < nodes.length; i++) {
        if (nodes[i].nodeType != 1) continue
        if (accessibility.items.ariaRole) {
          nodes[i].removeAttribute('aria-role')
        }
        if (false !== accessibility.items.tabIndex) {
          nodes[i].removeAttribute('tabIndex')
        }
      }
    },
    onSelection: function(e) {
      const isRelated = e.target === document || this.findTargetNode(e)
      const iOS = /(iPhone|iPad|iPod)/i.test(navigator.userAgent) && !/(Android|Windows)/i.test(navigator.userAgent)
      if (!isRelated) return

      if (iOS) {
        this.setState(this.states.idle)
      } else {
        if (!this.state.allowTextSelection) {
          e.preventDefault()
        }
      }
    },

    addMouseHandlers: function() {
      if (!this.mouseHandlersAttached) {
        this.mouseHandlersAttached = true
        $(document).on('mouseleave', this.onMouseLeave, false)
        $(document).on('mouseup', this.onMouseUp, true)
        $(document).on('blur', this.onTouchCancel, false)
      }
    },

    removeMouseHandlers: function() {
      if (this.mouseHandlersAttached) {
        this.mouseHandlersAttached = false
        $(document).off('mouseleave', this.onMouseLeave, false)
        $(document).off('mouseup', this.onMouseUp, true)
        $(document).off('blur', this.onTouchCancel, false)
      }
    },

    onMouseLeave: function(e) {
      if (this.usingTouch) return
      if (e.target === document.documentElement || e.relatedTarget === document.documentElement) {
        if (this.state.onLeave) {
          this.state.onLeave.call(this)
        }
      }
    },

    onEventStart: function(e) {
      if ($.isTouchEnabled) {
        this.usingTouch = true
        this.canPreventScrolling = true
        if (e.touches.length > 1) {
          this.setState(this.states.idle)
          return
        }
        if (!this.setTarget(e)) return
        this.startAtPosition({
          x: e.touches[0].clientX,
          y: e.touches[0].clientY,
          time: e.timeStamp
        })
      } else {
        if (this.usingTouch || e.button != 0 || !this.setTarget(e)) return
        this.addMouseHandlers()
        this.canPreventScrolling = true
        this.startAtPosition({
          x: e.clientX,
          y: e.clientY,
          time: e.timeStamp
        })
      }
    },

    setTarget: function(e) {
      const targetNode = this.findTargetNode(e.target)
      if (!targetNode) {
        this.setState(this.states.idle)
        return false
      }
      let scrollContainer = targetNode.parentNode
      while (scrollContainer) {
        if (scrollContainer == document.body) break
        if (scrollContainer.scrollHeight > scrollContainer.clientHeight && window.getComputedStyle(scrollContainer)['overflow-y'] != 'visible') break
        scrollContainer = scrollContainer.parentNode
      }
      scrollContainer = scrollContainer || document.body

      this.target = {
        originalTarget: e.target,
        node: targetNode,
        scrollContainer: scrollContainer,
        origScrollTop: scrollContainer.scrollTop,
        origScrollHeight: scrollContainer.scrollHeight,
        baseTransform: getTransform(targetNode)
      }
      return true
    },

    startAtPosition: function(pos) {
      this.startPosition = this.previousPosition = this.latestPosition = pos
      this.setState(this.states.undecided)
    },

    updatePosition: function(e, pos) {
      if (this.target == null) {
        return
      }
      this.latestPosition = pos

      if (this.state.onMove) {
        if (this.state.onMove.call(this) === false) {
          e.preventDefault()
        }
      }
      if (this.latestPosition.time - this.previousPosition.time > 100) {
        this.previousPosition = this.latestPosition
      }
    },

    onEventMove: function(e) {
      if ($.isTouchEnabled) {
        this.updatePosition(e, {
          x: e.touches[0].clientX,
          y: e.touches[0].clientY,
          time: e.timeStamp
        })
        this.canPreventScrolling = false
      } else {
        this.updatePosition(e, {
          x: e.clientX,
          y: e.clientY,
          time: e.timeStamp
        })
      }
    },

    onMouseUp: function(e) {
      if (this.usingTouch || e.button !== 0) return

      if (this.state.onEnd && false === this.state.onEnd.call(this)) {
        e.preventDefault()
      }
    },

    onTouchEnd: function(e) {
      if (e.touches.length > 1) {
        this.onTouchCancel()
      } else if (this.state.onEnd && false === this.state.onEnd.call(this)) {
        e.preventDefault()
      }
    },

    getTotalMovement: function() {
      const scrollOffset = this.target.scrollContainer.scrollTop - this.target.origScrollTop
      return {
        x: this.latestPosition.x - this.startPosition.x,
        y: this.latestPosition.y - this.startPosition.y + scrollOffset,
        time: this.latestPosition.time - this.startPosition.time,
      }
    },

    getAbsoluteMovement: function() {
      const move = this.getTotalMovement()
      return {
        x: Math.abs(move.x),
        y: Math.abs(move.y),
        time: move.time,
        directionX: move.x < 0 ? 'left' : 'right',
        directionY: move.y < 0 ? 'up' : 'down'
      }
    },

    updateScrolling: function() {
      const triggerOffset = 40
      let offset = 0

      const scrollable = this.target.scrollContainer,
        containerRect = scrollable.getBoundingClientRect(),
        targetRect = this.target.node.getBoundingClientRect(),
        bottomOffset = Math.min(containerRect.bottom, window.innerHeight) - targetRect.bottom,
        topOffset = targetRect.top - Math.max(containerRect.top, 0),
        maxScrollTop = this.target.origScrollHeight - Math.min(scrollable.clientHeight, window.innerHeight)

      if (bottomOffset < triggerOffset) {
        offset = Math.min(triggerOffset, triggerOffset - bottomOffset)
      }
      else if (topOffset < triggerOffset) {
        offset = Math.max(-triggerOffset, topOffset - triggerOffset)
      }
      scrollable.scrollTop = Math.max(0, Math.min(maxScrollTop, scrollable.scrollTop + offset))
    },

    dispatch: function(targetNode, eventName, data) {
      let event = document.createEvent('CustomEvent')
      if (event && event.initCustomEvent) {
        event.initCustomEvent('reorder:' + eventName, true, true, data)
      } else {
        event = document.createEvent('Event')
        event.initEvent('reorder:' + eventName, true, true)
        event.data = data
      }
      return targetNode.dispatchEvent(event)
    },

    animateToZero: function(callback, target) {
      target = target || this.target

      target.node.style[transitionJSPropertyName] = transformCSSPropertyName + ' 0.1s ease-out'
      target.node.style[transformJSPropertyName] = 'translate(0,0) ' + hwLayerMagicStyle + target.baseTransform.value
      setTimeout(function() {
        target.node.style[transitionJSPropertyName] = ''
        target.node.style[transformJSPropertyName] = target.baseTransform.original
        if (callback) callback.call(this, target)
      }.bind(this), 101)
    }
  }
  return ReorderList
})()
/**
 * ChocolateChip-UI Widget - Edit List.
 */
export class UIEditList {
  constructor(options) {
    if (!options) return
    const self = this
    let settings = {
      element: undefined,
      editLabel: 'Edit',
      doneLabel: 'Done',
      deleteLabel: 'Delete',
      cancelLabel: 'Cancel',
      callback: $.noop,
      deletable: false,
      reorderable: false,
      state: undefined,
      stateProp: 'id'
    }
    $.extend(settings, options)

    let deletionIndicator = html`
      <aside class="deletion-indicator">
        <svg width="20px" height="20px" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
          <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
            <g id="deletion-indicator">
              <g id="ios-indicator">
                <circle id="ios-circle" fill="#FF0000" cx="10" cy="10" r="10"></circle>
                <path d="M3.5,10 L16.5,10" id="ios-bar" stroke="#FFFFFF" stroke-width="2" stroke-linecap="square"></path>
              </g>
              <path d="M2,13 L9.9294326,16.8406135 L17.1937075,1.90173332" id="checkmark" stroke="#FA0303" stroke-width="2"></path>
            </g>
          </g>
        </svg>
      </aside>`

    let deleteButton = html`
      <button class="delete">
        <label>${ settings.deleteLabel }</label>
        <svg width="27px" height="30px" viewBox="0 0 27 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
          <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
            <g id="delete-icon" fill="#3A3A3A">
              <g transform="translate(3.000000, 1.000000)">
                <path d="M1,6 L20,6 L20,24.9986131 C20,26.6562333 18.6639569,28 16.9998779,28 L4.00012207,28 C2.3432004,28 1,26.6569187 1,24.9986131 L1,6 Z M4,9 L5,9 L5,25 L4,25 L4,9 Z M8,9 L9,9 L9,25 L8,25 L8,9 Z M12,9 L13,9 L13,25 L12,25 L12,9 Z M16,9 L17,9 L17,25 L16,25 L16,9 Z" id="can"></path><path d="M0,4.96611425 L0,1.67759301 L5.1776507,1.7511163 L6.482399,0 L14.5847825,0 L15.8789491,1.7511163 L21,1.7511163 L21,4.9447157 L0,4.96611425 L0,4.96611425 Z" id="lid"></path>
              </g>
            </g>
          </g>
        </svg>
      </button>`

    let moveHandle = html`
      <svg class='handle' width="19px" height="18px" viewBox="0 0 19 18" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="background: rgba(255,255,255,0.01)">
        <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
          <g id="Artboard" stroke="#C7C7CC">
            <g id="Move-Indicator-iOS" transform="translate(2.000000, 5.000000)">
              <path d="M0,0.5 L15,0.5" id="Line-1"></path>
              <path d="M0,3.5 L15,3.5" id="Line-2"></path>
              <path d="M0,6.5 L15,6.5" id="Line-3"></path>
            </g>
          </g>
        </g>
      </svg>`

    let __data = []
    let __editMade = false
    this.callback = settings.callback || $.noop

    if (!settings.deletable && !settings.reorderable) {
      return
    }

    if (options) $.extend(settings, options)

    // let editButton
    let button
    let dispelDeletable = 'swiperight'
    let enableDeletable = 'swipeleft'
    let moveUpIndicator
    let moveDownIndicator
    let element = settings.element
    let deleteLabel
    this.root = $(settings.element)

    if (settings.deletable) {
      document.querySelector(settings.element).classList.add('deletable')
    }
    if (settings.reorderable) {
      document.querySelector(settings.element).classList.add('reorderable')
    }

    if (options.state) options.state.boundComponents.push(this)

    this.render = function(data) {
      let temp = ''
      if (!settings.element) {
        return
      }

      if (!data && settings.state) {
        data = settings.state.dataStore
      }

      if (Array.isArray(data)) {
        data.map(function(item) {
          temp += settings.render(item)
        })
      } else {
        return
      }

      this.root.textContent = ''
      let root = $(settings.element)
      root.empty()
      root.append(temp)
      root.find('li').array.map(li => {
        if (settings.deletable) {
          $(li).prepend(deletionIndicator)
          $(li).append(deleteButton)
        }
        if (settings.reorderable) {
          $(li).append(moveHandle)
        }
      })
    }

    this.val = () => options.state.dataStore

    $(() => {

      /**
       * Handle deletion of list item.
       */
      function deleteListItem(el) {
        let root = $(settings.element)
        let $this = this
        __editMade = true
        let listItem = $($this).closest('li')

        /**
         * Mark list as edited:
         */
        root[0].dataset.listEdit = 'true'
        let direction = '-1200%'
        if (document.querySelector('html').getAttribute('dir') === 'rtl') direction = '1000%'
        $($this).siblings().css({
          '-webkit-transform': 'translate3d(' + direction + ',0,0)',
          '-webkit-transition': 'all 1s ease-out',
          'transform': 'translate3d(' + direction + ',0,0)',
          'transition': 'all 1s ease-out'
        })
        setTimeout(function () {
          listItem.remove()
        }, 500)

      }
      /**
       * Handle moving list item.
       */
      if (settings.reorderable) {
        let reorderList =  new ReorderList(settings.element)
      }

      $(settings.element).on('tap', '.delete', deleteListItem)
    })

    let dir = document.dir
    dir = dir ? dir.toLowerCase() : ''
    if (dir === 'rtl') {
      dispelDeletable = 'swipeleft'
      enableDeletable = 'swiperight'
    }


    let editButton = `<button class="edit">${ settings.editLabel }</button>`
    let screen = $(settings.element).closest('ui-screen')
    let nav = screen.find('nav')
    // console.dir(settings.element)
    // console.dir('ui-screen')
    nav.append(editButton)
    nav.find('.back').hide()
    nav.prepend(`<button class="cancel">${ settings.cancelLabel }</button>`)
    nav.find('.cancel').hide()
    let editBtn = $(settings.element).closest('ui-screen').find('nav .edit')
    let cancelBtn = $(settings.element).closest('ui-screen').find('nav .cancel')
    $(settings.element).on('tap', '.deletion-indicator', function() {
      this.parentNode.classList.toggle('selected')
    })
    editBtn.on('tap', function () {
      let $this = this
      /**
       * When button is in "Edit" state:
       */
      let cancelBtn = $this.parentNode.querySelector('.cancel')
      if (this.classList.contains('edit')) {
        setTimeout(function () {
          $this.classList.remove('edit')
          $this.classList.add('done')
          $($this).text(settings.doneLabel)
          document.querySelector(settings.element).classList.add('showIndicators')
          let backBtn = $this.parentNode.querySelector('.back')
          $(backBtn).hide()
          $(cancelBtn).css('display', 'block')

        })

        /**
         * When button is in "Done" state:
         */
      } else if (this.classList.contains('done')) {
        /**
         * Execute callback if edit was performed:
         */
        setTimeout(function () {
          $this.classList.remove('done')
          $this.classList.add('edit')
          $($this).text(settings.editLabel)
          let list = document.querySelector(settings.element)
          list.classList.remove('showIndicators')
          let selectedItems = $(settings.element + ' li.selected')
          selectedItems.forEach(function(li) {
            li.classList.remove('selected')
          })
          $(cancelBtn).css('display', 'none')
        })

        if (!__editMade) return
        let movedItems = []

        /**
         * Reorder model based on user choice:
         */
        if (settings.state) {
          // (function () {
            let __data = settings.state.dataStore
            let __newarray = []
            let liData = $(settings.element).find('li')
            let temp = []
            liData.array.map(item => {
              temp.push(item.dataset.id)
            })
            temp.forEach(item => {
              let found = __data.find(li => {
                return li.uuid === item
              })
              __newarray.push(found)
            })
            settings.state.purge()
            settings.state.replace(__newarray)
            __newarray = []
          // })()

          self.callback.call(self, self.callback)
        }
      }
    })
    cancelBtn.on('tap', function() {
      let $this = this
      let editBtn = $(settings.element).closest('ui-screen').find('nav .done')
      editBtn.text(settings.editLabel)
      editBtn.array[0].classList.remove('done')
      editBtn.array[0].classList.add('edit')
      setTimeout(function () {
        document.querySelector(settings.element).classList.remove('showIndicators')
        let backBtn = $this.parentNode.querySelector('.back')
        $(backBtn).show()
        $($this).css('display', 'none')
      })
    })
  }
}
