# DeepRabbit Frontend Deployment Script (PowerShell)
Write-Host "DeepRabbit Frontend Deployment Script" -ForegroundColor Cyan
Write-Host "====================================" -ForegroundColor Cyan

Write-Host "`nStep 1: Building React application..." -ForegroundColor Yellow
npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Host "Build failed! Exiting." -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit 1
}

Write-Host "`nStep 2: Preparing deployment files..." -ForegroundColor Yellow
if (!(Test-Path "deploy")) {
    New-Item -ItemType Directory -Name "deploy"
}

Write-Host "Copying main application files..." -ForegroundColor Green
Copy-Item "dist\*" "deploy\" -Recurse -Force

Write-Host "Copying landing pages..." -ForegroundColor Green
$landingPages = @(
    "landing.html",
    "pricing.html", 
    "how-it-works.html",
    "faq.html",
    "support.html",
    "user-guide.html",
    "tech-docs.html"
)

foreach ($page in $landingPages) {
    if (Test-Path $page) {
        Copy-Item $page "deploy\"
        Write-Host "  ✓ $page" -ForegroundColor Green
    } else {
        Write-Host "  ✗ $page (not found)" -ForegroundColor Red
    }
}

Write-Host "Copying static assets..." -ForegroundColor Green
$staticAssets = @(
    "favicon.svg",
    "manifest.webmanifest", 
    "audio-recorder-processor.js"
)

foreach ($asset in $staticAssets) {
    if (Test-Path $asset) {
        Copy-Item $asset "deploy\"
        Write-Host "  ✓ $asset" -ForegroundColor Green
    } else {
        Write-Host "  ✗ $asset (not found)" -ForegroundColor Red
    }
}

Write-Host "Creating marketing folder..." -ForegroundColor Green
if (!(Test-Path "deploy\marketing")) {
    New-Item -ItemType Directory -Name "deploy\marketing"
}
if (Test-Path "marketing") {
    Copy-Item "marketing\*" "deploy\marketing\" -Force
    Write-Host "  ✓ Marketing content copied" -ForegroundColor Green
}

Write-Host "`nStep 3: Deployment ready!" -ForegroundColor Cyan
Write-Host "========================" -ForegroundColor Cyan
Write-Host "All files are ready in the 'deploy' folder." -ForegroundColor White
Write-Host "Upload the contents of the 'deploy' folder to your web hosting." -ForegroundColor White

Write-Host "`nFiles to upload:" -ForegroundColor Yellow
Get-ChildItem "deploy" | ForEach-Object { Write-Host "  $($_.Name)" -ForegroundColor White }

Write-Host "`nNext steps:" -ForegroundColor Yellow
Write-Host "1. Upload all files from 'deploy' folder to your public_html" -ForegroundColor White
Write-Host "2. Ensure your backend API is running at https://deeprabbit.net/api" -ForegroundColor White
Write-Host "3. Test all pages are accessible" -ForegroundColor White

Write-Host "`nDeployment URLs after upload:" -ForegroundColor Cyan
Write-Host "• Main App: https://deeprabbit.net/" -ForegroundColor White
Write-Host "• Landing: https://deeprabbit.net/landing.html" -ForegroundColor White
Write-Host "• Pricing: https://deeprabbit.net/pricing.html" -ForegroundColor White
Write-Host "• How It Works: https://deeprabbit.net/how-it-works.html" -ForegroundColor White
Write-Host "• FAQ: https://deeprabbit.net/faq.html" -ForegroundColor White
Write-Host "• Support: https://deeprabbit.net/support.html" -ForegroundColor White
Write-Host "• User Guide: https://deeprabbit.net/user-guide.html" -ForegroundColor White
Write-Host "• Tech Docs: https://deeprabbit.net/tech-docs.html" -ForegroundColor White
Write-Host "• Marketing: https://deeprabbit.net/marketing/" -ForegroundColor White

Read-Host "`nPress Enter to exit"