const http = require('http');
const { URL } = require('url');
const path = require('path');

const HOST = 'localhost';
const PORT = 3001;

const getUsers = () => {
	http
		.request(
			{
				hostname: 'localhost',
				port: 3000,
				method: 'GET',
				path: '/users',
			},
			(res) => {
				let data = [];
				res.on('data', (chunk) => {
					data.push(chunk);
				});
				res.on('end', () => {
					data = Buffer.concat(data).toString();
					console.log(data);
				});
			}
		)
		.on('error', console.error)
		.end();
};

const router = (req, res) => {
	let { url, method, headers } = req;
	url = new URL(path.join('http://', headers.host, url));
	console.log(url);

	let response;

	switch (method) {
		case 'GET':
			if (url.pathname === '/get-users') response = getUsers();
			else response = { error: 'resource not found' };

			res.statusCode = 200;
			res.end(JSON.stringify(response));
	}
};

const server = http.createServer(router);

server.listen(PORT, HOST, () => {
	console.log(`HTTP Client listening on ${HOST}:${PORT}`);
});
