
/** 
 * Chunk an array into pieces based on itemsPerChunk.
 * You can use this to paginate an array of data.
 */
$.extend({
  chunk: (data, itemsPerChunk) => {
    let ret = []
    let pages = Math.floor(data.length / itemsPerChunk)
    if (data.length % pages) pages++
    let temp = 0
    for (let i = 0; i < pages; i++) {
      if (temp === data.length) break
      const thing = data.slice(temp, itemsPerChunk + temp)
      ret.push(thing)
      temp += itemsPerChunk
    }
    return ret
  }
})
