import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import SearchComponent from '../../Component/Main/SearchComponent';

const Header = () => {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.searchContainer}>
        <SearchComponent/>
      </View> 
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#2cb1c4',
    elevation: 1, // Optional: for shadow effect
    borderBottomLeftRadius:10,
    borderBottomRightRadius:10
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
  searchContainer:{
    flexDirection:'row'
  }
});

export default Header;
