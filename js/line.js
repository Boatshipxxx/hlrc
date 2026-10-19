// THE LINE — 路線図のデータ。
// regular: true にすると「定期開催」マークが付きます（集合地が決まったらここを切り替えるだけ）。
// note: 集合地やコーヒー中継点などの補足。tbd: true は拠点調整中。
window.HLRC_LINE = {
  stations: [
    { name: '駒沢大学', en: 'KOMAZAWA-DAIGAKU', side: 'JONAN', regular: true,  note: '駒沢公園 トレセン前' },
    { name: '渋谷',     en: 'SHIBUYA',          side: 'JONAN', regular: false, note: '' },
    { name: '表参道',   en: 'OMOTESANDO',       side: 'JONAN', regular: false, note: '' },
    { name: '青山一丁目', en: 'AOYAMA-ITCHOME', side: 'JONAN', regular: false, note: '→ 明治公園' },
    { name: '永田町',   en: 'NAGATACHO',        side: 'JONAN', regular: false, note: '' },
    { name: '半蔵門',   en: 'HANZOMON',         side: 'JOTO',  regular: true,  note: 'JOGLIS' },
    { name: '九段下',   en: 'KUDANSHITA',       side: 'JOTO',  regular: false, note: '' },
    { name: '神保町',   en: 'JIMBOCHO',         side: 'JOTO',  regular: false, note: '' },
    { name: '大手町',   en: 'OTEMACHI',         side: 'JOTO',  regular: false, note: '' },
    { name: '三越前',   en: 'MITSUKOSHIMAE',    side: 'JOTO',  regular: false, note: '' },
    { name: '水天宮前', en: 'SUITENGUMAE',      side: 'JOTO',  regular: true,  note: 'ととけん' },
    { name: '清澄白河', en: 'KIYOSUMI-SHIRAKAWA', side: 'JOTO', regular: false, note: '' },
    { name: '住吉',     en: 'SUMIYOSHI',        side: 'JOTO',  regular: false, note: '' },
    { name: '錦糸町',   en: 'KINSHICHO',        side: 'JOTO',  regular: false, note: '', tbd: true },
    { name: '押上',     en: 'OSHIAGE',          side: 'JOTO',  regular: false, note: '', tbd: true },
  ],
};

(function () {
  'use strict';
  var root = document.getElementById('linemap');
  var data = window.HLRC_LINE;
  if (!root || !data) return;
  root.innerHTML = data.stations.map(function (s) {
    var cls = 'lm__st' + (s.regular ? ' is-regular' : '') + (s.tbd ? ' is-tbd' : '');
    return '<li class="' + cls + '">' +
      '<i></i>' +
      '<div class="lm__body">' +
        '<span class="lm__name">' + s.name + '</span>' +
        '<span class="lm__en mono">' + s.en + '</span>' +
        (s.regular ? '<span class="lm__badge mono">定期 REGULAR</span>' : '') +
        (s.tbd ? '<span class="lm__badge lm__badge--tbd mono">TBD</span>' : '') +
        (s.note ? '<span class="lm__note mono">' + s.note + '</span>' : '') +
      '</div>' +
    '</li>';
  }).join('');
})();
