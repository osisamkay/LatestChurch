import React, {useRef, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {Avatar} from 'react-native-elements';
import {Button} from 'react-native-elements';
import {useNavigation} from '@react-navigation/native';
import useProfile from './hooks/useProfile';
import Loader from 'react-native-multi-loader';

export default function Profile({}) {
  const [loading, setLoading, getProfile, profile] = useProfile();
  const navigation = useNavigation();
  navigation.addListener('focus', () => {
    getProfile();
  });
  const ProfileData = [
    {name: profile.name, title: 'Name'},
    {name: profile.email, title: 'Email'},
    {name: profile.phone, title: 'Number'},
    {
      name: profile.address,
      title: 'Address',
    },
  ];
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'black'}}>
      <View>
        <Avatar
          size={120}
          rounded
          source={
            profile.avatar === null
              ? null
              : {
                  uri: profile.avatar,
                }
          }
          icon={{name: 'user', type: 'font-awesome', color: 'black'}}
          onPress={() => console.log('Works!')}
          activeOpacity={1}
          containerStyle={styles.Avatar}
        />
      </View>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.group}>
          {ProfileData.map(data => {
            return (
              <View style={styles.bodyContainer}>
                <Text style={styles.title}>{data.title}</Text>
                <Text style={styles.titletxt}>{data.name}</Text>
              </View>
            );
          })}
        </View>
        <Button
          title="Edit Profile"
          raised
          type="clear"
          buttonStyle={styles.Button}
          titleStyle={{color: 'black'}}
          onPress={() => {
            navigation.navigate('Settings');
          }}
        />
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
    justifyContent: 'space-between',
  },
  image: {
    height: heightPercentageToDP('25%'),
    width: widthPercentageToDP('100%'),
    alignSelf: 'center',
    backgroundColor: 'black',
    resizeMode: 'contain',
  },
  imageContainer: {
    height: heightPercentageToDP('25%'),
    // width: widthPercentageToDP('100%'),
    // alignSelf: 'center',
    backgroundColor: 'black',
  },
  group: {
    // alignItems: 'center',
    paddingVertical: 25,
  },
  Avatar: {
    backgroundColor: '#fff',
    alignSelf: 'center',
    marginTop: 20,
  },
  title: {
    color: '#fff',
    fontSize: heightPercentageToDP('2.5%'),
  },
  titletxt: {
    color: 'grey',
    fontSize: heightPercentageToDP('2.5%'),
    width: widthPercentageToDP('60%'),
    textAlign: 'right',
  },
  bodyContainer: {
    // marginTop: 30,
    paddingVertical: 10,
    paddingHorizontal: 23,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  Button: {
    backgroundColor: '#fff',
    height: heightPercentageToDP('8%'),
    marginHorizontal: 23,
    marginBottom: 10,
  },
});
