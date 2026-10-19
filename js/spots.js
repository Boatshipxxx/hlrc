// ライブ配信風ブロックに表示するスポット。先頭（半蔵門）が初期表示。
// group: タブの区切り（同じ group は「/」なしで並ぶ）。side: 城東 / 城南 のラベル。
// video: スポットごとの動画URL（mp4 / webm）。未設定なら「NO SIGNAL」表示になります。
window.HLRC_SPOTS = [
  { id: 'hanzomon', name: '半蔵門',   nameEn: 'HANZOMON',     side: 'JOTO',  group: 'east', lat: 35.6855, lon: 139.7415, video: '', poster: '' },
  { id: 'suitengu', name: '水天宮',   nameEn: 'SUITENGU',     side: 'JOTO',  group: 'east', lat: 35.6826, lon: 139.7850, video: '', poster: '' },
  { id: 'oshiage',  name: '押上',     nameEn: 'OSHIAGE',      side: 'JOTO',  group: 'east', lat: 35.7103, lon: 139.8131, video: '', poster: '' },
  { id: 'komazawa', name: '駒沢',     nameEn: 'KOMAZAWA',     side: 'JONAN', group: 'west', lat: 35.6262, lon: 139.6618, video: '', poster: '' },
  { id: 'meiji',    name: '明治公園', nameEn: 'MEIJI PARK',   side: 'JONAN', group: 'west', lat: 35.6786, lon: 139.7149, video: '', poster: '' },
];
