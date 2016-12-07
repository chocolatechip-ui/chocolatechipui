import {selectedWineView} from '../views/views';
import {wines} from '../../data/californiaWines';
import {outputHeroImg} from '../controllers/heroImage/outputHeroImg';

export const wineRoute = $.Router();

/**
 * Define handlers to show select 
 * wines from scroll panel:
 */
wineRoute.addRoute([
  {
    route: 'selectedWine',
    callback: function(param) {
      var selectedWine = wines.filter(function(wine) {
        return wine.id === param;
      })[0];
      $('#selectWineType').text(selectedWine.type);
      $('#selectedWineVarietal').text(selectedWine.varietal);
      selectedWineView.render(selectedWine);
      outputHeroImg();
      $('#viewWinery').attr('data-location', selectedWine.location);
    }
  }
]);