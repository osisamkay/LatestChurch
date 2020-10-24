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
import {LoginData} from './LoginData';
import {Button} from 'react-native-elements';
import {loginUser} from './Action/Action';

export default function LoginScreen({navigation}) {
  const [values, setValues] = useState({});
  const [show, setShow] = useState(true);
  const {loading, userData, isLogged, playerCalled} = useSelector(
    state => state.LoginReducer,
  );
  const dispatch = useDispatch();
  const propOwn = Object.getOwnPropertyNames(values);

  useEffect(() => {
    if (isLogged) {
      navigation.navigate('HomePages');
    }
  }, [isLogged, navigation]);
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
            <Text style={styles.Text}>Login</Text>
            <View>
              {LoginData.map(data => {
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
          title="Login"
          titleStyle={styles.btnTitle}
          buttonStyle={loading === true ? styles.btnStyle2 : styles.btnStyle}
          disabled={propOwn.length < 2 ? true : false}
          onPress={() => {
            console.log(values);
            dispatch(loginUser(values));
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
    flex: 1,
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
