class Component {
  constructor(options) {
    if (!options) return
    const self = this
    if (typeof options.element === 'string') {
      this.root = $(options.element)
    } else if (options.element && options.element.nodeType) {
      this.root = $(options.element)
    } else {
      this.root = options.element
    }
    this.origElement = options.element
    this.renderFnc = options.render
    this.state = options.state
    if (this.state) {
      this.state.boundComponents.push(this)
    }
    this.actions = options.actions
    this.styles = options.styles
    if (options.methods && options.methods.length) {
      options.methods.map(function (method) {
        self[method.name] = method
      })
    }
    /* Lifecyle methods */
    if (options.componentWillMount && typeof options.componentWillMount === 'function') {
      this.componentWillMount = options.componentWillMount
    }

    if (options.componentDidMount && typeof options.componentDidMount === 'function') {
      this.componentDidMount = options.componentDidMount
    }

    if (options.componentWillUnmount && typeof options.componentWillUnmount === 'function') {
      this.componentWillUnmount = options.componentWillUnmount
    }

    if (options.componentDidUnmount && typeof options.componentDidUnmount === 'function') {
      this.componentDidUnmount = options.componentDidUnmount
    }
    
    if (options.componentWillUpdate && typeof options.componentWillUpdate === 'function') {
      this.componentWillUpdate = options.componentWillUpdate
    }

    if (options.componentDidUpdate && typeof options.componentDidUpdate === 'function') {
      this.componentDidUpdate = options.componentDidUpdate
    }

    this.chuiStyle = function() {
      let sharedSheet = null

      const unitlessProps = {
        columnCount: true,
        fillOpacity: true,
        flex: true,
        flexGrow: true,
        flexShrink: true,
        fontWeight: true,
        lineClamp: true,
        lineHeight: true,
        opacity: true,
        order: true,
        orphans: true,
        widows: true,
        zIndex: true,
        zoom: true
      }

      function flatten(array) {
        const flat = Array.prototype.concat(array)
        for (let i = 0; i < flat.length; i++) {
          if (Array.isArray(flat[i])) {
            flat.splice(i, 1, flat[i--])
          }
        }
        return flat
      }

      function createStyleSheet(options) {
        if (!(this instanceof createStyleSheet)) {
          return new createStyleSheet(options)
        }
        options || (options = {})
        options.prefix = !options.hasOwnProperty("prefix") ? true : !!options.prefix
        options.unit = options.hasOwnProperty("unit") ? options.unit : "px"

        this._sheet = null
        this._prefix = null

        this.css = function (element, styles, selector) {
          if (styles == null) return ""
          if (this._sheet == null) {
            this._sheet = sharedSheet = (sharedSheet || createSheet())
          }
          selector = element

          const rules = rulesFromStyles(selector, styles)
          if (options.prefix || options.unit !== "") {
            rules.forEach(function(set) {
              if (options.unit !== "") {
                addUnit(set[1], options.unit)
              }
            })
          }
          insertRules(rules, this._sheet)
        }

      }

      function createSheet() {
        if (document.head == null) {
          throw new Error("Can't add stylesheet before <head> is available. Make sure your document has a head element.")
        }
        const style = document.createElement("style")
        style.id = "styles_" + Math.random().toString(16).slice(2, 8)
        document.head.appendChild(style)
        return style.sheet
      }

      function rulesFromStyles(selector, styles) {
        if (!Array.isArray(styles)) styles = [styles]
        const style = {}
        let rules = []
        styles = flatten(styles)
        styles.forEach(function(block) {
          for (let prop in block) {
            let value = block[prop]
            if (isPlainObject(value) || Array.isArray(value)) {
              rules = rules.concat(
                rulesFromStyles(combineSelectors(selector, prop), value)
              )
            } else {
              if (prop === "content") value = "'"+value+"'"
              style[prop] = value
            }
          }
        })
        rules.push([ selector, style ])
        return rules
      }

      function insertRules(rules, sheet) {
        window.sheet = sheet
        function hyphenate(str) {
          return str.replace(/[A-Z]/g, function($0) { return '-'+$0.toLowerCase() })
        }
        rules.forEach(function(rule) {
          const pairs = []
          for (let prop in rule[1]) {
            pairs.push(hyphenate(prop) + ":" + rule[1][prop])
          }
          if (pairs.length > 0) {
            const rulez = rule[0] ? rule[0] : ''
            sheet.insertRule(rulez + "{" + pairs.join(";") + "}", 0)
          }
        })
      }

      function combineSelectors(parent, child) {
        const pseudoRe = /^[:\[]/
        const parents = parent.split(","), children = child.split(",")
        return parents.map(function(parent) {
          return children.map(function(part) {
            const separator = pseudoRe.test(part) ? "" : " "
            return parent + separator + part
          }).join(",")
        }).join(",")
      }

      function addUnit(style, unit) {
        for (let prop in style) {
          let value = style[prop] + ""
          if (!isNaN(value) && !unitlessProps[prop]) {
            value = value + unit
          }
          style[prop] = value
        }
        return style
      }

      function isPlainObject(obj) {
        return obj === Object(obj) && Object.prototype.toString === obj.toString
      }

      const stylesheets = {}
      stylesheets.css = createStyleSheet().css
      return stylesheets
    }

    this.handleEvents = function() {
      if (!this.actions) return
      const self = this
      let bubble = false
      if (this.actions.length) {
        this.actions.forEach(function(item) {
          bubble = item.bubble
          if (item && item.element === 'self' || item && !item.element) {
            self.root.on(item.event, item.callback, bubble)
          } else {
            self.root.on(item.event, item.element, item.callback, bubble)
          }
        })
      } else if ($.type(this.actions) === 'object') {
        bubble = this.actions.bubble || false
        if (!this.actions.element || this.actions.element === 'self') {
          self.root.on(this.actions.event, this.actions.callback, bubble)
        } else {
          self.root.on(this.actions.event, this.actions.element, this.actions.callback, bubble)
        }
      }
    }

    if (this.actions) {
      this.handleEvents(this.actions)
    }
  }

  setTemplate(template) {
    if (template) this.renderFnc = template
  }

  setState(state) {
    let self = this
    if (state) {
      if (this.state) {
        const position = state.boundComponents.findIndex((component) => self == component)
        this.state.boundComponents.splice(position, 1)
      }
      state.boundComponents.push(this)
      this.state = state
    }
  }

  render(data, append) {
    const self = this
    if (!self.renderFnc) {
      return
    }
    let temp = ''
    if (!this.root.array[0]) {
      return
    }
    if (this.componentWillUpdate) {
      this.componentWillUpdate()
    }
    if (!data && this.state) {
      data = this.state.get()
    }

    if (Array.isArray(data)) {
      data.map(function(item, idx) {
        temp += self.renderFnc(item, idx)
      }).join('')
    } else {
      temp = self.renderFnc(data)
    }

    if (this.styles && (this.root && this.root.array[0])) {
      const styles = this.chuiStyle()
      if (typeof this.styles !== 'object') return
      styles.css(this.origElement, this.styles)
    }

    if (append) {
      self.root.append(temp)
    } else {
      this.root.array[0].textContent = ''
      self.root.empty()
      self.root.append(temp)
    }
    if (this.componentDidUpdate) {
      this.componentDidUpdate()
    }
  }

  empty() {
    if (this.root.array[0]) {
      this.root.empty()
    }
  }

  mount() {
    if (this.componentWillMount) {
      this.componentWillMount()
    }
    this.root = $(this.origElement)
    this.handleEvents()
    const styles = this.chuiStyle()
    styles.css(this.origElement, this.styles)
    if (this.componentDidMount) {
      this.componentDidMount()
    }
  }

  unmount() {
    if (this.componentWillUnmount) {
      this.componentWillUnmount()
    }
    this.empty()
    this.root.off()
    if (this.componentDidUnmount) {
      this.componentDidUnmount()
    }
  }
}
