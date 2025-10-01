import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Alert,
  Dimensions
} from 'react-native';
import {
  UserProfile,
  EtapeProfilage,
  NavigationState,
  ObjectifPersonnel,
  DonneesPhysiques,
  DonneesSante,
  HabitudesAlimentaires,
  MotivationsBlockages,
  ActivitesSportives
} from '../types/ProfilingTypes';
import {
  calculerIMC,
  determinerCategorieIMC,
  calculerNombreSituationsSante,
  determinerNutriType,
  genererProfilId,
  validerEtapeObjectif,
  validerEtapeDonneesPhysiques,
  validerEtapeDonneesSante,
  validerEtapeHabitudesAlimentaires,
  validerEtapeMotivationsBlockages,
  validerEtapeActivitesSportives
} from '../utils/ProfilingUtils';
import {
  // Import des composants d'étapes
  default as EtapeObjectif
} from './steps/EtapeObjectif';
import EtapeDonneesPhysiques from './steps/EtapeDonneesPhysiques';
import EtapeDonneesSante from './steps/EtapeDonneesSante';
import EtapeHabitudesAlimentaires from './steps/EtapeHabitudesAlimentaires';
import EtapeMotivationsBlockages from './steps/EtapeMotivationsBlockages';
import EtapeActivitesSportives from './steps/EtapeActivitesSportives';
import EtapeResultats from './steps/EtapeResultats';
import { colors } from '../utils/theme';

const { width } = Dimensions.get('window');

interface ProfilingScreenProps {
  onComplete: (profile: UserProfile) => void;
}

const ProfilingScreen: React.FC<ProfilingScreenProps> = ({ onComplete }) => {
  const [profile, setProfile] = useState<Partial<UserProfile>>({});
  const [navigation, setNavigation] = useState<NavigationState>({
    etapeActuelle: EtapeProfilage.OBJECTIF,
    etapesCompletes: [],
    peutContinuer: false
  });

  // Validation de l'étape actuelle
  const validerEtapeActuelle = (): boolean => {
    switch (navigation.etapeActuelle) {
      case EtapeProfilage.OBJECTIF:
        return validerEtapeObjectif(profile.objectif);
      case EtapeProfilage.DONNEES_PHYSIQUES:
        return validerEtapeDonneesPhysiques(profile.donneesPhysiques);
      case EtapeProfilage.DONNEES_SANTE:
        return validerEtapeDonneesSante(profile.donneesSante);
      case EtapeProfilage.HABITUDES_ALIMENTAIRES:
        return validerEtapeHabitudesAlimentaires(profile.habitudesAlimentaires);
      case EtapeProfilage.MOTIVATIONS_BLOCAGES:
        return validerEtapeMotivationsBlockages(profile.motivationsBlockages);
      case EtapeProfilage.ACTIVITES_SPORTIVES:
        return validerEtapeActivitesSportives(profile.activitesSportives);
      default:
        return false;
    }
  };

  // Mise à jour de l'état de navigation
  useEffect(() => {
    const peutContinuer = validerEtapeActuelle();
    setNavigation(prev => ({ ...prev, peutContinuer }));
  }, [profile, navigation.etapeActuelle]);

  // Navigation vers l'étape suivante
  const allerEtapeSuivante = () => {
    if (!navigation.peutContinuer) return;

    const etapeActuelle = navigation.etapeActuelle;
    const nouvellesEtapesCompletes = navigation.etapesCompletes.includes(etapeActuelle)
      ? navigation.etapesCompletes
      : [...navigation.etapesCompletes, etapeActuelle];

    if (etapeActuelle === EtapeProfilage.ACTIVITES_SPORTIVES) {
      // Calculer les données finales avant d'aller aux résultats
      const profileComplet = calculerProfilComplet();
      setProfile(profileComplet);
      
      setNavigation({
        etapeActuelle: EtapeProfilage.RESULTATS,
        etapesCompletes: nouvellesEtapesCompletes,
        peutContinuer: true
      });
    } else {
      setNavigation({
        etapeActuelle: (etapeActuelle + 1) as EtapeProfilage,
        etapesCompletes: nouvellesEtapesCompletes,
        peutContinuer: false
      });
    }
  };

  // Navigation vers l'étape précédente
  const allerEtapePrecedente = () => {
    if (navigation.etapeActuelle > EtapeProfilage.OBJECTIF) {
      setNavigation(prev => ({
        ...prev,
        etapeActuelle: (prev.etapeActuelle - 1) as EtapeProfilage,
        peutContinuer: true
      }));
    }
  };

  // Calcul du profil complet
  const calculerProfilComplet = (): UserProfile => {
    const donneesPhysiques = { ...profile.donneesPhysiques! };
    
    // Calcul de l'IMC
    if (donneesPhysiques.taille && donneesPhysiques.poids) {
      donneesPhysiques.imc = calculerIMC(donneesPhysiques.taille, donneesPhysiques.poids);
      donneesPhysiques.categorieIMC = determinerCategorieIMC(donneesPhysiques.imc);
    }

    // Calcul du nombre de situations de santé
    const donneesSante = { ...profile.donneesSante! };
    donneesSante.nombreSituations = calculerNombreSituationsSante(donneesSante.situations);

    const profileComplet: UserProfile = {
      objectif: profile.objectif!,
      donneesPhysiques,
      donneesSante,
      habitudesAlimentaires: profile.habitudesAlimentaires!,
      motivationsBlockages: profile.motivationsBlockages!,
      activitesSportives: profile.activitesSportives!
    };

    // Calcul du NutriType et de l'ID
    profileComplet.nutriType = determinerNutriType(profileComplet);
    profileComplet.profilId = genererProfilId(profileComplet);

    return profileComplet;
  };

  // Finalisation du profilage
  const finaliserProfilage = () => {
    const profileComplet = calculerProfilComplet();
    onComplete(profileComplet);
  };

  // Mise à jour du profil
  const mettreAJourProfil = (updates: Partial<UserProfile>) => {
    setProfile(prev => ({ ...prev, ...updates }));
  };

  // Rendu de l'étape actuelle
  const renderEtapeActuelle = () => {
    const props = {
      profile,
      onUpdate: mettreAJourProfil,
      onNext: allerEtapeSuivante,
      canContinue: navigation.peutContinuer
    };

    switch (navigation.etapeActuelle) {
      case EtapeProfilage.OBJECTIF:
        return <EtapeObjectif {...props} />;
      case EtapeProfilage.DONNEES_PHYSIQUES:
        return <EtapeDonneesPhysiques {...props} />;
      case EtapeProfilage.DONNEES_SANTE:
        return <EtapeDonneesSante {...props} />;
      case EtapeProfilage.HABITUDES_ALIMENTAIRES:
        return <EtapeHabitudesAlimentaires {...props} />;
      case EtapeProfilage.MOTIVATIONS_BLOCAGES:
        return <EtapeMotivationsBlockages {...props} />;
      case EtapeProfilage.ACTIVITES_SPORTIVES:
        return <EtapeActivitesSportives {...props} />;
      case EtapeProfilage.RESULTATS:
        return (
          <EtapeResultats
            profile={profile as UserProfile}
            onComplete={finaliserProfilage}
            onBack={allerEtapePrecedente}
          />
        );
      default:
        return null;
    }
  };

  // Barre de progression
  const renderBarreProgression = () => {
    const progression = (navigation.etapeActuelle / 7) * 100;
    
    return (
      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${progression}%` }]} />
        </View>
        <Text style={styles.progressText}>
          Étape {navigation.etapeActuelle} sur 6
        </Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>PROFILAGE COMPLET</Text>
        <Text style={styles.subtitle}>NUTRIBOT – NUTRIL'WAY</Text>
        {navigation.etapeActuelle !== EtapeProfilage.RESULTATS && renderBarreProgression()}
      </View>

      <ScrollView 
        style={styles.content}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {renderEtapeActuelle()}
      </ScrollView>

      {navigation.etapeActuelle !== EtapeProfilage.RESULTATS && (
        <View style={styles.navigationButtons}>
          {navigation.etapeActuelle > EtapeProfilage.OBJECTIF && (
            <TouchableOpacity 
              style={[styles.button, styles.buttonSecondary]}
              onPress={allerEtapePrecedente}
            >
              <Text style={styles.buttonSecondaryText}>← Précédent</Text>
            </TouchableOpacity>
          )}
          
          <TouchableOpacity 
            style={[
              styles.button, 
              styles.buttonPrimary,
              !navigation.peutContinuer && styles.buttonDisabled
            ]}
            onPress={allerEtapeSuivante}
            disabled={!navigation.peutContinuer}
          >
            <Text style={styles.buttonPrimaryText}>
              {navigation.etapeActuelle === EtapeProfilage.ACTIVITES_SPORTIVES 
                ? 'Voir mes résultats →' 
                : 'Suivant →'}
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fbfbfbff',
  },
  header: {
    backgroundColor: colors.brandBlack,
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.textOnBlack,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: colors.brandLime,
    textAlign: 'center',
    marginTop: 2,
  },
  progressContainer: {
    marginTop: 15,
  },
  progressBar: {
    height: 6,
    backgroundColor: '#26282B',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.brandLime,
    borderRadius: 3,
  },
  progressText: {
    fontSize: 12,
    color: '#A0A6B0',
    textAlign: 'center',
    marginTop: 5,
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 100,
  },
  navigationButtons: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: colors.brandBlack,
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    minWidth: 120,
    alignItems: 'center',
  },
  buttonPrimary: {
    backgroundColor: colors.brandLime,
  },
  buttonSecondary: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.brandLime,
  },
  buttonDisabled: {
    backgroundColor: '#2E3237',
  },
  buttonPrimaryText: {
    color: colors.textOnLime,
    fontWeight: '600',
    fontSize: 16,
  },
  buttonSecondaryText: {
    color: colors.brandLime,
    fontWeight: '600',
    fontSize: 16,
  },
});

export default ProfilingScreen;