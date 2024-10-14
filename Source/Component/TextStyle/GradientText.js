import React from 'react';
import { View, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Text } from 'react-native';

const GradientText = ({ text }) => {
  return (
    <LinearGradient
      colors={['#A7F2E3', '#002A49']} // Define your gradient colors
      start={{ x: 0, y: 0 }} // Start from the left
      end={{ x: 1, y: 0 }} // End at the right
      style={styles.gradientTextContainer}
    >
      <Text style={styles.text}>{text}</Text>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradientTextContainer: {
    padding: 10,
    borderRadius: 5, // Optional: Add rounded corners if needed
  },
  text: {
    fontSize: 24, // Adjust font size as needed
    fontWeight: 'bold',
    textAlign: 'center',
    // Ensure the text is transparent to show the gradient
    backgroundColor: 'transparent',
    // You can add other styles here
  },
});

export default GradientText;
