(function () {
  'use strict';
  var cfg = window.HLRC_CONFIG || {};
  var data = window.HLRC_SCHEDULE || { runs: [] };

  // Instagram リンクを一括設定
  if (cfg.instagramUrl) {
    document.querySelectorAll('.js-ig').forEach(function (a) {
      a.href = cfg.instagramUrl;
      a.target = '_blank';
      a.rel = 'noopener';
    });
  }

  // 年号
  var y = document.getElementById('year');
  if (y) y.textContent = String(new Date().getFullYear());

  // ティッカーを2周分に複製してループ
  var ticker = document.getElementById('ticker');
  if (ticker) ticker.innerHTML += ticker.innerHTML;

  // スケジュール描画
  var list = document.getElementById('schedule-list');
  var title = document.getElementById('scheduleTitle');
  if (title && data.month) title.textContent = data.month + 'の予定 / ' + (data.monthEn || '');
  if (list) {
    var icons = {
      morning: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg>',
      night: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>',
      special: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 2l2.9 6.3 6.9.8-5.1 4.7 1.4 6.8L12 17.3 5.9 20.6l1.4-6.8L2.2 9.1l6.9-.8z"/></svg>'
    };
    var labels = { morning: '朝', night: '夜', special: '特別' };
    list.innerHTML = data.runs.map(function (r) {
      return (
        '<li class="sched__row sched__row--' + r.type + '">' +
          '<div class="sched__date"><span class="sched__num">' + r.date + '</span><span class="sched__day">（' + r.day + '）<em>' + r.dayEn + '</em></span></div>' +
          '<div class="sched__info">' +
            '<span class="pill pill--' + r.type + '">' + icons[r.type] + labels[r.type] + ' ' + r.time + '</span>' +
            '<div class="sched__place"><strong>' + r.place + '</strong>' +
              (r.note ? '<span class="sched__note">' + r.note + '</span>' : '') +
              '<small class="mono">' + r.placeEn + '</small></div>' +
          '</div>' +
        '</li>'
      );
    }).join('');
    if (!data.runs.length) list.innerHTML = '<li class="sched__empty mono">COMING SOON — 次回はInstagramで告知します</li>';
  }
})();
