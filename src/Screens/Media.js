import React, {useRef, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {Card, CardItem, Body, Footer} from 'native-base';
import Icons from 'react-native-vector-icons/FontAwesome';
import Iconss from 'react-native-vector-icons/Entypo';
import {Container, Header, Item, Input, Icon, Button} from 'native-base';
import YouTube from 'react-native-youtube';
import {YouTubeStandaloneAndroid} from 'react-native-youtube';
import UseMedia from './hooks/UseMedia';
import {useNavigation} from '@react-navigation/native';
import {Thumbnail} from 'react-native-thumbnail-video';
import Loader from 'react-native-multi-loader';

const Devotional = ({}) => {
  // const [id, setId] = useState(' ');
  const [loading, setLoading, getMedia, media] = UseMedia();
  const navigation = useNavigation();
  navigation.addListener('focus', () => {
    getMedia();
  });

  const Onclick = id => {
    YouTubeStandaloneAndroid.playVideo({
      apiKey: 'AIzaSyAM6yfUOmPL2D09Pubk3UYVB1Eruz3Bb5Q',
      videoId: id, // YouTube video ID
      autoplay: true, // Autoplay the video
      modestbranding: true,
    })
      .then(() => console.log('Standalone Player Exited'))
      .catch(errorMessage => console.error(errorMessage));
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView style={styles.container}>
        <View style={styles.group}>
          {media.map(data => {
            console.log(data);
            return (
              <TouchableOpacity
                activeOpacity={1}
                onPress={() => {
                  Onclick(data.video_link);
                }}
                style={styles.card}>
                <View style={styles.imageContainer}>
                  <Thumbnail
                    url={`https://www.youtube.com/watch?v=${data.video_link}`}
                    containerStyle={styles.image}
                    showPlayIcon={false}
                    onPress={() => {
                      null;
                    }}
                  />
                </View>
                <View style={styles.details}>
                  <View>
                    <Text style={styles.title}>{data.title}</Text>
                    <Text
                      numberOfLines={3}
                      ellipsizeMode="tail"
                      style={styles.body}>
                      {data.description}
                    </Text>
                  </View>
                  <View style={styles.next}>
                    <Icons
                      name="play-circle"
                      size={40}
                      onPress={() => {
                        Onclick(data.video_link);
                      }}
                    />
                    {data.type === 'Live' && (
                      <Text style={{padding: 10, color: 'red'}}>
                        <Iconss name="dot-single" size={20} color="red" />
                        Live
                      </Text>
                    )}
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
      <Card style={styles.search}>
        <Item>
          <Icon name="ios-search" />
          <Input placeholder="Search Media" />
          <Icon name="ios-arrow-round-forward" />
        </Item>
      </Card>
      <Loader
        visible={loading}
        loaderType="bars"
        textType="none"
        sizeLoader="small"
        sizeText={heightPercentageToDP('1.75%')}
      />
    </SafeAreaView>
  );
};

export default Devotional;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageContainer: {
    // backgroundColor: 'grey',
    zIndex: -1111,
  },
  image: {
    height: heightPercentageToDP('25%'),
    width: widthPercentageToDP('85%'),
    alignSelf: 'center',
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 3,
    position: 'relative',
    top: 20,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    zIndex: -1,
  },
  group: {
    alignItems: 'center',
    // paddingVertical: 20,
  },
  card: {
    width: widthPercentageToDP('93%'),
    borderRadius: 5,
    // flexDirection: 'row',
  },
  search: {
    width: widthPercentageToDP('100%'),
    borderRadius: 5,
    alignSelf: 'center',
    borderWidth: 1,
    padding: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  details: {
    height: heightPercentageToDP('13%'),
    flexDirection: 'row',
    alignSelf: 'center',
    padding: 7,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    width: widthPercentageToDP('88%'),
    borderBottomLeftRadius: 10,
    borderBottomEndRadius: 10,
  },
  title: {
    fontSize: heightPercentageToDP('2.25%'),
    width: widthPercentageToDP('42%'),
  },
  body: {
    fontSize: heightPercentageToDP('1.525%'),
    width: widthPercentageToDP('47%'),
    // height: heightPercentageToDP('5%'),
    textAlign: 'justify',
    // flexShrink: 1,
  },
  next: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: widthPercentageToDP('23%'),
    alignItems: 'center',
  },
});
