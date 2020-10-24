import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Input} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';

export default function Inputs({TextInput, placeholders, Value, name, color}) {
  const [status, setStatus] = useState(false);
  return (
    <View>
      <Input
        inputContainerStyle={styles.input}
        inputStyle={color === 'white' ? styles.in2 : styles.in}
        placeholder={placeholders}
        leftIcon={<Icon name={name} size={24} color="black" />}
        onChangeText={TextInput}
        value={Value}
        placeholderTextColor={color === 'white' ? '#fff' : ''}
        rightIcon={
          placeholders === 'Password' ? (
            <Icon
              name={status ? 'eye' : 'eye-slash'}
              size={24}
              color={'grey'}
              onPress={() => {
                setStatus(!status);
              }}
            />
          ) : null
        }
        secureTextEntry={placeholders === 'Password' && !status ? true : false}
        keyboardType={placeholders === 'Number' ? 'numeric' : 'default'}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    marginHorizontal: 23,
    paddingBottom: 0,
    width: widthPercentageToDP('85%'),
  },
  in: {
    fontSize: heightPercentageToDP('2%'),
  },
  in2: {
    fontSize: heightPercentageToDP('2%'),
    color: 'white',
  },
});
