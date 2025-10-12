import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing } from '../utils/theme';

export default function ExpressScanScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>⚡ ExpressScan IA</Text>
      <Text style={styles.subtitle}>Analyse express sans compte</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: spacing.lg },
  title: { fontSize: 22, fontWeight: '700', color: colors.textPrimary },
  subtitle: { color: colors.textSecondary, marginTop: 6 },
});
