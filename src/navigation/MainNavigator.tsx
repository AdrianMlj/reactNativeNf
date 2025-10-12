import React from 'react';
import { NavigationContainer, DefaultTheme, Theme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import AIAssistantScreen from '../screens/AIAssistantScreen';
import CoachesScreen from '../screens/CoachesScreen';
import ProgramsScreen from '../screens/ProgramsScreen';
import ProductsScreen from '../screens/ProductsScreen';
import CommunicationScreen from '../screens/CommunicationScreen';
import InstitutionalScreen from '../screens/InstitutionalScreen';
import NutriScanScreen from '../screens/NutriScanScreen';
import ExpressScanScreen from '../screens/ExpressScanScreen';
import ProfileScreen from '../screens/ProfileScreen';
import ProfilingScreen from '../components/ProfilingScreen';
import { useUser } from '../context/UserContext';
import { colors } from '../utils/theme';

export type RootStackParamList = {
  RootTabs: undefined;
  HomeTabs: undefined; // alias use
  AIAssistant: undefined;
  Coaches: undefined;
  Programs: undefined;
  Products: undefined;
  Communication: undefined;
  Institutional: undefined;
  NutriScan: undefined;
  ExpressScan: undefined;
  Profile: undefined;
  Profiling: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tabs = createBottomTabNavigator<RootStackParamList>();

function TabsNavigator() {
  return (
    <Tabs.Navigator screenOptions={{ headerShown: false }}>
      <Tabs.Screen name="HomeTabs" component={HomeScreen} options={{ title: 'Accueil' }} />
      <Tabs.Screen name="AIAssistant" component={AIAssistantScreen} options={{ title: 'IA' }} />
      <Tabs.Screen name="Programs" component={ProgramsScreen} options={{ title: 'Suivi' }} />
      <Tabs.Screen name="Products" component={ProductsScreen} options={{ title: 'Produits' }} />
      <Tabs.Screen name="Profile" component={ProfileScreen} options={{ title: 'Profil' }} />
    </Tabs.Navigator>
  );
}

const nutrilTheme: Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#fbfbfbff',
    primary: colors.brandLime,
    text: colors.textPrimary,
    card: '#ffffff',
    border: '#E6E8EC',
    notification: colors.brandLime,
  },
};

function RootNavigator() {
  const { setUserProfile } = useUser();
  return (
    <Stack.Navigator>
      <Stack.Screen name="RootTabs" component={TabsNavigator} options={{ headerShown: false }} />
      <Stack.Screen
        name="AIAssistant"
        component={AIAssistantScreen}
        options={{ title: 'NutriBot IA' }}
      />
      <Stack.Screen name="Coaches" component={CoachesScreen} options={{ title: 'Coachs' }} />
      <Stack.Screen name="Communication" component={CommunicationScreen} options={{ title: 'Communication' }} />
      <Stack.Screen name="Institutional" component={InstitutionalScreen} options={{ title: 'Institutionnels' }} />
      <Stack.Screen name="NutriScan" component={NutriScanScreen} options={{ title: 'NutriScan' }} />
      <Stack.Screen name="ExpressScan" component={ExpressScanScreen} options={{ title: 'ExpressScan' }} />
      <Stack.Screen name="Profiling" options={{ title: 'Profilage', presentation: 'fullScreenModal' }}>
        {() => (
          <ProfilingScreen
            onComplete={(profile) => {
              setUserProfile(profile);
            }}
          />
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
}

export default function MainNavigator() {
  return (
    <NavigationContainer theme={nutrilTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}
