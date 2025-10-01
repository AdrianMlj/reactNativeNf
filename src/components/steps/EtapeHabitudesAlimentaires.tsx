import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import { HabitudesAlimentaires, UserProfile } from '../../types/ProfilingTypes';
import { colors } from '../../utils/theme';

interface EtapeHabitudesAlimentairesProps {
  profile: Partial<UserProfile>;
  onUpdate: (updates: Partial<UserProfile>) => void;
  onNext: () => void;
  canContinue: boolean;
}

const EtapeHabitudesAlimentaires: React.FC<EtapeHabitudesAlimentairesProps> = ({
  profile,
  onUpdate,
  onNext,
  canContinue
}) => {
  const [habitudes, setHabitudes] = useState<Partial<HabitudesAlimentaires>>(
    profile.habitudesAlimentaires || {}
  );

  const handleUpdateHabitudes = (updates: Partial<HabitudesAlimentaires>) => {
    const nouvellesHabitudes = { ...habitudes, ...updates };
    setHabitudes(nouvellesHabitudes);
    onUpdate({ habitudesAlimentaires: nouvellesHabitudes as HabitudesAlimentaires });
  };

  const questions = [
    {
      key: 'nombreRepas' as keyof HabitudesAlimentaires,
      title: '🍽️ Nombre de repas par jour',
      options: [
        { value: 1, label: '1 repas', color: '#e74c3c' },
        { value: 2, label: '2 repas', color: '#f39c12' },
        { value: 3, label: '3 repas', color: '#27ae60' },
        { value: 4, label: '4+ repas', color: '#3498db' }
      ]
    },
    {
      key: 'grignotage' as keyof HabitudesAlimentaires,
      title: '🍪 Fréquence de grignotage',
      options: [
        { value: 'jamais', label: 'Jamais', color: '#27ae60' },
        { value: 'rarement', label: 'Rarement', color: '#f39c12' },
        { value: 'souvent', label: 'Souvent', color: '#e67e22' },
        { value: 'toujours', label: 'Toujours', color: '#e74c3c' }
      ]
    },
    {
      key: 'boissonsSucrees' as keyof HabitudesAlimentaires,
      title: '🥤 Boissons sucrées',
      options: [
        { value: 'jamais', label: 'Jamais', color: '#27ae60' },
        { value: '1x_jour', label: '1x par jour', color: '#f39c12' },
        { value: '2plus', label: '2+ par jour', color: '#e74c3c' }
      ]
    },
    {
      key: 'eauBue' as keyof HabitudesAlimentaires,
      title: '💧 Quantité d\'eau bue',
      options: [
        { value: 'moins_1L', label: 'Moins de 1L', color: '#e74c3c' },
        { value: '1_2L', label: '1 à 2L', color: '#f39c12' },
        { value: 'plus_2L', label: 'Plus de 2L', color: '#27ae60' }
      ]
    },
    {
      key: 'consommationLegumes' as keyof HabitudesAlimentaires,
      title: '🥬 Portions de légumes par jour',
      options: [
        { value: 'moins_2', label: 'Moins de 2', color: '#e74c3c' },
        { value: '3_4', label: '3 à 4', color: '#f39c12' },
        { value: '5plus', label: '5 ou plus', color: '#27ae60' }
      ]
    },
    {
      key: 'modeCuisson' as keyof HabitudesAlimentaires,
      title: '🍳 Mode de cuisson principal',
      options: [
        { value: 'friture', label: 'Friture', color: '#e74c3c' },
        { value: 'vapeur', label: 'Vapeur', color: '#27ae60' },
        { value: 'cru', label: 'Cru', color: '#3498db' },
        { value: 'mixte', label: 'Mixte', color: '#9b59b6' }
      ]
    },
    {
      key: 'produitsTransformes' as keyof HabitudesAlimentaires,
      title: '🏭 Produits transformés',
      options: [
        { value: 'rarement', label: 'Rarement', color: '#27ae60' },
        { value: 'regulierement', label: 'Régulièrement', color: '#f39c12' },
        { value: 'tous_jours', label: 'Tous les jours', color: '#e74c3c' }
      ]
    }
  ];

  const getProgressPercentage = () => {
    const completed = questions.filter(q => habitudes[q.key] !== undefined).length;
    return (completed / questions.length) * 100;
  };

  return (
    <View style={styles.wrapper}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ paddingBottom: 120 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View 
              style={[styles.progressFill, { width: `${getProgressPercentage()}%` }]} 
            />
          </View>
        </View>

        {questions.map((question, index) => {
          const currentValue = habitudes[question.key];
          return (
            <View key={question.key} style={styles.questionContainer}>
              <Text style={styles.questionTitle}>{question.title}</Text>
              <View style={styles.optionsGrid}>
                {question.options.map((option) => {
                  const isSelected = currentValue === option.value;
                  return (
                    <TouchableOpacity
                      key={option.value}
                      style={[
                        styles.optionButton,
                        isSelected && styles.optionButtonSelected
                      ]}
                      onPress={() => handleUpdateHabitudes({ [question.key]: option.value })}
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
            </View>
          );
        })}
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
  questionContainer: {
    marginBottom: 32,
  },
  questionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#222',
    textAlign: 'center',
    marginBottom: 18,
  },
  optionsGrid: {
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
});

export default EtapeHabitudesAlimentaires;