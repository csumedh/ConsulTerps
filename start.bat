@echo off
echo 🚧 Building React frontend...
cd src
call npm run build

if errorlevel 1 (
    echo ❌ Build failed. Fix the errors and try again.
    exit /b
)

echo 🚚 Moving build to Flask backend...
rmdir /s /q backend\build
xcopy /E /I /Y build backend\build

echo 🚀 Starting Flask server...
cd backend
call ..\..\venv\Scripts\activate
python app.py
