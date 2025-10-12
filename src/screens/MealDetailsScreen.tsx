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
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/MainNavigator';

export type MealDetailsScreenProps = NativeStackScreenProps<RootStackParamList, 'NutriScan'>;

export default function MealDetailsScreen({ navigation }: MealDetailsScreenProps) {
  const ingredients = [
    { name: 'Pain burger', amount: '250g' },
    { name: 'Fromage', amount: '200g' },
    { name: 'Tomate', amount: '170g' },
    { name: 'Oignon', amount: '170g' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.headerButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.headerButtonText}>✕</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Scanner un Repas</Text>
        <TouchableOpacity style={styles.headerButton}>
          <Text style={styles.headerButtonText}>?</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.mealImageContainer}>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400' }}
            style={styles.mealImage}
            resizeMode="cover"
          />
        </View>

        <View style={styles.mealInfo}>
          <Text style={styles.mealName}>Beef Burger</Text>
          <Text style={styles.mealCalories}>800 kcal</Text>

          <View style={styles.macrosContainer}>
            <View style={styles.macroCard}>
              <View style={styles.macroHeader}>
                <Text style={styles.macroIcon}>🥩</Text>
                <Text style={styles.macroLabel}>Protein</Text>
              </View>
              <Text style={styles.macroAmount}>90g</Text>
              <View style={styles.macroProgress}>
                <View style={[styles.macroProgressBar, { backgroundColor: colors.brandGreen, width: '75%' }]} />
              </View>
            </View>

            <View style={styles.macroCard}>
              <View style={styles.macroHeader}>
                <Text style={styles.macroIcon}>🍞</Text>
                <Text style={styles.macroLabel}>Carbs</Text>
              </View>
              <Text style={styles.macroAmount}>121g</Text>
              <View style={styles.macroProgress}>
                <View style={[styles.macroProgressBar, { backgroundColor: '#FFA500', width: '85%' }]} />
              </View>
            </View>

            <View style={styles.macroCard}>
              <View style={styles.macroHeader}>
                <Text style={styles.macroIcon}>🥑</Text>
                <Text style={styles.macroLabel}>Fat</Text>
              </View>
              <Text style={styles.macroAmount}>60g</Text>
              <View style={styles.macroProgress}>
                <View style={[styles.macroProgressBar, { backgroundColor: '#87CEEB', width: '60%' }]} />
              </View>
            </View>
          </View>

          <View style={styles.ingredientsSection}>
            <Text style={styles.sectionTitle}>Ingredient</Text>
            {ingredients.map((ingredient, index) => (
              <View key={index} style={styles.ingredientRow}>
                <Text style={styles.ingredientText}>
                  {ingredient.name} {ingredient.amount}
                </Text>
                <TouchableOpacity style={styles.deleteButton}>
                  <Text style={styles.deleteIcon}>🗑️</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      <View style={styles.actions}>
        <TouchableOpacity style={styles.editButton}>
          <Text style={styles.editButtonText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.saveButton}>
          <Text style={styles.saveButtonText}>Save</Text>
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
  },
  mealImageContainer: {
    height: 200,
  },
  mealImage: {
    width: '100%',
    height: '100%',
  },
  mealInfo: {
    padding: spacing.lg,
  },
  mealName: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  mealCalories: {
    fontSize: 18,
    color: colors.textSecondary,
    marginBottom: spacing.lg,
  },
  macrosContainer: {
    marginBottom: spacing.lg,
  },
  macroCard: {
    backgroundColor: '#f8f9fa',
    borderRadius: radii.md,
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  macroHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  macroIcon: {
    fontSize: 20,
    marginRight: spacing.sm,
  },
  macroLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  macroAmount: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  macroProgress: {
    height: 6,
    backgroundColor: '#e9ecef',
    borderRadius: 3,
    overflow: 'hidden',
  },
  macroProgressBar: {
    height: '100%',
    borderRadius: 3,
  },
  ingredientsSection: {
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: spacing.md,
  },
  ingredientRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  ingredientText: {
    fontSize: 16,
    color: colors.textPrimary,
  },
  deleteButton: {
    padding: spacing.xs,
  },
  deleteIcon: {
    fontSize: 16,
  },
  actions: {
    flexDirection: 'row',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.lg,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#e9ecef',
  },
  editButton: {
    flex: 1,
    backgroundColor: '#e9ecef',
    paddingVertical: spacing.md,
    borderRadius: radii.md,
    marginRight: spacing.sm,
  },
  editButtonText: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  saveButton: {
    flex: 1,
    backgroundColor: colors.brandLime,
    paddingVertical: spacing.md,
    borderRadius: radii.md,
    marginLeft: spacing.sm,
  },
  saveButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});
