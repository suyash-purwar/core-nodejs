const EventEmitter = require('events');

class Emitter extends EventEmitter {}

const myEmitter = new Emitter();

// Listener 1
myEmitter.on('foo', () => {
  console.log('An event occured 1.');
});

// Listener 2
myEmitter.on('foo', () => {
  console.log('An event occured 2.');
});

// Listener 3
myEmitter.on('foo', (x) => {
  console.log('An event occurred with param.');
  console.log(x);
});

// Listener 1
myEmitter.on('bar', () => {
  console.log('A bar event');
});

myEmitter.emit('foo');
myEmitter.emit('foo', 1);

myEmitter.emit('bar');