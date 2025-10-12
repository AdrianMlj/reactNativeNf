import React from 'react';
import { Text } from 'react-native';
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
import WelcomeScreen from '../screens/WelcomeScreen';
import WelcomeAfterProfilingScreen from '../screens/WelcomeAfterProfilingScreen';
import MealScanScreen from '../screens/MealScanScreen';
import MealDetailsScreen from '../screens/MealDetailsScreen';
import UserProfileScreen from '../screens/UserProfileScreen';
import WeeklyChallengeScreen from '../screens/WeeklyChallengeScreen';
import ChallengeTrackingScreen from '../screens/ChallengeTrackingScreen';
import HistoryScreen from '../screens/HistoryScreen';
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
  Welcome: undefined;
  WelcomeAfterProfiling: undefined;
  MealScan: undefined;
  MealDetails: undefined;
  UserProfile: undefined;
  WeeklyChallenge: undefined;
  ChallengeTracking: undefined;
  History: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tabs = createBottomTabNavigator<RootStackParamList>();

function TabsNavigator() {
  return (
    <Tabs.Navigator 
      screenOptions={{ 
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#ffffff',
          borderTopColor: '#e9ecef',
          paddingBottom: 5,
          paddingTop: 5,
          height: 60,
        },
        tabBarActiveTintColor: colors.brandLime,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
      }}
    >
      <Tabs.Screen 
        name="HomeTabs" 
        component={HomeScreen} 
        options={{ 
          title: 'Accueil',
          tabBarIcon: ({ color, size }) => (
            <Text style={{ fontSize: size, color }}>🏠</Text>
          ),
        }} 
      />
      <Tabs.Screen 
        name="AIAssistant" 
        component={AIAssistantScreen} 
        options={{ 
          title: 'IA',
          tabBarIcon: ({ color, size }) => (
            <Text style={{ fontSize: size, color }}>🤖</Text>
          ),
        }} 
      />
      <Tabs.Screen 
        name="Programs" 
        component={WeeklyChallengeScreen} 
        options={{ 
          title: 'Défis',
          tabBarIcon: ({ color, size }) => (
            <Text style={{ fontSize: size, color }}>🏋️</Text>
          ),
        }} 
      />
      <Tabs.Screen 
        name="Products" 
        component={ProductsScreen} 
        options={{ 
          title: 'Produits',
          tabBarIcon: ({ color, size }) => (
            <Text style={{ fontSize: size, color }}>🛍️</Text>
          ),
        }} 
      />
      <Tabs.Screen 
        name="Profile" 
        component={UserProfileScreen} 
        options={{ 
          title: 'Profil',
          tabBarIcon: ({ color, size }) => (
            <Text style={{ fontSize: size, color }}>👤</Text>
          ),
        }} 
      />
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
  const { userProfile, setUserProfile, hasCompletedProfiling } = useUser();
  
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!userProfile ? (
        // Étape 1: Profilage
        <Stack.Screen name="Profiling" options={{ presentation: 'fullScreenModal' }}>
          {() => (
            <ProfilingScreen
              onComplete={(profile) => {
                setUserProfile(profile);
              }}
            />
          )}
        </Stack.Screen>
      ) : !hasCompletedProfiling ? (
        // Étape 2: Écran de bienvenue après profilage
        <Stack.Screen name="WelcomeAfterProfiling" component={WelcomeAfterProfilingScreen} options={{ presentation: 'fullScreenModal' }} />
      ) : (
        // Étape 3: Application principale
        <>
          <Stack.Screen name="RootTabs" component={TabsNavigator} />
          <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ title: 'Bienvenue' }} />
          <Stack.Screen name="MealScan" component={MealScanScreen} options={{ title: 'Scanner un Repas' }} />
          <Stack.Screen name="MealDetails" component={MealDetailsScreen} options={{ title: 'Détails du Repas' }} />
          <Stack.Screen name="UserProfile" component={UserProfileScreen} options={{ title: 'Profil Utilisateur' }} />
          <Stack.Screen name="WeeklyChallenge" component={WeeklyChallengeScreen} options={{ title: 'Défi Hebdomadaire' }} />
          <Stack.Screen name="ChallengeTracking" component={ChallengeTrackingScreen} options={{ title: 'Suivi Défi' }} />
          <Stack.Screen name="History" component={HistoryScreen} options={{ title: 'Historique' }} />
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
        </>
      )}
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
