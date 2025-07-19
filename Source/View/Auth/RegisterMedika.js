import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  StyleSheet,
  Alert,
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useRecoilState} from 'recoil';
import {userState} from '../../Global/Auth/UserGlobal';
import {useNavigation} from '@react-navigation/native';
import {API_URL} from '@env';
import LinearGradient from 'react-native-linear-gradient';

const RegisterMedika = () => {
  const [nik, setNik] = useState(null);
  const [bpjs, setBPJS] = useState(null);
  const [telp, setTelp] = useState(null);
  const [alamat, setAlamat] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useRecoilState(userState);
  const navigation = useNavigation();

  const validateInputs = () => {
      if (!name || !email || !password || !passwordConfirm) {
        Alert.alert('Whoops..', 'Mohon Di isi Semua Kolom');
        return false;
      }
      if (password !== passwordConfirm) {
        Alert.alert('Error', 'Passwords Tidak Cocok, Mohon Diulangi');
        return false;
      }
      // Additional validations can be added here
      return true;
    };

  const handleLogin = async () => {
    setLoading(true);

    // Validate inputs before sending to the server
    if (!validateInputs()) {
      setLoading(false);
      return; // Exit early if validation fails
    }

    try {
      const response = await axios.post(
        `${API_URL}/api/register`,
        {
          name,
          nik,
          email,
          password,
          password_confirmation: passwordConfirm,
          bpjs,
          noTelp: telp,
          alamat,
        },
        {
          headers: {
            'Content-Type': 'application/json', // Add Content-Type header
          },
        },
      );

      const {access_token, user} = response.data;

      if (access_token) {
        await AsyncStorage.setItem('access_token', access_token);
        setUser(user);
        Alert.alert('Registration Successful', `Welcome, ${user.name}!`);
        navigation.navigate('Home');
      }
    } catch (error) {
      console.error(error);
      if (error.response) {
        const errors = error.response.data; // Get the error response
        const errorMessages = [];

        // Collect error messages for each field
        for (const [key, value] of Object.entries(errors)) {
          errorMessages.push(...value); // Spread the array of messages into the main array
        }

        Alert.alert(
          'Registration Failed',
          errorMessages.join('\n') || 'Please try again.',
        );
      } else {
        Alert.alert(
          'Whoops...',
          'Something went wrong. Please try again later.',
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <LinearGradient style={styles.container} colors={['#2cb1c4', '#2cb1c4']}>
      <Image
        source={require('../../../Assets/image/login2.jpg')}
        style={styles.image}
      />
      <View style={styles.innerCard}>
        <View style={styles.titleWrap}>
          <Image
            source={require('../../../Assets/image/health-insurance.png')}
            style={styles.logo}
          />
          <View style={styles.titleTextContainer}>
            <Text style={styles.loginTitle}>MyMedika</Text>
            <Text style={styles.healthSubtitle}>Health</Text>
          </View>
        </View>
        {/* <TextInput
          style={styles.input}
          placeholder="NIK (Boleh dikosongkan)"
          placeholderTextColor="black"
          value={nik}
          onChangeText={setNik}
          keyboardType="numeric"
        /> */}
        <TextInput
          style={styles.input}
          placeholder="Nama"
          placeholderTextColor="black"
          value={name}
          onChangeText={setName}
        />
        {/* <TextInput
          style={styles.input}
          placeholder="Telpon"
          placeholderTextColor="black"
          value={telp}
          onChangeText={setTelp}
          keyboardType="numeric"
        /> */}
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="black"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="black"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <TextInput
          style={styles.input}
          placeholder="Konfirmasi Password"
          placeholderTextColor="black"
          value={passwordConfirm}
          onChangeText={setPasswordConfirm}
          secureTextEntry
        />
        <TouchableOpacity onPress={handleLogin} disabled={loading}>
          <View style={styles.buttonContainer}>
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Sign Up</Text>
            )}
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('login')}>
                  <Text style={styles.forgotPassword}>Already Have an account? Login here</Text>
                </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#2cb1c4',
    flex: 1,
  },
  image: {
    width: '100%',
    height: '20%',
    // borderRadius: 50, // setengah dari width/height
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    borderBottomStartRadius: 50,
    borderBottomEndRadius: 50,
  },
  titleWrap: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  loginTitle: {
    fontSize: 40,
    color: '#000',
    // marginBottom: 20,
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
  loginCard: {
    height: '75%',
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    justifyContent: 'center',
    position: 'relative',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '50%',
    alignSelf: 'center', // Ini yang bikin container tetap di tengah
    backgroundColor: '#ff914d',
    borderRadius: 20,
    padding: 10,
    marginBottom: 30,
  },
  navButton: {
    backgroundColor: '#90EE90',
    padding: 5,
    borderRadius: 5,
    marginLeft: 10,
    width: 90,
  },
  navButton2: {
    backgroundColor: '#004B73',
    padding: 5,
    borderRadius: 5,
    marginLeft: 10,
    width: 90,
  },
  navButtonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  innerCard: {
    padding: 20,
    elevation: 3,
    marginBottom: 20,
    marginVertical: 20,
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 20, // Border radius for input fields
    marginBottom: 15,
    marginTop: 10,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    color: 'black', // Change the text color here
    width: '80%',
    alignSelf: 'center',
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 15,
    width: '50%',
    borderRadius: 15, // Border radius for button
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#000',
    fontSize: 18,
  },
  forgotPassword: {
    marginTop: 10,
    color: '#000',
    textAlign: 'center',
    // textDecorationLine: 'underline',
  },
  bottomContent: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
    marginRight: 10,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  bottomText: {
    fontSize: 14,
    bottom: 5,
    color: 'red',
  },
  formTitle: {
    color: 'black',
    fontSize: 15,
  },
  titleTextContainer: {
    justifyContent: 'center',
    marginLeft: 10,
  },

  healthSubtitle: {
    fontSize: 18,
    color: '#000',
    textAlign: 'left',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
});

export default RegisterMedika;
