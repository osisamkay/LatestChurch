import React, {useState} from 'react';
// import Profile from './assets/Profile.svg';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {useNavigation} from '@react-navigation/native';
import {Card} from 'native-base';
import Icons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/Ionicons';
import {useDispatch} from 'react-redux';
import {logoutUser} from './src/Screens/Onboarding/Login/Action/Action';

const Data = [
  {title: 'About'},
  {title: 'Profile'},
  {title: 'Ministers'},
  {title: 'Online Giving'},
  {title: 'Notification'},
  {title: 'Settings'},
  {title: 'Events'},
  {title: 'Logout'},
];

function CustomDrawerContent({progress, navigation, ...rest}) {
  // const navigation = useNavigation();
  // navigation.addListener('focus', () => {
  //   // getProfile();
  // });

  const dispatch = useDispatch();

  const logout = () => {
    dispatch(logoutUser());
    navigation.navigate('login');
  };
  return (
    <DrawerContentScrollView {...rest}>
      <View>
        <View>
          <View style={styles.container}>
            <View style={{texAlign: 'center'}}>
              <Image
                source={require('./assets/output-onlinepngtools.png')}
                style={styles.imaged}
              />
            </View>
          </View>
        </View>

        {/* <DrawerItemList {...rest} labelStyle={styles.Label} /> */}

        <View style={styles.botcontainer}>
          {Data.map(data => {
            return (
              <TouchableOpacity
                onPress={() => {
                  data.title === 'About'
                    ? navigation.navigate('About')
                    : data.title === 'Profile'
                    ? navigation.navigate('Profile')
                    : data.title === 'Settings'
                    ? navigation.navigate('Settings')
                    : data.title === 'Events'
                    ? navigation.navigate('Events')
                    : data.title === 'Online Giving'
                    ? navigation.navigate('Offering')
                    : data.title === 'Events'
                    ? navigation.navigate('Events')
                    : data.title === 'Notification'
                    ? navigation.navigate('Notifications')
                    : data.title === 'Ministers'
                    ? navigation.navigate('Ministers')
                    : data.title === 'Logout'
                    ? logout()
                    : '';
                }}>
                <Card style={styles.drawerCards}>
                  <Icons
                    name={
                      data.title === 'Settings'
                        ? 'ios-settings'
                        : data.title === 'About'
                        ? 'ios-people'
                        : data.title === 'Profile'
                        ? 'ios-briefcase'
                        : data.title === 'Online Giving'
                        ? 'ios-cash'
                        : data.title === 'Notification'
                        ? 'ios-notifications'
                        : data.title === 'Ministers'
                        ? 'ios-person'
                        : data.title === 'Events'
                        ? 'ios-calendar'
                        : 'ios-exit'
                    }
                    size={60}
                  />
                  <Text style={styles.Label}>{data.title}</Text>
                </Card>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </DrawerContentScrollView>
  );
}

export default CustomDrawerContent;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, .25)',
  },
  botcontainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 28,
    borderBottomColor: 'rgba(255, 255, 255, .25)',
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
    fontSize: heightPercentageToDP('2.6%'),
    fontFamily: 'GT Walsheim Pro Regular Regular',
  },
  imaged: {
    width: widthPercentageToDP('50%'),
    height: heightPercentageToDP('15.5%'),
    // borderRadius: 100,
    marginRight: 10,
  },
  drawerCards: {
    width: widthPercentageToDP('30%'),
    height: heightPercentageToDP('15%'),
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 23,
  },
});
