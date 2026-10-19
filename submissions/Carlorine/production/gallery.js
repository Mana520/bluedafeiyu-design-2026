/* Browser-local collections, shared by the feed, search and work viewer. */
(function () {
  'use strict';
  var KEY = 'bluedafeiyu-favorites-v1';
  var T = function (key, zh, vars) { return window.SiteLang ? window.SiteLang.fmt(key, zh, vars) : zh; };
  var esc = function (s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); };
  var heart = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z"/></svg>';
  var read = function () {
    try { var value = JSON.parse(localStorage.getItem(KEY) || '[]'); return Array.isArray(value) ? value.filter(function (slug) { return typeof slug === 'string' && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug); }) : []; }
    catch (e) { return []; }
  };
  var saved = new Set(read()), toastTimer, data = null;
  var feed = document.getElementById('saved-feed'), empty = document.getElementById('saved-empty'), error = document.getElementById('saved-error');
  function toast(message) {
    var box = document.querySelector('.gallery-toast'); if (!box) return;
    clearTimeout(toastTimer); box.textContent = message; box.hidden = false;
    toastTimer = setTimeout(function () { box.hidden = true; }, 2200);
  }
  function sync() {
    document.querySelectorAll('[data-save]').forEach(function (button) {
      var on = saved.has(button.getAttribute('data-save'));
      button.setAttribute('aria-pressed', String(on));
      var label = on ? T('gallery.unsave', '取消收藏') : T('gallery.save', '收藏作品');
      button.setAttribute('aria-label', label + (button.getAttribute('data-name') ? '：' + button.getAttribute('data-name') : ''));
      if (button.classList.contains('wm-save') && button.textContent !== label) button.textContent = label;
    });
    document.querySelectorAll('[data-saved-count]').forEach(function (node) { if (node.textContent !== String(saved.size)) node.textContent = String(saved.size); node.hidden = !saved.size; });
  }
  function decorate() {
    document.querySelectorAll('.media-card').forEach(function (card) {
      if (card.querySelector('[data-save]')) return;
      var link = card.querySelector('[data-work]'); if (!link) return;
      var button = document.createElement('button'); button.type = 'button'; button.className = 'save-work';
      button.setAttribute('data-save', link.getAttribute('data-work'));
      var title = card.querySelector('h3'); if (title) button.setAttribute('data-name', title.textContent);
      button.innerHTML = heart; card.appendChild(button);
    });
    sync();
  }
  function renderSaved() {
    if (!feed || !data) return;
    var slugs = Array.from(saved).reverse().filter(function (slug) { return data[slug]; });
    var typeNames = { meme: '梗图', illustration: '插画', setting: '设定', comic: '漫画' };
    feed.innerHTML = slugs.map(function (slug) {
      var w = data[slug], kind = (w.k || []).map(function (id) { return T('v2.type.' + id, typeNames[id] || id); }).join(' · ');
      return '<article class="media-card" style="--c:' + esc(w.col) + '"><a href="https://xn--pssy23gqgbz2d718b.com/works/' + esc(slug) + '.html" data-work="' + esc(slug) + '"><div class="ph"' + (w.w && w.h ? ' style="aspect-ratio:' + w.w + '/' + w.h + '"' : '') + '><img src="' + esc(w.i) + '" alt="' + esc(w.n) + '" loading="lazy"><span class="badge">' + esc(kind) + '</span></div><div class="meta"><h3>' + esc(w.n) + '</h3><p><span class="who"><i></i>' + esc(w.c) + '</span><span>' + esc(w.dt) + '</span></p></div></a></article>';
    }).join('');
    empty.hidden = slugs.length > 0;
    var total = document.querySelector('[data-favorite-total]'); if (total) total.textContent = T('gallery.roleCount', '{count} 件作品', { count: slugs.length });
    decorate();
  }
  function loadSaved() {
    if (!feed) return;
    error.hidden = true;
    fetch('works-v2.json').then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); }).then(function (value) { data = value; renderSaved(); }).catch(function () {
      error.hidden = false;
      error.innerHTML = esc(T('v2.loadFail', '加载失败')) + ' <button class="btn btn-line btn-sm" type="button" data-saved-retry>' + esc(T('v2.retry', '重试')) + '</button>';
    });
  }
  document.addEventListener('click', function (e) {
    if (e.target.closest('[data-saved-retry]')) return loadSaved();
    var button = e.target.closest('[data-save]'); if (!button) return;
    e.preventDefault();
    var slug = button.getAttribute('data-save'), next = new Set(saved);
    if (next.has(slug)) next.delete(slug); else next.add(slug);
    try { localStorage.setItem(KEY, JSON.stringify(Array.from(next))); }
    catch (err) { toast(T('gallery.storageError', '浏览器无法保存收藏，请检查存储设置。')); return; }
    saved = next;
    toast(saved.has(slug) ? T('gallery.saved', '已加入我的收藏') : T('gallery.removed', '已取消收藏'));
    sync(); renderSaved();
  });
  addEventListener('storage', function (e) { if (e.key === KEY) { saved = new Set(read()); sync(); renderSaved(); } });
  document.addEventListener('site:langchange', function () { sync(); renderSaved(); });
  new MutationObserver(decorate).observe(document.body, { childList: true, subtree: true });
  decorate(); loadSaved();
})();
