import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {WebView} from 'react-native-webview';

const Audio = () => {
  return (
    <WebView
      source={{
        html:
          '<iframe src="https://mixlr.com/users/7647763/embed?autoplay=true" width="100%" height="180px" scrolling="no" frameborder="no" marginheight="0" marginwidth="0"></iframe><small><a href="https://mixlr.com/unilag-chapel" style="color:#fff;text-align:left; font-family:Helvetica, sans-serif; font-size:50px;">Unilag Chapel is on Mixlr</a></small>',
      }}
      style={styles.container}
    />
  );
};

export default Audio;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    height: 180,
    backgroundColor: 'black',
    paddingVertical: 50,
  },
});
