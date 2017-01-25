
  /**
   * ChocolateChip-UI DOM methods.
   */
  $.fn.extend({

    find(selector, context) {
      let ret = new DOMStack();
      if (!this.array.length)
        return ret;
      if (context) {
        $(context).forEach(() => {
          Array.prototype.slice.apply(context.querySelectorAll(selector)).forEach(node=> {
            return ret.push(node);
          });
        });
      } else {
        this.forEach(ctx => {
          if (ctx && ctx.children && ctx.children.length) {
            Array.prototype.slice.apply(ctx.querySelectorAll(selector)).forEach(node => {
              return ret.push(node);
            });
          }
        });
      }
      return ret;
    },

    is(arg) {
      let ret = false;
      if (!this.array.length || !arg) return;
      if (!this.array.length) return;
      const that = this;
      const __is = (node, arg) => {
        if (typeof arg === 'string') {
          let nodes;
          if (node.parentNode) nodes = node.parentNode.querySelectorAll(arg);
          let elements;
          if (nodes && nodes.length) {
            elements = Array.prototype.slice.apply(node.parentNode.querySelectorAll(arg));
          }
          if (elements && elements.length) {
            if (elements.indexOf(node) >= 0) {
              ret = true;
            }
          }
        } else if (typeof arg === 'function') {
          if (arg.call(that)) {
            ret = true;
          }
        } else if (arg && arg.objectType && arg.objectType === 'domstack') {
          if (node === arg[0]) {
            ret = true;
          }
        } else if (arg && arg.length) {
          if (this.slice.apply(arg).indexOf(node) !== -1) {
            ret = true;
          }
        } else if (arg.nodeType === 1) {
          if (node === arg) {
            ret = true;
          }
        } else {
          return;
        }
        return ret;
      };
      this.forEach(item => {
        if (__is(item, arg)) {
          ret = true;
        }
      });
      return ret;
    },

    not(arg) {
      let ret = new DOMStack();
      if (!this.array.length || !arg) return new DOMStack();
      if (!this.array.length) return new DOMStack();
      const that = this
      const __nots = (node, arg) => {
        let result = [];
        if (typeof arg === 'string') {
          let nodes;
          if (node.parentNode) nodes = node.parentNode.querySelectorAll(arg);
          let elements;
          if (nodes && nodes.length) {
            elements = Array.prototype.slice.apply(node.parentNode.querySelectorAll(arg));
          }
          if (elements && elements.length) {
            if (elements.indexOf(node) == -1) {
              result.push(node);
            }
          } else {
            result.push(node);
          }
        } else if (arg.nodeType === 1) {
          if (node === arg) {
            result.push(node);
          }
        } else if (Array.isArray(arg) && arg.length) {
          if (Array.prototype.slice.apply(arg).indexOf(node) !== -1) {
            result.push(node);
          }
        } else if (arg.objectType && arg.objectType === 'domstack') {
          if (node === arg[0]) {
            result.push(node);
          }
        } else if (typeof arg === 'function') {
          if (arg.call(that)) {
            result.push(node);
          }
        } else {
          return new DOMStack();
        }
        return result;
      };
      var temp = [];
      this.forEach(item => {
        temp.push(__nots(item, arg));
      });

      temp = $.flatten(temp);
      ret.concat(temp)
      return ret;
    },

    has(arg) {
      if (!this.array.length) return new DOMStack();
      let ret = new DOMStack();
      const self = this;

      const __has = (node, arg) => {
        if (typeof arg === 'string') {
          if (node.querySelector(arg)) {
            return true;
          }
        } else if (arg && arg.nodeType === 1) {
          if (Array.prototype.slice.apply(self.children).indexOf(arg)) {
            return true;
          } 
        } else if (arg && arg.objectType === 'domstack') {
          const children = this.children()
          if (children.array.indexOf(arg[0]) != -1) {
            return true;
          }
        }
        return false;
      };

      this.forEach(element => {
        if (__has(element, arg)) {
          ret.push(element);
        }
      });
      return ret;
    },

    prev(selector) {    
      if (!this.array.length) return new DOMStack();
      let ret = new DOMStack();
      let children;
      let previousElement = this[0].previousElementSibling;
      if (selector && typeof selector === 'string') {
        children = this.siblings(selector);
        var selectorCheck = this.parent().children(selector);
        selectorCheck.forEach(function(element) {
          if (element === previousElement) {
            ret.push(element);
          }
        })
      } else {
        ret.push(this[0].previousElementSibling);
      }
      return ret;
    },

    prevAll(selector) {
      if (!this.array.length) return new DOMStack();
      let ret = new DOMStack();
      let __siblings;
      let __parent;
      const __self = this[0];
      let __sibs = Array.prototype.slice.apply(this[0].parentNode.children);
      let pos = __sibs.indexOf(__self);
      if (selector && typeof selector === 'string') {
        __parent = this.array[0].parentNode;
        __siblings = $(__parent).find(selector);
        __siblings.forEach(function(el) {
          if(__sibs.indexOf(el) < pos) {
            ret.push(el)
          }
        })
      } else {
        __sibs.splice(pos);
        ret.concat(__sibs);
      }
      return ret;
    },

    next(selector) {
      if (!this.array.length) return new DOMStack();
      let ret = new DOMStack();
      let children;
      let nextElement = this[0].nextElementSibling;
      if (selector && typeof selector === 'string') {
        children = this.siblings(selector);
        children.forEach(element => {
          if (nextElement === element) {
            ret.push(element);
          }
        });
      } else {
        ret.push(this[0].nextElementSibling);
      }
      return ret;
    },

    nextAll(selector) {
      if (!this.array.length) return new DOMStack();
      let ret = new DOMStack();
      let __siblings;
      let __parent;
      const __self = this[0];
      let __sibs = Array.prototype.slice.apply(this[0].parentNode.children);
      let pos = __sibs.indexOf(__self);
      __sibs.splice(0, pos + 1);
      if (selector && typeof selector === 'string') {
        __parent = this.array[0].parentNode;
        __siblings = $(__parent).find(selector);
        __sibs.splice(0, __sibs.indexOf(this.array[0]));
        __sibs.forEach(element => {
          if (__siblings.array.indexOf(element) > -1) {
            ret.push(element);
          }
        });
      } else {
        __siblings = Array.prototype.slice.apply(this[0].parentNode.children);
        pos = __siblings.indexOf(__self);
        __siblings.splice(0, pos + 1);
        ret.concat(__siblings);
      }
      return ret;
    },

    first() {
      if (!this.array.length) return new DOMStack();
      return this.eq(0);

    },

    last() {
      if (!this.array.length) return new DOMStack();
      return this.eq(-1);
    },

    index(selector) {
      let self = this.array;
      /**
       * No element, so no index:
       */
      if (!this.length) return -1;
      
      const getIndex = element => self.findIndex(el => $(el).is(selector));

      if (selector && typeof selector === 'string') {
        return getIndex(selector);

      } else if (selector && selector.objectType && selector.objectType === 'domstack') {
        return getIndex(selector[0]);

      } else if (selector && selector.nodeType && selector.nodeType === 1) {
        return getIndex(selector);

      } else {
        if (self.length > 1) return 0;
        const siblings = this.parent().children().array;
        return siblings.findIndex(el =>  el === self[0]);
      }
    },

    children(selector) {
      if (!this.array.length) return new DOMStack();
      let ret = new DOMStack();
      if (!selector) {
        this.forEach(node => {
          Array.prototype.slice.apply(node.children).forEach(ctx => ret.push(ctx));
        });
        ret[0] = ret.array[0];
      } else {
        this.forEach(node => {
          Array.prototype.slice.apply(node.children).forEach(ctx => {
            if ($(ctx).is(selector)) {
              ret.push(ctx);
            }
          });
        });
        ret[0] = ret.array[0];
      }
      return ret;
    },

    siblings(selector) {
      if (!this.array.length)
        return new DOMStack();
      let __siblings;
      let ret = new DOMStack();
      const $this = this;
      let parent;
      let children = Array.prototype.slice.apply($this[0].parentNode.children);

      /**
       * Remove this from siblings:
       */
      if (selector && typeof selector === 'string') {
        parent = this.array[0].parentNode;
        __siblings = $(parent).find(selector);
        const newPos = __siblings.array.indexOf($this[0]);
        __siblings.array.splice(newPos, 1);
        ret.concat(__siblings);
      } else {
        const pos = children.indexOf($this[0]);
        children.splice(pos, 1);
        ret.concat(children);
      }
      return ret;
    },

    parent(selector) {
      if (!this.array.length) return new DOMStack();
      let ret = new DOMStack();
      var parents;
      var self = this[0];
      var result = [];
      if (selector) {
        parents = Array.prototype.slice.apply(self.parentNode.parentNode.querySelectorAll(selector));
        parents.forEach(function(el) {
          if (el === self.parentNode) {
            result.push(el);
          }
        })
        result.unique();
        ret.concat(result);
      } else {
        this.forEach(ctx => {
          return ret.push(ctx.parentNode);
        });
      }
      ret.unique();
      if (ret == undefined) {
        return new DOMStack();
      } else {
        return ret;
      }
    },

    closest(selector) {
      if (!this.array.length)
        return new DOMStack();
      let ret = new DOMStack();
      if (typeof selector === 'undefined') {
        return new DOMStack();
      }
      let p;
      if (this[0]) {
        p = this[0].parentNode;
      }
      if (!p) {
        return new DOMStack();
      }
      if (typeof selector === 'string') {
        selector.trim();
        if (p && $(p).is(selector)) {
          ret.push(p);
        } else {
          ret.push($(p).closest(selector).array[0]);
        }
      }
      if (ret[0] === undefined) {
        ret.splice(0);
      }
      return ret;
    },

    css(property, value) {
      if (!this.array.length) return new DOMStack();
      const pixelRE = /top|bottom|left|right|margin|padding/img;
      let postFix = '';
      let ret = new DOMStack();
      const testForPixelSupport = (value, property) => {
        if ($.type(value) === 'number' && property.match(pixelRE)) {
          postFix = 'px';
        }
      };
      if (!property) return new DOMStack();
      if (!value && $.type(property) === 'object') {
        this.forEach(node => {
          for (let key in property) {
            if (property.hasOwnProperty(key)) {
              testForPixelSupport(property[key], key);
              node.style[$.camelize(key)] = property[key] + postFix;
            }
          }
          ret.push(node);
        });
      } else if (!value && typeof property === 'string') {
        if (!this.array.length)
          return;
        return document.defaultView.getComputedStyle(this.eq(0).array[0], null).getPropertyValue(property.toLowerCase());
      } else if (!!value) {
        this.forEach(node => {
          testForPixelSupport(value, property);
          node.style[$.camelize(property)] = value + postFix;
          ret.push(node);
        });
      }
      return ret;
    },

    width(amount) {
      if (!this.array.length) return;
      if (amount) {
        if(/px]+|[pt]+|[em]+|[en]+|[%]+|[ex]+|[in]+|[cm]+|[mm]+|[ch]+|[in]+|[rem]+|[vw]+|[vh]+$/.test(amount)) {
          this.forEach(function(element) {
            element.style.width = amount;
          });
        } else {
          this.forEach(function(element) {
            element.style.width = amount + 'px';
          });
        }
      } else {
        const styles = window.getComputedStyle(this[0]);
        return parseInt(styles.width, 10);
      }
    },

    height(amount) {
      if (!this.array.length) return;
      if (amount) {
        if(/px]+|[pt]+|[em]+|[en]+|[%]+|[ex]+|[in]+|[cm]+|[mm]+|[ch]+|[in]+|[rem]+|[vw]+|[vh]+$/.test(amount)) {
          this.forEach(function(element) {
            element.style.height = amount;
          });
        } else {
          this.forEach(function(element) {
            element.style.height = amount + 'px';
          });
        }
      } else {
        const styles = window.getComputedStyle(this[0]);
        return parseInt(styles.height, 10);
      }
    },

    before(content) {
      if (!this.array.length) {
        return new DOMStack();
      }
      const __before = (node, content) => {
        if (typeof content === 'string' || typeof content === 'number') {
          content = $.html(content);
        }
        if (content && content.objectType && content.objectType === 'domstack') {
          const len = content.size();
          let i = 0;
          while (i < len) {
            node.parentNode.insertBefore(content.array[i], node);
            i++;
          }
        } else if (content && content.nodeType === 1) {
          node.parentNode.insertBefore(content, node);
        }
        return this;
      };
      this.forEach(node => {
        return __before(node, content);
      });
      return this;
    },

    after(content) {
      if (!this.array.length) return new DOMStack();
      const __after = (node, content) => {
        let parent = node.parentNode;
        if (typeof content === 'string' || typeof content === 'number') {
          content = $.html(content);
        }
        if (content && content.objectType && content.objectType === 'domstack') {
          let i = 0,
            len = content.size();
          while (i < len) {
            if (node === parent.lastChild) {
              parent.appendChild(content.array[i]);
            } else {
              parent.insertBefore(content.array[i], node.nextSibling);
            }
            i++;
          }
        } else if (content && content.nodeType === 1) {
          parent.appendChild(content);
        }
        return this;
      };
      this.forEach(node => {
        return __after(node, content);
      });
      return this;
    },

    prepend(content) {
      if (!this.array.length) return new DOMStack();

      if (typeof content === 'string' || typeof content === 'number') {
        this.forEach(element => {
          element.insertAdjacentHTML('afterbegin', content);
        });
      } else if (content && content.objectType && content.objectType === 'domstack') {
        this.forEach(element => {
          content.forEach(node => {
            element.insertBefore(node, element.firstChild);
          });
        });
      } else if (content && content.nodeType === 1) {
        this.forEach(element => {
          element.insertBefore(content, element.firstChild);
        });
      }
      return this;
    },

    append(content) {
      if (!this.array.length) return new DOMStack();

      if (typeof content === 'string' || typeof content === 'number') {
        this.forEach(element => {
          element.insertAdjacentHTML('beforeend', content);
        });
      } else if (content && content.objectType && content.objectType === 'domstack') {
        this.forEach(element => {
          content.forEach(node => {
            element.insertBefore(node, null);
          });
        });

      } else if (content && content.nodeType === 1) {
        this.forEach(element => {
          element.insertBefore(content, null);
        });
      }
      return this;
    },

    prependTo(selector) {
      if (!this.array.length) return new DOMStack();
      this.reverse();
      this.forEach(item => {
        return $(selector).prepend(item);
      });
      return this;
    },

    appendTo(selector) {
      if (!this.array.length) return new DOMStack();
      this.forEach(item => {
        return $(selector).append(item);
      });
      return this;
    },

    clone(value) {
      if (!this.array.length) return new DOMStack();
      let ret = new DOMStack();
      this.forEach(ctx => {
        if (value === true || !value) {
          ret.push(ctx.cloneNode(true));
        } else {
          ret.push(ctx.cloneNode(false));
        }
      });
      return ret;
    },

    wrap(string) {
      if (!this.array.length || !string) return new DOMStack();
      let tempNode;
      let whichClone;
      this.forEach(ctx => {
        tempNode = $.html(string);
        whichClone = $(ctx).clone(true);
        tempNode.append(whichClone);
        $(ctx).before(tempNode);
        $(ctx).remove();
      });
    },

    unwrap() {
      if (!this.array.length) return new DOMStack();
      let parentNode = null;
      this.forEach(node => {
        if (node.parentNode === parentNode) {
          return;
        }
        parentNode = node.parentNode;
        if (node.parentNode.nodeName === 'BODY') {
          return false;
        }
        $.replace(node, node.parentNode);
      });
    },

    offset() {
      if (!this.array.length)
        return;
      const offset = this[0].getBoundingClientRect();
      return {
        top: Math.round(offset.top),
        left: Math.round(offset.left),
        bottom: Math.round(offset.bottom),
        right: Math.round(offset.right)
      };
    },

    position() {
      const parent = this[0].parentNode;
      const pos = this[0].getBoundingClientRect();
      const parentPos = parent.getBoundingClientRect();
      let obj = {
        top: pos.top - parentPos.top,
        left: pos.left - parentPos.left
      };
      return obj;
    },

    empty() {
      if (!this.array.length) return new DOMStack();
      let ret = new DOMStack();
      this.forEach(ctx => {
        $(ctx).children().off();
        ctx.textContent = '';
        ret.push(ctx);
      });
      return ret;
    },

    html(content) {
      if (!this.array.length) return new DOMStack();
      if (content === '') {
        this.forEach(node => {
          node.innerHTML = '';
        });
        return this;
      } else if (content) {
        this.forEach(node => {
          node.innerHTML = content;
        });
        return this;
      } else if (!content) {
        return this.array[0].innerHTML.trim();
      }
    },

    text(string) {
      let ret = '';
      if (!this.array.length) return new DOMStack();
      if (!!string || string === 0) {
        this.forEach(element => {
          element.innerText = string;
        });
        return this;
      } else {
        this.forEach(element => {
          ret += element.innerText;
          ret.trim();
        });
        return ret;
      }
    },

    replaceWith(content) {
      if (content && content.nodeType && content.nodeType === 1) {
        $(content).off();
      } else if (content && content.objectType && content.objectType === 'domstack') {
        content.off();
      }
      this.forEach(node => {
        $(node).off();
        if (typeof content === 'string') {
          $.replace($(content), node);
        } else {
          $.replace($(content), node);
        }
      });
    },

    remove() {
      if (!this.array.length) return new DOMStack();
      this.forEach(node => {
        $(node).off();
        if (node.parentNode) node.parentNode.removeChild(node);
      });
    },

    addClass(className) {
      if (!this.array.length) return new DOMStack();
      if (typeof className !== "string")
        return;
      let ret = new DOMStack();
      let classes;
      this.forEach(node => {
        if (/\s/.test(className)) {
          classes = className.split(' ');
          classes.forEach(name => {
            node.classList.add(name);
          });
        } else {
          node.classList.add(className);
        }
        ret.push(node);
      });
      return ret;
    },

    hasClass(className) {
      if (!this.array.length) return new DOMStack();
      let temp = false;
      this.forEach(element => {
        if (element.classList.contains(className)) {
          temp = true;
        }
      });
      return temp;
    },

    removeClass(className) {
      if (!this.array.length) return new DOMStack();
      let ret = new DOMStack();
      let classes;
      this.forEach(node => {
        if (!node)
          return;
        if (/\s/.test(className)) {
          classes = className.split(' ');
          classes.forEach(name => {
            node.classList.remove(name);
          });
        } else {
          node.classList.remove(className);
        }
        if (node.getAttribute('class') === '') {
          node.removeAttribute('class');
        }
        ret.push(node);
      });
      return ret;
    },

    toggleClass(className) {
      if (!this.array.length) return new DOMStack();
      let ret = new DOMStack();
      this.forEach(node => {
        node.classList.toggle(className);
        ret.push(node);
      });
      return ret;
    },

    attr(attribute, value) {
      if (!this.array.length) return new DOMStack();
      let ret = new DOMStack();
      const __attr = (node, attribute, value) => {
        if (value === undefined) {
          return node.getAttribute(attribute);
        } else {
          return node.setAttribute(attribute, value);
        }
      };
      if (value === undefined) {
        if (this[0].hasAttribute(attribute)) {
          return this[0].getAttribute(attribute);
        } else {
          return '';
        }
      } else {
        this.forEach(node => {
          __attr(node, attribute, value);
          ret.push(node);
        });
      }
      if (ret.length) {
        return ret;
      }
    },

    removeAttr(attribute) {
      if (!this.array.length) return new DOMStack();
      let ret = new DOMStack();
      this.forEach(node => {
        if (!!node.hasAttribute(attribute)) {
          node.removeAttribute(attribute);
          ret.push(node);
        }
      });
      return ret;
    },

    prop(property, value) {
      if (!this.array.length) return new DOMStack();
      if (value === false || !!value) {
        this.forEach(element => {
          element[property] = value;
        });
        return this;
      } else if (this.array[0] && this.array[0][property]) {
        return this.array[0][property];
      }
    },

    removeProp(property) {
      if (!this.array.length) return new DOMStack();
      this[0][property] = false;
      return [this[0]];
    },

    disable() {
      if (!this.array.length) return new DOMStack();
      this.forEach(node => {
        node.classList.add('disabled');
        node.disabled = true;
        node.style.cursor = 'default';
      });
      return this;
    },

    enable() {
      if (!this.array.length) return new DOMStack();
      this.forEach(node => {
        node.classList.remove('disabled');
        node.removeAttribute('disabled');
        node.style.cursor = 'auto';
      });
      return this;
    },

    val(value) {
      if (!this.array.length) return new DOMStack();
      if (value) {
        this.array[0].value = value;
        return this;
      } else {
        if (this.array[0] && this.array[0].value) {
          return this.array[0].value;
        }
      }
    },

    hide() {
      let display = this.css('display');
      this.data('display_attr', display);
      this.css('display', 'none');
    },

    show() {
      let display = this.data('display_attr');
      if (!display) return this;
      if (display === 'none') {
        display = 'block';
      }
      this.css('display', display);
    },

    unique() {
      var ret = [];
      var sort = this.array.sort();
      sort.forEach(function(ctx, idx) {
        if (ret.indexOf(ctx) === -1) {
          ret.push(ctx);
        }
      });
      ret.sort(function(a, b) {
        return a - b;
      });
      this.array.splice(0);
      var self = this.array;
      ret.forEach(function(node) {
        self.push(node)
      });
      this.length = this.array.length;
    }
  });