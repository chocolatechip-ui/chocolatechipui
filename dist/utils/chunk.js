export default (function() {

/**
 * Chunk an array into pieces based on itemsPerChunk.
 * You can use this to paginate an array of data.
 */
$.extend({
  chunk: (array, itemsPerChunk) => {
    let ret = []
    let pages = Math.floor(array.length / itemsPerChunk)
    if (array.length % pages) pages++
    let temp = 0
    for (let i = 0; i < pages; i++) {
      if (temp === array.length) break
      const thing = array.slice(temp, itemsPerChunk + temp)
      ret.push(thing)
      temp += itemsPerChunk
    }
    return ret
  }
})

})()
