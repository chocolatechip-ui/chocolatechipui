import {luminaries} from './data/luminaries'
import {VIPComponent} from './components/VIPComponent'
import {chosenPersonComponent} from './components/chosenPersonComponent'
import {Router} from './src/widgets/ui-router'
import {UINavigation} from './src/widgets/ui-navigation'

app(() => {

  /**
   * Because the components are imported, we need to mount them so that they can find their target elements:
   */
  VIPComponent.mount()
  chosenPersonComponent.mount()

  /**
   * Render Components:
   */
  VIPComponent.render(luminaries)

  /**
   * Setup Router:
   */
  const router = new Router()


  /**
   * Define Routes:
   */
  router.addRoute({
    route: "detail",

    /**
     * Capture id in callback:
     */
    callback: id => {
      /**
       * Filter data with id passed in route:
       */
      const whichPerson = luminaries.filter(person => person.uuid === id)[0]
      /**
       * Output chosen peron's name:
       */
      $("#chosenPerson").text("Welcome, " + whichPerson.firstName + ".")
      chosenPersonComponent.render(whichPerson)
    }
  })
})
