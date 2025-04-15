@echo off
echo 🚧 Building React frontend...
call npm run build

if errorlevel 1 (
    echo ❌ Build failed. Fix the errors and try again.
    exit /b
)

echo 🚚 Moving build to Flask backend...
rmdir /s /q src\backend\build
xcopy /E /I /Y build src\backend\build

echo 🚀 Starting Flask server...
cd src\backend
call ..\..\venv\Scripts\activate
python app.py
