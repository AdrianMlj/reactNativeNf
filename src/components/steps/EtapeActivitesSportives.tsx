import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput
} from 'react-native';
import { 
  ActiviteSportive, 
  ActivitesSportives, 
  UserProfile 
} from '../../types/ProfilingTypes';
import { LABELS } from '../../utils/ProfilingUtils';

interface EtapeActivitesSportivesProps {
  profile: Partial<UserProfile>;
  onUpdate: (updates: Partial<UserProfile>) => void;
  onNext: () => void;
  canContinue: boolean;
}

const EtapeActivitesSportives: React.FC<EtapeActivitesSportivesProps> = ({
  profile,
  onUpdate,
  onNext,
  canContinue
}) => {
  const [activites, setActivites] = useState<ActiviteSportive[]>(
    profile.activitesSportives?.activites || []
  );
  const [autreActivite, setAutreActivite] = useState<string>(
    profile.activitesSportives?.autreActivite || ''
  );

  const updateProfile = (newActivites: ActiviteSportive[], newAutreActivite?: string) => {
    const activitesSportives: ActivitesSportives = {
      activites: newActivites,
      autreActivite: newAutreActivite
    };
    onUpdate({ activitesSportives });
  };

  const handleToggleActivite = (activite: ActiviteSportive) => {
    const newActivites = activites.includes(activite)
      ? activites.filter(a => a !== activite)
      : [...activites, activite];
    
    setActivites(newActivites);
    updateProfile(newActivites, autreActivite);
  };

  const handleAutreActiviteChange = (text: string) => {
    setAutreActivite(text);
    updateProfile(activites, text);
  };

  const activitesOptions = [
    {
      value: ActiviteSportive.MARCHE_RAPIDE,
      label: 'Marche rapide',
      icon: '🏃',
      color: '#27ae60',
      category: 'Cardio'
    },
    {
      value: ActiviteSportive.MUSCULATION_FITNESS,
      label: 'Musculation / fitness',
      icon: '🏋️',
      color: '#e74c3c',
      category: 'Force'
    },
    {
      value: ActiviteSportive.YOGA_RELAXATION,
      label: 'Yoga / relaxation',
      icon: '🧘',
      color: '#9b59b6',
      category: 'Bien-être'
    },
    {
      value: ActiviteSportive.SPORTS_COLLECTIFS,
      label: 'Sports collectifs',
      icon: '🏀',
      color: '#3498db',
      category: 'Équipe'
    },
    {
      value: ActiviteSportive.DANSE,
      label: 'Danse',
      icon: '💃',
      color: '#e91e63',
      category: 'Artistique'
    },
    {
      value: ActiviteSportive.VELO,
      label: 'Vélo',
      icon: '🚴',
      color: '#f39c12',
      category: 'Cardio'
    },
    {
      value: ActiviteSportive.NATATION,
      label: 'Natation',
      icon: '🏊',
      color: '#1abc9c',
      category: 'Aquatique'
    },
    {
      value: ActiviteSportive.SPORTS_COMBAT,
      label: 'Sports de combat',
      icon: '🥊',
      color: '#e74c3c',
      category: 'Combat'
    },
    {
      value: ActiviteSportive.RANDONNEE_OUTDOOR,
      label: 'Randonnée / outdoor',
      icon: '🧗',
      color: '#27ae60',
      category: 'Nature'
    },
    {
      value: ActiviteSportive.ACTIVITES_EXTREMES,
      label: 'Activités extrêmes',
      icon: '🪂',
      color: '#8e44ad',
      category: 'Extrême'
    },
    {
      value: ActiviteSportive.ACTIVITE_FAMILLE,
      label: 'Activité en famille',
      icon: '🧒',
      color: '#f39c12',
      category: 'Famille'
    },
    {
      value: ActiviteSportive.EXERCICES_APP_VIDEO,
      label: 'Exercices via app/vidéo',
      icon: '📱',
      color: '#34495e',
      category: 'Digital'
    },
    {
      value: ActiviteSportive.AUTRE,
      label: 'Autre',
      icon: '❓',
      color: '#7f8c8d',
      category: 'Autre'
    }
  ];

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      'Cardio': '#27ae60',
      'Force': '#e74c3c',
      'Bien-être': '#9b59b6',
      'Équipe': '#3498db',
      'Artistique': '#e91e63',
      'Aquatique': '#1abc9c',
      'Combat': '#e74c3c',
      'Nature': '#27ae60',
      'Extrême': '#8e44ad',
      'Famille': '#f39c12',
      'Digital': '#34495e',
      'Autre': '#7f8c8d'
    };
    return colors[category] || '#7f8c8d';
  };

  const groupedActivites = activitesOptions.reduce((acc, activite) => {
    if (!acc[activite.category]) {
      acc[activite.category] = [];
    }
    acc[activite.category].push(activite);
    return acc;
  }, {} as { [key: string]: typeof activitesOptions });

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.title}>🏃‍♀️ Activités sportives</Text>
        <Text style={styles.subtitle}>
          Quel(s) sport(s) pratiques-tu ou souhaites-tu pratiquer ?
        </Text>
        <View style={styles.counterContainer}>
          <Text style={styles.counterText}>
            {activites.length} activité{activites.length > 1 ? 's' : ''} sélectionnée{activites.length > 1 ? 's' : ''}
          </Text>
        </View>
      </View>

      {Object.entries(groupedActivites).map(([category, categoryActivites]) => (
        <View key={category} style={styles.categorySection}>
          <View style={styles.categoryHeader}>
            <View style={[
              styles.categoryIndicator,
              { backgroundColor: getCategoryColor(category) }
            ]} />
            <Text style={styles.categoryTitle}>{category}</Text>
          </View>

          <View style={styles.activitesGrid}>
            {categoryActivites.map((option) => {
              const isSelected = activites.includes(option.value);
              
              return (
                <TouchableOpacity
                  key={option.value}
                  style={[
                    styles.activiteCard,
                    isSelected && styles.activiteCardSelected,
                    { borderColor: option.color + '40' }
                  ]}
                  onPress={() => handleToggleActivite(option.value)}
                >
                  <View style={styles.activiteContent}>
                    <View style={[
                      styles.iconContainer,
                      { backgroundColor: option.color + '20' }
                    ]}>
                      <Text style={styles.activiteIcon}>{option.icon}</Text>
                    </View>
                    
                    <Text style={[
                      styles.activiteText,
                      isSelected && styles.activiteTextSelected
                    ]}>
                      {option.label}
                    </Text>
                    
                    {isSelected && (
                      <View style={[
                        styles.checkContainer,
                        { backgroundColor: option.color }
                      ]}>
                        <Text style={styles.checkIcon}>✓</Text>
                      </View>
                    )}
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      ))}

      {/* Champ "Autre activité" */}
      {activites.includes(ActiviteSportive.AUTRE) && (
        <View style={styles.autreSection}>
          <Text style={styles.autreLabel}>Précise ton autre activité :</Text>
          <TextInput
            style={styles.autreInput}
            placeholder="Ex: Escalade, Pilates, etc."
            value={autreActivite}
            onChangeText={handleAutreActiviteChange}
            multiline
          />
        </View>
      )}

      <View style={styles.recommendationsContainer}>
        <Text style={styles.recommendationsTitle}>💡 Recommandations</Text>
        <Text style={styles.recommendationsText}>
          • Combine différents types d'activités pour un entraînement complet
        </Text>
        <Text style={styles.recommendationsText}>
          • L'OMS recommande 150min d'activité modérée par semaine
        </Text>
        <Text style={styles.recommendationsText}>
          • Choisis des activités que tu aimes pour rester motivé(e)
        </Text>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          🎯 Ces informations nous aident à personnaliser tes programmes d'entraînement
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
    backgroundColor: '#f0f8ff',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    alignSelf: 'center',
  },
  counterText: {
    fontSize: 14,
    color: '#3498db',
    fontWeight: '600',
  },
  categorySection: {
    marginBottom: 30,
  },
  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  categoryIndicator: {
    width: 4,
    height: 20,
    borderRadius: 2,
    marginRight: 10,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2d3436',
  },
  activitesGrid: {
    gap: 12,
  },
  activiteCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 2,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  activiteCardSelected: {
    backgroundColor: '#f8fffd',
    elevation: 3,
    borderWidth: 2,
    borderColor: '#00b894',
  },
  activiteContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  iconContainer: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  activiteIcon: {
    fontSize: 22,
  },
  activiteText: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
    color: '#2d3436',
  },
  activiteTextSelected: {
    color: '#00b894',
    fontWeight: '600',
  },
  checkContainer: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkIcon: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  autreSection: {
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  autreLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2d3436',
    marginBottom: 10,
  },
  autreInput: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#e9ecef',
    minHeight: 60,
    textAlignVertical: 'top',
  },
  recommendationsContainer: {
    backgroundColor: '#e8f5e8',
    borderRadius: 12,
    padding: 16,
    marginTop: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#27ae60',
  },
  recommendationsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#27ae60',
    marginBottom: 10,
  },
  recommendationsText: {
    fontSize: 14,
    color: '#27ae60',
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

export default EtapeActivitesSportives;