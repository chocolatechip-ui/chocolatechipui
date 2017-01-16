
/**
  * DOMStack, an abstraction of the native NodeList, allowing manipulation of DOM elements without having to extend native elements.
  * @param {Element[] | Document | Element } args An array of elements, the document, or a node.
  * @return {DOMStack} DOMStack
  */
class DOMStack {
  constructor (args) {
    this.array = [];
    this.length = 0;
    this.objectType = 'domstack';
    if (Array.isArray(args)) {
      let i = -1;
      const len = args.length;
      while (++i < len) {
        this.array[i] = args[i];
      }
    } else if (args) {
      if (args === document) {
        this.array[0] = document;
        this[0] = document;
        this.length = 1;
      } else {
        const array = Array.prototype.slice.apply(arguments);
        array.forEach(function(ctx, idx) {
          this.array[idx] = ctx;
        });
      }
    }
  }

  eq(index) {
    let ret = new DOMStack();
    if (!this.array.length) return ret;
    let temp = undefined;
    if (index < 0) {
      temp = this.array[this.array.length + index];
      ret.push(temp);
    } else {
      if (index >= this.array.length) return new DOMStack();
      temp = this.array[index];
      ret.push(temp);
    }
    ret[0] = ret.array[0];
    ret.length = ret.array.length;
    return ret;
  }

  push(data) {
    if (data && data.objectType === 'domstack') {
      this.array = this.array.concat(data.array)
    } else {
      this.array.push(data);
    }
    this.length = this.array.length;
    this[0] = this.array[0];
  }

  pop() {
    this.length = this.array.length - 1;
    let ret = this.array.pop();
    return $(ret);
  }

  unshift(data) {
    if (data && data.objectType === 'domstack') {
      this.array.unshift(data.array[0]);
    } else {
      this.array.unshift(data);
    }
    this[0] = this.array[0];
    this.length = this.array.length;
  }

  shift() {
    this.length = this.array.length - 1;
    let ret = this.array.shift();
    return $(ret);
  }

  size() {
    return this.array.length;
  }

  forEach(callback) {
    let value = undefined;
    let i = 0;
    const len = this.array.length;
    for (; i < len; i++) {
      value = callback.call(this.array[i], this.array[i], i);
      if (value === false) {
        break;
      }
    }
  }

  each(callback) {
    let value = undefined;
    let i = 0;
    const len = this.array.length;
    for (; i < len; i++) {
      value = callback.call(this.array[i], i, this.array[i]);
      if (value === false) {
        break;
      }
    }
  }

  slice(...args) {
    let ret = new DOMStack();
    ret.concat(this.array.slice.apply(this.array, args));
    return $(ret);
  }

  splice(...args) {
    var ret = new DOMStack();
    ret.concat(this.array.splice.apply(this.array, args));
    this[0] = this.array[0];
    this.length = this.array.length;
    return $(ret);
  }

  filter(...args) {
    let ret = new DOMStack();

    ret.concat(this.array.filter.apply(this.array, args));
    ret[0] = ret.array[0];
    return ret;
  }

  map(...args) {
    let ret = new DOMStack();
    ret.concat(this.array.map.apply(this.array, args));
    ret[0] = ret.array[0];
    return ret;
  }

  indexOf(node) {
    // return this.array.indexOf.apply(this.array, args);
    if (!node) return -1;
    if (node.nodeType && node.nodeType === 1) {
      return this.array.indexOf(node);
    } else if (node && node.objectType === 'domstack') {
      return this.array.indexOf(node[0]);
    } else if (node && Array.isArray(node)) {
      return this.array.indexOf(node[0]);
    } else if (node && $.type(node) === 'string') {
      const el = this[0].parentNode.querySelector(node);
      return this.array.indexOf(el);
    }
  }

  concat(collection) {
    let temp = undefined;
    if (Array.isArray(collection)) {
      temp = collection;
    } else if (collection && collection.objectType && collection.objectType === 'domstack') {
      temp = collection.getData();
    } else if (collection.constructor.toString().match(/HTMLBodyElementConstructor/)) {
      temp = [collection];
    }
    this.array.push.apply(this.array, temp);
    this[0] = this.array[0];
    this.length = this.array.length;
  }

  reverse(...args) {
    this.array.reverse.apply(this.array, args);
    this[0] = this.array[0];
  }

  every(...args) {
    return this.array.every.apply(this.array, args);
  }

  some(...args) {
    return this.array.some.apply(this.array, args);
  }

  unique() {
    const len = this.array.length;
    let ret = [];
    let obj = {};
    for (let i = 0; i < len; i++) {
      const arrayItem = JSON.stringify(this.array[i]);
      const arrayItemValue = this.array[i];
      if (obj[arrayItem] === undefined) {
        ret.push(arrayItemValue);
        obj[arrayItem] = 1;
      } else {
        obj[arrayItem]++;
      }
    }
    this.array = ret;
    this[0] = this.array[0];
    this.length = this.array.length;
  }

  get() {
    return this.array;
  }
  /**
   * Deprecated. Use `get()`.
   */
  getData() {
    return this.array;
  }

  purge() {
    this.array.length = 0;
    this.length = 0;
  }
}