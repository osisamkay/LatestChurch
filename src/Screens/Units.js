import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  ScrollView,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {Card} from 'native-base';

import Loader from 'react-native-multi-loader';
import useUnits from './hooks/useUnits';
import {useNavigation} from '@react-navigation/native';

export default function Units() {
  const [loading, setLoading, getUnits, units] = useUnits();
  const navigation = useNavigation();
  navigation.addListener('focus', () => {
    getUnits();
  });
  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView style={styles.container}>
        <View style={styles.group}>
          {units.map(data => {
            console.log(data);
            return (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('unitDetails', {
                    detail: data.description,
                    title: data.title,
                    id: data.id,
                    cover_photo: data.cover_photo,
                  });
                }}>
                <Card style={styles.card}>
                  <View style={styles.imageContainer}>
                    <Image
                      source={{uri: data.cover_photo}}
                      style={styles.image}
                      resizeMode="stretch"
                    />
                  </View>
                  <View style={styles.details}>
                    <View>
                      <Text style={styles.title}>{data.title}</Text>
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
    height: heightPercentageToDP('8%'),
    width: widthPercentageToDP('18%'),
    // backgroundColor: 'grey',
    padding: 7,
  },
  image: {
    height: heightPercentageToDP('6%'),
    width: widthPercentageToDP('18%'),
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
    textAlign: 'justify',
  },
  next: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
});
