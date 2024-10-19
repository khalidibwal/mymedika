// BookingCard.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const BookingCard = ({ noAntrian, tanggalKunjungan, keluhan }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>Booking Details</Text>
      <Text style={styles.detail}>No Antrian Anda:</Text>
      <Text style={styles.highlight}>{noAntrian}</Text>
      <Text style={styles.detail}>Tanggal Kunjungan: {tanggalKunjungan}</Text>
      {/* <Text style={styles.detail}>Keluhan: <Text style={styles.highlight}>{keluhan}</Text></Text> */}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 40,
    borderRadius: 10,
    backgroundColor: '#2792E4',
    elevation: 3, // For Android shadow
    shadowColor: '#000', // For iOS shadow
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    margin: 20,
    justifyContent:'center',
    alignItems:'center',
    height:400
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  detail: {
    fontSize: 16,
    marginVertical: 5,
  },
  highlight: {
    fontSize:60,
    fontWeight: 'bold',
    color: '#004B73',
  },
});

export default BookingCard;
