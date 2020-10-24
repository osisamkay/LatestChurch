import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {Card} from 'native-base';
import Icons from 'react-native-vector-icons/FontAwesome';
import {Container, Header, Item, Input, Icon, Button} from 'native-base';
import {useNavigation} from '@react-navigation/native';
import useBeacons from './hooks/useBeacons';
import Moment from 'react-moment';
import Loader from 'react-native-multi-loader';

export default function Beacon() {
  const [filter, setFilter] = useState(' ');
  const [loading, setLoading, getBeacon, beacon] = useBeacons();
  const navigation = useNavigation();
  navigation.addListener('focus', () => {
    getBeacon();
  });
  const filteredItems = beacon.filter(item =>
    item.title.toLocaleLowerCase().includes(filter.toLocaleLowerCase()),
  );
  return (
    <SafeAreaView style={{flex: 1}}>
      <Item rounded style={styles.search}>
        <Icon name="ios-search" />
        <Input
          placeholder="Search Beacon"
          value={filter}
          onChangeText={val => {
            setFilter(val);
          }}
        />
        <Icon name="ios-arrow-round-forward" />
      </Item>
      <ScrollView style={styles.container}>
        <View style={styles.group}>
          {filteredItems.map(data => {
            console.log(data);
            return (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('pdf', {file: data.file});
                }}>
                <Card style={styles.card}>
                  <View style={styles.details}>
                    <View>
                      <Text style={styles.title}>{data.title}</Text>
                    </View>
                    <View style={styles.next}>
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
}

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
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: heightPercentageToDP('2.25%'),
    width: widthPercentageToDP('42%'),
  },
  body: {
    fontSize: heightPercentageToDP('1.525%'),
    // width: widthPercentageToDP('47%'),
    // height: heightPercentageToDP('5%'),
    textAlign: 'justify',
    // flexShrink: 1,
  },
  next: {
    // justifyContent: 'space-between',
    // flexDirection: 'row',
    // width: widthPercentageToDP('30%'),
    // alignItems: 'center',
  },
  pdf: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});
