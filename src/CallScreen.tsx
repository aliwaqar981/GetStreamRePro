import React, {useEffect} from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import {
  Call,
  StreamCall,
  useStreamVideoClient,
  useCallStateHooks,
  CallingState,
  CallContent,
} from '@stream-io/video-react-native-sdk';

type Props = {goToHomeScreen: () => void; callId: string};

export const CallScreen = ({goToHomeScreen, callId}: Props) => {
  const [call, setCall] = React.useState<Call | null>(null);
  const client = useStreamVideoClient();

  useEffect(() => {
    const _call = client?.call('default', callId);
    _call?.join({create: true}).then(() => setCall(_call));
  }, [client, callId]);

  useEffect(() => {
    return () => {
      // cleanup the call on unmount if the call was not left already
      if (call?.state.callingState !== CallingState.LEFT) {
        call?.leave();
      }
    };
  }, [call]);

  if (!call) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Joining call...</Text>
      </View>
    );
  }

  return (
    <StreamCall call={call}>
      <View style={styles.container}>
        <Text style={styles.text}>Here we will add Video Calling UI</Text>
        <Button title="Go back" onPress={goToHomeScreen} />
        <ParticipantCountText />
        <CallContent onHangupCallHandler={goToHomeScreen} />
      </View>
    </StreamCall>
  );
};

const ParticipantCountText = () => {
  const {useParticipantCount} = useCallStateHooks();
  const participantCount = useParticipantCount();
  return (
    <Text style={styles.text}>Call has {participantCount} participants</Text>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  text: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
});
