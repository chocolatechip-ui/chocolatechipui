import {cartModel} from '../data/cartModel';
import '../src/popup';

export function goToCart() {
  $('#shoppingCart').on('tap', () => {
    if (!cartModel.size() > 0) {
      /**
       * Popup for empty cart:
       */
      $.Popup({
        id: "emptyCart",
        title: 'Warning!', 
        message: 'There is nothing in the cart. Please add some items first.', 
        continueButton: 'OK'
      });
      $.delay(200).then(function() {
        $('#emptyCart').ShowPopup();
      });
    } else {
      $.GoToScreen('cart');
    }
  });
}