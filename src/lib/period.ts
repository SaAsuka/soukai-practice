/**
 * 月（YYYY-MM）から、その月の開始・終了を出す。
 * 稼働報告は日本時間で締めている。
 */
export function monthRange(ym: string): { start: Date; end: Date } {
  const start = new Date(`${ym}-01`);
  const end = new Date(start);
  end.setMonth(end.getMonth() + 1);
  return { start, end };
}

/** 稼働日がその月に含まれるか */
export function isInMonth(workedOn: string, ym: string): boolean {
  const { start, end } = monthRange(ym);
  const d = new Date(workedOn);
  return d >= start && d < end;
}

/** 日付文字列から YYYY-MM を作る */
export function toYearMonth(workedOn: string): string {
  const d = new Date(workedOn);
  const m = String(d.getMonth() + 1).padStart(2, "0");
  return `${d.getFullYear()}-${m}`;
}
