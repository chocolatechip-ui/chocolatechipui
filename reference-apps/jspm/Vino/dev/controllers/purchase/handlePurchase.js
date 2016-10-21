export function handlePurchase() {
  // Get purchase sheet template:
  var purchaseSheetTemplate = `<div id='progressPanel'>
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
  // Initialize purchase sheet:
  //===========================
  $.Sheet({id:'purchaseSheet'});
  
  // Populate purchase sheet
  $('#purchaseSheet').find('section').html(purchaseSheetTemplate);    
  $('#selectedWine').on('tap', '.price', function(e) {
    var wine = $('#selectedWineVarietal').text().trim();
    var price = $(this).text().trim();
    $('#purchasePopup').find('.panel p').text('Do you want to purchase ' + wine + ' for ' + price + '?');
    $('#purchasePopup').ShowPopup();
  });

  // Define handler to display purchase sheet:
  //==========================================
  $('#confirmationPanel button').on('tap', function() {
    $.HideSheet('#purchaseSheet');
    $('#confirmationPanel').hide();
    $('#purchaseSheet').css('height', 80);

    // Delay showing the progress bar so
    // it doesn't show while hiding the sheet:
    setTimeout(function() {
      $('#progressPanel').show();
    }, 200);
  });
}