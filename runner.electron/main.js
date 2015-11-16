var app = require('app');
var BrowserWindow = require('browser-window');

require('crash-reporter').start();

var mainWindow = null;
var opts = %OPTS%;

if (process.platform === 'darwin' && opts.show === false){
	app.dock.hide();
}

app.on('window-all-closed', function(){
	if (process.platform !== 'darwin'){
		app.quit();
	}
});

app.on('ready', function () {
	mainWindow = new BrowserWindow(opts);
	mainWindow.loadUrl('%URL%');
	mainWindow.on('closed', function () {
		mainWindow = null;
	});
});
