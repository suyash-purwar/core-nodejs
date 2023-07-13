const http = require('http');
const { URL } = require('url');
const path = require('path');
const { Worker } = require('worker_threads');

const PORT = 3000;
const HOST = 'localhost';

const executeBlocking = (req, res) => {
	res.setHeader('Content-Type', 'text/plain');

	const worker = new Worker('./worker.js');
	worker.on('message', (data) => {
		console.log(data);
		res.end(data.toString());
	});

	worker.on('error', (err) => {
		res.writeHead(404);
		res.end(`An error occurred ${err}`);
	});
};

const executeNonBlocking = (req, res) => {
	res.end('Non blocking route');
};

const listener = (req, res) => {
	let { headers, method, url } = req;
	url = new URL(path.join('http://', headers.host, url));

	switch (method) {
		case 'GET':
			if (url.pathname === '/blocking') executeBlocking(req, res);
			else if (url.pathname === '/non-blocking') executeNonBlocking(req, res);
			else return res.end(JSON.stringify({ error: 'resource not found' }));
			break;
		case 'POST':
			break;
	}
};

const server = http.createServer(listener);

server.listen(PORT, HOST, () => {
	console.log('Server Up!');
});
