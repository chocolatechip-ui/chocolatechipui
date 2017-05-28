
const dataStore = {
  id: new Date()
}
class State {
  constructor(data) {
    let d
    if ($.type(data) === 'array') {
      d = data.slice()
    } else if ($.type(data) === 'object') {
      d = Object.create(data)
    } else {
      d = data
    }

    this[dataStore] = d
    this.id = (((1+Math.random())*0x10000)|0).toString(16).substring(1) + (((1+Math.random())*0x10000)|0).toString(16).substring(1)
    this[dataStore] = d
    this.events = {}
    this.paused = false
    this.boundComponents = []
  }

  renderComponents() {
    if (!this.boundComponents || !this.boundComponents.length || this.paused) {
      return
    }
    this.boundComponents.forEach(function(component) {
      component.render()
    })
  }

  get(property) {
    if (property && $.type(this[dataStore]) === 'object') {
      return this[dataStore][property]
    } else {
      return this[dataStore]
    }
  }

  set(property, data) {
    if (property === '' || property === false) {
      this[dataStore][property] = property
      console.log('Setting property to:')
      console.log(property)
      this.renderComponents()
    } else if (!property) {
      return
    } else if (data && $.type(this[dataStore]) === 'object') {
      this[dataStore][property] = data
      this.renderComponents()
    } else if (!data && ($.type(this[dataStore]) !== 'object' || $.type(this[dataStore]) !== 'array')) {
      this[dataStore] = property
      this.renderComponents()
    }
  }

  purge() {
    if ($.type(this[dataStore]) === 'object') {
      this[dataStore] = {}
    } else if ($.type(this[dataStore]) === 'array') {
      this[dataStore] = []
    } else {
      this[dataStore]
    }
  }

  merge(obj) {
    if (!obj || typeof obj !== 'object') {
      return
    } else if (typeof this[dataStore] === 'object') {
      for (let key in obj) {
        this[dataStore][key] = obj[key]
      }
      this.renderComponents()
    }
  }

  mixin(data) {
    if (!data) {
      return
    }
    if ($.type(this[dataStore]) === 'object') {
      for (let key in data) {

        if (!(key in this[dataStore])) {
          this[dataStore][key] = data[key]
          this.renderComponents()
        }
      }
    } else if ($.type(this[dataStore]) === 'array') {
      this[dataStore] = this[dataStore].concat(data).unique()
      this.renderComponents()
    }
  }

  replace(data) {
    if (data) {
    let d
    if ($.type(data) === 'array') {
      d = data.slice()
    } else if ($.type(data) === 'object') {
      d = Object.create(data)
    } else {
      d = data
    }
      this[dataStore] = d
      this.renderComponents(this)
    }
  }

  remove(prop) {
    if (!prop) {
      return
    }
    if ($.type(this[dataStore]) !== 'object') return
    delete this[dataStore][prop]
    this.renderComponents()
  }

  getPropAt(property, position) {
    if (!property || position === undefined) {
      return
    }
    if ($.type(this[dataStore]) === 'array') {
      if (position < 0) {
        const pos = this[dataStore].length + position
        return this[dataStore][pos][property]
      } else if (position > this[dataStore].length) {
        return
      } else {
        return this[dataStore][position][property]
      }
    }
  }

  setPropAt(property, value, position) {
    if (!property || value === undefined || position=== undefined) {
      return
    }
    if ($.type(this[dataStore]) === 'array') {
      if (position < 0) {
        const pos = this[dataStore].length + position
        this[dataStore][pos][property] = value
        this.renderComponents()
      } else {
        this[dataStore][position][property] = value
        this.renderComponents()
      }
    }
  }

  push(data) {
    if (!data) {
      return
    }
    if ($.type(this[dataStore]) === 'array') {
      this[dataStore].push(data)
      this.renderComponents()
    }
  }

  pop() {
    if ($.type(this[dataStore]) === 'array') {
      this[dataStore].pop()
      this.renderComponents()
    }
  }

  unshift(data) {
    if (!data) {
      return
    } else if ($.type(this[dataStore]) === 'array') {
      this[dataStore].unshift(data)
      this.renderComponents()
    }
  }

  shift() {
    if ($.type(this[dataStore]) === 'array') {
      this[dataStore].shift()
      this.renderComponents()
    }
  }


  slice(start, end) {
    if (end === undefined || start === undefined) {
      return
    }
    if ($.type(this[dataStore]) === 'array') {
      return this[dataStore].slice(start, end)
    }
  }

  splice(start, end, data) {
    if (end === undefined || start === undefined) {
      return
    }
    if ($.type(this[dataStore]) === 'array' && data) {
      this[dataStore].splice(start, end, data)
      this.renderComponents()
    } else if ($.type(this[dataStore]) === 'array') {
      if(start == null || !end) return
      this[dataStore].splice(start, end)
      this.renderComponents()
    }
  }

  insert(position, data) {
    if (data === undefined || position === undefined || typeof position !== 'number') {
      return
    }
    if (typeof this[dataStore] === 'array') {
      if ($.type(position) !== 'number') return
      this[dataStore].splice(position, 0, data)
      this.renderComponents()
    }
  }

  pluck(property) {
    if (!property) {
      return
    } else {
      const ret = []
      if (this[dataStore] && this[dataStore].length) {
        const len = this[dataStore].length
        for (let i = 0; i < len; i++) {
          ret.push(this[dataStore][i][property])
        }
        return ret
      }
    }
  }

  indexOf(element, startFrom) {
    if (!element) {
      return
    } else if ($.type(this[dataStore]) === 'array') {
      return this[dataStore].indexOf(element, startFrom)
    }
  }

  find(callback) {
    if (!callback) {
      return
    } else if ($.type(this[dataStore]) === 'array') {
      return this[dataStore].find(callback)
    }
  }

  findIndex(callback) {
    if (!callback) {
      return
    } else if ($.type(this[dataStore]) === 'array') {
      return this[dataStore].findIndex(callback)
    }
  }

  forEach(callback) {
    if (!callback) {
      return
    }
    if (this[dataStore] && this[dataStore].length) {
      let value
      let i = -1
      const len = this[dataStore].length
      while (++i < len) {
        value = callback.call(this[dataStore][i], this[dataStore][i], i)
        if (value === false) {
          break
        }
      }
    }
  }

  filter(...args) {
    for (let _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key]
    }
    if (this[dataStore] && this[dataStore].length) {
      return this[dataStore].filter.apply(this[dataStore], args)
    }
  }

  map(...args) {
    for (let _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key]
    }
    if (this[dataStore] && this[dataStore].length) {
      return this[dataStore].map.apply(this[dataStore], args)
    }
  }

  reverse() {
    if (this[dataStore] && this[dataStore].length) {
      this[dataStore].reverse()
      this.renderComponents()
    }
  }

  sort(compareFunction) {
    if (this[dataStore] && this[dataStore].length) {
      if (compareFunction) {
        this[dataStore].sort(compareFunction)
        this.renderComponents()
      } else {
        this[dataStore].sort()
        this.renderComponents()
      }
    }
  }

  orderBy(...props) {
    for (let _len = arguments.length, _key = 0; _key < _len; _key++) {
      props[_key] = arguments[_key]
    }
    if (!props) return

    const orderBy = function() {
      return function(a, b) {
        const sortByProperty = function(property) {
          let sortOrder = 1
          if (property[0] === "-") {
            sortOrder = -1
            property = property.substr(1)
          }
          return function(a, b) {
            const result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0
            return result * sortOrder
          }
        }

        let i = 0
        let result = 0
        const numberOfProperties = props.length
        while (result === 0 && i < numberOfProperties) {
          result = sortByProperty(props[i])(a, b)
          i++
        }
        return result
      }
    }
    if (this[dataStore] && this[dataStore].length) {
      this[dataStore].sort(orderBy.apply(null, props))
      this.renderComponents()
    }
  }

  concat(data) {
    if (!data) {
      return
    }
    if ($.type(this[dataStore]) === 'array') {
      const temp = this[dataStore].concat(data)
      this[dataStore] = temp
      this.renderComponents()
    }
  }

  unique() {
    if ($.type(this[dataStore]) === 'array') {
      this[dataStore].unique()
      this.renderComponents()
    }
  }

  eq(position) {
    if ($.type(this[dataStore]) === 'array') {
      return this[dataStore][position]
    }
  }

  size() {
    if ($.type(this[dataStore]) === 'array') {
      return this[dataStore].length
    } else {
      return
    }
  }
}
