import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { colors, spacing, radii } from '../utils/theme';
import { useUser } from '../context/UserContext';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/MainNavigator';

export type UserProfileScreenProps = NativeStackScreenProps<RootStackParamList, 'Profile'>;

export default function UserProfileScreen({ navigation }: UserProfileScreenProps) {
  const { userProfile } = useUser();

  const currentWeight = 72.5;
  const targetWeight = 65;
  const progress = ((currentWeight - targetWeight) / (currentWeight - targetWeight + (currentWeight - targetWeight))) * 100;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.headerButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.headerButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}></Text>
        <TouchableOpacity style={styles.headerButton}>
          <Text style={styles.headerButtonText}>👤</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.profileSection}>
          <View style={styles.avatarContainer}>
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face' }}
              style={styles.avatar}
            />
          </View>
          <Text style={styles.userName}>John Doe</Text>
        </View>

        <View style={styles.weightCard}>
          <Text style={styles.cardTitle}>WEIGHT</Text>
          <View style={styles.weightInfo}>
            <Text style={styles.currentWeight}>Current {currentWeight} kg</Text>
            <Text style={styles.targetWeight}>Target {targetWeight} kg</Text>
          </View>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${progress}%` }]} />
          </View>
          <TouchableOpacity style={styles.logWeightButton}>
            <Text style={styles.logWeightButtonText}>Log weight</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.optionsSection}>
          <TouchableOpacity style={styles.optionRow}>
            <Text style={styles.optionText}>Edit profile</Text>
            <Text style={styles.optionArrow}>›</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.optionRow}>
            <Text style={styles.optionText}>Saved meals</Text>
            <Text style={styles.optionArrow}>›</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.optionRow}>
            <Text style={styles.optionText}>History</Text>
            <Text style={styles.optionArrow}>›</Text>
          </TouchableOpacity>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    backgroundColor: colors.brandLime,
  },
  headerButton: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
  },
  headerTitle: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '700',
  },
  content: {
    flex: 1,
    paddingHorizontal: spacing.lg,
  },
  profileSection: {
    alignItems: 'center',
    paddingVertical: spacing.xl,
  },
  avatarContainer: {
    marginBottom: spacing.md,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: colors.brandGreen,
  },
  userName: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  weightCard: {
    backgroundColor: '#000',
    borderRadius: radii.lg,
    padding: spacing.lg,
    marginBottom: spacing.lg,
  },
  cardTitle: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: spacing.md,
    letterSpacing: 1,
  },
  weightInfo: {
    marginBottom: spacing.md,
  },
  currentWeight: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: spacing.xs,
  },
  targetWeight: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  progressBar: {
    height: 8,
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 4,
    marginBottom: spacing.lg,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.brandLime,
    borderRadius: 4,
  },
  logWeightButton: {
    backgroundColor: '#ffffff',
    paddingVertical: spacing.md,
    borderRadius: radii.md,
  },
  logWeightButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  optionsSection: {
    backgroundColor: '#f8f9fa',
    borderRadius: radii.lg,
    padding: spacing.md,
  },
  optionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  optionText: {
    fontSize: 16,
    color: colors.textPrimary,
    fontWeight: '500',
  },
  optionArrow: {
    fontSize: 20,
    color: colors.textSecondary,
  },
});
