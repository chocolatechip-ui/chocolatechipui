Running these examples
=====================

By default these examples are using the iOS theme. You can change the theme by changing the reference to the stylesheet the example uses. Possible choices are:

  1. chui-ios.css
  2. chui-ios.css
  3. chui-windows.css

You can run these examples on the following desktop browsers for testing:

  Mac: Safari, Chrome
  Windows: IE10, IE11, MSEdge, Chrome

There are a couple of things to note about running themes in these browsers. The windows theme uses Microsoft features for the busy and range input. Non Microsoft browsers will not show these properly.
Sheets for Android and iOS use CSS filters to blur the background. These are not supported on IE or MSEdge.

To get the best approximation of what iOS will look like, it is best to view the iOS theme in Safari. If you are on Windows, Chrome will do, but it may ont be 100% accurate. If you are testing the Android theme, use Chrome on Mac or Windows. For testing the Windows theme IE 11 or MS Edge are recommended.

Other than that, your layouts should render fairly accurately in any browser, even Firefox.

The folder `fetch` has examples of using the Fetch API for remote data access. The examples are using PHP and so they require a server running PHP. We use MAMP for this, putting the folder in a PHP htdocs directory. 