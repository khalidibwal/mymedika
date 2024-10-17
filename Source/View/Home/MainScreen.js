import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ActivityIndicator, Text, TouchableOpacity, Image } from 'react-native';
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

const MainScreen = () => {
  const [auth, setAuth] = useRecoilState(userState);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getUserdata = async () => {
    try {
      const token = await AsyncStorage.getItem('access_token');
      const response = await axios.get(`${API_URL}/api/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('user', response.data);
      setUserData(response.data);
      setAuth(response.data);
    } catch (err) {
      console.error('Error fetching user data', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserdata();
  }, []);

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
      <Footer />
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
