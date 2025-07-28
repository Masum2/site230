import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, SafeAreaView, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={{flex:1}}>
       <StatusBar backgroundColor="#0076CE" barStyle="light-content" />
    <View style={styles.container}>
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Site 360 Degree</Text>
        <TouchableOpacity style={styles.avatarBtn}>
          <Image
            source={require('../assets/avatar.jpg')} // Add a sample avatar image in assets folder
            style={styles.avatar}
          />
        </TouchableOpacity>
      </View>

      {/* Body Options */}
   <View style={styles.options}>
  <TouchableOpacity
    style={styles.card}
    onPress={() => navigation.navigate('Estimate')}>
    <Text style={styles.cardIcon}>📐</Text>
    <Text style={styles.cardText}>Estimate & Costing</Text>
  </TouchableOpacity>

  <TouchableOpacity
    style={styles.card}
    onPress={() => navigation.navigate('Projects')}>
    <Text style={styles.cardIcon}>🏗️</Text>
    <Text style={styles.cardText}>Project Management</Text>
  </TouchableOpacity>

  <TouchableOpacity
    style={styles.card}
    onPress={() => navigation.navigate('Converter')}>
    <Text style={styles.cardIcon}>📏</Text>
    <Text style={styles.cardText}>Converter Tools</Text>
  </TouchableOpacity>
</View>

    </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
 
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
    backgroundColor:'#0076CE',
 padding:16
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFF',
  },
  avatarBtn: {
    padding: 5,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#ccc',
  },
  options: {
    flex: 1,
    gap: 20,
    padding:20
  },
card: {
  backgroundColor: '#f0f0f0',
  padding: 20,
  borderRadius: 12,
  alignItems: 'center', // Center content horizontally
  justifyContent: 'center',
},

cardIcon: {
  fontSize: 32,
  marginBottom: 8,
},

cardText: {
  fontSize: 16,
  fontWeight: '500',
  color: '#1a1a1a',
  textAlign: 'center',
},

});
