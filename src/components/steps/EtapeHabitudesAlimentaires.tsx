import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import { HabitudesAlimentaires, UserProfile } from '../../types/ProfilingTypes';

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
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.title}>🍴 Tes habitudes alimentaires</Text>
        <Text style={styles.subtitle}>
          Réponds à ces questions pour personnaliser tes recommandations nutritionnelles
        </Text>
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View 
              style={[styles.progressFill, { width: `${getProgressPercentage()}%` }]} 
            />
          </View>
          <Text style={styles.progressText}>
            {questions.filter(q => habitudes[q.key] !== undefined).length} / {questions.length} complétées
          </Text>
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
                      isSelected && styles.optionButtonSelected,
                      { borderLeftColor: option.color }
                    ]}
                    onPress={() => handleUpdateHabitudes({ [question.key]: option.value })}
                  >
                    <View style={[
                      styles.optionIndicator,
                      { backgroundColor: option.color + '20' }
                    ]}>
                      <View style={[
                        styles.optionDot,
                        { backgroundColor: option.color },
                        isSelected && styles.optionDotSelected
                      ]} />
                    </View>
                    
                    <Text style={[
                      styles.optionText,
                      isSelected && styles.optionTextSelected
                    ]}>
                      {option.label}
                    </Text>
                    
                    {isSelected && (
                      <View style={styles.checkContainer}>
                        <Text style={styles.checkIcon}>✓</Text>
                      </View>
                    )}
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        );
      })}

      <View style={styles.tipsContainer}>
        <Text style={styles.tipsTitle}>💡 Le savais-tu ?</Text>
        <Text style={styles.tipsText}>
          • Une alimentation équilibrée avec 5 portions de légumes par jour améliore significativement ta santé
        </Text>
        <Text style={styles.tipsText}>
          • Boire 2L d'eau par jour aide à maintenir un bon métabolisme
        </Text>
        <Text style={styles.tipsText}>
          • Limiter les produits transformés réduit l'apport en additifs et conservateurs
        </Text>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          📊 Ces données nous aident à calculer ton profil nutritionnel personnalisé
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2d3436',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#636e72',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 20,
  },
  progressContainer: {
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 15,
  },
  progressBar: {
    height: 6,
    backgroundColor: '#e9ecef',
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#00b894',
    borderRadius: 3,
  },
  progressText: {
    fontSize: 12,
    color: '#636e72',
    textAlign: 'center',
    fontWeight: '500',
  },
  questionContainer: {
    marginBottom: 30,
  },
  questionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2d3436',
    marginBottom: 15,
  },
  optionsGrid: {
    gap: 10,
  },
  optionButton: {
    backgroundColor: '#fff',
    borderRadius: 12,
    borderLeftWidth: 4,
    borderRightWidth: 1,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#e9ecef',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  optionButtonSelected: {
    borderColor: '#00b894',
    backgroundColor: '#f8fffd',
    elevation: 2,
  },
  optionIndicator: {
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  optionDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  optionDotSelected: {
    width: 16,
    height: 16,
    borderRadius: 8,
  },
  optionText: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
    color: '#2d3436',
  },
  optionTextSelected: {
    color: '#00b894',
    fontWeight: '600',
  },
  checkContainer: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#00b894',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkIcon: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  tipsContainer: {
    backgroundColor: '#fff3cd',
    borderRadius: 12,
    padding: 16,
    marginTop: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#ffc107',
  },
  tipsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#856404',
    marginBottom: 10,
  },
  tipsText: {
    fontSize: 14,
    color: '#856404',
    marginBottom: 5,
    lineHeight: 18,
  },
  footer: {
    marginTop: 20,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#e9ecef',
  },
  footerText: {
    fontSize: 14,
    color: '#636e72',
    textAlign: 'center',
    fontStyle: 'italic',
  },
});

export default EtapeHabitudesAlimentaires;