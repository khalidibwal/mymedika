import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  Platform
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { doctorDataState,bookTimeSelected } from '../../Global/doctor/atom';
import {API_URL} from '@env';

const TimePickerScreen = () => {
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date('2025-06-28'));
  const [showDatePicker, setShowDatePicker] = useState(false);
  const navigation = useNavigation()
  const doctorData = useRecoilValue(doctorDataState)
  const bookingTime = useSetRecoilState(bookTimeSelected)

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

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={()=>navigation.goBack()}>
        <Image source={require('../../../Assets/image/previous.png')} style={{width:30, height:30}}/>
      </TouchableOpacity>

      {/* Title */}
      <Text style={styles.title}>Dokter {doctorData.spesialis}</Text>

      {/* Doctor Image */}
      <Image
        source={{ uri: `${API_URL}/images/${doctorData.fotoDokter}` }}
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
                onPress={() => setSelectedTime(time)}
              >
                <Text
                  style={[
                    styles.timeText,
                    selectedTime === time && styles.selectedTimeText,
                  ]}
                >
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
          onPress={() => setShowDatePicker(true)}
        >
          <Text>{selectedDate.toLocaleDateString('id-ID')}</Text>
          <Text style={{ fontSize: 20 }}>📅</Text>
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
      <TouchableOpacity style={styles.confirmButton}>
        <Text style={styles.confirmText}>Confirm</Text>
      </TouchableOpacity>
    </ScrollView>
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
});

export default TimePickerScreen;
