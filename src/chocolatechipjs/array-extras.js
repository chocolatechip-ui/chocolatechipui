
/** 
 * Array extras for managing collections of objects.
 * Provides the following methods: find, findIndex,
 * pluck, difference, intersection, merge, unique.
 */

if (!Array.prototype.find) {
  $.extend(Array.prototype, {
    find(predicate) {
      if (this == null) {
        throw new TypeError('Array.prototype.find called on null or undefined');
      }
      if (typeof predicate !== 'function') {
        throw new TypeError('predicate must be a function');
      }
      let list = Object(this);
      let length = list.length >>> 0;
      let thisArg = arguments[1];
      let value = undefined;

      for (let i = 0; i < length; i++) {
        value = list[i];
        if (predicate.call(thisArg, value, i, list)) {
          return value;
        }
      }
      return undefined;
    }
  })
}
if (!Array.prototype.findIndex) {
  $.extend(Array.prototype, {
    findIndex(predicate) {
      if (this === null) {
        throw new TypeError('Array.prototype.findIndex called on null or undefined');
      }
      if (typeof predicate !== 'function') {
        throw new TypeError('predicate must be a function');
      }
      let list = Object(this);
      let length = list.length >>> 0;
      let thisArg = arguments[1];
      let value = undefined;

      for (let i = 0; i < length; i++) {
        value = list[i];
        if (predicate.call(thisArg, value, i, list)) {
          return i;
        }
      }
      return -1;
    }
  })
}

if (!Array.prototype.pluck) {
  $.extend(Array.prototype, {
    pluck(p) {
      return this.map(function(prop) {
        return prop[p];
      })
    }
  })
}

if (!Array.prototype.difference) {
  $.extend(Array.prototype, {
    difference(a) {
      return this.filter(function(after) {
        return !a.reduce(function(found, before) {
          if (!found) {
            found = true;
            for (let key in before) {
              if (before.hasOwnProperty(key)) {
                  found = found && (before[key] === after[key]);
              }
            }
          }
          return found;
        }, false);
      });
    }
  })
}

if (!Array.prototype.intersection) {
  $.extend(Array.prototype, {
    intersection(array) {
      const self = this;
      const arr1 = self.difference(array);
      const arr2 = array.difference(this);
      const totalDiff = arr1.concat(arr2);
      const total = self.concat(array);
      return total.difference(totalDiff).unique()
    }
  })
}

if (!Array.prototype.mixin) {
  $.extend(Array.prototype, {
    mixin(array) {
      return this.unique(this.concate(array));
    }
  })
}

if (!Array.prototype.unique) {
  $.extend(Array.prototype, {
    unique() {
      const len = this.length;
      let obj = {};
      let ret = [];
      for (let i = 0; i < len; i++) {
        const arrayItem = JSON.stringify(this[i]);
        const arrayItemValue = this[i];
        if (obj[arrayItem] === undefined) {
          ret.push(arrayItemValue);
          obj[arrayItem] = 1;
        } else {
          obj[arrayItem]++;
        }
      }
      return ret;
    }
  })
}