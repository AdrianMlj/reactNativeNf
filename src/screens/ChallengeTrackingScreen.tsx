import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Image,
} from 'react-native';
import { colors, spacing, radii } from '../utils/theme';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/MainNavigator';

export type ChallengeTrackingScreenProps = NativeStackScreenProps<RootStackParamList, 'Programs'>;

export default function ChallengeTrackingScreen({ navigation }: ChallengeTrackingScreenProps) {
  const [completedDays, setCompletedDays] = useState([0, 1, 2]); // Première semaine avec 3 jours complétés

  const toggleDayCompletion = (weekIndex: number, dayIndex: number) => {
    // Logique pour marquer un jour comme complété
    console.log(`Week ${weekIndex + 1}, Day ${dayIndex + 1} toggled`);
  };

  const WeekRow = ({ weekNumber, completedDays }: { weekNumber: number; completedDays: number[] }) => (
    <View style={styles.weekContainer}>
      <Text style={styles.weekTitle}>Week {weekNumber}</Text>
      <View style={styles.daysRow}>
        {[0, 1, 2, 3, 4, 5, 6].map((dayIndex) => (
          <TouchableOpacity
            key={dayIndex}
            style={[
              styles.dayCircle,
              weekNumber === 1 && completedDays.includes(dayIndex) && styles.dayCompleted,
              weekNumber === 1 && dayIndex === 0 && styles.daySelected,
            ]}
            onPress={() => toggleDayCompletion(weekNumber - 1, dayIndex)}
          />
        ))}
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content}>
        {/* Header avec statut */}
        <View style={styles.header}>
          <Text style={styles.deviceStatus}>iPhone 14 &...</Text>
        </View>

        {/* Bannière du défi */}
        <View style={styles.challengeBanner}>
          <Text style={styles.challengeTitle}>PUSH PULL LEG CHALLENGE</Text>
          <Text style={styles.challengeProgress}>28 Days left 0%</Text>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: '0%' }]} />
          </View>
        </View>

        {/* Description du défi */}
        <View style={styles.descriptionCard}>
          <View style={styles.coachInfo}>
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face' }}
              style={styles.coachAvatar}
            />
            <Text style={styles.descriptionText}>
              Un défi complet pour développer votre force et endurance...
            </Text>
          </View>
        </View>

        {/* Semaines */}
        <View style={styles.weeksContainer}>
          <WeekRow weekNumber={1} completedDays={completedDays} />
          <WeekRow weekNumber={2} completedDays={[]} />
          <WeekRow weekNumber={3} completedDays={[]} />
          <WeekRow weekNumber={4} completedDays={[]} />
        </View>

        {/* Bouton continuer */}
        <TouchableOpacity style={styles.continueButton}>
          <Text style={styles.continueButtonText}>CONTINUE</Text>
        </TouchableOpacity>
      </ScrollView>
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
  },
  header: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    backgroundColor: '#f8f9fa',
  },
  deviceStatus: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  challengeBanner: {
    backgroundColor: '#000',
    padding: spacing.xl,
    alignItems: 'center',
  },
  challengeTitle: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: '700',
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  challengeProgress: {
    color: '#ffffff',
    fontSize: 16,
    marginBottom: spacing.md,
  },
  progressBar: {
    width: '80%',
    height: 8,
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 4,
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.brandLime,
    borderRadius: 4,
  },
  descriptionCard: {
    backgroundColor: '#f8f9fa',
    margin: spacing.lg,
    padding: spacing.lg,
    borderRadius: radii.lg,
  },
  coachInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  coachAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: spacing.md,
  },
  descriptionText: {
    flex: 1,
    fontSize: 14,
    color: colors.textPrimary,
    lineHeight: 20,
  },
  weeksContainer: {
    paddingHorizontal: spacing.lg,
  },
  weekContainer: {
    marginBottom: spacing.lg,
  },
  weekTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: spacing.md,
  },
  daysRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dayCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#e9ecef',
    borderWidth: 2,
    borderColor: '#dee2e6',
  },
  dayCompleted: {
    backgroundColor: '#000',
  },
  daySelected: {
    backgroundColor: '#FFA500',
    borderColor: '#FFA500',
  },
  continueButton: {
    backgroundColor: colors.brandLime,
    marginHorizontal: spacing.lg,
    marginVertical: spacing.xl,
    paddingVertical: spacing.lg,
    borderRadius: radii.lg,
  },
  continueButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
  },
});
