import React, {useEffect} from 'react';
import {
  StyleSheet,
  Text,
  StatusBar,
  View,
  SafeAreaView,
  ImageBackground,
  ScrollView,
  Image,
} from 'react-native';
import {
  widthPercentageToDP,
  heightPercentageToDP,
} from 'react-native-responsive-screen';
import {Button} from 'react-native-elements';
import SplashScreen from 'react-native-splash-screen';
import {useSelector, useDispatch} from 'react-redux';

const Onboard = ({navigation}) => {
  const {loading, userData, isLogged} = useSelector(
    state => state.LoginReducer,
  );

  useEffect(() => {
    SplashScreen.hide();
    if (isLogged) {
      navigation.navigate('HomePages');
    }
  }, [isLogged, navigation]);
  return (
    <View style={{flex: 1, backgroundColor: '#000'}}>
      <Image
        source={require('../../../assets/output-onlinepngtools.png')}
        style={styles.logo}
      />
      <ImageBackground
        source={require('../../../assets/church1.jpeg')}
        resizeMode="cover"
        resizeMethod="scale"
        style={styles.background}>
        <StatusBar
          barStyle="light-content"
          hidden={false}
          backgroundColor="transparent"
          translucent={true}
        />
        <View style={styles.veil} />
      </ImageBackground>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.Text}>
          Headquarters of heaven. Where God is raising Kingdom minded people
          with a passion for excellence in life
        </Text>
        <View style={styles.btnContainer}>
          <Button
            title="Create An Account"
            titleStyle={styles.btnTitle}
            buttonStyle={styles.btnStyle}
            onPress={() => {
              navigation.navigate('signIn');
            }}
          />
          <Button
            title="Login"
            titleStyle={styles.btnTitle2}
            buttonStyle={styles.btnStyle2}
            type="outline"
            onPress={() => {
              navigation.navigate('login');
            }}
          />
        </View>
        <Text style={styles.Text2}>
          The Chapel of Christ Our Light (Protestant), University of Lagos is a
          non-denominational, community-based gathering of all bible believing
          brethren who work and or reside within the campus and its environs.
        </Text>
      </ScrollView>
    </View>
  );
};

export default Onboard;

const styles = StyleSheet.create({
  background: {
    width: widthPercentageToDP('100%'),
    height: heightPercentageToDP('30%'),
    justifyContent: 'center',
  },
  veil: {
    backgroundColor: 'rgba(0,0,0,.55)',
    flex: 1,
  },
  container: {
    backgroundColor: 'rgba(0,0,0,1)',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: widthPercentageToDP('40%'),
    height: heightPercentageToDP('12%'),
    alignSelf: 'center',
    margin: heightPercentageToDP('5%'),
  },
  Text: {
    color: 'white',
    textAlign: 'center',
    marginVertical: 30,
    fontSize: heightPercentageToDP('1.5%'),
    width: widthPercentageToDP('85%'),
  },
  Text2: {
    color: 'white',
    textAlign: 'center',
    marginTop: 30,
    fontSize: heightPercentageToDP('1.5%'),
    width: widthPercentageToDP('85%'),
  },
  btnContainer: {
    height: heightPercentageToDP('17%'),
    justifyContent: 'space-between',
  },
  btnStyle: {
    backgroundColor: '#fff',
    width: widthPercentageToDP('85%'),
    height: heightPercentageToDP('7%'),
  },
  btnStyle2: {
    borderColor: '#fff',
    width: widthPercentageToDP('85%'),
    height: heightPercentageToDP('7%'),
  },
  btnTitle: {
    color: 'black',
  },
  btnTitle2: {
    color: '#fff',
  },
});
