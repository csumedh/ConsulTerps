@echo off
echo 🚧 Building React frontend...

:: ✅ Set OpenSSL legacy provider for Node 17+ compatibility
set NODE_OPTIONS=--openssl-legacy-provider
call npm run build

if errorlevel 1 (
    echo ❌ Build failed. Fix the errors and try again.
    exit /b
)

echo 🚚 Moving build to Flask backend...
rmdir /s /q src\backend\build
xcopy /E /I /Y build src\backend\build

echo 🐍 Setting up Python environment...
call venv\Scripts\activate
pip install -r src\backend\requirements.txt

echo 🚀 Starting Flask server...
cd src\backend
python app.py
