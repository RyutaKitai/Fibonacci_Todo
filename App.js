import React from 'react';
// import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// import AppBar from './src/components/AppBar';
import MemoListScreen from './src/screens/MemoListScreen';
import MemoSignUp from './src/screens/MemoSignUp';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="MemoSignin"
        screenOptions={{
          headerStyle: { backgroundColor: '#61C8FF' },
          headerTitleStyle: { color: 'white' },
          headerTitle: 'Fibonacci Todo',
        }}
      >
        <Stack.Screen name="Memolist" component={MemoListScreen} />
        <Stack.Screen name="MemoSignin" component={MemoSignUp} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
