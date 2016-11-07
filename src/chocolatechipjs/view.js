
/**
 * ChocolateChip-UI - View Factory.
 */
(() => {
  const ViewErrorMessages = {
    en: {
      noDataForViewRender: "ChocolateChip-UI View Error: No data was provided for the view to render. If you want to render the view, please provide data, or redefine the view with a data source or model. Otherwise rendering will be skipped.",
      noElementForView: "ChocolateChip-UI View Error: No element was provided for the view. Please provide an element in the view initialization so that we can access it.",
      noTemplateForView: "ChocolateChip-UI View Error: No template was provided for this view. This means that you did not provide a template in the view initialization, or the element did not have any template in its markup.",
      viewElementHasNoTemplate: "ChocolateChip-UI View Error: The element for this view has no template in its markup. Either correct the element by defining a template in the element's markup, or define a template in the view's initialization.",
      noElementToSetToTemplate: "ChocolateChip-UI View Error: No element was provided to set to this view. Please provide one.",
      noTemplateToSetToView: "ChocolateChip-UI View Error: You did not provide a template to set to this view. Please provide one.",
      noEventsToAdd: "ChocolateChip-UI View Error: No event was provided to attach fo the view. Please provide an event to procede.",
      noDataToSetForView: "ChocolateChip-UI View Error: No data was provided to set for the view. Please provide some data.",
      noModelToBindToView: "ChocolateChip-UI View Error: No model was provided to bind the view to. Please provide a valid model to complete this operation.",
      viewHasNoModel: "ChocolateChip-UI View Error: Could not get this view's model because it is not bound to one. You can use `bindModel()` to bind a model to this view.",
      viewHasNoData: "ChocolateChip-UI View Error: This view has no data. Did you render it with data, or did you bind it to a model? Try using `getModel()` to see if this view is using a model.",
      viewHasNoTemplate: "ChocolateChip-UI View Error: This view has no template. Either you created it without a template, or there was some problem parsing the template. Please check how this view is set up."
    },
    es: {
      noDataForViewRender: "Hubo Error de Vista ChocolateChip-UI: : No se proporcionó datos para que la vista los utilice. Si desea renderizar la vista, proporcione datos o redefinir la vista con un valor para sus datos o un modelo de datos. De lo contrario, la vista no se renderizará.",
      noElementForView: "Hubo Error de Vista ChocolateChip-UI: : No se proporcionó ningún elemento para la vista. Por favor proporcione un elemento en la inicialización de la vista para que podamos acceder a él.",
      noTemplateForView: "Hubo Error de Vista ChocolateChip-UI: : No se proporcionó ninguna plantilla para esta vista. Esto significa que usted no proporcionó una plantilla en la vista de inicialización, o el elemento no tiene ninguna plantilla en su marcado.",
      viewElementHasNoTemplate: "Hubo Error de Vista ChocolateChip-UI: : El elemento de esta vista no tiene ninguna plantilla en su marcado. O bien corrija el elemento por definir una plantilla en el marcado del elemento, o defina una plantilla en la inicialización de la vista misma.",
      noElementToSetToTemplate: "Hubo Error de Vista ChocolateChip-UI: : No se proporcionó ningún elemento en el cual se renderizará la pantilla. Por favor proporcione un elemento.",
      noTemplateToSetToView: "Hubo Error de Vista ChocolateChip-UI: No se proporcionó una plantilla para esta vista. Por favor proporcione una plantilla.",
      noEventsToAdd: "Hubo Error de Vista ChocolateChip-UI: No se proporcionó ningún event para unir a la vista. Por favor, proporcione un evento para proceder.",
      noDataToSetForView: "Hubo Error de Vista ChocolateChip-UI: No se proporcionó datos para la vista. Por favor proporcione algunos datos.",
      noModelToBindToView: "Hubo Error de Vista ChocolateChip-UI: No se proporcionó un modelo para establecer un enlace entre él y la vista. Por favor proporcione un modelo válido para completar esta operación.",
      viewHasNoModel: "Hubo Error de Vista ChocolateChip-UI: No pudimos acceder al modelo de esta vista porque no está asociada con uno. Puede realizar esto usando `bindModel()`.",
      viewHasNoData: "Hubo Error de Vista ChocolateChip-UI: Esta vista no tiene datos. A caso no se renderizó con datos o no se asoció con ningún modelo. Trate de executar `getModel()` para averiguar si esta vista está usando un modelo.",
      viewHasNoTemplate: "Hubo Error de Vista ChocolateChip-UI: Esta vista no tiene plantilla. Ó se creó la vista sin plantilla, ó hubo algún error al procesar la plantilla. Debe chequear cómo se definó la vista."
    }
  }

  let errors = undefined;
  if ($('html').attr('lang') == 'en') errors = ViewErrorMessages.en;
  if ($('html').attr('lang') == 'es') errors = ViewErrorMessages.es;

  $.extend({

    /* jshint, evil: false, validthis:true, unused:false, smarttabs: true, nonew false */
    view: {
      index: 0
    },

    helpers: {},

    defineHelper: callback => {
      $.extend($.helpers, callback);
    },

    View: options => {
      /**
      options = {
        element: undefined,
        template: stringTemplate,
        model: undefined,
        variable: 'whatever',
        events: [
          {
            element: selector || 'self',
            event: 'click',
            callback: function() {}
          },
          {
            element: selector2 || 'self',
            event: 'touchstart',
            callback: function() {}
          }
        ]
      }
      */

      /**
       * Private Properties:
       */
      let __element = undefined;
      let __origElement = undefined;
      if (!options) options = {};
      if (options && options.element) {
        __origElement = options.element;
        __element = $(options.element);
      }
      let __template = options.template;
      let __data = options.data;
      let __model = options.model;
      let __index = options.index || 1;
      let __rendered = false;
      let __variable = options.variable || 'data';
      let __events = options.events || [];
      let __startIndexFrom = options.startIndexFrom || false;
      const __re = /data-src/img;
      let __safeHTML = options.safeHTML || false;
      let __es6Template = options.es6Template || false;
      let __noTemplate = options.noTemplate || false;
      const __id = $.uuid();

      /**
       * Private Functions:
       */
      
      let parsedTemplate = undefined;

      const parseView = (template, variable) => {
        if (!template) {
          console.error(errors.viewElementHasNoTemplate)
          return;
        }
        const interpolate = /\{=([\s\S]+?)\}/img;
        variable = variable || 'data';
        template.replace("'", "\'");
        /* jshint ignore:start */
        const Template = new Function(variable,
          "var p=[];" + "p.push('" + template
          .replace(/[\r\t\n]/g, " ")
          .split("'").join("\\'")
          .replace(interpolate, "',$1,'")
          /**
           * Executable:
           */
          .split('{{').join("');")
          .split('}}').join("p.push('") + "');" +
          "return p.join('');");
        return Template;
        /* jshint ignore:end */
      };

      /**
       * Binding any events provided in View options: 
       */
      const handleEvents = () => {
        if (!__element) return;
        if (__events.length) {
          __events.forEach(item => {
            if (item && item.element === 'self' || item && !item.element) {
              __element.on(item.event, item.callback);
            } else {
              __element.on(item.event, item.element, item.callback);
            }
          });
        }
      };

      /**
       * Get template from element: 
       */
      const extractTemplate = () => {
        if (!__element || !__element.size() || __noTemplate) {
          return;
        }
        if (__es6Template) return;
        if (!__template) {
          if (__element.children()[0] && __element.children().eq(0).is('script')) {
            __template = __element.children('script').html();
            __element.empty();
          } else if (__element.children()[0] && __element.children().eq(0).is('template')) {
            __template = __element.children('template').html();
            __element.empty();
          } else if (!__element[0].childNodes.length) {
            console.error(errors.viewElementHasNoTemplate)
            return;
          } else {
            if (__element[0] && __element[0].childNodes.length) {
              if (!__template) __template = __element.html();
            }
            __element.empty();
          }
          if (__template) __template = __template.replace(__re, 'src');

          parseView(__template, __variable);
        } else {
          __template = __template.replace(__re, 'src');
          parseView(__template, __variable);
        }
      };
      parsedTemplate = extractTemplate();

      if (__events) {
        handleEvents(__events);
      }

      /**
       * Return closure to encapsulate methods & data:
       */
      const view = {};
      let data = undefined;


      const bindToModel = (model, view) => {
        if (model) {
          model.boundViews.push(view);
        }
      }

      bindToModel(__model, view);

      $.extend(view, {

        id: __id,

        render(data, append) {
          if (!__element) {
            if ($.supressErrorMessages) return;
            console.error(errors.noElementForView)
            return ;
          }
          function escapeNumber(arg) {
            if ($.type(arg) === 'number') {
              return String(arg);
            } else {
              return arg;
            }
          }
          window.escapeNumber = escapeNumber;
          data = escapeNumber(data);
          __data = escapeNumber(__data);
          if (!data && !__data && !__model) {
            if ($.supressErrorMessages) return;
            console.error(errors.noDataForViewRender);
            return;
          }
          if (!data && __data) {
            data = __data;
          } else if (!data && __model) {
            data = __model.get();
          }

          /**
           * Private functions for the render method.
           * These need access to the returned instance.
           */

          /**
           * Uncloaks, checks index and loops data: 
           */
          const renderIterableData = data => {
            const Data = data ? data : __data;
            __element.removeClass('cloak');
            if (__element.data('index')) {
              __index = Number(__element.data('index'));
              $.view.index = Number(__element.data('index'));
            } else {
              __index = 1;
              $.view.index = 1;
            }
            interateModelToTemplate(Data);
          };

          /**
           * Check extracted template: 
           */
          if (__template && $.type(__template) === 'string') {
            parsedTemplate = parseView(__template, __variable);
          }

          /**
           * If the user supplied data to render:
           * If it's an array:
           */
          if ($.type(data) === 'array') {
            $.view.index = __startIndexFrom || 1;
            if (!append) __element.empty();
            data.forEach(item => {
              if (!__safeHTML) {
                item = $.escapeHTML(item);
              }
              if (!parsedTemplate && !__noTemplate) {
                if ($.supressErrorMessages) return;
                console.error(errors.viewElementHasNoTemplate)
                return;
              }
              __element.append(parsedTemplate(item)); // jshint ignore:line
              $.view.index += 1;
              __index += 1;
            });
            __rendered = true;
            $.view.index = 0;
            __element.removeClass('cloak');
            return;

            /**
             * Else if it is an object: 
             */
          } else if ($.type(data) === 'object' || $.type(data) === 'string' || $.type(data) === 'number') {
            if (!parsedTemplate) {
              if ($.supressErrorMessages) return;
              console.error(errors.viewElementHasNoTemplate)
              return;
            }
            $.view.index = __startIndexFrom || 1;
            if (!append) __element.empty();
            if (!__safeHTML) {
              data = $.escapeHTML(data);
            }
            __element.append(parsedTemplate(data)); // jshint ignore:line
            __element.removeClass('cloak');
            __rendered = true;
            return;
          }
        },

        empty() {
          if (!__element) {
            if ($.supressErrorMessages) return;
            console.error(errors.noElementForView)
            return;
          }
          __element.empty();
        },

        resetIndex() {
          if (!__element) {
            if ($.supressErrorMessages) return;
            console.error(errors.noElementForView)
            return;
          }
          __index = 0;
          __element.data('index', 0);
          $.view.index = 0;
        },

        startIndexFrom(number) {
          if (!__element) {
            if ($.supressErrorMessages) return;
            console.error(errors.noElementForView)
            return;
          }
          if (number === 0 || (number && !isNaN(number))) {
            __startIndexFrom = number;
            $.view.index = number;
            view.render();
          }
        },

        getElement() {
          if (!__element) {
            if ($.supressErrorMessages) return;
            console.error(errors.noElementForView)
            return;
          } else {
            return __element;
          }
        },

        setElement(element) {
          if (!__element) {
            if ($.supressErrorMessages) return;
            console.error(errors.noElementForView)
            return;
          }
          __element = $(element);
          $(element).empty();
          handleEvents();
        },

        getTemplate() {
          if (!__template) {
            if ($.supressErrorMessages) return;
            console.error(errors.viewHasNoTemplate)
            return;
          } else {
            return __template;
          }
        },

        setTemplate(template) {
          if (!template) {
            if ($.supressErrorMessages) return;
            console.error(errors.noTemplateToSetToView)
            return;
          } else {
            __template = template.replace(__re, 'src');
            parsedTemplate = parseView(__template);
          }
        },

        bindModel(model) {
          if (!model) {
            if ($.supressErrorMessages) return;
            console.error(errors.noModelToBindToView);
            return;
          }
          this.unbindModel(__model);
          __model = model;
          bindToModel(__model, view);
        },

        unbindModel() {
          if (__model) {
            const pos = __model.boundViews.findIndex(function(view) {
              return view.id = __id;
            })
            __model.boundViews.splice(pos,1);
          }
          __model = undefined;
        },

        getModel() {
          if (__model) {
            return __model
          } else {
            if ($.supressErrorMessages) return;
            console.error(errors.viewHasNoModel)
          }
        },

        isRendered() {
          return __rendered;
        },

        isEmpty() {
          if (!__element) {
            if ($.supressErrorMessages) return;
            console.error(errors.noElementForView)
            return;
          }
          if (__element[0].children.length) {
            return false;
          } else {
            return true;
          }
        },

        addEvent(events, replace) {
          if (!events) {
            if ($.supressErrorMessages) return;
            console.error(errors.noEventsToAdd);
            return;
          }
          if (replace) {
            __events = events & events.length ? events : [events];
          } else {
            if (events && events.length) {
              events.forEach(event => {
                __events.push(event)
              });
            } else if (events) {
              __events.push(events);
            }
          }
          handleEvents();
        },

        /**
         * options: event, element (for a delegated event), callback
         */
        off(event, element, callback) {
          __element.off(event, element, callback);
        },

        safeHTML(boolean) {
          if (boolean) {
            __safeHTML = true;
          }
        },

        isEscapingHTML() {
          return !__safeHTML;
        },

        getData() {
          if (__data) {
            return __data
          } else {
            if ($.supressErrorMessages) return;
            console.error(errors.viewHasNoData);
            return;
          }
        },

        setData(data) {
          if (!data) {
            if ($.supressErrorMessages) return;
            console.error(errors.noDataToSetForView);
            return;
          }
          if (data) {
            __data = data;
          }
        },

        mount() {
          __element = $(__origElement);
          handleEvents();
        }

      });
      return view;
    }
  }); 
})();