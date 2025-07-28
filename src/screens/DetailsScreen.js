// DetailsScreen.js
import * as React from 'react';
import { Button, View, Text } from 'react-native';

function DetailsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>ডিটেইলস স্ক্রিন</Text>
      <Button
        title="ফিরে যান"
        onPress={() => navigation.goBack()}
      />
    </View>
  );
}

export default DetailsScreen;