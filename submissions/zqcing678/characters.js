(function () {
  'use strict';
  var D = window.SITE_DATA;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var root = document.documentElement;

  if (!D || !Array.isArray(D.works)) {
    $('#cGrid').innerHTML = '<p class="empty">没有读到数据：请确认 ../../starter/data.js 能加载。</p>';
    return;
  }

  var works = D.works.slice().sort(function (a, b) {
    return (Date.parse(b.createdAt) || 0) - (Date.parse(a.createdAt) || 0);
  });
  var chars = D.characters || [];
  var cats = D.categories || [];
  var charMap = {};
  var catMap = {};
  chars.forEach(function (c) { charMap[c.id] = c; });
  cats.forEach(function (c) { catMap[c.id] = c; });

  var countByChar = {};
  works.forEach(function (w) { countByChar[w.characterId] = (countByChar[w.characterId] || 0) + 1; });
  var charsWithWorks = chars.filter(function (c) { return countByChar[c.id]; }).sort(function (a, b) {
    return countByChar[b.id] - countByChar[a.id];
  });

  var state = { id: '', cat: 'all', limit: 18 };
  var current = null;
  var curWorks = [];
  var curCatCounts = {};
  var grid = $('#cGrid');
  var rail = $('#cRail');
  var modal = $('#modal');
  var lastFocus = null;

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (m) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m];
    });
  }
  function fmtDate(value) {
    var d = new Date(value);
    if (isNaN(d.getTime())) return '';
    var p = function (n) { return (n < 10 ? '0' : '') + n; };
    return d.getFullYear() + '.' + p(d.getMonth() + 1) + '.' + p(d.getDate());
  }
  function catName(id) { return catMap[id] ? catMap[id].name : id; }
  function catOf(w) { return (w.categoryIds && w.categoryIds[0]) || ''; }
  function charOf(w) { return charMap[w.characterId] || null; }

  /* ---------- theme ---------- */
  function applyTheme(theme, persist) {
    root.setAttribute('data-theme', theme);
    var night = theme === 'night';
    var btn = $('#themeToggle');
    if (btn) {
      btn.setAttribute('aria-pressed', String(night));
      $('#tideLabel').textContent = night ? '深潜' : '浅滩';
    }
    var meta = $('#themeColor');
    if (meta) meta.setAttribute('content', night ? '#040b14' : '#f6fbfe');
    if (persist) {
      try { localStorage.setItem('tidal-theme', theme); } catch (e) { /* storage may be unavailable */ }
    }
  }
  applyTheme(root.getAttribute('data-theme') === 'night' ? 'night' : 'day', false);
  $('#themeToggle').addEventListener('click', function () {
    applyTheme(root.getAttribute('data-theme') === 'night' ? 'day' : 'night', true);
  });

  /* ---------- tokens ---------- */
  var tokenCount = 0;
  try { tokenCount = parseInt(localStorage.getItem('tidal-tokens') || '0', 10) || 0; } catch (e) { tokenCount = 0; }
  function renderTokens() {
    var el = $('#tokenCount');
    if (el) el.textContent = String(tokenCount);
  }
  renderTokens();

  var toastTimer = null;
  function toast(message) {
    var el = $('#toast');
    if (!el) return;
    el.textContent = message;
    el.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { el.classList.remove('show'); }, 2200);
  }
  function spawnCoin(btn) {
    if (!btn) return;
    var r = btn.getBoundingClientRect();
    var coin = document.createElement('span');
    coin.className = 'coin-pop';
    coin.style.left = (r.left + r.width / 2 - 8) + 'px';
    coin.style.top = (r.top + r.height / 2 - 8) + 'px';
    document.body.appendChild(coin);
    setTimeout(function () { coin.remove(); }, 1000);
  }
  function feed() {
    tokenCount += 1;
    try { localStorage.setItem('tidal-tokens', String(tokenCount)); } catch (e) { /* ignore */ }
    renderTokens();
    var btn = $('#feedBtn');
    if (btn) {
      btn.classList.remove('bump');
      void btn.offsetWidth;
      btn.classList.add('bump');
    }
    spawnCoin(btn);
    var who = current ? current.name : '小鲸鱼';
    toast('投喂成功 · ' + who + ' 吃到了第 ' + tokenCount + ' 枚 token');
    randomWork();
  }
  $('#feedBtn').addEventListener('click', feed);

  /* ---------- rail ---------- */
  rail.innerHTML = charsWithWorks.map(function (c) {
    return '<a class="c-rail-item" href="./characters.html?c=' + encodeURIComponent(c.id) + '" data-id="' + esc(c.id) +
      '" style="--c:' + c.colorSoft + '">' +
      '<span class="c-rail-dot"></span>' +
      '<span class="c-rail-name">' + esc(c.name) + '</span>' +
      '<span class="c-rail-count">' + countByChar[c.id] + '</span></a>';
  }).join('');

  rail.addEventListener('click', function (e) {
    var a = e.target.closest('.c-rail-item');
    if (!a) return;
    e.preventDefault();
    select(a.dataset.id, true);
  });

  function updateUrl(id) {
    try {
      var u = new URL(location.href);
      u.searchParams.set('c', id);
      history.replaceState(null, '', u.pathname + u.search);
    } catch (e) { /* file:// or blocked history is fine */ }
  }

  function select(id, scroll) {
    if (!charMap[id] || !countByChar[id]) {
      id = charsWithWorks[0] ? charsWithWorks[0].id : '';
    }
    if (!id) return;
    current = charMap[id];
    state.id = id;
    state.cat = 'all';
    state.limit = 18;
    curWorks = works.filter(function (w) { return w.characterId === id; });
    curCatCounts = {};
    curWorks.forEach(function (w) {
      (w.categoryIds || []).forEach(function (c) { curCatCounts[c] = (curCatCounts[c] || 0) + 1; });
    });

    renderHero();
    renderCats();
    renderGrid();
    $$('.c-rail-item').forEach(function (a) {
      a.setAttribute('aria-current', String(a.dataset.id === id));
    });
    document.title = current.name + ' · 角色档案 · 潮汐档案馆';
    updateUrl(id);
    if (scroll) $('#cHero').scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function renderHero() {
    var hero = $('#cHero');
    hero.style.setProperty('--c', current.colorSoft);
    hero.style.setProperty('--deep', current.colorDeep);

    $('#cName').textContent = current.name;
    $('#cAlias').textContent = (current.aliases || []).join(' / ') || 'AI 娘';
    var latest = curWorks[0];
    var latestDate = latest ? fmtDate(latest.createdAt) : '';
    $('#cStats').textContent = curWorks.length + ' 件作品 · ' + Object.keys(curCatCounts).length + ' 种类型 · 最近 ' + latestDate;

    var cover = curWorks.find(function (w) { return (w.categoryIds || []).indexOf('illustration') > -1; }) || curWorks[0];
    var img = $('#cCover');
    img.onerror = null;
    img.src = (cover && (cover.large || cover.thumb)) || '';
    img.alt = cover ? cover.name : current.name;
    img.onerror = function () {
      img.onerror = null;
      if (cover && img.src !== cover.thumb) img.src = cover.thumb;
    };
    $('#cCoverCap').textContent = cover ? '封面：' + cover.name : '';

    var tagCount = {};
    curWorks.forEach(function (w) {
      (w.tags || []).forEach(function (t) { tagCount[t] = (tagCount[t] || 0) + 1; });
    });
    var topTags = Object.keys(tagCount).sort(function (a, b) { return tagCount[b] - tagCount[a]; }).slice(0, 8);
    $('#cTags').innerHTML = topTags.map(function (t) { return '<span class="c-tag">' + esc(t) + '</span>'; }).join('');

    var quotable = curWorks.filter(function (w) { return w.commentary && w.commentary.trim().length > 8; });
    var quote = $('#cQuote');
    if (quotable.length) {
      quote.hidden = false;
      quote.querySelector('p').textContent = quotable[Math.floor(Math.random() * quotable.length)].commentary;
    } else {
      quote.hidden = true;
    }
  }

  function renderCats() {
    var box = $('#cCatFilters');
    var html = '<button class="chip" type="button" data-cat="all" aria-pressed="' + (state.cat === 'all') + '">全部<span class="n">' + curWorks.length + '</span></button>';
    html += cats.filter(function (c) { return curCatCounts[c.id]; }).map(function (c) {
      return '<button class="chip" type="button" data-cat="' + esc(c.id) + '" aria-pressed="' + (state.cat === c.id) + '">' +
        esc(c.name) + '<span class="n">' + curCatCounts[c.id] + '</span></button>';
    }).join('');
    box.innerHTML = '<span class="filter-label">类型</span>' + html;
  }

  function cardHTML(w) {
    var c = charOf(w);
    var color = c ? c.colorSoft : 'var(--bright)';
    return '<article class="card" role="button" tabindex="0" data-slug="' + esc(w.slug) + '" style="--c:' + color + '" aria-label="' + esc(w.name) + '">' +
      '<div class="card-media"><span class="kind">' + esc(catName(catOf(w))) + '</span>' +
      '<img loading="lazy" decoding="async" src="' + esc(w.thumb) + '" alt="' + esc(w.name) + '"></div>' +
      '<div class="card-body"><h3 class="card-title">' + esc(w.name) + '</h3>' +
      '<p class="card-meta"><span class="dot"></span><span class="char">' + esc(c ? c.name : '') + '</span>' +
      '<span class="date">' + fmtDate(w.createdAt) + '</span></p></div></article>';
  }

  function visibleWorks() {
    if (state.cat === 'all') return curWorks;
    return curWorks.filter(function (w) { return (w.categoryIds || []).indexOf(state.cat) > -1; });
  }

  function renderGrid() {
    var list = visibleWorks();
    grid.innerHTML = list.slice(0, state.limit).map(cardHTML).join('');
    $('#cEmpty').hidden = list.length > 0;
    $('#cMore').hidden = list.length <= state.limit;
  }

  $('#cCatFilters').addEventListener('click', function (e) {
    var b = e.target.closest('.chip');
    if (!b || !b.dataset.cat) return;
    state.cat = b.dataset.cat;
    state.limit = 18;
    $$('#cCatFilters .chip').forEach(function (x) { x.setAttribute('aria-pressed', String(x.dataset.cat === state.cat)); });
    renderGrid();
  });

  $('#cMore').addEventListener('click', function () {
    state.limit += 18;
    renderGrid();
  });

  /* ---------- modal ---------- */
  function randomWork() {
    var list = curWorks.length ? curWorks : works;
    openWork(list[Math.floor(Math.random() * list.length)].slug);
  }

  function openWork(slug) {
    var w = works.find(function (x) { return x.slug === slug; });
    if (!w) return;
    var c = charOf(w);
    lastFocus = document.activeElement;
    $('#modalChar').textContent = c ? c.name : '未知角色';
    $('#modalChar').style.setProperty('--c', c ? c.colorSoft : 'var(--bright)');
    $('#modalKind').textContent = catName(catOf(w));
    $('#modalDate').textContent = fmtDate(w.createdAt);
    $('#modalTitle').textContent = w.name;
    $('#modalDesc').textContent = w.description || '';
    var cm = $('#modalCommentary');
    if (w.commentary) {
      cm.hidden = false;
      cm.querySelector('p').textContent = w.commentary;
    } else {
      cm.hidden = true;
    }
    $('#modalTags').innerHTML = (w.tags || []).slice(0, 8).map(function (t) { return '<span class="tag">' + esc(t) + '</span>'; }).join('');
    var img = $('#modalImg');
    img.onerror = null;
    img.src = w.large || w.thumb;
    img.alt = w.name;
    img.onerror = function () { img.onerror = null; if (img.src !== w.thumb) img.src = w.thumb; };
    $('#modalOriginal').href = w.original || w.thumb;
    $('#modalPage').href = w.page || '#';
    modal.hidden = false;
    document.body.classList.add('locked');
    $('.modal-close').focus();
  }
  function closeModal() {
    modal.hidden = true;
    document.body.classList.remove('locked');
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }
  modal.addEventListener('click', function (e) {
    if (e.target.closest('[data-close]')) closeModal();
  });
  document.addEventListener('click', function (e) {
    var card = e.target.closest('.card[data-slug]');
    if (card) openWork(card.dataset.slug);
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !modal.hidden) { closeModal(); return; }
    if ((e.key === 'Enter' || e.key === ' ') && document.activeElement && document.activeElement.matches('.card[data-slug]')) {
      e.preventDefault();
      openWork(document.activeElement.dataset.slug);
    }
  });

  /* ---------- boot ---------- */
  var m = /[?&]c=([^&#]+)/.exec(location.search);
  var initial = m ? decodeURIComponent(m[1]) : '';
  if (!charMap[initial] || !countByChar[initial]) {
    initial = charsWithWorks[0] ? charsWithWorks[0].id : '';
  }
  if (initial) select(initial, false);
})();
