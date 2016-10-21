
/**
 * ChocolateChip-UI param method.
 */
$.extend({

  /** 
   * Serialize an object for posting to server:
   */
  param(obj, traditional) {

    /** 
     * Private function used by $.param:
     */
    function serialize(params, obj, traditional, scope) {
      let type = undefined;
      let array = $.type(obj) === 'array';
      let hash = $.isEmptyObject(obj);

      /** 
       * If it's an array of objects: 
       */
      if ($.type(obj) === 'array') {
        $.each(obj, (key, value) => {
          type = $.type(value);
          if (scope) {
            key = traditional ? scope : scope + '[' + (hash || type == 'object' || type == 'array' ? key : '') + ']';
          }
          if (!scope && array) {
            params.add(value.name, value.value);
          } else if (type == "array" || (!traditional && type == "object")) {
            serialize(params, value, traditional, key);
          } else {
            params.add(key, value);
          }
        });

        /**
         * Else its an object (use key/value loop): 
         */
      } else if ($.type(obj) === 'object') {
        for (let key in obj) {
          type = $.type(obj[key]);
          if (scope) {
            key = traditional ? scope : scope + '[' + (hash || type == 'object' || type == 'array' ? key : '') + ']';
          }
          if (!scope && array) {
            params.add(obj[key].name, obj[key].obj[key]);
          } else if (type == "array" || (!traditional && type == "object")) {
            serialize(params, obj[key], traditional, key);
          } else {
            params.add(key, obj[key]);
          }
        }
      }
    }
    let params = [];
    params.add = function(key, value) {
      if ($.type(value) === 'function') value = value();
      if (value === null) value = "";
      this.push(encodeURIComponent(key) + '=' + encodeURIComponent(value));
    };
    serialize(params, obj, traditional);
    return params.join('&').replace(/%20/g, '+');
  }
});