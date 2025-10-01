import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import { ObjectifPersonnel, UserProfile } from '../../types/ProfilingTypes';
import { LABELS } from '../../utils/ProfilingUtils';
import { colors } from '../../utils/theme';

interface EtapeObjectifProps {
  profile: Partial<UserProfile>;
  onUpdate: (updates: Partial<UserProfile>) => void;
  onNext: () => void;
  canContinue: boolean;
}

const EtapeObjectif: React.FC<EtapeObjectifProps> = ({
  profile,
  onUpdate,
  onNext,
  canContinue
}) => {
  const handleSelectObjectif = (objectif: ObjectifPersonnel) => {
    onUpdate({ objectif });
  };

  const objectifs = [
    {
      value: ObjectifPersonnel.PERDRE_POIDS,
      color: '#e74c3c',
      label: LABELS.objectifs[ObjectifPersonnel.PERDRE_POIDS]
    },
    {
      value: ObjectifPersonnel.PRENDRE_POIDS,
      color: '#27ae60',
      label: LABELS.objectifs[ObjectifPersonnel.PRENDRE_POIDS]
    },
    {
      value: ObjectifPersonnel.MAINTENIR_POIDS,
      color: '#3498db',
      label: LABELS.objectifs[ObjectifPersonnel.MAINTENIR_POIDS]
    },
    {
      value: ObjectifPersonnel.PERFORMANCES_SPORTIVES,
      color: '#e67e22',
      label: LABELS.objectifs[ObjectifPersonnel.PERFORMANCES_SPORTIVES]
    },
    {
      value: ObjectifPersonnel.AMELIORER_ENERGIE,
      color: '#f39c12',
      label: LABELS.objectifs[ObjectifPersonnel.AMELIORER_ENERGIE]
    },
    {
      value: ObjectifPersonnel.GERER_STRESS,
      color: '#9b59b6',
      label: LABELS.objectifs[ObjectifPersonnel.GERER_STRESS]
    },
    {
      value: ObjectifPersonnel.MIEUX_DORMIR,
      color: '#34495e',
      label: LABELS.objectifs[ObjectifPersonnel.MIEUX_DORMIR]
    },
    {
      value: ObjectifPersonnel.ACCOMPAGNEMENT_SANTE,
      color: '#1abc9c',
      label: LABELS.objectifs[ObjectifPersonnel.ACCOMPAGNEMENT_SANTE]
    },
    {
      value: ObjectifPersonnel.MEILLEURE_RELATION_ALIMENTATION,
      color: '#2ecc71',
      label: LABELS.objectifs[ObjectifPersonnel.MEILLEURE_RELATION_ALIMENTATION]
    }
  ];

  return (
    <View style={styles.wrapper}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ paddingBottom: 120 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Sur le plan du poids</Text>
        </View>

        <View style={styles.optionsContainer}>
          {objectifs.slice(0, 4).map((option) => {
            const isSelected = profile.objectif === option.value;
            return (
              <TouchableOpacity
                key={option.value}
                style={[
                  styles.optionButton,
                  isSelected && styles.optionButtonSelected
                ]}
                onPress={() => handleSelectObjectif(option.value)}
                activeOpacity={0.8}
              >
                <Text style={[
                  styles.optionText,
                  isSelected && styles.optionTextSelected
                ]}>
                  {option.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* <View style={styles.header}>
          <Text style={styles.title}>Et sur le plan du bien-être ?</Text>
        </View> */}
        <View style={styles.optionsContainer}>
          {objectifs.slice(4, 8).map((option) => {
            const isSelected = profile.objectif === option.value;
            return (
              <TouchableOpacity
                key={option.value}
                style={[
                  styles.optionButton,
                  isSelected && styles.optionButtonSelected
                ]}
                onPress={() => handleSelectObjectif(option.value)}
                activeOpacity={0.8}
              >
                <Text style={[
                  styles.optionText,
                  isSelected && styles.optionTextSelected
                ]}>
                  {option.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[
            styles.continueButton,
            !canContinue && styles.continueButtonDisabled
          ]}
          onPress={onNext}
          activeOpacity={canContinue ? 0.8 : 1}
          disabled={!canContinue}
        >
          <Text style={styles.continueButtonText}>CONTINUE</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#222',
    textAlign: 'center',
    marginBottom: 10,
  },
  optionsContainer: {
    marginBottom: 24,
    gap: 16,
  },
  optionButton: {
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#eee',
    paddingVertical: 18,
    paddingHorizontal: 16,
    marginBottom: 0,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 2,
    elevation: 1,
  },
  optionButtonSelected: {
    backgroundColor: colors.brandLime,
    borderColor: colors.brandLime,
  },
  optionText: {
    fontSize: 16,
    color: '#222',
    fontWeight: '500',
  },
  optionTextSelected: {
    color: '#fff',
    fontWeight: 'bold',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 24,
    left: 0,
    right: 0,
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  continueButton: {
    backgroundColor: '#222',
    borderRadius: 12,
    paddingVertical: 18,
    width: '100%',
    alignItems: 'center',
  },
  continueButtonDisabled: {
    backgroundColor: '#bbb',
  },
  continueButtonText: {
    color: colors.brandLime,
    fontWeight: 'bold',
    fontSize: 18,
    letterSpacing: 0.5,
  },
});

export default EtapeObjectif;