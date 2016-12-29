/**
 * Interface for ChocolateChipJS.
 * This is a multi-purpose singleton, similar in purpose to jQuery.
 * It runs callbacks when the DOM in ready, and enables finding elements in the DOM through its selector engine.
 * It also provides a way to create new DOM elements, as well as an extension facility to add further functionality to itself and other objects.
 */
interface ChocolateChipStatic {
  /**
   * Accepts a string containing a CSS selector which is then used to match a set of elements.
   *
   * @param selector A string containing a selector expression
   * @param context A DOM HTMLElement to use as context
   * @return DOMStack
   */
  (selector: string | HTMLElement | Element | Document, context?: HTMLElement | DOMStack): ChocolateChipJS;

  /**
   * Binds a function to be executed when the DOM has finished loading.
   *
   * @param callback A function to execute after the DOM is ready.
   * @return void
   */
  (callback: () => any): void;

  /**
   * Accepts a string containing a CSS selector which is then used to match a set of elements.
   *
   * @param element A DOM element to wrap in an array.
   * @return DOMStack
   */
  (element: HTMLElement | Element): ChocolateChipJS;

  /**
   * Accepts an DOMStack which is returned as a DOMStack.
   *
   * @param DOMStack
   * @return ChocolateChipJS Returns a ChocolateChipJS DOMStack
   */
  (elementCollection: DOMStack): ChocolateChipJS;

  /**
   * Accepts the document element and returns it wrapped in a DOMStack.
   *
   * @param document The document object.
   * @return DOMStack
   */
  (document: Document): ChocolateChipJS;

  /**
   * If no argument is provided, return the document as a DOMStack.
   * 
   * @return DOMStack
   */
  (): ChocolateChipJS;

  /**
   * Extend the ChocolateChipJS object itself with the provided object.
   *
   * @param object The object to add to ChocolateChipJS.
   * @return The ChocolateChipJS object.
   */
  extend(object: Object): Object;

  /**
   * Extend a target object with another object.
   *
   * @param target An object to extend.
   * @param object The object to add to the target.
   * @return The extended object.
   */
  extend(target: Object, object: Object): Object;

  /**
   * The base for extending ChocolateChipJS collections, which are DOMStacks.
   */
  fn: {
    /**
     * This method adds the provided object to the DOMStack prototype to make it available to all instances of DOMStack.
     *
     * @param object And object to add to DOMStack.
     * @return DOMStack
     */
    extend(object: Object): ChocolateChipJS;
  };

  /**
   * Name of the library.
   */
  lib: string,

  /**
   * Version of framework
   */
  verion: number,

  /**
   * An empty function.
   *
   * @return void.
   */
  noop(): void;

  /**
   * This method create a uuid.
   * 
   * @return string A string uuid.
   */
  uuid(): string;

  /**
   * Create elements from an HTML string and return a ChocolateChipJS object.
   *
   * @param selector
   * @return ChocolateChipJS
   */
  html(selector: string): DOMStack;

  /**
   * Load a JavaScript file from a url, then execute it.
   *
   * @param url A string containing the URL where the script resides.
   * @param callback A callback function that is executed after the script loads.
   * @return void.
   */
  require(url: string, callback: Function): void;

  /**
   * This method will defer the execution of a function until the call stack is clear.
   *
   * @param callback A function to execute.
   * @param duration The number of milliseconds to delay execution.
   * @return any
   */
  delay(duration: number): Promise<any>;

  /**
   * This method allows you to execute a callback on each item in an array of elements.
   *
   * @param array An array of elements.
   * @param callback A callback to execute on each element. This has two parameters: the index of the current iteration, followed by the context.
   */
  each<T>(array: T[], callback: (idx: number, ctx: T) => any): any;

  /**
   * This method removes all duplicates from an array. This works with simple arrays or collections of objects.
   *
   * @param array An array are to process.
   * @return array Returns an array of unique items.
   */
  unique<T>(array: T[]): any[];

  /**
   * Replace one element with another.
   *
   * @param new HTMLElement
   * @param old HTMLElement
   * @return HTMLElement[]
   */
  replace(newElement: string | Element | DOMStack, oldElement: string | Element | DOMStack): void;

  /** 
   * This method lets you check whether an object is empty or not.
   *
   * @return boolean
   */
  isEmptyObject(): boolean;

  /** 
   * Test whether something is an integer or not.
   *
   * @return boolean
   */
  isInteger(): boolean;

  /** 
   * Test whether something is a float or not.
   *
   * @return boolean
   */
  isFloat(): boolean;

  /** 
   * Encodes any provided value.
   *
   * @param string A string of data to encode.
   * @return string A encodeURIComponent string.
   */
  encode(data: string): string;

  /** 
   * Escapes any HTML entities in a object. This is used by views when rendering data to templates. Its purpose is to help prevent malicious script injection.
   *
   * @param Object A object of data to encode.
   * @return Object An object with its HTML entities escaped.
   */
  escapeHTML(data: Object): Object;

  /** 
   * Takes the arguments and concatenates them together as a single string.
   *
   * @param comma separated strings or an array to convert to a single string. This provides a clean interface for concatenating values together without using the + operator and quote marks.
   * @return string
   */
  concat(...args): string;

  /**
   * This method merges one object into another. In doing so, it only adds properties that do not already exist on the target object. Only new properties will be added to the target.
   * 
   * @param sourceObject The object to add to.
   * @param targetObject The object to get properties from.
   * @return object The combined object.
   */
  mixin(sourceObject: Object, targetObject: Object): Object;

  /**
   * This method compares to items of any type to see if they are equal. This works with strings, numbers, objects, arrays, dates, functions, etc.
   * 
   * @param item1 The first item to compare to.
   * @param item2 The second item to compare with.
   * @return boolean.
   */
  compare(item1: any, item2: any): boolean;

  /**
   * This method allows you to break an array of objects down into chucks for pagination purposes. The first argument is the array of data, the second argument is the number of items per chunk.
   * 
   * @param array An array of data to chunk.
   * @param itemsPerChunk The number of items per chunk.
   * @return array.
   */
  paginate(array: any[], itemsPerChunk: number): any[];

  /**
   * Method to flatten an array containing other arrays. This is a deep flatten affecting all nested arrays.
   * 
   * @param array The array to flatten.
   * @return array.
   */
  flatten(array): any[];

  /**
   * This method controls how often a callback executes. The first argument is the callback to execute. The second argument is the time in milliseconds to wait. You can also provide a third argument of options to define how throttle works. These options are either leading or trailing. By default throttle fires on the leading and trailing edge. Passing these with boolean false can negate this: {leading: false} or {trailing: false} or {leading: false, trailing: false}.
   * 
   * @param callback The callback to execute.
   * @param wait The number of milliseconds to wait before execution.
   * @param options An object of options with boolean values: leading or trailing.
   * @return void.
   */
  throttle(callback: Function, wait: number, options?: {leading?: boolean, trailing?: boolean}): void;

  /**
   * This method delays the execution of the callback until the wait time after the last event that fired the debounce. By default this fires on the leading edge, but you can pass an optional third argument of true to force it to fire on the trailing edge.
   * 
   * @param callback A function to execute.
   * @param wait The time in milliseconds to wait before firing.
   * @param immediate A truthy value.
   * @return void.
   */
  debounce(callback: Function, wait: number, immediate?: boolean): void;

  /**
   * This will force a callback to only be executed once.
   * 
   * @param callback A function to execute.
   * @return void.
   */
  once(callback: Function): void;

  /**
   * This method 
   * 
   * @param times A number indicating the times before which the callback can be executed. For example, a times of 4 means that the callback can only execute three times.
   * @param callback The function to execute.
   * @return void.
   */
  before(times: number, callback: Function): void;

  /**
   * 
   * @param times A number indicating the times after which the callback can be executed. For example, a times of 4 means after the fourth attempt the callback will execute.
   * @param callback The function to execute.
   * @return void.
   */
  after(times: number, callback: Function): void;

  /**
   * Determine the internal JavaScript type of an object. 
   * 
   * @param obj Object to get the internal JavaScript type.
   * @return string A string of boolean, number, string, array, date, error, regexp, or object. 
   */
  type(obj: any): string;

  /**
   * This method converts a string of hyphenated tokens into a camel cased string.
   *
   * @param string A string of hyphenated tokens.
   * @return string
   */
  camelize(string: string): string;

  /**
   * This method converts a camel case string into lowercase with hyphens.
   *
   * @param string A camel case string.
   * @return string
   */
  deCamelize(string: string): string;

  /**
   * This method capitalizes the first letter of a string.
   *
   * @param string A string.
   * @param boolean A boolean value.
   * @return string
   */
  capitalize(string: string, boolean?: boolean): string;

  /**
   * Test whether the device is an iPhone.
   *
   * @return: boolean
   */
  isiPhone: boolean;

  /**
   * Test whether a device is an iPad.
   *
   * @return: boolean
   */

  isiPad: boolean;

  /**
   * Test whether a device is an iPod.
   *
   * @return: boolean
   */

  isiPod: boolean; 

  /**
   * Test whether the device is running iOS.
   *
   * @return: boolean
   */

  isiOS: boolean; 

  /**
   * Test whether the device is running Android.
   *
   * @return: boolean
   */

  isAndroid: boolean; 

  /**
   * Test whether the device supports touch events.
   *
   * @return: boolean
   */

  isTouchEnabled: boolean; 

  /**
   * Test whether the device is online. This is only checked at load time. If the connection is lost after load time, this will not reflect that.
   *
   * @return: boolean
   */

  isOnline: boolean; 

  /**
   * Test whether the app is running in standalone mode.
   *
   * @return: boolean
   */

  isStandalone: boolean;

  /**
   * Test whether the browser is Webkit-based.
   *
   * @return: boolean
   */

  isWebkit: boolean;

  /**
   * Test whether the browser is running on a desktop computer.
   *
   * @return: boolean
   */

  isDesktop: boolean;

  /**
   * Test whether the browser is Safari.
   *
   * @return: boolean
   */

  isSafari: boolean; 

  /**
   * Test whether the browser is Chrome.
   *
   * @return: boolean
   */

  isChrome: boolean; 

  /**
   * Test whether the browser is the native Android browser.
   *
   * @return: boolean
   */
  isNativeAndroid: boolean;

  /**
   * An alias for mousedown, MSPointerDown, pointerdown and touchstart.
   */
  eventStart: Event;

  /**
   * An alias for mouseup, MSPointerUp, pointerup and touchend.
   */
  eventEnd: Event;

  /**
   * An alias for mousemove, MSPointerMove, pointermove and touchmove.
   */
  eventMove: Event;

  /**
   * An alias for mouseout, MSPointerCancel, pointercancel and touchcancel.
   */
  eventCancel: Event;

  /**
   * This method sets up a custom event with the provided topic and callback. It also returns an object (mediator) with the following methods: `off`, `run` and `getTopic`, which you can capture in a variable.
   * 
   * @param
   * @param
   * @return void.
   */
  on(topic: string, callback: Function): {
    /**
     * This method disables the mediator.
     */
    off(): void;
    /**
     * This method executes the mediator with the provided data.
     */
    run(data): void;
    /**
     * This method returns the topic used by this mediator.
     */
    getTopic(): string;
  };

  /**
   * This method sends the topic and payload to any registered topic or mediators listening for that topic.
   * 
   * @param topic 
   * @param payload 
   * @return void.
   */
  send(topic, payload): void;

  /**
   * This method returns all registered topics, whether as custom events or mediators. 
   * 
   * @return void.
   */
  getTopics(): void;

  /**
   * This method deletes all registered topics, whether as custom events or mediators.
   * 
   * @param topic 
   * @return void.
   */
  removeTopic(topic): void;

  /**
   * This method creates a model object. The model instance will have different methods depending on whether it contains an object or and array.
   *
   * @param data The data to encapsulate in the Model.
   * @return Model A Model object.
   */
  Model(data: any): Model;

  /**
   * This method creates a View object.
   *
   * options An object of key/value pairs to initialize the view.
   * @return View A View object.
   */
  View(options: {
    element: string;
    template?: string;
    noTemplate?: boolean;
    data?: any;
    model?: Model;
    variable?: string;
    events?: any[];
    startIndexFrom?: number;
    safeHTML?: boolean;
    styles?: Object;
  }): View;

  /**
   * This method sets up a component. This is a reusable view factory. It takes the same arguments as a view, minus the element property.
   *
   * @param 
   * @return View
   */
  Component(options: {
    template?: string;
    variable?: string;
    events?: any[];
    startIndexFrom?: number;
    escapeHTML?: boolean;
  }): View;

  ChuiRoutes: any[];

  /**
   * Get the current screen.
   */
  getCurrent(): ChocolateChipJS;

  /**
   * Get the next screen after the current screen.
   */
  getNext(): ChocolateChipJS;

  /**
   * Get the previous screen before the current screen.
   */
  getPrevious(): ChocolateChipJS;

  /**
   * This is the ChocolateChipJS router. It creates a routing object, to which you add routes with the method: `addRoutes`.
   */
  Router(): Router;


  /**
   * A cache to hold callbacks execute by the response from a JSONP request. This is an array of strings. By default these values get purged when the callback execute and exposes the data returned by the request.
   */
  JSONPCallbacks: string[];
  /**
   * Method to perform JSONP request. 
   * 
   * @param url A string defining the url to target.
   * @param options And object literal of properties: {timeout? number, callbackName?: string, clear?: boolean}
   */
  jsonp(url: string, options?: {
    /**
     * A number representing milliseconds to express when to refect a JSONP request.
     */
    timeout?: number;
  
    /**
     * The optional name for the callback when the server response will execute. The default value is "callback". However some sites may use a different name for their JSONP function. Consult the documentation on the site to ascertain the correct value for this callback. 
     */
    callbackName?: string;
  
    /**
     * This value determines whether the callbacks and script associate with JSONP persist or are purged after the request returns. By default this is set to true, meaning that they will be purged.
     */
    clear?: boolean;
  }): any;
  
  /**
   * This method takes the data returned by a fetch or jsonp request and parses it, returning a JSON object to the following `then` for consumption by its function.
   *
   * @return JSON
   */
  json(): JSON;

  /**
   * This method allows you to format numbers. By default it uses commas for thousands, but you can provide a custom separator. Decimal markers will be handled locally by the browser.
   * By default this renders the number as is, will any decimal value. By providing a decimalPlace value, you can tell it how many decimals to display. 
   *
   * @param number The number to format.
   * @param separator A string providing the separator to use for thousands.
   * @param decimalPlace The number of deciaml places to display.
   * @return void
   */
  formatNumber(amount: number, separator?: string, decimalPlace?: number): void;

  /**
   * This method lets you get the sum of numbers. These may be comma delimited or an array of numbers.
   *
   * @param array An array of numbers or a comma-separate sequence of numbers.
   * @return number
   */
  sum(...array): number;

  /**
   * This method lets you format a number a currency. The default outputs US dollars. You can change the currency symbol with the symbol parameter. Similarly, you can change the marker used to indicate thousands with the separator parameter. You can also indicate how many decimal places to display using the decimalPlace parameter. The default is two decimal places. Decimals will be rounded off.
   *
   * @param amount A number to format as currency.
   * @param symbol A string defining the currency sumbol.
   * @param separator A string defining the separator to use for thousands.
   * @param decimalPlace The number of decimals to display.
   * @return string The string representation of the number formatted as currency.
   */
  currency(amount: number, symbol?: string, separator?: string, decimalPlace?: number): string;

  /**
   * This method allows you to take easily extract local time from a date object. It is used like this: $.formatTime(date.toLocaleTimeString()); This returns the time with appropriate AM/PM values.
   *
   * @param time A local time string from the Date object.
   * @return string
   */
  formatTime(time: string): string;

  /**
   * This method takes two dates and sorts them. You can use dates as strings in valud JavaScript format, such as: 'Jan 1, 2000'.
   *
   * @param date1 A date to sort.
   * @param date2 A date to sort.
   * @return string
   */
  sortDate(date1: string, date2: string): string;

  /**
   * This method lets you sort two numbers. The order is ascending.
   *
   * @param number1 The first number to sort.
   * @param number2 The second number to sort.
   * @return number
   */
  sortNumbers(number1: number, number2: number): number;

  /**
   * This method lets you sort two numbers. The order is descending.
   *
   * @param number1 The first number to sort.
   * @param number2 The second number to sort.
   * @return number
   */
  sortNumbersDescending(number1: number, number2: number): number;


  /**
   * This method lets you validate to passwords. It takes two inputs to compare values. Optionally you can provide a third argument for minimum length for the password.
   *
   * @input1 The first input to check.
   * @input2 The second input to check.
   * @minimum An optional length for the password.
   * @return boolean
   */
  validatePassword(input1: string, input2: string, minimum: number): boolean;

  /**
   * An array of custom validators that are added with `registerCustomValidator()`.
   */
  customValidators: any[];

  /**
   * This method lets you create custom validators. Use this when you need a validation not provided by the defaults.
   *
   * @param input A selector or DOM node/DOMStack for the element to validate.
   * @param regex A regular express to use to validate the element's value.
   * @return boolean
   */
  validateWithRegex(input: string | Element | DOMStack, regex): boolean;

  /**
   * Use this method to register a custom validator. That way you can reuse it as needed throughout your app. Or reuse it in other apps.
   *
   * @param name The name of the custom validator.
   * @param regex The regular express to use for validation.
   * @return void
   */
  registerCustomValidator(name: string, regex: RegExp): void;

  /**
   * This method returns a form's data as a serialized array.
   * 
   * @return array And array of serilized data.
   */
  serializeArray(): any[];

  /**
   * This method returns a form's data as a string of encoded values.
   * 
   * @return As string.
   */
  serialize(): any[];

  /**
   * This method serializes an object or array. If a second truthy parameter is included, it will perform a traditional shallow encoding. If your form data is quite complex, you may be better off converting your form data into a JSON object using `$.Form`.
   * 
   * @param data An object or array to seririalize.
   * @param A string of encoded
   */
  param(data: Object | any[], traditional?: boolean): string;


  /**
   * Interface for Box
   */
  Box: {
    /**
     * This method lets you set a key and value in your app's Box for local data persistence. You can handle the result using a success callback, or use a thenable instead.
     *
     * @param key The key to identify the value with in the data store.
     * @param value The value to store with the data store's key.
     * @param successCallback A successCallback to execute.
     * @return Promise
     */
    set<T>(key: string, value: any, successCallback?: Function): Promise<T>;

    /**
     * This method lets you get the value of a key stored in your app's Box. You can handle the result using a success callback, or use a thenable instead.
     *
     * @param key The key in the Box store you wish to retrieve.
     * @param successCallback A successCallback to execute.
     * @return Promise
     */
    get<T>(key: string, successCallback?: Function): Promise<T>;

    /**
     * This method lets you delete a key from your data store. You can handle the result using a success callback, or use a thenable instead.
     *
     * @param key The key to remove from the data store.
     * @return Promise
     */
    remove<T>(key: string, successCallback?: Function): Promise<T>;

    /**
     * This method lets you clear out all the data from your data store. You can run a call back or capture the result of this with a thenable.
     *
     * @return Promise
     */
    clear<T>(successCallback?: Function): Promise<T>;

    /**
     * This method lets you find out how many keys are stored in your app's Box.  You can handle the result using a success callback, or use a thenable instead.
     *
     * @return Promise
     */
    size<T>(successCallback?: Function): Promise<T>;

    /**
     * This method lets you get the name of a key based on its index value  You can handle the result using a success callback, or use a thenable instead.
     *
     * @param keyIndex The index value for a key.
     * @return Promise
     */
    key<T>(keyIndex: number, successCallback?: Function): Promise<T>;

    /**
     * This method lets you get all the keys in your data store so you can iterate over them. You can handle the result using a success callback, or use a thenable instead.
     *
     * @return Promise
     */
    keys<T>(successCallback?: Function): Promise<T>;

    /**
     * This method lets you iterate over every item in the database. You can handle the result using a success callback, or use a thenable instead.
     *
     * @param successCallback A callback to run for each item in the data store.
     * @return Promise
     */
    each<T>(successCallback?: Function): Promise<T>;

    /**
     * This method lets you  You can handle the result using a success callback, or use a thenable instead.
     *
     * @param driver A string indicating the driver to use.
     * @param name A name for the database.
     * @param size The size of the database. Default is 4980736 KB.
     * @param boxName The name of the dataStore.
     * @param version The version of the dataStore. Default is "1.0"
     * @param description A description of the dataStore. Default is empty.
     * @return void
     */
    createInstance(options: {
      driver?: string;
      name?: string;
      size?: number;
      boxName?: string;
      version?: string;
      description?: string;
    });

    /**
     * This method lets you set the name of the drive the data store is using.
     *
     * @param driverName The name of the drive to set.
     * @return void
     */
    setDriver(driverName: string);

    /**
     * This method lets you set multiple drivers for your data store with an array of driver names.
     *
     * @param any[]
     * @return void
     */
    setDriver(...options);

    /**
     * Sets the configuration values for Box to use.
     *
     * @param driver A string indicating the driver to use.
     * @param name A name for the database.
     * @param size The size of the database. Default is 4980736 KB.
     * @param boxName The name of the dataStore.
     * @param version The version of the dataStore. Default is "1.0"
     * @param description A description of the dataStore. Default is empty.
     * @return void
     */
    config(options: {
      driver?: string;
      name?: string;
      size?: number;
      boxName?: string;
      version?: string;
      description?: string;
    });
  }

}

/**
 * Interface for DOMStack.
 * This is an abstraction container for DOM Nodes, similar to a NodeList that allows ChocolateChipJS to add custom functions to manipulate collections of elements without directly modifying native methods.
 */
interface DOMStack extends Object {
  (args: any): ChocolateChipJS;

  /**
   * This method returns the element at the position in the array indicated by the argument. This is a zero-based number.
   * When dealing with document nodes, this allows you to cherry pick a node from its collection based on its
   * position amongst its siblings.
   *
   * @param number Index value indicating the node you wish to access from a collection. This is zero-based.
   * @return DOMStack with one HTMLElement.
   */
  eq(index: number): ChocolateChipJS;

  /**
   * This method pushes the provided element onto the DOMStack's data array.
   *
   * @param element The element to push to the DOMStack data array.
   * @return DOMStack
   */
  push(element: HTMLElement | Element): void;

  /**
   * This method pops the last item off of the DOMStack's data array.
   * The poped item gets returned as the result.
   *
   * @return any
   */
  pop(): any;

  /**
   * This method pushes the provided element to the beginning of the DOMStack's data array.
   *
   * @param element The element to push into the DOMStack data array.
   */
  unshift(element): void;

  /**
   * This method pops the first item off of the DOMStack's data array.
   * The poped item gets returned as the result.
   *
   * @param element An element to push onto the beginning of a DOMStack.
   * @return void
   */
  shift(): any;

  /**
   * This method returns the current length of the DOMStack. If the DOMStack contains no elements, it returns 0. The length is based on the number of items in the DOMStack data array.
   *
   * @return number A number representing the number of items in the DOMStack.
   */
  size(): number;

  /**
   * This method executes the provided callback for each item in the DOMStack.
   * It uses normal JavaScript parameter order: context first, index last.
   *
   * @param Function
   * @return void
   */
  forEach(func: (ctx: any, idx?: number) => void): void;

  /**
   * This method executes the provided callback for each item in the DOMStack.
   * It uses jQuery parameter order: index first, context last.
   *
   * @param Function
   * @return void
   */
  each(func: (idx: number, ctx?: any) => void): void;

  /**
   * This method returns a shallow copy of a portion of the DOMStack as a new DOMStack.
   * It takes two arguments: a start number and an optional end number. These are zero-based.
   *
   * @param start A zero-based number
   * @param end A zero-based number
   * @return DOMStack A subsection of a DOMStack matching the parameters.
   */
  slice(start: number, end?: number): ChocolateChipJS;

  /**
   * This method changes the content of the DOMStack by removing existing elements and/or adding new elements. 
   * The first argument is the start, which is the index at which to start changing the DOMStack. If greater than the length of stack, actual starting index will be set to the length of the stack. If negative, will begin that many elements from the end.
   * The second argument is deleteCount, an integer indicating the number of old DOMStack elements to remove. If deleteCount is 0, no elements are removed. In this case, you should specify at least one new element. If deleteCount is greater than the number of elements left in the DOMStack starting at start, then all of the elements through the end of the DOMStack will be deleted.
   * You can desingate any number of comma separated elements to add to the DOMStack. If you don't specify any elements, splice() will only remove elements from the DOMStack.
   *
   * @param start A zero-based number
   * @param deleteCount A zero-based number
   * @param itemN One or more elements to insert into the DOMStack.
   * @return void
   */
  splice(start: number, deleteCount?: number, ...item: any[]): void;

  /**
   * This method creates a new DOMStack with all elements that pass the test implemented by the provided callback.
   *
   * @param callback A calback to execute will filtering the DOMStack.
   * @param thisArg  An object to which the this keyword can refer in the callback function. If thisArg is omitted, undefined is used as the this value.
   * @return DOMStack
   */
  filter(callback: (value: any, index: number, array: any[]) => boolean, thisArg?: any): ChocolateChipJS;

  /**
   * This method creates a new DOMStack with the results of calling a provided function on every element in the DOMStack.
   *
   * @param callback A function that accepts up to three arguments. The map method calls the callback function one time for each element in the array. 
   * @param thisArg An object to which the this keyword can refer in the callback function. If thisArg is omitted, undefined is used as the this value.
   * @return DOMStack
   */
  map(callback: (value: any, index: number, array: any[]) => any, thisArg?: any): any[];

  /**
   * This method joins the elements provided as arguments to the DOMStack.
   *
   * @param value A single element or an array of elements.
   * @return void
   */
  concat(...value: any[]): void;

  /**
   * This method reverses a DOMStack in place. The first DOMStack element becomes the last and the last becomes the first.
   *
   * @return void
   */
  reverse(): void;

  /**
   * This method returns the first index at which a given element can be found in the DOMStack, or -1 if it is not present.
   *
   * @param
   * @return number
   */
  indexOf(searchElement: any, fromIndex?: number): number;

  /**
   * This method tests whether all elements in the DOMStack pass the test implemented by the provided function.
   *
   * @param callback A function that accepts up to three arguments. The every method calls the callback function for each element in the DOMStack until the callback returns false, or until the end of the DOMStack.
   * @param thisArg An object to which the this keyword can refer in the callback function. If thisArg is omitted, undefined is used as the this value.
   * @return DOMStack
   */
  every(callback: (value: any, index: number, array: any[]) => boolean, thisArg?: any): boolean;

  /**
   * This method tests whether some element in the DOMStack passes the test implemented by the provided function.
   *
   * @param callback A function that accepts up to three arguments. The some method calls the callback function for each element in the DOMStack until the callback returns true, or until the end of the array.
   * @param thisArg An object to which the this keyword can refer in the callback function. If thisArg is omitted, undefined is used as the this value.
   * @return DOMStack
   */
  some(callback: (value: any, index: number, array: any[]) => boolean, thisArg?: any): boolean;

  /**
   * This method removes all duplicates from the DOMStack.
   *
   * @return void
   */
  unique(): void;

  /**
   * This method returns the data array that the DOMStack holds. If the DOMStack has no elements, this will be an empty array with a length of 0.
   *
   * @return data Whatever data the DOMStack contains.
   */
  get(): any[];

  /**
   * This method is deprecated. You should use `get()`.
   *
   * @return data Whatever data the DOMStack contains.
   */
  getData(): any[];

  /**
   * This method removes all data from the DOMStack. This reduces its internal array to empty with a length of 0.
   *
   * @return void
   */
  purge(): void;


  /**
   * You can access the raw DOM through the [0]. If there are multple items, this only gives you access to the first node. You can get other using `eq(number)[0]` pattern. If the DOMStack contains the document or window, these will be available with this as well.
   *
   * @return DOM node, document or window.
   */
   [0]: HTMLElement | Element;
}

/**
 * Interface for ChocolateChipJS Collections.
 * This is defines the methods added to the DOMStack prototype using `$.fn.extend`.
 */
interface ChocolateChipJS extends DOMStack {

  /**
   * Get the descendants of each element in the current set of matched elements, filtered by an element.
   *
   * @param selector A selector to test.
   * @return ChocolateChipJS Returns a ChocolateChipJS DOMStack
   */
  find(selector: string): ChocolateChipJS;

  /**
   * Get the descendants of each element in the current set of matched elements, filtered by an element.
   *
   * @param element An element to test.
   * @return ChocolateChipJS Returns a ChocolateChipJS DOMStack
   */
  find(element: Element): ChocolateChipJS;

  /**
   * Get the descendants of each element in the current set of matched elements, filtered by a DOMStack.
   *
   * @param element An element to test.
   * @return ChocolateChipJS Returns a ChocolateChipJS DOMStack
   */
  find(element: DOMStack): ChocolateChipJS;

  /**
   *  Check the current matched set of elements against a selector and return true if at least one of these elements matches the given arguments.
   * 
   * @param selector A string containing a selector expression to match elements against.
   * @return ChocolateChipJS Returns a ChocolateChipJS DOMStack
   */
  is(selector: string): boolean;

  /**
   *  Check the current matched set of elements against a an array of elements and return true if at least one of these elements matches the given arguments.
   * 
   * @param elements An array containing elements to match against.
   * @return boolean
   */
  is(elements: Element[]): boolean;

  /**
   * Check the current matched set of elements against a selector, element, or an array of elements and return true if at least one of these elements matches the given arguments.
   * 
   * @param callback A function used as a test for the set of elements.Within the function, `this` refers to the current DOM element.
   * @return boolean
   */
  is(callback: (index: number, element: Element) => boolean): boolean;

  /**
   * Remove elements from the set of matched elements.
   * 
   * @param selector A string containing a selector expression to match elements against.
   * @return ChocolateChipJS Returns a ChocolateChipJS DOMStack
   */
  not(selector: string): ChocolateChipJS;

  /**
   * This method removes elements from the set of matched elements.
   *
   * @param element An HTML element to test againts.
   * @return ChocolateChipJS Returns a ChocolateChipJS DOMStack
   */
  not(element: Element): ChocolateChipJS;

  /**
   * This method removes elements from the set of matched elements.
   *
   * @param collection A DOMStack.
   * @return ChocolateChipJS Returns a ChocolateChipJS DOMStack
   */
  not(collection: ChocolateChipJS);

  /**
   * Reduce the set of matched elements to those that have a descendant that matches the selector or DOM element.
   *
   * @param selector A string defining a valid HTML selector.
   * @return ChocolateChipJS Returns a ChocolateChipJS DOMStack
   */
  has(selector: string): ChocolateChipJS;

  /**
   * Reduce the set of matched elements to those that have a descendant that matches the selector or DOM element.
   *
   * @param node A single DOM node.
   * @return ChocolateChipJS Returns a ChocolateChipJS DOMStack
   */
  has(node: Element): ChocolateChipJS;

  /**
   * Get the immediately preceding sibling of each element in the set of matched elements, optionally filtered by a selector.
   *
   * @param selector A string containing a selector expression to match elements against.
   * @return
   */
  prev(selector?: string): ChocolateChipJS;

  /**
   * Get all preceding siblings of each element in the set of matched elements, optionally filtered by a selector.
   *
   * @param selector A string containing a selector expression to match elements against.
   * @return ChocolateChipJS Returns a ChocolateChipJS DOMStack
   */
  prevAll(selector?: string): ChocolateChipJS;

  /**
   * Get the immediately following sibling of each element in the set of matched elements. If a selector is provided, it retrieves the next sibling only if it matches that selector.
   *
   * @param selector A string containing a selector expression to match elements against.
   * @return ChocolateChipJS Returns a ChocolateChipJS DOMStack
   */
  next(): ChocolateChipJS;

  /**
   * Get all following siblings of each element in the set of matched elements, optionally filtered by a selector.
   *
   * @param selector A string containing a selector expression to match elements against.
   * @return ChocolateChipJS Returns a ChocolateChipJS DOMStack
   */
  nextAll(): ChocolateChipJS;

  /**
   * Reduce the set of matched elements to the first in the set.
   *
   * @return ChocolateChipJS Returns a ChocolateChipJS DOMStack
   */
  first(): ChocolateChipJS;

  /**
   * Reduce the set of matched elements to the final one in the set.
   *
   * @return ChocolateChipJS Returns a ChocolateChipJS DOMStack
   */
  last(): ChocolateChipJS;

  /**
   * Search for a given element from among the matched elements.
   *
   * @return ChocolateChipJS Returns a ChocolateChipJS DOMStack
   */
  index(): ChocolateChipJS;

  /**
   * Search for a given element from among the matched elements.
   *
   * @param selector A selector representing a jQuery collection in which to look for an element.
   * @return ChocolateChipJS Returns a ChocolateChipJS DOMStack
   */
  index(selector: string | ChocolateChipJS): ChocolateChipJS;

  /**
   * Get the children of each element in the set of matched elements, optionally filtered by a selector.
   *
   * @param selector A string containing a selector expression to match elements against.
   * @return ChocolateChipJS Returns a ChocolateChipJS DOMStack
   */
  children(selector?: string): ChocolateChipJS;

  /**
   * Get the siblings of each element in the set of matched elements, optionally filtered by a selector.
   *
   * @param selector A string containing a selector expression to match elements against.
   * @return ChocolateChipJS Returns a ChocolateChipJS DOMStack
   */
  siblings(selector?: string): ChocolateChipJS;

  /**
   * Get the parent of each element in the current set of matched elements, optionally filtered by a selector.
   * 
   * @return ChocolateChipJS Returns a ChocolateChipJS DOMStack
   */
  parent(): ChocolateChipJS;

  /**
   * For each element in the set, get the first element that matches the selector by testing the element itself and traversing up through its ancestors in the DOM tree.
   *
   * @param selector A string containing a selector expression to match elements against.
   * @return ChocolateChipJS Returns a ChocolateChipJS DOMStack
   */
  closest(selector: string): ChocolateChipJS;

  /**
   * For each element in the set, get the element that matches the position by traversing up through its ancestors in the DOM tree.
   *
   * @param position A number indicating the position of the element ancestor to return.
   * @return ChocolateChipJS Returns a ChocolateChipJS DOMStack
   */
  closest(position: number): ChocolateChipJS;

  /**
   * Get the value of style properties for the first element in the set of matched elements.
   *
   * @param property A CSS property.
   * @return ChocolateChipJS Returns a CSS value in string format.
   */
  css(property: string): string;

  /**
   * Set one or more CSS properties for the set of matched elements.
   *
   * @param property A CSS property name.
   * @param value A value to set for the property.
   * @return CSS property value as string.
   */
  css(property: string, value: string | number): ChocolateChipJS;

  /**
   * Set one or more CSS properties for the set of matched elements.
   *
   * @param properties An object of property-value pairs to set.
   * @return ChocolateChipJS Returns a ChocolateChipJS DOMStack
   */
  css(properties: Object): ChocolateChipJS;

  /**
   * Get the current computed width for the first element in the set of matched elements,
   * including padding but excluding borders.
   *
   * @param
   * @return number
   */
  width(): number;

  /**
   * Get the current computed height for the first element in the set of matched elements,
   * including padding but excluding borders.
   *
   * @return number
   */
  height(): number;

  /**
   * Insert content, specified by the parameter, before each element in the set of matched elements.
   *
   * @param content HTML string, DOM element, or DOMStack to insert before each element in the set of matched elements.
   * @return ChocolateChipJS Returns a ChocolateChipJS DOMStack
   */
  before(content: ChocolateChipJS | Element | string | number): ChocolateChipJS;

  /**
   * Insert content, specified by the parameter, after each element in the set of matched elements.
   *
   * @param content HTML string, DOM element, or DOMStack to insert after each element in the set of matched elements.
   * @return ChocolateChipJS Returns a ChocolateChipJS DOMStack
   */
  after(content: ChocolateChipJS | Element | string | number): ChocolateChipJS;

  /**
   * Insert content, specified by the parameter, to the beginning of each element in the set of matched elements.
   *
   * @param content DOM element, array of elements, HTML string, or jQuery object to insert at the beginning of each element in the set of matched elements.
   * @return ChocolateChipJS Returns a ChocolateChipJS DOMStack
   */
  prepend(content: ChocolateChipJS | Element | string | number): ChocolateChipJS;

  /**
   * Insert content, specified by the parameter, to the end of each element in the set of matched elements.
   *
   * @param content DOM element, array of elements, HTML string, or jQuery object to insert at the end of each element in the set of matched elements.
   * @return ChocolateChipJS Returns a ChocolateChipJS DOMStack
   */
  append(content: ChocolateChipJS | Element | string | number): ChocolateChipJS;

  /**
   * Insert every element in the set of matched elements to the beginning of the target.
   *
   * @param content DOM element, array of elements, HTML string, or jQuery object to insert at the beginning of each element in the set of matched elements.
   * @return ChocolateChipJS Returns a ChocolateChipJS DOMStack
   */
  prependTo(content: ChocolateChipJS | Element | string | number): ChocolateChipJS;

  /**
   * Insert every element in the set of matched elements to the end of the target.
   *
   * @param content DOM element, array of elements, HTML string, or jQuery object to insert at the end of each element in the set of matched elements.
   * @return ChocolateChipJS Returns a ChocolateChipJS DOMStack
   */
  appendTo(content: ChocolateChipJS | Element | string | number): ChocolateChipJS;

  /**
   * Create a copy of the set of matched elements.
   *
   * @param deep A Boolean indicating whether to copy the element(s) with their children. A true value copies the children.
   * @return ChocolateChipJS Returns a clone of a ChocolateChipJS DOMStack with all of its descendents.
   */
  clone(deep?: boolean): ChocolateChipJS;

  /**
   * Wrap an HTML structure around each element in the set of matched elements.
   *
   * @param wrappingElement A selector or HTML string specifying the structure to wrap around the matched elements.
   * @return ChocolateChipJS Returns a ChocolateChipJS DOMStack
   */
  wrap(): ChocolateChipJS;

  /**
   * Remove the parents of the set of matched elements from the DOM, leaving the matched elements in their place.
   *
   * @return ChocolateChipJS Returns a ChocolateChipJS DOMStack
   */
  unwrap(): ChocolateChipJS;

  /**
   * Get the current coordinates of the first element in the set of matched elements, relative to the document.
   *
   * @return An object containing the properties top, left, bottom and right, which are integers indicating the coordinates for the element.
   */
  offset(): {
    top: number;
    left: number;
    bottom: number;
    right: number;
  };

  /**
   * Get the current coordinates of the first element in the set of matched elements, relative to the offset parent.
   *
   * @return An object with the top and left absolute position of the element.
   */
  position(): ChocolateChipJS;

  /**
   * Remove all child nodes of the set of matched elements from the DOM. Before doing so, all events will be unbound from the elements.
   *
   * @return ChocolateChipJS Returns a ChocolateChipJS DOMStack
   */
  empty(): ChocolateChipJS;

  /**
   * Get the HTML contents of the first element in the set of matched elements.
   *
   * @return string A string representation of an element's content.
   */
  html(): string;

  /**
   * Set the HTML contents of each element in the set of matched elements.
   *
   * @return ChocolateChipJS Returns a ChocolateChipJS DOMStack
   */
  html(htmlString: string): string;

  /**
   * Get the combined text contents of each element in the set of matched elements, including their descendants.
   *
   * @return string A string representation of an element's content.
   */
  text(): ChocolateChipJS;

  /**
   * Set the content of each element in the set of matched elements to the specified text.
   *
   * @param text The text to set as the content of each matched element. When Number or Boolean is supplied, it will be converted to a String representation.
   * @return ChocolateChipJS Returns a ChocolateChipJS DOMStack
   */
  text(text: string | number | boolean): ChocolateChipJS;

  /**
   * Replace each element in the set of matched elements with the provided new content and return the set of elements that was removed.
   *
   * @param newContent The content to insert. May be an HTML string, DOM element, or ChocolateChipJS DOMStack.
   * @return void
   */
  replaceWith(newContent: ChocolateChipJS | Element | string): void;

  /**
   * Removes the elements from the DOM. Before doing so, it unbinds all events.
   *
   * @return void
   */
  remove(): void;

  /**
   *  Adds the specified class(es) to each of the set of matched elements.
   *
   * @param className One or more space-separated classes to be added to the class attribute of each matched element.
   * @return ChocolateChipJS Returns a ChocolateChipJS DOMStack
   */
  addClass(className: string): ChocolateChipJS;

  /**
   * Determine whether any of the matched elements are assigned the given class.
   *
   * @param className The class name to search for.
   * @return boolean
   */
  hasClass(): boolean;

  /**
   * Remove a single class, multiple classes, or all classes from each element in the set of matched elements.
   *
   * @param className One or more space-separated classes to be removed from the class attribute of each matched element.
   * @return ChocolateChipJS Returns a ChocolateChipJS DOMStack
   */
  removeClass(className?: string): ChocolateChipJS;

  /**
   * Add or remove one or more classes from each element in the set of matched elements, depending on either the class's presence or the value of the switch argument.
   *
   * @param className One or more class names (separated by spaces) to be toggled for each element in the matched set.
   */
  toggleClass(className: string): ChocolateChipJS;

  /**
   * Get the value of an attribute for the first element in the set of matched elements.
   *
   * @param param attribute The name of the attribute to get.
   * @return string A string representing the attribute value.
   */
  attr(attribute: string): string;

  /**
   * Set the attribute and value for the set of matched elements.
   *
   * @param
   * @return ChocolateChipJS Returns a ChocolateChipJS DOMStack
   */
  attr(attribute: string, value: string | number | boolean): ChocolateChipJS;

  /**
   * Remove an attribute from each element in the set of matched elements.
   *
   * @param attribute An attribute to remove; as of version 1.7, it can be a space-separated list of attributes.
   * @return ChocolateChipJS Returns a ChocolateChipJS DOMStack
   */
  removeAttr(attribute: string): ChocolateChipJS;

  /**
   * Get the value of a property for the first element in the set of matched elements.
   *
   * @param propertyName The name of the property to get.
   */
  prop(property: string): string;

  /**
   * Set one or more properties for the set of matched elements.
   *
   * @param property The name of the property to set.
   * @param value A value to set for the property.
   * @return string A string represent the property value.
   */
  prop(property: string, value: string | number | boolean): ChocolateChipJS;

  /**
   * Remove a property for the set of matched elements.
   *
   * @param property The name of the property to remove.
   * @return ChocolateChipJS Returns a ChocolateChipJS DOMStack
   */
  removeProp(property: string): ChocolateChipJS;

  /**
   * Add the class 'disabled' to the element(s).
   *
   * @return ChocolateChipJS Returns a ChocolateChipJS DOMStack
   */
  disable(): ChocolateChipJS;

  /**
   * Remove the class 'disabled' from the element(s).
   *
   * @return ChocolateChipJS Returns a ChocolateChipJS DOMStack
   */
  enable(): ChocolateChipJS;

  /**
   * Get the current value of the first element in the set of matched elements.
   *
   * @return string A string representing the element value.
   */
  val(): string | number;

  /**
   * Set the value of each element in the set of matched elements.
   *
   * @param value A string of text or number corresponding to the value of each matched element to set as selected/checked.
   * @return ChocolateChipJS Returns a ChocolateChipJS DOMStack
   */
  val(value: string | number): ChocolateChipJS;

  /**
   * Sets the display value of the element to  `none`, while storing its previous display value on the `display_attr` attribute for later retrieval.
   *
   * @param
   * @return ChocolateChipJS Returns a ChocolateChipJS DOMStack
   */
  hide(): ChocolateChipJS;

  /**
   *  Sets the display state of the element(s). If the element has the attrbute `display_attr`, it sets the element to that value, otherwise it sets it to `block`.
   *
   * @return ChocolateChipJS Returns a ChocolateChipJS DOMStack
   */
  show(): ChocolateChipJS;

  /**
   * Get arbitrary data associated with the matched elements based on the provided key.
   *
   * @param key A string naming the piece of data to set.
   * @return data The data associated with the element.
   */
  data(key: string): any;

  /**
   * Store arbitrary data associated with the matched elements.
   *
   * @param key A string naming the piece of data to set.
   * @param value The new data value; it can be any Javascript type including Array or Object.
   */
  data(key: string, value: any): ChocolateChipJS;

  /**
   * Remove a previously-stored piece of data.
   *
   * @param name A string naming the piece of data to delete or space-separated string naming the pieces of data to delete.
   */
  removeData(name: string): ChocolateChipJS;

  /**
   * Add a handler for an event on elements.
   *
   * @param eventType A string containing one or more DOM event types, such as "tap" or "submit", etc..
   * @param handler A function handler assigned to this event.
   * @param useCapture Setting the third argument to true will trigger event bubbling. The default is false.
   * @return ChocolateChipJS
   */
  on(eventType: string | Event, handler?: (eventObject: Event) => any, capturePhase?: boolean): ChocolateChipJS;

  /**
   * Add a handler to an event for elements. When a selector is provided as the second argument, this implements a delegated event where ChocolateChipJS listens on the element for events on the designated descendent element.
   *
   * @param eventType A string containing one or more DOM event types, such as "tap" or "submit", 
   * @param selector A string defining the descendant elements are listening for the event.
   * @param handler A function handler assigned to this event.
   * @param useCapture Setting the third argument to true will trigger event bubbling. The default is false.
   * @return ChocolateChipJS
   */
  on(eventType: string | Event, selector: any, handler?: (eventObject: Event) => any, capturePhase?: boolean): ChocolateChipJS;

  /**
   * Remove a handler for an event from the elements. If the second argument is a selector, it tries to undelegate the event.
   * If no arugments are provided, it removes all events from the element(s).
   *
   * @param eventType A string containing one or more DOM event types, such as "click" or "submit," or custom event names.
   * @param selector A string defining the descendant elements are listening for the event.
   * @param handler A function handler assigned to this event.
   * @param useCapture Setting the third argument to true will trigger event bubbling. The default is false.
   * @return ChocolateChipJS
   */
  off(eventType?: string | Event, selector?: any, handler?: (eventObject: Event) => any, capturePhase?: boolean): ChocolateChipJS;

  /**
  * Trigger an event on an element.
  * 
  * @param eventType The event to trigger.
  * @return void
  */
  trigger(eventType: string | Event): void;

  /** 
   * Returns all elements that match the provided selector.
   * 
   * @param selector A valid CSS selector, DOM node, or ChocolateChipJS DOMStack element.
   * @return ChocolateChipJS
   */
  iz(selector: string | Element | ChocolateChipJS): ChocolateChipJS;

  /** 
   * Returns all elements that do not match the provided selector.
   * 
   * @param selector A valid CSS selector, DOM node, or ChocolateChipJS DOMStack element.
   * @return ChocolateChipJS
   */
  iznt(selector: string | Element | ChocolateChipJS): ChocolateChipJS;

  /** 
   * Returns all elements that match the provided selector.
   * 
   * @param selector A valid CSS selector, DOM node, or ChocolateChipJS DOMStack element.
   * @return ChocolateChipJS
   */
  haz(selector: string | Element | ChocolateChipJS): ChocolateChipJS;

  /** 
   * Returns all elements that do not match the provided selector.
   * 
   * @param selector A valid CSS selector, DOM node, or ChocolateChipJS DOMStack element.
   * @return ChocolateChipJS
   */
  haznt(selector: string | Element | ChocolateChipJS): ChocolateChipJS;

  /** 
   * Returns all elements that match the provided selector.
   * 
   * @param A valid CSS selector, DOM node, or ChocolateChipJS DOMStack element.
   * @return
   */
  hazClass(className: string): ChocolateChipJS;

  /** 
   * Returns all elements that do not match the provided selector.
   * 
   * @param A valid CSS selector, DOM node, or ChocolateChipJS DOMStack element.
   * @return ChocolateChipJS
   */
  hazntClass(className: string): ChocolateChipJS;

  /** 
   * Returns all elements that match the provided selector.
   * 
   * @param attributeName A string specifying the attribute to check against.
   * @return ChocolateChipJS
   */
  hazAttr(attributeName: string): ChocolateChipJS;

  /** 
   * Returns all elements that do not match the provided selector.
   * 
   * @param attributeName A string specifying the attribute to check against.
   * @return ChocolateChipJS
   */
  hazntAttr(attributeName: string): ChocolateChipJS;

  /**
   * Test whether a form input is empty or not.
   *
   * @return boolean
   */
  isNotEmpty(): boolean;

  /**
   * Test whether the value of a form input is alphabetic.
   *
   * @return boolean
   */
  validateAlphabetic(): boolean;

  /**
   * Test whether the value of a form input is Numeric.
   *
   * @return boolean
   */
  validateNumber(): boolean;

  /**
   * Test whether the value of a form input is alphanumeric.
   *
   * @param 
   * @return boolean
   */
  validateAlphaNumeric(): boolean;

  /**
   * Test whether the value of a form input is a valid user name, meaning whether it is alphanumeric and whether it match the minimum number of characters.
   *
   * @param minimum The minimum number of characters for a user name.
   * @return boolean
   */
  validateUserName(minimum?: number): boolean;

  /**
   * Test whether the value of a form input is a valid email addres.
   *
   * @return boolean
   */
  validateEmail(): boolean;

  /**
   * Test whether the value of a form input is a valid telephone number. This uses standar North America telephone format. If you have other needs, look at defining a custom validator with `$.registerCustomValidator(name, regex)`.
   *
   * @param 
   * @return boolean
   */
  validatePhoneNumber(): boolean;

  /**
   * Test whether the value of a form input is a valid url.
   *
   * @return boolean
   */
  validateUrl(): boolean;

  /**
   * Test whether the value of a form input is valid age. An age must be a number and the validation requires a minimum number for age. 
   *
   * @param minimum A number indicating the minimum age required.
   * @return boolean
   */
  validateAge(minimum: number): boolean;

  /**
   * Test whether the checkbox is checked or not.
   *
   * @return boolean
   */
  validateCheckbox(): boolean;

  /**
   * Test whether the radio button is checked or not.
   *
   * @return boolean
   */
  validateRadioButtons(): boolean;

  /**
   * Test whether the user made a selection in the select box.
   *
   * @return boolean
   */
  validateSelectBox(): boolean;

  /**
   * Test whether the switch is on or not.
   *
   * @return boolean
   */
  validateSwitch(): boolean;

  /**
   * Test whether the user chose something in a ChocolateChipJS Select List.
   *
   * @return boolean
   */
  validateSelectList(): boolean;

  /**
   * Test whether the user chose something in a ChocolateChipJS Multi-Select List.
   *
   * @return boolean
   */
  validateMultiSelectList(): boolean;
}

/** 
 * Interface for Model
 */
interface Model {
  /**
   * Returns an instance of $.Model. This creates an abstraction of data, along with Model-specific functions. When used with a view, it provides automatic data binding. A model can take any type of data, string, number, object, array. A model instance will have different methods depending on the type of data it holds.
   *
   * @return Model An instance of $.Model.
   */
  (data: any): Model;

  /**
   * The datastore for a model.
   */
  dataStore: string | number | Object | any[];
  
  /**
   * This method returns a boolean indicating whether the model can execute any event it might have setup with the `on` method.
   * 
   * @return void.
   */
  stop(): boolean;

  /**
   * This method tells a view to start reacting to any events registered with `on`. Use this if you have previously stopped the events with the `stop` method.
   * 
   * @return void.
   */
  start(): void;

  /**
   * This method returns a boolean indicating whether the view has been stopped to prevent its events from firing.
   * 
   * @return boolean.
   */
  isStopped(): boolean;

  /**
  * This method returns whatever data the model holds. This could be an object or an array.
  *
  * @return any Whatever data the model holds.
  */
  get(property?: string): string | number | Object | any[];

  /**
   * This method sets the provided property on the model's object with the provided data. If the propety already exists, its data will be replaced with the new data, otherwise the property will be added. This only works when the model contains an object. For models that contain arrays use `setPropAt`. This method will trigger a render of any views bound to it.
   * 
   * @return void.
   */
  set(property: string, data: any): void;

  /**
   * This method model's data. If the data was an object, it gets set to `{}`, it if is an array, `[]`.
   * 
   * @return void.
   */
  purge(): void;

  /**
   * This method only works when the model holds and object. It lets you merge the provided object into the model's object. Doing so will add new properties to the model object, and replace any that already exist.
   * 
   * @return void.
   */
  merge(object: Object): void;

  /**
   * This method lets you mixin and object or array into a model. If the model holds an array, it will add the new object's properties to the model's object. If the model holds an array, it will mixin the new array into the model. You cannot mixin an object to an array or vice versa. This method will trigger a render of any views bound to it.
   * 
   * @return void.
   */
  mixin(object: Object): void;

  /**
   * Replace the model's data with the provided data. If the model hold an object and you pass in an array, the model will now hold the array, and vice versa. This method will trigger a render of any views bound to it.
   */
  replace(data: Object | any[]): void;

  /**
   * This method lets you delete a property from a model's object. As such it only works when the model holds an object.
   * 
   * @return void.
   */
  remove(property: string): void;

  /**
   * This method lets you register an event on the model. When that event is trigger, it will execute. This method will trigger a render of any views bound to it.
   * 
   * @param event A custom event to register.
   * @param callback A function to execute.
   * @return void.
   */
  on(event: string, callback: Function): void;

  /**
   * This method lets you trigger a custom event registerd on an model. Like DOM events, a model can have multiple events of the same type registered. When you trigger the event, all instances of it on the model will fire. You can pass optional data with the event for use by the event's callback.
   * 
   * @param event 
   * @param data 
   * @return void.
   */
  trigger(event: Event, data?: any): void;

  /**
   * This method remove the provided event on the model. If no parameter is provided, all events will be removed.
   * 
   * event The event to turn off.
   * @return void.
   */
  off(event?: string): void;

  /**
   * This method retrieves the value of an object's property at the location in the array provided as the second argument.
   * 
   * @param property A string defining the property of an object in the model's array.
   * @param position A zero-based number indicating the position in the model's array.
   * @return Whatever data is at the designated location in the model.
   */
  getPropAt(property: string, position: number): any;

  /**
   * This method sets the value of the property on the model's object. This only works with models holding objects. This will trigger a redraw of any views bound to it.
   * 
   * @param propety A string indicating the property to target.
   * @param value The value to set the property to.
   * @param position A number indication the position in the model's array.
   * @return void.
   */
  setPropAt(property: string, value: any, position: number): void;

  /**
   * This method pushes data onto a  model's array. It will trigger a render of any views bound to it.
   * 
   * @param data The data to push to the model's array.
   * @return void.
   */
  push(data): void;

  /**
   * This method pops the last item off of the model's array. It will trigger a render of any views bound to it.
   * 
   * @return The last item in the model's array.
   */
  pop(): any;

  /**
   * This method pushes the provided data to the start of the model's array. It will trigger a render of any views bound to it.
   */
  unshift(data): void;

  /**
   * This method will pop the first item off of the model's array. This will trigger a render of any views bound to it.
   */
  shift(): any;

  /**
   * This method will slice items from the model's array. This does not affect the model's data, as it returns a copy. It requires a start value and optionally an end value, if no end value is provided, it will enclude everything from the start to the end of the array. Since this does not change the model's data, it doesn't cause a bound view to redraw.
   * 
   * @param start A number indicating the start position.
   * @param end A number indicating the end position.
   * @return The data matching the start and end positions.
   */
  slice(start: number, end?: number): any;

  /**
   * The method works like the array splice method. You can cut out a chunk of the array or, by passing data, replace a section of an array with new data. This method causes a bound view to redraw.
   * 
   * @param start A number indicating the start position.
   * @param end A number indiciating the end position.
   * @param data The data to insert at the defined position.
   * @return void.
   */
  splice(start, end?, data?): void;

  /**
   * This method insters the provided data at the indicated position in a model's array. This is just a simpler way of doing a splice. It causes a view bound to the model to redraw.
   * 
   * @param start A number indicating the position.
   * @param data The data to insert.
   * @return void.
   */
  insert(position: number, data): void;

  /**
   * This method lets you retireve an array of all values of the provided property from the model's array. As such it does not trigger a redraw of a view bound to the model.
   * 
   * @param property A string defining the property to retrieve.
   * @return array An array of values.
   */
  pluck(property): any[];

  /**
   * This method returns the index of the provided eleement. If not found it return -1.
   * 
   * @param element The item to search for in the array.
   * @param startFrom An optional start position in the array.
   * @return number.
   */
  indexOf(element: any, fromIndex?: number): number;

  /**
   * This method lets you find an object in a model's array based on a predicate. The predicate can perform any type of comparison or evaluation to determine the match.
   * 
   * @param callback A predicate to execute on the model's array.
   * @return The result of the search, an object or value. If no match, undefined.
   */
  find(callback: Function): any;

  /**
   * This method lets you get the index of the match in the model's array. It takes a predicate to determine the match. It returns on the first match. If no match, it returns -1.
   * 
   * @param callback A predicate to test for a match.
   * @return number The index of the match.
   */
  findIndex(callback: Function): number;

  /**
  * Performs a forEach loop equivalent to the array function with context first and index last.
  *
  * @param callback A function to execute.
  * @return void
  */
  forEach(callback: (context: any, index: number) => any): void;

  /**
  * Performs a filter of the model's array based on match criteria executed by a callback.
  *
  * @param callback A function to execute while examing the model's array contents.
  * @return The results of the filter - an array of matches or undefined.
  */
  filter(callback: (value: any, index: number, array: any[]) => boolean, thisArg?: any): any[];

  /**
  *Performs a map of the model's colleciton equivalent to the array function.
  *
  * @param value The current context in the loop.
  * @param index The current index in the loop.
  * @param array The array being mapped.
  * @return The results of the map.
  */
  map(callback: (value: any, index?: number, array?: any[]) => any, thisArg?: any): any[];

  /**
  * Reverses the order of the model's collection. It causes a view bound to the model to redraw.
  *
  * @return void
  */
  reverse(): void;

  /**
  * Performs a sort of the model's array. If a predicate is provided, the array will be sorted based on its execution.  Because this changes the model's data, it causes any bound view to redraw.
  *
  * @param predicate A function performing some type of data analisis for sorting.
  * @return void.
  */
  sort(predicate?: Function): void;

  /**
  * This method takes a comma separated list of properties by which to sort the model's collection. If a property is preceded by a hyphen the sort order for that property is descending, otherwise it is ascending. This causes any bound view to redraw.
  *
  * @return void
  */
  orderBy(...property: any[]): void;

  /**
  * Concatenate an array of data to the model's collection. This will trigger a redraw of any views bound to it.
  *
  * @param data An array to add to the end of the model's array.
  * @return void
  */
  concat(data: any[] | JSON): void;

  /**
  * Remove all duplicates from the model's array. This will trigger a redraw of any bound views.
  *
  * @return void
  */
  unique(): void;

  /**
  * This method returns the element at the position in the model indicated by the argument. This is a zero-based number.
  * If the model does not hold a collection but a single object, this returns undefined.
  *
  * @param position Index value indicating the node you wish to access from a collection. This is zero-based.
  */
  eq(position: number): any;

  /**
   * Returns the number of items in a model's array'. If the model holds an object, it returns undefined. 
   *
   * return number The number of items in a model.
   */
  size(): number;

}

/**
 * Interface for View
 */
interface View {

  id: string;

  /**
   * Render a view with the provided data. If the append true boolean is provided, the data will be rendered and appended to the view. If no data is provided and the view is bound to a model, it will render with the model.
   *
   * @param data The data to render the view with.
   * @param append A boolean to determine whether to append the rendered data to the view or rerender the view with the full set of data.
   * @return void
   */
  render(data?: any, append?: boolean): void;

  /**
   * Delete all of the view's content from the DOM.
   *
   * @return void
   */
  empty(): void;

  /**
   * Reset to 1 the index used by the view when rendering collections.
   *
   * @return void
   */
  resetIndex(): void;

  /**
   * This lets you set the number for the view's index to start from.
   *
   * @param number The number to start the index value from.
   * @return void
   */
  startIndexFrom(number: number): void;

  /**
   * Gets the template the view is currently using.
   *
   * @return string The template used by the view.
   */
  getTemplate(): string

  /**
   * Set a template on the view. If the view already has a template, it will be replaced with this one.
   *
   * @param teplate A string defining a template for the view.
   * @return void
   */
  setTemplate(template: string): void;

  /**
   * Returns the model the view is bound to.
   *
   * @return Model
   */
  getModel(): Model;

  /**
   * This tells ChocolateChipJS what model the view should be rendered with. If the view already has data bound to its `data` property, the data reference will be nullified so that the model takes precedence. After binding a model to a view, you will need to render the view to display the model's data. 
   *
   * @param model A model to bind the view to.
   * @return void
   */
  bindModel(model: Model): void;

  /**
   * Unbind a view from its model. Doing this means the view will no longer be affected by changes to the model.
   */
  unbidModel(): void;

  /**
   * Check whether the view has been rendered.
   *
   * @return boolean
   */
  isRendered(): boolean;

  /**
   * Check whether the view is empty or not.
   *
   * @return boolean
   */
  isEmpty(): boolean;

  /**
   * This method lets you define an event on a view. It takes an objec indicating the element, event and callback to use. If no element is provided, or the word `self` is used, the event is registered on the element itself, otherwise the event is registered as a delegate for the provided element.
   * If an optional true value is provided as the last argument, the event will replace any other events currently registered on the view.
   *
   * @param events An object defining an elemnt, event and callback for the view.
   * @return void
   */
  addEvent(events: { element: string | Element | DOMStack, event: string, callback: (event?: Event) => void }, replace?: boolean): void;

  /**
   * Remove all events form the view.
   *
   * @return void
   */
  off(): void;

  /**
   * This
   *
   * @param event The event to remove.
   * @param element The element the event is bound to.
   * @param callback The named callback the event fires.
   * @return void
   */
  off(event: string, element?: string | Element, callback?: Function): void;

  /**
   * Get a reference to the element the view is registered to.
   *
   * @return parent The parent element the view is bound to.
   */
  getElement(): ChocolateChipJS;

  /**
   *
   *
   * @param element 
   * @return void
   */
  setElement(element: string | Element | DOMStack): void;

  /**
   * Find out whether a view is escaping HTML in data or not.
   *
   * @return boolean
   */
  safeHTML(): void;

  /**
   * Find out whether a view is escaping HTML in data or not.
   *
   * @return boolean
   */
  isEscapingHTML(): boolean;

  /**
   * Get the data that the view is using when it renders. If the model does not have any data bound to its `data` property, it will log an error about not having any data. This will also happen if the view is bound to a model.
   */
  getData(): any;

  /**
   * This method sets the model to use the provided data when it renders. If the view already has a model bound to it, the model reference will be nullified so that the data takes precedence.
   */
  setData(data: any): void;

  /**
   * This method is only necessary if a view was imported as an ES6 module. This is because the import happens before the DOM is loaded, which means the view cannot access the DOM. Running this method on an imported view allows it to search the DOM for its anchor element, attach any events it might have and create a virtual stylesheet if any styles are defined.
   * 
   * @return void.
   */
  mount():void;
}

/**
 * Interface for Router
 */
interface Router {

  /**
   * Setup up a route. This takes two arguments: the route and a callback to execute when the route is dispatched. You can provide an ID for a route using a colon: route: 'myroute:UniqueID'.
   *
   * @return void
   */
  addRoute(options: [{
    route: string,
    callback: (...args) => void
  }]): void;

  /**
   * Get the current full route of the app. This returns a string in this format: "my/route/here:someID". IDs are indicated by a colon.
   *
   * @return string The current full route. Routes are separated by forward slashes '/'.
   */
  getFullRoute(): string;
  /**
   * Get the current route. This will be identical to the current screen, etc.
   *
   * @return string The current route.
   */
  getCurrentLoc(): string;

  /**
   * This method lets you dispatch a route. You can pass a parameter for the router to handle by putting it after a colon: $.dispatch('myRoute:myParameter').
   *
   * @param route A string defining the route to disptach.
   * @return void
   */
  dispatch(route: string): void;
}

/**
 * Represents the completion of an asynchronous operation
 */
interface Promise<T> {
  /**
   * Attaches callbacks for the resolution and/or rejection of the Promise.
   * @param onfulfilled The callback to execute when the Promise is resolved.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of which ever callback is executed.
   */
  then(onfulfilled?: ((value: T) => T | PromiseLike<T>) | undefined | null, onrejected?: ((reason: any) => T | PromiseLike<T>) | undefined | null): Promise<T>;

  /**
   * Attaches callbacks for the resolution and/or rejection of the Promise.
   * @param onfulfilled The callback to execute when the Promise is resolved.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of which ever callback is executed.
   */
  then<TResult>(onfulfilled: ((value: T) => T | PromiseLike<T>) | undefined | null, onrejected: (reason: any) => TResult | PromiseLike<TResult>): Promise<T | TResult>;

  /**
   * Attaches callbacks for the resolution and/or rejection of the Promise.
   * @param onfulfilled The callback to execute when the Promise is resolved.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of which ever callback is executed.
   */
  then<TResult>(onfulfilled: (value: T) => TResult | PromiseLike<TResult>, onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<TResult>;

  /**
   * Attaches callbacks for the resolution and/or rejection of the Promise.
   * @param onfulfilled The callback to execute when the Promise is resolved.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of which ever callback is executed.
   */
  then<TResult1, TResult2>(onfulfilled: (value: T) => TResult1 | PromiseLike<TResult1>, onrejected: (reason: any) => TResult2 | PromiseLike<TResult2>): Promise<TResult1 | TResult2>;

  /**
   * Attaches a callback for only the rejection of the Promise.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of the callback.
   */
  catch(onrejected?: ((reason: any) => T | PromiseLike<T>) | undefined | null): Promise<T>;

  /**
   * Attaches a callback for only the rejection of the Promise.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of the callback.
   */
  catch<TResult>(onrejected: (reason: any) => TResult | PromiseLike<TResult>): Promise<T | TResult>;
}

interface PromiseConstructor {
    /**
      * A reference to the prototype.
      */
    readonly prototype: Promise<any>;

    /**
     * Creates a new Promise.
     * @param executor A callback used to initialize the promise. This callback is passed two arguments:
     * a resolve callback used resolve the promise with a value or the result of another promise,
     * and a reject callback used to reject the promise with a provided reason or error.
     */
    new <T>(executor: (resolve: (value?: T | PromiseLike<T>) => void, reject: (reason?: any) => void) => void): Promise<T>;

    /**
     * Creates a Promise that is resolved with an array of results when all of the provided Promises
     * resolve, or rejected when any Promise is rejected.
     * @param values An array of Promises.
     * @returns A new Promise.
     */
    all<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10>(values: [T1 | PromiseLike<T1>, T2 | PromiseLike<T2>, T3 | PromiseLike<T3>, T4 | PromiseLike <T4>, T5 | PromiseLike<T5>, T6 | PromiseLike<T6>, T7 | PromiseLike<T7>, T8 | PromiseLike<T8>, T9 | PromiseLike<T9>, T10 | PromiseLike<T10>]): Promise<[T1, T2, T3, T4, T5, T6, T7, T8, T9, T10]>;

    /**
     * Creates a Promise that is resolved with an array of results when all of the provided Promises
     * resolve, or rejected when any Promise is rejected.
     * @param values An array of Promises.
     * @returns A new Promise.
     */
    all<T1, T2, T3, T4, T5, T6, T7, T8, T9>(values: [T1 | PromiseLike<T1>, T2 | PromiseLike<T2>, T3 | PromiseLike<T3>, T4 | PromiseLike <T4>, T5 | PromiseLike<T5>, T6 | PromiseLike<T6>, T7 | PromiseLike<T7>, T8 | PromiseLike<T8>, T9 | PromiseLike<T9>]): Promise<[T1, T2, T3, T4, T5, T6, T7, T8, T9]>;

    /**
     * Creates a Promise that is resolved with an array of results when all of the provided Promises
     * resolve, or rejected when any Promise is rejected.
     * @param values An array of Promises.
     * @returns A new Promise.
     */
    all<T1, T2, T3, T4, T5, T6, T7, T8>(values: [T1 | PromiseLike<T1>, T2 | PromiseLike<T2>, T3 | PromiseLike<T3>, T4 | PromiseLike <T4>, T5 | PromiseLike<T5>, T6 | PromiseLike<T6>, T7 | PromiseLike<T7>, T8 | PromiseLike<T8>]): Promise<[T1, T2, T3, T4, T5, T6, T7, T8]>;

    /**
     * Creates a Promise that is resolved with an array of results when all of the provided Promises
     * resolve, or rejected when any Promise is rejected.
     * @param values An array of Promises.
     * @returns A new Promise.
     */
    all<T1, T2, T3, T4, T5, T6, T7>(values: [T1 | PromiseLike<T1>, T2 | PromiseLike<T2>, T3 | PromiseLike<T3>, T4 | PromiseLike <T4>, T5 | PromiseLike<T5>, T6 | PromiseLike<T6>, T7 | PromiseLike<T7>]): Promise<[T1, T2, T3, T4, T5, T6, T7]>;

    /**
     * Creates a Promise that is resolved with an array of results when all of the provided Promises
     * resolve, or rejected when any Promise is rejected.
     * @param values An array of Promises.
     * @returns A new Promise.
     */
    all<T1, T2, T3, T4, T5, T6>(values: [T1 | PromiseLike<T1>, T2 | PromiseLike<T2>, T3 | PromiseLike<T3>, T4 | PromiseLike <T4>, T5 | PromiseLike<T5>, T6 | PromiseLike<T6>]): Promise<[T1, T2, T3, T4, T5, T6]>;

    /**
     * Creates a Promise that is resolved with an array of results when all of the provided Promises
     * resolve, or rejected when any Promise is rejected.
     * @param values An array of Promises.
     * @returns A new Promise.
     */
    all<T1, T2, T3, T4, T5>(values: [T1 | PromiseLike<T1>, T2 | PromiseLike<T2>, T3 | PromiseLike<T3>, T4 | PromiseLike <T4>, T5 | PromiseLike<T5>]): Promise<[T1, T2, T3, T4, T5]>;

    /**
     * Creates a Promise that is resolved with an array of results when all of the provided Promises
     * resolve, or rejected when any Promise is rejected.
     * @param values An array of Promises.
     * @returns A new Promise.
     */
    all<T1, T2, T3, T4>(values: [T1 | PromiseLike<T1>, T2 | PromiseLike<T2>, T3 | PromiseLike<T3>, T4 | PromiseLike <T4>]): Promise<[T1, T2, T3, T4]>;

    /**
     * Creates a Promise that is resolved with an array of results when all of the provided Promises
     * resolve, or rejected when any Promise is rejected.
     * @param values An array of Promises.
     * @returns A new Promise.
     */
    all<T1, T2, T3>(values: [T1 | PromiseLike<T1>, T2 | PromiseLike<T2>, T3 | PromiseLike<T3>]): Promise<[T1, T2, T3]>;

    /**
     * Creates a Promise that is resolved with an array of results when all of the provided Promises
     * resolve, or rejected when any Promise is rejected.
     * @param values An array of Promises.
     * @returns A new Promise.
     */
    all<T1, T2>(values: [T1 | PromiseLike<T1>, T2 | PromiseLike<T2>]): Promise<[T1, T2]>;

    /**
     * Creates a Promise that is resolved with an array of results when all of the provided Promises
     * resolve, or rejected when any Promise is rejected.
     * @param values An array of Promises.
     * @returns A new Promise.
     */
    all<T>(values: (T | PromiseLike<T>)[]): Promise<T[]>;

    /**
     * Creates a Promise that is resolved or rejected when any of the provided Promises are resolved
     * or rejected.
     * @param values An array of Promises.
     * @returns A new Promise.
     */
    race<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10>(values: [T1 | PromiseLike<T1>, T2 | PromiseLike<T2>, T3 | PromiseLike<T3>, T4 | PromiseLike<T4>, T5 | PromiseLike<T5>, T6 | PromiseLike<T6>, T7 | PromiseLike<T7>, T8 | PromiseLike<T8>, T9 | PromiseLike<T9>, T10 | PromiseLike<T10>]): Promise<T1 | T2 | T3 | T4 | T5 | T6 | T7 | T8 | T9 | T10>;

    /**
     * Creates a Promise that is resolved or rejected when any of the provided Promises are resolved
     * or rejected.
     * @param values An array of Promises.
     * @returns A new Promise.
     */
    race<T1, T2, T3, T4, T5, T6, T7, T8, T9>(values: [T1 | PromiseLike<T1>, T2 | PromiseLike<T2>, T3 | PromiseLike<T3>, T4 | PromiseLike<T4>, T5 | PromiseLike<T5>, T6 | PromiseLike<T6>, T7 | PromiseLike<T7>, T8 | PromiseLike<T8>, T9 | PromiseLike<T9>]): Promise<T1 | T2 | T3 | T4 | T5 | T6 | T7 | T8 | T9>;

    /**
     * Creates a Promise that is resolved or rejected when any of the provided Promises are resolved
     * or rejected.
     * @param values An array of Promises.
     * @returns A new Promise.
     */
    race<T1, T2, T3, T4, T5, T6, T7, T8>(values: [T1 | PromiseLike<T1>, T2 | PromiseLike<T2>, T3 | PromiseLike<T3>, T4 | PromiseLike<T4>, T5 | PromiseLike<T5>, T6 | PromiseLike<T6>, T7 | PromiseLike<T7>, T8 | PromiseLike<T8>]): Promise<T1 | T2 | T3 | T4 | T5 | T6 | T7 | T8>;

    /**
     * Creates a Promise that is resolved or rejected when any of the provided Promises are resolved
     * or rejected.
     * @param values An array of Promises.
     * @returns A new Promise.
     */
    race<T1, T2, T3, T4, T5, T6, T7>(values: [T1 | PromiseLike<T1>, T2 | PromiseLike<T2>, T3 | PromiseLike<T3>, T4 | PromiseLike<T4>, T5 | PromiseLike<T5>, T6 | PromiseLike<T6>, T7 | PromiseLike<T7>]): Promise<T1 | T2 | T3 | T4 | T5 | T6 | T7>;

    /**
     * Creates a Promise that is resolved or rejected when any of the provided Promises are resolved
     * or rejected.
     * @param values An array of Promises.
     * @returns A new Promise.
     */
    race<T1, T2, T3, T4, T5, T6>(values: [T1 | PromiseLike<T1>, T2 | PromiseLike<T2>, T3 | PromiseLike<T3>, T4 | PromiseLike<T4>, T5 | PromiseLike<T5>, T6 | PromiseLike<T6>]): Promise<T1 | T2 | T3 | T4 | T5 | T6>;

    /**
     * Creates a Promise that is resolved or rejected when any of the provided Promises are resolved
     * or rejected.
     * @param values An array of Promises.
     * @returns A new Promise.
     */
    race<T1, T2, T3, T4, T5>(values: [T1 | PromiseLike<T1>, T2 | PromiseLike<T2>, T3 | PromiseLike<T3>, T4 | PromiseLike<T4>, T5 | PromiseLike<T5>]): Promise<T1 | T2 | T3 | T4 | T5>;

    /**
     * Creates a Promise that is resolved or rejected when any of the provided Promises are resolved
     * or rejected.
     * @param values An array of Promises.
     * @returns A new Promise.
     */
    race<T1, T2, T3, T4>(values: [T1 | PromiseLike<T1>, T2 | PromiseLike<T2>, T3 | PromiseLike<T3>, T4 | PromiseLike<T4>]): Promise<T1 | T2 | T3 | T4>;

    /**
     * Creates a Promise that is resolved or rejected when any of the provided Promises are resolved
     * or rejected.
     * @param values An array of Promises.
     * @returns A new Promise.
     */
    race<T1, T2, T3>(values: [T1 | PromiseLike<T1>, T2 | PromiseLike<T2>, T3 | PromiseLike<T3>]): Promise<T1 | T2 | T3>;

    /**
     * Creates a Promise that is resolved or rejected when any of the provided Promises are resolved
     * or rejected.
     * @param values An array of Promises.
     * @returns A new Promise.
     */
    race<T1, T2>(values: [T1 | PromiseLike<T1>, T2 | PromiseLike<T2>]): Promise<T1 | T2>;

    /**
     * Creates a Promise that is resolved or rejected when any of the provided Promises are resolved
     * or rejected.
     * @param values An array of Promises.
     * @returns A new Promise.
     */
    race<T>(values: (T | PromiseLike<T>)[]): Promise<T>;

    /**
     * Creates a new rejected promise for the provided reason.
     * @param reason The reason the promise was rejected.
     * @returns A new rejected Promise.
     */
    reject(reason: any): Promise<never>;

    /**
     * Creates a new rejected promise for the provided reason.
     * @param reason The reason the promise was rejected.
     * @returns A new rejected Promise.
     */
    reject<T>(reason: any): Promise<T>;

    /**
      * Creates a new resolved promise for the provided value.
      * @param value A promise.
      * @returns A promise whose internal state matches the provided promise.
      */
    resolve<T>(value: T | PromiseLike<T>): Promise<T>;

    /**
     * Creates a new resolved promise .
     * @returns A resolved promise.
     */
    resolve(): Promise<void>;
}

declare var Promise: PromiseConstructor;

/**
 * Interface for fetch API.
 *
 * @param input A string representing a valid url.
 * @param init An object literal of key value pairs to set method, headers, body, credentials or cache.
 * @return Promise.
 */
interface fetch {
  (input: string,
    init?: {
      method?: string;
      headers?: {};
      body?: any;
      mode?: {
        cors: string;
        "no-cors": string;
        "same-origin": string;
      };
      credentials?: {
        omit: string;
        "same-origin": string;
        include: string;
      };
      cache?: {
        default: string;
        "no-store": string;
        reload: string;
        "no-cache": string;
        "force-cache": string;
        "only-if-cached": string;
      };
      timeout?: number;
    }): Promise<any>;
}

/**
 * Headers Interface. This defines the methods exposed by the Headers object.
 */
interface Headers {
  (headers?: any): void;
  append(name: string, value: string): void;
  delete(name: string): any;
  get(name: string): any;
  getAll(name: string): any;
  has(name: string): any;
  set(name: string, value: string): any;
  forEach(callback: Function, thisArg: any): any;
}

interface decode {
  (body: any): FormData;
}

/**
 * Request Interface. This defines the properties and methods exposed by the Request object.
 */
interface Request {
  (input: {
    url: string;
    request: Request;
  }, init: Object): Request;
  clone(): Request;
  arrayBuffer(): ArrayBuffer;
  blob(): Blob;
  formData(): FormData;
  json(): JSON;
  text(): string;

  method: string;
  url: string;
  heaers: Headers;
  context: any;
  referrer: any;
  mode: string;
  credentials: any;
  cache: string;
  bodyUsed: boolean;
}

interface URLSearchParams {
  (): URLSearchParams;
}

/**
 * Resonse Interface. This defines the properties and methods exposed by the Response object.
 */
interface Response {
  (body?: {
    blob: Blob;
    bormData: FormData;
    urlParams: URLSearchParams;
    url: string;
  },
    init?: {
      status?: string | number;
      statusText?: string;
      headers: Headers;
    }): Response;
  clone(): Response;
  redirect(): Response;
  arrayBuffer(): ArrayBuffer;
  blob(): Blob;
  formData(): FormData;
  json(): JSON;
  text(): string;

  type: string;
  url: string;
  useFinalURL: boolean;
  ok: boolean;
  statusText: string;
  headers: Headers;
  bodyUsed: boolean;
}
/* Interfaces for Widgets */
interface ChocolateChipStatic {
  /**
   * This property if set to true tells ChocolateChip-UI at load to time attach a global navbar to the document. This is for situations where a colored navbar on navigation lists show a white flash during transition animations. Setting this property to true eliminates that.
   */
  globalNav: boolean;

  /**
   * This method centers the title in the navigation bar for iOS. It leaves the title alone on Android. When elements on either side of the title are taking up too much space, the title will be adjusted to the opposite side where space is available, even if it is off center.
   * 
   * @return void.
   */
  AdjustNavbarLayout(screen: string | Element | DOMStack): void;
  
  /**
   * This method lets you direct the user to the designated screen. The screen is the id value of the screen minus the `#`.
   * 
   * @return void.
   */
  GoToScreen(sceen: string): void;
  
  /**
   * This method returns the user to the previous screen. It gets executed automatically if the current navigation bar has a button with the class `backTo`.
   * 
   * @return void.
   */
  GoBack(): void;
  
  /**
   * This method lets you direct the user back to a previous screen outside the path the user took to the current screen. You provide the destination screen id without the `#`. ChocolateChipJS will automaticaly slice the $.ChocolateChipJSRoutes stack to contain the correct navigation history after this is preformed.
   * 
   * @return void.
   */
  GoBackToScreen(screen: string): void;
  
  /**
   * This method lets you create a tab bar interface for you app. On iOS the tab bar expects icons. You can tell ChocolateChipJS to also display icons on Android and Window. By default they do not use icons in their tab bars.
   * 
   * @return void.
   */
  TabBar: Tabbar;
  
  /**
   * This method lets you create a slide out menu. After running this function, you can populate the slide out with menu items by using the `populate` method.
   * 
   * @return void.
   */
  SlideOut: {
    (): {
      /**
       * This method lets you populate the slide out menu with navigation items. It takes an array of key value pairs: [{music: 'Music'},{food: 'Food'}].
       * The label should indicate a screen id. the label value will be displayed as the item name.
       * 
       * @param And array of objects of key value pairs defining the value and label for each slideout menu item.
       * @return void.
       */
      populate(options: Object[]): void;
    }
  }
  
  /**
   * This method lets you create an editable list. That means the user can delete items or move items or both. You can bind the list to a model so that user changes are pushed to the mode, and you can box the model so that the user choices are persisted in the local data store.
   * 
   * @param An object of options: editLabel, doneLabel, deleteLabel, cancelLabel, callback, deletable, movable, model, modelProp, view.
   * @return void.
   */
  EditList(options: {
    editLabel?: string;
    doneLabel?: string;
    deleteLabel?: string;
    cancelLabel?: string;
    callback?: (...args) => any;
    deletable?: boolean;
    movable?: boolean;
    model?: Model;
    modelProp?: string;
    view: View;
  });
  
  /**
   * This method lets you set up validation and JSONification of a form. It takes an array of key value pairs to define the validation to perform. This takes an element to validate, the type of validation to perform and a callback to execute if the validation fails.
   * 
   * @param array An array of objects defining element, type and callback for each input to validate.
   * @return An object that holds any errors and the data in JSON format extracted from the inputs.
   */
  Form(options: [
    {
      element: string | Element | DOMStack,
      type?: string;
      callback?: Function;
    }
  ]): {
  
      /**
       * Get an object of all errors from the form.
       * 
       * @return An array with any error messages.
       */
      getErrors(): any[];
  
      /**
       * Check whether there were any validation errors.
       * 
       * @return boolean True or false if there are errros.
       */
      errors(): boolean;
  
      /**
       * Get the form's data as a JSON object.
       * 
       * @return A JSON object with the input values.
       */
      get(): JSON;
    };
  
  /**
   * This method sets up a select list. It takes an anchor element, a selected state, a name for the list's radio buttons, a callback and a model to bind to.
   * 
   * @param options: element, selected, name, callback, model.
   * @return An object to get the state and value of the list.
   */
  SelectList(options: {
    element: string | Element | DOMStack,
    selected?: number,
    name?: string,
    callback?: Function,
    model?: Model

  }): {
  
      /**
       * Get the current SelectList selection. This is an object with an index number and value.
       * 
       * @return An object with the index and value.
       */
      val(): {
        index: number;
        value: any;
      };

      /**
       * This method is deprecated. Use `val()` instead.
       */
      getSelection(): {
        index: number;
        value: any;
      };
    }
  
  /**
   * This method turns a list into a multiple choice list.
   * 
   * @param options: element, selected, name, callback, model.
   * @return An object to get the state and value of the list.
   */
  MultiSelectList(options: {
    element: string | Element | DOMStack,
    selected?: number[],
    name?: string,
    callback?: Function,
    model?: Model
  }): {
  
      /**
       * Get the current selections on the Multi-Select List. This returns an array of objects with index numbers and values.
       * 
       * @return An object with the index and value.
       */
      val(): [{
        index: number,
        value: any;
      }];
  
      /**
       * This method is deprecated. Use `val()` instead.
       */
      getSelection(): [{
        index: number,
        value: any;
      }];
    };
  
  /**
   * This method setups up a switch. It takes an element, a possible name for the switch's checkbox, a value for the switch, a checked value (true or false) and a two callbacks: one for when the switch is turned on and another for when it is turned off.
   * 
   * @return An object to get the state and value of the switch.
   */
  Switch(options: {
    element: string | Element | DOMStack;
    name: string;
    value: any;
    checked: boolean;
    on: Function;
    off: Function;
    /* Deprecated, use `on` */
    onCallback: Function;
    /* Deprecated, use `off` */
    offCallback: Function;
  }): {
      /**
       * Get the current state of the switch. This returns an object with the checked state and value of the switch.
       * 
       * @return An object with the checked state and value.
       */
      val(): {
        checked: boolean;
        value: any;
      }
      /**
       * This method is deprecated. Use `val()` instead.
       */
      getValue(): {
        checked: boolean;
        value: any;
      }
    }
  
  /**
   * This method allows you to throw up a mask covering the entire screen. You can provide an opacity value to control the mask's opacity to your liking.
   * 
   * @return void.
   */
  Block(opacity: string): void;
  
  /**
   * This removes any currently displayed mask.
   * 
   * @return void.
   */
  Unblock(): void;
  
  /**
   * This method lets you create a popup. You can provide an id, a title, a message, a value for the cancel button, a value for the continue button, a width, a callback to execute when the continue button is tapped and control whether the popup is completely empty. If you want only one button, provide the cancel button with whatever label you wish.
   * 
   * @param And object of options: id, title, message, cancelButton, continueButton, width, callback, empty.
   * @return void.
   */
  Popup(options: {
    id?: string;
    title?: string;
    message?: string;
    cancelButton?: string;
    continueButton?: string;
    width?: string;
    callback?: Function;
    empty?: boolean;
  });
  
  /**
   * This method lets you create a segmented button collection. It expects an element in which to insert the buttons. You can provide labels for the buttons, a default selected button and a callback to execute when the user clicks a button.
   * 
   * @param And object of options: element, labels, selected, callback.
   * @return An object that lets you get the segmented buttons' index and DOM reference.
   */
  Segmented(options: {
    element: string;
    labels: any[];
    selected: number;
    callback: Function;
  }): {
      /**
       * Get the currently selected button. This reutrns a zero-based number.
       * 
       * @return An object with the index and element.
       */
      val(): {
        index: number;
        element: ChocolateChipJS;
      };
      /**
       * This method is deprecated. Use `val()` instead.
       */
      getSelection(): {
        index: number;
        element: ChocolateChipJS;
      };
    };
  
  /**
   * Create a sheet. You can control whether the sheet slides down from the top or up from the bottom with the `slideDown` property. If true, it slides down from the top, otherwise it slides up form the bottom. You can also control whether the handle appears or not with the handle property set to false or ture. The default is true. You can provide a background color in hex format using the `background` property.
   * 
   * @param An object of options: id, background, handle, slideDown.
   * @return void.
   */
  Sheet(options: {
    id?: string;
    background?: string;
    handle?: boolean | string;
    slideDown?: boolean | string;
  }): void;
  
  /**
   * Show the sheet whose id you provide.
   * 
   * @param id The id of the sheet.
   * @reurn void.
   */
  ShowSheet(id: string): void;
  
  /**
   * Hide the sheet whose id you provide.
   * 
   * @param id The string id of the sheet.
   * @return void.
   */
  HideSheet(id: string): void;
  
  /**
   * This method lets you initialize a paging widgets. Each page is an article tag with the class `paging` inside the section tag of a screen.
   * 
   * @param An object with the element to target.
   * @return void.
   */
  Paging(options: {element: string, Element, HTMLElement, DOMStack}): void;
  
  /**
   * This method lets you set up a stepper control. This takes an element to convert into a stepper, a min and max value and whatever default value you want it to have at load time.
   * 
   * @param An object of options: element, min, max, defaultValue.
   * @return And object to get the value of the stepper.
   */
  Stepper(options: {
    element: string | Element | DOMStack;
    min: number;
    max: number;
    defaultValue: any;
  }): {
      /**
       * This method lets you get the current value of the stepper.
       * 
       * @return The stepper's value.
       */
      val(): string;

      /**
       * This method is deprecated. Use `val()` instead.
       */
      getValue(): any;
    }
  
  /**
   * This method lets you set up a popover widget. It takes an id, a title, and a callback to execute when the user taps on items. If no title is provided, it will be empty.
   * 
   * @param And object of options: id, callback, title.
   * @return void.
   */
  Popover(options: {
    id: string;
    callback: Function;
    title: string;
  }): void;
  
  /**
   * This method aligns the popover so that it is positioned relative to the element that popped it up.
   * 
   * @return void.
   */
  AlignPopover(): void;
  
  /**
   * This method closes any currently displayed popover.
   * 
   * @return void.
   */
  ClosePopover(): void;

  /**
   * This method takes a color in hex or rgb and returns an object with two methods: `toHex()` and `toRGB()`. You can use these to get the color in either format. It requires the new keyword.
   * 
   * @param color A color in hex or rgb.
   * @return object A color object with conversion methods: toHex() and toRGB().
   */
  ChuiColor(color: string): {
    /**
     * This method converts the object's color to hex format.
     * 
     * @return string A string of hex color value.
     */
    toHex(): string;

    /**
     * This method converts the object's color to rgb format.
     * 
     * @return string A string of rba color value.
     */
    toRGB(): string;
  };

  /**
   * This method returns a number indicating the luminance of the color based on the YIQ color model. This is used for determining the legibility of text over a background color.
   * 
   * @param color A color object created by $.ChuiColor().
   * @return number The brightness value.
   */
  getBrightness(color): number;

  /**
   * This method lightness a color by the percentage provided. The percentage value is a plain number with the percentage symbol.
   * 
   * @param color A string of hex or rbg color value.
   * @param percenage A number for the percent to light the color.
   * @return string A string defining the lightened color.
   */
  lightenColor(color, percent);

  /**
   * This method darkens a color by the percentage provided. The percentage value is a plain number without the percentage symbol.
   * 
   * @param color A string of hex or rbg color value.
   * @param percentage A number for the percent to light the color. 
   * @return string A string defining the darkened color.
   */
  darkenColor(color, percent);

  /**
   * This method calculates the brightness of a color. It can take a string of hex or rgb value, as well as a $.ChuiColor object.
   * 
   * @param color Either a string of hex or rgb value or a $.ChuiColor object.
   * @return number The brightness value.
   */
  calculateBrightness(color);
}
interface ChocolateChipJS {
  
  /**
   * When executed on a popup, this method wil display it.
   * 
   * @return void.
   */
  ShowPopup(): void;
  
  /**
   * When executed on a popup, this method will close it.
   * 
   * @return void.
   */
  ClosePopup(): void;
  
  /**
   * This method will center any element it is execute on inside its parent container.
   * 
   * @return void.
   */
  Center(position?: string): void;
  
  /**
   * This method lets you create a busy widget. This varies in shape and animation type depending on the operating system. You can provide a size and color and whether it should be absolutely positioned or not.
   * 
   * @param An object of options: size, color, position.
   * @return void.
   */
  Busy(options: {
    size?: number;
    color?: string;
    position?: boolean;
  }): void;
}

/**
 * The tabbar interface.
 * 
 * @param An object of options: id, labels, icons, selected, showIcons, screens.
 * @return And object with these methods: getSelectedTab(), getSelectedScreen() and setSelectedTab(position).
 */
interface Tabbar {
  (options: {
    id?: string;
    labels: string[];
    icons?: string[];
    selected?: number;
    showIcons?: boolean;
    screens?: any[];
  }): Tabbar;
  
  /**
   * This method lets you get the currently selected tab. This is a zero-based number.
   * 
   * @return The selected tab.
   */
  getSelectedTab(): ChocolateChipJS;
  
  /**
   * Get the screen for the currently selected tab. This returns the screen's id.
   * 
   * @return The selected screen.
   */
  getSelectedScreen(): ChocolateChipJS;
  
  /**
   * Set a tab as current. Doing so will also display its corresponding screen.
   * 
   * @param position The zero-based position to set as the selected tab.
   * @return void.
   */
  setSelectedTab(position: number): void;
}
/**
 * Array extras.
 */
interface Array<T> {

  /**
    * Returns the value of the first element in the array where predicate is true, otherwise undefined.
    * @param predicate A function to execute to find a match. If found, it returns the match.
    * @return The match found by the predicate.
    */
  find(predicate: Function): number | undefined;

  /**
   * Returns the index of the match achieved by the provided predicate. If no match, it returns -1.
   * 
   * @param predicate A function to find the index of a match.
   * @return The index of a match, otherwise -1.
   */
  findIndex(predicate: Function): number;

  /**
   * Returns an array of values of the provided property.
   * 
   * @param property A property whose values will be returned.
   * @return An array of values for the property.
   */
  pluck(property: string): any[];

  /**
   * This method lets you compare an array with another and return the difference. It returns an array of values not found in the second array.
   * 
   * @param array An array to compare with.
   * @return array An array of values in the second array not found in the first.
   */
  difference(array: any[]): any[];

  /**
   * This method lets you get an array of all match values between the array and a second passed as its argument.
   * 
   * @param array An array to compare with the first.
   * @return array An array of all matches between the two arrays.
   */
  intersection(array: any[]): any[];

  /**
   * This method lets you mixin one array into another. Any matching values will not be replaced.
   * 
   * @param array An array to mixin.
   * @return void.
   */
  mixin(array: any[]): void;

  /**
   * This method allows you to remove all duplicates from an array.
   * 
   * @return void.
   */
  unique(): void;
}
/**
 * Ambient declarations:
 */
declare var DOMStack: any;
declare var ChocolateChipJS: ChocolateChipStatic;
declare var $: ChocolateChipStatic;
declare var fetch: fetch;
