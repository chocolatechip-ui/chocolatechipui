# ChocolateChip-UI
[![npm version](https://badge.fury.io/js/chocolatechipui.svg)](https://badge.fury.io/js/chocolatechipui)

[![NPM](https://nodei.co/npm/chocolatechipui.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/chocolatechipui/)

- Make mobile web apps
- Get hard work done fast
- Use platform-specific themes

ChocolateChip-UI is a framework for making mobile web apps that mimic the native look and feel of the mobile device. It provides you with standard mobile layouts and widgets to get going. Its API is identical to jQuery so you'll feel comfortable right away. Nothing new to learn there. ChocolateChip-UI is designed to take advantage of ES6. In fact, the source code is written in ES6 and transpiled with Babel down to ES5. We love ES6, and especially ES6 modules. This is our future. Why wait? We use JSPM to let you use ES6 modules now to build your apps.

###Website
You can learn how to use ChocolateChip-UI at the website: [chocolatechip-ui.github.io](https://chocolatechip-ui.github.io).

###Getting Started

To get started, install our NPM module - [https://www.npmjs.com/package/chui](chui):

```js
npm i -g chui
```

##Examples

If you're new to ChocolateChip-UI and want to see samples, just run the following command:

```js
chui -e
```

This will output working examples of layouts and widgets to your desktop in a folder named `Chui Examples`. By default all examples are using the iOS theme. To see how they work for android, just change the stylesheet reference to Adroid:

```
Change
<link rel="stylesheet" href="../dist/css/chui-ios.min.css">

to:
<link rel="stylesheet" href="../dist/css/chui-android.min.css">
```

Reload the example and you'll see the Android theme in action. This includes the Android ripple effect when you tap interactive elements.

##Demos

Besides examples, you can also output four reference apps created with ChocolateChip-UI. These are great to see how their code is organized, and how their themes are widgets were customized for the needs to the app.

The four apps are: Fragranž, TodoMVC, SFCoffee an Vino. Frangranž shows how to present a variety of colognes and perfumes for browsing and purchase. TodoMVC is our take on the famous Github project. The original is based on the design of a Todo app for desktop. Since ChocolateChip-UI is about the mobile experience, we completely redid it for mobile. SFCoffee is what the name says, and exploration of some of the famous coffeeshops frequented by the Starup scene in San Francisco. Vino is an app showcasing wines from Northern California. Since these are demos, no purchases are processed. That for you to do.

To get these demos, run:

```shell
chui -r
```

This will output the reference apps to your desktop in a folder named `Chui Reference Apps`. These apps are in two folders: `basic` and `jspm`. The demos in `basic` are plain JavaScript. To launch them, just double click the `index.html` file in each demo.

For the `jspm` demos you need to install their dependencies. To run a demo, do the following:

```shell
npm i

# When done, run:
jspm i

# When done, run:
gulp
```
This will build and open the demo in your browser. To see how the `jspm` version of these demos are organized, open the `dev` folder. There you will find all the code organized as ES6 modules.


##Creating a New Project

When you're creating projects with the `chui` command line tool, you can choose whether you want to write plain JavaScript, or whether you want to work with ES6. Examples and projects created with plain JavaScript can be double clicked to launch in the browser. No server needed, unless you need to fetch data from somewhere. Ajax requests will require a server instance running. You can do this with [https://www.npmjs.com/package/http-server](http-server). Install the NPM module and then just run `http-server` on your folder.

##Plain JavaScript

To create projects, you use flags with the `chui` command. The most important flag is `-n` for your project's name:

```shell
chui -n myProject
```

If you fail to provide a name, `chui` will not create a project, simple as that.  Next you can indicate what platform you want to target: Android or iOS. To do this you use the `-o` flag with `android` or `ios`:

```shell
# For Android:
chui -n myProject -o android

# For iOS:
chui -n myProject -o ios
```

If no `-o` flag is provided, it will default to iOS:

```shell
# Create an iOS project (default):
chui -n myProject
```

###Four Types of Projects

You can create for types of projects to get your going quickly. You indicate the type of project you want with the `-t` flag. You can use the following values:

- basic
- navigation
- slideout
- tabbar

Basic is exactly that. Nothing there but a basic view. This is the best choice when you already know what you want to build and don't want anything in your way.

Navigation gives you a basic navigation list with routing. You can update the list values and routes as needed.

Slideout gives you a basic slideout menu app. Instead of a navigation list, this uses the slideout as the primary means of navigating the app.


Tabbar gives you a app that uses a tabbar for navigation. You can add a navigation list to the last tab to get more screens for your app.

If no `-t` flag is provided, it will create a basic app automatically.

```shell
# For Android:
chui -n myProject -o android -t basic
chui -n myProject -o android -t navigation
chui -n myProject -o android -t slideout
chui -n myProject -o android -t tabbar
# Default (basic):
chui -n myProject -o android
```

```shell
# For iOS:
chui -n myProject -o ios -t basic
chui -n myProject -o ios -t navigation
chui -n myProject -o ios -t slideout
chui -n myProject -o ios -t tabbar
# Default (basic):
chui -n myProject -o ios
```


##ES6

ES6 (ECMAScript 2016) is the future of JavaScript development. If you are not using it yet, at some point you will. It provides many powerful features. One of the most useful is modules. ES6 modules lets you break your project down into organized modules of behavior. This increases the maintainability of your app. When importing views, routes and controllers, you'll need to mount them. Read the documentation for more information about this.

To make your project work with ES6 we use Babel, Browsersync and JSPM. This means that you need a build step and a server instance. These are set up for you automatically when you create a project for ES6. To do so, use the `-j` flag. Just add it to


```shell
# For Android:
chui -n myProject -o android -t basic -j
chui -n myProject -o android -t navigation -j
chui -n myProject -o android -t slideout -j
chui -n myProject -o android -t tabbar -j
# Default (basic):
chui -n myProject -o android -j
```

```shell
# For iOS:
chui -n myProject -o ios -t basic -j
chui -n myProject -o ios -t navigation -j
chui -n myProject -o ios -t slideout -j
chui -n myProject -o ios -t tabbar -j
# Default (basic):
chui -n myProject -j
```

After creating a project for ES6, you need to install its dependencies. Open the terminal, `cd` to your new project and run:


```shell
npm i

# When done, run:
jspm i

# When done, run:
gulp
```
This will build and open the project in your browser.

##Custom Build

You can create a minimal build of ChocolateChip-UI for your project. This supports just navigation lists. All the other modules are put in a `src` folder in your project's `dev` folder. To create a custom build, just include the `-c` flag:


```shell
# For Android:
chui -n myProject -o android -t basic -j -c
chui -n myProject -o android -t navigation -j -c
chui -n myProject -o android -t slideout -j -c
chui -n myProject -o android -t tabbar -j -c
# Default (basic):
chui -n myProject -o android -j -c
```

```shell
# For iOS:
chui -n myProject -o ios -t basic -j -c
chui -n myProject -o ios -t navigation -j -c
chui -n myProject -o ios -t slideout -j -c
chui -n myProject -o ios -t tabbar -j -c
# Default (basic):
chui -n myProject -j -c
```

###Importing Modules into Custom Project

After creating a custom build project, you can import the extra modules you need like so:

```shell
import './src/switches';
import './src/range';
import './src/popup';
```

Please note that the path needs to be appropriate for where you are importing the module. To see how to do this in a complex project, check out the JSPM versions of the Reference Apps: `chui -r`


###ES6 Project Structure

When you make a project for ES6, you'll work in the `dev` folder inside your project's `js` folder. The project setup automatically watches files in the `dev` folder. When you make and save changes, it rebuilds your project and reloads it in the browser.


For more details about working with ES6 projects, read the [chocolatechip-ui.github.io/v4/docs/tutorials/es6.html](documentation).

##Tests

Tests use Mocha, Chai and PhantomJS.

To run the tests, first you will need to run `npm i` on this repository. Once all dependences are installed, simply run:

```shell
  npm test
```

This will run all the tests in the terminal window. This does take a while. Alternatively, you can open the folder `test-browser` and double click any HTML file to run that set of tests in the browser.

You can also run individual test like this:

```shell
  npm run testName
```
