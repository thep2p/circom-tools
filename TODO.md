# Improvement Roadmap

## override_witness

### Priority: High

- [ ] **Version Detection**
  - Detect Circom version from binary header
  - Support both v1 and v2 formats
  - Gracefully handle unsupported versions

- [ ] **Magic Bytes Validation**
  - Verify file starts with "wtns" magic bytes
  - Reject non-witness files with clear error message
  - Detect corrupted file headers

- [ ] **Field Prime Validation**
  - Read prime modulus from witness file header
  - Validate that `newValue < prime`
  - Display helpful error when value exceeds field size
  - Support common curves (BN128, BLS12-381, etc.)

- [ ] **Enhanced Error Messages**
  - Clear error for corrupted/truncated files
  - Detailed parsing errors with byte offsets
  - Suggest fixes for common issues
  - Add verbose/debug mode for troubleshooting

### Priority: Medium

- [ ] **Dry Run Mode**
  - Add `--dry-run` / `-d` flag
  - Preview changes without writing to disk
  - Show before/after values
  - Display byte-level diff

- [ ] **Backup Support**
  - Add `--backup` / `-b` flag
  - Create `.wtns.bak` before modifying
  - Auto-restore on write failures
  - Optional timestamp-based backups

- [ ] **Batch Operations**
  - Support multiple witness modifications in one command
  - JSON/YAML config file for complex modifications
  - Example: `--config modifications.json`

- [ ] **Interactive Mode**
  - Display current witness values
  - Prompt for index and new value
  - Confirm before writing
  - Allow multiple edits in one session

### Priority: Low

- [ ] **Testing**
  - Unit tests for offset calculations
  - Integration tests with real .wtns files
  - Edge case testing (0, max value, negative)
  - Test against multiple Circom versions

- [ ] **Performance**
  - Memory-mapped file I/O for large witnesses
  - Streaming modifications for multi-GB files
  - Parallel processing for batch operations

- [ ] **Additional Features**
  - Read-only mode to inspect witness values
  - Export witness to human-readable format
  - Compare two witness files
  - Generate witness diff report
  - Support for witness templates

## Future Tools

### wtns_inspector
- [ ] Display witness file metadata
- [ ] Show all witness values with labels (if .sym available)
- [ ] Validate file integrity
- [ ] Compare multiple witnesses

### r1cs_analyzer
- [ ] Parse .r1cs constraint files
- [ ] Identify underconstrained signals
- [ ] Generate constraint dependency graph
- [ ] Find unused signals

### proof_validator
- [ ] Verify proofs against public inputs
- [ ] Check proof format validity
- [ ] Batch proof verification
- [ ] Performance benchmarking

### circuit_fuzzer
- [ ] Generate random inputs for circuits
- [ ] Attempt to find invalid witness that passes constraints
- [ ] Automated vulnerability detection
- [ ] Integration with override_witness

## Documentation

- [ ] Add architecture documentation
- [ ] Create tutorial series for security research
- [ ] Document .wtns binary format completely
- [ ] Add video walkthroughs
- [ ] Create cheat sheet for common operations

## Infrastructure

- [ ] Set up CI/CD pipeline
- [ ] Automated testing on commits
- [ ] Version tagging and releases
- [ ] Contribution guidelines
- [ ] Code of conduct
- [ ] Issue templates
- [ ] PR templates

## Community

- [ ] Create examples directory
- [ ] Add vulnerable circuit samples for testing
- [ ] Write blog posts about tool usage
- [ ] Present at ZK security conferences
- [ ] Collaborate with other ZK security projects

---

**Note**: This roadmap is subject to change based on community feedback and discovered needs. Contributions are welcome for any of these items!
