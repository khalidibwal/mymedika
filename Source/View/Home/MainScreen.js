import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Header from './Header';
import Footer from './Footer';
import CarouselComponent from '../../Component/Carousel/CarouselComponent';

const MainScreen = () => {
  return (
    <View style={styles.container}>
      <Header />
      {/* Your main content goes here */}
      {/* <CarouselComponent/> */}
      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white', // Change to your desired background color
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // Additional styling for your main content
  },
});

export default MainScreen;
