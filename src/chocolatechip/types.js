
/**
 * ChocolateChip-UI types method.
 */
$.extend({
  type: type => {
    switch (typeof type) {
      case 'boolean':
        return 'boolean';
      case 'number':
        return 'number';
      case 'string':
        return 'string';
      case 'function':
        return 'function';
      case 'object':
        if (Array.isArray(type)) {
          return 'array';
        } else if (Object.prototype.toString.call(type) === '[object Date]') {
          return 'date';
        } else if (Object.prototype.toString.call(type) === '[object Error]') {
          return 'error';
        } else if (Object.prototype.toString.call(type) === '[object RegExp]') {
          return 'regexp';
        } else if (Object.prototype.toString.call(type) === '[object Object]') {
            if (type.objectType && type.objectType === 'domstack') {
              return 'domstack';
              /* If Promise polyfill, then should support `then`. */
            } else if (type.then) {
              return 'promise';
              /* Otherwise we got a normal object here. */
            } else {
              return 'object';
            }
        } else if (Object.prototype.toString.call(type) === '[object Number]') {
          return 'number';
        } else if (Object.prototype.toString.call(type) === '[object String]') {
          return 'string';
        } else if (Object.prototype.toString.call(type) === '[object Promise]') {
          return 'promise';
        } else if (Object.prototype.toString.call(type) === '[object Boolean]') {
          return 'boolean';
        }
    }
  }
});