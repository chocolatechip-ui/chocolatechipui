
/**
 * Execute a function only after x times.
 * This takes two arguments: the times or attempts before execution and a callback to execute.
 */

$.extend({
  after: (times, func) => {
    return function() {
      if (--times < 1) {
        return func.apply(this, arguments)
      }
    }
  }
})
