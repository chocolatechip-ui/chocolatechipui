
  /**
   * ChocolateChipJS data cache.
   */
  let CCDataCache = {
    elements: {}
  };
  $.fn.extend({
    data(key, value) {
      if (!this.size()) return new DOMStack();
      let val = undefined;
      let id = undefined;
      const ctx = this.array[0];
      if (!ctx.id) {
        ctx.id = $.uuid();
      }
      id = ctx.id;
      if (!CCDataCache.elements[id]) {
        CCDataCache.elements[id] = {};
      }
      if (key === 'undefined' || key === null) {
        return;
      }
      if (value || value === 0) {
        val = value;
        let obj = {};
        obj[key] = value;

        CCDataCache.elements[id][key] = value;
      } else {
        if (!CCDataCache.elements[id]) return;
        if (CCDataCache.elements[id][key] === 0) {
          return CCDataCache.elements[id][key];
        }
        if (!CCDataCache.elements[id][key]) return;
        return CCDataCache.elements[id][key];
      }
      return this;
    },

    removeData(key) {
      if (!this.size()) return this;
      this.forEach((element) => {
        const id = element.id;
        if (!id) return this;
        if (!CCDataCache.elements[id]) {
          return this;
        }
        if (!key) {
          delete CCDataCache.elements[id];
          return this;
        }
        if (Object.keys(CCDataCache.elements[id]).length === 0) {
          delete CCDataCache.elements[id];
        } else {
          delete CCDataCache.elements[id][key];
        }
        return this;
      });
    }
  });