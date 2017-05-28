import {cartState} from '../data/cartState'
import {popup} from './popup'

export function goToCart() {
  $('#shoppingCart').on('tap', () => {
    if (!cartState.size() > 0) {
      popup.open()
    } else {
      $.GoTo('cart')
    }
  })
}
