@echo off
cd /d "%~dp0"

cmd /c npm install > npm-log.txt 2>&1 || echo NPM install failed, continuing anyway...

REM 
cmd /c node index.js

pause