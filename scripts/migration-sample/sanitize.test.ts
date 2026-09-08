/**
 * Tests for the PII / contact stripper.
 *
 * This is the highest-consequence module in the migration pipeline: AGENTS.md
 * forbids introducing PII into content, fixtures, or logs, and every generated
 * fixture passes through here. So these tests are written adversarially — the
 * question is not "does it work on the happy path" but "what shape of real
 * legacy contact string could slip through".
 *
 * Cases are modeled on the actual shapes found in the Drupal export's POC and
 * Author columns and in fetched page footers.
 */
import {
  containsContactInfo,
  orgLabel,
  scrubContactInfo,
  toRoleContact,
} from "./sanitize";

describe("toRoleContact", () => {
  it("returns undefined for empty and whitespace-only values", () => {
    expect(toRoleContact(undefined)).toBeUndefined();
    expect(toRoleContact("")).toBeUndefined();
    expect(toRoleContact("   ")).toBeUndefined();
  });

  it("drops authoring placeholders that carry no editorial meaning", () => {
    expect(toRoleContact("admin")).toBeUndefined();
    expect(toRoleContact("Anonymous")).toBeUndefined();
    expect(toRoleContact("UNKNOWN")).toBeUndefined();
    expect(toRoleContact("n/a")).toBeUndefined();
  });

  it("maps an individual GSA address to the office named by the org code", () => {
    expect(toRoleContact("jane.doe@gsa.gov", "PBS")).toBe(
      "Public Buildings Service, U.S. GSA",
    );
    expect(toRoleContact("jane.doe@gsa.gov", "fas")).toBe(
      "Federal Acquisition Service, U.S. GSA",
    );
  });

  it("falls back to the agency label when the org code is unknown or absent", () => {
    expect(toRoleContact("jane.doe@gsa.gov")).toBe(
      "U.S. General Services Administration",
    );
    expect(toRoleContact("jane.doe@gsa.gov", "ZZZ")).toBe(
      "U.S. General Services Administration",
    );
  });

  it("never returns the original address for any email-shaped input", () => {
    // Contractor, personal, and subdomain addresses all appear in the export.
    const addresses = [
      "j.doe@contractor.example.com",
      "someone@gmail.com",
      "first.last@fas.gsa.gov",
      "a+tag@gsa.gov",
    ];
    for (const address of addresses) {
      const result = toRoleContact(address, "OGP");
      expect(result).toBeDefined();
      expect(result).not.toContain("@");
    }
  });

  it("keeps free-text values that name an office rather than a person", () => {
    expect(toRoleContact("Office of Strategic Communication")).toBe(
      "Office of Strategic Communication",
    );
    expect(toRoleContact("Federal Acquisition Service")).toBe(
      "Federal Acquisition Service",
    );
  });

  it("drops free-text values that look like a personal name", () => {
    expect(toRoleContact("Jane Doe")).toBeUndefined();
    expect(toRoleContact("Doe, Jane A.")).toBeUndefined();
    expect(toRoleContact("Jane Doe, Deputy Administrator")).toBeUndefined();
  });

  /**
   * The worst case in the real export: one cell holding a person, an office,
   * and an address. It satisfies the "looks like an office" allowance, so
   * without an explicit residual-identifier check the raw cell — name and
   * address included — would be returned verbatim into a fixture.
   */
  it("never returns a mixed person/office/address cell verbatim", () => {
    const cell = "Jane Doe, Office of Policy, jane.doe@gsa.gov";
    const result = toRoleContact(cell, "OGP");
    expect(result).not.toBe(cell);
    expect(result).not.toContain("@");
    expect(result).not.toContain("Jane");
  });

  it("drops a free-text office value that carries a phone number", () => {
    expect(toRoleContact("Office of Policy, (202) 555-0143")).toBeUndefined();
  });

  /**
   * EMAIL_RE is declared with the /g flag and reused via .test(), which advances
   * lastIndex between calls. If it is not reset, the *second* call with an
   * email-shaped value can return undefined and leak nothing — but a later call
   * can resume mid-string and misclassify. Batch generation calls this once per
   * record, so statefulness must not affect the outcome.
   */
  it("is not order-dependent across repeated calls", () => {
    const expected = "Public Buildings Service, U.S. GSA";
    for (let i = 0; i < 5; i += 1) {
      expect(toRoleContact("jane.doe@gsa.gov", "PBS")).toBe(expected);
    }
  });

  it("classifies a mixed batch the same way regardless of position", () => {
    const batch = [
      "jane.doe@gsa.gov",
      "Office of Government-wide Policy",
      "john.roe@gsa.gov",
      "Jane Doe",
      "another.person@gsa.gov",
    ];
    const forward = batch.map((v) => toRoleContact(v, "OGP"));
    const reversed = [...batch].reverse().map((v) => toRoleContact(v, "OGP"));
    expect(forward).toEqual([...reversed].reverse());
  });
});

describe("orgLabel", () => {
  it("expands a known org code to its full office name", () => {
    expect(orgLabel("OCIO")).toBe("Office of the Chief Information Officer");
    expect(orgLabel("  pbs  ")).toBe("Public Buildings Service");
  });

  it("passes through an unrecognized code rather than inventing a name", () => {
    expect(orgLabel("Region 5")).toBe("Region 5");
  });

  it("returns undefined for a missing value", () => {
    expect(orgLabel(undefined)).toBeUndefined();
  });
});

describe("scrubContactInfo", () => {
  it("redacts email addresses in body copy", () => {
    expect(scrubContactInfo("Write to jane.doe@gsa.gov for details.")).toBe(
      "Write to [contact redacted] for details.",
    );
  });

  it("redacts every address, not just the first", () => {
    const result = scrubContactInfo("a@gsa.gov and b@gsa.gov");
    expect(result).not.toContain("@");
    expect(result.match(/\[contact redacted\]/g)).toHaveLength(2);
  });

  it("redacts phone numbers in the formats legacy pages use", () => {
    const numbers = [
      "(202) 555-0143",
      "202-555-0143",
      "202.555.0143",
      "+1 202 555 0143",
      "202-555-0143 x1234",
      "202-555-0143 ext. 12",
    ];
    for (const number of numbers) {
      const result = scrubContactInfo(`Call ${number} today.`);
      expect(result).toContain("[phone redacted]");
      expect(result).not.toMatch(/555/);
    }
  });

  it("leaves prose without contact information unchanged", () => {
    const prose = "GSA manages federal real property and acquisition.";
    expect(scrubContactInfo(prose)).toBe(prose);
  });

  it("does not mistake a dollar figure or a year for a phone number", () => {
    const text = "In 2026 the program saved $3,960,000 across 12 regions.";
    expect(scrubContactInfo(text)).toBe(text);
  });

  /**
   * Regression: the phone pattern originally made every separator optional,
   * which collapsed it to "any ten consecutive digits". Legacy download URLs
   * are full of long unpunctuated digit runs — URL-encoded spaces (`%20`) sit
   * directly against dates — so a real `downloads[]` entry from the export was
   * redacted into an unusable link. Published phone numbers are always
   * punctuated; unpunctuated digit runs are not phone numbers.
   */
  it.each([
    [
      "URL-encoded filename with a date",
      "https://www.gsa.gov/system/files/GWAC%20Ordering%20Guide-update%2020260819.docx",
    ],
    ["bare ten-digit run", "Record 2020260819 was archived."],
    ["scan token in a query string", "file.pdf?bcsi_scan_F066E91406BDD76E=0"],
    ["fiscal identifier", "Solicitation 47QSMD31R0001 closes soon."],
  ])("leaves %s untouched", (_label, text) => {
    expect(scrubContactInfo(text)).toBe(text);
    expect(containsContactInfo(text)).toBe(false);
  });

  it("produces output that no longer trips the guard", () => {
    const dirty =
      "Contact Jane Doe at jane.doe@gsa.gov or (202) 555-0143 for more.";
    expect(containsContactInfo(scrubContactInfo(dirty))).toBe(false);
  });
});

describe("containsContactInfo", () => {
  it("detects emails and phone numbers", () => {
    expect(containsContactInfo("reach jane.doe@gsa.gov")).toBe(true);
    expect(containsContactInfo("call (202) 555-0143")).toBe(true);
  });

  it("returns false for clean prose", () => {
    expect(containsContactInfo("No contact details here.")).toBe(false);
  });

  /**
   * The guard is used to assert over every generated fixture in sequence. A
   * stateful /g regex would make it return false for a genuinely dirty string
   * simply because of where the previous call left off.
   */
  it("is not order-dependent across repeated calls", () => {
    for (let i = 0; i < 5; i += 1) {
      expect(containsContactInfo("reach jane.doe@gsa.gov")).toBe(true);
    }
  });

  it("stays correct when clean and dirty strings are interleaved", () => {
    const inputs = [
      "reach jane.doe@gsa.gov",
      "clean prose",
      "call (202) 555-0143",
      "also clean",
      "another one: john.roe@gsa.gov",
    ];
    expect(inputs.map(containsContactInfo)).toEqual([
      true,
      false,
      true,
      false,
      true,
    ]);
  });
});
