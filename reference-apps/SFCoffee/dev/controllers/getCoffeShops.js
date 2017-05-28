export function getCoffeShops() {
  /**
   * Event handler to get to list of shops:
   */
  $('#exploreButton').on('tap', function() {
      $.GoTo('shops')
  })
}
