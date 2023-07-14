const { parentPort, workerData } = require('worker_threads');

let counter = 0;
const final = Math.trunc(20_000_000_000 / workerData.threadCount);
for (let i = 0; i < final; i++) {
	counter++;
}

parentPort.postMessage(counter);
