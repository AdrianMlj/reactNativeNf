import {
  UserProfile,
  DonneesPhysiques,
  CategorieIMC,
  ObjectifPersonnel,
  SituationSante,
  NiveauActivite,
  HabitudesAlimentaires,
  MotivationsBlockages,
  ActivitesSportives
} from '../types/ProfilingTypes';

// Calcul de l'IMC et de sa catégorie
export const calculerIMC = (taille: number, poids: number): number => {
  const tailleEnMetres = taille / 100;
  return Math.round((poids / (tailleEnMetres * tailleEnMetres)) * 10) / 10;
};

export const determinerCategorieIMC = (imc: number): CategorieIMC => {
  if (imc < 18.5) return CategorieIMC.MAIGREUR;
  if (imc < 25) return CategorieIMC.NORMAL;
  if (imc < 30) return CategorieIMC.SURPOIDS;
  return CategorieIMC.OBESITE;
};

// Calcul du nombre de situations de santé
export const calculerNombreSituationsSante = (situations: SituationSante[]): 0 | 1 | 2 | 3 => {
  const situationsReelles = situations.filter(s => s !== SituationSante.AUCUN);
  const nombre = situationsReelles.length;
  return nombre >= 3 ? 3 : nombre as 0 | 1 | 2 | 3;
};

// Génération d'un ID de profil unique
export const genererProfilId = (profile: UserProfile): string => {
  const elements = [
    profile.objectif,
    profile.donneesPhysiques.sexe,
    profile.donneesPhysiques.categorieIMC,
    profile.donneesPhysiques.niveauActivite,
    profile.donneesSante.nombreSituations,
    profile.habitudesAlimentaires.nombreRepas,
    profile.habitudesAlimentaires.grignotage,
    profile.motivationsBlockages.motivations.length,
    profile.motivationsBlockages.blocages.length,
    profile.activitesSportives.activites.length
  ];
  
  return elements.join('_').replace(/\s+/g, '_').toLowerCase();
};

// Calcul du NutriType basé sur les caractéristiques principales
export const determinerNutriType = (profile: UserProfile): string => {
  const { objectif, donneesPhysiques, donneesSante, habitudesAlimentaires } = profile;
  
  // Logique simplifiée pour déterminer le NutriType
  let nutriType = '';
  
  // Base sur l'objectif principal
  switch (objectif) {
    case ObjectifPersonnel.PERDRE_POIDS:
      nutriType += 'PERTE_';
      break;
    case ObjectifPersonnel.PRENDRE_POIDS:
      nutriType += 'PRISE_';
      break;
    case ObjectifPersonnel.MAINTENIR_POIDS:
      nutriType += 'MAINTIEN_';
      break;
    case ObjectifPersonnel.AMELIORER_ENERGIE:
      nutriType += 'ENERGIE_';
      break;
    case ObjectifPersonnel.PERFORMANCES_SPORTIVES:
      nutriType += 'SPORT_';
      break;
    default:
      nutriType += 'EQUILIBRE_';
  }
  
  // Ajout du niveau d'activité
  switch (donneesPhysiques.niveauActivite) {
    case NiveauActivite.SEDENTAIRE:
      nutriType += 'SED';
      break;
    case NiveauActivite.LEGEREMENT_ACTIF:
      nutriType += 'LEG';
      break;
    case NiveauActivite.MODEREMENT_ACTIF:
      nutriType += 'MOD';
      break;
    case NiveauActivite.TRES_ACTIF:
      nutriType += 'ACT';
      break;
    case NiveauActivite.TRAVAIL_PHYSIQUE:
      nutriType += 'PHY';
      break;
  }
  
  // Ajout de l'IMC
  switch (donneesPhysiques.categorieIMC) {
    case CategorieIMC.MAIGREUR:
      nutriType += '_M';
      break;
    case CategorieIMC.NORMAL:
      nutriType += '_N';
      break;
    case CategorieIMC.SURPOIDS:
      nutriType += '_S';
      break;
    case CategorieIMC.OBESITE:
      nutriType += '_O';
      break;
  }
  
  // Ajout des situations de santé
  if (donneesSante.nombreSituations > 0) {
    nutriType += '_H' + donneesSante.nombreSituations;
  }
  
  return nutriType;
};

// Validation des étapes
export const validerEtapeObjectif = (objectif?: ObjectifPersonnel): boolean => {
  return objectif !== undefined;
};

export const validerEtapeDonneesPhysiques = (donnees?: DonneesPhysiques): boolean => {
  if (!donnees) return false;
  return !!(donnees.sexe && donnees.age && donnees.taille && donnees.poids && donnees.niveauActivite);
};

export const validerEtapeDonneesSante = (donnees?: any): boolean => {
  return donnees?.situations && Array.isArray(donnees.situations);
};

export const validerEtapeHabitudesAlimentaires = (habitudes?: HabitudesAlimentaires): boolean => {
  if (!habitudes) return false;
  return !!(
    habitudes.nombreRepas &&
    habitudes.grignotage &&
    habitudes.boissonsSucrees &&
    habitudes.eauBue &&
    habitudes.consommationLegumes &&
    habitudes.modeCuisson &&
    habitudes.produitsTransformes
  );
};

export const validerEtapeMotivationsBlockages = (motivationsBlockages?: MotivationsBlockages): boolean => {
  if (!motivationsBlockages) return false;
  return motivationsBlockages.motivations.length > 0 && motivationsBlockages.blocages.length > 0;
};

export const validerEtapeActivitesSportives = (activites?: ActivitesSportives): boolean => {
  return !!(activites?.activites && activites.activites.length > 0);
};

// Labels pour l'affichage
export const LABELS = {
  objectifs: {
    [ObjectifPersonnel.PERDRE_POIDS]: 'Perdre du poids',
    [ObjectifPersonnel.PRENDRE_POIDS]: 'Prendre du poids sainement',
    [ObjectifPersonnel.MAINTENIR_POIDS]: 'Maintenir mon poids actuel',
    [ObjectifPersonnel.AMELIORER_ENERGIE]: 'Améliorer mon niveau d\'énergie',
    [ObjectifPersonnel.GERER_STRESS]: 'Gérer mon stress / mon humeur',
    [ObjectifPersonnel.PERFORMANCES_SPORTIVES]: 'Améliorer mes performances sportives',
    [ObjectifPersonnel.MIEUX_DORMIR]: 'Mieux dormir',
    [ObjectifPersonnel.ACCOMPAGNEMENT_SANTE]: 'Être accompagné(e) pour un problème de santé',
    [ObjectifPersonnel.MEILLEURE_RELATION_ALIMENTATION]: 'Avoir une meilleure relation avec l\'alimentation'
  },
  niveauxActivite: {
    [NiveauActivite.SEDENTAIRE]: 'Sédentaire',
    [NiveauActivite.LEGEREMENT_ACTIF]: 'Légèrement actif',
    [NiveauActivite.MODEREMENT_ACTIF]: 'Modérément actif',
    [NiveauActivite.TRES_ACTIF]: 'Très actif',
    [NiveauActivite.TRAVAIL_PHYSIQUE]: 'Travail physique / sportif'
  },
  situationsSante: {
    [SituationSante.DIABETE]: 'Diabète',
    [SituationSante.HYPERTENSION]: 'Hypertension',
    [SituationSante.CHOLESTEROL]: 'Cholestérol élevé',
    [SituationSante.TROUBLES_DIGESTIFS]: 'Troubles digestifs',
    [SituationSante.STRESS_ANXIETE]: 'Stress / Anxiété',
    [SituationSante.FATIGUE_CHRONIQUE]: 'Fatigue chronique',
    [SituationSante.TROUBLES_SOMMEIL]: 'Troubles du sommeil',
    [SituationSante.DEPRESSION_LEGERE]: 'Dépression légère',
    [SituationSante.TROUBLES_MENSTRUELS]: 'Troubles menstruels',
    [SituationSante.AUCUN]: 'Aucun'
  },
  activitesSportives: {
    marche_rapide: '🏃 Marche rapide',
    musculation_fitness: '🏋️ Musculation / fitness',
    yoga_relaxation: '🧘 Yoga / relaxation',
    sports_collectifs: '🏀 Sports collectifs',
    danse: '💃 Danse',
    velo: '🚴 Vélo',
    natation: '🏊 Natation',
    sports_combat: '🥊 Sports de combat',
    randonnee_outdoor: '🧗 Randonnée / outdoor',
    activites_extremes: '🪂 Activités extrêmes',
    activite_famille: '🧒 Activité en famille',
    exercices_app_video: '📱 Exercices via app/vidéo',
    autre: '❓ Autre'
  }
};

// Calcul statistique des profils (selon le document)
export const STATISTIQUES_PROFILS = {
  TOTAL_PROFILS_THEORIQUES: 360_000_000,
  NOMBRE_NUTRITYPES: 70,
  PROFILS_PAR_NUTRITYPE: Math.floor(360_000_000 / 70)
};