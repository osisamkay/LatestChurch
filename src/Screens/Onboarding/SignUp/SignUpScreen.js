import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
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
import Inputs from '../../../Components/Inputs';
import {Button} from 'react-native-elements';
import {SignInDest} from './SignUpDetails';
import {registerUser} from './Action/Action';
import {useToastBannerToggler} from 'react-native-toast-banner';

export default function SignUpScreen({navigation}) {
  const [values, setValues] = useState({});
  const {loading, registration} = useSelector(state => state.SignUpReducer);
  const dispatch = useDispatch();
  const {showBanner, hideBanner} = useToastBannerToggler();
  const propOwn = Object.getOwnPropertyNames(values);
  useEffect(() => {
    if (registration) {
      navigation.navigate('login');
    }
  }, [navigation, registration]);
  return (
    <ImageBackground
      source={require('../../../../assets/backgroundImage.jpeg')}
      resizeMode="stretch"
      resizeMethod="scale"
      style={styles.background}>
      <StatusBar
        barStyle="light-content"
        hidden={false}
        backgroundColor="transparent"
        translucent={true}
      />
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.container2}>
          <Image
            source={require('../../../../assets/output-onlinepngtools.png')}
            style={styles.logo}
          />
          <View>
            <Text style={styles.Text}>Sign Up</Text>
            <View>
              {SignInDest.map(data => {
                return (
                  <Inputs
                    placeholders={data.placeholder}
                    color="white"
                    TextInput={value => {
                      let input = data.title;

                      setValues({
                        ...values,
                        [input]: value,
                      });
                    }}
                  />
                );
              })}
            </View>
          </View>
        </View>
        <Button
          title="Sign Up"
          titleStyle={styles.btnTitle}
          buttonStyle={loading === true ? styles.btnStyle2 : styles.btnStyle}
          disabled={propOwn.length < 4 ? true : false}
          onPress={() => {
            dispatch(registerUser(values));
          }}
          loading={loading}
        />
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
  },
  container: {
    backgroundColor: 'rgba(0,0,0,.75)',

    height: heightPercentageToDP('106%'),
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: heightPercentageToDP('7%'),
  },
  container2: {
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    width: widthPercentageToDP('40%'),
    height: heightPercentageToDP('12%'),
  },
  btnStyle: {
    backgroundColor: '#fff',
    width: widthPercentageToDP('85%'),
    height: heightPercentageToDP('7%'),
  },
  btnStyle2: {
    backgroundColor: '#000',
    width: widthPercentageToDP('85%'),
    height: heightPercentageToDP('7%'),
  },
  btnTitle: {
    color: 'black',
  },
  Text: {
    textAlign: 'center',
    color: '#fff',
    marginVertical: 30,
    fontSize: heightPercentageToDP('2.5%'),
  },
});
