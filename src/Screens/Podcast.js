import React, {useState} from 'react';
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
import {Card} from 'native-base';
import Icons from 'react-native-vector-icons/FontAwesome';
import {
  Container,
  Header,
  Item,
  Input,
  Icon,
  Picker,
  Button,
} from 'native-base';
import Iconss from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';
import usePodcast from './hooks/usePodcast';
import Loader from 'react-native-multi-loader';
import {useDispatch} from 'react-redux';
import {mediaData} from './Onboarding/Login/Action/Action';

const Podcast = () => {
  const [selected, setSelected] = useState('1');
  const [data, setData] = useState({});
  const [
    loading,
    setLoading,
    getPodcast,
    podcast,
    episodes,
    getEpisodes,
  ] = usePodcast();
  const navigation = useNavigation();
  navigation.addListener('focus', () => {
    getPodcast();
  });
  const dispatch = useDispatch();
  function onValueChange2(value) {
    setSelected(value);
    getEpisodes(value);
  }
  const dataPush = data => {
    let datas = {
      file: data.file,
      cover_photo: data.cover_photo,
      title: data.cover_photo,
      id: 1,
    };
    dispatch(mediaData(datas));
    navigation.navigate('Player');
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <Item style={styles.search} picker>
        <Picker
          mode="dropdown"
          iosIcon={<Icon name="arrow-down" />}
          placeholder="Select your SIM"
          placeholderStyle={{color: '#bfc6ea'}}
          placeholderIconColor="#007aff"
          selectedValue={selected}
          onValueChange={onValueChange2}>
          <Picker.Item label="Select Channel" value={selected} />
          {podcast.map(data => {
            return <Picker.Item label={data.title} value={data.id} />;
          })}
        </Picker>
      </Item>

      <ScrollView style={styles.container}>
        <View style={styles.group}>
          {episodes.map(data2 => {
            console.log(data2);
            return (
              <TouchableOpacity
                onPress={() => {
                  let datas = {
                    file: data2.enclosure_url,
                    cover_photo: data2.cover_photo,
                    title: data2.title,
                  };
                  dispatch(mediaData(datas));
                  navigation.navigate('Player');
                }}>
                <Card style={styles.card}>
                  <View style={styles.imageContainer}>
                    <Image
                      source={require('../../assets/How-to-Evaluate-your-sermon-before-you-preach-it.jpg')}
                      style={styles.image}
                      resizeMode="stretch"
                    />
                  </View>
                  <View style={styles.details}>
                    <View>
                      <Text style={styles.title}>{data2.title}</Text>
                      <Text
                        numberOfLines={3}
                        ellipsizeMode="tail"
                        style={styles.body}>
                        {data2.description}
                      </Text>
                    </View>

                    <View style={styles.next}>
                      <Icons
                        name="play-circle"
                        size={40}
                        style={{marginLeft: 10}}
                      />
                    </View>
                  </View>
                </Card>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
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

export default Podcast;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageContainer: {
    height: heightPercentageToDP('20%'),
    width: widthPercentageToDP('40%'),
    // backgroundColor: 'grey',
    padding: 7,
  },
  image: {
    height: heightPercentageToDP('18%'),
    width: widthPercentageToDP('40%'),
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 3,
  },
  group: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  card: {
    width: widthPercentageToDP('93%'),
    borderRadius: 5,
    flexDirection: 'row',
  },
  search: {
    width: widthPercentageToDP('93%'),
    borderRadius: 5,
    alignSelf: 'center',
    borderWidth: 1,
    padding: 4,
    marginTop: 20,
    marginBottom: 7,
  },
  details: {
    marginLeft: 7,
    padding: 7,
    justifyContent: 'space-between',
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
    justifyContent: 'flex-end',
    flexDirection: 'row',
    // width: widthPercentageToDP('23%'),
  },
});
