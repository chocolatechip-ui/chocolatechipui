
/**
 * Mixin one object into another:
 */
$.extend({
  mixin: (sourceObj, targetObj) => {
    for (let key in sourceObj) {
      /* Do not replace property if it exists: */
      if (!(key in targetObj)) {
          targetObj[key] = sourceObj[key]
      }
    }
    return targetObj
  }
})
