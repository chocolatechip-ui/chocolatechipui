
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
      temp = this.array[index];
      ret.push(temp);
    }
    ret[0] = ret.array[0];
    ret.length = ret.array.length;
    return ret;
  }

  push(data) {
    this.array.push(data);
    this.length = this.array.length;
    this[0] = this.array[0];
  }

  pop() {
    this.length = this.array.length - 1;
    return this.array.pop();
  }

  unshift(data) {
    this.array.unshift(data);
    this[0] = this.array[0];
    this.length = this.array.length;
  }

  shift() {
    this.length = this.array.length - 1;
    return this.array.shift();
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
    ret.length = ret.array.length;
    return ret;
  }

  splice(...args) {
    this.array.splice.apply(this.array, args);
    this[0] = this.array[0];
    return this;
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

  concat(collection) {
    let i = -1;
    let len = undefined;
    let temp = undefined;
    if (Array.isArray(collection)) {
      temp = collection;
      len = temp.length;
    } else if (collection && collection.objectType && collection.objectType === 'domstack') {
      temp = collection.getData();
      len = temp.length;
    } else if (collection.constructor.toString().match(/HTMLBodyElementConstructor/)) {
      temp = [collection];
      len = 1;
    }
    this.array.push.apply(this.array, temp);
    this[0] = this.array[0];
    this.length = this.array.length;
  }

  reverse(...args) {
    this.array.reverse.apply(this.array, args);
    this[0] = this.array[0];
  }

  indexOf(...args) {
    return this.array.indexOf.apply(this.array, args);
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