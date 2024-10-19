// // BookingCardScreen.js
// import React from 'react';
// import { View, StyleSheet } from 'react-native';
// import BookingCard from '../../Component/Booking/BookingCard';

// const BookingCardScreen = ({ route }) => {
//   const { bookingData } = route.params;

//   return (
//     <View style={styles.container}>
//       <BookingCard 
//         noAntrian={bookingData.no_antrian}
//         tanggalKunjungan={bookingData.tanggal_kunjungan}
//         keluhan={bookingData.keluhan}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'white',
//   },
// });

// export default BookingCardScreen;

import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ActivityIndicator, Text, TouchableOpacity, Image, Alert } from 'react-native';
import Header from '../Home/Header';
import { userState } from '../../Global/Auth/UserGlobal';
import { useRecoilState } from 'recoil';
import axios from 'axios';
import { API_URL } from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import BookingCard from '../../Component/Booking/BookingCard';

const BookingCardScreen = ({route}) => {
      const { bookingData } = route.params;
  const navigation = useNavigation()
  const [auth, setAuth] = useRecoilState(userState);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.content}>
      <BookingCard 
        noAntrian={bookingData.no_antrian}
        tanggalKunjungan={bookingData.tanggal_kunjungan}
        keluhan={bookingData.keluhan}
      />
      </View>
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

export default BookingCardScreen;
