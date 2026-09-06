import { summarize } from "@/lib/summary";
import { loadMembers, loadReports } from "@/lib/store";

export const dynamic = "force-dynamic";

const yen = (n: number) => `¥${n.toLocaleString("ja-JP")}`;

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ ym?: string }>;
}) {
  const { ym = "2026-08" } = await searchParams;
  const [members, reports] = await Promise.all([loadMembers(), loadReports()]);
  const rows = summarize(members, reports, ym);

  return (
    <>
      <h1 style={{ fontSize: 20 }}>{ym} の精算</h1>
      <table
        style={{
          width: "100%",
          background: "#fff",
          borderCollapse: "collapse",
          border: "1px solid #e3e5e9",
        }}
      >
        <thead>
          <tr style={{ background: "#f0f1f4", textAlign: "left" }}>
            <th style={{ padding: 10 }}>メンバー</th>
            <th style={{ padding: 10, textAlign: "right" }}>稼働</th>
            <th style={{ padding: 10, textAlign: "right" }}>超過</th>
            <th style={{ padding: 10, textAlign: "right" }}>控除</th>
            <th style={{ padding: 10, textAlign: "right" }}>支払額</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.member} style={{ borderTop: "1px solid #e3e5e9" }}>
              <td style={{ padding: 10 }}>{r.member}</td>
              <td style={{ padding: 10, textAlign: "right" }}>{r.hours}h</td>
              <td style={{ padding: 10, textAlign: "right" }}>
                {r.settlement.overtimeHours}h／{yen(r.settlement.overtimeAmount)}
              </td>
              <td style={{ padding: 10, textAlign: "right" }}>
                {r.settlement.deductionHours}h／
                {yen(r.settlement.deductionAmount)}
              </td>
              <td style={{ padding: 10, textAlign: "right", fontWeight: 600 }}>
                {yen(r.settlement.total)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
