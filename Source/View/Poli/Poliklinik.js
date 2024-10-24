import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, Image, Alert, BackHandler, FlatList } from 'react-native';
import Header from '../Home/Header';
import Footer from '../Home/Footer';
import axios from 'axios';
import { API_URL } from '@env';
import { useNavigation } from '@react-navigation/native';

const Poliklinik = () => {
  const navigation = useNavigation();
  const [poliklinikList, setPoliklinikList] = useState([]);

  useEffect(() => {
    const fetchPoliklinik = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/poliklinik`);
        setPoliklinikList(response.data);
      } catch (error) {
        console.error('Error fetching poliklinik data', error);
      }
    };

    fetchPoliklinik();
  }, []);

  const handleBackPress = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      Alert.alert(
        'Exit MyMedika',
        'Do you really want to exit the app?',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Yes', onPress: () => BackHandler.exitApp() },
        ],
        { cancelable: false }
      );
    }
  };

  const renderCard = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.cardContent}>
        <Image 
          source={require('../../../Assets/image/Avatar.png')} // Placeholder for profile image
          style={styles.profileImage} 
        />
        <View style={styles.rowstyle}>
          <Text style={styles.poliklinikName}>{item.namaPoliklinik}</Text>
          <Text style={styles.available}>Available</Text>
        </View>
        <View style={styles.rowstyle2}>
          <Text style={styles.available}>mon-fri</Text>
          <Text style={styles.available}>16:00 - 22:00</Text>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.content}>
        <FlatList
          data={poliklinikList}
          renderItem={renderCard}
          keyExtractor={(item) => item.idPoliklinik.toString()}
          contentContainerStyle={styles.listContainer}
        />
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
    padding: 20,
  },
  listContainer: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // This will push the items to the ends
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 10,
    marginRight: 15,
    backgroundColor: 'black',
  },
  poliklinikName: {
    flex: 1,
    fontWeight: '500',
    fontSize: 16,
    color: 'black',
  },
  available: {
    fontSize: 14,
    color: 'gray',
    marginTop: 5, // Adjust the spacing between name and available text
  },
  rowstyle: {
    flexDirection: 'column',
    justifyContent: 'center', // Center align the text vertically
    flex: 1, // Allow this to take available space
  },
  rowstyle2: {
    flexDirection: 'column',
    justifyContent: 'center', // Center align the text vertically
    alignItems: 'flex-end', // Align text to the right
  },
});

export default Poliklinik;
