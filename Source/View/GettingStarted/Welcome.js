import React, {useEffect, useState} from 'react';
import {View, Text, Image, StyleSheet, SafeAreaView, Alert} from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import LoginMedika from '../Auth/LoginMedika';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation, CommonActions} from '@react-navigation/native';

const slides = [
  {
    key: 'one',
    title: 'Welcome To MyMedika',
    text: 'Konsultasi dengan dokter,dan cek lab — semua bisa dari rumah',
    image: require('./../../../Assets/image/online.png'),
    backgroundColor: '#2cb1c4',
  },
  {
    key: 'two',
    title: 'Layanan Kesehatan 24/7',
    text: 'Butuh dokter cepat? Kami hadir kapan pun kamu butuh.',
    image: require('./../../../Assets/image/24-7.png'),
    backgroundColor: '#2cb1c4',
  },
  {
    key: 'three',
    title: 'Mulai Sekarang!',
    text: 'Yuk mulai jelajahi MyMedika.',
    image: require('./../../../Assets/image/rocket.png'),
    backgroundColor: '#2cb1c4',
  },
];

const Welcome = () => {
  const [showRealApp, setShowRealApp] = useState(false);
  const navigation = useNavigation();

  const _renderItem = ({item}) => (
    <View style={[styles.slide, {backgroundColor: item.backgroundColor}]}>
      <Image source={item.image} style={styles.image} />
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.text}>{item.text}</Text>
    </View>
  );

  const _onDone = () => {
    setShowRealApp(true); // ganti ke halaman utama nanti
  };

  useEffect(() => {
  const loginAccess = async () => {
    const token = await AsyncStorage.getItem('access_token');
    if (token) {
      Alert.alert(
        "Selamat Datang!",
        "Kamu sudah login, langsung masuk ke Home.",
        [
          {
            text: "OK",
            onPress: () => {
              navigation.dispatch(
                CommonActions.reset({
                  index: 0,
                  routes: [{ name: 'Home' }],
                })
              );
            }
          }
        ],
        { cancelable: false }
      );
    }
  };
  loginAccess();
}, []);


  return (
    <SafeAreaView style={{flex: 1}}>
      {showRealApp ? (
        <LoginMedika />
      ) : (
        <AppIntroSlider
          renderItem={_renderItem}
          data={slides}
          onDone={_onDone}
          showSkipButton={true}
          onSkip={_onDone}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    // backgroundColor:'#000'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
    color: '#000',
    textAlign: 'center',
  },
  image: {
    width: 200,
    height: 200,
    marginVertical: 30,
  },
  mainApp: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Welcome;
