import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {SettingsInfoData} from '../Components/SettingsInfoData';
import Inputs from '../Components/Inputs';
import {ScrollView} from 'react-native-gesture-handler';

import {Button} from 'react-native-elements';
import {heightPercentageToDP} from 'react-native-responsive-screen';

export default function EditInfo({close, TextInput}) {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      {SettingsInfoData.map(data => (
        <Inputs
          placeholders={data.placeholder}
          name={data.name}
          TextInput={val => {
            TextInput(data.title, val);
          }}
        />
      ))}
      <Button
        title="Save Profile"
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
