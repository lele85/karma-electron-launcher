var fs = require('fs');
var path = require('path');
var ncp = require('ncp').ncp;
var async = require('async');
var merge = require('merge');

var ElectronBrowser = function(baseBrowserDecorator, args) {
  baseBrowserDecorator(this);

  var customOptions = args.options || {};
  var searchPaths = (args.paths || ['node_modules']).map(function(searchPath) {
    return path.join(process.cwd(), searchPath);
  });
  searchPaths.unshift(process.env.NODE_PATH);

  this._start = function(url) {
    var self = this;
    var SOURCE_PATH = path.join(__dirname, 'runner.electron');
    var STATIC_PATH = path.join(self._tempDir, 'runner.electron');
    var MAIN_JS = path.join(STATIC_PATH, 'main.js');
    var PACKAGE_JSON = path.join(STATIC_PATH, 'package.json');

    async.auto({
      'directory': function(callback) {
        ncp(SOURCE_PATH, STATIC_PATH, callback);
      },
      'main.js:read' : ['directory', function(callback){
         fs.readFile(MAIN_JS, callback);
      }],
      'main.js:write' : ['main.js:read', function  (callback, results) {
        var content = results['main.js:read'].toString().replace('%URL%', url);
        fs.writeFile(MAIN_JS, content, callback);
      }],
      'package.json:read': ['directory', function(callback) {
        fs.readFile(PACKAGE_JSON, callback);
      }],
      'package.json:write': ['package.json:read', function(callback, results) {
        var options = JSON.parse(results['package.json:read'].toString());
        options = merge(true, options, customOptions);
        fs.writeFile(PACKAGE_JSON, JSON.stringify(options), callback);
      }],
      'exec': ['main.js:write', 'package.json:write', function(callback) {
        process.env.NODE_PATH = searchPaths.join(path.delimiter);
        self._execCommand(self._getCommand(), [STATIC_PATH]);
      }]
    });
  };
};

ElectronBrowser.prototype = {
  name: 'electron',

  DEFAULT_CMD: {
    darwin: "electron"
  },

  ENV_CMD: 'ELECTRON_BIN'
};

ElectronBrowser.$inject = ['baseBrowserDecorator', 'args'];

// PUBLISH DI MODULE
module.exports = {
  'launcher:Electron': ['type', ElectronBrowser]
};