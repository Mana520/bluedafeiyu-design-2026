/* Apply the saved appearance before styles paint. Independent of the data feed. */
(() => {
  'use strict';

  const KEY = 'deepsea-prototype-theme';
  const root = document.documentElement;
  const normalize = (value) => value === 'light' ? 'light' : 'dark';

  function applyTheme(value, persist = false) {
    const mode = normalize(value);
    const changed = root.dataset.colorMode !== mode;
    root.dataset.colorMode = mode;
    root.dataset.theme = mode === 'light' ? 'deepsea-light' : 'deepsea';
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.content = mode === 'light' ? '#f4f7f9' : '#04121c';

    if (persist) {
      try { localStorage.setItem(KEY, mode); } catch { /* Keep the current tab usable. */ }
    }
    if (changed) window.dispatchEvent(new CustomEvent('deepsea:themechange'));
  }

  let saved;
  try { saved = localStorage.getItem(KEY); } catch { /* Default to the original dark theme. */ }
  applyTheme(saved);

  document.addEventListener('click', (event) => {
    if (!(event.target instanceof Element) || !event.target.closest('[data-theme-toggle]')) return;
    applyTheme(root.dataset.colorMode === 'light' ? 'dark' : 'light', true);
  });

  window.addEventListener('storage', (event) => {
    if (event.key === KEY || event.key === null) applyTheme(event.newValue);
  });
})();
