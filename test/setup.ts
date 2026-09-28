/**
 * Jest global setup — runs after the test environment is installed.
 *
 * Registers @testing-library/jest-dom matchers (toBeInTheDocument, etc.) for
 * component tests. Safe to load under the default `node` environment too: the
 * matchers simply go unused by pure-logic tests.
 */
import "@testing-library/jest-dom";
