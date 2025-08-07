# 📋 Interface de Profilage NutriBot - NUTR'ILEFIT

## 🎯 Vue d'ensemble

Cette implémentation complète de l'interface de profilage NutriBot suit exactement les spécifications du document **PROFILAGE COMPLET NUTRIBOT – NUTR'ILEFIT**. L'interface guide les utilisateurs à travers 6 étapes de profilage pour générer un NutriType personnalisé parmi 70 profils possibles.

## 📊 Statistiques du Système

- **Profils théoriques totaux** : 360 millions
- **NutriTypes disponibles** : 70
- **Profils par NutriType** : ~5,142,857

## 🏗️ Architecture de l'Application

### Structure des Fichiers

```
src/
├── types/
│   └── ProfilingTypes.ts          # Types TypeScript pour tout le système
├── utils/
│   └── ProfilingUtils.ts          # Utilitaires de calcul et validation
├── components/
│   ├── ProfilingScreen.tsx        # Composant principal de navigation
│   └── steps/
│       ├── EtapeObjectif.tsx      # Étape 1 : Objectif personnel
│       ├── EtapeDonneesPhysiques.tsx # Étape 2 : Données physiques
│       ├── EtapeDonneesSante.tsx  # Étape 3 : Données santé
│       ├── EtapeHabitudesAlimentaires.tsx # Étape 4 : Habitudes alimentaires
│       ├── EtapeMotivationsBlockages.tsx # Étape 5 : Motivations & Blocages
│       ├── EtapeActivitesSportives.tsx # Étape 6 : Activités sportives
│       └── EtapeResultats.tsx     # Résultats et NutriType
```

## 📝 Détail des 6 Étapes

### ✅ Étape 1 : Objectif Personnel
**Question** : "Quel est ton objectif principal ?"

**9 Options disponibles** :
1. Perdre du poids
2. Prendre du poids sainement
3. Maintenir mon poids actuel
4. Améliorer mon niveau d'énergie
5. Gérer mon stress / mon humeur
6. Améliorer mes performances sportives
7. Mieux dormir
8. Être accompagné(e) pour un problème de santé
9. Avoir une meilleure relation avec l'alimentation

### ✅ Étape 2 : Données Physiques
**Question** : "Parlons un peu de toi"

**Champs collectés** :
- **Sexe** : Masculin / Féminin
- **Âge** : Saisie numérique
- **Taille** : En centimètres
- **Poids** : En kilogrammes
- **IMC** : Calculé automatiquement avec catégorisation
- **Tour de taille** : Optionnel
- **Niveau d'activité** : 5 niveaux (Sédentaire → Travail physique)

### ✅ Étape 3 : Données Santé
**Question** : "As-tu des situations à prendre en compte ?"

**10 Situations disponibles** (sélection multiple) :
1. Diabète
2. Hypertension
3. Cholestérol élevé
4. Troubles digestifs
5. Stress / Anxiété
6. Fatigue chronique
7. Troubles du sommeil
8. Dépression légère
9. Troubles menstruels
10. Aucun

### ✅ Étape 4 : Habitudes Alimentaires
**7 Sous-questions** avec options fixes :

1. **Nombre de repas** : 1 / 2 / 3 / 4+
2. **Grignotage** : Jamais / Rarement / Souvent / Toujours
3. **Boissons sucrées** : Jamais / 1x/jour / 2+
4. **Eau bue** : <1L / 1-2L / >2L
5. **Légumes** : <2 portions / 3-4 / 5+
6. **Mode cuisson** : Friture / Vapeur / Cru / Mixte
7. **Produits transformés** : Rarement / Régulièrement / Tous les jours

### ✅ Étape 5 : Motivations & Blocages
**Deux sections avec sélection multiple** :

**Motivations** :
1. Me sentir mieux dans mon corps
2. Avoir plus d'énergie
3. Être plus confiant(e)
4. Être accompagné(e)
5. Relever un défi

**Blocages** :
1. Manque de motivation
2. Entourage décourageant
3. Manque de temps
4. Difficulté financière
5. J'abandonne vite

### ✅ Étape 6 : Activités Sportives
**Question** : "Quel(s) sport(s) pratiques-tu ou souhaites-tu pratiquer ?"

**13 Activités disponibles** (sélection multiple) :
1. 🏃 Marche rapide
2. 🏋️ Musculation / fitness
3. 🧘 Yoga / relaxation
4. 🏀 Sports collectifs
5. 💃 Danse
6. 🚴 Vélo
7. 🏊 Natation
8. 🥊 Sports de combat
9. 🧗 Randonnée / outdoor
10. 🪂 Activités extrêmes
11. 🧒 Activité en famille
12. 📱 Exercices via app/vidéo
13. ❓ Autre (avec champ libre)

## 🧬 Calcul du NutriType

### Algorithme de Génération

Le NutriType est calculé en combinant :
1. **Objectif principal** (PERTE_, PRISE_, MAINTIEN_, etc.)
2. **Niveau d'activité** (SED, LEG, MOD, ACT, PHY)
3. **Catégorie IMC** (_M, _N, _S, _O)
4. **Situations de santé** (_H1, _H2, _H3)

**Exemple** : `PERTE_MOD_N_H1`
- PERTE : Objectif perte de poids
- MOD : Modérément actif
- N : IMC normal
- H1 : 1 situation de santé

### Validation des Données

Chaque étape inclut une validation en temps réel :
- **Étape 1** : Un objectif doit être sélectionné
- **Étape 2** : Tous les champs obligatoires + calcul IMC automatique
- **Étape 3** : Au moins une sélection (y compris "Aucun")
- **Étape 4** : Toutes les 7 questions doivent être répondues
- **Étape 5** : Au moins 1 motivation ET 1 blocage
- **Étape 6** : Au moins 1 activité sélectionnée

## 🎨 Design et UX

### Principes de Design
- **Interface moderne** avec Material Design
- **Navigation fluide** avec barre de progression
- **Feedback visuel** immédiat sur les sélections
- **Validation en temps réel** pour guider l'utilisateur
- **Responsive design** adapté à tous les écrans

### Palette de Couleurs
- **Primary** : `#00b894` (Vert turquoise)
- **Success** : `#27ae60` (Vert)
- **Warning** : `#f39c12` (Orange)
- **Danger** : `#e74c3c` (Rouge)
- **Info** : `#3498db` (Bleu)

### Composants Réutilisables
- Cards avec bordures colorées
- Boutons avec états (normal/sélectionné/désactivé)
- Barres de progression animées
- Icônes émojis pour une meilleure UX

## 🚀 Utilisation

### Installation
```bash
# Installer les dépendances
npm install

# Lancer l'application (iOS)
npx react-native run-ios

# Lancer l'application (Android)
npx react-native run-android
```

### Intégration dans l'App

```tsx
import ProfilingScreen from './src/components/ProfilingScreen';
import { UserProfile } from './src/types/ProfilingTypes';

const handleProfilingComplete = (profile: UserProfile) => {
  console.log('Profil généré:', profile);
  // Sauvegarder le profil
  // Rediriger vers le dashboard
};

<ProfilingScreen onComplete={handleProfilingComplete} />
```

## 📊 Structure des Données

### Profil Utilisateur Complet

```typescript
interface UserProfile {
  // Étape 1
  objectif: ObjectifPersonnel;
  
  // Étape 2
  donneesPhysiques: {
    sexe: 'masculin' | 'feminin';
    age: number;
    taille: number;
    poids: number;
    imc: number; // calculé
    categorieIMC: CategorieIMC; // calculé
    tourTaille?: number;
    niveauActivite: NiveauActivite;
  };
  
  // Étape 3
  donneesSante: {
    situations: SituationSante[];
    nombreSituations: 0 | 1 | 2 | 3; // calculé
  };
  
  // Étape 4
  habitudesAlimentaires: {
    nombreRepas: 1 | 2 | 3 | 4;
    grignotage: 'jamais' | 'rarement' | 'souvent' | 'toujours';
    boissonsSucrees: 'jamais' | '1x_jour' | '2plus';
    eauBue: 'moins_1L' | '1_2L' | 'plus_2L';
    consommationLegumes: 'moins_2' | '3_4' | '5plus';
    modeCuisson: 'friture' | 'vapeur' | 'cru' | 'mixte';
    produitsTransformes: 'rarement' | 'regulierement' | 'tous_jours';
  };
  
  // Étape 5
  motivationsBlockages: {
    motivations: Motivation[];
    blocages: Blocage[];
  };
  
  // Étape 6
  activitesSportives: {
    activites: ActiviteSportive[];
    autreActivite?: string;
  };
  
  // Calculés
  nutriType: string;
  profilId: string;
}
```

## 🔧 Fonctionnalités Avancées

### Calculs Automatiques
- **IMC** : Calculé en temps réel (taille/poids)
- **Catégorie IMC** : Maigreur/Normal/Surpoids/Obésité
- **Nombre situations santé** : Regroupement 0/1/2/3+
- **ID Profil** : Génération unique basée sur les réponses
- **NutriType** : Algorithme de classification intelligent

### Validation et UX
- **Navigation conditionnelle** : Impossible d'avancer sans validation
- **Sauvegarde automatique** : Les réponses sont conservées
- **Retour en arrière** : Modification possible à tout moment
- **Indicateurs visuels** : Progression claire et feedback immédiat

### Accessibilité
- **Contrastes élevés** pour une meilleure lisibilité
- **Tailles de police** adaptées
- **Navigation au clavier** supportée
- **Icônes descriptives** avec émojis universels

## 🎯 Prochaines Étapes

### Fonctionnalités à Développer
1. **Sauvegarde persistante** des profils (AsyncStorage/Base de données)
2. **Recommandations IA** basées sur le NutriType
3. **Plans nutritionnels** personnalisés
4. **Programmes d'entraînement** adaptés
5. **Suivi quotidien** avec métriques
6. **Notifications intelligentes** de rappel
7. **Partage social** des progrès
8. **Synchronisation cloud** multi-appareils

### Améliorations Techniques
1. **Tests unitaires** pour tous les composants
2. **Tests d'intégration** du flux complet
3. **Performance optimization** pour les grandes listes
4. **Internationalisation** (i18n) multi-langues
5. **Analytics** de parcours utilisateur
6. **A/B Testing** des interfaces

## 📈 Métriques et Analytics

### KPIs à Suivre
- **Taux de complétion** par étape
- **Temps moyen** de profilage
- **Abandons** par étape
- **Distribution** des NutriTypes
- **Retours utilisateur** sur l'UX

### Données Collectées
- **Profils anonymisés** pour améliorer l'IA
- **Parcours utilisateur** pour optimiser l'UX
- **Performances** de l'application
- **Erreurs** et crashs potentiels

---

## 🏆 Conclusion

Cette implémentation complète de l'interface de profilage NutriBot respecte fidèlement les spécifications du document original. Elle offre une expérience utilisateur moderne, intuitive et complète pour générer des profils personnalisés parmi les 360 millions de combinaisons possibles, regroupées intelligemment en 70 NutriTypes utiles.

L'architecture modulaire permet une maintenance facile et des extensions futures, tandis que le design moderne assure une adoption utilisateur optimale.

**🚀 Prêt pour le lancement !**