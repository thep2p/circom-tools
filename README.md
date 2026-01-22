# Circom Tools

A collection of low-level utilities for working with Circom circuits and binary file formats.

## Overview

This repository provides command-line tools for manipulating and analyzing Circom circuit artifacts, with a focus on security research and educational purposes.

## Tools

### [override_witness](./override_witness)

Direct binary editor for `.wtns` witness files. Allows modification of witness values without JSON conversion.

**Use Cases:**
- Security research and vulnerability demonstration
- Educational exploration of underconstrained circuits
- CTF challenges and wargames
- Testing circuit constraint validation

**Status:** Alpha - Educational/Research Tool

## Installation

Clone this repository:

```bash
git clone https://github.com/thep2p/circom-tools.git
cd circom-tools
```

Each tool is self-contained in its own directory with its own README.

## Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch
3. Submit a pull request with detailed description
4. Ensure code follows existing style
5. Add tests where applicable

## Security Notice

These tools are designed for **authorized security research and educational purposes only**. Always ensure you have proper authorization before testing or modifying any systems.

## License

MIT

## Resources

- [Circom Documentation](https://docs.circom.io/)
- [snarkjs](https://github.com/iden3/snarkjs)
- [0xPARC ZK Bug Tracker](https://github.com/0xPARC/zk-bug-tracker)
- [RareSkills ZK Security Tutorials](https://www.rareskills.io/)

## Disclaimer

This software is provided "as is" without warranty of any kind. Use at your own risk. The authors are not responsible for any misuse or damage caused by these tools.
