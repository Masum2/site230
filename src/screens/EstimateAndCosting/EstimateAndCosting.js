import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  StatusBar,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const EstimateAndCosting = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor="#0076CE" barStyle="light-content" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>🏠 বিল্ডিং নির্মাণ ক্যালকুলেটর</Text>
      </View>

      {/* Scrollable Options */}
      <ScrollView contentContainerStyle={styles.options}>
        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate('land')}>
          <Text style={styles.cardIcon}>📐</Text>
          <Text style={styles.cardText}>জমি পরিমাপের হিসাব</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate('soilcut')}>
          <Text style={styles.cardIcon}>🏗️</Text>
          <Text style={styles.cardText}>মাটি কাটার কাজের খরচের হিসাব</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate('brick')}>
          <Text style={styles.cardIcon}>📏</Text>
          <Text style={styles.cardText}>ইটের কাজে খরচের হিসাব</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate('plaster')}>
          <Text style={styles.cardIcon}>📏</Text>
          <Text style={styles.cardText}>প্লাস্টার কাজে খরচের হিসাব</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate('concrete')}>
          <Text style={styles.cardIcon}>📏</Text>
          <Text style={styles.cardText}>কংক্রিটের কাজে খরচের হিসাব</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate('help')}>
          <Text style={styles.cardIcon}>📏</Text>
          <Text style={styles.cardText}>Help Me</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate('rodcal')}>
          <Text style={styles.cardIcon}>📏</Text>
          <Text style={styles.cardText}>রড এর কাজে খরচের হিসাব</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate('Converter')}>
          <Text style={styles.cardIcon}>📏</Text>
          <Text style={styles.cardText}>টাইলসের কাজে খরচের হিসাব</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default EstimateAndCosting;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  header: {
    backgroundColor: '#0076CE',
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    // borderBottomLeftRadius: 20,
    // borderBottomRightRadius: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  options: {
    padding: 20,
    gap: 16,
  },
  card: {
    backgroundColor: '#f0f0f0',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  cardIcon: {
    fontSize: 28,
    marginBottom: 8,
  },
  cardText: {
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
    color: '#1a1a1a',
  },
});
