
if (!Array.prototype.intersection) {
  $.extend(Array.prototype, {
    intersection(array) {
      const self = this
      const diff = self.difference(array)
      return this.difference(diff)
    }
  })
}
