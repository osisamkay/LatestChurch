import React, {useRef, useState} from 'react';
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
import {Card, CardItem, Body, Footer} from 'native-base';
import YouTube from 'react-native-youtube';

export default function About() {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'black'}}>
      <View>
        <Image
          source={require('../../assets/fbn.jpg')}
          //   resizeMode="contain"
          style={styles.image}
        />
      </View>
      <ScrollView style={styles.container}>
        <View style={styles.group}>
          <View style={styles.bodyContainer}>
            <Text style={styles.title}>WHAT WE BELIEVE</Text>
            <Text style={styles.body}>
              We believe God has given us the book{' '}
              <Text style={styles.bold}>(the Bible)</Text> that is true and can
              be trusted. It was written by men but inspired by God – and every
              part of it points to Jesus. Everything that’s described below may
              be helpful, but when the dust settles, the Bible is our statement
              of faith. We believe in{' '}
              <Text style={styles.bold}>God Almighty</Text>, who is the Father
              and creator of everything, including you and me. He is
              all-powerful, all-knowing, ever-present, and worthy to be loved
              with all our heart, soul, strength, and mind.
            </Text>
            <Text style={styles.body}>
              We believe God is revealed fully in
              <Text style={styles.bold}> Jesus</Text>, who was born of a virgin,
              lived a sinless life, died on a cross for our sins, supernaturally
              rose from the dead and is our soon and coming King. We believe the
              <Text style={styles.bold}> Holy Spirit</Text> is God in his power
              and presence, given to us on the day of Pentecost, drawing people
              to him, saving us, and empowering us with gifts to work for him
              and fruit in our attitudes and relationships that testify to him.
            </Text>
            <Text style={styles.body}>
              We believe all human beings are{' '}
              <Text style={styles.bold}>spiritually lost</Text>. Only through
              Jesus can we be found, and this is the desire of God. If we submit
              to Jesus’ Lordship, we will be saved; if we continue on our own
              path, we will end up separated from God forever. This is something
              God does not want. That’s why Jesus came
            </Text>
            <Text style={styles.body}>
              We believe in the <Text style={styles.bold}>Church</Text>, the
              <Text style={styles.bold}> living Body of Christ</Text> where can
              grow until Christ is formed in us. God doesn’t want us living this
              spiritual life in isolation; that’s why He created the “Body” and
              He’s totally committed to building it.
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    height: heightPercentageToDP('25%'),
    width: widthPercentageToDP('100%'),
    alignSelf: 'center',
    backgroundColor: 'black',
    resizeMode: 'contain',
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
});
