import React from 'react';
import {StyleSheet, Dimensions, Text, View} from 'react-native';
import Pdf from 'react-native-pdf';

export default function PdfViewer({route}) {
  const {file} = route.params;
  console.log(file);
  // const source = require('../../assets/l.pdf');
  const source = {
    uri: `${file}`,
  };
  return (
    <View style={styles.container}>
      {/* <Text>hguyguhhj</Text> */}
      <Pdf
        source={source}
        onLoadComplete={(numberOfPages, filePath) => {
          console.log(`number of pages: ${numberOfPages}`);
        }}
        onPageChanged={(page, numberOfPages) => {
          console.log(`current page: ${page}`);
        }}
        onError={error => {
          console.log(error);
        }}
        onPressLink={uri => {
          console.log(`Link presse: ${uri}`);
        }}
        style={styles.pdf}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    // marginTop: 25,
  },
  pdf: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});
