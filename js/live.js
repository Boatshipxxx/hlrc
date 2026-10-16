/* ==========================================================
   RUN SPOT LIVE — ライブ配信風ブロック
   Open-Meteo（APIキー不要・無料）から各スポットの現在の気温・風向・風速・湿度を取得して
   映像の上に放送テロップ風に重ねる。
   ========================================================== */
(function () {
  'use strict';
  var spots = window.HLRC_SPOTS || [];
  var root = document.getElementById('live');
  if (!root || !spots.length) return;

  var tabs = root.querySelector('#liveTabs');
  var video = root.querySelector('#liveVideo');
  var noSignal = root.querySelector('#liveNoSignal');
  var el = {
    name: root.querySelector('#liveName'), nameEn: root.querySelector('#liveNameEn'), side: root.querySelector('#liveSide'),
    clock: root.querySelector('#liveClock'), temp: root.querySelector('#liveTemp'), feels: root.querySelector('#liveFeels'),
    wind: root.querySelector('#liveWind'), windDir: root.querySelector('#liveWindDir'), windArrow: root.querySelector('#liveWindArrow'),
    hum: root.querySelector('#liveHum'), rain: root.querySelector('#liveRain'), sky: root.querySelector('#liveSky'),
    sun: root.querySelector('#liveSun'), updated: root.querySelector('#liveUpdated'), verdict: root.querySelector('#liveVerdict')
  };

  var DIRS = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
  var DIRS_JP = ['北', '北北東', '北東', '東北東', '東', '東南東', '南東', '南南東', '南', '南南西', '南西', '西南西', '西', '西北西', '北西', '北北西'];
  function dir(deg) { return Math.round(deg / 22.5) % 16; }

  // WMO weather code → 短い表現
  function sky(code) {
    if (code === 0) return { jp: '快晴', en: 'CLEAR' };
    if (code <= 2) return { jp: '晴れ', en: 'SUNNY' };
    if (code === 3) return { jp: 'くもり', en: 'CLOUDY' };
    if (code <= 48) return { jp: '霧', en: 'FOG' };
    if (code <= 57) return { jp: '霧雨', en: 'DRIZZLE' };
    if (code <= 67) return { jp: '雨', en: 'RAIN' };
    if (code <= 77) return { jp: '雪', en: 'SNOW' };
    if (code <= 82) return { jp: 'にわか雨', en: 'SHOWERS' };
    if (code <= 86) return { jp: 'にわか雪', en: 'SNOW SHOWERS' };
    return { jp: '雷雨', en: 'THUNDER' };
  }

  // ランの一言判定（ゆるく）
  function verdict(c) {
    if (c.precipitation > 0.5 || c.weather_code >= 61) return { jp: '雨。DMで様子見。', en: 'RAIN. CHECK DM.' };
    if (c.wind_speed_10m >= 8) return { jp: '強風。向かい風を楽しむ日。', en: 'WINDY. EMBRACE IT.' };
    if (c.temperature_2m >= 30) return { jp: '暑い。水、持った？', en: 'HOT. BRING WATER.' };
    if (c.temperature_2m <= 5) return { jp: '寒い。走れば温まる。', en: 'COLD. RUN HOT.' };
    return { jp: '走ります。それだけ。', en: 'WE RUN. THAT\'S IT.' };
  }

  function pad(n) { return (n < 10 ? '0' : '') + n; }
  function tick() {
    var now = new Date();
    var jst = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Tokyo' }));
    if (el.clock) el.clock.textContent = pad(jst.getHours()) + ':' + pad(jst.getMinutes()) + ':' + pad(jst.getSeconds()) + ' JST';
  }
  setInterval(tick, 1000); tick();

  function render(spot, data) {
    var c = data && data.current;
    el.name.textContent = spot.name; el.nameEn.textContent = spot.nameEn; el.side.textContent = spot.side;
    if (!c) {
      ['temp', 'feels', 'wind', 'hum', 'rain'].forEach(function (k) { el[k].textContent = '--'; });
      el.windDir.textContent = '--'; el.sky.textContent = 'NO DATA'; el.sun.textContent = '--';
      el.updated.textContent = 'OFFLINE'; el.verdict.textContent = '走ります。それだけ。';
      el.windArrow.style.transform = 'rotate(0deg)';
      return;
    }
    var d = dir(c.wind_direction_10m);
    el.temp.textContent = Math.round(c.temperature_2m);
    el.feels.textContent = Math.round(c.apparent_temperature);
    el.wind.textContent = c.wind_speed_10m.toFixed(1);
    el.windDir.textContent = DIRS[d] + ' ' + DIRS_JP[d];
    el.windArrow.style.transform = 'rotate(' + (c.wind_direction_10m + 180) + 'deg)'; // 風の吹いていく向き
    el.hum.textContent = Math.round(c.relative_humidity_2m);
    el.rain.textContent = c.precipitation.toFixed(1);
    var s = sky(c.weather_code); el.sky.textContent = s.en + ' / ' + s.jp;
    if (data.daily && data.daily.sunrise) {
      el.sun.textContent = data.daily.sunrise[0].slice(11, 16) + ' / ' + data.daily.sunset[0].slice(11, 16);
    }
    el.updated.textContent = 'UPDATED ' + (c.time || '').replace('T', ' ');
    var v = verdict(c); el.verdict.textContent = v.jp + ' / ' + v.en;
  }

  function load(spot) {
    var url = 'https://api.open-meteo.com/v1/forecast?latitude=' + spot.lat + '&longitude=' + spot.lon +
      '&current=temperature_2m,apparent_temperature,relative_humidity_2m,wind_speed_10m,wind_direction_10m,precipitation,weather_code' +
      '&daily=sunrise,sunset&timezone=Asia%2FTokyo&wind_speed_unit=ms&forecast_days=1';
    root.classList.add('is-loading');
    fetch(url).then(function (r) { return r.json(); })
      .then(function (data) { render(spot, data); })
      .catch(function () { render(spot, null); })
      .then(function () { root.classList.remove('is-loading'); });
  }

  function setVideo(spot) {
    if (spot.video) {
      video.src = spot.video; if (spot.poster) video.poster = spot.poster;
      video.hidden = false; noSignal.hidden = true;
      video.play().catch(function () {});
    } else {
      video.pause(); video.removeAttribute('src'); video.hidden = true; noSignal.hidden = false;
    }
  }

  function select(id) {
    var spot = spots.filter(function (s) { return s.id === id; })[0] || spots[0];
    tabs.querySelectorAll('button').forEach(function (b) {
      var on = b.dataset.id === spot.id;
      b.classList.toggle('is-active', on); b.setAttribute('aria-selected', on ? 'true' : 'false');
    });
    setVideo(spot); load(spot);
  }

  tabs.innerHTML = spots.map(function (s) {
    return '<button type="button" role="tab" data-id="' + s.id + '" aria-selected="false">' + s.name + '<small>' + s.side + '</small></button>';
  }).join('');
  tabs.addEventListener('click', function (e) {
    var b = e.target.closest('button'); if (b) select(b.dataset.id);
  });
  select(spots[0].id);
  setInterval(function () { var b = tabs.querySelector('.is-active'); if (b) load(spots.filter(function (s) { return s.id === b.dataset.id; })[0]); }, 10 * 60 * 1000);
})();
