import React from 'react';
import { View, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient'; // Import LinearGradient
import menuIcon1 from '../../../Assets/image/back.png'; // Replace with your icon paths
import menuIcon2 from '../../../Assets/image/Calendar.png'; // Replace with your icon paths
import menuIcon3 from '../../../Assets/image/User.png'; // Replace with your icon paths

const Footer = ({onBackPress}) => {
  const navigation = useNavigation()
  const toBooking = () => {
    navigation.navigate('book')
  }
  const toProfilePage = () =>{
    navigation.navigate('profile')
  }
  return (
    <LinearGradient 
      colors={['#90EE90', '#004B73']} // Left color to right color
      start={{ x: 0, y: 0 }} // Start from the left
      end={{ x: 0.5, y: 0 }} // End at the right
      style={styles.footerContainer}
    >
      <TouchableOpacity style={styles.menuItem} onPress={onBackPress}>
        <Image source={menuIcon1} style={styles.menuIcon} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.menuItem} onPress={toBooking}>
        <Image source={menuIcon2} style={styles.menuIcon} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.menuItem} onPress={toProfilePage}>
        <Image source={menuIcon3} style={styles.menuIcon} />
      </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 3, // Optional: for shadow effect
    position: 'absolute', // Fix position
    bottom: 0, // Position it at the bottom
    left: 0, // Align to the left
    right: 0, // Align to the right
  },
  menuItem: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
  },
  menuIcon: {
    width: 30, // Adjust size as needed
    height: 30,
  },
});

export default Footer;
