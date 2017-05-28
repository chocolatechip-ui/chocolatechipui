
class UISwitch {
  constructor(options) {
    if (!options || !options.element) return
    this.checked = false
    this.value = undefined
    const self = this
    let settings = {
      element: undefined,
      name: undefined,
      value: undefined,
      checked: false,
      on: $.noop,
      off: $.noop
    }
    $.extend(settings, options)
    this.checked = settings.checked
    this.value = settings.value
    let __element = $(settings.element)
    let __el = __element.array[0]
    /**
     * Abrstract swipe for left-to-right and right-to-left:
     */
    let swipeOn = "swiperight"
    let swipeOff = "swipeleft"
    if (document.documentElement.dir === "rtl") {
      swipeOn = "swipeleft"
      swipeOff = "swiperight"
    }

    let checkState = settings.checked ? ' checked' : ''
    const __switch = `<em></em><input type="checkbox" name="${ settings.name }" ${ checkState } value="${ settings.value }">`

    __element.append(__switch)
    __el.value =  settings.value
    __el.setAttribute('name', settings.name)

    if (this.checked) {
      __el.classList.add('checked')
      __el.setAttribute('role', 'checkbox')
      __el.checked = true
    }



    __element.on('tap', function() {
      const checkbox = this.querySelector('input')
      if (this.classList.contains('checked')) {
        this.classList.remove('checked')
        this.setAttribute('aria-checked', false)
        checkbox.removeAttribute('checked')
        this.checked = false
        self.checked = false
        __el.checked = false
        if (settings.off) {
          settings.off.call(this)
        }
      } else {
        this.classList.add('checked')
        checkbox.setAttribute('checked', 'checked')
        __el.checked = true
        this.setAttribute('aria-checked', true)
        this.checked = true
        self.checked = true
        if (settings.on) {
          settings.on.call(this)
        }

      }
    })
    __element.on(swipeOn, function() {
      const checkbox = this.querySelector('input')
      if (this.classList.contains('checked')) {
        this.classList.remove('checked')
        this.setAttribute('aria-checked', false)
        __el.checked = false
        checkbox.removeAttribute('checked')
        this.checked = true
        self.checked = true
        if (settings.on) {
          settings.on.call(this)
        }
      }
    })
    __element.on(swipeOff, function() {
      const checkbox = this.querySelector('input')
      if (!this.classList.contains('checked')) {
        this.classList.add('checked')
        checkbox.setAttribute('checked', 'checked')
        this.setAttribute('aria-checked', true)
        __el.checked = true
        this.checked = false
        self.checked = false
        if (settings.off) {
          settings.off.call(this)
        }
      }
    })
  }
}
