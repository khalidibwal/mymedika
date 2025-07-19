// CustomTabs.js
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';

const CustomTabs = ({tabs = [], onTabChange, activeTab = 0, title}) => {
  const handleTabPress = index => {
    if (onTabChange) {
      onTabChange(index);
    }
  };

  return (
    <SafeAreaView style={styles.wrapper}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.container}>
        {tabs.map((tab, index) => {
          const isActive = index === activeTab;
          return (
            <TouchableOpacity
              key={index}
              onPress={() => handleTabPress(index)}
              style={styles.tabButton}>
              <Text style={[styles.tabText, isActive && styles.activeTabText]}>
                {tab}
              </Text>
              <View style={[styles.line, isActive && styles.activeLine]} />
            </TouchableOpacity>
          );
        })}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#fff',
    paddingTop: 10,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
    flexWrap: 'wrap', // Membungkus teks panjang
    textAlign: 'left', // atau 'center' jika ingin rata tengah
    lineHeight: 22, // Tambahan: bikin teks lebih nyaman dibaca
  },
  container: {
    flexDirection: 'row',
    borderColor: '#ddd',
    backgroundColor: '#fff',
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
  },
  tabText: {
    color: '#666',
    fontSize: 16,
    textTransform: 'uppercase',
  },
  activeTabText: {
    color: '#000',
    fontWeight: 'bold',
  },
  line: {
    height: 3,
    width: '100%',
    backgroundColor: 'transparent',
    marginTop: 6,
  },
  activeLine: {
    backgroundColor: '#007AFF',
  },
});

export default CustomTabs;
