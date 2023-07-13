const http = require('http');
const fs = require('fs');

const servePlainText = (req, res) => {
	console.log(req);
	res.writeHead(200);
	res.end('Hey from nodejs http module');
};

const serveJSON = (req, res) => {
	res.setHeader('Content-Type', 'application/json');
	// With this header the client will start downloading the JSON file
	// instead of rendering it on the browser
	// File will start downloading with the name mentioned in the header
	// res.setHeader(
	// 	'Content-Disposition',
	// 	'attachment;filename=some-random-json.json'
	// );
	res.writeHead(200);
	const json = {
		name: 'Suyash',
		age: 20,
	};
	res.end(JSON.stringify(json));
};

const serveCSV = (req, res) => {
	res.setHeader('Content-Type', 'text/csv');
	// Most modern browsers will automatically start downloading the CSV file
	// But it's considered a good practice to add this extra header
	// It also lets us set the name of file being sent
	res.setHeader(
		'Content-Disposition',
		'attachment;filename=height-measurements.csv'
	);
	let csv = fs.readFileSync(__dirname + '/one.csv');
	res.end(csv);
};

const serveHTML = (req, res) => {
	const html =
		'<html><head><title>Hey</title></head><body><h1>Hey there</h1></body></html>';
	res.setHeader('Content-Type', 'text/html');
	console.log(__dirname); // Shows the directory in which this file is loacated in
	console.log(__filename); // Shows the complete file path of this file
	res.end(html);
};

const server = http.createServer(serveHTML);
const port = 3000;
const host = 'localhost';

server.listen(port, host, () => {
	console.log(`Server is running on ${host}:${port}`);
});
