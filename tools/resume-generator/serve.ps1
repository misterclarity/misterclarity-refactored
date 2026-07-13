# Starts the resume generator on http://localhost:8790 and opens it.
# Run:  .\tools\resume-generator\serve.ps1     (Ctrl+C to stop)

$root = $PSScriptRoot
$port = 8790

Start-Process "http://localhost:$port/"
Write-Host "Resume generator -> http://localhost:$port/  (Ctrl+C to stop)" -ForegroundColor Yellow
python -m http.server $port --directory $root
