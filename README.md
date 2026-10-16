# HLRC — Hanzomon Line Run Club LP

半蔵門線ランクラブ（HLRC）のランディングページ。
ビルド不要の静的サイト。`index.html` を開くだけで表示でき、Vercel / GitHub Pages にそのままデプロイできます。

## 構成

```
.
├── index.html        # ページ本体（日英バイリンガル）
├── css/style.css     # 90年代ジン／ゼロックス質感のスタイル。色は :root で変更
├── js/config.js      # Instagram URL（全CTAに反映）
├── js/schedule.js    # 今月の予定データ（毎月ここだけ更新）
├── js/main.js        # スケジュール描画・ティッカー・リンク設定
├── assets/           # favicon / OGP画像
└── vercel.json
```

## 毎月の更新

`js/schedule.js` の `runs` 配列を書き換えるだけでスケジュール欄が更新されます。

```js
{ date: '11.04', day: '火', dayEn: 'TUE', type: 'morning', time: '6:30', place: '駒沢', placeEn: 'Komazawa Park', note: '' }
```

- `type`: `morning`（朝・黄色）/ `night`（夜・ネイビー）/ `special`（対抗戦・遠征など）
- `note`: コーヒー中継点などの補足（例: `JOGLIS`, `ととけん`）

## 初回に設定するもの

- [ ] `js/config.js` の `instagramUrl` を HLRC のアカウントに変更
- [ ] `assets/og.png`（1200×630）を用意。Instagram で告知したときのシェア画像になります
- [ ] 城東側の集合地・コーヒー中継点が決まったら `index.html` の「JOTO / 城東」カードと路線図（錦糸町・押上）を更新
- [ ] ヒーローの写真枠（`.photo--hero`）を実際の写真に差し替え

## ローカル確認

```bash
python3 -m http.server 8000
# → http://localhost:8000
```

## デプロイ

- **Vercel**: リポジトリを連携するだけ。ビルドコマンド不要、出力ディレクトリは `/`
- **GitHub Pages**: Settings → Pages → Branch を `main` / root に設定
