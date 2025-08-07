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
        <Text style={styles.appTitle}>🤖 NUTR'ILEFIT</Text>
        <Text style={styles.appSubtitle}>Ton assistant nutrition intelligent</Text>
      </View>

      <View style={styles.content}>
        {!userProfile ? (
          <View style={styles.welcomeSection}>
            <Text style={styles.welcomeIcon}>📋</Text>
            <Text style={styles.welcomeTitle}>
              Bienvenue dans NutriBot !
            </Text>
            <Text style={styles.welcomeText}>
              Commence par créer ton profil personnalisé pour recevoir des recommandations 
              nutrition et sport adaptées à tes besoins.
            </Text>
            
            <TouchableOpacity 
              style={styles.startButton}
              onPress={handleStartProfiling}
            >
              <Text style={styles.startButtonText}>
                🚀 Commencer mon profilage
              </Text>
            </TouchableOpacity>

            <View style={styles.featuresSection}>
              <Text style={styles.featuresTitle}>Ce que tu vas obtenir :</Text>
              
              <View style={styles.feature}>
                <Text style={styles.featureIcon}>🧬</Text>
                <Text style={styles.featureText}>
                  Ton NutriType personnalisé parmi 70 profils possibles
                </Text>
              </View>
              
              <View style={styles.feature}>
                <Text style={styles.featureIcon}>🎯</Text>
                <Text style={styles.featureText}>
                  Des recommandations adaptées à tes objectifs
                </Text>
              </View>
              
              <View style={styles.feature}>
                <Text style={styles.featureIcon}>📊</Text>
                <Text style={styles.featureText}>
                  Un suivi personnalisé basé sur 360M de profils
                </Text>
              </View>
            </View>
          </View>
        ) : (
          <View style={styles.profileSection}>
            <Text style={styles.profileIcon}>✅</Text>
            <Text style={styles.profileTitle}>
              Ton profil est configuré !
            </Text>
            
            <View style={styles.profileSummary}>
              <Text style={styles.profileSummaryTitle}>
                🧬 NutriType: {userProfile.nutriType}
              </Text>
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
                <Text style={styles.actionButtonText}>
                  👤 Voir mon profil complet
                </Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={[styles.actionButton, styles.secondaryActionButton]}
                onPress={() => setShowProfiling(true)}
              >
                <Text style={[styles.actionButtonText, styles.secondaryActionButtonText]}>
                  ✏️ Modifier mon profil
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.nextStepsSection}>
              <Text style={styles.nextStepsTitle}>🚀 Prochaines fonctionnalités</Text>
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
    backgroundColor: '#f8f9fa',
  },
  header: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 20,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  appTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2d3436',
    marginBottom: 5,
  },
  appSubtitle: {
    fontSize: 16,
    color: '#636e72',
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
  welcomeIcon: {
    fontSize: 80,
    marginBottom: 20,
  },
  welcomeTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2d3436',
    textAlign: 'center',
    marginBottom: 15,
  },
  welcomeText: {
    fontSize: 16,
    color: '#636e72',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  startButton: {
    backgroundColor: '#00b894',
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
    color: '#fff',
  },
  featuresSection: {
    width: '100%',
    maxWidth: 300,
  },
  featuresTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2d3436',
    marginBottom: 15,
    textAlign: 'center',
  },
  feature: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    paddingHorizontal: 10,
  },
  featureIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  featureText: {
    fontSize: 14,
    color: '#636e72',
    flex: 1,
    lineHeight: 18,
  },
  profileSection: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 50,
  },
  profileIcon: {
    fontSize: 60,
    marginBottom: 20,
  },
  profileTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2d3436',
    textAlign: 'center',
    marginBottom: 30,
  },
  profileSummary: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 30,
    width: '100%',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  profileSummaryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#00b894',
    marginBottom: 10,
  },
  profileSummaryText: {
    fontSize: 16,
    color: '#636e72',
    marginBottom: 5,
  },
  actionsSection: {
    width: '100%',
    marginBottom: 30,
  },
  actionButton: {
    backgroundColor: '#00b894',
    borderRadius: 12,
    padding: 15,
    alignItems: 'center',
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  secondaryActionButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#00b894',
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  secondaryActionButtonText: {
    color: '#00b894',
  },
  nextStepsSection: {
    backgroundColor: '#e8f5e8',
    borderRadius: 12,
    padding: 20,
    width: '100%',
    borderLeftWidth: 4,
    borderLeftColor: '#27ae60',
  },
  nextStepsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#27ae60',
    marginBottom: 10,
  },
  nextStepsText: {
    fontSize: 14,
    color: '#27ae60',
    lineHeight: 20,
  },
  footer: {
    padding: 20,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#e9ecef',
  },
  footerText: {
    fontSize: 14,
    color: '#636e72',
    fontStyle: 'italic',
  },
});

export default App;
