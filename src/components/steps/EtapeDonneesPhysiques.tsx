import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert
} from 'react-native';
import { DonneesPhysiques, NiveauActivite, UserProfile } from '../../types/ProfilingTypes';
import { LABELS, calculerIMC, determinerCategorieIMC } from '../../utils/ProfilingUtils';

interface EtapeDonneesPhysiquesProps {
  profile: Partial<UserProfile>;
  onUpdate: (updates: Partial<UserProfile>) => void;
  onNext: () => void;
  canContinue: boolean;
}

const EtapeDonneesPhysiques: React.FC<EtapeDonneesPhysiquesProps> = ({
  profile,
  onUpdate,
  onNext,
  canContinue
}) => {
  const [donnees, setDonnees] = useState<Partial<DonneesPhysiques>>(
    profile.donneesPhysiques || {}
  );

  const handleUpdateDonnees = (updates: Partial<DonneesPhysiques>) => {
    const nouvellesDonnees = { ...donnees, ...updates };
    setDonnees(nouvellesDonnees);
    onUpdate({ donneesPhysiques: nouvellesDonnees as DonneesPhysiques });
  };

  const handleSelectSexe = (sexe: 'masculin' | 'feminin') => {
    handleUpdateDonnees({ sexe });
  };

  const handleSelectNiveauActivite = (niveauActivite: NiveauActivite) => {
    handleUpdateDonnees({ niveauActivite });
  };

  const handleNumberInput = (field: keyof DonneesPhysiques, value: string) => {
    const numValue = parseFloat(value);
    if (!isNaN(numValue) && numValue > 0) {
      handleUpdateDonnees({ [field]: numValue });
    } else if (value === '') {
      handleUpdateDonnees({ [field]: undefined });
    }
  };

  // Calcul automatique de l'IMC
  useEffect(() => {
    if (donnees.taille && donnees.poids) {
      const imc = calculerIMC(donnees.taille, donnees.poids);
      const categorieIMC = determinerCategorieIMC(imc);
      handleUpdateDonnees({ imc, categorieIMC });
    }
  }, [donnees.taille, donnees.poids]);

  const niveauxActivite = [
    {
      value: NiveauActivite.SEDENTAIRE,
      icon: '🪑',
      description: 'Peu ou pas d\'exercice'
    },
    {
      value: NiveauActivite.LEGEREMENT_ACTIF,
      icon: '🚶',
      description: 'Exercice léger 1-3 fois/semaine'
    },
    {
      value: NiveauActivite.MODEREMENT_ACTIF,
      icon: '🏃',
      description: 'Exercice modéré 3-5 fois/semaine'
    },
    {
      value: NiveauActivite.TRES_ACTIF,
      icon: '💪',
      description: 'Exercice intense 6-7 fois/semaine'
    },
    {
      value: NiveauActivite.TRAVAIL_PHYSIQUE,
      icon: '🏗️',
      description: 'Travail physique + exercice'
    }
  ];

  const getCategorieIMCColor = (imc?: number) => {
    if (!imc) return '#636e72';
    if (imc < 18.5) return '#e74c3c';
    if (imc < 25) return '#27ae60';
    if (imc < 30) return '#f39c12';
    return '#e74c3c';
  };

  const getCategorieIMCText = (imc?: number) => {
    if (!imc) return '';
    if (imc < 18.5) return 'Maigreur';
    if (imc < 25) return 'Normal';
    if (imc < 30) return 'Surpoids';
    return 'Obésité';
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.title}>👤 Parlons un peu de toi</Text>
        <Text style={styles.subtitle}>
          Ces informations nous aident à personnaliser tes recommandations
        </Text>
      </View>

      {/* Sexe */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Sexe</Text>
        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={[
              styles.genderButton,
              donnees.sexe === 'masculin' && styles.genderButtonSelected
            ]}
            onPress={() => handleSelectSexe('masculin')}
          >
            <Text style={styles.genderIcon}>👨</Text>
            <Text style={[
              styles.genderText,
              donnees.sexe === 'masculin' && styles.genderTextSelected
            ]}>
              Masculin
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.genderButton,
              donnees.sexe === 'feminin' && styles.genderButtonSelected
            ]}
            onPress={() => handleSelectSexe('feminin')}
          >
            <Text style={styles.genderIcon}>👩</Text>
            <Text style={[
              styles.genderText,
              donnees.sexe === 'feminin' && styles.genderTextSelected
            ]}>
              Féminin
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Âge */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Âge</Text>
        <TextInput
          style={styles.numberInput}
          placeholder="Ex: 25"
          value={donnees.age ? donnees.age.toString() : ''}
          onChangeText={(value) => handleNumberInput('age', value)}
          keyboardType="numeric"
          maxLength={3}
        />
      </View>

      {/* Taille et Poids */}
      <View style={styles.section}>
        <View style={styles.measurementRow}>
          <View style={styles.measurementItem}>
            <Text style={styles.sectionTitle}>Taille (cm)</Text>
            <TextInput
              style={styles.numberInput}
              placeholder="Ex: 170"
              value={donnees.taille ? donnees.taille.toString() : ''}
              onChangeText={(value) => handleNumberInput('taille', value)}
              keyboardType="numeric"
              maxLength={3}
            />
          </View>

          <View style={styles.measurementItem}>
            <Text style={styles.sectionTitle}>Poids (kg)</Text>
            <TextInput
              style={styles.numberInput}
              placeholder="Ex: 70"
              value={donnees.poids ? donnees.poids.toString() : ''}
              onChangeText={(value) => handleNumberInput('poids', value)}
              keyboardType="numeric"
              maxLength={4}
            />
          </View>
        </View>

        {/* IMC calculé */}
        {donnees.imc && (
          <View style={styles.imcContainer}>
            <Text style={styles.imcLabel}>IMC calculé:</Text>
            <Text style={[styles.imcValue, { color: getCategorieIMCColor(donnees.imc) }]}>
              {donnees.imc} - {getCategorieIMCText(donnees.imc)}
            </Text>
          </View>
        )}
      </View>

      {/* Tour de taille (optionnel) */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Tour de taille (cm) - Optionnel</Text>
        <TextInput
          style={styles.numberInput}
          placeholder="Ex: 85"
          value={donnees.tourTaille ? donnees.tourTaille.toString() : ''}
          onChangeText={(value) => handleNumberInput('tourTaille', value)}
          keyboardType="numeric"
          maxLength={3}
        />
      </View>

      {/* Niveau d'activité */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Niveau d'activité physique</Text>
        <Text style={styles.sectionSubtitle}>
          Sélectionne le niveau qui correspond le mieux à ton mode de vie
        </Text>
        
        {niveauxActivite.map((niveau) => {
          const isSelected = donnees.niveauActivite === niveau.value;
          
          return (
            <TouchableOpacity
              key={niveau.value}
              style={[
                styles.activityCard,
                isSelected && styles.activityCardSelected
              ]}
              onPress={() => handleSelectNiveauActivite(niveau.value)}
            >
              <View style={styles.activityContent}>
                <Text style={styles.activityIcon}>{niveau.icon}</Text>
                <View style={styles.activityTextContainer}>
                  <Text style={[
                    styles.activityTitle,
                    isSelected && styles.activityTitleSelected
                  ]}>
                    {LABELS.niveauxActivite[niveau.value]}
                  </Text>
                  <Text style={styles.activityDescription}>
                    {niveau.description}
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
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          🔒 Tes données personnelles sont sécurisées et ne seront jamais partagées
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
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2d3436',
    marginBottom: 10,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#636e72',
    marginBottom: 15,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
  },
  genderButton: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#e9ecef',
  },
  genderButtonSelected: {
    borderColor: '#00b894',
    backgroundColor: '#f8fffd',
  },
  genderIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  genderText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#636e72',
  },
  genderTextSelected: {
    color: '#00b894',
    fontWeight: '600',
  },
  numberInput: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  measurementRow: {
    flexDirection: 'row',
    gap: 12,
  },
  measurementItem: {
    flex: 1,
  },
  imcContainer: {
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    padding: 12,
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  imcLabel: {
    fontSize: 14,
    color: '#636e72',
  },
  imcValue: {
    fontSize: 16,
    fontWeight: '600',
  },
  activityCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  activityCardSelected: {
    borderColor: '#00b894',
    backgroundColor: '#f8fffd',
  },
  activityContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  activityIcon: {
    fontSize: 24,
    marginRight: 15,
  },
  activityTextContainer: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#2d3436',
    marginBottom: 2,
  },
  activityTitleSelected: {
    color: '#00b894',
    fontWeight: '600',
  },
  activityDescription: {
    fontSize: 13,
    color: '#636e72',
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

export default EtapeDonneesPhysiques;