import * as app from '../../components/components'
import {wines} from '../../../data/californiaWines'
import {searchParameters} from './searchParameters'
import {showChosenSearchParameters} from './showChosenSearchParameters'
import {purchaseSheet} from '../purchase//handlePurchase'
import {searchPanel} from './searchPanelControlsSetup'

export function handleWineSearch() {
  /**
   * Event listener to search for wines:
   */
  $('#searchSheet').on('tap', '#startSearch', function() {

    /**
     * Filter wines based on user choices.
     * These are stored on searchParameters object:
     */
    var filteredWines = wines.filter((wine) => wine.type === searchParameters.type && wine.body === searchParameters.body && parseInt(wine.price.split('$')[1],10) <= searchParameters.price)

    /**
     * Turn off window resize for price range input:
     */
    window.onresize = null

    /**
     * Handle no match with chosen parameters:
     */
    searchPanel.hide()
    if (filteredWines.length === 0) {
      $.GoTo('noMatch')
      /**
       * Show search parameters:
       */
      showChosenSearchParameters($('#searchParameters-no-match'), searchParameters)
    } else {
      /**
       * Go to wine list and show results:
       */
      $.GoTo('wineList')

      /**
       * Show search parameters:
       */
      showChosenSearchParameters($('#searchParameters'), searchParameters)
      app.filteredWinesComponent.render(filteredWines)
    }
  })
}
