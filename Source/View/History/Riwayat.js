import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '@env';
import RekamCard from '../../Component/Card/RekamMedis';
import Header from '../Home/Header';
import Footer from '../Home/Footer';
import { useNavigation } from '@react-navigation/native';

const Riwayat = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation()

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await AsyncStorage.getItem('access_token');
        const response = await axios.get(`${API_URL}/api/book-rm`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setData(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const renderItem = ({ item }) => (
    <RekamCard
      idRekamMedis={item.idRekamMedis}
      dokter={item.dokter}
      poliklinik={item.poliklinik}
      keluhan={item.keluhan}
      diagnosa={item.diagnosa}
      terapi={item.terapi}
      tglPeriksa={item.tglPeriksa}
    />
  );

  if (loading) {
    return <ActivityIndicator size="large" color="#002A49" />; // Loading state
  }

  return (
    <>
    <Header/>
    <Text style={styles.title}>Daftar Riwayat Medis :</Text>
    <FlatList
      data={data}
      keyExtractor={(item) => item.idRekamMedis}
      renderItem={renderItem}
      contentContainerStyle={styles.container}
    />
    <Footer onBackPress={handleBackPress}/>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  title:{
    padding:10,
    color:'black',
    fontSize:17,
    fontWeight:'bold'
  }
});

export default Riwayat;
