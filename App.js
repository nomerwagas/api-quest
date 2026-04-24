import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import GalleryScreen from './screens/GalleryScreen';
import PictureDetailScreen from './screens/PictureDetailScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="light" />
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: '#05050f', // Darker, more professional
          },
          headerTintColor: '#e2e8f0', // Soft white
          headerTitleStyle: {
            fontWeight: '600',
            fontSize: 18,
          },
          headerShadowVisible: false, // Cleaner look
        }}
      >
        <Stack.Screen 
          name="Home" 
          component={HomeScreen}
          options={{ headerShown: false }} // Home screen might look better without header
        />
        <Stack.Screen 
          name="Gallery" 
          component={GalleryScreen}
          options={{ title: 'Astronomy Gallery' }}
        />
        <Stack.Screen 
          name="PictureDetail" 
          component={PictureDetailScreen}
          options={{ title: 'Details', headerBackTitle: 'Back' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}