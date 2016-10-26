
/**
 * ChocolateChip-UI Model Factory.
 */
 (() => {
  const ModelErrorMessages = {
    en: {
      noPropertyOrDataError: "ChocolateChip-UI Model Error: No property or data were provided to set on the model.",
      noPropertyToSet: "ChocolateChip-UI Model Error: No data was provided to set on the model's property.",
      noPropertyToDelete: "ChocolateChip-UI Model Error: No property was provided to delete from the model.",
      noObjectToMerge: "ChocolateChip-UI Model Error: No object was provided to merge into the model's data.",
      incorrectDataForMerging: "ChocolateChip-UI Model Error: An incorrect type of data was provided for merging into the model. You must use a proper object for this model.",
      noObjForMixin: "ChocolateChip-UI Model Error: No object was passed to the mixin. Please provide one.",
      noCallbackForModelOn: "ChocolateChip-UI Model Error: No callback was provided for the model `on` event. Without it the event cannot work. Please provide one.",
      noEventForModelOn: "ChocolateChip-UI Model Error: No event was provided for the model's `on` handler. Without an event the handler cannot work. Please provide one an event and a callback to handle the event.",
      noEventForModelTrigger: "ChocolateChip-UI Model Error: No event was provided for the model trigger. Without it no event can be triggered. Please provide one.",
      noPosForEventDeletion: "ChocolateChip-UI Model Error: No position was provided for the callback to be deleted from the model events. Please provide one.",
      noPosForPropAt: "ChocolateChip-UI Model Error: No position was provided for getting a property on the model's collection. Please provide one.",
      noPropForPropAt: "ChocolateChip-UI Model Error: No property was provided. Without one we cannot get the property from the model collection. Please provide a property and the position in the collection to get it.",
      noValForPropEquals: "ChocolateChip-UI Model Error: No value was provided to use for getting an object property. Please provide one.",
      noPropForPropEquals: "ChocolateChip-UI Model Error: No property or value was provided. Without them we cannot get an object whose property equals some value in this model.",
      noPosForSetPropAt: "ChocolateChip-UI Model Error: No position was provided for setting a property in the model collection. Please provide one.",
      noValueForSetPropAt: "ChocolateChip-UI Model Error: No value or position was provided for setting an object by property in the model collection. Please provide a value and a position.",
      noPropForSetPropAt: "ChocolateChip-UI Model Error: No property, value or position were provided for setting the value of an object in the model collection. Please provide a property, value and position to set on the model.",
      noValueForPropEquals: "ChocolateChip-UI Model Error: No value was provided. With a value, we cannot find a matching object in the model collection. Please provide one",
      noPropForPropEquals: "ChocolateChip-UI Model Error: No property or value were provided. Without these we cannot find a matching object in the model collection. Please provide both of them.",
      noDataToPushToModel: "ChocolateChip-UI Model Error: No data was provided to push onto the model collection.",
      noDataForShiftToModel: "ChocolateChip-UI Model Error: No data was provided to insert at the beginning of the model collection.",
      noEndForModelSlice: "ChocolateChip-UI Model Error: No end value was provided to slice the model collection. Please provide a numeral value.",
      noStartModelForSlice: "ChocolateChip-UI Model Error: No start value was provided for slicing the model collection. Please provide both a start and end numeral value so that we can slice the model collection for you.",
      noEndForModelSplice: "ChocolateChip-UI Model Error: No end position was provided to splice the model collection. Please provide one.",
      noStartForModelSplice: "ChocolateChip-UI Model Error: No start position was provided for splicing the model collection. Please provide a start and end position for splicing the model collection.",
      noDataToInsertInModel: "ChocolateChip-UI Model Error: No data was provided to insert into the model collection. Was expecting an object, but found nothing. Please provide some an object of data.",
      noPosToInserInModel: "ChocolateChip-UI Model Error: No position was provided to insert data into the model collection. Please provide a position and some data to insert in the model colleciton.",
      noPropForPlucking: "ChocolateChip-UI Model Error: No property was provided to pluck from the model collection. Please provide a property.",
      noCallbackForModelFind: "ChocolateChip-UI Model Error: No callback was provided as an argument for the find on the model collection. Please provide one.",
      noCallbackForIndexOf: "ChocolateChip-UI Model Error: No callback was provided for finding the index of an object in the model collection. Please provide one.",
      noDataToConcat: "ChocolateChip-UI Model Error: No data was provided to concat to this model. Did you forget to provide the data?",
      noPropsForSortBy: "ChocolateChip-UI Model Error: No property was provided for sorting. Without a property we cannot sort.",
      noEventForEventDeletion: "ChocolateChip-UI Model Error: No event was provided to delete the callback for this model. Please provide both and event and an array position for the callback. An event can have more than one callback registered to it.",
      noCallbackForForEach: "ChocolateChip-UI Model Error: No callback was provided for the forEach method. This is required.",
      noDataToReplaceInModel: "ChocolateChip-UI Model Error: No data was provided to replace the data in the model. If you want to do so, please provide some data to complete this operation. Otherwise, if you are trying to empty the model, use `purge()`.",
      modelHasNoDataToReturn: "ChocolateChip-UI Model Error: This model has no data associated with it. Perhaps you forgot to give it any data when you created it."
    },
    es: {
      noPropertyOrDataError: "Hubo Error de Modelo ChocolateChip-UI: No se proporcionó ninguna propiedad ni datos para establecer el valor del modelo.",
      noPropertyToSet: "Hubo Error de Modelo ChocolateChip-UI: No se proporcionó ningunos datos para establecer el valor de una propiedad del modelo.",
      noPropertyToDelete: "Hubo Error de Modelo ChocolateChip-UI: No se proporcionó ninguna propiedad para eliminar del modelo.",
      noObjectToMerge: "Hubo Error de Modelo ChocolateChip-UI: No se proporcionó objeto de fundirse en los datos del modelo.",
      incorrectDataForMerging: "Hubo Error de Modelo ChocolateChip-UI: Se proporcionó un tipo incorrecto de los datos con el fin de fundirse en el modelo. Debe utilizar un objeto adecuado para este modelo.",
      noObjForMixin: "Hubo Error de Modelo ChocolateChip-UI: No se proporcionó ningún objeto al mixin. Por favor proporcione uno.",
      noCallbackForModelOn: "Hubo Error de Modelo ChocolateChip-UI: No se proporcionó ninguna función callback para el event `on` del modelo. Sin ella el evento no puede funcionar. Por favor proporcione una.",
      noEventForModelOn: "Hubo Error de Modelo ChocolateChip-UI: No se proporcionó ningún evento para la función del evento `on` del modelo.Sin un evento la función no puede realizarse. Por favor proporcione un evento.",
      noEventForModelTrigger: "Hubo Error de Modelo ChocolateChip-UI: No se proporcionó ningún evento para el gatillo del modelo. Sin él no se puede disparar ningún evento. Por favor proporcione uno.",
      noPosForEventDeletion: "Hubo Error de Modelo ChocolateChip-UI: No se proporcionó ninguna función callback la cual se puede eliminar de los eventos del modelo. Por favor proporcione una.",
      noPosForPropAt: "Hubo Error de Modelo ChocolateChip-UI: No se proporcionó ninguna posición para acceder a una propiedad en la colección del modelo. Por favor proporcione una.",
      noPropForPropAt: "Hubo Error de Modelo ChocolateChip-UI: No se proporcionó ninugna propiedad. Sin una no se puede acceder a una propiedad en la colección del modelo. Por favor proporcione una propiedad y una posición en la colección para acceder a ella.",
      noValForPropEquals: "Hubo Error de Modelo ChocolateChip-UI: No se proporiconó ningún valor para acceder a una propiedad de un objeto. Por favor proprocione uno.",
      noPropForPropEquals: "Hubo Error de Modelo ChocolateChip-UI: No se proporcionó ningúna propiedad ni valor. Sin ellos no podemos acceder a un objeto que tenga propiedad del mismo valor en este modelo.",
      noPosForSetPropAt: "Hubo Error de Modelo ChocolateChip-UI: No se proprocionó ninguna posición para establecer una propiedad en la colección del modelo. Por favor proporcione una.",
      noValueForSetPropAt: "Hubo Error de Modelo ChocolateChip-UI: No se proporcionó ninún valor ni posición para actualizar un objeto en la colección del modelo. Por favor proporcione un valor y una posición.",
      noPropForSetPropAt: "Hubo Error de Modelo ChocolateChip-UI: No se proporcionaron ninunga propiedad, valor ni posición para establecer el valor de un objeto en la colección del modelo. Por favor proporcione una propiedad, valor y posición para actualizar el objeto.",
      noValueForPropEquals: "Hubo Error de Modelo ChocolateChip-UI: No se proporcionó ningún valor. Sin algún valor no podemos encontrar a un objeto idéntico en la colección del modelo. Por favor proporcione uno.",
      noPropForPropEquals: "Hubo Error de Modelo ChocolateChip-UI: No se proporcionó ninguna propiedad ni valor. Sin ellos no podemos encontrar un objeto de iqual valor en la colección del modelo. Por favor proporcione los dos.",
      noDataToPushToModel: "Hubo Error de Modelo ChocolateChip-UI: No se proporcionaron ningunos datos para añadir al fin de la colección del modelo.",
      noDataForShiftToModel: "Hubo Error de Modelo ChocolateChip-UI: No se proporcionó ninungos datos para agregar al inicio de la colección del modelo.",
      noEndForModelSlice: "Hubo Error de Modelo ChocolateChip-UI: No se proporcionó ningún valor final para extraer de la colección del modelo. Por favor proporcione un valor numérico.",
      noStartModelForSlice: "Hubo Error de Modelo ChocolateChip-UI: No se proporcionó ningún valor inicial para extraer datos de la colección del modelo. Por favor proporcione un valor numérico inicial así como un final para que podamos extraer los datos de la colección del modelo.",
      noEndForModelSplice: "Hubo Error de Modelo ChocolateChip-UI: No se proporcionó ninguna posición final para realizar una acción de «splice» en la colección del modelo. Por favor proporcione una.",
      noStartForModelSplice: "Hubo Error de Modelo ChocolateChip-UI: No se proporcionó ninguna posición inicial para realizar una acción de «splice» en la colección del modelo. Por favor proporcione una.",
      noDataToInsertInModel: "Hubo Error de Modelo ChocolateChip-UI: No se proporcionaron ningunos datos para insertar en la colección del modelo. Se esperaba un objeto, pero no se encontró nada. Por favor proporcione un objeto de datos.",
      noPosToInserInModel: "Hubo Error de Modelo ChocolateChip-UI: No se proporcionó ninguna posición para saber en dónde insertar los datos en la colección del modelo. Por favor proporcione una posición de valor numérico y unos datos para insertar en la colección del modelo.",
      noPropForPlucking: "Hubo Error de Modelo ChocolateChip-UI: No se proporcionó ninguna propiedad para extraerla de la colección del modelo. Por favor proporcione una propiedad.",
      noCallbackForModelFind: "Hubo Error de Modelo ChocolateChip-UI: No se proporcionó ninguna función callback como parámetro a fin de realizar una búsqueda en la colección del modelo. Por favor proporcione una.",
      noCallbackForIndexOf: "Hubo Error de Modelo ChocolateChip-UI: No se proporcionó ninguna función callback a fin de averiguar el índice de un objeto en la colección del modelo. Por favor proporcione una.",
      noDataToConcat: "Hubo Error de Modelo ChocolateChip-UI: No se proporcionaron ningunos datos para concatenar en este modelo. ¿Se le olvidó proporcionar los datos?",
      noPropsForSortBy: "Hubo Error de Modelo ChocolateChip-UI: No se proporcionó ninguna propiedad. Sin una no se puede ordenar los datos del modelo.",
      noEventForEventDeletion: "Hubo Error de Modelo ChocolateChip-UI: No se proporcionó ningún evento a fin de eliminar la función callback de este modelo. Por favor proporcione tanto un evento como una posición en la colección para la callback que se quiere eliminar. Es posible que un evento tenga más de una callback registrada a él.",
      noCallbackForForEach: "Hubo Error de Modelo ChocolateChip-UI: No se proporcionó ninguna función callback para el método «forEach». Ésta se requiere.",
      noDataToReplaceInModel: "Hubo Error de Modelo ChocolateChip-UI: No se proporcionaron ningunos datos para reemplazar los del modelo. Si es lo que usted quiere hacer, por favor proporicone unos datos para realizar esta operación. En otro caso, si el propósito de esta operación es el de vaciar el modelo, use `purge()`.",
      modelHasNoDataToReturn: "Hubo Error de Modelo ChocolateChip-UI: Este modelo no tiene datos suyos. Quizás se le olvidó asignarselos cuando lo creó."
    }
  };

  let errors = undefined;
  if ($('html').attr('lang') == 'en') errors = ModelErrorMessages.en;
  if ($('html').attr('lang') == 'es') errors = ModelErrorMessages.es;


  $.extend({
    Model: function(data) {
      let __events = {};
      let __stopped = false;
      let __id = $.uuid();
      let mod = this;
      mod.data = undefined;
      mod.boundViews = [];

      /**
       * Views get bound to a model in a view initialization.
       * When you set a model to a view, it gets bound for auto-rendering.
       */
      function updateBoundViews(mod) {
        /* No bound views, so exit: */
        if (!mod.boundViews && !mod.boundViews.length) {
          return;
        };

        /** 
         * Loop thru bound views to render: 
         */
        mod.boundViews.forEach(function(view) {
          view.render();
        })
      }

      function createObjectModel(data) {

        return {

          id: __id,

          data: data,

          /**
           * Set model state to `stopped`. Used to determine whether to execute a model event. 
           */
          stop: () => __stopped = true,

          /** 
           * Set model state to run: 
           */
          start: () => __stopped = false,

          /** 
           * Check if model is stopped; 
           */
          isStopped: () => __stopped,

          /** 
           * Get the value of an object property: 
           */
          get: prop => {
            if (!prop) {
              return mod.data
            } else {
              return mod.data[prop];
            }
          },

          /** 
           * Set the value of an object property: 
           */
          set: (prop, data) => {
            if (!prop) {
              if ($.supressErrorMessages) return;
              console.error(errors.noPropertyOrDataError)
              return;
            } else if (!data) {
              if ($.supressErrorMessages) return;
              console.error(errors.noPropertyToSet + prop)
              return;
            }
            mod.data[prop] = data;
            updateBoundViews(mod);
          },

          /** 
           * Clear out the model's data: 
           */
          purge: () => mod.data = {},

          /**
           * Merge new object into model's object.
           * This will replace any existing properties of the same name.
           */
          merge: obj => {
            if (!obj) {
              if ($.supressErrorMessages) return;
              console.error(errors.noObjectToMerge);
              return;
            } else if ($.type(obj) !== 'object') {
              if ($.supressErrorMessages) return;
              console.error(erros.incorrectDataForMerging)
            } else {
              $.extend(mod.data, obj);
              updateBoundViews(mod);
            }
          },

          /**
           * Mixin new object into model's object.
           * This will not replace any existing properties of the same name.
           * Only new properties will be added.
           */
          mixin: obj => {
            if (!obj) {
              if ($.supressErrorMessages) return;
              console.error(erros.noObjForMixin);
              return;
            }
            for (let key in obj) {
              /** 
               * Do not replace property if it exists: 
               */
              if (!(key in mod.data)) {
                  mod.data[key] = obj[key];
                  updateBoundViews(mod);
              }
            }
          },

          remove: prop => {
            if (!prop) {
              if ($.supressErrorMessages) return;
              console.error(errors.noPropertyToDelete);
              return;
            }
            delete mod.data[prop];
            updateBoundViews(mod);
          },

          events: () => __events,

          on: (event, callback) => {
            if (__stopped) return;
            if (!callback) {
              if ($.supressErrorMessages) return;
              console.error(errors.noCallbackForModelOn);
              return;
            } else if (!event) {
              if ($.supressErrorMessages) return;
              console.error(errors.noEventForModelOn);
              return;
            }
            if (!__events[event]) {
              __events[event] = [callback];
            } else {
              __events[event].push(callback)
            }
          },

          trigger: (event, data) => {
            if (__stopped) return;
            if (!event) {
              if ($.supressErrorMessages) return;
              console.error(errors.noEventForModelTrigger);
              return;
            }
            data != undefined ? data : {}
            __events[event].forEach(item => {
                item(data);
            });
          },

          off: event => {
            if (!event) {
              __events = [];
            } else {
              let idx = __events.indexOf(event);
              __events.splice(idx, 1);
            }
          },

          removeEventCallback: (event, position) => {
            if (position === undefined) {
              if ($.supressErrorMessages) return;
              console.error(errors.noPosForEventDeletion);
              return;
            } else if(event === undefined) {
              if ($.supressErrorMessages) return;
              console.error(errors.noEventForEventDeletion)
            }
            __events[event].splice(position, 1);
          },

          /** 
           * Clear out the model's data: 
           */
          purge: () => mod.data = [],

          replace: (data, renderView) => {
            if (data) {
              mod.data = data;
              if (renderView) updateBoundViews(mod);
            } else {
              if ($.supressErrorMessages) return;
              console.error(errors.noDataToReplaceInModel)
            }
          },

          /** 
           * Array of views bound to this model: 
           */
          boundViews: mod.boundViews

        }
      }
      if (data) mod.data = data;

      /** 
       * Define an object-based model: 
       */
      if ($.type(data) === 'object') {
        return createObjectModel(data);

      /** 
       * Define an array-based model: 
       */
      } else if ($.type(data) === 'array') {
        return {

          id: __id,

          /**
           * Set model state to `stopped`.
           * Used to determine whether to execute a model event.
           */
          stop: () => __stopped = true,

          /** 
           * Set model state to run: 
           */
          start: () => __stopped = false,

          /** 
           * Check if model is stopped; 
           */
          isStopped: () => __stopped,

          /** 
           * Get property value at position: 
           */
          getPropAt: (prop, pos) => {
            if (pos === undefined) {
              if ($.supressErrorMessages) return;
              console.error(errors.noPosForPropAt);
              return;
            } else if (!prop) {
              if ($.supressErrorMessages) return;
              console.error(errors.noPropForPropAt);
              return;
            }
            return mod.data[pos][prop];
          },

          /** 
           * Set the value of a property at position: 
           */
          setPropAt: (prop, value, pos) => {
            if (pos === undefined) {
              if ($.supressErrorMessages) return;
              console.error(errors.noPosForSetPropAt);
              return;
            } else if (!value) {
              if ($.supressErrorMessages) return;
              console.error(errors.noValueForSetPropAt);
              return;
            } else if (!prop) {
              if ($.supressErrorMessages) return;
              console.error(errors.noPropForSetPropAt);
              return;
            }
            mod.data[pos][prop] = value;
            updateBoundViews(mod);
          },

          /** 
           * Get all of the model's data: 
           */
          get: () => {
            if (!mod.data) {
              if ($.supressErrorMessages) return;
              console.error(errors.modelHasNoDataToReturn);
            } else {
              return mod.data
            }
          },

          push: data => {
            if (!data) {
              if ($.supressErrorMessages) return;
              console.error(errors.noDataToPushToModel);
              return;
            }
            mod.data.push(data);
            updateBoundViews(mod)
          },

          pop: () => {
            mod.data.pop();
            updateBoundViews(mod)
          },

          unshift: (data) => {
            if (!data) {
              if ($.supressErrorMessages) return;
              console.error(errors.noDataForShiftToModel);
              return;
            } else {
              mod.data.unshift(data);
              updateBoundViews(mod);
            }
          },

          /** 
           * Push an object to the begging of the model: 
           */
          shift: () => {
            mod.data.shift();
            updateBoundViews(mod)
          },

          slice: (start, end) => {
            if (end === undefined) {
              if ($.supressErrorMessages) return;
              console.error(errors.noEndForModelSlice);
              return;
            } else if (start === undefined) {
              if ($.supressErrorMessages) return;
              console.error(errors.noStartModelForSlice);
              return;
            }
            return mod.data.slice(start, end);
          },

          splice: (start, end, data) => {
            if (end === undefined) {
              if ($.supressErrorMessages) return;
              console.error(errors.noEndForModelSplice);
              return;
            } else if (start === undefined) {
              if ($.supressErrorMessages) return;
              console.error(errors.noStartForModelSplice);
              return;
            }
            if (data) {
              mod.data.splice(start, end, data);
              updateBoundViews(mod);
            } else {
              mod.data.splice(start, end);
              updateBoundViews(mod);
            }
          },

          insert: (pos, data) => {
            if (data === undefined) {
              if ($.supressErrorMessages) return;
              console.error(errors.noDataToInsertInModel);
              return;
            } else if (pos === undefined) {
              if ($.supressErrorMessages) return;
              console.error(errors.noPosToInserInModel);
              return;
            }
            mod.data.splice(pos, 0, data);
            updateBoundViews(mod);
          },

          pluck: property => {
            if (!property) {
              if ($.supressErrorMessages) return;
              console.error(errors.noPropForPlucking);
              return;
            } else {
              let ret = [];
              if (mod.data && mod.data.length) {
                const len = mod.data.length;
                for (let i = 0; i < len; i++) {
                  ret.push(mod.data[i][property]);
                }
                return ret;
              }
            }
          },

          find: callback => {
            if (!callback) {
              if ($.supressErrorMessages) return;
              console.error(errors.noCallbackForModelFind);
              return;
            } else {
              return mod.data.find(callback);
            }

          },

          indexOf: callback => {
            if (!callback) {
              if ($.supressErrorMessages) return;
              console.error(errors.noCallbackForIndexOf);
              return;
            } else {
              return mod.data.indexOf(callback);
            }

          },

          findIndex: callback => {
            if (!callback) {
              if ($.supressErrorMessages) return;
              console.error(errors.noCallbackFoFindIndex);
              return;
            } else {
              return mod.data.findIndex(callback);
            }

          },

          forEach: (callback) => {
            if (!callback) {
              if ($.supressErrorMessages) return;
              console.error(errors.noCallbackForForEach);
              return;
            }
            if (mod.data && mod.data.length) {
              let value = undefined;
              let i = -1;
              const len = mod.data.length;
              while (++i < len) {
                value = callback.call(mod.data[i], mod.data[i], i);
                if (value === false) {
                  break;
                }
              }
            }
          },

          filter: (...args) => {
            if (mod.data && mod.data.length) {
              return mod.data.filter.apply(mod.data, args);
            }
          },

          map: (...args) => {
            if (mod.data && mod.data.length) {
              return mod.data.map.apply(mod.data, args);
            }
          },

          reverse: () => {
            if (mod.data && mod.data.length) {
              mod.data.reverse();
              updateBoundViews(mod);
            }
          },

          sort: (predicate) => {
            if (mod.data && mod.data.length) {
              if (predicate) {
                mod.data.sort(predicate);
                updateBoundViews(mod);
              } else {
                mod.data.sort();
                updateBoundViews(mod);
              }
            }
          },

          orderBy(...props) {
            if (!props || !props.length) {
              if ($.supressErrorMessages) return;
              console.error(errors.noPropsForSortBy);
              return;
            }
            const orderBy = (args) => {
              return (a, b) => {
                const sortByProperty = (property) => {
                  /** 
                   * Default sort order: 
                   */
                  let sortOrder = 1;
                  /** 
                   * If user provided property with "-" prefix, make sort order descending: 
                   */
                  if (property[0] === "-") {
                    sortOrder = -1;
                    /** 
                     * Extract property from hyphen prefix: 
                     */
                    property = property.substr(1);
                  }
                  /** 
                   * Sort objects by provided properties:
                   */
                  return (a, b) => {
                    const result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
                    return result * sortOrder;
                  };
                };

                /** 
                 * Loop over all properties and sort objects 
                based on those properties: 
                */
                let i = 0;
                let result = 0;
                const numberOfProperties = props.length;
                while (result === 0 && i < numberOfProperties) {
                  /** 
                   * Use the private function to compare two values: 
                   */
                  result = sortByProperty(props[i])(a, b);
                  i++;
                }
                return result;
              };
            };
            if (mod.data && mod.data.length) {
              mod.data.sort(orderBy.apply(null, props));
              updateBoundViews(mod);
            }
          },

          concat: data => {
            if (!data) {
              if ($.supressErrorMessages) return;
              console.error(errors.noDataToConcat);
              return;
            }
            let temp = mod.data.concat(data);
            mod.data = temp;
            updateBoundViews(mod);
          },

          mixin: data => {
            if (!data) {
              if ($.supressErrorMessages) return;
              console.error(errors.noPosForEventDeletion);
              return;
            }
            mod.data.concat(data).unique();
            updateBoundViews(mod);
          },

          unique: () => {
            let temp = mod.data.unique();
            mod.data = temp;
            updateBoundViews(mod);
          },

          events: () => __events,

          on: (event, callback) => {
            if (__stopped) return;
            if (!callback) {
              if ($.supressErrorMessages) return;
              console.error(errors.noCallbackForModelOn);
              return;
            } else if (!event) {
              if ($.supressErrorMessages) return;
              console.error(errors.noEventForModelOn);
              return;
            }
            if (!__events[event]) {
              __events[event] = [callback];
            } else {
              __events[event].push(callback)
            }
          },

          trigger: (event, data) => {
            if (__stopped) return;
            if (!event) {
              if ($.supressErrorMessages) return;
              console.error(errors.noEventForModelTrigger);
              return;
            }
            data != undefined ? data : {}
            __events[event].forEach(item => {
                item(data);
            });
          },

          off: event => {
            if (!event) {
              __events = [];
            } else {
              let idx = __events.indexOf(event);
              __events.splice(idx, 1);
            }
          },

          removeEventCallback: (event, position) => {
            if (position === undefined) {
              console.error(errors.noPosForEventDeletion);
              return;
            }
            __events[event].splice(position, 1);
          },

          size: () => mod.data.length,

          eq: position => mod.data[position],

          /** 
           * Clear out the model's data:
           */
          purge: () => mod.data = [],

          replace: (data, renderView) => {
            if (data) {
              mod.data = data;
              if (renderView) updateBoundViews(mod);
            } else {
              console.error(errors.noDataToReplaceInModel)
            }
          },

          /** 
           * Array of views bound to this model: 
           */
          boundViews: mod.boundViews
        }

      /**
       * No data was provided, so define a default object-based model: 
       */
      } else if (!data) {
        let data = {}
        return createObjectModel(data);
      }
    }
  })
})()