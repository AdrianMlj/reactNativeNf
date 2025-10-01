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
import { colors } from '../../utils/theme';

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
  const [dateNaissance, setDateNaissance] = useState({
    jour: '',
    mois: '',
    annee: ''
  });

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

  // Calcul de l'âge à partir de la date de naissance
  const calculerAge = (jour: string, mois: string, annee: string): number | undefined => {
    if (!jour || !mois || !annee) return undefined;
    
    const jourNum = parseInt(jour, 10);
    const moisNum = parseInt(mois, 10);
    const anneeNum = parseInt(annee, 10);
    
    if (isNaN(jourNum) || isNaN(moisNum) || isNaN(anneeNum)) return undefined;
    
    const today = new Date();
    const naissance = new Date(anneeNum, moisNum - 1, jourNum);
    
    let age = today.getFullYear() - naissance.getFullYear();
    const m = today.getMonth() - naissance.getMonth();
    
    if (m < 0 || (m === 0 && today.getDate() < naissance.getDate())) {
      age--;
    }
    
    return age;
  };

  // Mise à jour de l'âge quand la date change
  useEffect(() => {
    const age = calculerAge(dateNaissance.jour, dateNaissance.mois, dateNaissance.annee);
    if (age !== undefined) {
      handleUpdateDonnees({ age });
    }
  }, [dateNaissance]);

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
      description: 'Très peu d\'activité physique'
    },
    {
      value: NiveauActivite.LEGEREMENT_ACTIF,
      description: 'Je marche un peu, bouge parfois'
    },
    {
      value: NiveauActivite.MODEREMENT_ACTIF,
      description: 'Je fais un peu de sport chaque semaine'
    },
    {
      value: NiveauActivite.TRES_ACTIF,
      description: 'Sport régulier, mode de vie dynamique'
    },
    {
      value: NiveauActivite.TRAVAIL_PHYSIQUE,
      description: 'Travail physique / sportif intense'
    }
  ];

  // Fonction pour obtenir la couleur selon la catégorie IMC
  const getCategorieIMCColor = (imc?: number) => {
    if (!imc) return '#636e72';
    if (imc < 18.5) return '#e74c3c';
    if (imc < 25) return '#27ae60';
    if (imc < 30) return '#f39c12';
    return '#e74c3c';
  };

  // Fonction pour obtenir le texte de catégorie IMC
  const getCategorieIMCText = (imc?: number) => {
    if (!imc) return '';
    if (imc < 18.5) return 'Maigreur';
    if (imc < 25) return 'Normal';
    if (imc < 30) return 'Surpoids';
    return 'Obésité';
  };

  return (
    <View style={styles.wrapper}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        
        {/* En-tête */}
        <View style={styles.header}>
          <Text style={styles.title}>Apprenons à te connaître un peu mieux</Text>
        </View>

        {/* Sexe avec symboles masculin/féminin */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quel est ton <Text style={styles.bold}>sexe</Text> ?</Text>
          <View style={styles.genderContainer}>
            <TouchableOpacity
              style={[
                styles.genderOption,
                donnees.sexe === 'masculin' && styles.genderOptionSelected
              ]}
              onPress={() => handleSelectSexe('masculin')}
            >
              <View style={[
                styles.genderSymbolContainer,
                donnees.sexe === 'masculin' && styles.genderSymbolContainerSelected
              ]}>
                <Text style={[
                  styles.genderSymbol,
                  donnees.sexe === 'masculin' && styles.genderSymbolSelected
                ]}>♂</Text>
              </View>
              <Text style={[
                styles.genderOptionText,
                donnees.sexe === 'masculin' && styles.genderOptionTextSelected
              ]}>
                Homme
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.genderOption,
                donnees.sexe === 'feminin' && styles.genderOptionSelected
              ]}
              onPress={() => handleSelectSexe('feminin')}
            >
              <View style={[
                styles.genderSymbolContainer,
                donnees.sexe === 'feminin' && styles.genderSymbolContainerSelected
              ]}>
                <Text style={[
                  styles.genderSymbol,
                  donnees.sexe === 'feminin' && styles.genderSymbolSelected
                ]}>♀</Text>
              </View>
              <Text style={[
                styles.genderOptionText,
                donnees.sexe === 'feminin' && styles.genderOptionTextSelected
              ]}>
                Femme
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.divider} />

        {/* Date de naissance */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quel est ta <Text style={styles.bold}>date de naissance</Text> ?</Text>
          <View style={styles.dateInputContainer}>
            <TextInput
              style={styles.dateInput}
              placeholder="JJ"
              placeholderTextColor="#A0A0A0"
              value={dateNaissance.jour}
              onChangeText={(text) => setDateNaissance({...dateNaissance, jour: text})}
              maxLength={2}
              keyboardType="numeric"
            />
            <Text style={styles.dateSeparator}>/</Text>
            <TextInput
              style={styles.dateInput}
              placeholder="MM"
              placeholderTextColor="#A0A0A0"
              value={dateNaissance.mois}
              onChangeText={(text) => setDateNaissance({...dateNaissance, mois: text})}
              maxLength={2}
              keyboardType="numeric"
            />
            <Text style={styles.dateSeparator}>/</Text>
            <TextInput
              style={styles.dateInput}
              placeholder="AAAA"
              placeholderTextColor="#A0A0A0"
              value={dateNaissance.annee}
              onChangeText={(text) => setDateNaissance({...dateNaissance, annee: text})}
              maxLength={4}
              keyboardType="numeric"
            />
          </View>
          {donnees.age && (
            <Text style={styles.ageText}>Âge: {donnees.age} ans</Text>
          )}
        </View>

        <View style={styles.divider} />

        {/* Taille */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quelle est ta taille ?</Text>
          <View style={styles.measurementContainer}>
            <View style={styles.unitSelector}>
              <Text style={styles.unitText}>Kg.cm</Text>
              <Text style={[styles.unitText, styles.unitInactive]}>Lb, ft</Text>
            </View>
            <TextInput
              style={styles.largeInput}
              placeholder="170"
              placeholderTextColor="#A0A0A0"
              value={donnees.taille ? donnees.taille.toString() : ''}
              onChangeText={(value) => handleNumberInput('taille', value)}
              keyboardType="numeric"
              maxLength={3}
            />
            <Text style={styles.unitLabel}>cm</Text>
          </View>
        </View>

        <View style={styles.divider} />

        {/* Poids actuel */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quelle est ton poids actuel ?</Text>
          <View style={styles.weightContainer}>
            <TextInput
              style={styles.weightInput}
              placeholder="0"
              placeholderTextColor="#A0A0A0"
              value={donnees.poids ? donnees.poids.toString() : ''}
              onChangeText={(value) => handleNumberInput('poids', value)}
              keyboardType="numeric"
              maxLength={3}
            />
            <View style={styles.weightUnit}>
              <Text style={styles.weightUnitText}>Kg</Text>
            </View>
          </View>
        </View>

        {/* Affichage de l'IMC */}
        {donnees.imc && (
          <View style={styles.imcContainer}>
            <Text style={styles.imcTitle}>Votre IMC: </Text>
            <Text style={[styles.imcValue, { color: getCategorieIMCColor(donnees.imc) }]}>
              {donnees.imc.toFixed(1)} ({getCategorieIMCText(donnees.imc)})
            </Text>
          </View>
        )}

        <View style={styles.divider} />

        {/* Niveau d'activité */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quel est ton niveau d'activité au quotidien ?</Text>
          
          {niveauxActivite.map((niveau) => {
            const isSelected = donnees.niveauActivite === niveau.value;
            
            return (
              <TouchableOpacity
                key={niveau.value}
                style={[
                  styles.activityOption,
                  isSelected && styles.activityOptionSelected
                ]}
                onPress={() => handleSelectNiveauActivite(niveau.value)}
              >
                <Text style={[
                  styles.activityOptionText,
                  isSelected && styles.activityOptionTextSelected
                ]}>
                  {niveau.description}
                </Text>
                {isSelected && (
                  <View style={styles.checkmark}>
                    <Text style={styles.checkmarkText}>✓</Text>
                  </View>
                )}
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Bouton CONTINUER */}
        <TouchableOpacity 
          style={[styles.continueButton, !canContinue && styles.continueButtonDisabled]}
          onPress={onNext}
          disabled={!canContinue}
        >
          <Text style={styles.continueButtonText}>CONTINUER</Text>
        </TouchableOpacity>

      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  header: {
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    color: '#2C3E50',
    textAlign: 'center',
    marginBottom: 10,
    fontWeight: '400',
  },
  bold: {
    fontWeight: '700',
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 18,
    color: '#2C3E50',
    marginBottom: 15,
    textAlign: 'center',
  },
 genderContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
  },
  genderOption: {
    alignItems: 'center',
    padding: 15,
    borderRadius: 15,
    backgroundColor: '#F8F8F8',
    borderWidth: 2,
    borderColor: '#E8E8E8',
    width: 120,
  },
  genderOptionSelected: {
    borderColor: '#B2EE1B',
    backgroundColor: '#F8FFE0',
  },
  genderSymbolContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#E8E8E8',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  genderSymbolContainerSelected: {
    backgroundColor: '#B2EE1B',
  },
  genderSymbol: {
    fontSize: 24,
    color: '#666666',
  },
  genderSymbolSelected: {
    color: '#FFFFFF',
  },
  genderOptionText: {
    fontSize: 16,
    color: '#666666',
    fontWeight: '500',
  },
  genderOptionTextSelected: {
    color: '#2C3E50',
    fontWeight: '600',
  },
  divider: {
    height: 1,
    backgroundColor: '#EEEEEE',
    marginVertical: 20,
  },
  dateInputContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  dateInput: {
    width: 60,
    height: 50,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 10,
    textAlign: 'center',
    fontSize: 16,
    color: '#2C3E50',
  },
  dateSeparator: {
    fontSize: 18,
    color: '#2C3E50',
    fontWeight: 'bold',
  },
  ageText: {
    textAlign: 'center',
    marginTop: 10,
    color: '#666666',
    fontSize: 14,
  },
  measurementContainer: {
    alignItems: 'center',
  },
  unitSelector: {
    flexDirection: 'row',
    gap: 20,
    marginBottom: 15,
  },
  unitText: {
    fontSize: 14,
    color: '#B2EE1B',
    fontWeight: '600',
  },
  unitInactive: {
    color: '#CCCCCC',
  },
  largeInput: {
    width: 120,
    height: 60,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 15,
    textAlign: 'center',
    fontSize: 24,
    color: '#2C3E50',
    fontWeight: '500',
    marginBottom: 10,
  },
  unitLabel: {
    fontSize: 14,
    color: '#666666',
  },
  weightContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  weightInput: {
    width: 80,
    height: 50,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 10,
    textAlign: 'center',
    fontSize: 18,
    color: '#2C3E50',
    fontWeight: '500',
  },
  weightUnit: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    backgroundColor: '#B2EE1B',
    borderRadius: 15,
  },
  weightUnitText: {
    fontSize: 14,
    color: '#2C3E50',
    fontWeight: '600',
  },
  imcContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
    marginBottom: 10,
  },
  imcTitle: {
    fontSize: 16,
    color: '#2C3E50',
    fontWeight: '500',
  },
  imcValue: {
    fontSize: 16,
    fontWeight: '600',
  },
  activityOption: {
    padding: 18,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  activityOptionSelected: {
    borderColor: '#B2EE1B',
    backgroundColor: '#F8FFE0',
  },
  activityOptionText: {
    fontSize: 16,
    color: '#666666',
    flex: 1,
  },
  activityOptionTextSelected: {
    color: '#2C3E50',
    fontWeight: '500',
  },
  checkmark: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#B2EE1B',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkmarkText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
  continueButton: {
    backgroundColor: '#B2EE1B',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginVertical: 30,
    marginHorizontal: 20,
  },
  continueButtonDisabled: {
    backgroundColor: '#CCCCCC',
  },
  continueButtonText: {
    color: '#2C3E50',
    fontSize: 18,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
});

export default EtapeDonneesPhysiques;