import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/FontAwesome5';
import Icons from 'react-native-vector-icons/Entypo';
import {Image, TouchableOpacity} from 'react-native';
import {
  widthPercentageToDP,
  heightPercentageToDP,
} from 'react-native-responsive-screen';
import Ministers from '../src/Screens/Ministers';
import MinisterDetails from '../src/Screens/MinisterDetails';

const Stack = createStackNavigator();

function MinistersRoute({navigation}) {
  return (
    <Stack.Navigator
      initialRouteName="Ministers"
      screenOptions={{headerTitleAlign: 'center'}}>
      <Stack.Screen
        name="Ministers"
        options={{
          title: 'Ministers',
          headerTintColor: '#fff',
          headerStyle: {
            backgroundColor: '#000',
          },
          headerRight: () => (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('HomePages');
              }}>
              <Image
                source={require('../assets//output-onlinepngtools.png')}
                style={{
                  width: widthPercentageToDP('30%'),
                  height: heightPercentageToDP('6Z%'),
                  // paddingRight: 23,
                }}
                resizeMode="contain"
              />
            </TouchableOpacity>
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
        component={Ministers}
      />
      <Stack.Screen
        name="ministers"
        options={{
          title: 'Ministers',
          headerTintColor: '#fff',
          headerStyle: {
            // backgroundColor:"#000"
            backgroundColor: '#000',
          },
          headerRight: () => (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('HomePages');
              }}>
              <Image
                source={require('../assets//output-onlinepngtools.png')}
                style={{
                  width: widthPercentageToDP('30%'),
                  height: heightPercentageToDP('6Z%'),
                  // paddingRight: 23,
                }}
                resizeMode="contain"
              />
            </TouchableOpacity>
          ),
        }}
        component={MinisterDetails}
      />
    </Stack.Navigator>
  );
}

export default MinistersRoute;
