const http = require('http');
const { URL } = require('url');
const path = require('path');
const { Worker } = require('worker_threads');

const THREAD_COUNT = 7;

const createWorker = () => {
	return new Promise((resolve, reject) => {
		let worker = new Worker('./four_worker.js', {
			workerData: { threadCount: THREAD_COUNT },
		});
		worker.on('message', (data) => {
			resolve(data);
		});
		worker.on('error', (err) => {
			reject(`An error occurred: ${err}`);
		});
	});
};

const executeBlockingCode = async (req, res) => {
	const workerJobPromises = [];

	for (let i = 0; i < THREAD_COUNT; i++) {
		let worker = createWorker();
		workerJobPromises.push(worker);
	}

	const workerJobResult = await Promise.all(workerJobPromises);

	const output = workerJobResult.reduce((accumulator, currentValue) => {
		return accumulator + currentValue;
	}, 0);

	res.writeHead(200);
	res.end(output.toString());
};

const listener = (req, res) => {
	let { method, url, headers } = req;
	url = new URL(path.join('http://', headers.host, url));
	// console.log(url);

	switch (method) {
		case 'GET':
			if (url.pathname === '/blocking') executeBlockingCode(req, res);
	}
};

const server = http.createServer(listener);

server.listen(3000, 'localhost', () => {
	console.log('Server is running');
});
