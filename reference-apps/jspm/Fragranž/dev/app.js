import {fragrances} from './data/fragrances';
import {cartModel} from './data/cartModel';
import * as app from './views/views';
import {fragranzRoutes} from './routes/routes';
import {addToCart} from './controllers/addToCart';
import {goToCart} from './controllers/goToCart';
import {cancelOrder} from './controllers/cancelOrder';
import {placeOrder} from './controllers/placeOrder';
import {leaveOrderPage} from './controllers/leaveOrderPage';
import {emptyCartWarning} from './controllers/emptyCartWarning';


$(() => {

  /**
   * Mount imported views:
   */
  app.fragranceGenresView.mount();
  app.availableFragrancesView.mount();
  app.fragrancesGenreTitleView.mount();
  app.fragranceDetailView.mount();
  app.detailTitleView.mount();
  app.cartView.mount();
  app.totalItemsView.mount();
  app.totalCostView.mount();
  app.totalPurchasedItemsView.mount();
  app.totalPurchaseCostView.mount();

  /**
   * Set model on these views:
   */
  app.cartView.bindModel(cartModel);
  app.totalPurchasedItemsView.bindModel(cartModel)

  /**
   * Render list view with default data:
   */
  app.fragranceGenresView.render(['ladies','men','kids']);

  /**
   * Mount imported routes:
   */
  fragranzRoutes.mount();

  /**
   * Initialize imported controllers:
   */
  addToCart();
  goToCart();
  cancelOrder();
  placeOrder();
  leaveOrderPage();
  emptyCartWarning();

});