const EventEmitter = require('events');

const ee = new EventEmitter();

ee.on('eventOne', function() {
  console.log(this);
  this.emit('eventTwo');
});

ee.on('eventTwo', function() {
  console.log('eventTwo called');
  // this.emit('eventOne');
});

ee.emit('eventOne');

ee.on('eventThree', function() {
  console.log('called');
  this.emit('eventThree');
});

ee.emit('eventThree');
