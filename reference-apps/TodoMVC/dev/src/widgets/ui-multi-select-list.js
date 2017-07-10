
export class UIMultiSelectList {
  constructor(options) {
    if (!options || !options.element) return
    const self = this
    let settings = {
      element: undefined,
      selected: [],
      name: $.uuid() + '[]',
      callback: $.noop,
      state: undefined
    }
    this.selection = []
    $.extend(settings, options)
    let selections = settings.selected
    const name = settings.name
    const list = $(settings.element)
    const selectionIndicator = function(value) {
      return`<aside>
        <span class="multi-selection-indicator">
          <svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
            <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="multi-select-icon" stroke="#979797">
              <g id="multi-select-circle-+-multi-select-checkmark" transform="translate(2.000000, 2.000000)">
                <circle id="multi-select-circle" cx="13" cy="13" r="13"></circle>
                <path d="M4.71521456,15.9877529 L13.0000002,20.7028494 L19.977049,5.70284941" id="multi-select-checkmark"></path>
                </g>
              </g>
            </g>
          </svg>
        </span>
      </aside>`
    }
    if (settings.state) {
      settings.state.boundComponents.push(this)
    }

    // this.val = () => __selection


    this.render = function(data, append) {
      var temp = ''
      if (!settings.element) {
        return
      }

      if (!data && settings.state) {
        data = settings.state.dataStore
      }

      if (Array.isArray(data)) {
        data.map(function(item, idx) {
          temp += settings.render(item)
        }).join('')
      } else {
        return
      }

      var root = $(settings.element)
      root.array[0].classList.add('multi-select-list')
      root.empty()
      root.append(temp)
      setTimeout(function() {
        var data = settings.state.dataStore
        var listItems = Array.prototype.slice.apply(root[0].querySelectorAll('li'))
        listItems.map((item, idx) => {
          item.dataset.select = data[idx].value
          if (settings.selected && settings.selected.length) {
            if (settings.selected.indexOf(idx) > -1) {
              item.classList.add('selected')

              self.selection.push({
                index: idx,
                value: data[idx].value
              })
              $(item).append(`<input type="checkbox" checked name="${ name }" value="${ data[idx].value }">`)
            } else {
              $(item).append(`<input type="checkbox" name="${ name }" value="${ data[idx].value }">`)
            }
          } 
          $(item).prepend(selectionIndicator(data[idx][settings.value]))
          
        })
      })
    }

    list.on('tap', 'li', function() {
      const item = this
      if (item.classList.contains('selected')) {
        item.classList.remove('selected')
        item.removeAttribute('aria-checked')
        item.querySelector('input').checked = false
        let dataObj = {
          index: $(item).index(),
          value: item.dataset.select
        }
        let pos
        self.selection.forEach(function(item, idx) {
          if (item.value === dataObj.value) {
            pos = idx
          }
        })

        self.selection.splice(pos, 1)
        settings.callback.apply(this, arguments)

      } else {
        self.selection.push({
          index: $(item).index(),
          value: item.dataset.select
        })
        self.selection.unique()
        item.classList.add('selected')
        item.setAttribute('aria-checked', true)
        item.querySelector('input').checked = true
        settings.callback.apply(this, arguments)
      }
    })
  }
}
