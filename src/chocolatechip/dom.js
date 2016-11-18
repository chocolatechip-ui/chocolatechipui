
  /**
   * ChocolateChip-UI DOM methods.
   */
  $.fn.extend({
    find(selector, context) {
      let ret = new DOMStack();
      if (!this.size())
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
      if (!this.size() || !arg) return;
      if (!this.size()) return;
      const that = this;
      const __is = (node, arg) => {
        if (typeof arg === 'string') {
          let nodes = undefined;
          if (node.parentNode) nodes = node.parentNode.querySelectorAll(arg);
          let elements = undefined;
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
        } else if (arg.objectType && arg.objectType === 'domstack') {
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

    not(selector) {
      if (!this.size() || !selector) return new DOMStack();
      let ret = new DOMStack();
      let temp = [];
      let elems = undefined;
      if (typeof selector === 'string') {
        elems = Array.prototype.slice.apply(this.array[0].parentNode.querySelectorAll(selector));
        this.forEach(element => {
          if (!elems[0]) {
            ret.push(element);
          } else {
            elems.forEach(item => {
              if (element !== item) {
                ret.push(element);
              }
            });
          }
        });
        return ret;
      } else if (selector && selector.objectType && selector.objectType === 'domstack') {
        this.forEach(element => {
          selector.forEach(node => {
            if (node !== element) {
              temp.push(element);
            }
          });
        });
        if (temp.length) {
          ret.concat(temp);
        }
        return ret;
      } else if (selector && selector.nodeType === 1) {
        this.forEach(element => {
          if (element !== selector) {
            temp.push(element);
          }
        });
        if (temp.length) {
          ret.concat(temp);
        }
        return ret;
      }
    },

    has(arg) {
      if (!this.size()) return new DOMStack();
      let items = new DOMStack();

      const __has = (node, arg) => {
        if (typeof arg === 'string') {
          if (node.querySelector(arg)) {
            return true;
          }
        } else if (arg.nodeType === 1) {
          if (Array.prototype.slice(this.children).data.indexOf(arg)) {
            return true;
          }
        } else {
          return false;
        }
      };

      this.forEach(element => {
        if (__has(element, arg)) {
          items.push(element);
        }
      });
      return items;
    },

    prev(selector) {
      if (!this.size()) return new DOMStack();
      let ret = new DOMStack();
      let children = undefined;
      const prevElement = this[0].previousElementSibling;
      if (selector && typeof selector === 'string') {
        children = this.siblings(selector);
        children.forEach(element => {
          if (prevElement === element) ret.push(element);
        });
      } else {
        ret.push(this[0].previousElementSibling);
      }
      return ret;
    },

    prevAll(selector) {
      if (!this.size()) return new DOMStack();
      let ret = new DOMStack();
      let __siblings = undefined;
      const __self = this[0];
      let __sibs = Array.prototype.slice.apply(this[0].parentNode.children);
      let pos = __sibs.indexOf(__self);
      __sibs.splice(pos, __sibs.length - 1);
      if (selector && typeof selector === 'string') {
        __siblings = this.siblings(selector).array;
        __sibs.forEach(element => {
          if (__siblings.indexOf(element) > -1) {
            ret.push(element);
          }
        });
      } else {
        __siblings = Array.prototype.slice.apply(this[0].parentNode.children);
        pos = __siblings.indexOf(__self);
        __siblings.splice(pos, __siblings.length - 1);
        ret.concat(__siblings);
      }
      return ret;
    },

    next(selector) {
      if (!this.size()) return new DOMStack();
      let ret = new DOMStack();
      let children = undefined;
      let nextElement = this[0].nextElementSibling;
      if (selector && typeof selector === 'string') {
        children = this.siblings(selector);
        children.forEach(element => {
          if (nextElement === element) ret.push(element);
        });
      } else {
        ret.push(this[0].nextElementSibling);
      }
      return ret;
    },

    nextAll(selector) {
      if (!this.size()) return new DOMStack();
      let ret = new DOMStack();
      let __siblings = undefined;
      let __parent = undefined;
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
      if (!this.size()) return new DOMStack();
      return this.eq(0);

    },

    last() {
      if (!this.size()) return new DOMStack();
      return this.eq(-1);
    },

    index(element) {
      if (!this.size()) return undefined;
      if (!element) {
        return Array.prototype.slice.apply(this[0].parentNode.children).indexOf(this[0]);
      } else {
        if (element && element.objectType && element.objectType === 'domstack') {
          return this.indexOf(element.getData()[0]);
        } else if (element.nodeType === 1) {
          return this.indexOf(element);
        } else {
          return this.indexOf(element);
        }
      }
    },

    children(selector) {
      if (!this.size()) return new DOMStack();
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
      if (!this.size())
        return new DOMStack();
      let __siblings = undefined;
      let ret = new DOMStack();
      const $this = this;
      let parent = undefined;
      let children = Array.prototype.slice.apply(this.array[0].parentNode.children);

      /**
       * Remove this from siblings:
       */
      const pos = children.indexOf($this[0]);
      children.splice(pos, 1);

      children.splice(children.indexOf(this.array[0]), 0);
      if (selector && typeof selector === 'string') {
        parent = this.array[0].parentNode;
        __siblings = $(parent).find(selector);
        __siblings.array.splice(__siblings.array.indexOf(this.array[0]), 0);
        ret.concat(__siblings.array);
      } else {
        ret.concat(children);
      }
      return ret;
    },

    parent() {
      if (!this.size()) return new DOMStack();
      let ret = new DOMStack();
      this.forEach(ctx => {
        return ret.push(ctx.parentNode);
      });
      ret.unique();
      return ret;
    },

    closest(selector) {
      if (!this.size())
        return new DOMStack();
      let ret = new DOMStack();
      if (typeof selector === 'undefined') {
        return new DOMStack();
      }
      let position = null;
      let p = undefined;
      if (this[0]) {
        p = this[0].parentNode;
      }
      if (!p) {
        return new DOMStack();
      }
      if (typeof selector === 'string') {
        selector.trim();
      }
      if (typeof selector === 'number') {
        position = selector || 1;
        for (let i = 1; i < position; i++) {
          if (p && p.nodeName === 'HTML') {
            return p;
          } else {
            if (p !== null) {
              p = p.parentNode;
            }
          }
        }
        ret.push(p);
      } else if (typeof selector === 'string') {
        if (p && $(p).is(selector)) {
          ret.push(p);
        } else {
          ret.push($(p).closest(selector).array[0]);
        }
      }
      return ret;
    },

    css(property, value) {
      if (!this.size()) return new DOMStack();
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
        if (!this.size())
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
      if (!this.size()) return;
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
        return this.eq(0).array[0].clientWidth;
      }
    },

    height(amount) {
      if (!this.size()) return;
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
        return this.eq(0).array[0].clientHeight;
      }
    },

    before(content) {
      if (!this.size()) {
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

    after(args) {
      if (!this.size()) return new DOMStack();
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
        return __after(node, args);
      });
      return this;
    },

    prepend(content) {
      if (!this.size()) return new DOMStack();

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
          element.insertBefore(node, element.firstChild);
        });
      }
      return this;
    },

    append(content) {
      if (!this.size()) return new DOMStack();

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
          element.insertBefore(node, null);
        });
      }
      return this;
    },

    prependTo(selector) {
      if (!this.size()) return new DOMStack();
      this.reverse();
      this.forEach(item => {
        return $(selector).prepend(item);
      });
      return this;
    },

    appendTo(selector) {
      if (!this.size()) return new DOMStack();
      this.forEach(item => {
        return $(selector).append(item);
      });
      return this;
    },

    clone(value) {
      if (!this.size()) return new DOMStack();
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
      if (!this.size() || !string) return new DOMStack();
      let tempNode = undefined;
      let empNode = undefined;
      let whichClone = undefined;
      this.forEach(ctx => {
        tempNode = $.html(string);
        empNode = tempNode.array[0];
        whichClone = $(ctx).clone(true);
        tempNode.append(whichClone);
        $(ctx).before(tempNode);
        $(ctx).remove();
      });
    },

    unwrap() {
      if (!this.size()) return new DOMStack();
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
      if (!this.size())
        return;
      const offset = this.eq(0).array[0].getBoundingClientRect();
      return {
        top: Math.round(offset.top),
        left: Math.round(offset.left),
        bottom: Math.round(offset.bottom),
        right: Math.round(offset.right)
      };
    },

    position() {
      let obj = {
        top: 0,
        left: 0
      };
      const pos = this.array[0].getBoundingClientRect();
      const borderTop = parseInt(this.parent().css('border-top-width'), 10) || 0;
      const borderLeft = parseInt(this.parent().css('border-left-width'), 10) || 0;
      const parentPos = this.array[0].parentNode.getBoundingClientRect();
      const compareOffsets1 = function(val1, val2) {
        return Math.round(val1 - val2);
      };
      obj.top = compareOffsets1(pos.top, (parentPos.top + borderTop));
      obj.left = compareOffsets1(pos.left, (parentPos.left + borderLeft));
      return obj;
    },

    empty() {
      if (!this.size()) return new DOMStack();
      let ret = new DOMStack();
      this.forEach(ctx => {
        $(ctx).children().off();
        ctx.textContent = '';
        ret.push(ctx);
      });
      return ret;
    },

    html(content) {
      if (!this.size()) return new DOMStack();
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
      if (!this.size()) return new DOMStack();
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
      if (!this.size()) return new DOMStack();
      this.forEach(node => {
        $(node).off();
        if (node.parentNode) node.parentNode.removeChild(node);
      });
    },

    addClass(className) {
      if (!this.size()) return new DOMStack();
      if (typeof className !== "string")
        return;
      let ret = new DOMStack();
      let classes = undefined;
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
      if (!this.size()) return new DOMStack();
      let temp = false;
      this.forEach(element => {
        if (element.classList.contains(className)) {
          temp = true;
        }
      });
      return temp;
    },

    removeClass(className) {
      if (!this.size()) return new DOMStack();
      let ret = new DOMStack();
      let classes = undefined;
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
      if (!this.size()) return new DOMStack();
      let ret = new DOMStack();
      this.forEach(node => {
        node.classList.toggle(className);
        ret.push(node);
      });
      return ret;
    },

    attr(property, value) {
      if (!this.size()) return new DOMStack();
      let ret = new DOMStack();
      const __attr = (node, property, value) => {
        if (value === undefined) {
          return node.getAttribute(property);
        } else {
          return node.setAttribute(property, value);
        }
      };
      if (value === undefined) {
        if (this[0].hasAttribute(property)) {
          return this[0].getAttribute(property);
        }
      } else {
        this.forEach(node => {
          __attr(node, property, value);
          ret.push(node);
        });
      }
      if (ret.length) {
        return ret;
      }
    },

    removeAttr(attribute) {
      if (!this.size()) return new DOMStack();
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
      if (!this.size()) return new DOMStack();
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
      if (!this.size()) return new DOMStack();
      this[0][property] = false;
      return [this[0]];
    },

    disable() {
      if (!this.size()) return new DOMStack();
      this.forEach(node => {
        node.classList.add('disabled');
        node.disabled = true;
        node.style.cursor = 'default';
      });
      return this;
    },

    enable() {
      if (!this.size()) return new DOMStack();
      this.forEach(node => {
        node.classList.remove('disabled');
        node.removeAttribute('disabled');
        node.style.cursor = 'auto';
      });
      return this;
    },

    val(value) {
      if (!this.size()) return new DOMStack();
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
      if (display === 'none' || !display) {
        display = 'block';
      }
      this.css('display', display);
    }
  });