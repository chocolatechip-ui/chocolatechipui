'use strict';
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function(obj) {
  return typeof obj;
} : function(obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj;
};
var _createClass = function() {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  return function(Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
/**
 * DOMStack, an abstraction of the native NodeList, allowing manipulation of DOM elements without having to extend native elements.
 * @param {Element[] | Document | Element } args An array of elements, the document, or a node.
 * @return {DOMStack} DOMStack
 */
var DOMStack = function() {
  function DOMStack(args) {
    _classCallCheck(this, DOMStack);
    this.array = [];
    this.length = 0;
    this.objectType = 'domstack';
    if (Array.isArray(args)) {
      var i = -1;
      var len = args.length;
      while (++i < len) {
        this.array[i] = args[i];
      }
    } else if (args) {
      if (args === document) {
        this.array[0] = document;
      } else {
        var array = Array.prototype.slice.apply(arguments);
        array.forEach(function(ctx, idx) {
          this.array[idx] = ctx;
        });
      }
    }
  }
  _createClass(DOMStack, [{
    key: 'eq',
    value: function eq(index) {
      var ret = new DOMStack();
      if (!this.array.length) return ret;
      var temp = undefined;
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
  }, {
    key: 'push',
    value: function push(data) {
      this.array.push(data);
      this.length = this.array.length;
      this[0] = this.array[0];
    }
  }, {
    key: 'pop',
    value: function pop() {
      this.length = this.array.length - 1;
      return this.array.pop();
    }
  }, {
    key: 'unshift',
    value: function unshift(data) {
      this.array.unshift(data);
      this[0] = this.array[0];
      this.length = this.array.length;
    }
  }, {
    key: 'shift',
    value: function shift() {
      this.length = this.array.length - 1;
      return this.array.shift();
    }
  }, {
    key: 'size',
    value: function size() {
      return this.array.length;
    }
  }, {
    key: 'forEach',
    value: function forEach(callback) {
      var value = undefined;
      var i = 0;
      var len = this.array.length;
      for (; i < len; i++) {
        value = callback.call(this.array[i], this.array[i], i);
        if (value === false) {
          break;
        }
      }
    }
  }, {
    key: 'each',
    value: function each(callback) {
      var value = undefined;
      var i = 0;
      var len = this.array.length;
      for (; i < len; i++) {
        value = callback.call(this.array[i], i, this.array[i]);
        if (value === false) {
          break;
        }
      }
    }
  }, {
    key: 'slice',
    value: function slice() {
      var ret = new DOMStack();
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      ret.concat(this.array.slice.apply(this.array, args));
      ret.length = ret.array.length;
      return ret;
    }
  }, {
    key: 'splice',
    value: function splice() {
      for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }
      this.array.splice.apply(this.array, args);
      this[0] = this.array[0];
      return this;
    }
  }, {
    key: 'filter',
    value: function filter() {
      var ret = new DOMStack();
      for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        args[_key3] = arguments[_key3];
      }
      ret.concat(this.array.filter.apply(this.array, args));
      ret[0] = ret.array[0];
      return ret;
    }
  }, {
    key: 'map',
    value: function map() {
      var ret = new DOMStack();
      for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        args[_key4] = arguments[_key4];
      }
      ret.concat(this.array.map.apply(this.array, args));
      ret[0] = ret.array[0];
      return ret;
    }
  }, {
    key: 'concat',
    value: function concat(collection) {
      var i = -1;
      var len = undefined;
      var temp = undefined;
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
  }, {
    key: 'reverse',
    value: function reverse() {
      for (var _len5 = arguments.length, args = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
        args[_key5] = arguments[_key5];
      }
      this.array.reverse.apply(this.array, args);
      this[0] = this.array[0];
    }
  }, {
    key: 'indexOf',
    value: function indexOf() {
      for (var _len6 = arguments.length, args = Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
        args[_key6] = arguments[_key6];
      }
      return this.array.indexOf.apply(this.array, args);
    }
  }, {
    key: 'every',
    value: function every() {
      for (var _len7 = arguments.length, args = Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
        args[_key7] = arguments[_key7];
      }
      return this.array.every.apply(this.array, args);
    }
  }, {
    key: 'some',
    value: function some() {
      for (var _len8 = arguments.length, args = Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
        args[_key8] = arguments[_key8];
      }
      return this.array.some.apply(this.array, args);
    }
  }, {
    key: 'unique',
    value: function unique() {
      var len = this.array.length;
      var ret = [];
      var obj = {};
      for (var i = 0; i < len; i++) {
        var arrayItem = JSON.stringify(this.array[i]);
        var arrayItemValue = this.array[i];
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
  }, {
    key: 'getData',
    value: function getData() {
      return this.array;
    }
  }, {
    key: 'purge',
    value: function purge() {
      this.array.length = 0;
      this.length = 0;
    }
  }]);
  return DOMStack;
}();
/**
 * ChocolateChipJS Core. This function exports the ChocolateChipJS singleton.
 */
(function() {
  var _arguments = arguments;
  /**
   * ChocolateChipJS singleton. This function can query the DOM with the provided parameters, or execute a callback when the DOM is ready. This is also the base for ChocolateChipJS methods for DOM manipulation.
   */
  function chocolatechipjs(selector, context) {
    var self = this;
    var idRE = /^#([\w-]*)$/;
    var classRE = /^\.([\w-])$/;
    var tagRE = /^[\w-]+$/;
    var readyRE = /complete|loaded|interactive/;
    var temp = undefined;
    var slice = function slice(elements) {
      temp = new DOMStack([].slice.apply(elements));
      temp[0] = temp.array[0];
      return temp;
    };
    var getId = function getId(selector) {
      var el = document.getElementById(selector.split('#')[1]);
      if (el) {
        temp = new DOMStack([el]);
        temp[0] = new DOMStack([el]).array[0];
        temp.length = 1;
        return temp;
      } else {
        return new DOMStack();
      }
    };
    var getTag = function getTag(selector, context) {
      if (context) {
        temp = slice(context.getElementsByTagName(selector));
        temp[0] = temp.array[0];
        temp.length = temp.length;
        return temp;
      } else {
        temp = slice(document.getElementsByTagName(selector));
        temp[0] = temp.array[0];
        temp.length = temp.array.length;
        return temp;
      }
    };
    var getClass = function getClass(selector, context) {
      if (context) {
        temp = slice(context.getElementsByClassName(selector.split('.')[1]));
        temp[0] = temp.array[0];
        temp.length = temp.length;
        return temp;
      } else {
        temp = slice(document.getElementsByClassName(selector.split('.')[1]));
        temp[0] = temp.array[0];
        temp.length = temp.array.length;
        return temp;
      }
    };
    var getNode = function getNode(selector, context) {
      if (typeof selector === 'string') selector = selector.trim();
      if (typeof selector === 'string' && idRE.test(selector)) {
        return getId(selector);
      }
      if (selector && selector instanceof Array && selector.length) return selector;
      if (!context && typeof selector === 'string') {
        if (/<\/?[^>]+>/.test(selector)) {
          return self.html(selector);
        }
        if (tagRE.test(selector)) {
          return getTag(selector);
        } else if (classRE.test(selector)) {
          return getClass(selector);
        } else {
          temp = slice(document.querySelectorAll(selector));
          temp[0] = temp.array[0];
          temp.length = temp.array.length;
          return temp;
        }
      } else {
        if (context) {
          temp = slice($(context).find(selector));
          temp[0] = temp.array[0];
          temp.length = temp.array / length;
          return temp;
        } else {
          temp = slice(document.querySelectorAll(selector));
          temp[0] = temp.array[0];
          temp.length = temp.array.length;
          return temp;
        }
      }
    };
    if (selector && selector.objectType && selector.objectType === 'domstack') {
      return selector;
    }
    if (selector === document) {
      return new DOMStack(document);
    }
    if (selector === null) {
      return new DOMStack();
    }
    if (!!context) {
      if (typeof context === 'string') {
        temp = slice(document.querySelectorAll(context + ' ' + selector));
        temp[0] = temp.array[0];
        temp.length = temp.array.length;
        return temp;
      } else if (context.nodeType === 1) {
        return getNode(selector, context);
      }
    } else if (typeof selector === 'function') {
      if (readyRE.test(document.readyState) && document.body) {
        selector.call(selector);
      } else {
        document.addEventListener("DOMContentLoaded", function() {
          return selector.call(selector);
        });
      }
    } else if (selector && selector.nodeType === 1) {
      temp = new DOMStack();
      temp[0] = selector;
      temp.length = temp.array.length;
      temp.push(selector);
      return temp;
    } else if (typeof selector === 'string') {
      if (selector === '') return new DOMStack();
      if (/<\/?[^>]+>/.test(selector)) {
        return chocolatechipjs.html(selector);
      } else {
        try {
          return getNode(selector) ? getNode(selector) : new DOMStack();
        } catch (err) {
          return new DOMStack();
        }
      }
    } else if (Array.isArray(selector)) {
      return new DOMStack(selector);
    } else if (selector === window) {
      temp = new DOMStack();
      temp[0] = window;
      temp.length = temp.array.length;
      return temp;
    } else {
      return new DOMStack();
    }
    return new DOMStack();
  }
  if (window.DefaultLanguageForErrors) {
    chocolatechipjs.languageForErrors = window.DefaultLanguageForErrors;
  } else {
    chocolatechipjs.languageForErrors = 'en';
  }
  var $ = chocolatechipjs;
  /**
   * ChocolateChip-UI extend method.
   */
  /**
   * Polyfill for Object.keys.
   * Needed for Android older than 4.4.
   */
  if (!Object.keys) {
    Object.keys = function() {
      'use strict';
      var hasOwnProperty = Object.prototype.hasOwnProperty,
        hasDontEnumBug = !{
          toString: null
        }.propertyIsEnumerable('toString'),
        dontEnums = ['toString', 'toLocaleString', 'valueOf', 'hasOwnProperty', 'isPrototypeOf', 'propertyIsEnumerable', 'constructor'],
        dontEnumsLength = dontEnums.length;
      return function(obj) {
        if ((typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) !== 'object' && (typeof obj !== 'function' || obj === null)) {
          throw new TypeError('Object.keys called on non-object');
        }
        var result = [];
        var prop = undefined;
        var i = undefined;
        for (prop in obj) {
          if (hasOwnProperty.call(obj, prop)) {
            result.push(prop);
          }
        }
        if (hasDontEnumBug) {
          for (i = 0; i < dontEnumsLength; i++) {
            if (hasOwnProperty.call(obj, dontEnums[i])) {
              result.push(dontEnums[i]);
            }
          }
        }
        return result;
      };
    }();
  }
  $.extend = function(obj, prop) {
    if (!prop) {
      prop = obj;
      obj = chocolatechipjs;
    }
    Object.keys(prop).forEach(function(p) {
      if (prop.hasOwnProperty(p)) {
        Object.defineProperty(obj, p, {
          value: prop[p],
          writable: true,
          enumerable: false,
          configurable: true
        });
      }
    });
  };
  /**
   * ChocolateChip-UI collection extend method.
   */
  $.fn = {
    extend: function extend(object) {
      return $.extend(DOMStack.prototype, object);
    }
  };
  /**
   * ChocolateChip-UI utility methods.
   */
  $.extend({
    lib: "ChocolateChipJS",
    version: '4.0.0',
    noop: function noop() {},
    uuid: function uuid() {
      var d = Date.now();
      d += performance.now();
      var charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".split('');
      var randomLetter = charset[Math.floor(Math.random() * charset.length)];
      return randomLetter + 'xxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c === 'x' ? r : r & 0x3 | 0x8).toString(16);
      });
    },
    html: function html(HTMLString) {
      var ret = new DOMStack();
      var temp = undefined;
      var wrapperMap = {
        option: [1, "<select multiple='multiple'>", "</select>"],
        legend: [1, "<fieldset>", "</fieldset>"],
        area: [1, "<map>", "</map>"],
        param: [1, "<object>", "</object>"],
        thead: [1, "<table>", "</table>"],
        tr: [2, "<table><tbody>", "</tbody></table>"],
        col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
        td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
        __default: [1, "<div>", "</div>"]
      };
      wrapperMap.optgroup = wrapperMap.option;
      wrapperMap.tbody = wrapperMap.tfoot = wrapperMap.colgroup = wrapperMap.caption = wrapperMap.thead;
      wrapperMap.th = wrapperMap.td;
      var element = document.createElement('div');
      var match = /<\s*\w.*?>/g.exec(HTMLString);
      if (match !== null) {
        var tag = match[0].replace(/</g, '').replace(/>/g, '');
        var map = wrapperMap[tag] || wrapperMap.__default;
        HTMLString = map[1] + HTMLString + map[2];
        element.innerHTML = HTMLString;
        element = element.lastChild;
        temp = Array.prototype.slice.apply(element.childNodes);
        temp.forEach(function(ctx) {
          if (ctx.nodeType === 1) {
            ret.push(ctx);
          } else if (ctx.nodeType === 3 && ctx.nodeValue.trim().length !== 0) {
            ret.push(ctx);
          }
        });
      } else {
        element.innerHTML = HTMLString;
        element = element.lastChild;
        ret.push(element);
      }
      return ret;
    },
    /**
     * Insert a script tag into the document and
     * fire a callback when it is loaded: 
     */
    require: function require(src, callback, ctx) {
      var onerror = "onerror";
      var insertScript = function insertScript(script) {
        var firstScript = document.getElementsByTagName("script")[0];
        firstScript.parentNode.insertBefore(script, firstScript);
      };
      var script = document.createElement("script");
      var done = false;
      var err = undefined;
      var loadScript = undefined;
      var handleError = function handleError() {
        err = new Error(src || "EMPTY");
        loadScript();
      };
      var setupLoad = function setupLoad(fn) {
        return function() {
          /**
           * Only call once. 
           */
          if (done) {
            return;
          }
          done = true;
          fn();
          if (callback) {
            callback.call(ctx, err);
          }
        };
      };
      loadScript = setupLoad(function() {
        script.onload = script[onerror] = null;
      });
      script[onerror] = handleError;
      script.onload = loadScript;
      script.async = true;
      script.charset = "utf-8";
      script.src = src;
      insertScript(script);
    },
    delay: function delay(milliseconds) {
      return new Promise(function(resolve, reject) {
        setTimeout(resolve, milliseconds);
      });
    },
    each: function each(obj, callback) {
      var value = undefined;
      var key = undefined;
      var i = 0;
      var length = undefined;
      if (Array.isArray(obj)) {
        length = obj.length;
        for (; i < length; i++) {
          value = callback.call(obj[i], i, obj[i]);
          if (value === false) {
            break;
          }
        }
        return obj;
      } else if (obj.objectType && obj.objectType === 'domstack') {
        obj.forEach(function(item, idx) {
          return callback.call(item, idx, item);
        });
        return obj;
      } else if ($.type(obj) === 'object' && Object.keys(obj).length) {
        for (key in obj) {
          if (callback.call(obj[key], key, obj[key]) === false) return obj;
        }
      }
    },
    /**
     * Eliminate duplicates from array: 
     */
    unique: function unique(array) {
      if (!array || !Array.isArray(array)) return;
      var len = array.length;
      var obj = {};
      var ret = [];
      for (var i = 0; i < len; i++) {
        var arrayItem = JSON.stringify(array[i]);
        var arrayItemValue = array[i];
        if (obj[arrayItem] === undefined) {
          ret.push(arrayItemValue);
          obj[arrayItem] = 1;
        } else {
          obj[arrayItem]++;
        }
      }
      return ret;
    },
    /** 
     * Replace target element with new element:
     */
    replace: function replace(newElement, targetElement) {
      if (!newElement || !targetElement) return;
      var newEl = undefined;
      var targEl = undefined;
      if (typeof newElement === 'string') {
        newEl = $(newElement)[0];
      } else if (newElement.objectType && newElement.objectType === 'domstack') {
        newEl = newElement[0];
      } else if (newElement.nodeType === 1) {
        newEl = newElement;
      }
      if (typeof targetElement === 'string') {
        targEl = $(targetElement)[0];
      } else if (targetElement.objectType && targetElement.objectType === 'domstack') {
        targEl = targetElement[0];
      } else if (targetElement.nodeType === 1) {
        targEl = targetElement;
      }
      /**
       * Remove target's bound events:
       */
      $(targEl).off();
      targEl.parentNode.replaceChild(newEl, targEl);
    },
    /**
     * Extra boolean types:
     */
    isEmptyObject: function isEmptyObject(obj) {
      return Object.keys(obj).length === 0;
    },
    isInteger: function isInteger(number) {
      return typeof number === 'number' && number % 1 === 0;
    },
    isFloat: function isFloat(number) {
      return typeof number === 'number' && number % 1 !== 0;
    },
    encode: function encode(value) {
      return encodeURIComponent(value);
    },
    /**
     * Escape HTML for view templates:
     */
    escapeHTML: function escapeHTML(data) {
      var tagsToReplace = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '(': '%28',
        ')': '%29'
      };
      var str = JSON.stringify(data);
      var replaceTag = function replaceTag(tag) {
        return tagsToReplace[tag] || tag;
      };
      var safe_tags_replace = function safe_tags_replace(str) {
        return str.replace(/[&<>]/g, replaceTag);
      };
      str = safe_tags_replace(str);
      return JSON.parse(str);
    },
    /** 
     * Concat arrays:
     */
    concat: function concat(args) {
      return args instanceof Array ? args.join('') : [].slice.apply(_arguments).join('');
    },
    /**
     * Mixin one object into another:
     */
    mixin: function mixin(sourceObj, targetObj) {
      for (var key in sourceObj) { /* Do not replace property if it exists: */
        if (!(key in targetObj)) {
          targetObj[key] = sourceObj[key];
        }
      }
      return targetObj;
    },
    compare: function compare(value1, value2) {
      function compareNativeSubtypes(value1, value2) {
        /**
         * e.g. Function, RegExp, Date 
         */
        return value1.toString() === value2.toString();
      }

      function compareArrays(value1, value2) {
        var len = value1.length;
        if (len != value2.length) {
          return false;
        }
        var alike = true;
        for (var i = 0; i < len; i++) {
          if (!$.compare(value1[i], value2[i])) {
            alike = false;
            break;
          }
        }
        return alike;
      }

      function compareObjects(value1, value2) {
        var keys1 = Object.keys(value1).sort();
        var keys2 = Object.keys(value2).sort();
        var len = keys1.length;
        if (len != keys2.length) {
          return false;
        }
        for (var i = 0; i < len; i++) {
          var key1 = keys1[i];
          var key2 = keys2[i];
          if (!(key1 == key2 && $.compare(value1[key1], value2[key2]))) {
            return false;
          }
        }
        return true;
      }
      if (value1 === value2) {
        return true;
      }
      if ((typeof value1 === 'undefined' ? 'undefined' : _typeof(value1)) != (typeof value2 === 'undefined' ? 'undefined' : _typeof(value2))) {
        return false;
      }
      if (value1 !== Object(value1)) {
        /**
         * Non equal primitives, so stop:
         */
        return false;
      }
      if (!value1) {
        return false;
      }
      if (Array.isArray(value1)) {
        return compareArrays(value1, value2);
      }
      if ({}.toString.call(value1) == '[object Object]') {
        return compareObjects(value1, value2);
      } else {
        return compareNativeSubtypes(value1, value2);
      }
    },
    /** 
     * Chunk an array into pieces based on itemsPerPage.
     * You can use this to paginate an array of data.
     */
    paginate: function paginate(data, itemsPerPage) {
      var ret = [];
      var pages = Math.floor(data.length / itemsPerPage);
      if (data.length % pages) pages++;
      var temp = 0;
      for (var i = 0; i < pages; i++) {
        if (temp === data.length) break;
        var thing = data.slice(temp, itemsPerPage + temp);
        ret.push(thing);
        temp += itemsPerPage;
      }
      return ret;
    }
  });
  /** 
   * Pubsub methods:
   */
  var topics = {};
  var hasProp = topics.hasOwnProperty;
  $.extend({
    /**
     * Set up subscriber: 
     */
    on: function on(topic, handler) {
      /**
       * Create the topic's object: 
       */
      if (!hasProp.call(topics, topic)) topics[topic] = [];
      /**
       * Add subscriber: 
       */
      var index = topics[topic].push(handler) - 1;
      /**
       * Return method to delete subscriber: 
       */
      return {
        off: function off() {
          return delete topics[topic][index];
        },
        /**
         * Return method to run this subscriber - `mySubscriber.run('foo', myDataHere)` 
         */
        run: function run(data) {
          if (topics[topic]) topics[topic][index](data);
        },
        getTopic: function getTopic() {
          return topic;
        }
      };
    },
    /**
     * Send event and data to subscribers: 
     */
    send: function send(topic, payload) {
      if (!hasProp.call(topics, topic)) return;
      /**
       * Loop through topics and execute: 
       */
      topics[topic].forEach(function(item) {
        item(payload != undefined ? payload : {});
      });
    },
    /**
     * Get all subscribed topics: 
     */
    getTopics: function getTopics() {
      return topics;
    },
    /**
     * Remove a topic and any registered subscribers: 
     */
    removeTopic: function removeTopic(topic) {
      return delete topics[topic];
    },
    production: false,
    /**
     * Suppress ChocolateChip-UI's error messages:
     */
    supressErrorMessages: false
  });
  /**
   * ChocolateChip-UI DOM methods.
   */
  $.fn.extend({
    find: function find(selector, context) {
      var ret = new DOMStack();
      if (!this.size()) return ret;
      if (context) {
        $(context).forEach(function() {
          Array.prototype.slice.apply(context.querySelectorAll(selector)).forEach(function(node) {
            return ret.push(node);
          });
        });
      } else {
        this.forEach(function(ctx) {
          if (ctx && ctx.children && ctx.children.length) {
            Array.prototype.slice.apply(ctx.querySelectorAll(selector)).forEach(function(node) {
              return ret.push(node);
            });
          }
        });
      }
      return ret;
    },
    is: function is(arg) {
      var _this2 = this;
      var ret = false;
      if (!this.size() || !arg) return;
      if (!this.size()) return;
      var that = this;
      var __is = function __is(node, arg) {
        if (typeof arg === 'string') {
          var nodes = undefined;
          if (node.parentNode) nodes = node.parentNode.querySelectorAll(arg);
          var elements = undefined;
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
          if (_this2.slice.apply(arg).indexOf(node) !== -1) {
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
      this.forEach(function(item) {
        if (__is(item, arg)) {
          ret = true;
        }
      });
      return ret;
    },
    not: function not(selector) {
      if (!this.size() || !selector) return new DOMStack();
      var ret = new DOMStack();
      var temp = [];
      var elems = undefined;
      if (typeof selector === 'string') {
        elems = Array.prototype.slice.apply(this.array[0].parentNode.querySelectorAll(selector));
        this.forEach(function(element) {
          if (!elems[0]) {
            ret.push(element);
          } else {
            elems.forEach(function(item) {
              if (element !== item) {
                ret.push(element);
              }
            });
          }
        });
        return ret;
      } else if (selector && selector.objectType && selector.objectType === 'domstack') {
        this.forEach(function(element) {
          selector.forEach(function(node) {
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
        this.forEach(function(element) {
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
    has: function has(arg) {
      var _this3 = this;
      if (!this.size()) return new DOMStack();
      var items = new DOMStack();
      var __has = function __has(node, arg) {
        if (typeof arg === 'string') {
          if (node.querySelector(arg)) {
            return true;
          }
        } else if (arg.nodeType === 1) {
          if (Array.prototype.slice(_this3.children).data.indexOf(arg)) {
            return true;
          }
        } else {
          return false;
        }
      };
      this.forEach(function(element) {
        if (__has(element, arg)) {
          items.push(element);
        }
      });
      return items;
    },
    prev: function prev(selector) {
      if (!this.size()) return new DOMStack();
      var ret = new DOMStack();
      var children = undefined;
      var prevElement = this[0].previousElementSibling;
      if (selector && typeof selector === 'string') {
        children = this.siblings(selector);
        children.forEach(function(element) {
          if (prevElement === element) ret.push(element);
        });
      } else {
        ret.push(this[0].previousElementSibling);
      }
      return ret;
    },
    prevAll: function prevAll(selector) {
      if (!this.size()) return new DOMStack();
      var ret = new DOMStack();
      var __siblings = undefined;
      var __self = this[0];
      var __sibs = Array.prototype.slice.apply(this[0].parentNode.children);
      var pos = __sibs.indexOf(__self);
      __sibs.splice(pos, __sibs.length - 1);
      if (selector && typeof selector === 'string') {
        __siblings = this.siblings(selector).array;
        __sibs.forEach(function(element) {
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
    next: function next(selector) {
      if (!this.size()) return new DOMStack();
      var ret = new DOMStack();
      var children = undefined;
      var nextElement = this[0].nextElementSibling;
      if (selector && typeof selector === 'string') {
        children = this.siblings(selector);
        children.forEach(function(element) {
          if (nextElement === element) ret.push(element);
        });
      } else {
        ret.push(this[0].nextElementSibling);
      }
      return ret;
    },
    nextAll: function nextAll(selector) {
      if (!this.size()) return new DOMStack();
      var ret = new DOMStack();
      var __siblings = undefined;
      var __parent = undefined;
      var __self = this[0];
      var __sibs = Array.prototype.slice.apply(this[0].parentNode.children);
      var pos = __sibs.indexOf(__self);
      __sibs.splice(0, pos + 1);
      if (selector && typeof selector === 'string') {
        __parent = this.array[0].parentNode;
        __siblings = $(__parent).find(selector);
        __sibs.splice(0, __sibs.indexOf(this.array[0]));
        __sibs.forEach(function(element) {
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
    first: function first() {
      if (!this.size()) return new DOMStack();
      return this.eq(0);
    },
    last: function last() {
      if (!this.size()) return new DOMStack();
      return this.eq(-1);
    },
    index: function index(element) {
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
    children: function children(selector) {
      if (!this.size()) return new DOMStack();
      var ret = new DOMStack();
      if (!selector) {
        this.forEach(function(node) {
          Array.prototype.slice.apply(node.children).forEach(function(ctx) {
            return ret.push(ctx);
          });
        });
        ret[0] = ret.array[0];
      } else {
        this.forEach(function(node) {
          Array.prototype.slice.apply(node.children).forEach(function(ctx) {
            if ($(ctx).is(selector)) {
              ret.push(ctx);
            }
          });
        });
        ret[0] = ret.array[0];
      }
      return ret;
    },
    siblings: function siblings(selector) {
      if (!this.size()) return new DOMStack();
      var __siblings = undefined;
      var ret = new DOMStack();
      var $this = this;
      var parent = undefined;
      var children = Array.prototype.slice.apply(this.array[0].parentNode.children);
      /**
       * Remove this from siblings:
       */
      var pos = children.indexOf($this[0]);
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
    parent: function parent() {
      if (!this.size()) return new DOMStack();
      var ret = new DOMStack();
      this.forEach(function(ctx) {
        return ret.push(ctx.parentNode);
      });
      ret.unique();
      return ret;
    },
    closest: function closest(selector) {
      if (!this.size()) return new DOMStack();
      var ret = new DOMStack();
      if (typeof selector === 'undefined') {
        return new DOMStack();
      }
      var position = null;
      var p = undefined;
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
        for (var i = 1; i < position; i++) {
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
    css: function css(property, value) {
      if (!this.size()) return new DOMStack();
      var pixelRE = /top|bottom|left|right|margin|padding/img;
      var postFix = '';
      var ret = new DOMStack();
      var testForPixelSupport = function testForPixelSupport(value, property) {
        if ($.type(value) === 'number' && property.match(pixelRE)) {
          postFix = 'px';
        }
      };
      if (!property) return new DOMStack();
      if (!value && $.type(property) === 'object') {
        this.forEach(function(node) {
          for (var key in property) {
            if (property.hasOwnProperty(key)) {
              testForPixelSupport(property[key], key);
              node.style[$.camelize(key)] = property[key] + postFix;
            }
          }
          ret.push(node);
        });
      } else if (!value && typeof property === 'string') {
        if (!this.size()) return;
        return document.defaultView.getComputedStyle(this.eq(0).array[0], null).getPropertyValue(property.toLowerCase());
      } else if (!!value) {
        this.forEach(function(node) {
          testForPixelSupport(value, property);
          node.style[$.camelize(property)] = value + postFix;
          ret.push(node);
        });
      }
      return ret;
    },
    width: function width(amount) {
      if (!this.size()) return;
      if (amount) {
        if (/px]+|[pt]+|[em]+|[en]+|[%]+|[ex]+|[in]+|[cm]+|[mm]+|[ch]+|[in]+|[rem]+|[vw]+|[vh]+$/.test(amount)) {
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
    height: function height(amount) {
      if (!this.size()) return;
      if (amount) {
        if (/px]+|[pt]+|[em]+|[en]+|[%]+|[ex]+|[in]+|[cm]+|[mm]+|[ch]+|[in]+|[rem]+|[vw]+|[vh]+$/.test(amount)) {
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
    before: function before(content) {
      var _this4 = this;
      if (!this.size()) {
        return new DOMStack();
      }
      var __before = function __before(node, content) {
        if (typeof content === 'string' || typeof content === 'number') {
          content = $.html(content);
        }
        if (content && content.objectType && content.objectType === 'domstack') {
          var len = content.size();
          var i = 0;
          while (i < len) {
            node.parentNode.insertBefore(content.array[i], node);
            i++;
          }
        } else if (content && content.nodeType === 1) {
          node.parentNode.insertBefore(content, node);
        }
        return _this4;
      };
      this.forEach(function(node) {
        return __before(node, content);
      });
      return this;
    },
    after: function after(args) {
      var _this5 = this;
      if (!this.size()) return new DOMStack();
      var __after = function __after(node, content) {
        var parent = node.parentNode;
        if (typeof content === 'string' || typeof content === 'number') {
          content = $.html(content);
        }
        if (content && content.objectType && content.objectType === 'domstack') {
          var i = 0,
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
        return _this5;
      };
      this.forEach(function(node) {
        return __after(node, args);
      });
      return this;
    },
    prepend: function prepend(content) {
      if (!this.size()) return new DOMStack();
      if (typeof content === 'string' || typeof content === 'number') {
        this.forEach(function(element) {
          element.insertAdjacentHTML('afterbegin', content);
        });
      } else if (content && content.objectType && content.objectType === 'domstack') {
        this.forEach(function(element) {
          content.forEach(function(node) {
            element.insertBefore(node, element.firstChild);
          });
        });
      } else if (content && content.nodeType === 1) {
        this.forEach(function(element) {
          element.insertBefore(node, element.firstChild);
        });
      }
      return this;
    },
    append: function append(content) {
      if (!this.size()) return new DOMStack();
      if (typeof content === 'string' || typeof content === 'number') {
        this.forEach(function(element) {
          element.insertAdjacentHTML('beforeend', content);
        });
      } else if (content && content.objectType && content.objectType === 'domstack') {
        this.forEach(function(element) {
          content.forEach(function(node) {
            element.insertBefore(node, null);
          });
        });
      } else if (content && content.nodeType === 1) {
        this.forEach(function(element) {
          element.insertBefore(node, null);
        });
      }
      return this;
    },
    prependTo: function prependTo(selector) {
      if (!this.size()) return new DOMStack();
      this.reverse();
      this.forEach(function(item) {
        return $(selector).prepend(item);
      });
      return this;
    },
    appendTo: function appendTo(selector) {
      if (!this.size()) return new DOMStack();
      this.forEach(function(item) {
        return $(selector).append(item);
      });
      return this;
    },
    clone: function clone(value) {
      if (!this.size()) return new DOMStack();
      var ret = new DOMStack();
      this.forEach(function(ctx) {
        if (value === true || !value) {
          ret.push(ctx.cloneNode(true));
        } else {
          ret.push(ctx.cloneNode(false));
        }
      });
      return ret;
    },
    wrap: function wrap(string) {
      if (!this.size() || !string) return new DOMStack();
      var tempNode = undefined;
      var empNode = undefined;
      var whichClone = undefined;
      this.forEach(function(ctx) {
        tempNode = $.html(string);
        empNode = tempNode.array[0];
        whichClone = $(ctx).clone(true);
        tempNode.append(whichClone);
        $(ctx).before(tempNode);
        $(ctx).remove();
      });
    },
    unwrap: function unwrap() {
      if (!this.size()) return new DOMStack();
      var parentNode = null;
      this.forEach(function(node) {
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
    offset: function offset() {
      if (!this.size()) return;
      var offset = this.eq(0).array[0].getBoundingClientRect();
      return {
        top: Math.round(offset.top),
        left: Math.round(offset.left),
        bottom: Math.round(offset.bottom),
        right: Math.round(offset.right)
      };
    },
    position: function position() {
      var obj = {
        top: 0,
        left: 0
      };
      var pos = this.array[0].getBoundingClientRect();
      var borderTop = parseInt(this.parent().css('border-top-width'), 10) || 0;
      var borderLeft = parseInt(this.parent().css('border-left-width'), 10) || 0;
      var parentPos = this.array[0].parentNode.getBoundingClientRect();
      var compareOffsets1 = function compareOffsets1(val1, val2) {
        return Math.round(val1 - val2);
      };
      obj.top = compareOffsets1(pos.top, parentPos.top + borderTop);
      obj.left = compareOffsets1(pos.left, parentPos.left + borderLeft);
      return obj;
    },
    empty: function empty() {
      if (!this.size()) return new DOMStack();
      var ret = new DOMStack();
      this.forEach(function(ctx) {
        $(ctx).children().off();
        ctx.textContent = '';
        ret.push(ctx);
      });
      return ret;
    },
    html: function html(content) {
      if (!this.size()) return new DOMStack();
      if (content === '') {
        this.forEach(function(node) {
          node.innerHTML = '';
        });
        return this;
      } else if (content) {
        this.forEach(function(node) {
          node.innerHTML = content;
        });
        return this;
      } else if (!content) {
        return this.array[0].innerHTML.trim();
      }
    },
    text: function text(string) {
      var ret = '';
      if (!this.size()) return new DOMStack();
      if (!!string || string === 0) {
        this.forEach(function(element) {
          element.innerText = string;
        });
        return this;
      } else {
        this.forEach(function(element) {
          ret += element.innerText;
          ret.trim();
        });
        return ret;
      }
    },
    replaceWith: function replaceWith(content) {
      if (content && content.nodeType && content.nodeType === 1) {
        $(content).off();
      } else if (content && content.objectType && content.objectType === 'domstack') {
        content.off();
      }
      this.forEach(function(node) {
        $(node).off();
        if (typeof content === 'string') {
          $.replace($(content), node);
        } else {
          $.replace($(content), node);
        }
      });
    },
    remove: function remove() {
      if (!this.size()) return new DOMStack();
      this.forEach(function(node) {
        $(node).off();
        if (node.parentNode) node.parentNode.removeChild(node);
      });
    },
    addClass: function addClass(className) {
      if (!this.size()) return new DOMStack();
      if (typeof className !== "string") return;
      var ret = new DOMStack();
      var classes = undefined;
      this.forEach(function(node) {
        if (/\s/.test(className)) {
          classes = className.split(' ');
          classes.forEach(function(name) {
            node.classList.add(name);
          });
        } else {
          node.classList.add(className);
        }
        ret.push(node);
      });
      return ret;
    },
    hasClass: function hasClass(className) {
      if (!this.size()) return new DOMStack();
      var temp = false;
      this.forEach(function(element) {
        if (element.classList.contains(className)) {
          temp = true;
        }
      });
      return temp;
    },
    removeClass: function removeClass(className) {
      if (!this.size()) return new DOMStack();
      var ret = new DOMStack();
      var classes = undefined;
      this.forEach(function(node) {
        if (!node) return;
        if (/\s/.test(className)) {
          classes = className.split(' ');
          classes.forEach(function(name) {
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
    toggleClass: function toggleClass(className) {
      if (!this.size()) return new DOMStack();
      var ret = new DOMStack();
      this.forEach(function(node) {
        node.classList.toggle(className);
        ret.push(node);
      });
      return ret;
    },
    attr: function attr(property, value) {
      if (!this.size()) return new DOMStack();
      var ret = new DOMStack();
      var __attr = function __attr(node, property, value) {
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
        this.forEach(function(node) {
          __attr(node, property, value);
          ret.push(node);
        });
      }
      if (ret.length) {
        return ret;
      }
    },
    removeAttr: function removeAttr(attribute) {
      if (!this.size()) return new DOMStack();
      var ret = new DOMStack();
      this.forEach(function(node) {
        if (!!node.hasAttribute(attribute)) {
          node.removeAttribute(attribute);
          ret.push(node);
        }
      });
      return ret;
    },
    prop: function prop(property, value) {
      if (!this.size()) return new DOMStack();
      if (value === false || !!value) {
        this.forEach(function(element) {
          element[property] = value;
        });
        return this;
      } else if (this.array[0] && this.array[0][property]) {
        return this.array[0][property];
      }
    },
    removeProp: function removeProp(property) {
      if (!this.size()) return new DOMStack();
      this[0][property] = false;
      return [this[0]];
    },
    disable: function disable() {
      if (!this.size()) return new DOMStack();
      this.forEach(function(node) {
        node.classList.add('disabled');
        node.disabled = true;
        node.style.cursor = 'default';
      });
      return this;
    },
    enable: function enable() {
      if (!this.size()) return new DOMStack();
      this.forEach(function(node) {
        node.classList.remove('disabled');
        node.removeAttribute('disabled');
        node.style.cursor = 'auto';
      });
      return this;
    },
    val: function val(value) {
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
    hide: function hide() {
      var display = this.css('display');
      this.data('display_attr', display);
      this.css('display', 'none');
    },
    show: function show() {
      var display = this.data('display_attr');
      if (display === 'none' || !display) {
        display = 'block';
      }
      this.css('display', display);
    }
  });
  /**
   * ChocolateChip-UI event methods.
   */
  (function() {
    var EventErrorMessages = {
      en: {
        noEventOrCallback: "ChocolateChip-UI Event Error: No event or callback was provided to bind to the element. These are the minimal requirements for this method to work. Please provide an event and callback.",
        noCallbackForEventBinding: "ChocolateChip-UI Event Error: No callback was provided for the event you are trying to bind. A callback is required for the event binding to work.",
        noEventToTrigger: "ChocolateChip-UI Event Error: No event was provided to trigger. As such we cannot do anything."
      },
      es: {
        noEventOrCallback: "Hubo Error de Evento ChocolateChip-UI: No se proporcionó ningún evento ni función callback para asignar al elemento. Cuando menos se nesecitan éstos para realizar esta operación en el elemento. Por favor proporcione un evento y una callback.",
        noCallbackForEventBinding: "Hubo Error de Evento ChocolateChip-UI: No se proporcionó ninguna función callback para el evento que se quiere asignar al element. Se reqiere una callback para asignar el evento al elemento.",
        noEventToTrigger: "Hubo Error de Evento ChocolateChip-UI: No se proporcionó ningún evento que gatillar. Por eso no podemos hacer nada."
      }
    };
    var errors = undefined;
    if ($('html').attr('lang') == 'en') errors = EventErrorMessages.en;
    if ($('html').attr('lang') == 'es') errors = EventErrorMessages.es;
    /**
     * Define interface for handling events:
     */
    var EventStack = function EventStack(array) {
      var __array = [];
      if (array && Array.isArray(array)) {
        var i = -1;
        var len = array.length;
        while (++i < len) {
          __array[i] = array[i];
        }
      } else if (array) {
        var arr = Array.prototype.slice.apply(_arguments);
        arr.forEach(function(ctx, idx) {
          __array[idx] = ctx;
        });
      }
      return {
        size: function size() {
          return __array.length;
        },
        push: function push(data) {
          return __array.push(data);
        },
        pop: function pop() {
          return __array.pop();
        },
        eq: function eq(index) {
          if (index < 0) {
            return __array[__array.length + index];
          } else {
            return __array[index];
          }
        },
        forEach: function forEach(callback) {
          var value = undefined;
          var i = -1;
          var len = __array.length;
          while (++i < len) {
            value = callback.call(__array[i], __array[i], i);
            if (value === false) {
              break;
            }
          }
        },
        shift: function shift() {
          return __array.shift.apply(__array, _arguments);
        },
        unshift: function unshift() {
          return __array.unshift.apply(__array, _arguments);
        },
        splice: function splice() {
          return __array.splice.apply(__array, _arguments);
        },
        indexOf: function indexOf() {
          return __array.indexOf.apply(__array, _arguments);
        },
        getData: function getData() {
          return __array;
        },
        purge: function purge() {
          return __array = [];
        }
      };
    };
    var ChuiEventCache = {
      elements: {}
    };
    /* jshint, evil: false, validthis:true, unused:false, loopfunc: false,
        smarttabs: true, nonew: false */
    /**
     * Private method to set events on ChuiEventCache
     */
    var bind = function bind(element, event, callback, capturePhase) {
      if (!element.id) element.id = chocolatechipjs.uuid();
      if (!ChuiEventCache.elements[element.id]) {
        ChuiEventCache.elements[element.id] = EventStack(); // jshint ignore:line
      }
      ChuiEventCache.elements[element.id].push({
        event: event,
        callback: callback
      });
      element.addEventListener(event, callback, capturePhase);
    };
    /**
     * Delete items from event stack:
     */
    var deleteFromEventStack = function deleteFromEventStack(toDelete, evtStck) {
      var len = toDelete.length;
      for (var i = 0; len > i; len--) {
        evtStck.splice(toDelete[len - 1], 1);
      }
    };
    /**
     * Private method to unbind events on ChuiEventCache
     */
    var unbind = function unbind(element, event, callback, capturePhase) {
      var eventStack = ChuiEventCache.elements[element.id];
      if (!eventStack) return;
      var deleteOrder = [];
      if (!event) {
        deleteOrder = [];
        eventStack.forEach(function(evt, idx) {
          element.removeEventListener(evt.event, evt.callback, evt.capturePhase);
          deleteOrder.push(idx);
        });
        deleteFromEventStack(deleteOrder, eventStack);
      } else if (!!event && !callback) {
        deleteOrder = [];
        eventStack.forEach(function(evt, idx) {
          if (evt.event === event) {
            element.removeEventListener(evt.event, evt.callback, evt.capturePhase);
            deleteOrder.push(idx);
          }
        });
        deleteFromEventStack(deleteOrder, eventStack);
      } else if (callback) {
        deleteOrder = [];
        eventStack.forEach(function(evt, idx) {
          if (callback === evt.callback) {
            element.removeEventListener(evt.event, evt.callback, evt.capturePhase);
            deleteOrder.push(idx);
          }
        });
        deleteFromEventStack(deleteOrder, eventStack);
      }
    };
    /**
     * Set delegated events on ChuiEventCache
     */
    var delegate = function delegate(element, selector, event, callback, capturePhase) {
      var delegateElement = $(element).array[0];
      $(element).forEach(function(ctx) {
        $(ctx).on(event, function(e) {
          var target = e.target;
          if (e.target.nodeType === 3) {
            target = e.target.parentNode;
          }
          $(ctx).find(selector).forEach(function(delegateElement) {
            if (delegateElement === target) {
              callback.call(delegateElement, e);
            } else {
              try {
                var ancestor = $(target).closest(selector);
                if (delegateElement === ancestor.array[0]) {
                  callback.call(delegateElement, e);
                }
              } catch (err) {}
            }
          });
        }, capturePhase);
      });
    };
    /**
     * Method to remove delegated events from ChuiEventCache:
     */
    var undelegate = function undelegate(element, selector, event, callback, capturePhase) {
      unbind($(element).array[0], event, callback, capturePhase);
    };
    $.fn.extend({
      on: function on(event, selector, callback, capturePhase) {
        if (!event) {
          if ($.supressErrorMessages) return;
          console.error(errors.noEventOrCallback);
          return;
        }
        if (!selector) {
          if ($.supressErrorMessages) return;
          console.error(errors.noCallbackForEventBinding);
          return;
        }
        if (!selector && /Object/img.test(event.constructor.toString())) {
          this.forEach(function(element) {
            for (var key in event) {
              if (event.hasOwnProperty(key)) {
                $(element).on(key, event[key]);
              }
            }
          });
        }
        var ret = [];
        var events = undefined;
        if (typeof event === 'string') {
          event = event.trim();
          if (/\s/.test(event)) {
            events = event.split(' ');
            this.forEach(function(ctx) {
              events.forEach(function(evt) {
                if (typeof selector === 'function') {
                  bind(ctx, evt, selector, callback);
                  ret.push(ctx);
                } else {
                  delegate(ctx, selector, evt, callback, capturePhase);
                }
              });
            });
          }
        }
        this.forEach(function(ctx) {
          if (typeof selector === 'function') {
            return bind(ctx, event, selector, callback);
          } else {
            delegate(ctx, selector, event, callback, capturePhase);
          }
        });
        return this;
      },
      off: function off(event, selector, callback, capturePhase) {
        var ret = new DOMStack();
        if (!this.size()) return ret;
        this.forEach(function(ctx) {
          if (typeof event === 'undefined') {
            ret.push(ctx);
            unbind(ctx);
            return ret;
          } else if (typeof selector === 'function' || !selector) {
            unbind(ctx, event, selector, callback, capturePhase);
            return this;
          } else {
            undelegate(ctx, selector, event, callback, capturePhase);
            return this;
          }
        });
      },
      trigger: function trigger(event) {
        if (!event) {
          if ($.supressErrorMessages) return;
          console.error(errors.noEventToTrigger);
          return;
        }
        if (!this.size()) return new DOMStack();
        this.forEach(function(ctx) {
          if (document.createEvent) {
            var evtObj = document.createEvent('Events');
            evtObj.initEvent(event, true, false);
            ctx.dispatchEvent(evtObj);
          }
        });
      }
    });
  })();
  window.$ = window.chocolatechipjs = chocolatechipjs;
  return $;
})();
/**
 * ChocolateChip-UI event aliases.
 */
$.extend({
  eventStart: null,
  eventEnd: null,
  eventMove: null,
  eventCancel: null,
  /**
   * Define min-length for gesture detection:
   */
  gestureLength: 30
});
$(function() {
  /**
   * Setup Event Variables:
   */
  if ('ontouchstart' in window && /mobile/img.test(navigator.userAgent)) {
    $.eventStart = 'touchstart';
    $.eventEnd = 'touchend';
    $.eventMove = 'touchmove';
    $.eventCancel = 'touchcancel';
    /** 
     * Mouse events for desktop: 
     */
  } else {
    $.eventStart = 'mousedown';
    $.eventEnd = 'click';
    $.eventMove = 'mousemove';
    $.eventCancel = 'mouseout';
  }
});
/**
 * ChocolateChip-UI gestures.
 */
(function() {
  "use strict";
  var touch = {};
  var touchTimeout = undefined;
  var swipeTimeout = undefined;
  var tapTimeout = undefined;
  var longTapDelay = 750;
  var singleTapDelay = 150;
  $.gestureLength = 50;
  if ($.isAndroid) singleTapDelay = 200;
  var longTapTimeout = undefined;

  function parentIfText(node) {
    return 'tagName' in node ? node : node.parentNode;
  }

  function swipeDirection(x1, x2, y1, y2) {
    return Math.abs(x1 - x2) >= Math.abs(y1 - y2) ? x1 - x2 > 0 ? 'left' : 'right' : y1 - y2 > 0 ? 'up' : 'down';
  }

  function longTap() {
    longTapTimeout = null;
    if (touch.last) {
      try {
        if (touch && touch.el) {
          touch.el.trigger('longtap');
          touch = {};
        }
      } catch (err) {};
    }
  }

  function cancelLongTap() {
    if (longTapTimeout) clearTimeout(longTapTimeout);
    longTapTimeout = null;
  }

  function cancelAll() {
    if (touchTimeout) clearTimeout(touchTimeout);
    if (tapTimeout) clearTimeout(tapTimeout);
    if (swipeTimeout) clearTimeout(swipeTimeout);
    if (longTapTimeout) clearTimeout(longTapTimeout);
    touchTimeout = tapTimeout = swipeTimeout = longTapTimeout = null;
    touch = {};
  }
  /** 
   * Execute this after DOM loads: 
   */
  $(function() {
    var now = undefined;
    var delta = undefined;
    var body = $('body');
    var twoTouches = false;
    /** 
     * Capture start of event: 
     */
    body.on($.eventStart, function(e) {
      now = Date.now();
      delta = now - (touch.last || now);
      if (e.originalEvent) e = e.originalEvent;
      if ($.eventStart === 'mousedown') {
        touch.el = $(parentIfText(e.target));
        if (e.target.nodeName === 'ripple') {
          touch.el = $(el.target.parentNode);
        }
        touchTimeout && clearTimeout(touchTimeout);
        touch.x1 = e.pageX;
        touch.y1 = e.pageY;
        twoTouches = false;
        /** 
         * Detect two or more finger gestures: 
         */
      } else {
        if (e.touches.length === 1) {
          touch.el = $(parentIfText(e.touches[0].target));
          touchTimeout && clearTimeout(touchTimeout);
          touch.x1 = e.touches[0].pageX;
          touch.y1 = e.touches[0].pageY;
          if (e.targetTouches.length === 2) {
            twoTouches = true;
          } else {
            twoTouches = false;
          }
        }
      }
      if (delta > 0 && delta <= 250) {
        touch.isDoubleTap = true;
      }
      touch.last = now;
      longTapTimeout = setTimeout(longTap, longTapDelay);
    });
    /** 
     * Capture event move: 
     */
    body.on($.eventMove, function(e) {
      if (e.originalEvent) e = e.originalEvent;
      cancelLongTap();
      if ($.eventMove === 'mousemove') {
        touch.x2 = e.pageX;
        touch.y2 = e.pageY;
      } else {
        /** 
         * One finger gesture: 
         */
        if (e.touches.length === 1) {
          touch.x2 = e.touches[0].pageX;
          touch.y2 = e.touches[0].pageY;
        }
      }
    });
    /** 
     * Capture event end: 
     */
    body.on($.eventEnd, function(e) {
      cancelLongTap();
      if (!!touch.el) {
        /** 
         * Swipe detection: 
         */
        if (touch.x2 && Math.abs(touch.x1 - touch.x2) > $.gestureLength || touch.y2 && Math.abs(touch.y1 - touch.y2) > $.gestureLength) {
          swipeTimeout = setTimeout(function() {
            if (touch && touch.el) {
              touch.el.trigger('swipe');
              touch.el.trigger('swipe' + swipeDirection(touch.x1, touch.x2, touch.y1, touch.y2));
              touch = {};
            }
          }, 0);
          /** 
           * Normal tap: 
           */
        } else if ('last' in touch) {
          /** 
           * Delay by one tick so we can cancel the 'tap' event if 'scroll' fires: 
           */
          tapTimeout = setTimeout(function() {
            /** 
             * Trigger double tap immediately: 
             */
            if (touch && touch.isDoubleTap) {
              if (touch && touch.el) {
                touch.el.trigger('doubletap');
                touch = {};
              }
            } else {
              /** 
               * Trigger tap after singleTapDelay: 
               */
              touchTimeout = setTimeout(function() {
                touchTimeout = null;
                if (touch && touch.el) {
                  touch.el.trigger('tap');
                  touch = {};
                  return false;
                }
              }, singleTapDelay);
            }
          }, 0);
        }
      } else {
        return;
      }
    });
    body.on('touchcancel', cancelAll);
  });
  /**
   * Register events:
   */
  ['tap', 'doubletap', 'longtap', 'swipeleft', 'swiperight', 'swipeup', 'swipedown'].forEach(function(_method) {
    $.fn.extend({
      method: function method(callback) {
        return this.on(_method, callback);
      }
    });
  });
})();
/**
 * ChocolateChipJS data cache.
 */
var CCDataCache = {
  elements: {}
};
$.fn.extend({
  data: function data(key, value) {
    if (!this.size()) return new DOMStack();
    var val = undefined;
    var id = undefined;
    var ctx = this.array[0];
    if (!ctx.id) {
      ctx.id = $.uuid();
    }
    id = ctx.id;
    if (!CCDataCache.elements[id]) {
      CCDataCache.elements[id] = {};
    }
    if (key === 'undefined' || key === null) {
      return;
    }
    if (value || value === 0) {
      val = value;
      var obj = {};
      obj[key] = value;
      CCDataCache.elements[id][key] = value;
    } else {
      if (!CCDataCache.elements[id]) return;
      if (CCDataCache.elements[id][key] === 0) {
        return CCDataCache.elements[id][key];
      }
      if (!CCDataCache.elements[id][key]) return;
      return CCDataCache.elements[id][key];
    }
    return this;
  },
  removeData: function removeData(key) {
    var _this6 = this;
    if (!this.size()) return this;
    this.forEach(function(element) {
      var id = element.id;
      if (!id) return _this6;
      if (!CCDataCache.elements[id]) {
        return _this6;
      }
      if (!key) {
        delete CCDataCache.elements[id];
        return _this6;
      }
      if (Object.keys(CCDataCache.elements[id]).length === 0) {
        delete CCDataCache.elements[id];
      } else {
        delete CCDataCache.elements[id][key];
      }
      return _this6;
    });
  }
});
/**
 * ChocolateChip-UI types method.
 */
$.extend({
  type: function type(_type) {
    switch (typeof _type === 'undefined' ? 'undefined' : _typeof(_type)) {
      case 'boolean':
        return 'boolean';
      case 'number':
        return 'number';
      case 'string':
        return 'string';
      case 'function':
        return 'function';
      case 'object':
        if (Array.isArray(_type)) {
          return 'array';
        } else if (Object.prototype.toString.call(_type) === '[object Date]') {
          return 'date';
        } else if (Object.prototype.toString.call(_type) === '[object Error]') {
          return 'error';
        } else if (Object.prototype.toString.call(_type) === '[object RegExp]') {
          return 'regexp';
        } else if (Object.prototype.toString.call(_type) === '[object Object]') {
          return 'object';
        }
    }
  }
});
/**
 * ChocolateChip-UI string methods.
 */
$.extend({
  camelize: function camelize(string) {
    if (typeof string !== 'string') return;
    return string.replace(/\-(.)/g, function(match, letter) {
      return letter.toUpperCase();
    });
  },
  deCamelize: function deCamelize(string) {
    if (typeof string !== 'string') return;
    return string.replace(/([A-Z])/g, '-$1').toLowerCase();
  },
  capitalize: function capitalize(string, all) {
    var self = undefined;
    if (!string) {
      return;
    }
    if (typeof string !== 'string') return;
    if (all) {
      var _ret = function() {
        var str = string.split(' ');
        var newstr = [];
        str.forEach(function(item) {
          return newstr.push(self.capitalize(item));
        });
        return {
          v: newstr.join(' ')
        };
      }();
      if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
    } else {
      return string.charAt(0).toUpperCase() + string.substring(1).toLowerCase();
    }
  }
});
/**
 * ChocolateChip-UI collection utilities.
 */
$.fn.extend({
  forEach: function forEach(callback) {
    this.each(function(idx, ctx) {
      callback.call(ctx, ctx, idx);
    });
  },
  disable: function disable() {
    if (!this.size()) return $();
    this.forEach(function(node) {
      node.classList.add('disabled');
      node.disabled = true;
      node.style.cursor = 'default';
    });
    return this;
  },
  enable: function enable() {
    if (!this.size()) return $();
    this.forEach(function(node) {
      node.classList.remove('disabled');
      node.removeAttribute('disabled');
      node.style.cursor = 'auto';
    });
    return this;
  },
  iz: function iz(selector) {
    var ret = $();
    this.forEach(function(ctx) {
      if ($(ctx).is(selector)) {
        ret.push(ctx);
      }
    });
    return ret;
  },
  iznt: function iznt(selector) {
    var ret = $();
    this.each(function(_, ctx) {
      if (!$(ctx).is(selector)) {
        ret.push(ctx);
      }
    });
    return ret;
  },
  haz: function haz(selector) {
    var ret = new DOMStack();
    this.forEach(function(element) {
      if ($(element).has(selector)[0]) {
        ret.push(element);
      }
    });
    return ret;
  },
  haznt: function haznt(selector) {
    var ret = new DOMStack();
    this.forEach(function(element) {
      if (!$(element).has(selector)[0]) {
        ret.push(element);
      }
    });
    return ret;
  },
  hazClass: function hazClass(className) {
    if (className) {
      return this.iz('.' + className);
    } else {
      return new DOMStack();
    }
  },
  hazntClass: function hazntClass(className) {
    if (className) {
      return this.iznt('.' + className);
    } else {
      return new DOMStack();
    }
  },
  hazAttr: function hazAttr(attribute) {
    if (attribute) {
      return this.iz('[' + attribute + ']');
    } else {
      return new DOMStack();
    }
  },
  hazntAttr: function hazntAttr(attribute) {
    if (attribute) {
      return this.iznt('[' + attribute + ']');
    } else {
      return new DOMStack();
    }
  }
});
/**
 * ChocolateChip-UI - Validators.
 */
/**
 * Set validity state of form elements: 
 */
var setValidityStatus = function setValidityStatus(element, valid) {
  if (valid) {
    $(element).prop('valid', true);
    $(element).prop('invalid', false);
    $(element).addClass('valid').removeClass('invalid');
  } else {
    $(element).prop('valid', false);
    $(element).prop('invalid', true);
    $(element).addClass('invalid').removeClass('valid');
  }
};
/**
 * Used to check input validity: 
 */
var checkValidity = function checkValidity(element, expression) {
  if (expression) {
    setValidityStatus(element, true);
  } else {
    setValidityStatus(element, false);
  }
  return expression;
};
$.fn.extend({
  isNotEmpty: function isNotEmpty(ctx) {
    if (this[0].nodeName !== 'INPUT') return;
    return checkValidity(this, this[0].nodeName === 'INPUT' && this[0].value);
  },
  validateAlphabetic: function validateAlphabetic() {
    if (this[0].nodeName !== 'INPUT') return;
    var letters = /^[A-Za-z]+$/;
    var value = this[0].nodeName === 'INPUT' && this[0].value;
    checkValidity(this, value.match(letters));
    if (value) {
      return checkValidity(this, value.match(letters));
    }
  },
  validateText: function validateText() {
    if (this[0].nodeName !== 'INPUT') return;
    var letters = /^[A-Za-z\W]+$/;
    var value = this[0].nodeName === 'INPUT' && this[0].value;
    checkValidity(this, value.match(letters));
    if (value) {
      return checkValidity(this, value.match(letters));
    }
  },
  validateNumber: function validateNumber() {
    if (this[0].nodeName !== 'INPUT') return;
    var numbers = /^[+-]?\d+(\.\d+)?$/;
    var value = this[0].nodeName === 'INPUT' && this[0].value;
    checkValidity(this, value.match(numbers));
    if (value) {
      return checkValidity(this, value.match(numbers));
    }
  },
  validateAlphaNumeric: function validateAlphaNumeric() {
    if (this[0].nodeName !== 'INPUT') return;
    var letters = /^[0-9a-zA-Z]+$/;
    var value = this[0].nodeName === 'INPUT' && this[0].value;
    checkValidity(this, value.match(letters));
    if (value) {
      return checkValidity(this, value.match(letters));
    }
  },
  validateUserName: function validateUserName(minimum) {
    if (this[0].nodeName !== 'INPUT') return;
    var letters = /^[a-zA-Z0-9]+$/;
    var username = this[0].value;
    if (!username) return checkValidity(this, username);
    if (minimum && username.match(letters)) {
      if (username.length >= minimum) {
        return checkValidity(this, username);
      } else {
        return checkValidity(this, false);
      }
    } else {
      return checkValidity(this, checkValidity(this, username.match(letters)));
    }
  },
  validateEmail: function validateEmail() {
    if (this[0].nodeName !== 'INPUT') return;
    var value = this[0].value;
    var email = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (value) {
      return checkValidity(this, value.match(email));
    } else {
      return checkValidity(this, false);
    }
  },
  validatePhoneNumber: function validatePhoneNumber(int) {
    if (this[0].nodeName !== 'INPUT') return;
    var phone = undefined;
    var phoneNumber = undefined;
    var convertLettersToNumbers = function convertLettersToNumbers(value) {
      var phonenumber = "";
      value = value.toLowerCase();
      var len = value.length;
      for (var i = 0; i < len; i++) {
        var character = value.charAt(i);
        switch (character) {
          case '0':
            phonenumber += "0";
            break;
          case '1':
            phonenumber += "1";
            break;
          case '2':
            phonenumber += "2";
            break;
          case '3':
            phonenumber += "3";
            break;
          case '4':
            phonenumber += "4";
            break;
          case '5':
            phonenumber += "5";
            break;
          case '6':
            phonenumber += "6";
            break;
          case '7':
            phonenumber += "7";
            break;
          case '8':
            phonenumber += "8";
            break;
          case '9':
            phonenumber += "9";
            break;
          case '-':
            phonenumber += "-";
            break;
          case 'a':
          case 'b':
          case 'c':
            phonenumber += "2";
            break;
          case 'd':
          case 'e':
          case 'f':
            phonenumber += "3";
            break;
          case 'g':
          case 'h':
          case 'i':
            phonenumber += "4";
            break;
          case 'j':
          case 'k':
          case 'l':
            phonenumber += "5";
            break;
          case 'm':
          case 'n':
          case 'o':
            phonenumber += "6";
            break;
          case 'p':
          case 'q':
          case 'r':
          case 's':
            phonenumber += "7";
            break;
          case 't':
          case 'u':
          case 'v':
            phonenumber += "8";
            break;
          case 'w':
          case 'x':
          case 'y':
          case 'z':
            phonenumber += "9";
            break;
        }
      }
      return phonenumber;
    };
    if (this[0].value) {
      /**
       * International Numbers:
       */
      if (int) {
        phoneNumber = this[0].value.replace(/[\(\)\.\-\ ]/g, '');
        return checkValidity(this, this.isNotEmpty() && !isNaN(phoneNumber));
        /**
         * North America (US and Canada):
         */
      } else {
        phoneNumber = this[0].value.replace(/[\(\)\.\-\ ]/g, '');
        phoneNumber = convertLettersToNumbers(phoneNumber);
        phone = /((\(\d{3}\)?)|(\d{3}))([\s-./]?)(\d{3})([\s-./]?)(\d{4})/;
        return checkValidity(this, phoneNumber.match(phone));
      }
    } else {
      return checkValidity(this, false);
    }
  },
  validateUrl: function validateUrl() {
    if (this[0].nodeName !== 'INPUT') return;
    if (this[0].value) {
      var url = /^(ftp|http|https):\/\/([w]{3}\.)?(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?$/;
      return checkValidity(this, this[0].value.match(url));
    } else {
      return checkValidity(this, false);
    }
  },
  validateAge: function validateAge(minimum) {
    if (this[0].nodeName !== 'INPUT') return;
    if (!minimum) return;
    var age = this[0].value;
    if (age) {
      return checkValidity(this, age >= minimum);
    } else {
      return checkValidity(this, false);
    }
  },
  validateCheckbox: function validateCheckbox() {
    if (this[0].nodeName !== 'INPUT') return;
    if (this[0].nodeName === 'INPUT' && this[0].type === 'checkbox') {
      return checkValidity(this, this[0].checked === true);
    }
  },
  validateRadioButtons: function validateRadioButtons() {
    if (this[0].nodeName !== 'INPUT') return;
    var choice = false;
    if (this[0].nodeName === 'INPUT' && this[0].type === 'radio') {
      $.each(this, function(idx, button) {
        if (button.checked === true) {
          choice = true;
        }
      });
      return checkValidity(this, choice);
    }
  },
  validateSelectBox: function validateSelectBox() {
    if (this[0].nodeName === 'SELECT') {
      return checkValidity(this, this[0].selectedIndex);
    } else {
      return;
    }
  },
  validateSwitch: function validateSwitch() {
    var checkbox = this.find('input[type=checkbox]')[0];
    if (checkbox.checked) {
      return true;
    } else {
      return false;
    }
  },
  validateSelectList: function validateSelectList() {
    var radio = this.find('input[type=radio]');
    if (radio.iz('[checked]')[0]) {
      return true;
    } else {
      return false;
    }
  },
  validateMultiSelectList: function validateMultiSelectList() {
    var checkboxes = this.find('input[type=checkbox]');
    var checked = false;
    checkboxes.forEach(function(item) {
      if ($(item).prop('checked')) {
        checked = true;
      }
    });
    if (checked) {
      return true;
    } else {
      return false;
    }
  }
});
$.extend({
  validatePassword: function validatePassword(input1, input2, minimum) {
    if (minimum && $(input1).val().length < minimum || $(input2).val().length < minimum) {
      $(input1).addClass('invalid').removeClass('valid');
      $(input2).addClass('invalid').removeClass('valid');
      return false;
    } else {
      var letters = /^(?=.*[a-zA-Z])(?=.*[0-9]).+$/;
      if (!letters.test($(input1).val()) && !letters.test($(input2).val())) return false;
      if ($(input1).val() === $(input2).val()) {
        $(input1).removeClass('invalid').addClass('valid');
        $(input2).removeClass('invalid').addClass('valid');
      } else {
        $(input1).addClass('invalid').removeClass('valid');
        $(input2).addClass('invalid').removeClass('valid');
      }
      return $(input1).val() === $(input2).val();
    }
  },
  validateWithRegex: function validateWithRegex(input, regex) {
    if (!regex) {
      console.error('This method requires a regular expression.');
      return;
    }
    var value = $(input).val();
    if (value) {
      return checkValidity(input, value.match(regex));
    }
  },
  customValidators: [],
  registerCustomValidator: function registerCustomValidator(name, regex) {
    this.customValidators.push({
      name: name,
      regex: regex
    });
  }
});
/**
 * ChocolateChip-UI serialize methods.
 */
$.fn.extend({
  serializeArray: function serializeArray() {
    var name = undefined;
    var type = undefined;
    var ret = [];
    var add = function add(value) {
      if ($.type(value) === 'array') {
        return value.forEach(add);
      }
      ret.push({
        name: name,
        value: value
      });
    };
    if (this[0]) {
      $.each([].slice.apply(this[0].elements), function(idx, field) {
        type = field.type;
        name = field.name;
        if (name && field.nodeName.toLowerCase() != 'fieldset' && !field.disabled && type != 'submit' && type != 'reset' && type != 'button' && type != 'file' && (type != 'radio' && type != 'checkbox' || field.checked)) {
          add($(field).val());
        }
      });
    }
    return ret;
  },
  /**
   * Serialize the values of a form: 
   */
  serialize: function serialize() {
    var ret = [];
    this.serializeArray().forEach(function(element) {
      ret.push(encodeURIComponent(element.name) + '=' + encodeURIComponent(element.value));
    });
    return ret.join('&');
  }
});
/**
 * ChocolateChip-UI param method.
 */
$.extend({
  /** 
   * Serialize an object for posting to server:
   */
  param: function param(obj, traditional) {
    /** 
     * Private function used by $.param:
     */
    function serialize(params, obj, traditional, scope) {
      var type = undefined;
      var array = $.type(obj) === 'array';
      var hash = $.isEmptyObject(obj);
      /** 
       * If it's an array of objects: 
       */
      if ($.type(obj) === 'array') {
        $.each(obj, function(key, value) {
          type = $.type(value);
          if (scope) {
            key = traditional ? scope : scope + '[' + (hash || type == 'object' || type == 'array' ? key : '') + ']';
          }
          if (!scope && array) {
            params.add(value.name, value.value);
          } else if (type == "array" || !traditional && type == "object") {
            serialize(params, value, traditional, key);
          } else {
            params.add(key, value);
          }
        });
        /**
         * Else its an object (use key/value loop): 
         */
      } else if ($.type(obj) === 'object') {
        for (var key in obj) {
          type = $.type(obj[key]);
          if (scope) {
            key = traditional ? scope : scope + '[' + (hash || type == 'object' || type == 'array' ? key : '') + ']';
          }
          if (!scope && array) {
            params.add(obj[key].name, obj[key].obj[key]);
          } else if (type == "array" || !traditional && type == "object") {
            serialize(params, obj[key], traditional, key);
          } else {
            params.add(key, obj[key]);
          }
        }
      }
    }
    var params = [];
    params.add = function(key, value) {
      if ($.type(value) === 'function') value = value();
      if (value === null) value = "";
      this.push(encodeURIComponent(key) + '=' + encodeURIComponent(value));
    };
    serialize(params, obj, traditional);
    return params.join('&').replace(/%20/g, '+');
  }
});
/**
 * ChocolateChip-UI - Form Validation & JSON.
 */
$.extend({
  /**
   * Setup Form object to convert data to JSON, and to validate form values:
   */
  Form: function Form(options) {
    if (!options || $.type(options) !== 'array') return;
    var __passed = false;
    var __errors = [];
    var __result = [];
    /** 
     * Helper to validate form elements: 
     */
    function validateElement(item) {
      if (!item) return;
      if (!__passed) {
        __errors.push({
          element: item.element,
          type: item.type
        });
        if (item.callback) item.callback();
      } else {
        convertToObject($(item.element).attr('name'), $(item.element).val());
      }
    }
    /** 
     * Helper to convert form element names to JSON: 
     */
    function convertToObject(name, value) {
      __result.push({
        name: name,
        value: value
      });
    }
    /** 
     * Convert form names and values to JSON: 
     */
    function convertObjectToJSON(data) {
      var delimiter = '_';
      var result = {};
      var arrays = {};
      data.forEach(function(item) {
        var value = item.value;
        if (value !== '') {
          var name = item.name;
          var nameParts = name.split(delimiter);
          var currResult = result;
          for (var j = 0; j < nameParts.length; j++) {
            var namePart = nameParts[j];
            var arrName = undefined;
            if (namePart.indexOf('[]') > -1 && j === nameParts.length - 1) {
              arrName = namePart.substr(0, namePart.indexOf('['));
              if (!currResult[arrName]) {
                currResult[arrName] = [];
              }
              currResult[arrName].push(value);
            } else {
              if (namePart.indexOf('[') > -1) {
                arrName = namePart.substr(0, namePart.indexOf('['));
                var arrIdx = namePart.replace(/^[a-z]+\[|\]$/gi, '');
                if (!arrays[arrName]) {
                  arrays[arrName] = {};
                }
                if (!currResult[arrName]) {
                  currResult[arrName] = [];
                }
                if (j === nameParts.length - 1) {
                  currResult[arrName].push(value);
                } else {
                  if (!arrays[arrName][arrIdx]) {
                    currResult[arrName].push({});
                    arrays[arrName][arrIdx] = currResult[arrName][currResult[arrName].length - 1];
                  }
                }
                currResult = arrays[arrName][arrIdx];
              } else {
                if (j < nameParts.length - 1) {
                  if (!currResult[namePart]) {
                    currResult[namePart] = {};
                  }
                  currResult = currResult[namePart];
                } else {
                  currResult[namePart] = value;
                }
              }
            }
          }
        }
      });
      return result;
    }
    /** 
     * Validate form elements: 
     */
    options.forEach(function(item) {
      if (!$(item.element)[0]) return;
      switch (item.type) {
        case 'notempty':
          __passed = validateElement(item.element, item.type);
          __errors.push({
            element: item.element,
            type: item.type
          });
          return;
        case 'number':
          __passed = $(item.element).validateNumber();
          validateElement(item);
          return;
        case 'text':
          __passed = $(item.element).validateText();
          validateElement(item);
          return;
        case 'alphanumeric':
          __passed = $(item.element).validateAlphaNumeric();
          validateElement(item);
          return;
        case 'username':
          __passed = $(item.element).validateUserName(item.min);
          validateElement(item);
          return;
        case 'email':
          __passed = $(item.element).validateEmail();
          validateElement(item);
          return;
        case 'phone':
          __passed = $(item.element).validatePhoneNumber();
          validateElement(item);
          return;
        case 'url':
          __passed = $(item.element).validateUrl();
          validateElement(item);
          return;
        case 'age':
          __passed = $(item.element).validateAge(item.min);
          validateElement(item);
          return;
        case 'checkbox':
          __passed = $(item.element).validateCheckbox();
          if (__passed) {
            validateElement(item);
          }
          return;
        case 'radio':
          __passed = $(item.element).validateRadioButtons();
          validateElement(item);
          return;
        case 'selectbox':
          __passed = $(item.element).validateSelectBox();
          validateElement(item);
          return;
        case 'password':
          __passed = $.validatePassword(item.element, item.element2, item.min);
          __errors.push({
            element: item.element,
            element2: item.element2,
            type: item.type
          });
          return;
        case 'switch':
          __passed = $(item.element).validateSwitch();
          if (__passed) {
            validateElement(item);
          }
          return;
        case 'selectlist':
          __passed = $(item.element).validateSelectList();
          if (__passed) {
            validateElement(item);
          }
        case 'multiselectlist':
          __passed = $(item.element).validateMultiSelectList();
          var inputs = undefined;
          if (__passed) {
            inputs = $(item.element).find('input[type=checkbox]');
            inputs.forEach(function(item) {
              if (item.checked) {
                convertToObject(item.name, item.value);
              }
            });
          }
      }
      if (item.type.match(/custom/)) {
        var cv = $.customValidators.filter(function(validator) {
          return validator.name === item.type;
        });
        if (cv) {
          var result = $.validateWithRegex(item.element, cv[0].regex);
          if (result) {
            var _el = $(item.element);
            convertToObject(_el[0].name, _el[0].value);
          } else {
            __errors.push({
              element: item.element,
              type: item.type
            });
            if (item.callback) item.callback();
          }
        }
      }
    });
    return {
      getErrors: function getErrors() {
        if (__errors.length) {
          return __errors;
        }
      },
      errors: function errors() {
        if (__errors.length) {
          return true;
        }
      },
      get: function get() {
        return convertObjectToJSON(__result);
      }
    };
  }
});
/**
 * ChocolateChip-UI  - Data Formatters.
 */
$.extend({
  /**
   * Format Numbers for Thousands:
   */
  formatNumber: function formatNumber(amount, separator, decimal) {
    var sep = separator || ",";
    /** 
     * Allow the user to round a float to a whole number: 
     */
    if (decimal === 0) {
      var num = Math.round(amount);
      return Number(num).toString().replace(/(?=(?:\d{3})+$)(?!^)/g, sep);
    }
    if (decimal === undefined) {
      /** 
       * Check if amount is a float: 
       */
      if (typeof amount === 'number' && amount % 1 !== 0) {
        return Number(amount).toString().replace(/\d(?=(\d{3})+\.)/g, '$&' + sep);
        /** 
         * Otherwise treat it as an integer: 
         */
      } else {
        return Number(amount).toString().replace(/(?=(?:\d{3})+$)(?!^)/g, sep);
      }
      /** 
       * If a decimal value was provided, format it to that amount: 
       */
    } else {
      return Number(amount).toFixed(decimal).replace(/\d(?=(\d{3})+\.)/g, '$&' + sep);
    }
  },
  /**
   * Return sum of numbers:
   */
  sum: function sum(arr) {
    var ret = undefined;
    if (Array.isArray(arr) && arr.length) {
      ret = arr;
    } else {
      ret = [].slice.apply(arguments);
    }
    return ret.reduce(function(a, b) {
      return a + b;
    });
  },
  /**
   * Format currency:
   */
  currency: function currency(amount, symbol, separator, decimal) {
    var sym = symbol || "$";
    var sep = separator || ",";
    var dec = decimal || 2;
    var zero = false;
    if (decimal === 0) {
      zero = true;
    } /* Private function to format amounts: */
    var formatNumber = function formatNumber(amount, sep) {
      /**
       * A decimal value of '0' means we need to round the amount off before adding in thousands separators:
       */
      if (zero) {
        var num = Math.round(amount);
        return Number(num).toString().replace(/^0+/, '').replace(/(?=(?:\d{3})+$)(?!^)/g, sep);
      } else {
        /**
         * Otherwise, we can just add the thousands separators with the decimal placement provided by the user or the default:
         */
        return Number(amount).toFixed(dec).replace(/^0+/, '').replace(/\d(?=(\d{3})+\.)/g, '$&' + sep);
      }
    };
    return sym + formatNumber(amount, sep);
  },
  /**
   * Format Time:
   */
  formatTime: function formatTime(time) {
    var temp = time.split(':');
    var temp2 = temp[0] + ':' + temp[1];
    var ampm = time.split(' ')[1];
    return temp2 + ' ' + ampm;
  },
  sortDate: function sortDate(date1, date2) {
    return new Date(date1) - new Date(date2);
  },
  /**
   * Sort Numbers:
   */
  sortNumbers: function sortNumbers(a, b) {
    return a - b;
  },
  sortNumbersDescending: function sortNumbersDescending(a, b) {
    return b - a;
  }
});
/**
 * ChocolateChip-UI - form to JSON.
 */
$.extend({
  form2JSON: function form2JSON(rootNode, delimiter) {
    rootNode = typeof rootNode === 'string' ? $(rootNode)[0] : rootNode;
    delimiter = delimiter || '.';
    var result = {};
    var arrays = {};
    var getFieldValue = function getFieldValue(fieldNode) {
      if (fieldNode.nodeName === 'INPUT') {
        if (fieldNode.type.toLowerCase() === 'radio' || fieldNode.type.toLowerCase() === 'checkbox') {
          if (fieldNode.checked) {
            return fieldNode.value;
          }
        } else {
          if (!fieldNode.type.toLowerCase().match(/button|reset|submit|image/i)) {
            return fieldNode.value;
          }
        }
      } else {
        if (fieldNode.nodeName === 'TEXTAREA') {
          return fieldNode.value;
        } else {
          if (fieldNode.nodeName === 'SELECT') {
            return getSelectedOptionValue(fieldNode);
          }
        }
      }
      return '';
    };
    var getFormValues = function getFormValues(rootNode) {
      var result = [];
      var currentNode = rootNode.firstChild;
      while (currentNode) {
        if (currentNode.nodeName.match(/INPUT|SELECT|TEXTAREA/i)) {
          result.push({
            name: currentNode.name,
            value: getFieldValue(currentNode)
          });
        } else {
          var subresult = getFormValues(currentNode);
          result = result.concat(subresult);
        }
        currentNode = currentNode.nextSibling;
      }
      return result;
    };
    var getSelectedOptionValue = function getSelectedOptionValue(selectNode) {
      var multiple = selectNode.multiple;
      if (!multiple) {
        return selectNode.value;
      }
      if (selectNode.selectedIndex > -1) {
        var _ret2 = function() {
          var result = [];
          $('option', selectNode).each(function(idx, item) {
            if (item.selected) {
              result.push(item.value);
            }
          });
          return {
            v: result
          };
        }();
        if ((typeof _ret2 === 'undefined' ? 'undefined' : _typeof(_ret2)) === "object") return _ret2.v;
      }
    };
    var formValues = getFormValues(rootNode);
    formValues.forEach(function(item) {
      var value = item.value;
      if (value !== '') {
        var name = item.name;
        var nameParts = name.split(delimiter);
        var currResult = result;
        for (var j = 0; j < nameParts.length; j++) {
          var namePart = nameParts[j];
          var arrName = undefined;
          if (namePart.indexOf('[]') > -1 && j === nameParts.length - 1) {
            arrName = namePart.substr(0, namePart.indexOf('['));
            if (!currResult[arrName]) {
              currResult[arrName] = [];
            }
            currResult[arrName].push(value);
          } else {
            if (namePart.indexOf('[') > -1) {
              arrName = namePart.substr(0, namePart.indexOf('['));
              var arrIdx = namePart.replace(/^[a-z]+\[|\]$/gi, '');
              if (!arrays[arrName]) {
                arrays[arrName] = {};
              }
              if (!currResult[arrName]) {
                currResult[arrName] = [];
              }
              if (j === nameParts.length - 1) {
                currResult[arrName].push(value);
              } else {
                if (!arrays[arrName][arrIdx]) {
                  currResult[arrName].push({});
                  arrays[arrName][arrIdx] = currResult[arrName][currResult[arrName].length - 1];
                }
              }
              currResult = arrays[arrName][arrIdx];
            } else {
              if (j < nameParts.length - 1) {
                if (!currResult[namePart]) {
                  currResult[namePart] = {};
                }
                currResult = currResult[namePart];
              } else {
                currResult[namePart] = value;
              }
            }
          }
        }
      }
    });
    return result;
  }
});
/**
 * ChocolateChip-UI - View Factory.
 */
(function() {
  var ViewErrorMessages = {
    en: {
      noDataForViewRender: "ChocolateChip-UI View Error: No data was provided for the view to render. If you want to render the view, please provide data, or redefine the view with a data source or model. Otherwise rendering will be skipped.",
      noElementForView: "ChocolateChip-UI View Error: No element was provided for the view. Please provide an element in the view initialization so that we can access it.",
      noTemplateForView: "ChocolateChip-UI View Error: No template was provided for this view. This means that you did not provide a template in the view initialization, or the element did not have any template in its markup.",
      viewElementHasNoTemplate: "ChocolateChip-UI View Error: The element for this view has no template in its markup. Either correct the element by defining a template in the element's markup, or define a template in the view's initialization.",
      noElementToSetToTemplate: "ChocolateChip-UI View Error: No element was provided to set to this view. Please provide one.",
      noTemplateToSetToView: "ChocolateChip-UI View Error: You did not provide a template to set to this view. Please provide one.",
      noEventsToAdd: "ChocolateChip-UI View Error: No event was provided to attach fo the view. Please provide an event to procede.",
      noDataToSetForView: "ChocolateChip-UI View Error: No data was provided to set for the view. Please provide some data.",
      noModelToBindToView: "ChocolateChip-UI View Error: No model was provided to bind the view to. Please provide a valid model to complete this operation.",
      viewHasNoModel: "ChocolateChip-UI View Error: Could not get this view's model because it is not bound to one. You can use `bindModel()` to bind a model to this view.",
      viewHasNoData: "ChocolateChip-UI View Error: This view has no data. Did you render it with data, or did you bind it to a model? Try using `getModel()` to see if this view is using a model.",
      viewHasNoTemplate: "ChocolateChip-UI View Error: This view has no template. Either you created it without a template, or there was some problem parsing the template. Please check how this view is set up."
    },
    es: {
      noDataForViewRender: "Hubo Error de Vista ChocolateChip-UI: : No se proporcionó datos para que la vista los utilice. Si desea renderizar la vista, proporcione datos o redefinir la vista con un valor para sus datos o un modelo de datos. De lo contrario, la vista no se renderizará.",
      noElementForView: "Hubo Error de Vista ChocolateChip-UI: : No se proporcionó ningún elemento para la vista. Por favor proporcione un elemento en la inicialización de la vista para que podamos acceder a él.",
      noTemplateForView: "Hubo Error de Vista ChocolateChip-UI: : No se proporcionó ninguna plantilla para esta vista. Esto significa que usted no proporcionó una plantilla en la vista de inicialización, o el elemento no tiene ninguna plantilla en su marcado.",
      viewElementHasNoTemplate: "Hubo Error de Vista ChocolateChip-UI: : El elemento de esta vista no tiene ninguna plantilla en su marcado. O bien corrija el elemento por definir una plantilla en el marcado del elemento, o defina una plantilla en la inicialización de la vista misma.",
      noElementToSetToTemplate: "Hubo Error de Vista ChocolateChip-UI: : No se proporcionó ningún elemento en el cual se renderizará la pantilla. Por favor proporcione un elemento.",
      noTemplateToSetToView: "Hubo Error de Vista ChocolateChip-UI: No se proporcionó una plantilla para esta vista. Por favor proporcione una plantilla.",
      noEventsToAdd: "Hubo Error de Vista ChocolateChip-UI: No se proporcionó ningún event para unir a la vista. Por favor, proporcione un evento para proceder.",
      noDataToSetForView: "Hubo Error de Vista ChocolateChip-UI: No se proporcionó datos para la vista. Por favor proporcione algunos datos.",
      noModelToBindToView: "Hubo Error de Vista ChocolateChip-UI: No se proporcionó un modelo para establecer un enlace entre él y la vista. Por favor proporcione un modelo válido para completar esta operación.",
      viewHasNoModel: "Hubo Error de Vista ChocolateChip-UI: No pudimos acceder al modelo de esta vista porque no está asociada con uno. Puede realizar esto usando `bindModel()`.",
      viewHasNoData: "Hubo Error de Vista ChocolateChip-UI: Esta vista no tiene datos. A caso no se renderizó con datos o no se asoció con ningún modelo. Trate de executar `getModel()` para averiguar si esta vista está usando un modelo.",
      viewHasNoTemplate: "Hubo Error de Vista ChocolateChip-UI: Esta vista no tiene plantilla. Ó se creó la vista sin plantilla, ó hubo algún error al procesar la plantilla. Debe chequear cómo se definó la vista."
    }
  };
  var errors = undefined;
  if ($('html').attr('lang') == 'en') errors = ViewErrorMessages.en;
  if ($('html').attr('lang') == 'es') errors = ViewErrorMessages.es;
  $.extend({ /* jshint, evil: false, validthis:true, unused:false, smarttabs: true, nonew false */
    view: {
      index: 0
    },
    helpers: {},
    defineHelper: function defineHelper(callback) {
      $.extend($.helpers, callback);
    },
    View: function View(options) {
      /**
            options = {
              element: undefined,
              template: stringTemplate,
              model: undefined,
              variable: 'whatever',
              events: [
                {
                  element: selector || 'self',
                  event: 'click',
                  callback: function() {}
                },
                {
                  element: selector2 || 'self',
                  event: 'touchstart',
                  callback: function() {}
                }
              ]
            }
            */
      /**
       * Private Properties:
       */
      var __element = undefined;
      var __origElement = undefined;
      if (!options) options = {};
      if (options && options.element) {
        __origElement = options.element;
        __element = $(options.element);
      }
      var __template = options.template;
      var __data = options.data;
      var __model = options.model;
      var __index = options.index || 1;
      var __rendered = false;
      var __variable = options.variable || 'data';
      var __events = options.events || [];
      var __startIndexFrom = options.startIndexFrom || false;
      var __re = /data-src/img;
      var __safeHTML = options.safeHTML || false;
      var __es6Template = options.es6Template || false;
      var __noTemplate = options.noTemplate || false;
      var __id = $.uuid();
      /**
       * Private Functions:
       */
      var parsedTemplate = undefined;
      var parseView = function parseView(template, variable) {
        if (!template) {
          console.error(errors.viewElementHasNoTemplate);
          return;
        }
        var interpolate = /\{=([\s\S]+?)\}/img;
        variable = variable || 'data';
        template.replace("'", "\'"); /* jshint ignore:start */
        var Template = new Function(variable, "var p=[];" + "p.push('" + template.replace(/[\r\t\n]/g, " ").split("'").join("\\'").replace(interpolate, "',$1,'")
          /**
           * Executable:
           */
          .split('{{').join("');").split('}}').join("p.push('") + "');" + "return p.join('');");
        return Template; /* jshint ignore:end */
      };
      /**
       * Binding any events provided in View options: 
       */
      var handleEvents = function handleEvents() {
        if (!__element) return;
        if (__events.length) {
          __events.forEach(function(item) {
            if (item && item.element === 'self' || item && !item.element) {
              __element.on(item.event, item.callback);
            } else {
              __element.on(item.event, item.element, item.callback);
            }
          });
        }
      };
      /**
       * Get template from element: 
       */
      var extractTemplate = function extractTemplate() {
        if (!__element || !__element.size() || __noTemplate) {
          return;
        }
        if (__es6Template) return;
        if (!__template) {
          if (__element.children()[0] && __element.children().eq(0).is('script')) {
            __template = __element.children('script').html();
            __element.empty();
          } else if (__element.children()[0] && __element.children().eq(0).is('template')) {
            __template = __element.children('template').html();
            __element.empty();
          } else if (!__element[0].childNodes.length) {
            console.error(errors.viewElementHasNoTemplate);
            return;
          } else {
            if (__element[0] && __element[0].childNodes.length) {
              if (!__template) __template = __element.html();
            }
            __element.empty();
          }
          if (__template) __template = __template.replace(__re, 'src');
          parseView(__template, __variable);
        } else {
          __template = __template.replace(__re, 'src');
          parseView(__template, __variable);
        }
      };
      parsedTemplate = extractTemplate();
      if (__events) {
        handleEvents(__events);
      }
      /**
       * Return closure to encapsulate methods & data:
       */
      var view = {};
      var data = undefined;
      var bindToModel = function bindToModel(model, view) {
        if (model) {
          model.boundViews.push(view);
        }
      };
      bindToModel(__model, view);
      $.extend(view, {
        id: __id,
        render: function render(data, append) {
          if (!__element) {
            if ($.supressErrorMessages) return;
            console.error(errors.noElementForView);
            return;
          }

          function escapeNumber(arg) {
            if ($.type(arg) === 'number') {
              return String(arg);
            } else {
              return arg;
            }
          }
          window.escapeNumber = escapeNumber;
          data = escapeNumber(data);
          __data = escapeNumber(__data);
          if (!data && !__data && !__model) {
            if ($.supressErrorMessages) return;
            console.error(errors.noDataForViewRender);
            return;
          }
          if (!data && __data) {
            data = __data;
          } else if (!data && __model) {
            data = __model.get();
          }
          /**
           * Private functions for the render method.
           * These need access to the returned instance.
           */
          /**
           * Uncloaks, checks index and loops data: 
           */
          var renderIterableData = function renderIterableData(data) {
            var Data = data ? data : __data;
            __element.removeClass('cloak');
            if (__element.data('index')) {
              __index = Number(__element.data('index'));
              $.view.index = Number(__element.data('index'));
            } else {
              __index = 1;
              $.view.index = 1;
            }
            interateModelToTemplate(Data);
          };
          /**
           * Check extracted template: 
           */
          if (__template && $.type(__template) === 'string') {
            parsedTemplate = parseView(__template, __variable);
          }
          /**
           * If the user supplied data to render:
           * If it's an array:
           */
          if ($.type(data) === 'array') {
            $.view.index = __startIndexFrom || 1;
            if (!append) __element.empty();
            data.forEach(function(item) {
              if (!__safeHTML) {
                item = $.escapeHTML(item);
              }
              if (!parsedTemplate && !__noTemplate) {
                if ($.supressErrorMessages) return;
                console.error(errors.viewElementHasNoTemplate);
                return;
              }
              __element.append(parsedTemplate(item)); // jshint ignore:line
              $.view.index += 1;
              __index += 1;
            });
            __rendered = true;
            $.view.index = 0;
            __element.removeClass('cloak');
            return;
            /**
             * Else if it is an object: 
             */
          } else if ($.type(data) === 'object' || $.type(data) === 'string' || $.type(data) === 'number') {
            if (!parsedTemplate) {
              if ($.supressErrorMessages) return;
              console.error(errors.viewElementHasNoTemplate);
              return;
            }
            $.view.index = __startIndexFrom || 1;
            if (!append) __element.empty();
            if (!__safeHTML) {
              data = $.escapeHTML(data);
            }
            __element.append(parsedTemplate(data)); // jshint ignore:line
            __element.removeClass('cloak');
            __rendered = true;
            return;
          }
        },
        empty: function empty() {
          if (!__element) {
            if ($.supressErrorMessages) return;
            console.error(errors.noElementForView);
            return;
          }
          __element.empty();
        },
        resetIndex: function resetIndex() {
          if (!__element) {
            if ($.supressErrorMessages) return;
            console.error(errors.noElementForView);
            return;
          }
          __index = 0;
          __element.data('index', 0);
          $.view.index = 0;
        },
        startIndexFrom: function startIndexFrom(number) {
          if (!__element) {
            if ($.supressErrorMessages) return;
            console.error(errors.noElementForView);
            return;
          }
          if (number === 0 || number && !isNaN(number)) {
            __startIndexFrom = number;
            $.view.index = number;
            view.render();
          }
        },
        getElement: function getElement() {
          if (!__element) {
            if ($.supressErrorMessages) return;
            console.error(errors.noElementForView);
            return;
          } else {
            return __element;
          }
        },
        setElement: function setElement(element) {
          if (!__element) {
            if ($.supressErrorMessages) return;
            console.error(errors.noElementForView);
            return;
          }
          __element = $(element);
          $(element).empty();
          handleEvents();
        },
        getTemplate: function getTemplate() {
          if (!__template) {
            if ($.supressErrorMessages) return;
            console.error(errors.viewHasNoTemplate);
            return;
          } else {
            return __template;
          }
        },
        setTemplate: function setTemplate(template) {
          if (!template) {
            if ($.supressErrorMessages) return;
            console.error(errors.noTemplateToSetToView);
            return;
          } else {
            __template = template.replace(__re, 'src');
            parsedTemplate = parseView(__template);
          }
        },
        bindModel: function bindModel(model) {
          if (!model) {
            if ($.supressErrorMessages) return;
            console.error(errors.noModelToBindToView);
            return;
          }
          this.unbindModel(__model);
          __model = model;
          bindToModel(__model, view);
        },
        unbindModel: function unbindModel() {
          if (__model) {
            var pos = __model.boundViews.findIndex(function(view) {
              return view.id = __id;
            });
            __model.boundViews.splice(pos, 1);
          }
        },
        getModel: function getModel() {
          if (__model) {
            return __model;
          } else {
            if ($.supressErrorMessages) return;
            console.error(errors.viewHasNoModel);
          }
        },
        isRendered: function isRendered() {
          return __rendered;
        },
        isEmpty: function isEmpty() {
          if (!__element) {
            if ($.supressErrorMessages) return;
            console.error(errors.noElementForView);
            return;
          }
          if (__element[0].children.length) {
            return false;
          } else {
            return true;
          }
        },
        addEvent: function addEvent(events, replace) {
          if (!events) {
            if ($.supressErrorMessages) return;
            console.error(errors.noEventsToAdd);
            return;
          }
          if (replace) {
            __events = events & events.length ? events : [events];
          } else {
            if (events && events.length) {
              events.forEach(function(event) {
                __events.push(event);
              });
            } else if (events) {
              __events.push(events);
            }
          }
          handleEvents();
        },
        /**
         * options: event, element (for a delegated event), callback
         */
        off: function off(event, element, callback) {
          __element.off(event, element, callback);
        },
        safeHTML: function safeHTML(boolean) {
          if (boolean) {
            __safeHTML = true;
          }
        },
        isEscapingHTML: function isEscapingHTML() {
          return !__safeHTML;
        },
        getData: function getData() {
          if (__data) {
            return __data;
          } else {
            if ($.supressErrorMessages) return;
            console.error(errors.viewHasNoData);
            return;
          }
        },
        setData: function setData(data) {
          if (!data) {
            if ($.supressErrorMessages) return;
            console.error(errors.noDataToSetForView);
            return;
          }
          if (data) {
            __data = data;
          }
        },
        mount: function mount() {
          __element = $(__origElement);
          handleEvents();
        }
      });
      return view;
    }
  });
})();
/**
 * ChocolateChip-UI - Component Factory.
 */
$.extend({
  Component: function Component(options) {
    var comp = $.Component;
    $[options.name] = function() {
      comp.options = options;
      delete comp.options.name;
      return $.View(comp.options);
    };
  }
});
/**
 * Promise Polyfill.
 */
(function() {
  /**
   * Define polyfill for ES6 Promises: 
   */
  var extend = undefined;
  var cycle = undefined;
  var queue = undefined;
  extend = function extend(obj, name, val, config) {
    return Object.defineProperty(obj, name, {
      value: val,
      writable: true,
      configurable: config !== false
    });
  };
  queue = function() {
    var first = undefined;
    var last = undefined;
    var item = undefined;

    function Item(func, self) {
      this.func = func;
      this.self = self;
      this.next = undefined;
    }
    return {
      add: function add(func, self) {
        item = new Item(func, self);
        if (last) {
          last.next = item;
        } else {
          first = item;
        }
        last = item;
        item = undefined;
      },
      unshift: function unshift() {
        var f = first;
        first = last = cycle = undefined;
        while (f) {
          f.func.call(f.self);
          f = f.next;
        }
      }
    };
  }();

  function schedule(func, self) {
    queue.add(func, self);
    if (!cycle) {
      cycle = setTimeout(queue.unshift);
    }
  }
  /**
   * Check that Promise is thenable: 
   */
  function isThenable(obj) {
    var _then = undefined;
    var obj_type = typeof obj === 'undefined' ? 'undefined' : _typeof(obj);
    if (obj !== null && (obj_type === "object" || obj_type === "function")) {
      _then = obj.then;
    }
    return typeof _then === "function" ? _then : false;
  }

  function notify() {
    for (var i = 0; i < this.chain.length; i++) {
      notifyIsolated(this, this.state === 1 ? this.chain[i].success : this.chain[i].failure, this.chain[i]);
    }
    this.chain.length = 0;
  }

  function notifyIsolated(self, callback, chain) {
    var ret = undefined;
    var _then = undefined;
    try {
      if (callback === false) {
        chain.reject(self.msg);
      } else {
        if (callback === true) {
          ret = self.msg;
        } else {
          ret = callback.call(undefined, self.msg);
        }
        if (ret === chain.promise) {
          chain.reject(new TypeError("Promise-chain cycle"));
        } else if (_then = isThenable(ret)) { // jshint ignore:line
          _then.call(ret, chain.resolve, chain.reject);
        } else {
          chain.resolve(ret);
        }
      }
    } catch (err) {
      chain.reject(err);
    }
  }

  function resolve(msg) {
    var _then = undefined;
    var deferred = undefined;
    var self = this;
    if (self.triggered) {
      return;
    }
    self.triggered = true;
    if (self.deferred) {
      self = self.deferred;
    }
    try {
      if (_then = isThenable(msg)) { // jshint ignore:line
        schedule(function() {
          var deferred_wrapper = new MakeDeferred(self);
          try {
            _then.call(msg, function() {
              resolve.apply(deferred_wrapper, arguments);
            }, function() {
              reject.apply(deferred_wrapper, arguments);
            });
          } catch (err) {
            reject.call(deferred_wrapper, err);
          }
        });
      } else {
        self.msg = msg;
        self.state = 1;
        if (self.chain.length > 0) {
          schedule(notify, self);
        }
      }
    } catch (err) {
      reject.call(new MakeDeferred(self), err);
    }
  }

  function reject(msg) {
    var self = this;
    if (self.triggered) {
      return;
    }
    self.triggered = true;
    if (self.deferred) {
      self = self.deferred;
    }
    self.msg = msg;
    self.state = 2;
    if (self.chain.length > 0) {
      schedule(notify, self);
    }
  }

  function iteratePromises(Constructor, arr, resolver, rejecter) {
    for (var idx = 0; idx < arr.length; idx++) {
      (function IIFE(idx) {
        Constructor.resolve(arr[idx]).then(function(msg) {
          resolver(idx, msg);
        }, rejecter);
      })(idx);
    }
  }

  function MakeDeferred(self) {
    this.deferred = self;
    this.triggered = false;
  }

  function Deferred(self) {
    this.promise = self;
    this.state = 0;
    this.triggered = false;
    this.chain = [];
    this.msg = undefined;
  }

  function Promise(executor) {
    if (typeof executor !== "function") {
      throw new TypeError("Not a function");
    }
    if (this.isValidPromise !== 0) {
      throw new TypeError("Not a promise");
    }
    /**
     * Indicate the Promise is initialized:
     */
    this.isValidPromise = 1;
    var deferred = new Deferred(this);
    this.then = function(success, failure) {
      var obj = {
        success: typeof success === "function" ? success : true,
        failure: typeof failure === "function" ? failure : false
      };
      /**
       * `.then()` can be used against a different promise constructor for making a chained promise. 
       */
      obj.promise = new this.constructor(function extractChain(resolve, reject) {
        if (typeof resolve !== "function" || typeof reject !== "function") {
          throw new TypeError("Not a function");
        }
        obj.resolve = resolve;
        obj.reject = reject;
      });
      deferred.chain.push(obj);
      if (deferred.state !== 0) {
        schedule(notify, deferred);
      }
      return obj.promise;
    };
    this.catch = function(failure) {
      return this.then(undefined, failure);
    };
    try {
      executor.call(undefined, function(msg) {
        resolve.call(deferred, msg);
      }, function(msg) {
        reject.call(deferred, msg);
      });
    } catch (err) {
      reject.call(deferred, err);
    }
  }
  var PromisePrototype = extend({}, "constructor", Promise, false);
  extend(Promise, "prototype", PromisePrototype, false);
  /**
   * Check if Promise is initialized: 
   */
  extend(PromisePrototype, "isValidPromise", 0, false);
  extend(Promise, "resolve", function(msg) {
    var Constructor = this;
    /**
     * Make sure it is a valide Promise: 
     */
    if (msg && (typeof msg === 'undefined' ? 'undefined' : _typeof(msg)) === "object" && msg.isValidPromise === 1) {
      return msg;
    }
    return new Constructor(function executor(resolve, reject) {
      if (typeof resolve !== "function" || typeof reject !== "function") {
        throw new TypeError("Not a function");
      }
      resolve(msg);
    });
  });
  extend(Promise, "reject", function(msg) {
    return new this(function executor(resolve, reject) {
      if (typeof resolve !== "function" || typeof reject !== "function") {
        throw new TypeError("Not a function");
      }
      reject(msg);
    });
  });
  extend(Promise, "all", function(arr) {
    var Constructor = this;
    /**
     * Make sure argument is an array: 
     */
    if (Object.prototype.toString.call(arr) !== "[object Array]") {
      return Constructor.reject(new TypeError("Not an array"));
    }
    if (arr.length === 0) {
      return Constructor.resolve([]);
    }
    return new Constructor(function executor(resolve, reject) {
      if (typeof resolve !== "function" || typeof reject !== "function") {
        throw new TypeError("Not a function");
      }
      var len = arr.length;
      var msgs = new Array(len);
      var count = 0;
      iteratePromises(Constructor, arr, function resolver(idx, msg) {
        msgs[idx] = msg;
        if (++count === len) {
          resolve(msgs);
        }
      }, reject);
    });
  });
  extend(Promise, "race", function(arr) {
    var Constructor = this;
    /**
     * Make sure argument is an array: 
     */
    if (Object.prototype.toString.call(arr) !== "[object Array]") {
      return Constructor.reject(new TypeError("Not an array"));
    }
    return new Constructor(function executor(resolve, reject) {
      if (typeof resolve !== "function" || typeof reject !== "function") {
        throw new TypeError("Not a function");
      }
      iteratePromises(Constructor, arr, function resolver(idx, msg) {
        resolve(msg);
      }, reject);
    });
  });
  /**
   * If native Promise exists in window, do not use this. 
   */
  if ("Promise" in window && "resolve" in window.Promise && "reject" in window.Promise && "all" in window.Promise && "race" in window.Promise) {
    return;
  } else {
    /**
     * Otherwise do use this: 
     */
    return window.Promise = Promise;
  }
})();
/**
 * Fetch polyfill
 */
(function() {
  /**
   *
   * JSONP with API like fetch.
   */
  $.extend({ /* Container for jsonp methods: */
    JSONPCallbacks: [],
    /* JSONP method: */ jsonp: function jsonp(url, opts) {
      var settings = {
        timeout: 2000,
        callbackName: 'callback',
        clear: true
      };
      if (opts) {
        $.extend(settings, opts);
      }
      /** 
       * Method to create callback: 
       */
      function generateCallbackName() {
        var callbackName = settings.callbackName + '_' + ($.JSONPCallbacks.length + 1);
        $.JSONPCallbacks.push(callbackName);
        return callbackName;
      }
      var callbackName = generateCallbackName();
      /** 
       * Create and return Promise with result from request: 
       */
      return new Promise(function(resolve, reject) {
        var timeout = undefined;
        window.jsonp = window.jsonp || {};
        window.jsonp[callbackName] = function(response) {
          resolve({
            ok: true,
            json: function json() {
              return Promise.resolve(response);
            }
          });
          if (timeout) {
            clearTimeout(timeout);
          }
        };
        /** 
         * Create script tag: 
         */
        var script = document.createElement('script');
        script.async = true;
        script.defer = true;
        script.src = url + (url.indexOf('?') > -1 ? '&' : '?') + 'callback=jsonp.' + callbackName;
        document.body.appendChild(script);
        /** 
         * Delete script tag: 
         */
        setTimeout(function() {
          script.parentNode.removeChild(script);
        });
        /** 
         * Clear JSONP methods from window: 
         */
        if (settings.clear) {
          var pos = $.JSONPCallbacks.indexOf(callbackName);
          $.JSONPCallbacks.splice(pos, 1);
        }
        /** 
         * Handle timeout: 
         */
        timeout = setTimeout(function() {
          reject(new Error('JSONP request to ' + url + ' timed out'));
        }, settings.timeout);
      });
    },
    /**
     * Helper function for fetch Promises.
     * Returns the respons as parsed JSON.
     * Usage: .then($.json)
     */
    json: function json(response) {
      return response.json();
    }
  });
  if (window && window.fetch) {
    return;
  }
  var self = window;

  function normalizeName(name) {
    if (typeof name !== 'string') {
      name = String(name);
    }
    if (/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(name)) {
      throw new TypeError('Invalid character in header field name');
    }
    return name.toLowerCase();
  }

  function normalizeValue(value) {
    if (typeof value !== 'string') {
      value = String(value);
    }
    return value;
  }

  function Headers(headers) {
    this.map = {};
    if (headers instanceof Headers) {
      headers.forEach(function(value, name) {
        this.append(name, value);
      }, this);
    } else if (headers) {
      Object.getOwnPropertyNames(headers).forEach(function(name) {
        this.append(name, headers[name]);
      }, this);
    }
  }
  Headers.prototype.append = function(name, value) {
    name = normalizeName(name);
    value = normalizeValue(value);
    var list = this.map[name];
    if (!list) {
      list = [];
      this.map[name] = list;
    }
    list.push(value);
  };
  Headers.prototype['delete'] = function(name) {
    delete this.map[normalizeName(name)];
  };
  Headers.prototype.get = function(name) {
    var values = this.map[normalizeName(name)];
    return values ? values[0] : null;
  };
  Headers.prototype.getAll = function(name) {
    return this.map[normalizeName(name)] || [];
  };
  Headers.prototype.has = function(name) {
    return this.map.hasOwnProperty(normalizeName(name));
  };
  Headers.prototype.set = function(name, value) {
    this.map[normalizeName(name)] = [normalizeValue(value)];
  };
  Headers.prototype.forEach = function(callback, thisArg) {
    Object.getOwnPropertyNames(this.map).forEach(function(name) {
      this.map[name].forEach(function(value) {
        callback.call(thisArg, value, name, this);
      }, this);
    }, this);
  };

  function consumed(body) {
    if (body.bodyUsed) {
      return Promise.reject(new TypeError('Already read'));
    }
    body.bodyUsed = true;
  }

  function fileReaderReady(reader) {
    return new Promise(function(resolve, reject) {
      reader.onload = function() {
        resolve(reader.result);
      };
      reader.onerror = function() {
        reject(reader.error);
      };
    });
  }

  function readBlobAsArrayBuffer(blob) {
    var reader = new FileReader();
    reader.readAsArrayBuffer(blob);
    return fileReaderReady(reader);
  }

  function readBlobAsText(blob) {
    var reader = new FileReader();
    reader.readAsText(blob);
    return fileReaderReady(reader);
  }
  var support = {
    blob: 'FileReader' in self && 'Blob' in self && function() {
      try {
        new Blob();
        return true;
      } catch (e) {
        return false;
      }
    }(),
    formData: 'FormData' in self,
    arrayBuffer: 'ArrayBuffer' in self
  };

  function Body() {
    this.bodyUsed = false;
    this._initBody = function(body) {
      this._bodyInit = body;
      if (typeof body === 'string') {
        this._bodyText = body;
      } else if (support.blob && Blob.prototype.isPrototypeOf(body)) {
        this._bodyBlob = body;
      } else if (support.formData && FormData.prototype.isPrototypeOf(body)) {
        this._bodyFormData = body;
      } else if (!body) {
        this._bodyText = '';
      } else if (support.arrayBuffer && ArrayBuffer.prototype.isPrototypeOf(body)) {
        /** 
         * Only support ArrayBuffers for POST method.
         * Receiving ArrayBuffers happens via Blobs, instead.
         */
      } else {
        throw new Error('unsupported BodyInit type');
      }
      if (!this.headers.get('content-type')) {
        if (typeof body === 'string') {
          this.headers.set('content-type', 'text/plain;charset=UTF-8');
        } else if (this._bodyBlob && this._bodyBlob.type) {
          this.headers.set('content-type', this._bodyBlob.type);
        }
      }
    };
    if (support.blob) {
      this.blob = function() {
        var rejected = consumed(this);
        if (rejected) {
          return rejected;
        }
        if (this._bodyBlob) {
          return Promise.resolve(this._bodyBlob);
        } else if (this._bodyFormData) {
          throw new Error('could not read FormData body as blob');
        } else {
          return Promise.resolve(new Blob([this._bodyText]));
        }
      };
      this.arrayBuffer = function() {
        return this.blob().then(readBlobAsArrayBuffer);
      };
      this.text = function() {
        var rejected = consumed(this);
        if (rejected) {
          return rejected;
        }
        if (this._bodyBlob) {
          return readBlobAsText(this._bodyBlob);
        } else if (this._bodyFormData) {
          throw new Error('could not read FormData body as text');
        } else {
          return Promise.resolve(this._bodyText);
        }
      };
    } else {
      this.text = function() {
        var rejected = consumed(this);
        return rejected ? rejected : Promise.resolve(this._bodyText);
      };
    }
    if (support.formData) {
      this.formData = function() {
        return this.text().then(decode);
      };
    }
    this.json = function() {
      return this.text().then(JSON.parse);
    };
    return this;
  }
  /** 
   * HTTP methods whose capitalization should be normalized. 
   */
  var methods = ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT'];

  function normalizeMethod(method) {
    var upcased = method.toUpperCase();
    return methods.indexOf(upcased) > -1 ? upcased : method;
  }

  function Request(input, options) {
    options = options || {};
    var body = options.body;
    if (Request.prototype.isPrototypeOf(input)) {
      if (input.bodyUsed) {
        throw new TypeError('Already read');
      }
      this.url = input.url;
      this.credentials = input.credentials;
      if (!options.headers) {
        this.headers = new Headers(input.headers);
      }
      this.method = input.method;
      this.mode = input.mode;
      if (!body) {
        body = input._bodyInit;
        input.bodyUsed = true;
      }
    } else {
      this.url = input;
    }
    this.credentials = options.credentials || this.credentials || 'omit';
    if (options.headers || !this.headers) {
      this.headers = new Headers(options.headers);
    }
    this.method = normalizeMethod(options.method || this.method || 'GET');
    this.mode = options.mode || this.mode || null;
    this.referrer = null;
    if ((this.method === 'GET' || this.method === 'HEAD') && body) {
      throw new TypeError('Body not allowed for GET or HEAD requests');
    }
    this._initBody(body);
  }
  Request.prototype.clone = function() {
    return new Request(this);
  };

  function decode(body) {
    var form = new FormData();
    body.trim().split('&').forEach(function(bytes) {
      if (bytes) {
        var split = bytes.split('=');
        var name = split.shift().replace(/\+/g, ' ');
        var value = split.join('=').replace(/\+/g, ' ');
        form.append(decodeURIComponent(name), decodeURIComponent(value));
      }
    });
    return form;
  }

  function headers(xhr) {
    var head = new Headers();
    var pairs = xhr.getAllResponseHeaders().trim().split('\n');
    pairs.forEach(function(header) {
      var split = header.trim().split(':');
      var key = split.shift().trim();
      var value = split.join(':').trim();
      head.append(key, value);
    });
    return head;
  }
  Body.call(Request.prototype);

  function Response(bodyInit, options) {
    if (!options) {
      options = {};
    }
    this.type = 'default';
    this.status = options.status;
    this.ok = this.status >= 200 && this.status < 300;
    this.statusText = options.statusText;
    this.headers = options.headers instanceof Headers ? options.headers : new Headers(options.headers);
    this.url = options.url || '';
    this._initBody(bodyInit);
  }
  Body.call(Response.prototype);
  Response.prototype.clone = function() {
    return new Response(this._bodyInit, {
      status: this.status,
      statusText: this.statusText,
      headers: new Headers(this.headers),
      url: this.url
    });
  };
  Response.error = function() {
    var response = new Response(null, {
      status: 0,
      statusText: ''
    });
    response.type = 'error';
    return response;
  };
  var redirectStatuses = [301, 302, 303, 307, 308];
  Response.redirect = function(url, status) {
    if (redirectStatuses.indexOf(status) === -1) {
      throw new RangeError('Invalid status code');
    }
    return new Response(null, {
      status: status,
      headers: {
        location: url
      }
    });
  };
  self.Headers = Headers;
  self.Request = Request;
  self.Response = Response;
  self.fetch = function(input, init) {
    return new Promise(function(resolve, reject) {
      var request = undefined;
      if (Request.prototype.isPrototypeOf(input) && !init) {
        request = input;
      } else {
        request = new Request(input, init);
      }
      var xhr = new XMLHttpRequest();

      function responseURL() {
        if ('responseURL' in xhr) {
          return xhr.responseURL;
        } /* Avoid security warnings on getResponseHeader when not allowed by CORS */
        if (/^X-Request-URL:/m.test(xhr.getAllResponseHeaders())) {
          return xhr.getResponseHeader('X-Request-URL');
        }
        return;
      }
      xhr.onload = function() {
        var options = {
          status: xhr.status,
          statusText: xhr.statusText,
          headers: headers(xhr),
          url: responseURL()
        };
        var body = 'response' in xhr ? xhr.response : xhr.responseText;
        resolve(new Response(body, options));
      };
      xhr.onerror = function() {
        reject(new TypeError('Network request failed'));
      };
      xhr.open(request.method, request.url, true);
      if (request.credentials === 'include') {
        xhr.withCredentials = true;
      }
      if ('responseType' in xhr && support.blob) {
        xhr.responseType = 'blob';
      }
      request.headers.forEach(function(value, name) {
        xhr.setRequestHeader(name, value);
      });
      xhr.send(typeof request._bodyInit === 'undefined' ? null : request._bodyInit);
    });
  };
  self.fetch.polyfill = true;
})();
/** 
 * Array extras for managing collections of objects.
 * Provides the following methods: find, findIndex,
 * pluck, difference, intersection, merge, unique.
 */
if (!Array.prototype.find) {
  $.extend(Array.prototype, {
    find: function find(predicate) {
      if (this == null) {
        throw new TypeError('Array.prototype.find called on null or undefined');
      }
      if (typeof predicate !== 'function') {
        throw new TypeError('predicate must be a function');
      }
      var list = Object(this);
      var length = list.length >>> 0;
      var thisArg = arguments[1];
      var value = undefined;
      for (var i = 0; i < length; i++) {
        value = list[i];
        if (predicate.call(thisArg, value, i, list)) {
          return value;
        }
      }
      return undefined;
    }
  });
}
if (!Array.prototype.findIndex) {
  $.extend(Array.prototype, {
    findIndex: function findIndex(predicate) {
      if (this === null) {
        throw new TypeError('Array.prototype.findIndex called on null or undefined');
      }
      if (typeof predicate !== 'function') {
        throw new TypeError('predicate must be a function');
      }
      var list = Object(this);
      var length = list.length >>> 0;
      var thisArg = arguments[1];
      var value = undefined;
      for (var i = 0; i < length; i++) {
        value = list[i];
        if (predicate.call(thisArg, value, i, list)) {
          return i;
        }
      }
      return -1;
    }
  });
}
if (!Array.prototype.pluck) {
  $.extend(Array.prototype, {
    pluck: function pluck(p) {
      return this.map(function(prop) {
        return prop[p];
      });
    }
  });
}
if (!Array.prototype.difference) {
  $.extend(Array.prototype, {
    difference: function difference(a) {
      return this.filter(function(after) {
        return !a.reduce(function(found, before) {
          if (!found) {
            found = true;
            for (var key in before) {
              if (before.hasOwnProperty(key)) {
                found = found && before[key] === after[key];
              }
            }
          }
          return found;
        }, false);
      });
    }
  });
}
if (!Array.prototype.intersection) {
  $.extend(Array.prototype, {
    intersection: function intersection(array) {
      var self = this;
      var arr1 = self.difference(array);
      var arr2 = array.difference(this);
      var totalDiff = arr1.concat(arr2);
      var total = self.concat(array);
      return total.difference(totalDiff).unique();
    }
  });
}
if (!Array.prototype.mixin) {
  $.extend(Array.prototype, {
    mixin: function mixin(array) {
      return this.unique(this.concate(array));
    }
  });
}
if (!Array.prototype.unique) {
  $.extend(Array.prototype, {
    unique: function unique() {
      var len = this.length;
      var obj = {};
      var ret = [];
      for (var i = 0; i < len; i++) {
        var arrayItem = JSON.stringify(this[i]);
        var arrayItemValue = this[i];
        if (obj[arrayItem] === undefined) {
          ret.push(arrayItemValue);
          obj[arrayItem] = 1;
        } else {
          obj[arrayItem]++;
        }
      }
      return ret;
    }
  });
}
/**
 * ChocolateChip-UI Model Factory.
 */
(function() {
  var _en, _es;
  var ModelErrorMessages = {
    en: (_en = {
      noPropertyOrDataError: "ChocolateChip-UI Model Error: No property or data were provided to set on the model.",
      noPropertyToSet: "ChocolateChip-UI Model Error: No data was provided to set on the model's property.",
      noPropertyToDelete: "ChocolateChip-UI Model Error: No property was provided to delete from the model.",
      noObjectToMerge: "ChocolateChip-UI Model Error: No object was provided to merge into the model's data.",
      incorrectDataForMerging: "ChocolateChip-UI Model Error: An incorrect type of data was provided for merging into the model. You must use a proper object for this model.",
      noObjForMixin: "ChocolateChip-UI Model Error: No object was passed to the mixin. Please provide one.",
      noCallbackForModelOn: "ChocolateChip-UI Model Error: No callback was provided for the model `on` event. Without it the event cannot work. Please provide one.",
      noEventForModelOn: "ChocolateChip-UI Model Error: No event was provided for the model's `on` handler. Without an event the handler cannot work. Please provide one an event and a callback to handle the event.",
      noEventForModelTrigger: "ChocolateChip-UI Model Error: No event was provided for the model trigger. Without it no event can be triggered. Please provide one.",
      noPosForEventDeletion: "ChocolateChip-UI Model Error: No position was provided for the callback to be deleted from the model events. Please provide one.",
      noPosForPropAt: "ChocolateChip-UI Model Error: No position was provided for getting a property on the model's collection. Please provide one.",
      noPropForPropAt: "ChocolateChip-UI Model Error: No property was provided. Without one we cannot get the property from the model collection. Please provide a property and the position in the collection to get it.",
      noValForPropEquals: "ChocolateChip-UI Model Error: No value was provided to use for getting an object property. Please provide one.",
      noPropForPropEquals: "ChocolateChip-UI Model Error: No property or value was provided. Without them we cannot get an object whose property equals some value in this model.",
      noPosForSetPropAt: "ChocolateChip-UI Model Error: No position was provided for setting a property in the model collection. Please provide one.",
      noValueForSetPropAt: "ChocolateChip-UI Model Error: No value or position was provided for setting an object by property in the model collection. Please provide a value and a position.",
      noPropForSetPropAt: "ChocolateChip-UI Model Error: No property, value or position were provided for setting the value of an object in the model collection. Please provide a property, value and position to set on the model.",
      noValueForPropEquals: "ChocolateChip-UI Model Error: No value was provided. With a value, we cannot find a matching object in the model collection. Please provide one"
    }, _defineProperty(_en, 'noPropForPropEquals', "ChocolateChip-UI Model Error: No property or value were provided. Without these we cannot find a matching object in the model collection. Please provide both of them."), _defineProperty(_en, 'noDataToPushToModel', "ChocolateChip-UI Model Error: No data was provided to push onto the model collection."), _defineProperty(_en, 'noDataForShiftToModel', "ChocolateChip-UI Model Error: No data was provided to insert at the beginning of the model collection."), _defineProperty(_en, 'noEndForModelSlice', "ChocolateChip-UI Model Error: No end value was provided to slice the model collection. Please provide a numeral value."), _defineProperty(_en, 'noStartModelForSlice', "ChocolateChip-UI Model Error: No start value was provided for slicing the model collection. Please provide both a start and end numeral value so that we can slice the model collection for you."), _defineProperty(_en, 'noEndForModelSplice', "ChocolateChip-UI Model Error: No end position was provided to splice the model collection. Please provide one."), _defineProperty(_en, 'noStartForModelSplice', "ChocolateChip-UI Model Error: No start position was provided for splicing the model collection. Please provide a start and end position for splicing the model collection."), _defineProperty(_en, 'noDataToInsertInModel', "ChocolateChip-UI Model Error: No data was provided to insert into the model collection. Was expecting an object, but found nothing. Please provide some an object of data."), _defineProperty(_en, 'noPosToInserInModel', "ChocolateChip-UI Model Error: No position was provided to insert data into the model collection. Please provide a position and some data to insert in the model colleciton."), _defineProperty(_en, 'noPropForPlucking', "ChocolateChip-UI Model Error: No property was provided to pluck from the model collection. Please provide a property."), _defineProperty(_en, 'noCallbackForModelFind', "ChocolateChip-UI Model Error: No callback was provided as an argument for the find on the model collection. Please provide one."), _defineProperty(_en, 'noCallbackForIndexOf', "ChocolateChip-UI Model Error: No callback was provided for finding the index of an object in the model collection. Please provide one."), _defineProperty(_en, 'noDataToConcat', "ChocolateChip-UI Model Error: No data was provided to concat to this model. Did you forget to provide the data?"), _defineProperty(_en, 'noPropsForSortBy', "ChocolateChip-UI Model Error: No property was provided for sorting. Without a property we cannot sort."), _defineProperty(_en, 'noEventForEventDeletion', "ChocolateChip-UI Model Error: No event was provided to delete the callback for this model. Please provide both and event and an array position for the callback. An event can have more than one callback registered to it."), _defineProperty(_en, 'noCallbackForForEach', "ChocolateChip-UI Model Error: No callback was provided for the forEach method. This is required."), _defineProperty(_en, 'noDataToReplaceInModel', "ChocolateChip-UI Model Error: No data was provided to replace the data in the model. If you want to do so, please provide some data to complete this operation. Otherwise, if you are trying to empty the model, use `purge()`."), _defineProperty(_en, 'modelHasNoDataToReturn', "ChocolateChip-UI Model Error: This model has no data associated with it. Perhaps you forgot to give it any data when you created it."), _en),
    es: (_es = {
      noPropertyOrDataError: "Hubo Error de Modelo ChocolateChip-UI: No se proporcionó ninguna propiedad ni datos para establecer el valor del modelo.",
      noPropertyToSet: "Hubo Error de Modelo ChocolateChip-UI: No se proporcionó ningunos datos para establecer el valor de una propiedad del modelo.",
      noPropertyToDelete: "Hubo Error de Modelo ChocolateChip-UI: No se proporcionó ninguna propiedad para eliminar del modelo.",
      noObjectToMerge: "Hubo Error de Modelo ChocolateChip-UI: No se proporcionó objeto de fundirse en los datos del modelo.",
      incorrectDataForMerging: "Hubo Error de Modelo ChocolateChip-UI: Se proporcionó un tipo incorrecto de los datos con el fin de fundirse en el modelo. Debe utilizar un objeto adecuado para este modelo.",
      noObjForMixin: "Hubo Error de Modelo ChocolateChip-UI: No se proporcionó ningún objeto al mixin. Por favor proporcione uno.",
      noCallbackForModelOn: "Hubo Error de Modelo ChocolateChip-UI: No se proporcionó ninguna función callback para el event `on` del modelo. Sin ella el evento no puede funcionar. Por favor proporcione una.",
      noEventForModelOn: "Hubo Error de Modelo ChocolateChip-UI: No se proporcionó ningún evento para la función del evento `on` del modelo.Sin un evento la función no puede realizarse. Por favor proporcione un evento.",
      noEventForModelTrigger: "Hubo Error de Modelo ChocolateChip-UI: No se proporcionó ningún evento para el gatillo del modelo. Sin él no se puede disparar ningún evento. Por favor proporcione uno.",
      noPosForEventDeletion: "Hubo Error de Modelo ChocolateChip-UI: No se proporcionó ninguna función callback la cual se puede eliminar de los eventos del modelo. Por favor proporcione una.",
      noPosForPropAt: "Hubo Error de Modelo ChocolateChip-UI: No se proporcionó ninguna posición para acceder a una propiedad en la colección del modelo. Por favor proporcione una.",
      noPropForPropAt: "Hubo Error de Modelo ChocolateChip-UI: No se proporcionó ninugna propiedad. Sin una no se puede acceder a una propiedad en la colección del modelo. Por favor proporcione una propiedad y una posición en la colección para acceder a ella.",
      noValForPropEquals: "Hubo Error de Modelo ChocolateChip-UI: No se proporiconó ningún valor para acceder a una propiedad de un objeto. Por favor proprocione uno.",
      noPropForPropEquals: "Hubo Error de Modelo ChocolateChip-UI: No se proporcionó ningúna propiedad ni valor. Sin ellos no podemos acceder a un objeto que tenga propiedad del mismo valor en este modelo.",
      noPosForSetPropAt: "Hubo Error de Modelo ChocolateChip-UI: No se proprocionó ninguna posición para establecer una propiedad en la colección del modelo. Por favor proporcione una.",
      noValueForSetPropAt: "Hubo Error de Modelo ChocolateChip-UI: No se proporcionó ninún valor ni posición para actualizar un objeto en la colección del modelo. Por favor proporcione un valor y una posición.",
      noPropForSetPropAt: "Hubo Error de Modelo ChocolateChip-UI: No se proporcionaron ninunga propiedad, valor ni posición para establecer el valor de un objeto en la colección del modelo. Por favor proporcione una propiedad, valor y posición para actualizar el objeto.",
      noValueForPropEquals: "Hubo Error de Modelo ChocolateChip-UI: No se proporcionó ningún valor. Sin algún valor no podemos encontrar a un objeto idéntico en la colección del modelo. Por favor proporcione uno."
    }, _defineProperty(_es, 'noPropForPropEquals', "Hubo Error de Modelo ChocolateChip-UI: No se proporcionó ninguna propiedad ni valor. Sin ellos no podemos encontrar un objeto de iqual valor en la colección del modelo. Por favor proporcione los dos."), _defineProperty(_es, 'noDataToPushToModel', "Hubo Error de Modelo ChocolateChip-UI: No se proporcionaron ningunos datos para añadir al fin de la colección del modelo."), _defineProperty(_es, 'noDataForShiftToModel', "Hubo Error de Modelo ChocolateChip-UI: No se proporcionó ninungos datos para agregar al inicio de la colección del modelo."), _defineProperty(_es, 'noEndForModelSlice', "Hubo Error de Modelo ChocolateChip-UI: No se proporcionó ningún valor final para extraer de la colección del modelo. Por favor proporcione un valor numérico."), _defineProperty(_es, 'noStartModelForSlice', "Hubo Error de Modelo ChocolateChip-UI: No se proporcionó ningún valor inicial para extraer datos de la colección del modelo. Por favor proporcione un valor numérico inicial así como un final para que podamos extraer los datos de la colección del modelo."), _defineProperty(_es, 'noEndForModelSplice', "Hubo Error de Modelo ChocolateChip-UI: No se proporcionó ninguna posición final para realizar una acción de «splice» en la colección del modelo. Por favor proporcione una."), _defineProperty(_es, 'noStartForModelSplice', "Hubo Error de Modelo ChocolateChip-UI: No se proporcionó ninguna posición inicial para realizar una acción de «splice» en la colección del modelo. Por favor proporcione una."), _defineProperty(_es, 'noDataToInsertInModel', "Hubo Error de Modelo ChocolateChip-UI: No se proporcionaron ningunos datos para insertar en la colección del modelo. Se esperaba un objeto, pero no se encontró nada. Por favor proporcione un objeto de datos."), _defineProperty(_es, 'noPosToInserInModel', "Hubo Error de Modelo ChocolateChip-UI: No se proporcionó ninguna posición para saber en dónde insertar los datos en la colección del modelo. Por favor proporcione una posición de valor numérico y unos datos para insertar en la colección del modelo."), _defineProperty(_es, 'noPropForPlucking', "Hubo Error de Modelo ChocolateChip-UI: No se proporcionó ninguna propiedad para extraerla de la colección del modelo. Por favor proporcione una propiedad."), _defineProperty(_es, 'noCallbackForModelFind', "Hubo Error de Modelo ChocolateChip-UI: No se proporcionó ninguna función callback como parámetro a fin de realizar una búsqueda en la colección del modelo. Por favor proporcione una."), _defineProperty(_es, 'noCallbackForIndexOf', "Hubo Error de Modelo ChocolateChip-UI: No se proporcionó ninguna función callback a fin de averiguar el índice de un objeto en la colección del modelo. Por favor proporcione una."), _defineProperty(_es, 'noDataToConcat', "Hubo Error de Modelo ChocolateChip-UI: No se proporcionaron ningunos datos para concatenar en este modelo. ¿Se le olvidó proporcionar los datos?"), _defineProperty(_es, 'noPropsForSortBy', "Hubo Error de Modelo ChocolateChip-UI: No se proporcionó ninguna propiedad. Sin una no se puede ordenar los datos del modelo."), _defineProperty(_es, 'noEventForEventDeletion', "Hubo Error de Modelo ChocolateChip-UI: No se proporcionó ningún evento a fin de eliminar la función callback de este modelo. Por favor proporcione tanto un evento como una posición en la colección para la callback que se quiere eliminar. Es posible que un evento tenga más de una callback registrada a él."), _defineProperty(_es, 'noCallbackForForEach', "Hubo Error de Modelo ChocolateChip-UI: No se proporcionó ninguna función callback para el método «forEach». Ésta se requiere."), _defineProperty(_es, 'noDataToReplaceInModel', "Hubo Error de Modelo ChocolateChip-UI: No se proporcionaron ningunos datos para reemplazar los del modelo. Si es lo que usted quiere hacer, por favor proporicone unos datos para realizar esta operación. En otro caso, si el propósito de esta operación es el de vaciar el modelo, use `purge()`."), _defineProperty(_es, 'modelHasNoDataToReturn', "Hubo Error de Modelo ChocolateChip-UI: Este modelo no tiene datos suyos. Quizás se le olvidó asignarselos cuando lo creó."), _es)
  };
  var errors = undefined;
  if ($('html').attr('lang') == 'en') errors = ModelErrorMessages.en;
  if ($('html').attr('lang') == 'es') errors = ModelErrorMessages.es;
  $.extend({
    Model: function Model(data) {
      var __events = {};
      var __stopped = false;
      var __id = $.uuid();
      var mod = this;
      mod.data = undefined;
      mod.boundViews = [];
      /**
       * Views get bound to a model in a view initialization.
       * When you set a model to a view, it gets bound for auto-rendering.
       */
      function updateBoundViews(mod) { /* No bound views, so exit: */
        if (!mod.boundViews && !mod.boundViews.length) {
          return;
        };
        /** 
         * Loop thru bound views to render: 
         */
        mod.boundViews.forEach(function(view) {
          view.render();
        });
      }

      function createObjectModel(data) {
        var _ref;
        return _ref = {
          id: __id,
          data: data,
          /**
           * Set model state to `stopped`. Used to determine whether to execute a model event. 
           */
          stop: function stop() {
            return __stopped = true;
          },
          /** 
           * Set model state to run: 
           */
          start: function start() {
            return __stopped = false;
          },
          /** 
           * Check if model is stopped; 
           */
          isStopped: function isStopped() {
            return __stopped;
          },
          /** 
           * Get the value of an object property: 
           */
          get: function get(prop) {
            if (!prop) {
              return mod.data;
            } else {
              return mod.data[prop];
            }
          },
          /** 
           * Set the value of an object property: 
           */
          set: function set(prop, data) {
            if (!prop) {
              if ($.supressErrorMessages) return;
              console.error(errors.noPropertyOrDataError);
              return;
            } else if (!data) {
              if ($.supressErrorMessages) return;
              console.error(errors.noPropertyToSet + prop);
              return;
            }
            mod.data[prop] = data;
            updateBoundViews(mod);
          },
          /** 
           * Clear out the model's data: 
           */
          purge: function purge() {
            return mod.data = {};
          },
          /**
           * Merge new object into model's object.
           * This will replace any existing properties of the same name.
           */
          merge: function merge(obj) {
            if (!obj) {
              if ($.supressErrorMessages) return;
              console.error(errors.noObjectToMerge);
              return;
            } else if ($.type(obj) !== 'object') {
              if ($.supressErrorMessages) return;
              console.error(erros.incorrectDataForMerging);
            } else {
              $.extend(mod.data, obj);
              updateBoundViews(mod);
            }
          },
          /**
           * Mixin new object into model's object.
           * This will not replace any existing properties of the same name.
           * Only new properties will be added.
           */
          mixin: function mixin(obj) {
            if (!obj) {
              if ($.supressErrorMessages) return;
              console.error(erros.noObjForMixin);
              return;
            }
            for (var key in obj) {
              /** 
               * Do not replace property if it exists: 
               */
              if (!(key in mod.data)) {
                mod.data[key] = obj[key];
                updateBoundViews(mod);
              }
            }
          },
          remove: function remove(prop) {
            if (!prop) {
              if ($.supressErrorMessages) return;
              console.error(errors.noPropertyToDelete);
              return;
            }
            delete mod.data[prop];
            updateBoundViews(mod);
          },
          events: function events() {
            return __events;
          },
          on: function on(event, callback) {
            if (__stopped) return;
            if (!callback) {
              if ($.supressErrorMessages) return;
              console.error(errors.noCallbackForModelOn);
              return;
            } else if (!event) {
              if ($.supressErrorMessages) return;
              console.error(errors.noEventForModelOn);
              return;
            }
            if (!__events[event]) {
              __events[event] = [callback];
            } else {
              __events[event].push(callback);
            }
          },
          trigger: function trigger(event, data) {
            if (__stopped) return;
            if (!event) {
              if ($.supressErrorMessages) return;
              console.error(errors.noEventForModelTrigger);
              return;
            }
            data != undefined ? data : {};
            __events[event].forEach(function(item) {
              item(data);
            });
          },
          off: function off(event) {
            if (!event) {
              __events = [];
            } else {
              var idx = __events.indexOf(event);
              __events.splice(idx, 1);
            }
          },
          removeEventCallback: function removeEventCallback(event, position) {
            if (position === undefined) {
              if ($.supressErrorMessages) return;
              console.error(errors.noPosForEventDeletion);
              return;
            } else if (event === undefined) {
              if ($.supressErrorMessages) return;
              console.error(errors.noEventForEventDeletion);
            }
            __events[event].splice(position, 1);
          }
        }, _defineProperty(_ref, 'purge', function purge() {
          return mod.data = [];
        }), _defineProperty(_ref, 'replace', function replace(data, renderView) {
          if (data) {
            mod.data = data;
            if (renderView) updateBoundViews(mod);
          } else {
            if ($.supressErrorMessages) return;
            console.error(errors.noDataToReplaceInModel);
          }
        }), _defineProperty(_ref, 'boundViews', mod.boundViews), _ref;
      }
      if (data) mod.data = data;
      /** 
       * Define an object-based model: 
       */
      if ($.type(data) === 'object') {
        return createObjectModel(data);
        /** 
         * Define an array-based model: 
         */
      } else if ($.type(data) === 'array') {
        return {
          id: __id,
          /**
           * Set model state to `stopped`.
           * Used to determine whether to execute a model event.
           */
          stop: function stop() {
            return __stopped = true;
          },
          /** 
           * Set model state to run: 
           */
          start: function start() {
            return __stopped = false;
          },
          /** 
           * Check if model is stopped; 
           */
          isStopped: function isStopped() {
            return __stopped;
          },
          /** 
           * Get property value at position: 
           */
          getPropAt: function getPropAt(prop, pos) {
            if (pos === undefined) {
              if ($.supressErrorMessages) return;
              console.error(errors.noPosForPropAt);
              return;
            } else if (!prop) {
              if ($.supressErrorMessages) return;
              console.error(errors.noPropForPropAt);
              return;
            }
            return mod.data[pos][prop];
          },
          /** 
           * Set the value of a property at position: 
           */
          setPropAt: function setPropAt(prop, value, pos) {
            if (pos === undefined) {
              if ($.supressErrorMessages) return;
              console.error(errors.noPosForSetPropAt);
              return;
            } else if (!value) {
              if ($.supressErrorMessages) return;
              console.error(errors.noValueForSetPropAt);
              return;
            } else if (!prop) {
              if ($.supressErrorMessages) return;
              console.error(errors.noPropForSetPropAt);
              return;
            }
            mod.data[pos][prop] = value;
            updateBoundViews(mod);
          },
          /** 
           * Get all of the model's data: 
           */
          get: function get() {
            if (!mod.data) {
              if ($.supressErrorMessages) return;
              console.error(errors.modelHasNoDataToReturn);
            } else {
              return mod.data;
            }
          },
          push: function push(data) {
            if (!data) {
              if ($.supressErrorMessages) return;
              console.error(errors.noDataToPushToModel);
              return;
            }
            mod.data.push(data);
            updateBoundViews(mod);
          },
          pop: function pop() {
            mod.data.pop();
            updateBoundViews(mod);
          },
          unshift: function unshift(data) {
            if (!data) {
              if ($.supressErrorMessages) return;
              console.error(errors.noDataForShiftToModel);
              return;
            } else {
              mod.data.unshift(data);
              updateBoundViews(mod);
            }
          },
          /** 
           * Push an object to the begging of the model: 
           */
          shift: function shift() {
            mod.data.shift();
            updateBoundViews(mod);
          },
          slice: function slice(start, end) {
            if (end === undefined) {
              if ($.supressErrorMessages) return;
              console.error(errors.noEndForModelSlice);
              return;
            } else if (start === undefined) {
              if ($.supressErrorMessages) return;
              console.error(errors.noStartModelForSlice);
              return;
            }
            return mod.data.slice(start, end);
          },
          splice: function splice(start, end, data) {
            if (end === undefined) {
              if ($.supressErrorMessages) return;
              console.error(errors.noEndForModelSplice);
              return;
            } else if (start === undefined) {
              if ($.supressErrorMessages) return;
              console.error(errors.noStartForModelSplice);
              return;
            }
            if (data) {
              mod.data.splice(start, end, data);
              updateBoundViews(mod);
            } else {
              mod.data.splice(start, end);
              updateBoundViews(mod);
            }
          },
          insert: function insert(pos, data) {
            if (data === undefined) {
              if ($.supressErrorMessages) return;
              console.error(errors.noDataToInsertInModel);
              return;
            } else if (pos === undefined) {
              if ($.supressErrorMessages) return;
              console.error(errors.noPosToInserInModel);
              return;
            }
            mod.data.splice(pos, 0, data);
            updateBoundViews(mod);
          },
          pluck: function pluck(property) {
            if (!property) {
              if ($.supressErrorMessages) return;
              console.error(errors.noPropForPlucking);
              return;
            } else {
              var ret = [];
              if (mod.data && mod.data.length) {
                var len = mod.data.length;
                for (var i = 0; i < len; i++) {
                  ret.push(mod.data[i][property]);
                }
                return ret;
              }
            }
          },
          find: function find(callback) {
            if (!callback) {
              if ($.supressErrorMessages) return;
              console.error(errors.noCallbackForModelFind);
              return;
            } else {
              return mod.data.find(callback);
            }
          },
          indexOf: function indexOf(callback) {
            if (!callback) {
              if ($.supressErrorMessages) return;
              console.error(errors.noCallbackForIndexOf);
              return;
            } else {
              return mod.data.indexOf(callback);
            }
          },
          findIndex: function findIndex(callback) {
            if (!callback) {
              if ($.supressErrorMessages) return;
              console.error(errors.noCallbackFoFindIndex);
              return;
            } else {
              return mod.data.findIndex(callback);
            }
          },
          forEach: function forEach(callback) {
            if (!callback) {
              if ($.supressErrorMessages) return;
              console.error(errors.noCallbackForForEach);
              return;
            }
            if (mod.data && mod.data.length) {
              var value = undefined;
              var i = -1;
              var len = mod.data.length;
              while (++i < len) {
                value = callback.call(mod.data[i], mod.data[i], i);
                if (value === false) {
                  break;
                }
              }
            }
          },
          filter: function filter() {
            for (var _len9 = arguments.length, args = Array(_len9), _key9 = 0; _key9 < _len9; _key9++) {
              args[_key9] = arguments[_key9];
            }
            if (mod.data && mod.data.length) {
              return mod.data.filter.apply(mod.data, args);
            }
          },
          map: function map() {
            for (var _len10 = arguments.length, args = Array(_len10), _key10 = 0; _key10 < _len10; _key10++) {
              args[_key10] = arguments[_key10];
            }
            if (mod.data && mod.data.length) {
              return mod.data.map.apply(mod.data, args);
            }
          },
          reverse: function reverse() {
            if (mod.data && mod.data.length) {
              mod.data.reverse();
              updateBoundViews(mod);
            }
          },
          sort: function sort(predicate) {
            if (mod.data && mod.data.length) {
              if (predicate) {
                mod.data.sort(predicate);
                updateBoundViews(mod);
              } else {
                mod.data.sort();
                updateBoundViews(mod);
              }
            }
          },
          orderBy: function orderBy() {
            for (var _len11 = arguments.length, props = Array(_len11), _key11 = 0; _key11 < _len11; _key11++) {
              props[_key11] = arguments[_key11];
            }
            if (!props || !props.length) {
              if ($.supressErrorMessages) return;
              console.error(errors.noPropsForSortBy);
              return;
            }
            var orderBy = function orderBy(args) {
              return function(a, b) {
                var sortByProperty = function sortByProperty(property) {
                  /** 
                   * Default sort order: 
                   */
                  var sortOrder = 1;
                  /** 
                   * If user provided property with "-" prefix, make sort order descending: 
                   */
                  if (property[0] === "-") {
                    sortOrder = -1;
                    /** 
                     * Extract property from hyphen prefix: 
                     */
                    property = property.substr(1);
                  }
                  /** 
                   * Sort objects by provided properties:
                   */
                  return function(a, b) {
                    var result = a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0;
                    return result * sortOrder;
                  };
                };
                /** 
                                 * Loop over all properties and sort objects 
                                based on those properties: 
                                */
                var i = 0;
                var result = 0;
                var numberOfProperties = props.length;
                while (result === 0 && i < numberOfProperties) {
                  /** 
                   * Use the private function to compare two values: 
                   */
                  result = sortByProperty(props[i])(a, b);
                  i++;
                }
                return result;
              };
            };
            if (mod.data && mod.data.length) {
              mod.data.sort(orderBy.apply(null, props));
              updateBoundViews(mod);
            }
          },
          concat: function concat(data) {
            if (!data) {
              if ($.supressErrorMessages) return;
              console.error(errors.noDataToConcat);
              return;
            }
            var temp = mod.data.concat(data);
            mod.data = temp;
            updateBoundViews(mod);
          },
          mixin: function mixin(data) {
            if (!data) {
              if ($.supressErrorMessages) return;
              console.error(errors.noPosForEventDeletion);
              return;
            }
            mod.data.concat(data).unique();
            updateBoundViews(mod);
          },
          unique: function unique() {
            var temp = mod.data.unique();
            mod.data = temp;
            updateBoundViews(mod);
          },
          events: function events() {
            return __events;
          },
          on: function on(event, callback) {
            if (__stopped) return;
            if (!callback) {
              if ($.supressErrorMessages) return;
              console.error(errors.noCallbackForModelOn);
              return;
            } else if (!event) {
              if ($.supressErrorMessages) return;
              console.error(errors.noEventForModelOn);
              return;
            }
            if (!__events[event]) {
              __events[event] = [callback];
            } else {
              __events[event].push(callback);
            }
          },
          trigger: function trigger(event, data) {
            if (__stopped) return;
            if (!event) {
              if ($.supressErrorMessages) return;
              console.error(errors.noEventForModelTrigger);
              return;
            }
            data != undefined ? data : {};
            __events[event].forEach(function(item) {
              item(data);
            });
          },
          off: function off(event) {
            if (!event) {
              __events = [];
            } else {
              var idx = __events.indexOf(event);
              __events.splice(idx, 1);
            }
          },
          removeEventCallback: function removeEventCallback(event, position) {
            if (position === undefined) {
              console.error(errors.noPosForEventDeletion);
              return;
            }
            __events[event].splice(position, 1);
          },
          size: function size() {
            return mod.data.length;
          },
          eq: function eq(position) {
            return mod.data[position];
          },
          /** 
           * Clear out the model's data:
           */
          purge: function purge() {
            return mod.data = [];
          },
          replace: function replace(data, renderView) {
            if (data) {
              mod.data = data;
              if (renderView) updateBoundViews(mod);
            } else {
              console.error(errors.noDataToReplaceInModel);
            }
          },
          /** 
           * Array of views bound to this model: 
           */
          boundViews: mod.boundViews
        };
        /**
         * No data was provided, so define a default object-based model: 
         */
      } else if (!data) {
        var _data = {};
        return createObjectModel(_data);
      }
    }
  });
})();
/**
 * Check environment properties.
 */
$.extend($, {
  isiPhone: /iphone/img.test(navigator.userAgent),
  isiPad: /ipad/img.test(navigator.userAgent),
  isiPod: /ipod/img.test(navigator.userAgent),
  isiOS: /ip(hone|od|ad)/img.test(navigator.userAgent),
  isAndroid: /android/img.test(navigator.userAgent) && !/trident/img.test(navigator.userAgent),
  isTouchEnabled: !/trident/img.test(navigator.userAgent) && !/edge/img.test(navigator.userAgent) && 'createTouch' in document,
  isOnline: navigator.onLine,
  isStandalone: navigator.standalone,
  isWebkit: !/trident/img.test(navigator.userAgent) && !/edge/img.test(navigator.userAgent) && /webkit/img.test(navigator.userAgent),
  isDesktop: !/mobile/img.test(navigator.userAgent),
  isSafari: !/edge/img.test(navigator.userAgent) && !/Chrome/img.test(navigator.userAgent) && /Safari/img.test(navigator.userAgent) && !/android/img.test(navigator.userAgent),
  isChrome: !/trident/img.test(navigator.userAgent) && !/edge/img.test(navigator.userAgent) && /Chrome/img.test(navigator.userAgent) && !((/samsung/img.test(navigator.userAgent) || /Galaxy Nexus/img.test(navigator.userAgent) || /HTC/img.test(navigator.userAgent) || /LG/img.test(navigator.userAgent)) && !/trident/img.test(navigator.userAgent) && !/edge/img.test(navigator.userAgent) && /android/i.test(navigator.userAgent) && /webkit/i.test(navigator.userAgent)),
  isNativeAndroid: (/samsung/img.test(navigator.userAgent) || /Galaxy Nexus/img.test(navigator.userAgent) || /HTC/img.test(navigator.userAgent) || /LG/img.test(navigator.userAgent)) && !/trident/img.test(navigator.userAgent) && !/edge/img.test(navigator.userAgent) && /android/i.test(navigator.userAgent) && /webkit/i.test(navigator.userAgent)
});
/**
 * Methods to handle color management and coversion.
 */
$.extend({
  /** 
   * Create a color object from provided color value.
   * Handles three values:
   * rgb(255,0,0) -- with or without spaces
   * #ff0000
   * #f00
   * The returned object has two methods:
   * myColor.toHex()
   * myColor.toRGB()
   *
   * @constructor - Must use new keyword
   * @param {string} color - A hex or rgb value.
   * @return {object} ChuiColor
   */
  ChuiColor: function ChuiColor(color) {
    this.ok = false;
    /** 
     * console.log(color)
     * Check for hex color value.
     * String "#" if found.
     */
    if (color.charAt(0) == '#') {
      color = color.substr(1, 6);
    }
    color = color.toLowerCase();
    /**
     * Array of color format regex patterns.
     * These will identify the format of the color provided above.
     * The process function converts hex color values into decimal (rgb).
     */
    var colorRegex = [{ /* Example: ['rgb(123, 234, 45)', 'rgb(255, 234, 245)'] */
      re: /^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/,
      process: function process(bits) {
        return [parseInt(bits[1]), parseInt(bits[2]), parseInt(bits[3])];
      }
    }, { /* Example: ['#00ff00', '336699'] */
      re: /^(\w{2})(\w{2})(\w{2})$/,
      process: function process(bits) {
        return [parseInt(bits[1], 16), parseInt(bits[2], 16), parseInt(bits[3], 16)];
      }
    }, {
      /**
       * Example: ['#fb0', 'f0f'] 
       */
      re: /^(\w{1})(\w{1})(\w{1})$/,
      process: function process(bits) {
        return [parseInt(bits[1] + bits[1], 16), parseInt(bits[2] + bits[2], 16), parseInt(bits[3] + bits[3], 16)];
      }
    }];
    /**
     * Check for a match using each regex. 
     */
    for (var i = 0; i < 3; i++) {
      var re = colorRegex[i].re;
      var processor = colorRegex[i].process;
      var bits = re.exec(color);
      if (bits) {
        var channels = processor(bits);
        this.r = channels[0];
        this.g = channels[1];
        this.b = channels[2];
        this.ok = true;
      }
    }
    /**
     * Validate/cleanup values. 
     */
    this.r = this.r < 0 || isNaN(this.r) ? 0 : this.r > 255 ? 255 : this.r;
    this.g = this.g < 0 || isNaN(this.g) ? 0 : this.g > 255 ? 255 : this.g;
    this.b = this.b < 0 || isNaN(this.b) ? 0 : this.b > 255 ? 255 : this.b;
    this.toHex = function() {
      var r = this.r.toString(16);
      var g = this.g.toString(16);
      var b = this.b.toString(16);
      if (r.length == 1) r = '0' + r;
      if (g.length == 1) g = '0' + g;
      if (b.length == 1) b = '0' + b;
      return '#' + r + g + b;
    };
    this.toRGB = function() {
      return 'rgb(' + this.r + ',' + this.g + ',' + this.b + ')';
    };
  },
  /**
   * Make global method to get brightness of provided color.
   * This is based on the values of YIQ color formula.
   * This method expects a color object created by $.ChuiColor.
   */
  getBrightness: function getBrightness(color) {
    if ($.type(color) === 'string') color = $.ChuiColor(color);
    return color.r * .299 + color.g * .587 + color.b * .114;
  },
  /**
   * Function to light a color.
   * Expects a hex value as string and an integer as percent:
   */
  lightenColor: function lightenColor(color, percent) {
    var num = parseInt(color.slice(1), 16);
    var amt = Math.round(2.55 * percent);
    var R = (num >> 16) + amt;
    var G = (num >> 8 & 0x00FF) + amt;
    var B = (num & 0x0000FF) + amt;
    return "#" + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 + (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 + (B < 255 ? B < 1 ? 0 : B : 255)).toString(16).slice(1);
  },
  /**
   * Function to darken a color.
   * Expects a hex value as string and an integer as percent:
   */
  darkenColor: function darkenColor(color, percent) {
    var num = parseInt(color.slice(1), 16);
    var amt = Math.round(2.55 * percent);
    var R = (num >> 16) - amt;
    var G = (num >> 8 & 0x00FF) - amt;
    var B = (num & 0x0000FF) - amt;
    return "#" + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 + (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 + (B < 255 ? B < 1 ? 0 : B : 255)).toString(16).slice(1);
  },
  /**
   * Method to calculate color contrast.
   * It expects a hex or rgb value:
   */
  calculateBrightness: function calculateBrightness(color) {
    if ($.type(color) === 'object') color = color.toHex();
    var kolor = new $.ChuiColor(color);
    return $.getBrightness(kolor);
  }
});
/**
 * ChocolateChip-UI Widget - Setup.
 */
$(function() {
  if (!/(mobile)|(ios)|(android)/img.test(navigator.userAgent)) {
    $('body').addClass('isDesktop');
  }
  if ($('link[href*=ios]')[0]) {
    $('body').addClass('themeIsiOS');
    $.theme = 'ios';
  } else if ($('link[href*=android]')[0]) {
    $('body').addClass('themeIsAndroid');
    $.theme = 'android';
  }
  $.dir = 'ltr';
  if ($('html').attr('dir') === 'rtl') {
    $.dir = 'rtl';
  }
});
/**
 * ChocolateChip-UI Widget - Activity Indicator.
 */
$.fn.extend({
  /**
   * Setup activitiy indicator:
   */
  Busy: function Busy(options) {
    var settings = {
      size: 40,
      color: '#666'
    };
    $.extend(settings, options);
    var $this = this;
    var spinner = undefined;
    /**
     * For iOS:
     */
    var iOSBusy = function iOSBusy() {
      var small = undefined;
      /**
       * Smaller busy indicator (less tines):
       */
      if (parseInt(settings.size, 10) < 30) {
        spinner = '<svg class=\'chui-busy small\' width=\'' + settings.size + 'px\' height=\'' + settings.size + 'px\' xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 100 100\' preserveAspectRatio=\'xMidYMid\'>  \n  <g x=\'0\' y=\'0\' width=\'100\' height=\'100\' fill=\'none\' class=\'bk\'>\n    <rect  x=\'46.5\' y=\'40\' width=\'7\' height=\'20\' rx=\'5\' ry=\'5\' fill=\'' + settings.color + '\' transform=\'rotate(0 50 50) translate(0 -30)\'></rect>\n    <rect  x=\'46.5\' y=\'40\' width=\'7\' height=\'20\' rx=\'5\' ry=\'5\' fill=\'' + settings.color + '\' transform=\'rotate(45 50 50) translate(0 -30)\'></rect>\n    <rect  x=\'46.5\' y=\'40\' width=\'7\' height=\'20\' rx=\'5\' ry=\'5\' fill=\'' + settings.color + '\' transform=\'rotate(90 50 50) translate(0 -30)\'></rect>\n    <rect  x=\'46.5\' y=\'40\' width=\'7\' height=\'20\' rx=\'5\' ry=\'5\' fill=\'' + settings.color + '\' transform=\'rotate(135 50 50) translate(0 -30)\'></rect>\n    <rect  x=\'46.5\' y=\'40\' width=\'7\' height=\'20\' rx=\'5\' ry=\'5\' fill=\'' + settings.color + '\' transform=\'rotate(180 50 50) translate(0 -30)\'></rect>\n    <rect  x=\'46.5\' y=\'40\' width=\'7\' height=\'20\' rx=\'5\' ry=\'5\' fill=\'' + settings.color + '\' transform=\'rotate(225 50 50) translate(0 -30)\'></rect>\n    <rect  x=\'46.5\' y=\'40\' width=\'7\' height=\'20\' rx=\'5\' ry=\'5\' fill=\'' + settings.color + '\' transform=\'rotate(270 50 50) translate(0 -30)\'></rect>\n    <rect  x=\'46.5\' y=\'40\' width=\'7\' height=\'20\' rx=\'5\' ry=\'5\' fill=\'' + settings.color + '\' transform=\'rotate(315 50 50) translate(0 -30)\'></rect>\n  </g>\n</svg>';
        $this.append(spinner);
        /**
         * Larger busy indicator (more tines);
         */
      } else {
        spinner = '<svg class=\'chui-busy\' width=\'' + settings.size + 'px\' height=\'' + settings.size + 'px\' xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 100 100\' preserveAspectRatio=\'xMidYMid\' class=\'uil-default\'> \n  <g x=\'0\' y=\'0\' width=\'100\' height=\'100\' fill=\'none\'>\n    <rect  x=\'46.5\' y=\'40\' width=\'7\' height=\'20\' rx=\'5\' ry=\'5\' fill=\'' + settings.color + '\' transform=\'rotate(0 50 50) translate(0 -30)\'></rect>\n    <rect  x=\'46.5\' y=\'40\' width=\'7\' height=\'20\' rx=\'5\' ry=\'5\' fill=\'' + settings.color + '\' transform=\'rotate(30 50 50) translate(0 -30)\'></rect>\n    <rect  x=\'46.5\' y=\'40\' width=\'7\' height=\'20\' rx=\'5\' ry=\'5\' fill=\'' + settings.color + '\' transform=\'rotate(60 50 50) translate(0 -30)\'></rect>\n    <rect  x=\'46.5\' y=\'40\' width=\'7\' height=\'20\' rx=\'5\' ry=\'5\' fill=\'' + settings.color + '\' transform=\'rotate(90 50 50) translate(0 -30)\'></rect>\n    <rect  x=\'46.5\' y=\'40\' width=\'7\' height=\'20\' rx=\'5\' ry=\'5\' fill=\'' + settings.color + '\' transform=\'rotate(120 50 50) translate(0 -30)\'></rect>\n    <rect  x=\'46.5\' y=\'40\' width=\'7\' height=\'20\' rx=\'5\' ry=\'5\' fill=\'' + settings.color + '\' transform=\'rotate(150 50 50) translate(0 -30)\'></rect>\n    <rect  x=\'46.5\' y=\'40\' width=\'7\' height=\'20\' rx=\'5\' ry=\'5\' fill=\'' + settings.color + '\' transform=\'rotate(180 50 50) translate(0 -30)\'></rect>\n    <rect  x=\'46.5\' y=\'40\' width=\'7\' height=\'20\' rx=\'5\' ry=\'5\' fill=\'' + settings.color + '\' transform=\'rotate(210 50 50) translate(0 -30)\'></rect>\n    <rect  x=\'46.5\' y=\'40\' width=\'7\' height=\'20\' rx=\'5\' ry=\'5\' fill=\'' + settings.color + '\' transform=\'rotate(240 50 50) translate(0 -30)\'></rect>\n    <rect  x=\'46.5\' y=\'40\' width=\'7\' height=\'20\' rx=\'5\' ry=\'5\' fill=\'' + settings.color + '\' transform=\'rotate(270 50 50) translate(0 -30)\'></rect>\n    <rect  x=\'46.5\' y=\'40\' width=\'7\' height=\'20\' rx=\'5\' ry=\'5\' fill=\'' + settings.color + '\' transform=\'rotate(300 50 50) translate(0 -30)\'></rect>\n    <rect  x=\'46.5\' y=\'40\' width=\'7\' height=\'20\' rx=\'5\' ry=\'5\' fill=\'' + settings.color + '\' transform=\'rotate(330 50 50) translate(0 -30)\'></rect>\n  </g>\n</svg>';
        $this.append(spinner);
      }
    };
    /**
     * For Android:
     */
    var androidBusy = function androidBusy() {
      settings.id = $.uuid();
      var androidActivityIndicator = null;
      if ($.isNativeAndroid) {
        androidActivityIndicator = '<svg class="chui-busy" version="1.1" id="' + settings.id + '" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 100 100" enable-background="new 0 0 100 100" xml:space="preserve">\n  <g>\n    <path fill="none" stroke="' + settings.color + '" stroke-width="10" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" d="M74.2,65c2.7-4.4,4.3-9.5,4.3-15c0-15.7-12.8-28.5-28.5-28.5S21.5,34.3,21.5,50c0,5.5,1.6,10.6,4.3,15"/>\n  </g>\n  <polyline fill="none" stroke="' + settings.color + '" stroke-width="10" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" points="89.4,56.1 74.3,65 65.4,49.9 "/>\n</svg>';
        $this.append(androidActivityIndicator);
        return;
      } else {
        androidActivityIndicator = '<svg id="' + settings.id + '" class="chui-busy" x="0px" y="0px" viewBox="0 0 100 100"><circle stroke="url(#SVGID_1_)" cx="50" cy="50" r="28.5"/></svg>';
        $this.append(androidActivityIndicator);
        $this.addClass('hasActivityIndicator');
        if (options.color) {
          $('#' + settings.id).find('circle').css('stroke', options.color);
        }
      }
      $('#' + settings.id).css({
        'height': settings.size + 'px',
        'width': settings.size + 'px'
      });
    };
    /**
     * Create Busy control for appropriate OS:
     */
    if ($.theme === 'android') {
      androidBusy(options);
    } else if ($.theme === 'ios') {
      iOSBusy(options);
    }
  }
});
/**
 * ChocolateChip-UI Widget - Screen Blocker.
 */
$.extend({
  /**
   * Cover screen:
   */
  Block: function Block(opacity) {
    opacity = opacity ? ' style=\'opacity:' + opacity + ';\'' : ' style=\'opacity: .5;\'';
    if ($('.mask')[0]) return;
    $('body').append('<div class=\'mask\'' + opacity + '></div>');
    $('screen.current').attr('aria-hidden', true);
  },
  /**
   * Uncover screen:
   */
  Unblock: function Unblock() {
    $('.mask').remove();
    $('screen.current').removeAttr('aria-hidden');
  }
});
/**
 * ChocolateChip-UI Widget - Button functions.
 */
var chuiBackButtonSVG = '<svg id="chui-back-button-svg" width="100px" height="100px" viewBox="0 0 100 100" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">\n  <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">\n    <g id="chui-back-arrow" stroke="#979797">\n      <path d="M50.7822487,4.05872022 L5.60302012,49.1913445 L50.4625593,94.6779982" id="back-arrow-bracket"></path>\n      <path d="M6,49.368351 L95.8300018,49.368351" id="back-arrow-shaft"></path>\n    </g>\n  </g>\n</svg>';
$.fn.extend({
  decorateBackButton: function decorateBackButton() {
    if ($(this).hasClass('back') || $(this).hasClass('backTo')) {
      this.forEach(function(button) {
        var buttonText = $(button).text();
        $(button).html('<span>' + buttonText + '</span>');
        $(button).prepend(chuiBackButtonSVG);
      });
    }
  }
});
$(function() {
  $('.back').decorateBackButton();
  $('.backTo').decorateBackButton();
});
/**
 * ChocolateChip-UI Widget - Center Elements.
 */
$.fn.extend({
  /**
   * Center an Element on Screen
   */
  center: function center(position) {
    if (!this[0]) return;
    var $this = $(this);
    var parent = $this.parent();
    if (position) {
      $(this.css('position', position));
    } else if ($this.css('position') === 'absolute') {
      position = 'absolute';
    } else {
      position = 'relative';
    }
    var height = undefined;
    var width = undefined;
    var parentHeight = undefined;
    var parentWidth = undefined;
    if (position === 'absolute') {
      height = $this[0].clientHeight;
      width = $this[0].clientWidth;
      parentHeight = parent[0].clientHeight;
      parentWidth = parent[0].clientWidth;
    } else {
      height = parseInt($this.css('height'), 10);
      width = parseInt($this.css('width'), 10);
      parentHeight = parseInt(parent.css('height'), 10);
      parentWidth = parseInt(parent.css('width'), 10);
      $(this).css({
        'margin-left': 'auto',
        'margin-right': 'auto'
      });
    }
    var tmpTop = undefined;
    var tmpLeft = undefined;
    if (parent[0].nodeName === 'body') {
      tmpTop = window.innerHeight / 2 + window.pageYOffset - height / 2 + 'px';
      tmpLeft = window.innerWidth / 2 - width / 2 + 'px';
    } else {
      tmpTop = parentHeight / 2 - height / 2 + 'px';
      tmpLeft = parentWidth / 2 - width / 2 + 'px';
    }
    if (position !== 'absolute') tmpLeft = 0;
    $this.css({
      left: tmpLeft,
      top: tmpTop
    });
    return $this;
  }
});
/**
 * ChocolateChip-UI Widget - Edit List.
 */
$.extend({
  /**
   * Setup an editable list, enabling reording of items and deletion:
   */
  EditList: function EditList(options) {
    /**
          options = {
            editLabel: labelName,
            doneLabel: labelName,
            deleteLabel: labelName,
            cancelLabel: cancelName,
            callback: callback (Tapping "Done" fires this),
            deletable: false (no deletables),
            movable: false (no movables),
            model: myModel,
            modelProp: 'id',
            view: myView
          }
        */
    var settings = {
      editLabel: 'Edit',
      doneLabel: 'Done',
      deleteLabel: 'Delete',
      cancelLabel: 'Cancel',
      callback: $.noop,
      deletable: true,
      movable: true,
      model: undefined,
      modelProp: 'id',
      view: undefined
    };
    var __data = [];
    if (!options) {
      return;
    }
    $.extend(settings, options);
    var __model = settings.model || false;
    if (!settings.deletable && !settings.movable) {
      return;
    }
    var __view = settings.view;
    if (options) $.extend(settings, options);
    var deleteButton = undefined;
    var editButton = undefined;
    var deletionIndicator = undefined;
    var button = undefined;
    var dispelDeletable = 'swiperight';
    var enableDeletable = 'swipeleft';
    var moveUpIndicator = undefined;
    var moveDownIndicator = undefined;
    var element = settings.element;
    var deleteLabel = undefined;
    var dir = $('html').attr('dir');
    dir = dir ? dir.toLowerCase() : '';
    if (dir === 'rtl') {
      dispelDeletable = 'swipeleft';
      enableDeletable = 'swiperight';
    }
    if (settings.deletable) {
      deleteButton = '<button class="delete">\n  <label>' + settings.deleteLabel + '</label>\n  <svg width="27px" height="30px" viewBox="0 0 27 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">\n    <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">\n      <g id="delete-icon" fill="#3A3A3A">\n        <g transform="translate(3.000000, 1.000000)">\n          <path d="M1,6 L20,6 L20,24.9986131 C20,26.6562333 18.6639569,28 16.9998779,28 L4.00012207,28 C2.3432004,28 1,26.6569187 1,24.9986131 L1,6 Z M4,9 L5,9 L5,25 L4,25 L4,9 Z M8,9 L9,9 L9,25 L8,25 L8,9 Z M12,9 L13,9 L13,25 L12,25 L12,9 Z M16,9 L17,9 L17,25 L16,25 L16,9 Z" id="can"></path><path d="M0,4.96611425 L0,1.67759301 L5.1776507,1.7511163 L6.482399,0 L14.5847825,0 L15.8789491,1.7511163 L21,1.7511163 L21,4.9447157 L0,4.96611425 L0,4.96611425 Z" id="lid"></path>\n        </g>\n      </g>\n    </g>        \n  </svg>      \n</button>';
      deletionIndicator = '<span class="deletion-indicator">\n  <svg width="20px" height="20px" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">\n    <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">\n      <g id="deletion-indicator">\n        <g id="ios-indicator">\n          <circle id="ios-circle" fill="#FF0000" cx="10" cy="10" r="10"></circle>\n          <path d="M3.5,10 L16.5,10" id="ios-bar" stroke="#FFFFFF" stroke-width="2" stroke-linecap="square"></path>\n        </g>\n        <path d="M2,13 L9.9294326,16.8406135 L17.1937075,1.90173332" id="checkmark" stroke="#FA0303" stroke-width="2"></path>\n      </g>\n    </g>\n  </svg>\n</span>';
      $(element).addClass('deletable');
    }
    if (settings.movable) {
      moveUpIndicator = '<span class=\'move-up\'>\n  <svg width="22px" height="22px" viewBox="0 0 22 22" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">\n    <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">\n      <g id="move-indicator">\n        <circle id="circle" cx="11" cy="11" r="10"></circle>\n        <path d="M4,13.9645823 L10.9316382,5.94630319 L17.795297,13.9073417" id="move-up"></path>\n      </g>\n    </g>\n  </svg>\n</span>';
      moveDownIndicator = '<span class=\'move-down\'>\n  <svg width="22px" height="22px" viewBox="0 0 22 22" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">\n    <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">\n      <g id="move-indicator">\n        <circle id="circle" cx="11" cy="11" r="10"></circle>\n        <path d="M4.0421421,7.98172087 L10.912246,16 L17.7960071,8.1103389" id="move-down"></path>\n      </g>\n    </g>\n  </svg>\n</span>';
      $(element).addClass('editable');
    }
    editButton = '<button class="edit">' + settings.editLabel + '</button>';
    var screen = $(element).closest('screen');
    var nav = $(element).closest('screen').find('nav');
    nav.append(editButton);
    nav.find('.back').hide();
    nav.prepend('<button class="cancel">' + settings.cancelLabel + '</button>');
    nav.find('.cancel').hide();
    $.AdjustNavbarLayout($(element).closest('screen'));
    button = $(element).closest('screen').find('.edit');
    $(element).find('li').forEach(function(ctx) {
      if (!$(ctx).has('.deletion-indicator').length) {
        if (settings.deletable) {
          $(ctx).prepend(deletionIndicator);
        }
        if (settings.movable) {
          $(ctx).append(moveDownIndicator);
          $(ctx).append(moveUpIndicator);
        }
        if (settings.deletable) {
          $(ctx).append(deleteButton);
        }
      }
    });
    /**
     * Callback to setup indicator interactions:
     */
    var setupDeletability = function setupDeletability(callback, list, button) {
      $(function() {
        /**
         * Check for view and update its template:
         */
        if (__view) {
          var temp = $('<div></div>');
          temp[0].insertAdjacentHTML('afterbegin', __view.getTemplate());
          temp.find('li').prepend(deletionIndicator);
          temp.find('li').append(moveDownIndicator);
          temp.find('li').append(moveUpIndicator);
          var template = temp.html();
          __view.setTemplate(template);
        }
        button.on('tap', function() {
          var $this = this;
          /**
           * When button is in "Edit" state:
           */
          if (this.classList.contains('edit')) {
            $(list).addClass('editing');
            setTimeout(function() {
              $this.classList.remove('edit');
              $this.classList.add('done');
              $($this).text(settings.doneLabel);
              $(list).addClass('showIndicators');
              $($this).siblings('.back').hide();
              $($this).siblings('.cancel').show();
              $.AdjustNavbarLayout(screen);
            });
            /**
             * When button is in "Done" state:
             */
          } else if (this.classList.contains('done')) {
            $(list).removeClass('editing');
            /**
             * Execute callback if edit was performed:
             */
            setTimeout(function() {
              $this.classList.remove('done');
              $this.classList.add('edit');
              $($this).text(settings.editLabel);
              $(list).removeClass('showIndicators');
              $(list).find('li').removeClass('selected');
              $($this).siblings('.cancel').hide();
              $.AdjustNavbarLayout(screen);
            });
            var movedItems = [];
            $(list).find('li').forEach(function(ctx, idx) {
              __data.push($(ctx).attr('data-id'));
            });
            /**
             * Reorder model based on user choice:
             */
            if (__model) {
              (function() {
                var __newarray = [];
                __data.filter(function(item) {
                  var ret = __model.filter(function(b) {
                    return b[settings.modelProp] === item;
                  });
                  __newarray.push(ret[0]);
                });
                __data = [];
                __model.purge();
                __model.replace(__newarray, false);
                __newarray = [];
              })();
            }
            if ($(list).data('list-edit')) {
              callback.call(callback, __model);
            }
          }
          setTimeout(function() {
            $.AdjustNavbarLayout(screen);
          });
        });
        /**
         * Handle deletion indicators:
         */
        $(list).off('tap', '.deletion-indicator');
        $(list).on('tap', '.deletion-indicator', function() {
          if ($(this).closest('li').hasClass('selected')) {
            $(this).closest('li').removeClass('selected');
            return;
          } else {
            $(this).closest('li').addClass('selected');
          }
        });
        /**
         * Handle swipe gestures:
         */
        $(list).on(dispelDeletable, 'li', function() {
          /**
           * If no deletables, disable swipes:
           */
          if (!settings.deletable) return;
          /**
           * Else reveal delete button:
           */
          $(this).removeClass('selected');
        });
        $(list).on(enableDeletable, 'li', function() {
          /**
           * If no deletables, disable swipes:
           */
          if (!settings.deletable) return;
          /**
           * Else reveal delete button:
           */
          $(this).addClass('selected');
        });
        /**
         * Move list item up:
         */
        $(list).on('tap', '.move-up', function(e) {
          var _this = this;
          var item = $(this).closest('li');
          if (item.is('li:first-child')) {
            return;
          } else {
            (function() {
              /**
               * Mark list as edited:
               */
              $(list).data('list-edit', true);
              item = $(_this).closest('li');
              var prev = item.prev();
              /**
               * Clone the items to replace the transitioned ones alter:
               */
              var itemClone = item.clone();
              var prevClone = prev.clone();
              var height = item[0].offsetHeight;
              item.css({
                "-webkit-transform": 'translate3d(0,-' + height + 'px,0)',
                "transform": 'translate3d(0,-' + height + 'px,0)'
              });
              prev.css({
                "-webkit-transform": 'translate3d(0,' + height + 'px,0)',
                "transform": 'translate3d(0,' + height + 'px,0)'
              });
              setTimeout(function() {
                $.replace(prevClone, item);
                $.replace(itemClone, prev);
                /**
                 * Remove Android ripple from moved list item.
                 */
                $('ripple-sheath').remove();
              }, 250);
            })();
          }
        });
        /**
         * Move list item down:
         */
        $(list).on('tap', '.move-down', function(e) {
          var item = $(this).closest('li');
          var next = item.next();
          if (item.is('li:last-child')) {
            return;
          } else {
            (function() {
              /**
               * Clone the items to replace the transitioned ones alter:
               */
              var itemClone = item.clone();
              var nextClone = next.clone();
              /**
               * Mark list as edited:
               */
              $(list).data('list-edit', true);
              var height = item[0].offsetHeight;
              item.css({
                '-webkit-transform': 'translate3d(0,' + height + 'px,0)',
                transform: 'translate3d(0,' + height + 'px,0)'
              });
              next.css({
                "-webkit-transform": 'translate3d(0,-' + height + 'px,0)',
                "transform": 'translate3d(0,-' + height + 'px,0)'
              });
              setTimeout(function() {
                $.replace(nextClone, item);
                $.replace(itemClone, next);
                /**
                 * Remove Android ripple from moved list item.
                 */
                $('ripple-sheath').remove();
              }, 250);
            })();
          }
        });
        /**
         * Handle deletion of list item:
         */
        $(list).on('tap', '.delete', function() {
          var $this = this;
          var listItem = $(this).parent();
          /**
           * Mark list as edited:
           */
          $(list).data('list-edit', true);
          var direction = '-1200%';
          if ($('html').attr('dir') === 'rtl') direction = '1000%';
          $(this).siblings().css({
            '-webkit-transform': 'translate3d(' + direction + ',0,0)',
            '-webkit-transition': 'all 1s ease-out',
            'transform': 'translate3d(' + direction + ',0,0)',
            'transition': 'all 1s ease-out'
          });
          setTimeout(function() {
            listItem.remove();
          }, 500);
        });
        /**
         * Cancel edits:
         */
        nav.find('.cancel').on('tap', function() {
          nav.find('.back').show();
          $(this).hide();
          __view.render();
          nav.find('.done').addClass('edit').removeClass('done').text(settings.editLabel);
          $(list).removeClass('showIndicators');
          $(list).find('li').removeClass('selected');
          $(this).hide();
          $(list).find('li').append(deleteButton);
        });
      });
    };
    /**
     * Initialize the editable list:
     */
    setupDeletability(settings.callback, element, button);
    return {
      getModel: function getModel() {
        return __model;
      },
      getView: function getView() {
        return __view;
      }
    };
  }
});
/**
 * ChocolateChip-UI Widget - Multi-Select List.
 */
$.extend({
  /**
   * Setup a multi-select list:
   */
  MultiSelectList: function MultiSelectList(options) {
    if (!options || !options.element) return;
    var settings = {
      element: undefined,
      selected: [],
      name: $.uuid(),
      callback: $.noop,
      model: undefined
    };
    var __selection = [];
    $.extend(settings, options);
    var selections = settings.selected;
    var name = settings.name;
    var list = $(settings.element);
    list.addClass('multi-select-list');
    list.find('li').forEach(function(ctx, idx) {
      var value = ctx.getAttribute("data-select") !== null ? ctx.getAttribute("data-select") : "";
      selections.forEach(function(item) {
        if (item.index === idx) {
          __selection.push({
            index: idx,
            value: value
          });
        }
      });
      ctx.setAttribute('role', 'checkbox');
      $(ctx).removeClass('selected').find('input').removeAttr('checked');
      $(ctx).prepend('<span class="multi-selection-indicator"><svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="multi-select-icon" stroke="#979797"><g id="multi-select-circle-+-mulit-select-checkmark" transform="translate(2.000000, 2.000000)"><circle id="multi-select-circle" cx="13" cy="13" r="13"></circle><path d="M4.71521456,15.9877529 L13.0000002,20.7028494 L19.977049,5.70284941" id="mulit-select-checkmark"></path></g></g></g></svg></span>');
      $(ctx).append('<input type="checkbox" name="' + name + '" value="' + value + '">');
      if (selections.length) {
        selections.forEach(function(sel) {
          if (sel === idx) {
            ctx.setAttribute('aria-checked', 'true');
            ctx.classList.add('selected');
            $(ctx).find('input').prop('checked', true).attr('value', value);
            __selection.push({
              index: sel,
              value: value
            });
          }
        });
      }
    });
    list.on('tap', 'li', function() {
      var _this7 = this,
        _arguments2 = arguments;
      var item = $(this);
      if (item.hasClass('selected')) {
        (function() {
          item.removeClass('selected').removeAttr('aria-checked');
          item.find('input').removeProp('checked');
          var dataObj = {
            index: item.index(),
            value: item.attr('data-select')
          };
          var pos = undefined;
          __selection.forEach(function(item, idx) {
            if (item.index === dataObj.index && item.value === dataObj.value) {
              pos = idx;
            }
          });
          __selection.splice(pos, 1);
          settings.callback.apply(_this7, _arguments2);
        })();
      } else {
        __selection.push({
          index: item.index(),
          value: item.attr('data-select')
        });
        __selection.unique();
        item.addClass('selected');
        item.attr('aria-checked', true);
        item.find('input').prop('checked', true);
        settings.callback.apply(this, arguments);
      }
    });
    return {
      getSelection: function getSelection() {
        return __selection;
      }
    };
  }
});
/**
 * ChocolateChip-UI Widget - Adjust Navbar for iOS.
 */
$(function() {
  /**
   * Method to center H1 in Navbar.
   * Check on widths of siblings:
   */
  $.extend({
    AdjustNavbarLayout: function AdjustNavbarLayout(screen) {
      if (!$('link[href*=ios]')[0]) return;
      if (document.body && document.body.hasAttribute('nocenterheader')) {
        return;
      }
      screen = $(screen);
      if (!screen[0]);
      var h1 = screen.find('h1');
      var siblings = h1.siblings();
      var whichSide = undefined;
      var oppositeSide = undefined;
      var rtl = $('html').attr('dir') === 'rtl';
      var amount = 0;
      var hidden = false;
      var visibleSibling = undefined;
      var calculateLongest = function calculateLongest(a, b) {
        var widthA = a[0].clientWidth;
        var widthB = b[0].clientWidth;
        if (!widthA) {
          widthA = 0;
          whichSide = 'margin-right';
          oppositeSide = 'margin-left';
          if (rtl) {
            whichSide = 'margin-left';
            oppositeSide = 'margin-right';
          }
        }
        if (!widthB) {
          widthB = 0;
          whichSide = 'margin-left';
          oppositeSide = 'margin-right';
          if (rtl) {
            whichSide = 'margin-right';
            oppositeSide = 'margin-left';
          }
        }
        if (widthB > widthA) {
          whichSide = 'margin-left';
          oppositeSide = 'margin-right';
          if (rtl) {
            whichSide = 'margin-right';
            oppositeSide = 'margin-left';
          }
          amount = widthB - widthA;
        } else if (widthA > widthB) {
          whichSide = 'margin-right';
          oppositeSide = 'margin-left';
          if (rtl) {
            whichSide = 'margin-left';
            oppositeSide = 'margin-right';
          }
          amount = widthA - widthB;
        } else {
          amount = 0;
        }
      };

      function handleOneSibling(sib) {
        var sibling = sib || h1.siblings();
        amount = sibling[0].clientWidth;
        if (sibling.is(':first-child')) {
          whichSide = 'margin-right';
          oppositeSide = 'margin-left';
          if (rtl) {
            whichSide = 'margin-left';
            oppositeSide = 'margin-right';
          }
        } else if (sibling.is(':last-child')) {
          whichSide = 'margin-left';
          oppositeSide = 'margin-right';
          if (rtl) {
            whichSide = 'margin-right';
            oppositeSide = 'margin-left';
          }
        }
      }
      /**
       * If one sibling:
       */
      if (siblings.length === 1) {
        handleOneSibling();
        /**
         * If two siblings:
         */
      } else if (siblings.length === 2) {
        siblings.forEach(function(item) {
          if ($(item).css('display') === 'none') {
            hidden = true;
          } else {
            visibleSibling = $(item);
          }
        });
        if (hidden) {
          handleOneSibling(visibleSibling);
        } else {
          calculateLongest(siblings.eq(0), siblings.eq(1));
        }
        /**
         * H1 is alone:
         */
      } else {
        whichSide = 'margin-left';
        oppositeSide = 'margin-right';
        amount = 0;
      }
      var props = {};
      props[whichSide] = amount;
      props[oppositeSide] = 0;
      var sibwidth = 0;
      if (siblings.size()) {
        siblings.forEach(function(item) {
          sibwidth += $(item)[0].clientWidth;
        });
      }
      var headerWidth = screen.find('nav').width() / 2;
      if (sibwidth + 20 > headerWidth) {
        h1.css({
          'margin-left': 0,
          'margin-right': 0
        });
      } else {
        h1.css(props);
      }
    }
  });
  setTimeout(function() {
    $('screen').forEach(function(screen) {
      $.AdjustNavbarLayout(screen);
    });
  });
});
/**
 * ChocolateChip-UI Widget - Navigation Module.
 */
$(function() {
  /**
   * Private variable to track navigation state:
   */
  var isNavigating = false;
  /**
   * get screen by id:
   */
  var getScreen = function getScreen(screen) {
    return $('#' + screen);
  };
  /**
   * Handle state of screens:
   */
  var makeScreenCurrent = function makeScreenCurrent(screen) {
    screen = $(screen);
    screen.addClass('current');
    screen.removeClass('previous');
    screen.removeClass('next');
  };
  var makeScreenPrevious = function makeScreenPrevious(screen) {
    screen = $(screen);
    screen.removeClass('current');
    screen.removeClass('next');
    screen.addClass('previous');
  };
  var makeScreenNext = function makeScreenNext(screen) {
    screen = $(screen);
    screen.removeClass('current');
    screen.removeClass('previous');
    screen.addClass('next');
  };
  $.extend({
    /**
     * Navigate to Specific Article
     */
    GoToScreen: function GoToScreen(destination) {
      if ($.isNavigating) return;
      $.isNavigating = true;
      setTimeout(function() {
        $.isNavigating = false;
      }, 500);
      $.ChuiRoutes.push(destination);
      var currentScreen = $.screens.getCurrent();
      var destinationScreen = function() {
        var temp = undefined;
        var regex = /:/img;
        temp = regex.test(destination) ? destination.split(':')[0] : destination;
        return getScreen(temp);
      }();
      if (currentScreen[0]) currentScreen[0].scrollTop = 0;
      if (destinationScreen[0]) destinationScreen[0].scrollTop = 0;
      makeScreenPrevious(currentScreen);
      makeScreenCurrent(destinationScreen);
      $.Router.dispatch(destination);
    },
    /**
     * Navigate Back to Previous Article
     */
    GoBack: function GoBack() {
      if ($.isNavigating) return;
      $.isNavigating = true;
      var currentScreen = $.screens.getCurrent();
      $.ChuiRoutes.pop();
      var destination = $.ChuiRoutes[$.ChuiRoutes.length - 1];
      var destinationScreen = function() {
        var temp = undefined;
        var regex = /:/img;
        temp = regex.test(destination) ? destination.split(':')[0] : destination;
        return getScreen(temp);
      }();
      if (currentScreen[0]) currentScreen[0].scrollTop = 0;
      if (destinationScreen[0]) destinationScreen[0].scrollTop = 0;
      makeScreenNext(currentScreen);
      makeScreenCurrent(destinationScreen);
      $.Router.dispatch(destination);
      setTimeout(function() {
        $.isNavigating = false;
      }, 500);
    },
    isNavigating: false,
    /**
     * Navigate Back to Non-linear Article
     */
    GoBackToScreen: function GoBackToScreen(destination) {
      var position = $.ChuiRoutes.findIndex(function(dest) {
        return dest = destination;
      });
      var destinationScreen = getScreen(destination);
      var temp = undefined;
      while ($.ChuiRoutes.length > position + 1) {
        temp = $.ChuiRoutes.pop();
        temp = getScreen(temp);
        makeScreenNext(temp);
      }
      makeScreenCurrent(destinationScreen);
      $.Router.dispatch(destination);
    }
  });
  /**
   * Initialize Back Buttons:
   */
  $('body').on('tap', '.back', function() {
    if (this.hasAttribute('disabled')) return;
    $.GoBack();
  });
  /**
   * Handle navigation events:
   */
  var handleNavigationEvent = function handleNavigationEvent(element) {
    element = $(element);
    if ($.isNavigating) return;
    if (!element.hazAttr('data-goto')[0]) return;
    if (element.closest('ul').is('.deletable')) return;
    var destination = element.attr('data-goto');
    if (!destination) return;
    element.addClass('selected');
    setTimeout(function() {
      element.removeClass('selected');
    }, 1000);
    /**
     * Handle navigation:
     */
    $.GoToScreen(destination);
  };
  $('body').on('tap', 'li', function() {
    handleNavigationEvent($(this));
  });
  $('body').on('doubletap', 'li', function() {
    if (!$.isNavigating) {
      handleNavigationEvent($(this));
    }
  });
});
/**
 * ChocolateChip-UI Widget - Paging.
 */
$.extend({
  /**
   * Setup a paging control:
   */
  Paging: function Paging(options) {
    if (!options || !options.element) return;
    var screen = $(options.element);
    var pager = '<div class="pager">\n\
    <button class="previous">\n\
      <svg width="24px" height="36px" viewBox="0 0 24 36" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="pagination-icons" stroke="#979797"><path d="M19.7729197,3 L4.25431067,17.8699971 L19.7729196,32.9558941" id="page-previous"></path></g></g></svg>\n\
    </button>\n\
    <button class="next">\n\
      <svg width="24px" height="36px" viewBox="0 0 24 36" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="pagination-icons" stroke="#979797"><path d="M4.08862955,3.06871359 L20.0261609,18.0528447 L4.08862956,32.9999994" id="page-next"></path></g></g></svg>\n\
    </button>\n\
    </div>';
    $(screen).find('nav').append(pager);
    var currentSection = $(screen).find('section');
    var articles = function articles() {
      return currentSection.find('article').length;
    };
    $.AdjustNavbarLayout(screen);
    /**
     * Handle paging forward:
     */
    var pageForward = function pageForward(pagerButton) {
      if (articles() < 2) return;
      pagerButton.prev().removeClass('selected');
      pagerButton.addClass('selected');
      var currentArticle = undefined;
      if (pagerButton[0] && pagerButton[0].classList.contains('disabled')) return;
      currentArticle = currentSection.find('article.current');
      if (currentArticle.index() === articles() - 1) {
        /**
         * Start again!
         */
        currentArticle.removeClass('current').addClass('next');
        currentArticle.siblings().removeClass('previous').addClass('next');
        currentSection.find('article').eq(0).addClass('current').removeClass('previous').removeClass('next');
      } else {
        currentArticle.removeClass('current').addClass('previous');
        currentArticle.next().removeClass('next').addClass('current');
      }
      setTimeout(function() {
        pagerButton.removeClass('selected');
      }, 250);
    };
    var pageBack = function pageBack(pagerButton) {
      if (articles() === 1) return;
      pagerButton.next().removeClass('selected');
      pagerButton.addClass('selected');
      var currentArticle = undefined;
      currentArticle = currentSection.find('article.current');
      if (currentArticle.index() === 0) {
        currentArticle.removeClass('current');
        currentArticle.siblings().eq(-1).addClass('current').removeClass('next');
        currentArticle.siblings().eq(-1).siblings().removeClass('next').addClass('previous');
      } else {
        currentArticle.removeClass('current').addClass('next');
        currentArticle.prev().removeClass('previous').addClass('current');
      }
      setTimeout(function() {
        pagerButton.removeClass('selected');
      }, 250);
    };
    $('.pager').on($.eventStart, 'button:last-of-type', function() {
      pageForward($(undefined));
    });
    $('.pager').on($.eventStart, 'button:first-of-type', function() {
      pageBack($(undefined));
    });
  }
});
/**
 * ChocolateChip-UI Widget - Popover.
 */
$.extend({
  /**
   * Setup a popover (dropdown menu):
   */
  Popover: function Popover(options) {
    /**
          id: myUniqueID,
          title: 'Great',
          callback: myCallback,
        */
    options = options || {};
    var settings = {
      id: $.uuid(),
      callback: $.noop,
      title: ''
    };
    $.extend(settings, options);
    if (options && options.content) {
      settings.content = options.content;
    } else {
      settings.content = '';
    }
    var header = '<header><h1>' + settings.title + '</h1></header>';
    var popover = '<div class="popover" id="' + settings.id + '">' + header + '<section></section></div>';
    var popoverID = '#' + settings.id;
    /**
     * Calculate position of popover relative to the button that opened it:
     */
    var __calcPopPos = function __calcPopPos(element) {
      var offset = $(element).offset();
      var left = offset.left;
      var calcLeft = undefined;
      var calcTop = undefined;
      var popover = $(popoverID);
      var popoverOffset = popover.offset();
      calcLeft = popoverOffset.left;
      calcTop = offset.top + $(element)[0].clientHeight;
      if (popover.width() + offset.left > window.innerWidth) {
        popover.css({
          'left': window.innerWidth - popover.width() - 20 + 'px',
          'top': calcTop + 25 + 'px'
        });
      } else {
        popover.css({
          'left': left + 'px',
          'top': calcTop - 30 + 'px'
        });
      }
    };
    if ($('.mask')[0]) {
      $.ClosePopover();
      $('body').Unblock();
      return;
    }
    $.Block('.5');
    $('body').append(popover);
    if ($('body').hasClass('themeIsAndroid')) {
      setTimeout(function() {
        $(popoverID).addClass('opened');
      }, 200);
    }
    $(popoverID).data('triggerEl', settings.trigger);
    $(popoverID).find('section').append(settings.content);
    settings.callback.call(settings.callback, settings.trigger);
    __calcPopPos(settings.trigger);
  },
  AlignPopover: function AlignPopover() {
    var popover = $('.popover');
    if (!popover.length) return;
    var triggerID = popover.data('triggerEl');
    var offset = $(triggerID).offset();
    var left = offset.left;
    if ($(popover).width() + offset.left > window.innerWidth) {
      popover.css({
        'left': window.innerWidth - $(popover).width() - 20 + 'px'
      });
    } else {
      popover.css({
        'left': left + 'px'
      });
    }
  },
  ClosePopover: function ClosePopover() {
    $.Unblock();
    $('.popover').css({
      transform: 'scaleY(0)'
    });
    setTimeout(function() {
      $('.popover').off();
      $('.popover').remove();
    }, 100);
  }
});
$(function() {
  /**
   * Reposition popovers on window resize:
   */
  window.onresize = function() {
    $.AlignPopover();
  }; // const events = "$.eventStart singletap $.eventEnd";
  $('body').on($.eventStart, '.mask', function(e) { // if ($('.popover')[0]) {
    //   if (e && e.nodeType === 1) return;
    // } else {
    // alert('closing popover')
    $.ClosePopover(); // }
  });
});
/**
 * ChocolateChip-UI Widget - Popup.
 */
$.extend({
  /**
   * Setup  a popup dialog:
   */
  Popup: function Popup(options) {
    /**
        options {
          id: 'alertID',
          title: 'Alert',
          message: 'This is a message from me to you.',
          cancelButton: 'Cancel',
          continueButton: 'Go Ahead',
          width: '100px',
          callback: function() { // do something },
          empty: true
        }
        */
    if (!options) return;
    var settings = {};
    settings.id = $.uuid();
    settings.content = true;
    $.extend(settings, options);
    var width = '';
    if (settings.width) {
      width = 'style="width:' + settings.width + 'px;"';
    }
    var id = settings.id;
    var title = settings.title ? '<header><h1>' + settings.title + '</h1></header>' : '';
    var message = settings.message ? '<p role="note">' + options.message + '</p>' : '';
    var cancelButton = options.cancelButton ? '<button class="cancel" role="button">' + settings.cancelButton + '</button>' : '';
    var continueButton = settings.continueButton ? '<button class="continue" role="button">' + settings.continueButton + '</button>' : '';
    var callback = settings.callback || $.noop;
    var popup = undefined;
    if (settings.empty) {
      popup = '<div id="' + id + '" class="popup"><div ' + width + ' class="dialog" role="alertdialog"></div></div>';
    } else {
      popup = '<div class="popup" id="' + id + '"><div class="dialog" role="alertdialog"><div class="panel">' + title + message + '</div><footer>' + cancelButton + continueButton + '</footer></div></div>';
    }
    $('body').append(popup);
    if (settings.empty) {
      var _$$css;
      $('.dialog').css((_$$css = {
        "display": "-webkit-flex",
        "-webkit-justify-content": "center",
        "-webkit-align-items": "center"
      }, _defineProperty(_$$css, 'display', "flex"), _defineProperty(_$$css, "justify-content", "center"), _defineProperty(_$$css, "align-items", "center"), _$$css));
    }
    if (callback && continueButton) {
      $('#' + id).find('.continue').on('tap', function() {
        var $this = $(this);
        if ($.isAndroid || $.isChrome) {
          $this.addClass('selected');
          setTimeout(function() {
            $this.removeClass('selected');
            $('.popup').ClosePopup();
            callback.call(callback);
          }, 300);
        } else {
          $('#' + id).ClosePopup();
          callback.call(callback);
        }
      });
      $('#' + id).find('.cancel').on('tap', function() {
        var $this = $(this);
        if ($.isAndroid || $.isChrome) {
          $this.addClass('selected');
          setTimeout(function() {
            $this.removeClass('selected');
            $('#' + id).ClosePopup();
          }, 300);
        } else {
          $('#' + id).ClosePopup();
        }
      });
    }
    $('.popup').on('tap', function(e) {
      $(this).removeClass('opened');
    });
  }
});
$.fn.extend({
  /**
   * Show Popup:
   */
  ShowPopup: function ShowPopup() {
    var self = $(this);
    self.removeClass('forPopup');
    self.addClass('opened');
    setTimeout(function() {
      self.find('.popup').addClass('opened');
    }, 0);
  },
  /**
   * Close Popup:
   */
  ClosePopup: function ClosePopup() {
    var self = $(this);
    self.removeClass('opened');
    self.find('.popup').removeClass('opened');
  }
});
/**
 * ChocolateChip-UI Widget - Range Input.
 */
$.fn.extend({
  /**
   * Setup a range input:
   */
  Range: function Range() {
    if (this[0].nodeName !== 'INPUT') return;
    var input = $(this);
    var newPlace = undefined;
    var width = input.width();
    var newPoint = (input.val() - input.attr("min")) / (input.attr("max") - input.attr("min"));
    var offset = -1.3;
    if (newPoint < 0) {
      newPlace = 0;
    } else if (newPoint > 1) {
      newPlace = width;
    } else {
      newPlace = width * newPoint + offset;
      offset -= newPoint;
    }
    if ($.theme === 'android') {
      input.css({
        'background-size': Math.round(newPlace) + 'px 3px, 100% 3px'
      });
    } else {
      input.css({
        'background-size': Math.round(newPlace) + 'px 10px'
      });
    }
  }
});
$(function() {
  $('input[type=range]').forEach(function(ctx) {
    $(ctx).Range();
  });
  $('body').on('input', 'input[type=range]', function() {
    $(this).Range();
  });
});
/**
 * ChocolateChip-UI Widget - Router.
 */
$.extend({
  /**
   * Define Router:
   */
  ChuiRoutes: [],
  Router: function Router() {
    return {
      addRoute: function addRoute(options) {
        if ($.type(options) === 'array') {
          options.forEach(function(item) {
            return $.on(item.route, item.callback);
          });
        }
      },
      getFullRoute: function getFullRoute() {
        return $.ChuiRoutes.join('/');
      },
      getCurrentLoc: function getCurrentLoc() {
        var temp = undefined.getFullRoute().split('/');
        return temp[temp.length - 1];
      },
      dispatch: function dispatch(route) {
        var temp = undefined;
        var id = undefined;
        if (route.match(/\:/)) {
          temp = route.split(':');
          id = temp[1];
          route = temp[0];
        }
        $.send(route);
      },
      pushRoute: function pushRoute(route) {
        return $.ChuiRoutes.push(route);
      },
      popRoute: function popRoute() {
        return $.ChuiRoutes.pop();
      },
      unshiftRoute: function unshiftRoute(route) {
        return $.ChuiRoutes.unshift(route);
      },
      shiftRoute: function shiftRoute() {
        return $.ChuiRoutes.shift();
      },
      insert: function insert(position, route) {
        if ($.ChuiRoutes.length >= position) {
          $.ChuiRoutes.push(route);
        } else {
          $.ChuiRoutes.splice(position, 0, route);
        }
      },
      eq: function eq(number) {
        if ($.ChuiRoutes.length && number < 0) {
          return $.ChuiRoutes[$.ChuiRoutes.length - 1];
        } else if ($.ChuiRoutes.length && !isNaN(number) && number > -1) {
          return $.ChuiRoutes[number];
        }
      },
      indexOf: function indexOf(route) {
        return $.ChuiRoutes.indexOf(route);
      },
      remove: function remove(route, baseRouteOnly) {
        if (baseRouteOnly) {
          var index = $.ChuiRoutes.indexOf(route);
          $.ChuiRoutes.splice(index, 1);
        } else {
          $.ChuiRoutes.forEach(function(r) {
            if (r && route === r.split(':')[0]) {
              var _index = $.ChuiRoutes.indexOf(r);
              $.ChuiRoutes.splice(_index, 1);
            }
          });
        }
      },
      mount: function mount() {
        if ($('screen').size() && !$.ChuiRoutes.length) {
          $.ChuiRoutes.push($('screen')[0].id);
        }
      }
    };
  }
});
$.extend($.Router, {
  dispatch: function dispatch(route) {
    if (!route) return;
    var temp = undefined;
    var id = undefined;
    if (route.match(/\:/)) {
      temp = route.split(':');
      id = temp[1];
      route = temp[0];
    }
    $.send(route, id);
  }
});
$.extend($.ChuiRoutes, {
  getFullRoute: function getFullRoute() {
    return this.join('/');
  }
});
$(function() {
  /**
   * Set up initial route:
   */
  if ($('screen').size() && !$.ChuiRoutes.length) {
    $.ChuiRoutes.push($('screen')[0].id);
  }
});
/**
 * ChocolateChip-UI Widget - Screens.
 */
$(function() {
  /**
   * Interface for the app's screens:
   */
  $.extend({
    screens: $('screen')
  });
  $.extend($.screens, {
    getCurrent: function getCurrent() {
      return this.hazClass('current');
    },
    getNext: function getNext() {
      return this.hazClass('next');
    },
    getPrevious: function getPrevious() {
      return this.hazClass('previous');
    }
  });
});
/**
 * ChocolateChip-UI Widget - Segmented Buttons.
 */
$(function() {
  $.extend({
    /**
     * Setup a segmented button:
     */
    Segmented: function Segmented(options) {
      if (!options || !options.element) return;
      /**
              options = {
                element: '#segmentHolder'
                labels : ['first','second','third'],
                selected: 0,
                callback: function() { alert('Boring!'); }
              }
            */
      var settings = {
        selected: 0,
        callback: $.noop
      };
      $.extend(settings, options);
      var segmented = undefined;
      var labels = settings.labels ? settings.labels : [];
      var __selection = undefined;
      var __element = settings.element;

      function createSegmentedButton() {
        var androidSelectionIndicator = '';
        if ($.theme = 'android') {
          androidSelectionIndicator = '<span class="androidSelectionBorder"></span>';
        }
        var __segmented = ['<div class="segmented">'];
        labels.forEach(function(ctx, idx) {
          if (settings.selected === idx) {
            __segmented.push('<button role="radio" aria-checked="true" class="selected">');
            __selection = idx;
          } else {
            __segmented.push('<button role="radio">');
          }
          __segmented.push(ctx);
          __segmented.push('</button>');
        });
        __segmented.push(androidSelectionIndicator + '</div>');
        segmented = __segmented.join('');
        $(settings.element).append(segmented);
      }
      createSegmentedButton();
      /**
       * For Android Material Design:
       */
      var androidSelectionBorder = undefined;
      if ($.theme === 'android') {
        androidSelectionBorder = $(__element).find('.androidSelectionBorder');
        var selectedButton = $(__element).find('button').eq(settings.selected);
        var width = selectedButton.width();
        var left = selectedButton.offset().left - 16;
        if ($.dir === 'rtl') {
          left = selectedButton.offset().left + 16;
        }
        androidSelectionBorder.css({
          width: width + 'px',
          left: left + 'px'
        });
      }
      var callback = settings.callback;
      $(__element).on('tap', '.segmented > button', function(e) {
        var $this = $(this);
        if (this.parentNode.classList.contains('paging')) return;
        $this.siblings('button').removeClass('selected');
        $this.siblings('button').removeAttr('aria-checked');
        $this.addClass('selected');
        __selection = $this.index();
        __element = $(this);
        $this.attr('aria-checked', true);
        callback.call(this, e);
        /**
         * For Android Material Design:
         */
        if ($.theme === 'android') {
          var _width = $this.width();
          var _left = $this.offset().left - 16;
          if ($.dir === 'rtl') {
            _left = $this.offset().left + 16;
          }
          androidSelectionBorder.css({
            width: _width + 'px',
            left: _left + 'px'
          });
        }
      });
      return {
        getSelection: function getSelection() {
          return {
            index: __selection,
            element: __element
          };
        }
      };
    }
  });
});
/**
 * ChocolateChip-UI Widget - Select List.
 */
$.extend({
  /**
   * Setup a select list:
   */
  SelectList: function SelectList(options) {
    if (!options || !options.element) return;
    var settings = {
      element: undefined,
      selected: undefined,
      name: $.uuid(),
      callback: $.noop,
      model: undefined
    };
    var __selection = {};
    $.extend(settings, options);
    var name = settings.name;
    var list = $(settings.element);
    list.addClass('select-list');
    list.find('li').forEach(function(ctx, idx) {
      var value = ctx.getAttribute("data-select") !== null ? ctx.getAttribute("data-select") : "";
      ctx.setAttribute('role', 'radio');
      $(ctx).removeClass('selected').find('input').removeAttr('checked');
      $(ctx).append('<span class="selection-indicator"><svg width="20px" height="20px" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="selection-indicator"><path d="M2,13 L9.9294326,16.8406135 L17.1937075,1.90173332" id="checkmark" stroke="#007AFF" stroke-width="2"></path><circle id="outer-circle" stroke="#007AFF" stroke-width="2" cx="10" cy="10" r="9"></circle><circle id="inner-circle" fill="#007AFF" cx="10" cy="10" r="5"></circle></g></g></svg></span>');
      if (settings.selected === idx) {
        ctx.setAttribute('aria-checked', 'true');
        ctx.classList.add('selected');
        if (!$(ctx).find('input')[0]) {
          $(ctx).append('<input type="radio" checked="checked" name="' + name + '" value="' + value + '">');
        } else {
          $(ctx).find('input').prop('checked', true).attr('value', value);
        }
        __selection = {
          index: settings.selected,
          value: value
        };
      } else {
        if (!$(ctx).find('input')[0]) {
          $(ctx).append('<input type="radio" name="' + name + '" value="' + value + '">');
        }
      }
    });
    list.on('tap', 'li', function() {
      var item = $(this);
      __selection = {
        index: item.index(),
        value: item.find('input').val()
      };
      item.siblings('li').removeClass('selected');
      item.siblings('li').removeAttr('aria-checked');
      item.siblings('li').find('input').removeProp('checked');
      item.addClass('selected');
      item.attr('aria-checked', true);
      item.find('input').prop('checked', true);
      settings.callback.apply(this, arguments);
    });
    return {
      getSelection: function getSelection() {
        return __selection;
      }
    };
  }
});
/**
 * ChocolateChip-UI Widget - Sheets.
 */
$.extend({
  /**
   * Create a sliding sheet:
   */
  Sheet: function Sheet(options) {
    /**
          var options {
            id : 'starTrek',
            background: 'transparent',
            handle: false,
            slideDown: false // default is slideUp
          }
        */
    if (!options) return;
    var settings = {
      id: $.uuid(),
      background: '',
      handle: true,
      slideFrom: false
    };
    $.extend(settings, options);
    if (settings.background) settings.background = ' style="background-color:' + settings.background + '" ';
    if (settings.slideFrom === 'top') {
      settings.slideDown = ' class="slideDown" ';
    } else {
      settings.slideFrom = '';
    }
    if (settings.handle === false) settings.handle = '';
    else settings.handle = '<chui-sheet-handle><svg width="100%" height="100%" viewBox="0 0 76 27" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linecap:butt;stroke-linejoin:butt;stroke-miterlimit:1.41421;"><g id="sheet-handle" transform="matrix(1,0,0,1,-29.7966,-15.7797)"><path id="sheet-handle-path" d="M36.25,26.242L67.645,34.215L98.176,25.789" style="fill:none;"/></g></svg></chui-sheet-handle>';
    var sheet = '<sheet id="' + settings.id + '"' + settings.slideDown + settings.background + '>' + settings.handle + '<section></section></sheet>';
    $('body').append(sheet);
    $('#' + settings.id).find('chui-sheet-handle').on($.eventStart, function() {
      $.HideSheet('#' + settings.id);
    });
  },
  ShowSheet: function ShowSheet(id) {
    var sheet = id ? id : '.sheet';
    $('screen.current').addClass('blurred');
    if ($.isAndroid || $.isChrome) {
      $(sheet).css('display', 'block');
      setTimeout(function() {
        $(sheet).addClass('opened');
      }, 20);
    } else {
      $(sheet).addClass('opened');
    }
  },
  HideSheet: function HideSheet(id) {
    $(id).removeClass('opened');
    $('screen.current').addClass('removeBlurSlow');
    setTimeout(function() {
      $('screen').removeClass('blurred');
      $('screen').removeClass('removeBlurSlow');
    }, 500);
  }
});
/**
 * ChocolateChip-UI Widget - Slide Out Menu.
 */
$.extend({
  /**
   * Setup a slide out menu:
   */
  SlideOut: function SlideOut() {
    var slideoutID = $.uuid();
    var buttonID = $.uuid();
    var slideOutButton = $('<button id="' + buttonID + '" class="slide-out-button"></button>');
    var slideOut = '<slideout id="' + slideoutID + '"><section></section></slideout>';
    $('body').prepend(slideOut);
    $('body').append(slideOutButton);
    /**
     * Get Slide Out & Slide Out button:
     */
    var slideout = $('#' + slideoutID);
    var slideOutBtn = $('#' + buttonID);
    /**
     * Set up state for Slide Out and screens:
     */
    slideout.attr('aria-hidden', true);
    $("screens").attr('aria-hidden', true);
    $("screens").eq(0).addClass('show').attr('aria-hidden', "false");
    /**
     * Handle Slide Out button events:
     */
    slideOutBtn.on('tap', function() {
      $(this).toggleClass('focused');
      if (slideout.hasClass('open')) {
        slideout.removeClass('open');
        slideout.removeAttr('aria-hidden');
        $('button.back').removeClass('disabled').removeProp('disabled');
        $('button.backTo').removeClass('disabled').removeProp('disabled');
      } else {
        slideout.addClass('open');
        slideout.attr('aria-hidden', true);
        $('button.back').addClass('disabled').prop('disabled', true);
        $('button.backTo').addClass('disabled').prop('disabled', true);
      }
    });
    $('#' + slideoutID).on('tap', 'li', function() {
      var menuItems = slideout.find('li[data-show]');
      slideout.attr('aria-hidden', 'true');
      /**
       * Toggle Slide Out button:
       */
      slideOutBtn.toggleClass('focused');
      $('button.back').removeClass('disabled').removeProp('disabled');
      $('button.backTo').removeClass('disabled').removeProp('disabled');
      /**
       * This list item shows a single screen:
       */
      menuItems.hazClass('selected').removeClass('selected');
      $.screens.hazClass('show').removeClass('show').attr('aria-hidden', true);
      var screenToShow = '#' + $(this).attr('data-show').split(':')[0];
      /**
       * Account for presence of navigation list state:
       */
      setTimeout(function() {
        $(screenToShow)[0].classList.remove('next');
      }, 200);
      $(screenToShow)[0].classList.add('show');
      $(screenToShow).attr('aria-hidden', false);
      $('screen.current').addClass('next').removeClass('current');
      $('screen.previous').addClass('next').removeClass('previous');
      /**
       * Get route to dispatch:
       */
      $.Router.dispatch($(this).attr('data-show'));
      if ($.ChuiRoutes.length > 1) $.ChuiRoutes.pop();
      /**
       * Close slide out:
       */
      slideout.removeClass('open');
    });
    return {
      populate: function populate(options) {
        var slideout = $('#' + slideoutID);
        if (!slideout[0]) return;
        if (!options) {
          return;
        } else {
          (function() {
            slideout.find('section').append('<ul class="list"></ul>');
            var list = slideout.find('ul');
            options.forEach(function(ctx) {
              for (var key in ctx) {
                if (key === 'header') {
                  list.append('<li class="menu-header"><h2>' + ctx[key] + '</h2></li>');
                } else {
                  list.append('<li data-show="' + key + '"><h3>' + ctx[key] + '</h3></li>');
                }
              }
            });
            slideout.find('li').eq(0).addClass('selected');
          })();
        }
      }
    };
  }
});
/**
 * ChocolateChip-UI Widget - Stepper.
 */
$.extend({
  /**
   * Create a stepper:
   */
  Stepper: function Stepper(options) {
    if (!options) return;
    if (!options.element) return;
    if (!options.min) return;
    if (!options.max) return;
    var stepper = $(options.element);
    var min = options.min;
    var max = options.max;
    var defaultValue = options.defaultValue ? options.defaultValue : options.min;
    var increaseSymbol = '+';
    var decreaseSymbol = '-';
    var decreaseButton = '<button class="decrease"><span>-</span></button>';
    var label = '<label>' + defaultValue + '</label><input type="text" value="' + defaultValue + '">';
    var increaseButton = '<button class="increase"><span>+</span></button>';
    stepper.append(decreaseButton + label + increaseButton);
    stepper.data('data-value', {
      min: min,
      max: max,
      defaultValue: defaultValue
    });
    var increaseStepperValue = function increaseStepperValue() {
      var currentValue = stepper.find('input').val();
      var value = stepper.data('data-value');
      var max = value.max;
      var newValue = undefined;
      newValue = parseInt(currentValue, 10) + 1;
      stepper.find('button:first-of-type').removeAttr('disabled');
      stepper.find('label').text(newValue);
      stepper.find('input')[0].value = newValue;
      if (newValue === max) {
        $(this).attr('disabled', 'disabled');
      }
    };
    var decreaseStepperValue = function decreaseStepperValue() {
      var currentValue = stepper.find('input').val();
      var value = stepper.data('data-value');
      var newValue = undefined;
      newValue = parseInt(currentValue, 10) - 1;
      stepper.find('button:last-of-type').removeAttr('disabled');
      stepper.find('label').text(newValue);
      stepper.find('input')[0].value = newValue;
      if (newValue === min) {
        $(this).attr('disabled', 'disabled');
      }
    };
    stepper.find('button:last-of-type').on($.eventStart, function() {
      increaseStepperValue.call(this, stepper);
    });
    stepper.find('button:first-of-type').on($.eventStart, function() {
      decreaseStepperValue.call(this, stepper);
    });
    return {
      getValue: function getValue() {
        return stepper.find('input').val();
      }
    };
  }
});
/**
 * ChocolateChip-UI Widget - Switches.
 */
$.extend({
  /**
   * Create a switch control:
   */
  Switch: function Switch(options) {
    if (!options || !options.element) return;
    var __checked = false;
    var settings = {
      element: undefined,
      name: undefined,
      value: undefined,
      checked: false,
      onCallback: $.noop,
      offCallback: $.noop
    };
    $.extend(settings, options);
    var __selection = {
      checked: __checked,
      value: settings.value
    };
    var __element = $(settings.element);
    __checked = settings.checked;
    /**
     * Abrstract swipe for left-to-right and right-to-left:
     */
    var swipeOn = "swiperight";
    var swipeOff = "swipeleft";
    if (document.documentElement.dir === "rtl") {
      swipeOn = "swipeleft";
      swipeOff = "swiperight";
    }
    var checkState = settings.checked ? ' checked' : '';
    var __switch = '<em></em><input type="checkbox" name="' + settings.name + '" ' + checkState + ' value="' + settings.value + '">';
    __element.append(__switch);
    if (__checked) {
      __element.addClass('checked');
      __element.attr('role', 'checkbox');
    }
    __element.on('tap', function() {
      var checkbox = this.querySelector('input');
      if (this.classList.contains('checked')) {
        this.classList.remove('checked');
        this.setAttribute('aria-checked', false);
        checkbox.removeAttribute('checked');
        __selection.checked = false;
        __checked = false;
        settings.offCallback.call(this);
      } else {
        this.classList.add('checked');
        checkbox.setAttribute('checked', 'checked');
        this.setAttribute('aria-checked', true);
        __selection.checked = true;
        __checked = true;
        settings.onCallback.call(this);
      }
    });
    __element.on(swipeOn, function() {
      var checkbox = this.querySelector('input');
      if (this.classList.contains('checked')) {
        this.classList.remove('checked');
        this.setAttribute('aria-checked', false);
        checkbox.removeAttribute('checked');
        __selection.checked = true;
        __checked = true;
        settings.offCallback.call(this);
      }
    });
    __element.on(swipeOff, function() {
      var checkbox = this.querySelector('input');
      if (!this.classList.contains('checked')) {
        this.classList.add('checked');
        checkbox.setAttribute('checked', 'checked');
        this.setAttribute('aria-checked', true);
        __selection.checked = false;
        __checked = false;
        settings.onCallback.call(this);
      }
    });
    return {
      getValue: function getValue() {
        return __selection;
      }
    };
  }
});
/**
 * ChocolateChip-UI Widget - Tab Bar.
 */
$.extend({
  /**
   * Creates a Tab Bar for Toggling Articles:
   */
  TabBar: function TabBar(options) {
    /**
        var options = {
          id: 'mySpecialTabbar',
          labels: ["Refresh", "Add", "Info", "Downloads", "Favorite"],
          icons: ["refresh", "add", "info", "downloads", "favorite"],
          screens: [],
          selected: 2,
          showIcons: false // set to true for Android
        }
        */
    if (!options) return;
    var id = $.uuid();
    var settings = {
      selected: 0
    };
    $.extend(settings, options);
    if (!settings.icons.length) {
      settings.icons = settings.labels;
    }
    if (!settings.id) {
      settings.id = id;
    } else {
      id = settings.id;
    }
    /**
     * Private variable to keep track of screens:
     */
    var __tabbarScreens = $();
    var screens = $();
    var screenPrefix = '#';
    if (settings.screens) {
      settings.screens.forEach(function(screen) {
        if (!/screenPrefix/img.test(screen)) {
          __tabbarScreens.push($(screenPrefix + screen)[0]);
          $(screenPrefix + screen).addClass('tabScreen');
        } else {
          __tabbarScreens.concat($(screen)[0]);
          $(screen).addClass('tabScreen');
        }
      });
    } else {
      settings.labels.forEach(function(screen, idx) {
        __tabbarScreens.push(screens.eq(idx));
      });
    }
    var selectedScreen = undefined;
    var androidSelectionIndicator = '';
    if ($.theme === 'android') {
      androidSelectionIndicator = '<span class="androidSelectionBorder"></span>';
    }
    var showIcons = settings.showIcons ? ' class="showIcons" ' : '';
    /**
     * Helper: Set Screen to Current:
     */
    var setToCurrent = function setToCurrent(element) {
      $(element).removeClass('previous').removeClass('next').addClass('current');
      $(element).attr('aria-hidden', 'false');
    };
    /**
     * Helper: Set Screen to Next:
     */
    var setToNext = function setToNext(element) {
      $(element).removeClass('current').addClass('next');
      $(element).attr('aria-hidden', 'true');
    };
    /**
     * Create tabs:
     */
    var makeTab = function makeTab(label, icon, idx) {
      var tab = '<button role="tab" class="' + icon;
      if (settings.selected === idx) {
        tab += ' selected';
      }
      tab += '"';
      if (settings.screens && settings.screens.length) {
        tab += ' data-id="' + settings.screens[idx] + '"';
      }
      tab += '><span class="icon"></span><label>' + settings.labels[idx] + '</label></button>';
      return tab;
    };
    /**
     * Create tab bar:
     */
    var tabbarTmpl = $('<tabbar role="tabpanel"' + showIcons + '>' + androidSelectionIndicator + '</tabbar>');
    tabbarTmpl[0].id = settings.id;
    tabbarTmpl.addClass('tabbar');
    setToNext($('screen'));
    selectedScreen = $('screen').eq(settings.selected);
    setToCurrent(selectedScreen);
    if (settings.labels.length) {
      settings.labels.forEach(function(label, idx) {
        tabbarTmpl.append(makeTab(label, settings.icons[idx], idx));
      });
    }
    /**
     * Append tabbar to page:
     */
    $('body').prepend(tabbarTmpl);
    /**
     * Get id of appended tab bar:
     */
    var tabbar = $('#' + settings.id);
    var selectedTabButton = tabbar.find('button.selected');
    /**
     * Private variables to manage tab bar: 
     */
    var __tabbarButtons = tabbar.find('button');
    var __selectedTabbarButton = __tabbarButtons.eq(settings.selected);
    var __selectedTabbarScreen = __tabbarScreens.eq(settings.selected);
    /**
     * For Android Material Design:
     */
    var androidSelectionBorder = tabbar.find('.androidSelectionBorder');

    function handleTabSelectionForAndroid(tab) {
      var width = $(tab).width();
      var left = $(tab).offset().left;
      androidSelectionBorder.css({
        width: width + 'px',
        left: left + 'px'
      });
    }
    if ($.theme === 'android') {
      handleTabSelectionForAndroid(selectedTabButton);
    }
    /**
     * Setup events on tabs:
     */
    $(function() {
      $.ChuiRoutes = [];
      $.ChuiRoutes.push(__tabbarScreens.eq(settings.selected)[0].id);
      var tabbarButtons = tabbar.find('button');
      $.Router.dispatch(__selectedTabbarScreen[0].id);
      tabbarButtons.forEach(function(button, idx) {
        $(button).data('chui-route', __tabbarScreens.eq(idx)[0].id);
      });
      /**
       * Tap on tab:
       */
      tabbar.on('tap', 'button', function() {
        var tab = $(this);
        var routes = tab.data('chui-route').split('/');
        var fullRoute = $.ChuiRoutes.join('/');
        var navRoutesFull = tab.data('chui-route');
        var navRoutes = navRoutesFull.split('/');
        /**
         * This tab holds a navigation list:
         */
        if (routes.length > 1) {
          __tabbarButtons.hazClass('selected').data('chui-route', fullRoute);
          __tabbarButtons.hazClass('selected').removeClass('selected').addClass('next');
          navRoutesFull = $(this).data('chui-route');
          /**
           * Set this tab to `selected`:
           */
          tab.addClass('selected');
          /**
           * Deal with previously selected tab and screen:
           */
          $('screens').removeClass('current').addClass('next').attr('aria-hidden', true);
          $('screens').removeClass('previous').addClass('next').attr('aria-hidden', true);
          var _navRoutes = navRoutesFull.split('/');
          _navRoutes.forEach(function(route, idx) {
            var routing = route.split(':');
            var whichRoute = routing[0];
            if (idx !== routes.length - 1) {
              $('#' + whichRoute).removeClass('next').addClass('previous').attr('aria-hidden', true);
            } else {
              $('#' + whichRoute).removeClass('next').addClass('current').attr('aria-hidden', false);
            }
          });
          /**
           * Take care of routes:
           */
          $.ChuiRoutes = routes;
          $.Router.dispatch(routes[routes.length - 1]);
          /**
           * Handle Android ripple effect:
           */
          if ($.theme === 'android') {
            handleTabSelectionForAndroid(tab);
          }
          /**
           * This tab has a single screen:
           */
        } else {
          var screen = $('screen').eq(tab.index());
          __tabbarButtons.hazClass('selected').data('chui-route', fullRoute);
          __tabbarButtons.hazClass('selected').removeClass('selected').addClass('next');
          /**
           * Deal with previously selected tab and screen:
           */
          $('screen').removeClass('current').addClass('next').attr('aria-hidden', true);
          $('screen').removeClass('previous').addClass('next').attr('aria-hidden', true);
          /**
           * Set this tab to `selected`:
           */
          tab.addClass('selected');
          if ($.theme === 'android') {
            handleTabSelectionForAndroid(tab);
          }
          routes.forEach(function(route, idx) {
            var routing = route.split(':');
            var whichRoute = routing[0];
            if (idx !== routes.length - 1) {
              $('#' + whichRoute).removeClass('next').addClass('previous').attr('aria-hidden', true);
            } else {
              $('#' + whichRoute).removeClass('next').addClass('current').attr('aria-hidden', false);
            }
          });
          /**
           * Take care of routes:
           */
          $.ChuiRoutes = routes;
          $.Router.dispatch(fullRoute);
        }
      });
    });
    return {
      getSelectedTab: function getSelectedTab() {
        return __selectedTabbarButton;
      },
      getSelectedScreen: function getSelectedScreen() {
        return __selectedTabbarScreen;
      },
      setSelectedTab: function setSelectedTab(position) {
        tabbar.find('button').iz('.selected').removeClass('selected').addClass('next');
        tabbar.children('button').eq(position).addClass('selected');
        setToNext(__tabbarScreens.iz('.current')[0]);
        setToCurrent(__tabbarScreens.eq(position)[0]);
      }
    };
  }
});
/**
 * Android Ripple Effect - Triggered when Android theme is detected.
 */
$(function() {
  if ($.theme === 'android') {
    $('body').on($.eventStart, "button, ul.editing > li, li[data-show], li[data-select], li[data-goto], chui-sheet-handle, switch, .popover li", function(e) {
      var target = this;
      /**
       * If item is disabled, do nothing.
       */
      if (target.hasAttribute("disabled") || target.classList.contains("disabled")) {
        return;
      }
      /**
       * Get dimensions of target:
       */
      var offset = $(target).offset();
      var w = Math.min(this.offsetWidth, 160);
      var h = Math.min(this.offsetHeight, 160);
      var d = Math.max(w, h);
      /**
       * Set width and height to whichever is greater:
       */
      w = d;
      h = d;
      var x = e.pageX - offset.left;
      var y = e.pageY - offset.top;
      var navBkColor = undefined;
      var backgroundColor = undefined;
      /**
       * Create ripple sheath and append to target:
       */
      var ripple = $('<ripple-sheath></ripple-sheath>');
      $(target).append(ripple);
      /**
       * Check if button  is in navbar.
       * If it is, get navbar background color and base ripple on that:
       */
      if (target.nodeName === 'BUTTON' && target.classList.contains('slide-out-button')) {
        var _navBkColor = $('nav').eq(0).css('background-color');
        backgroundColor = new $.ChuiColor(_navBkColor).toHex();
      } else if (target.nodeName === 'BUTTON' && $(target).closest('nav')[0]) {
        navBkColor = $(target).closest('nav').css('background-color');
        backgroundColor = new $.ChuiColor(navBkColor).toHex();
      } else {
        backgroundColor = $(this).css('background-color');
        if (!backgroundColor || backgroundColor === 'rgba(0, 0, 0, 0)') {
          backgroundColor = '#fff';
        }
      }
      /**
       * Handle ripple color:
       */
      var rippleColor = '#fff';
      var brightness = $.calculateBrightness(backgroundColor);
      if (brightness > 195) {
        rippleColor = '#aaa';
      } else {
        rippleColor = '#fff';
      }
      /**
       * If ripple sheath has custom color for ripple, use that:
       */
      if (target.dataset.rippleColor) {
        rippleColor = target.dataset.rippleColor;
      }
      /**
       * Create expanding ripple effect:
       */
      var rippleWave = $('<ripple-wave></ripple-wave>');
      rippleWave.css({
        "background-color": rippleColor,
        width: h + 'px',
        height: h + 'px',
        left: x - h / 2 + 'px',
        top: y - h / 2 + 'px'
      });
      /**
       * Append to ripple, then delete:
       */
      ripple.append(rippleWave);
      setTimeout(function() {
        ripple.remove();
      }, 1000);
    });
  }
});
