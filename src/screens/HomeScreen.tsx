import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { colors, spacing, radii } from '../utils/theme';
import { useUser } from '../context/UserContext';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/MainNavigator';

export type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'HomeTabs'>;

export default function HomeScreen({ navigation }: HomeScreenProps) {
  const { userProfile } = useUser();

  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const dates = ['21', '22', '23', '24', '25', '26', '27'];

  const currentWeight = 72.5;
  const targetWeight = 72;
  const bmi = 30.74;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Category</Text>
        </View>

        {/* Calendar */}
        <View style={styles.calendarSection}>
          <View style={styles.calendarRow}>
            {days.map((day, index) => (
              <View key={day} style={styles.calendarItem}>
                <Text style={styles.calendarDay}>{day}</Text>
                <Text style={styles.calendarDate}>{dates[index]}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Water Intake */}
        <View style={styles.waterSection}>
          <Text style={styles.sectionTitle}>Drink water</Text>
          <View style={styles.waterProgress}>
            <View style={styles.waterProgressBar}>
              <View style={[styles.waterProgressFill, { width: '75%' }]} />
            </View>
            <Text style={styles.waterAmount}>1.5 / 2L</Text>
            <TouchableOpacity>
              <Text style={styles.waterArrow}>›</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Challenge */}
        <View style={styles.challengeSection}>
          <Text style={styles.sectionTitle}>Challenge</Text>
          <View style={styles.challengeCard}>
            <Text style={styles.challengeText}>Run for 100 hours in 2 months</Text>
            <TouchableOpacity style={styles.registerButton}>
              <Text style={styles.registerButtonText}>Register</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Monitoring Graph */}
        <View style={styles.monitoringSection}>
          <Text style={styles.sectionTitle}>Monitoring graph...</Text>
        </View>

        {/* Weight Card */}
        <View style={styles.weightCard}>
          <Text style={styles.cardTitle}>WEIGHT</Text>
          <Text style={styles.weightText}>Current {currentWeight} kg</Text>
          <Text style={styles.weightText}>Target {targetWeight} kg</Text>
          <View style={styles.weightProgress}>
            <View style={[styles.weightProgressFill, { width: '60%' }]} />
          </View>
          <View style={styles.weightIcon}>
            <Text style={styles.iconText}>📊</Text>
          </View>
        </View>

        {/* BMI Card */}
        <View style={styles.bmiCard}>
          <Text style={styles.cardTitle}>IMC (kg/m²)</Text>
          <Text style={styles.bmiValue}>{bmi} Surpoids</Text>
          <View style={styles.bmiProgress}>
            <View style={[styles.bmiProgressFill, { width: '70%', backgroundColor: '#FFA500' }]} />
          </View>
          <View style={styles.bmiIcon}>
            <Text style={styles.iconText}>📊</Text>
          </View>
        </View>
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
    backgroundColor: colors.brandLime,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  headerTitle: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '700',
  },
  calendarSection: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.lg,
    backgroundColor: '#f8f9fa',
  },
  calendarRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  calendarItem: {
    alignItems: 'center',
  },
  calendarDay: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  calendarDate: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  waterSection: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.lg,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: spacing.md,
  },
  waterProgress: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  waterProgressBar: {
    flex: 1,
    height: 8,
    backgroundColor: '#e9ecef',
    borderRadius: 4,
    marginRight: spacing.md,
  },
  waterProgressFill: {
    height: '100%',
    backgroundColor: colors.brandLime,
    borderRadius: 4,
  },
  waterAmount: {
    fontSize: 14,
    color: colors.textPrimary,
    marginRight: spacing.sm,
  },
  waterArrow: {
    fontSize: 20,
    color: colors.textSecondary,
  },
  challengeSection: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.lg,
  },
  challengeCard: {
    backgroundColor: '#f8f9fa',
    borderRadius: radii.lg,
    padding: spacing.lg,
  },
  challengeText: {
    fontSize: 16,
    color: colors.textPrimary,
    marginBottom: spacing.md,
  },
  registerButton: {
    backgroundColor: colors.brandLime,
    paddingVertical: spacing.md,
    borderRadius: radii.md,
    alignSelf: 'flex-start',
    paddingHorizontal: spacing.lg,
  },
  registerButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
  monitoringSection: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.lg,
  },
  weightCard: {
    backgroundColor: '#000',
    marginHorizontal: spacing.lg,
    marginBottom: spacing.lg,
    borderRadius: radii.lg,
    padding: spacing.lg,
    position: 'relative',
  },
  cardTitle: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: spacing.md,
    letterSpacing: 1,
  },
  weightText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: spacing.xs,
  },
  weightProgress: {
    height: 8,
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 4,
    marginTop: spacing.md,
  },
  weightProgressFill: {
    height: '100%',
    backgroundColor: colors.brandLime,
    borderRadius: 4,
  },
  weightIcon: {
    position: 'absolute',
    right: spacing.lg,
    top: spacing.lg,
  },
  bmiCard: {
    backgroundColor: '#000',
    marginHorizontal: spacing.lg,
    marginBottom: spacing.lg,
    borderRadius: radii.lg,
    padding: spacing.lg,
    position: 'relative',
  },
  bmiValue: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: spacing.md,
  },
  bmiProgress: {
    height: 8,
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 4,
  },
  bmiProgressFill: {
    height: '100%',
    borderRadius: 4,
  },
  bmiIcon: {
    position: 'absolute',
    right: spacing.lg,
    top: spacing.lg,
  },
  iconText: {
    fontSize: 20,
  },
});
