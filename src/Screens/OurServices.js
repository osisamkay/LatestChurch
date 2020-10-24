import React from 'react';
import {Dimensions, View, Text, StyleSheet, Image} from 'react-native';
import EventCalendar from 'react-native-events-calendar';
import {
  ToastBannerProvider,
  ToastBannerPresenter,
  useToastBannerToggler /* or withToastBannerToggler */,
  Transition,
} from 'react-native-toast-banner';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {useNavigation} from '@react-navigation/native';
import useEvents from './hooks/useEvents';

import Loader from 'react-native-multi-loader';
import useServices from './hooks/useServices';
let {width} = Dimensions.get('window');

const OurServices = () => {
  const {showBanner, hideBanner} = useToastBannerToggler();
  const [loading, setLoading, getEvents, events] = useServices();
  const navigation = useNavigation();
  navigation.addListener('focus', () => {
    getEvents();
  });

  function _eventTapped(event) {
    // alert(JSON.stringify(event));
    let title = JSON.parse(JSON.stringify(event));

    showBanner({
      contentView: (
        <View style={{padding: 40}}>
          <Text style={styles.info}>Title: {title.title}</Text>
          <Text style={styles.info}>Summary: {title.summary}</Text>
          <Text style={styles.info}>Start: {title.start}</Text>
          <Text style={styles.info}>End: {title.end}</Text>
        </View>
      ),
      backgroundColor: '#000' /* default: undefined */,
      duration: 3000 /* default: 3000 */,
      transitions: [
        Transition.Move,
        Transition.MoveLinear,
        Transition.FadeInOut,
      ],
      disableHideOnPress: true,
    });
  }

  let today = new Date();
  let dd = String(today.getDate()).padStart(2, '0');
  let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  let yyyy = today.getFullYear();

  today = yyyy + '-' + mm + '-' + dd;
  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        flex: 1,
      }}>
      <Image
        source={require('../../assets/seviceschedule.png')}
        style={styles.img}
        resizeMode="contain"
      />
    </View>
  );
};
export default OurServices;

const styles = StyleSheet.create({
  info: {
    color: '#fff',
    fontSize: heightPercentageToDP('2.25%'),
    paddingTop: 10,
  },
  img: {
    width: widthPercentageToDP('100%'),
    height: heightPercentageToDP('50%'),
  },
});
