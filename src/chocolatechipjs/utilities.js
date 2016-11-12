
  /**
   * ChocolateChip-UI utility methods.
   */
  $.extend({
    lib: "ChocolateChipJS",

    version: 'VERSION_NUMBER',

    noop: () => {},

    uuid: () => {
      let d = Date.now();
      d += performance.now();
      const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".split('');
      const randomLetter = charset[Math.floor(Math.random() * charset.length)];
      return randomLetter + 'xxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        let r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
      });
    },

    html: HTMLString => {
      let ret = new DOMStack();
      let temp = undefined;

      const wrapperMap = {
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

      let element = document.createElement('div');
      const match = /<\s*\w.*?>/g.exec(HTMLString);

      if (match !== null) {
        const tag = match[0].replace(/</g, '').replace(/>/g, '');
        const map = wrapperMap[tag] || wrapperMap.__default;
        HTMLString = map[1] + HTMLString + map[2];

        element.innerHTML = HTMLString;
        element = element.lastChild;

        temp = Array.prototype.slice.apply(element.childNodes);
        temp.forEach(ctx => {
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
    require: (src, callback, ctx) => {
      let onerror = "onerror";
      const insertScript = function(script) {
        let firstScript = document.getElementsByTagName("script")[0];
        firstScript.parentNode.insertBefore(script, firstScript);
      };
      let script = document.createElement("script");
      let done = false;
      let err = undefined;
      let loadScript = undefined;
      const handleError = function() {
        err = new Error(src || "EMPTY");
        loadScript();
      };
      const setupLoad = function(fn) {
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

    delay: milliseconds => {
      return new Promise(function (resolve, reject) {
        setTimeout(resolve, milliseconds);
      });
    },

    each: (obj, callback) => {
      let value = undefined;
      let key = undefined;
      let i = 0;
      let length = undefined;

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
        obj.forEach((item, idx) => callback.call(item, idx, item));
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
    unique: array => {
      if (!array || !Array.isArray(array)) return;
      const len = array.length;
      let obj = {};
      let ret = [];
      for (let i = 0; i < len; i++) {
        const arrayItem = JSON.stringify(array[i]);
        const arrayItemValue = array[i];
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
    replace: (newElement, targetElement) => {
      if (!newElement || !targetElement) return;
      let newEl = undefined;
      let targEl = undefined;
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
    isEmptyObject: obj =>  Object.keys(obj).length === 0,

    isInteger: number => (typeof number === 'number' && number % 1 === 0),

    isFloat: number => (typeof number === 'number' && number % 1 !== 0),

    encode: value => encodeURIComponent(value),

    /**
     * Escape HTML for view templates:
     */
    escapeHTML: data => {
      const tagsToReplace = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '(': '%28',
        ')': '%29'
      };
      let str = JSON.stringify(data);

      const replaceTag = (tag) => tagsToReplace[tag] || tag;

      const safe_tags_replace = (str) => str.replace(/[&<>]/g, replaceTag);

      str = safe_tags_replace(str);
      return JSON.parse(str);
    },

    /** 
     * Concat arrays:
     */
    concat: args => (args instanceof Array) ? args.join('') : [].slice.apply(arguments).join(''),

    /**
     * Mixin one object into another:
     */
    mixin: (sourceObj, targetObj) => {
      for (let key in sourceObj) {
        /* Do not replace property if it exists: */
        if (!(key in targetObj)) {
            targetObj[key] = sourceObj[key];
        }
      }
      return targetObj;
    },


    compare: (value1, value2) => {

      function compareNativeSubtypes(value1, value2) {
        /**
         * e.g. Function, RegExp, Date 
         */
        return value1.toString() === value2.toString();
      }

      function compareArrays(value1, value2) {
        const len = value1.length;
        if (len != value2.length) {
          return false;
        }
        let alike = true;
        for (let i = 0; i < len; i++) {
          if (!$.compare(value1[i], value2[i])) {
            alike = false;
            break;
          }
        }
        return alike;
      }

      function compareObjects(value1, value2) {
        const keys1 = Object.keys(value1).sort();
        const keys2 = Object.keys(value2).sort();
        const len = keys1.length;
        if (len != keys2.length) {
          return false;
        }
        for (let i = 0; i < len; i++) {
          let key1 = keys1[i];
          let key2 = keys2[i];
          if (!((key1 == key2) && ($.compare(value1[key1], value2[key2])))) {
            return false;
          }
        }
        return true;
      }
      if (value1 === value2) {
        return true;
      }
      if (typeof value1 != typeof value2) {
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
      if (({}).toString.call(value1) == '[object Object]') {
        return compareObjects(value1, value2);
      } else {
        return compareNativeSubtypes(value1, value2);
      }
    },

    /** 
     * Chunk an array into pieces based on itemsPerPage.
     * You can use this to paginate an array of data.
     */
    paginate: (data, itemsPerPage) => {
      let ret = [];
      let pages = Math.floor(data.length / itemsPerPage);
      if (data.length % pages) pages++;
      let temp = 0;
      for (let i = 0; i < pages; i++) {
        if (temp === data.length) break;
        const thing = data.slice(temp, itemsPerPage + temp);
        ret.push(thing);
        temp += itemsPerPage;
      }
      return ret;
    },

    /**
     * Fires an event once during provided wait period. Options are: {leading: true/false, trailing: true/false}.
     * By default leading is true, meaning that the first event input will fire. Setting leading to false will disable this.
     * By default trailing is true. Set this to false to disable it.
     */
    throttle: function(func, wait, options) {
      var context, args, result;
      var timeout = null;
      var previous = 0;
      if (!options) options = {};
      var later = function() {
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
      }
    },

    /**
     * Fires and event once after the designated wait time, regardless of how many other events occurred.
     * In the case of an input, this will start with the first keypress. After the last keypress and the wait time, the event will fire.
     * You can make the event fire after the time by passing a third optional truthy argument.
     */
    debounce: function(func, wait, immediate) {
      var timeout, args, context, timestamp, result;

      var later = function() {
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
    once: function(func) {
      var times = 2;
      var memo;
      return function() {
        if (--times > 0) {
          memo = func.apply(this, arguments);
        }
        if (times <= 1) func = null;
        return memo;
      };
    },

    /**
     * Execute a function only upto x times.
     * This takes two arguments: the times upto when execution can happen and the callback to execute.
     */

    before: function(times, func) {
      var memo;
      return function() {
        if (--times > 0) {
          memo = func.apply(this, arguments);
        }
        if (times <= 1) func = null;
        return memo;
      }
    },

    /**
     * Execute a function only after x times.
     * This takes two arguments: the times to wait before execution and the callback to execute.
     */

     after: function(times, func) {
      return function() {
        if (--times < 1) {
          return func.apply(this, arguments);
        }
      }
    }
    
  });

  
  
  /** 
   * Pubsub methods:
   */
  const topics = {};
  const hasProp = topics.hasOwnProperty;
  $.extend({
    /**
     * Set up subscriber: 
     */
    on: (topic, handler) => {
      /**
       * Create the topic's object: 
       */
      if (!hasProp.call(topics, topic)) topics[topic] = [];

      /**
       * Add subscriber: 
       */
      let index = topics[topic].push(handler) -1;

      /**
       * Return method to delete subscriber: 
       */
      return {
        off: () => delete topics[topic][index],

        /**
         * Return method to run this subscriber - `mySubscriber.run('foo', myDataHere)` 
         */
        run: (data) => {
          if (topics[topic]) topics[topic][index](data)
        },

        getTopic: () => topic
      };
    },

    /**
     * Send event and data to subscribers: 
     */
    send: (topic, payload) => {
      if (!hasProp.call(topics, topic)) return;

      /**
       * Loop through topics and execute: 
       */
      topics[topic].forEach(item => {
        item(payload != undefined ? payload : {});
      });
    },

    /**
     * Get all subscribed topics: 
     */
    getTopics: () => topics,

    /**
     * Remove a topic and any registered subscribers: 
     */
    removeTopic: topic => delete topics[topic],

    production: false,

    /**
     * Suppress ChocolateChip-UI's error messages:
     */
    supressErrorMessages: false
    
  })