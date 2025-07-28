import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, Switch } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const PlastartCalculator = () => {
  const [length, setLength] = useState('15');
  const [width, setWidth] = useState('15');
  const [thickness, setThickness] = useState('5');
  const [ratio, setRatio] = useState('1:4');
  const [isMeter, setIsMeter] = useState(true);
  const [cementPricePerBag, setCementPricePerBag] = useState('500');
  const [sandPricePerUnit, setSandPricePerUnit] = useState('200');
  const [results, setResults] = useState({
    area: '225',
    cement: '10.125',
    sand: '1.3500',
    areaUnit: 'ব.মি.',
    sandUnit: 'ঘ.মি.',
    thicknessUnit: 'মিমি',
    totalCementCost: '5062.50',
    totalSandCost: '270.00',
    totalCost: '5332.50',
  });

  useEffect(() => {
    calculate();
  }, [length, width, thickness, ratio, isMeter, cementPricePerBag, sandPricePerUnit]);

  const calculate = () => {
    const l = parseFloat(length) || 0;
    const w = parseFloat(width) || 0;
    const t = parseFloat(thickness) || 0;
    const cementPrice = parseFloat(cementPricePerBag) || 0;
    const sandPrice = parseFloat(sandPricePerUnit) || 0;

    // ধ্রুবকগুলো
    const meterCementConstant = 35.44; // মিটার মোডে 10.125 ব্যাগ (1:4)
    const feetCementConstant = 0.945; // ফুট মোডে 22.500 ব্যাগ (1:4)

    if (isMeter) {
      const area = l * w;
      const thicknessInMeter = t / 1000;
      const wetVolume = area * thicknessInMeter;
      const dryVolume = wetVolume * 1.27;

      const [c, s] = ratio.split(':').map(Number);
      const total = c + s;

      const cementBags = (dryVolume * meterCementConstant) / total; // ~10.125 ব্যাগ (1:4)
      const sand = dryVolume * (s / total) * 1.1823;

      const totalCementCost = cementBags * cementPrice; // সিমেন্টের দাম ব্যাগের উপর নির্ভর করে
      const totalSandCost = sand * sandPrice;
      const totalCost = totalCementCost + totalSandCost;

      setResults({
        area: area.toFixed(0),
        cement: cementBags.toFixed(3),
        sand: sand.toFixed(4),
        areaUnit: 'ব.মি.',
        sandUnit: 'ঘ.মি.',
        thicknessUnit: 'মিমি',
        totalCementCost: totalCementCost.toFixed(2),
        totalSandCost: totalSandCost.toFixed(2),
        totalCost: totalCost.toFixed(2),
      });
    } else {
      const area = l * w;
      const thicknessInFeet = t / 12;
      const wetVolume = area * thicknessInFeet;
      const dryVolume = wetVolume * 1.27;

      const [c, s] = ratio.split(':').map(Number);
      const total = c + s;

      const cementBags = (dryVolume * feetCementConstant) / total; // ~22.500 ব্যাগ (1:4)
      const sand = dryVolume * (s / total) * 1.181;

      const totalCementCost = cementBags * cementPrice; // সিমেন্টের দাম ব্যাগের উপর নির্ভর করে
      const totalSandCost = sand * sandPrice;
      const totalCost = totalCementCost + totalSandCost;

      setResults({
        area: area.toFixed(0),
        cement: cementBags.toFixed(2),
        sand: sand.toFixed(1),
        areaUnit: 'ব.ফুট',
        sandUnit: 'ঘন ফুট',
        thicknessUnit: 'ইঞ্চি',
        totalCementCost: totalCementCost.toFixed(2),
        totalSandCost: totalSandCost.toFixed(2),
        totalCost: totalCost.toFixed(2),
      });
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>প্লাস্টার হিসাব</Text>
        <View style={styles.unitSwitch}>
          <Text style={isMeter ? styles.activeText : styles.inactiveText}>মিটার</Text>
          <Switch
            value={isMeter}
            onValueChange={(value) => {
              setIsMeter(value);
              setThickness('5');
              setSandPricePerUnit(value ? '200' : '200');
            }}
          />
          <Text style={!isMeter ? styles.activeText : styles.inactiveText}>ফুট</Text>
        </View>
      </View>

      <View style={styles.inputGroup}>
        <Text>দৈর্ঘ্য ({isMeter ? 'মিটার' : 'ফুট'}):</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={length}
          onChangeText={setLength}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text>প্রস্থ ({isMeter ? 'মিটার' : 'ফুট'}):</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={width}
          onChangeText={setWidth}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text>পুরুত্ব ({results.thicknessUnit}):</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={thickness}
          onChangeText={setThickness}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text>অনুপাত:</Text>
        <Picker
          selectedValue={ratio}
          onValueChange={setRatio}
          style={styles.picker}
        >
          <Picker.Item label="1:4 (১ সিমেন্ট : ৪ বালি)" value="1:4" />
          <Picker.Item label="1:5 (১ সিমেন্ট : ৫ বালি)" value="1:5" />
          <Picker.Item label="1:6 (১ সিমেন্ট : ৬ বালি)" value="1:6" />
        </Picker>
      </View>

      <View style={styles.inputGroup}>
        <Text>প্রতি ব্যাগ সিমেন্টের দাম (টাকা):</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={cementPricePerBag}
          onChangeText={setCementPricePerBag}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text>প্রতি {isMeter ? 'ঘন মিটার' : 'ঘন ফুট'} বালির দাম (টাকা):</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={sandPricePerUnit}
          onChangeText={setSandPricePerUnit}
        />
      </View>

      <View style={styles.resultContainer}>
        <Text style={styles.resultTitle}>ফলাফল আসবে প্রায়:</Text>
        <Text style={styles.resultText}>প্লাস্টারের পরিমাণ: ~{results.area} {results.areaUnit}</Text>
        <Text style={styles.resultText}>সিমেন্ট ব্যাগ: ~{results.cement}</Text>
        <Text style={styles.resultText}>বালি পরিমাণ: ~{results.sand} {results.sandUnit}</Text>
        <Text style={styles.resultText}>সর্বমোট সিমেন্টের দাম: ~{results.totalCementCost} টাকা</Text>
        <Text style={styles.resultText}>সর্বমোট বালির দাম: ~{results.totalSandCost} টাকা</Text>
        <Text style={styles.resultText}>সর্বমোট খরচ: ~{results.totalCost} টাকা</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f5f5f5' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  title: { fontSize: 22, fontWeight: 'bold', color: '#2c3e50' },
  unitSwitch: { flexDirection: 'row', alignItems: 'center' },
  activeText: { fontWeight: 'bold', color: '#2c3e50' },
  inactiveText: { color: '#7f8c8d' },
  inputGroup: { marginBottom: 15 },
  input: { borderWidth: 1, borderColor: '#bdc3c7', padding: 12, borderRadius: 8, backgroundColor: '#fff', fontSize: 16, marginTop: 5 },
  picker: { borderWidth: 1, borderColor: '#bdc3c7', borderRadius: 8, backgroundColor: '#fff', marginTop: 5 },
  resultContainer: { marginTop: 20, padding: 15, backgroundColor: '#e8f4f8', borderRadius: 8, borderWidth: 1, borderColor: '#aed6f1' },
  resultTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10, color: '#2980b9' },
  resultText: { fontSize: 16, marginBottom: 8, color: '#2c3e50' },
});



export default PlastartCalculator;






