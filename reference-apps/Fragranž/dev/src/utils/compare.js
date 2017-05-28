export default (function() {

/**
 * Compare one value with another, one object with another, one array with another, etc.
 */
$.extend({
  compare: (value1, value2) => {

    function compareNativeSubtypes(value1, value2) {
      /**
       * e.g. Function, RegExp, Date 
       */
      return value1.toString() === value2.toString()
    }

    function compareArrays(value1, value2) {
      const len = value1.length
      if (len != value2.length) {
        return false
      }
      let alike = true
      for (let i = 0; i < len; i++) {
        if (!$.compare(value1[i], value2[i])) {
          alike = false
          break
        }
      }
      return alike
    }

    function compareObjects(value1, value2) {
      const keys1 = Object.keys(value1).sort()
      const keys2 = Object.keys(value2).sort()
      const len = keys1.length
      if (len != keys2.length) {
        return false
      }
      for (let i = 0; i < len; i++) {
        let key1 = keys1[i]
        let key2 = keys2[i]
        if (!((key1 == key2) && ($.compare(value1[key1], value2[key2])))) {
          return false
        }
      }
      return true
    }
    if (value1 === value2) {
      return true
    }
    if (typeof value1 != typeof value2) {
      return false
    }
    if (value1 !== Object(value1)) {
      /**
       * Non equal primitives, so stop:
       */
      return false
    }
    if (!value1) {
      return false
    }
    if (Array.isArray(value1)) {
      return compareArrays(value1, value2)
    }
    if (({}).toString.call(value1) == '[object Object]') {
      return compareObjects(value1, value2)
    } else {
      return compareNativeSubtypes(value1, value2)
    }
  }
})

})()
