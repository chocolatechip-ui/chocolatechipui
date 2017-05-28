
if (!Array.prototype.unique) {
  $.extend(Array.prototype, {
    unique() {
      const len = this.length
      let obj = {}
      let ret = []
      for (let i = 0; i < len; i++) {
        const arrayItem = JSON.stringify(this[i])
        const arrayItemValue = this[i]
        if (obj[arrayItem] === undefined) {
          ret.push(arrayItemValue)
          obj[arrayItem] = 1
        } else {
          obj[arrayItem]++
        }
      }
      this.length = 0
      const self = this
      ret.forEach(function(item) {
        self.push(item)
      })
    }
  })
}
