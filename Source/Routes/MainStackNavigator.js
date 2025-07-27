// In App.js in a new project

import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Welcome from '../View/GettingStarted/Welcome';
import FirstLoadScreen from '../View/Auth/FirstLoadScreen';
// import LoginScreen from '../View/Auth/Login';
import LoginMedika from '../View/Auth/LoginMedika';
// import RegisterScreen from '../View/Auth/Register';
import RegisterMedika from '../View/Auth/RegisterMedika';
import MainScreen from '../View/Home/MainScreen';
import Booking from '../View/Book/Booking';
import BookingCardScreen from '../View/Book/BookingCardScreen';
import Main from '../View/Maintenance/Main';
import MainProfile from '../View/Profile/MainProfile';
import Poliklinik from '../View/Poli/Poliklinik';
import AntrianList from '../View/Book/ListAntrian';
import Riwayat from '../View/History/Riwayat';
import DokterTabView from '../View/Doctor/DokterTabView';
import DoctorFormScreen from '../View/Doctor/DoctorFormScreen';
import TimePickerScreen from '../View/Doctor/TimePickerScreen';
import UserProfileScreen from '../View/Profile/UserProfileScreen';



const Stack = createNativeStackNavigator();

function MainStackNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="load" component={Welcome} options={{headerShown: false}} />
        <Stack.Screen name="login" component={LoginMedika} options={{headerShown: false}}/>
        <Stack.Screen name="register" component={RegisterMedika} options={{headerShown: false}}/>
        <Stack.Screen name="Home" component={MainScreen} options={{headerShown: false}}/>
        <Stack.Screen name="book" component={Booking} options={{headerShown: false}}/>
        <Stack.Screen name="BookingCardScreen" component={BookingCardScreen} options={{headerShown: false}}/>
        <Stack.Screen name="maintenance" component={Main} options={{headerShown: false}}/>
        <Stack.Screen name="profile" component={UserProfileScreen} options={{headerShown: false}}/>
        <Stack.Screen name="poli" component={Poliklinik} options={{headerShown: false}}/>
        <Stack.Screen name="antrian" component={AntrianList} options={{headerShown: false}}/>
        <Stack.Screen name="dokter" component={DokterTabView} options={{headerShown: false}}/>
        <Stack.Screen name="riwayat" component={Riwayat} options={{headerShown: false}}/>
        <Stack.Screen name="formdoctor" component={DoctorFormScreen} options={{headerShown: false}}/>
        <Stack.Screen name="timeselect" component={TimePickerScreen} options={{headerShown: false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default MainStackNavigator;