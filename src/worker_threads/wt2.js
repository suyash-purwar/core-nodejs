const http = require('http');
const { URL } = require('url');
const path = require('path');

const PORT = 3000;
const HOST = 'localhost';

// Encapsulation CPU intensive code in Promises doesn't make
// it non-blocking.
const runLoop = () =>
	new Promise((resolve, reject) => {
		let counter = 0;
		for (let i = 0; i < 10_000_000_000; i++) {
			counter++;
		}
		resolve(`Value of counter is ${counter}`);
	});

const executeBlocking = async (req, res) => {
	const result = await runLoop();
	res.writeHead(200);
	res.end(result);
};

const executeNonBlocking = (req, res) => {
	res.setHeader('Content-Type', 'text/plain');
	res.end(`I am non-blocking`);
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
