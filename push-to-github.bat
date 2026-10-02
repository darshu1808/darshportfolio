@echo off
setlocal
title Futuristic Portfolio - Push to GitHub

:: Ensure path includes git and nodejs
set "PATH=%SystemRoot%\system32;%SystemRoot%;%SystemRoot%\System32\Wbem;%SystemRoot%\System32\WindowsPowerShell\v1.0\;C:\Program Files\Git\cmd\;C:\Program Files\nodejs\;%PATH%"

echo ========================================================
echo           Pushing Portfolio Changes to GitHub
echo ========================================================
echo.

:: Show changed files
echo Checking modified files:
git status -s
echo.

:: Prompt for commit message
set /p commit_msg="Enter description for changes (or press Enter for automatic message): "
if "%commit_msg%"=="" (
    for /f "tokens=2-4 delims=/ " %%a in ('date /t') do (set mydate=%%c-%%a-%%b)
    for /f "tokens=1-2 delims=/:" %%a in ('time /t') do (set mytime=%%a:%%b)
    set commit_msg=Update portfolio - %date% %time%
)

echo.
echo Staging changes...
git add .

echo Committing: "%commit_msg%"...
git commit -m "%commit_msg%"

echo.
echo Pushing to GitHub (origin main)...
git push origin main

echo.
echo ========================================================
if %ERRORLEVEL% EQU 0 (
    echo   SUCCESS: Changes successfully pushed to GitHub!
) else (
    echo   NOTE: If this is your first time, check your browser
    echo   for the GitHub authentication popup.
)
echo ========================================================
echo.
pause
