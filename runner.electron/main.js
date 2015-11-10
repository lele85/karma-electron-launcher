var app = require('app');
var BrowserWindow = require('browser-window');

require('crash-reporter').start();

var mainWindow = null;

app.on('window-all-closed', function(){
	if (process.platform !== 'darwin'){
		app.quit();
	}
});

app.on('ready', function () {
	mainWindow = new BrowserWindow({width:400, height:300});
	mainWindow.on('closed', function () {
		mainWindow =  null;
	});

  mainWindow.webContents.on('dom-ready', function() {
    mainWindow.webContents.executeJavaScript('frame = document.getElementById("context"); \
                                              frame.addEventListener("load", function() { \
                                                frame.contentWindow["global"] = window; \
                                                frame.contentWindow["process"] = window.process; \
                                                frame.contentWindow["require"] = window.require; \
                                              })');
  });
  mainWindow.loadUrl('%URL%');
})