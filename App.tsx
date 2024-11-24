import React, {useState} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {HomeScreen} from './src/HomeScreen';
import {CallScreen} from './src/CallScreen';
import {
  StreamVideo,
  StreamVideoClient,
} from '@stream-io/video-react-native-sdk';

// Get api key from dashboard
const apiKey = '{YOUR_API_KEY}';
const user = {id: 'jane_doe', name: 'Ali', image: 'https://robohash.org/John'};

// Generate Token from here: https://getstream.io/chat/docs/react/token_generator/
const token = '{YOUR_TOKEN}';

const callId = 'Dc5OTFLmH9bVPPP';

const client = new StreamVideoClient({apiKey, user, token});

export default function App() {
  const [activeScreen, setActiveScreen] = useState('home');
  const goToCallScreen = () => setActiveScreen('call-screen');
  const goToHomeScreen = () => setActiveScreen('home');

  return (
    <StreamVideo client={client}>
      <SafeAreaView style={styles.container}>
        {activeScreen === 'call-screen' ? (
          <CallScreen goToHomeScreen={goToHomeScreen} callId={callId} />
        ) : (
          <HomeScreen goToCallScreen={goToCallScreen} />
        )}
      </SafeAreaView>
    </StreamVideo>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
