
  /**
   * ChocolateChip-UI extend method.
   */

  /**
   * Polyfill for Object.keys.
   * Needed for Android older than 4.4.
   */
  if (!Object.keys) {
    Object.keys = (function() {
      'use strict';
      const hasOwnProperty = Object.prototype.hasOwnProperty,
          hasDontEnumBug = !({ toString: null }).propertyIsEnumerable('toString'),
          dontEnums = [
            'toString',
            'toLocaleString',
            'valueOf',
            'hasOwnProperty',
            'isPrototypeOf',
            'propertyIsEnumerable',
            'constructor'
          ],
          dontEnumsLength = dontEnums.length;

      return function(obj) {
        if (typeof obj !== 'object' && (typeof obj !== 'function' || obj === null)) {
          throw new TypeError('Object.keys called on non-object');
        }

        let result = [];
        let prop;
        let i;

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
    }());
  }

  $.extend = (obj, prop) => {
    if (!prop) {
      prop = obj;
      obj = chocolatechipjs;
    }
    Object.keys(prop).forEach(p => {
      if (prop.hasOwnProperty(p)) {
        Object.defineProperty(obj, p, {
          value: prop[p],
          writable: true,
          enumerable: false,
          configurable: true
        });
      }
    });
  }


  /**
   * ChocolateChip-UI collection extend method.
   */
  $.fn = {
    extend: object => $.extend(DOMStack.prototype, object)
  };