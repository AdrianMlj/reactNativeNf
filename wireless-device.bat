# === CONFIGURATION ===
$projectDir = "D:\AppNutrilfit\reactNativeNf"
$scrcpyDir = "D:\AppNutrilfit\scrcpy-win64-v3.3.1\scrcpy-win64-v3.3.1"

Write-Host "🔍 Détection du téléphone connecté en USB..."
$deviceId = adb devices | Select-String "device$" | ForEach-Object { ($_ -split "`t")[0] }

if (-not $deviceId) {
    Write-Host "❌ Aucun appareil détecté en USB. Branche ton téléphone pour la configuration initiale." -ForegroundColor Red
    exit
}

Write-Host "✅ Téléphone détecté : $deviceId"

Write-Host "📡 Activation du mode TCP/IP sur le port 5555..."
adb -s $deviceId tcpip 5555 | Out-Null

Write-Host "🌐 Récupération de l'adresse IP..."
$ipInfo = adb -s $deviceId shell ip route
$phoneIP = ($ipInfo -split "src ")[1] -split " " | Select-Object -First 1

if (-not $phoneIP) {
    Write-Host "❌ Impossible de récupérer l'adresse IP" -ForegroundColor Red
    exit
}

Write-Host "✅ Adresse IP trouvée : $phoneIP"

Write-Host "🔌 Connexion au téléphone via Wi-Fi..."
adb connect $phoneIP | Out-Null

Write-Host "✅ Connecté au téléphone en Wi-Fi."

Write-Host "📱 Lancement de scrcpy..."
cd $scrcpyDir
Start-Process scrcpy.exe

Write-Host "🚀 Lancement du projet React Native..."
cd $projectDir
npx react-native run-android
Write-Host "✅ Projet React Native lancé avec succès."