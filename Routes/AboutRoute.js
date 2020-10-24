import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/FontAwesome5';
import Icons from 'react-native-vector-icons/Entypo';
import {Image, TouchableOpacity} from 'react-native';
import {
  widthPercentageToDP,
  heightPercentageToDP,
} from 'react-native-responsive-screen';
import About from '../src/Screens/About';

const Stack = createStackNavigator();

function AboutRoute({navigation}) {
  return (
    <Stack.Navigator
      initialRouteName="About"
      screenOptions={{headerTitleAlign: 'center'}}>
      <Stack.Screen
        name="About"
        options={{
          title: 'About',
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
        component={About}
      />
    </Stack.Navigator>
  );
}

export default AboutRoute;
