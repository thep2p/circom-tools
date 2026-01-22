# Override Witness

Direct binary editor for Circom `.wtns` witness files.

## What It Does

This tool allows you to modify individual witness values directly in the binary `.wtns` file format without converting to/from JSON. It:

1. Parses the `.wtns` binary header to extract metadata
2. Calculates byte offsets for specific witness indices
3. Overwrites witness values in-place
4. Writes the modified binary back to disk

## Usage

```bash
node override_witness.js <witness_file> <witness_index> <new_value>
```

**Example:**

```bash
# Change witness[4] to 999
node override_witness.js witness.wtns 4 999

# Change witness[1] (output) to 42
node override_witness.js witness.wtns 1 42
```

## Use Cases

### ✅ Recommended For

- **Security Research**: Demonstrating vulnerabilities in underconstrained circuits
- **Education**: Teaching about proper circuit constraint design
- **CTF Challenges**: Solving zero-knowledge proof wargames
- **Testing**: Validating that circuits properly reject invalid witnesses
- **Circuit Debugging**: Testing edge cases and constraint violations

### ❌ Not Recommended For

- **Production Systems**: This is an alpha-quality tool for research only
- **Automated Workflows**: Lacks robust error handling and validation
- **Large-Scale Operations**: Not optimized for batch processing
- **Untrusted Environments**: Minimal input validation

## How It Works

The `.wtns` file format (Circom v2) has this structure:

```
Offset  | Size | Description
--------|------|------------------------------------------
0-3     | 4B   | Magic bytes: "wtns"
4-7     | 4B   | Version number
8-11    | 4B   | Number of sections
12-15   | 4B   | Section 1 ID
16-23   | 8B   | Section 1 length
24-27   | 4B   | Field element size (n8 bytes)
28-..   | n8   | Prime modulus
..      | 4B   | Witness count
..      | 4B   | Section 2 ID
..      | 8B   | Section 2 length
..      | *    | Witness data (each n8 bytes, little-endian)
```

The tool:
1. Reads `n8` (field element size) at offset 24
2. Calculates witness data start: `28 + n8 + 4 + 12`
3. Locates witness[i] at: `witnessDataStart + (i × n8)`
4. Converts the new value to little-endian 32-bit words
5. Writes the modified buffer back

## Example: Exploiting Underconstrained Circuits

Consider this vulnerable circuit:

```circom
template Mul3() {
    signal input a, b, c;
    signal output out;
    signal i;

    a * b === 1;       // Constrains a * b = 1
    i <-- a * b;       // Assignment WITHOUT constraint (vulnerability!)
    out <== i * c;     // Should output c (since i=1), but we can cheat...
}
```

**The Exploit:**

```bash
# Normal execution: a=1, b=1, c=5 → out=5
# witness[0] = 1 (constant)
# witness[1] = 5 (out)
# witness[2] = 1 (a)
# witness[3] = 1 (b)
# witness[4] = 5 (c)
# witness[5] = 1 (i)

# Override i to any value (not constrained!)
node override_witness.js witness.wtns 5 2

# Now out = i * c = 2 * 5 = 10, but constraints still pass!
# This proves the circuit is underconstrained
```

## Limitations

**Current Version (Alpha)**
- Only supports Circom 2.x format
- Hardcoded offset calculations
- No validation of magic bytes or version
- No field prime range checking
- Minimal error handling for corrupted files
- No dry-run mode

See [TODO.md](../TODO.md) for planned improvements.

## Dependencies

- Node.js (built-in `fs` module only)

## Related Tools

- `snarkjs wtns export json` - Convert `.wtns` to JSON
- `snarkjs wtns check` - Validate witness against R1CS constraints
- [Circomspect](https://github.com/trailofbits/circomspect) - Static analyzer for Circom
- [0xPARC zk-bug-tracker](https://github.com/0xPARC/zk-bug-tracker) - Known vulnerabilities

## References

- [RareSkills: Hacking Underconstrained Circuits](https://rareskills.io/post/underconstrained-circom)
- [snarkjs wtns_utils.js](https://github.com/iden3/snarkjs/blob/master/src/wtns_utils.js) - Official format implementation
- [Circom Documentation](https://docs.circom.io/)

## Security Notice

This tool is for **authorized security research and educational purposes only**. Always obtain proper authorization before testing systems you do not own.

## License

MIT
