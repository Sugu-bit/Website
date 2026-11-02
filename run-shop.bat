@echo off
setlocal

set "ROOT=%~dp0"
set "BACKEND_ROOT=%ROOT%shop-backend"

echo Checking Shop launcher prerequisites...

if not exist "%BACKEND_ROOT%\composer.json" (
    echo ERROR: shop-backend was not found next to this launcher.
    goto failed
)

if exist "%ROOT%shop-frontend\package.json" set "FRONTEND_ROOT=%ROOT%shop-frontend"
if exist "%ROOT%package.json" set "FRONTEND_ROOT=%ROOT%"
if not defined FRONTEND_ROOT (
    echo ERROR: The React frontend package.json was not found.
    goto failed
)

where php >nul 2>nul
if errorlevel 1 (
    echo ERROR: PHP was not found. Install PHP 8.2 or newer and add it to PATH.
    goto failed
)

where npm >nul 2>nul
if errorlevel 1 (
    echo ERROR: npm was not found. Install Node.js and add it to PATH.
    goto failed
)

if not exist "%BACKEND_ROOT%\vendor\autoload.php" (
    echo Backend dependencies are missing. Installing with Composer...
    where composer >nul 2>nul
    if errorlevel 1 (
        echo ERROR: Composer was not found. Install Composer and add it to PATH.
        goto failed
    )
    pushd "%BACKEND_ROOT%"
    composer install
    if errorlevel 1 (
        popd
        echo ERROR: Composer dependency installation failed.
        goto failed
    )
    popd
)

if not exist "%FRONTEND_ROOT%\node_modules\react-scripts\scripts\start.js" (
    echo Frontend dependencies are missing. Installing with npm...
    pushd "%FRONTEND_ROOT%"
    call npm install
    if errorlevel 1 (
        popd
        echo ERROR: npm dependency installation failed.
        goto failed
    )
    popd
)

if not exist "%BACKEND_ROOT%\.env.local" if not exist "%BACKEND_ROOT%\.env" (
    echo ERROR: shop-backend\.env.local was not found. Configure the backend before starting.
    goto failed
)

echo Starting Symfony API and React frontend...
start "Symfony API" /D "%BACKEND_ROOT%" "%ComSpec%" /k "set APP_ENV=dev&& set APP_DEBUG=1&& php -S 127.0.0.1:8000 -t public"
start "React frontend" /D "%FRONTEND_ROOT%" "%ComSpec%" /k "set REACT_APP_API_URL=http://127.0.0.1:8000/api&& npm start"

echo.
echo Started both apps in separate command windows.
echo Frontend: http://localhost:3000
echo API:      http://127.0.0.1:8000/api
echo Ensure your database is running and configured in shop-backend\.env.
goto finished

:failed
echo.
echo Fix the error above, then run run-shop.bat again.
:finished
echo.
pause
