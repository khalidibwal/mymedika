import React from 'react';
import { SafeAreaView, Text, StyleSheet } from 'react-native';
import MainStackNavigator from './Source/Routes/MainStackNavigator';
import { RecoilRoot } from 'recoil';

const App = () => {
  return (
    <RecoilRoot>
    <MainStackNavigator/>
    </RecoilRoot>
  );
};

export default App;
