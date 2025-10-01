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
import { colors } from '../../utils/theme';

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
    <View style={styles.wrapper}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Activités sportives</Text>
          <Text style={styles.subtitle}>
            Quel(s) sport(s) pratiques-tu ou souhaites-tu pratiquer ?
          </Text>
          <Text style={styles.counterText}>
            {activites.length} activité{activites.length > 1 ? 's' : ''} sélectionnée{activites.length > 1 ? 's' : ''}
          </Text>
        </View>

        <View style={styles.optionsContainer}>
          {activitesOptions.map((option) => {
            const isSelected = activites.includes(option.value);
            return (
              <TouchableOpacity
                key={option.value}
                style={[
                  styles.optionButton,
                  isSelected && styles.optionButtonSelected
                ]}
                onPress={() => handleToggleActivite(option.value)}
                activeOpacity={0.8}
              >
                <Text style={[
                  styles.optionButtonText,
                  isSelected && styles.optionButtonTextSelected
                ]}>
                  {option.icon} {option.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

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

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Ces informations restent strictement confidentielles
          </Text>
        </View>
      </ScrollView>
      {/* <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[
            styles.continueButton,
            !canContinue && styles.continueButtonDisabled
          ]}
          onPress={onNext}
          activeOpacity={canContinue ? 0.8 : 1}
          disabled={!canContinue}
        >
          <Text style={styles.continueButtonText}>Continuer</Text>
        </TouchableOpacity>
      </View> */}
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
    marginBottom: 32,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 15,
    color: '#888',
    marginBottom: 12,
    textAlign: 'center',
  },
  counterText: {
    fontSize: 14,
    color: colors.brandLime,
    fontWeight: '600',
    marginBottom: 8,
  },
  optionsContainer: {
    gap: 16,
    marginBottom: 32,
  },
  optionButton: {
    backgroundColor: '#F6F6F6',
    borderRadius: 24,
    paddingVertical: 18,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#F6F6F6',
  },
  optionButtonSelected: {
    backgroundColor: colors.brandLime,
    borderColor: colors.brandLime,
  },
  optionButtonText: {
    fontSize: 16,
    color: '#222',
    fontWeight: '500',
  },
  optionButtonTextSelected: {
    color: '#fff',
    fontWeight: 'bold',
  },
  autreSection: {
    marginBottom: 20,
    marginTop: 10,
  },
  autreLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#222',
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
  footer: {
    marginTop: 24,
    alignItems: 'center',
    marginBottom: 80,
  },
  footerText: {
    fontSize: 13,
    color: '#888',
    fontStyle: 'italic',
    textAlign: 'center',
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
    backgroundColor: colors.brandLime,
    borderRadius: 28,
    paddingVertical: 18,
    width: '100%',
    alignItems: 'center',
    shadowColor: '#C6FF00',
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 2,
  },
  continueButtonDisabled: {
    backgroundColor: '#E0E0E0',
  },
  continueButtonText: {
    color: '#222',
    fontWeight: 'bold',
    fontSize: 18,
    letterSpacing: 0.5,
  },
});

export default EtapeActivitesSportives;