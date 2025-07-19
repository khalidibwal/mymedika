import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Image, ScrollView, TouchableOpacity} from 'react-native';
import CustomTabs from '../../Component/Tab/CustomTab'; // Pastikan path benar
import axios from 'axios';
import {API_URL} from '@env';
import {useNavigation} from '@react-navigation/native';
import {Rating} from 'react-native-ratings';
import Footer from '../Home/Footer';

const DokterTabView = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [tabNames, setTabNames] = useState([]);
  const [allDokters, setAllDokters] = useState([]);

  const navigation = useNavigation();

  useEffect(() => {
    const fetchPoliklinik = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/dokters`);
        const allDokter = response.data.data;

        // Ambil daftar spesialis unik
        const spesialisList = [...new Set(allDokter.map(d => d.spesialis))];

        setTabNames(spesialisList);
        setAllDokters(allDokter);
      } catch (error) {
        console.error('Error fetching dokter data', error);
      }
    };

    fetchPoliklinik();
  }, []);

  const filteredDokters = allDokters.filter(
    d => d.spesialis === tabNames[selectedTab],
  );

  return (
    <View style={styles.container}>
      <CustomTabs
        tabs={tabNames}
        activeTab={selectedTab}
        onTabChange={index => setSelectedTab(index)}
        title="Available Specialist"
      />

      <ScrollView contentContainerStyle={styles.cardWrapper}>
        {filteredDokters.map((item, index) => (
          <TouchableOpacity key={index} style={styles.card}>
            <View style={styles.cardLeft}>
              <Text style={styles.name}>{item.namaDokter}</Text>
              <Text style={styles.name}>Dokter {item.spesialis}</Text>
              <View style={styles.ratingStyle}>
                <Rating
                  count={5}
                  defaultRating={5}
                  startingValue={5}
                  readonly
                  imageSize={10}
                  onFinishRating={rating =>
                    console.log('Rating:', rating)
                  }
                />
              </View>
              <Text style={styles.name}>Pengalaman</Text>
              <Text style={styles.name}>3 tahun</Text>
            </View>

            <View style={styles.imageStyle}>
              {/* Simulasi gambar */}
              <Image
                source={{
                  uri: item.fotoDokter
                    ? `${API_URL}/images/${item.fotoDokter}`
                    : 'https://via.placeholder.com/50',
                }}
                style={styles.image}
              />
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <Footer/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingTop: 50,
    backgroundColor: '#f9f4f2',
  },
  cardWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  card: {
    width: '48%',
    backgroundColor: '#fff',
    padding: 12,
    marginVertical: 8,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
    // margin:1
  },
  cardLeft: {
    flex: 1,
    paddingRight: 8,
  },
  name: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  ratingStyle: {
    alignItems: 'flex-start',
    paddingTop: 10,
    paddingBottom: 10,
  },
  imageStyle: {
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
  },
 image: {
  width: 60, // atau '30%' jika ingin fleksibel
  height: '100%',
  alignSelf: 'flex-end', // agar tetap ke bawah jika tinggi dinamis
  resizeMode: 'cover',   // untuk menyesuaikan isi gambar
},
});

export default DokterTabView;
