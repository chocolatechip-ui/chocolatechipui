export default (function() {

/**
 * Execute a function only upto x times.
 * This takes two arguments: the times upto when execution can happen and the callback to execute.
 */

$.extend({
  before: (times, func) => {
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

})()
