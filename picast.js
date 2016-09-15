var sys = require('sys');
var exec = require('child_process').exec;
var express = require('express');
var app = express();

var lastProcess = null;

var startProcess = function(cmd) {
	stopProcess();
	lastProcess = exec(cmd);
	// lastProcess.stdout.on('data', function (data) {
	//   console.log("1" + data);
	// });

	// lastProcess.stderr.on('data', function (data) {
	//   console.log("2" + data);
	// });

	// lastProcess.on('exit', function (code) {
	//   console.log("Child exited with code " + code);
	// });
};

var stopProcess = function() {
	if (lastProcess) {
		lastProcess.kill('SIGHUP');
		lastProcess = null;
	}
};

app.get('/', function (req, res) {
	res.send('Welcome to PiCAST 3! In the URL, type what you want to do...');
});

app.get('/stop', function (req, res) {
	stopProcess();
	res.send('Stop');
});

app.get('/start', function (req, res) {
	res.send('Start');
	startProcess("ls");
});

// app.get('/yt-stream/:url', function (req, res) {
//		 res.send('Streaming YouTube Video...');
//		 exec("livestreamer --player=mplayer https://www.youtube.com/watch?v=" + req.params.url + " best");
// });

// Setup PiCAST Server
var srv = app.listen(3000, function () {
		var host = srv.address().address;
		var port = srv.address().port;

		console.log('Access at http://%s:%s', host, port);
});
