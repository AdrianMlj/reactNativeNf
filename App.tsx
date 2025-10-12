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
import MainNavigator from './src/navigation/MainNavigator';
import { UserProvider } from './src/context/UserContext';

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

  return (
    <UserProvider>
      <MainNavigator />
    </UserProvider>
  );
}

const styles = StyleSheet.create({
  // styles legacy supprimés, la navigation gère l'UI globale désormais
});

export default App;