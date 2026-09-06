import { describe, expect, it } from "vitest";
import {
  calcSettlement,
  deductionUnitPrice,
  overtimeUnitPrice,
  type Contract,
} from "../settlement";

const c: Contract = { base: 720000, lower: 140, upper: 180 };

describe("単価", () => {
  it("超過単価は 基準単価 ÷ 上限", () => {
    expect(overtimeUnitPrice(c)).toBe(4000);
  });

  it("控除単価は 基準単価 ÷ 下限", () => {
    expect(deductionUnitPrice(c)).toBe(5142);
  });
});

describe("精算", () => {
  it("精算幅の中なら基準単価そのまま", () => {
    const r = calcSettlement(c, 160);
    expect(r.overtimeHours).toBe(0);
    expect(r.deductionHours).toBe(0);
    expect(r.total).toBe(720000);
  });

  it("ちょうど下限なら控除なし", () => {
    const r = calcSettlement(c, 140);
    expect(r.deductionHours).toBe(0);
    expect(r.total).toBe(720000);
  });

  it("ちょうど上限なら超過なし", () => {
    const r = calcSettlement(c, 180);
    expect(r.overtimeHours).toBe(0);
    expect(r.total).toBe(720000);
  });

  it("上限を2時間超えたら2時間分の超過がつく", () => {
    const r = calcSettlement(c, 182);
    expect(r.overtimeHours).toBe(2);
    expect(r.overtimeAmount).toBe(8000);
    expect(r.total).toBe(728000);
  });

  it("下限に2時間足りなければ2時間分が控除される", () => {
    const r = calcSettlement(c, 138);
    expect(r.deductionHours).toBe(2);
    expect(r.deductionAmount).toBe(10284);
    expect(r.total).toBe(709716);
  });
});
