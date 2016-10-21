export function handleAboutSheet() {
  // Setup up About info sheet:
  //===========================
  var aboutApp = $('#aboutThisAppTemplate').html();
  $.Sheet({
    id: 'aboutSheet',
    handle: true,
    slideDown: true
  });
  
  // Register event to show sheet:
  $('#aboutSheet').find('section').html(aboutApp);

  // Open About sheet:
  $('#aboutThisApp').on('tap', () => $.ShowSheet('#aboutSheet'));

  // Close About sheet:
  $('#aboutSheet').find('button').on('tap', () => $.HideSheet('#aboutSheet'));
}