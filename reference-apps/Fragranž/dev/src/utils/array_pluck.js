export default (function() {

if (!Array.prototype.pluck) {
  $.extend(Array.prototype, {
    pluck(prop) {
      let ret = []
      this.forEach(function(item) {
        if (item[prop]) {
          ret.push(item[prop])
        }
      })
      return ret
    }
  })
}

})()
