import '../../src/sheets';
import * as app from '../../views/views';
import {wines} from '../../../data/californiaWines';
import {searchParameters} from './searchParameters';
import {showChosenSearchParameters} from './showChosenSearchParameters';

export function handleWineSearch() {
  /**
   * Event listener to search for wines:
   */
  $('#searchSheet').on('tap', '#startSearch', function() {
    
    /**
     * Filter wines based on user choices.
     * These are stored on searchParameters object:
     */
    var filteredWines = wines.filter(function(wine) {
      return wine.type === searchParameters.type && wine.body === searchParameters.body && parseInt(wine.price.split('$')[1],10) <= searchParameters.price;
    });

    /**
     * Close the search sheet:
     */
    $.HideSheet('#searchSheet');

    /**
     * Turn off window resize for price range input:
     */
    window.onresize = null;

    /**
     * Handle no match with chosen parameters:
     */
    if (filteredWines.length === 0) {
      $.GoToScreen('noMatch');
      /**
       * Show search parameters:
       */
      showChosenSearchParameters($('#searchParameters-no-match'), searchParameters);
    } else {
      /**
       * Go to wine list and show results:
       */
      $.GoToScreen('wineList');      

      /**
       * Show search parameters:
       */
      showChosenSearchParameters($('#searchParameters'), searchParameters);
      app.filteredWinesView.render(filteredWines);
    }
  });
}