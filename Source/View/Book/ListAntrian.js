import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, FlatList, Alert, Modal, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { API_URL } from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from 'react-native-linear-gradient';
import Header from '../Home/Header';

const AntrianList = () => {
  const [antrianList, setAntrianList] = useState([]);
  const [currentAntrian, setCurrentAntrian] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const fetchAntrianData = async () => {
      try {
        const storedToken = await AsyncStorage.getItem('access_token');

        const response = await axios.get(`${API_URL}/api/bookantrian`, {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        });

        const allAntrian = response.data.data;

        const filteredAntrian = allAntrian.filter(item =>
          item.status === 'PENDING' || item.status === 'NOW' || item.status === 'CANCELLED'
        );

        const sortedAntrian = filteredAntrian.sort((a, b) =>
          new Date(b.tanggal_kunjungan) - new Date(a.tanggal_kunjungan)
        );

        setAntrianList(sortedAntrian);
      } catch (error) {
        console.error('Error fetching Antrian data', error);
        Alert.alert('Error', 'Failed to fetch Antrian data');
      }
    };

    fetchAntrianData();
  }, []);

  const fetchCurrentAntrian = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/fetch-antrian-api`);
      setCurrentAntrian(response.data.currentAntrian);
      setModalVisible(true);
    } catch (error) {
      console.error('Error fetching current antrian', error);
      Alert.alert('Error', 'Failed to fetch current antrian data');
    }
  };

  const renderCard = ({ item }) => (
    <LinearGradient
      colors={['#90C0E1', '#2792E4']}
      start={{ x: 0, y: 0 }}
      end={{ x: 0.5, y: 0 }}
      style={styles.card}
    >
      <Text style={styles.title}>No Antrian: {item.no_antrian}</Text>
      <Text style={styles.detail}>Keluhan: {item.keluhan}</Text>
      <Text style={styles.detail}>Tanggal Kunjungan: {item.tanggal_kunjungan}</Text>
      <Text style={styles.detail}>Status: {item.status}</Text>
    </LinearGradient>
  );

  const handleShowModal = () => {
    fetchCurrentAntrian();
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  return (
    <>
      <Header />
      <View style={styles.container}>
        <FlatList
          data={antrianList}
          renderItem={renderCard}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={styles.listContainer}
        />

        <TouchableOpacity style={styles.button} onPress={handleShowModal}>
          <LinearGradient
            colors={['#90C0E1', '#2792E4']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.buttonGradient}
          >
            <Text style={styles.buttonText}>Antrian Sekarang</Text>
          </LinearGradient>
        </TouchableOpacity>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={handleCloseModal}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              {currentAntrian ? (
                <>
                  <Text style={styles.modalTitle}>Live Antrian Pada Klinik</Text>
                  <Text>No Antrian: {currentAntrian.no_antrian}</Text>
                  <Text style={styles.modalTitle2}>{currentAntrian.no_antrian}</Text>
                  <Text>Tanggal Kunjungan: {currentAntrian.tanggal_kunjungan}</Text>
                  <Text>Status: {currentAntrian.status}</Text>
                </>
              ) : (
                <Text>No current antrian available.</Text>
              )}
              <TouchableOpacity style={styles.closeButton} onPress={handleCloseModal}>
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
  },
  listContainer: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  detail: {
    fontSize: 16,
    marginVertical: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  modalTitle2: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: '#007BFF',
    borderRadius: 5,
    padding: 10,
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  button: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
  },
  buttonGradient: {
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default AntrianList;
