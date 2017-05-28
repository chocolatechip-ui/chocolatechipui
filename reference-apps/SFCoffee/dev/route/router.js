import {Router} from '../src/widgets/ui-router'
import {coffeeshops} from '../data/coffee-shops'
import {shopDetailComponents} from '../components/shopDetailComponents'

/**
 * Set up router:
 */
export const selectedCoffeeRoute = new Router()
selectedCoffeeRoute.addRoute({
  route: 'coffeeShopDetail',
  callback(param) {
    const selectedShop = coffeeshops.filter((shop) => {
      return shop.id === param
    })[0]
    shopDetailComponents.render(selectedShop)
  }
})
