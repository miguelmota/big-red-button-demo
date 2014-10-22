var fs = require('fs');
var exec = require('child_process').exec;
var os = require('os');
var _ = require('lodash');
var terminalTab = require('terminal-tab');
var BigRedButton = require('big-red-button');

var mediaFiles = [];

var mediaDir = 'media/';

fs.readdir([__dirname, '/', mediaDir].join(''), function(err, files) {
  mediaFiles = _.map(_.filter(files, function(f, i) {
    return /mp3/.test(f);
  }), function(f, i) {
    return [mediaDir, f].join('');
  });
});

function randomMediaFile() {
  return mediaFiles[_.random(0,mediaFiles.length)];
}

var bigRedButtons = [];

for (var i = 0; i < BigRedButton.deviceCount(); i++) {
  console.log('opening BigRedButton', i);

  bigRedButtons.push(new BigRedButton.BigRedButton(i));

  bigRedButtons[i].on('buttonPressed', function () {
    console.log('Button pressed');

    exec(['afplay', randomMediaFile()].join(' '), function(error, stdout, stderr) {});

    terminalTab.open(['sl', '&& exit'].join(' '));
  });

  bigRedButtons[i].on('buttonReleased', function () {
    console.log('Button released');
  });

  bigRedButtons[i].on('lidRaised', function () {
    console.log('Lid raised');
  });

  bigRedButtons[i].on('lidClosed', function () {
    console.log('Lid closed');
  });

}
