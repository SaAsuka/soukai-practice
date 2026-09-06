import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "稼働報告",
  description: "月次の稼働時間を登録して、精算額を集計する",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body
        style={{
          fontFamily: "system-ui, sans-serif",
          margin: 0,
          background: "#f6f7f9",
          color: "#1a1a1a",
        }}
      >
        <header
          style={{
            background: "#fff",
            borderBottom: "1px solid #e3e5e9",
            padding: "14px 24px",
            display: "flex",
            gap: 20,
            alignItems: "baseline",
          }}
        >
          <strong style={{ fontSize: 16 }}>稼働報告</strong>
          <Link href="/">一覧</Link>
          <Link href="/new">登録</Link>
          <Link href="/summary">集計</Link>
        </header>
        <main style={{ padding: 24, maxWidth: 960, margin: "0 auto" }}>
          {children}
        </main>
      </body>
    </html>
  );
}
