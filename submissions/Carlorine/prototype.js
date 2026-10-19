/* Deep Sea Poster — Phase 0 prototype. No dependencies. */
(() => {
  'use strict';

  const LANG_KEY = 'deepsea-prototype-lang';
  const FAV_KEY = 'deepsea-prototype-favorites';
  const BATCH = 48;

  const I18N = {
    zh: {
      'nav.works': '作品',
      'nav.characters': '角色',
      'nav.collections': '合集',
      'nav.favorites': '收藏',
      'nav.submit': '投稿',
      'theme.toLight': '切换到浅色模式',
      'theme.toDark': '切换到深色模式',
      'search.placeholder': '搜作品、角色或标签…',
      'hero.title': 'AI 娘二创作品档案',
      'hero.fact.a': '共 ',
      'hero.fact.b': ' 件作品，来自 ',
      'hero.fact.c': ' 位角色。',
      'hero.cta': '翻作品',
      'hero.random': '随机一件',
      "recent.title": "最近收录",
      'recent.all': '全部作品',
      'char.title': '角色',
      'char.all': '全部角色',
      'collections.title': '合集',
      "collections.fact": "站长挑选的作品，按主题或来源整理。",
      'collections.empty': '还没有上线中的合集。',
      'collections.all': '全部合集',
      'type.all': '全部',
      'footer.note': '非官方同人整理。图片版权归原作者，代码 MIT。',
      'footer.production': '现行生产站',
      'filter.char': '角色',
      'filter.topic': '合集',
      'filter.sort': '排序',
      'filter.clear': '清除筛选',
      'filter.allChars': '全部角色',
      'filter.allTopics': '全部合集',
      'sort.new': '最新',
      'sort.old': '最早',
      'sort.random': '随机',
      "works.title": "作品",
      "works.fact": "按类型、角色或关键词，找你想看的图。",
      'works.unit': '件作品',
      'works.loadMore': '加载更多（还有 {n} 件）',
      'favorites.title': '收藏',
      'favorites.empty': '还没有收藏。看到喜欢的，点一下心形按钮。',
      'favorites.go': '去翻作品',
      'favorites.count': '收藏了 {n} 件',
      'detail.back': '作品库',
      'detail.download': '下载原图',
      'detail.copyImage': '复制图片',
      'detail.copyLink': '复制链接',
      'detail.favorite': '收藏',
      'detail.saved': '已收藏',
      'detail.related': '相关作品',
      'detail.thumbs': '同角色作品',
      'detail.viewImage': '查看大图',
      'detail.loading': '正在加载大图…',
      'detail.loadError': '大图没加载出来',
      'fact.char': '角色',
      'fact.type': '类型',
      'fact.size': '尺寸',
      'fact.format': '格式',
      'fact.license': '授权',
      'fact.source': '来源',
      'collection.cta': '看合集',
      'state.empty': '没有符合条件的作品。',
      'state.error': '没加载出来。再试一次。',
      'state.retry': '再试一次',
      'state.clear': '清除筛选',
      'state.loading': '正在加载作品…',
      'toast.copied': '已复制',
      'toast.imageCopied': '图片已复制',
      'toast.imageLinkCopied': '已复制图片链接',
      'toast.linkCopied': '链接已复制',
      'toast.favAdded': '已收藏',
      'toast.favRemoved': '已取消收藏',
      'a11y.skip': '跳到主要内容',
      'a11y.home': '蓝色大肥鱼 首页',
      'a11y.search': '搜作品、角色或标签',
      'a11y.searchShort': '搜索',
      'a11y.nav': '主导航',
      'a11y.language': '语言',
      'a11y.close': '关闭',
      'a11y.workInfo': '作品信息',
      'a11y.viewImage': '查看大图',
      'a11y.prev': '上一张',
      'a11y.next': '下一张',
      'toast.copyFailed': '复制失败，请手动复制。',
      'license.unknown': '未标注',
      "nav.community": "社群",
      "sidebar.open": "打开侧边栏",
      "sidebar.close": "关闭侧边栏",
      "sidebar.title": "浏览与筛选",
      "sidebar.types": "按类型看作品",
      "char.pageFact": "从角色出发，看她们的二创作品。",
      "char.entries": "个条目",
      "collection.preview": "收录作品",
      "collection.by": "来源作者",
      "community.lead": "聊图、分享二创、参加活动，也一起把这个档案整理好。",
      "community.intro": "本站的 QQ 交流群。新图、创作想法和站点反馈，都可以在这里聊。",
      "community.number": "QQ群号",
      "community.copy": "复制群号",
      "community.join": "加入 QQ 群",
      "community.guide": "先看投稿指南",
      "community.scan": "用 QQ 扫码进群",
      "community.qrAlt": "AAAA肥鱼批发市场 QQ 群 1003728058 的加入二维码",
      "community.submitTitle": "在群里投稿",
      "community.submitText": "@机器人，发送“投稿 标题 角色”并在同一条消息里附图。审核通过后统一收录。",
      "community.eventsTitle": "参加活动",
      "community.eventsText": "当前正在征集网站前台设计。活动规则、截止时间和投稿入口都在活动页。",
      "community.eventsLink": "查看活动",
      "community.feedbackTitle": "一起整理档案",
      "community.feedbackText": "图片有误、来源待补、页面不好用，都欢迎带上作品链接反馈。",
      "community.rules": "群规",
      "community.rule1": "只聊和 AI 娘、二创、本站相关的内容。",
      "community.rule2": "转发别人的作品请注明出处，尊重原作者。",
      "community.rule3": "不发真人肖像、不发 R18 内容、不刷屏。",
      "community.elsewhere": "也可以在这里找到站长",
      "community.bili": "哔哩哔哩",
      "media.error": "图片未加载，打开作品重试",
    },
    en: {
      'nav.works': 'Works',
      'nav.characters': 'Characters',
      'nav.collections': 'Collections',
      'nav.favorites': 'Saved',
      'nav.submit': 'Submit',
      'theme.toLight': 'Switch to light mode',
      'theme.toDark': 'Switch to dark mode',
      'search.placeholder': 'Search works, characters, or tags…',
      'hero.title': 'AI Character Fanart Archive',
      'hero.fact.a': '',
      'hero.fact.b': ' works from ',
      'hero.fact.c': ' characters.',
      'hero.cta': 'Browse works',
      'hero.random': 'Random',
      "recent.title": "Recently added",
      'recent.all': 'All works',
      'char.title': 'Characters',
      'char.all': 'All characters',
      'collections.title': 'Collections',
      "collections.fact": "Works selected by the site owner, grouped by theme or source.",
      'collections.empty': 'No collections are live yet.',
      'collections.all': 'All collections',
      'type.all': 'All',
      'footer.note': 'Unofficial fan archive. Art copyright belongs to the original creators; code is MIT.',
      'footer.production': 'Current production site',
      'filter.char': 'Character',
      'filter.topic': 'Collection',
      'filter.sort': 'Sort',
      'filter.clear': 'Clear filters',
      'filter.allChars': 'All characters',
      'filter.allTopics': 'All collections',
      'sort.new': 'Newest',
      'sort.old': 'Oldest',
      'sort.random': 'Random',
      "works.title": "Works",
      "works.fact": "Browse by type, character, or keyword.",
      'works.unit': 'works',
      'works.loadMore': 'Load more ({n} left)',
      'favorites.title': 'Saved',
      'favorites.empty': 'Nothing saved yet. Tap the heart on a work you like.',
      'favorites.go': 'Browse works',
      'favorites.count': '{n} saved',
      'detail.back': 'Library',
      'detail.download': 'Download original',
      'detail.copyImage': 'Copy image',
      'detail.copyLink': 'Copy link',
      'detail.favorite': 'Save',
      'detail.saved': 'Saved',
      'detail.related': 'Related works',
      'detail.thumbs': 'Same character',
      'detail.viewImage': 'View image',
      'detail.loading': 'Loading image…',
      'detail.loadError': 'Image didn’t load',
      'fact.char': 'Character',
      'fact.type': 'Type',
      'fact.size': 'Size',
      'fact.format': 'Format',
      'fact.license': 'License',
      'fact.source': 'Source',
      'collection.cta': 'View collection',
      'state.empty': 'No works match these filters.',
      'state.error': "Couldn't load. Try again.",
      'state.retry': 'Try again',
      'state.clear': 'Clear filters',
      'state.loading': 'Loading works…',
      'toast.copied': 'Copied',
      'toast.imageCopied': 'Image copied',
      'toast.imageLinkCopied': 'Image link copied',
      'toast.linkCopied': 'Link copied',
      'toast.favAdded': 'Saved',
      'toast.favRemoved': 'Removed',
      'a11y.skip': 'Skip to content',
      'a11y.home': 'Blue Big Fat Fish home',
      'a11y.search': 'Search works, characters, or tags',
      'a11y.searchShort': 'Search',
      'a11y.nav': 'Main',
      'a11y.language': 'Language',
      'a11y.close': 'Close',
      'a11y.workInfo': 'Work details',
      'a11y.viewImage': 'View full size',
      'a11y.prev': 'Previous image',
      'a11y.next': 'Next image',
      'toast.copyFailed': 'Copy failed. Copy it manually.',
      'license.unknown': 'Not marked',
      "nav.community": "Community",
      "sidebar.open": "Open sidebar",
      "sidebar.close": "Close sidebar",
      "sidebar.title": "Browse and filter",
      "sidebar.types": "Browse by type",
      "char.pageFact": "Choose a character to browse their fan art.",
      "char.entries": "entries",
      "collection.preview": "Included works",
      "collection.by": "Source creator",
      "community.lead": "Share fan art, join events, and help keep the archive in order.",
      "community.intro": "The site’s QQ group. Talk about new art, creative ideas, and site feedback.",
      "community.number": "QQ group",
      "community.copy": "Copy group number",
      "community.join": "Join the QQ group",
      "community.guide": "Submission guide",
      "community.scan": "Scan with QQ to join",
      "community.qrAlt": "QR code for the AAAA肥鱼批发市场 QQ group, number 1003728058",
      "community.submitTitle": "Submit in the group",
      "community.submitText": "Mention the bot and send “投稿 title character” with an image in the same message. Approved works are added to the archive.",
      "community.eventsTitle": "Join events",
      "community.eventsText": "The site is currently collecting frontend designs. Rules, deadlines, and submissions are on the event page.",
      "community.eventsLink": "View event",
      "community.feedbackTitle": "Help maintain the archive",
      "community.feedbackText": "Wrong images, missing sources, or difficult pages: share the work link with your feedback.",
      "community.rules": "Group rules",
      "community.rule1": "Keep discussions about AI characters, fan art, and this site.",
      "community.rule2": "Credit the source when sharing others’ work. Respect the original creators.",
      "community.rule3": "No real-person portraits, R18 content, or spam.",
      "community.elsewhere": "Find the site owner elsewhere",
      "community.bili": "Bilibili",
      "media.error": "Image unavailable. Open the work to retry.",
    },
    ja: {
      'nav.works': '作品',
      'nav.characters': 'キャラクター',
      'nav.collections': 'コレクション',
      'nav.favorites': 'お気に入り',
      'nav.submit': '投稿',
      'theme.toLight': 'ライトモードに切り替える',
      'theme.toDark': 'ダークモードに切り替える',
      'search.placeholder': '作品・キャラクター・タグを検索…',
      'hero.title': 'AIキャラ 二次創作アーカイブ',
      'hero.fact.a': '全',
      'hero.fact.b': '件の作品、',
      'hero.fact.c': '人のキャラクター。',
      'hero.cta': '作品を見る',
      'hero.random': 'ランダム',
      "recent.title": "最近の収録",
      'recent.all': 'すべての作品',
      'char.title': 'キャラクター',
      'char.all': 'すべてのキャラクター',
      'collections.title': 'コレクション',
      "collections.fact": "運営者がテーマや出典ごとに選んだ作品。",
      'collections.empty': '公開中のコレクションはまだありません。',
      'collections.all': 'すべてのコレクション',
      'type.all': 'すべて',
      'footer.note': '非公式の二次創作アーカイブ。画像の著作権は原作者に帰属します。コードは MIT。',
      'footer.production': '現行本番サイト',
      'filter.char': 'キャラクター',
      'filter.topic': 'コレクション',
      'filter.sort': '並び順',
      'filter.clear': 'フィルターを解除',
      'filter.allChars': 'すべてのキャラクター',
      'filter.allTopics': 'すべてのコレクション',
      'sort.new': '新しい順',
      'sort.old': '古い順',
      'sort.random': 'ランダム',
      "works.title": "作品",
      "works.fact": "種類・キャラクター・キーワードから作品を探す。",
      'works.unit': '件',
      'works.loadMore': 'さらに読み込む（残り {n}件）',
      'favorites.title': 'お気に入り',
      'favorites.empty': 'まだお気に入りがありません。気に入った作品のハートを押してください。',
      'favorites.go': '作品を見る',
      'favorites.count': '{n}件保存',
      'detail.back': '作品庫',
      'detail.download': '原図をダウンロード',
      'detail.copyImage': '画像をコピー',
      'detail.copyLink': 'リンクをコピー',
      'detail.favorite': 'お気に入り',
      'detail.saved': '保存済み',
      'detail.related': '関連作品',
      'detail.thumbs': '同じキャラクター',
      'detail.viewImage': '画像を見る',
      'detail.loading': '画像を読み込み中…',
      'detail.loadError': '画像を読み込めませんでした',
      'fact.char': 'キャラクター',
      'fact.type': '種類',
      'fact.size': 'サイズ',
      'fact.format': '形式',
      'fact.license': 'ライセンス',
      'fact.source': '出典',
      'collection.cta': 'コレクションを見る',
      'state.empty': '条件に合う作品がありません。',
      'state.error': '読み込めませんでした。もう一度お試しください。',
      'state.retry': 'もう一度',
      'state.clear': 'フィルターを解除',
      'state.loading': '作品を読み込み中…',
      'toast.copied': 'コピーしました',
      'toast.imageCopied': '画像をコピーしました',
      'toast.imageLinkCopied': '画像リンクをコピーしました',
      'toast.linkCopied': 'リンクをコピーしました',
      'toast.favAdded': 'お気に入りに追加しました',
      'toast.favRemoved': 'お気に入りから削除しました',
      'a11y.skip': '本文へスキップ',
      'a11y.home': '藍色大肥魚 ホーム',
      'a11y.search': '作品・キャラクター・タグを検索',
      'a11y.searchShort': '検索',
      'a11y.nav': 'メインナビゲーション',
      'a11y.language': '言語',
      'a11y.close': '閉じる',
      'a11y.workInfo': '作品情報',
      'a11y.viewImage': '拡大表示',
      'a11y.prev': '前の画像',
      'a11y.next': '次の画像',
      'toast.copyFailed': 'コピーに失敗しました。手動でコピーしてください。',
      'license.unknown': '未設定',
      "nav.community": "コミュニティ",
      "sidebar.open": "サイドバーを開く",
      "sidebar.close": "サイドバーを閉じる",
      "sidebar.title": "閲覧と絞り込み",
      "sidebar.types": "種類から作品を見る",
      "char.pageFact": "キャラクターから二次創作作品を見る。",
      "char.entries": "項目",
      "collection.preview": "収録作品",
      "collection.by": "出典の作者",
      "community.lead": "作品を共有し、イベントに参加して、アーカイブを一緒に整えましょう。",
      "community.intro": "本サイトの QQ グループです。新しい作品、創作のアイデア、サイトへの意見を話せます。",
      "community.number": "QQ グループ番号",
      "community.copy": "グループ番号をコピー",
      "community.join": "QQ グループに参加",
      "community.guide": "投稿ガイドを見る",
      "community.scan": "QQ で読み取って参加",
      "community.qrAlt": "QQ グループ AAAA肥鱼批发市场、番号 1003728058 への参加用 QR コード",
      "community.submitTitle": "グループで投稿",
      "community.submitText": "ボットにメンションし、「投稿 タイトル キャラ」と画像を同じメッセージで送信してください。審査後に収録されます。",
      "community.eventsTitle": "イベントに参加",
      "community.eventsText": "現在、サイトのフロントエンドデザインを募集中です。ルール、締切、投稿先はイベントページをご覧ください。",
      "community.eventsLink": "イベントを見る",
      "community.feedbackTitle": "アーカイブの整理に協力",
      "community.feedbackText": "画像の誤り、出典の不足、使いにくいページは、作品リンクと一緒にお知らせください。",
      "community.rules": "グループのルール",
      "community.rule1": "AI キャラクター、二次創作、本サイトに関する話題のみ。",
      "community.rule2": "他の人の作品を共有する際は出典を明記し、原作者を尊重してください。",
      "community.rule3": "実在人物の肖像、R18 コンテンツ、連投は禁止です。",
      "community.elsewhere": "運営者の公開アカウント",
      "community.bili": "bilibili",
      "media.error": "画像を読み込めません。作品を開いて再試行。",
    },
  };

  const CHAR_EN = {
    deepseek: 'DeepSeek',
    doubao: 'Doubao',
    kimi: 'Kimi',
    qwen: 'Qwen',
    claude: 'Claude',
    gemini: 'Gemini',
    grok: 'Grok',
    stepfun: 'StepFun',
    glm: 'GLM',
    gpt: 'GPT',
    mimo: 'MiMo',
    other: 'Other',
    'owner-picks': 'Owner picks',
  };

  const CAT_LABELS = {
    meme: { zh: '梗图', en: 'Meme', ja: 'ミーム' },
    illustration: { zh: '插画', en: 'Illustration', ja: 'イラスト' },
    setting: { zh: '设定图', en: 'Character sheet', ja: '設定画' },
    comic: { zh: '漫画', en: 'Comic', ja: '漫画' },
  };

  const state = {
    lang: readStorage(LANG_KEY) || 'zh',
    type: 'all',
    char: 'all',
    topic: 'all',
    q: '',
    sort: 'new',
    seed: Math.floor(Math.random() * 1e9),
    loaded: BATCH,
    currentWork: null,
    lbImages: [],
    lbIndex: 0,
  };

  let DATA = null;
  let toastTimer = null;

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

  function t(key) {
    const dict = I18N[state.lang] || I18N.zh;
    return dict[key] != null ? dict[key] : key;
  }

  function esc(value) {
    return String(value == null ? '' : value).replace(/[&<>"']/g, (ch) => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;',
    }[ch]));
  }

  const escAttr = esc;

  // Keep icons local and decorative; translated labels remain separate nodes.
  function icon(name) {
    return `<svg class="ds-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><use href="icons.svg#${name}"></use></svg>`;
  }

  const TYPE_ICONS = { all: 'squares-2x2', meme: 'face-smile', illustration: 'photo', setting: 'pencil-square', comic: 'book-open' };

  function readStorage(key) {
    try {
      return localStorage.getItem(key);
    } catch {
      return null;
    }
  }

  function writeStorage(key, value) {
    try {
      localStorage.setItem(key, value);
    } catch {
      /* private mode */
    }
  }

  function getFavorites() {
    try {
      const raw = JSON.parse(localStorage.getItem(FAV_KEY) || '[]');
      return Array.isArray(raw) ? raw.filter((x) => typeof x === 'string') : [];
    } catch {
      return [];
    }
  }

  function setFavorites(list) {
    writeStorage(FAV_KEY, JSON.stringify([...new Set(list)]));
  }

  function countLabel(n) {
    if (state.lang === 'en') return `${n} work${n === 1 ? '' : 's'}`;
    if (state.lang === 'ja') return `${n}件`;
    return `${n} 件`;
  }

  function localizedCharNameById(id, fallback) {
    if (state.lang === 'en') return CHAR_EN[id] || String(fallback).replace(/娘$/, '');
    return fallback;
  }

  function localizedCharName(work) {
    return localizedCharNameById(work.charId, work.charName);
  }

  function catLabel(id) {
    const labels = CAT_LABELS[id];
    return (labels && labels[state.lang]) || id;
  }

  function formatDate(value) {
    if (!value) return '—';
    const date = new Date(String(value).length <= 10 ? `${value}T00:00:00` : value);
    if (Number.isNaN(date.getTime())) return value;
    const locale = state.lang === 'en' ? 'en-US' : state.lang === 'ja' ? 'ja-JP' : 'zh-CN';
    return new Intl.DateTimeFormat(locale, { year: 'numeric', month: 'short', day: 'numeric' }).format(date);
  }

  function localizedLicense(value) {
    return value === '未标注' ? t('license.unknown') : value;
  }

  function localizedSource(value) {
    if (state.lang === 'zh') return value;
    const map = {
      '投稿': { en: 'Submission', ja: '投稿' },
      'QQ 群': { en: 'QQ group', ja: 'QQグループ' },
      '本站收录': { en: 'Site archive', ja: 'サイト収録' },
    };
    return (map[value] && map[value][state.lang]) || value;
  }

  function debounce(fn, wait) {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => fn(...args), wait);
    };
  }

  function toast(message, tone = 'info') {
    const el = $('#toast');
    if (!el) return;
    el.textContent = message;
    el.classList.toggle('is-error', tone === 'error');
    el.classList.add('is-on');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.remove('is-on'), 2200);
  }

  function openDialog(dialog) {
    if (!dialog || dialog.open) return;
    dialog.showModal();
    document.body.classList.add('is-locked');
  }

  function closeDialog(dialog) {
    if (dialog && dialog.open) dialog.close();
  }

  function syncBodyLock() {
    if (!document.querySelector('dialog[open]')) document.body.classList.remove('is-locked');
  }

  function initialBatch() {
    const n = Number(new URLSearchParams(location.search).get('limit'));
    return Number.isFinite(n) && n > 0 ? Math.floor(n) : BATCH;
  }

  function readURL() {
    const p = new URLSearchParams(location.search);
    const type = p.get('t');
    state.type = ['meme', 'illustration', 'setting', 'comic'].includes(type) ? type : 'all';
    state.char = p.get('c') || 'all';
    state.topic = p.get('topic') || 'all';
    state.q = (p.get('q') || '').trim();
    state.sort = ['new', 'old', 'random'].includes(p.get('sort')) ? p.get('sort') : 'new';
    state.loaded = initialBatch();
    if (state.sort === 'random') state.seed = Math.floor(Math.random() * 1e9);
  }

  function validateState() {
    if (!DATA) return;
    if (state.type !== 'all' && !DATA.categories.some((c) => c.id === state.type)) state.type = 'all';
    if (state.char !== 'all' && !DATA.characters.some((c) => c.id === state.char)) state.char = 'all';
    if (state.topic !== 'all' && !DATA.topics.some((x) => x.id === state.topic)) state.topic = 'all';
  }

  function syncURL() {
    const url = new URL(location.href);
    const set = (key, value, fallback) => {
      if (value && value !== fallback) url.searchParams.set(key, value);
      else url.searchParams.delete(key);
    };
    set('t', state.type, 'all');
    set('c', state.char, 'all');
    set('topic', state.topic, 'all');
    set('q', state.q, '');
    set('sort', state.sort, 'new');
    url.searchParams.delete('state');
    url.searchParams.delete('limit');
    history.replaceState(null, '', url);
  }

  function filteredWorks() {
    if (!DATA) return [];
    let list = DATA.works;
    if (state.type !== 'all') list = list.filter((w) => w.catIds.includes(state.type));
    if (state.char !== 'all') list = list.filter((w) => w.charId === state.char);
    if (state.topic !== 'all') list = list.filter((w) => w.topicIds.includes(state.topic));
    if (state.q) {
      const q = state.q.toLocaleLowerCase();
      list = list.filter((w) => {
        const haystack = [w.name, w.charName, ...(w.tags || [])].join(' ').toLocaleLowerCase();
        return haystack.includes(q);
      });
    }
    return list;
  }

  function seededShuffle(input, seed) {
    const list = [...input];
    let s = seed >>> 0;
    for (let i = list.length - 1; i > 0; i -= 1) {
      s = (s * 1664525 + 1013904223) >>> 0;
      const j = s % (i + 1);
      [list[i], list[j]] = [list[j], list[i]];
    }
    return list;
  }

  function sortedWorks(list) {
    if (state.sort === 'old') return [...list].sort((a, b) => String(a.date).localeCompare(String(b.date)));
    if (state.sort === 'random') return seededShuffle(list, state.seed);
    return list;
  }

  function isSaved(slug) {
    return getFavorites().includes(slug);
  }

  function favoriteButton(work) {
    const saved = isSaved(work.slug);
    return `<button class="work-fav" type="button" data-fav="${escAttr(work.slug)}" aria-pressed="${saved}" aria-label="${escAttr(`${t(saved ? 'detail.saved' : 'detail.favorite')} ${work.name}`)}">
      ${icon('heart')}
    </button>`;
  }

  function workCard(work, eager = false) {
    const card = document.createElement('article');
    card.className = 'work-card';
    const label = [work.name, localizedCharName(work), catLabel(work.catIds[0])]
      .filter(Boolean).join(state.lang === 'en' ? ', ' : '，');
    card.innerHTML = `
      <a class="work-link" href="work.html?slug=${encodeURIComponent(work.slug)}" aria-label="${escAttr(label)}">
        <div class="work-media">
          <img src="${escAttr(work.thumb)}" alt="${escAttr(work.name)}" loading="${eager ? 'eager' : 'lazy'}" width="${work.width || 400}" height="${work.height || 500}">
        </div>
        <div class="work-body">
          <span class="work-title">${esc(work.name)}</span>
          <span class="work-meta"><span>${esc(localizedCharName(work))}</span><span class="work-type">${esc(catLabel(work.catIds[0]))}</span></span>
        </div>
      </a>
      ${favoriteButton(work)}`;
    return card;
  }

  function emptyState() {
    return `<div class="state-block"><p>${esc(t('state.empty'))}</p><button class="btn btn-primary" type="button" data-clear>${icon('arrow-path')}<span>${esc(t('state.clear'))}</span></button></div>`;
  }

  function attachClear(grid) {
    const btn = grid.querySelector('[data-clear]');
    if (btn) btn.addEventListener('click', clearFilters);
  }

  function clearFilters() {
    state.type = 'all';
    state.char = 'all';
    state.topic = 'all';
    state.q = '';
    state.sort = 'new';
    state.loaded = initialBatch();
    const url = new URL(location.href);
    url.searchParams.delete('state');
    url.searchParams.delete('limit');
    history.replaceState(null, '', url);
    const charSel = $('#char-select');
    const topicSel = $('#topic-select');
    const sortSel = $('#sort-select');
    if (charSel) charSel.value = 'all';
    if (topicSel) topicSel.value = 'all';
    if (sortSel) sortSel.value = 'new';
    $$('input[name="q"]').forEach((input) => { input.value = ''; });
    updateActiveTypes();
    syncURL();
    renderPage();
  }

  function renderRecent() {
    const grid = $('#recent-grid');
    if (!grid || !DATA) return;
    const list = sortedWorks(filteredWorks()).slice(0, 8);
    grid.replaceChildren(...list.map((work, i) => workCard(work, i < 4)));
    if (!list.length) { grid.innerHTML = emptyState(); attachClear(grid); }
    updateFeedHead();
  }

  function updateFeedHead() {
    const title = $('[data-feed-title]');
    const count = $('[data-feed-count]');
    const link = $('[data-feed-link]');
    if (!title || !DATA) return;
    if (state.type === 'all') {
      if (title.dataset.i18n !== 'recent.title') {
        title.dataset.i18n = 'recent.title';
        title.textContent = t('recent.title');
      } else {
        title.textContent = t('recent.title');
      }
      const total = filteredWorks().length;
      if (count) count.textContent = countLabel(total);
      if (link) link.href = 'works.html';
    } else {
      title.removeAttribute('data-i18n');
      title.textContent = catLabel(state.type);
      const total = filteredWorks().length;
      if (count) count.textContent = countLabel(total);
      if (link) link.href = `works.html?t=${encodeURIComponent(state.type)}`;
    }
  }

  function characterCard(character) {
    // One cover per character: prefer a portrait-ish illustration, since a comic
    // or meme cropped to 4:5 loses its layout and becomes unreadable.
    const coverScore = (work) => {
      const ratio = (work.width || 4) / (work.height || 5);
      const cats = work.catIds || [];
      const penalty = cats.includes('illustration') ? 0 : cats.includes('setting') ? 0.05 : cats.includes('meme') ? 0.12 : 0.2;
      return Math.abs(ratio - 0.8) + penalty;
    };
    const cover = DATA.works
      .filter((work) => work.charId === character.id)
      .slice(0, 12)
      .sort((a, b) => coverScore(a) - coverScore(b))[0];
    const link = document.createElement('a');
    link.className = 'character-card';
    link.href = `works.html?c=${encodeURIComponent(character.id)}`;
    link.innerHTML = `<span class="character-art">${cover ? `<img src="${escAttr(cover.thumb)}" alt="" loading="lazy" width="${cover.width || 400}" height="${cover.height || 500}">` : ''}</span>
      <span class="character-caption"><span class="character-name">${esc(localizedCharNameById(character.id, character.name))}</span><span class="character-count">${esc(countLabel(character.count))}</span></span>`;
    return link;
  }

  function renderCharacters() {
    const list = $('#char-list');
    if (!list || !DATA) return;
    $$('[data-char-count], [data-char-total]').forEach((el) => { el.textContent = String(DATA.characters.length); });
    list.replaceChildren(...DATA.characters.slice(0, 6).map((character) => characterCard(character)));
  }

  function collectionMarkup(topic, compact = false) {
    const works = DATA.works.filter((work) => work.topicIds.includes(topic.id));
    const previews = works.filter((work) => work.slug !== topic.coverSlug).slice(0, compact ? 3 : 4);
    const href = `works.html?topic=${encodeURIComponent(topic.id)}`;
    const author = topic.author;
    const authorHTML = author ? `<p class="collection-author"><span>${esc(t('collection.by'))}</span> ${author.url && /^https?:\/\//.test(author.url) ? `<a href="${escAttr(author.url)}" target="_blank" rel="noreferrer">${esc(author.name)}</a>` : esc(author.name)}</p>` : '';
    return `<article class="collection-feature${compact ? ' is-compact' : ''}">
      <a class="collection-cover" href="${href}" aria-label="${escAttr(topic.name)}"><img src="${escAttr(topic.cover)}" alt="${escAttr(topic.name)}" loading="lazy" width="600" height="600"></a>
      <div class="collection-content"><div class="collection-heading"><h${compact ? '3' : '2'}><a href="${href}">${esc(topic.name)}</a></h${compact ? '3' : '2'}><span>${esc(countLabel(topic.count))}</span></div>
      <p class="collection-description">${esc(topic.summary)}</p>${authorHTML}
      <div class="collection-previews" aria-label="${escAttr(t('collection.preview'))}">${previews.map((work) => `<a href="work.html?slug=${encodeURIComponent(work.slug)}" aria-label="${escAttr(work.name)}"><img src="${escAttr(work.thumb)}" alt="" loading="lazy" width="${work.width || 400}" height="${work.height || 500}"></a>`).join('')}</div>
      <a class="btn btn-outline collection-open" href="${href}"><span>${esc(t('collection.cta'))}</span>${icon('arrow-right')}</a></div></article>`;
  }

  function renderCollection() {
    const el = $('#collection');
    if (!el || !DATA) return;
    el.innerHTML = DATA.topics[0] ? collectionMarkup(DATA.topics[0], true) : `<p>${esc(t('collections.empty'))}</p>`;
  }

  function renderCharactersPage() {
    const list = $('#char-index');
    if (!list || !DATA) return;
    $$('[data-char-total]').forEach((el) => { el.textContent = String(DATA.characters.length); });
    list.replaceChildren(...DATA.characters.map((character) => characterCard(character)));
  }

  function renderTopicsPage() {
    const list = $('#topic-index');
    if (!list || !DATA) return;
    list.innerHTML = DATA.topics.length ? DATA.topics.map((topic) => collectionMarkup(topic)).join('') : `<div class="state-block"><p>${esc(t('collections.empty'))}</p></div>`;
  }

  function populateSelects() {
    if (!DATA) return;
    const charSel = $('#char-select');
    const topicSel = $('#topic-select');
    const sortSel = $('#sort-select');
    if (charSel) {
      charSel.innerHTML = `<option value="all">${esc(t('filter.allChars'))}</option>` +
        DATA.characters.map((c) => `<option value="${escAttr(c.id)}">${esc(localizedCharNameById(c.id, c.name))} (${c.count})</option>`).join('');
      charSel.value = state.char !== 'all' && DATA.characters.some((c) => c.id === state.char) ? state.char : 'all';
      state.char = charSel.value;
    }
    if (topicSel) {
      topicSel.innerHTML = `<option value="all">${esc(t('filter.allTopics'))}</option>` +
        DATA.topics.map((x) => `<option value="${escAttr(x.id)}">${esc(x.name)} (${x.count})</option>`).join('');
      topicSel.value = state.topic !== 'all' && DATA.topics.some((x) => x.id === state.topic) ? state.topic : 'all';
      state.topic = topicSel.value;
    }
    if (sortSel) sortSel.value = state.sort;
  }

  function renderResultFilters() {
    const el = $('#result-filters');
    if (el) {
      const parts = [];
      if (state.type !== 'all') parts.push(catLabel(state.type));
      if (state.char !== 'all') {
        const character = DATA.characters.find((c) => c.id === state.char);
        if (character) parts.push(localizedCharNameById(character.id, character.name));
      }
      if (state.topic !== 'all') {
        const topic = DATA.topics.find((x) => x.id === state.topic);
        if (topic) parts.push(topic.name);
      }
      if (state.q) parts.push(`“${state.q}”`);
      el.textContent = parts.length ? `（${parts.join(' / ')}）` : '';
    }
    const clear = $('#clear-filters');
    if (clear) {
      clear.disabled = state.type === 'all' && state.char === 'all' &&
        state.topic === 'all' && !state.q && state.sort === 'new';
    }
  }

  function renderSkeleton(grid) {
    grid.setAttribute('aria-busy', 'true');
    grid.innerHTML = Array.from({ length: 9 }, () => `
      <div class="skeleton-card" aria-hidden="true">
        <div class="skeleton-media"></div>
        <div class="skeleton-line"></div>
        <div class="skeleton-line is-short"></div>
      </div>`).join('');
    const count = $('#result-count');
    if (count) count.textContent = '…';
    const filters = $('#result-filters');
    if (filters) filters.textContent = t('state.loading');
    const more = $('#load-more');
    if (more) more.hidden = true;
  }

  function renderError(grid) {
    grid.removeAttribute('aria-busy');
    grid.innerHTML = `
      <div class="state-block is-error">
        <p>${esc(t('state.error'))}</p>
        <button class="btn btn-primary" type="button" data-retry>${icon('arrow-path')}<span>${esc(t('state.retry'))}</span></button>
      </div>`;
    const count = $('#result-count');
    if (count) count.textContent = '—';
    const filters = $('#result-filters');
    if (filters) filters.textContent = '';
    const more = $('#load-more');
    if (more) more.hidden = true;
    const retry = grid.querySelector('[data-retry]');
    if (retry) {
      retry.addEventListener('click', () => {
        const url = new URL(location.href);
        url.searchParams.delete('state');
        location.href = url.toString();
      });
    }
  }

  function renderWorks() {
    const grid = $('#work-grid');
    if (!grid || !DATA) return;
    const forced = new URLSearchParams(location.search).get('state');
    const line = $('.result-line');
    if (line) line.classList.toggle('is-loading', forced === 'loading');
    if (forced === 'loading') {
      renderSkeleton(grid);
      return;
    }
    if (forced === 'error') {
      renderError(grid);
      return;
    }

    let list = sortedWorks(filteredWorks());
    const total = forced === 'empty' ? 0 : list.length;
    const count = $('#result-count');
    if (count) count.textContent = String(total);
    renderResultFilters();

    if (forced === 'empty' || !list.length) {
      grid.removeAttribute('aria-busy');
      grid.innerHTML = emptyState();
      attachClear(grid);
      const more = $('#load-more');
      if (more) more.hidden = true;
      return;
    }

    const visible = list.slice(0, state.loaded);
    grid.removeAttribute('aria-busy');
    grid.innerHTML = '';
    visible.forEach((work, i) => grid.appendChild(workCard(work, i < 8)));
    const more = $('#load-more');
    if (more) {
      const rest = list.length - visible.length;
      more.hidden = rest <= 0;
      more.innerHTML = `${icon('plus')}<span>${esc(t('works.loadMore').replace('{n}', rest))}</span>`;
    }
  }

  function renderFavorites() {
    const grid = $('#favorites-grid');
    if (!grid || !DATA) return;
    const favs = getFavorites();
    const list = favs.map((slug) => DATA.works.find((work) => work.slug === slug)).filter(Boolean);
    grid.innerHTML = '';
    list.forEach((work, i) => grid.appendChild(workCard(work, i < 8)));
    const empty = $('#favorites-empty');
    if (empty) empty.hidden = list.length > 0;
    const count = $('#favorites-count');
    if (count) count.textContent = t('favorites.count').replace('{n}', list.length);
  }

  function findWork(slug) {
    return (DATA && DATA.works.find((work) => work.slug === slug)) || (DATA && DATA.works[0]) || null;
  }

  function renderDetail(work) {
    if (!work) return;
    state.currentWork = work;
    document.title = `${work.name} · 蓝色大肥鱼`;

    const title = $('#work-title');
    const meta = $('#work-meta');
    const image = $('#work-image');
    if (title) title.textContent = work.name;
    if (meta) {
      const type = work.catIds.length ? work.catIds.map(catLabel).join(' / ') : '—';
      meta.textContent = `${localizedCharName(work)} / ${type} / ${formatDate(work.date)}`;
    }
    if (image) {
      const stage = image.closest('.work-stage');
      const status = $('#stage-status');
      if (stage) {
        stage.classList.add('is-loading');
        stage.classList.remove('is-error');
      }
      if (status) {
        status.textContent = t('detail.loading');
        status.hidden = false;
      }
      if (work.width) image.setAttribute('width', work.width);
      if (work.height) image.setAttribute('height', work.height);
      image.src = work.large || work.thumb;
      image.alt = work.name;
      if (image.getAttribute('role') === 'button') image.setAttribute('aria-label', t('detail.viewImage'));
      if (image.complete && image.naturalWidth > 0) {
        if (stage) stage.classList.remove('is-loading');
        if (status) status.hidden = true;
      }
    }

    const download = $('#download');
    if (download) download.href = work.original || work.large || '#';

    const facts = $('#facts');
    if (facts) {
      const rows = [
        ['fact.char', localizedCharName(work)],
        ['fact.type', work.catIds.length ? work.catIds.map(catLabel).join(' / ') : '—'],
        ['fact.size', work.width && work.height ? `${work.width} × ${work.height}` : '—'],
        ['fact.format', work.format || '—'],
        ['fact.license', localizedLicense(work.license)],
        ['fact.source', localizedSource(work.source)],
      ];
      facts.innerHTML = rows.map(([key, value]) => `
        <div class="fact"><dt>${esc(t(key))}</dt><dd>${esc(value)}</dd></div>`).join('');
    }

    const commentary = $('#commentary');
    const commentaryText = $('#commentary-text');
    const text = work.commentary || work.description || '';
    if (commentary) commentary.hidden = !text;
    if (commentaryText) commentaryText.textContent = text;

    const same = DATA.works.filter((item) => item.charId === work.charId && item.slug !== work.slug).slice(0, 3);
    const strip = [work, ...same];
    state.lbImages = strip;
    state.lbIndex = 0;

    const thumbs = $('#work-thumbs');
    if (thumbs) {
      thumbs.setAttribute('aria-label', t('detail.thumbs'));
      thumbs.innerHTML = strip.map((item, i) => `
        <button class="thumb" type="button" data-thumb="${i}" aria-current="${i === 0 ? 'true' : 'false'}" aria-label="${escAttr(item.name)}">
          <img src="${escAttr(item.thumb)}" alt="" loading="lazy" width="144" height="144">
        </button>`).join('');
    }

    syncFavoriteButton($('#favorite'), work.slug);

    const related = DATA.works
      .filter((item) => item.slug !== work.slug && (
        item.charId === work.charId ||
        item.catIds.some((id) => work.catIds.includes(id))
      ))
      .slice(0, 4);
    const relatedGrid = $('#related-grid');
    if (relatedGrid) {
      relatedGrid.innerHTML = '';
      related.forEach((item, i) => relatedGrid.appendChild(workCard(item, i < 2)));
    }

    const url = new URL(location.href);
    url.searchParams.set('slug', work.slug);
    history.replaceState(null, '', url);
  }

  function openLightbox(index) {
    if (!state.lbImages.length) return;
    const dialog = $('#lightbox');
    if (!dialog) return;
    state.lbIndex = (index + state.lbImages.length) % state.lbImages.length;
    const work = state.lbImages[state.lbIndex];
    const img = $('#lb-img');
    const name = $('#lb-name');
    const count = $('#lb-count');
    if (img) {
      img.hidden = false;
      if (work.width) img.setAttribute('width', work.width);
      if (work.height) img.setAttribute('height', work.height);
      img.src = work.large || work.thumb;
      img.alt = work.name;
    }
    if (name) name.textContent = work.name;
    if (count) count.textContent = `${state.lbIndex + 1} / ${state.lbImages.length}`;
    openDialog(dialog);
  }

  function stepLightbox(delta) {
    if (!state.lbImages.length) return;
    openLightbox(state.lbIndex + delta);
  }

  async function copyText(text, message) {
    try {
      await navigator.clipboard.writeText(text);
      toast(message);
    } catch {
      toast(t('toast.copyFailed'), 'error');
    }
  }

  async function copyImage(url) {
    try {
      if (!window.ClipboardItem || !navigator.clipboard || !navigator.clipboard.write) throw new Error('unsupported');
      const response = await fetch(url);
      const blob = await response.blob();
      await navigator.clipboard.write([new ClipboardItem({ [blob.type]: blob })]);
      toast(t('toast.imageCopied'));
    } catch {
      await copyText(url, t('toast.imageLinkCopied'));
    }
  }

  function toggleFavoriteSlug(slug) {
    const favorites = getFavorites();
    const index = favorites.indexOf(slug);
    if (index >= 0) favorites.splice(index, 1);
    else favorites.push(slug);
    setFavorites(favorites);
    return index < 0;
  }

  function syncFavoriteButton(button, slug) {
    if (!button) return;
    const saved = isSaved(slug);
    button.setAttribute('aria-pressed', String(saved));
    const label = button.querySelector('span[data-i18n="detail.favorite"]');
    if (label) {
      label.dataset.i18n = saved ? 'detail.saved' : 'detail.favorite';
      label.textContent = t(saved ? 'detail.saved' : 'detail.favorite');
    }
  }

  function toggleFavorite() {
    if (!state.currentWork) return;
    const slug = state.currentWork.slug;
    const added = toggleFavoriteSlug(slug);
    syncFavoriteButton($('#favorite'), slug);
    toast(t(added ? 'toast.favAdded' : 'toast.favRemoved'));
  }

  function renderRail() {
    if (!DATA) return;
    const entries = [{ id: 'all', label: t('type.all'), count: DATA.total }, ...DATA.categories.map((category) => ({ id: category.id, label: catLabel(category.id), count: category.count }))];
    const rail = $('#rail-list');
    if (rail) rail.innerHTML = entries.map((entry) => `<a class="rail-item" href="works.html${entry.id === 'all' ? '' : `?t=${encodeURIComponent(entry.id)}`}" data-sidebar-type="${entry.id}"><span class="rail-label">${icon(TYPE_ICONS[entry.id] || 'photo')}<span>${esc(entry.label)}</span></span><span class="rail-count">${entry.count}</span></a>`).join('');
    const tabs = $('#type-tabs');
    if (tabs) tabs.innerHTML = entries.map((entry) => `<button class="type-tab" type="button" data-type="${entry.id}" aria-pressed="false">${icon(TYPE_ICONS[entry.id] || 'photo')}<span>${esc(entry.label)}</span></button>`).join('');
    updateActiveTypes();
  }

  function updateActiveTypes() {
    $$('[data-type]').forEach((button) => {
      const active = button.dataset.type === state.type;
      button.classList.toggle('is-active', active);
      button.setAttribute('aria-pressed', String(active));
    });
    $$('[data-sidebar-type]').forEach((link) => {
      const active = !!$('#work-grid') && link.dataset.sidebarType === state.type;
      if (active) link.setAttribute('aria-current', 'true');
      else link.removeAttribute('aria-current');
    });
  }

  function syncThemeButtons() {
    const label = t(document.documentElement.dataset.colorMode === 'light' ? 'theme.toDark' : 'theme.toLight');
    $$('[data-theme-toggle]').forEach((button) => {
      button.setAttribute('aria-label', label);
      button.title = label;
    });
  }

  function applyLang(lang) {
    state.lang = I18N[lang] ? lang : 'zh';
    document.documentElement.lang = state.lang === 'zh' ? 'zh-CN' : state.lang;
    writeStorage(LANG_KEY, state.lang);

    const dict = I18N[state.lang];
    $$('[data-i18n]').forEach((el) => {
      const key = el.dataset.i18n;
      if (dict[key] != null) el.textContent = dict[key];
    });
    $$('[data-i18n-placeholder]').forEach((el) => {
      const key = el.dataset.i18nPlaceholder;
      if (dict[key] != null) el.placeholder = dict[key];
    });
    $$('[data-i18n-aria]').forEach((el) => {
      const key = el.dataset.i18nAria;
      if (dict[key] != null) el.setAttribute('aria-label', dict[key]);
    });
    $$('[data-lang]').forEach((button) => {
      button.setAttribute('aria-pressed', String(button.dataset.lang === state.lang));
    });
    $$('[data-i18n-alt]').forEach((el) => { el.alt = t(el.dataset.i18nAlt); });
    syncThemeButtons();

    if (!DATA) return;
    if ($('#rail-list')) renderRail();
    if ($('#char-select')) populateSelects();
    if ($('#result-unit')) $('#result-unit').textContent = t('works.unit');
    renderPage();
  }

  function renderPage() {
    if (!DATA) return;
    if ($('#recent-grid')) {
      renderRecent();
      renderCharacters();
      renderCollection();
      updateFeedHead();
    }
    if ($('#work-grid')) renderWorks();
    if ($('#favorites-grid')) renderFavorites();
    if ($('#char-index')) renderCharactersPage();
    if ($('#topic-index')) renderTopicsPage();
    if ($('#work-title') && state.currentWork) renderDetail(state.currentWork);
  }

  function initSidebar() {
    const sidebar = $('#sidebar');
    const trigger = $('[data-open-sidebar]');
    if (!sidebar || !trigger) return;
    trigger.addEventListener('click', () => { openDialog(sidebar); trigger.setAttribute('aria-expanded', 'true'); });
    sidebar.addEventListener('close', () => { trigger.setAttribute('aria-expanded', 'false'); trigger.focus(); });
  }

  function initCommon() {
    window.addEventListener('deepsea:themechange', syncThemeButtons);
    $$('[data-lang]').forEach((button) => {
      button.addEventListener('click', () => applyLang(button.dataset.lang));
    });

    document.addEventListener('error', (event) => {
      const image = event.target;
      if (!(image instanceof HTMLImageElement)) return;
      const media = image.closest('.work-media');
      if (media) { image.hidden = true; media.classList.add('is-error'); media.setAttribute('role', 'img'); media.setAttribute('aria-label', `${image.alt}: ${t('media.error')}`); media.textContent = t('media.error'); }
    }, true);
    initSidebar();
    $$('[data-copy-group]').forEach((button) => button.addEventListener('click', () => copyText('1003728058', t('toast.copied'))));

    $$('[data-open-search]').forEach((button) => {
      button.addEventListener('click', () => {
        const form = $('#mobile-search');
        if (!form) return;
        form.hidden = !form.hidden;
        button.setAttribute('aria-expanded', String(!form.hidden));
        if (!form.hidden) {
          const input = form.querySelector('input[type="search"]');
          if (input) setTimeout(() => input.focus(), 0);
        }
      });
    });

    document.addEventListener('click', (event) => {
      const fav = event.target.closest('[data-fav]');
      if (!fav || !DATA) return;
      event.preventDefault();
      event.stopPropagation();
      const slug = fav.dataset.fav;
      const added = toggleFavoriteSlug(slug);
      fav.setAttribute('aria-pressed', String(added));
      const work = DATA.works.find((item) => item.slug === slug);
      if (work) {
        fav.setAttribute('aria-label', `${t(added ? 'detail.saved' : 'detail.favorite')} ${work.name}`);
      }
      toast(t(added ? 'toast.favAdded' : 'toast.favRemoved'));
      if ($('#favorites-grid')) renderFavorites();
    });

    $$('[data-close-dialog]').forEach((button) => {
      button.addEventListener('click', () => closeDialog(button.closest('dialog')));
    });

    $$('dialog').forEach((dialog) => {
      dialog.addEventListener('click', (event) => {
        if (event.target === dialog) closeDialog(dialog);
      });
      dialog.addEventListener('close', syncBodyLock);
    });

    document.addEventListener('click', (event) => {
      const button = event.target.closest('[data-type]');
      if (!button || !DATA) return;
      state.type = button.dataset.type;
      state.loaded = initialBatch();
      updateActiveTypes();
      syncURL();
      renderPage();
    });

    $$('[data-random]').forEach((button) => {
      button.addEventListener('click', () => {
        if (!DATA || !DATA.works.length) return;
        const work = DATA.works[Math.floor(Math.random() * DATA.works.length)];
        location.href = `work.html?slug=${encodeURIComponent(work.slug)}`;
      });
    });



    const lightbox = $('#lightbox');
    if (lightbox) {
      $$('[data-lb-close]').forEach((button) => button.addEventListener('click', () => closeDialog(lightbox)));
      $$('[data-lb-prev]').forEach((button) => button.addEventListener('click', () => stepLightbox(-1)));
      $$('[data-lb-next]').forEach((button) => button.addEventListener('click', () => stepLightbox(1)));
      lightbox.addEventListener('click', (event) => {
        if (event.target === lightbox || event.target.classList.contains('lightbox-inner')) {
          closeDialog(lightbox);
        }
      });
      document.addEventListener('keydown', (event) => {
        if (!lightbox.open) return;
        if (event.key === 'ArrowLeft') {
          event.preventDefault();
          stepLightbox(-1);
        } else if (event.key === 'ArrowRight') {
          event.preventDefault();
          stepLightbox(1);
        }
      });
    }
  }

  function initHome() {
    renderRail();
    renderRecent();
    renderCharacters();
    renderCollection();
  }

  function initWorks() {
    populateSelects();
    const charSel = $('#char-select');
    const topicSel = $('#topic-select');
    const sortSel = $('#sort-select');
    const clear = $('#clear-filters');
    const more = $('#load-more');

    if (charSel) {
      charSel.addEventListener('change', () => {
        state.char = charSel.value;
        state.loaded = initialBatch();
        updateActiveTypes();
        syncURL();
        renderWorks();
      });
    }
    if (topicSel) {
      topicSel.addEventListener('change', () => {
        state.topic = topicSel.value;
        state.loaded = initialBatch();
        updateActiveTypes();
        syncURL();
        renderWorks();
      });
    }
    if (sortSel) {
      sortSel.addEventListener('change', () => {
        state.sort = sortSel.value;
        if (state.sort === 'random') state.seed = Math.floor(Math.random() * 1e9);
        state.loaded = initialBatch();
        syncURL();
        renderWorks();
      });
    }
    if (clear) clear.addEventListener('click', clearFilters);
    if (more) {
      more.addEventListener('click', () => {
        state.loaded += BATCH;
        renderWorks();
      });
    }

    $$('input[name="q"]').forEach((input) => {
      input.value = state.q;
      input.addEventListener('input', debounce(() => {
        state.q = input.value.trim();
        state.loaded = initialBatch();
        $$('input[name="q"]').forEach((other) => {
          if (other !== input) other.value = input.value;
        });
        syncURL();
        renderWorks();
      }, 120));
    });

    $$('form[role="search"]').forEach((form) => {
      form.addEventListener('submit', (event) => {
        event.preventDefault();
        const input = form.querySelector('input[name="q"]');
        state.q = input ? input.value.trim() : state.q;
        state.loaded = initialBatch();
        syncURL();
        renderWorks();
        closeDialog(form.closest('dialog'));
      });
    });

    window.addEventListener('popstate', () => { readURL(); validateState(); populateSelects(); $$('input[name="q"]').forEach((input) => { input.value = state.q; }); updateActiveTypes(); renderWorks(); });
    updateActiveTypes();
    renderWorks();
  }

  function initDetail() {
    const params = new URLSearchParams(location.search);
    const work = findWork(params.get('slug'));
    if (!work) return;
    renderDetail(work);

    const image = $('#work-image');
    if (image) {
      image.setAttribute('tabindex', '0');
      image.setAttribute('role', 'button');
      image.setAttribute('aria-label', t('detail.viewImage'));
      const stage = image.closest('.work-stage');
      const status = $('#stage-status');
      image.addEventListener('load', () => {
        if (stage) stage.classList.remove('is-loading');
        if (status) status.hidden = true;
      });
      image.addEventListener('error', () => {
        if (stage) {
          stage.classList.remove('is-loading');
          stage.classList.add('is-error');
        }
        if (!status) return;
        status.textContent = t('detail.loadError');
        status.hidden = false;
      });
      image.addEventListener('click', () => openLightbox(0));
      image.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          openLightbox(0);
        }
      });
    }

    const thumbs = $('#work-thumbs');
    if (thumbs) {
      thumbs.addEventListener('click', (event) => {
        const button = event.target.closest('[data-thumb]');
        if (!button) return;
        const next = state.lbImages[Number(button.dataset.thumb)];
        if (!next) return;
        if (next.slug === state.currentWork.slug) openLightbox(0);
        else renderDetail(next);
      });
    }


    const copyImageButton = $('#copy-image');
    if (copyImageButton) {
      copyImageButton.addEventListener('click', () => {
        if (state.currentWork) copyImage(state.currentWork.original || state.currentWork.large);
      });
    }

    const copyLinkButton = $('#copy-link');
    if (copyLinkButton) {
      copyLinkButton.addEventListener('click', () => copyText(location.href, t('toast.linkCopied')));
    }

    const favorite = $('#favorite');
    if (favorite) favorite.addEventListener('click', toggleFavorite);
  }

  function initScreenshotStates() {
    const params = new URLSearchParams(location.search);
    if (params.get('sidebar') === 'open') { openDialog($('#sidebar')); $('[data-open-sidebar]')?.setAttribute('aria-expanded', 'true'); }
    if (params.get('lightbox') === '1') openLightbox(0);
  }

  function showFatal() {
    const grid = $('#work-grid') || $('#recent-grid') || $('#favorites-grid') || $('#char-index') || $('#topic-index');
    if (!grid) {
      toast(t('state.error'));
      return;
    }
    grid.innerHTML = `
      <div class="state-block is-error">
        <p>${esc(t('state.error'))}</p>
        <button class="btn btn-primary" type="button" data-retry>${icon('arrow-path')}<span>${esc(t('state.retry'))}</span></button>
      </div>`;
    const retry = grid.querySelector('[data-retry]');
    if (retry) retry.addEventListener('click', () => location.reload());
  }

  async function init() {
    const langParam = new URLSearchParams(location.search).get('lang');
    if (langParam && I18N[langParam]) state.lang = langParam;
    initCommon();
    applyLang(state.lang);

    try {
      const response = await fetch('works.json', { cache: 'no-store' });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      DATA = await response.json();
    } catch (error) {
      console.error(error);
      showFatal();
      return;
    }

    readURL();
    validateState();
    $$('[data-total]').forEach((el) => { el.textContent = String(DATA.total); });
    $$('input[name="q"]').forEach((input) => { input.value = state.q; });
    if ($('#result-unit')) $('#result-unit').textContent = t('works.unit');
    if ($('#rail-list')) renderRail();

    if ($('#recent-grid')) initHome();
    if ($('#work-grid')) initWorks();
    if ($('#work-title')) initDetail();
    if ($('#favorites-grid')) renderFavorites();
    if ($('#char-index')) renderCharactersPage();
    if ($('#topic-index')) renderTopicsPage();

    applyLang(state.lang);
    initScreenshotStates();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
