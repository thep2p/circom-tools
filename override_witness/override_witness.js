const fs = require('fs');

// Usage: node override_witness.js <witness_file> <witness_index> <new_value>
// Example: node override_witness.js witness.wtns 4 999

const args = process.argv.slice(2);
if (args.length < 3) {
    console.log('Usage: node override_witness.js <witness_file> <witness_index> <new_value>');
    console.log('Example: node override_witness.js witness.wtns 4 999');
    process.exit(1);
}

const witnessFile = args[0];
const witnessIndex = parseInt(args[1]);
const newValue = BigInt(args[2]);

// Read the witness file as a Buffer
const buffer = fs.readFileSync(witnessFile);
// Create a Uint32Array view directly on the buffer
const uint32View = new Uint32Array(buffer.buffer, buffer.byteOffset, buffer.byteLength / 4);

// Parse header to find witness data location
const n8 = uint32View[6];  // Field element size in bytes
const n32 = n8 / 4;  // Field element size in 32-bit words
const witnessCountOffset = 28 + n8;
const witnessCount = uint32View[witnessCountOffset / 4];
const section2Start = witnessCountOffset + 4;
const witnessDataStart = section2Start + 12;

// Validate witness index
if (witnessIndex < 0 || witnessIndex >= witnessCount) {
    console.error(`Error: witness index ${witnessIndex} out of range [0, ${witnessCount - 1}]`);
    process.exit(1);
}

// Calculate byte offset for the witness to modify
const witnessOffset = witnessDataStart + (witnessIndex * n8);
const witnessWordOffset = witnessOffset / 4;

// Convert the new value to little-endian 32-bit words
const newWords = [];
let remaining = newValue;
for (let i = 0; i < n32; i++) {
    newWords.push(Number(remaining & 0xFFFFFFFFn));
    remaining >>= 32n;
}

// Write the new value
for (let i = 0; i < n32; i++) {
    uint32View[witnessWordOffset + i] = newWords[i];
}

// Write back to file - use the original buffer, not uint32View.buffer
fs.writeFileSync(witnessFile, buffer);

console.log(`Successfully overrode witness[${witnessIndex}] with value ${newValue}`);
console.log(`File: ${witnessFile}`);
console.log(`Byte offset: ${witnessOffset}`);
