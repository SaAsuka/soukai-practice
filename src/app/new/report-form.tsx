"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

// 今日の日付を初期値にする
const today = new Date().toISOString().slice(0, 10);

export default function ReportForm({ members }: { members: string[] }) {
  const router = useRouter();
  const [member, setMember] = useState(members[0] ?? "");
  const [workedOn, setWorkedOn] = useState(today);
  const [hours, setHours] = useState("8");
  const [saving, setSaving] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    await fetch("/api/reports", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ member, workedOn, hours: Number(hours) }),
    });
    setSaving(false);
    router.push("/");
    router.refresh();
  }

  const box = {
    padding: 8,
    border: "1px solid #ccd0d6",
    borderRadius: 4,
    fontSize: 14,
  } as const;

  return (
    <form
      onSubmit={submit}
      style={{
        background: "#fff",
        border: "1px solid #e3e5e9",
        padding: 20,
        display: "grid",
        gap: 14,
        maxWidth: 420,
      }}
    >
      <label style={{ display: "grid", gap: 6 }}>
        メンバー
        <select
          value={member}
          onChange={(e) => setMember(e.target.value)}
          style={box}
        >
          {members.map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>
      </label>

      <label style={{ display: "grid", gap: 6 }}>
        稼働日
        <input
          type="date"
          value={workedOn}
          onChange={(e) => setWorkedOn(e.target.value)}
          style={box}
        />
      </label>

      <label style={{ display: "grid", gap: 6 }}>
        稼働時間（0.5刻み）
        <input
          type="number"
          step="0.5"
          min="0"
          max="24"
          value={hours}
          onChange={(e) => setHours(e.target.value)}
          style={box}
        />
      </label>

      <button
        type="submit"
        disabled={saving}
        style={{
          padding: "10px 16px",
          background: saving ? "#9aa2ae" : "#1f6feb",
          color: "#fff",
          border: 0,
          borderRadius: 4,
          fontSize: 14,
          cursor: saving ? "default" : "pointer",
        }}
      >
        {saving ? "登録しています…" : "登録する"}
      </button>
    </form>
  );
}
