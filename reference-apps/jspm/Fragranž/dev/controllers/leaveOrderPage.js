import * as app from '../views/views';

export function leaveOrderPage() {
  $('#backToCart').on('tap', () => {
    cartModel.purge();
    app.totalItemsView.empty();
    app.totalCostView.empty();
    app.cartView.empty();
  });
}