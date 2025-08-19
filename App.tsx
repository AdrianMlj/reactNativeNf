/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  useColorScheme,
  SafeAreaView,
  TouchableOpacity,
  Alert
} from 'react-native';
import ProfilingScreen from './src/components/ProfilingScreen';
import { UserProfile } from './src/types/ProfilingTypes';
import { colors } from './src/utils/theme';

function App() {
  const isDarkMode = useColorScheme() === 'dark';
  const [showProfiling, setShowProfiling] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  const handleStartProfiling = () => {
    setShowProfiling(true);
  };

  const handleProfilingComplete = (profile: UserProfile) => {
    setUserProfile(profile);
    setShowProfiling(false);
    
    Alert.alert(
      '🎉 Profil créé avec succès !',
      `Ton NutriType: ${profile.nutriType}\nID Profil: ${profile.profilId}`,
      [
        {
          text: 'Parfait !',
          onPress: () => console.log('Profil sauvegardé:', profile)
        }
      ]
    );
  };

  const handleViewProfile = () => {
    if (userProfile) {
      Alert.alert(
        '👤 Ton Profil NutriBot',
        `NutriType: ${userProfile.nutriType}\n` +
        `Objectif: ${userProfile.objectif}\n` +
        `IMC: ${userProfile.donneesPhysiques.imc}\n` +
        `Activités: ${userProfile.activitesSportives.activites.length} sélectionnées`,
        [
          { text: 'Modifier', onPress: () => setShowProfiling(true) },
          { text: 'Fermer', style: 'cancel' }
        ]
      );
    }
  };

  if (showProfiling) {
    return (
      <ProfilingScreen
        onComplete={handleProfilingComplete}
      />
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      
      <View style={styles.header}>
        <Text style={styles.appTitle}>Nutril'way</Text>
        <Text style={styles.appSubtitle}>Ton compagnon mieux-être & nutrition</Text>
      </View>

      <View style={styles.content}>
        {!userProfile ? (
          <View style={styles.welcomeSection}>
            <Text style={styles.welcomeTitle}>
              Bienvenue sur Nutril'way
            </Text>
            <Text style={styles.welcomeText}>
              Crée ton profil pour recevoir un accompagnement simple, sans blabla, adapté à tes objectifs.
            </Text>
            
            <TouchableOpacity 
              style={styles.startButton}
              onPress={handleStartProfiling}
            >
              <Text style={styles.startButtonText}>Commencer</Text>
            </TouchableOpacity>

            <View style={styles.featuresSection}>
              <Text style={styles.featuresTitle}>Ce que tu vas obtenir :</Text>
              
              <View style={styles.feature}>
                <Text style={styles.featureText}>Un profil nutrition personnalisé</Text>
              </View>
              
              <View style={styles.feature}>
                <Text style={styles.featureText}>Des recommandations claires</Text>
              </View>
              
              <View style={styles.feature}>
                <Text style={styles.featureText}>Un suivi simple au quotidien</Text>
              </View>
            </View>
          </View>
        ) : (
          <View style={styles.profileSection}>
            <Text style={styles.profileTitle}>
              Ton profil est configuré !
            </Text>
            
            <View style={styles.profileSummary}>
              <Text style={styles.profileSummaryTitle}>NutriType: {userProfile.nutriType}</Text>
              <Text style={styles.profileSummaryText}>
                Objectif: {userProfile.objectif}
              </Text>
              <Text style={styles.profileSummaryText}>
                IMC: {userProfile.donneesPhysiques.imc} ({userProfile.donneesPhysiques.categorieIMC})
              </Text>
              <Text style={styles.profileSummaryText}>
                Activités: {userProfile.activitesSportives.activites.length} sélectionnées
              </Text>
            </View>

            <View style={styles.actionsSection}>
              <TouchableOpacity 
                style={styles.actionButton}
                onPress={handleViewProfile}
              >
                <Text style={styles.actionButtonText}>Voir mon profil</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={[styles.actionButton, styles.secondaryActionButton]}
                onPress={() => setShowProfiling(true)}
              >
                <Text style={[styles.actionButtonText, styles.secondaryActionButtonText]}>Modifier mon profil</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.nextStepsSection}>
              <Text style={styles.nextStepsTitle}>Prochaines fonctionnalités</Text>
              <Text style={styles.nextStepsText}>
                • Recommandations nutritionnelles personnalisées{'\n'}
                • Plans d'entraînement adaptés{'\n'}
                • Suivi quotidien intelligent{'\n'}
                • Coaching IA en temps réel
              </Text>
            </View>
          </View>
        )}
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Développé avec ❤️ pour une nutrition personnalisée
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    backgroundColor: colors.brandBlack,
    paddingHorizontal: 20,
    paddingVertical: 20,
    alignItems: 'center',
    borderBottomWidth: 0,
  },
  appTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.brandLime,
    marginBottom: 5,
  },
  appSubtitle: {
    fontSize: 16,
    color: colors.textOnBlack,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  welcomeSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcomeTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.textOnBlack,
    textAlign: 'center',
    marginBottom: 15,
  },
  welcomeText: {
    fontSize: 16,
    color: colors.textOnBlack,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  startButton: {
    backgroundColor: colors.brandLime,
    borderRadius: 12,
    paddingHorizontal: 30,
    paddingVertical: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    marginBottom: 40,
  },
  startButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.textOnLime,
  },
  featuresSection: {
    width: '100%',
    maxWidth: 300,
  },
  featuresTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.brandLime,
    marginBottom: 15,
    textAlign: 'center',
  },
  feature: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    paddingHorizontal: 10,
  },
  featureText: {
    fontSize: 14,
    color: colors.textOnBlack,
    flex: 1,
    lineHeight: 18,
  },
  profileSection: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 50,
  },
  profileTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.textOnBlack,
    textAlign: 'center',
    marginBottom: 30,
  },
  profileSummary: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 20,
    marginBottom: 30,
    width: '100%',
    elevation: 2,
  },
  profileSummaryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: 10,
  },
  profileSummaryText: {
    fontSize: 16,
    color: '#4A5160',
    marginBottom: 5,
  },
  actionsSection: {
    width: '100%',
    marginBottom: 30,
  },
  actionButton: {
    backgroundColor: colors.brandLime,
    borderRadius: 12,
    padding: 15,
    alignItems: 'center',
    marginBottom: 12,
    elevation: 2,
  },
  secondaryActionButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.brandLime,
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textOnLime,
  },
  secondaryActionButtonText: {
    color: colors.brandLime,
  },
  nextStepsSection: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 20,
    width: '100%',
    borderLeftWidth: 0,
  },
  nextStepsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: 10,
  },
  nextStepsText: {
    fontSize: 14,
    color: '#4A5160',
    lineHeight: 20,
  },
  footer: {
    padding: 20,
    alignItems: 'center',
    borderTopWidth: 0,
    backgroundColor: colors.brandBlack,
  },
  footerText: {
    fontSize: 14,
    color: colors.textOnBlack,
    fontStyle: 'italic',
  },
});

export default App;
