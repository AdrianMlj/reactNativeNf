import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { colors, spacing, radii } from '../utils/theme';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/MainNavigator';

export type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'HomeTabs'>;

const Tile = ({ title, subtitle, onPress }: { title: string; subtitle: string; onPress: () => void }) => (
  <TouchableOpacity style={styles.tile} onPress={onPress}>
    <Text style={styles.tileTitle}>{title}</Text>
    <Text style={styles.tileSubtitle}>{subtitle}</Text>
  </TouchableOpacity>
);

export default function HomeScreen({ navigation }: HomeScreenProps) {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Nutril'way</Text>
      <Text style={styles.subheading}>Choisis un module pour commencer</Text>

      <View style={styles.grid}>
        <Tile title="🤖 NutriBot IA" subtitle="Chat IA & recommandations" onPress={() => navigation.navigate('AIAssistant')} />
        <Tile title="🧑‍🏫 Coachs" subtitle="Réservations, messages" onPress={() => navigation.navigate('Coaches')} />
        <Tile title="🏋️ Programmes" subtitle="Plans & suivi" onPress={() => navigation.navigate('Programs')} />
        <Tile title="🧃 Produits" subtitle="Shake Bar & commandes" onPress={() => navigation.navigate('Products')} />
        <Tile title="💬 Communication" subtitle="Badges, challenges" onPress={() => navigation.navigate('Communication')} />
        <Tile title="📊 Institutionnels" subtitle="Dashboards & Open Data" onPress={() => navigation.navigate('Institutional')} />
        <Tile title="📸 NutriScan" subtitle="Scan & analyse IA" onPress={() => navigation.navigate('NutriScan')} />
        <Tile title="⚡ ExpressScan" subtitle="Analyse rapide" onPress={() => navigation.navigate('ExpressScan')} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: spacing.lg,
  },
  heading: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  subheading: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: spacing.lg,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  tile: {
    width: '48%',
    backgroundColor: colors.surface,
    borderRadius: radii.md,
    padding: spacing.md,
    marginBottom: spacing.md,
    ...StyleSheet.flatten({ shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 8, shadowOffset: { width: 0, height: 2 }, elevation: 1 }),
  },
  tileTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  tileSubtitle: {
    marginTop: 4,
    color: colors.textSecondary,
  },
});
