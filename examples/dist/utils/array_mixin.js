
if (!Array.prototype.mixin) {
  $.extend(Array.prototype, {
    mixin(array) {
      var self = this
      var ret = this.concat(array)
      ret.unique()
      self.splice(0)
      ret.forEach(function(item) {
        self.push(item)
      })
    }
  })
}
