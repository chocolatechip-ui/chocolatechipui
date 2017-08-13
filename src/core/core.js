function $(selector) {
  const readyRE = /complete|loaded|interactive/
  let temp

  const slice = function(elements) {
    temp = new Stack([].slice.apply(elements))
    temp[0] = temp.array[0]
    return temp
  }

  const getNode = function(selector) {
    if (typeof selector === 'string') {
      selector = selector.trim()
      temp = slice(document.querySelectorAll(selector))
      return temp
    }
  }

  if (selector && selector.type && selector.type === 'Stack') {
    return selector
  }

  if (selector === document) {
    return new Stack(document)
  }

  if (selector === null) {
    return new Stack()
  }

  if (typeof selector === 'function') {
    if (readyRE.test(document.readyState) && document.body) {
      selector.call(selector)
    } else {
      document.addEventListener('DOMContentLoaded', function() {
        return selector.call(selector)
      })
    }
  } else if (selector && selector.nodeType === 1) {
    temp = new Stack()
    temp[0] = selector
    temp.length = temp.array.length
    temp.push(selector)
    return temp
  } else if (typeof selector === 'string') {
    if (selector === '') return new Stack()
    try {
      return getNode(selector) ? getNode(selector) : new Stack()
    } catch (err) {
      return new Stack()
    }
  } else if (Array.isArray(selector)) {
    return new Stack(selector)
  } else if (selector === window) {
    temp = new Stack()
    temp[0] = window
    temp.length = temp.array.length
    return temp
  } else {
    return new Stack()
  }

  return new Stack()
}
window.$ = $

$.extend = function(obj, prop) {
  if (!prop) {
    prop = obj
    obj = $
  }
  Object.keys(prop).forEach(function(p) {
    if (prop.hasOwnProperty(p)) {
      Object.defineProperty(obj, p, {
        value: prop[p],
        writable: true,
        enumerable: false,
        configurable: true,
      })
    }
  })
}

$.fn = {
  extend: function(object) {
    $.extend(Stack.prototype, object)
  },
}

$.extend({
  version: 'VERSION_NUMBER',

  noop: function() {
    return
  },

  uuid: function() {
    let d = Date.now()
    d += performance.now()
    const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(
      ''
    )
    const randomLetter = charset[Math.floor(Math.random() * charset.length)]
    return (
      randomLetter +
      'xxxxxxxxxxxxxxx'.replace(/[x]/g, function(c) {
        const r = ((d + Math.random() * 16) % 16) | 0
        d = Math.floor(d / 16)
        return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16)
      })
    )
  },

  type: function(type) {
    switch (typeof type) {
      case 'boolean':
        return 'boolean'
      case 'number':
        return 'number'
      case 'string':
        return 'string'
      case 'function':
        return 'function'
      case 'object':
        if (Array.isArray(type)) {
          return 'array'
        } else if (Object.prototype.toString.call(type) === '[object Date]') {
          return 'date'
        } else if (Object.prototype.toString.call(type) === '[object Error]') {
          return 'error'
        } else if (Object.prototype.toString.call(type) === '[object RegExp]') {
          return 'regexp'
        } else if (Object.prototype.toString.call(type) === '[object Object]') {
          if (type.objectType && type.objectType === 'domstack') {
            return 'domstack'
            /* If Promise polyfill, then should support `then`. */
          } else if (type.then) {
            return 'promise'
            /* Otherwise we got a normal object here. */
          } else {
            return 'object'
          }
        } else if (Object.prototype.toString.call(type) === '[object Number]') {
          return 'number'
        } else if (Object.prototype.toString.call(type) === '[object String]') {
          return 'string'
        } else if (
          Object.prototype.toString.call(type) === '[object Promise]'
        ) {
          return 'promise'
        } else if (
          Object.prototype.toString.call(type) === '[object Boolean]'
        ) {
          return 'boolean'
        }
    }
  },

  escapeHTML: function(data) {
    const tagsToReplace = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '(': '%28',
      ')': '%29',
    }

    let str = JSON.stringify(data)

    const replaceTag = function(tag) {
      return tagsToReplace[tag] || tag
    }

    const safe_tags_replace = function(str) {
      return str.replace(/[&<>\(\)]/g, replaceTag)
    }

    str = safe_tags_replace(str)
    return JSON.parse(str)
  },

  camelize: function(string) {
    if (typeof string !== 'string') return
    return string.replace(/\-(.)/g, function(match, letter) {
      return letter.toUpperCase()
    })
  },

  hyphenate: function(string) {
    if (typeof string !== 'string') return
    return string.replace(/([A-Z])/g, '-$1').toLowerCase()
  },

  subscriptions: {},

  publish: function(subscription, payload) {
    const hasProp = $.subscriptions.hasOwnProperty
    if (!hasProp.call($.subscriptions, subscription)) return

    $.subscriptions[subscription].forEach(function(item) {
      item(payload != undefined ? payload : {})
    })
  },

  subscribe: function(subscription, handler) {
    if (!$.subscriptions.hasOwnProperty.call($.subscriptions, subscription))
      $.subscriptions[subscription] = []
    const index = $.subscriptions[subscription].push(handler) - 1
    return {
      off: function() {
        delete $.subscriptions[subscription][index]
      },

      run: function(data) {
        if ($.subscriptions[subscription]) {
          try {
            $.subscriptions[subscription][index](data)
          } catch (err) {}
        }
      },
    }
  },

  unsubscribe: function(subscription) {
    delete $.subscriptions[subscription]
  },

  delay: function(milliseconds) {
    return new Promise(function(resolve) {
      setTimeout(resolve, milliseconds)
    })
  },

  h: function(template) {
    const temp = document.createElement('div')
    temp.innerHTML = template
    const frag = document.createDocumentFragment()
    // Use childNodes to allow creating element nodes or text nodes:
    const children = Array.prototype.slice.apply(temp.childNodes)
    children.map(function(el) {
      frag.appendChild(el)
    })
    return frag
  }
})

function html(literals) {
  const raw = literals.raw
  let result = ''
  let i
  let len
  let sub
  let lit
  let safe

  /**
   * Function that normalizes interpolation substitions.
   * It flattens arrays while ignoring falsey values.
   * All other values are converted to strings.
   */
  function normalize(value, safe) {
    return value == null
      ? ''
      : value === false
        ? ''
        : Array.isArray(value)
          ? value.map(normalize).join('')
          : safe === false ? $.escapeHTML(value) : String(value)
  }

  for (i = 1, len = arguments.length; i < len; i++) {
    lit = raw[i - 1]
    /**
     * Allow safe html by prefixing interpolation with an exclamation mark.
     */
    safe = lit[lit.length - 1] === '!'
    sub = normalize(arguments[i], safe)
    if (safe) lit = lit.slice(0, -1)

    result += lit + sub
  }

  // Take care of last literal section.
  result += raw[raw.length - 1]

  return result
}
window.html = html

function app(callback) {
  $(function() {
    callback()
  })
}
window.app = app

$(function() {
  if (!/(mobile)|(ios)|(android)/gim.test(navigator.userAgent)) {
    document.body.classList.add('isDesktop')
  }
  if ($('link[href*=ios]')[0]) {
    document.body.classList.add('themeIsiOS')
    $.theme = 'ios'
  } else if ($('link[href*=android]')[0]) {
    document.body.classList.add('themeIsAndroid')
    $.theme = 'android'
  }
  $.dir = 'ltr'
  if (document.dir === 'rtl') {
    $.dir = 'rtl'
  }

  if (!Array.prototype.unique) {
    $.extend(Array.prototype, {
      unique: function() {
        const len = this.length
        const obj = {}
        const ret = []
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
      },
    })
  }
})
