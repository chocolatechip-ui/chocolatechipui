$(() => {
  [Element.prototype, CharacterData.prototype, DocumentType.prototype].forEach(function (item) {
    if (item.hasOwnProperty('beforn') && item.hasOwnProperty('aftern')) {
      return;
    } else {
      Object.defineProperty(item, 'beforn', {
        configurable: true,
        enumerable: true,
        writable: true,
        value: function before() {
          var argArr = Array.prototype.slice.call(arguments),
            docFrag = document.createDocumentFragment();
          
          argArr.forEach(function (argItem) {
            var isNode = argItem instanceof Node;
            docFrag.appendChild(isNode ? argItem : document.createTextNode(String(argItem)));
          });
          
          this.parentNode.insertBefore(docFrag, this);
        }
      });
      Object.defineProperty(item, 'aftern', {
        configurable: true,
        enumerable: true,
        writable: true,
        value: function after() {
          var argArr = Array.prototype.slice.call(arguments),
            docFrag = document.createDocumentFragment();
          
          argArr.forEach(function (argItem) {
            var isNode = argItem instanceof Node;
            docFrag.appendChild(isNode ? argItem : document.createTextNode(String(argItem)));
          });
          
          this.parentNode.insertBefore(docFrag, this.nextSibling);
        }
      });
    }
  })
})