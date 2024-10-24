// BookingCard.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';

const BookingCard = ({ noAntrian, tanggalKunjungan, keluhan }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <LinearGradient 
      
        colors={['#90C0E1', '#2792E4']} // Define your gradient colors here
        start={{ x: 0, y: 0 }} // Start from the left
        end={{ x: 0.5, y: 0 }} // End at the right
        style={styles.card}
      >
        <Text style={styles.title}>Booking Details</Text>
        <Text style={styles.detail}>No Antrian Anda:</Text>
        <Text style={styles.highlight}>{noAntrian}</Text>
        <Text style={styles.detail}>Tanggal Kunjungan: {tanggalKunjungan}</Text>
      </LinearGradient>
      <Text style={styles.detail2}>
        Nomor urut akan dipanggil 3 kali, apabila tidak di lokasi maka akan kami lanjutkan ke nomor selanjutnya
      </Text>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Home')}>
        <Text style={styles.buttonText}>Back to Home</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  card: {
    padding: 40,
    borderRadius: 10,
    elevation: 3, // For Android shadow
    shadowColor: '#000', // For iOS shadow
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
    height: 400,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'white', // Change text color to contrast with the gradient
  },
  detail: {
    fontSize: 16,
    marginVertical: 5,
    color: 'white', // Change text color to contrast with the gradient
  },
  highlight: {
    fontSize: 60,
    fontWeight: 'bold',
    color: '#004B73', // Change this if you want it to stand out
  },
  detail2: {
    textAlign: 'center',
    fontSize: 20,
    marginVertical: 20,
  },
  button: {
    backgroundColor: '#90C0E1',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default BookingCard;
