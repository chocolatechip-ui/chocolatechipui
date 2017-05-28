import {UISheet} from '../../src/widgets/ui-sheet';
import {handlePurchaseProgressBar} from './handlePurchaseProgressBar';
import {purchasePopup} from './handlePurchaseProgressBar'

export let purchaseSheet

/**
 * Setup purchase sheet.
 */
export const setupPurchaseSheet = () => {
  purchaseSheet = new UISheet({
    id: 'purchaseSheet',
    handle: false
  })
}

export function handlePurchase() {
  /**
   * Get purchase sheet render:
   */
  const purchaseSheetTemplate = `<div id='progressPanel'>
    <p>
      <progress max='500' value='0'></progress>
      <h2>Processing...</h2>
    </div>
    <div id='confirmationPanel'>
      <h2>Purchase Complete</h2>
      <p>Thanks for buying. Oh wait, this is just a stub. You'll need to use whatever e-commerce solution suits your purpose.
      </p>
      <button class='action centered'>OK</button>
    </div>
  </div>`;

  /**
   * Populate purchase sheet
   */
  $('#purchaseSheet').find('section').append(purchaseSheetTemplate);
  $('#selectedWine').on('tap', '.price', function(e) {
    const wine = $('#selectedWineVarietal').text().trim();
    const price = $(this).text().trim();
    handlePurchaseProgressBar()
    $('#purchasePopup').find('.panel p').text('Do you want to purchase ' + wine + ' for ' + price + '?');
    // $.delay(200).then(function() {
    document.querySelector('#purchasePopup').classList.add('opened')
    // });
  });

  /**
   * Define handler to display purchase sheet:
   */
  $('#confirmationPanel button').on('tap', function() {
    purchaseSheet.hide()
    $('#confirmationPanel').hide();
    $('#purchaseSheet').css('height', 80);
  });
}
