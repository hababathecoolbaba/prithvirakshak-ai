$Root = Split-Path -Parent $MyInvocation.MyCommand.Path
$Python = Join-Path $Root ".venv\Scripts\python.exe"

if (-not (Test-Path $Python)) {
    Write-Host "Backend Python environment not found." -ForegroundColor Red
    exit 1
}

Set-Location $Root

Write-Host ""
Write-Host "Starting PRITHVIRAKSHAK FastAPI backend..." -ForegroundColor Cyan
Write-Host "API:  http://127.0.0.1:8000" -ForegroundColor Green
Write-Host "Docs: http://127.0.0.1:8000/docs" -ForegroundColor Green
Write-Host ""

& $Python -m uvicorn main:app --reload --host 127.0.0.1 --port 8000
