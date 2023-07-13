/**
 * Buffer is a fixed-size container in memory that can store bits.
 * It stores raw binary and sends it to other place.
 * Buffer class is accessible globally
 */

// This buffer container can store 8 bytes
const buff = Buffer.alloc(8);

console.log(buff); // <Buffer 00 00 00 00 00 00 00 00>
// These number are represented in hexademical number.
// We see 8 '00' because we are storing 8 bytes

// 's' is a character which will be converted to binary representation
// according to the character encoding. By default, character encoding is utf8
// If below we don't specify the 'utf8', it'll still default to utf8
// utf8 expresses each character using 1 byte
buff.write("s", "utf8");
console.log(buff);

buff.write("suyash");
console.log(buff);

// If we try to write more than the capacity of buffer, it'll ignore the extra stuff
// All the 8 bytes are filled here and the 'urwar' is ignore
buff.write("suyash purwar");
console.log(buff);

// Here for two spaces, two bytes will be overwritten and rest
// will stay the same
buff.write("  ");
console.log(buff);

console.log(buff.length);
console.log(buff.toJSON()); // Prints the decimal representation of characters
console.log(buff[2]); // 121 (decimal value)
console.log(String.fromCharCode(buff[2]));

buff.write("hello!!!");
console.log(buff); // <Buffer 68 65 6c 6c 6f 21 21 21>
console.log(buff[3]); // 108 
console.log(String.fromCodePoint("0x6c")); // l

const buff2 = Buffer.from("Hey! I'm Suyash.");
console.log(buff2);
console.log(buff2.length);

// Creating buffer from an array of decimal encodings for characters
// Every item in the array represents 1 character
// In utf8 encoding, each character is represented by 1 byte
// For 8 bits, maximum value of decimal number it could store is 255
// No value in the array will below can ever exceed 255
const buff3 = Buffer.from([121]);
console.log(buff3);
console.log(buff3.toString("utf8"));

// Converting a Buffer into a string is referred to as decoding, and converting a string into a Buffer is referred to as encoding.