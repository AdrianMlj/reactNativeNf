import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import {
  ActivitesSportives,
  DonneesPhysiques,
  DonneesSante,
  EtapeProfilage,
  NavigationState,
  ObjectifPersonnel,
  UserProfile
} from '../types/ProfilingTypes';

// Étapes
import EtapeObjectif from './steps/EtapeObjectif';
import EtapeDonneesPhysiques from './steps/EtapeDonneesPhysiques';
import EtapeDonneesSante from './steps/EtapeDonneesSante';
import EtapeHabitudesAlimentaires from './steps/EtapeHabitudesAlimentaires';
import EtapeMotivationsBlockages from './steps/EtapeMotivationsBlockages';
import EtapeActivitesSportives from './steps/EtapeActivitesSportives';
import EtapeResultats from './steps/EtapeResultats';

// Utils
import {
  calculerIMC,
  calculerNombreSituationsSante,
  determinerCategorieIMC,
  determinerNutriType,
  genererProfilId,
  validerEtapeActivitesSportives,
  validerEtapeDonneesPhysiques,
  validerEtapeDonneesSante,
  validerEtapeHabitudesAlimentaires,
  validerEtapeMotivationsBlockages,
  validerEtapeObjectif
} from '../utils/ProfilingUtils';

interface Props {
  onComplete: (profile: UserProfile) => void;
}

const colors = {
  bg: '#0b0f0d',
  card: '#101614',
  text: '#e8f1ee',
  subtext: '#9fb4ad',
  border: '#1c2a25',
  accent: '#b5ff3b', // vert néon
  accentDim: '#2a3d1f'
};

const ProfilingScreen: React.FC<Props> = ({ onComplete }) => {
  const [profile, setProfile] = useState<Partial<UserProfile>>({});
  const [navigation, setNavigation] = useState<NavigationState>({
    etapeActuelle: EtapeProfilage.OBJECTIF,
    etapesCompletes: [],
    peutContinuer: false
  });

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

  useEffect(() => {
    setNavigation(prev => ({ ...prev, peutContinuer: validerEtapeActuelle() }));
  }, [profile, navigation.etapeActuelle]);

  const allerEtapeSuivante = () => {
    if (!navigation.peutContinuer) return;
    const etape = navigation.etapeActuelle;
    const done = navigation.etapesCompletes.includes(etape)
      ? navigation.etapesCompletes
      : [...navigation.etapesCompletes, etape];
    if (etape === EtapeProfilage.ACTIVITES_SPORTIVES) {
      const complet = calculerProfilComplet();
      setProfile(complet);
      setNavigation({ etapeActuelle: EtapeProfilage.RESULTATS, etapesCompletes: done, peutContinuer: true });
    } else {
      setNavigation({ etapeActuelle: (etape + 1) as EtapeProfilage, etapesCompletes: done, peutContinuer: false });
    }
  };

  const allerEtapePrecedente = () => {
    if (navigation.etapeActuelle > EtapeProfilage.OBJECTIF) {
      setNavigation(prev => ({ ...prev, etapeActuelle: (prev.etapeActuelle - 1) as EtapeProfilage, peutContinuer: true }));
    }
  };

  const calculerProfilComplet = (): UserProfile => {
    const donneesPhysiques = { ...profile.donneesPhysiques! } as DonneesPhysiques;
    if (donneesPhysiques.taille && donneesPhysiques.poids) {
      donneesPhysiques.imc = calculerIMC(donneesPhysiques.taille, donneesPhysiques.poids);
      donneesPhysiques.categorieIMC = determinerCategorieIMC(donneesPhysiques.imc);
    }
    const donneesSante = { ...profile.donneesSante! } as DonneesSante;
    donneesSante.nombreSituations = calculerNombreSituationsSante(donneesSante.situations);
    const p: UserProfile = {
      objectif: profile.objectif as ObjectifPersonnel,
      donneesPhysiques,
      donneesSante,
      habitudesAlimentaires: profile.habitudesAlimentaires!,
      motivationsBlockages: profile.motivationsBlockages!,
      activitesSportives: profile.activitesSportives as ActivitesSportives
    };
    p.nutriType = determinerNutriType(p);
    p.profilId = genererProfilId(p);
    return p;
  };

  const finaliserProfilage = () => {
    onComplete(calculerProfilComplet());
  };

  const mettreAJourProfil = (updates: Partial<UserProfile>) => setProfile(prev => ({ ...prev, ...updates }));

  const renderEtapeActuelle = () => {
    const props = { profile, onUpdate: mettreAJourProfil, onNext: allerEtapeSuivante, canContinue: navigation.peutContinuer };
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
        return <EtapeResultats profile={profile as UserProfile} onComplete={finaliserProfilage} onBack={allerEtapePrecedente} />;
      default:
        return null;
    }
  };

  const progression = Math.min(100, (navigation.etapeActuelle / 7) * 100);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>nutril'way</Text>
        <Text style={styles.subtitle}>Profilage</Text>
        {navigation.etapeActuelle !== EtapeProfilage.RESULTATS && (
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${progression}%` }]} />
          </View>
        )}
      </View>

      <ScrollView style={styles.content} contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {renderEtapeActuelle()}
      </ScrollView>

      {navigation.etapeActuelle !== EtapeProfilage.RESULTATS && (
        <View style={styles.navBar}>
          {navigation.etapeActuelle > EtapeProfilage.OBJECTIF && (
            <TouchableOpacity style={[styles.button, styles.buttonGhost]} onPress={allerEtapePrecedente}>
              <Text style={[styles.buttonText, styles.buttonGhostText]}>Précédent</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            style={[styles.button, styles.buttonPrimary, !navigation.peutContinuer && styles.buttonDisabled]}
            onPress={allerEtapeSuivante}
            disabled={!navigation.peutContinuer}
          >
            <Text style={styles.buttonText}> {navigation.etapeActuelle === EtapeProfilage.ACTIVITES_SPORTIVES ? 'Voir mes résultats' : 'Suivant'} </Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  header: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    backgroundColor: colors.card
  },
  title: { fontSize: 20, fontWeight: '700', color: colors.text, textAlign: 'center' },
  subtitle: { fontSize: 13, color: colors.subtext, textAlign: 'center', marginTop: 2 },
  progressBar: { height: 6, backgroundColor: '#0f1815', borderRadius: 3, marginTop: 12 },
  progressFill: { height: '100%', backgroundColor: colors.accent, borderRadius: 3 },
  content: { flex: 1 },
  scroll: { padding: 16, paddingBottom: 100 },
  navBar: {
    position: 'absolute', left: 0, right: 0, bottom: 0,
    flexDirection: 'row', justifyContent: 'space-between',
    paddingHorizontal: 16, paddingVertical: 12,
    backgroundColor: colors.card, borderTopWidth: 1, borderTopColor: colors.border
  },
  button: { borderRadius: 10, paddingVertical: 12, paddingHorizontal: 18, minWidth: 120, alignItems: 'center' },
  buttonPrimary: { backgroundColor: colors.accent },
  buttonGhost: { borderWidth: 1, borderColor: colors.border, backgroundColor: 'transparent' },
  buttonDisabled: { backgroundColor: '#2a2f2e' },
  buttonText: { color: '#0b0f0d', fontWeight: '700' },
  buttonGhostText: { color: colors.subtext, fontWeight: '700' }
});

export default ProfilingScreen;

