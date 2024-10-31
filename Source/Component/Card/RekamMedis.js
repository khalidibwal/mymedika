import React from "react";
import { View, Text, StyleSheet } from "react-native";
import LinearGradient from "react-native-linear-gradient";

const RekamCard = (props) => (
  <LinearGradient 
    colors={['#90EE90', '#004B73']} // Gradient colors
    start={{ x: 1, y: 0 }} // Start from the left
    end={{ x: 0, y: 0 }} // End at the right
    style={styles.card}
  >
    <InfoRow label="Rekam Medis" value={props.idRekamMedis} />
    <InfoRow label="Dokter" value={props.dokter.namaDokter} />
    <InfoRow label="Poliklinik" value={props.poliklinik.namaPoliklinik} />
    <InfoRow label="Keluhan" value={props.keluhan} />
    <InfoRow label="Diagnosa" value={props.diagnosa} />
    <InfoRow label="Terapi" value={props.terapi} />
    <InfoRow label="Tanggal Periksa" value={new Date(props.tglPeriksa).toLocaleDateString()} />
  </LinearGradient>
);

const InfoRow = ({ label, value }) => (
  <View style={styles.infoRow}>
    <Text style={styles.label}>{label}</Text>
    <Text style={styles.colon}>:</Text>
    <Text style={styles.value}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  card: {
    borderRadius: 20,
    padding: 3,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 17,
    color: '#fff', // White color for visibility
    flex: 1,
  },
  colon: {
    fontWeight: 'bold',
    fontSize: 17,
    color: '#fff', // White color for visibility
  },
  value: {
    fontSize: 17,
    color: '#fff', // White color for visibility
    flex: 2, // Gives more space to the value
    marginLeft:10
  },
});

export default RekamCard;
