import {coffeeshops} from '../data/coffee-shops';
import {shopDetailView} from '../views/shopDetailView';

// Set up router:
export const selectedCoffeeRoute = $.Router();
selectedCoffeeRoute.addRoute([
  {
    route: 'coffeeShopDetail',
    callback(id) {
      const selectedShop = coffeeshops.filter(shop => {
        return shop.id === id;
      })[0];
      shopDetailView.render(selectedShop);
    }
  }
]);