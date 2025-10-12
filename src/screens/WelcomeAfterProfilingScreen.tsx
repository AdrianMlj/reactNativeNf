import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from 'react-native';
import { colors, spacing, radii } from '../utils/theme';
import { useUser } from '../context/UserContext';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/MainNavigator';

export type WelcomeAfterProfilingScreenProps = NativeStackScreenProps<RootStackParamList, 'Welcome'>;

export default function WelcomeAfterProfilingScreen({ navigation }: WelcomeAfterProfilingScreenProps) {
  const { userProfile, setHasCompletedProfiling } = useUser();

  const handleStartJourney = () => {
    setHasCompletedProfiling(true);
    // Navigation vers l'écran principal
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Félicitations !</Text>
          <Text style={styles.subtitle}>
            Votre profil NutrilFit a été créé avec succès
          </Text>
        </View>

        <View style={styles.profileInfo}>
          <Text style={styles.profileLabel}>Votre NutriType :</Text>
          <Text style={styles.nutriType}>{userProfile?.nutriType || 'NutriType'}</Text>
          
          <Text style={styles.profileLabel}>Votre objectif :</Text>
          <Text style={styles.objectif}>{userProfile?.objectif || 'Objectif'}</Text>
        </View>

        <View style={styles.illustration}>
          <View style={styles.phoneFrame}>
            <View style={styles.phoneScreen}>
              <View style={styles.scanIcon}>
                <Text style={styles.scanIconText}>📷</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.description}>
          <Text style={styles.descriptionText}>
            Maintenant, vous pouvez commencer votre parcours nutritionnel personnalisé. 
            Scanner vos repas, suivez vos défis et atteignez vos objectifs !
          </Text>
        </View>

        <TouchableOpacity 
          style={styles.startButton}
          onPress={handleStartJourney}
        >
          <Text style={styles.startButtonText}>Commencer le parcours</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  content: {
    flex: 1,
    paddingHorizontal: spacing.lg,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: spacing.md,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: spacing.md,
  },
  profileInfo: {
    backgroundColor: '#f8f9fa',
    borderRadius: radii.lg,
    padding: spacing.lg,
    marginBottom: spacing.xl,
    width: '100%',
  },
  profileLabel: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: spacing.md,
    marginBottom: spacing.xs,
  },
  nutriType: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.brandLime,
  },
  objectif: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  illustration: {
    marginBottom: spacing.xl,
    alignItems: 'center',
  },
  phoneFrame: {
    width: 120,
    height: 200,
    backgroundColor: '#000',
    borderRadius: 20,
    padding: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  phoneScreen: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scanIcon: {
    width: 60,
    height: 60,
    backgroundColor: colors.brandLime,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scanIconText: {
    fontSize: 24,
  },
  description: {
    marginBottom: spacing.xl,
    paddingHorizontal: spacing.md,
  },
  descriptionText: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
  },
  startButton: {
    backgroundColor: colors.brandLime,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.lg,
    borderRadius: radii.lg,
    minWidth: 250,
  },
  startButtonText: {
    color: colors.textOnLime,
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
  },
});
