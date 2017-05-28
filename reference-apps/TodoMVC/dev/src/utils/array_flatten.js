export default (function() {

/**
 * Recursively flatten an array with nested arrays.
 */
$.extend({
  flatten: array => {
    const flat = Array.prototype.concat(array)
    for (let i = 0; i < flat.length; i++) {  
      if (Array.isArray(flat[i])) {
        flat.splice(i, 1, ...flat[i--])  
      }
    }
    return flat
  }
})

})()
