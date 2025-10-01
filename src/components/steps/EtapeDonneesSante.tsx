import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import { SituationSante, DonneesSante, UserProfile } from '../../types/ProfilingTypes';
import { LABELS, calculerNombreSituationsSante } from '../../utils/ProfilingUtils';
import { colors } from '../../utils/theme';

interface EtapeDonneesSanteProps {
  profile: Partial<UserProfile>;
  onUpdate: (updates: Partial<UserProfile>) => void;
  onNext: () => void;
  canContinue: boolean;
}

const EtapeDonneesSante: React.FC<EtapeDonneesSanteProps> = ({
  profile,
  onUpdate,
  onNext,
  canContinue
}) => {
  const [situations, setSituations] = useState<SituationSante[]>(
    profile.donneesSante?.situations || []
  );

  const handleToggleSituation = (situation: SituationSante) => {
    let nouvellesSituations: SituationSante[];

    if (situation === SituationSante.AUCUN) {
      nouvellesSituations = situations.includes(SituationSante.AUCUN) ? [] : [SituationSante.AUCUN];
    } else {
      if (situations.includes(situation)) {
        nouvellesSituations = situations.filter(s => s !== situation);
      } else {
        nouvellesSituations = [...situations.filter(s => s !== SituationSante.AUCUN), situation];
      }
    }

    setSituations(nouvellesSituations);
    
    const donneesSante: DonneesSante = {
      situations: nouvellesSituations,
      nombreSituations: calculerNombreSituationsSante(nouvellesSituations)
    };

    onUpdate({ donneesSante });
  };

  // Options dans l'ordre exact de l'image avec ajout d'Hypotension
  const situationsSanteOptions = [
    { value: SituationSante.TROUBLES_DIGESTIFS, label: 'Troubles digestifs' },
    { value: SituationSante.DIABETE, label: 'Diabète' },
    { value: SituationSante.CHOLESTEROL, label: 'Cholestérol élevé' },
    { value: SituationSante.STRESS_ANXIETE, label: 'Stress / Anxiété' },
    { value: SituationSante.HYPERTENSION, label: 'Hypertension' },
    { value: SituationSante.HYPOTENSION, label: 'Hypotension' },
    { value: SituationSante.FATIGUE_CHRONIQUE, label: 'Fatigue chronique' },
    { value: SituationSante.DEPRESSION_LEGERE, label: 'Dépression légère' },
    { value: SituationSante.TROUBLES_MENSTRUELS, label: 'Troubles menstruels' },
    { value: SituationSante.AUTRES, label: 'Autres' },
    { value: SituationSante.AUCUN, label: 'Aucun problème particulier' }
  ];

  return (
    <View style={styles.wrapper}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        
        {/* En-tête */}
        <View style={styles.header}>
          <Text style={styles.title}>
            Y a-t-il des situations de santé que tu aimerais qu'on prenne en compte ?
          </Text>
        </View>

        {/* Options de santé - Disposition exacte comme l'image */}
        <View style={styles.optionsContainer}>
          {/* Première ligne */}
          <View style={styles.optionsRow}>
            <TouchableOpacity
              style={[
                styles.optionButton,
                situations.includes(SituationSante.TROUBLES_DIGESTIFS) && styles.optionButtonSelected
              ]}
              onPress={() => handleToggleSituation(SituationSante.TROUBLES_DIGESTIFS)}
            >
              <View style={styles.optionContent}>
                {situations.includes(SituationSante.TROUBLES_DIGESTIFS) && (
                  <View style={styles.checkmarkContainer}>
                    <Text style={styles.checkmark}>✓</Text>
                  </View>
                )}
                <Text style={[
                  styles.optionButtonText,
                  situations.includes(SituationSante.TROUBLES_DIGESTIFS) && styles.optionButtonTextSelected
                ]}>
                  Troubles digestifs
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.optionButton,
                situations.includes(SituationSante.DIABETE) && styles.optionButtonSelected
              ]}
              onPress={() => handleToggleSituation(SituationSante.DIABETE)}
            >
              <View style={styles.optionContent}>
                {situations.includes(SituationSante.DIABETE) && (
                  <View style={styles.checkmarkContainer}>
                    <Text style={styles.checkmark}>✓</Text>
                  </View>
                )}
                <Text style={[
                  styles.optionButtonText,
                  situations.includes(SituationSante.DIABETE) && styles.optionButtonTextSelected
                ]}>
                  Diabète
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.optionButton,
                situations.includes(SituationSante.CHOLESTEROL) && styles.optionButtonSelected
              ]}
              onPress={() => handleToggleSituation(SituationSante.CHOLESTEROL)}
            >
              <View style={styles.optionContent}>
                {situations.includes(SituationSante.CHOLESTEROL) && (
                  <View style={styles.checkmarkContainer}>
                    <Text style={styles.checkmark}>✓</Text>
                  </View>
                )}
                <Text style={[
                  styles.optionButtonText,
                  situations.includes(SituationSante.CHOLESTEROL) && styles.optionButtonTextSelected
                ]}>
                  Cholestérol élevé
                </Text>
              </View>
            </TouchableOpacity>
          </View>

          {/* Deuxième ligne */}
          <View style={styles.optionsRow}>
            <TouchableOpacity
              style={[
                styles.optionButton,
                situations.includes(SituationSante.STRESS_ANXIETE) && styles.optionButtonSelected
              ]}
              onPress={() => handleToggleSituation(SituationSante.STRESS_ANXIETE)}
            >
              <View style={styles.optionContent}>
                {situations.includes(SituationSante.STRESS_ANXIETE) && (
                  <View style={styles.checkmarkContainer}>
                    <Text style={styles.checkmark}>✓</Text>
                  </View>
                )}
                <Text style={[
                  styles.optionButtonText,
                  situations.includes(SituationSante.STRESS_ANXIETE) && styles.optionButtonTextSelected
                ]}>
                  Stress / Anxiété
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.optionButton,
                situations.includes(SituationSante.HYPERTENSION) && styles.optionButtonSelected
              ]}
              onPress={() => handleToggleSituation(SituationSante.HYPERTENSION)}
            >
              <View style={styles.optionContent}>
                {situations.includes(SituationSante.HYPERTENSION) && (
                  <View style={styles.checkmarkContainer}>
                    <Text style={styles.checkmark}>✓</Text>
                  </View>
                )}
                <Text style={[
                  styles.optionButtonText,
                  situations.includes(SituationSante.HYPERTENSION) && styles.optionButtonTextSelected
                ]}>
                  Hypertension
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.optionButton,
                situations.includes(SituationSante.HYPOTENSION) && styles.optionButtonSelected
              ]}
              onPress={() => handleToggleSituation(SituationSante.HYPOTENSION)}
            >
              <View style={styles.optionContent}>
                {situations.includes(SituationSante.HYPOTENSION) && (
                  <View style={styles.checkmarkContainer}>
                    <Text style={styles.checkmark}>✓</Text>
                  </View>
                )}
                <Text style={[
                  styles.optionButtonText,
                  situations.includes(SituationSante.HYPOTENSION) && styles.optionButtonTextSelected
                ]}>
                  Hypotension
                </Text>
              </View>
            </TouchableOpacity>
          </View>

          {/* Troisième ligne */}
          <View style={styles.optionsRow}>
            <TouchableOpacity
              style={[
                styles.optionButton,
                situations.includes(SituationSante.FATIGUE_CHRONIQUE) && styles.optionButtonSelected
              ]}
              onPress={() => handleToggleSituation(SituationSante.FATIGUE_CHRONIQUE)}
            >
              <View style={styles.optionContent}>
                {situations.includes(SituationSante.FATIGUE_CHRONIQUE) && (
                  <View style={styles.checkmarkContainer}>
                    <Text style={styles.checkmark}>✓</Text>
                  </View>
                )}
                <Text style={[
                  styles.optionButtonText,
                  situations.includes(SituationSante.FATIGUE_CHRONIQUE) && styles.optionButtonTextSelected
                ]}>
                  Fatigue chronique
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.optionButton,
                situations.includes(SituationSante.DEPRESSION_LEGERE) && styles.optionButtonSelected
              ]}
              onPress={() => handleToggleSituation(SituationSante.DEPRESSION_LEGERE)}
            >
              <View style={styles.optionContent}>
                {situations.includes(SituationSante.DEPRESSION_LEGERE) && (
                  <View style={styles.checkmarkContainer}>
                    <Text style={styles.checkmark}>✓</Text>
                  </View>
                )}
                <Text style={[
                  styles.optionButtonText,
                  situations.includes(SituationSante.DEPRESSION_LEGERE) && styles.optionButtonTextSelected
                ]}>
                  Dépression légère
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.optionButton,
                situations.includes(SituationSante.TROUBLES_MENSTRUELS) && styles.optionButtonSelected
              ]}
              onPress={() => handleToggleSituation(SituationSante.TROUBLES_MENSTRUELS)}
            >
              <View style={styles.optionContent}>
                {situations.includes(SituationSante.TROUBLES_MENSTRUELS) && (
                  <View style={styles.checkmarkContainer}>
                    <Text style={styles.checkmark}>✓</Text>
                  </View>
                )}
                <Text style={[
                  styles.optionButtonText,
                  situations.includes(SituationSante.TROUBLES_MENSTRUELS) && styles.optionButtonTextSelected
                ]}>
                  Troubles menstruels
                </Text>
              </View>
            </TouchableOpacity>
          </View>

          {/* Quatrième ligne */}
          <View style={styles.optionsRow}>
            <TouchableOpacity
              style={[
                styles.optionButton,
                situations.includes(SituationSante.AUTRES) && styles.optionButtonSelected
              ]}
              onPress={() => handleToggleSituation(SituationSante.AUTRES)}
            >
              <View style={styles.optionContent}>
                {situations.includes(SituationSante.AUTRES) && (
                  <View style={styles.checkmarkContainer}>
                    <Text style={styles.checkmark}>✓</Text>
                  </View>
                )}
                <Text style={[
                  styles.optionButtonText,
                  situations.includes(SituationSante.AUTRES) && styles.optionButtonTextSelected
                ]}>
                  Autres
                </Text>
              </View>
            </TouchableOpacity>
          </View>

          {/* Cinquième ligne - Bouton unique centré */}
          <View style={styles.singleOptionRow}>
            <TouchableOpacity
              style={[
                styles.optionButton,
                styles.singleOptionButton,
                situations.includes(SituationSante.AUCUN) && styles.optionButtonSelected
              ]}
              onPress={() => handleToggleSituation(SituationSante.AUCUN)}
            >
              <View style={styles.optionContent}>
                {situations.includes(SituationSante.AUCUN) && (
                  <View style={styles.checkmarkContainer}>
                    <Text style={styles.checkmark}>✓</Text>
                  </View>
                )}
                <Text style={[
                  styles.optionButtonText,
                  situations.includes(SituationSante.AUCUN) && styles.optionButtonTextSelected
                ]}>
                  Aucun problème particulier
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* Bouton CONTINUER */}
        <TouchableOpacity 
          style={[styles.continueButton, !canContinue && styles.continueButtonDisabled]}
          onPress={onNext}
          disabled={!canContinue}
        >
          <Text style={styles.continueButtonText}>CONTINUER</Text>
        </TouchableOpacity>

      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  header: {
    marginBottom: 30,
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    color: '#2C3E50',
    textAlign: 'center',
    fontWeight: '400',
    lineHeight: 24,
  },
  optionsContainer: {
    marginBottom: 30,
  },
  optionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  singleOptionRow: {
    alignItems: 'center',
    marginBottom: 12,
  },
  optionButton: {
    flex: 1,
    backgroundColor: '#F8F8F8',
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: '#E8E8E8',
    minHeight: 60,
    justifyContent: 'center',
    marginHorizontal: 6,
  },
  singleOptionButton: {
    width: '100%',
    maxWidth: 400,
  },
  optionButtonSelected: {
    backgroundColor: '#F8FFE0',
    borderColor: '#B2EE1B',
  },
  optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  checkmarkContainer: {
    marginRight: 6,
    width: 20,
    alignItems: 'center',
  },
  checkmark: {
    color: '#B2EE1B',
    fontSize: 16,
    fontWeight: 'bold',
  },
  optionButtonText: {
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
    fontWeight: '400',
    flexShrink: 1,
    flexWrap: 'wrap',
  },
  optionButtonTextSelected: {
    color: '#2C3E50',
    fontWeight: '500',
  },
  continueButton: {
    backgroundColor: '#B2EE1B',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginVertical: 20,
    marginHorizontal: 20,
  },
  continueButtonDisabled: {
    backgroundColor: '#CCCCCC',
  },
  continueButtonText: {
    color: '#2C3E50',
    fontSize: 18,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
});

export default EtapeDonneesSante;