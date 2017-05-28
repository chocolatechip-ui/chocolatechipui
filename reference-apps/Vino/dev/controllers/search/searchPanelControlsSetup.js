import {UISheet} from '../../src/widgets/ui-sheet'
import {UISegmented} from '../../src/widgets/ui-segmented'
import {searchParameters} from './searchParameters'
import {searchPanelInit} from './searchPanelInit'

export let searchPanel
export const initSearchPanel = (() => {
  $(() => {
    searchPanel = new UISheet({
      id: 'searchSheet',
      handle: true,
      slideDown: true
    })
  })
})()
export function searchPanelControlsSetup() {

  // Initialize segemented control behavior:
  const typesSegmented = new UISegmented({
    element: '#typeSegmented',
    labels : ['Red', 'White', 'Sparkling', 'Dessert'],
    selected: 0,
    callback: function() {
      searchParameters.type = $(this).text()
    }
  })

  const varietySegmented = new UISegmented({
    element: '#varietySegmented',
    labels : ['Light', 'Medium', 'Heavy'],
    selected: 1,
    callback: function() {
      searchParameters.body = $(this).text()
    }
  })

  $('#search').on('tap', () => searchPanel.show())
  // Hide search sheet when user taps Cancel:
  //=========================================
  $('#searchSheet').on('tap', '#cancelSearch', () => {
    searchPanel.hide()
    // Turn off window resize for price range input:
    window.onresize = null
  })

  // Handle user interaction with price range input.
  $('#priceRangeInput').on('input', function() {
    searchParameters.price = this.value
    $('#priceRangeOutput').text('$' + this.value)
  })
}
