import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, ScrollView, Switch, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const BrickCalculator = () => {
  // State variables
  const [workType, setWorkType] = useState('wall10');
  const [length, setLength] = useState('');
  const [height, setHeight] = useState('');
  const [brickRate, setBrickRate] = useState('');
  const [sandRate, setSandRate] = useState('');
  const [cementRate, setCementRate] = useState('');
  const [mortarRatio, setMortarRatio] = useState('1:4');
  const [isFeet, setIsFeet] = useState(false);

  // Results
  const [totalBricks, setTotalBricks] = useState(0);
  const [totalSand, setTotalSand] = useState(0);
  const [totalCement, setTotalCement] = useState(0);
  const [brickCost, setBrickCost] = useState(0);
  const [sandCost, setSandCost] = useState(0);
  const [cementCost, setCementCost] = useState(0);
  const [totalCost, setTotalCost] = useState(0);

  // BuildPro standard rates (সকল m² এর জন্য)
  const STANDARD_RATES = {
    wall10: { bricks: 41, cement: 0.525, sand: 0.07 },
    wall5: { bricks: 82, cement: 0.525, sand: 0.07 },
    wall3: { bricks: 123, cement: 0.525, sand: 0.07 },
    floor: { bricks: 50, cement: 0.075, sand: 0.03 },
    herringbone: { bricks: 52, cement: 0.075, sand: 0.03 }
  };

  useEffect(() => {
    calculate();
  }, [workType, length, height, brickRate, sandRate, cementRate, mortarRatio, isFeet]);

  const calculate = () => {
    let l = parseFloat(length) || 0;
    let h = parseFloat(height) || 0;
    const brickPrice = parseFloat(brickRate) || 0;
    const sandPrice = parseFloat(sandRate) || 0;
    const cementPrice = parseFloat(cementRate) || 0;

    // Convert feet → মিটার (যদি প্রয়োজন হয়)
    if (isFeet) {
      l *= 0.3048;
      h *= 0.3048;
    }

    const area = l * h;
    const rates = STANDARD_RATES[workType];

    // ইটের সংখ্যা
    const bricks = area * rates.bricks;

    let cementBags = 0;
    let sand = 0;

    if (['wall10', 'wall5', 'wall3'].includes(workType)) {
      const [cementPart, sandPart] = mortarRatio.split(':').map(Number);

      const baseCement = rates.cement; // ০.৫২৫ ব্যাগ/m² (১ : ৪)
      const baseSand = rates.sand;     // ০.০৭ m³/m² (১ : ৪)

      // সঠিক স্কেল ফ্যাক্টর
      const cementFactor = (5 * cementPart) / (cementPart + sandPart);
      const sandFactor = (5 * sandPart) / (4 * (cementPart + sandPart));

      cementBags = area * baseCement * cementFactor;
      sand = area * baseSand * sandFactor;
    }

    // ইউনিট অনুযায়ী সঠিক ফলাফল
    let sandOut = sand;
    if (isFeet) sandOut = sand * 35.3147;

    // খরচ গণনা
    const totalBrickCost = bricks * brickPrice;
    const totalSandCost = sandOut * sandPrice;
    const totalCementCost = cementBags * cementPrice;

    // State আপডেট
    setTotalBricks(Math.ceil(bricks));
    setTotalSand(sandOut.toFixed(2));
    setTotalCement(cementBags.toFixed(2));
    setBrickCost(totalBrickCost.toFixed(2));
    setSandCost(totalSandCost.toFixed(2));
    setCementCost(totalCementCost.toFixed(2));
    setTotalCost((totalBrickCost + totalSandCost + totalCementCost).toFixed(2));
  };

  // UI Helper functions
  const renderLengthLabel = () => {
    const unit = isFeet ? 'ফুট' : 'মিটার';
    return workType === 'floor' ? `সলিং এর দৈর্ঘ্য (${unit})` :
           workType === 'herringbone' ? `হেরিংবোনের দৈর্ঘ্য (${unit})` :
           `দেওয়ালের দৈর্ঘ্য (${unit})`;
  };
  const renderHeightLabel = () => {
    const unit = isFeet ? 'ফুট' : 'মিটার';
    return workType === 'floor' ? `সলিং এর প্রস্থ (${unit})` :
           workType === 'herringbone' ? `হেরিংবোনের প্রস্থ (${unit})` :
           `দেওয়ালের উচ্চতা (${unit})`;
  };
  const renderSandUnit = () => (isFeet ? 'ঘনফুট' : 'ঘনমিটার');

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>স্থানীয় ইটের কাজের হিসাব (BuildPro পদ্ধতি)</Text>

      <View style={styles.unitSelector}>
        <Text>একক:</Text>
        <View style={styles.unitToggle}>
          <Text>মিটার</Text>
          <Switch value={isFeet} onValueChange={setIsFeet} />
          <Text>ফুট</Text>
        </View>
      </View>

      <Text style={styles.label}>কাজের ধরন:</Text>
      <View style={styles.pickerContainer}>
        <Picker selectedValue={workType} onValueChange={setWorkType}>
          <Picker.Item label="ফ্লাট সলিং" value="floor" />
          <Picker.Item label="হেরিংবোন বন্ড" value="herringbone" />
          <Picker.Item label="১০ ইঞ্চি দেওয়াল" value="wall10" />
          <Picker.Item label="৫ ইঞ্চি দেওয়াল" value="wall5" />
          <Picker.Item label="৩ ইঞ্চি দেওয়াল" value="wall3" />
        </Picker>
      </View>

      <Text style={styles.label}>{renderLengthLabel()}:</Text>
      <TextInput style={styles.input} keyboardType="numeric" value={length} onChangeText={setLength} placeholder="দৈর্ঘ্য লিখুন" />

      <Text style={styles.label}>{renderHeightLabel()}:</Text>
      <TextInput style={styles.input} keyboardType="numeric" value={height} onChangeText={setHeight} placeholder="উচ্চতা/প্রস্থ লিখুন" />

      {['wall10', 'wall5', 'wall3'].includes(workType) && (
        <>
          <Text style={styles.label}>মসলার অনুপাত:</Text>
          <View style={styles.pickerContainer}>
            <Picker selectedValue={mortarRatio} onValueChange={setMortarRatio}>
              <Picker.Item label="১:৩" value="1:3" />
              <Picker.Item label="১:৪" value="1:4" />
              <Picker.Item label="১:৫" value="1:5" />
              <Picker.Item label="১:৬" value="1:6" />
            </Picker>
          </View>
        </>
      )}

      <Text style={styles.label}>প্রতি ইটের দাম (টাকা):</Text>
      <TextInput style={styles.input} keyboardType="numeric" value={brickRate} onChangeText={setBrickRate} placeholder="ইটের দাম লিখুন" />

      <Text style={styles.label}>প্রতি ব্যাগ সিমেন্টের দাম (টাকা):</Text>
      <TextInput style={styles.input} keyboardType="numeric" value={cementRate} onChangeText={setCementRate} placeholder="সিমেন্টের দাম লিখুন" />

      <Text style={styles.label}>প্রতি {renderSandUnit()} বালির দাম (টাকা):</Text>
      <TextInput style={styles.input} keyboardType="numeric" value={sandRate} onChangeText={setSandRate} placeholder="বালির দাম লিখুন" />

      <View style={styles.resultBox}>
        <Text style={styles.resultTitle}>মালামালের পরিমাণ</Text>
        <Text style={styles.resultItem}>ইট: <Text style={styles.resultValue}>{totalBricks} টি</Text></Text>
        <Text style={styles.resultItem}>সিমেন্ট: <Text style={styles.resultValue}>{totalCement} ব্যাগ</Text></Text>
        <Text style={styles.resultItem}>বালি: <Text style={styles.resultValue}>{totalSand} {renderSandUnit()}</Text></Text>
      </View>

      <View style={[styles.resultBox, styles.costBox]}>
        <Text style={styles.resultTitle}>খরচের বিবরণ</Text>
        <Text style={styles.resultItem}>ইটের খরচ: <Text style={styles.resultValue}>{brickCost} টাকা</Text></Text>
        <Text style={styles.resultItem}>সিমেন্টের খরচ: <Text style={styles.resultValue}>{cementCost} টাকা</Text></Text>
        <Text style={styles.resultItem}>বালির খরচ: <Text style={styles.resultValue}>{sandCost} টাকা</Text></Text>
        <Text style={styles.totalCost}>মোট খরচ: {totalCost} টাকা</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#f5f5f5' },
  header: { fontSize: 20, fontWeight: 'bold', textAlign: 'center', marginVertical: 10, color: '#333' },
  unitSelector: { flexDirection: 'row', alignItems: 'center', marginBottom: 15 },
  unitToggle: { flexDirection: 'row', alignItems: 'center', marginLeft: 10 },
  label: { fontSize: 16, marginBottom: 5, color: '#444' },
  input: { height: 40, borderColor: '#ccc', borderWidth: 1, borderRadius: 5, paddingHorizontal: 10, marginBottom: 15, backgroundColor: '#fff' },
  pickerContainer: { borderWidth: 1, borderColor: '#ccc', borderRadius: 5, marginBottom: 15, backgroundColor: '#fff' },
  resultBox: { backgroundColor: '#fff', padding: 15, borderRadius: 5, borderWidth: 1, borderColor: '#ddd', marginBottom: 15 },
  costBox: { backgroundColor: '#f0f8ff', borderColor: '#d0e3ff' },
  resultTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10, color: '#333' },
  resultItem: { fontSize: 16, marginBottom: 5, color: '#555' },
  resultValue: { fontWeight: 'bold', color: '#0066cc' },
  totalCost: { fontSize: 17, fontWeight: 'bold', marginTop: 10, color: '#e91e63' },
});



export default BrickCalculator;