(function () {
  'use strict';
  var D = window.SITE_DATA;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var root = document.documentElement;

  if (!D || !Array.isArray(D.works)) {
    $('#totalNum').textContent = '0';
    $('#grid').innerHTML = '<p class="empty">没有读到数据：请确认 ../../starter/data.js 能加载。</p>';
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

  var total = works.length;
  var countByChar = {};
  var countByCat = {};
  works.forEach(function (w) {
    countByChar[w.characterId] = (countByChar[w.characterId] || 0) + 1;
    (w.categoryIds || []).forEach(function (id) { countByCat[id] = (countByCat[id] || 0) + 1; });
  });
  var charsWithWorks = chars.filter(function (c) { return countByChar[c.id]; }).sort(function (a, b) {
    return countByChar[b.id] - countByChar[a.id];
  });

  var state = { char: 'all', cat: 'all', q: '', limit: 24 };
  var grid = $('#grid');
  var empty = $('#empty');
  var loadMore = $('#loadMore');
  var searchInput = $('#searchInput');
  var modal = $('#modal');
  var lastFocus = null;

  if (window.matchMedia && window.matchMedia('(max-width: 760px)').matches) {
    searchInput.placeholder = '搜作品、角色或 Tag';
  }

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
    updateStamp();
    if (persist) {
      try { localStorage.setItem('tidal-theme', theme); } catch (e) { /* storage may be unavailable */ }
    }
  }
  function updateStamp() {
    var stamp = $('#tideStamp');
    if (!stamp) return;
    var night = root.getAttribute('data-theme') === 'night';
    stamp.textContent = (night ? 'HIGH TIDE' : 'LOW TIDE') + ' · ' + total + ' ENTRIES';
  }
  applyTheme(root.getAttribute('data-theme') === 'night' ? 'night' : 'day', false);
  $('#themeToggle').addEventListener('click', function () {
    var next = root.getAttribute('data-theme') === 'night' ? 'day' : 'night';
    applyTheme(next, true);
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
  function feed(btn) {
    tokenCount += 1;
    try { localStorage.setItem('tidal-tokens', String(tokenCount)); } catch (e) { /* ignore */ }
    renderTokens();
    if (btn) {
      btn.classList.remove('bump');
      void btn.offsetWidth;
      btn.classList.add('bump');
    }
    spawnCoin(btn);
    toast('投喂成功 · 小鲸鱼吃到了第 ' + tokenCount + ' 枚 token');
    randomWork();
  }
  $('#feedBtn').addEventListener('click', function () { feed(this); });
  $('#feedHero').addEventListener('click', function () { feed($('#feedBtn')); });

  /* ---------- hero ---------- */
  $('#totalNum').textContent = total.toLocaleString('zh-CN');
  updateStamp();

  (function heroCollage() {
    var picks = [];
    ['deepseek', 'claude', 'gpt'].forEach(function (id) {
      var found = works.find(function (w) { return w.characterId === id; });
      if (found) picks.push(found);
    });
    works.forEach(function (w) {
      if (picks.length < 3 && picks.indexOf(w) === -1) picks.push(w);
    });
    $$('.float-card img').forEach(function (img, i) {
      if (!picks[i]) return;
      img.src = picks[i].thumb;
      img.alt = picks[i].name;
    });
  })();

  (function latest() {
    var list = works.slice(0, 6);
    $('#latestDesc').textContent = '最新被捞进档案的 ' + list.length + ' 件，按收录时间排序。';
    $('#latestRow').innerHTML = list.map(cardHTML).join('');
  })();

  (function chips() {
    var charBox = $('#charChips');
    var catBox = $('#catFilters');
    var html = '<button class="chip" type="button" data-char="all" aria-pressed="true">' +
      '<span class="dot" style="--c:var(--bright)"></span>全部</button>';
    html += charsWithWorks.map(function (c) {
      return '<button class="chip" type="button" data-char="' + esc(c.id) + '" aria-pressed="false">' +
        '<span class="dot" style="--c:' + c.colorSoft + '"></span>' + esc(c.name) + '</button>';
    }).join('');
    charBox.insertAdjacentHTML('beforeend', html);

    var catHtml = '<button class="chip" type="button" data-cat="all" aria-pressed="true">全部<span class="n">' + total + '</span></button>';
    catHtml += cats.map(function (c) {
      return '<button class="chip" type="button" data-cat="' + esc(c.id) + '" aria-pressed="false">' +
        esc(c.name) + '<span class="n">' + (countByCat[c.id] || 0) + '</span></button>';
    }).join('');
    catBox.insertAdjacentHTML('beforeend', catHtml);
  })();

  (function characterCards() {
    $('#charGrid').innerHTML = charsWithWorks.map(function (c) {
      var aliases = (c.aliases || []).slice(0, 2).join(' / ');
      return '<button class="char-card" type="button" data-char="' + esc(c.id) + '" style="--deep:' + c.colorDeep + ';--soft:' + c.colorSoft + '">' +
        '<svg class="char-watermark" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M2.2 12.6c2.5-4.3 6.3-6.4 10.7-6.4 2.6 0 4.8.9 6.8 2.5l2.4-1.4-.4 3 .9 1.9-2.7.7c-1.7 2.8-4.5 4.3-8.3 4.3-4 0-7.2-1.7-9.4-4.6Z"/></svg>' +
        '<p class="char-name">' + esc(c.name) + '</p>' +
        '<p class="char-alias">' + esc(aliases || '杂项档案') + '</p>' +
        '<p class="char-count">' + countByChar[c.id] + ' 件作品 →</p>' +
        '</button>';
    }).join('');
  })();

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

  function match(w) {
    if (state.char !== 'all' && w.characterId !== state.char) return false;
    if (state.cat !== 'all' && (w.categoryIds || []).indexOf(state.cat) === -1) return false;
    var q = state.q.trim().toLowerCase();
    if (!q) return true;
    var c = charOf(w);
    var parts = [w.name, w.description, w.commentary].concat(w.tags || [], c ? [c.name].concat(c.aliases || []) : [], (w.categoryIds || []).map(catName));
    return parts.join(' ').toLowerCase().indexOf(q) !== -1;
  }

  function render() {
    var list = works.filter(match);
    grid.innerHTML = list.slice(0, state.limit).map(cardHTML).join('');
    $('#gridCount').textContent = '共 ' + list.length + ' 件';
    var q = state.q.trim();
    var searchState = $('#searchState');
    searchState.hidden = !q;
    if (q) $('#searchStateText').textContent = '搜索「' + q + '」 · ' + list.length + ' 件';
    empty.hidden = list.length > 0;
    loadMore.hidden = list.length <= state.limit;
    $$('#charChips .chip').forEach(function (b) { b.setAttribute('aria-pressed', String(b.dataset.char === state.char)); });
    $$('#catFilters .chip').forEach(function (b) { b.setAttribute('aria-pressed', String(b.dataset.cat === state.cat)); });
  }

  function setChar(id, scroll) {
    state.char = id;
    state.limit = 24;
    render();
    var chip = document.querySelector('#charChips .chip[data-char="' + id + '"]');
    if (chip && chip.scrollIntoView) chip.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    if (scroll) document.getElementById('archive').scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
  function setCat(id) {
    state.cat = id;
    state.limit = 24;
    render();
  }

  $('#charChips').addEventListener('click', function (e) {
    var b = e.target.closest('.chip');
    if (b && b.dataset.char) setChar(b.dataset.char, false);
  });
  $('#catFilters').addEventListener('click', function (e) {
    var b = e.target.closest('.chip');
    if (b && b.dataset.cat) setCat(b.dataset.cat);
  });
  $('#charGrid').addEventListener('click', function (e) {
    var b = e.target.closest('.char-card');
    if (b) window.location.href = './characters.html?c=' + encodeURIComponent(b.dataset.char);
  });

  var timer = null;
  searchInput.addEventListener('input', function () {
    clearTimeout(timer);
    timer = setTimeout(function () {
      state.q = searchInput.value;
      state.limit = 24;
      render();
    }, 120);
  });
  $('#searchForm').addEventListener('submit', function (e) {
    e.preventDefault();
    state.q = searchInput.value;
    state.limit = 24;
    render();
    document.getElementById('archive').scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
  $('.hot-tags').addEventListener('click', function (e) {
    var b = e.target.closest('button[data-q]');
    if (!b) return;
    searchInput.value = b.dataset.q;
    state.q = b.dataset.q;
    state.limit = 24;
    render();
    document.getElementById('archive').scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
  loadMore.addEventListener('click', function () {
    state.limit += 24;
    render();
  });
  $('#clearSearch').addEventListener('click', function () {
    searchInput.value = '';
    state.q = '';
    state.limit = 24;
    render();
    searchInput.focus();
  });

  /* ---------- fish quote ---------- */
  var quoteWorks = works.filter(function (w) { return w.commentary && w.commentary.trim().length > 8; });
  var currentQuote = null;
  var quoteTimer = null;
  function setQuote() {
    var box = $('#fishQuote');
    if (!quoteWorks.length) { box.hidden = true; return; }
    var w;
    do { w = quoteWorks[Math.floor(Math.random() * quoteWorks.length)]; }
    while (quoteWorks.length > 1 && w === currentQuote);
    currentQuote = w;
    var text = w.commentary.trim();
    if (text.length > 84) text = text.slice(0, 84) + '…';
    $('#fishQuoteText').textContent = text;
  }
  function startQuoteTimer() {
    clearInterval(quoteTimer);
    quoteTimer = setInterval(setQuote, 9000);
  }
  setQuote();
  startQuoteTimer();
  $('#fishQuote').addEventListener('pointerenter', function () { clearInterval(quoteTimer); });
  $('#fishQuote').addEventListener('pointerleave', startQuoteTimer);
  $('#fishQuote').addEventListener('click', function () {
    if (currentQuote) openWork(currentQuote.slug);
  });

  /* ---------- parallax ---------- */
  (function parallax() {
    var art = $('.hero-art');
    if (!art || (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches)) return;
    var cards = $$('.float-card');
    art.addEventListener('pointermove', function (e) {
      var r = art.getBoundingClientRect();
      var x = (e.clientX - r.left) / r.width - 0.5;
      var y = (e.clientY - r.top) / r.height - 0.5;
      cards.forEach(function (card, i) {
        card.style.translate = (x * (10 + i * 4)).toFixed(1) + 'px ' + (y * (8 + i * 3)).toFixed(1) + 'px';
      });
    });
    art.addEventListener('pointerleave', function () {
      cards.forEach(function (card) { card.style.translate = ''; });
    });
  })();

  /* ---------- modal ---------- */
  function randomWork() {
    var list = works.filter(match);
    if (!list.length) list = works;
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
    if (e.key === '/' && modal.hidden && document.activeElement !== searchInput) {
      e.preventDefault();
      searchInput.focus();
      return;
    }
    if ((e.key === 'Enter' || e.key === ' ') && document.activeElement && document.activeElement.matches('.card[data-slug]')) {
      e.preventDefault();
      openWork(document.activeElement.dataset.slug);
    }
  });

  document.getElementById('aboutLine').textContent = total + ' 件作品，就是 ' + total + ' 次「有人记得你」。';
  render();
})();
