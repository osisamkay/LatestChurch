import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {Button} from 'react-native-elements';
import useUnits from './hooks/useUnits';
import Loader from 'react-native-multi-loader';

export default function UnitDetails({route}) {
  const {detail, title, cover_photo, id} = route.params;
  const [
    loading,
    setLoading,
    getUnits,
    units,
    joinUnits,
    leaveUnits,
  ] = useUnits();
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'black'}}>
      <View>
        <Image
          source={{uri: cover_photo}}
          //   resizeMode="contain"
          style={styles.image}
        />
      </View>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.group}>
          <View style={styles.bodyContainer}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.body}>{detail}</Text>
          </View>
        </View>
        {/* <View style={styles.btns}>
          <Button
            buttonStyle={styles.btn}
            title="Join Unit"
            onPress={() => {
              joinUnits(id);
            }}
            titleStyle={styles.btnTxt}
          />
          <Button
            buttonStyle={styles.btn2}
            title="Leave Unit"
            onPress={() => {
              leaveUnits(id);
            }}
            titleStyle={styles.btnTxt2}
          />
        </View> */}
      </ScrollView>
      <Loader
        visible={loading}
        loaderType="bars"
        textType="none"
        sizeLoader="small"
        sizeText={heightPercentageToDP('1.75%')}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  image: {
    height: heightPercentageToDP('25%'),
    width: widthPercentageToDP('100%'),
    alignSelf: 'center',
    backgroundColor: 'black',
    resizeMode: 'stretch',
    marginBottom: 20,
  },
  imageContainer: {
    height: heightPercentageToDP('25%'),
    // width: widthPercentageToDP('100%'),
    // alignSelf: 'center',
    backgroundColor: 'black',
  },
  group: {
    // alignItems: 'center',
    // paddingVertical: 20,
  },
  bodyContainer: {paddingHorizontal: 15},
  btns: {
    paddingHorizontal: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 17,
  },
  title: {
    color: 'grey',
    fontSize: heightPercentageToDP('2.5%'),
    textAlign: 'center',
  },
  body: {
    color: 'grey',
    fontSize: heightPercentageToDP('1.75%'),
    textAlign: 'justify',
    lineHeight: 20,
    marginBottom: 10,
  },
  bold: {
    // fontWeight: 'bold',
    color: 'rgba(255,255,255,0.75)',
  },
  btn: {
    marginVertical: 10,
    backgroundColor: '#fff',
    height: heightPercentageToDP('8%'),
    width: widthPercentageToDP('45%'),
  },
  btn2: {
    marginVertical: 10,
    backgroundColor: 'transparent',
    height: heightPercentageToDP('8%'),
    width: widthPercentageToDP('45%'),
    borderWidth: 1,
    borderColor: '#fff',
  },
  btnTxt: {
    color: '#000',
  },
  btnTxt2: {
    color: '#fff',
  },
});
