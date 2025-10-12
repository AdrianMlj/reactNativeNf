import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing } from '../utils/theme';

export default function AIAssistantScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>🤖 NutriBot IA</Text>
      <Text style={styles.subtitle}>Chat IA, historique et recommandations dynamiques</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: spacing.lg },
  title: { fontSize: 22, fontWeight: '700', color: colors.textPrimary },
  subtitle: { color: colors.textSecondary, marginTop: 6 },
});
