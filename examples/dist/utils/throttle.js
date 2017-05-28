
/**
  * Fires an event once during provided wait period. Options are: {leading: true/false, trailing: true/false}.
  * By default leading is true, meaning that the first event input will fire. Setting leading to false will disable this.
  * By default trailing is true. Set this to false to disable it.
  */
$.extend({
  throttle: (func, wait, options) => {
    let context, args, result
    let timeout = null
    let previous = 0
    if (!options) options = {}
    const later = function() {
      previous = options.leading === false ? 0 : new Date().getTime()
      timeout = null
      result = func.apply(context, args)
      if (!timeout) context = args = null
    }
    return function() {
      const now = new Date().getTime()
      if (!previous && options.leading === false) previous = now
      let remaining = wait - (now - previous)
      context = this
      args = arguments
      if (remaining <= 0 || remaining > wait) {
        if (timeout) {
          clearTimeout(timeout)
          timeout = null
        }
        previous = now
        result = func.apply(context, args)
        if (!timeout) context = args = null
      } else if (!timeout && options.trailing !== false) {
        timeout = setTimeout(later, remaining)
      }
      return result
    }
  }
})
