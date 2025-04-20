import React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import SearchScreen from './screens/SearchScreen';
import ResultScreen from './screens/ResultScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';



const Stack = createNativeStackNavigator();



export default function App() {
  return (
    <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen name="Search" component={SearchScreen}/>
            <Stack.Screen name="Results" component={ResultScreen}/>
        </Stack.Navigator>
        </NavigationContainer>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
  },
});
