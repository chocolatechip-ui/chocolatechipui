
/**
 * Execute a function only once.
 */

$.extend({
  once: func => {
    let times = 2
    let memo
    return function() {
      if (--times > 0) {
        if ($.type(func) === 'function') {
          memo = func.apply(this, arguments)
        }
      }
      if (times <= 1) func = null
      return memo
    }
  }
})
