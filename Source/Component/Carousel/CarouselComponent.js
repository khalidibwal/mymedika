import React, { useRef } from 'react';
import { View, Image, FlatList, StyleSheet, Dimensions, TouchableOpacity, Text } from 'react-native';

// Import your local images
import image1 from '../../../Assets/image/b2.png'; // Adjust the path according to your folder structure


const images = [
  { id: '1', uri: image1 },
  { id: '2', uri: image1 },
  { id: '3', uri: image1 },
];

const { width } = Dimensions.get('window');

const CarouselComponent = () => {
  const flatListRef = useRef(null);

  const renderItem = ({ item }) => {
    return (
      <View style={styles.slide}>
        <Image source={item.uri} style={styles.image} />
      </View>
    );
  };

  const scrollToNext = () => {
    flatListRef.current.scrollToIndex({ index: 1, animated: true });
  };

  const scrollToPrev = () => {
    flatListRef.current.scrollToIndex({ index: 0, animated: true });
  };

  return (
    <View>
      <FlatList
        data={images}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        ref={flatListRef}
        snapToAlignment="center"
        style={styles.carousel}
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={scrollToPrev}>
          {/* Add a text or image for previous button */}
          <Image source={{ uri: 'https://example.com/prev_icon.png' }} style={styles.buttonImage} />
          <Text style={styles.buttonText}>Prev</Text> {/* Optional Text */}
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={scrollToNext}>
          {/* Add a text or image for next button */}
          <Image source={{ uri: 'https://example.com/next_icon.png' }} style={styles.buttonImage} />
          <Text style={styles.buttonText}>Next</Text> {/* Optional Text */}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  carousel: {
    height: 200, // Adjust as needed
  },
  slide: {
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  button: {
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    elevation: 3,
    flexDirection: 'row', // To align text and image in a row
    alignItems: 'center',
  },
  buttonImage: {
    width: 20,
    height: 20,
    marginRight: 5, // Space between image and text
  },
  buttonText: {
    fontSize: 16,
    color: '#007BFF', // Text color
  },
});

export default CarouselComponent;
