import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, Image, Alert, BackHandler, TouchableOpacity } from 'react-native';
import Header from '../Home/Header';
import Footer from '../Home/Footer';
import { useRecoilState } from 'recoil';
import { userState } from '../../Global/Auth/UserGlobal';
import { useNavigation } from '@react-navigation/native';
import { API_URL } from '@env';
import axios from 'axios'; // Make sure axios is imported
import AsyncStorage from '@react-native-async-storage/async-storage';

const MainProfile = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [User, setUser] = useRecoilState(userState);
  const noData = '-'

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

  // Function to handle logout
  const handleLogout = async () => {
    try {
      const token = await AsyncStorage.getItem('access_token');
      const response = await axios.post(
        `${API_URL}/api/logout`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      await AsyncStorage.removeItem('access_token');
      // Clear the user state after successful logout
      // setUser(null);
      Alert.alert('Success', 'You have been logged out.');
      navigation.navigate('login'); // Navigate to login page after logout
    } catch (error) {
      console.error('Logout error', error);
      Alert.alert('Error', 'Failed to log out. Please try again.');
    }
  };

  const handleEditProfile = () => {
    navigation.navigate('EditProfile'); // Navigate to Edit Profile screen
  };

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.content}>
        {/* Main content */}
      </View>

      {/* Card with profile image, name, and bottom content */}
      <View style={styles.card}>
        <View style={styles.profileContainer}>
          <Image source={require('../../../Assets/image/b1.png')} style={styles.profileImage} />
          <Text style={styles.profileName}>{User.name ? User.name : noData}</Text>
        </View>

        <View style={styles.cardContent}>
          <Text style={styles.profileName}>Nomor Telp:</Text>
          <Text style={styles.profileName}>{User.noTelp? User.noTelp : noData}</Text>
        </View>
        <View style={styles.cardContent}>
          <Text style={styles.profileName}>NIK:</Text>
          <Text style={styles.profileName}>{User.nik? User.nik : noData}</Text>
        </View>
        <View style={styles.cardContent}>
          <Text style={styles.profileName}>Email:</Text>
          <Text style={styles.profileName}>{User.email? User.email : noData}</Text>
        </View>

        {/* Log Out and Edit Profile Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Edit Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.logoutButton]} onPress={handleLogout}>
            <Text style={styles.buttonText}>Log Out</Text>
          </TouchableOpacity>
        </View>
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
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -50,
  },
  // Card styles
  card: {
    position: 'absolute',
    bottom: 60,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingVertical: 20,
    paddingHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    height: '80%',
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    padding: 20,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  profileName: {
    fontSize: 18,
    color: '#333',
    fontWeight: 'bold',
  },
  cardContent: {
    flexDirection: 'column',
    padding: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 5,
  },
  logoutButton: {
    backgroundColor: 'grey',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default MainProfile;
