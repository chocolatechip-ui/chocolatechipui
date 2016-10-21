import {searchParameters} from './searchParameters';

export function searchPanelControlsSetup() {

  // Initialize segemented control behavior:
  $.Segmented({
    element: '#typeSegmented',
    selected: 0, 
    callback: function() {
      searchParameters.type = $(this).text();
    }
  });

  $.Segmented({
    element: '#varietySegmented',
    selected: 1, 
    callback: function() {
      searchParameters.body = $(this).text();
    }
  });

  $('#search').on('tap', function() {
    $.ShowSheet('#searchSheet');
  });
  // Hide search sheet when user taps Cancel:
  //=========================================
  $('#searchSheet').on('tap', '#cancelSearch', function() {
    $.HideSheet('#searchSheet');
    // Turn off window resize for price range input:
    window.onresize = null;
  });
  // Show initial value of price range input:
  //=========================================
  $('#priceRangeOutput > span').html('20');

  // Handle user interaction with price range input.
  $('#priceRangeInput').on('input', function() {
    searchParameters.price = this.value;
    $('#priceRangeOutput').text(this.value);
  });
}