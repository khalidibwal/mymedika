import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useRecoilState } from 'recoil';
import { bookTimeSelected } from '../../Global/doctor/atom';
import { useNavigation } from '@react-navigation/native';

const SuccessScreen = ({ queueNumber = 'A1' }) => {
  const scale = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  const [books, setBooks] = useRecoilState(bookTimeSelected)
  const navigation = useNavigation()

  useEffect(() => {
    console.log(books,"booking data")
    Animated.parallel([
      Animated.spring(scale, {
        toValue: 1,
        friction: 5,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const onClose = () =>{
    navigation.replace('antrian')
  }

  return (
    <View style={styles.wrapper}>
      <View style={styles.card}>
        <Animated.View
          style={[
            styles.iconContainer,
            {
              transform: [{ scale }],
              opacity,
            },
          ]}
        >
          <View style={styles.greenBadge}>
            <Icon name="check" size={28} color="white" />
          </View>
        </Animated.View>

        <Text style={styles.queueText}>Antrian {books.no_antrian}</Text>

        <Text style={styles.instructionText}>
          mohon tunjukan{'\n'}no. antrian /{'\n'}home -&gt; antrian{'\n'}
          kepada resepsionis{'\n'}Puspita Medika
        </Text>

        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Text style={styles.closeButtonText}>Close</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#f8f2ef',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#fff',
    width: 250,
    borderRadius: 20,
    paddingVertical: 30,
    paddingHorizontal: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
    elevation: 5,
  },
  iconContainer: {
    marginBottom: 20,
  },
  greenBadge: {
    backgroundColor: '#77c043',
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  queueText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 15,
  },
  instructionText: {
    textAlign: 'center',
    fontSize: 13,
    color: '#333',
    lineHeight: 18,
    marginBottom: 25,
  },
  closeButton: {
    backgroundColor: '#29bcd4',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  closeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default SuccessScreen;
