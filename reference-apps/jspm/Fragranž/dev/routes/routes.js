import {fragrances} from '../data/fragrances';
import * as app from '../views/views';
export const fragranzRoutes = $.Router();

// Variable for all routes:
let chosenGenre;

// Define routes:
fragranzRoutes.addRoute([
  {
    route: 'fragranceList',
    callback(genre) {
      chosenGenre = [];
      fragrances.forEach(fragrance => {
        if (fragrance.genre === genre) {
          chosenGenre.push(fragrance)
        }
      });
      app.availableFragrancesView.render(chosenGenre);
      app.fragrancesGenreTitleView.render([genre]);
      $('#backToGenre span').text(genre);
    }
  },
  {
    route: 'detail',
    callback(sku) {
      const chosenFragrance = chosenGenre.filter(fragrance => {
        return fragrance.sku === sku;
      });
      app.fragranceDetailView.render(chosenFragrance);
      app.detailTitleView.render([chosenFragrance[0].product_title])
      $('#addToCart').data('fragrance', chosenFragrance[0]);
    }
  }
]);