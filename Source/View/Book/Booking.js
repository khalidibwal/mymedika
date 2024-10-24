import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ActivityIndicator, TextInput, TouchableOpacity, Alert, Text } from 'react-native';
import Header from '../Home/Header';
import Footer from '../Home/Footer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { API_URL } from '@env';
import { useNavigation } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import BookingCard from '../../Component/Booking/BookingCard';

const Booking = () => {
  const navigation = useNavigation();
  const [poliklinikList, setPoliklinikList] = useState([]);
  const [selectedPoliklinik, setSelectedPoliklinik] = useState(null);
  const [keluhan, setKeluhan] = useState('');
  const [tanggalKunjungan, setTanggalKunjungan] = useState(new Date());
  const [loading, setLoading] = useState(true);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [bookingData, setBookingData] = useState(null);

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
      Alert.alert('Terjadi Kesalahan', 'Mohon di Isi Semua Kolom');
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
      setBookingData(response.data.data);
      const bookingData = response.data.data;
      navigation.navigate('BookingCardScreen', { bookingData: bookingData });
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
        <Text style={styles.title}>Booking Dokter</Text>
        <TextInput
          style={styles.textArea}
          placeholder="Keluhan (max 150 Kata)"
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
        <Text style={styles.title}>Pilih Poliklinik :</Text>
        <Text style={styles.titlePicker}>Pilih Sesuai dengan kebutuhan</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={selectedPoliklinik}
            style={styles.picker}
            onValueChange={(itemValue) => setSelectedPoliklinik(itemValue)}
          >
            <Picker.Item label="Pilih Poliklinik" value={null} />
            {poliklinikList.map((poliklinik) => (
              <Picker.Item key={poliklinik.idPoliklinik} label={poliklinik.namaPoliklinik} value={poliklinik.idPoliklinik} />
            ))}
          </Picker>
        </View>
        <TouchableOpacity style={styles.customButton} onPress={handleBooking}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
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
    borderRadius: 5,
    marginBottom: 20,
    padding: 10,
    textAlignVertical: 'top',
  },
  dateInput: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    paddingLeft: 10,
    backgroundColor: '#f0f0f0',
  },
  pickerContainer: {
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    overflow: 'hidden', // Ensures the border radius applies
  },
  picker: {
    height: 50,
    width: '100%',
    padding: 0,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 15,
    padding: 5,
    color: 'black',
  },
  titlePicker: {
    fontSize: 15,
    padding: 5,
  },
  customButton: {
    backgroundColor: '#90C0E1', // Background color
    paddingVertical: 10, // Vertical padding for a smaller button
    paddingHorizontal: 20, // Horizontal padding
    borderRadius: 5, // Rounded corners
    alignItems: 'center', // Center text horizontally
    justifyContent: 'center',
    marginBottom: 20, // Space below the button
    alignSelf: 'center', // Center the button horizontally
  },
  buttonText: {
    color: 'white', // Text color
    fontSize: 16, // Text size
    fontWeight: 'bold', // Bold text
  },
});

export default Booking;
