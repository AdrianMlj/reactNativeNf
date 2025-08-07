// Types pour le système de profilage NutriBot
export interface UserProfile {
  // Étape 1 : Objectif personnel
  objectif: ObjectifPersonnel;
  
  // Étape 2 : Données physiques
  donneesPhysiques: DonneesPhysiques;
  
  // Étape 3 : Données santé
  donneesSante: DonneesSante;
  
  // Étape 4 : Habitudes alimentaires
  habitudesAlimentaires: HabitudesAlimentaires;
  
  // Étape 5 : Motivations & Blocages
  motivationsBlockages: MotivationsBlockages;
  
  // Étape 6 : Activités sportives
  activitesSportives: ActivitesSportives;
  
  // Profil calculé
  nutriType?: string;
  profilId?: string;
}

// Étape 1 : Objectif personnel (9 options)
export enum ObjectifPersonnel {
  PERDRE_POIDS = 'perdre_poids',
  PRENDRE_POIDS = 'prendre_poids',
  MAINTENIR_POIDS = 'maintenir_poids',
  AMELIORER_ENERGIE = 'ameliorer_energie',
  GERER_STRESS = 'gerer_stress',
  PERFORMANCES_SPORTIVES = 'performances_sportives',
  MIEUX_DORMIR = 'mieux_dormir',
  ACCOMPAGNEMENT_SANTE = 'accompagnement_sante',
  MEILLEURE_RELATION_ALIMENTATION = 'meilleure_relation_alimentation'
}

// Étape 2 : Données physiques
export interface DonneesPhysiques {
  sexe: 'masculin' | 'feminin';
  age: number;
  taille: number; // en cm
  poids: number; // en kg
  imc?: number; // calculé automatiquement
  categorieIMC?: CategorieIMC;
  tourTaille?: number; // optionnel, en cm
  niveauActivite: NiveauActivite;
}

export enum CategorieIMC {
  MAIGREUR = 'maigreur',
  NORMAL = 'normal',
  SURPOIDS = 'surpoids',
  OBESITE = 'obesite'
}

export enum NiveauActivite {
  SEDENTAIRE = 'sedentaire',
  LEGEREMENT_ACTIF = 'legerement_actif',
  MODEREMENT_ACTIF = 'moderement_actif',
  TRES_ACTIF = 'tres_actif',
  TRAVAIL_PHYSIQUE = 'travail_physique'
}

// Étape 3 : Données santé (10 options checkbox)
export interface DonneesSante {
  situations: SituationSante[];
  nombreSituations: 0 | 1 | 2 | 3; // 3+ regroupé en 3
}

export enum SituationSante {
  DIABETE = 'diabete',
  HYPERTENSION = 'hypertension',
  CHOLESTEROL = 'cholesterol',
  TROUBLES_DIGESTIFS = 'troubles_digestifs',
  STRESS_ANXIETE = 'stress_anxiete',
  FATIGUE_CHRONIQUE = 'fatigue_chronique',
  TROUBLES_SOMMEIL = 'troubles_sommeil',
  DEPRESSION_LEGERE = 'depression_legere',
  TROUBLES_MENSTRUELS = 'troubles_menstruels',
  AUCUN = 'aucun'
}

// Étape 4 : Habitudes alimentaires
export interface HabitudesAlimentaires {
  nombreRepas: 1 | 2 | 3 | 4; // 4+ regroupé en 4
  grignotage: 'jamais' | 'rarement' | 'souvent' | 'toujours';
  boissonsSucrees: 'jamais' | '1x_jour' | '2plus';
  eauBue: 'moins_1L' | '1_2L' | 'plus_2L';
  consommationLegumes: 'moins_2' | '3_4' | '5plus'; // portions par jour
  modeCuisson: 'friture' | 'vapeur' | 'cru' | 'mixte';
  produitsTransformes: 'rarement' | 'regulierement' | 'tous_jours';
}

// Étape 5 : Motivations & Blocages
export interface MotivationsBlockages {
  motivations: Motivation[];
  blocages: Blocage[];
}

export enum Motivation {
  SENTIR_MIEUX_CORPS = 'sentir_mieux_corps',
  PLUS_ENERGIE = 'plus_energie',
  PLUS_CONFIANT = 'plus_confiant',
  ETRE_ACCOMPAGNE = 'etre_accompagne',
  RELEVER_DEFI = 'relever_defi'
}

export enum Blocage {
  MANQUE_MOTIVATION = 'manque_motivation',
  ENTOURAGE_DECOURAGEANT = 'entourage_decourageant',
  MANQUE_TEMPS = 'manque_temps',
  DIFFICULTE_FINANCIERE = 'difficulte_financiere',
  ABANDONNE_VITE = 'abandonne_vite'
}

// Étape 6 : Activités sportives (13 options)
export interface ActivitesSportives {
  activites: ActiviteSportive[];
  autreActivite?: string; // si "autre" est sélectionné
}

export enum ActiviteSportive {
  MARCHE_RAPIDE = 'marche_rapide',
  MUSCULATION_FITNESS = 'musculation_fitness',
  YOGA_RELAXATION = 'yoga_relaxation',
  SPORTS_COLLECTIFS = 'sports_collectifs',
  DANSE = 'danse',
  VELO = 'velo',
  NATATION = 'natation',
  SPORTS_COMBAT = 'sports_combat',
  RANDONNEE_OUTDOOR = 'randonnee_outdoor',
  ACTIVITES_EXTREMES = 'activites_extremes',
  ACTIVITE_FAMILLE = 'activite_famille',
  EXERCICES_APP_VIDEO = 'exercices_app_video',
  AUTRE = 'autre'
}

// Étapes de navigation
export enum EtapeProfilage {
  OBJECTIF = 1,
  DONNEES_PHYSIQUES = 2,
  DONNEES_SANTE = 3,
  HABITUDES_ALIMENTAIRES = 4,
  MOTIVATIONS_BLOCAGES = 5,
  ACTIVITES_SPORTIVES = 6,
  RESULTATS = 7
}

// Interface pour la navigation
export interface NavigationState {
  etapeActuelle: EtapeProfilage;
  etapesCompletes: EtapeProfilage[];
  peutContinuer: boolean;
}