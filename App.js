import { useEffect, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Animated,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { Audio } from 'expo-av';

// ── Configure your 8 pads here ──────────────────────────────────────────────
// Replace the `sound` paths with your own files inside assets/sounds/
// Supported formats: .mp3, .wav, .m4a
const PADS = [
  { id: 1, label: 'Sound 1', color: '#E74C3C', sound: require('./assets/sounds/sound1.mp3') },
  { id: 2, label: 'Sound 2', color: '#E67E22', sound: require('./assets/sounds/sound2.mp3') },
  { id: 3, label: 'Sound 3', color: '#F1C40F', sound: require('./assets/sounds/sound3.mp3') },
  { id: 4, label: 'Sound 4', color: '#2ECC71', sound: require('./assets/sounds/sound4.mp3') },
  { id: 5, label: 'Sound 5', color: '#1ABC9C', sound: require('./assets/sounds/sound5.mp3') },
  { id: 6, label: 'Sound 6', color: '#3498DB', sound: require('./assets/sounds/sound6.mp3') },
  { id: 7, label: 'Sound 7', color: '#9B59B6', sound: require('./assets/sounds/sound7.mp3') },
  { id: 8, label: 'Sound 8', color: '#E91E8C', sound: require('./assets/sounds/sound8.mp3') },
];
// ────────────────────────────────────────────────────────────────────────────

function Pad({ pad }) {
  const scale = useRef(new Animated.Value(1)).current;
  const soundRef = useRef(null);

  useEffect(() => {
    return () => {
      if (soundRef.current) soundRef.current.unloadAsync();
    };
  }, []);

  const handlePress = async () => {
    // Animate press
    Animated.sequence([
      Animated.timing(scale, { toValue: 0.92, duration: 80, useNativeDriver: true }),
      Animated.timing(scale, { toValue: 1, duration: 120, useNativeDriver: true }),
    ]).start();

    try {
      // Stop & unload previous playback so rapid taps restart the sound
      if (soundRef.current) {
        await soundRef.current.stopAsync();
        await soundRef.current.unloadAsync();
        soundRef.current = null;
      }

      await Audio.setAudioModeAsync({ playsInSilentModeIOS: true });
      const { sound } = await Audio.Sound.createAsync(pad.sound);
      soundRef.current = sound;
      await sound.playAsync();
    } catch (e) {
      console.warn(`Could not play ${pad.label}:`, e.message);
    }
  };

  return (
    <Animated.View style={[styles.padWrapper, { transform: [{ scale }] }]}>
      <TouchableOpacity
        style={[styles.pad, { backgroundColor: pad.color }]}
        onPress={handlePress}
        activeOpacity={0.85}
      >
        <Text style={styles.padLabel}>{pad.label}</Text>
      </TouchableOpacity>
    </Animated.View>
  );
}

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <Text style={styles.title}>🎛️ Soundboard</Text>
      <View style={styles.grid}>
        {PADS.map((pad) => (
          <Pad key={pad.id} pad={pad} />
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
    alignItems: 'center',
    paddingTop: 20,
  },
  title: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 24,
    letterSpacing: 1,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    paddingHorizontal: 12,
    gap: 14,
  },
  padWrapper: {
    width: '45%',
  },
  pad: {
    height: 120,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 8,
  },
  padLabel: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
});
