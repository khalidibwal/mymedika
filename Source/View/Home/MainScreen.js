import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ActivityIndicator, Text, TouchableOpacity, Image, Alert } from 'react-native';
import Header from './Header';
import Footer from './Footer';
import { userState } from '../../Global/Auth/UserGlobal';
import { useRecoilState } from 'recoil';
import axios from 'axios';
import { API_URL } from '@env';
import CarouselComponent from '../../Component/Carousel/CarouselComponent';
import SearchComponent from '../../Component/Main/SearchComponent';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MenuRow from '../../Component/Main/MenuRow';
import rekam_M from '../../../Assets/image/rekammedis.png'; // Example icon
import data_P from '../../../Assets/image/datapasien.png';
import data_D from '../../../Assets/image/datadokter.png';
import rekam_O from '../../../Assets/image/rekamobat.png';
import poli from '../../../Assets/image/poli.png';
import laporan from '../../../Assets/image/laporan.png';
import { useNavigation } from '@react-navigation/native';

const MainScreen = () => {
  const navigation = useNavigation()
  const [auth, setAuth] = useRecoilState(userState);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleBackPress = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      // Custom behavior on the home screen
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
  

  // const getUserdata = async () => {
  //   try {
  //     const token = await AsyncStorage.getItem('access_token');
  //     const response = await axios.get(`${API_URL}/api/me`, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });
  //     console.log('user', response.data);
  //     setUserData(response.data);
  //     setAuth(response.data);
  //   } catch (err) {
  //     console.error('Error fetching user data', err);
  //     setError(err.message);
  //   } finally {
  //     setLoading(false);
  //   }
  // };



  useEffect(() => {
      const fetchUser = async () => {
          try {
              // Retrieve the token from AsyncStorage
              const token = await AsyncStorage.getItem('access_token');
              
              if (!token) {
                  // If token doesn't exist, navigate to login
                  navigation.navigate('login'); // Adjust the screen name as necessary
                  return;
              }

              // Fetch the user data
              const response = await fetch(`${API_URL}/api/me`, {
                  method: 'GET',
                  headers: {
                      'Authorization': `Bearer ${token}`,
                      'Content-Type': 'application/json',
                  },
              });

              if (!response.ok) {
                  // If response is not ok, navigate to login
                  navigation.navigate('login'); // Adjust the screen name as necessary
                  return;
              }

              const userData = await response.json();
              // Do something with the user data, like updating state
              console.log(userData);
              setLoading(false)
          } catch (error) {
            setLoading(false)
              console.error('Failed to fetch user:', error);
              // Navigate to login on error
              navigation.navigate('login'); // Adjust the screen name as necessary
          }
      };

      fetchUser();
  }, [navigation]);

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.content}>
        <SearchComponent />
        <CarouselComponent />
        <View style={styles.menuRow}>
        <MenuRow name='Rekam Medis' icon={rekam_M}/>
        <MenuRow name='Data Pasien' icon={data_P}/>
        <MenuRow name='Data Dokter' icon={data_D}/>
        </View>
        <View style={styles.menuRow}>
        <MenuRow name='Rekam Obat' icon={rekam_O}/>
        <MenuRow name='Data Poliklinik' icon={poli}/>
        <MenuRow name='Laporan' icon={laporan}/>
        </View>
      </View>
      <Footer onBackPress={handleBackPress}/>
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
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuRow: {
    flexDirection: 'row',
    justifyContent: 'space-around', // Space items evenly
    marginVertical: 25, // Add vertical margin,a
    top:20
  },
});

export default MainScreen;
