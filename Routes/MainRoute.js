import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/FontAwesome5';
import Icons from 'react-native-vector-icons/Entypo';
import Homepage from '../src/Screens/Homepage';
import {Image} from 'react-native';
import {
  widthPercentageToDP,
  heightPercentageToDP,
} from 'react-native-responsive-screen';
import DevotionalRoute from './DevotionalRoute';
import MediaRoute from './MediaRoute';
import PodcastRoute from './PodcastRoute';
import EventRoute from './EventsRoute';
import UnitsRoute from './UnitsRoute';
import BeaconRoute from './BeaconRoute';
import AboutRoute from './AboutRoute';
import ProfileRoute from './ProfileRoute';
import SettingsRoute from './SettingsRoute';
import PaymentRoute from './PaymentRoute';
import Onboard from '../src/Screens/Onboarding/Onboard';
import LoginScreen from '../src/Screens/Onboarding/Login/LoginScreen';
import SignUpScreen from '../src/Screens/Onboarding/SignUp/SignUpScreen';
import PlayerRoute from './PlayerRoute';
import OurServiceRoute from './OurServiceRoute';
import MinistersRoute from './MinistersRoute';
import NotificationRoute from './NotificationRoute';
import QuizRoute from './QuizRoute';
import AudioRoute from './AudioRoute';

const Stack = createStackNavigator();

function Main({navigation}) {
  return (
    <Stack.Navigator
      // initialRouteName="HomePages"
      initialRouteName="OnBoarding"
      screenOptions={{headerTitleAlign: 'center'}}>
      <Stack.Screen
        name="HomePages"
        options={{
          title: 'Hello...',
          headerTintColor: '#fff',
          headerStyle: {
            // backgroundColor:"#000"
            backgroundColor: '#000',
          },
          headerRight: () => (
            <Image
              source={require('../assets//output-onlinepngtools.png')}
              style={{
                width: widthPercentageToDP('30%'),
                height: heightPercentageToDP('6Z%'),
                // paddingRight: 23,
              }}
              resizeMode="contain"
              onPress={() => {
                navigation.openDrawer();
              }}
            />
          ),
          headerLeft: () => (
            <Icons
              onPress={() => {
                navigation.openDrawer();
              }}
              name="grid"
              size={30}
              color="#fff"
              style={{paddingLeft: 23}}
            />
          ),
        }}
        component={Homepage}
      />
      <Stack.Screen
        name="Devotional"
        options={{
          headerShown: false,
        }}
        component={DevotionalRoute}
      />
      <Stack.Screen
        name="Media"
        options={{
          headerShown: false,
        }}
        component={MediaRoute}
      />
      <Stack.Screen
        name="Podcast"
        options={{
          headerShown: false,
        }}
        component={PodcastRoute}
      />
      <Stack.Screen
        name="Events"
        options={{
          headerShown: false,
        }}
        component={EventRoute}
      />
      <Stack.Screen
        name="OurServices"
        options={{
          headerShown: false,
        }}
        component={OurServiceRoute}
      />
      <Stack.Screen
        name="Units"
        options={{
          headerShown: false,
        }}
        component={UnitsRoute}
      />
      <Stack.Screen
        name="Beacon"
        options={{
          headerShown: false,
        }}
        component={BeaconRoute}
      />
      <Stack.Screen
        name="About"
        options={{
          headerShown: false,
        }}
        component={AboutRoute}
      />
      <Stack.Screen
        name="Profile"
        options={{
          headerShown: false,
        }}
        component={ProfileRoute}
      />
      <Stack.Screen
        name="Ministers"
        options={{
          headerShown: false,
        }}
        component={MinistersRoute}
      />
      <Stack.Screen
        name="Settings"
        options={{
          headerShown: false,
        }}
        component={SettingsRoute}
      />
      <Stack.Screen
        name="Offering"
        options={{
          headerShown: false,
        }}
        component={PaymentRoute}
      />
      <Stack.Screen
        name="OnBoarding"
        options={{
          headerShown: false,
        }}
        component={Onboard}
      />
      <Stack.Screen
        name="login"
        options={{
          headerShown: false,
        }}
        component={LoginScreen}
      />
      <Stack.Screen
        name="signIn"
        options={{
          headerShown: false,
        }}
        component={SignUpScreen}
      />
      <Stack.Screen
        name="Player"
        options={{
          headerShown: false,
        }}
        component={PlayerRoute}
      />
      <Stack.Screen
        name="Notifications"
        options={{
          headerShown: false,
        }}
        component={NotificationRoute}
      />
      <Stack.Screen
        name="Quiz"
        options={{
          headerShown: false,
        }}
        component={QuizRoute}
      />
      <Stack.Screen
        name="Audio"
        options={{
          headerShown: false,
        }}
        component={AudioRoute}
      />
    </Stack.Navigator>
  );
}

export default Main;
