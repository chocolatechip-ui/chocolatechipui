class Component {
  constructor(options) {
    if (!options) return
    if (typeof options.element === 'string') {
      this.elm = $(options.element)
    } else if (options.element && options.element.nodeType) {
      this.elm = $(options.element)
    } else {
      this.elm = options.element
    }
    this.origElement = options.element
    this.renderFnc = options.render
    this.state = options.state
    if (this.state) {
      this.state.boundComponents.push(this)
    }
    this.actions = options.actions
    this.styles = options.styles
    this.id = options.id || Math.random().toString(16).substr(2, 10)

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
            self.elm.on(item.event, item.callback, bubble)
          } else {
            self.elm.on(item.event, item.element, item.callback, bubble)
          }
        })
      } else if ($.type(this.actions) === 'object') {
        bubble = this.actions.bubble || false
        if (!this.actions.element || this.actions.element === 'self') {
          self.elm.on(this.actions.event, this.actions.callback, bubble)
        } else {
          self.elm.on(this.actions.event, this.actions.element, this.actions.callback, bubble)
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
    if (state) {
      state.boundComponents.push(this)
      this.state = state
    }
  }

  render(data, append) {
    const self = this
    if (!self.renderFnc) return
    let temp = ''
    if (!this.elm) return

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

    if (this.styles && this.elm) {
      const styles = this.chuiStyle()
      if (typeof this.styles !== 'object') return
      styles.css(this.origElement, this.styles)
      this.handleEvents()
    }

    if (append) {
      self.elm.append(temp)
    } else {
      this.elm.textContent = ''
      self.elm.empty()
      self.elm.append(temp)
    }
  }

  empty() {
    $(this.element).empty()
  }

  mount() {
    this.elm = $(this.origElement)
    this.handleEvents()
    const styles = this.chuiStyle()
    styles.css(this.elm, this.styles)
  }
}
