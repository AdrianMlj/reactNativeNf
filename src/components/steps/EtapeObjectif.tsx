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
      icon: '⚖️',
      color: '#e74c3c'
    },
    {
      value: ObjectifPersonnel.PRENDRE_POIDS,
      icon: '💪',
      color: '#27ae60'
    },
    {
      value: ObjectifPersonnel.MAINTENIR_POIDS,
      icon: '⚖️',
      color: '#3498db'
    },
    {
      value: ObjectifPersonnel.AMELIORER_ENERGIE,
      icon: '⚡',
      color: '#f39c12'
    },
    {
      value: ObjectifPersonnel.GERER_STRESS,
      icon: '🧘',
      color: '#9b59b6'
    },
    {
      value: ObjectifPersonnel.PERFORMANCES_SPORTIVES,
      icon: '🏃',
      color: '#e67e22'
    },
    {
      value: ObjectifPersonnel.MIEUX_DORMIR,
      icon: '😴',
      color: '#34495e'
    },
    {
      value: ObjectifPersonnel.ACCOMPAGNEMENT_SANTE,
      icon: '🩺',
      color: '#1abc9c'
    },
    {
      value: ObjectifPersonnel.MEILLEURE_RELATION_ALIMENTATION,
      icon: '🥗',
      color: '#2ecc71'
    }
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>🎯 Quel est ton objectif principal ?</Text>
        <Text style={styles.subtitle}>
          Sélectionne l'objectif qui te correspond le mieux pour personnaliser ton parcours
        </Text>
      </View>

      <ScrollView 
        style={styles.optionsContainer}
        showsVerticalScrollIndicator={false}
      >
        {objectifs.map((option) => {
          const isSelected = profile.objectif === option.value;
          
          return (
            <TouchableOpacity
              key={option.value}
              style={[
                styles.optionCard,
                isSelected && styles.optionCardSelected,
                { borderLeftColor: option.color }
              ]}
              onPress={() => handleSelectObjectif(option.value)}
              activeOpacity={0.7}
            >
              <View style={styles.optionContent}>
                <View style={[styles.iconContainer, { backgroundColor: option.color + '20' }]}>
                  <Text style={styles.optionIcon}>{option.icon}</Text>
                </View>
                
                <View style={styles.optionTextContainer}>
                  <Text style={[
                    styles.optionText,
                    isSelected && styles.optionTextSelected
                  ]}>
                    {LABELS.objectifs[option.value]}
                  </Text>
                </View>
                
                {isSelected && (
                  <View style={styles.checkContainer}>
                    <Text style={styles.checkIcon}>✓</Text>
                  </View>
                )}
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          💡 Tu pourras toujours modifier ton objectif plus tard
        </Text>
      </View>
    </View>
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
  },
  optionsContainer: {
    flex: 1,
  },
  optionCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 12,
    borderLeftWidth: 4,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  optionCardSelected: {
    borderColor: '#00b894',
    borderWidth: 2,
    borderLeftWidth: 4,
    backgroundColor: '#f8fffd',
  },
  optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  optionIcon: {
    fontSize: 24,
  },
  optionTextContainer: {
    flex: 1,
  },
  optionText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#2d3436',
    lineHeight: 20,
  },
  optionTextSelected: {
    color: '#00b894',
    fontWeight: '600',
  },
  checkContainer: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#00b894',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkIcon: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
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

export default EtapeObjectif;