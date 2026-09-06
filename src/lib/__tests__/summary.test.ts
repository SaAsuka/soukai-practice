import { describe, expect, it } from "vitest";
import { summarize } from "../summary";
import type { Member, Report } from "../store";

const members: Member[] = [
  { name: "田中 健", contract: { base: 720000, lower: 140, upper: 180 } },
  { name: "望月 遥", contract: { base: 650000, lower: 140, upper: 180 } },
];

const reports: Report[] = [
  { id: "r1", member: "田中 健", workedOn: "2026-08-03", hours: 8 },
  { id: "r2", member: "田中 健", workedOn: "2026-08-04", hours: 8 },
  { id: "r3", member: "田中 健", workedOn: "2026-07-31", hours: 8 },
  { id: "r4", member: "望月 遥", workedOn: "2026-08-03", hours: 7.5 },
];

describe("月次集計", () => {
  it("指定した月の稼働だけを合計する", () => {
    const s = summarize(members, reports, "2026-08");
    expect(s[0].hours).toBe(16);
    expect(s[1].hours).toBe(7.5);
  });

  it("前月の稼働は入らない", () => {
    const s = summarize(members, reports, "2026-07");
    expect(s[0].hours).toBe(8);
    expect(s[1].hours).toBe(0);
  });

  it("メンバーごとに精算額が出る", () => {
    const s = summarize(members, reports, "2026-08");
    expect(s[0].settlement.base).toBe(720000);
    expect(s[1].settlement.base).toBe(650000);
  });
});
