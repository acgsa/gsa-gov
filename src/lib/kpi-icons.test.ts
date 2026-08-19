import {
  DEFAULT_KPI_ICON_NAME,
  KPI_ICONS,
  KPI_ICON_OPTIONS,
  isKpiIconName,
  resolveKpiIcon,
  resolveKpiIconName,
} from "@/lib/kpi-icons";

describe("resolveKpiIconName — keyword auto-mapping", () => {
  it("maps AI-related copy to the brain-circuit icon", () => {
    expect(resolveKpiIconName("3.4M employees", "on AI tools")).toBe(
      "brain-circuit",
    );
    expect(resolveKpiIconName("23 agencies", "on USAi")).toBe("brain-circuit");
  });

  it("maps fraud/waste/abuse copy to the shield-alert icon", () => {
    expect(resolveKpiIconName("$2B+", "in fraud prevention")).toBe(
      "shield-alert",
    );
    expect(resolveKpiIconName("$50M", "waste eliminated")).toBe("shield-alert");
  });

  it("maps security/authorization copy to the shield-check icon", () => {
    expect(resolveKpiIconName("823", "FedRAMP approvals")).toBe("badge-check");
    expect(resolveKpiIconName("100%", "systems secured")).toBe("shield-check");
  });

  it("maps port copy to the anchor icon", () => {
    expect(resolveKpiIconName("3 ports", "upgraded")).toBe("anchor");
  });

  it("maps property/real-estate copy to the building icon", () => {
    expect(resolveKpiIconName("45 properties", "disposed")).toBe("building");
    expect(resolveKpiIconName("2M sq ft", "of leases consolidated")).toBe(
      "building",
    );
  });

  it("maps dollar/savings copy to the dollar-sign icon", () => {
    expect(resolveKpiIconName("$89M saved", "via OneGov")).toBe("dollar-sign");
  });

  it("maps agency/global copy to the globe icon", () => {
    // "23 agencies" alone (no AI term) should read as globe.
    expect(resolveKpiIconName("23 agencies", "onboarded")).toBe("globe");
  });

  it("maps people/workforce copy to the users icon", () => {
    expect(resolveKpiIconName("12,000", "employees trained")).toBe("users");
  });

  it("maps energy copy to the zap icon", () => {
    expect(resolveKpiIconName("1.2M kWh", "energy saved")).toBe("zap");
  });

  it("maps sustainability copy to the leaf icon", () => {
    expect(resolveKpiIconName("30%", "carbon reduction")).toBe("leaf");
  });

  it("is case-insensitive", () => {
    expect(resolveKpiIconName("3 PORTS", "UPGRADED")).toBe("anchor");
  });

  it("falls back to the default icon name when nothing matches", () => {
    expect(resolveKpiIconName("42", "widgets")).toBe(DEFAULT_KPI_ICON_NAME);
    expect(resolveKpiIconName("", "")).toBe(DEFAULT_KPI_ICON_NAME);
  });
});

describe("resolveKpiIcon — override + auto-map integration", () => {
  it("uses a valid manual override regardless of the text", () => {
    // Text would auto-map to shield-alert, but the override wins.
    expect(resolveKpiIcon("$2B+", "in fraud prevention", "rocket")).toBe(
      KPI_ICONS.rocket,
    );
  });

  it("ignores an invalid override and falls back to auto-mapping", () => {
    expect(resolveKpiIcon("3 ports", "upgraded", "not-a-real-icon")).toBe(
      KPI_ICONS.anchor,
    );
  });

  it("auto-maps when the override is null/undefined/empty", () => {
    expect(resolveKpiIcon("3 ports", "upgraded", null)).toBe(KPI_ICONS.anchor);
    expect(resolveKpiIcon("3 ports", "upgraded", undefined)).toBe(
      KPI_ICONS.anchor,
    );
    expect(resolveKpiIcon("3 ports", "upgraded", "")).toBe(KPI_ICONS.anchor);
  });

  it("returns the default icon component when nothing matches and no override", () => {
    expect(resolveKpiIcon("42", "widgets")).toBe(
      // eslint-disable-next-line security/detect-object-injection -- DEFAULT_KPI_ICON_NAME is a curated const key
      KPI_ICONS[DEFAULT_KPI_ICON_NAME],
    );
  });
});

describe("isKpiIconName — type guard", () => {
  it("accepts every curated icon key", () => {
    for (const opt of KPI_ICON_OPTIONS) {
      expect(isKpiIconName(opt.value)).toBe(true);
    }
  });

  it("rejects unknown keys", () => {
    expect(isKpiIconName("definitely-not-an-icon")).toBe(false);
    expect(isKpiIconName("")).toBe(false);
  });
});

describe("KPI icon config integrity", () => {
  it("keeps the dropdown options in sync with the icon map", () => {
    const optionValues = KPI_ICON_OPTIONS.map((o) => o.value).sort();
    const mapKeys = Object.keys(KPI_ICONS).sort();
    expect(optionValues).toEqual(mapKeys);
  });

  it("has a valid default icon that exists in the map", () => {
    expect(isKpiIconName(DEFAULT_KPI_ICON_NAME)).toBe(true);
    // eslint-disable-next-line security/detect-object-injection -- DEFAULT_KPI_ICON_NAME is a curated const key
    expect(KPI_ICONS[DEFAULT_KPI_ICON_NAME]).toBeDefined();
  });
});
