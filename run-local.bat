@echo off
setlocal
title Futuristic Portfolio - Local Server

:: Ensure path includes nodejs and git
set "PATH=%SystemRoot%\system32;%SystemRoot%;%SystemRoot%\System32\Wbem;%SystemRoot%\System32\WindowsPowerShell\v1.0\;C:\Program Files\nodejs\;C:\Program Files\Git\cmd\;%PATH%"

echo ========================================================
echo       Starting Futuristic Portfolio Locally
echo ========================================================
echo.
echo Opening http://localhost:3000 in your browser...
echo.

:: Automatically open browser after 3 seconds in the background
start "" cmd /c "timeout /t 3 /nobreak >nul && start http://localhost:3000"

:: Start Next.js development server
call npm.cmd run dev

pause
