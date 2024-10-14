import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const FirstLoadScreen = ({ navigation }) => {
  // Logic to navigate to another screen after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('login');
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      {/* Centered logo and text in the middle */}
      <View style={styles.centeredContent}>
        <Image source={require('../../../Assets/image/mymedikalogo.png')} style={styles.logo} />
        <Text style={styles.centeredText}>MyMedika</Text>
      </View>

      {/* Fixed logo and text at the bottom */}
      <View style={styles.bottomContent}>
        <Text style={styles.bottomText}>Powered by Puspita Medika</Text>
        <Image source={require('../../../Assets/image/puspitalogo.png')} style={styles.logoBottom} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between', // Ensures the content is spread across the screen
  },
  centeredContent: {
    flex: 1, // Takes up available space in the middle
    flexDirection: 'row', // Arranges logo and text in the same row
    alignItems: 'center', // Vertically center the row contents
    justifyContent: 'center', // Horizontally center the row contents
  },
  logo: {
    width: 100, // Adjust the size as needed
    height: 100,
    marginRight: 10, // Adds space between logo and text
  },
  logoBottom:{
    width: 50, // Adjust the size as needed
    height: 50,
    marginRight: 10,
  },
  centeredText: {
    fontSize: 20, // Adjust font size as needed
    fontWeight: 'bold',
    color:'#002A49'
  },
  bottomContent: {
    flexDirection: 'row', // Arranges logo and text in the same row
    alignItems: 'center', // Vertically center the row contents
    justifyContent: 'center', // Horizontally center the row contents
    marginBottom: 20, // Adjust this value to set how close to the bottom it appears
  },
  bottomText: {
    fontSize: 14, // Adjust font size as needed
    marginLeft: 10, // Adds space between logo and text
  },
});

export default FirstLoadScreen;