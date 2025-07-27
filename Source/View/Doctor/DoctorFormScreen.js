import React, { useState } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useRecoilState, useRecoilValue } from 'recoil';
import { allergyState,complaintState, doctorDataState } from '../../Global/doctor/atom';
import {API_URL} from '@env';

const DoctorFormScreen = () => {
  const navigation = useNavigation()
  const [complaint, setComplaint] = useRecoilState(complaintState);
  const [allergyHistory, setAllergyHistory] = useRecoilState(allergyState);
  const doctordata = useRecoilValue(doctorDataState)
  const minLength = 10;
const navigateToTimePicker = (item) => {
  if (!complaint || !allergyHistory) {
    Alert.alert('Warning', 'Mohon isi semua kolom yang kosong');
    return;
  }

  if (complaint.length < minLength) {
    Alert.alert('Warning', 'Kolom Keluhan harus lebih dari 10 karakter');
    return;
  }

  navigation.navigate('timeselect');
};

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={()=> navigation.goBack()}>
        <Image source={require('../../../Assets/image/previous.png')} style={{width:30, height:30}}/>
      </TouchableOpacity>

      {/* Title */}
      <Text style={styles.title}>Dokter {doctordata.spesialis}</Text>

      {/* Doctor Image */}
      <Image
        source={{ uri: `${API_URL}/images/${doctordata.fotoDokter}` }} // ganti dengan link gambar dokter asli
        style={styles.image}
      />

      {/* Complaint Field */}
      <Text style={styles.label}>Keluhan</Text>
      <TextInput
        style={styles.input}
        value={complaint}
        onChangeText={setComplaint}
        placeholder="Masukkan keluhan"
        multiline
      />
      {complaint.length > 0 && complaint.length < minLength && (
        <Text style={{ color: 'red' }}>Minimal {minLength} karakter</Text>
      )}
      {/* Allergy History Field */}
      <Text style={styles.label}>Riwayat alergi</Text>
      <TextInput
        style={styles.input}
        value={allergyHistory}
        onChangeText={setAllergyHistory}
        placeholder="Masukkan riwayat alergi"
        multiline
      />

      {/* Next Button */}
      <TouchableOpacity style={styles.button} onPress={navigateToTimePicker}>
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fef9f7',
    alignItems: 'center',
    padding: 20,
  },
  backButton: {
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
  backText: {
    fontSize: 24,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
    textTransform:'uppercase'
  },
  image: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  label: {
    alignSelf: 'flex-start',
    fontSize: 16,
    marginTop: 10,
    marginBottom: 4,
  },
  input: {
    width: '100%',
    minHeight: 100,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 10,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: '#00B4D8',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginTop: 30,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default DoctorFormScreen;
