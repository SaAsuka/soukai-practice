import { loadReports } from "@/lib/store";

export const dynamic = "force-dynamic";

export default async function Page() {
  const reports = await loadReports();
  const sorted = [...reports].sort((a, b) =>
    a.workedOn < b.workedOn ? 1 : -1
  );

  return (
    <>
      <h1 style={{ fontSize: 20 }}>稼働の一覧</h1>
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
            <th style={{ padding: 10 }}>稼働日</th>
            <th style={{ padding: 10 }}>メンバー</th>
            <th style={{ padding: 10, textAlign: "right" }}>時間</th>
          </tr>
        </thead>
        <tbody>
          {sorted.map((r) => (
            <tr key={r.id} style={{ borderTop: "1px solid #e3e5e9" }}>
              <td style={{ padding: 10 }}>{r.workedOn}</td>
              <td style={{ padding: 10 }}>{r.member}</td>
              <td style={{ padding: 10, textAlign: "right" }}>{r.hours}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
