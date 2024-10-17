// SearchComponent.js
import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

const SearchComponent = () => {
  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Search Content"
        style={styles.input}
        // You can add onChangeText and other props as needed
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    overflow: 'hidden', // Ensures the border radius is applied to the container
    margin: 20, // Optional: add margin for spacing
    backgroundColor: 'white', // Set background color to white
    shadowColor: '#000', // Shadow color
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 1, // Shadow opacity
    shadowRadius: 4, // Shadow blur radius
    elevation: 5, // For Android shadow
  },
  input: {
    height: 50, // Adjust height as necessary
    paddingHorizontal: 15,
    fontSize: 16,
    color: '#333', // Text color
  },
});

export default SearchComponent;
