param(
  [int]$Port = 8000
)

$ErrorActionPreference = "Stop"

$projectRoot = $PSScriptRoot
$distPath = Join-Path $projectRoot "dist"
$chapters = @(
  "src/00-intro.md",
  "src/01-why.md",
  "src/02-principles.md",
  "src/03-3sentences.md",
  "src/04-structure.md",
  "src/05-precision.md",
  "src/06-example.md",
  "src/07-audience.md",
  "src/08-mistakes.md",
  "src/09-scenarios.md",
  "src/10-advanced.md"
)

if (-not (Get-Command pandoc -ErrorAction SilentlyContinue)) {
  throw "pandoc not found. Please install pandoc first."
}

if (-not (Get-Command python -ErrorAction SilentlyContinue)) {
  throw "python not found. Please install Python first."
}

$portInUse = netstat -ano | Select-String ":$Port\s+.*LISTENING"
if ($portInUse) {
  throw "localhost:$Port is already in use. Stop the old server or choose another port with -Port."
}

if (Test-Path -LiteralPath $distPath) {
  Remove-Item -LiteralPath $distPath -Recurse -Force
}
New-Item -ItemType Directory -Path $distPath | Out-Null

& pandoc "metadata.yaml" @chapters "-o" "dist/book.epub" "--css=style.css"
& pandoc "metadata.yaml" @chapters "-o" "dist/index.html" "--css=style.css" "--standalone" "--toc"
Copy-Item -LiteralPath (Join-Path $projectRoot "style.css") -Destination (Join-Path $distPath "style.css") -Force

$server = Start-Process python -ArgumentList "-m", "http.server", "$Port" -WorkingDirectory $distPath -PassThru

Write-Host "dist has been cleared and rebuilt."
Write-Host "Local server started at http://localhost:$Port"
Write-Host "Server PID: $($server.Id)"
