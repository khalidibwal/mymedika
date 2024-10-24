// In App.js in a new project

import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FirstLoadScreen from '../View/Auth/FirstLoadScreen';
import LoginScreen from '../View/Auth/Login';
import RegisterScreen from '../View/Auth/Register';
import MainScreen from '../View/Home/MainScreen';
import Booking from '../View/Book/Booking';
import BookingCardScreen from '../View/Book/BookingCardScreen';
import Main from '../View/Maintenance/Main';
import MainProfile from '../View/Profile/MainProfile';
import Poliklinik from '../View/Poli/Poliklinik';
import AntrianList from '../View/Book/ListAntrian';



const Stack = createNativeStackNavigator();

function MainStackNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="load" component={FirstLoadScreen} options={{headerShown: false}} />
        <Stack.Screen name="login" component={LoginScreen} options={{headerShown: false}}/>
        <Stack.Screen name="register" component={RegisterScreen} options={{headerShown: false}}/>
        <Stack.Screen name="Home" component={MainScreen} options={{headerShown: false}}/>
        <Stack.Screen name="book" component={Booking} options={{headerShown: false}}/>
        <Stack.Screen name="BookingCardScreen" component={BookingCardScreen} options={{headerShown: false}}/>
        <Stack.Screen name="maintenance" component={Main} options={{headerShown: false}}/>
        <Stack.Screen name="profile" component={MainProfile} options={{headerShown: false}}/>
        <Stack.Screen name="poli" component={Poliklinik} options={{headerShown: false}}/>
        <Stack.Screen name="antrian" component={AntrianList} options={{headerShown: false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default MainStackNavigator;