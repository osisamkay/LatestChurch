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
import useMinisters from './hooks/useMinisters';

const Ministers = () => {
  const [selected, setSelected] = useState('1');
  const [loading, setLoading, grtMinisters, ministers] = useMinisters();
  const navigation = useNavigation();
  navigation.addListener('focus', () => {
    grtMinisters();
  });

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView style={styles.container}>
        <View style={styles.group}>
          {ministers.map(data => {
            console.log(data);
            return (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('ministers', {data: data});
                }}>
                <Card style={styles.card}>
                  <View style={styles.imageContainer}>
                    <Image
                      source={{uri: data.pic}}
                      style={styles.image}
                      resizeMode="stretch"
                    />
                  </View>
                  <View style={styles.details}>
                    <View>
                      <Text style={styles.title}>Name:{data.name}</Text>
                      <Text
                        numberOfLines={3}
                        ellipsizeMode="tail"
                        style={styles.body}>
                        {data.bio_data}
                      </Text>
                    </View>

                    <View style={styles.next}>
                      <Icons
                        name="arrow-right"
                        size={20}
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

export default Ministers;

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
