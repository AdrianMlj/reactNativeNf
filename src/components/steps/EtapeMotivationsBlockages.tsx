import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import { 
  Motivation, 
  Blocage, 
  MotivationsBlockages, 
  UserProfile 
} from '../../types/ProfilingTypes';
import { colors } from '../../utils/theme';

interface EtapeMotivationsBlockagesProps {
  profile: Partial<UserProfile>;
  onUpdate: (updates: Partial<UserProfile>) => void;
  onNext: () => void;
  canContinue: boolean;
}

const EtapeMotivationsBlockages: React.FC<EtapeMotivationsBlockagesProps> = ({
  profile,
  onUpdate,
  onNext,
  canContinue
}) => {
  const [motivations, setMotivations] = useState<Motivation[]>(
    profile.motivationsBlockages?.motivations || []
  );
  const [blocages, setBlocages] = useState<Blocage[]>(
    profile.motivationsBlockages?.blocages || []
  );

  const updateProfile = (newMotivations: Motivation[], newBlocages: Blocage[]) => {
    const motivationsBlockages: MotivationsBlockages = {
      motivations: newMotivations,
      blocages: newBlocages
    };
    onUpdate({ motivationsBlockages });
  };

  const handleToggleMotivation = (motivation: Motivation) => {
    const newMotivations = motivations.includes(motivation)
      ? motivations.filter(m => m !== motivation)
      : [...motivations, motivation];
    
    setMotivations(newMotivations);
    updateProfile(newMotivations, blocages);
  };

  const handleToggleBlocage = (blocage: Blocage) => {
    const newBlocages = blocages.includes(blocage)
      ? blocages.filter(b => b !== blocage)
      : [...blocages, blocage];
    
    setBlocages(newBlocages);
    updateProfile(motivations, newBlocages);
  };

  const motivationsOptions = [
    {
      value: Motivation.SENTIR_MIEUX_CORPS,
      label: 'Me sentir mieux dans mon corps',
      icon: '💪',
      color: '#e74c3c'
    },
    {
      value: Motivation.PLUS_ENERGIE,
      label: 'Avoir plus d\'énergie',
      icon: '⚡',
      color: '#f39c12'
    },
    {
      value: Motivation.PLUS_CONFIANT,
      label: 'Être plus confiant(e)',
      icon: '😊',
      color: '#9b59b6'
    },
    {
      value: Motivation.ETRE_ACCOMPAGNE,
      label: 'Être accompagné(e)',
      icon: '🤝',
      color: '#3498db'
    },
    {
      value: Motivation.RELEVER_DEFI,
      label: 'Relever un défi',
      icon: '🎯',
      color: '#27ae60'
    }
  ];

  const blocagesOptions = [
    {
      value: Blocage.MANQUE_MOTIVATION,
      label: 'Je manque de motivation',
      icon: '😴',
      color: '#7f8c8d'
    },
    {
      value: Blocage.ENTOURAGE_DECOURAGEANT,
      label: 'Mon entourage me décourage',
      icon: '😞',
      color: '#e74c3c'
    },
    {
      value: Blocage.MANQUE_TEMPS,
      label: 'Je n\'ai pas le temps',
      icon: '⏰',
      color: '#f39c12'
    },
    {
      value: Blocage.DIFFICULTE_FINANCIERE,
      label: 'C\'est compliqué financièrement',
      icon: '💸',
      color: '#e67e22'
    },
    {
      value: Blocage.ABANDONNE_VITE,
      label: 'J\'abandonne vite',
      icon: '🏃‍♂️',
      color: '#9b59b6'
    }
  ];

  return (
    <View style={styles.wrapper}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ paddingBottom: 120 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: '50%' }]} />
          </View>
        </View>

        <Text style={styles.title}>💪 Qu’est-ce qui te motive à te lancer ?</Text>
        <View style={styles.optionsContainer}>
          {motivationsOptions.map((option) => {
            const isSelected = motivations.includes(option.value);
            return (
              <TouchableOpacity
                key={option.value}
                style={[
                  styles.optionButton,
                  isSelected && styles.optionButtonSelected
                ]}
                onPress={() => handleToggleMotivation(option.value)}
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

        <Text style={styles.title}>🚫 Qu’est-ce qui peut te freiner ?</Text>
        <View style={styles.optionsContainer}>
          {blocagesOptions.map((option) => {
            const isSelected = blocages.includes(option.value);
            return (
              <TouchableOpacity
                key={option.value}
                style={[
                  styles.optionButton,
                  isSelected && styles.optionButtonSelected
                ]}
                onPress={() => handleToggleBlocage(option.value)}
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

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Il n’y a pas de bonne ou mauvaise réponse — mieux on te connaît, mieux on peut t’aider à réussir.
          </Text>
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
  progressContainer: {
    width: '100%',
    marginBottom: 24,
    alignItems: 'center',
  },
  progressBar: {
    height: 6,
    backgroundColor: '#e9ecef',
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: 8,
    width: '100%',
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.brandLime,
    borderRadius: 3,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#222',
    textAlign: 'center',
    marginBottom: 18,
  },
  optionsContainer: {
    marginBottom: 24,
    gap: 14,
  },
  optionButton: {
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#bbb',
    paddingVertical: 16,
    paddingHorizontal: 12,
    marginBottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionButtonSelected: {
    backgroundColor: colors.brandLime,
    borderColor: colors.brandLime,
  },
  optionText: {
    fontSize: 16,
    color: '#222',
    fontWeight: '500',
    textAlign: 'center',
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
  footer: {
    marginTop: 20,
    alignItems: 'center',
    marginBottom: 80,
  },
  footerText: {
    fontSize: 14,
    color: '#636e72',
    textAlign: 'center',
    fontStyle: 'italic',
  },
});

export default EtapeMotivationsBlockages;