$(function() {
  /**
   * Array data:
   */
  var lums = [
    {guid: "N356f953-2c3c-4a72-b4e7-5955662ec80f", firstName: "Stephen", lastName: "Hawking", age: 20},
    {guid: "Ca0fe1ed-afd8-4c98-8110-e863820ab35f", firstName: "Albert", lastName: "Einstein", age: 31},
    {guid: "a51a1852-bcd1-44e3-9114-3c0c742b66f9", firstName: "Leonardo", lastName: "Da Vinci", age: 100},
    {guid: "k4657925-fdc3-45b0-8c12-6a31c4b83152", firstName: "Galileo", lastName: "Galilei", age: 40},
    {guid: "F3b2bd1f-346b-4970-a272-11124927a6e6", firstName: "Nicholas", lastName: "Copernicus", age: 32}
  ];

  /**
   * Create model:
   */
  var LumsModel = $.Model(lums, "luminaries-handle");
  
  /**
   * Call Garbage Collector:
   */
  lums = null;

  // Init views:
  //=============
  var App = {
    VIPView: $.View({
      element: "#arrayTemplate1", 
      model: LumsModel,
      startIndexFrom: 1,
      events: [{
        event: "tap",
        element: "li",
        callback: function() {
          console.log($(this).text());
        }
      }],
      template: "<li data-goto='detail:{= data.guid }'>\
        <h3>{= $.view.index }: {= data.firstName } {= data.lastName }</h3>\
        <aside>\
          <disclosure></disclosure>\
        </aside>\
      </li>"
    }),
    
    chosenPersonView: $.View({
      element: "#chosenPersonList",
      template: "<li>\
        <h3>First Name: {= data.firstName }</h3>\
      </li>\
      <li>\
        <h3>Last Name: {= data.lastName }</h3>\
      </li>"
    }),

    /**
     * Setup Router:
     */
    router: $.Router()

  };

  /**
   * Render views:
   */
  App.VIPView.render();


  /**
   * Define Routes:
   */
  App.router.addRoute([
    {
      /**
       * Route for detail screen:
       */
      route: "detail",

      /**
       * Capture id in callback:
       */
      callback: function(id) {
        /**
         * Filter model with id passed in route:
         */
        var whichPerson = LumsModel.filter(function(person) {
          return person.guid === id;
        })[0];
        /**
         * Output peron"s name:
         */
        $("#chosenPerson").text("Welcome, " + whichPerson.firstName + ".");
        /**
         * Output full route:
         */
        $(".fullRoute").text($.TruckRoutes.getFullRoute());
        App.chosenPersonView.empty();
        App.chosenPersonView.render(whichPerson);
      }
    }
  ]);
});