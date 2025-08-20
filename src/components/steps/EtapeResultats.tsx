import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions
} from 'react-native';
import { UserProfile } from '../../types/ProfilingTypes';
import { LABELS, STATISTIQUES_PROFILS } from '../../utils/ProfilingUtils';
import { colors } from '../../utils/theme';

const { width } = Dimensions.get('window');

interface EtapeResultatsProps {
  profile: UserProfile;
  onComplete: () => void;
  onBack: () => void;
}

const EtapeResultats: React.FC<EtapeResultatsProps> = ({
  profile,
  onComplete,
  onBack
}) => {
  const getIMCStatus = () => {
    const imc = profile.donneesPhysiques.imc;
    if (!imc) return { text: '', color: '#636e72' };
    
    if (imc < 18.5) return { text: 'Maigreur', color: '#e74c3c' };
    if (imc < 25) return { text: 'Normal', color: '#27ae60' };
    if (imc < 30) return { text: 'Surpoids', color: '#f39c12' };
    return { text: 'Obésité', color: '#e74c3c' };
  };

  const getNutriTypeDescription = (nutriType: string) => {
    // Logique simplifiée pour décrire le NutriType
    const descriptions: { [key: string]: string } = {
      'PERTE_': 'Profil orienté perte de poids',
      'PRISE_': 'Profil orienté prise de poids',
      'MAINTIEN_': 'Profil orienté maintien du poids',
      'ENERGIE_': 'Profil orienté amélioration de l\'énergie',
      'SPORT_': 'Profil orienté performances sportives',
      'EQUILIBRE_': 'Profil orienté équilibre général'
    };

    for (const [key, desc] of Object.entries(descriptions)) {
      if (nutriType.startsWith(key)) {
        return desc;
      }
    }
    return 'Profil personnalisé';
  };

  const imcStatus = getIMCStatus();

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.title}>Ton profil est prêt</Text>
        <Text style={styles.subtitle}>Voici le résumé de ton profilage personnalisé</Text>
      </View>

      {/* NutriType */}
      <View style={styles.nutriTypeCard}>
        <View style={styles.nutriTypeHeader}>
          <Text style={styles.nutriTypeIcon}>🧬</Text>
          <View style={styles.nutriTypeInfo}>
            <Text style={styles.nutriTypeTitle}>Ton NutriType</Text>
            <Text style={styles.nutriTypeCode}>{profile.nutriType}</Text>
          </View>
        </View>
        <Text style={styles.nutriTypeDescription}>
          {getNutriTypeDescription(profile.nutriType || '')}
        </Text>
        <View style={styles.nutriTypeStats}>
          <Text style={styles.nutriTypeStatsText}>
            Parmi {STATISTIQUES_PROFILS.PROFILS_PAR_NUTRITYPE.toLocaleString()} profils similaires
          </Text>
        </View>
      </View>

      {/* Résumé du profil */}
      <View style={styles.summarySection}>
        <Text style={styles.sectionTitle}>Résumé de ton profil</Text>
        
        {/* Objectif */}
        <View style={styles.summaryCard}>
          <Text style={styles.summaryCardTitle}>Objectif principal</Text>
          <Text style={styles.summaryCardValue}>
            {LABELS.objectifs[profile.objectif]}
          </Text>
        </View>

        {/* Données physiques */}
        <View style={styles.summaryCard}>
          <Text style={styles.summaryCardTitle}>Données physiques</Text>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Sexe:</Text>
            <Text style={styles.summaryValue}>
              {profile.donneesPhysiques.sexe === 'masculin' ? 'Masculin' : 'Féminin'}
            </Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Âge:</Text>
            <Text style={styles.summaryValue}>{profile.donneesPhysiques.age} ans</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Taille/Poids:</Text>
            <Text style={styles.summaryValue}>
              {profile.donneesPhysiques.taille}cm / {profile.donneesPhysiques.poids}kg
            </Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>IMC:</Text>
            <Text style={[styles.summaryValue, { color: imcStatus.color }]}>
              {profile.donneesPhysiques.imc} - {imcStatus.text}
            </Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Activité:</Text>
            <Text style={styles.summaryValue}>
              {LABELS.niveauxActivite[profile.donneesPhysiques.niveauActivite]}
            </Text>
          </View>
        </View>

        {/* Santé */}
        <View style={styles.summaryCard}>
          <Text style={styles.summaryCardTitle}>Situations de santé</Text>
          <Text style={styles.summaryCardValue}>
            {profile.donneesSante.nombreSituations === 0 
              ? 'Aucune situation particulière'
              : `${profile.donneesSante.nombreSituations} situation${profile.donneesSante.nombreSituations > 1 ? 's' : ''} à prendre en compte`
            }
          </Text>
        </View>

        {/* Motivations */}
        <View style={styles.summaryCard}>
          <Text style={styles.summaryCardTitle}>Motivations</Text>
          <Text style={styles.summaryCardValue}>
            {profile.motivationsBlockages.motivations.length} motivation{profile.motivationsBlockages.motivations.length > 1 ? 's' : ''} identifiée{profile.motivationsBlockages.motivations.length > 1 ? 's' : ''}
          </Text>
        </View>

        {/* Activités sportives */}
        <View style={styles.summaryCard}>
          <Text style={styles.summaryCardTitle}>Activités sportives</Text>
          <Text style={styles.summaryCardValue}>
            {profile.activitesSportives.activites.length} activité{profile.activitesSportives.activites.length > 1 ? 's' : ''} sélectionnée{profile.activitesSportives.activites.length > 1 ? 's' : ''}
          </Text>
        </View>
      </View>

      {/* Prochaines étapes */}
      <View style={styles.nextStepsSection}>
        <Text style={styles.sectionTitle}>Prochaines étapes</Text>
        <View style={styles.stepCard}>
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>Recommandations personnalisées</Text>
            <Text style={styles.stepDescription}>
              Reçois des conseils nutrition et sport adaptés à ton profil
            </Text>
          </View>
        </View>
        
        <View style={styles.stepCard}>
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>Suivi quotidien</Text>
            <Text style={styles.stepDescription}>
              Accède à ton tableau de bord personnalisé
            </Text>
          </View>
        </View>

        <View style={styles.stepCard}>
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>Accompagnement IA</Text>
            <Text style={styles.stepDescription}>
              Bénéficie d'un accompagnement intelligent
            </Text>
          </View>
        </View>
      </View>

      {/* Boutons d'action */}
      <View style={styles.actionsSection}>
        <TouchableOpacity 
          style={styles.primaryButton}
          onPress={onComplete}
        >
          <Text style={styles.primaryButtonText}>Commencer mon parcours</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.secondaryButton}
          onPress={onBack}
        >
          <Text style={styles.secondaryButtonText}>Modifier mon profil</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Tes données sont sécurisées. Tu peux modifier ton profil à tout moment.</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  celebration: {
    fontSize: 60,
    marginBottom: 15,
  },
  title: {
    fontSize: 28,
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
  nutriTypeCard: {
    backgroundColor: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    backgroundColor: '#667eea',
    borderRadius: 16,
    padding: 20,
    marginBottom: 30,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
  },
  nutriTypeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  nutriTypeIcon: {
    fontSize: 40,
    marginRight: 15,
  },
  nutriTypeInfo: {
    flex: 1,
  },
  nutriTypeTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 5,
  },
  nutriTypeCode: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  nutriTypeDescription: {
    fontSize: 16,
    color: '#fff',
    opacity: 0.9,
    marginBottom: 15,
  },
  nutriTypeStats: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 8,
    padding: 10,
  },
  nutriTypeStatsText: {
    fontSize: 14,
    color: '#fff',
    textAlign: 'center',
    fontWeight: '500',
  },
  summarySection: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2d3436',
    marginBottom: 20,
  },
  summaryCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  summaryCardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2d3436',
    marginBottom: 10,
  },
  summaryCardValue: {
    fontSize: 15,
    color: '#636e72',
    lineHeight: 20,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#636e72',
    flex: 1,
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: '500',
    color: '#2d3436',
    flex: 1,
    textAlign: 'right',
  },
  nextStepsSection: {
    marginBottom: 30,
  },
  stepCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  stepIcon: {
    fontSize: 30,
    marginRight: 15,
  },
  stepContent: {
    flex: 1,
  },
  stepTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2d3436',
    marginBottom: 4,
  },
  stepDescription: {
    fontSize: 14,
    color: '#636e72',
    lineHeight: 18,
  },
  actionsSection: {
    marginBottom: 30,
  },
  primaryButton: {
    backgroundColor: colors.brandLime,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginBottom: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
  },
  primaryButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.textOnLime,
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  secondaryButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#636e72',
  },
  footer: {
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#e9ecef',
  },
  footerText: {
    fontSize: 14,
    color: '#636e72',
    textAlign: 'center',
    fontStyle: 'italic',
    lineHeight: 18,
  },
});

export default EtapeResultats;