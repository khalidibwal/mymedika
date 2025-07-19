import React from "react";
import { View, Text, StyleSheet } from "react-native";

const DokterItem = ({ nama }) => (
  <View style={styles.item}>
    <Text style={styles.nama}>{nama}</Text>
  </View>
);


const styles = StyleSheet.create({
  item: {
    padding: 15,
    borderBottomWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
  },
  nama: {
    fontSize: 16,
  },
});

export default DokterItem