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
import Events from '../src/Screens/Events';

const Stack = createStackNavigator();

function EventRoute({navigation}) {
  return (
    <Stack.Navigator
      initialRouteName="Events"
      screenOptions={{headerTitleAlign: 'center'}}>
      <Stack.Screen
        name="Events"
        options={{
          title: 'Events',
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
        component={Events}
      />
    </Stack.Navigator>
  );
}

export default EventRoute;
