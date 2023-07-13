// const fs = require("fs");
const fs = require("fs/promises");

// (async () => {
//   console.time("a");
//   const fileHandler = await fs.open("./file1.txt", "w");
//   for (let i = 0; i < 1000000; i++) {
//     await fileHandler.write(i.toString() + " ");
//   }
//   console.timeEnd("a");
// })();

// (async () => {
//   console.time("a");
//   fs.open("./file1.txt", "w", (err, fd) => {
//     if (!err) {
//       for (let i = 0; i < 1000000; i++) {
//         fs.write(fd, i.toString() + " ", (err) => {
//           if (err) console.log(err);
//         });
//       }
//     }
//   });
//   console.timeEnd("a");
// })();

// THIS IMPLEMENTATION IS BAD
(async function() {
  console.time("write");
  const fileHandle = await fs.open("./file1.txt", "w");
  const stream = fileHandle.createWriteStream();
  
  for (let i = 0; i < 1000000; i++) {
    stream.write(` ${i} `);
  }

  console.timeEnd("write");
})();

/**
 * Streams in Node.js is a way to send data in small chunks
 * over a period of time.
 */