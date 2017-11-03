# karma-electron-launcher

> Launcher for electron.

---

Karma launcher for GitHub Electron inspired by [Karma Nodewebkit Launcher](https://github.com/intelligentgolf/karma-nodewebkit-launcher).

---

## Installation

The easiest way is to keep `karma-electron-launcher` as a devDependency in your `package.json`.

For `electron<=0.34.3`, use `karma-electron-launcher@~0.0.5`.

```json
{
  "devDependencies": {
    "karma": "~0.10",
    "karma-electron-launcher": "~0.2.0"
  }
}
```

You can do it on the command line by:

    npm install karma-electron-launcher --save-dev

## Configuration

```javascript
// karma.conf.js
module.exports = function(config) {
  config.set({
    browsers: ['Electron']
  });
};
```


You can pass list of browsers as a CLI argument too:

    karma start --browsers Electron

## Locally-installed Node modules

If you're using locally-installed Node modules via `require` in your code in the `node_modules` directory, you should be able to just `require` them, and they should be found by the testing environment.


## Configuring the Electron BrowserWindow

Options passed to the `new BrowserWindow()` constructor can be defined by adding an `electronOpts` object to your karma config. Eg.

```javascript
// karma.conf.js
module.exports = function(config) {
  config.set({
    browsers: ['Electron'],
    electronOpts: {
      title: 'my window title',
      // ...
    }
  });
};
```

Available options are specified
[in the Electron docs](https://github.com/atom/electron/blob/master/docs/api/browser-window.md#new-browserwindowoptions). By default, only the window dimensions (400x300) are set.

## Application seeds

If you are looking for an application seed to start from you can check this one out:
[Karma Electron Launcher Simple Seed](https://github.com/lele85/karma-electron-launcher-simple-seed)

## Pass command line switches through to Chromium

If you need to pass command line switches through to Chromium then you can use the `commandLineSwitches` property of `electronOpts`. Define your switch as an array if it also accepts arguments. Supported switches are listed [in the Electron docs](https://github.com/electron/electron/blob/master/docs/api/chrome-command-line-switches.md).

```javascript
// karma.conf.js
module.exports = function(config) {
  config.set({
    browsers: ['Electron'],
    electronOpts: {
      commandLineSwitches: [
        'disable-http-cache',
        'disable-http2',
        ['remote-debugging-port', '8315'],
        ['host-rules', 'MAP * 127.0.0.1'],
        ['js-flags', '--harmony_proxies --harmony_collections'],
      ],
    },
  });
};
```

Switches that are supported by Chromium but not specified in the Electron docs currently work too but this is an undocumented feature and may unexpectedly break:

```javascript
// karma.conf.js
module.exports = function(config) {
  config.set({
    browsers: ['Electron'],
    electronOpts: {
      commandLineSwitches: [
        '--use-fake-ui-for-media-stream',
        '--use-fake-device-for-media-stream',
      ],
    },
  });
};
```

## Configuring custom launchers

If you need to configure custom launchers differently to each other, then define `electronOpts` within the custom launcher config. This will be merged with `electronOpts` in the parent config object and override any properties already set.

```javascript
// karma.conf.js
module.exports = function(config) {
  config.set({
    browsers: ['Electron', 'MyFirstLauncher', 'MySecondLauncher'],
    electronOpts: {
      title: 'default title',
    },
    customLaunchers: {
      MyFirstLauncher: {
        base: 'Electron',
      },
      MySecondLauncher: {
        base: 'Electron',
        electronOpts: {
          title: 'my custom title',
        },
      },
    },
  });
};
```

In this example the `Electron` and `MyFirstLauncher` launchers will have the title `default title` whereas `MySecondLauncher` will have the title `my custom title`.
