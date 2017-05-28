export default (function() {

if (!Array.prototype.difference) {
  $.extend(Array.prototype, {
    difference(a) {
      return this.filter(function(after) {
        return !a.reduce(function(found, before) {
          if (!found) {
            found = true
            for (let key in before) {
              if (before.hasOwnProperty(key)) {
                  found = found && (before[key] === after[key])
              }
            }
          }
          return found
        }, false)
      })
    }
  })
}

})()
