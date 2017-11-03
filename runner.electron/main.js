var app = require('electron').app;
var BrowserWindow = require('electron').BrowserWindow;

var mainWindow = null;
var opts = %OPTS%;

if (Array.isArray(opts.commandLineSwitches)) {
	opts.commandLineSwitches.forEach(function(cliSwitch) {
		var args = cliSwitch;
		if (!Array.isArray(args)) {
			args = [args];
		}
		app.commandLine.appendSwitch.apply(app.commandLine.appendSwitch, args);
	});
}

if (process.platform === 'darwin' && opts.skipTaskbar === true){
	app.dock.hide();
}

app.on('window-all-closed', function(){
	if (process.platform !== 'darwin'){
		app.quit();
	}
});

app.on('ready', function () {
	mainWindow = new BrowserWindow(opts);
	mainWindow.loadURL('%URL%');
	mainWindow.on('closed', function () {
		mainWindow = null;
	});
});
