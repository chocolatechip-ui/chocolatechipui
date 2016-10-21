import {coffeeshops} from './data/coffee-shops';
import {shopsView} from './views/shopsView';
import {shopDetailView} from './views/shopDetailView';
import {selectedCoffeeRoute} from './route/router';
import {getCoffeShops} from './controllers/getCoffeShops';
import {handleAboutSheet} from './controllers/handleAboutSheet';
$(() => {

	// Init model:
	//============
	const shopsModel = $.Model(coffeeshops);

  // Mount imported views:
  //======================
  shopsView.mount();
  shopDetailView.mount();

  // Render coffeeshops list:
  //=========================
  shopsView.bindModel(shopsModel);
	shopsView.render();

  // Mount imported route:
  //======================
  selectedCoffeeRoute.mount();

  // Mount controllers:
  //===================
  getCoffeShops();
  handleAboutSheet();

});