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
      // Si "Aucun" est sélectionné, désélectionner tout le reste
      nouvellesSituations = situations.includes(SituationSante.AUCUN) ? [] : [SituationSante.AUCUN];
    } else {
      // Pour les autres situations
      if (situations.includes(situation)) {
        // Désélectionner cette situation
        nouvellesSituations = situations.filter(s => s !== situation);
      } else {
        // Sélectionner cette situation et retirer "Aucun" s'il était sélectionné
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

  const situationsSanteOptions = [
    {
      value: SituationSante.DIABETE,
      icon: '🩺',
      color: '#e74c3c'
    },
    {
      value: SituationSante.HYPERTENSION,
      icon: '❤️',
      color: '#e74c3c'
    },
    {
      value: SituationSante.CHOLESTEROL,
      icon: '🧪',
      color: '#f39c12'
    },
    {
      value: SituationSante.TROUBLES_DIGESTIFS,
      icon: '🤢',
      color: '#e67e22'
    },
    {
      value: SituationSante.STRESS_ANXIETE,
      icon: '😰',
      color: '#9b59b6'
    },
    {
      value: SituationSante.FATIGUE_CHRONIQUE,
      icon: '😴',
      color: '#34495e'
    },
    {
      value: SituationSante.TROUBLES_SOMMEIL,
      icon: '🌙',
      color: '#2c3e50'
    },
    {
      value: SituationSante.DEPRESSION_LEGERE,
      icon: '😔',
      color: '#7f8c8d'
    },
    {
      value: SituationSante.TROUBLES_MENSTRUELS,
      icon: '🩸',
      color: '#e91e63'
    },
    {
      value: SituationSante.AUCUN,
      icon: '✅',
      color: '#27ae60'
    }
  ];

  const getNombreSituationsText = () => {
    const situationsReelles = situations.filter(s => s !== SituationSante.AUCUN);
    const nombre = situationsReelles.length;
    
    if (nombre === 0) return 'Aucune situation sélectionnée';
    if (nombre === 1) return '1 situation sélectionnée';
    return `${nombre} situations sélectionnées`;
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.title}>🏥 As-tu des situations à prendre en compte ?</Text>
        <Text style={styles.subtitle}>
          Sélectionne toutes les situations qui te concernent (choix multiples possibles)
        </Text>
        <View style={styles.counterContainer}>
          <Text style={styles.counterText}>{getNombreSituationsText()}</Text>
        </View>
      </View>

      <View style={styles.optionsContainer}>
        {situationsSanteOptions.map((option) => {
          const isSelected = situations.includes(option.value);
          const isAucun = option.value === SituationSante.AUCUN;
          
          return (
            <TouchableOpacity
              key={option.value}
              style={[
                styles.optionCard,
                isSelected && styles.optionCardSelected,
                isAucun && styles.optionCardAucun,
                isAucun && isSelected && styles.optionCardAucunSelected
              ]}
              onPress={() => handleToggleSituation(option.value)}
              activeOpacity={0.7}
            >
              <View style={styles.optionContent}>
                <View style={[
                  styles.iconContainer, 
                  { backgroundColor: option.color + '20' }
                ]}>
                  <Text style={styles.optionIcon}>{option.icon}</Text>
                </View>
                
                <View style={styles.optionTextContainer}>
                  <Text style={[
                    styles.optionText,
                    isSelected && styles.optionTextSelected,
                    isAucun && styles.optionTextAucun
                  ]}>
                    {LABELS.situationsSante[option.value]}
                  </Text>
                </View>
                
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

      <View style={styles.infoContainer}>
        <Text style={styles.infoTitle}>ℹ️ Pourquoi ces informations ?</Text>
        <Text style={styles.infoText}>
          Ces données nous permettent de personnaliser tes recommandations nutritionnelles 
          et d'adapter ton programme selon tes besoins de santé spécifiques.
        </Text>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          🔒 Ces informations restent strictement confidentielles
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
  counterContainer: {
    backgroundColor: '#f8f9fa',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    alignSelf: 'center',
  },
  counterText: {
    fontSize: 14,
    color: '#00b894',
    fontWeight: '600',
  },
  optionsContainer: {
    gap: 12,
  },
  optionCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e9ecef',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  optionCardSelected: {
    borderColor: '#00b894',
    backgroundColor: '#f8fffd',
  },
  optionCardAucun: {
    borderColor: '#27ae60',
    marginTop: 20,
  },
  optionCardAucunSelected: {
    backgroundColor: '#f0fff4',
    borderColor: '#27ae60',
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
  optionTextContainer: {
    flex: 1,
  },
  optionText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#2d3436',
  },
  optionTextSelected: {
    color: '#00b894',
    fontWeight: '600',
  },
  optionTextAucun: {
    color: '#27ae60',
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
    backgroundColor: '#00b894',
    borderColor: '#00b894',
  },
  checkIcon: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  infoContainer: {
    backgroundColor: '#e3f2fd',
    borderRadius: 12,
    padding: 16,
    marginTop: 30,
    borderLeftWidth: 4,
    borderLeftColor: '#2196f3',
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1976d2',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    color: '#1976d2',
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

export default EtapeDonneesSante;