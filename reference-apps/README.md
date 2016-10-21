# Reference Apps for ChocolateChip-UI 4.x


This is a set of four apps built with ChocolateChip-UI. They use views, routing, gestures, and widgets to create a native-like experience on mobile devices.

###Basic
There are actually two version of each app, one in the `basic` folder and another in the `jspm` folder. The basic folder has double-clickable single page apps - no server required. These are so you can open them in the browser and see how to use ChocolateChip-UI to build mobile web apps.

###JSPM - ES6
In the jspm folder are the same apps, but redone using ES6 features and modules. These require a build step using gulp. The build process takes all the ES6 modules, transpiles them to ES5 and combines them into one bundle. Then it launches the app in a browser for you. It also watches the source files so that if you edit and save, it will reload the app in the browser.

The jspm folder is the best example of how to build real world apps with ChocolateChip-UI. Open an app's folder and go staight to the `dev` folder. There you will find the app.js file. This is the core of your ChocolateChip-UI app. The `app.js` file show how to use ES6 imports to create modular patterns to make your app for manageable. You will also find other files or folder with files. These are ES6 modules that the `app.js` file imports to initialize the app.

####Running the Apps

The apps in the basic folder are double-clickable and should run from the desktop without problem. They were designed to work that way so you could see how we wrote code and used widgets and even customized widgets to create a unique experience for each app.

To run the apps in the jspm folder, open your terminal and `cd` to an app's folder. Then run:

```
npm i
```

When this is done, run:

```
jspm i
```

When this is done, run:

```
gulp
```

This will build the app and open it in a browser.

###The Apps

Both folders have versions of the following apps:

1. Fragranž - A simple app to explore colognes and fragrances for men, women and children.

2. SFCoffee - A simple app to expore specialty coffeeshops in San Francisco.

3. TodoMVC - A version of the famous TodoMVC project with a twist. We completely redesigned it as a mobile app. The original project is a typical desktop todo app. This is designed to feel like a mobile todo app.

4. Vino - This app lets you explore the wines of Northern California's wine country. The data is real. 