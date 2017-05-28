import {UISheet} from '../src/widgets/ui-sheet';
export function handleAboutSheet() {
  /**
   * Setup up About info sheet:
   */
  const aboutApp = `
		<div><button id='closeAboutSheet' class='action centered'>Close</button><br></div>
		<img id='brewing-image' src='./images/coffee-brewing.jpg'>
		<p>Everyone loves coffee, and geeks more so. This is a demonstration of using TruckJS to create a Web app for mobile devices abut coffeeshops in San Francisco. It's using the iOS theme with an extra stylesheet for customizing things.</p>`
  var sheet = new UISheet({
    id: 'aboutSheet',
    handle: true,
    slideDown: true
  });
  
  /**
   * Register event to show sheet:
   */
  $('#aboutSheet').find('section').append(aboutApp);

  /**
   * Open About sheet:
   */
  $('#aboutThisApp').on('tap', () => sheet.show());

  /**
   * Close About sheet:
   */
  $('#aboutSheet').find('button').on('tap', () => sheet.hide())
}