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
      label: 'Manque de motivation',
      icon: '😴',
      color: '#7f8c8d'
    },
    {
      value: Blocage.ENTOURAGE_DECOURAGEANT,
      label: 'Entourage décourageant',
      icon: '😞',
      color: '#e74c3c'
    },
    {
      value: Blocage.MANQUE_TEMPS,
      label: 'Manque de temps',
      icon: '⏰',
      color: '#f39c12'
    },
    {
      value: Blocage.DIFFICULTE_FINANCIERE,
      label: 'Difficulté financière',
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
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.title}>💫 Motivations & Blocages</Text>
        <Text style={styles.subtitle}>
          Comprendre tes motivations et obstacles nous aide à personnaliser ton accompagnement
        </Text>
      </View>

      {/* Section Motivations */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>🌟 Qu'est-ce qui te motive ?</Text>
          <Text style={styles.sectionSubtitle}>
            Sélectionne toutes tes motivations (choix multiples)
          </Text>
          <View style={styles.counterBadge}>
            <Text style={styles.counterText}>
              {motivations.length} motivation{motivations.length > 1 ? 's' : ''} sélectionnée{motivations.length > 1 ? 's' : ''}
            </Text>
          </View>
        </View>

        <View style={styles.optionsContainer}>
          {motivationsOptions.map((option) => {
            const isSelected = motivations.includes(option.value);
            
            return (
              <TouchableOpacity
                key={option.value}
                style={[
                  styles.optionCard,
                  isSelected && styles.optionCardSelected,
                  { borderLeftColor: option.color }
                ]}
                onPress={() => handleToggleMotivation(option.value)}
              >
                <View style={styles.optionContent}>
                  <View style={[
                    styles.iconContainer,
                    { backgroundColor: option.color + '20' }
                  ]}>
                    <Text style={styles.optionIcon}>{option.icon}</Text>
                  </View>
                  
                  <Text style={[
                    styles.optionText,
                    isSelected && styles.optionTextSelected
                  ]}>
                    {option.label}
                  </Text>
                  
                  <View style={[
                    styles.checkbox,
                    isSelected && styles.checkboxSelected
                  ]}>
                    {isSelected && <Text style={styles.checkIcon}>✓</Text>}
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      {/* Section Blocages */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>🚧 Quels sont tes principaux obstacles ?</Text>
          <Text style={styles.sectionSubtitle}>
            Identifier tes blocages nous aide à les surmonter ensemble
          </Text>
          <View style={styles.counterBadge}>
            <Text style={styles.counterText}>
              {blocages.length} blocage{blocages.length > 1 ? 's' : ''} sélectionné{blocages.length > 1 ? 's' : ''}
            </Text>
          </View>
        </View>

        <View style={styles.optionsContainer}>
          {blocagesOptions.map((option) => {
            const isSelected = blocages.includes(option.value);
            
            return (
              <TouchableOpacity
                key={option.value}
                style={[
                  styles.optionCard,
                  styles.blocageCard,
                  isSelected && styles.blocageCardSelected,
                  { borderLeftColor: option.color }
                ]}
                onPress={() => handleToggleBlocage(option.value)}
              >
                <View style={styles.optionContent}>
                  <View style={[
                    styles.iconContainer,
                    { backgroundColor: option.color + '20' }
                  ]}>
                    <Text style={styles.optionIcon}>{option.icon}</Text>
                  </View>
                  
                  <Text style={[
                    styles.optionText,
                    isSelected && styles.blocageTextSelected
                  ]}>
                    {option.label}
                  </Text>
                  
                  <View style={[
                    styles.checkbox,
                    isSelected && styles.blocageCheckboxSelected
                  ]}>
                    {isSelected && <Text style={styles.checkIcon}>✓</Text>}
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      <View style={styles.insightContainer}>
        <Text style={styles.insightTitle}>🧠 Le saviez-vous ?</Text>
        <Text style={styles.insightText}>
          Identifier clairement tes motivations et obstacles est la première étape vers le succès. 
          Notre IA utilisera ces informations pour adapter tes recommandations et t'accompagner 
          de manière personnalisée.
        </Text>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          🎯 Ces informations nous permettent de créer un accompagnement sur-mesure
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
    marginBottom: 15,
  },
  section: {
    marginBottom: 20,
  },
  sectionHeader: {
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2d3436',
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#636e72',
    marginTop: 4,
  },
  counterBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: '#f8f9fa',
    marginTop: 8,
  },
  counterText: {
    fontSize: 12,
    color: '#636e72',
    fontWeight: '600',
  },
  optionsContainer: {
    gap: 10,
  },
  optionCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    borderLeftWidth: 4,
    borderRightWidth: 1,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#e9ecef',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  optionCardSelected: {
    borderColor: colors.brandLime,
    backgroundColor: '#f8fffd',
    elevation: 2,
  },
  blocageCard: {
    borderLeftColor: '#e74c3c',
  },
  blocageCardSelected: {
    borderColor: '#e74c3c',
    backgroundColor: '#fdf2f2',
  },
  optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  optionIcon: {
    fontSize: 20,
  },
  optionText: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
    color: '#2d3436',
  },
  optionTextSelected: {
    color: colors.brandLime,
    fontWeight: '600',
  },
  blocageTextSelected: {
    color: '#e74c3c',
    fontWeight: '600',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxSelected: {
    backgroundColor: colors.brandLime,
    borderColor: colors.brandLime,
  },
  blocageCheckboxSelected: {
    backgroundColor: '#e74c3c',
    borderColor: '#e74c3c',
  },
  checkIcon: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  insightContainer: {
    backgroundColor: '#f0f8ff',
    borderRadius: 12,
    padding: 16,
    marginTop: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#3498db',
  },
  insightTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2980b9',
    marginBottom: 10,
  },
  insightText: {
    fontSize: 14,
    color: '#2980b9',
    lineHeight: 20,
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

export default EtapeMotivationsBlockages;