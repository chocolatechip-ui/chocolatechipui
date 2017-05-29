export default (function() {

/**
 * ChocolateChip-UI serialize methods.
 */
$.fn.extend({
  serializeArray() {
    let name
    let type
    let ret = []
    const add = value => {
      if ($.type(value) === 'array') {
        return value.forEach(add)
      }
      ret.push({
        name: name,
        value: value
      })
    }
    if (this[0]) {
      $.each([].slice.apply(this[0].elements), (idx, field) => {
        type = field.type
        name = field.name
        if (name && field.nodeName.toLowerCase() != 'fieldset' &&
          !field.disabled && type != 'submit' && type != 'reset' && type != 'button' && type != 'file' &&
          ((type != 'radio' && type != 'checkbox') || field.checked)) {
          add($(field).val())
        }
      })
    }
    return ret
  },

  /**
   * Serialize the values of a form: 
   */
  serialize() {
    let ret = []
    this.serializeArray().forEach(element => {
      ret.push(encodeURIComponent(element.name) + '=' + encodeURIComponent(element.value))
    })
    return ret.join('&')
  }
})

})()
