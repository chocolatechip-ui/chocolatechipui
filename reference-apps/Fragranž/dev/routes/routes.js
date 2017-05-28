import {Router} from '../src/widgets/ui-router'
import {fragrances} from '../data/fragrances'
import * as app from '../components/components'
export const routes = new Router()

/**
 * Variable for all routes:
 */
let chosenGenre

/**
 * Define routes:
 */
routes.addRoute({
  route: 'fragranceList',
  callback(genre) {
    chosenGenre = []
    fragrances.forEach((fragrance) => {
      if (fragrance.genre === genre) {
        chosenGenre.push(fragrance)
      }
    })
    app.availableFragrancesComponents.render(chosenGenre)
    app.fragrancesGenreTitleComponents.render([genre])
    $('#backToGenre span').text(genre)
  }
},
{
  route: 'detail',
  callback(sku) {
    const chosenFragrance = chosenGenre.filter((fragrance) => {
      return fragrance.sku === sku
    })
    app.fragranceDetailComponents.render(chosenFragrance)
    app.detailTitleComponents.render([chosenFragrance[0].product_title])
    document.querySelector('#addToCart').dataset.fragrance = JSON.stringify(chosenFragrance[0])
  }
})
