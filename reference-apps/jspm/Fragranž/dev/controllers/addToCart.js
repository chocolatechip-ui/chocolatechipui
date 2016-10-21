import {cartModel} from '../data/cartModel';
import * as app from '../views/views';

export function addToCart() {
    $('#addToCart').on('tap', function() {
    const fragrance = $(this).data('fragrance');
    cartModel.push(fragrance);
    $.GoToScreen('cart');
    cartModel.orderBy('genre', 'product_title')
    app.cartView.render();
    const prices = cartModel.pluck('wholesale_price');
    let sum = 0;
    prices.map(price => sum += parseFloat(price));
    app.totalItemsView.render([cartModel.size()]);
    app.totalCostView.render([$.currency(sum)]);
    app.totalPurchaseCostView.render([$.currency(sum)]);
    $('#backToFragrance').find('span').text(fragrance.product_title);
  });
}