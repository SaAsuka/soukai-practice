# 配布用の規約一式（ハーネス）

**当日④で使います。それまで開かなくて大丈夫です。**

## 入れ方

リポジトリの直下に、このフォルダの中身をそのまま置きます。

```bash
cp -r harness/.claude harness/CLAUDE.md .
```

Claude Code を立ち上げ直してから、こう聞いてください。

> このプロジェクトのルールを3つ挙げて

3つ返ってきたら入っています。

## 外し方（⑤で使います）

```bash
mv CLAUDE.md CLAUDE.md.off && mv .claude .claude.off
```

戻すときは逆にします。

## 中身

| ファイル | 何が書いてあるか |
|---|---|
| `CLAUDE.md` | 何のアプリか・どこに何があるか・業務の言葉・進め方4つ・やらないこと4つ |
| `.claude/rules/domain.md` | 時間・日付・金額の扱い |
| `.claude/rules/coding.md` | 書き方の規約 |
| `.claude/settings.json` | コミット・push・依存追加を実行できないようにする設定 |
| `.claude/commands/shirabe.md` | `/shirabe` 原因だけ調べる（直さない） |
| `.claude/commands/naosu.md` | `/naosu` テストを先に書いてから直す |
