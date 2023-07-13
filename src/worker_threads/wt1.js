const identifier = process.argv[2];
let count = 0;

while (true) {
	if (count == 2000 || count == 4000) {
		console.log(`${identifier} ${count}`);
	}
	count++;
}

/**
 * Node.js does provide extra threads, which is why it’s considered to be multithreaded. In this section, you’ll examine hidden threads in Node.js, which help make I/O operations non-blocking.
 */
