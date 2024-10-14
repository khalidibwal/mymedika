// In App.js in a new project

import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FirstLoadScreen from '../View/Auth/FirstLoadScreen';
import LoginScreen from '../View/Auth/Login';
import RegisterScreen from '../View/Auth/Register';
import MainScreen from '../View/Home/MainScreen';



const Stack = createNativeStackNavigator();

function MainStackNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="load" component={FirstLoadScreen} options={{headerShown: false}} />
        <Stack.Screen name="login" component={LoginScreen} options={{headerShown: false}}/>
        <Stack.Screen name="register" component={RegisterScreen} options={{headerShown: false}}/>
        <Stack.Screen name="Home" component={MainScreen} options={{headerShown: false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default MainStackNavigator;