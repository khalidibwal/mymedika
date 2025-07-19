// SmallCard.js
import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Rating } from 'react-native-ratings';

const CardDashboard = ({ title = 'Judul', spesial = 'Konten' }) => {
  return (
    <View style={styles.card}>
      <Image source={require('../../../Assets/image/person.png')} style={styles.avatar}/>
      <View style={styles.cardContent}>
        <Text style={styles.cardText}>{title}</Text>
        <Text style={styles.cardText}>Spesialis {spesial}</Text>
        <Rating
        count={5}
        defaultRating={5}
        readonly
        imageSize={15}
        onFinishRating={(rating) => console.log("Rating:", rating)}
      />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 12,
    margin: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    flexDirection:'row',
    marginBottom:10
  },
  cardContent:{
    flexDirection:'column',
    paddingHorizontal:20
  },
  cardText:{
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 4,
    color:'#000'
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  content: {
    fontSize: 14,
    color: '#555',
  },
  avatar:{
    width:60,
    height:60
  },
  rate:{
    width:50,
    height:50
  }
});

export default CardDashboard;
