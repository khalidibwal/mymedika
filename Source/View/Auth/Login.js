import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, Image, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRecoilState } from 'recoil';
import { userState } from '../../Global/Auth/UserGlobal';
import { useNavigation } from '@react-navigation/native';
import { API_URL } from '@env';
import LinearGradient from 'react-native-linear-gradient';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); 
  const [user, setUser] = useRecoilState(userState);
  const navigation = useNavigation();

  const handleLogin = async () => {
    setLoading(true);
    try {
      const response = await axios.post(`${API_URL}/api/login`, { email, password },{
        headers:{
          'Content-Type': 'application/json',
        }
      });
      const { access_token, user } = response.data;

      if (access_token) {
        await AsyncStorage.setItem('access_token', access_token);
        setUser(user);
        Alert.alert('Login Successful', `Welcome, ${user.name}!`);
        navigation.navigate('Home');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Login Failed', 'Invalid credentials. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
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
          <Text style={styles.formTitle}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <Text style={styles.formTitle}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
           <TouchableOpacity onPress={handleLogin} disabled={loading}>
          <LinearGradient 
              colors={['#90EE90', '#004B73']} // Left color to right color
              start={{ x: 0, y: 0 }} // Start from the left
              end={{ x: 0.5, y: 0 }} // End at the right
              style={styles.button}
            >     
            {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Sign in</Text>}
          </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.forgotPassword}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>

        {/* Logo and text placed inside the card at the bottom */}
        <View style={styles.bottomContent}>
          <Text style={styles.bottomText}>Powered by Puspita Medika</Text>
          <Image source={require('../../../Assets/image/puspitalogo.png')} style={styles.logo} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end', 
    backgroundColor: 'grey',
  },
  loginCard: {
    height: '75%',
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
  formTitle:{
    color:'black',
    fontSize:15
  }
});

export default LoginScreen;
