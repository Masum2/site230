import React from 'react';
import { 
  Text, 
  View, 
  TouchableOpacity, 
  Linking, 
  Alert,
  Platform,
  PermissionsAndroid,
  StyleSheet
} from 'react-native';
import Tts from 'react-native-tts';

const HelpMe = () => {
  const handleHelpButton = async () => {
    try {
      // Initialize TTS
      Tts.setDefaultLanguage('en-US');
      
      // Request microphone permission on Android if needed
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
          {
            title: 'Microphone Permission',
            message: 'App needs microphone for voice feature',
            buttonNeutral: 'Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          }
        );
        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          Alert.alert('Permission denied', 'Cannot use voice without permission');
          return;
        }
      }

      // Speak "Help Me" and then initiate call
      Tts.speak('Help Me', {
        onDone: () => {
          // Call the specified number after voice finishes
          Linking.openURL('tel:01798338318')
            .catch(err => {
              Alert.alert('Error', 'Failed to make the call');
              console.error('Call failed:', err);
            });
        },
        onError: (error) => {
          console.error('Voice error:', error);
        }
      });
      
    } catch (error) {
      Alert.alert('Error', 'Something went wrong');
      console.error('Error:', error);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        onPress={handleHelpButton}
        style={styles.helpButton}
      >
        <Text style={styles.buttonText}>Emergency Help</Text>
        <Text style={styles.buttonSubtext}>Press to call for help</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    padding: 20
  },
  helpButton: {
    backgroundColor: '#e74c3c',
    paddingVertical: 25,
    paddingHorizontal: 40,
    borderRadius: 15,
    width: '100%',
    maxWidth: 300,
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 5
  },
  buttonSubtext: {
    color: 'white',
    fontSize: 14,
    opacity: 0.9
  }
});

export default HelpMe;