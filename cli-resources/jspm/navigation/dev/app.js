import {luminaries} from './data/luminaries';
import {VIPView} from './views/VIPView';
import {chosenPersonView} from './views/chosenPersonView';
$(() => {

  /**
   * Reset the view's element.
   * Cannot get element when imported, because this happens before DOM ready.
   */
  VIPView.setElement("#arrayTemplate1");
  VIPView.setData(luminaries);
  chosenPersonView.setElement("#chosenPersonList");

  /**
   * Render views:
   */
  VIPView.render();

  /**
   * Setup Router:
   */
  const router = $.Router();


  /**
   * Define Routes:
   */
  router.addRoute([
    {
      /**
       * Route for detail screen:
       */
      route: "detail",

      /**
       * Capture id in callback:
       */
      callback: id => {
        /**
         * Filter model with id passed in route:
         */
        const whichPerson = luminaries.filter(person => person.guid === id)[0];
        /**
         * Output chosen peron's name:
         */
        $("#chosenPerson").text("Welcome, " + whichPerson.firstName + ".");
        chosenPersonView.render(whichPerson);
      }
    }
  ]);
});