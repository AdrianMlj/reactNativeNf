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
      'Profil créé avec succès',
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
        'Ton profil',
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
      
      {/* Formes géométriques en arrière-plan */}
      <View style={[styles.shape, styles.circle, { top: '15%', left: '10%' }]} />
      <View style={[styles.shape, styles.triangle, { top: '25%', right: '15%' }]} />
      <View style={[styles.shape, styles.circle, { bottom: '20%', right: '10%' }]} />
      <View style={[styles.shape, styles.square, { bottom: '30%', left: '15%' }]} />
      
      <View style={styles.overlay}>
        <View style={styles.content}>
          <Text style={styles.title}>Welcome to a more</Text>
          <Text style={styles.titleBold}>healthy lifestyle</Text>
          
          <Text style={styles.subtitle}>
            We're here to learn more about your dietary needs
            and preferences so we can provide you with
            personalized information and tips.
          </Text>
          
          <TouchableOpacity 
            style={styles.button}
            onPress={handleStartProfiling}
          >
            <Text style={styles.buttonText}>GET STARTED</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f7e6',
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  content: {
    alignItems: 'center',
    maxWidth: 350,
  },
  title: {
    fontSize: 32,
    color: '#2C3E50',
    textAlign: 'center',
    marginBottom: 5,
    fontWeight: '300',
  },
  titleBold: {
    fontSize: 32,
    color: '#2C3E50',
    textAlign: 'center',
    marginBottom: 30,
    fontWeight: '700',
  },
  subtitle: {
    fontSize: 18,
    color: '#2C3E50',
    textAlign: 'center',
    lineHeight: 26,
    marginBottom: 40,
    fontWeight: '300',
  },
  button: {
    backgroundColor: '#000000ff',
    paddingHorizontal: 40,
    paddingVertical: 15,
    borderRadius: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
  },
  buttonText: {
    color: '#B2EE1B',
    fontSize: 18,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  // Styles pour les formes géométriques
  shape: {
    position: 'absolute',
    opacity: 0.2,
  },
  circle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#B2EE1B',
  },
  triangle: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 50,
    borderRightWidth: 50,
    borderBottomWidth: 100,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: '#B2EE1B',
    transform: [{ rotate: '180deg' }],
  },
  square: {
    width: 80,
    height: 80,
    backgroundColor: '#B2EE1B',
    transform: [{ rotate: '45deg' }],
  },
});

export default App;