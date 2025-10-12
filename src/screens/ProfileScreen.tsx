import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors, spacing, radii } from '../utils/theme';
import { useUser } from '../context/UserContext';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/MainNavigator';

export type ProfileScreenProps = NativeStackScreenProps<RootStackParamList, 'Profile'>;

export default function ProfileScreen({ navigation }: ProfileScreenProps) {
  const { userProfile } = useUser();

  return (
    <View style={styles.container}>
      {userProfile ? (
        <View>
          <Text style={styles.title}>👤 Ton Profil</Text>
          <Text style={styles.line}>NutriType: {userProfile.nutriType}</Text>
          <Text style={styles.line}>Objectif: {userProfile.objectif}</Text>
          <Text style={styles.line}>IMC: {userProfile.donneesPhysiques.imc}</Text>
        </View>
      ) : (
        <View>
          <Text style={styles.title}>Crée ton profil</Text>
          <Text style={styles.subtitle}>Tu n'as pas encore complété le profilage</Text>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Profiling')}>
            <Text style={styles.buttonText}>Démarrer le profilage</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: spacing.lg },
  title: { fontSize: 22, fontWeight: '700', color: colors.textPrimary },
  subtitle: { color: colors.textSecondary, marginTop: 6, marginBottom: spacing.md },
  line: { marginTop: 8, color: colors.textPrimary },
  button: { backgroundColor: colors.brandLime, padding: spacing.md, borderRadius: radii.md, marginTop: spacing.md },
  buttonText: { color: colors.textOnLime, fontWeight: '700', textAlign: 'center' },
});
