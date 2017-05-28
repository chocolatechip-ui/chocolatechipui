import {UISheet} from '../../src/widgets/ui-sheet'
export function aboutSheet() {
  /**
   * Setup up About info sheet:
   */
  var aboutContent = `<h2>California Wines</h2>
    <p>This is an app about wines of Northern California. We built it with TruckJS using views, routing, layouts and widgets. It's using the iOS theme and should render reasonably on most browsers.</p>
    <ul>
    <li><a target="_blank" href="http://truckjs.io">TruckJS</a></li>
    </ul>
    <h3>Team</h3>
    <ul>
    <li>Robert Biggs - Chief Architect</li>
    <li>Piotr Gajos - UX and Design Direction</li>
    <li>Josh Rutherford - Graphic Assets</li>
    <li>Bader Alabdulrazzaq - Apple Maps Integration</li>
    </ul>
    <h4>Disclaimer</h4>
    <p>We do not condone unresponsible alcohol consumption. If you do drink wine, please do so responsibly and keep yourself and those around you safe.</p>`
  const sheet = new UISheet({
    id: 'aboutSheet',
    handle: true,
    slideDown: true
  })
  $('#aboutSheet').find('section').append(aboutContent)

  /**
   * Define handler to show about sheet
   * when use taps the info icon button:
   */
  $('#getInfo').on('tap', () => sheet.show())

}
