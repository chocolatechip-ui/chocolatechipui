import {cartModel} from '../data/cartModel';

export function goToCart() {
  $('#shoppingCart').on('tap', () => {
    if (!cartModel.size() > 0) {
      $('#emptyCart').ShowPopup();
    } else {
      $.GoToScreen('cart');
    }
  });
}