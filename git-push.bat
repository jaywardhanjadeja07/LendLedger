@echo off
echo ==========================================
echo      LendLedger Git Push Helper
echo ==========================================
echo.

:: 1. Add all changes
echo [1/3] Adding changes...
git add .
if %ERRORLEVEL% NEQ 0 (
    echo Error adding files.
    pause
    exit /b %ERRORLEVEL%
)

:: 2. Ask for commit message
set /p commit_msg="Enter commit message: "
if "%commit_msg%"=="" set commit_msg="Update code"

:: 3. Commit
echo [2/3] Committing with message: "%commit_msg%"...
git commit -m "%commit_msg%"
if %ERRORLEVEL% NEQ 0 (
    echo Nothing to commit or error committing.
    :: Continue anyway in case we just want to push previous commits
)

:: 4. Push
echo [3/3] Pushing to origin main...
git push origin main
if %ERRORLEVEL% NEQ 0 (
    echo Error pushing to remote.
    pause
    exit /b %ERRORLEVEL%
)

echo.
echo ==========================================
echo      Success! Code pushed to GitHub.
echo ==========================================
pause
