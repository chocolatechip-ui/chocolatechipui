import '../../src/sheets';
export function searchPanelInit() {

  //==========================
  // Define methods for search
  //==========================
  var searchPanel = `<h2>Type</h2>
  <ul class='list'>
    <li>
      <div id='typeSegmentedPanel' class='horizontal centered'><div class='segmented' id='typeSegmented'><button role='radio' '='' aria-checked='true' class='selected'>Red</button><button role='radio' '=''>White</button><button role='radio' '=''>Sparkling</button><button role='radio' '=''>Dessert</button></div></div>
    </li>
  </ul>

  <h2>Body</h2>
  <ul class='list'>
    <li>
      <div id='varietySegmentedPanel' class='horizontal centered'><div class='segmented' id='varietySegmented'><button role='radio' '=''>Light</button><button role='radio' '='' aria-checked='true' class='selected'>Medium</button><button role='radio' '=''>Heavy</button></div></div>
    </li>
  </ul>

  <h2 id='chosePriceLabel'>Price: <label id='priceRangeOutput'>20.00</label></h2>
  <ul class='list'>
    <li>
      <div id='pricePanel' class='horizontal centered'>
        <input type='range' name='priceRangeInput' id='priceRangeInput' step='20' value='20' min='20' max='100' style='background-size: -1px 10px;'>
      </div>
    </li>
  </ul>`;

  var searchNavBar = `<nav id='searchNav'>
    <button id='cancelSearch'>Cancel</button>
    <h1 style='width: 120px;'>Find Wine</h1>
    <button id='startSearch'>Search</button>
  </nav>`;

  var assembleSearchSheet = function () {
    $('#searchSheet section').html(searchNavBar + searchPanel);
  };

  var searchParameteresTemplate = `<span class='parameters type'>{{type}}</span>
  <span class='parameters body'>{{body}}</span>
  <span class='parameters price'>{=price}</span>`;

  $('#searchParameters').html(searchParameteresTemplate);
  
  $('#searchParameters-no-match').html(searchParameteresTemplate);

  $.Sheet({id:'searchSheet'});
  assembleSearchSheet();
}