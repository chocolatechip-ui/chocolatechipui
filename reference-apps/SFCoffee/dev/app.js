import {Router} from './src/widgets/ui-router'
import {UINavigation} from './src/widgets/ui-navigation'
import {coffeeshops} from './data/coffee-shops'
import {shopsComponents} from './components/shopsComponents'
import {shopDetailComponents} from './components/shopDetailComponents'
import {selectedCoffeeRoute} from './route/router'
import {getCoffeShops} from './controllers/getCoffeShops'
import {handleAboutSheet} from './controllers/handleAboutSheet'
$(() => {

  /**
   * Mount imported components:
   */
  shopsComponents.mount()
  shopDetailComponents.mount()

  /**
   * Render coffeeshops list:
   */
	shopsComponents.render(coffeeshops)

  /**
   * Run controllers:
   */
  getCoffeShops()
  handleAboutSheet()

})
