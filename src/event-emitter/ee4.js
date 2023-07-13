class EventEmitter {
  listeners = {};

  addToListeners(event, fn, isOnce) {
    if (!(event in this.listeners)) this.listeners[event] = [];
    this.listeners[event].push({
      func: fn,
      isOnce
    });
  }

  on(event, fn) {
    this.addToListeners(event, fn, 0);
  };

  once(event, fn) {
    this.addToListeners(event, fn, 1);
  }

  off(event, fn) {
    if (!(event in this.listeners)) throw new Error('EVENT_NOT_FOUND');
    let fnIndex = -1; let index = 0;
    for (let fnObj of this.listeners[event]) {
      if (fnObj.func == fn) {
        fnIndex = index;
        break;
      }
      index++;
    }
    if (fnIndex != -1) this.listeners[event].splice(fnIndex, fnIndex+1);
    if (!this.listeners[event].length) delete this.listeners[event]
  }

  emit(event) {
    if (!(event in this.listeners)) throw new Error('EVENT_NOT_FOUND');
    for (let fnObj of this.listeners[event]) {
      fnObj.func();
      if (fnObj.isOnce) this.off(event, fnObj.func);
    }
  }

  listenerCount(event) {
    if (!(event in this.listeners)) throw new Error('EVENT_NOT_FOUND');
    return this.listeners[event].length;
  }
}

const ee = new EventEmitter();

function namedFunc() {
  console.log('Named function here guys!');
}
ee.on('event', function () {
  console.log('hey');
});
ee.on('event', () => {
  console.log('another hey');
});
ee.on('event', namedFunc);
console.log(ee.listeners);
ee.on('eventTwo', namedFunc);
console.log(ee.listeners);
ee.off('event', namedFunc);
console.log(ee.listeners);

ee.once('eventThree', () => {
  console.log('fuck you');
});
console.log(ee.listeners);
ee.emit('eventThree');
console.log(ee.listeners);

console.log(ee.listenerCount('event'));