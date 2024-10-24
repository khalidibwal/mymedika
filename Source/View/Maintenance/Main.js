import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, Image, Alert, BackHandler } from 'react-native';
import Header from '../Home/Header';
import Footer from '../Home/Footer';
import { useNavigation } from '@react-navigation/native';

const Main = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleBackPress = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      Alert.alert(
        'Exit MyMedika',
        'Do you really want to exit the app?',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Yes', onPress: () => BackHandler.exitApp() }, // Import BackHandler from 'react-native'
        ],
        { cancelable: false }
      );
    }
  };

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.content}>
        <Text style={styles.topText}>We apologize for the inconvenience</Text>
        <Image source={require('../../../Assets/image/maintenance.png')} style={styles.image} />
        <Text style={styles.maintenanceText}>Under Maintenance</Text>
        <Text style={styles.bottomText}>Please check back later.</Text>
      </View>
      <Footer onBackPress={handleBackPress} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -50, // Moves the content higher on the screen
  },
  image: {
    width: 350, // Adjust width to match your image size
    height: 350, // Adjust height to match your image size
    marginBottom: 10, // Space between image and "Under Maintenance" text
  },
  topText: {
    fontSize: 18,
    color: '#333', // Set the color to your preference
    textAlign: 'center',
    marginBottom: 20, // Space between the top text and image
  },
  maintenanceText: {
    fontSize: 25, // Adjust the font size as needed
    color: '#333', // Set the color to your preference
    textAlign: 'center',
    textTransform: 'uppercase',
    marginTop: 10, // Space between image and "Under Maintenance" text
  },
  bottomText: {
    fontSize: 18,
    color: '#333',
    textAlign: 'center',
    marginTop: 10, // Space between "Under Maintenance" and bottom text
  },
});

export default Main;
