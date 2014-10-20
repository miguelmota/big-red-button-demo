var terminalTab = require('terminal-tab');
var BigRedButton = require('big-red-button');

var bigRedButtons = [];

for (var i = 0; i < BigRedButton.deviceCount(); i++) {
  console.log('opening BigRedButton', i);

  bigRedButtons.push(new BigRedButton.BigRedButton(i));

  bigRedButtons[i].on('buttonPressed', function () {
    console.log('Button pressed');
    terminalTab.open('sl && exit');
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
