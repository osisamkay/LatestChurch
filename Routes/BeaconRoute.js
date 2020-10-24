import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/FontAwesome5';
import Icons from 'react-native-vector-icons/Entypo';
import {Image, TouchableOpacity} from 'react-native';
import {
  widthPercentageToDP,
  heightPercentageToDP,
} from 'react-native-responsive-screen';
import Beacon from '../src/Screens/Beacon';
import PdfViewer from '../src/Screens/PdfViewr';

const Stack = createStackNavigator();

function BeaconRoute({navigation}) {
  return (
    <Stack.Navigator
      initialRouteName="Beacon"
      screenOptions={{headerTitleAlign: 'center'}}>
      <Stack.Screen
        name="Beacon"
        options={{
          title: 'Beacon',
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
        component={Beacon}
      />
      <Stack.Screen
        name="pdf"
        options={{
          title: 'Beacon',
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
        }}
        component={PdfViewer}
      />
    </Stack.Navigator>
  );
}

export default BeaconRoute;
