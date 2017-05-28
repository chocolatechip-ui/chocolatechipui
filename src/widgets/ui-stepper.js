
class UIStepper {
  constructor(options) {
    if (!options || !options.element || !options.min || !options.max) return
    var self = this
    this.stepper = $(options.element)
    const min = options.min
    const max = options.max
    const defaultValue = options.defaultValue ? options.defaultValue : options.min
    let increaseSymbol = '+'
    let decreaseSymbol = '-'
    let disabledDecrease = ''
    let disabledIncrease = ''
    this.value
    if (min === defaultValue) {
      disabledDecrease = ' disabled '
    } else if (max === defaultValue) {
      disabledIncrease = ' disabled '
    }
    const decreaseButton = '<button ' + disabledDecrease + ' class="decrease"><span>-</span></button>'
    const label = `<label>${ defaultValue }</label><input type="text" value="${ defaultValue }">`
    const increaseButton = '<button ' + disabledIncrease + '  class="increase"><span>+</span></button>'
    $(options.element).append(decreaseButton + label + increaseButton)
    var dataVal = {
      min: min,
      max: max,
      defaultValue: defaultValue
    }
    $(options.element).array[0].dataset.value = JSON.stringify(dataVal)

    const increaseStepperValue = function() {
      const currentValue = $(options.element).find('input').array[0].value
      const value = JSON.parse($(options.element).array[0].dataset.value)
      const max = value.max
      let newValue
      newValue = parseInt(currentValue, 10) + 1
      $(options.element).find('button:first-of-type').array[0].removeAttribute('disabled')
      $(options.element).find('label').text(newValue)
      $(options.element).find('input').array[0].value = newValue
      self.value = newValue
      if (newValue == max) {
        this.setAttribute('disabled', 'disabled')
      }
    }

    const decreaseStepperValue = function() {
      const currentValue = $(options.element).find('input').array[0].value
      const value = JSON.parse($(options.element).array[0].dataset.value)
      let newValue
      newValue = parseInt(currentValue, 10) - 1
      $(options.element).find('button:last-of-type').array[0].removeAttribute('disabled')
      $(options.element).find('label').text(newValue)
      $(options.element).find('input').array[0].value = newValue
      self.value = newValue
      if (newValue === min) {
        this.setAttribute('disabled', 'disabled')
      }
    }

    $(options.element).find('button:last-of-type').on($.eventStart, function() {
      increaseStepperValue.call(this, this.__stepper)
    })

    $(options.element).find('button:first-of-type').on($.eventStart, function() {
      decreaseStepperValue.call(this, this.__stepper)
    })
  }
}
