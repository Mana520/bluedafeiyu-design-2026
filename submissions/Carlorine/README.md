# 蓝色大肥鱼 · 深海海报（投稿包）

入口：`index.html`（深海海报首页）。同目录 `production/` 是现行生产站的代表页快照。

## 目录

| 路径 | 内容 |
|---|---|
| `index.html` 等 7 个页面 | 「深海海报」原型：首页 / 作品库 / 作品详情 / 角色 / 合集 / 社群 / 收藏 |
| `deepsea.css`、`prototype.js`、`theme.js`、`icons.svg`、`works.json`、`assets/` | 原型样式、交互与数据 |
| `production/` | 现行生产站裁剪版：首页、作品库、分类、12 个角色页、合集、社群、活动、搜索、收藏与 3 个作品详情页 |

## 运行

页面通过 `fetch` 读取本地 `works.json` / `works-v2.json`，需要静态服务器（`file://` 下会被浏览器拦截）：

```bash
# 在本目录
python3 -m http.server 8080
# 打开 http://127.0.0.1:8080/index.html
```

- 原型：字体、DaisyUI / Tailwind 走 CDN，作品图走 GitHub Raw，需要联网。
- 生产站快照：页面内链接指向本目录已收录的页面；未收录的页面与全部作品图、头像指向 <https://xn--pssy23gqgbz2d718b.com/>。
- 生产站用 `<base>` 指向自身根目录，因此放在任意子路径下都能打开。

## 来源

- 深海海报原型：`bluedafeiyu-design`
- 生产站：`bluedafeiyu-site`（Astro 构建产物裁剪）
