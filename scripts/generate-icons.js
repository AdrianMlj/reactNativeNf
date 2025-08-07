const fs = require('fs');
const path = require('path');

// Créer le dossier scripts s'il n'existe pas
if (!fs.existsSync('scripts')) {
  fs.mkdirSync('scripts');
}

// Le contenu SVG du logo Nutrile Fit
const logoSvg = `<svg width="108" height="108" viewBox="0 0 108 108" xmlns="http://www.w3.org/2000/svg">
  <!-- Fond arrondi vert foncé -->
  <rect x="4" y="4" width="100" height="100" rx="20" fill="#1a3d1a"/>
  
  <!-- Symbole stylisé N en vert lime -->
  <g fill="#32cd32">
    <!-- Triangle supérieur gauche -->
    <polygon points="25,25 45,45 25,65"/>
    
    <!-- Rectangle horizontal -->
    <rect x="45" y="40" width="20" height="10"/>
    
    <!-- Triangle inférieur droit -->
    <polygon points="65,25 85,45 65,65"/>
    
    <!-- Petit carré en haut à droite -->
    <rect x="75" y="20" width="8" height="8"/>
  </g>
</svg>`;

// Sauvegarder le SVG
fs.writeFileSync('assets/logo.svg', logoSvg);

console.log('Logo SVG créé dans assets/logo.svg');
console.log('Vous devrez convertir ce SVG en PNG pour les différentes tailles d\'icônes Android');
console.log('Utilisez un outil comme Inkscape, GIMP ou un service en ligne pour convertir le SVG en PNG'); 