
/**
 * Enable capitalize of strings.
 * Adding a second, truthy parameter capitalizes all words in phrase.
 */
$.extend({
  capitalize: (string, all) => {
    const self = this
    if (!string) {
      return
    }
    if (typeof string !== 'string') return
    if (all) {
      const str = string.split(' ')
      let newstr = []
      str.forEach(item => {
        return newstr.push(self.capitalize(item))
      })
      return newstr.join(' ')
    } else {
      return (
        string.charAt(0).toUpperCase() + string.substring(1).toLowerCase()
      )
    }
  },
})
