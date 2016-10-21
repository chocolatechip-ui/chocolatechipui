import {cartModel} from '../data/cartModel';
import * as app from '../views/views';

export function cancelOrder() {
  $('#cancelOrder').on('tap', () => {
    cartModel.purge();
    app.totalItemsView.empty();
    app.totalCostView.empty();
    app.cartView.empty();
    $.GoBackToScreen('main');
  });
}