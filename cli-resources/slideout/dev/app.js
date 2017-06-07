import {docs} from './data/docs'
import {favorites} from './data/favorites'
import {music} from './data/music'
import {recipes} from './data/recipes'
import {templates} from './templates/templates'
import {Router} from './src/widgets/ui-router'
import {UISlideOut} from './src/widgets/ui-slideout'

$(() => {
  // console.dir(Router)

  /**
   * Define initial state of View:
   */
  const listComponent = new Component({
    element: "#myList",
    render: templates.music
  })
  listComponent.render(music)

  /**
   * Setup Slide Out:
   */
  const AppSlideOut = new UISlideOut()

  /**
   * Notice names have `:` to indicate id for routing.
   * Id will be used to render view.
   */
  AppSlideOut.populate([
    { "choice:music": "Music" },
    { "choice:documents": "Documents"},
    { "choice:recipes": "Recipes" },
    { "choice:favorites": "Favorites" }
  ])

  /**
   * Define Routes:
   */
  var appRoutes = new Router()
  /**
   * Define routes to handle ids from slide out menu items:
   */
  window.appRoutes = appRoutes
  appRoutes.addRoute([
    {
      /**
       * The route:
       */
      route: "choice",
      /**
       * Callback to handle passed id:
       */
      callback: id => {
        /**
         * Method to render templates in switch statement:
         */
        const renderChosenTemplate = (template, data) => {
          listComponent.setTemplate(template)
          listComponent.render(data)
        }
        /**
         * Handle passed id:
         */
        switch (id) {
          case "music":
            renderChosenTemplate(templates.music, music)
            break
          case "documents":
            renderChosenTemplate(templates.docs, docs)
            break
          case "recipes":
            renderChosenTemplate(templates.recipes, recipes)
            break
          case "favorites":
            renderChosenTemplate(templates.favorites, favorites)
            break
        }
      }
    }
  ])
})
