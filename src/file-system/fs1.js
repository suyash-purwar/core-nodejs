/**
 * FS module can be used in three ways
 * 1. Synchronous API
 * 2. Callback API
 * 3. Promises API
 */

// Synchrnous API
// const fs = require("fs");

// fs.copyFileSync('./file1.txt', './file1-copy-sync.txt');

// Callback API
// const fs = require("fs");

// fs.copyFile('./file1.txt', './file1-copy-callback.txt', (err) => {
//   if (err) console.log(err);
//   console.log(res);
// });

// Promises API
// const fs = require("fs/promises");

// (async function() {
//   await fs.copyFile('./file1.txt', './file1-promises.txt');
// })();