#!/usr/bin/env bash
#
# Migration sample runner wrapper.
#
# Builds an invocation-scoped CA bundle before running the TypeScript pipeline.
#
# WHY: Node ships its own CA store and does not consult the macOS keychain. On
# GSA-managed machines the TLS chain presented for gsa.gov is completed by an
# enterprise root that lives only in the keychain, so bare `fetch()` fails with
# "unable to get local issuer certificate" while `curl` succeeds. The
# content-audit fetcher collapses that into `fetchStatus: "error"`, which looks
# like every page 404'd. Exporting NODE_EXTRA_CA_CERTS for this process only
# resolves it without weakening TLS verification anywhere.
#
# This mirrors the CA-bundle setup in agentic-coding-playbook/scripts/ci-local.sh.
#
# NEVER set NODE_TLS_REJECT_UNAUTHORIZED=0 here. Certificate verification stays on.
#
# Usage:
#   ./scripts/migration-sample/run.sh
#
# Network scope: www.gsa.gov only, via the existing rate-limited fetcher.
set -euo pipefail

cd "$(dirname "$0")/../.."

# Build a bundle of standard roots plus OS-trusted roots.
CA_BUNDLE="$(mktemp -t migration-sample-cabundle.XXXXXX.pem)"
trap '[[ -f "$CA_BUNDLE" ]] && rm -f "$CA_BUNDLE"' EXIT

if [[ -f /etc/ssl/cert.pem ]]; then
  cat /etc/ssl/cert.pem >"$CA_BUNDLE"
fi

if [[ "$(uname)" == "Darwin" ]]; then
  security find-certificate -a -p /Library/Keychains/System.keychain \
    >>"$CA_BUNDLE" 2>/dev/null || true
  security find-certificate -a -p /System/Library/Keychains/SystemRootCertificates.keychain \
    >>"$CA_BUNDLE" 2>/dev/null || true
fi

CERT_COUNT="$(grep -c 'BEGIN CERTIFICATE' "$CA_BUNDLE" 2>/dev/null || echo 0)"
if [[ "$CERT_COUNT" -eq 0 ]]; then
  echo "warning: no CA certificates collected; falling back to Node defaults" >&2
else
  echo "Using invocation-scoped CA bundle ($CERT_COUNT certs)"
  export NODE_EXTRA_CA_CERTS="$CA_BUNDLE"
  export SSL_CERT_FILE="$CA_BUNDLE"
fi

exec npx tsx scripts/migration-sample/run.ts "$@"
