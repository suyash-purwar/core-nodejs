const fs = require("fs/promises");

// Deletes the file
// (async function() {
//   try {
//     await fs.unlink('./toBeDeleted.txt');
//   } catch (err) {
//     console.log(err);
//     console.log(err.message);
//   }
// })();

// Writes into the file
// Writing nothing here
// So, basically creating a file
// (async function() {
//   try {
//     await fs.writeFile('./file2.txt', '');
//   } catch (err) {
//     console.log(err);
//   }
// })();

// Append data to the file
// (async function() {
//   try {
//     await fs.appendFile('./file2.txt', 'Hey, there!\n')
//   } catch (err) {
//     console.log(err);
//   }
// })();

// Read data
// (async function() {
//   try {
//     const content = await fs.readFile('./file2.txt');
//     console.log(content.toString());
//   } catch (err) {
//     console.log(err);
//   }
// })();