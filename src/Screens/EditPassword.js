import React, {useState} from 'react';
import {StyleSheet, Text, View, ScrollView} from 'react-native';
import Inputs from '../Components/Inputs';
import Icon from 'react-native-vector-icons/FontAwesome';

import {Button} from 'react-native-elements';
import {heightPercentageToDP} from 'react-native-responsive-screen';

export default function EditPassWord({close, textInput}) {
  const [status, setStatus] = useState(false);
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Inputs placeholders="Password" name="lock" TextInput={textInput} />

      <Button
        title="Change Password"
        raised
        type="clear"
        buttonStyle={styles.Button}
        titleStyle={{color: '#fff'}}
        onPress={close}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  Button: {
    backgroundColor: '#000',
    height: heightPercentageToDP('8%'),
    marginHorizontal: 23,
    marginBottom: 10,
  },
});
