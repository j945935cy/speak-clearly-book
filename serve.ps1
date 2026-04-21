param(
  [int]$Port = 8000
)

$ErrorActionPreference = "Stop"

$distPath = Join-Path $PSScriptRoot "dist"

if (-not (Test-Path -LiteralPath $distPath)) {
  throw "dist 資料夾不存在，請先執行建置。"
}

if (-not (Test-Path -LiteralPath (Join-Path $distPath "index.html"))) {
  throw "dist/index.html 不存在，請先執行建置。"
}

Set-Location $distPath
Write-Host "Serving $distPath at http://localhost:$Port"
Write-Host "Press Ctrl+C to stop the server."
python -m http.server $Port
