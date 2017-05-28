
/**
 * Fires and event once after the designated wait time, regardless of how many other events occurred.
 * In the case of an input, this will start with the first keypress. After the last keypress and the wait time, the event will fire.
 * You can make the event fire after the time by passing a third optional truthy argument.
 */
$.extend({
  debounce: (func, wait, immediate) => {
    let timeout, args, context, timestamp, result

    const later = function() {
      const last = new Date().getTime() - timestamp

      if (last < wait && last >= 0) {
        timeout = setTimeout(later, wait - last)
      } else {
        timeout = null
        if (!immediate) {
          result = func.apply(context, args)
          if (!timeout) context = args = null
        }
      }
    }

    return function() {
      context = this
      args = arguments
      timestamp = new Date().getTime()
      const callNow = immediate && !timeout
      if (!timeout) timeout = setTimeout(later, wait)
      if (callNow) {
        result = func.apply(context, args)
        context = args = null
      }

      return result
    }
  }
})
