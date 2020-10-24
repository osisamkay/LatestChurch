import React from 'react';
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
import {Container, Header, Item, Input, Icon, Button} from 'native-base';
import useDevotion from './hooks/useDevotion';
import {useNavigation} from '@react-navigation/native';
import moment from 'moment';
import {useDispatch} from 'react-redux';
import {mediaData} from './Onboarding/Login/Action/Action';
import Loader from 'react-native-multi-loader';

const Devotional = () => {
  const [loading, setLoading, getDevotion, devotion] = useDevotion();
  const navigation = useNavigation();
  navigation.addListener('focus', () => {
    getDevotion();
  });
  const dispatch = useDispatch();

  return (
    <SafeAreaView style={{flex: 1}}>
      <Item rounded style={styles.search}>
        <Icon name="ios-search" />
        <Input placeholder="Search" />
        <Icon name="ios-arrow-round-forward" />
      </Item>
      <ScrollView style={styles.container}>
        <View style={styles.group}>
          {devotion.map(data => {
            return (
              <TouchableOpacity
                onPress={() => {
                  let datas = {
                    file: data.file,
                    cover_photo: data.cover_photo,
                    title: data.cover_photo,
                    id: 1,
                  };
                  dispatch(mediaData(datas));
                  navigation.navigate('Player');
                }}>
                <Card style={styles.card}>
                  <View style={styles.imageContainer}>
                    <Image
                      source={{uri: `${data.cover_photo}`}}
                      style={styles.image}
                      resizeMode="stretch"
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
                      <Text>{moment(data.created_at).fromNow()}</Text>

                      <Icons name="long-arrow-right" size={25} />
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

export default Devotional;

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
    backgroundColor: 'grey',
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
    flexDirection: 'row',
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
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
});
