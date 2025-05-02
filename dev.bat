@echo off
cd /d %~dp0

:: Set absolute path to your nvm-installed Node.js
set "NODEJS_PATH=C:\Program Files\nodejs"
set "NPM_GLOBAL_PATH=%APPDATA%\npm"

:: Force use of Node 18
call "C:\Program Files\nvm\nvm.exe" use 18

:: Manually add correct paths to this session
set "PATH=%NODEJS_PATH%;%NPM_GLOBAL_PATH%;%PATH%"

:: Set OpenSSL workaround for CRA/Webpack compatibility
set "NODE_OPTIONS=--openssl-legacy-provider"

:: Start React dev server
call npm start
