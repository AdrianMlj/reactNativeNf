import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { colors, spacing, radii } from '../utils/theme';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/MainNavigator';

export type WeeklyChallengeScreenProps = NativeStackScreenProps<RootStackParamList, 'Programs'>;

export default function WeeklyChallengeScreen({ navigation }: WeeklyChallengeScreenProps) {
  const [selectedDays, setSelectedDays] = useState<number | null>(null);

  const handleDaySelect = (days: number) => {
    setSelectedDays(days);
  };

  const handleSave = () => {
    if (selectedDays) {
      // Naviguer vers l'écran de suivi de défi
      navigation.navigate('ChallengeTracking' as any);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Pick your weekly challenge</Text>
        <Text style={styles.subtitle}>How many days you want to train?</Text>

        <View style={styles.daysGrid}>
          {[1, 2, 3, 4, 5, 6, 7].map((day) => (
            <TouchableOpacity
              key={day}
              style={[
                styles.dayButton,
                selectedDays === day && styles.dayButtonSelected
              ]}
              onPress={() => handleDaySelect(day)}
            >
              <Text style={[
                styles.dayButtonText,
                selectedDays === day && styles.dayButtonTextSelected
              ]}>
                {day}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity 
          style={styles.saveButton}
          onPress={handleSave}
          disabled={!selectedDays}
        >
          <Text style={styles.saveButtonText}>SAVE</Text>
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
    paddingHorizontal: spacing.xl,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: spacing.md,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    marginBottom: spacing.xl,
    textAlign: 'center',
  },
  daysGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: spacing.xl,
    gap: spacing.md,
  },
  dayButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#f8f9fa',
    justifyContent: 'center',
    alignItems: 'center',
    margin: spacing.sm,
    borderWidth: 2,
    borderColor: '#e9ecef',
  },
  dayButtonSelected: {
    backgroundColor: colors.brandLime,
    borderColor: colors.brandGreen,
  },
  dayButtonText: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  dayButtonTextSelected: {
    color: '#ffffff',
  },
  saveButton: {
    backgroundColor: colors.brandLime,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.lg,
    borderRadius: radii.lg,
    minWidth: 200,
  },
  saveButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
  },
});
