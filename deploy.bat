@echo off
echo DeepRabbit Frontend Deployment Script
echo ====================================

echo.
echo Step 1: Building React application...
call npm run build
if %errorlevel% neq 0 (
    echo Build failed! Exiting.
    pause
    exit /b 1
)

echo.
echo Step 2: Preparing deployment files...
if not exist "deploy" mkdir deploy

echo Copying main application files...
xcopy "dist\*" "deploy\" /E /Y

echo Copying landing pages...
copy "landing.html" "deploy\"
copy "pricing.html" "deploy\"
copy "how-it-works.html" "deploy\"
copy "faq.html" "deploy\"
copy "support.html" "deploy\"
copy "user-guide.html" "deploy\"
copy "tech-docs.html" "deploy\"

echo Copying static assets...
copy "favicon.svg" "deploy\"
copy "manifest.webmanifest" "deploy\"
copy "audio-recorder-processor.js" "deploy\"

echo Creating marketing folder...
if not exist "deploy\marketing" mkdir "deploy\marketing"
copy "marketing\*" "deploy\marketing\"

echo.
echo Step 3: Deployment ready!
echo ========================
echo All files are ready in the 'deploy' folder.
echo Upload the contents of the 'deploy' folder to your web hosting.
echo.
echo Files to upload:
dir deploy /B
echo.
echo Next steps:
echo 1. Upload all files from 'deploy' folder to your public_html
echo 2. Ensure your backend API is running at https://deeprabbit.net/api
echo 3. Test all pages are accessible
echo.
pause
