// Import des bibliothèques de navigation
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Import des écrans de l'application
import SearchScreen from './screens/SearchScreen';
import ResultScreen from './screens/ResultScreen';
import DetailScreen from './screens/DetailScreen';
import MyCollectionScreen from './screens/MyCollectionScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Navigation en pile pour la partie "Recherche"
function SearchStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="Search" 
        component={SearchScreen} 
        options={{ headerShown: false }} // Enlève le header de l’écran principal
      />
      <Stack.Screen 
        name="Results" 
        component={ResultScreen} 
        options={{ title: 'Search results' }} 
      />
      <Stack.Screen 
        name="Details" 
        component={DetailScreen} 
        options={{ title: 'Detail' }} 
      />
    </Stack.Navigator>
  );
}

// Navigation principale avec onglets en bas
export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen 
          name="ISeek" 
          component={SearchStack} 
        />
        <Tab.Screen 
          name="My Collection" 
          component={MyCollectionScreen} 
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}