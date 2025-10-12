import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  FlatList,
} from 'react-native';
import { colors, spacing, radii } from '../utils/theme';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/MainNavigator';

export type HistoryScreenProps = NativeStackScreenProps<RootStackParamList, 'Profile'>;

interface MealEntry {
  id: string;
  date: string;
  time: string;
  name: string;
  calories: number;
}

const mealHistory: MealEntry[] = [
  { id: '1', date: 'Today', time: '10:30am', name: 'Beef Burger', calories: 800 },
  { id: '2', date: '25-09-23', time: '10:30am', name: 'Beef Burger', calories: 800 },
  { id: '3', date: '24-09-23', time: '08:15am', name: 'Oatmeal', calories: 350 },
  { id: '4', date: '23-09-23', time: '12:45pm', name: 'Chicken Salad', calories: 450 },
  { id: '5', date: '23-09-23', time: '07:30am', name: 'Greek Yogurt', calories: 200 },
];

export default function HistoryScreen({ navigation }: HistoryScreenProps) {
  const renderMealEntry = ({ item }: { item: MealEntry }) => (
    <View style={styles.mealEntry}>
      <View style={styles.mealInfo}>
        <Text style={styles.mealDate}>{item.date}, {item.time}</Text>
        <Text style={styles.mealName}>{item.name}</Text>
        <Text style={styles.mealCalories}>{item.calories} kcal</Text>
      </View>
      <TouchableOpacity style={styles.deleteButton}>
        <Text style={styles.deleteIcon}>🗑️</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.headerButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.headerButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>History</Text>
        <View style={styles.headerButton} />
      </View>

      <ScrollView style={styles.content}>
        <FlatList
          data={mealHistory}
          renderItem={renderMealEntry}
          keyExtractor={(item) => item.id}
          scrollEnabled={false}
          showsVerticalScrollIndicator={false}
        />
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
  mealEntry: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  mealInfo: {
    flex: 1,
  },
  mealDate: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  mealName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  mealCalories: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  deleteButton: {
    padding: spacing.sm,
  },
  deleteIcon: {
    fontSize: 16,
  },
});
