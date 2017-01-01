
  /**
   * ChocolateChip-UI event methods.
   */

  (() => {
    const EventErrorMessages = {
      en: {
        noEventOrCallback: "ChocolateChip-UI Event Error: No event or callback was provided to bind to the element. These are the minimal requirements for this method to work. Please provide an event and callback.",
        noCallbackForEventBinding: "ChocolateChip-UI Event Error: No callback was provided for the event you are trying to bind. A callback is required for the event binding to work.",
        noEventToTrigger: "ChocolateChip-UI Event Error: No event was provided to trigger. As such we cannot do anything."
      },
      es: {
        noEventOrCallback: "Hubo Error de Evento ChocolateChip-UI: No se proporcionó ningún evento ni función callback para asignar al elemento. Cuando menos se nesecitan éstos para realizar esta operación en el elemento. Por favor proporcione un evento y una callback.",
        noCallbackForEventBinding: "Hubo Error de Evento ChocolateChip-UI: No se proporcionó ninguna función callback para el evento que se quiere asignar al element. Se reqiere una callback para asignar el evento al elemento.",
        noEventToTrigger: "Hubo Error de Evento ChocolateChip-UI: No se proporcionó ningún evento que gatillar. Por eso no podemos hacer nada."
      }
    }

    let errors = undefined;
    if ($('html').attr('lang') == 'en') errors = EventErrorMessages.en;
    if ($('html').attr('lang') == 'es') errors = EventErrorMessages.es;
        
    /**
     * Define interface for handling events:
     */
    let EventStack = (array) => {
      let __array = [];
      if (array && Array.isArray(array)) {
        let i = -1;
        const len = array.length;
        while (++i < len) {
          __array[i] = array[i];
        }
      } else if (array) {
        const arr = Array.prototype.slice.apply(arguments);
        arr.forEach((ctx, idx) => {
          __array[idx] = ctx;
        });
      }
      return {

        size: () => __array.length,

        push: (data) => __array.push(data),

        pop: () => __array.pop(),

        eq: (index) => {
          if (index < 0) {
            return __array[__array.length + index];
          } else {
            return __array[index];
          }
        },

        forEach: (callback) => {
          let value = undefined;
          let i = -1;
          const len = __array.length;
          while (++i < len) {
            value = callback.call(__array[i], __array[i], i);
            if (value === false) {
              break;
            }
          }
        },

        shift: () => __array.shift.apply(__array, arguments),

        unshift: () => __array.unshift.apply(__array, arguments),

        splice: () => __array.splice.apply(__array, arguments),

        indexOf: () => __array.indexOf.apply(__array, arguments),

        getData: () => __array,

        purge: () => __array = []
      };
    };

    let ChuiEventCache = {
      elements: {}
    };

    /* jshint, evil: false, validthis:true, unused:false, loopfunc: false,
    smarttabs: true, nonew: false */

    /**
     * Private method to set events on ChuiEventCache
     */
    const bind = function(element, event, callback, capturePhase) {
      if (!element.id) element.id = chocolatechipjs.uuid();
      if (!ChuiEventCache.elements[element.id]) {
        ChuiEventCache.elements[element.id] = EventStack(); // jshint ignore:line
      }
      ChuiEventCache.elements[element.id].push({
        event: event,
        callback: callback
      });
      element.addEventListener(event, callback, capturePhase);
    };


    /**
     * Delete items from event stack:
     */
    const deleteFromEventStack = function(toDelete, evtStck) {
      let len = toDelete.length;
      for (let i = 0; len > i; len--) {
        evtStck.splice(toDelete[len - 1], 1);
      }
    };
    /**
     * Private method to unbind events on ChuiEventCache
     */
    const unbind = function(element, event, callback, capturePhase) {

      const eventStack = ChuiEventCache.elements[element.id];
      if (!eventStack) return;
      let deleteOrder = [];

      if (!event) {
        deleteOrder = [];
        eventStack.forEach((evt, idx) => {
          element.removeEventListener(evt.event, evt.callback, evt.capturePhase);
          deleteOrder.push(idx);
        });

        deleteFromEventStack(deleteOrder, eventStack);

      } else if (!!event && !callback) {
        deleteOrder = [];
        eventStack.forEach((evt, idx) => {
          if (evt.event === event) {
            element.removeEventListener(evt.event, evt.callback, evt.capturePhase);
            deleteOrder.push(idx);
          }
        });

        deleteFromEventStack(deleteOrder, eventStack);

      } else if (callback) {
        deleteOrder = [];
        eventStack.forEach((evt, idx) => {
          if (callback === evt.callback) {
            element.removeEventListener(evt.event, evt.callback, evt.capturePhase);
            deleteOrder.push(idx);
          }
        });
        deleteFromEventStack(deleteOrder, eventStack);
      }
    };


    /**
     * Set delegated events on ChuiEventCache
     */

    const delegate = (element, selector, event, callback, capturePhase) => {
      let delegateElement = $(element).array[0];
      $(element).forEach(ctx => {
        $(ctx).on(event, (e) => {
          let target = e.target;
          if (e.target.nodeType === 3) {
            target = e.target.parentNode;
          }
          $(ctx).find(selector).forEach(delegateElement => {
            if (delegateElement === target) {
              callback.call(delegateElement, e);
            } else {
              try {
                const ancestor = $(target).closest(selector);
                if (delegateElement === ancestor.array[0]) {
                  callback.call(delegateElement, e);
                }
              } catch (err) {}
            }
          });
        }, capturePhase);
      });
    };


    /**
     * Method to remove delegated events from ChuiEventCache:
     */
    const undelegate = (element, selector, event, callback, capturePhase) => {

      unbind($(element).array[0], event, callback, capturePhase);
    };

    $.fn.extend({
      on: function(event, selector, callback, capturePhase) {
        if (!event) {
          if ($.supressErrorMessages) return;
          console.error(errors.noEventOrCallback);
          return;
        }
        if (!selector) {
          if ($.supressErrorMessages) return;
          console.error(errors.noCallbackForEventBinding);
          return;
        }

        if (!selector && /Object/img.test(event.constructor.toString())) {
          this.forEach(element => {
            for (let key in event) {
              if (event.hasOwnProperty(key)) {
                $(element).on(key, event[key]);
              }
            }
          });
        }
        let ret = [];
        let events = undefined;
        if (typeof event === 'string') {
          event = event.trim();
          if (/\s/.test(event)) {
            events = event.split(' ');
            this.forEach(ctx => {
              events.forEach(evt => {
                if (typeof selector === 'function') {
                  bind(ctx, evt, selector, callback);
                  ret.push(ctx);
                } else {
                  delegate(ctx, selector, evt, callback, capturePhase);
                }
              });
            });
          }
        }
        this.forEach(ctx => {
          if (typeof selector === 'function') {
            return bind(ctx, event, selector, callback);
          } else {
            delegate(ctx, selector, event, callback, capturePhase);
          }
        });
        return this;
      },

      off: function(event, selector, callback, capturePhase) {
        let ret = new DOMStack();
        if (!this.size()) return ret;

        this.forEach(function(ctx) {
          if (typeof event === 'undefined') {
            ret.push(ctx);
            unbind(ctx);
            return ret;
          } else if (typeof selector === 'function' || !selector) {
            unbind(ctx, event, selector, callback, capturePhase);
            return this;
          } else {
            undelegate(ctx, selector, event, callback, capturePhase);
            return this;
          }
        });
      },

      trigger: function(event, data) {
        if (!event) {
          if ($.supressErrorMessages) return;
          console.error(errors.noEventToTrigger);
          return;
        }
        if (!this.size()) return new DOMStack();
        this.forEach(ctx => {
          if (document.createEvent) {
            const evtObj = document.createEvent('Events');
            evtObj.initEvent(event, true, false);
            evtObj.data = data;
            ctx.dispatchEvent(evtObj);
          }
        });
      }
    });
  })();
