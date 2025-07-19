// MenuRow.js
import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';

const MenuRow = ({name, icon, nav}) => {
  return (
    <View style={styles.wrapContainer}>
      <TouchableOpacity style={styles.menuItem} onPress={nav}>
        <Image source={icon} style={styles.menuIcon} />
        <Text style={styles.menuText}>{name}</Text>
      </TouchableOpacity>
    </View>
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
    paddingVertical:10
  },
  menuIcon: {
    width: 40, // Adjust size as needed
    height: 40,
    marginBottom: 15, // Space between icon and text
  },
  menuText: {
    fontSize: 13,
    textAlign: 'center',
    color: 'black',
  },
  wrapContainer:{
    borderRadius:10,
    backgroundColor:'#fff',
    width:90,
    height:90
  }
});

export default MenuRow;
