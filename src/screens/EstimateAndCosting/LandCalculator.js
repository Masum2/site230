// LandCalculator.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  ScrollView,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'; //  ➜  npm i react-native-vector-icons

/**
 * 1 decimal (শতাংশ)  = 435.6 sq ft
 * 1 katha            = 720 sq ft
 *
 * Area formula used by local surveyors for an irregular four‑sided plot:
 *     avgLength = (L1 + L2) / 2
 *     avgWidth  = (W1 + W2) / 2
 *     areaSqFt  = avgLength × avgWidth
 */
const LandCalculator = () => {
  const [length1, setLength1] = useState('');
  const [length2, setLength2] = useState('');
  const [width1,  setWidth1]  = useState('');
  const [width2,  setWidth2]  = useState('');

  const [area,    setArea]    = useState(0);
  const [decimal, setDecimal] = useState(0);
  const [katha,   setKatha]   = useState(0);

  const handleCalculate = () => {
    const l1 = parseFloat(length1) || 0;
    const l2 = parseFloat(length2) || 0;
    const w1 = parseFloat(width1)  || 0;
    const w2 = parseFloat(width2)  || 0;

    if (!l1 || !l2 || !w1 || !w2) {
      setArea(0); setDecimal(0); setKatha(0);
      return;
    }

    const avgLength = (l1 + l2) / 2;
    const avgWidth  = (w1 + w2) / 2;
    const areaSqFt  = avgLength * avgWidth;

    setArea(areaSqFt);
    setDecimal(areaSqFt / 435.6);
    setKatha(areaSqFt / 720);
  };

  return (
    <SafeAreaView style={{flex:1}}>
        <StatusBar backgroundColor="#0076CE" barStyle="light-content" />
 
    <ScrollView style={styles.container} contentContainerStyle={{paddingBottom: 24}}>
      {/* ---------- Top Bar ---------- */}
      <View style={styles.header}>
        <Pressable onPress={() => navigation?.goBack?.()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </Pressable>
        <Text style={styles.headerTitle}>জমি পরিমাপ করুন</Text>
      </View>

      {/* ---------- Card ---------- */}
      <View style={styles.card}>
        {/* (You can drop a tiny image banner here if you want) */}

        {/* ---- Length section ---- */}
        <Text style={styles.sectionTitle}>জমির দুইটি পাশের দৈর্ঘ্য</Text>
        <View style={styles.row}>
          <TextInput
            style={styles.input}
            placeholder="১. দৈর্ঘ্য লিখুন (ফিট)"
            keyboardType="numeric"
            value={length1}
            onChangeText={setLength1}
            placeholderTextColor='gray'
          />
          <TextInput
            style={styles.input}
            placeholder="২. দৈর্ঘ্য লিখুন (ফিট)"
            keyboardType="numeric"
            value={length2}
            onChangeText={setLength2}
              placeholderTextColor='gray'
          />
        </View>

        {/* ---- Width section ---- */}
        <Text style={styles.sectionTitle}>জমির দুইটি পাশের প্রস্থ</Text>
        <View style={styles.row}>
          <TextInput
            style={styles.input}
            placeholder="১. প্রস্থ লিখুন (ফিট)"
            keyboardType="numeric"
            value={width1}
            onChangeText={setWidth1}
              placeholderTextColor='gray'
          />
          <TextInput
            style={styles.input}
            placeholder="২. প্রস্থ লিখুন (ফিট)"
            keyboardType="numeric"
            value={width2}
            onChangeText={setWidth2}
              placeholderTextColor='gray'
          />
        </View>

        {/* ---- Calculate button ---- */}
        <Pressable style={styles.button} onPress={handleCalculate}>
          <Text style={styles.buttonText}>↓ ফলাফল ↓</Text>
        </Pressable>

        {/* ---- Results ---- */}
        <View style={styles.resultRow}>
          <Text style={styles.resultLabel}>মোট স্কোয়্যারফুটঃ</Text>
          <Text style={styles.resultBox}>{area.toFixed(2)}</Text>
        </View>
        <View style={styles.resultRow}>
          <Text style={styles.resultLabel}>মোট শতাংশঃ</Text>
          <Text style={styles.resultBox}>{decimal.toFixed(2)}</Text>
        </View>
        <View style={styles.resultRow}>
          <Text style={styles.resultLabel}>মোট কাঠাঃ</Text>
          <Text style={styles.resultBox}>{katha.toFixed(2)}</Text>
        </View>

        <Text style={styles.footer}>
          Estimate by <Text style={{fontWeight:'bold'}}>Site360 – বিল্ডিং ক্যালকুলেটর</Text>{'\n'}
          Available on Google Play Store.
        </Text>
      </View>
    </ScrollView>
       </SafeAreaView>
  );
};

export default LandCalculator;

/* ---------- Styles ---------- */
const PRIMARY = '#0076CE';

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#E5EEF7' },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 14,
    backgroundColor: PRIMARY,
  },
  headerTitle: { color: '#fff', fontSize: 18, marginLeft: 8, fontWeight: '600' },

  card: {
    margin: 12,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    elevation: 4,        // shadow for Android
    shadowColor: '#000', // shadow for iOS
    shadowOpacity: 0.15,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#444',
    marginTop: 12,
    marginBottom: 6,
  },

  row: { flexDirection: 'row', justifyContent: 'space-between' },

  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#DADADA',
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginVertical: 6,
    marginHorizontal: 4,
    fontSize: 15,
    backgroundColor: '#FAFAFA',
  },

  button: {
    backgroundColor: PRIMARY,
    paddingVertical: 10,
    borderRadius: 20,
    alignItems: 'center',
    marginVertical: 12,
  },
  buttonText: { color: '#fff', fontSize: 17, fontWeight: '600' },

  resultRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
  },
  resultLabel: { flex: 1.1, fontSize: 15, color: '#353535' },
  resultBox: {
    flex: 1,
    textAlign: 'right',
    borderWidth: 1,
    borderColor: '#DADADA',
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderRadius: 4,
    fontSize: 15,
    backgroundColor: '#F6F6F6',
  },

  footer: {
    textAlign: 'center',
    fontSize: 12,
    color: '#777',
    marginTop: 14,
  },
});
