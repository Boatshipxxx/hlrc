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
├── js/spots.js       # RUN SPOT LIVE のスポット（緯度経度・動画URL）
├── js/live.js        # ライブ配信風ブロック（Open-Meteo から気温・風向などを取得）
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

## RUN SPOT LIVE（ライブ配信風ブロック）

各スポットの映像の上に、現在の気温・体感・風向風速・湿度・降水・空模様・日の出日の入りを放送テロップ風に重ねます。
天気データは [Open-Meteo](https://open-meteo.com/)（無料・APIキー不要・商用可）からブラウザが直接取得し、10分ごとに更新します。

- スポットの追加・変更: `js/spots.js`
- 映像: `js/spots.js` の `video` にスポットごとの mp4 / webm の URL を入れると自動再生（ミュート・ループ）。未設定の間は「NO SIGNAL」画面
- 一言コメントの判定ルール（雨・強風・暑さ・寒さ）: `js/live.js` の `verdict()`

## 初回に設定するもの

- [x] `js/config.js` の `instagramUrl` を HLRC のアカウント（@hlrc.tokyo）に設定済み
- [ ] `assets/og.png`（1200×630）を用意。Instagram で告知したときのシェア画像になります
- [ ] 城東側の集合地・コーヒー中継点が決まったら `index.html` の「JOTO / 城東」カードと路線図（錦糸町・押上）を更新
- [ ] `js/spots.js` の `video` に各スポットの短い動画（固定カメラ・ループ向き）を設定
- [ ] ヒーローの写真枠（`.photo--hero`）を実際の写真に差し替え

## ローカル確認

```bash
python3 -m http.server 8000
# → http://localhost:8000
```

## デプロイ

- **Vercel**: リポジトリを連携するだけ。ビルドコマンド不要、出力ディレクトリは `/`
- **GitHub Pages**: Settings → Pages → Branch を `main` / root に設定
