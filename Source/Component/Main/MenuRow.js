// MenuRow.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';


const MenuRow = ({ name, icon, nav }) => {
  return (
    <>
          <TouchableOpacity style={styles.menuItem} onPress={nav}>
            <Image source={icon} style={styles.menuIcon} />
            <Text style={styles.menuText}>{name}</Text>
          </TouchableOpacity>
        </>
  );
};

const styles = StyleSheet.create({
  menuRow: {
    flexDirection: 'row',
    justifyContent: 'space-around', // Space items evenly
    marginVertical: 20, // Add vertical margin
  },
  menuItem: {
    alignItems: 'center',
  },
  menuIcon: {
    width: 70, // Adjust size as needed
    height: 70,
    marginBottom: 5, // Space between icon and text
  },
  menuText: {
    fontSize: 16,
    textAlign: 'center',
    color:'black'
  },
});

export default MenuRow;
