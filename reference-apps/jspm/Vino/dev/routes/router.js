import * as app from '../views/views';
import {wines} from '../../data/californiaWines';
import {outputHeroImg} from '../controllers/heroImage/outputHeroImg';

export const wineRoute = $.Router();

//================================
// Define handlers to show select 
// wines from scroll panel:
//================================
wineRoute.addRoute([
  {
    route: 'selectedWine',
    callback: function(id) {
      var selectedWine = wines.filter(function(wine) {
        return wine.id === id;
      })[0];
      $('#selectWineType').text(selectedWine.type);
      $('#selectedWineVarietal').text(selectedWine.varietal);
      app.selectedWineView.render(selectedWine);
      outputHeroImg();
      $('#viewWinery').attr('data-location', selectedWine.location);
    }
  }
]);