# Guide pour générer les icônes Nutrile Fit

## Logo créé
Le logo SVG a été créé dans `assets/logo.svg`

## Tailles d'icônes Android nécessaires

Vous devez créer les icônes PNG suivantes à partir du SVG :

### Mipmap folders :
- `android/app/src/main/res/mipmap-mdpi/ic_launcher.png` (48x48 px)
- `android/app/src/main/res/mipmap-hdpi/ic_launcher.png` (72x72 px)
- `android/app/src/main/res/mipmap-xhdpi/ic_launcher.png` (96x96 px)
- `android/app/src/main/res/mipmap-xxhdpi/ic_launcher.png` (144x144 px)
- `android/app/src/main/res/mipmap-xxxhdpi/ic_launcher.png` (192x192 px)

### Icônes rondes :
- `android/app/src/main/res/mipmap-mdpi/ic_launcher_round.png` (48x48 px)
- `android/app/src/main/res/mipmap-hdpi/ic_launcher_round.png` (72x72 px)
- `android/app/src/main/res/mipmap-xhdpi/ic_launcher_round.png` (96x96 px)
- `android/app/src/main/res/mipmap-xxhdpi/ic_launcher_round.png` (144x144 px)
- `android/app/src/main/res/mipmap-xxxhdpi/ic_launcher_round.png` (192x192 px)

## Outils recommandés pour convertir SVG vers PNG :

1. **Inkscape** (gratuit) : Ouvrez le SVG et exportez en PNG
2. **GIMP** (gratuit) : Importez le SVG et exportez en PNG
3. **Online SVG to PNG converter** : Sites web comme convertio.co
4. **Adobe Illustrator** : Si vous l'avez

## Instructions rapides avec Inkscape :
1. Ouvrez `assets/logo.svg` dans Inkscape
2. File > Export PNG Image
3. Choisissez la taille (ex: 192x192 pour xxxhdpi)
4. Exportez vers le dossier approprié

## Nom de l'application mis à jour
Le nom de l'application a été changé de "reactNativeNf" à "Nutrile Fit" dans :
- `app.json`
- `android/app/src/main/res/values/strings.xml` 