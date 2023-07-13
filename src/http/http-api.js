const http = require('http');
const fs = require('fs');
const { URL } = require('url');

const HOST = 'localhost';
const PORT = 3000;

// Bring the test db here
const db = JSON.parse(fs.readFileSync(__dirname + '/sample-db.json'));

const showUsers = (page) => {
	let result = [];
	let start = (page - 1) * 10;
	let end = page * 10;
	while (start < end) {
		result.push(db[start]);
		start++;
	}
	return result;
};

const listener = async (req, res) => {
	res.setHeader('Content-Type', 'application/json');
	let result;

	const { method, headers } = req;
	const url = new URL('http://' + headers.host + req.url);

	console.log(url);

	switch (method) {
		case 'GET':
			if (url.pathname === '/' || url.pathname === '/pong') {
				result = {
					response: 'pong',
				};
			} else if (url.pathname === '/users') {
				let page = 1;
				if (url.searchParams.size) {
					page = url.searchParams.get('page');
					if (url.searchParams.size > 1 || !page) {
						res.writeHead(400);
						res.end(JSON.stringify({ error: 'invalid parameters' }));
						return;
					}
					if (page > 5) {
						res.writeHead(400);
						res.end(JSON.stringify({ error: 'resource not found' }));
						return;
					}
				}
				result = showUsers(+page || 1);
			} else if (url.pathname.startsWith('/user')) {
				if (url.pathname === '/user' || url.pathname === '/user/') {
					res.writeHead(400);
					res.end(JSON.stringify({ error: 'invalid path' }));
					return;
				}
				let id = +url.pathname.slice(1).split('/')[1];
				if (id === NaN) {
					res.writeHead(400);
					res.end(JSON.stringify({ error: 'invalid path' }));
					return;
				}
				result = db.filter((user) => user.id === id);
			} else {
				result = { error: 'resource not found' };
			}
			res.end(JSON.stringify(result));
			break;
		case 'POST':
			if (url.pathname === '/save-user') {
				let data = [];
				req.on('data', (chunk) => {
					console.log(chunk);
					data.push(chunk);
				});
				req.on('end', () => {
					data = Buffer.concat(data).toString();
					console.log(data);
					res.writeHead(200);
					return res.end();
				});
			}
	}
};

const server = http.createServer(listener);

server.listen(PORT, HOST, () => {
	console.log(`HTTP Server running on ${HOST}:${PORT}`);
});

//* COOL STUFF BELOW
// server.prependListener('connection', (stream) => {
// 	console.log('hey!');
// });

// server.on('connection', (stream) => {
// 	console.log('someone connected');
// 	stream.on('data', (d) => console.log(d.toString('utf-8')));
// });
