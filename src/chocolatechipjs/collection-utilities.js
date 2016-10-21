
/**
 * ChocolateChip-UI collection utilities.
 */
$.fn.extend({
  forEach(callback) {
    this.each((idx, ctx) => {
      callback.call(ctx, ctx, idx);
    });
  },

  disable() {
    if (!this.size()) return $();
    this.forEach(node => {
      node.classList.add('disabled');
      node.disabled = true;
      node.style.cursor = 'default';
    });
    return this;
  },

  enable() {
    if (!this.size()) return $();
    this.forEach(node => {
      node.classList.remove('disabled');
      node.removeAttribute('disabled');
      node.style.cursor = 'auto';
    });
    return this;
  },

  iz(selector) {
    const ret = $();
    this.forEach(ctx => {
      if ($(ctx).is(selector)) {
        ret.push(ctx);
      }
    });
    return ret;
  },

  iznt(selector) {
    const ret = $();
    this.each((_, ctx) => {
      if (!$(ctx).is(selector)) {
        ret.push(ctx);
      }
    });
    return ret;
  },

  haz(selector) {
    let ret = new DOMStack();
    this.forEach(element => {
      if ($(element).has(selector)[0]) {
        ret.push(element);
      }
    });
    return ret;
  },

  haznt(selector) {
    let ret = new DOMStack();
    this.forEach(element => {
      if (!$(element).has(selector)[0]) {
        ret.push(element);
      }
    });
    return ret;
  },

  hazClass(className) {
    if (className) {
      return this.iz('.' + className);
    } else {
      return new DOMStack();
    }
  },

  hazntClass(className) {
    if (className) {
      return this.iznt('.' + className);
    } else {
      return new DOMStack();
    }
  },

  hazAttr(attribute) {
    if (attribute) {
      return this.iz('[' + attribute + ']');
    } else {
      return new DOMStack();
    }
  },

  hazntAttr(attribute) {
    if (attribute) {
      return this.iznt('[' + attribute + ']');
    } else {
      return new DOMStack();
    }
  }
});