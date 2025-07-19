import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

const SearchComponent = () => {
  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <TextInput
          placeholder="Search Here"
          placeholderTextColor="black"
          style={styles.input}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',  // Vertical center
    alignItems: 'center',      // Horizontal center
  },
  container: {
    width: '60%',
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 5,
  },
  input: {
    padding: 10,
    fontSize: 16,
    // color: '#fff',
    width: '100%',
    height:40
  },
});

export default SearchComponent;
