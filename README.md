# Speak Clearly Book

《學會講清楚》是一個以多檔 Markdown 維護內容的電子書專案，能輸出為：

- 單頁閱讀網站
- EPUB 電子書

網站介面目前使用 Pandoc 產生 HTML，再用自訂 CSS 調整成接近 GitBook 的閱讀布局。

## 專案結構

```text
.
├─ metadata.yaml
├─ cover.png
├─ style.css
├─ build.sh
├─ serve.ps1
├─ test-local.ps1
├─ src/
│  ├─ 00-intro.md
│  ├─ 01-why.md
│  ├─ 02-principles.md
│  ├─ 03-3sentences.md
│  ├─ 04-structure.md
│  ├─ 05-precision.md
│  ├─ 06-example.md
│  ├─ 07-audience.md
│  ├─ 08-mistakes.md
│  ├─ 09-scenarios.md
│  └─ 10-advanced.md
└─ dist/
   ├─ index.html
   ├─ style.css
   └─ book.epub
```

## 本機建置

需要先安裝：

- `pandoc`
- `python`

### Shell

```sh
sh build.sh
```

### PowerShell 一鍵測試

```powershell
powershell -ExecutionPolicy Bypass -File .\test-local.ps1
```

這個腳本會：

- 清空 `dist/`
- 重新產出 `dist/index.html` 和 `dist/book.epub`
- 啟動 `http://localhost:8000`

指定其他連接埠：

```powershell
powershell -ExecutionPolicy Bypass -File .\test-local.ps1 -Port 9000
```

## GitHub Pages 部署

這個 repo 已包含 GitHub Actions workflow：

- [`.github/workflows/deploy-pages.yml`](.github/workflows/deploy-pages.yml)

當你 push 到 `main` 時，workflow 會：

1. 安裝 Pandoc
2. 重新建置 `dist/`
3. 將 `dist/` 部署到 GitHub Pages

## GitHub Pages 啟用方式

第一次使用時，請到 GitHub repository 設定頁確認：

1. 打開 `Settings`
2. 進入 `Pages`
3. `Source` 選擇 `GitHub Actions`

之後每次 push 到 `main`，網站就會自動更新。

## 輸出檔案

- `dist/index.html`：網站版
- `dist/book.epub`：電子書版
