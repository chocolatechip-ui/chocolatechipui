
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
      noDataToInsertInModel: "ChocolateChip-UI Model Error: No data was provided to insert into the model collection. Was expecting an object, but found nothing. Please provide some an object of data. Check that you have your arguments in the correct order: position first, data second.",
      noPosToInserInModel: "ChocolateChip-UI Model Error: No position was provided to insert data into the model collection. Please provide a position and some data to insert in the model collection. The first argument should be a numerical value for the position, followed by the data to insert.",
      noPropForPlucking: "ChocolateChip-UI Model Error: No property was provided to pluck from the model collection. Please provide a property.",
      noCallbackForModelFind: "ChocolateChip-UI Model Error: No callback was provided as an argument for the find on the model collection. Please provide one.",
      noElementForIndexOf: "ChocolateChip-UI Model Error: No element was provided for finding the index of an object in the model collection. Please provide one.",
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
      noDataToInsertInModel: "Hubo Error de Modelo ChocolateChip-UI: No se proporcionaron ningunos datos para insertar en la colección del modelo. Se esperaba un objeto, pero no se encontró nada. Por favor proporcione un objeto de datos. El primer argumento debe de ser una position, seguido por los datos.",
      noPosToInserInModel: "Hubo Error de Modelo ChocolateChip-UI: No se proporcionó ninguna posición para saber en dónde insertar los datos en la colección del modelo. Por favor proporcione una posición de valor numérico y unos datos para insertar en la colección del modelo. El primer argumento debe de ser un valor numérico para la posición, y entonces unos datos que insertar.",
      noPropForPlucking: "Hubo Error de Modelo ChocolateChip-UI: No se proporcionó ninguna propiedad para extraerla de la colección del modelo. Por favor proporcione una propiedad.",
      noCallbackForModelFind: "Hubo Error de Modelo ChocolateChip-UI: No se proporcionó ninguna función callback como parámetro a fin de realizar una búsqueda en la colección del modelo. Por favor proporcione una.",
      noElementForIndexOf: "Hubo Error de Modelo ChocolateChip-UI: No se proporcionó ningun element a fin de averiguar el índice de un objeto en la colección del modelo. Por favor proporcione una.",
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

  const dataStore = {
    id: $.uuid()
  };

  class Model {
    constructor (data) {
      this.id = $.uuid();
      this[dataStore] = data;
      this.events = {};
      this.stopped = false;
      this.boundViews = [];
    }

    /**
     * This method is used internally by the model to update any views bound to it. There is never a situation where you will need to use it. It gets invoked whenever you perform an operation that changes the model's data.
     */
    updateBoundViews() {
      /* No bound views, so exit: */
      if (!this.boundViews || !this.boundViews.length) {
        return;
      }

      /** 
       * Loop thru bound views to render: 
       */
      this.boundViews.forEach(function(view) {
        view.render();
      })
    }

    /**
     * Set model state to `stopped`. Used to determine whether to execute a model event. 
     */
    stop() {
     this.stopped = true
    }

    /** 
     * Set model state to run: 
     */
    start() {
      this.stopped = false
    }

    /** 
     * Check if model is stopped; 
     */
    isStopped() {
      return this.stopped
    }

    /** 
     * Get the value of an object property.
     * This only works when the model's data is an object.
     * If used without parameter, will return all data from model, whether object or array. 
     */
    get(property) {
      if (property && $.type(this[dataStore]) === 'object') {
        return this[dataStore][property];
      } else {
        return this[dataStore]
      }
    }

    /** 
     * Set the value of an object property.
     * This only works when the model's data is an object.
     */
    set(property, data) {
      if (!property) {
        if ($.supressErrorMessages) return;
        console.error(errors.noPropertyOrDataError)
        return;
      } else if (!data) {
        if ($.supressErrorMessages) return;
        console.error(errors.noPropertyToSet + property)
        return;
      }
      if ($.type(this[dataStore]) === 'object') {
        this[dataStore][property] = data;
        this.updateBoundViews();
      }
    }

    /** 
     * Clear out the model's data.
     * Works with models with objects or arrays.
     */
    purge() {
      if ($.type(this[dataStore]) === 'object') {
        this[dataStore] = {}
      } else if ($.type(this[dataStore]) === 'array') {
        this[dataStore] = [];
      } else {
        this[dataStore] = undefined;
      }
    }

    /**
     * Merge new object into model's object.
     * This only works when the model's data is an object.
     * Will replace any existing properties of the same name.
     */
    merge(obj) {
      if (!obj) {
        if ($.supressErrorMessages) return;
        console.error(errors.noObjectToMerge);
        return;
      } else if ($.type(obj) !== 'object') {
        if ($.supressErrorMessages) return;
        console.error(errors.incorrectDataForMerging)
      } else if ($.type(this[dataStore]) === 'object') {
        for (let key in obj) {
          this[dataStore][key] = obj[key];
        }
        this.updateBoundViews();
      }
    }

    /**
     * Mixin new object into model's object.
     * This only works when the model's data is an object.
     * This will not replace any existing properties of the same name.
     * Only new properties will be added.
     */
    mixin(data) {
      if (!data) {
        if ($.supressErrorMessages) return;
        console.error(errors.noObjForMixin);
        return;
      }
      if ($.type(this[dataStore]) === 'object') {
        for (let key in data) {
          /** 
           * Do not replace property if it exists: 
           */
          if (!(key in this[dataStore])) {
            this[dataStore][key] = data[key];
            this.updateBoundViews();
          }
        }
      } else if ($.type(this[dataStore]) === 'array') {
        this[dataStore].concat(data).unique();
        this.updateBoundViews();
      }
    }

    /**
     * Replace the data of the model with the provided data.
     * This works for models of an object or array.
     */
    replace(data) {
      if (data) {
        this[dataStore] = data;
        this.updateBoundViews(this);
      } else {
        if ($.supressErrorMessages) return;
        console.error(errors.noDataToReplaceInModel)
      }
    }

    /**
     * Remove a property from a model's data.
     * Only works if the data is an object.
     */
    remove(prop) {
      if (!prop) {
        if ($.supressErrorMessages) return;
        console.error(errors.noPropertyToDelete);
        return;
      }
      if ($.type(this[dataStore]) !== 'object') return;
      delete this[dataStore][prop];
      this.updateBoundViews();
    }

    /**
     * Register an event on the model:
     */
    on(event, callback) {
      if (this.stopped) return;
      if (!event) {
        if ($.supressErrorMessages) return;
        console.error(errors.noEventForModelOn);
        return;
      } else if (!callback) {
        if ($.supressErrorMessages) return;
        console.error(errors.noCallbackForModelOn);
        return;
      } 
      if (!this.events[event]) {
        this.events[event] = [callback];
      } else {
        this.events[event].push(callback)
      }
    }

    /**
     * Trigger an event on the model:
     */
    trigger(event, data) {
      if (this.stopped) return;
      if (!event) {
        if ($.supressErrorMessages) return;
        console.error(errors.noEventForModelTrigger);
        return;
      }
      data != undefined ? data : {}
      this.events[event].forEach(item => {
          item(data);
      });
    }

    /**
     * Remove an event on the model.
     * If no event is provided, all events will be removed.
     */
    off(event) {
      if (!event) {
        this.events = {};
      } else {
        delete this.events[event];
      }
    }

    /**
     * Array specific methods:
     */

    getPropAt(property, position) {
      if (!property) {
        if ($.supressErrorMessages) return;
        console.error(errors.noPropForPropAt);
        return;
      } else if (position === undefined) {
        if ($.supressErrorMessages) return;
        console.error(errors.noPosForPropAt);
        return;
      } 
      if ($.type(this[dataStore]) === 'array') {
        return this[dataStore][position][property];
      }
    }

    setPropAt(property, value, position) {
      if (!property) {
        if ($.supressErrorMessages) return;
        console.error(errors.noPropForSetPropAt);
        return;
      } else if (value === undefined) {
        if ($.supressErrorMessages) return;
        console.error(errors.noValueForSetPropAt);
        return;
      } else if (position === undefined) {
        if ($.supressErrorMessages) return;
        console.error(errors.noPosForSetPropAt);
        return;
      } 
      if ($.type(this[dataStore]) === 'array') {
        this[dataStore][position][property] = value;
        this.updateBoundViews();
      }
    }

    push(data) {
      if (!data) {
        if ($.supressErrorMessages) return;
        console.error(errors.noDataToPushToModel);
        return;
      }
      if ($.type(this[dataStore]) === 'array') {
        this[dataStore].push(data);
        this.updateBoundViews();
      }
    }

    pop() {
      if ($.type(this[dataStore]) === 'array') {
        this[dataStore].pop();
        this.updateBoundViews();
      }
    }

    unshift(data) {
      if (!data) {
        if ($.supressErrorMessages) return;
        console.error(errors.noDataForShiftToModel);
        return;
      } else if ($.type(this[dataStore]) === 'array') {
        this[dataStore].unshift(data);
        this.updateBoundViews();
      }
    }
          
    shift() {
      if ($.type(this[dataStore]) === 'array') {
        this[dataStore].shift();
        this.updateBoundViews();
      }
    }


    slice(start, end) {
      if (end === undefined) {
        if ($.supressErrorMessages) return;
        console.error(errors.noEndForModelSlice);
        return;
      } else if (start === undefined) {
        if ($.supressErrorMessages) return;
        console.error(errors.noStartModelForSlice);
        return;
      }
      if ($.type(this[dataStore]) === 'array') {
        return this[dataStore].slice(start, end)
      }
    }

    splice(start, end, data) {
      if (end === undefined) {
        if ($.supressErrorMessages) return;
        console.error(errors.noEndForModelSplice);
        return;
      } else if (start === undefined) {
        if ($.supressErrorMessages) return;
        console.error(errors.noStartForModelSplice);
        return;
      }
      if ($.type(this[dataStore]) === 'array' && data) {
        this[dataStore].splice(start, end, data);
        this.updateBoundViews();
      } else if ($.type(this[dataStore]) === 'array') {
        if(!start || !end) return;
        this[dataStore].splice(start, end);
        this.updateBoundViews();
      }
    }

    /**
     * Instert an object into the model's array at the designated position:
     */
    insert(position, data) {
      if (data === undefined) {
        if ($.supressErrorMessages) return;
        console.error(errors.noDataToInsertInModel);
        return;
      } else if (position === undefined || $.type(position) !== 'number') {
        if ($.supressErrorMessages) return;
        console.error(errors.noPosToInserInModel);
        return;
      }
      if ($.type(this[dataStore]) === 'array') {
        if ($.type(position) !== 'number') return;
        this[dataStore].splice(position, 0, data);
        this.updateBoundViews();
      }
    }

    /**
     * Get an array of the provided property values in the model's array:
     */
    pluck(property) {
      if (!property) {
        if ($.supressErrorMessages) return;
        console.error(errors.noPropForPlucking);
        return;
      } else {
        let ret = [];
        if (this[dataStore] && this[dataStore].length) {
          const len = this[dataStore].length;
          for (let i = 0; i < len; i++) {
            ret.push(this[dataStore][i][property]);
          }
          return ret;
        }
      }
    }

    /**
     * 
     */
    indexOf(element, startFrom) {
      if (!element) {
        if ($.supressErrorMessages) return;
        console.error(errors.noElementForIndexOf);
        return;
      } else if ($.type(this[dataStore]) === 'array') {
        return this[dataStore].indexOf(element, startFrom);
      }
    }

    /**
     * This method lets you pass a callback that checks for a property or other state in the array's items and return the match. It returns the first match only.
     */
    find(callback) {
      if (!callback) {
        if ($.supressErrorMessages) return;
        console.error(errors.noCallbackForModelFind);
        return;
      } else if ($.type(this[dataStore]) === 'array') {
        return this[dataStore].find(callback);
      }
    }

    findIndex(callback) {
      if (!callback) {
        if ($.supressErrorMessages) return;
        console.error(errors.noCallbackFoFindIndex);
        return;
      } else if ($.type(this[dataStore]) === 'array') {
        return this[dataStore].findIndex(callback);
      }
    }

    forEach(callback) {
      if (!callback) {
        if ($.supressErrorMessages) return;
        console.error(errors.noCallbackForForEach);
        return;
      }
      if (this[dataStore] && this[dataStore].length) {
        let value = undefined;
        let i = -1;
        const len = this[dataStore].length;
        while (++i < len) {
          value = callback.call(this[dataStore][i], this[dataStore][i], i);
          if (value === false) {
            break;
          }
        }
      }
    }

    filter(...args) {
      if (this[dataStore] && this[dataStore].length) {
        return this[dataStore].filter.apply(this[dataStore], args);
      }
    }

    map(...args) {
      if (this[dataStore] && this[dataStore].length) {
        return this[dataStore].map.apply(this[dataStore], args);
      }
    }

    reverse() {
      if (this[dataStore] && this[dataStore].length) {
        this[dataStore].reverse();
        this.updateBoundViews();
      }
    }

    sort(compareFunction) {
      if (this[dataStore] && this[dataStore].length) {
        if (compareFunction) {
          this[dataStore].sort(compareFunction);
          this.updateBoundViews();
        } else {
          this[dataStore].sort();
          this.updateBoundViews();
        }
      }
    }

    /**
     * Sort the model's array based on passed properties. By default the ordering is ascendeing. By prefixing the property with a hyphen, the order will be descending. You can use more than one property separated by commas.
     */
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
           * Loop over all properties and sort objects based on those properties: 
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
      if (this[dataStore] && this[dataStore].length) {
        this[dataStore].sort(orderBy.apply(null, props));
        this.updateBoundViews();
      }
    }

    /**
     * Concat and array of data to the model's array.
     * After concating, it will remove any duplicates.
     */
    concat(data) {
      if (!data) {
        if ($.supressErrorMessages) return;
        console.error(errors.noDataToConcat);
        return;
      }
      if ($.type(this[dataStore]) === 'array') {
        let temp = this[dataStore].concat(data);
        this[dataStore] = temp;
        this.updateBoundViews();
      }
    }

    /**
     * Remove any duplicates from the model's array:
     */
    unique() {
      if ($.type(this[dataStore]) === 'array') {
        let temp = this[dataStore].unique();
        this[dataStore] = temp;
        this.updateBoundViews();
      }
    }

    /**
     * Get an object out of the model's array based on its index:
     */
    eq(position) {
      if ($.type(this[dataStore]) === 'array') {
        return this[dataStore][position]
      }
    } 

    /**
     * Get the length of the model's array.
     * Only works if the data is an array.
     */
    size() {
      if ($.type(this[dataStore]) === 'array') {
        return this[dataStore].length
      }
    }
  }

  $.extend({
    Model: function(data) {
      return new Model(data)
    }
  });

})();