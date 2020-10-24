import React, {useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import {useSelector} from 'react-redux';
import {
  widthPercentageToDP,
  heightPercentageToDP,
} from 'react-native-responsive-screen';
import Icons from 'react-native-vector-icons/AntDesign';
import Iconss from 'react-native-vector-icons/FontAwesome';
import Sound from 'react-native-sound';
import moment from 'moment';

export default function Players({navigation}) {
  const {mediaData} = useSelector(state => state.LoginReducer);

  Sound.setCategory('Playback');

  let whoosh = new Sound(mediaData.file, '', error => {
    if (error) {
      console.log('failed to load the sound', error);
      return;
    }
    // loaded successfully
    console.log(
      'duration in seconds: ' +
        whoosh.getDuration() +
        'number of channels: ' +
        whoosh.getNumberOfChannels(),
    );

    // Play the sound with an onEnd callback
    whoosh.play(success => {
      if (success) {
        whoosh.release();
        console.log('successfully finished playing');
      } else {
        console.log('playback failed due to audio decoding errors');
      }
    });
  });
  // Reduce the volume by half
  whoosh.setVolume(0.5);

  // Position the sound to the full right in a stereo field
  whoosh.setPan(1);

  // Loop indefinitely until stop() is called
  whoosh.setNumberOfLoops(-1);

  // Get properties of the player instance
  console.log('volume: ' + whoosh.getVolume());
  console.log('pan: ' + whoosh.getPan());
  console.log('loops: ' + whoosh.getNumberOfLoops());

  // Seek to a specific point in seconds
  whoosh.setCurrentTime(2.5);

  // Get the current playback point in seconds

  useEffect(() => {
    whoosh.getCurrentTime(seconds => console.log('at ' + seconds));
  }, [whoosh]);

  useEffect(() => {
    return () => {
      Stop();
      whoosh.release();
    };
  }, []);

  // Stop the sound and rewind to the beginning
  whoosh.stop(() => {
    // Note: If you want to play a sound after stopping and rewinding it,
    // it is important to call play() in a callback.
    whoosh.play();
  });

  const Play = () => {
    whoosh.play();
  };
  const Stop = () => {
    whoosh.stop();
  };
  const Pause = () => {
    // Pause the sound
    whoosh.pause();
  };
  const Fwrd = () => {
    whoosh.stop(() => {
      // Note: If you want to play a sound after stopping and rewinding it,
      // it is important to call play() in a callback.
      whoosh.setCurrentTime(2.5);
    });
  };
  // Release the audio player resource
  whoosh.release();

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}>
      <ScrollView contentContainerStyle={styles.container}>
        <View>
          <Image
            source={{
              uri: mediaData.cover_photo,
            }}
            style={styles.img}
          />
        </View>
        <View style={styles.BtnContainer}>
          {/* <TouchableOpacity>
            <Icons name="stepbackward" size={heightPercentageToDP('6%')} />
          </TouchableOpacity> */}

          <TouchableOpacity onPress={Pause}>
            <Icons name="pausecircle" size={heightPercentageToDP('6%')} />
          </TouchableOpacity>
          <TouchableOpacity onPress={Play}>
            <Icons name="play" size={heightPercentageToDP('6%')} />
          </TouchableOpacity>
          <TouchableOpacity onPress={Stop}>
            <Iconss name="stop" size={heightPercentageToDP('6%')} />
          </TouchableOpacity>
          {/* <TouchableOpacity onPress={Fwrd}>
            <Icons name="stepforward" size={heightPercentageToDP('6%')} />
          </TouchableOpacity> */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    width: widthPercentageToDP('80%'),
    height: heightPercentageToDP('45%'),
    resizeMode: 'stretch',
    borderRadius: 10,
    backgroundColor: 'grey',
  },
  BtnContainer: {
    flexDirection: 'row',
    width: widthPercentageToDP('80%'),
    justifyContent: 'space-between',
    marginVertical: 20,
    alignItems: 'center',
  },
});
