import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import GradientText from '../../Component/TextStyle/GradientText';

const Header = () => {
  return (
    <View style={styles.headerContainer}>
      <Image source={require('../../../Assets/image/mymedikalogo.png')} style={styles.logo} />

      <Text style={styles.headerText}>MyMedika</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'white',
    elevation: 1, // Optional: for shadow effect
  },
  logo: {
    width: 70,
    height: 70,
    marginRight: 10, // Space between logo and text
  },
  headerText: {
    fontSize: 22,
    fontWeight: '500',
    color:'#002A49'
  },
});

export default Header;
