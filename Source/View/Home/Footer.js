import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient'; // Import LinearGradient

const Footer = () => {
  return (
    <LinearGradient 
      colors={['#90EE90', '#004B73']} // Left color to right color
      start={{ x: 0, y: 0 }} // Start from the left
      end={{ x: 0.5, y: 0 }} // End at the right
      style={styles.footerContainer}
    >
      <TouchableOpacity style={styles.menuItem}>
        <Text style={styles.menuText}>Menu 1</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.menuItem}>
        <Text style={styles.menuText}>Menu 2</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.menuItem}>
        <Text style={styles.menuText}>Menu 3</Text>
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
    borderRadius: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    marginHorizontal: 5,
  },
  menuText: {
    fontSize: 16,
    color: '#007BFF', // Color for the menu text
  },
});

export default Footer;
