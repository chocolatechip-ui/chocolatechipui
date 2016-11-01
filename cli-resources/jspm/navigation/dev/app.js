import {luminaries} from './data/luminaries';
import {VIPView} from './views/VIPView';
import {chosenPersonView} from './views/chosenPersonView';

$(() => {

  /**
   * Because the views are imported, we need to mount them so that they can find their target elements:
   */
  VIPView.mount();
  VIPView.setData(luminaries);
  chosenPersonView.mount();

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
        const whichPerson = luminaries.filter(person => person.uuid === id)[0];
        /**
         * Output chosen peron's name:
         */
        $("#chosenPerson").text("Welcome, " + whichPerson.firstName + ".");
        chosenPersonView.render(whichPerson);
      }
    }
  ]);
});