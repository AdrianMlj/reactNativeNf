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
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/MainNavigator';

export type WelcomeScreenProps = NativeStackScreenProps<RootStackParamList, 'RootTabs'>;

export default function WelcomeScreen({ navigation }: WelcomeScreenProps) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Bonjour Patrick!</Text>
          <Text style={styles.subtitle}>
            Aujourd'hui, vous pouvez scanner votre repas pour vous aider à atteindre vos objectifs de perte de poids
          </Text>
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

        <TouchableOpacity 
          style={styles.scanButton}
          onPress={() => navigation.navigate('NutriScan')}
        >
          <Text style={styles.scanButtonText}>Scanner un Repas</Text>
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
    fontSize: 24,
    fontWeight: '700',
    color: colors.brandLime,
    marginBottom: spacing.md,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: spacing.md,
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
  scanButton: {
    backgroundColor: colors.brandLime,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.lg,
    borderRadius: radii.lg,
    minWidth: 200,
  },
  scanButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
  },
});
