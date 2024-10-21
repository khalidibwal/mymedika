import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, Image, StyleSheet, Alert, KeyboardAvoidingView } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRecoilState } from 'recoil';
import { userState } from '../../Global/Auth/UserGlobal';
import { useNavigation } from '@react-navigation/native';
import { API_URL } from '@env';
import LinearGradient from 'react-native-linear-gradient';

const RegisterScreen = () => {
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
      Alert.alert('Whoops..', 'Please fill all required fields.');
      return false;
    }
    if (password !== passwordConfirm) {
      Alert.alert('Error', 'Passwords do not match.');
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
        const response = await axios.post(`${API_URL}/api/register`, {
            name,
            nik,
            email,
            password,
            password_confirmation: passwordConfirm,
            bpjs,
            telp,
            alamat,
        }, {
            headers: {
                'Content-Type': 'application/json', // Add Content-Type header
            },
        });
  
        const { access_token, user } = response.data;
  
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
  
            Alert.alert('Registration Failed', errorMessages.join('\n') || 'Please try again.');
        } else {
            Alert.alert('Whoops...', 'Something went wrong. Please try again later.');
        }
    } finally {
        setLoading(false);
    }
};

  

  return (
    <KeyboardAvoidingView style={styles.container}>
      <View style={styles.loginCard}>
        {/* Sign In and Register Buttons at the Top */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('login')}>
            <Text style={styles.navButtonText}>Sign In</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navButton2} onPress={() => navigation.navigate('register')}>
            <Text style={styles.navButtonText}>Register</Text>
          </TouchableOpacity>
        </View>


        {/* Inner Card for Input and Button */}
        <View style={styles.innerCard}>
        <TextInput
            style={styles.input}
            placeholder="NIK (Boleh dikosongkan)"
            value={nik}
            onChangeText={setNik}
          />
        <TextInput
            style={styles.input}
            placeholder="Nama"
            value={name}
            onChangeText={setName}
          />
        <TextInput
            style={styles.input}
            placeholder="Telpon"
            value={telp}
            onChangeText={setTelp}
            keyboardType='numeric'
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <TextInput
            style={styles.input}
            placeholder="Konfirmasi Password"
            value={passwordConfirm}
            onChangeText={setPasswordConfirm}
            secureTextEntry
          />
            <LinearGradient 
              colors={['#90EE90', '#004B73']} // Left color to right color
              start={{ x: 0, y: 0 }} // Start from the left
              end={{ x: 0.5, y: 0 }} // End at the right
              style={styles.button}
            >
          <TouchableOpacity  onPress={handleLogin} disabled={loading}>
            {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Sign up</Text>}
          </TouchableOpacity>
          </LinearGradient>
        </View>

        {/* Logo and text placed inside the card at the bottom */}
        <View style={styles.bottomContent}>
          <Text style={styles.bottomText}>Powered by Puspita Medika</Text>
          <Image source={require('../../../Assets/image/puspitalogo.png')} style={styles.logo} />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end', 
    backgroundColor: 'grey',
  },
  loginCard: {
    height: '100%',
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    justifyContent: 'center',
    position: 'relative',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center', // Center the buttons horizontally
    marginBottom: 30, // Increase space between buttons and title
    position: 'absolute', // Position the buttons at the top
    top: 20, // Distance from the top of the card
    width: '100%', // Ensure it takes full width
    marginHorizontal:10
  },
  navButton: {
    backgroundColor: '#90EE90',
    padding: 5,
    borderRadius: 5,
    marginLeft: 10,
    width:90
  },
  navButton2: {
    backgroundColor: '#004B73',
    padding: 5,
    borderRadius: 5,
    marginLeft: 10,
    width:90
  },
  navButtonText: {
    color: '#fff',
    fontSize: 16,
    textAlign:'center'
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  innerCard: {
    backgroundColor: '#f8f8f8', // Light background for inner card
    borderRadius: 5, // Border radius for inner card
    padding: 20,
    elevation: 3,
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5, // Border radius for input fields
    marginBottom: 12,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 5, // Border radius for button
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  forgotPassword: {
    marginTop: 10,
    color: '#007BFF',
    textAlign: 'center',
    textDecorationLine: 'underline',
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
    width: 50,
    height: 50,
    marginBottom: 10, 
  },
  bottomText: {
    fontSize: 14,
    bottom: 5,
    color: 'red',
  },
});

export default RegisterScreen;
