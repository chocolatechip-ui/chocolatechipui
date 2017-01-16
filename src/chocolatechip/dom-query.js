
  /**
   * ChocolateChipJS singleton. This function can query the DOM with the provided parameters, or execute a callback when the DOM is ready. This is also the base for ChocolateChipJS methods for DOM manipulation.
   */
  function chocolatechipjs(selector, context) {
    const self = this;
    const idRE = /^#([\w-]*)$/;
    const classRE = /^\.([\w-])$/;
    const tagRE = /^[\w-]+$/;
    const readyRE = /complete|loaded|interactive/;
    let temp = undefined;

    const slice = elements => {
      temp = new DOMStack([].slice.apply(elements));
      temp[0] = temp.array[0];
      return temp;
    };

    const getId = selector => {
      const el = document.getElementById(selector.split('#')[1]);
      if (el) {
        temp = new DOMStack([el]);
        temp[0] = new DOMStack([el]).array[0];
        temp.length = 1;
        return temp;
      } else {
        return new DOMStack();
      }
    };

    const getTag = (selector, context) => {
      if (context) {
        temp = slice(context.getElementsByTagName(selector));
        temp[0] = temp.array[0];
        temp.length = temp.length;
        return temp;
      } else {
        temp = slice(document.getElementsByTagName(selector));
        temp[0] = temp.array[0];
        temp.length = temp.array.length;
        return temp;
      }
    };

    const getClass = (selector, context) => {
      if (context) {
        temp = slice(context.getElementsByClassName(selector.split('.')[1]));
        temp[0] = temp.array[0];
        temp.length = temp.length;
        return temp;
      } else {
        temp = slice(document.getElementsByClassName(selector.split('.')[1]));
        temp[0] = temp.array[0];
        temp.length = temp.array.length;
        return temp;
      }
    };

    const getNode = (selector, context) => {
      if (typeof selector === 'string')
        selector = selector.trim();
      if (typeof selector === 'string' && idRE.test(selector)) {
        return getId(selector);
      }

      if (selector && (selector instanceof Array) && selector.length)
        return selector;
      if (!context && typeof selector === 'string') {
        if (/<\/?[^>]+>/.test(selector)) {
          return self.html(selector);
        }

        if (tagRE.test(selector)) {
          return getTag(selector);

        } else if (classRE.test(selector)) {
          return getClass(selector);

        } else {
          temp = slice(document.querySelectorAll(selector));
          temp[0] = temp.array[0];
          temp.length = temp.array.length;
          return temp;
        }

      } else {
        if (context) {
          temp = slice($(context).find(selector));
          temp[0] = temp.array[0];
          temp.length = temp.array.length;
          return temp;

        } else {
          temp = slice(document.querySelectorAll(selector));
          temp[0] = temp.array[0];
          temp.length = temp.array.length;
          return temp;
        }
      }
    };

    if (selector && selector.objectType && selector.objectType === 'domstack') {
      return selector;
    }

    if (selector === document) {
      return new DOMStack(document);
    }

    if (selector === null) {
      return new DOMStack();
    }

    if (!!context) {
      if (typeof context === 'string') {
        temp = slice(document.querySelectorAll(context + ' ' + selector));
        temp[0] = temp.array[0];
        temp.length = temp.array.length;
        return temp;
      } else if (context.nodeType === 1) {
        return getNode(selector, context);
      }

    } else if (typeof selector === 'function') {
      if (readyRE.test(document.readyState) && document.body) {
        selector.call(selector);
      } else {
        document.addEventListener("DOMContentLoaded", function() {
          return selector.call(selector);
        });
      }

    } else if (selector && selector.nodeType === 1) {
      temp = new DOMStack();
      temp[0] = selector;
      temp.length = temp.array.length;
      temp.push(selector);
      return temp;

    } else if (typeof selector === 'string') {
      if (selector === '') return new DOMStack();
      if (/<\/?[^>]+>/.test(selector)) {
        return chocolatechipjs.html(selector);
      } else {
        try {
          return getNode(selector) ? getNode(selector) : new DOMStack();
        } catch (err) {
          return new DOMStack();
        }
      }

    } else if (Array.isArray(selector)) {
      return new DOMStack(selector);
      
    } else if (selector === window) {
      temp = new DOMStack();
      temp[0] = window;
      temp.length = temp.array.length;
      return temp;

    } else {
      return new DOMStack();
    }

    return new DOMStack();
  }
  
  if (window.DefaultLanguageForErrors) {
    chocolatechipjs.languageForErrors = window.DefaultLanguageForErrors
  } else {
    chocolatechipjs.languageForErrors = 'en'
  }

  let $ = chocolatechipjs;