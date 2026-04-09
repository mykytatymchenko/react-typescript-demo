# Security Policy

## Supported Versions

| Version | Supported |
| ------- | --------- |
| latest  | ✅        |

## Reporting a Vulnerability

Please **do not** report security vulnerabilities through public GitHub issues.

Instead, open a [GitHub Security Advisory](../../security/advisories/new) in this repository.

We will respond within **72 hours** and aim to release a fix within **14 days** for critical issues.

## Security Measures

This repository uses an automated security pipeline on every pull request:

- **Gitleaks** — scans git history for leaked secrets and credentials
- **Grype** (Anchore) — scans dependencies for known CVEs via SBOM
- **OSV-Scanner** (Google) — cross-references vulnerabilities against the OSV database
- **Semgrep** — static analysis for insecure code patterns (OWASP Top 10, XSS, injection)

All GitHub Actions are pinned to immutable commit SHAs to prevent supply-chain attacks.
