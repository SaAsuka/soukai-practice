export type Contract = {
  /** 月額の基準単価（円） */
  base: number;
  /** 精算下限（時間） */
  lower: number;
  /** 精算上限（時間） */
  upper: number;
};

export type SettlementResult = {
  base: number;
  overtimeHours: number;
  deductionHours: number;
  overtimeAmount: number;
  deductionAmount: number;
  total: number;
};

/** 超過単価（1時間あたり） */
export function overtimeUnitPrice(c: Contract): number {
  return Math.floor(c.base / c.upper);
}

/** 控除単価（1時間あたり） */
export function deductionUnitPrice(c: Contract): number {
  return Math.floor(c.base / c.lower);
}

/**
 * 稼働時間から当月の精算額を出す。
 * 稼働時間は 0.5 時間（30分）刻みで入力される。
 */
export function calcSettlement(c: Contract, hours: number): SettlementResult {
  const overtimeHours = hours > c.upper ? Math.floor(hours - c.upper) : 0;
  const deductionHours = hours < c.lower ? c.lower - hours : 0;

  const overtimeAmount = overtimeHours * overtimeUnitPrice(c);
  const deductionAmount = Math.round(deductionHours * deductionUnitPrice(c));

  return {
    base: c.base,
    overtimeHours,
    deductionHours,
    overtimeAmount,
    deductionAmount,
    total: c.base + overtimeAmount - deductionAmount,
  };
}
