class Stack {
  constructor(args) {
    this.array = []
    this.length = 0
    this.type = 'stack'
    if (args && args === document) {
      this.array[0] = document
      this[0] = document
    } else if (Array.isArray(args)) {
      let i = -1
      const len = args.length
      while (++i < len) {
        this.array[i] = args[i]
      }
    } else {
      const array = Array.prototype.slice.apply(arguments)
      array.forEach(function(ctx, idx) {
        this.array[idx] = ctx
      })
    }
  }

  eq(index) {
    const ret = new Stack()
    if (!this.array.length) return ret
    let temp
    if (index < 0) {
      temp = this.array[this.array.length + index]
      ret.push(temp)
    } else {
      if (index >= this.array.length) return new Stack()
      temp = this.array[index]
      ret.push(temp)
    }
    ret[0] = ret.array[0]
    return ret
  }

  push(data) {
    if (data && data.objectType === 'Stack') {
      this.array = this.array.concat(data.array)
      this[0] = this.array
    } else {
      this.array.push(data)
    }
  }

  pop() {
    let ret = this.array.pop()
    ret = $(ret)
    ret[0] = ret.array[0]
    return ret
  }

  unshift(data) {
    if (data && data.objectType === 'Stack') {
      this.array.unshift(data.array[0])
      this[0] = this.array[0]
    } else {
      this.array.unshift(data)
      this[0] = this.array[0]
    }
  }

  shift() {
    let ret = this.array.shift()
    ret = $(ret)
    ret[0] = ret.array[0]
    return ret
  }

  forEach(callback) {
    let value
    let i = 0
    const len = this.array.length
    for (; i < len; i++) {
      value = callback.call(this.array[i], this.array[i], i)
      if (value === false) {
        break
      }
    }
  }

  slice(...args) {
    let ret = new Stack()
    ret.concat(this.array.slice.apply(this.array, args))
    ret = $(ret)
    ret[0] = ret.array[0]
    return ret
  }

  splice(...args) {
    let ret = new Stack()
    ret.concat(this.array.splice.apply(this.array, args))
    ret = $(ret)
    ret[0] = ret.array[0]
    return ret
  }

  filter(...args) {
    let ret = new Stack()
    ret.concat(this.array.filter.apply(this.array, args))
    ret[0] = ret.array[0]
    ret = $(ret)
    ret[0] = ret.array[0]
    return ret
  }

  map(...args) {
    let ret = new Stack()
    ret.concat(this.array.map.apply(this.array, args))
    ret[0] = ret.array[0]
    ret = $(ret)
    ret[0] = ret.array[0]
    return ret
  }

  indexOf(node) {
    if (!node) return -1
    if (node.nodeType && node.nodeType === 1) {
      return this.array.indexOf(node)
    } else if (node && node.objectType === 'Stack') {
      return this.array.indexOf(node[0])
    } else if (node && Array.isArray(node)) {
      return this.array.indexOf(node[0])
    } else if (node && $.type(node) === 'string') {
      const el = this[0].parentNode.querySelector(node)
      return this.array.indexOf(el)
    }
  }

  concat(collection) {
    const self = this
    if (collection && Array.isArray(collection.array)) {
      this.array = this.array.concat(collection.array)
    } else if (collection && collection.constructor.toString().match(/HTMLLIElement/)) {
      this.array.push(collection)
    } else if (collection && Array.isArray(collection)) {
      collection.forEach(function(item) {
        self.array.push(item)
      })
    }
  }

  reverse(...args) {
    this.array.reverse.apply(this.array, args)
    this[0] = this.array[0]
  }

  unique() {
    const ret = []
    const sort = this.array.sort()
    sort.forEach((ctx) => {
      if (ret.indexOf(ctx) === -1) {
        ret.push(ctx)
      }
    })
    ret.sort(function(a, b) {
      return a - b
    })
    this.array.splice(0)
    const self = this.array
    ret.forEach(function(node) {
      self.push(node)
    })
  }

  purge() {
    this.array.length = 0
  }

  find(selector, context) {
    let ret = new Stack()
    let matches
    if (!this.array.length)
      return ret
    if (context) {
      $(context).forEach(function() {
        matches = Array.prototype.slice.apply(context.querySelectorAll(selector))
        matches.forEach(function(node) {
          ret.array.push(node)
        })
      })
    } else {
      this.forEach(function(ctx) {
        if (ctx && ctx.children && ctx.children.length) {
          matches = Array.prototype.slice.apply(ctx.querySelectorAll(selector))
          matches.forEach(function(node) {
            ret.array.push(node)
          })
        }
      })
    }
    ret[0] = ret.array[0]
    return ret
  }

  is(arg) {
    let ret = false
    if (!this.array.length || !arg) return
    if (!this.array.length) return
    const self = this
    const __is = function(node, arg) {
      if (typeof arg === 'string') {
        let nodes
        if (node.parentNode) nodes = node.parentNode.querySelectorAll(arg)
        let elements
        if (nodes && nodes.length) {
          elements = Array.prototype.slice.apply(node.parentNode.querySelectorAll(arg))
        }
        if (elements && elements.length) {
          if (elements.indexOf(node) >= 0) {
            ret = true
          }
        }
      } else if (typeof arg === 'function') {
        if (arg.call(self)) {
          ret = true
        }
      } else if (arg && arg.type && arg.type === 'Stack') {
        if (node === arg[0]) {
          ret = true
        }
      } else if (arg && arg.length) {
        if (this.slice.apply(arg).indexOf(node) !== -1) {
          ret = true
        }
      } else if (arg.nodeType === 1) {
        if (node === arg) {
          ret = true
        }
      } else {
        return
      }
      return ret
    }
    this.forEach(function(item) {
      if (__is(item, arg)) {
        ret = true
      }
    })
    return ret
  }

  index(selector) {
    const self = this.array
    if (!this.array.length) {
      return
    }

    function getIndex() {
      const result = self.findIndex(function(el) {
        return $(el).is(selector)
      })
      return result
    }

    if (selector && typeof selector === 'string') {
      return getIndex(selector)

    } else if (selector && selector.type && selector.type === 'Stack') {
      return getIndex(selector[0])

    } else if (selector && selector.nodeType && selector.nodeType === 1) {
      return getIndex(selector)

    } else {
      if (self.length > 1) {
        return 0
      }
      const siblings = Array.prototype.slice.apply(self[0].parentNode.children)
      return siblings.findIndex(function(el) {
        return el === self[0]
      })
    }
  }

  siblings(selector) {
    if (!this.array.length)
      return new Stack()
    let __siblings
    let ret = new Stack()
    const self = this
    const pos =  this.index()
    let parent
    const children = Array.prototype.slice.apply(self.array[0].parentNode.children)
    if (selector && typeof selector === 'string') {
      parent = this.array[0].parentNode
      __siblings = Array.prototype.slice.apply(parent.querySelectorAll(selector))
      const newPos = __siblings.indexOf(self.array[0])
      __siblings.splice(newPos, 1)
      ret.concat(__siblings)
      ret[0] = ret.array[0]
      return ret
    } else {
      children.splice(pos, 1)
      ret.array = children
      ret[0] = ret.array[0]
      return ret
    }
  }

  closest(selector) {
    if (!this.array.length) {
      return new Stack()
    }
    const ret = new Stack()
    if (typeof selector === 'undefined') {
      return new Stack()
    }
    let p
    if (this.array[0]) {
      p = this.array[0].parentNode
    }
    if (!p) {
      return new Stack()
    }
    if (typeof selector === 'string') {
      selector.trim()
      if (p && $(p).is(selector)) {
        ret.array.push(p)
      } else {
        ret.array.push($(p).closest(selector).array[0])
      }
    }
    if (ret.array[0] === undefined) {
      ret.splice(0)
    }
    ret[0] = ret.array[0]
    return ret
  }

  css(property, value) {
    if (!this.array.length) return new Stack()
    const pixelRE = /top|bottom|left|right|margin|padding/img
    let postFix = ''
    const ret = new Stack()
    const testForPixelSupport = function(value, property) {
      if (value === 'number' && property.match(pixelRE)) {
        postFix = 'px'
      }
    }
    if (!property) return new Stack()
    if (!value && typeof property === 'object' && !Array.isArray(property)) {
      this.forEach(function(node) {
        for (let key in property) {
          if (property.hasOwnProperty(key)) {
            testForPixelSupport(property[key], key)
            node.style[$.camelize(key)] = property[key] + postFix
          }
        }
        ret.push(node)
      })
    } else if (!value && typeof property === 'string') {
      if (!this.array.length)
        return
      return document.defaultView.getComputedStyle(this.eq(0).array[0], null).getPropertyValue(property.toLowerCase())
    } else if (!!value) {
      this.forEach(function(node) {
        testForPixelSupport(value, property)
        node.style[$.camelize(property)] = value + postFix
        ret.push(node)
      })
    }
    ret[0] = ret.array[0]
    return ret
  }

  before(content) {
    if (!this.array || !this.array.length) {
      return new Stack()
    }
    const self = this
    const __before = function(node, content) {
      if (typeof content === 'string' || typeof content === 'number') {
        content = $.h(content)
      }
      if (content && content.type && content.type === 'stack') {
        const len = content.array.length
        let i = 0
        while (i < len) {
          node.parentNode.insertBefore(content.array[i], node)
          i++
        }
      } else if (content && content.nodeType === 1) {
        node.parentNode.insertBefore(content, node)
      } else if (content && content.nodeType == 11) {
      self.forEach(function() {
        node.parentNode.insertBefore(content, node)
      })
    }
      self[0] = self.array[0]
      return self
    }
    self.forEach(function(node) {
      return __before(node, content)
    })
    self[0] = self.array[0]
    return this
  }

  after(content) {
    if (!this.array || !this.array.length) return new Stack()
    const self = this
    const __after = (children) => {
      children.forEach(function(node) {
        self.array.forEach(function(el) {
          if (el.nextElementSibling) {
            el.parentNode.insertBefore(node, el.nextElementSibling)
          } else {
            el.parent.appendChild(node)
          }
        })
      })
    }
    if (typeof content === 'string') {
      content = $.h(content)
    }
    if (content && content.type === 'stack') {
      if (content && content.array && !content.array.length) return
      __after(content.array)
    } else if (content && (content.nodeType === 1 || content.nodeType === 3)) {
      self.forEach(function(el) {
        __after([content])
      })
    } else if (content && content.nodeType === 11) {
      const children = Array.prototype.slice.apply(content.childNodes)
      __after(children)
    }
    self[0] = this.array[0]
    return self
  }

  prepend(content) {
    if (!this.array.length) return new Stack()

    if (typeof content === 'string' || typeof content === 'number') {
      this.forEach(function(element) {
        element.insertAdjacentHTML('afterbegin', content)
      })
    } else if (content && content.type && content.type === 'Stack') {
      this.forEach(function(element) {
        content.forEach(function(node) {
          element.insertBefore(node, element.firstChild)
        })
      })
    } else if (content && content.nodeType === 1) {
      this.forEach(function(element) {
        element.insertBefore(content, element.firstChild)
      })
    } else if (content && content.nodeType == 11) {
      this.forEach(function(element) {
        element.appendChild(content)
      })
    }
    this[0] = this.array[0]
    return this
  }

  append(content) {
    if (!this.array.length) return new Stack()

    if (typeof content === 'string' || typeof content === 'number') {
      this.forEach(function(element) {
        element.insertAdjacentHTML('beforeend', content)
      })
    } else if (content && content.type && content.type === 'Stack') {
      this.forEach(function(element) {
        content.forEach(function(node) {
          element.insertBefore(node, null)
        })
      })

    } else if (content && content.nodeType === 1) {
      this.forEach(function(element) {
        element.insertBefore(content, null)
      })
    } else if (content && content.nodeType == 11) {
      this.forEach(function(element) {
        element.appendChild(content)
      })
    }
    this[0] = this.array[0]
    return this
  }

  empty() {
    if (!this.array.length) return new Stack()
    const ret = new Stack()
    this.array.forEach(function(ctx) {
      ctx.textContent = ''
      ret.push(ctx)
    })
    ret[0] = ret.array[0]
    return ret
  }

  replaceWith(content) {
    function replace(newElement, targetElement) {
      if (!newElement || !targetElement) return
      let newEl
      let targEl
      if (typeof newElement === 'string') {
        newEl = $.h(newElement)
      } else if (newElement.type && newElement.type === 'stack') {
        newEl = newElement.array[0]
      } else if (newElement.nodeType === 1 || newElement.nodeType === 11) {
        newEl = newElement
      }
      if (typeof targetElement === 'string') {
        targEl = $(targetElement).array[0]
      } else if (targetElement.type && targetElement.type === 'stack') {
        targEl = targetElement.array[0]
      } else if (targetElement.nodeType === 1) {
        targEl = targetElement
      }
      /**
       * Remove target's bound events:
       */
      $(targEl).off()
      targEl.parentNode.replaceChild(newEl, targEl)
    }
    if (content && content.nodeType && content.nodeType === 1) {
      $(content).off()
    } else if (content && content.type && content.type === 'stack') {
      content.off()
    }
    this.forEach(function(node) {
      $(node).off()
        replace(content, node)
    })
  }

  remove() {
    if (!this.array.length) return new Stack()
    this.forEach(function(node) {
      $(node).off()
      if (node.parentNode) node.parentNode.removeChild(node)
    })
  }

  text(string) {
    let ret = ''
    if (!this.array.length) return new Stack()
    if (!!string || string === 0) {
      this.forEach(function(element) {
        element.innerText = string
      })
      return this
    } else {
      this.forEach(function(element) {
        ret += element.innerText
        ret.trim()
      })
      return ret
    }
  }

  html(markup) {
    if (!this.array.length) return new Stack()
    if (markup === '') {
      this.array.forEach(node => {
        node.innerHTML = ''
      })
      return this
    } else if (markup) {
      this.array.forEach(node => {
        node.innerHTML = markup
      })
      return this
    } else if (!markup) {
      return this.array[0].innerHTML.trim()
    }
  }

  val(value) {
    if (!this.array.length) return new Stack()
    if (value || value === '') {
      this.array[0].value = value
      this[0] = this.array[0]
      return this
    } else {
      if (this.array[0] && this.array[0].value) {
        return this.array[0].value
      }
    }
  }

  hide() {
    if (this.array.length) {
      this.array[0].dataset.display = this.css('display')
      this.css('display', 'none')
    }
  }

  show() {
    if (this.array.length) {
      const display = this.array[0].dataset.display
      if (display) {
        this.css('display', display)
      } else {
        this.css('display', 'block')
      }
    }
  }
}

window.Stack = Stack
