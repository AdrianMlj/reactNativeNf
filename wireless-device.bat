@echo off
REM === Config ===
set SCRCPY_DIR=D:\AppNutrilfit\scrcpy-win64-v3.3.1\scrcpy-win64-v3.3.1

echo [1] Detection de l'appareil en USB...
for /f "skip=1 tokens=1" %%i in ('adb devices') do (
    if "%%i" NEQ "" (
        set DEVICE_ID=%%i
        goto found
    )
)
echo Aucun appareil trouvé. Branchez-le en USB.
pause
exit /b

:found
echo Appareil détecté: %DEVICE_ID%

echo [2] Activation du mode TCP/IP...
adb -s %DEVICE_ID% tcpip 5555

echo [3] Récupération de l'adresse IP...
for /f "tokens=1,2,3" %%a in ('adb -s %DEVICE_ID% shell ip route') do (
    set PHONE_IP=%%3
)

echo IP détectée: %PHONE_IP%

echo [4] Connexion en Wi-Fi...
adb connect %PHONE_IP%

echo [5] Lancement de scrcpy...
"%SCRCPY_DIR%\scrcpy.exe" -s %PHONE_IP%
pause
