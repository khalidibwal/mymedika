import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ActivityIndicator, TextInput, Button, Alert } from 'react-native';
import Header from '../Home/Header';
import Footer from '../Home/Footer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { API_URL } from '@env';
import { useNavigation } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import BookingCard from '../../Component/Booking/BookingCard'; // Import the BookingCard

const Booking = () => {
  const navigation = useNavigation();
  const [poliklinikList, setPoliklinikList] = useState([]);
  const [selectedPoliklinik, setSelectedPoliklinik] = useState(null);
  const [keluhan, setKeluhan] = useState('');
  const [tanggalKunjungan, setTanggalKunjungan] = useState(new Date());
  const [loading, setLoading] = useState(true);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [bookingData, setBookingData] = useState(null); // Store booking data

  const fetchPoliklinik = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/poliklinik`);
      setPoliklinikList(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching Poliklinik', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPoliklinik();
  }, []);

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const handleBooking = async () => {
    if (!keluhan || !selectedPoliklinik || !tanggalKunjungan) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }
    
    const token = await AsyncStorage.getItem('access_token');
    try {
      const response = await axios.post(
        `${API_URL}/api/bookantrian`,
        {
          keluhan,
          tanggal_kunjungan: formatDate(tanggalKunjungan),
          poliklinikId: selectedPoliklinik,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      setBookingData(response.data.data); // Store booking data
      const bookingData = response.data.data;
      navigation.navigate('BookingCardScreen',{bookingData: bookingData}); // Navigate to BookingCardScreen
    } catch (error) {
      console.error('Error creating booking', error);
      Alert.alert('Error', 'Failed to create booking');
    }
  };

  const handleBackPress = () => {
    navigation.goBack();
  };

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
        {/* Your existing form components */}
        <TextInput
          style={styles.textArea}
          placeholder="Keluhan (max 150 characters)"
          value={keluhan}
          onChangeText={setKeluhan}
          multiline
          numberOfLines={4}
          maxLength={150}
        />
        <TextInput
          style={styles.dateInput}
          placeholder="Tanggal Kunjungan"
          value={formatDate(tanggalKunjungan)}
          onFocus={() => setShowDatePicker(true)}
          editable={false}
        />
        {showDatePicker && (
          <DateTimePicker
            value={tanggalKunjungan}
            mode="date"
            display="default"
            onChange={(event, selectedDate) => {
              setShowDatePicker(false);
              setTanggalKunjungan(selectedDate || tanggalKunjungan);
            }}
          />
        )}
        <Picker
          selectedValue={selectedPoliklinik}
          style={styles.picker}
          onValueChange={(itemValue) => setSelectedPoliklinik(itemValue)}
        >
          <Picker.Item label="Select Poliklinik" value={null} />
          {poliklinikList.map((poliklinik) => (
            <Picker.Item key={poliklinik.idPoliklinik} label={poliklinik.namaPoliklinik} value={poliklinik.idPoliklinik} />
          ))}
        </Picker>
        <Button title="Book Appointment" onPress={handleBooking} />
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
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textArea: {
    height: 100,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 20,
    padding: 10,
    textAlignVertical: 'top', // For Android
  },
  dateInput: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 20,
    paddingLeft: 10,
    backgroundColor: '#f0f0f0', // Light background for clarity
  },
  picker: {
    height: 50,
    width: '100%',
    marginBottom: 20,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
  },
});

export default Booking;
