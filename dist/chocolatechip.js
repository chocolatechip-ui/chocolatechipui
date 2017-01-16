'use strict';
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function(obj) {
  return typeof obj;
} : function(obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
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

function _toConsumableArray(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }
    return arr2;
  } else {
    return Array.from(arr);
  }
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
        this[0] = document;
        this.length = 1;
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
        if (index >= this.array.length) return new DOMStack();
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
      if (data && data.objectType === 'domstack') {
        this.array = this.array.concat(data.array);
      } else {
        this.array.push(data);
      }
      this.length = this.array.length;
      this[0] = this.array[0];
    }
  }, {
    key: 'pop',
    value: function pop() {
      this.length = this.array.length - 1;
      var ret = this.array.pop();
      return $(ret);
    }
  }, {
    key: 'unshift',
    value: function unshift(data) {
      if (data && data.objectType === 'domstack') {
        this.array.unshift(data.array[0]);
      } else {
        this.array.unshift(data);
      }
      this[0] = this.array[0];
      this.length = this.array.length;
    }
  }, {
    key: 'shift',
    value: function shift() {
      this.length = this.array.length - 1;
      var ret = this.array.shift();
      return $(ret);
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
      return $(ret);
    }
  }, {
    key: 'splice',
    value: function splice() {
      var ret = new DOMStack();
      for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }
      ret.concat(this.array.splice.apply(this.array, args));
      this[0] = this.array[0];
      this.length = this.array.length;
      return $(ret);
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
    key: 'indexOf',
    value: function indexOf(node) { // return this.array.indexOf.apply(this.array, args);
      if (!node) return -1;
      if (node.nodeType && node.nodeType === 1) {
        return this.array.indexOf(node);
      } else if (node && node.objectType === 'domstack') {
        return this.array.indexOf(node[0]);
      } else if (node && Array.isArray(node)) {
        return this.array.indexOf(node[0]);
      } else if (node && $.type(node) === 'string') {
        var _el = this[0].parentNode.querySelector(node);
        return this.array.indexOf(_el);
      }
    }
  }, {
    key: 'concat',
    value: function concat(collection) {
      var temp = undefined;
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
    key: 'every',
    value: function every() {
      for (var _len6 = arguments.length, args = Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
        args[_key6] = arguments[_key6];
      }
      return this.array.every.apply(this.array, args);
    }
  }, {
    key: 'some',
    value: function some() {
      for (var _len7 = arguments.length, args = Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
        args[_key7] = arguments[_key7];
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
    key: 'get',
    value: function get() {
        return this.array;
      }
      /**
       * Deprecated. Use `get()`.
       */
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
          temp.length = temp.array.length;
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
    version: '4.8.4',
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
        return str.replace(/[&<>\(\)]/g, replaceTag);
      };
      str = safe_tags_replace(str);
      return JSON.parse(str);
    },
    /** 
     * Concat arguments into a string:
     */
    concat: function concat() {
      for (var _len8 = arguments.length, args = Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
        args[_key8] = arguments[_key8];
      }
      if (Array.isArray(args)) {
        if (Array.isArray(args[0])) {
          return args[0].join('');
        } else {
          return args.join('');
        }
      } else {
        return Array.prototype.slice(args).join('');
      }
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
    /**
     * Compare one value with another, one object with another, one array with another, etc.
     */
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
     * Chunk an array into pieces based on itemsPerChunk.
     * You can use this to paginate an array of data.
     */
    paginate: function paginate(data, itemsPerChunk) {
      var ret = [];
      var pages = Math.floor(data.length / itemsPerChunk);
      if (data.length % pages) pages++;
      var temp = 0;
      for (var i = 0; i < pages; i++) {
        if (temp === data.length) break;
        var thing = data.slice(temp, itemsPerChunk + temp);
        ret.push(thing);
        temp += itemsPerChunk;
      }
      return ret;
    },
    /**
     * Recursively flatten an array with nested arrays.
     */
    flatten: function flatten(array) {
      var flat = Array.prototype.concat(array);
      for (var i = 0; i < flat.length; i++) {
        if (Array.isArray(flat[i])) {
          flat.splice.apply(flat, [i, 1].concat(_toConsumableArray(flat[i--])));
        }
      }
      return flat;
    },
    /**
     * Fires an event once during provided wait period. Options are: {leading: true/false, trailing: true/false}.
     * By default leading is true, meaning that the first event input will fire. Setting leading to false will disable this.
     * By default trailing is true. Set this to false to disable it.
     */
    throttle: function throttle(func, wait, options) {
      var context = void 0,
        args = void 0,
        result = void 0;
      var timeout = null;
      var previous = 0;
      if (!options) options = {};
      var later = function later() {
        previous = options.leading === false ? 0 : new Date().getTime();
        timeout = null;
        result = func.apply(context, args);
        if (!timeout) context = args = null;
      };
      return function() {
        var now = new Date().getTime();
        if (!previous && options.leading === false) previous = now;
        var remaining = wait - (now - previous);
        context = this;
        args = arguments;
        if (remaining <= 0 || remaining > wait) {
          if (timeout) {
            clearTimeout(timeout);
            timeout = null;
          }
          previous = now;
          result = func.apply(context, args);
          if (!timeout) context = args = null;
        } else if (!timeout && options.trailing !== false) {
          timeout = setTimeout(later, remaining);
        }
        return result;
      };
    },
    /**
     * Fires and event once after the designated wait time, regardless of how many other events occurred.
     * In the case of an input, this will start with the first keypress. After the last keypress and the wait time, the event will fire.
     * You can make the event fire after the time by passing a third optional truthy argument.
     */
    debounce: function debounce(func, wait, immediate) {
      var timeout = void 0,
        args = void 0,
        context = void 0,
        timestamp = void 0,
        result = void 0;
      var later = function later() {
        var last = new Date().getTime() - timestamp;
        if (last < wait && last >= 0) {
          timeout = setTimeout(later, wait - last);
        } else {
          timeout = null;
          if (!immediate) {
            result = func.apply(context, args);
            if (!timeout) context = args = null;
          }
        }
      };
      return function() {
        context = this;
        args = arguments;
        timestamp = new Date().getTime();
        var callNow = immediate && !timeout;
        if (!timeout) timeout = setTimeout(later, wait);
        if (callNow) {
          result = func.apply(context, args);
          context = args = null;
        }
        return result;
      };
    },
    /**
     * Execute a function only once.
     */
    once: function once(func) {
      var times = 2;
      var memo = void 0;
      return function() {
        if (--times > 0) {
          if ($.type(func) === 'function') {
            memo = func.apply(this, arguments);
          }
        }
        if (times <= 1) func = null;
        return memo;
      };
    },
    /**
     * Execute a function only upto x times.
     * This takes two arguments: the times upto when execution can happen and the callback to execute.
     */
    before: function before(times, func) {
      var memo = void 0;
      return function() {
        if (--times > 0) {
          if ($.type(func) === 'function') {
            memo = func.apply(this, arguments);
          }
        }
        if (times <= 1) func = null;
        return memo;
      };
    },
    /**
     * Execute a function only after x times.
     * This takes two arguments: the times or attempts before execution and a callback to execute.
     */
    after: function after(times, func) {
      return function() {
        if (--times < 1) {
          return func.apply(this, arguments);
        }
      };
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
      if (!this.array.length) return ret;
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
      var _this = this;
      var ret = false;
      if (!this.array.length || !arg) return;
      if (!this.array.length) return;
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
        } else if (arg && arg.objectType && arg.objectType === 'domstack') {
          if (node === arg[0]) {
            ret = true;
          }
        } else if (arg && arg.length) {
          if (_this.slice.apply(arg).indexOf(node) !== -1) {
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
    not: function not(arg) {
      var ret = new DOMStack();
      if (!this.array.length || !arg) return new DOMStack();
      if (!this.array.length) return new DOMStack();
      var that = this;
      var __nots = function __nots(node, arg) {
        var result = [];
        if (typeof arg === 'string') {
          var nodes = undefined;
          if (node.parentNode) nodes = node.parentNode.querySelectorAll(arg);
          var elements = undefined;
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
      this.forEach(function(item) {
        temp.push(__nots(item, arg));
      });
      temp = $.flatten(temp);
      ret.concat(temp);
      return ret;
    },
    has: function has(arg) {
      var _this2 = this;
      if (!this.array.length) return new DOMStack();
      var ret = new DOMStack();
      var self = this;
      var __has = function __has(node, arg) {
        if (typeof arg === 'string') {
          if (node.querySelector(arg)) {
            return true;
          }
        } else if (arg && arg.nodeType === 1) {
          if (Array.prototype.slice.apply(self.children).indexOf(arg)) {
            return true;
          }
        } else if (arg && arg.objectType === 'domstack') {
          var children = _this2.children();
          if (children.array.indexOf(arg[0]) != -1) {
            return true;
          }
        }
        return false;
      };
      this.forEach(function(element) {
        if (__has(element, arg)) {
          ret.push(element);
        }
      });
      return ret;
    },
    prev: function prev(selector) {
      if (!this.array.length) return new DOMStack();
      var ret = new DOMStack();
      var children = undefined;
      var previousElement = this[0].previousElementSibling;
      if (selector && typeof selector === 'string') {
        children = this.siblings(selector);
        var selectorCheck = this.parent().children(selector);
        selectorCheck.forEach(function(element) {
          if (element === previousElement) {
            ret.push(element);
          }
        });
      } else {
        ret.push(this[0].previousElementSibling);
      }
      return ret;
    },
    prevAll: function prevAll(selector) {
      if (!this.array.length) return new DOMStack();
      var ret = new DOMStack();
      var __siblings = undefined;
      var __parent = undefined;
      var __self = this[0];
      var __sibs = Array.prototype.slice.apply(this[0].parentNode.children);
      var pos = __sibs.indexOf(__self);
      if (selector && typeof selector === 'string') {
        __parent = this.array[0].parentNode;
        __siblings = $(__parent).find(selector);
        __siblings.forEach(function(el) {
          if (__sibs.indexOf(el) < pos) {
            ret.push(el);
          }
        });
      } else {
        __sibs.splice(pos);
        ret.concat(__sibs);
      }
      return ret;
    },
    next: function next(selector) {
      if (!this.array.length) return new DOMStack();
      var ret = new DOMStack();
      var children = undefined;
      var nextElement = this[0].nextElementSibling;
      if (selector && typeof selector === 'string') {
        children = this.siblings(selector);
        children.forEach(function(element) {
          if (nextElement === element) {
            ret.push(element);
          }
        });
      } else {
        ret.push(this[0].nextElementSibling);
      }
      return ret;
    },
    nextAll: function nextAll(selector) {
      if (!this.array.length) return new DOMStack();
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
      if (!this.array.length) return new DOMStack();
      return this.eq(0);
    },
    last: function last() {
      if (!this.array.length) return new DOMStack();
      return this.eq(-1);
    },
    index: function index(element) {
      if (!this.array.length) return undefined;
      if (!element) {
        if (this.length >= 0) {
          return 1;
        } else if (this.length == 0) {
          return -1;
        } else {
          return -1;
        }
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
      if (!this.array.length) return new DOMStack();
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
      if (!this.array.length) return new DOMStack();
      var __siblings = undefined;
      var ret = new DOMStack();
      var $this = this;
      var parent = undefined;
      var children = Array.prototype.slice.apply($this[0].parentNode.children);
      /**
       * Remove this from siblings:
       */
      if (selector && typeof selector === 'string') {
        parent = this.array[0].parentNode;
        __siblings = $(parent).find(selector);
        var newPos = __siblings.array.indexOf($this[0]);
        __siblings.array.splice(newPos, 1);
        ret.concat(__siblings);
      } else {
        var pos = children.indexOf($this[0]);
        children.splice(pos, 1);
        ret.concat(children);
      }
      return ret;
    },
    parent: function parent(selector) {
      if (!this.array.length) return new DOMStack();
      var ret = new DOMStack();
      var parents = undefined;
      var self = this[0];
      var result = [];
      if (selector) {
        parents = Array.prototype.slice.apply(self.parentNode.parentNode.querySelectorAll(selector));
        parents.forEach(function(el) {
          if (el === self.parentNode) {
            result.push(el);
          }
        });
        result.unique();
        ret.concat(result);
      } else {
        this.forEach(function(ctx) {
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
    closest: function closest(selector) {
      if (!this.array.length) return new DOMStack();
      var ret = new DOMStack();
      if (typeof selector === 'undefined') {
        return new DOMStack();
      }
      var p = undefined;
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
    css: function css(property, value) {
      if (!this.array.length) return new DOMStack();
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
        if (!this.array.length) return;
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
      if (!this.array.length) return;
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
        var styles = window.getComputedStyle(this[0]);
        return parseInt(styles.width, 10);
      }
    },
    height: function height(amount) {
      if (!this.array.length) return;
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
        var styles = window.getComputedStyle(this[0]);
        return parseInt(styles.height, 10);
      }
    },
    before: function before(content) {
      var _this3 = this;
      if (!this.array.length) {
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
        return _this3;
      };
      this.forEach(function(node) {
        return __before(node, content);
      });
      return this;
    },
    after: function after(content) {
      var _this4 = this;
      if (!this.array.length) return new DOMStack();
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
        return _this4;
      };
      this.forEach(function(node) {
        return __after(node, content);
      });
      return this;
    },
    prepend: function prepend(content) {
      if (!this.array.length) return new DOMStack();
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
          element.insertBefore(content, element.firstChild);
        });
      }
      return this;
    },
    append: function append(content) {
      if (!this.array.length) return new DOMStack();
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
          element.insertBefore(content, null);
        });
      }
      return this;
    },
    prependTo: function prependTo(selector) {
      if (!this.array.length) return new DOMStack();
      this.reverse();
      this.forEach(function(item) {
        return $(selector).prepend(item);
      });
      return this;
    },
    appendTo: function appendTo(selector) {
      if (!this.array.length) return new DOMStack();
      this.forEach(function(item) {
        return $(selector).append(item);
      });
      return this;
    },
    clone: function clone(value) {
      if (!this.array.length) return new DOMStack();
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
      if (!this.array.length || !string) return new DOMStack();
      var tempNode = undefined;
      var whichClone = undefined;
      this.forEach(function(ctx) {
        tempNode = $.html(string);
        whichClone = $(ctx).clone(true);
        tempNode.append(whichClone);
        $(ctx).before(tempNode);
        $(ctx).remove();
      });
    },
    unwrap: function unwrap() {
      if (!this.array.length) return new DOMStack();
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
      if (!this.array.length) return;
      var offset = this[0].getBoundingClientRect();
      return {
        top: Math.round(offset.top),
        left: Math.round(offset.left),
        bottom: Math.round(offset.bottom),
        right: Math.round(offset.right)
      };
    },
    position: function position() {
      var parent = this[0].parentNode;
      var pos = this[0].getBoundingClientRect();
      var parentPos = parent.getBoundingClientRect();
      var obj = {
        top: pos.top - parentPos.top,
        left: pos.left - parentPos.left
      };
      return obj;
    },
    empty: function empty() {
      if (!this.array.length) return new DOMStack();
      var ret = new DOMStack();
      this.forEach(function(ctx) {
        $(ctx).children().off();
        ctx.textContent = '';
        ret.push(ctx);
      });
      return ret;
    },
    html: function html(content) {
      if (!this.array.length) return new DOMStack();
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
      if (!this.array.length) return new DOMStack();
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
      if (!this.array.length) return new DOMStack();
      this.forEach(function(node) {
        $(node).off();
        if (node.parentNode) node.parentNode.removeChild(node);
      });
    },
    addClass: function addClass(className) {
      if (!this.array.length) return new DOMStack();
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
      if (!this.array.length) return new DOMStack();
      var temp = false;
      this.forEach(function(element) {
        if (element.classList.contains(className)) {
          temp = true;
        }
      });
      return temp;
    },
    removeClass: function removeClass(className) {
      if (!this.array.length) return new DOMStack();
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
      if (!this.array.length) return new DOMStack();
      var ret = new DOMStack();
      this.forEach(function(node) {
        node.classList.toggle(className);
        ret.push(node);
      });
      return ret;
    },
    attr: function attr(attribute, value) {
      if (!this.array.length) return new DOMStack();
      var ret = new DOMStack();
      var __attr = function __attr(node, attribute, value) {
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
        this.forEach(function(node) {
          __attr(node, attribute, value);
          ret.push(node);
        });
      }
      if (ret.length) {
        return ret;
      }
    },
    removeAttr: function removeAttr(attribute) {
      if (!this.array.length) return new DOMStack();
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
      if (!this.array.length) return new DOMStack();
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
      if (!this.array.length) return new DOMStack();
      this[0][property] = false;
      return [this[0]];
    },
    disable: function disable() {
      if (!this.array.length) return new DOMStack();
      this.forEach(function(node) {
        node.classList.add('disabled');
        node.disabled = true;
        node.style.cursor = 'default';
      });
      return this;
    },
    enable: function enable() {
      if (!this.array.length) return new DOMStack();
      this.forEach(function(node) {
        node.classList.remove('disabled');
        node.removeAttribute('disabled');
        node.style.cursor = 'auto';
      });
      return this;
    },
    val: function val(value) {
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
    hide: function hide() {
      var display = this.css('display');
      this.data('display_attr', display);
      this.css('display', 'none');
    },
    show: function show() {
      var display = this.data('display_attr');
      if (!display) return this;
      if (display === 'none') {
        display = 'block';
      }
      this.css('display', display);
    },
    unique: function unique() {
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
        self.push(node);
      });
      this.length = this.array.length;
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
      trigger: function trigger(event, data) {
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
            evtObj.data = data;
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
      } catch (err) {}
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
    var _this5 = this;
    if (!this.size()) return this;
    this.forEach(function(element) {
      var id = element.id;
      if (!id) return _this5;
      if (!CCDataCache.elements[id]) {
        return _this5;
      }
      if (!key) {
        delete CCDataCache.elements[id];
        return _this5;
      }
      if (Object.keys(CCDataCache.elements[id]).length === 0) {
        delete CCDataCache.elements[id];
      } else {
        delete CCDataCache.elements[id][key];
      }
      return _this5;
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
          if (_type.objectType && _type.objectType === 'domstack') {
            return 'domstack'; /* If Promise polyfill, then should support `then`. */
          } else if (_type.then) {
            return 'promise'; /* Otherwise we got a normal object here. */
          } else {
            return 'object';
          }
        } else if (Object.prototype.toString.call(_type) === '[object Number]') {
          return 'number';
        } else if (Object.prototype.toString.call(_type) === '[object String]') {
          return 'string';
        } else if (Object.prototype.toString.call(_type) === '[object Promise]') {
          return 'promise';
        } else if (Object.prototype.toString.call(_type) === '[object Boolean]') {
          return 'boolean';
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
  isNotEmpty: function isNotEmpty() {
    if (this[0].nodeName !== 'INPUT') return;
    var value = this[0].nodeName === 'INPUT' && this[0].value;
    return checkValidity(this, value);
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
    var age = this[0].value;
    if (!age) {
      return checkValidity(this, false);
    } else if (age && minimum) {
      return checkValidity(this, age >= minimum);
    } else if (age) {
      return checkValidity(this, true);
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
      return false;
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
    if (radio.is('[checked]')) {
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
    var psswd1 = $(input1)[0];
    var psswd2 = $(input2)[0];
    if (minimum && psswd1.value < minimum || psswd2.value < minimum) {
      psswd1.classList.add('invalid');
      psswd1.classList.remove('valid');
      psswd2.classList.add('invalid');
      psswd2.classList.remove('valid');
      return false;
    } else {
      var letters = /^(?=.*[a-zA-Z])(?=.*[0-9]).+$/;
      if (!letters.test(psswd1.value) && !letters.test(psswd2.value)) return false;
      if (psswd1.value === psswd2.value) {
        psswd1.classList.remove('invalid');
        psswd1.classList.add('valid');
        psswd2.classList.remove('invalid');
        psswd2.classList.add('valid');
      } else {
        psswd1.classList.add('invalid');
        psswd1.classList.remove('valid');
        psswd2.classList.add('invalid');
        psswd2.classList.remove('valid');
      }
      return psswd1.value === psswd2.value;
    }
  },
  validateWithRegex: function validateWithRegex(input, regex) {
    if (!input || !regex) {
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
          if (!item.name) return;
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
      var inputs = void 0;
      if (!item.type) {
        convertToObject($(item.element).attr('name'), $(item.element).val());
        return;
      }
      switch (item.type) {
        case 'notempty':
          __passed = $(item.element).isNotEmpty();
          validateElement(item);
          break;
        case 'number':
          __passed = $(item.element).validateNumber();
          validateElement(item);
          break;
        case 'text':
          __passed = $(item.element).validateText();
          validateElement(item);
          break;
        case 'alphanumeric':
          __passed = $(item.element).validateAlphaNumeric();
          validateElement(item);
          break;
        case 'username':
          __passed = $(item.element).validateUserName(item.min);
          validateElement(item);
          break;
        case 'email':
          __passed = $(item.element).validateEmail();
          validateElement(item);
          break;
        case 'phone':
          __passed = $(item.element).validatePhoneNumber();
          validateElement(item);
          break;
        case 'url':
          __passed = $(item.element).validateUrl();
          validateElement(item);
          break;
        case 'age':
          __passed = $(item.element).validateAge(item.min);
          validateElement(item);
          break;
        case 'checkbox':
          __passed = $(item.element).validateCheckbox();
          if (__passed) {
            validateElement(item);
          }
          break;
        case 'radio':
          __passed = $(item.element).validateRadioButtons();
          validateElement(item);
          break;
        case 'selectbox':
          __passed = $(item.element).validateSelectBox();
          validateElement(item);
          break;
        case 'password':
          __passed = $.validatePassword(item.element, item.element2, item.min);
          __errors.push({
            element: item.element,
            element2: item.element2,
            type: item.type
          });
          if (__passed) {
            validateElement(item);
          }
          break;
        case 'switch':
          __passed = $(item.element).validateSwitch();
          if (__passed) {
            validateElement(item);
          }
          break;
        case 'selectlist':
          __passed = $(item.element).validateSelectList();
          if (__passed) {
            inputs = undefined;
            inputs = $(item.element).find('input').forEach(function(item) {
              if (item.checked) {
                convertToObject(item.name, item.value);
              }
            });
          }
          break;
        case 'multiselectlist':
          __passed = $(item.element).validateMultiSelectList();
          inputs = undefined;
          if (__passed) {
            inputs = $(item.element).find('input[type=checkbox]');
            inputs.forEach(function(item) {
              if (item.checked) {
                convertToObject(item.name, item.value);
              }
            });
          }
          break;
      }
      if (item.type.match(/custom/)) {
        var cv = $.customValidators.filter(function(validator) {
          return validator.name === item.type;
        });
        if (cv) {
          var result = $.validateWithRegex(item.element, cv[0].regex);
          if (result) {
            var _el2 = $(item.element);
            convertToObject(_el2[0].name, _el2[0].value);
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
      viewHasNoTemplate: "ChocolateChip-UI View Error: This view has no template. Either you created it without a template, or there was some problem parsing the template. Please check how this view is set up.",
      noStyleObject: "ChocolateChip-UI View Error: No style object was provided for the view style property. Check that a proper style object was provided. If you are not sure,  consult the documentation."
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
      viewHasNoTemplate: "Hubo Error de Vista ChocolateChip-UI: Esta vista no tiene plantilla. Ó se creó la vista sin plantilla, ó hubo algún error al procesar la plantilla. Debe chequear cómo se definó la vista.",
      noStyleObject: "Hubo Error de Vista ChocolateChip-UI: No se proporcionó un objeto de estilos para la propiedad de estilos de la vista. Debe de chequear que el objeto de estilos está correcto. Si Usted no está serguro de eso, consulte la documentación."
    }
  };
  var errors = undefined;
  if ($('html').attr('lang') == 'en') errors = ViewErrorMessages.en;
  if ($('html').attr('lang') == 'es') errors = ViewErrorMessages.es;
  /**
   * Private function to parse style object in view and convert it into virtual stylesheet based on the view's element.
   */
  function ChuiStyle() {
    /**
     * Reuse the same style sheet for all instances.
     */
    var sharedSheet = null;
    /**
     * Properties that accept a number but do not need a unit.
     */
    var unitlessProps = {
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
    };
    /**
     * If auto units is enabled, any property value that is a number will be converted to a string with the specified unit appended.
     */
    function CreateStyleSheet(options) {
      if (!(this instanceof CreateStyleSheet)) {
        return new CreateStyleSheet(options);
      }
      options || (options = {});
      options.prefix = !options.hasOwnProperty("prefix") ? true : !!options.prefix;
      options.unit = options.hasOwnProperty("unit") ? options.unit : "px";
      this._sheet = null;
      this._prefix = null;
      /**
       * Insert one or more style objects in a stylesheet.
       */
      this.css = function(element, styles, selector) {
        if (styles == null) return "";
        if (this._sheet == null) {
          this._sheet = sharedSheet = sharedSheet || createStyleSheet();
        }
        selector = element;
        var rules = rulesFromStyles(selector, styles);
        if (options.prefix || options.unit !== "") {
          rules.forEach(function(set) {
            if (options.unit !== "") {
              addUnit(set[1], options.unit);
            }
          });
        }
        insertRules(rules, this._sheet);
      };
    }
    /**
     * Returns {CSSStyleSheet}
     */
    function createStyleSheet() {
      if (document.head == null) {
        throw new Error("Can't add stylesheet before <head> is available. Make sure your document has a head element.");
      }
      var style = document.createElement("style");
      style.id = "chui_styles_" + $.uuid();
      document.head.appendChild(style);
      return style.sheet;
    }
    /**
     * Returns CSS rule sets as selector/style vectors.
     */
    function rulesFromStyles(selector, styles) {
      if (!Array.isArray(styles)) styles = [styles];
      var style = {};
      var rules = [];
      styles = $.flatten(styles);
      styles.forEach(function(block) {
        for (var prop in block) {
          var value = block[prop];
          if (isPlainObject(value) || Array.isArray(value)) {
            rules = rules.concat(rulesFromStyles(combineSelectors(selector, prop), value));
          } else {
            if (prop === "content") value = "'" + value + "'";
            style[prop] = value;
          }
        }
      });
      rules.push([selector, style]);
      return rules;
    }
    /**
     * Add rule sets to stylesheet.
     */
    function insertRules(rules, sheet) {
      function hyphenate(str) {
        return str.replace(/[A-Z]/g, function($0) {
          return '-' + $0.toLowerCase();
        });
      }
      rules.forEach(function(rule) {
        var pairs = [];
        for (var prop in rule[1]) {
          pairs.push(hyphenate(prop) + ":" + rule[1][prop]);
        }
        if (pairs.length > 0) {
          sheet.insertRule(rule[0] + "{" + pairs.join(";") + "}", 0);
        }
      });
    }
    /**
     * Pseudo classes/elements and attribute selectors should immediately follow the previous selector, others should be space separated.
     */
    function combineSelectors(parent, child) {
      var pseudoRe = /^[:\[]/;
      var parents = parent.split(","),
        children = child.split(",");
      return parents.map(function(parent) {
        return children.map(function(part) {
          var separator = pseudoRe.test(part) ? "" : " ";
          return parent + separator + part;
        }).join(",");
      }).join(",");
    }
    /**
     * Add unit to numeric values not in |unitlessProps|.
     */
    function addUnit(style, unit) {
      for (var prop in style) {
        var value = style[prop] + "";
        if (!isNaN(value) && !unitlessProps[prop]) {
          value = value + unit;
        }
        style[prop] = value;
      }
      return style;
    }

    function isPlainObject(obj) {
      return obj === Object(obj) && Object.prototype.toString === obj.toString;
    }
    var stylesheets = {};
    stylesheets.css = CreateStyleSheet().css;
    return stylesheets;
  }
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
      var __rendered = false;
      var __variable = options.variable || 'data';
      var __events = options.events || [];
      var __startIndexFrom = options.startIndexFrom || false;
      if (options.startIndexFrom === 0) __startIndexFrom = 0;
      var __re = /data-src/img;
      var __safeHTML = options.safeHTML || false;
      var __es6Template = options.es6Template || false;
      var __noTemplate = options.noTemplate || false;
      var __id = $.uuid();
      var __styles = options.styles;
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
            var bubble = item.bubble || false;
            if (item && item.element === 'self' || item && !item.element) {
              __element.on(item.event, item.callback, bubble);
            } else {
              __element.on(item.event, item.element, item.callback, bubble);
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
        if (__styles && options.element) {
          if (!$(options.element)[0]) return;
          var styles = ChuiStyle();
          if ($.type(__styles) !== 'object') {
            if ($.supressErrorMessages) return;
            console.error(errors.noStyleObject);
            return;
          }
          styles.css(options.element, __styles);
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
            if (__startIndexFrom === 0) $.view.index = 0;
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
          if (!element) {
            if ($.supressErrorMessages) return;
            console.error(errors.noElementForView);
            return;
          }
          __element = $(element);
          $(element).empty();
          handleEvents();
          var styles = ChuiStyle();
          styles.css(element, __styles);
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
          if (__data) __data = undefined;
          bindToModel(__model, view);
        },
        unbindModel: function unbindModel() {
          if (__model) {
            var pos = __model.boundViews.findIndex(function(view) {
              return view.id = __id;
            });
            __model.boundViews.splice(pos, 1);
          }
          __model = undefined;
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
          } else {
            __safeHTML = false;
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
            if (__model) __model = undefined;
            __data = data;
          }
        },
        /**
         * This method is for use after importing a view as an ES6 module. It resets the view's element since this cannot be determined at the time of import.
         */
        mount: function mount() {
          __element = $(__origElement);
          handleEvents();
          var styles = ChuiStyle();
          styles.css(options.element, __styles);
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
    pluck: function pluck(prop) {
      var ret = [];
      this.forEach(function(item) {
        if (item[prop]) {
          ret.push(item[prop]);
        }
      });
      return ret;
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
      var diff = self.difference(array);
      return this.difference(diff);
    }
  });
}
if (!Array.prototype.mixin) {
  $.extend(Array.prototype, {
    mixin: function mixin(array) {
      var self = this;
      var ret = this.concat(array);
      ret.unique();
      self.splice(0);
      ret.forEach(function(item) {
        self.push(item);
      });
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
      this.length = 0;
      var self = this;
      ret.forEach(function(item) {
        self.push(item);
      });
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
    }, _defineProperty(_en, 'noPropForPropEquals', "ChocolateChip-UI Model Error: No property or value were provided. Without these we cannot find a matching object in the model collection. Please provide both of them."), _defineProperty(_en, 'noDataToPushToModel', "ChocolateChip-UI Model Error: No data was provided to push onto the model collection."), _defineProperty(_en, 'noDataForShiftToModel', "ChocolateChip-UI Model Error: No data was provided to insert at the beginning of the model collection."), _defineProperty(_en, 'noEndForModelSlice', "ChocolateChip-UI Model Error: No end value was provided to slice the model collection. Please provide a numeral value."), _defineProperty(_en, 'noStartModelForSlice', "ChocolateChip-UI Model Error: No start value was provided for slicing the model collection. Please provide both a start and end numeral value so that we can slice the model collection for you."), _defineProperty(_en, 'noEndForModelSplice', "ChocolateChip-UI Model Error: No end position was provided to splice the model collection. Please provide one."), _defineProperty(_en, 'noStartForModelSplice', "ChocolateChip-UI Model Error: No start position was provided for splicing the model collection. Please provide a start and end position for splicing the model collection."), _defineProperty(_en, 'noDataToInsertInModel', "ChocolateChip-UI Model Error: No data was provided to insert into the model collection. Was expecting an object, but found nothing. Please provide some an object of data. Check that you have your arguments in the correct order: position first, data second."), _defineProperty(_en, 'noPosToInserInModel', "ChocolateChip-UI Model Error: No position was provided to insert data into the model collection. Please provide a position and some data to insert in the model collection. The first argument should be a numerical value for the position, followed by the data to insert."), _defineProperty(_en, 'noPropForPlucking', "ChocolateChip-UI Model Error: No property was provided to pluck from the model collection. Please provide a property."), _defineProperty(_en, 'noCallbackForModelFind', "ChocolateChip-UI Model Error: No callback was provided as an argument for the find on the model collection. Please provide one."), _defineProperty(_en, 'noElementForIndexOf', "ChocolateChip-UI Model Error: No element was provided for finding the index of an object in the model collection. Please provide one."), _defineProperty(_en, 'noDataToConcat', "ChocolateChip-UI Model Error: No data was provided to concat to this model. Did you forget to provide the data?"), _defineProperty(_en, 'noPropsForSortBy', "ChocolateChip-UI Model Error: No property was provided for sorting. Without a property we cannot sort."), _defineProperty(_en, 'noEventForEventDeletion', "ChocolateChip-UI Model Error: No event was provided to delete the callback for this model. Please provide both and event and an array position for the callback. An event can have more than one callback registered to it."), _defineProperty(_en, 'noCallbackForForEach', "ChocolateChip-UI Model Error: No callback was provided for the forEach method. This is required."), _defineProperty(_en, 'noDataToReplaceInModel', "ChocolateChip-UI Model Error: No data was provided to replace the data in the model. If you want to do so, please provide some data to complete this operation. Otherwise, if you are trying to empty the model, use `purge()`."), _defineProperty(_en, 'modelHasNoDataToReturn', "ChocolateChip-UI Model Error: This model has no data associated with it. Perhaps you forgot to give it any data when you created it."), _defineProperty(_en, 'positionGreaterThanModelLength', "ChocolateChip-UI Model Error: The position you provided to set a property is greater than the number of items in this model."), _en),
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
    }, _defineProperty(_es, 'noPropForPropEquals', "Hubo Error de Modelo ChocolateChip-UI: No se proporcionó ninguna propiedad ni valor. Sin ellos no podemos encontrar un objeto de iqual valor en la colección del modelo. Por favor proporcione los dos."), _defineProperty(_es, 'noDataToPushToModel', "Hubo Error de Modelo ChocolateChip-UI: No se proporcionaron ningunos datos para añadir al fin de la colección del modelo."), _defineProperty(_es, 'noDataForShiftToModel', "Hubo Error de Modelo ChocolateChip-UI: No se proporcionó ninungos datos para agregar al inicio de la colección del modelo."), _defineProperty(_es, 'noEndForModelSlice', "Hubo Error de Modelo ChocolateChip-UI: No se proporcionó ningún valor final para extraer de la colección del modelo. Por favor proporcione un valor numérico."), _defineProperty(_es, 'noStartModelForSlice', "Hubo Error de Modelo ChocolateChip-UI: No se proporcionó ningún valor inicial para extraer datos de la colección del modelo. Por favor proporcione un valor numérico inicial así como un final para que podamos extraer los datos de la colección del modelo."), _defineProperty(_es, 'noEndForModelSplice', "Hubo Error de Modelo ChocolateChip-UI: No se proporcionó ninguna posición final para realizar una acción de «splice» en la colección del modelo. Por favor proporcione una."), _defineProperty(_es, 'noStartForModelSplice', "Hubo Error de Modelo ChocolateChip-UI: No se proporcionó ninguna posición inicial para realizar una acción de «splice» en la colección del modelo. Por favor proporcione una."), _defineProperty(_es, 'noDataToInsertInModel', "Hubo Error de Modelo ChocolateChip-UI: No se proporcionaron ningunos datos para insertar en la colección del modelo. Se esperaba un objeto, pero no se encontró nada. Por favor proporcione un objeto de datos. El primer argumento debe de ser una position, seguido por los datos."), _defineProperty(_es, 'noPosToInserInModel', "Hubo Error de Modelo ChocolateChip-UI: No se proporcionó ninguna posición para saber en dónde insertar los datos en la colección del modelo. Por favor proporcione una posición de valor numérico y unos datos para insertar en la colección del modelo. El primer argumento debe de ser un valor numérico para la posición, y entonces unos datos que insertar."), _defineProperty(_es, 'noPropForPlucking', "Hubo Error de Modelo ChocolateChip-UI: No se proporcionó ninguna propiedad para extraerla de la colección del modelo. Por favor proporcione una propiedad."), _defineProperty(_es, 'noCallbackForModelFind', "Hubo Error de Modelo ChocolateChip-UI: No se proporcionó ninguna función callback como parámetro a fin de realizar una búsqueda en la colección del modelo. Por favor proporcione una."), _defineProperty(_es, 'noElementForIndexOf', "Hubo Error de Modelo ChocolateChip-UI: No se proporcionó ningun element a fin de averiguar el índice de un objeto en la colección del modelo. Por favor proporcione una."), _defineProperty(_es, 'noDataToConcat', "Hubo Error de Modelo ChocolateChip-UI: No se proporcionaron ningunos datos para concatenar en este modelo. ¿Se le olvidó proporcionar los datos?"), _defineProperty(_es, 'noPropsForSortBy', "Hubo Error de Modelo ChocolateChip-UI: No se proporcionó ninguna propiedad. Sin una no se puede ordenar los datos del modelo."), _defineProperty(_es, 'noEventForEventDeletion', "Hubo Error de Modelo ChocolateChip-UI: No se proporcionó ningún evento a fin de eliminar la función callback de este modelo. Por favor proporcione tanto un evento como una posición en la colección para la callback que se quiere eliminar. Es posible que un evento tenga más de una callback registrada a él."), _defineProperty(_es, 'noCallbackForForEach', "Hubo Error de Modelo ChocolateChip-UI: No se proporcionó ninguna función callback para el método «forEach». Ésta se requiere."), _defineProperty(_es, 'noDataToReplaceInModel', "Hubo Error de Modelo ChocolateChip-UI: No se proporcionaron ningunos datos para reemplazar los del modelo. Si es lo que usted quiere hacer, por favor proporicone unos datos para realizar esta operación. En otro caso, si el propósito de esta operación es el de vaciar el modelo, use `purge()`."), _defineProperty(_es, 'modelHasNoDataToReturn', "Hubo Error de Modelo ChocolateChip-UI: Este modelo no tiene datos suyos. Quizás se le olvidó asignarselos cuando lo creó."), _defineProperty(_es, 'positionGreaterThanModelLength', "Hubo Error de Modelo ChocolateChip-UI: The position you provided is to set a property is greater than the number of items in this model. La positición que se proporicionó es más grande que el número de objetos en este modelo."), _es)
  };
  var errors = undefined;
  if ($('html').attr('lang') == 'en') errors = ModelErrorMessages.en;
  if ($('html').attr('lang') == 'es') errors = ModelErrorMessages.es;
  var dataStore = {
    id: $.uuid()
  };
  var _Model = function() {
    function Model(data) {
      _classCallCheck(this, Model);
      var d = undefined;
      if ($.type(data) == 'array') {
        d = data.slice();
      } else if ($.type(data) == 'object') {
        d = Object.create(data);
      } else {
        d = data;
      }
      this.id = $.uuid();
      this[dataStore] = d;
      this.events = {};
      this.stopped = false;
      this.boundViews = [];
    }
    /**
     * This method is used internally by the model to update any views bound to it. There is never a situation where you will need to use it. It gets invoked whenever you perform an operation that changes the model's data.
     */
    _createClass(Model, [{
      key: 'updateBoundViews',
      value: function updateBoundViews() { /* No bound views, so exit: */
          if (!this.boundViews || !this.boundViews.length) {
            return;
          }
          /** 
           * Loop thru bound views to render: 
           */
          this.boundViews.forEach(function(view) {
            view.render();
          });
        }
        /**
         * Set model state to `stopped`. Used to determine whether to execute a model event. 
         */
    }, {
      key: 'stop',
      value: function stop() {
          this.stopped = true;
        }
        /** 
         * Set model state to run: 
         */
    }, {
      key: 'start',
      value: function start() {
          this.stopped = false;
        }
        /** 
         * Check if model is stopped; 
         */
    }, {
      key: 'isStopped',
      value: function isStopped() {
          return this.stopped;
        }
        /** 
         * Get the value of an object property.
         * This only works when the model's data is an object.
         * If used without parameter, will return all data from model, whether object or array. 
         */
    }, {
      key: 'get',
      value: function get(property) {
          if (property && $.type(this[dataStore]) === 'object') {
            return this[dataStore][property];
          } else {
            return this[dataStore];
          }
        }
        /** 
         * Set the value of an object property.
         * This only works when the model's data is an object.
         */
    }, {
      key: 'set',
      value: function set(property, data) {
          if (!property) {
            if ($.supressErrorMessages) return;
            console.error(errors.noPropertyOrDataError);
            return;
          } else if (!data) {
            if ($.supressErrorMessages) return;
            console.error(errors.noPropertyToSet + property);
            return;
          }
          if ($.type(this[dataStore]) === 'object') {
            this[dataStore][property] = data;
            this.updateBoundViews();
          }
        }
        /** 
         * Clear out the model's data.
         * Works with models with objects or arrays.
         */
    }, {
      key: 'purge',
      value: function purge() {
          if ($.type(this[dataStore]) === 'object') {
            this[dataStore] = {};
          } else if ($.type(this[dataStore]) === 'array') {
            this[dataStore] = [];
          } else {
            this[dataStore] = undefined;
          }
        }
        /**
         * Merge new object into model's object.
         * This only works when the model's data is an object.
         * Will replace any existing properties of the same name.
         */
    }, {
      key: 'merge',
      value: function merge(obj) {
          if (!obj) {
            if ($.supressErrorMessages) return;
            console.error(errors.noObjectToMerge);
            return;
          } else if ($.type(obj) !== 'object') {
            if ($.supressErrorMessages) return;
            console.error(errors.incorrectDataForMerging);
          } else if ($.type(this[dataStore]) === 'object') {
            for (var key in obj) {
              this[dataStore][key] = obj[key];
            }
            this.updateBoundViews();
          }
        }
        /**
         * Mixin new object into model's object.
         * This only works when the model's data is an object.
         * This will not replace any existing properties of the same name.
         * Only new properties will be added.
         */
    }, {
      key: 'mixin',
      value: function mixin(data) {
          if (!data) {
            if ($.supressErrorMessages) return;
            console.error(errors.noObjForMixin);
            return;
          }
          if ($.type(this[dataStore]) === 'object') {
            for (var key in data) {
              /** 
               * Do not replace property if it exists: 
               */
              if (!(key in this[dataStore])) {
                this[dataStore][key] = data[key];
                this.updateBoundViews();
              }
            }
          } else if ($.type(this[dataStore]) === 'array') {
            this[dataStore] = this[dataStore].concat(data).unique();
            this.updateBoundViews();
          }
        }
        /**
         * Replace the data of the model with the provided data.
         * This works for models of an object or array.
         */
    }, {
      key: 'replace',
      value: function replace(data) {
          if (data) {
            var d = undefined;
            if ($.type(data) == 'array') {
              d = data.slice();
            } else if ($.type(data) == 'object') {
              d = Object.create(data);
            } else {
              d = data;
            }
            this[dataStore] = d;
            this.updateBoundViews(this);
          } else {
            if ($.supressErrorMessages) return;
            console.error(errors.noDataToReplaceInModel);
          }
        }
        /**
         * Remove a property from a model's data.
         * Only works if the data is an object.
         */
    }, {
      key: 'remove',
      value: function remove(prop) {
          if (!prop) {
            if ($.supressErrorMessages) return;
            console.error(errors.noPropertyToDelete);
            return;
          }
          if ($.type(this[dataStore]) !== 'object') return;
          delete this[dataStore][prop];
          this.updateBoundViews();
        }
        /**
         * Register an event on the model:
         */
    }, {
      key: 'on',
      value: function on(event, callback) {
          if (this.stopped) return;
          if (!event) {
            if ($.supressErrorMessages) return;
            console.error(errors.noEventForModelOn);
            return;
          } else if (!callback) {
            if ($.supressErrorMessages) return;
            console.error(errors.noCallbackForModelOn);
            return;
          }
          if (!this.events[event]) {
            this.events[event] = [callback];
          } else {
            this.events[event].push(callback);
          }
        }
        /**
         * Trigger an event on the model:
         */
    }, {
      key: 'trigger',
      value: function trigger(event, data) {
          if (this.stopped) return;
          if (!event) {
            if ($.supressErrorMessages) return;
            console.error(errors.noEventForModelTrigger);
            return;
          }
          data != undefined ? data : {};
          this.events[event].forEach(function(item) {
            item(data);
          });
        }
        /**
         * Remove an event on the model.
         * If no event is provided, all events will be removed.
         */
    }, {
      key: 'off',
      value: function off(event) {
          if (!event) {
            this.events = {};
          } else {
            delete this.events[event];
          }
        }
        /**
         * Array specific methods:
         */
    }, {
      key: 'getPropAt',
      value: function getPropAt(property, position) {
        if (!property) {
          if ($.supressErrorMessages) return;
          console.error(errors.noPropForPropAt);
          return;
        } else if (position === undefined) {
          if ($.supressErrorMessages) return;
          console.error(errors.noPosForPropAt);
          return;
        }
        if ($.type(this[dataStore]) === 'array') {
          if (position < 0) {
            var pos = this[dataStore].length + position;
            return this[dataStore][pos][property];
          } else if (position > this[dataStore].length) {
            console.error(errors.noPosForPropAt);
            return;
          } else {
            return this[dataStore][position][property];
          }
        }
      }
    }, {
      key: 'setPropAt',
      value: function setPropAt(property, value, position) {
        if (!property) {
          if ($.supressErrorMessages) return;
          console.error(errors.noPropForSetPropAt);
          return;
        } else if (value === undefined) {
          if ($.supressErrorMessages) return;
          console.error(errors.noValueForSetPropAt);
          return;
        } else if (position === undefined) {
          if ($.supressErrorMessages) return;
          console.error(errors.noPosForSetPropAt);
          return;
        } else if (position > this[dataStore].length - 1) {
          if ($.supressErrorMessages) return;
          console.error(errors.positionGreaterThanModelLength);
          return;
        }
        if ($.type(this[dataStore]) === 'array') {
          if (position < 0) {
            var pos = this[dataStore].length + position;
            this[dataStore][pos][property] = value;
            this.updateBoundViews();
          } else {
            this[dataStore][position][property] = value;
            this.updateBoundViews();
          }
        }
      }
    }, {
      key: 'push',
      value: function push(data) {
        if (!data) {
          if ($.supressErrorMessages) return;
          console.error(errors.noDataToPushToModel);
          return;
        }
        if ($.type(this[dataStore]) === 'array') {
          this[dataStore].push(data);
          this.updateBoundViews();
        }
      }
    }, {
      key: 'pop',
      value: function pop() {
        if ($.type(this[dataStore]) === 'array') {
          this[dataStore].pop();
          this.updateBoundViews();
        }
      }
    }, {
      key: 'unshift',
      value: function unshift(data) {
        if (!data) {
          if ($.supressErrorMessages) return;
          console.error(errors.noDataForShiftToModel);
          return;
        } else if ($.type(this[dataStore]) === 'array') {
          this[dataStore].unshift(data);
          this.updateBoundViews();
        }
      }
    }, {
      key: 'shift',
      value: function shift() {
        if ($.type(this[dataStore]) === 'array') {
          this[dataStore].shift();
          this.updateBoundViews();
        }
      }
    }, {
      key: 'slice',
      value: function slice(start, end) {
        if (end === undefined) {
          if ($.supressErrorMessages) return;
          console.error(errors.noEndForModelSlice);
          return;
        } else if (start === undefined) {
          if ($.supressErrorMessages) return;
          console.error(errors.noStartModelForSlice);
          return;
        }
        if ($.type(this[dataStore]) === 'array') {
          return this[dataStore].slice(start, end);
        }
      }
    }, {
      key: 'splice',
      value: function splice(start, end, data) {
          if (end === undefined) {
            if ($.supressErrorMessages) return;
            console.error(errors.noEndForModelSplice);
            return;
          } else if (start === undefined) {
            if ($.supressErrorMessages) return;
            console.error(errors.noStartForModelSplice);
            return;
          }
          if ($.type(this[dataStore]) === 'array' && data) {
            this[dataStore].splice(start, end, data);
            this.updateBoundViews();
          } else if ($.type(this[dataStore]) === 'array') {
            if (start == null || !end) return;
            this[dataStore].splice(start, end);
            this.updateBoundViews();
          }
        }
        /**
         * Instert an object into the model's array at the designated position:
         */
    }, {
      key: 'insert',
      value: function insert(position, data) {
          if (data === undefined) {
            if ($.supressErrorMessages) return;
            console.error(errors.noDataToInsertInModel);
            return;
          } else if (position === undefined || $.type(position) !== 'number') {
            if ($.supressErrorMessages) return;
            console.error(errors.noPosToInserInModel);
            return;
          }
          if ($.type(this[dataStore]) === 'array') {
            if ($.type(position) !== 'number') return;
            this[dataStore].splice(position, 0, data);
            this.updateBoundViews();
          }
        }
        /**
         * Get an array of the provided property values in the model's array:
         */
    }, {
      key: 'pluck',
      value: function pluck(property) {
          if (!property) {
            if ($.supressErrorMessages) return;
            console.error(errors.noPropForPlucking);
            return;
          } else {
            var ret = [];
            if (this[dataStore] && this[dataStore].length) {
              var len = this[dataStore].length;
              for (var i = 0; i < len; i++) {
                ret.push(this[dataStore][i][property]);
              }
              return ret;
            }
          }
        }
        /**
         * 
         */
    }, {
      key: 'indexOf',
      value: function indexOf(element, startFrom) {
          if (!element) {
            if ($.supressErrorMessages) return;
            console.error(errors.noElementForIndexOf);
            return;
          } else if ($.type(this[dataStore]) === 'array') {
            return this[dataStore].indexOf(element, startFrom);
          }
        }
        /**
         * This method lets you pass a callback that checks for a property or other state in the array's items and return the match. It returns the first match only.
         */
    }, {
      key: 'find',
      value: function find(callback) {
        if (!callback) {
          if ($.supressErrorMessages) return;
          console.error(errors.noCallbackForModelFind);
          return;
        } else if ($.type(this[dataStore]) === 'array') {
          return this[dataStore].find(callback);
        }
      }
    }, {
      key: 'findIndex',
      value: function findIndex(callback) {
        if (!callback) {
          if ($.supressErrorMessages) return;
          console.error(errors.noCallbackFoFindIndex);
          return;
        } else if ($.type(this[dataStore]) === 'array') {
          return this[dataStore].findIndex(callback);
        }
      }
    }, {
      key: 'forEach',
      value: function forEach(callback) {
        if (!callback) {
          if ($.supressErrorMessages) return;
          console.error(errors.noCallbackForForEach);
          return;
        }
        if (this[dataStore] && this[dataStore].length) {
          var value = undefined;
          var i = -1;
          var len = this[dataStore].length;
          while (++i < len) {
            value = callback.call(this[dataStore][i], this[dataStore][i], i);
            if (value === false) {
              break;
            }
          }
        }
      }
    }, {
      key: 'filter',
      value: function filter() {
        if (this[dataStore] && this[dataStore].length) {
          for (var _len9 = arguments.length, args = Array(_len9), _key9 = 0; _key9 < _len9; _key9++) {
            args[_key9] = arguments[_key9];
          }
          return this[dataStore].filter.apply(this[dataStore], args);
        }
      }
    }, {
      key: 'map',
      value: function map() {
        if (this[dataStore] && this[dataStore].length) {
          for (var _len10 = arguments.length, args = Array(_len10), _key10 = 0; _key10 < _len10; _key10++) {
            args[_key10] = arguments[_key10];
          }
          return this[dataStore].map.apply(this[dataStore], args);
        }
      }
    }, {
      key: 'reverse',
      value: function reverse() {
        if (this[dataStore] && this[dataStore].length) {
          this[dataStore].reverse();
          this.updateBoundViews();
        }
      }
    }, {
      key: 'sort',
      value: function sort(compareFunction) {
          if (this[dataStore] && this[dataStore].length) {
            if (compareFunction) {
              this[dataStore].sort(compareFunction);
              this.updateBoundViews();
            } else {
              this[dataStore].sort();
              this.updateBoundViews();
            }
          }
        }
        /**
         * Sort the model's array based on passed properties. By default the ordering is ascendeing. By prefixing the property with a hyphen, the order will be descending. You can use more than one property separated by commas.
         */
    }, {
      key: 'orderBy',
      value: function orderBy() {
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
               * Loop over all properties and sort objects based on those properties: 
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
          if (this[dataStore] && this[dataStore].length) {
            this[dataStore].sort(orderBy.apply(null, props));
            this.updateBoundViews();
          }
        }
        /**
         * Concat and array of data to the model's array.
         * After concating, it will remove any duplicates.
         */
    }, {
      key: 'concat',
      value: function concat(data) {
          if (!data) {
            if ($.supressErrorMessages) return;
            console.error(errors.noDataToConcat);
            return;
          }
          if ($.type(this[dataStore]) === 'array') {
            var temp = this[dataStore].concat(data);
            this[dataStore] = temp;
            this.updateBoundViews();
          }
        }
        /**
         * Remove any duplicates from the model's array:
         */
    }, {
      key: 'unique',
      value: function unique() {
          if ($.type(this[dataStore]) === 'array') {
            this[dataStore].unique();
            this.updateBoundViews();
          }
        }
        /**
         * Get an object out of the model's array based on its index:
         */
    }, {
      key: 'eq',
      value: function eq(position) {
          if ($.type(this[dataStore]) === 'array') {
            return this[dataStore][position];
          }
        }
        /**
         * Get the length of the model's array.
         * Only works if the data is an array.
         */
    }, {
      key: 'size',
      value: function size() {
        if ($.type(this[dataStore]) === 'array') {
          return this[dataStore].length;
        }
      }
    }]);
    return Model;
  }();
  $.extend({
    Model: function Model(data) {
      return new _Model(data);
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
  isStandalone: navigator.standalone || false,
  isWebkit: !/trident/img.test(navigator.userAgent) && !/edge/img.test(navigator.userAgent) && /webkit/img.test(navigator.userAgent),
  isDesktop: !/mobile/img.test(navigator.userAgent),
  isMobile: /mobile/img.test(navigator.userAgent),
  isSafari: !/edge/img.test(navigator.userAgent) && !/Chrome/img.test(navigator.userAgent) && /Safari/img.test(navigator.userAgent) && !/android/img.test(navigator.userAgent),
  isChrome: !/trident/img.test(navigator.userAgent) && !/edge/img.test(navigator.userAgent) && /Chrome/img.test(navigator.userAgent) && !((/samsung/img.test(navigator.userAgent) || /Galaxy Nexus/img.test(navigator.userAgent) || /HTC/img.test(navigator.userAgent) || /LG/img.test(navigator.userAgent)) && !/trident/img.test(navigator.userAgent) && !/edge/img.test(navigator.userAgent) && /android/i.test(navigator.userAgent) && /webkit/i.test(navigator.userAgent)),
  isNativeAndroid: (/samsung/img.test(navigator.userAgent) || /Galaxy Nexus/img.test(navigator.userAgent) || /HTC/img.test(navigator.userAgent) || /\sLG/img.test(navigator.userAgent)) && !/trident/img.test(navigator.userAgent) && !/edge/img.test(navigator.userAgent) && /android/i.test(navigator.userAgent) && /webkit/i.test(navigator.userAgent) && (/Android 3/i.test(userAgentHTC) || /Android 4/i.test(navigator.userAgent))
});

//# sourceMappingURL=chocolatechip.js.map
