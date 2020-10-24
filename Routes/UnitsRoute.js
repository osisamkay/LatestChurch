import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/FontAwesome5';
import Icons from 'react-native-vector-icons/Entypo';
import Homepage from '../src/Screens/Homepage';
import {Image, TouchableOpacity} from 'react-native';
import {
  widthPercentageToDP,
  heightPercentageToDP,
} from 'react-native-responsive-screen';
import Units from '../src/Screens/Units';
import UnitDetails from '../src/Screens/UnitDetails';

const Stack = createStackNavigator();

function UnitsRoute({navigation}) {
  return (
    <Stack.Navigator
      initialRouteName="Units"
      screenOptions={{headerTitleAlign: 'center'}}>
      <Stack.Screen
        name="Units"
        options={{
          title: 'Units',
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
        component={Units}
      />
      <Stack.Screen
        name="unitDetails"
        options={{
          title: 'Units',
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
        component={UnitDetails}
      />
    </Stack.Navigator>
  );
}

export default UnitsRoute;
