import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Switch } from 'react-native';

const ExcavationCalculator = () => {
  const [length, setLength] = useState('');
  const [width, setWidth] = useState('');
  const [depth, setDepth] = useState('');
  const [rate, setRate] = useState('');
  const [volume, setVolume] = useState(0);
  const [totalCost, setTotalCost] = useState(0);
  const [isMeter, setIsMeter] = useState(true); // Switch for unit

  const calculate = () => {
    let l = parseFloat(length) || 0;
    let w = parseFloat(width) || 0;
    let d = parseFloat(depth) || 0;
    const r = parseFloat(rate) || 0;

    // If unit is in feet, convert to meters
    if (!isMeter) {
      l *= 0.3048;
      w *= 0.3048;
      d *= 0.3048;
    }

    const calculatedVolume = l * w * d;
    const calculatedCost = calculatedVolume * r;

    setVolume(calculatedVolume);
    setTotalCost(calculatedCost);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>মাটির কাজে খরচের হিসাব</Text>

      {/* Unit Switch */}
      <View style={styles.unitToggle}>
        <Text style={styles.label}>একক নির্বাচন: </Text>
        <Text style={styles.unitLabel}>{isMeter ? 'মিটার' : 'ফুট'}</Text>
        <Switch
          value={isMeter}
          onValueChange={setIsMeter}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>মাটি কাটার দৈর্ঘ্য :</Text>
        <TextInput
          style={styles.input}
          placeholder="এখানে লিখুন"
          keyboardType="numeric"
          value={length}
          onChangeText={setLength}
        />
        <Text style={styles.unit}>{isMeter ? 'মিটার' : 'ফুট'}</Text>
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>মাটি কাটার প্রস্থ :</Text>
        <TextInput
          style={styles.input}
          placeholder="এখানে লিখুন"
          keyboardType="numeric"
          value={width}
          onChangeText={setWidth}
        />
        <Text style={styles.unit}>{isMeter ? 'মিটার' : 'ফুট'}</Text>
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>মাটি কাটার গভীরতা :</Text>
        <TextInput
          style={styles.input}
          placeholder="এখানে লিখুন"
          keyboardType="numeric"
          value={depth}
          onChangeText={setDepth}
        />
        <Text style={styles.unit}>{isMeter ? 'মিটার' : 'ফুট'}</Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={calculate}>
        <Text style={styles.buttonText}>ফলাফল</Text>
      </TouchableOpacity>

    <View style={styles.resultRow}>
  <Text style={styles.label}>মাটি কাটার পরিমাণ :</Text>
  <Text style={styles.resultValue}>
    {isMeter ? volume.toFixed(2) : (volume * 35.3147).toFixed(2)}
  </Text>
  <Text style={styles.unit}>{isMeter ? 'ঘ.মি.' : 'ঘ.ফুট'}</Text>
</View>


      <View style={styles.inputGroup}>
        <Text style={styles.label}>প্রতি ঘন.মি. মাটি কাটার খরচ :</Text>
        <TextInput
          style={styles.input}
          placeholder="এখানে লিখুন"
          keyboardType="numeric"
          value={rate}
          onChangeText={setRate}
        />
        <Text style={styles.unit}>টাকা</Text>
      </View>

      <View style={styles.totalCostRow}>
        <Text style={styles.totalCostLabel}>সর্বমোট খরচ :</Text>
        <Text style={styles.totalCostValue}>{totalCost.toFixed(2)} টাকা</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#FFF',
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#001f4d',
  },
  inputGroup: {
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    flex: 2,
    fontSize: 16,
    color: '#222',
  },
  input: {
    flex: 2,
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 6,
    backgroundColor: '#f9f9f9',
    fontSize: 16,
  },
  unit: {
    flex: 1,
    fontSize: 16,
    textAlign: 'center',
    color: '#333',
  },
  button: {
    backgroundColor: '#00A3FF',
    paddingVertical: 10,
    borderRadius: 8,
    marginVertical: 16,
  },
  buttonText: {
    textAlign: 'center',
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  resultRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 6,
  },
  resultValue: {
    flex: 2,
    fontSize: 16,
    color: '#222',
    fontWeight: '600',
  },
  totalCostRow: {
    borderTopWidth: 1,
    borderColor: '#d00',
    marginTop: 12,
    paddingTop: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  totalCostLabel: {
    fontSize: 18,
    color: '#d00',
    fontWeight: 'bold',
  },
  totalCostValue: {
    fontSize: 18,
    color: '#d00',
    fontWeight: 'bold',
  },
  unitToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  unitLabel: {
    fontSize: 16,
    color: '#444',
    marginRight: 8,
  },
});

export default ExcavationCalculator;
