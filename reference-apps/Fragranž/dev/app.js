import {Router} from './src/widgets/ui-router'
import {UINavigation} from './src/widgets/ui-navigation'
import {fragrances} from './data/fragrances'
import {cartState} from './data/cartState'
import * as app from './components/components'
import {fragranzRoutes} from './routes/routes'
import {addToCart} from './controllers/addToCart'
import {goToCart} from './controllers/goToCart'
import {cancelOrder} from './controllers/cancelOrder'
import {placeOrder} from './controllers/placeOrder'
import {leaveOrderPage} from './controllers/leaveOrderPage'
import {uipopup} from './controllers/popup'


$(() => {

  /**
   * Mount imported views:
   */
  app.fragranceGenresComponents.mount()
  app.availableFragrancesComponents.mount()
  app.fragrancesGenreTitleComponents.mount()
  app.fragranceDetailComponents.mount()
  app.detailTitleComponents.mount()
  app.cartComponents.mount()
  app.totalItemsComponents.mount()
  app.totalCostComponents.mount()
  app.totalPurchasedItemsComponents.mount()
  app.totalPurchaseCostComponents.mount()
  app.confirmationNumberComponent.mount()

  /**
   * Set state for components:
   */
  app.cartComponents.setState(cartState)
  app.totalPurchasedItemsComponents.setState(cartState)

  /**
   * Render list component with default data:
   */
  app.fragranceGenresComponents.render(['ladies','men','kids'])

  /**
   * Run imported controllers:
   */
  addToCart()
  goToCart()
  cancelOrder()
  placeOrder()
  leaveOrderPage()

  /**
   * Create subscriber to output confirmation number:
   */
  $.subscribe('confirmation-number', (data) => {
    app.confirmationNumberComponent.render(data)
  })

})
