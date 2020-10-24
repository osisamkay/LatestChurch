import PaystackWebView from 'react-native-paystack-webview';
import React, {useRef, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
} from 'react-native';
import ViewSlider from 'react-native-view-slider';
import {script} from '../Components/paymentScriptures';
import {
  widthPercentageToDP,
  heightPercentageToDP,
} from 'react-native-responsive-screen';
import Carousel, {Pagination} from 'react-native-x-carousel';

export default function Payment() {
  const [amount, setAmount] = useState('');
  const childRef = useRef();
  const renderItem = data => (
    <View style={styles.viewBox}>
      <Text style={styles.text}>{data.verse}</Text>
    </View>
  );
  return (
    <View style={{flex: 1, backgroundColor: 'black'}}>
      <Carousel
        pagination={Pagination}
        renderItem={renderItem}
        data={script}
        autoplay={true}
        autoplayInterval={5000}
      />
      <ScrollView contentContainerStyle={styles.below}>
        <ImageBackground
          style={{flex: 1}}
          resizeMode="stretch"
          source={require('../../assets/t&o.png')}
        />
        {/* <View>
          <Text style={styles.textt}>OR</Text>
        </View>
        <View>
          <Text style={styles.textt}>
            Please type in the amout you wish to give
          </Text>
          <Inputs
            placeholders="10,000"
            key
            name="money"
            TextInput={value => {
              setAmount(value);
            }}
          />
          <Button
            title="Save Profile"
            raised
            type="clear"
            buttonStyle={styles.Button}
            titleStyle={{color: '#fff'}}
            onPress={() => {
              // console.log(amount);
              childRef.current.StartTransaction();
            }}
          />
        </View> */}
      </ScrollView>
      <PaystackWebView
        showPayButton={false}
        paystackKey="pk_test_4bfb193dbfd4b2012447b10c69dab0aa5cfa6281"
        paystackSecretKey="sk_test_79b981d05a833abf606c1c8a1e8f0208f29bbc07"
        amount={amount}
        billingEmail="paystackwebview@something.com"
        billingMobile="09787377462"
        billingName="Oluwatobi Shokunbi"
        ActivityIndicatorColor="green"
        SafeAreaViewContainer={{marginTop: 5}}
        SafeAreaViewContainerModal={{marginTop: 5}}
        onCancel={e => {}}
        onSuccess={e => {}}
        ref={childRef}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  viewBox: {
    paddingHorizontal: 20,
    justifyContent: 'center',
    width: widthPercentageToDP('100%'),
    padding: 10,
    alignItems: 'center',
    height: heightPercentageToDP('30%'),
    backgroundColor: 'black',
  },
  text: {
    color: '#fff',
    fontFamily: 'notoserif',
    textAlign: 'center',
    fontSize: heightPercentageToDP('2.5%'),
  },
  textt: {
    color: '#000',
    fontFamily: 'notoserif',
    textAlign: 'center',
    fontSize: heightPercentageToDP('2.5%'),
    marginTop: 30,
  },
  Button: {
    backgroundColor: '#000',
    height: heightPercentageToDP('8%'),
    marginHorizontal: 23,
    marginBottom: 10,
  },
  below: {
    height: heightPercentageToDP('40%'),
    justifyContent: 'center',
    backgroundColor: '#000',
    marginTop: heightPercentageToDP('10%'),
  },
});
