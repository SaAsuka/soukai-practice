# 業務のルール

## 時間

- 稼働時間は 0.5（30分）刻みで扱う
- 計算の途中で切り捨て・切り上げをしない
- 丸めるのは、画面に出す直前の1回だけ

## 日付

- 日付の生成・比較・表示は、すべて UTC 基準でそろえる
  - 作る … `new Date(Date.UTC(y, m - 1, d))`
  - 文字列から作る … `new Date("2026-08-01T00:00:00Z")`（末尾は `Z`）
  - 読む … `getUTCFullYear()` / `getUTCMonth()` / `getUTCDate()`
- `new Date().toISOString().slice(0, 10)` で「今日」を作らない
- ローカル時刻の関数（`getMonth()` / `getDate()`）と混ぜない

## 金額

- 円未満の端数を、時間単価の段階で丸めない
- 丸めるのは最終金額の1回だけ。四捨五入（`Math.round`）
- 金額は number（円）で持ち、表示するときだけ `toLocaleString("ja-JP")` を使う
