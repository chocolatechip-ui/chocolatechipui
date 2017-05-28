
$.extend({
  eventStart : null,
  eventEnd : null,
  eventMove : null,
  eventCancel : null,
  gestureLength : 30
});

$(function() {
  /* Setup Event Variables */
  /* Pointer events for IE10 and WP8: */
  if (window.navigator.pointerEnabled) {
    $.eventStart = 'pointerdown'
    $.eventEnd = 'pointerup'
    $.eventMove = 'pointermove'
    $.eventCancel = 'pointercancel'
  /* Pointer events for IE10 and WP8: */
  } else if (window.navigator.msPointerEnabled) {
    $.eventStart = 'MSPointerDown'
    $.eventEnd = 'MSPointerUp'
    $.eventMove = 'MSPointerMove'
    $.eventCancel = 'MSPointerCancel'
  /* Touch events for iOS & Android: */
  } else if ('ontouchstart' in window && /mobile/img.test(navigator.userAgent)) {
    $.eventStart = 'touchstart'
    $.eventEnd = 'touchend'
    $.eventMove = 'touchmove'
    $.eventCancel = 'touchcancel'
  /* Mouse events for desktop: */
  } else {
    $.eventStart = 'mousedown'
    $.eventEnd = 'click'
    $.eventMove = 'mousemove'
    $.eventCancel = 'mouseout'
  }
});

(function() {

  var ChuiEventCache = {
    elements: {}
  }

  /**
   * Private method to set events on ChuiEventCache
   */
  const bind = function(element, event, callback, capturePhase) {
    if (!element.id) element.id = $.uuid()
    if (!ChuiEventCache.elements[element.id]) {
      ChuiEventCache.elements[element.id] = []
    }
    ChuiEventCache.elements[element.id].push({
      event: event,
      callback: callback
    })
    element.addEventListener(event, callback, capturePhase)
  }

  /**
   * Delete items from event stack:
   */
  const deleteFromEventStack = function(toDelete, evtStck) {
    let len = toDelete.length
    for (let i = 0; len > i; len--) {
      evtStck.splice(toDelete[len - 1], 1)
    }
  }

  /**
   * Private method to unbind events on ChuiEventCache
   */
  const unbind = function(element, event, callback) {

    const eventStack = ChuiEventCache.elements[element.id]
    if (!eventStack) return
    let deleteOrder = []

    if (!event) {
      deleteOrder = []
      eventStack.forEach(function(evt, idx) {
        element.removeEventListener(evt.event, evt.callback, evt.capturePhase)
        deleteOrder.push(idx)
      })

      deleteFromEventStack(deleteOrder, eventStack)

    } else if (!!event && !callback) {
      deleteOrder = []
      eventStack.forEach(function(evt, idx) {
        if (evt.event === event) {
          element.removeEventListener(evt.event, evt.callback, evt.capturePhase)
          deleteOrder.push(idx)
        }
      })

      deleteFromEventStack(deleteOrder, eventStack)

    } else if (callback) {
      deleteOrder = []
      eventStack.forEach(function(evt, idx) {
        if (callback === evt.callback) {
          element.removeEventListener(evt.event, evt.callback, evt.capturePhase)
          deleteOrder.push(idx)
        }
      })
      deleteFromEventStack(deleteOrder, eventStack)
    }
  }

  /**
   * Set delegated events on ChuiEventCache
   */
  const delegate = function(element, selector, event, callback, capturePhase) {
    const delegateElement = $(element).array[0]
    $(element).forEach(function(ctx) {
      $(ctx).on(event, function(e) {
        let target = e.target
        if (e.target.nodeType === 3) {
          target = e.target.parentNode
        }
        $(ctx).find(selector).forEach(function(delegateElement) {
          if (delegateElement === target) {
            callback.call(delegateElement, e)
          } else {
            try {
              const ancestor = $(target).closest(selector)
              if (delegateElement === ancestor.array[0]) {
                callback.call(delegateElement, e)
              }
            } catch (err) {}
          }
        })
      }, capturePhase)
    })
  }


  /**
   * Method to remove delegated events from ChuiEventCache:
   */
  const undelegate = function(element, selector, event, callback, capturePhase) {

    unbind($(element).array[0], event, callback, capturePhase)
  }

  $.fn.extend({
    on: function(event, selector, callback, capturePhase) {
      if (!event) {
        return
      }
      if (!selector) {
        return
      }
      if (!selector && /Object/img.test(event.constructor.toString())) {
        this.forEach(function(element) {
          for (let key in event) {
            if (event.hasOwnProperty(key)) {
              $(element).on(key, event[key])
            }
          }
        })
      }
      let ret = []
      let events
      if (typeof event === 'string') {
        event = event.trim()
        if (/\s/.test(event)) {
          events = event.split(' ')
          this.forEach(function(ctx) {
            events.forEach(function(evt) {
              if (typeof selector === 'function') {
                bind(ctx, evt, selector, callback)
                ret.push(ctx)
              } else {
                delegate(ctx, selector, evt, callback, capturePhase)
              }
            })
          })
        }
      }
      this.forEach(function(ctx) {
        if (typeof selector === 'function') {
          return bind(ctx, event, selector, callback)
        } else {
          delegate(ctx, selector, event, callback, capturePhase)
        }
      })
      return this
    },

    off: function(event, selector, callback, capturePhase) {
      const ret = new Stack()
      if (!this.array.length) return ret

      this.forEach(function(ctx) {
        if (typeof event === 'undefined') {
          ret.push(ctx)
          unbind(ctx)
          return ret
        } else if (typeof selector === 'function' || !selector) {
          unbind(ctx, event, selector, callback, capturePhase)
          return this
        } else {
          undelegate(ctx, selector, event, callback, capturePhase)
          return this
        }
      })
    },

    trigger: function(event, data) {
      if (!event) {
        return
      }
      if (!this.array.length) return new Stack()
      this.forEach(function(ctx) {
        if (document.createEvent) {
          const evtObj = document.createEvent('Events')
          evtObj.initEvent(event, true, false)
          evtObj.data = data
          ctx.dispatchEvent(evtObj)
        }
      })
    }
  })
})();
