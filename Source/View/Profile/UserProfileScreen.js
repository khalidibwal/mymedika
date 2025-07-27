import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Header from '../Home/Header';
import { useNavigation } from '@react-navigation/native';
import { useRecoilValue } from 'recoil';
import { userState } from '../../Global/Auth/UserGlobal';

const UserProfileScreen = () => {
  const navigation = useNavigation();
  const profileData = useRecoilValue(userState)

  // Simulasi data user
  const user = {
    name: profileData.name,
    email: profileData.email,
    phone: profileData.noTelp,
    birthDate: '24/11/1990',
    photo: 'https://via.placeholder.com/100x100.png?text=User', // Ganti dengan foto user asli
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Back button */}
      {/* <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Text style={styles.backText}>←</Text>
      </TouchableOpacity> */}
      <Header />
      {/* Header */}
      {/* <View style={styles.header}>
        <Image source={{ uri: user.photo }} style={styles.avatar} />
        <Text style={styles.nameHeader}>{user.name.split(' ')[0]}</Text>
      </View> */}

      {/* Form fields */}
      <View style={styles.form}>
        <Text style={styles.label}>Name</Text>
        <TextInput style={styles.input} value={user.name} editable={false} />

        <Text style={styles.label}>Email</Text>
        <TextInput style={styles.input} value={user.email} editable={false} />

        <Text style={styles.label}>Phone</Text>
        <TextInput style={styles.input} value={user.phone} editable={false} />

        <Text style={styles.label}>Tanggal Lahir</Text>
        <TextInput style={styles.input} value={user.birthDate} editable={false} />
      </View>

      {/* Edit Button */}
      <TouchableOpacity
        style={styles.editButton}
        onPress={() => navigation.navigate('EditProfile')}
      >
        <Text style={styles.editButtonText}>Edit Profile</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fef9f7',
    flexGrow: 1,
    padding: 10,
    alignItems: 'center',
  },
  backButton: {
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
  backText: {
    fontSize: 24,
  },
  header: {
    backgroundColor: '#00A8E8',
    width: '100%',
    alignItems: 'center',
    paddingVertical: 20,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    marginBottom: 30,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    marginBottom: 10,
  },
  nameHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  form: {
    width: '100%',
  },
  label: {
    fontSize: 14,
    marginBottom: 4,
    marginTop: 12,
  },
  input: {
    backgroundColor: '#dceee9',
    padding: 10,
    borderRadius: 8,
    fontSize: 14,
  },
  editButton: {
    marginTop: 30,
    backgroundColor: '#FF7F11',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
  },
  editButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default UserProfileScreen;
