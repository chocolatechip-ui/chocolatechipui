=======
# ChocolateChip-UI - A Compact Framework for Mobile Web Apps


##ChocolateChip-UI


[TypeScript definitions on DefinitelyTyped](http://definitelytyped.org)


ChocolateChip-UI is a framework for making mobile Web apps. It has three components: semantic HTML5 markup, CSS and JavaScript. To successfully make an app with ChocolateChip-UI you'll need at least moderate experience working with JavaScript. This is so you can use templates, make Ajax requests and handle callbacks for user interaction. If this is beyond your current skills, consider getting someone with Web development experience to help you. ChocolateChip-UI is built on jQuery, so you will need a compatible version of it to work with ChocolateChip-UI.

Please visit [ChocolateChip-UI's Website](http://chocolatechip-ui.github.io) for documentation and tutorials. This project includes examples for iOS, Android and Windows Phone 8 to help you get going.

##NPM
The fastest way to get going with ChocolateChip-UI is to install the NPM module ```chui```. This will allow you to quickly create the type of ChocolateChip-UI project you want. Please visit [NPM](https://www.npmjs.com/package/chui) for directions on how to use it

##Building 

You do not have to build ChocolateChipUI. This repository has all examples and test pre-built for you. To view the iOS examples, please use the Safari Browser. For Android, use Chrome. For Windows Phone, use IE 10 or MS Edge. 

If you want or need to make modifications to the code for whatever reason, you'll need to build the files from the source code. For details how to do that, read on.

ChocolateChip-UI uses Gulpjs to build. This is a Node package, so you'll first need to have [Node installed](http://http://nodejs.org). After installing Nodejs, or if you already have it installed, on Mac OS X use the terminal to cd to the directory. On Windows you can use the Windows command prompt to do this. Once you are in the folder, run the following command in your terminal. 

###Gulpjs

On Mac OS X, you'll need to run the command in your terminal with **sudo** to avoid installation errors:

```shell
sudo npm install -g gulp
``` 


For Windows, just run this:

```shell
npm install -g gulp
```

Enter your password when it requests. After you should see a number of Nodejs modules being installed in a folder called **node\_modules**. You do not need **node\_modules** in your final project. The node modules are there to enable the build process with Gruntjs.

Now that you have the node modules install, you can just type `gulp` in the terminal and hit return/enter. This will kick off the build process, which will produce the following directories:

```
chui/
data/
demo/
examples-android/
examples-ios/
examples-win/
images/
node_modules/
```

If you're starting a new project, you only need the files in the **chui** folder. If you want to create a custom build, then just run any of the tasks:

```
gulp js android
```

```
gulp js ios
```

```
gulp js win
```

These will build the ChUI JavaScript file, normal and minified, as well as the OS theme normal and minified.

You can also build out just the examples for a particular platform:


```
gulp android_examples
```

```
gulp ios_examples
```

```
gulp win_examples
```

This will include the ChUI JavaScript, the theme and all the examples for that platform.

If you intend to customize a theme for branding purposes, you should do so in the LESS files in the source. But instead of having to rebuild the theme each time, you can ask Gulp to watch the theme. That means every time you make a change and save a file, Gulp will rebuild the theme for you.

To watch all there themes, run:

```
gulp watch
```

To watch specific platform theme, run one of these:

```
gulp watch_android
```

```
gulp watch_ios
```

```
gulp watch_win
```

You could also build a theme and watch it all at once:

```
gulp js android && gulp watch_android
```

```
gulp js ios && gulp watch_ios
```

```
gulp js win && gulp watch_win
```
##ChocolateChipJS

If you want to use ChocolateChipJS instead of jQuery, you can just run the following command:


```
gulp --chocolatechipjs
```

This will put the latest version of ChocolateChipJS in the chui folder and also output all examples to use ChocolateChipJS instead of jQuery. You can learn more about how to use ChocolateChipJS on [our website](http://chocolatechip-ui.com).

###Note

You do not need Nodejs to use ChocolateChip-UI. Nodejs is only used to build the framework and examples from the source files.

##Contributing Code
###Avoiding Carriage Returns in Commits

ChocolateChip-UI uses Unix linefeeds (LF) for new lines. Github for Windows adds carriage returns to linefeeds (CRLF). If you try to check in such files, Git will flag every line with changed new lines, which means practically everything. To avoid this we've added a .gitattributes file to the repository. This will prevent Github from converting the new lines on Windows. 

If you are editing the source code on Windows, depending on the text editor you are using, or if you do a copy/paste, you may inadvertently introduce Windows carriage returns. Also some Grunt actions, such as concatenation with banners, automatically create newlines with carriage returns on Windows. When these carriage returns are added to the source code, they will show up as a changes at commit time. You can avoid this. Navigate to the ChocolateChip-UI repository in the command prompt, then execute these two Git commands:

```
git config core.eol lf
git config core.autocrlf input
```

core.eol tells Git to always checkout this repository with LF. 
core.autocrlf tells Git to convert CRLF to LF on commit.

A front end framework for building mobile web apps.
