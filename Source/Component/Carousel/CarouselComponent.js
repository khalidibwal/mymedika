// CarouselComponent.js
import React from 'react';
import { View, Image, StyleSheet, ScrollView, Dimensions } from 'react-native';
import image1 from '../../../Assets/image/slide1.png'; // Adjust path as necessary
import image2 from '../../../Assets/image/b1.png';
import image3 from '../../../Assets/image/slide1.png';

const { width: viewportWidth } = Dimensions.get('window');

const CarouselComponent = () => {
  const data = [
    { image: image1 },
    { image: image2 },
    { image: image3 },
  ];

  return (
    <View style={styles.carousel}>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
      >
        {data.map((item, index) => (
          <View key={index} style={styles.slide}>
            <Image source={item.image} style={styles.image} />
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  carousel: {
    height: '20%', // Set height for the carousel
    marginTop: 10, // Remove margin to position at the top
  },
  slide: {
    width: viewportWidth * 0.8, // Set the width to 80% of the viewport
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10, // Add space between slides
  },
  image: {
    width: '100%',
    height: '100%', // Fill the slide area
    borderRadius: 5,
    resizeMode: 'cover', // Ensure images are scaled properly
  },
});

export default CarouselComponent;
