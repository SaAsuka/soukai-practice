import { isInMonth } from "./period";
import { calcSettlement, type SettlementResult } from "./settlement";
import type { Member, Report } from "./store";

export type MemberSummary = {
  member: string;
  hours: number;
  settlement: SettlementResult;
};

/** 指定した月の、メンバーごとの稼働時間と精算額を出す */
export function summarize(
  members: Member[],
  reports: Report[],
  ym: string
): MemberSummary[] {
  return members.map((m) => {
    const hours = reports
      .filter((r) => r.member === m.name && isInMonth(r.workedOn, ym))
      .reduce((sum, r) => sum + r.hours, 0);

    return {
      member: m.name,
      hours,
      settlement: calcSettlement(m.contract, hours),
    };
  });
}
