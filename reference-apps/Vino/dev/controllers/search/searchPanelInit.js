export function searchPanelInit() {
  var searchPanel = `
    <h2>Type</h2>
    <ul class='list'>
      <li>
        <div id='typeSegmented' class='horizontal centered'></div>
      </li>
    </ul>

    <h2>Body</h2>
    <ul class='list'>
      <li>
        <div id='varietySegmented' class='horizontal centered'></div>
      </li>
    </ul>

    <h2 id='chosePriceLabel'>Price: <label id='priceRangeOutput'>$20.00</label></h2>
    <ul class='list'>
      <li>
        <div id='pricePanel' class='horizontal centered'>
          <input type='range' name='priceRangeInput' id='priceRangeInput' step='20' value='20' min='20' max='100' style='background-size: -1px 10px;'>
        </div>
      </li>
    </ul>`

  var searchNavBar = `
    <nav id='searchNav'>
      <button id='cancelSearch'>Cancel</button>
      <h1 style='width: 120px;'>Find Wine</h1>
      <button id='startSearch'>Search</button>
    </nav>`

  var assembleSearchSheet = () => $('#searchSheet section').append(searchNavBar + searchPanel)

  var searchParameteresTemplate = `
    <span class='parameters type'></span>
    <span class='parameters body'></span>
    <span class='parameters price'></span>`

  $('#searchParameters').append(searchParameteresTemplate)

  $('#searchParameters-no-match').append(searchParameteresTemplate)

  assembleSearchSheet()
}
