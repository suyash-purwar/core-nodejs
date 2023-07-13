const EventEmitter = require('node:events');

class MyEmitter extends EventEmitter {}

const myEmitter = new MyEmitter();

// emitter.once() allows to register a listener
// which can be called only once.

let m = 0;
myEmitter.once('event', () => {
  console.log(++m);
});

myEmitter.emit('event'); // 1;
myEmitter.emit('event'); // Ignored

myEmitter.on('error', (err) => {
  console.log('an error is caught');
});

myEmitter.emit('error', new Error('error'));

myEmitter.on('eventTwo', () => {
  console.log('event two in the house');
});

const eventTwoFunc = () => {
  console.log('event two second listener');
};

myEmitter.on('eventTwo', eventTwoFunc);

myEmitter.emit('eventTwo');

console.log(myEmitter.listenerCount('eventTwo')); // 2

// Removed the listener with eventTwoFunc function on eventTwo event
myEmitter.off('eventTwo', eventTwoFunc);

myEmitter.emit('eventTwo');

console.log(myEmitter.listenerCount('eventTwo'));
console.log(myEmitter.rawListeners('eventTwo'));