import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  Platform,
  Alert,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import DateTimePicker from '@react-native-community/datetimepicker';
import {useNavigation} from '@react-navigation/native';
import {useRecoilValue, useSetRecoilState} from 'recoil';
import {
  doctorDataState,
  bookTimeSelected,
  allergyState,
  complaintState,
} from '../../Global/doctor/atom';
import {API_URL} from '@env';

const TimePickerScreen = () => {
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date('2025-06-28'));
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();
  const doctorData = useRecoilValue(doctorDataState);
  const alergyc = useRecoilValue(allergyState);
  const complain = useRecoilValue(complaintState);
  const bookingTime = useSetRecoilState(bookTimeSelected);

  const timeSlots = {
    Pagi: ['08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00'],
    Siang: ['12:00', '12:30', '13:00', '13:30', '14:00'],
    Sore: ['15:00', '15:30', '16:00', '16:30', '17:00', '17:30', '18:00'],
  };

  const onChangeDate = (event, selected) => {
    if (selected) {
      setShowDatePicker(false);
      setSelectedDate(selected);
    }
  };

  const formatDate = date => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const handleBooking = async () => {
    if (!selectedTime || !selectedDate) {
      Alert.alert(
        'Terjadi Kesalahan',
        'Mohon di Pilih Waktu dan Tanggal Semua Kolom',
      );
      return;
    }

    const token = await AsyncStorage.getItem('access_token');
    try {
      setLoading(true);
      const response = await axios.post(
        `${API_URL}/api/bookantrian`,
        {
          keluhan: complain,
          alergi: alergyc,
          waktu_kunjungan: selectedTime,
          tanggal_kunjungan: formatDate(selectedDate),
          poliklinikId: 1,
          dokterNip: doctorData.nip,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        },
      );
      setLoading(false);
      console.log(response.data.data, 'handle book berhasil');
      bookingTime(response.data.data)
      navigation.navigate('success')
      // const bookingData = response.data.data;
      // navigation.navigate('BookingCardScreen', { bookingData: bookingData });
    } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
        console.error('Validation Errors:', error.response.data.errors);

        const messages = Object.values(error.response.data.errors)
          .map(msgArr => msgArr.join('\n'))
          .join('\n');

        Alert.alert('Validasi Gagal', messages);
      } else {
        console.error('Unexpected Error:', error.message);
        Alert.alert('Error', 'Terjadi kesalahan saat booking.');
      }
    }
  };

  return (
    <>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Back Button */}
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <Image
            source={require('../../../Assets/image/previous.png')}
            style={{width: 30, height: 30}}
          />
        </TouchableOpacity>

        {/* Title */}
        <Text style={styles.title}>Dokter {doctorData.spesialis}</Text>

        {/* Doctor Image */}
        <Image
          source={{uri: `${API_URL}/images/${doctorData.fotoDokter}`}}
          style={styles.image}
        />

        {/* Time Slots */}
        {Object.entries(timeSlots).map(([label, times]) => (
          <View key={label} style={styles.slotGroup}>
            <Text style={styles.slotLabel}>{label}</Text>
            <View style={styles.slotRow}>
              {times.map((time, idx) => (
                <TouchableOpacity
                  key={idx}
                  style={[
                    styles.timeBox,
                    selectedTime === time && styles.selectedTimeBox,
                  ]}
                  onPress={() => setSelectedTime(time)}>
                  <Text
                    style={[
                      styles.timeText,
                      selectedTime === time && styles.selectedTimeText,
                    ]}>
                    {time}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}

        {/* Date Picker */}
        <View style={styles.dateContainer}>
          <Text style={styles.slotLabel}>Tanggal</Text>
          <TouchableOpacity
            style={styles.dateInput}
            onPress={() => setShowDatePicker(true)}>
            <Text>{selectedDate.toLocaleDateString('id-ID')}</Text>
            <Text style={{fontSize: 20}}>📅</Text>
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              value={selectedDate}
              mode="date"
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              onChange={onChangeDate}
              minimumDate={new Date()}
            />
          )}
        </View>

        {/* Confirm Button */}
        <TouchableOpacity style={styles.confirmButton} onPress={handleBooking}>
          <Text style={styles.confirmText}>Confirm</Text>
        </TouchableOpacity>
      </ScrollView>
      {loading && (
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <ActivityIndicator size="large" color="#00B4D8" />
            <Text style={styles.modalText}>Mohon tunggu...</Text>
          </View>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fef9f7',
    alignItems: 'center',
    padding: 20,
    flexGrow: 1,
  },
  backButton: {
    alignSelf: 'flex-start',
  },
  backText: {
    fontSize: 24,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 20,
    resizeMode: 'cover',
  },
  slotGroup: {
    width: '100%',
    marginBottom: 10,
  },
  slotLabel: {
    fontSize: 16,
    marginBottom: 4,
  },
  slotRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  timeBox: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
    marginRight: 10,
    marginBottom: 10,
    minWidth: 60,
    alignItems: 'center',
  },
  selectedTimeBox: {
    backgroundColor: '#00B4D8',
  },
  timeText: {
    color: '#000',
  },
  selectedTimeText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  dateContainer: {
    width: '100%',
    marginTop: 20,
    marginBottom: 30,
  },
  dateInput: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  confirmButton: {
    backgroundColor: '#00B4D8',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
  },
  confirmText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalOverlay: {
  position: 'absolute',
  top: 0, left: 0, right: 0, bottom: 0,
  backgroundColor: 'rgba(0,0,0,0.5)',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 999,
},
modalContent: {
  backgroundColor: '#fff',
  padding: 20,
  borderRadius: 10,
},
modalText: {
  fontSize: 16,
  fontWeight: 'bold',
},

});

export default TimePickerScreen;
