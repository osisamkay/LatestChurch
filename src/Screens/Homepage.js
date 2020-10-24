import React, {useEffect} from 'react';
import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  Dimensions,
  Image,
  ScrollView,
  SafeAreaView,
  ImageBackground,
} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import ViewSlider from 'react-native-view-slider';
import Carousel, {Pagination} from 'react-native-x-carousel';
import {Card} from 'native-base';
import Icons from 'react-native-vector-icons/Ionicons';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import useBanners from './hooks/useBanners';
const {width, height} = Dimensions.get('window');

const Homepage = () => {
  const [loading, setLoading, getBanners, banners] = useBanners();
  useEffect(() => {
    SplashScreen.hide();
  }, []);
  const {userData, isLogged, playerCalled, signal} = useSelector(
    state => state.LoginReducer,
  );

  const navigation = useNavigation();
  navigation.addListener('focus', () => {
    getBanners();
  });

  useEffect(() => {
    if (signal) {
      navigation.navigate('Notifications');
    }
  }, [navigation, signal]);

  const Data = [
    {title: 'Media'},
    {title: 'Sermons'},
    {title: 'Audio Livestream'},
    {title: 'In His Presence'},
    {title: 'Beacon'},
    {title: 'Our Services'},
    {title: 'Church Units'},
    {title: 'Quiz'},
  ];
  const renderItem = data => (
    <View style={styles.viewBox}>
      <Image
        source={{
          uri: data.pic,
        }}
        // source={require(`${datas.pic}`)}
        style={{height: 200, width}}
      />
    </View>
  );

  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar
        barStyle="light-content"
        hidden={false}
        backgroundColor="#000"
        translucent={true}
      />
      <Carousel
        pagination={Pagination}
        renderItem={renderItem}
        data={banners}
        autoplay={true}
        autoplayInterval={5000}
      />
      <ImageBackground
        source={require('../../assets/church5.jpeg')}
        style={styles.image}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.botcontainer}>
          {Data.map(data => {
            return (
              <TouchableOpacity
                onPress={() => {
                  data.title === 'In His Presence'
                    ? navigation.navigate('Devotional')
                    : data.title === 'Media'
                    ? navigation.navigate('Media')
                    : data.title === 'Sermons'
                    ? navigation.navigate('Podcast')
                    : data.title === 'Our Services'
                    ? navigation.navigate('OurServices')
                    : data.title === 'Church Units'
                    ? navigation.navigate('Units')
                    : data.title === 'Beacon'
                    ? navigation.navigate('Beacon')
                    : data.title === 'Quiz'
                    ? navigation.navigate('Quiz')
                    : data.title === 'Audio Livestream'
                    ? navigation.navigate('Audio')
                    : '';
                }}>
                <View style={styles.drawerCards}>
                  <Icons
                    name={
                      data.title === 'Media'
                        ? 'ios-play-circle'
                        : data.title === 'Sermons'
                        ? 'ios-bookmarks'
                        : data.title === 'Audio Livestream'
                        ? 'ios-headset'
                        : data.title === 'In His Presence'
                        ? 'md-microphone'
                        : data.title === 'Offering'
                        ? 'ios-cash'
                        : data.title === 'Church Units'
                        ? 'md-people'
                        : data.title === 'Our Services'
                        ? 'ios-calendar'
                        : data.title === 'Quiz'
                        ? 'ios-help-circle'
                        : data.title === 'Beacon'
                        ? 'ios-paper'
                        : 'ios-people'
                    }
                    size={60}
                  />
                  <Text style={styles.Label}>{data.title}</Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  viewBox: {
    paddingHorizontal: 20,
    justifyContent: 'center',
    width: width,
    padding: 10,
    alignItems: 'center',
    height: 200,
  },
  slider: {
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  dotContainer: {
    backgroundColor: 'transparent',
    position: 'absolute',
    bottom: 15,
  },
  botcontainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 23,
    borderBottomColor: 'rgba(255, 255, 255, .25)',
    backgroundColor: 'rgba(0,0,0,.45)',
  },
  name: {
    fontFamily: 'GT Walsheim Pro Regular Regular',
    fontSize: 20,
    color: 'white',
    width: widthPercentageToDP('42%'),
  },
  number: {
    fontFamily: 'GT Walsheim Pro Regular Regular',
    fontSize: 12,
    color: 'white',
  },
  Label: {
    color: '#000',
    fontSize: heightPercentageToDP('2.3%'),
    textAlign: 'center',
    fontFamily: 'GT Walsheim Pro Regular Regular',
  },
  imaged: {
    width: widthPercentageToDP('50%'),
    height: heightPercentageToDP('15.5%'),
    // borderRadius: 100,
    marginRight: 10,
  },
  drawerCards: {
    width: widthPercentageToDP('40%'),
    height: heightPercentageToDP('20%'),
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    marginBottom: 23,
    backgroundColor: 'rgba(255,255,255,.7)',
    shadowColor: 'rgba(0,0,0,.1)',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  image: {
    flex: 1,

    resizeMode: 'contain',
    justifyContent: 'center',
  },
});

export default Homepage;
