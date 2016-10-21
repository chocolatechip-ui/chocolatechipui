
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
          return 'object';
        }
    }
  }
});