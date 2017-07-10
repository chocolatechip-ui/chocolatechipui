
class UISelectList {
  constructor(options) {
    if (!options || !options.element) return
    var self = this
    let settings = {
      element: undefined,
      selected: undefined,
      name: $.uuid(),
      callback: $.noop,
      state: undefined,
      render: undefined,
      value: undefined,
    }
    $.extend(settings, options)
    this.value = settings.value
    this.index = settings.selected
    const name = settings.name
    this.root = $(settings.element)

    const selectionIndicator = function(value) {
      return `
        <input type='radio' value='${value}' name='${settings.name}'><aside>
        <span class="selection-indicator">
          <svg width="20px" height="20px" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
            <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
              <g id="selection-indicator">
                <path d="M2,13 L9.9294326,16.8406135 L17.1937075,1.90173332" id="checkmark" stroke="#007AFF" stroke-width="2"></path>
                <circle id="outer-circle" stroke="#007AFF" stroke-width="2" cx="10" cy="10" r="9"></circle><circle id="inner-circle" fill="#007AFF" cx="10" cy="10" r="5"></circle>
              </g>
            </g>
          </svg>
        </span>
      </aside>
      `
    }
    if (settings.state) {
      settings.state.boundComponents.push(this)
    }
    let settingsData
    if (settings.state) settingsData = settings.state.dataStore
    this.value = settingsData ? settingsData[settings.selected].value : ''
    this.index = settings.selected

    this.render = function(data, append) {
      var temp = ''
      if (!settings.element) {
        return
      }

      if (!data && settings.state) {
        data = settings.state.dataStore
      }

      if (Array.isArray(data)) {
        data.map(function(item) {
          temp += settings.render(item)
        }).join('')
      } else {
        return
      }

      this.root.textContent = ''
      var root = $(settings.element)
      root.empty()
      root.append(temp)
      setTimeout(function() {
        var data = settings.state.dataStore
        var listItems = Array.prototype.slice.apply(root[0].querySelectorAll('li'))
        listItems.map((item, idx) => {
          $(item).append(selectionIndicator(data[idx].value, idx))
          if (idx == settings.selected) {
            item.classList.add('selected')
            $(item).find('input')[0].checked = true
          }
        })
      })
    }

    $(settings.element).on('tap', 'li', function() {
      const item = $(this)
      self.value = this.querySelector('input').value
      self.index = item.index()

      var siblings = item.siblings('li')
      siblings.forEach(function(sib) {
        sib.removeAttribute('aria-checked')
        sib.classList.remove('selected')
        sib.querySelector('input').checked = false
      })
      this.classList.add('selected')
      this.setAttribute('aria-checked', true)
      this.querySelector('input').checked = true
      settings.callback.apply(this, arguments)
    })
  }
}
