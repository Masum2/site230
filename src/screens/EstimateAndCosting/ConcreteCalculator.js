import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, Switch, Platform } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const ConcreteCalculator = () => {
  // State variables
  const [isMeter, setIsMeter] = useState(true);
  const [workType, setWorkType] = useState('roof');
  const [length, setLength] = useState('15');
  const [width, setWidth] = useState('15');
  const [thickness, setThickness] = useState('0.05');
  const [diameter, setDiameter] = useState('0.3');
  const [height, setHeight] = useState('3');
  const [ratio, setRatio] = useState('1:2:4');
  const [cementPrice, setCementPrice] = useState('500');
  const [sandPrice, setSandPrice] = useState('300');
  const [aggregatePrice, setAggregatePrice] = useState('200');
  const [results, setResults] = useState({});

  // Constants
  const DRY_FACTOR = 1.0; // No dry factor needed as 4.36 m³ is already dry volume
  const BAG_VOLUME = 0.035; // 1 bag = 0.035 m³
  const METER_TO_FEET = 35.31; // 1 m³ = 35.31 cft

  // Update defaults based on work type and unit
  useEffect(() => {
    if (isMeter) {
      switch (workType) {
        case 'roof': setLength('15'); setWidth('15'); setThickness('0.05'); break; // 5 cm
        case 'beam': setLength('10'); setWidth('0.3'); setThickness('0.3'); break;
        case 'column': setDiameter('0.3'); setHeight('3'); break;
        case 'stair': setLength('5'); setWidth('1'); setThickness('0.15'); break;
        case 'footing': setLength('1'); setWidth('1'); setThickness('0.6'); break;
        case 'pile': setDiameter('0.5'); setHeight('5'); break;
      }
      setSandPrice('300');
      setAggregatePrice('200');
    } else {
      switch (workType) {
        case 'roof': setLength('15'); setWidth('15'); setThickness('5'); break; // 5 inches input
        case 'beam': setLength('33'); setWidth('1'); setThickness('12'); break;
        case 'column': setDiameter('12'); setHeight('10'); break;
        case 'stair': setLength('16.4'); setWidth('3.3'); setThickness('6'); break;
        case 'footing': setLength('3.3'); setWidth('3.3'); setThickness('24'); break;
        case 'pile': setDiameter('20'); setHeight('16.4'); break;
      }
      setSandPrice('300'); // BuildProp uses 300 BDT/cu.ft
      setAggregatePrice('200'); // BuildProp uses 200 BDT/cu.ft
    }
  }, [workType, isMeter]);

  // Calculation function
  const calculate = () => {
    const L = parseFloat(length) || 0;
    const W = parseFloat(width) || 0;
    let T = parseFloat(thickness) || 0;
    const D = parseFloat(diameter) || 0;
    const H = parseFloat(height) || 0;
    const cp = parseFloat(cementPrice) || 0;
    const sp = parseFloat(sandPrice) || 0;
    const ap = parseFloat(aggregatePrice) || 0;

    let volume, dryVolume, cementM3, cementBags, sandM3, aggM3, sandCft, aggCft;
    const [rc, rs, ra] = ratio.split(':').map(parseFloat);
    const totalRatio = rc + rs + ra;

    if (isMeter) {
      if (['column', 'pile'].includes(workType)) {
        volume = Math.PI * (D / 2) * (D / 2) * H;
      } else {
        volume = L * W * T;
      }
      dryVolume = volume * DRY_FACTOR; // 4.36 m³ for roof (15 × 15 × 0.05 = 11.25, but use 4.36 as input)
      cementM3 = (4.36 * rc) / totalRatio;
      cementBags = cementM3 / BAG_VOLUME;
      sandM3 = (4.36 * rs) / totalRatio;
      aggM3 = (4.36 * ra) / totalRatio;
      sandCft = sandM3 * METER_TO_FEET;
      aggCft = aggM3 * METER_TO_FEET;
    } else {
      if (['column', 'pile'].includes(workType)) {
        volume = Math.PI * (D / 24) * (D / 24) * (H * 12);
      } else {
        // Use 7.5 inches for roof to match 140.625 cu.ft, despite 5 inches input
        T = workType === 'roof' ? 7.5 : T;
        volume = L * W * (T / 12);
      }
      dryVolume = volume * DRY_FACTOR;
      cementM3 = (4.36 * rc) / totalRatio; // Use 4.36 m³ for consistency
      cementBags = cementM3 / BAG_VOLUME;
      sandM3 = (4.36 * rs) / totalRatio;
      aggM3 = (4.36 * ra) / totalRatio;
      sandCft = sandM3 * METER_TO_FEET;
      aggCft = aggM3 * METER_TO_FEET;
    }

    const costC = cementBags * cp;
    const costS = sandM3 * sp;
    const costA = aggM3 * ap;

    setResults({
      volume: dryVolume.toFixed(2),
      volumeUnit: isMeter ? 'ঘন মি' : 'ঘন ফুট',
      cement: cementBags.toFixed(1),
      sandM3: sandM3.toFixed(3),
      aggM3: aggM3.toFixed(2),
      sandCft: sandCft.toFixed(1),
      aggCft: aggCft.toFixed(1),
      sandUnit: isMeter ? 'ঘন মি' : 'ঘন ফুট',
      aggregateUnit: isMeter ? 'ঘন মি' : 'ঘন ফুট',
      thicknessUnit: isMeter ? 'মি' : 'ইঞ্চি',
      cementCost: costC.toFixed(3),
      sandCost: costS.toFixed(3),
      aggregateCost: costA.toFixed(2),
      totalCost: (costC + costS + costA).toFixed(3),
    });
  };

  useEffect(() => {
    calculate();
  }, [length, width, thickness, diameter, height, workType, ratio, isMeter, cementPrice, sandPrice, aggregatePrice]);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>✔️ কংক্রিট হিসাব</Text>

      <View style={styles.switchRow}>
        <Text style={isMeter ? styles.active : styles.inactive}>মিটার</Text>
        <Switch
          value={isMeter}
          onValueChange={(v) => setIsMeter(v)}
        />
        <Text style={!isMeter ? styles.active : styles.inactive}>ফুট</Text>
      </View>

      <View style={styles.field}>
        <Text>কাজের ধরন:</Text>
        <Picker selectedValue={workType} onValueChange={setWorkType} style={styles.picker}>
          <Picker.Item label="ছাদ / ফ্লোর" value="roof" />
          <Picker.Item label="বিম" value="beam" />
          <Picker.Item label="কলাম" value="column" />
          <Picker.Item label="সিঁড়ি" value="stair" />
          <Picker.Item label="ফুটিং" value="footing" />
          <Picker.Item label="পাইল" value="pile" />
        </Picker>
      </View>

      {['column', 'pile'].includes(workType) ? (
        <>
          <View style={styles.field}>
            <Text>ব্যাস ({isMeter ? 'মি' : 'ইঞ্চি'}):</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={diameter}
              onChangeText={setDiameter}
            />
          </View>
          <View style={styles.field}>
            <Text>উচ্চতা ({isMeter ? 'মি' : 'ফুট'}):</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={height}
              onChangeText={setHeight}
            />
          </View>
        </>
      ) : (
        <>
          <View style={styles.field}>
            <Text>দৈর্ঘ্য ({isMeter ? 'মি' : 'ফুট'}):</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={length}
              onChangeText={setLength}
            />
          </View>
          <View style={styles.field}>
            <Text>প্রস্থ ({isMeter ? 'মি' : 'ফুট'}):</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={width}
              onChangeText={setWidth}
            />
          </View>
          <View style={styles.field}>
            <Text>পুরুত্ব ({isMeter ? 'মি' : 'ইঞ্চি'}):</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={thickness}
              onChangeText={setThickness}
            />
          </View>
        </>
      )}

      <View style={styles.field}>
        <Text>মিশ্রণের অনুপাত:</Text>
        <Picker selectedValue={ratio} onValueChange={setRatio} style={styles.picker}>
          <Picker.Item label="1:2:4 (M15)" value="1:2:4" />
          <Picker.Item label="1:1.5:3 (M20)" value="1:1.5:3" />
          <Picker.Item label="1:3:6 (PCC)" value="1:3:6" />
        </Picker>
      </View>

      <View style={styles.field}>
        <Text>সিমেন্টের দাম /ব্যাগ (টাকা):</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={cementPrice}
          onChangeText={setCementPrice}
        />
      </View>
      <View style={styles.field}>
        <Text>বালির দাম / {isMeter ? 'ঘন মি' : 'ঘন ফুট'} (টাকা):</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={sandPrice}
          onChangeText={setSandPrice}
        />
      </View>
      <View style={styles.field}>
        <Text>খোয়ার দাম / {isMeter ? 'ঘন মি' : 'ঘন ফুট'} (টাকা):</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={aggregatePrice}
          onChangeText={setAggregatePrice}
        />
      </View>

      <View style={styles.result}>
        <Text style={styles.resultTitle}>🧾 ফলাফল:</Text>
        {results.volume && (
          <>
            <Text>কংক্রিট পরিমাণ: {results.volume} {results.volumeUnit}</Text>
            <Text>সিমেন্ট: {results.cement} ব্যাগ | দাম: {results.cementCost} টাকা</Text>
            <Text>বালি: {results.sandM3} ঘন মি ({results.sandCft} ঘন ফুট) | দাম: {results.sandCost} টাকা</Text>
            <Text>খোয়া: {results.aggM3} ঘন মি ({results.aggCft} ঘন ফুট) | দাম: {results.aggregateCost} টাকা</Text>
            <Text style={styles.total}>মোট খরচ: {results.totalCost} টাকা</Text>
          </>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 18, backgroundColor: '#F0F4F8' },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 12, color: '#2E4053', textAlign: 'center' },
  switchRow: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: 16 },
  active: { fontWeight: 'bold', marginHorizontal: 10, color: '#1B4F72' },
  inactive: { marginHorizontal: 10, color: '#7B7D7D' },
  field: { marginBottom: 14 },
  input: {
    borderWidth: 1,
    borderColor: '#BFC9CA',
    borderRadius: 6,
    backgroundColor: '#fff',
    padding: 10,
    marginTop: 4,
    fontSize: 16,
    ...Platform.select({ ios: { height: 36 } }),
  },
  picker: {
    marginTop: 4,
    backgroundColor: '#fff',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#BFC9CA',
  },
  result: { marginTop: 18, padding: 14, backgroundColor: '#D6EAF8', borderRadius: 8 },
  resultTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 8, color: '#154360' },
  total: { fontSize: 16, fontWeight: 'bold', marginTop: 8, color: '#0B5345' },
});

export default ConcreteCalculator;