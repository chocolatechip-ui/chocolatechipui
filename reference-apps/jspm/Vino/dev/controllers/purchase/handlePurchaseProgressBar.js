export function handlePurchaseProgressBar() {
  // Define method for purchase process.
  // This will animate the progress bar:
  //====================================
  let pval = 0;
  let progressInterval;
  const processProgress = function() {
    if (pval === 500) {
      // Make sure we are starting clean:
      clearInterval(progressInterval);

      // Hide the progress panel:
      $('#progressPanel').hide();

      // Show the confirmation panel:
      $('#confirmationPanel').css('display', 'block');
      if ($('body').hasClass('isDesktop')) {
        $('#purchaseSheet').css('height', '140px');
      } else {
        $('#purchaseSheet').css('height', '180px');
      }

      // Set inital value for progress animation:
      pval = 0;
    } else {

      $('#progressPanel').show();
      $('#purchaseSheet').css('height', '80px');
      // Increate the value for animation:
      pval++;

      // Update the progress bar with new value:
      $('progress').val(pval);
    }
  };

  // Init Popup before purchase:
  $.Popup({
    id: "purchasePopup",
    message: 'Do you want to purchase wine?', 
    cancelButton: 'Cancel',
    continueButton: 'Purchase',
    callback: function() {
      $('#confirmationPanel').hide();
      setTimeout(function() {
        $('#progressPanel').show();
        $.ShowSheet('#purchaseSheet');
        progressInterval = setInterval(processProgress, 0);
      });
    }
  });
}