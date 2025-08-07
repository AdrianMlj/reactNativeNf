/**
 * Nutrile Fit App
 * Écran d'accueil simple avec logo et couleurs harmonieuses
 *
 * @format
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
} from 'react-native';

function App() {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1a3d1a" />
      
      {/* Logo */}
      <View style={styles.logoContainer}>
        <View style={styles.logoBackground}>
          <Text style={styles.logoText}>N</Text>
        </View>
      </View>
      
      {/* Nom de l'app */}
      <Text style={styles.appName}>Nutrile Fit</Text>
      <Text style={styles.tagline}>Votre compagnon nutritionnel</Text>
      
      {/* Bouton */}
      <View style={styles.buttonContainer}>
        <View style={styles.startButton}>
          <Text style={styles.startButtonText}>Commencer</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a3d1a',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  logoContainer: {
    marginBottom: 30,
  },
  logoBackground: {
    width: 120,
    height: 120,
    borderRadius: 20,
    backgroundColor: '#1a3d1a',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#32cd32',
  },
  logoText: {
    fontSize: 60,
    fontWeight: 'bold',
    color: '#32cd32',
  },
  appName: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 10,
    textAlign: 'center',
  },
  tagline: {
    fontSize: 18,
    color: '#32cd32',
    marginBottom: 50,
    textAlign: 'center',
  },
  buttonContainer: {
    marginTop: 30,
  },
  startButton: {
    backgroundColor: '#32cd32',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 25,
    alignItems: 'center',
  },
  startButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1a3d1a',
  },
});

export default App;
