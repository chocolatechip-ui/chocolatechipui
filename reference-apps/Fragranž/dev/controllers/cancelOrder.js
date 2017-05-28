import {cartState} from '../data/cartState'
import * as app from '../components/components'

export function cancelOrder() {
  $('#cancelOrder').on('tap', () => {
    cartState.purge()
    app.totalItemsComponents.empty()
    app.totalCostComponents.empty()
    app.cartComponents.empty()
    $.GoBackTo('main')
  })
}
