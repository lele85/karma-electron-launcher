# karma-electron-launcher

> Launcher for electron. 

---

Small and experimental launcher based on [Karma Nodewebkit Launcher](https://raw.githubusercontent.com/intelligentgolf/karma-nodewebkit-launcher). Is not official nor super tested and it follows the "it works for me"(tm) philosophy.

---

## Installation

The easiest way is to keep `karma-electron-launcher` as a devDependency in your `package.json`.


    {
      "devDependencies": {
        "karma": "~0.10",
        "karma-electron-launcher": "~0.0.2"
      }
    }


You can do it on the command line by:

    npm install karma-electron-launcher --save-dev

## Configuration

    // karma.conf.js
    module.exports = function(config) {
      config.set({
        browsers: ['Electron']
      });
    };


You can pass list of browsers as a CLI argument too:

    karma start --browsers Electron

## Locally-installed Node modules

If you're using locally-installed Node modules via `require` in your code in the `node_modules` directory, you should be able to just `require` them, and they should be found by the testing environment.
    
## Global dependencies

The launcher depens on the presence of electron in your executable PATH so before using it install electron globally:

	npm install -g electron
